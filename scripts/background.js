// Prehistoric parallax background — drawn each frame before all game objects
// Depends on globals: ctx, cWidth, cHeight, frames, period, weather, gameSpeed

let stars = null;

function initStars() {
    stars = Array.from({ length: 80 }, (_, i) => ({
        x: (i * 137.508) % 1,      // golden-ratio distribution [0,1)
        y: (i * 97.3) % 0.6,       // top 60 % of canvas
        r: (i % 3) + 1
    }));
}

function drawBackground() {
    if (!ctx) return;
    if (!stars) initStars();

    const isNight = period && period.includes('n');
    const isRain  = weather && weather.includes('rain');

    // ── 1. Sky gradient ────────────────────────────────────────────────────
    const skyGrad = ctx.createLinearGradient(0, 0, 0, cHeight);
    if (isNight) {
        skyGrad.addColorStop(0,   '#0a001f');
        skyGrad.addColorStop(0.5, '#1a0a3a');
        skyGrad.addColorStop(1,   '#2d1b69');
    } else {
        skyGrad.addColorStop(0,   '#e8734a');
        skyGrad.addColorStop(0.5, '#f0a500');
        skyGrad.addColorStop(1,   '#c9d6a3');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, cWidth, cHeight);

    // Rain sky overlay
    if (isRain) {
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, cWidth, cHeight);
    }

    // ── 2. Celestial bodies ────────────────────────────────────────────────
    if (isNight) {
        // Stars
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            const opacity = 0.5 + 0.5 * Math.sin(frames * 0.04 + i);
            ctx.beginPath();
            ctx.arc(s.x * cWidth, s.y * cHeight, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${opacity})`;
            ctx.fill();
        }

        // Moon (crescent)
        const mx = cWidth * 0.15;
        const my = cHeight * 0.13;
        const mr = cHeight * 0.055;
        // White disc
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fillStyle = '#fffbe6';
        ctx.fill();
        // Overlay disc to carve crescent (use night sky colour)
        ctx.beginPath();
        ctx.arc(mx + mr * 0.45, my - mr * 0.1, mr * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = '#1a0a3a';
        ctx.fill();
    } else {
        // Sun (day + sun weather or no weather data yet)
        if (!weather || weather.includes('sun')) {
            const sx = cWidth * 0.85;
            const sy = cHeight * 0.12;
            const sr = cHeight * 0.07;

            // Outer halos
            ctx.beginPath();
            ctx.arc(sx, sy, sr * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,220,50,0.1)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(sx, sy, sr * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,220,50,0.2)';
            ctx.fill();

            // Sun core
            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.fillStyle = '#fff176';
            ctx.fill();
        }
    }

    // ── 3. Volcanos — far layer (very slow scroll) ─────────────────────────
    const offsetFar = (frames * 0.25) % cWidth;

    for (let pass = 0; pass < 2; pass++) {
        const baseX = (pass === 0 ? 0 : -cWidth) + offsetFar;
        drawVolcano(baseX + cWidth * 0.15, cHeight * 0.72, cWidth * 0.14, cHeight * 0.28);
        drawVolcano(baseX + cWidth * 0.62, cHeight * 0.78, cWidth * 0.10, cHeight * 0.22);
    }

    // ── 4. Rocky hills — mid layer ─────────────────────────────────────────
    const offsetMid = (frames * 0.6) % cWidth;

    ctx.fillStyle = '#2a1500';
    for (let pass = 0; pass < 2; pass++) {
        const bx = (pass === 0 ? 0 : -cWidth) + offsetMid;
        drawHills(bx);
    }

    // ── 5. Prehistoric vegetation — near layer ─────────────────────────────
    const offsetNear = (frames * gameSpeed * 0.5) % cWidth;

    // Six plant positions as fractions of cWidth
    const plantOffsets = [0.05, 0.20, 0.38, 0.55, 0.72, 0.90];
    for (let pass = 0; pass < 2; pass++) {
        const bx = (pass === 0 ? 0 : -cWidth) + offsetNear;
        for (let j = 0; j < plantOffsets.length; j++) {
            const px = bx + plantOffsets[j] * cWidth;
            const py = cHeight - 2; // ground level
            if (j % 2 === 0) {
                drawFern(px, py, cHeight * (0.08 + (j % 3) * 0.025));
            } else {
                drawCycad(px, py, cHeight * (0.10 + (j % 3) * 0.02));
            }
        }
    }

    // ── 6. Canvas rain ────────────────────────────────────────────────────
    if (isRain) {
        ctx.strokeStyle = 'rgba(180,200,255,0.5)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 80; i++) {
            const rx = (i * 137.508 * cWidth / 80) % cWidth;
            const ry = (frames * 6 + i * 23) % cHeight;
            ctx.beginPath();
            ctx.moveTo(rx, ry);
            ctx.lineTo(rx + 2, ry + 6);
            ctx.stroke();
        }
    }
}

// ── Volcano helper ─────────────────────────────────────────────────────────
function drawVolcano(tipX, tipY, baseHalfW, height) {
    const baseY = tipY + height * 0.15;
    const leftBase  = tipX - baseHalfW;
    const rightBase = tipX + baseHalfW;
    const craterW   = baseHalfW * 0.35;

    // Body — radial gradient for depth
    const vGrad = ctx.createRadialGradient(tipX, baseY, baseHalfW * 0.1, tipX, baseY, baseHalfW);
    vGrad.addColorStop(0, '#4a2000');
    vGrad.addColorStop(1, '#1a0800');

    ctx.beginPath();
    ctx.moveTo(leftBase,  baseY);
    ctx.lineTo(tipX - craterW, tipY);
    ctx.lineTo(tipX + craterW, tipY);
    ctx.lineTo(rightBase, baseY);
    ctx.closePath();
    ctx.fillStyle = vGrad;
    ctx.fill();

    // Crater glow
    ctx.beginPath();
    ctx.ellipse(tipX, tipY + 2, craterW, craterW * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,80,0,0.6)';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(tipX, tipY + 2, craterW * 0.6, craterW * 0.22, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,200,0,0.7)';
    ctx.fill();

    // Smoke puffs
    for (let i = 0; i < 3; i++) {
        const smokeProgress = (frames * 0.3 + i * 20) % (cHeight * 0.4);
        const sy = tipY - smokeProgress;
        const sr = 4 + smokeProgress * 0.06;
        const alpha = Math.max(0, 0.35 - smokeProgress / (cHeight * 0.4) * 0.35);
        ctx.beginPath();
        ctx.arc(tipX + (i - 1) * 5, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,60,50,${alpha})`;
        ctx.fill();
    }
}

