# JejakNasab V5.17 — Fix Patch

## Perbaikan utama
- Memisahkan **Silsilah Opsional** dari garis nasab utama.
- Relasi opsional disimpan pada tabel `optional_lineages`, bukan pada `relationships` utama.
- Anggota yang belum terhubung ke root **tidak lagi ditampilkan sebagai `Anggota lain` di halaman publik**.
- Owner Akun dapat membuat cabang opsional melalui tombol **Silsilah Opsional**.
- Contoh: pilih `Nur Rahmalia` sebagai titik cabang, pilih ayahnya (mis. `Romli`) sebagai anggota opsional, lalu pilih hubungan `Ayah`.
- Cabang tersebut tampil terpisah sebagai **Silsilah Opsional**, sehingga ayah Nur tidak masuk ke garis nasab utama.
- Model connector utama diperbarui menjadi: pasangan → garis vertikal dari titik tengah pasangan → garis horizontal anak → garis vertikal ke setiap anak.
- Relasi `optional_lineages` tidak memengaruhi root, perhitungan generasi, sibling order, atau garis nasab utama.
- Endpoint baru: `/api/trees/:id/optional-lineages` dengan GET/POST/DELETE.

## Database
Migration aman untuk database lama dan tidak menghapus data.

Jalankan:

```bash
npx wrangler d1 execute jejaknasab-db --remote --file=migration-v5.17.sql
```

Jika tabel sudah pernah dibuat, `CREATE TABLE IF NOT EXISTS` tidak akan mereset data.
