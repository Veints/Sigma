class Player {
    constructor(x, y, controls) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 50;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isJumping = false;
        this.leanAngle = 0; // Lean angle in degrees
        this.controls = controls;
    }

    update() {
        if (this.isJumping) {
            this.velocityY += this.gravity;
            this.y += this.velocityY;

            // Check for ground collision
            if (this.y >= 500) {
                this.y = 500; // Reset to ground level
                this.isJumping = false;
                this.velocityY = 0;
            }
        }
    }

    lean(direction) {
        if (direction === 'left' && this.leanAngle < 20) {
            this.leanAngle += 2; // Lean left
        } else if (direction === 'right' && this.leanAngle > -20) {
            this.leanAngle -= 2; // Lean right
        }
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -10; // Jump force
            this.isJumping = true;
        }
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.leanAngle * Math.PI / 180); // Convert to radians
        context.fillStyle = this.controls.color;
        context.fillRect(-this.width / 2, -this.height, this.width, this.height);
        context.restore();
    }
}
