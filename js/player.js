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
        this.knockback = 0; // Knockback effect
        this.controls = {
            jump: false,
            leanDirection: 0,
            shoot: false,
            shootDuration: 0
        }; // Initialize controls
    }

    update(players) {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Prevent falling through the platform
        if (this.y > canvas.height - 140) { // Adjust based on platform position
            this.y = canvas.height - 140; // Reset position to platform height
            this.velocityY = 0; // Reset vertical velocity
        }

        // Lean logic
        this.x += this.controls.leanDirection;

        // Apply knockback
        this.x += this.knockback;
        this.knockback *= 0.9; // Gradually reduce knockback

        // Check collision with other players
        for (let player of players) {
            if (player !== this) {
                if (this.x < player.x + player.width &&
                    this.x + this.width > player.x &&
                    this.y < player.y + player.height &&
                    this.y + this.height > player.y) {
                    // Collision detected, prevent overlap
                    if (this.controls.leanDirection < 0) {
                        this.x = player.x + player.width; // Prevent left overlap
                    } else if (this.controls.leanDirection > 0) {
                        this.x = player.x - this.width; // Prevent right overlap
                    }
                }
            }
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

    applyKnockback(direction) {
        this.knockback = direction * 5; // Adjust the knockback strength
    }
}
