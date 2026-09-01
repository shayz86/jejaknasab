# JejakNasab V5.15 — Family Member cleanup & canonical tree order

## Perbaikan

- Daftar Undangan Owner Akun sekarang hanya menampilkan undangan dengan status `pending`. Undangan yang sudah diterima/ditolak tidak muncul lagi.
- Saat Family Member dihapus permanen dari sebuah silsilah, seluruh undangan dan permintaan klaim untuk anggota tersebut dibersihkan.
- Jika akun Family Member tidak lagi memiliki silsilah yang diikuti dan tidak memiliki silsilah miliknya sendiri, akun Family Member ikut dihapus permanen sehingga email dapat digunakan untuk pendaftaran ulang.
- Jika akun Family Member masih mengikuti silsilah lain, akun tidak dihapus dan tetap dapat digunakan pada silsilah tersebut.
- Pendaftaran Family Member melalui undangan/klaim dapat membersihkan akun Family Member lama yang sudah menjadi akun yatim (tidak punya silsilah, membership, undangan pending, atau klaim pending), sehingga email dapat dipakai kembali tanpa mengubah akun Owner Akun.
- Renderer pohon Family Member dan pohon publik/Owner disatukan pada layout traversal yang sama.
- Urutan anak memakai `sibling_order`, lalu urutan relasi yang stabil, kemudian nama sebagai fallback; ini mencegah perubahan urutan antar tampilan Family Member, Owner, dan publik.
