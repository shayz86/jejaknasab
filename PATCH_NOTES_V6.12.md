# JejakNasab V6.12 — Terminologi, Nama Silsilah, Sinkronisasi Publik & Cabang

## Perubahan
- Mengubah label pengguna **Owner Akun** menjadi **Pemilik Akun** pada antarmuka.
- Mengubah label **Family Member** menjadi **Pengelola Nasab** pada antarmuka.
- Menghapus pilihan **Generasi teratas** dari dialog Edit Silsilah.
- Nama Silsilah Utama sekarang otomatis mengikuti laki-laki teratas pada silsilah utama apabila kolom nama dikosongkan.
- Nama otomatis hanya mengambil anggota `main_visible=1`, sehingga anggota yang hanya berada di Cabang Keluarga tidak dapat menjadi sumber nama Silsilah Utama.
- Saat gelar/nama anggota utama diubah, nama Silsilah yang menggunakan mode otomatis ikut diperbarui.
- Link publik sekarang menggunakan nama lengkap anggota termasuk gelar depan/belakang.
- Memperbaiki pembuatan Cabang Keluarga agar tidak gagal HTTP 500 ketika terdapat record cabang lama/inaktif dengan anchor yang sama.
- Saat mengaktifkan kembali record cabang lama, anggota dan relasi cabang dibangun ulang dari hubungan langsung di Silsilah Utama.
- Cabang baru mencakup konteks keluarga langsung: pasangan, anak, orang tua, saudara, pasangan saudara, serta anak saudara sesuai batas cabang.
- Status Cabang Keluarga pada link publik tetap mengikuti data cabang yang tersimpan.

## Kompatibilitas
- Tidak mengubah nilai role internal (`owner` / `member`).
- Endpoint pemilihan root lama tetap tersedia untuk kompatibilitas data, tetapi tidak lagi ditampilkan pada UI.
- Perubahan hanya menyentuh terminologi UI, nama otomatis, sinkronisasi nama publik, dan logika Cabang Keluarga.
