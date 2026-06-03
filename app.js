/* =========================================================
   VIRTUAL TOUR – Fakultas Teknik Informatika UNRI
   app.js – Main Application Logic (Optimized Lazy Loading)
   =========================================================
   Fitur:
   - LAZY LOADING: Hanya muat gambar yang dibutuhkan
   - Loading screen hanya tunggu 1 gambar (bukan semua)
   - Smart preload: otomatis siapkan scene tetangga
   - Image cache dengan LRU (max 7 gambar di memory)
   - Mini spinner saat scene belum siap
   - Zoom-forward transition (Google Maps style)
   - HUD: nav prev/next, thumbnail strip, scene dots
   - Compass live (mengikuti arah pandang kamera)
   - Fullscreen API, Gyroscope mobile
   - Drag hint auto-hide
   ========================================================= */

'use strict';

// ── DOM References ─────────────────────────────────────────
const $loadingScreen = document.getElementById('loading-screen');
const $loadingBar = document.getElementById('loadingBar');
const $loadingHint = document.getElementById('loadingHint');

const $sky = document.getElementById('sky');
const $fadeOverlay = document.getElementById('fadeOverlay');

const $btnPrev = document.getElementById('btnPrev');
const $btnNext = document.getElementById('btnNext');
const $btnFullscreen = document.getElementById('btnFullscreen');
const $btnVR = document.getElementById('btnVR');
const $btnGyro = document.getElementById('btnGyro');

const $sceneLabel = document.getElementById('sceneLabel');
const $sceneDesc = document.getElementById('sceneDesc');
const $sceneNum = document.getElementById('sceneNum');
const $sceneTotal = document.getElementById('sceneTotal');
const $sceneDots = document.getElementById('sceneDots');
const $dragHint = document.getElementById('dragHint');
const $compassNeedle = document.querySelector('.compass-needle');
const $sceneSpinner = document.getElementById('sceneSpinner');
const $navBtnNext = document.getElementById('navBtnNext');
const $navBtnPrev = document.getElementById('navBtnPrev');
const $cursor = document.getElementById('cursor');
const $selectScene = document.getElementById('selectScene');

// ── State ──────────────────────────────────────────────────
let currentIndex = 0;
let isTransitioning = false;
let gyroEnabled = false;
let hintDismissed = false;

// ── Image Cache (LRU) ─────────────────────────────────────
// Menyimpan Image objects yang sudah dimuat.
// Max 7 gambar di memory agar tidak boros RAM.
const IMAGE_CACHE_MAX = 7;
const imageCache = new Map(); // key: scene index, value: Image object

/**
 * Muat gambar secara lazy. Mengembalikan Promise<Image>.
 * Jika sudah ada di cache, langsung resolve.
 */
function loadImage(index) {
    if (index < 0 || index >= SCENES.length) return Promise.resolve(null);

    // Sudah di cache? Pindahkan ke akhir (LRU) dan return
    if (imageCache.has(index)) {
        const cached = imageCache.get(index);
        imageCache.delete(index);
        imageCache.set(index, cached);
        return Promise.resolve(cached);
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            addToCache(index, img);
            resolve(img);
        };
        img.onerror = () => {
            // Tetap resolve agar tidak block
            resolve(null);
        };
        img.src = SCENES[index].src;
    });
}

/**
 * Tambahkan gambar ke cache. Evict yang paling lama jika penuh.
 */
function addToCache(index, img) {
    if (imageCache.has(index)) {
        imageCache.delete(index);
    }
    imageCache.set(index, img);

    // Evict oldest jika melebihi batas
    while (imageCache.size > IMAGE_CACHE_MAX) {
        const oldestKey = imageCache.keys().next().value;
        imageCache.delete(oldestKey);
    }
}

/**
 * Cek apakah gambar sudah tersedia di cache.
 */
function isImageCached(index) {
    return imageCache.has(index);
}

/**
 * Preload scene-scene tetangga di background (tidak blocking).
 * Preload: current-1, current+1, current+2 (dengan wrap-around)
 */
