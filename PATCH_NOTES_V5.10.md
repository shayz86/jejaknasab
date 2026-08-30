# JejakNasab V5.10

- Memperbaiki alur undangan dengan endpoint query `/api/invite?token=...` agar link undangan tidak bergantung pada route nested.
- Link undangan baru memakai `/invite?token=...`; link lama `/invite/<token>` tetap dapat dibuka dan akan memakai endpoint query baru.
- Pendaftaran melalui undangan / klaim menjadi Family Member tanpa pilihan Premium/Ultimate dan tanpa pembayaran terpisah.
- Akun Family Member hasil undangan langsung aktif untuk login dan permintaan bergabung dicatat otomatis.
- Dashboard membedakan Family Member dan Owner Akun; Family Member tidak mendapat kartu upgrade Premium/Ultimate.
- Hak akses generasi Family Member dihitung berdasarkan paket Owner Akun dari silsilah yang diikuti.
- Tombol Salin memiliki fallback modal teks yang dapat dipilih manual di Android serta opsi Bagikan jika tersedia.
- Salin/Bagikan tetap mempertahankan alur tombol yang ada.
