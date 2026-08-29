# JejakNasab V2

Aplikasi silsilah keluarga untuk Cloudflare Pages + Cloudflare D1. Tidak membutuhkan server VPS.

## Fitur
- Login Owner dan Member.
- Registrasi member baru berbayar: akun masuk status `pending` sampai owner mengaktifkan setelah pembayaran.
- Owner dapat melihat pendaftar, mengaktifkan/menangguhkan member, dan mengelola pohon keluarga.
- Member aktif dapat membuat pohon keluarga sendiri dan mengelola anggota serta hubungan orang tua/pasangan.
- Tampilan silsilah sederhana, responsif, tanpa framework frontend.
- Password disimpan dengan PBKDF2-SHA-256 + salt, bukan plaintext.
- Session memakai cookie HttpOnly + HMAC signed token.
- Database memakai Cloudflare D1.

## Deploy gratis Cloudflare
1. Buat repository GitHub baru, lalu upload seluruh isi folder ini.
2. Cloudflare Dashboard -> Workers & Pages -> Create -> Pages -> Connect to Git.
3. Pilih repository. Build command kosong; output directory `public`.
4. Buat D1 Database bernama `jejaknasab-db`.
5. Ganti `REPLACE_WITH_YOUR_D1_DATABASE_ID` di `wrangler.toml` dengan database ID D1.
6. Jalankan:
   `npx wrangler d1 execute jejaknasab-db --remote --file=schema.sql`
7. Deploy Pages.
8. Di Cloudflare Pages -> Settings -> Variables and Secrets, tambahkan:
   - `SESSION_SECRET`: string acak panjang (minimal 32 karakter).
   - `OWNER_SETUP_KEY`: string rahasia untuk membuat owner pertama.
   - `MEMBERSHIP_PRICE`: harga pendaftaran, contoh `50000`.
   - `PAYMENT_INSTRUCTIONS`: instruksi pembayaran, contoh rekening/e-wallet Anda.
9. Buka `https://DOMAIN-ANDA.pages.dev/setup-owner` dan buat owner pertama menggunakan `OWNER_SETUP_KEY`. Route ini ditangani oleh frontend, jadi Cloudflare Pages akan tetap menyajikan `index.html` dan aplikasi akan menampilkan halaman Setup Owner.
10. Setelah owner berhasil dibuat, halaman setup tidak dapat dipakai lagi.

## Catatan pembayaran
Versi ini menggunakan aktivasi pembayaran manual agar benar-benar bisa berjalan tanpa layanan pembayaran berbayar. Member mendaftar -> akun pending -> melakukan pembayaran sesuai instruksi -> owner memeriksa -> owner klik Aktifkan.

Untuk pembayaran otomatis, backend dapat ditambahkan integrasi Midtrans/Xendit/Tripay tanpa mengubah model data utama.

## Lokal
`npm install`
`npx wrangler pages dev public`

Untuk lokal dengan D1, gunakan binding D1 sesuai dokumentasi Wrangler.
