# JejakNasab v5.21

## Fokus
Memperbaiki bug utama pada dashboard Family Member: pohon silsilah tampil hanya sebagai root/berbeda dari Owner dan link publik, sehingga Silsilah Opsional juga tidak terdeteksi.

## Perubahan
1. Endpoint data anggota (`/trees/:id/persons`) sekarang mengembalikan **hanya wilayah silsilah yang memang dapat diakses Family Member**, bukan seluruh anggota dengan relasi yang tersaring.
2. Backend menghitung `root_person_id` efektif untuk tampilan Family Member berdasarkan root silsilah utama dan graph yang benar-benar tersedia bagi member.
3. Dashboard Family Member/openTree menggunakan `root_person_id` yang dikirim backend sebelum membangun pohon.
4. Dengan person + relationship graph yang konsisten, pohon Family Member sekarang mengikuti struktur Owner/link publik, sesuai batas akses Family Member.
5. Daftar **Silsilah Opsional** kembali dapat mendeteksi anchor yang merupakan anggota tree utama, karena `S.persons` dan `S.rels` tidak lagi berasal dari dua cakupan berbeda.

## Database
Tidak memerlukan migration database.
