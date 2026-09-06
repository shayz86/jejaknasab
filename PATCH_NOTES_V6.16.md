# JejakNasab V6.16

## Fokus update
V6.16 memperbaiki **algoritma pembentukan graph Cabang Keluarga**, bukan hanya tampilan.

### Aturan Cabang Keluarga
- Silsilah Utama tetap mengikuti nasab ayah kandung; root generasi utama adalah laki-laki/ayah, bukan anchor cabang.
- Anggota yang berada sebagai pasangan pada garis `-` dapat menjadi anchor Cabang Keluarga, baik laki-laki maupun perempuan.
- Cabang anchor mengambil pasangan dan anak-anak anchor dari Silsilah Utama.
- Cabang mengambil orang tua anchor sampai 2 generasi ke atas dan pasangan dari orang tua yang dipilih.
- Cabang mengambil saudara kandung anchor, pasangan saudara, serta keturunan saudara sampai 2 generasi ke bawah.
- Sistem tidak merambat ke atas melalui pasangan saudara.
- Relasi dan anggota yang dibuat khusus di Cabang tetap dipertahankan, termasuk anggota seperti ayah Hj. Chodidjah yang hanya dibuat di Cabang.

### Perbaikan teknis
- Graph Cabang dashboard dan graph Cabang publik sekarang memakai satu algoritma perluasan konteks yang sama.
- Endpoint Cabang tetap toleran terhadap data/schema lama.
- Relasi khusus `branch_relationships` tetap digabung dengan relasi dari Silsilah Utama.
- Anggota tambahan yang hanya ada di Cabang tetap dimuat.
- Nama anchor Cabang tidak lagi dapat berubah hanya karena isi `branch_members` lama tidak lengkap.
- Penanda runtime diperbarui menjadi V6.16 (`<title>` dan `application-version`).
- Health API diperbarui menjadi versi 6.16.
- Tidak mengubah fitur Silsilah Utama, Pengelola Nasab, privasi, klaim, atau publikasi di luar kebutuhan Cabang Keluarga.

## Kasus uji utama
1. **Nur Rahmalia A.Md** harus menjadi anchor Cabang dan menampilkan pasangan, anak, orang tua, saudara, pasangan saudara, dan keturunan saudara sesuai batas Cabang.
2. **Hj. Chodidjah** harus dapat menampilkan ayah yang dibuat khusus di Cabang walaupun ayah tersebut bukan anggota Silsilah Utama.
3. **Abdi** sebagai suami anggota jalur utama tetap dapat menjadi anchor Cabang karena posisinya sebagai pasangan, walaupun bukan jalur nasab utama.
