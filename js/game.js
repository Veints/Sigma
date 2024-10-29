const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player1 = new Player(100, canvas.height - 50, 'blue', { jump: false });
const player2 = new Player(200, canvas.height - 50, 'green', { jump: false });
const bullets = [];

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player1.update();
    player2.update();
    bullets.forEach(bullet => bullet.update());
    
    player1.draw(ctx);
    player2.draw(ctx);
    bullets.forEach(bullet => bullet.draw(ctx));

    requestAnimationFrame(update);
}

function handleKeyDown(event) {
    if (event.key === 'o') player1.controls.jump = true;
    if (event.key === 'e') player2.controls.jump = true;
    if (event.key === 'i') {
        // Shoot bullet for player 1
        bullets.push(new Bullet(player1.x + player1.width, player1.y + player1.height / 2, 1));
    }
    if (event.key === 'w') {
        // Shoot bullet for player 2
        bullets.push(new Bullet(player2.x, player2.y + player2.height / 2, -1));
    }
}

function handleKeyUp(event) {
    if (event.key === 'o') player1.controls.jump = false;
    if (event.key === 'e') player2.controls.jump = false;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

update();
