# Virtual Tour 360° – Fakultas Teknik UNRI

Aplikasi Virtual Reality (VR) berbasis web interaktif untuk menjelajahi lingkungan Fakultas Teknik Universitas Riau (UNRI). Proyek ini menyajikan pengalaman panorama 360 derajat dengan transisi dinamis berkinerja tinggi serta antarmuka (HUD) modern.

## Fitur Utama

- **Navigasi Panorama 360°:** Penjelajahan lingkungan kampus secara interaktif dengan kontrol drag-to-look yang responsif.
- **Transisi Zoom-Forward Smooth:** Efek perpindahan lokasi yang dioptimalkan menggunakan kombinasi efek blur, pembesaran skala (scale), dan kurva pelambatan (ease-in-out quart) untuk meminimalisasi ketidaknyamanan visual tanpa kedipan hitam.
- **Dynamic Label Planes (Multi-annotation):** Sistem pelabelan objek/area 3D di dalam scene yang fleksibel, mendukung banyak panel informasi sekaligus dengan konfigurasi dinamis berbasis indeks.
- **HUD Glassmorphism Modern:** Antarmuka pengguna (UI) premium dengan efek frosted glass, integrasi dropdown dengan pengelompokan lokasi unik (berdasarkan ID terkecil), dan kontrol intuitif.
- **Sensor Pendukung:** Kompas dinamis terintegrasi yang menunjukkan arah hadap kamera secara real-time.
- **Kompatibilitas VR:** Mendukung mode layar penuh (Full Screen) dan integrasi WebVR untuk perangkat VR headset atau Cardboard.

## Teknologi yang Digunakan

Aplikasi dibangun menggunakan teknologi standar web modern tanpa memerlukan proses kompilasi (build steps) yang rumit:

- **A-Frame Framework (v1.4.0):** Pustaka berbasis Entity-Component-System (ECS) untuk rendering WebVR 3D yang optimal.
- **HTML5:** Struktur semantik utama dan penyusunan elemen HUD.
- **CSS3:** Sistem styling berbasis variabel CSS, transisi bezier, serta efek visual modern (backdrop-filter blur, box-shadow).
- **Vanilla JavaScript (ES6+):** Logika utama aplikasi, manajemen state navigasi, algoritma transisi matematis, serta manipulasi DOM dinamis.

## Struktur Direktori

Berikut adalah berkas-berkas utama penyusun proyek ini:

- `index.html`: Berkas HTML utama yang memuat scene A-Frame, kerangka HUD, serta memuat pustaka eksternal.
- `style.css`: File stylesheet yang mengatur desain visual antarmuka, variabel warna, efek glassmorphism, dan animasi CSS.
- `app.js`: Logika inti aplikasi, menangani pemuatan scene, perhitungan arah kompas, inisialisasi label 3D, serta mekanisme transisi antar scene.
- `data/scene.js`: Konfigurasi basis data statis seluruh scene virtual tour, mendefinisikan URL gambar panorama, hubungan navigasi antar titik (koneksi), konfigurasi kompas awal, koordinat rotasi default, serta label-label dinamis yang terpasang pada masing-masing scene.

## Cara Menjalankan Secara Lokal

Untuk menghindari kendala pemuatan aset lokal akibat kebijakan keamanan peramban (CORS), aplikasi ini harus dijalankan melalui server lokal.

### Menggunakan VS Code (Live Server)
1. Buka folder proyek ini menggunakan editor **Visual Studio Code**.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) telah terpasang.
3. Buka berkas `index.html`.
4. Klik kanan di dalam area kode, kemudian pilih **Open with Live Server**.
5. Aplikasi akan otomatis berjalan di peramban utama Anda (biasanya pada alamat `http://127.0.0.1:5500/`).

### Menggunakan Server HTTP Lain
Anda juga dapat menggunakan modul server minimalis dari bahasa pemrograman lain di terminal:
- **Python 3:** `python -m http.server 8000`
- **Node.js (http-server):** `npx http-server`

## Tim Pengembang

Proyek ini dikembangkan oleh mahasiswa Fakultas Teknik Universitas Riau:

1. **Akhlaqul Muhammad Fadwa** - 2307112834
2. **M. Sohibbal** - 2307135312
3. **Muhammad Abidillah** - 2307112117
4. **Rehandra** - 2307113322
5. **Ariful Fikri** - 2307110474
