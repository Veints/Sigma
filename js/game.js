const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;  // Set canvas width
canvas.height = 600; // Set canvas height

// Set player starting positions on the platform
const player1 = new Player((canvas.width / 2) - 100, canvas.height - 150, 'green', { jump: false });
const player2 = new Player((canvas.width / 2) + 70, canvas.height - 150, 'red', { jump: false });
const bullets = [];

let score1 = 0;
let score2 = 0;

function drawPlatform() {
    ctx.fillStyle = '#8B4513'; // Brown color for the platform
    ctx.fillRect((canvas.width - canvas.width * 0.8) / 2, canvas.height - 100, canvas.width * 0.8, 20); // Draw platform
}

function resetGame() {
    player1.x = (canvas.width / 2) - 100; // Player 1 starts on the left
    player1.y = canvas.height - 150; // Position on top of platform
    player2.x = (canvas.width / 2) + 70; // Player 2 starts on the right
    player2.y = canvas.height - 150; // Position on top of platform
    bullets.length = 0; // Clear bullets
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

    // Display scores
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(`Player 1: ${score1}`, 50, 50);
    ctx.fillText(`Player 2: ${score2}`, canvas.width - 150, 50);

    requestAnimationFrame(update); // Loop the update
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') player1.controls.jump = true; // Player 1 jump
    if (event.key === 'ArrowUp') player2.controls.jump = true; // Player 2 jump

    if (event.key === 'a') player1.leanDirection = -1; // Player 1 lean left
    if (event.key === 'd') player1.leanDirection = 1; // Player 1 lean right
    if (event.key === 'ArrowLeft') player2.leanDirection = -1; // Player 2 lean left
    if (event.key === 'ArrowRight') player2.leanDirection = 1; // Player 2 lean right

    // Shooting logic
    if (event.key === 's') {
        bullets.push(new Bullet(player1.x + player1.width / 2, player1.y + player1.height / 2, 1)); // Player 1 shoots
    }
    if (event.key === 'ArrowDown') {
        bullets.push(new Bullet(player2.x + player2.width / 2, player2.y + player2.height / 2, -1)); // Player 2 shoots
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') player1.controls.jump = false; // Stop jump
    if (event.key === 'ArrowUp') player2.controls.jump = false; // Stop jump

    if (event.key === 'a' || event.key === 'd') player1.leanDirection = 0; // Stop leaning
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') player2.leanDirection = 0; // Stop leaning
});

resetGame();
update();
