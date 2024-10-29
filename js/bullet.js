class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction; // -1 for left, 1 for right
        this.speed = 5; // Bullet speed
        this.radius = 5; // Bullet size
    }

    update() {
        this.x += this.speed * this.direction; // Move bullet
    }

    draw(ctx) {
        ctx.fillStyle = 'grey';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
