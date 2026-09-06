# JejakNasab V6.17 — Algoritma Cabang Keluarga

## Perubahan utama

V6.17 memperbaiki dasar pembentukan Cabang Keluarga:

- Seorang anggota Silsilah Utama dapat menjadi titik awal Cabang Keluarga apabila orang tuanya berada di luar Silsilah Utama.
- Ketika orang tua tersebut dibuat sebagai anggota khusus Cabang (`main_visible=0`) dan dihubungkan sebagai orang tua dari anggota Silsilah Utama, Cabang Keluarga untuk anak tersebut dibuat otomatis.
- Anchor Cabang tetap anak/anggota Silsilah Utama, bukan orang tua yang berada di luar Silsilah Utama.
- Hubungan orang tua khusus Cabang disimpan sebagai relasi `parent` di Cabang, sehingga tampil di atas anchor dan tetap dapat dikelola.
- Konteks Cabang tetap mengambil pasangan, anak, orang tua, saudara, pasangan saudara, dan keturunan sesuai aturan Cabang yang sudah ada.
- Fitur pengelolaan anggota Cabang dari V6.17 sebelumnya tetap dipertahankan: anggota khusus Cabang dapat diedit/dihapus tanpa menghapus anggota yang berasal dari Silsilah Utama.

## Contoh

Jika Silsilah Utama memiliki `Chodidjah`, lalu dibuat `Ayah Chodidjah` hanya di Cabang dan dihubungkan:

`Ayah Chodidjah -> Chodidjah`

maka sistem otomatis membuat:

`Cabang Keluarga Chodidjah`

dengan Chodidjah sebagai anchor dan Ayah Chodidjah sebagai orang tua Cabang.

## Bukan perubahan

- Tidak mengubah konsep nasab utama.
- Tidak mengubah data anggota Silsilah Utama menjadi anggota Cabang.
- Tidak membuat salinan pasangan/anak yang sudah berada di Silsilah Utama.