function preloadNeighbors(centerIndex) {
    const total = SCENES.length;
    const toPreload = [
        (centerIndex - 1 + total) % total,
        (centerIndex + 1) % total,
        (centerIndex + 2) % total
    ];
    toPreload.forEach(i => {
        if (!imageCache.has(i)) {
            loadImage(i); // fire-and-forget
        }
    });
}

// ── Init ───────────────────────────────────────────────────
function init() {
    if ($sceneTotal) $sceneTotal.textContent = SCENES.length;

    buildDots();
    loadFirstScene();
    bindEvents();
    bindZoom();
    initVirtualNav();
    populateSceneSelector();
    startCompass();
    scheduleDragHintDismiss();
}

// ── Build Scene Dots (max 3 bulir) ─────────────────────────
// Hanya 3 dot: kiri = awal, tengah = tengah, kanan = akhir
function buildDots() {
    $sceneDots.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'scene-dot';
        $sceneDots.appendChild(dot);
    }
    updateDots();
}

/**
 * Update posisi dot aktif berdasarkan currentIndex:
 * - Foto pertama (index 0) → dot kiri aktif
 * - Foto terakhir → dot kanan aktif
 * - Di tengah-tengah → dot tengah aktif
 */
function updateDots() {
    const dots = $sceneDots.querySelectorAll('.scene-dot');
    if (dots.length < 3) return;

    let activeIdx;
    if (currentIndex === 0) {
        activeIdx = 0; // kiri
    } else if (currentIndex === SCENES.length - 1) {
        activeIdx = 2; // kanan
    } else {
        activeIdx = 1; // tengah
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
    });
}


// ── Load First Scene (menggantikan preloadAssets) ──────────
// Hanya muat 1 gambar pertama, lalu preload tetangga di background.
function loadFirstScene() {
    $loadingHint.textContent = 'Memuat panorama 360°...';

    // Simulasi progress bar yang halus
    let fakeProgress = 0;
    const fakeInterval = setInterval(() => {
        fakeProgress = Math.min(fakeProgress + Math.random() * 15, 85);
        $loadingBar.style.width = fakeProgress + '%';
    }, 200);

    const aScene = document.getElementById('aScene');

    const applyFirstScene = () => {
        // Muat gambar pertama
        loadImage(0).then(() => {
            clearInterval(fakeInterval);
            $loadingBar.style.width = '100%';
            $loadingHint.textContent = 'Siap!';

            $sky.setAttribute('src', SCENES[0].src);
            $sky.setAttribute('rotation', SCENES[0].rotation);
            applyCameraYaw(SCENES[0].cameraYaw);
            updateHUD();

            // Preload tetangga di background
            preloadNeighbors(0);

            setTimeout(hideLoading, 400);
        });
    };

    if (aScene.hasLoaded) {
        applyFirstScene();
    } else {
        aScene.addEventListener('loaded', applyFirstScene, { once: true });
    }

    // Fallback timeout (jika gambar pertama gagal load)
    setTimeout(() => {
        if (!$loadingScreen.classList.contains('hidden')) {
            clearInterval(fakeInterval);
            $loadingBar.style.width = '100%';
            $sky.setAttribute('src', SCENES[0].src);
            $sky.setAttribute('rotation', SCENES[0].rotation);
            applyCameraYaw(SCENES[0].cameraYaw);
            updateHUD();
            setTimeout(hideLoading, 300);
        }
    }, 15000);
}

function hideLoading() {
    $loadingScreen.classList.add('hidden');
}

// ── Core: Go To Scene (Google Maps zoom-forward transition) ──
const FOV_NORMAL = 80;   // derajat FOV saat normal
const FOV_ZOOMED = 52;   // derajat FOV saat zoom-in (makin kecil = makin zoom)
const ZOOM_IN_MS = 380;  // durasi zoom-in (ms)
const ZOOM_OUT_MS = 440;  // durasi zoom-out / settle (ms)
const SWAP_HOLD = 55;   // jeda setelah swap sebelum zoom-out (ms)

