class Bullet {
    constructor(x, y, direction, angle) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = 10; // Speed of the bullet
        this.radius = 5; // Bullet size
        this.angle = angle; // Angle of bullet trajectory
    }

    update() {
        // Update position based on speed and angle
        this.x += this.speed * this.direction * Math.cos(this.angle);
        this.y += this.speed * this.direction * Math.sin(this.angle);
    }

    draw(ctx) {
        ctx.fillStyle = 'grey';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
