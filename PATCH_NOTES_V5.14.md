# JejakNasab V5.14

## Perbaikan

- Pendaftaran dari halaman utama sekarang selalu **Daftar Owner Akun**.
- Pendaftaran Family Member hanya dapat berasal dari undangan WhatsApp atau klaim anggota pada link publik.
- Klaim publik divalidasi server-side sebelum akun Family Member dibuat.
- Klaim publik membuat `claim_request` secara atomik saat pendaftaran sehingga tidak lagi bergantung pada request JavaScript kedua.
- Family Member tidak dapat membuat silsilah sendiri melalui API dan tidak dapat melakukan upgrade Premium/Ultimate.
- Login dari halaman utama tidak lagi membawa sisa konteks undangan/klaim dari localStorage.
- Login dari halaman undangan tetap mempertahankan token undangan.
- Daftar undangan Owner Akun hanya menampilkan undangan dengan status `pending`; undangan yang sudah diterima/ditolak otomatis hilang dari daftar tanpa perlu hapus manual.
- Status klaim tetap diselesaikan saat undangan diterima: requester yang diterima menjadi `approved`, klaim lain untuk anggota yang sama menjadi `rejected`.

## Catatan

- Data undangan yang sudah diproses tetap disimpan di database untuk audit, tetapi tidak lagi ditampilkan sebagai undangan aktif.
- Tidak ada perubahan struktur database pada patch ini.
