class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = 8 * direction; // Speed of the bullet
    }

    update() {
        this.x += this.speed; // Move bullet horizontally
    }

    draw(ctx) {
        ctx.fillStyle = 'grey'; // Set bullet color to grey
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y - this.size / 2); // Create rounded tip
        ctx.lineTo(this.x + this.size, this.y + this.size / 2);
        ctx.closePath();
        ctx.fill();
    }
}
