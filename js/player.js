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
        this.wobble = 0;
        this.wobbleSpeed = 0.1;
        this.knockback = 0;
    }

    update() {
        // Apply knockback
        this.x += this.knockback;
        this.knockback *= 0.9; // Dampen knockback over time

        // Wobble movement
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 2; // Wobble effect

        // Gravity and jumping
        this.y += this.velocityY;
        this.velocityY += this.gravity;

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
            this.velocityY += (Math.sin(this.wobble) * -5); // Jump direction based on wobble
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        // Draw a simple person shape
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 15, 10, 0, Math.PI * 2); // Head
        ctx.fillRect(this.x, this.y + 10, this.width, this.height - 10); // Body
        ctx.fillStyle = 'black'; // Legs
        ctx.fillRect(this.x, this.y + this.height - 10, this.width / 2, 10);
        ctx.fillRect(this.x + this.width / 2, this.y + this.height - 10, this.width / 2, 10);
    }
}
