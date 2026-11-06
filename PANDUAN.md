# Cara memasang portofolio sebagai aplikasi

Struktur folder (jangan diubah namanya):

    index.html
    manifest.webmanifest
    sw.js
    icons/ (4 file png)

## Publikasi gratis lewat GitHub Pages
1. Buat repository baru di GitHub, misalnya `portofolio`.
2. Unggah semua isi folder ini (index.html, manifest.webmanifest, sw.js, folder icons).
3. Buka Settings > Pages > Source: Deploy from a branch > main / (root) > Save.
4. Tunggu 1-2 menit, alamatnya: https://USERNAME.github.io/portofolio/

Alternatif: seret folder ke Netlify Drop (app.netlify.com/drop) atau pakai Vercel.

## Cara memasang
- Chrome/Edge laptop: klik ikon instal di kolom alamat.
- Android (Chrome): menu titik tiga > Instal aplikasi.
- iPhone (Safari): Bagikan > Tambah ke Layar Utama.

Catatan: PWA tidak jalan jika file dibuka langsung dari komputer (file://). Harus lewat https:// atau http://localhost.
Jika nanti mengubah isi situs, naikkan angka VERSI di sw.js (misalnya lingga-v2) agar cache diperbarui.
