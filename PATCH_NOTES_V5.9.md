# JejakNasab V5.9

## Perbaikan
- Perbaikan alur endpoint undangan Family Member dengan fallback `/invitations/:token`.
- Link undangan tetap dapat dibuka walaupun status undangan sudah berubah, dengan informasi status.
- Tambahan endpoint GET kompatibilitas untuk token undangan.
- Tambah tombol **Klaim / Daftar Family Member** pada detail anggota di link publik; anggota wafat tidak dapat diklaim.
- Klaim dari pengunjung yang belum login disimpan sementara dan dikirim setelah login.
- Tombol **Salin** diperkuat dengan Clipboard API dan fallback pemilihan teks.
- Tambah tombol **Kirim Ulang** pada daftar undangan.
- Resend mempertahankan undangan yang sudah memiliki permintaan dan hanya mengganti token jika calon belum mengajukan permintaan.
- Tombol **Buka Link Publik** tetap membuka tab baru.
