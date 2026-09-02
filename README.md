# JejakNasab — V5.17

Cloudflare Pages + D1, tanpa framework frontend.

## Perbaikan V4
- Tanggal lahir dan tanggal meninggal pada form anggota memiliki label yang jelas. Tanggal meninggal **opsional**, kosong berarti masih hidup/belum dicatat.
- Edit anggota memakai form lengkap: nama depan, nama belakang, gender, tanggal lahir, tanggal meninggal, tempat lahir, catatan, dan URL foto. Semua field dapat diubah atau dikosongkan.
- Pengaturan **Info Publik** per anggota: Nama, Usia, Tanggal lahir, Tempat lahir, Foto.
- Pohon publik sekarang menampilkan data sesuai privasi dan relasi pasangan, bukan nama saja.
- Link publik baru memakai token pendek agar URL lebih ringkas. Token lama otomatis dipendekkan saat Owner membuka pengaturan publik.
- Undangan Family Member tidak lagi meminta ID anggota. Owner memilih anggota dari dropdown.
- Undangan dapat dibuat dengan email atau nomor WhatsApp, lalu link dapat dikirim melalui WhatsApp, email, atau disalin.
- Penerima tetap harus mendaftar sebagai Member/Family Member. Setelah login, penerima mengajukan bergabung dan Owner Akun harus **Terima/Tolak** sebelum akses Family Member aktif.
- Batas satu silsilah per Owner Akun tetap dijaga oleh backend.

## Deploy
1. Upload isi folder ini ke repository GitHub (jangan upload node_modules).
2. Cloudflare Pages: connect repository, production branch `main`, build command kosong, build output `public`.
3. D1 binding: `DB` → database JejakNasab.
4. Variables/Secrets: `SESSION_SECRET`, `OWNER_SETUP_KEY`, `PREMIUM_PRICE`, `ULTIMATE_PRICE`, `PAYMENT_INSTRUCTIONS`.
5. `/setup-owner` hanya digunakan sekali untuk membuat Owner Web.

## Database
`schema.sql` adalah schema lengkap untuk database baru.
`migration-v3.sql` berisi migration sebelumnya; API V4 juga melakukan upgrade ringan otomatis pada tabel undangan untuk database lama dengan menambahkan kolom yang diperlukan jika belum ada.

**Jangan reset atau hapus database D1 yang sudah berisi data.**

## Paket
- Premium: 10 Family Member, 3 generasi atas + 3 bawah.
- Ultimate: 20 Family Member, 6 generasi atas + 6 bawah.
- Owner akun bebas generasi.

## Akses
- Owner Web: administrasi pelanggan dan lihat silsilah pelanggan read-only.
- Owner Akun: kelola penuh satu silsilah miliknya, termasuk publikasi, privasi, undangan, dan persetujuan Family Member.
- Family Member: akses/edit sesuai posisi dan batas paket.
- Public: hanya melihat informasi yang diizinkan Owner Akun.

## V5.1
Perbaikan: nama silsilah manual/otomatis, edit nama silsilah, profil publik interaktif, salin link dengan fallback, garis relasi, dan upgrade Premium ke Ultimate diskon 40%.


## V5.4 perubahan terakhir
- Edit silsilah: nama manual atau default otomatis mengikuti laki-laki teratas.
- Arah relasi: anggota baru dapat menjadi anak atau orang tua dari anggota yang dipilih.
- Edit anggota mencakup seluruh data dan tanggal meninggal opsional.
- Undangan Family Member memakai pilihan nama, email/WhatsApp, lalu persetujuan Owner Akun.
- Link publik memiliki tombol buka, salin dengan fallback browser HP, konfirmasi private, dan anti-cache.
- Urutan anak disimpan berdasarkan `sibling_order` dan dipakai juga oleh pohon publik.
- Daftar anggota dibuat ringkas dalam dropdown dan diurutkan dari generasi teratas; laki-laki lebih dulu pada generasi yang sama.

## V5.17 — Nasab Ayah & Multi-Pasangan

V5.17 memperkuat identitas JejakNasab sebagai aplikasi nasab berbasis garis ayah.

- Root silsilah utama disimpan pada `family_trees.root_person_id` dan diprioritaskan laki-laki.
- Dashboard Owner Akun, Family Member, Owner Web read-only, dan publik memakai root yang sama.
- Hubungan orang tua → anak menentukan generasi; `sibling_order` menentukan urutan saudara.
- Relasi pasangan menyimpan status aktif/berakhir serta tanggal mulai/berakhir.
- Seorang laki-laki dapat memiliki beberapa istri; seorang perempuan hanya memiliki satu suami aktif.
- Jika suami sebelumnya tercatat wafat, hubungan lama dapat diakhiri otomatis ketika pasangan berikutnya dicatat.
- Riwayat pasangan tidak dihapus.
- Owner Akun dapat mengakhiri hubungan pasangan dari menu **Pasangan & Riwayat**.
- Garis pasangan digambar di antara kotak; garis keturunan turun dari tengah unit pasangan ke garis anak lalu ke setiap anak.

### Migrasi V5.17

Untuk database D1 yang sudah dipakai, jalankan `migration-v5.17.sql` satu kali. Jangan menjalankan `schema.sql` untuk mereset database produksi dan jangan menghapus database lama.

## V5.21
Perbaikan konsistensi graph/root pada dashboard Family Member agar pohon silsilah dan daftar Silsilah Opsional mengikuti data yang sama dengan Owner dan link publik.
