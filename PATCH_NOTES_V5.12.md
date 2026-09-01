# JejakNasab V5.12

## Perbaikan klaim Family Member
- Permintaan klaim Owner Akun sekarang hanya menampilkan status `pending`; klaim yang sudah diterima/ditolak tidak muncul lagi di daftar Permintaan Klaim.
- Saat satu klaim disetujui, klaim pending lain untuk anggota yang sama otomatis ditolak.
- Anggota yang sudah memiliki Family Member aktif tidak dapat diklaim lagi.
- Klaim pending juga dikunci agar tidak dapat diklaim oleh pihak lain secara bersamaan.
- Link publik sekarang mengetahui status anggota: tersedia, sedang diproses, sudah diklaim, atau wafat.
- Tombol `Klaim / Daftar Family Member` disembunyikan untuk anggota yang sudah diklaim atau sedang diproses.

## Dashboard Owner Akun
- Dashboard Owner Akun sekarang fokus pada:
  1. Undangan Family Member.
  2. Permintaan Klaim Family Member.
  3. Daftar Family Member aktif.
- Bagian `Silsilah yang Saya Ikuti` tidak lagi ditampilkan pada Dashboard Owner Akun.
- Owner Akun tetap memiliki tombol `Kelola Silsilah`.
- Family Member memiliki dashboard terpisah dengan fasilitas terbatas dan hanya melihat silsilah yang telah disetujui.
- Status pending persetujuan tetap ditampilkan pada Dashboard Family Member.

## Pengelolaan Family Member
- Ditambahkan endpoint daftar Family Member per silsilah.
- Owner Akun dapat menghapus Family Member secara permanen dari silsilah.
- Penghapusan ini melepas klaim tanpa menghapus akun pengguna, sehingga anggota dapat diklaim ulang melalui link publik.

## Owner Web — penghapusan akun belum aktif
- Daftar Manajemen Member sekarang menampilkan `Hapus Permanen` hanya untuk akun Member yang:
  - status masih `pending`;
  - sudah berumur minimal 24 jam sejak pendaftaran;
  - masih memiliki pembayaran `pending`.
- Penghapusan memerlukan konfirmasi Ya/Tidak.
- Akun dan data pembayaran terkait dihapus permanen.

## Undangan
- Pembuatan undangan dicegah jika anggota sudah menjadi Family Member, sudah memiliki undangan aktif, atau sedang memiliki klaim pending.
- Tombol `Kirim Ulang` tetap tersedia untuk undangan aktif.
