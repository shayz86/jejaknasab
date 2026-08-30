# JejakNasab V5.10

Perbaikan berdasarkan pengujian V5.9.

- Perbaikan endpoint undangan dengan fallback query `/api/invite?token=...` dan `/api/invitations?token=...` untuk menghindari `Endpoint tidak ditemukan` pada link WhatsApp/browser tertentu.
- Pendaftaran melalui undangan Family Member tidak lagi meminta Premium/Ultimate dan tidak membuat payment request. Akun Family Member langsung aktif, paket mengikuti Owner Akun, lalu menunggu persetujuan Owner untuk menjadi anggota silsilah.
- Form pendaftaran undangan tidak menampilkan pilihan paket.
- Tombol Salin kini mencoba metode legacy secara sinkron terlebih dahulu, kemudian Clipboard API; jika browser tetap memblokir, muncul kotak teks yang dapat ditekan lama untuk disalin.
- Dashboard membedakan mode Family Member dan Owner Akun; opsi upgrade hanya ditampilkan untuk akun yang memang memiliki silsilah sendiri.
- Link undangan lama berbasis `/invite/<token>` tetap didukung.
