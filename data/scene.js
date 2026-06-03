// =============================================================
// DATA SCENE - Virtual Tour Fakultas Teknik Informatika UNRI
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
// =============================================================

const SCENES = [
    {
        id: 1,
        src: "assets/images/1.jpg",
        label: "Lokasi 1",
        description: "Deskripsi lokasi 1",
        rotation: "0 180 0",
        cameraYaw: 0,
        // Virtual Button — sesuaikan posisi agar tepat di jalan
        navNext: "0 0 -5",          // posisi tombol "Maju"
        navPrev: "-2.5 0 5",           // posisi tombol "Mundur"
        navNextRot: "-90 0 0",      // rotasi tombol maju (opsional)
        navPrevRot: "-90 155 0"     // rotasi tombol mundur (opsional)
    },
    {
        id: 2,
        src: "assets/images/2.jpg",
        label: "Lokasi 2",
        description: "Deskripsi lokasi 2",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 3,
        src: "assets/images/3.jpg",
        label: "Lokasi 3",
        description: "Deskripsi lokasi 3",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 4,
        src: "assets/images/4.jpg",
        label: "Lokasi 4",
        description: "Deskripsi lokasi 4",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "2.5 0 5"
    },
    {
        id: 5,
        src: "assets/images/5.jpg",
        label: "Lokasi 5",
        description: "Deskripsi lokasi 5",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "1.5 0 5"
    },
    {
        id: 6,
        src: "assets/images/6.jpg",
        label: "Lokasi 6",
        description: "Deskripsi lokasi 6",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "1.5 0 5"
    },
    {
        id: 7,
        src: "assets/images/7.jpg",
        label: "Lokasi 7",
        description: "Deskripsi lokasi 7",
        rotation: "0 180 0",
        cameraYaw: 0,
        navPrev: "1.5 0 5",
        navPrevRot: "-90 -155 0"
    },
    {
        id: 8,
        src: "assets/images/8.jpg",
        label: "Lokasi 8",
        description: "Deskripsi lokasi 8",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 9,
        src: "assets/images/9.jpg",
        label: "Lokasi 9",
        description: "Deskripsi lokasi 9",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 10,
        src: "assets/images/10.jpg",
        label: "Lokasi 10",
        description: "Deskripsi lokasi 10",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 11,
        src: "assets/images/11.jpg",
        label: "Lokasi 11",
        description: "Deskripsi lokasi 11",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 12,
        src: "assets/images/12.jpg",
        label: "Lokasi 12",
        description: "Deskripsi lokasi 12",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 13,
        src: "assets/images/13.jpg",
        label: "Lokasi 13",
        description: "Deskripsi lokasi 13",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 14,
        src: "assets/images/14.jpg",
        label: "Lokasi 14",
        description: "Deskripsi lokasi 14",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNextRot: "-90 -10 0",
        navPrevRot: "-90 -155 0"
    },
    {
        id: 15,
        src: "assets/images/15.jpg",
        label: "Lokasi 15",
        description: "Deskripsi lokasi 15",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 16,
        src: "assets/images/16.jpg",
        label: "Lokasi 16",
        description: "Deskripsi lokasi 16",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 17,
        src: "assets/images/17.jpg",
        label: "Lokasi 17",
        description: "Deskripsi lokasi 17",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 18,
        src: "assets/images/18.jpg",
        label: "Lokasi 18",
        description: "Deskripsi lokasi 18",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -3",
        navNextRot: "-90 -5 0"
    },
    {
        id: 19,
        src: "assets/images/19.jpg",
        label: "Lokasi 19",
        description: "Deskripsi lokasi 19",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-1.5 0 -3",
        navPrev: "-1.5 0 3"
    },
    {
        id: 20,
        src: "assets/images/20.jpg",
        label: "Lokasi 20",
        description: "Deskripsi lokasi 20",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 21,
        src: "assets/images/21.jpg",
        label: "Lokasi 21",
        description: "Deskripsi lokasi 21",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 22,
        src: "assets/images/22.jpg",
        label: "Lokasi 22",
        description: "Deskripsi lokasi 22",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 23,
        src: "assets/images/23.jpg",
        label: "Lokasi 23",
        description: "Deskripsi lokasi 23",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-1 0 -3"
    },
    {
        id: 24,
        src: "assets/images/24.jpg",
        label: "Lokasi 24",
        description: "Deskripsi lokasi 24",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-1 0 -3"
    },
    {
        id: 25,
        src: "assets/images/25.jpg",
        label: "Lokasi 25",
        description: "Deskripsi lokasi 25",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 26,
        src: "assets/images/26.jpg",
        label: "Lokasi 26",
        description: "Deskripsi lokasi 26",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 27,
        src: "assets/images/27.jpg",
        label: "Lokasi 27",
        description: "Deskripsi lokasi 27",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 28,
        src: "assets/images/28.jpg",
        label: "Lokasi 28",
        description: "Deskripsi lokasi 28",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 29,
        src: "assets/images/29.jpg",
        label: "Lokasi 29",
        description: "Deskripsi lokasi 29",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 30,
        src: "assets/images/30.jpg",
        label: "Lokasi 30",
        description: "Deskripsi lokasi 30",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 31,
        src: "assets/images/31.jpg",
        label: "Lokasi 31",
        description: "Deskripsi lokasi 31",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 32,
        src: "assets/images/32.jpg",
        label: "Lokasi 32",
        description: "Deskripsi lokasi 32",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 33,
        src: "assets/images/33.jpg",
        label: "Lokasi 33",
        description: "Deskripsi lokasi 33",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 34,
        src: "assets/images/34.jpg",
        label: "Lokasi 34",
        description: "Deskripsi lokasi 34",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 35,
        src: "assets/images/35.jpg",
        label: "Lokasi 35",
        description: "Deskripsi lokasi 35",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 36,
        src: "assets/images/36.jpg",
        label: "Lokasi 36",
        description: "Deskripsi lokasi 36",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 37,
        src: "assets/images/37.jpg",
        label: "Lokasi 37",
        description: "Deskripsi lokasi 37",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNextRot: "-90 -20 0"
    },
    {
        id: 38,
        src: "assets/images/38.jpg",
        label: "Lokasi 38",
        description: "Deskripsi lokasi 38",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 39,
        src: "assets/images/39.jpg",
        label: "Lokasi 39",
        description: "Deskripsi lokasi 39",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 40,
        src: "assets/images/40.jpg",
        label: "Lokasi 40",
        description: "Deskripsi lokasi 40",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 41,
        src: "assets/images/41.jpg",
        label: "Lokasi 41",
        description: "Deskripsi lokasi 41",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 42,
        src: "assets/images/42.jpg",
        label: "Lokasi 42",
        description: "Deskripsi lokasi 42",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 43,
        src: "assets/images/43.jpg",
        label: "Lokasi 43",
        description: "Deskripsi lokasi 43",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "1.0 0 -5",
        navNextRot: "-90 -10 0"
    },
    {
        id: 44,
        src: "assets/images/44.jpg",
        label: "Lokasi 44",
        description: "Deskripsi lokasi 44",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 45,
        src: "assets/images/45.jpg",
        label: "Lokasi 45",
        description: "Deskripsi lokasi 45",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 46,
        src: "assets/images/46.jpg",
        label: "Lokasi 46",
        description: "Deskripsi lokasi 46",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 47,
        src: "assets/images/47.jpg",
        label: "Lokasi 47",
        description: "Deskripsi lokasi 47",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 48,
        src: "assets/images/48.jpg",
        label: "Lokasi 48",
        description: "Deskripsi lokasi 48",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 49,
        src: "assets/images/49.jpg",
        label: "Lokasi 49",
        description: "Deskripsi lokasi 49",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5"
    },
    {
        id: 50,
        src: "assets/images/50.jpg",
        label: "Lokasi 50",
        description: "Deskripsi lokasi 50",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navPrev: "-1.5 0 5"
    },
    {
        id: 51,
        src: "assets/images/51.jpg",
        label: "Lokasi 51",
        description: "Deskripsi lokasi 51",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navPrev: "-2.5 0 5"
    },
    {
        id: 52,
        src: "assets/images/52.jpg",
        label: "Lokasi 52",
        description: "Deskripsi lokasi 52",
        rotation: "0 180 0",
        cameraYaw: 0,
        navNext: "-2.5 0 -5",
        navPrev: "-1.5 0 5"
    },
    {
        id: 53,
        src: "assets/images/53.jpg",
        label: "Lokasi 53",
        description: "Deskripsi lokasi 53",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 54,
        src: "assets/images/54.jpg",
        label: "Lokasi 54",
        description: "Deskripsi lokasi 54",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 55,
        src: "assets/images/55.jpg",
        label: "Lokasi 55",
        description: "Deskripsi lokasi 55",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 56,
        src: "assets/images/56.jpg",
        label: "Lokasi 56",
        description: "Deskripsi lokasi 56",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 57,
        src: "assets/images/57.jpg",
        label: "Lokasi 57",
        description: "Deskripsi lokasi 57",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 58,
        src: "assets/images/58.jpg",
        label: "Lokasi 58",
        description: "Deskripsi lokasi 58",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 59,
        src: "assets/images/59.jpg",
        label: "Lokasi 59",
        description: "Deskripsi lokasi 59",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 60,
        src: "assets/images/60.jpg",
        label: "Lokasi 60",
        description: "Deskripsi lokasi 60",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 61,
        src: "assets/images/61.jpg",
        label: "Lokasi 61",
        description: "Deskripsi lokasi 61",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 62,
        src: "assets/images/62.jpg",
        label: "Lokasi 62",
        description: "Deskripsi lokasi 62",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 63,
        src: "assets/images/63.jpg",
        label: "Lokasi 63",
        description: "Deskripsi lokasi 63",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 64,
        src: "assets/images/64.jpg",
        label: "Lokasi 64",
        description: "Deskripsi lokasi 64",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 65,
        src: "assets/images/65.jpg",
        label: "Lokasi 65",
        description: "Deskripsi lokasi 65",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 66,
        src: "assets/images/66.jpg",
        label: "Lokasi 66",
        description: "Deskripsi lokasi 66",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 67,
        src: "assets/images/67.jpg",
        label: "Lokasi 67",
        description: "Deskripsi lokasi 67",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 68,
        src: "assets/images/68.jpg",
        label: "Lokasi 68",
        description: "Deskripsi lokasi 68",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 69,
        src: "assets/images/69.jpg",
        label: "Lokasi 69",
        description: "Deskripsi lokasi 69",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 70,
        src: "assets/images/70.jpg",
        label: "Lokasi 70",
        description: "Deskripsi lokasi 70",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 71,
        src: "assets/images/71.jpg",
        label: "Lokasi 71",
        description: "Deskripsi lokasi 71",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 72,
        src: "assets/images/72.jpg",
        label: "Lokasi 72",
        description: "Deskripsi lokasi 72",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 73,
        src: "assets/images/73.jpg",
        label: "Lokasi 73",
        description: "Deskripsi lokasi 73",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 74,
        src: "assets/images/74.jpg",
        label: "Lokasi 74",
        description: "Deskripsi lokasi 74",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 75,
        src: "assets/images/75.jpg",
        label: "Lokasi 75",
        description: "Deskripsi lokasi 75",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 76,
        src: "assets/images/76.jpg",
        label: "Lokasi 76",
        description: "Deskripsi lokasi 76",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 77,
        src: "assets/images/77.jpg",
        label: "Lokasi 77",
        description: "Deskripsi lokasi 77",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 78,
        src: "assets/images/78.jpg",
        label: "Lokasi 78",
        description: "Deskripsi lokasi 78",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 79,
        src: "assets/images/79.jpg",
        label: "Lokasi 79",
        description: "Deskripsi lokasi 79",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 80,
        src: "assets/images/80.jpg",
        label: "Lokasi 80",
        description: "Deskripsi lokasi 80",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 81,
        src: "assets/images/81.jpg",
        label: "Lokasi 81",
        description: "Deskripsi lokasi 81",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 82,
        src: "assets/images/82.jpg",
        label: "Lokasi 82",
        description: "Deskripsi lokasi 82",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 83,
        src: "assets/images/83.jpg",
        label: "Lokasi 83",
        description: "Deskripsi lokasi 83",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 84,
        src: "assets/images/84.jpg",
        label: "Lokasi 84",
        description: "Deskripsi lokasi 84",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 85,
        src: "assets/images/85.jpg",
        label: "Lokasi 85",
        description: "Deskripsi lokasi 85",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 86,
        src: "assets/images/86.jpg",
        label: "Lokasi 86",
        description: "Deskripsi lokasi 86",
        rotation: "0 180 0",
        cameraYaw: 0
    }
];
