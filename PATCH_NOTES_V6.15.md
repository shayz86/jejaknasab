# JejakNasab V6.15

## Perbaikan utama
- Runtime `public/index.html` disinkronkan dengan `public.js`, sehingga perubahan dashboard Pemilik Akun benar-benar ikut ter-deploy.
- Menu **Daftar Cabang Keluarga** dan **Riwayat Pengeditan** hanya tampil di dashboard **Pemilik Akun**, tidak di dashboard Pengelola Nasab.
- Cabang Keluarga membaca graph silsilah utama untuk menampilkan konteks anchor: pasangan + anak, orang tua (hingga 2 generasi), saudara, pasangan saudara, dan keturunan saudara sesuai aturan cabang.
- Anggota yang dibuat khusus di Cabang Keluarga tetap dipertahankan melalui `branch_members`/`branch_relationships`, sehingga data seperti ayah Chodidjah yang baru dibuat di cabang dapat tampil.
- Skema lama `family_branches` dibuat kompatibel dengan kolom `active`, sehingga cabang lama tidak hilang dari daftar hanya karena database dibuat pada versi sebelumnya.
- Endpoint cabang dibuat toleran terhadap schema legacy dan tetap mengabaikan cabang yang secara eksplisit `active=0`.
- Penanda health API dinaikkan ke v6.15.

## Aturan Cabang Keluarga yang dipertahankan
Untuk anchor, cabang menampilkan:
1. Anchor + pasangan + anak-anak dari pohon utama.
2. Orang tua anchor hingga 2 generasi ke atas, beserta pasangan masing-masing.
3. Saudara kandung anchor.
4. Pasangan saudara.
5. Keturunan saudara hingga 2 generasi ke bawah.
6. Tidak merambat ke atas melalui pasangan saudara.
7. Anggota tambahan yang dibuat khusus di cabang tetap menjadi bagian cabang dan tidak otomatis menjadi Silsilah Utama.
