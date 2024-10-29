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
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
