class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 50;
        this.color = color;
        this.controls = controls;
        this.gravity = 0.5;
        this.jumpPower = -10;
        this.velocityY = 0;
        this.isJumping = false;
    }

    update() {
        this.y += this.velocityY;
        this.velocityY += this.gravity;

        // Simple ground collision
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.isJumping = false;
            this.velocityY = 0;
        }

        this.handleInput();
    }

    handleInput() {
        if (this.controls.jump && !this.isJumping) {
            this.velocityY = this.jumpPower;
            this.isJumping = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