function goToScene(index) {
    if (isTransitioning) return;

    // Wrap-around: navigasi circular
    const total = SCENES.length;
    index = ((index % total) + total) % total;

    if (index === currentIndex) return;

    isTransitioning = true;
    const next = SCENES[index];
    const camEl = document.getElementById('camera');
    const canvas = document.querySelector('a-scene canvas');

    // Cek apakah gambar sudah ada di cache
    if (isImageCached(index)) {
        // Gambar sudah siap — langsung transisi
        performTransition(index, next, camEl, canvas);
    } else {
        // Gambar belum siap — tampilkan spinner, muat dulu
        showSceneSpinner();

        loadImage(index).then(() => {
            hideSceneSpinner();
            performTransition(index, next, camEl, canvas);
        });
    }
}

/**
 * Jalankan animasi transisi zoom-forward.
 */
function performTransition(index, next, camEl, canvas) {
    // Sembunyikan virtual buttons selama transisi
    hideVirtualButtons();

    // ── Phase 1: Zoom-in (maju ke depan) ──────────────────
    canvas?.classList.add('vr-zoom');

    animateFOV(camEl, FOV_NORMAL, FOV_ZOOMED, ZOOM_IN_MS, easeInCubic, () => {

        // ── Midpoint: swap scene (tak terlihat karena penuh zoom) ──
        resetZoom();
        $sky.setAttribute('src', next.src);
        $sky.setAttribute('rotation', next.rotation);
        applyCameraYaw(next.cameraYaw);
        currentIndex = index;
        updateHUD();

        // ── Phase 2: Zoom-out (settle ke lokasi baru) ──────
        setTimeout(() => {
            canvas?.classList.remove('vr-zoom');

            animateFOV(camEl, FOV_ZOOMED, FOV_NORMAL, ZOOM_OUT_MS, easeOutCubic, () => {
                isTransitioning = false;
            });

            // Preload tetangga baru di background
            preloadNeighbors(index);
        }, SWAP_HOLD);
    });
}

/**
 * Tampilkan mini spinner saat gambar scene sedang dimuat.
 */
function showSceneSpinner() {
    if ($sceneSpinner) $sceneSpinner.classList.add('visible');
}

function hideSceneSpinner() {
    if ($sceneSpinner) $sceneSpinner.classList.remove('visible');
}

// ── FOV Animation Engine ───────────────────────────────────
function animateFOV(camEl, fromFov, toFov, duration, easeFn, onComplete) {
    const startTime = performance.now();

    function tick(now) {
        const raw = Math.min((now - startTime) / duration, 1);
        const eased = easeFn(raw);
        const fov = fromFov + (toFov - fromFov) * eased;

        camEl.setAttribute('camera', 'fov', fov);

        if (raw < 1) {
            requestAnimationFrame(tick);
        } else {
            onComplete && onComplete();
        }
    }

    requestAnimationFrame(tick);
}

// ── Easing functions ───────────────────────────────────────
function easeInCubic(t) { return t * t * t; }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

// ── Apply Camera Yaw (arah pandang awal per scene) ─────────
function applyCameraYaw(yawDeg) {
    const camEl = document.getElementById('camera');
    if (!camEl || !camEl.object3D) return;
    camEl.object3D.rotation.y = THREE.MathUtils.degToRad(yawDeg || 0);
    camEl.object3D.rotation.x = 0; // reset pitch ke horizon
}

// ── Virtual Navigation Buttons (Google Street View style) ────
// Default positions jika tidak ditentukan di scene.js
const DEFAULT_NAV_NEXT = "0 0 -5";
const DEFAULT_NAV_PREV = "0 0 5";
const DEFAULT_NAV_NEXT_ROT = "-90 0 0";
const DEFAULT_NAV_PREV_ROT = "-90 180 0";

/**
 * Inisialisasi click handler untuk virtual buttons.
 */
function initVirtualNav() {
    if ($navBtnNext) {
        $navBtnNext.addEventListener('click', () => {
            goToScene(currentIndex + 1);
        });
    }
    if ($navBtnPrev) {
        $navBtnPrev.addEventListener('click', () => {
            goToScene(currentIndex - 1);
        });
    }
}

/**
 * Update posisi dan rotasi virtual buttons berdasarkan data scene.
 * Jika scene tidak memiliki navNext/navPrev, gunakan default.
 */
