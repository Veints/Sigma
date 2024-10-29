const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player1 = new Player(100, canvas.height - 100, 'blue', { jump: false });
const player2 = new Player(200, canvas.height - 100, 'green', { jump: false });
const bullets = [];
let score1 = 0;
let score2 = 0;
let gameState = "playing";

function resetGame() {
    player1.x = 100;
    player1.y = canvas.height - 100;
    player2.x = 200;
    player2.y = canvas.height - 100;
    bullets.length = 0;
    gameState = "playing";
}

function update() {
    if (gameState === "playing") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        player1.update();
        player2.update();
        
        bullets.forEach(bullet => bullet.update());
        
        player1.draw(ctx);
        player2.draw(ctx);
        bullets.forEach(bullet => bullet.draw(ctx));

        // Check for collisions
        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x < 0 || bullet.x > canvas.width) {
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

        // Check if players fall off the roof
        if (player1.y > canvas.height) {
            score2++;
            gameState = "gameOver";
        } else if (player2.y > canvas.height) {
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
    }
}

function handleKeyDown(event) {
    if (event.key === 'o') player1.controls.jump = true;
    if (event.key === 'e') player2.controls.jump = true;
    if (event.key === 'i') {
        bullets.push(new Bullet(player1.x + player1.width, player1.y + player1.height / 2, 1));
    }
    if (event.key === 'w') {
        bullets.push(new Bullet(player2.x, player2.y + player2.height / 2, -1));
    }
    if (event.key === 'r' && gameState === "gameOver") {
        resetGame();
    }
}

function handleKeyUp(event) {
    if (event.key === 'o') player1.controls.jump = false;
    if (event.key === 'e') player2.controls.jump = false;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

update();
