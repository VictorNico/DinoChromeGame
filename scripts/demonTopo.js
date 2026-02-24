class Obstacle2 {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speedX = -gameSpeed;
    };

    left()   { return this.x; };
    right()  { return this.x + this.width; };
    top()    { return this.y; };
    bottom() { return this.y + this.height; };

    update() {
        this.x += this.speedX;
        this.demonDraw();
        this.speedX = -gameSpeed;
    };

    demonDraw() {
        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;

        // Wing flap: alternate between two positions based on frames
        const wingUp = Math.floor(frames / 12) % 2 === 0;

        ctx.save();
        ctx.fillStyle = '#8B3A62';
        ctx.strokeStyle = '#5C2040';
        ctx.lineWidth = 1;

        const cx = x + w / 2;
        const cy = y + h / 2;

        // Body — horizontal ellipse
        ctx.beginPath();
        ctx.ellipse(cx, cy, w * 0.30, h * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Head — small circle at right side
        const hx = cx + w * 0.30;
        const hy = cy - h * 0.10;
        ctx.beginPath();
        ctx.arc(hx, hy, w * 0.13, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Beak — triangle pointing right
        ctx.beginPath();
        ctx.moveTo(hx + w * 0.13, hy);
        ctx.lineTo(hx + w * 0.30, hy - h * 0.06);
        ctx.lineTo(hx + w * 0.30, hy + h * 0.06);
        ctx.closePath();
        ctx.fill();

        // Eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(hx + w * 0.05, hy - h * 0.04, w * 0.04, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1a0010';
        ctx.beginPath();
        ctx.arc(hx + w * 0.06, hy - h * 0.04, w * 0.02, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#8B3A62';

        // Wings — left and right from body center
        if (wingUp) {
            // Wings raised
            // Left wing
            ctx.beginPath();
            ctx.moveTo(cx - w * 0.05, cy);
            ctx.lineTo(cx - w * 0.50, cy - h * 0.60);
            ctx.lineTo(cx - w * 0.20, cy - h * 0.10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Right wing
            ctx.beginPath();
            ctx.moveTo(cx + w * 0.05, cy);
            ctx.lineTo(cx + w * 0.50, cy - h * 0.60);
            ctx.lineTo(cx + w * 0.22, cy - h * 0.10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // Wings lowered
            // Left wing
            ctx.beginPath();
            ctx.moveTo(cx - w * 0.05, cy);
            ctx.lineTo(cx - w * 0.50, cy + h * 0.40);
            ctx.lineTo(cx - w * 0.20, cy + h * 0.05);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Right wing
            ctx.beginPath();
            ctx.moveTo(cx + w * 0.05, cy);
            ctx.lineTo(cx + w * 0.50, cy + h * 0.40);
            ctx.lineTo(cx + w * 0.22, cy + h * 0.05);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        // Tail — small triangle at left side
        ctx.beginPath();
        ctx.moveTo(cx - w * 0.30, cy);
        ctx.lineTo(cx - w * 0.50, cy - h * 0.15);
        ctx.lineTo(cx - w * 0.50, cy + h * 0.15);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    };
};
