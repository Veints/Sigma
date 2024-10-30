class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 20;
        this.height = 40;
        this.angle = 90; // Start upright
        this.gravity = 0.5;
        this.velocityY = 0;
        this.isJumping = false;
        this.jumpPower = -10;
        this.knockback = 0;
        this.controls = controls;
    }

    update(players) {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Prevent falling through the platform
        if (this.y > canvas.height - 140) {
            this.y = canvas.height - 140;
            this.velocityY = 0;
            this.isJumping = false;
        }

        // Leaning mechanics
        if (this.controls.leanLeft) {
            this.angle = Math.max(this.angle - 2, 20);
        } else if (this.controls.leanRight) {
            this.angle = Math.min(this.angle + 2, 90);
        }

        // Jumping mechanics
        if (this.controls.jump && !this.isJumping && this.y >= canvas.height - 140) {
            this.velocityY = this.jumpPower; // Jump straight up
            this.isJumping = true; // Set jumping state
            this.controls.jump = false; // Reset jump
        }

        // Apply knockback
        this.x += this.knockback;
        this.knockback *= 0.9;

        // Prevent overlap with other players
        for (let player of players) {
            if (player !== this) {
                if (this.x < player.x + player.width &&
                    this.x + this.width > player.x &&
                    this.y < player.y + player.height &&
                    this.y + this.height > player.y) {
                    // Prevent overlap
                    if (this.knockback > 0) {
                        this.x = player.x - this.width; // Move left
                    } else {
                        this.x = player.x + player.width; // Move right
                    }
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height);
        ctx.rotate((this.angle * Math.PI) / 180); // Rotate based on angle
        ctx.fillRect(-this.width / 2, -this.height, this.width, this.height); // Draw the player
        ctx.restore();

        // Draw head
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y - 10, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    applyKnockback(direction) {
        this.knockback = direction * 5;
    }
}
