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
// =============================================================

const SCENES = [
    {
        id: 1,
        src: "assets/images/6.jpg",
        label: "Gerbang Utama",
        description: "Pintu masuk Fakultas Teknik Informatika UNRI",
        rotation: "0 180 0",
        cameraYaw: 0          // ← ubah nilai ini untuk sesuaikan arah pandang awal
    },
    {
        id: 2,
        src: "assets/images/7.jpg",
        label: "Halaman Depan",
        description: "Area halaman depan gedung Fakultas Teknik Informatika",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 3,
        src: "assets/images/8.jpg",
        label: "Lorong Fakultas",
        description: "Koridor utama gedung Fakultas Teknik Informatika UNRI",
        rotation: "0 180 0",
        cameraYaw: 0
    },
    {
        id: 4,
        src: "assets/images/9.jpg",
        label: "Area Parkir",
        description: "Area parkir kendaraan Fakultas Teknik Informatika",
        rotation: "0 180 0",
        cameraYaw: 0
    }
];
