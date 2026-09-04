# JejakNasab V6.07 — Public Branch Link

Perubahan KHUSUS fitur link publik ke Cabang Keluarga.

- Memulihkan/menegaskan tombol "Lihat Cabang Keluarga" ketika pengunjung mengetuk anggota yang menjadi titik cabang.
- Tombol membuka Cabang Keluarga di tab baru.
- Endpoint publik mengembalikan daftar family_branches secara aman tanpa bergantung pada kolom `active` yang mungkin tidak ada pada database lama.
- Endpoint publik untuk `?branch=ID` menggunakan cabang milik tree yang sama dan menghormati cabang nonaktif jika kolom `active` tersedia.
- Tidak mengubah dashboard Owner, Family Member, paket, zoom, atau fitur lain.
- Tidak melakukan reset/migrasi database.
