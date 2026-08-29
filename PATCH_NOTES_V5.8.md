# JejakNasab V5.8

- Memperbaiki endpoint GET undangan agar link `/invite/<token>` dapat dimuat melalui `/api/invite/<token>`.
- Menambahkan alias GET `/api/invitations/<token>` untuk kompatibilitas link undangan.
- Link publik dari dashboard sekarang selalu dibuka di tab baru.
- Memperkuat tombol Salin di seluruh menu dengan Clipboard API, fallback `execCommand`, pemilihan teks, dan prompt.
- Login dari halaman undangan sekarang mempertahankan token undangan sampai permintaan bergabung dikirim.
- Menambahkan tombol klaim Family Member pada detail anggota publik yang masih hidup; anggota wafat tidak menampilkan klaim.
- Memperbaiki selector form login yang sebelumnya tidak cocok dengan ID input, sehingga login dari undangan/fitur klaim dapat berjalan.