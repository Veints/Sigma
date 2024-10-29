class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 50;
        this.color = color;
        this.gravity = 0.5;
        this.jumpPower = -10;
        this.velocityY = 0;
        this.onPlatform = true;
        this.leanDirection = 0; // -1 for left, 1 for right
    }

    update() {
        // Apply gravity
        if (!this.onPlatform) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;
        }

        // Ground collision
        if (this.y + this.height >= canvas.height - 100) {
            this.y = canvas.height - 100 - this.height;
            this.velocityY = 0;
            this.onPlatform = true;
        }

        // Move based on lean direction
        this.x += this.leanDirection * 2; // Adjust speed as needed
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width)); // Prevent going off-screen

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
        ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the player
    }
} 
