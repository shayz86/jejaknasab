# JejakNasab V5.6 — Tree Workspace & Action Links Fix

Perbaikan berdasarkan pengujian 29 Agustus 2026:

- Area pohon pada menu Owner/Family Member memakai workspace horizontal/vertikal yang benar-benar dapat digeser sampai batas konten.
- Konten pohon menggunakan lebar `max-content` sehingga tidak terpotong di sisi kiri seperti versi sebelumnya.
- Ditambahkan zoom `− / + / Reset` pada pohon pengelolaan.
- Tombol Buka Link Publik menggunakan navigasi anchor langsung agar lebih kompatibel di Chrome Android.
- Tombol Kirim WhatsApp pada hasil pembuatan undangan menggunakan link WhatsApp langsung (`https://wa.me/...`).
- Tombol Kirim Email menggunakan `mailto:` langsung.
- Tombol Salin tetap memakai Clipboard API dan fallback pemilihan teks jika browser menolak clipboard otomatis.
- Fallback salin undangan dibiarkan lebih lama agar pengguna dapat menekan lama dan memilih Salin bila browser memblokir clipboard.
- Perubahan tidak memerlukan migrasi database baru.

## Deployment

Ekstrak ZIP ke repository, lalu:

```bash
git add .
git commit -m "Fix tree workspace and invitation action links"
git push origin main
```

Jangan menjalankan migration/init database hanya untuk perubahan ini.