function updateVirtualButtons() {
    const scene = SCENES[currentIndex];

    if ($navBtnNext) {
        $navBtnNext.setAttribute('position', scene.navNext || DEFAULT_NAV_NEXT);
        $navBtnNext.setAttribute('rotation', scene.navNextRot || DEFAULT_NAV_NEXT_ROT);
        $navBtnNext.setAttribute('visible', true);
    }

    if ($navBtnPrev) {
        $navBtnPrev.setAttribute('position', scene.navPrev || DEFAULT_NAV_PREV);
        $navBtnPrev.setAttribute('rotation', scene.navPrevRot || DEFAULT_NAV_PREV_ROT);
        $navBtnPrev.setAttribute('visible', true);
    }
}

/**
 * Sembunyikan virtual buttons saat transisi.
 */
function hideVirtualButtons() {
    if ($navBtnNext) $navBtnNext.setAttribute('visible', false);
    if ($navBtnPrev) $navBtnPrev.setAttribute('visible', false);
}

// ── Update HUD ──────────────────────────────────────────────
function updateHUD() {
    const scene = SCENES[currentIndex];

    if ($sceneLabel) $sceneLabel.textContent = scene.label;
    if ($sceneDesc) $sceneDesc.textContent = scene.description;
    if ($sceneNum) $sceneNum.textContent = currentIndex + 1;

    // Navigasi circular — tombol selalu aktif
    if ($btnPrev) $btnPrev.disabled = false;
    if ($btnNext) $btnNext.disabled = false;

    // Update 3-dot indicator
    updateDots();

    // Update posisi virtual nav buttons
    updateVirtualButtons();
}

// ── Compass (live dari rotasi kamera) ──────────────────────
// COMPASS_OFFSET: geser arah North di HUD (derajat, searah jarum jam)
// 0 = default | 90 = North geser 90° ke kanan | -90 = ke kiri
const COMPASS_OFFSET = 90;

function startCompass() {
    const camEl = document.getElementById('camera');
    if (!camEl) return;

    // Tunggu sampai A-Frame scene siap
    const aScene = document.getElementById('aScene');
    const run = () => {
        setInterval(() => {
            if (!camEl.object3D) return;
            const yDeg = THREE.MathUtils.radToDeg(camEl.object3D.rotation.y);
            $compassNeedle.style.transform = `rotate(${-yDeg + COMPASS_OFFSET}deg)`;
        }, 60);
    };

    if (aScene.hasLoaded) run();
    else aScene.addEventListener('loaded', run, { once: true });
}

// ── Drag Hint Auto-hide ─────────────────────────────────────
function scheduleDragHintDismiss() {
    const dismiss = () => {
        if (hintDismissed) return;
        hintDismissed = true;
        $dragHint.classList.add('hidden');
        window.removeEventListener('mousemove', dismiss);
        window.removeEventListener('touchstart', dismiss);
    };
    window.addEventListener('mousemove', dismiss);
    window.addEventListener('touchstart', dismiss);
    setTimeout(dismiss, 5000);
}

// ── Events ─────────────────────────────────────────────────
function bindEvents() {

    // Navigasi circular: next di akhir → kembali ke awal, prev di awal → ke akhir
    if ($btnNext) {
        $btnNext.addEventListener('click', () => {
            goToScene(currentIndex + 1);
        });
    }

    if ($btnPrev) {
        $btnPrev.addEventListener('click', () => {
            goToScene(currentIndex - 1);
        });
    }

    // Keyboard navigation (circular)
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight': case 'd':
                goToScene(currentIndex + 1);
                break;
            case 'ArrowLeft': case 'a':
                goToScene(currentIndex - 1);
                break;
            case 'f': case 'F':
                toggleFullscreen();
                break;
        }
    });

    $btnFullscreen.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', onFullscreenChange);

    $btnVR.addEventListener('click', () => {
        const s = document.getElementById('aScene');
        s.is('vr-mode') ? s.exitVR() : s.enterVR();
    });

    const aScene = document.getElementById('aScene');
    if (aScene) {
        aScene.addEventListener('enter-vr', () => {
            if ($cursor) {
                $cursor.setAttribute('raycaster', 'enabled: true; objects: .clickable');
                $cursor.setAttribute('visible', 'true');
            }
        });
        aScene.addEventListener('exit-vr', () => {
            if ($cursor) {
                $cursor.setAttribute('raycaster', 'enabled: false; objects: .clickable');
                $cursor.setAttribute('visible', 'false');
            }
        });
    }

    $btnGyro.addEventListener('click', toggleGyro);
}

