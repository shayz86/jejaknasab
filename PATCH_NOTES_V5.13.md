# JejakNasab V5.13

## Perbaikan
- Owner Web sekarang menampilkan akun Owner Akun sebagai kartu utama.
- Family Member milik setiap Owner Akun ditampilkan nested di dalam border Owner Akun yang sama.
- Owner Web tidak lagi menyediakan tombol status untuk Family Member; Owner Web hanya mengatur status Owner Akun dan pembayaran.
- Family Member tidak dihitung sebagai akun Owner Web yang berdiri sendiri.
- Pendaftaran Owner Akun yang belum memiliki silsilah tetap muncul sebagai Pendaftaran Owner Akun.
- Tombol Hapus Permanen tetap memakai konfirmasi Ya/Tidak.
- Selain pendaftaran pending >24 jam tanpa pembayaran, akun percobaan yang suspended tanpa riwayat pembayaran dapat dibersihkan oleh Owner Web.
- Persetujuan undangan otomatis menyelesaikan seluruh claim request pending untuk anggota yang sama: requester yang sama ditandai approved, requester lain ditolak, sehingga permintaan klaim tidak tertinggal.
- Setelah menerima/menolak undangan atau klaim, dashboard Owner Akun dirender ulang agar daftar langsung hilang tanpa refresh.
- Tombol "Daftar Family Member" dari link WhatsApp sekarang berupa link langsung ke `/invite?token=...&register=1`, sehingga tidak bergantung pada handler onclick JavaScript. Token undangan tetap dibawa ke proses pendaftaran dan otomatis menghubungkan akun ke anggota yang diundang.
- Form Family Member tidak menampilkan Premium/Ultimate dan tidak membuat payment request.

## Catatan data live
- Paket ini tidak dapat menghapus data D1 produksi secara langsung dari lingkungan build.
- Setelah deploy V5.13, akun percobaan `shayz.hawz10@gmail.com` dapat dibersihkan dari Owner Web bila statusnya suspended tanpa pembayaran. Jika akun tersebut sudah terhubung sebagai Family Member aktif, hapus hubungan Family Member dari Dashboard Owner Akun terlebih dahulu bila memang ingin melepas klaim.
