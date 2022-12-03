class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.height_c = height;
        this.speedY = 0;
        this.jumpForce = 9;
        this.grounded = false;
        this.jumpTimer = 0;

        const img1 = new Image();
        const img2 = new Image();
        const img3 = new Image();
        const img4 = new Image();

        img1.addEventListener("load", () => {})
        img1.src = "./docs/assets/images/player_frames_img/dino-run-0.png";
        img2.addEventListener("load", () => {})
        img2.src = "./docs/assets/images/player_frames_img/dino-run-1.png";
        img3.addEventListener("load", () => {})
        img3.src = "./docs/assets/images/player_frames_img/dino-lose.png";
        img4.addEventListener("load", () => {})
        img4.src = "./docs/assets/images/player_frames_img/dino-stationary.png";

        this.img = img1;
        this.images = [img1, img2, img3, img4]
    };

    left() {
        return this.x;
    };

    right() {
        return this.x + this.width;
    };

    top() {
        return this.y;
    };

    bottom() {
        return this.y + this.height;
    };
    // detect colision
    colision(enemy) {
        return !(
            this.bottom() < enemy.top() ||
            this.top() > enemy.bottom() ||
            this.right() < enemy.left() ||
            this.left() > enemy.right()
        );
    };

    animate() {
        // jump if the z or the arrow up key is pressed
        if (keys["KeyZ"] || keys["ArrowUp"]) {
            this.jump();
        } else {
            this.jumpTimer = 0;
        };

        // bend move of the s or thre arrow down key is pressed
        if (keys["KeyS"] || keys["ArrowDown"]) {
            this.height = this.height_c - this.height_c * (20 / 100);
        } else {
            this.height = this.height_c;
        };

        this.y += this.speedY;

        if (this.y + this.height < cHeight) {
            this.speedY += gravity;
            this.grounded = false;
        } else {
            this.speedY = 0;
            this.grounded = true;
            this.y = cHeight - this.height;
        }
    };


    // jump function
    jump() {
        let sg = new Audio('./docs/assets/sounds/jump-sound.mp3');
        sg.play();
        if (this.grounded && this.jumpTimer === 0) {
            this.jumpTimer = 2;
            this.speedY = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 10) {
            this.jumpTimer++;
            this.speedY = -this.jumpForce - this.jumpTimer / 50;
        };
    };

    playerDraw(frames) {
        this.img = this.images[Math.floor(frames % 2)];
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    };
};

document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = e.code == "Space" ? true : false;
});