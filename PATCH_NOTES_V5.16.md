# JejakNasab V5.16 — Tree Layout Fix

## Perbaikan utama

- Memperbaiki regresi V5.15 yang membuat beberapa akar pohon silsilah ditumpuk vertikal sehingga generasi terlihat seperti berpindah-pindah posisi.
- Semua root/component pohon sekarang ditempatkan berdampingan pada satu area horizontal, bukan ditumpuk sebagai generasi baru.
- Setiap cabang keluarga menggunakan lebar intrinsik (`max-content`) dan tidak boleh menyusut, sehingga node anak tidak bertabrakan/menimpa cabang lain.
- Area pohon tetap dapat digeser horizontal pada layar HP.
- Layout dashboard Owner, Family Member, dan link publik tetap memakai renderer yang sama.
- Urutan anak tetap mengikuti `sibling_order`, lalu urutan relasi, kemudian nama sebagai fallback.

## Catatan

Patch ini hanya memperbaiki renderer/layout. Data anggota dan relasi keluarga tidak diubah.