// ── Zoom (scroll wheel + pinch) ────────────────────────────
// Mengubah FOV kamera untuk efek zoom in/out pada panorama
const ZOOM_FOV_MIN = 30;   // zoom-in maksimal
const ZOOM_FOV_MAX = 100;  // zoom-out maksimal
let currentFov = FOV_NORMAL;

function bindZoom() {
    const canvas = document.querySelector('a-scene');
    if (!canvas) return;

    // Mouse wheel zoom
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 3 : -3; // scroll down = zoom out, up = zoom in
        applyZoom(delta);
    }, { passive: false });

    // Pinch zoom (mobile)
    let lastPinchDist = 0;

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            lastPinchDist = getPinchDistance(e.touches);
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            const dist = getPinchDistance(e.touches);
            const diff = lastPinchDist - dist;
            applyZoom(diff * 0.15); // pinch in = zoom in, pinch out = zoom out
            lastPinchDist = dist;
        }
    });
}

function getPinchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function applyZoom(delta) {
    if (isTransitioning) return;
    const camEl = document.getElementById('camera');
    if (!camEl) return;

    currentFov = Math.max(ZOOM_FOV_MIN, Math.min(ZOOM_FOV_MAX, currentFov + delta));
    camEl.setAttribute('camera', 'fov', currentFov);
}

// Reset zoom saat pindah scene
function resetZoom() {
    currentFov = FOV_NORMAL;
    const camEl = document.getElementById('camera');
    if (camEl) camEl.setAttribute('camera', 'fov', FOV_NORMAL);
}

// ── Fullscreen ─────────────────────────────────────────────
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
    } else {
        document.exitFullscreen().catch(() => { });
    }
}

function onFullscreenChange() {
    const isFs = !!document.fullscreenElement;
    $btnFullscreen.title = isFs ? 'Keluar Layar Penuh' : 'Layar Penuh';
    $btnFullscreen.style.color = isFs ? 'var(--accent)' : '';
}

// ── Gyroscope ─────────────────────────────────────────────
function toggleGyro() {
    if (typeof DeviceOrientationEvent === 'undefined') {
        alert('Gyroscope tidak tersedia di perangkat ini.');
        return;
    }
    if (!gyroEnabled) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(r => { if (r === 'granted') enableGyro(); })
                .catch(console.error);
        } else {
            enableGyro();
        }
    } else {
        disableGyro();
    }
}

function enableGyro() {
    document.getElementById('camera')?.setAttribute('look-controls', 'enabled: true');
    gyroEnabled = true;
    $btnGyro.style.color = 'var(--accent)';
    $btnGyro.style.borderColor = 'var(--accent)';
}

function disableGyro() {
    gyroEnabled = false;
    $btnGyro.style.color = '';
    $btnGyro.style.borderColor = '';
}

// ── Jump to Scene by ID (Shortcut) ─────────────────────────
window.jumpToSceneById = function(id) {
    const targetIdx = SCENES.findIndex(s => s.id === Number(id));
    if (targetIdx !== -1) {
        goToScene(targetIdx);
    } else {
        console.warn(`Scene dengan ID ${id} tidak ditemukan.`);
    }
};

function populateSceneSelector() {
    if (!$selectScene) return;
    $selectScene.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = "";
    placeholder.textContent = "Lompat ke...";
    placeholder.disabled = true;
    placeholder.selected = true;
    $selectScene.appendChild(placeholder);

    SCENES.forEach(scene => {
        const opt = document.createElement('option');
        opt.value = scene.id;
        opt.textContent = `ID ${scene.id}: ${scene.label || ('Lokasi ' + scene.id)}`;
        $selectScene.appendChild(opt);
    });

    $selectScene.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
            window.jumpToSceneById(val);
            $selectScene.value = "";
        }
    });
}

// ── Bootstrap ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);