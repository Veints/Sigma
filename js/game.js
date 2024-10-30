const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let player1, player2;
let bullets = [];
let lastShootTime1 = 0;
let lastShootTime2 = 0;

function resetGame() {
    player1 = new Player(200, 500, { color: 'green' });
    player2 = new Player(600, 500, { color: 'red' });
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    player1.update();
    player2.update();

    // Update bullets
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1); // Remove off-screen bullets
        }
    });

    // Check for bullet collisions
    bullets.forEach((bullet) => {
        if (bullet.x >= player1.x && bullet.x <= player1.x + player1.width &&
            bullet.y >= player1.y && bullet.y <= player1.y + player1.height) {
            // Bullet hit Player 1
            console.log("Player 1 hit!");
            player1.y += 20; // Example knockback
            bullets = bullets.filter(b => b !== bullet); // Remove bullet
        }
        if (bullet.x >= player2.x && bullet.x <= player2.x + player2.width &&
            bullet.y >= player2.y && bullet.y <= player2.y + player2.height) {
            // Bullet hit Player 2
            console.log("Player 2 hit!");
            player2.y += 20; // Example knockback
            bullets = bullets.filter(b => b !== bullet); // Remove bullet
        }
    });

    player1.draw(context);
    player2.draw(context);
    bullets.forEach(bullet => bullet.draw(context));

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        player1.lean('left');
    }
    if (event.key === 'd') {
        player1.lean('right');
    }
    if (event.key === 'w') {
        player1.jump();
    }

    if (event.key === 'ArrowLeft') {
        player2.lean('left');
    }
    if (event.key === 'ArrowRight') {
        player2.lean('right');
    }
    if (event.key === 'ArrowUp') {
        player2.jump();
    }

    // Shooting logic for Player 1
    if (event.key === 's') {
        const shootDuration = performance.now() - lastShootTime1;
        let angle = Math.PI / 2; // Default straight up
        if (shootDuration < 500) angle = 3 * Math.PI / 2; // Shoot down
        else if (shootDuration < 1500) angle = Math.PI / 4; // Shoot diagonally
        else if (shootDuration >= 1500) angle = 0; // Shoot backward

        bullets.push(new Bullet(player1.x + player1.width / 2, player1.y, angle));
        lastShootTime1 = performance.now();
    }

    // Shooting logic for Player 2
    if (event.key === 'ArrowDown') {
        const shootDuration = performance.now() - lastShootTime2;
        let angle = Math.PI / 2; // Default straight up
        if (shootDuration < 500) angle = 3 * Math.PI / 2; // Shoot down
        else if (shootDuration < 1500) angle = Math.PI / 4; // Shoot diagonally
        else if (shootDuration >= 1500) angle = 0; // Shoot backward

        bullets.push(new Bullet(player2.x + player2.width / 2, player2.y, angle));
        lastShootTime2 = performance.now();
    }
});

// Start the game
resetGame();
update();
