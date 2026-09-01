# JejakNasab v5.18

## Perbaikan Silsilah Opsional
- Silsilah opsional tidak lagi ditampilkan sebagai miniatur/cabang sederhana.
- Dashboard Owner menampilkan silsilah opsional dengan model pohon yang sama seperti silsilah utama.
- Setiap cabang opsional memiliki border sendiri dan fokus pada anggota yang menjadi titik cabang.
- Klik anggota/titik cabang pada silsilah publik menampilkan tombol menuju halaman pohon silsilah opsional.
- Halaman opsional memakai URL tersembunyi berbasis link publik utama dan tidak mengubah pohon nasab utama.
- Nama halaman silsilah opsional mengikuti laki-laki teratas yang tersedia pada cabang tersebut.
- Relasi opsional dibuat menjadi connector pohon (Ayah/Ibu/Kakek/Nenek = orang tua, Anak = keturunan, Suami/Istri = pasangan).
- Data silsilah utama tetap menjadi sumber data utama; cabang opsional hanya menggunakan relasi yang ditandai sebagai opsional.

## Tampilan publik
- Klik nama anggota yang memiliki silsilah opsional menampilkan tombol menuju pohon opsional di tab/halaman yang sama dengan URL tersembunyi.
- Halaman opsional hanya menampilkan komponen cabang opsional yang terkait dengan anggota tersebut, sehingga anggota dari nasab utama tidak ikut tercampur.
