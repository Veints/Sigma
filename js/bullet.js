class Bullet {
    constructor(x, y, direction, angle) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.speed = 8 * direction; // Speed of bullet
        this.angle = angle;
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
