# JejakNasab V5.5 – Patch

Perbaikan berdasarkan pengujian V5.4:

- Urutan anak sekarang dibawa sampai endpoint publik (`sibling_order`) sehingga pohon publik mengikuti urutan Owner/Family Member.
- Link publik dibuka dengan navigasi langsung agar lebih kompatibel dengan browser Android.
- Tombol salin link publik memakai Clipboard API + fallback pemilihan teks.
- Tombol kirim undangan WhatsApp/email memakai navigasi langsung (`wa.me` / `mailto`) agar tidak diblokir popup browser mobile.
- Salin teks undangan memakai fallback yang sama.
- Ditambahkan API DELETE untuk menghapus undangan dari daftar Undangan & Permintaan.
- Daftar anggota terpisah di bawah pohon dihapus; aksi Edit / Info Publik / Hapus tersedia langsung pada kartu anggota di pohon sesuai hak akses.
- Form penambahan anggota menampilkan pilihan arah yang jelas: anggota baru menjadi ANAK atau ORANG TUA dari anggota terpilih.
- Data `sibling_order` disertakan dalam data publik.
