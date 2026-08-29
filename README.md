# JejakNasab V3

Upgrade JejakNasab berbasis Cloudflare Pages + D1.

## Paket
- Premium: maksimal 10 Family Member; 3 generasi ke atas dan 3 ke bawah.
- Ultimate: maksimal 20 Family Member; 6 generasi ke atas dan 6 ke bawah.
- Owner akun tidak dibatasi generasi.
- Pasangan dan saudara langsung tidak dihitung sebagai batas generasi; keturunan saudara mengikuti batas generasi.

## Akses
- Owner Web/platform: administrasi member dan pembayaran, serta **read-only** untuk pohon pelanggan.
- Owner Akun: kontrol penuh terhadap pohon miliknya.
- Family Member: akses berdasarkan posisi dirinya pada pohon dan batas paket.
- Publik: read-only melalui link share; profil mengikuti privasi per anggota.

## Privasi
Default publik per anggota:
- nama: tampil
- usia: tampil
- tanggal lahir: sembunyi
- tempat lahir: sembunyi
- foto: sembunyi

Hanya Owner Akun yang dapat mengubah privasi publik.

## Data anggota
Tanggal meninggal opsional. Anggota yang sudah ada dapat diedit.

## Migrasi database yang sudah ada
**Jangan jalankan schema.sql lama untuk database produksi.**
Gunakan `migration-v3.sql` satu kali pada D1 produksi karena database kamu sudah memiliki tabel dasar.

Contoh dari lingkungan yang sudah memiliki Wrangler terautentikasi:

```bash
npx wrangler d1 execute jejaknasab-db --remote --file=migration-v3.sql
```

Jika memakai Cloudflare Dashboard, buka D1 `jejaknasab-db` dan jalankan isi `migration-v3.sql` pada SQL console.

## Environment variables / secrets
Production:
- `SESSION_SECRET`
- `OWNER_SETUP_KEY`
- `PREMIUM_PRICE` (contoh 50000)
- `ULTIMATE_PRICE` (contoh 100000)
- `PAYMENT_INSTRUCTIONS`

D1 binding harus tetap:
- Variable name: `DB`
- Database: `jejaknasab-db`

## Deploy
Project memakai Git integration Cloudflare Pages. Push ke branch `main` untuk deployment otomatis.

Pastikan `node_modules/` tidak masuk Git.
