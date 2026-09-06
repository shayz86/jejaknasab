# JejakNasab V6.13 — Nama Otomatis Utama & Dashboard Cabang/Riwayat

## Perubahan
- Memperbaiki nama silsilah otomatis: saat **Nama silsilah** dikosongkan, sistem memprioritaskan `root_person_id` dari **Silsilah Utama** yang laki-laki dan `main_visible=1`.
- Jika root tersimpan tidak valid, sistem mencari laki-laki teratas dari Silsilah Utama (`main_visible=1`) dan bukan anggota yang hanya berada di Cabang Keluarga.
- Menambahkan accordion **🌿 Daftar Cabang Keluarga** pada Dashboard Pemilik Akun.
- Daftar Cabang Keluarga menampilkan titik cabang, jumlah anggota, serta tombol Lihat/Edit.
- Menambahkan accordion **🕘 Riwayat Pengeditan** tepat di bawah Daftar Cabang Keluarga.
- Riwayat menggunakan `audit_logs` yang sudah ada dan menampilkan pelaku, waktu, jenis perubahan, serta detail bila tersedia.
- Menambahkan pencatatan audit saat nama/deskripsi silsilah diubah dan saat anggota utama dihapus.
- Saat anggota utama dihapus, nama otomatis dan root silsilah dihitung ulang.

## Kompatibilitas
- Tidak mengubah struktur role internal.
- Tidak mengubah batas paket, aturan Cabang Keluarga, privasi, undangan, klaim, maupun fitur publik lainnya.
- Tidak membutuhkan migration database baru karena tabel `audit_logs` sudah tersedia pada V6.12.
