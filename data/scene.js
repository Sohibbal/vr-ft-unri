// =============================================================
// DATA SCENE - Virtual Tour Fakultas Teknik UNRI
// =============================================================
//
// PANDUAN SETTING ARAH KAMERA:
// ─────────────────────────────────────────────────────────────
//  Field: cameraYaw  (satuan: derajat, 0–360)
//
//  Cara kerja:
//    0°   → menghadap depan (default A-Frame)
//    90°  → putar kamera ke KANAN
//   -90°  → putar kamera ke KIRI
//   180°  → menghadap ke belakang
//
//  Tips penyesuaian arah saat gambar pertama muncul:
//    - Jika tampilan terlalu ke kiri  → naikkan nilai cameraYaw (misal: -90 → -45)
//    - Jika tampilan terlalu ke kanan → turunkan nilai cameraYaw (misal: 0 → -45)
//    - Coba kelipatan 45° untuk perubahan cepat
//
//  Field: rotation
//    Koreksi rotasi GAMBAR 360° (bukan kamera).
//    "0 90 0" = geser gambar 90° ke kiri agar jalan lurus di tengah.
//    Ubah nilai Y jika perlu, misalnya "0 45 0" atau "0 135 0".
//
// PANDUAN SETTING VIRTUAL BUTTON (Tombol Navigasi di Scene 3D):
// ─────────────────────────────────────────────────────────────
//  Field: navNext  → posisi tombol "Maju" (ke scene berikutnya)
//  Field: navPrev  → posisi tombol "Mundur" (ke scene sebelumnya)
//
//  Format: "X Y Z" (koordinat 3D dalam satuan meter)
//    X = kiri/kanan  (negatif = kiri, positif = kanan)
//    Y = atas/bawah   (biasanya 0 agar di tanah / level jalan)
//    Z = depan/belakang (negatif = depan, positif = belakang)
//
//  Contoh:
//    navNext: "0 0 -5"    → tombol maju 5m di depan (tengah jalan)
//    navPrev: "0 0 5"     → tombol mundur 5m di belakang
//    navNext: "2 0 -4"    → tombol maju, geser 2m ke kanan
//    navNext: "-3 0 -5"   → tombol maju, geser 3m ke kiri
//
//  Field: navNextRot dan navPrevRot → rotasi tombol (opsional)
//    Format: "X Y Z" (derajat). Default: "navNextRot: "-90 0 0""
//    Ubah Y untuk memutar arah panah. Misal "0 45 0" putar 45°.
//
//  Tips:
//    - Letakkan tombol di area jalan yang terlihat
//    - Y = 0 berarti sejajar tanah, Y = 0.5 sedikit melayang
//    - Sesuaikan Z untuk jarak (makin negatif = makin jauh ke depan)
//
// PANDUAN SETTING LABEL PLANE (Panel Nama Lokasi di Scene 3D):
// ─────────────────────────────────────────────────────────────
//  Field: planes  → array berisi satu atau lebih panel teks di scene 3D
//
//  Format:
//    planes: [
//      { pos: "X Y Z", rot: "X Y Z", label: "Teks opsional" },
//    ]
//
//  Keterangan tiap field dalam objek plane:
//    pos   : posisi panel (X=kiri/kanan, Y=atas/bawah, Z=depan/belakang)
//    rot   : rotasi panel dalam derajat (opsional, default "0 0 0")
//    label : teks yang ditampilkan (opsional, default = label scene)
//
//  Contoh 1 plane (pakai label scene):
//    planes: [{ pos: "-3 1.5 -8", rot: "0 30 0" }]
//
//  Contoh 2 plane dengan teks berbeda:
//    planes: [
//      { pos: "6 1 -5",  rot: "0 -110 0", label: "Gedung A" },
//      { pos: "-4 1 3",  rot: "0 80 0",   label: "Gedung B" }
//    ]
//
//  Tips:
//    - Z negatif = di depan kamera (terlihat saat scene dibuka)
//    - Y = 1 ~ 2 agar setinggi mata
//    - Gunakan rot.Y untuk memutar panel menghadap objek tertentu
//    - Hapus field planes (atau kosongi) jika tidak ingin plane di scene itu
// =============================================================

