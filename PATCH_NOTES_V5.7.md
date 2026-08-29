# JejakNasab V5.7

- Memperbaiki tampilan publik: pohon tetap hanya menampilkan nama + usia; detail muncul setelah nama diketuk.
- Menambahkan tahun wafat di pohon publik.
- Menambahkan `Catatan` ke pengaturan info publik; catatan hanya tampil di detail anggota jika diizinkan Owner.
- Menambahkan pengaturan info publik massal untuk semua anggota.
- Mengurutkan daftar pengaturan anggota mengikuti hierarki generasi: generasi teratas, pasangan, anak sesuai sibling order, lalu cabang berikutnya.
- Memperkuat fungsi salin dengan Clipboard API + fallback pemilihan teks.
- Link WhatsApp/email undangan tetap menggunakan navigasi langsung.
- Menambahkan migrasi `show_notes` untuk database lama; runtime juga melakukan `ALTER TABLE` aman saat diperlukan.
- Link undangan menggunakan endpoint API yang tersedia di Functions dan tidak mengubah token undangan yang sudah tersimpan.
