# JejakNasab V5.11

## Perbaikan Family Member & Undangan
- Memperbaiki `completePendingClaim` yang sebelumnya belum didefinisikan; ini menyebabkan login owner/member menampilkan `completePendingClaim is not defined` dan dashboard baru tampil setelah refresh.
- Menambahkan pemulihan pending invitation dan pending claim dari localStorage.
- Alur `Daftar Family Member` dari halaman undangan kini membuka formulir pendaftaran langsung di halaman, lebih kompatibel dengan browser/in-app browser WhatsApp.
- Pendaftaran melalui undangan/claim tidak menampilkan Premium/Ultimate dan tidak membuat payment request.
- Menambahkan `/api/my/family-status` untuk membedakan Family Member aktif/pending dari Owner Akun.
- Dashboard Family Member tidak menampilkan fasilitas Owner Akun/upgrade.

## Undangan WhatsApp
- Undangan Owner sekarang khusus menggunakan nomor WhatsApp.
- Form undangan tidak lagi menampilkan Email.
- API pembuatan undangan mewajibkan nomor WhatsApp format 62xxxxxxxx.
- Kirim ulang undangan hanya melalui WhatsApp.
- Link undangan tetap memakai `/invite?token=...`.

## Klaim Publik
- Setelah pendaftaran dari tombol klaim publik, pending claim otomatis dikirim ke Owner Akun.
- Klaim tidak mengubah akun menjadi Premium/Ultimate.

## Login
- Login tidak lagi gagal di tahap frontend akibat fungsi pending claim yang hilang; dashboard langsung dirender.
