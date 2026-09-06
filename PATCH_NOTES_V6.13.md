# JejakNasab V6.13 — Root Otomatis, Accordion Cabang & Riwayat Pengeditan

## Perubahan
- Memperbaiki nama Silsilah Utama otomatis agar selalu mengambil laki-laki teratas dari Silsilah Utama (`main_visible=1`), bukan anggota Cabang Keluarga.
- Root lama yang menunjuk anggota Cabang Keluarga tidak lagi dipertahankan sebagai root utama; sistem akan memilih root laki-laki yang valid dari Silsilah Utama.
- Endpoint root lama tetap dipertahankan untuk kompatibilitas, tetapi hanya menerima anggota Silsilah Utama.
- Menambahkan menu accordion **Daftar Cabang Keluarga** di bawah Pohon Silsilah Utama pada tampilan pengelolaan Silsilah.
- Menambahkan menu accordion **Riwayat Pengeditan** tepat di bawah Daftar Cabang Keluarga.
- Riwayat mengambil data dari `audit_logs` yang sudah digunakan aplikasi dan menampilkan waktu, pengguna, jenis perubahan, serta detail perubahan bila tersedia.
- Menambah pencatatan perubahan nama/deskripsi silsilah, perubahan anggota, hubungan, privasi, dan pengurutan anak.
- Daftar Cabang Keluarga menggunakan nama lengkap titik cabang termasuk gelar.

## Kompatibilitas
- Tidak mengubah role internal `owner` / `member`.
- Tidak mengubah fitur publik, login, undangan, klaim, pengelolaan pasangan, atau struktur Cabang Keluarga selain perbaikan root otomatis dan tampilan menu yang diminta.
- Tidak memerlukan migrasi database baru karena tabel `audit_logs` dan struktur Cabang Keluarga sudah tersedia pada V6.12.
