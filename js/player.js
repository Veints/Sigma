class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 20;
        this.height = 40;
        this.angle = 90; // Start perpendicular to the ground
        this.gravity = 0.5; // Reduced gravity for smoother jumps
        this.velocityY = 0;
        this.jumpPower = -15; // Increased jump power
        this.knockback = 0; // Knockback effect
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
        }

        // Leaning mechanics
        if (this.controls.leanLeft) {
            this.angle = Math.max(this.angle - 2, 20); // Lean faster to a minimum of 20 degrees
        } else if (this.controls.leanRight) {
            this.angle = Math.min(this.angle + 2, 90); // Reset angle to 90 degrees
        }

        // Jumping mechanics
        if (this.controls.jump) {
            let jumpDirection = Math.cos(this.angle * (Math.PI / 180)); // Horizontal component
            let jumpVertical = Math.sin(this.angle * (Math.PI / 180)); // Vertical component

            this.velocityY = this.jumpPower * jumpVertical; // Adjust velocity based on jump angle
            this.x += jumpDirection * 10; // Move slightly in the jump direction
            this.controls.jump = false; // Reset jump
        }

        // Apply knockback
        this.x += this.knockback;
        this.knockback *= 0.9;

        // Check for collision with other players
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
        this.knockback = direction * 5; // Adjust knockback strength
    }
}
