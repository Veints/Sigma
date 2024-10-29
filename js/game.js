const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;  // Set canvas width
canvas.height = 600; // Set canvas height

// Players start above the platform
const player1 = new Player(350, canvas.height - 150, 'green', { jump: false });
const player2 = new Player(450, canvas.height - 150, 'red', { jump: false });
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
    player1.x = 350; // Position for Player
