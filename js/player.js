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
        this.leanAngle = 0; // Leaning angle
        this.leanDirection = 0; // 1 for right, -1 for left
        this.knockback = 0;
        this.onPlatform = true;
    }

    update() {
        // Apply knockback
        this.x += this.knockback;
        this.knockback *= 0.9; // Dampen knockback over time

        // Update leaning
        this.leanAngle += this.leanDirection * 0.1;

        // Gravity and jumping
        if (this.onPlatform) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;

            // Check if on the platform
            if (this.y + this.height >= canvas.height - 100) {
                this.y = canvas.height - 100 - this.height; // Adjust to be on top of the platform
                this.isJumping = false;
                this.velocityY = 0;
            }
        }

        // Check for falling off the platform
        if (this.y > canvas.height) {
            this.onPlatform = false; // Player has fallen off
        }

        this.handleInput();
    }

    handleInput() {
        if (this.controls.jump && this.onPlatform) {
            this.velocityY = this.jumpPower;
            this.velocityY += (this.leanDirection * -5); // Jump direction based on lean
            this.onPlatform = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        // Draw a simple person shape
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + 15);
        ctx.rotate(this.leanAngle);
        ctx.fillRect(-this.width / 2, -15, this.width, this.height); // Body
        ctx.fillStyle = 'black'; // Legs
        ctx.fillRect(-this.width / 2, 0, this.width / 2, 10);
        ctx.fillRect(0, 0, this.width / 2, 10);
        ctx.restore();
    }
}
