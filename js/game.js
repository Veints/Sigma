const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player1 = new Player(canvas.width / 2 - 50, canvas.height - 120, 'blue', { jump: false });
const player2 = new Player(canvas.width / 2 + 20, canvas.height - 120, 'green', { jump: false });
const bullets = [];

let score1 = 0;
let score2 = 0;

function drawPlatform() {
    ctx.fillStyle = '#8B4513'; // Brown color
    ctx.fillRect((canvas.width - canvas.width * 0.8) / 2, canvas.height - 100, canvas.width * 0.8, 20); // Draw platform
}

function resetGame() {
    player1.x = canvas.width / 2 - 50;
    player1.y = canvas.height - 120;
    player2.x = canvas.width / 2 + 20;
    player2.y = canvas.height - 120;
    bullets.length = 0;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();

    player1.update();
    player2.update();
    player1.draw(ctx);
    player2.draw(ctx);
    
    bullets.forEach(bullet => {
        bullet.update();
        bullet.draw(ctx);
    });

    // Check for player fall-off
    if (player1.y > canvas.height) {
        score2++;
        resetGame();
    } else if (player2.y > canvas.height) {
        score1++;
        resetGame();
    }

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'o') player1.controls.jump = true; // Player 1 jump
    if (event.key === 'e') player2.controls.jump = true; // Player 2 jump

    if (event.key === 'a') player1.leanDirection = -1; // Player 1 lean left
    if (event.key === 'd') player1.leanDirection = 1; // Player 1 lean right
    if (event.key === 'ArrowLeft') player2.leanDirection = -1; // Player 2 lean left
    if (event.key === 'ArrowRight') player2.leanDirection = 1; // Player 2 lean right

    // Shooting logic
    if (event.key === 'i') {
        bullets.push(new Bullet(player1.x + player1.width / 2, player1.y, 1, 0)); // Player 1 shoots
    }
    if (event.key === 'w') {
        bullets.push(new Bullet(player2.x + player2.width / 2, player2.y, -1, 0)); // Player 2 shoots
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'o') player1.controls.jump = false; // Stop jump
    if (event.key === 'e') player2.controls.jump = false; // Stop jump

    if (event.key === 'a' || event.key === 'd') player1.leanDirection = 0; // Stop leaning
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') player2.leanDirection = 0; // Stop leaning
});

resetGame();
update();
