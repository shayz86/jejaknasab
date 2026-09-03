# JejakNasab v6.00

JejakNasab adalah aplikasi silsilah keluarga berbasis Cloudflare Pages + D1 tanpa framework frontend. v6.00 menggunakan baseline v5.21 yang dikirim pengguna dan memisahkan **Pohon Silsilah Utama** dari konteks **Cabang Keluarga** tanpa menggandakan identitas orang yang sama.

## Perubahan utama v6.00

- Nama **Silsilah Opsional** diganti menjadi **Cabang Keluarga**.
- Anggota Cabang Keluarga dapat dibuat dari konteks cabang secara terpisah dari daftar anggota utama.
- Anggota utama yang sudah ada dapat dihubungkan ke cabang tanpa membuat duplikat.
- Cabang mempunyai daftar, tampilan pohon, edit, hubungan, dan pengaturan urutan anak sendiri.
- Cabang otomatis menyertakan hubungan keluarga yang sudah ada di sekitar titik cabang sesuai cakupan 2 generasi.
- Jalur samping mencakup saudara, pasangan saudara, dan keturunannya sampai 2 generasi. Jalur samping tidak membuka akses ke orang tua/mertua pasangan saudara.
- Batas Cabang Keluarga: 2 generasi ke atas + 2 generasi ke bawah dari titik cabang.
- Premium: 5 Family Member; 3 generasi ke atas + 2 generasi ke bawah; pasangan/saudara + 2 generasi keturunan jalur samping.
- Ultimate: 20 Family Member; 6 generasi ke atas + 6 generasi ke bawah; pasangan/saudara + 2 generasi keturunan jalur samping.
- Owner bebas membuat dan mengelola anggota.
- Dashboard Family Member memakai graph utama yang sama dengan Owner, tetapi hanya pada wilayah yang diizinkan.
- Dashboard menampilkan daftar Cabang Keluarga secara ringkas; pohon cabang dibuka melalui modal.
- Search anggota ditempatkan di dalam dropdown **Hubungkan ke anggota yang sudah ada**.
- Password pendaftaran memiliki konfirmasi dua kolom dan icon mata. Login memiliki icon mata.
- Data diri mendukung **gelar depan** dan **gelar belakang**, yang ikut tampil pada pohon.
- Riwayat perubahan tetap hanya tersedia untuk Owner Akun.
- Pendaftaran Owner Akun tetap berstatus menunggu aktivasi/verifikasi Owner Web; struktur payment request disiapkan agar payment gateway dapat ditambahkan kemudian.
- Perbaikan defensif terhadap dashboard/endpoint agar Owner Akun dan Family Member tidak jatuh ke error endpoint 404 akibat konteks dashboard.

## Aturan konteks data

**Pohon Utama** adalah sumber hubungan nasab utama.

**Cabang Keluarga** adalah konteks tambahan yang menunjuk pada anggota utama sebagai titik cabang. Identitas orang tetap satu. Jika orang yang sama sudah ada di Pohon Utama, cabang menggunakan `person_id` yang sama. Jika orang baru dibuat khusus untuk cabang, `main_visible=0` sehingga tidak muncul di Pohon Utama sampai suatu saat sengaja dihubungkan ke konteks utama.

## Database

- `schema.sql` adalah schema lengkap untuk database baru.
- `migration-v6.sql` menambahkan tabel/index v6 secara aman.
- API menjalankan upgrade kolom secara idempotent untuk database D1 lama, termasuk `title_prefix`, `title_suffix`, `main_visible`, `optional_lineages.branch_id`, dan struktur Cabang Keluarga.
- Data `optional_lineages` v5.21 dimigrasikan menjadi `family_branches` pada request pertama setelah v6 aktif; data lama tidak dihapus.
- **Jangan reset atau hapus database D1 produksi.**

## Deploy

1. Upload/push isi folder ke repository GitHub. Jangan upload `node_modules`.
2. Cloudflare Pages: production branch `main`, build command kosong, output directory `public`.
3. D1 binding: `DB` → database JejakNasab.
4. Variables/Secrets: `SESSION_SECRET`, `OWNER_SETUP_KEY`, `PREMIUM_PRICE`, `ULTIMATE_PRICE`, `PAYMENT_INSTRUCTIONS`.
5. `/setup-owner` hanya dipakai sekali untuk membuat Owner Web.

## Paket

| Paket | Family Member | Atas | Bawah | Jalur samping |
|---|---:|---:|---:|---|
| Owner | bebas | bebas | bebas | bebas |
| Premium | 5 | 3 | 2 | saudara + pasangan + 2 generasi keturunan |
| Ultimate | 20 | 6 | 6 | saudara + pasangan + 2 generasi keturunan |

## Cabang Keluarga

- Titik cabang adalah anggota utama.
- Maksimal 2 generasi ke atas dan 2 generasi ke bawah.
- Saudara dan pasangan saudara dapat menjadi jalur samping.
- Keturunan jalur samping maksimal 2 generasi.
- Orang tua/mertua pasangan saudara tidak dapat dibuat melalui jalur tersebut.
- Urutan anak cabang disimpan terpisah dari `sibling_order` Pohon Utama.

## Catatan pembayaran Owner Akun

v6.00 mempertahankan alur yang sudah ada: pendaftaran Owner Akun membuat akun berstatus `pending` dan payment request `pending`. Owner Web dapat melakukan verifikasi/aktivasi. Payment gateway nyata dapat ditambahkan pada tahap berikutnya tanpa mengubah model akun/cabang.

## Rilis

Lihat `V6.00_RELEASE.md` untuk ringkasan perubahan dan migrasi.
