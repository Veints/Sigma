const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;  // Set canvas width
canvas.height = 600; // Set canvas height

// Players start above the platform
const player1 = new Player(350, canvas.height - 150, 'green');
const player2 = new Player(450, canvas.height - 150, 'red');
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
    player1.x = 350; // Reset position for Player 1
    player1.y = canvas.height - 150; // On the platform
    player2.x = 450; // Reset position for Player 2
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
        if (bullet.x < player1.x + player1.width && bullet.x + bullet.radius > player1.x && 
            bullet.y < player1.y + player1.height && bullet.y + bullet.radius > player1.y) {
            player1.applyKnockback(1); // Knock player 1 back
            bullets.splice(bullets.indexOf(bullet), 1); // Remove bullet on hit
        } else if (bullet.x < player2.x + player2.width && bullet.x + bullet.radius > player2.x && 
                   bullet.y < player2.y + player2.height && bullet.y + bullet.radius > player2.y) {
            player2.applyKnockback(-1); // Knock player 2 back
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

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') player1.controls.jump = true; // Player 1 jump
    if (event.key === 'ArrowUp') player2.controls.jump = true; // Player 2 jump

    if (event.key === 'a') player1.controls.leanDirection = -1; // Player 1 lean left
    if (event.key === 'd') player1.controls.leanDirection = 1; // Player 1 lean right
    if (event.key === 'ArrowLeft') player2.controls.leanDirection = -1; // Player 2 lean left
    if (event.key === 'ArrowRight') player2.controls.leanDirection = 1; // Player 2 lean right

    // Shooting logic
    if (event.key === 's') {
        // Shoot a bullet
        const direction = player1.x < player2.x ? 1 : -1; // Shoot towards the other player
        bullets.push(new Bullet(player1.x + player1.width / 2, player1.y, direction));
    }
    if (event.key === 'ArrowDown') {
        // Shoot a bullet
        const direction = player2.x < player1.x ? -1 : 1; // Shoot towards the other player
        bullets.push(new Bullet(player2.x + player2.width / 2, player2.y, direction));
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') player1.controls.jump = false; // Stop jump
    if (event.key === 'ArrowUp') player2.controls.jump = false; // Stop jump

    if (event.key === 'a' || event.key === 'd') player1.controls.leanDirection = 0; // Stop lean
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') player2.controls.leanDirection = 0; // Stop lean
});

// Start the game
resetGame();
update();
