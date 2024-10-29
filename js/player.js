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
        this.onPlatform = true;
        this.leanDirection = 0;
        this.leanAngle = 0;
    }

    update() {
        if (this.onPlatform) {
            this.y += this.velocityY;
            if (this.y + this.height >= canvas.height - 100) {
                this.y = canvas.height - 100 - this.height; 
                this.velocityY = 0;
            }
        }
        this.handleInput();
    }

    handleInput() {
        if (this.controls.jump && this.onPlatform) {
            this.velocityY = this.jumpPower;
            this.onPlatform = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height);
        ctx.rotate(this.leanAngle);
        ctx.fillRect(-this.width / 2, -this.height, this.width, this.height);
        ctx.restore();
    }
}