// ── Rocky hills helper ─────────────────────────────────────────────────────
function drawHills(baseX) {
    const groundY = cHeight;
    const hillH   = cHeight * 0.18;

    // Fixed jagged silhouette points (relative dx, dy pairs)
    const pts = [
        [0,      0],
        [0.04,  -hillH * 0.6],
        [0.08,  -hillH * 0.9],
        [0.13,  -hillH * 0.5],
        [0.18,  -hillH * 1.0],
        [0.25,  -hillH * 0.7],
        [0.31,  -hillH * 0.4],
        [0.38,  -hillH * 0.85],
        [0.45,  -hillH * 0.55],
        [0.52,  -hillH * 0.95],
        [0.60,  -hillH * 0.65],
        [0.68,  -hillH * 0.5],
        [0.75,  -hillH * 0.8],
        [0.82,  -hillH * 0.45],
        [0.90,  -hillH * 0.7],
        [0.96,  -hillH * 0.35],
        [1.00,  0],
    ];

    ctx.beginPath();
    ctx.moveTo(baseX + pts[0][0] * cWidth, groundY + pts[0][1]);
    for (let k = 1; k < pts.length; k++) {
        ctx.lineTo(baseX + pts[k][0] * cWidth, groundY + pts[k][1]);
    }
    ctx.lineTo(baseX + cWidth, groundY);
    ctx.lineTo(baseX,          groundY);
    ctx.closePath();
    ctx.fillStyle = '#2a1500';
    ctx.fill();

    // A few texture stria lines
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    for (let k = 1; k < pts.length - 1; k += 3) {
        const px = baseX + pts[k][0] * cWidth;
        const py = groundY + pts[k][1];
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + 8, py + 12);
        ctx.stroke();
    }
}

// ── Fern helper ────────────────────────────────────────────────────────────
function drawFern(x, groundY, h) {
    const stemTop = groundY - h;

    // Stem
    ctx.strokeStyle = '#1a4a1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x, stemTop);
    ctx.stroke();

    // 5 pairs of leaves
    const leafPairs = 5;
    for (let k = 0; k < leafPairs; k++) {
        const t   = (k + 1) / (leafPairs + 1);
        const ly  = groundY - h * t;
        const lLen = h * (0.35 - t * 0.12);
        const angle = Math.PI / 4 + t * 0.2;

        ctx.strokeStyle = k < 2 ? '#2d7a2d' : '#1a4a1a';
        ctx.lineWidth = 1.5;

        // Left leaf
        ctx.beginPath();
        ctx.moveTo(x, ly);
        ctx.quadraticCurveTo(x - lLen * 0.5, ly - lLen * 0.3, x - lLen, ly - lLen * 0.1);
        ctx.stroke();

        // Right leaf
        ctx.beginPath();
        ctx.moveTo(x, ly);
        ctx.quadraticCurveTo(x + lLen * 0.5, ly - lLen * 0.3, x + lLen, ly - lLen * 0.1);
        ctx.stroke();
    }
}

// ── Cycad helper ───────────────────────────────────────────────────────────
function drawCycad(x, groundY, h) {
    const stemTop = groundY - h * 0.65;

    // Trunk
    ctx.strokeStyle = '#3a2800';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x, stemTop);
    ctx.stroke();

    // Crown of leaves fanning out
    const leafCount = 7;
    for (let k = 0; k < leafCount; k++) {
        const angle = -Math.PI + (k / (leafCount - 1)) * Math.PI;
        const lLen  = h * (0.55 - Math.abs(k - (leafCount - 1) / 2) * 0.05);
        const ex = x + Math.cos(angle) * lLen;
        const ey = stemTop + Math.sin(angle) * lLen * 0.4;

        ctx.strokeStyle = k % 2 === 0 ? '#2d7a2d' : '#1a4a1a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, stemTop);
        ctx.quadraticCurveTo(
            x + Math.cos(angle) * lLen * 0.5,
            stemTop + Math.sin(angle) * lLen * 0.6 - h * 0.1,
            ex, ey
        );
        ctx.stroke();
    }
}
