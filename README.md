# Virtual Tour 360° - Fakultas Teknik Informatika UNRI

Aplikasi Virtual Reality (VR) berbasis web untuk menjelajahi lingkungan Fakultas Teknik Informatika Universitas Riau (UNRI) dengan pengalaman panorama 360 derajat bergaya Google Street View.

## 🚀 Fitur Utama
- **Navigasi 360°:** Jelajahi area kampus secara interaktif.
- **Transisi Smooth:** Efek perpindahan lokasi (zoom-forward) layaknya Google Maps.
- **HUD Profesional:** Antarmuka modern dengan glassmorphism, indikator lokasi, dan thumbnail interaktif.
- **Dukungan Sensor:** Kompas dinamis dan dukungan Gyroscope untuk perangkat mobile.
- **Mode VR:** Mendukung mode layar penuh dan perangkat VR/Cardboard.

## 🛠️ Teknologi yang Digunakan
Proyek ini dibangun menggunakan teknologi web murni tanpa build tools yang rumit:
- **[A-Frame](https://aframe.io/):** Framework web untuk realitas virtual.
- **HTML5:** Struktur utama aplikasi dan HUD (Head-Up Display).
- **CSS3:** Styling dengan variabel CSS dan efek visual (blur, transisi).
- **Vanilla JavaScript (ES6):** Logika aplikasi, state management, dan animasi.

## 👥 Tim Pengembang
Proyek ini dikembangkan oleh:

1. **Akhlaqul Muhammad Fadwa** - 2307112834
2. **M. Sohibbal** - 2307135312
3. **Muhammad Abidillah** - 2307112117
4. **Rehandra** - 2307113322

## 📥 Cara Menjalankan Secara Lokal
Karena proyek ini memuat aset lokal 3D dan gambar (WebGL/A-Frame), aplikasi ini membutuhkan local server untuk berjalan dengan baik. Cara termudah adalah menggunakan ekstensi **Live Server** di Visual Studio Code:

1. Buka folder proyek ini di **Visual Studio Code**.
2. Pastikan Anda sudah menginstal ekstensi **Live Server** (oleh Ritwick Dey).
3. Buka file `index.html`.
4. Klik kanan pada kode di dalam `index.html`, lalu pilih **"Open with Live Server"**.
5. Browser akan otomatis terbuka dan memuat Virtual Tour.
