class Player {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 20; // Player width
        this.height = 40; // Player height
        this.velocityY = 0; // Vertical velocity
        this.gravity = 1; // Gravity
        this.jumpPower = -15; // Jump power
        this.controls = {
            jump: false,
            leanDirection: 0,
        }; // Initialize controls here
    }

    update() {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Jump logic
        if (this.controls.jump) {
            this.velocityY = this.jumpPower;
        }

        // Lean logic
        this.x += this.controls.leanDirection; // Adjust player position based on lean direction

        // Prevent falling through the platform
        if (this.y > canvas.height - 140) { // Adjust based on platform position
            this.y = canvas.height - 140; // Reset position to platform height
            this.velocityY = 0; // Reset vertical velocity
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw head and arms
        ctx.fillStyle = 'black'; // Color for head
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y - 10, 10, 0, Math.PI * 2); // Head
        ctx.fill();
        ctx.fillStyle = 'black'; // Color for arms
        ctx.fillRect(this.x - 5, this.y + 5, 5, 15); // Left arm
        ctx.fillRect(this.x + this.width, this.y + 5, 5, 15); // Right arm
    }

    handleInput() {
        // Ensure controls are defined
        if (!this.controls) {
            console.error("Controls are not defined for this player.");
            return;
        }
    }
}
