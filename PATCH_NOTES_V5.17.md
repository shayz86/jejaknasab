# JejakNasab V5.17 — Nasab Ayah & Multi-Pasangan

## Fokus utama

V5.17 menjadikan struktur silsilah utama konsisten dengan konsep **Nasab**: root/generasi teratas diprioritaskan laki-laki dan disimpan secara eksplisit pada `family_trees.root_person_id`.

### Pohon nasab
- Root utama disimpan di database, bukan ditebak berbeda oleh masing-masing tampilan.
- Dashboard Owner Akun, Dashboard Family Member, Owner Web read-only, dan link publik menggunakan root yang sama.
- Backfill database memilih laki-laki tanpa orang tua terlebih dahulu.
- Jika tidak ada laki-laki top-level, sistem memakai anggota top-level sebagai fallback.
- Renderer tetap memakai hubungan `parent` untuk menentukan generasi dan `sibling_order` untuk urutan anak.

### Pasangan
- Relasi pasangan sekarang menyimpan `spouse_status`, `start_date`, dan `end_date`.
- Seorang laki-laki dapat mempunyai beberapa istri aktif.
- Seorang perempuan hanya boleh mempunyai satu suami aktif.
- Jika suami sebelumnya sudah tercatat wafat, hubungan lama otomatis diakhiri menggunakan tanggal wafat sehingga istri dapat dicatat mempunyai suami berikutnya.
- Relasi pasangan harus laki-laki ↔ perempuan.
- Riwayat pasangan tidak dihapus saat pasangan baru dibuat.
- Owner Akun dapat mengakhiri relasi pasangan dengan tanggal berakhir.

### Garis pohon
- Pasangan digambar dalam satu unit keluarga horizontal.
- Garis pasangan berada di antara kotak, bukan menempel pada kotak kiri.
- Garis vertikal turun dari unit pasangan ke garis horizontal anak.
- Anak mempunyai konektor vertikal sendiri dari garis keturunan ke kotaknya.
- Beberapa istri ditampilkan dalam unit pasangan yang sama agar suami tidak dianggap sebagai generasi baru.

## Database
- Tambahkan `family_trees.root_person_id`.
- Tambahkan `relationships.spouse_status`, `start_date`, `end_date`.
- Gunakan `migration-v5.17.sql` untuk database D1 yang sudah ada.
- Jangan reset database produksi.

## Catatan kompatibilitas
Data V5.16 tetap dipakai. Relasi spouse lama dianggap aktif sampai diberi tanggal/status akhir.
