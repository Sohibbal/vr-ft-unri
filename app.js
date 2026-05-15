/* =========================================================
   VIRTUAL TOUR – Fakultas Teknik Informatika UNRI
   app.js – Main Application Logic
   =========================================================
   Fitur:
   - Loading screen dengan progress bar
   - Zoom-forward transition (Google Maps style): FOV animate + canvas blur
   - Rotasi 90° ke kiri setiap gambar (koreksi orientasi)
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
const $thumbStrip = document.getElementById('thumbStrip');
const $dragHint = document.getElementById('dragHint');
const $compassNeedle = document.querySelector('.compass-needle');

// ── State ──────────────────────────────────────────────────
let currentIndex = 0;
let isTransitioning = false;
let gyroEnabled = false;
let hintDismissed = false;

// ── Init ───────────────────────────────────────────────────
function init() {
    $sceneTotal.textContent = SCENES.length;

    buildDots();
    buildThumbnails();
    preloadAssets();
    bindEvents();
    startCompass();
    scheduleDragHintDismiss();
}

// ── Build Scene Dots ───────────────────────────────────────
function buildDots() {
    $sceneDots.innerHTML = '';
    SCENES.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'scene-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', () => goToScene(i));
        $sceneDots.appendChild(dot);
    });
}

// ── Build Thumbnail Strip ──────────────────────────────────
function buildThumbnails() {
    $thumbStrip.innerHTML = '';
    SCENES.forEach((scene, i) => {
        const item = document.createElement('div');
        item.className = 'thumb-item' + (i === 0 ? ' active' : '');
        item.dataset.index = i;
        item.title = scene.label;

        const img = document.createElement('img');
        img.src = scene.src;
        img.alt = scene.label;
        img.loading = 'lazy';

        const num = document.createElement('span');
        num.className = 'thumb-num';
        num.textContent = i + 1;

        item.appendChild(img);
        item.appendChild(num);
        item.addEventListener('click', () => goToScene(i));
        $thumbStrip.appendChild(item);
    });
}

// ── Preload Assets ─────────────────────────────────────────
function preloadAssets() {
    const total = SCENES.length;
    let loaded = 0;
    const hints = [
        'Memuat panorama 360°...',
        'Menyiapkan tampilan virtual...',
        'Mengoptimalkan kualitas gambar...',
        'Hampir selesai...'
    ];

    // ⚠️  Tunggu A-Frame scene siap sebelum set src
    const aScene = document.getElementById('aScene');

    const applyFirstScene = () => {
        $sky.setAttribute('src', SCENES[0].src);
        $sky.setAttribute('rotation', SCENES[0].rotation);
        applyCameraYaw(SCENES[0].cameraYaw);
        updateHUD();
    };

    if (aScene.hasLoaded) {
        applyFirstScene();
    } else {
        aScene.addEventListener('loaded', applyFirstScene, { once: true });
    }

    // Preload semua gambar lewat Image() untuk progress bar
    SCENES.forEach((scene, i) => {
        const img = new Image();
        img.onload = onImageDone;
        img.onerror = onImageDone;
        img.src = scene.src;

        function onImageDone() {
            loaded++;
            const pct = Math.round((loaded / total) * 100);
            $loadingBar.style.width = pct + '%';
            $loadingHint.textContent = hints[Math.min(i, hints.length - 1)];
            if (loaded >= total) setTimeout(hideLoading, 450);
        }
    });

    // Fallback timeout
    setTimeout(() => {
        if (!$loadingScreen.classList.contains('hidden')) {
            $loadingBar.style.width = '100%';
            setTimeout(hideLoading, 300);
        }
    }, 6000);
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
    if (index < 0 || index >= SCENES.length) return;
    if (index === currentIndex) return;

    isTransitioning = true;
    const next = SCENES[index];
    const camEl = document.getElementById('camera');
    const canvas = document.querySelector('a-scene canvas');

    // ── Phase 1: Zoom-in (maju ke depan) ──────────────────
    canvas?.classList.add('vr-zoom');

    animateFOV(camEl, FOV_NORMAL, FOV_ZOOMED, ZOOM_IN_MS, easeInCubic, () => {

        // ── Midpoint: swap scene (tak terlihat karena penuh zoom) ──
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
        }, SWAP_HOLD);
    });
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

// ── Update HUD ──────────────────────────────────────────────
function updateHUD() {
    const scene = SCENES[currentIndex];

    $sceneLabel.textContent = scene.label;
    $sceneDesc.textContent = scene.description;
    $sceneNum.textContent = currentIndex + 1;

    $btnPrev.disabled = currentIndex === 0;
    $btnNext.disabled = currentIndex === SCENES.length - 1;

    // Dots
    document.querySelectorAll('.scene-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });

    // Thumbnails
    document.querySelectorAll('.thumb-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentIndex);
    });

    // Scroll active thumbnail into view
    const activeThumb = $thumbStrip.querySelector('.thumb-item.active');
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
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

    $btnNext.addEventListener('click', () => {
        if (currentIndex < SCENES.length - 1) goToScene(currentIndex + 1);
    });

    $btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) goToScene(currentIndex - 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight': case 'd':
                if (currentIndex < SCENES.length - 1) goToScene(currentIndex + 1);
                break;
            case 'ArrowLeft': case 'a':
                if (currentIndex > 0) goToScene(currentIndex - 1);
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

    $btnGyro.addEventListener('click', toggleGyro);
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

// ── Bootstrap ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);