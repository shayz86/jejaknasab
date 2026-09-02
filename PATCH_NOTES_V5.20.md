# JejakNasab v5.20

- Member picker pencarian dipindahkan ke dalam dropdown Hubungkan ke anggota.
- Silsilah Opsional dashboard hanya menampilkan anchor yang benar-benar berada di tree utama (reachable dari root).
- Layout pohon utama dibuat deterministik berdasarkan root_person_id.
- Garis pasangan menggunakan connector khusus di antara dua kotak, bukan pseudo-element yang menempel pada kotak.
- Family Member menggunakan root tree yang sama saat merender pohon, dengan fallback root defensif.
- Sinkronisasi `public.js` dengan script utama `public/index.html`.
