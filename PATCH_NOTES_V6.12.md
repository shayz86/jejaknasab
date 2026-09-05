# JejakNasab V6.12 — Naming, Public Sync & Branch Creation Fix

Perubahan terbatas pada permintaan perbaikan terbaru:

- Terminologi UI `Owner Akun` menjadi `Pemilik Akun`.
- Terminologi UI `Family Member` menjadi `Pengelola Nasab`.
- Nama Silsilah Utama: kolom pemilihan generasi teratas dihapus dari UI.
- Jika nama silsilah dikosongkan, nama otomatis mengikuti laki-laki teratas pada Silsilah Utama.
- Anggota yang hanya berada di Cabang Keluarga (`main_visible=0`) tidak digunakan sebagai nama Silsilah Utama.
- Perubahan nama/gelar anggota memicu refresh nama otomatis Silsilah Utama.
- Link publik menggunakan nama lengkap yang mencakup gelar depan/belakang.
- Pembuatan Cabang Keluarga dibuat lebih tahan terhadap data cabang lama/inaktif dan mengaktifkan kembali record yang sesuai bila ada.
- Cabang baru tetap menyerap relasi keluarga yang sudah tersimpan di Silsilah Utama, termasuk orang tua, pasangan, dan anak yang langsung berhubungan dengan titik cabang.
- Public Branch tetap menyinkronkan anggota/relasi langsung dari Silsilah Utama sehingga penambahan relasi setelah cabang dibuat dapat terlihat di link publik.

Tidak mengubah fitur lain di luar perbaikan di atas.
