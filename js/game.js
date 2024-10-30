const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const player1 = new Player(300, canvas.height - 150, 'green', { leanLeft: false, leanRight: false, jump: false });
const player2 = new Player(500, canvas.height - 150, 'red', { leanLeft: false, leanRight: false, jump: false });
const bullets = [];

let score1 = 0;
let score2 = 0;

function drawPlatform() {
    ctx.fillStyle = '#8B4513'; // Brown color for the platform
    ctx.fillRect((canvas.width - canvas.width * 0.8) / 2, canvas.height - 100, canvas.width * 0.8, 20);
}

function drawBuildings() {
    ctx.fillStyle = 'grey'; // Skyscraper color
    ctx.fillRect(50, canvas.height - 200, 50, 200);
    ctx.fillRect(150, canvas.height - 300, 70, 300);
    ctx.fillRect(300, canvas.height - 250, 60, 250);
    ctx.fillRect(500, canvas.height - 150, 80, 150);
    ctx.fillRect(650, canvas.height - 350, 40, 350);
}

function resetGame() {
    player1.x = 300; // Reset position for Player 1
    player1.y = canvas.height - 150; // On the platform
    player2.x = 500; // Reset position for Player 2
    player2.y = canvas.height - 150; // On the platform
    bullets.length = 0; // Clear bullets
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBuildings(); // Draw skyscrapers
    drawPlatform(); // Draw the platform

    player1.update([player1, player2]);
    player2.update([player1, player2]);
    player1.draw(ctx);
    player2.draw(ctx);

    bullets.forEach(bullet => {
        bullet.update();
        bullet.draw(ctx);

        // Check for bullet collisions
        if (bullet.x < player1.x + player1.width && bullet.x > player1.x &&
            bullet.y < player1.y + player1.height && bullet.y > player1.y) {
            player1.applyKnockback(-1); // Player 1 takes knockback from Player 2's bullet
            bullets.splice(bullets.indexOf(bullet), 1); // Remove bullet on hit
        } else if (bullet.x < player2.x + player2.width && bullet.x > player2.x &&
                   bullet.y < player2.y + player2.height && bullet.y > player2.y) {
            player2.applyKnockback(1); // Player 2 takes knockback from Player 1's bullet
            bullets.splice(bullets.indexOf(bullet), 1); // Remove bullet on hit
        }
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

let shootTimer1 = 0;
let shootTimer2 = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') player1.controls.jump = true; // Player 1 jump
    if (event.key === 'ArrowUp') player2.controls.jump = true; // Player 2 jump

    if (event.key === 'a') player1.controls.leanLeft = true; // Player 1 lean left
    if (event.key === 'd') player1.controls.leanRight = true; // Player 1 lean right
    if (event.key === 'ArrowLeft') player2.controls.leanLeft = true; // Player 2 lean left
    if (event.key === 'ArrowRight') player2.controls.leanRight = true; // Player 2 lean right

    // Shooting logic for Player 1
    if (event.key === 's') {
        const shootDuration = performance.now() - shootTimer1;
        let angle = Math.PI / 2; // Default straight up
        if (shootDuration < 500) angle = 3 * Math.PI / 2; // Shoot down
        else if (shootDuration < 1500) angle = Math.PI / 4; // Shoot diagonally
        else if (shootDuration >= 1500) angle = 0; // Shoot backward

        bullets.push(new Bullet(player1.x + player1.width / 2, player1.y, 1, angle));
        shootTimer1 = performance.now();
    }

    // Shooting logic for Player 2
    if (event.key === 'ArrowDown') {
        const shootDuration = performance.now() - shootTimer2;
        let angle = Math.PI / 2; // Default straight up
        if (shootDuration < 500) angle = 3 * Math.PI / 2; // Shoot down
        else if (shootDuration < 1500) angle = Math.PI / 4; // Shoot diagonally
        else if (shootDuration >= 1500) angle = 0; // Shoot backward

        bullets.push(new Bullet(player2.x + player2.width / 2, player2.y, -1, angle));
        shootTimer2 = performance.now();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') player2.controls.jump = false; // Player 2 stop jump
    if (event.key === 'w') player1.controls.jump = false; // Player 1 stop jump

    if (event.key === 'a') player1.controls.leanLeft = false; // Player 1 stop lean left
    if (event.key === 'd') player1.controls.leanRight = false; // Player 1 stop lean right
    if (event.key === 'ArrowLeft') player2.controls.leanLeft = false; // Player 2 stop lean left
    if (event.key === 'ArrowRight') player2.controls.leanRight = false; // Player 2 stop lean right
});

// Start the game loop
resetGame();
update();
