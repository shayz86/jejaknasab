# JejakNasab — stable V3 baseline

Cloudflare Pages + D1, tanpa framework frontend.

## Deploy
1. Upload isi folder ini ke repository GitHub (jangan upload node_modules).
2. Cloudflare Pages: connect repository, production branch `main`, build command kosong, build output `public`.
3. D1 binding: `DB` → database `jejaknasab-db`.
4. Variables/Secrets: `SESSION_SECRET`, `OWNER_SETUP_KEY`, `PREMIUM_PRICE`, `ULTIMATE_PRICE`, `PAYMENT_INSTRUCTIONS`.
5. Buka `/setup-owner` hanya sekali untuk membuat Owner Web.

## Database
`schema.sql` adalah schema lengkap untuk database baru.
`migration-v3.sql` aman dijalankan pada database lama yang sudah memiliki tabel dasar.

Versi ini juga melakukan pemeriksaan ringan saat API pertama kali dipanggil untuk membuat tabel tambahan V3 jika belum ada, sehingga halaman tidak langsung blank hanya karena migration tambahan belum dijalankan.

## Paket
Premium: 10 Family Member, 3 generasi atas + 3 bawah.
Ultimate: 20 Family Member, 6 generasi atas + 6 bawah.
Owner akun bebas generasi. Pasangan/saudara langsung tidak mengurangi batas generasi; keturunan saudara mengikuti batas generasi.

## Akses
- Owner Web: administrasi pelanggan dan lihat silsilah pelanggan read-only.
- Owner Akun: kelola penuh silsilah.
- Family Member: akses/edit sesuai posisi dan batas paket.
- Public: hanya melihat informasi yang diizinkan Owner akun.
