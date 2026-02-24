class Obstacle {
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

        ctx.save();
        ctx.fillStyle = '#3d8c3d';

        const tw = w * 0.30;            // trunk width
        const tx = x + (w - tw) / 2;   // trunk x (centered)

        // main trunk
        ctx.fillRect(tx, y + h * 0.12, tw, h * 0.88);
        // trunk rounded top
        ctx.beginPath();
        ctx.arc(tx + tw / 2, y + h * 0.12, tw / 2, Math.PI, 0);
        ctx.fill();

        // left arm — horizontal bar
        const lArmY = y + h * 0.33;
        const lArmH = h * 0.13;
        ctx.fillRect(x, lArmY, tx - x + tw * 0.5, lArmH);
        // left arm — vertical segment
        const lUpW = w * 0.16;
        const lUpH = h * 0.24;
        ctx.fillRect(x, lArmY - lUpH, lUpW, lUpH + lArmH);
        // left arm — rounded top
        ctx.beginPath();
        ctx.arc(x + lUpW / 2, lArmY - lUpH, lUpW / 2, Math.PI, 0);
        ctx.fill();

        // right arm — horizontal bar
        const rArmY = y + h * 0.50;
        const rArmH = h * 0.13;
        ctx.fillRect(tx + tw * 0.5, rArmY, (x + w) - (tx + tw * 0.5), rArmH);
        // right arm — vertical segment
        const rUpW = w * 0.16;
        const rUpH = h * 0.24;
        ctx.fillRect(x + w - rUpW, rArmY - rUpH, rUpW, rUpH + rArmH);
        // right arm — rounded top
        ctx.beginPath();
        ctx.arc(x + w - rUpW / 2, rArmY - rUpH, rUpW / 2, Math.PI, 0);
        ctx.fill();

        ctx.restore();
    };
};

function spawnObstacle() {
    let size = demonSize(45, 65);
    let obstacle;
    if (Math.round(Math.random() * 2) == 0) {
        let a = [cHeight, cHeight - 2 * size];
        obstacle = new Obstacle2(cWidth + size, a[Math.floor(Math.random() * 2)] - size, size, size);
    } else {
        obstacle = new Obstacle(cWidth + size, cHeight - size, size, size);
    };
    obstacles.push(obstacle);
};

function demonSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
