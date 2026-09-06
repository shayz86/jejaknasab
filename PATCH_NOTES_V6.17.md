# JejakNasab V6.17 — Perbaikan Algoritma Cabang Keluarga

## Perubahan utama
1. Cabang Keluarga otomatis disinkronkan ketika ditemukan hubungan orang tua di luar Silsilah Utama dengan anggota yang berada di Silsilah Utama.
2. Sinkronisasi memeriksa hubungan parent pada `relationships`, `branch_relationships`, dan legacy `optional_lineages`.
3. Anggota anak/main-visible menjadi anchor Cabang; orang tua `main_visible=0` menjadi anggota khusus Cabang.
4. Daftar Cabang pada API owner/member dan daftar Cabang pada API publik melakukan sinkronisasi sebelum mengembalikan hasil, sehingga tombol/link Cabang dapat muncul tanpa pembuatan manual terpisah.
5. Dashboard Pengelola Nasab yang mewakili anggota yang memiliki Cabang Keluarga kini menampilkan pohon Cabang Keluarga tersebut menggunakan `branchGraph` yang sama dengan tampilan Owner dan Link Publik.
6. Tampilan Cabang pada dashboard Pengelola Nasab memakai root dari konteks Cabang, bukan root hasil penyaringan Silsilah Utama.
7. Fitur pengelolaan anggota Cabang dari V6.17 sebelumnya tetap dipertahankan: Edit/Hapus anggota yang hanya dibuat di Cabang.

## Tidak diubah
- Struktur utama Silsilah Utama.
- Hak akses Owner/Pengelola Nasab.
- Fitur publikasi dan privacy.
- Algoritma tampilan Cabang Owner/Public yang sudah benar.
