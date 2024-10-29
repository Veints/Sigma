const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player1 = new Player(canvas.width / 2 - 50, canvas.height - 100, 'blue', { jump: false });
const player2 = new Player(canvas.width / 2 + 20, canvas.height - 100, 'green', { jump: false });
const bullets = [];
let score1 = 0;
let score2 = 0;
let gameState = "playing";
let shootStartTime = 0;

const platformHeight = 20; // Height of the platform
const platformWidth = canvas.width * 0.8; // Width of the platform
const platformY = canvas.height - platformHeight - 100; // Position of the platform

function resetGame() {
    player1.x = canvas.width / 2 - 50;
    player1.y = platformY - player1.height;
    player2.x = canvas.width / 2 + 20;
    player2.y = platformY - player2.height;
    bullets.length = 0;
    player1.onPlatform = true;
    player2.onPlatform = true;
    gameState = "playing";
}

function update() {
    if (gameState === "playing") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw platform
        ctx.fillStyle = '#8B4513'; // Brown color
        ctx.fillRect((canvas.width - platformWidth) / 2, platformY, platformWidth, platformHeight);

        player1.update();
        player2.update();

        bullets.forEach(bullet => bullet.update());

        player1.draw(ctx);
        player2.draw(ctx);
        bullets.forEach(bullet => bullet.draw(ctx));

        // Check for collisions and falling
        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x < 0 || bullet.x > canvas.width || bullet.y > canvas.height) {
                bullets.splice(bulletIndex, 1);
            }
            if (bullet.x >= player1.x && bullet.x <= player1.x + player1.width &&
                bullet.y >= player1.y && bullet.y <= player1.y + player1.height) {
                player1.knockback = -5; // Knockback to the left
                bullets.splice(bulletIndex, 1);
            } 
            if (bullet.x >= player2.x && bullet.x <= player2.x + player2.width &&
                bullet.y >= player2.y && bullet.y <= player2.y + player2.height) {
                player2.knockback = 5; // Knockback to the right
                bullets.splice(bulletIndex, 1);
            }
        });

        // Check if players fall off the platform
        if (!player1.onPlatform && player1.y > canvas.height) {
            score2++;
            gameState = "gameOver";
        } else if (!player2.onPlatform && player2.y > canvas.height) {
            score1++;
            gameState = "gameOver";
        }

        requestAnimationFrame(update);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '48px sans-serif';
        ctx.fillText(`Player 1: ${score1}`, canvas.width / 4, canvas.height / 2);
        ctx.fillText(`Player 2: ${score2}`, (canvas.width / 4) * 3, canvas.height / 2);
        ctx.font = '24px sans-serif';
        ctx.fillText('Press R to restart', canvas.width / 2 - 100, canvas.height / 2 + 50);
        setTimeout(() => {
            gameState = "playing";
            resetGame();
        }, 2000); // Reset after 2 seconds
    }
}

function handleKeyDown(event) {
    if (event.key === 'o') player1.controls.jump = true;
    if (event.key === 'e') player2.controls.jump = true;

    // Shooting mechanics
    if (event.key === 'i') {
        shootStartTime = performance.now();
    }
    if (event.key === 'w') {
        shootStartTime = performance.now();
    }
}

function handleKeyUp(event) {
    if (event.key === 'o') player1.controls.jump = false;
    if (event.key === 'e') player2.controls.jump = false;

    // Shooting logic
    if (event.key === 'i' || event.key === 'w') {
        const shootDuration = performance.now() - shootStartTime;
        let angle = 0;

        if (shootDuration < 200) {
            angle = Math.PI / 4; // Downward
        } else if (shootDuration < 600) {
            angle = 0; // Forward
        } else {
            angle = -Math.PI / 4; // Upward
        }

        const direction = event.key === 'i' ? 1 : -1; // Player 1 or Player 2
        bullets.push(new Bullet(player1.x + player1.width / 2, player1.y, direction, angle));
    }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

resetGame();
update();