const SCENES = [
    {
        id: 1,
        src: "assets/images/1.jpg",
        label: "Gedung C",
        description: "Gedung Kuliah Umum",
        rotation: "0 180 0",
        cameraYaw: 0,
        // Virtual Button — sesuaikan posisi agar tepat di jalan
        navNext: "0 0 -5",          // posisi tombol "Maju"
        navPrev: "-2.5 0 5",        // posisi tombol "Mundur"
        navNextRot: "-90 0 0",      // rotasi tombol maju (opsional)
        navPrevRot: "-90 155 0",    // rotasi tombol mundur (opsional)
        planes: [
            { pos: "6 1 -5", rot: "0 -110 0" }
        ]
    },
    {
        id: 2,
        src: "assets/images/2.jpg",
        label: "Gedung C",
        description: "Gedung Kuliah Umum",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 3,
        src: "assets/images/3.jpg",
        label: "Gedung C",
        description: "Gedung Kuliah Umum",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "6 1 3", rot: "0 -75 0" }
        ]
    },
    {
        id: 4,
        src: "assets/images/4.jpg",
        label: "Parkiran",
        description: "Area Parkir Dosen Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "2.5 0 5",
        planes: [
            { pos: "-3 1 -4", rot: "0 100 0" }
        ]
    },
    {
        id: 5,
        src: "assets/images/5.jpg",
        label: "Parkiran",
        description: "Area Parkir Dosen Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "1.5 0 5",
        planes: [
            { pos: "-2 1 -0.5", rot: "0 100 0" }
        ]
    },
    {
        id: 6,
        src: "assets/images/6.jpg",
        label: "Parkiran",
        description: "Area Parkir Dosen Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "1.5 0 5",
        planes: [
            { pos: "4 1 -1", rot: "0 -100 0" },
            { pos: "-3 0.5 4", rot: "0 100 0" }
        ]
    },
    {
        id: 7,
        src: "assets/images/7.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "1.5 0 5",
        navPrevRot: "-90 -155 0",
        planes: [
            { pos: "-3.5 0.5 -1", rot: "0 110 0" },
            { pos: "6 0.5 2", rot: "0 -65 0" },
        ]
    },
    {
        id: 8,
        src: "assets/images/8.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "-3 0.5 1", rot: "0 110 0" }
        ]
    },
    {
        id: 9,
        src: "assets/images/9.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "8 0.5 -0.8", rot: "0 -110 0" }
        ]
    },
    {
        id: 10,
        src: "assets/images/10.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "-6 2.5 5", rot: "0 110 0" }
        ]
    },
    {
        id: 11,
        src: "assets/images/11.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "4 1 -4", rot: "0 -45 0" }
        ]
    },
    {
        id: 12,
        src: "assets/images/12.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "4 1 -4", rot: "0 -90 0" }
        ]
    },
    {
        id: 13,
        src: "assets/images/13.jpg",
        label: "Musholla",
        description: "Musholla Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "-5 1 -3", rot: "0 90 0" },
            { pos: "6 1 1", rot: "0 -90 0", label: "Parkiran" }
        ]
    },
    {
        id: 14,
        src: "assets/images/14.jpg",
        label: "Musholla",
        description: "Musholla Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNextRot: "-90 -10 0",
        navPrevRot: "-90 -155 0",
        planes: [
            { pos: "-6 1 -1", rot: "0 90 0" },
            { pos: "6 1 4", rot: "0 -70", label: "Parkiran" }
        ]
    },
    {
        id: 15,
        src: "assets/images/15.jpg",
        label: "Musholla",
        description: "Musholla Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "-6 1 5", rot: "0 135 0" },
            { pos: "7 2 -2", rot: "0 -90 0", label: "Parkiran" }
        ]
    },
    {
        id: 16,
        src: "assets/images/16.jpg",
        label: "Parkiran",
        description: "Area Parkir Mahasiswa Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3 1 -1", rot: "0 -90 0" },
        ]
    },
    {
        id: 17,
        src: "assets/images/17.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "1 1 -6", rot: "0 -90 0" }
        ]
    },
    {
        id: 18,
        src: "assets/images/18.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navNextRot: "-90 -5 0",
        planes: [
            { pos: "1 1 -3", rot: "0 -90 0" }
        ]
    },
    {
        id: 19,
        src: "assets/images/19.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-1.5 0 -5",
        navPrev: "-1.5 0 3",
        planes: [
            { pos: "1 1 -5", rot: "0 -90 0" }
        ]
    },
    {
        id: 20,
        src: "assets/images/20.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "4 1 -0.5", rot: "0 -70 0" }
        ]
    },
    {
        id: 21,
        src: "assets/images/21.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "2 1 -3", rot: "0 -70 0" }
        ]
    },
    {
        id: 22,
        src: "assets/images/22.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "2 1 -4.5", rot: "0 -60 0" }
        ]
    },
    {
        id: 23,
        src: "assets/images/23.jpg",
        label: "Teknik Sipil",
        description: "Lab Teknik Sipil Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-1 0 -5",
        planes: [
            { pos: "2 1 -4.5", rot: "0 -60 0" }
        ]
    },
    {
        id: 24,
        src: "assets/images/24.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-1 0 -5",
        planes: [
            { pos: "2 1 -4.5", rot: "0 -60 0" },
            { pos: "5 1 4", rot: "0 -120 0", label: "Teknik Sipil" }
        ]
    },
    {
        id: 25,
        src: "assets/images/25.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "2 1 -4.5", rot: "0 -60 0" },
            { pos: "-5.4 2 -6", rot: "0 0 0", label: "Parkiran" }
        ]
    },
    {
        id: 26,
        src: "assets/images/26.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" },
            { pos: "-5.4 1 -2", rot: "0 90 0", label: "Parkiran" }
        ]
    },
    {
        id: 27,
        src: "assets/images/27.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" },
            { pos: "-5.4 1 0.5", rot: "0 90 0", label: "Parkiran" }
        ]
    },
    {
        id: 28,
        src: "assets/images/28.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" },
        ]
    },
    {
        id: 29,
        src: "assets/images/29.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 30,
        src: "assets/images/30.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 31,
        src: "assets/images/31.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 32,
        src: "assets/images/32.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 33,
        src: "assets/images/33.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 34,
        src: "assets/images/34.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 35,
        src: "assets/images/35.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 36,
        src: "assets/images/36.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 37,
        src: "assets/images/37.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 38,
        src: "assets/images/38.jpg",
        label: "Teknik Mesin",
        description: "Lab Teknik Mesin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 1", rot: "0 -85 0" }
        ]
    },
    {
        id: 39,
        src: "assets/images/39.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 40,
        src: "assets/images/40.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 41,
        src: "assets/images/41.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 42,
        src: "assets/images/42.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 43,
        src: "assets/images/43.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "4.5 1 -1", rot: "0 -70 0" }
        ]
    },
    {
        id: 44,
        src: "assets/images/44.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 45,
        src: "assets/images/45.jpg",
        label: "Teknik Elektro",
        description: "Lab Teknik Elektro Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -4", rot: "0 -70 0" }
        ]
    },
    {
        id: 46,
        src: "assets/images/46.jpg",
        label: "Dekanat",
        description: "Gedung Dekanat Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "-3.5 1 -4", rot: "0 90 0" }
        ]
    },
    {
        id: 47,
        src: "assets/images/47.jpg",
        label: "Dekanat",
        description: "Gedung Dekanat Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "-5.5 1 1", rot: "0 90 0" }
        ]
    },
    {
        id: 48,
        src: "assets/images/48.jpg",
        label: "Dekanat",
        description: "Gedung Dekanat Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 49,
        src: "assets/images/49.jpg",
        label: "Pulp and Paper",
        description: "Gedung Pulp and Paper Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "3.5 1 -6", rot: "0 -100 0" }
        ]
    },
    {
        id: 50,
        src: "assets/images/50.jpg",
        label: "Pulp and Paper",
        description: "Gedung Pulp and Paper Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
    },
    {
        id: 51,
        src: "assets/images/51.jpg",
        label: "Jalan Belakang",
        description: "Jalan Belakang Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navPrev: "-2.5 0 5"
    },
    {
        id: 52,
        src: "assets/images/52.jpg",
        label: "Jalan Belakang",
        description: "Jalan Belakang Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navPrev: "-1.5 0 5"
    },
    {
        id: 53,
        src: "assets/images/53.jpg",
        label: "Jalan Belakang",
        description: "Jalan Belakang Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navPrev: "-1.5 0 5"
    },
    {
        id: 54,
        src: "assets/images/54.jpg",
        label: "Jalan Belakang",
        description: "Jalan Belakang Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 55,
        src: "assets/images/55.jpg",
        label: "Jalan Belakang",
        description: "Jalan Belakang Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 56,
        src: "assets/images/56.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "2.5 0 5"
    },
    {
        id: 57,
        src: "assets/images/57.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 58,
        src: "assets/images/58.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 59,
        src: "assets/images/59.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 60,
        src: "assets/images/60.jpg",
        label: "Pulp and Paper",
        description: "Gedung Pulp and Paper",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 61,
        src: "assets/images/61.jpg",
        label: "Pulp and Paper",
        description: "Gedung Pulp and Paper",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 62,
        src: "assets/images/62.jpg",
        label: "Pulp and Paper",
        description: "Gedung Pulp and Paper",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 63,
        src: "assets/images/63.jpg",
        label: "Pulp and Paper",
        description: "Gedung Pulp and Paper",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 64,
        src: "assets/images/64.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 65,
        src: "assets/images/65.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 66,
        src: "assets/images/66.jpg",
        label: "Teknik Kimia",
        description: "Gedung Teknik Kimia",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 67,
        src: "assets/images/67.jpg",
        label: "Teknik Kimia",
        description: "Gedung Teknik Kimia",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 68,
        src: "assets/images/68.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 69,
        src: "assets/images/69.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 70,
        src: "assets/images/70.jpg",
        label: "Petrokimia",
        description: "Gedung Petrokimia",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 71,
        src: "assets/images/71.jpg",
        label: "Petrokimia",
        description: "Gedung Petrokimia",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 72,
        src: "assets/images/72.jpg",
        label: "Kantin",
        description: "Kantin Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -6", rot: "0 -90 0" }
        ]
    },
    {
        id: 73,
        src: "assets/images/73.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 74,
        src: "assets/images/74.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 75,
        src: "assets/images/75.jpg",
        label: "Teknik Sipil",
        description: "Gedung Teknik Sipil",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 76,
        src: "assets/images/76.jpg",
        label: "Teknik Sipil",
        description: "Gedung Teknik Sipil",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 77,
        src: "assets/images/77.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 78,
        src: "assets/images/78.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 79,
        src: "assets/images/79.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 80,
        src: "assets/images/80.jpg",
        label: "Jalan Raya",
        description: "Jalan Besar Universitas Riau",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 81,
        src: "assets/images/81.jpg",
        label: "Tugu",
        description: "Tugu Penanda Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
        planes: [
            { pos: "5 1 -1", rot: "0 -90 0" }
        ]
    },
    {
        id: 82,
        src: "assets/images/82.jpg",
        label: "Jalan Masuk",
        description: "Jalan Masuk Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 83,
        src: "assets/images/83.jpg",
        label: "Jalan Masuk",
        description: "Jalan Masuk Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 84,
        src: "assets/images/84.jpg",
        label: "Jalan Masuk",
        description: "Jalan Masuk Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 85,
        src: "assets/images/85.jpg",
        label: "Jalan Masuk",
        description: "Jalan Masuk Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 86,
        src: "assets/images/86.jpg",
        label: "Jalan masuk",
        description: "Jalan masuk Fakultas Teknik",
        rotation: "0 180 0",
        cameraYaw: 0,
    }
];
