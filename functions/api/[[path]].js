const enc = new TextEncoder();
const dec = new TextDecoder();

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...extra } });
}
function bad(message, status = 400) { return json({ error: message }, status); }
function b64u(bytes) { return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function b64uStr(s) { return b64u(enc.encode(s)); }
function fromB64u(s) { s=s.replace(/-/g,'+').replace(/_/g,'/'); while(s.length%4)s+='='; return Uint8Array.from(atob(s), c=>c.charCodeAt(0)); }
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign']);
  return b64u(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function token(secret, payload) {
  const body=b64uStr(JSON.stringify(payload));
  return body+'.'+await hmac(secret,body);
}
async function verifyToken(secret, t) {
  if(!t) return null;
  const [body,sig] = t.split('.'); if(!body||!sig) return null;
  const expected=await hmac(secret,body);
  if(expected!==sig) return null;
  try { const p=JSON.parse(dec.decode(fromB64u(body))); if(!p.exp || p.exp<Date.now()) return null; return p; } catch { return null; }
}
async function passwordHash(password, saltB64) {
  const salt=saltB64?fromB64u(saltB64):crypto.getRandomValues(new Uint8Array(16));
  const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:120000,hash:'SHA-256'},key,256);
  return {hash:b64u(bits),salt:b64u(salt)};
}
async function checkPassword(password, hash, salt) { return (await passwordHash(password,salt)).hash===hash; }
function cookie(name,value,maxAge=604800) { return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`; }
async function auth(request, env) { return verifyToken(env.SESSION_SECRET, request.headers.get('Cookie')?.match(/jn_session=([^;]+)/)?.[1]); }
function clean(s, max=5000) { return String(s??'').trim().slice(0,max); }
function email(s) { return String(s??'').trim().toLowerCase(); }
async function body(request) { try{return await request.json()}catch{return {}} }
function requireRole(user, role) { return user && (user.role===role || user.role==='owner'); }

export async function onRequest(context) {
  const {request,env,params}=context;
  if(!env.DB) return bad('D1 binding DB belum dikonfigurasi.',500);
  const rawPath=params.path; const path='/' + (Array.isArray(rawPath)?rawPath.join('/'):String(rawPath||''));
  const method=request.method;

  // Bootstrap Owner: endpoint ini harus dapat berjalan sebelum ada session.
  if(path==='/setup-owner' && method==='POST') {
    if(!env.OWNER_SETUP_KEY) return bad('OWNER_SETUP_KEY belum dikonfigurasi di Cloudflare.',500);
    const b=await body(request);
    if(String(b.setupKey??'') !== String(env.OWNER_SETUP_KEY)) return bad('OWNER_SETUP_KEY salah.',403);

    let count;
    try {
      count=await env.DB.prepare("SELECT COUNT(*) AS n FROM users WHERE role='owner'").first();
    } catch (e) {
      return bad('Database D1 belum siap atau schema.sql belum dijalankan.',500);
    }
    if(Number(count?.n||0)>0) return bad('Owner sudah dibuat. Setup Owner tidak dapat digunakan lagi.',409);

    const name=clean(b.name,120), em=email(b.email), pw=String(b.password||'');
    if(name.length<2||!em.includes('@')||pw.length<8) return bad('Data owner tidak valid. Password minimal 8 karakter.');
    try {
      const ph=await passwordHash(pw);
      await env.DB.prepare("INSERT INTO users(name,email,password_hash,password_salt,role,status) VALUES(?,?,?,?,'owner','active')").bind(name,em,ph.hash,ph.salt).run();
      return json({ok:true,message:'Owner berhasil dibuat. Silakan login.'});
    } catch (e) {
      const msg=String(e?.message||e);
      if(msg.toLowerCase().includes('unique') && msg.toLowerCase().includes('email')) return bad('Email owner sudah terdaftar.',409);
      return bad('Gagal membuat Owner di database D1: '+msg,500);
    }
  }

  if(!env.SESSION_SECRET) return bad('SESSION_SECRET belum dikonfigurasi di Cloudflare.',500);
  const me=await auth(request,env);

  if(path==='/config' && method==='GET') return json({price:Number(env.MEMBERSHIP_PRICE||50000), paymentInstructions:env.PAYMENT_INSTRUCTIONS||'Hubungi owner untuk instruksi pembayaran.'});
  if(path==='/me' && method==='GET') {
    if(!me) return json({user:null});
    const u=await env.DB.prepare('SELECT id,name,email,role,status,created_at FROM users WHERE id=?').bind(me.uid).first();
    return json({user:u||null});
  }
  if(path==='/register' && method==='POST') {
    const b=await body(request), name=clean(b.name,120), em=email(b.email), password=String(b.password||'');
    if(name.length<2||!em.includes('@')||password.length<8) return bad('Nama, email valid, dan password minimal 8 karakter wajib diisi.');
    const exists=await env.DB.prepare('SELECT id FROM users WHERE email=?').bind(em).first(); if(exists) return bad('Email sudah terdaftar.',409);
    const ph=await passwordHash(password);
    const r=await env.DB.prepare('INSERT INTO users(name,email,password_hash,password_salt,role,status) VALUES(?,?,?,?,\'member\',\'pending\')').bind(name,em,ph.hash,ph.salt).run();
    await env.DB.prepare('INSERT INTO payment_requests(user_id,amount,status) VALUES(?,?,\'pending\')').bind(r.meta.last_row_id,Number(env.MEMBERSHIP_PRICE||50000)).run();
    return json({ok:true,message:'Pendaftaran berhasil. Akun menunggu aktivasi setelah pembayaran.'},201);
  }
  if(path==='/login' && method==='POST') {
    const b=await body(request), em=email(b.email), pw=String(b.password||'');
    const u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(em).first();
    if(!u || !(await checkPassword(pw,u.password_hash,u.password_salt))) return bad('Email atau password salah.',401);
    if(u.status!=='active') return bad(u.status==='pending'?'Akun belum aktif. Selesaikan pembayaran dan tunggu aktivasi owner.':'Akun ditangguhkan.',403);
    const t=await token(env.SESSION_SECRET,{uid:u.id,role:u.role,exp:Date.now()+604800000});
    return json({ok:true,user:{id:u.id,name:u.name,email:u.email,role:u.role}},200,{'Set-Cookie':cookie('jn_session',t)});
  }
  if(path==='/logout' && method==='POST') return json({ok:true},200,{'Set-Cookie':cookie('jn_session','',0)});
  if(!me) return bad('Login diperlukan.',401);

  if(path==='/owner/users' && method==='GET') {
    if(me.role!=='owner') return bad('Akses owner diperlukan.',403);
    const r=await env.DB.prepare(`SELECT u.id,u.name,u.email,u.status,u.created_at,COALESCE(p.status,'none') payment_status,p.amount,p.id payment_id
      FROM users u LEFT JOIN payment_requests p ON p.id=(SELECT id FROM payment_requests WHERE user_id=u.id ORDER BY id DESC LIMIT 1)
      WHERE u.role='member' ORDER BY u.created_at DESC`).all();
    return json({users:r.results});
  }
  if(path==='/owner/users/activate' && method==='POST') {
    if(me.role!=='owner') return bad('Akses owner diperlukan.',403);
    const b=await body(request); await env.DB.prepare("UPDATE users SET status='active',updated_at=CURRENT_TIMESTAMP WHERE id=? AND role='member'").bind(Number(b.userId)).run();
    await env.DB.prepare("UPDATE payment_requests SET status='paid',reviewed_at=CURRENT_TIMESTAMP WHERE user_id=? AND id=(SELECT id FROM payment_requests WHERE user_id=? ORDER BY id DESC LIMIT 1)").bind(Number(b.userId),Number(b.userId)).run();
    return json({ok:true});
  }
  if(path==='/owner/users/suspend' && method==='POST') {
    if(me.role!=='owner') return bad('Akses owner diperlukan.',403);
    const b=await body(request); await env.DB.prepare("UPDATE users SET status='suspended',updated_at=CURRENT_TIMESTAMP WHERE id=? AND role='member'").bind(Number(b.userId)).run(); return json({ok:true});
  }
  if(path==='/trees' && method==='GET') {
    const q=me.role==='owner' ? await env.DB.prepare('SELECT t.*,u.name creator_name FROM family_trees t JOIN users u ON u.id=t.created_by ORDER BY t.updated_at DESC').all() : await env.DB.prepare('SELECT * FROM family_trees WHERE created_by=? ORDER BY updated_at DESC').bind(me.uid).all();
    return json({trees:q.results});
  }
  if(path==='/trees' && method==='POST') {
    const b=await body(request), name=clean(b.name,150); if(!name) return bad('Nama pohon wajib diisi.');
    const r=await env.DB.prepare('INSERT INTO family_trees(name,description,created_by) VALUES(?,?,?)').bind(name,clean(b.description,1000),me.uid).run(); return json({id:r.meta.last_row_id},201);
  }
  const tm=path.match(/^\/trees\/(\d+)$/);
  if(tm && method==='DELETE') {
    const id=Number(tm[1]); const t=await env.DB.prepare('SELECT * FROM family_trees WHERE id=?').bind(id).first(); if(!t) return bad('Pohon tidak ditemukan.',404); if(me.role!=='owner'&&t.created_by!==me.uid) return bad('Tidak diizinkan.',403); await env.DB.prepare('DELETE FROM family_trees WHERE id=?').bind(id).run(); return json({ok:true});
  }
  const pm=path.match(/^\/trees\/(\d+)\/persons$/);
  if(pm) {
    const treeId=Number(pm[1]); const t=await env.DB.prepare('SELECT * FROM family_trees WHERE id=?').bind(treeId).first(); if(!t) return bad('Pohon tidak ditemukan.',404); if(me.role!=='owner'&&t.created_by!==me.uid) return bad('Tidak diizinkan.',403);
    if(method==='GET') { const r=await env.DB.prepare('SELECT * FROM persons WHERE tree_id=? ORDER BY first_name,last_name').bind(treeId).all(); return json({persons:r.results}); }
    if(method==='POST') { const b=await body(request); const first=clean(b.first_name,100); if(!first) return bad('Nama depan wajib.'); const r=await env.DB.prepare('INSERT INTO persons(tree_id,first_name,last_name,gender,birth_date,death_date,birth_place,notes,photo_url) VALUES(?,?,?,?,?,?,?,?,?)').bind(treeId,first,clean(b.last_name,100),['male','female','other'].includes(b.gender)?b.gender:'other',clean(b.birth_date,30),clean(b.death_date,30),clean(b.birth_place,200),clean(b.notes,3000),clean(b.photo_url,1000)).run(); return json({id:r.meta.last_row_id},201); }
  }
  const pd=path.match(/^\/persons\/(\d+)$/);
  if(pd && method==='DELETE') { const id=Number(pd[1]); const p=await env.DB.prepare('SELECT p.*,t.created_by FROM persons p JOIN family_trees t ON t.id=p.tree_id WHERE p.id=?').bind(id).first(); if(!p)return bad('Data tidak ditemukan.',404);if(me.role!=='owner'&&p.created_by!==me.uid)return bad('Tidak diizinkan.',403);await env.DB.prepare('DELETE FROM persons WHERE id=?').bind(id).run();return json({ok:true}); }
  const rel=path.match(/^\/trees\/(\d+)\/relationships$/);
  if(rel) { const treeId=Number(rel[1]); const t=await env.DB.prepare('SELECT * FROM family_trees WHERE id=?').bind(treeId).first();if(!t)return bad('Pohon tidak ditemukan.',404);if(me.role!=='owner'&&t.created_by!==me.uid)return bad('Tidak diizinkan.',403);if(method==='GET'){const r=await env.DB.prepare('SELECT * FROM relationships WHERE tree_id=? ORDER BY id').bind(treeId).all();return json({relationships:r.results});}if(method==='POST'){const b=await body(request), a=Number(b.from_person_id), z=Number(b.to_person_id), type=b.type;if(!a||!z||a===z||!['parent','spouse'].includes(type))return bad('Relasi tidak valid.');await env.DB.prepare('INSERT OR IGNORE INTO relationships(tree_id,from_person_id,to_person_id,type) VALUES(?,?,?,?)').bind(treeId,a,z,type).run();return json({ok:true});}}
  return bad('Endpoint tidak ditemukan.',404);
}
