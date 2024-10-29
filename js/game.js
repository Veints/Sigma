const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player1 = new Player(canvas.width / 2 - 50, canvas.height - 100, 'blue', { jump: false });
const player2 = new Player(canvas.width / 2 + 20, canvas.height - 100, 'green', { jump: false });
const bullets = [];

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();
    player1.draw(ctx);
    player2.draw(ctx);
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'o') player1.controls.jump = true;
    if (event.key === 'e') player2.controls.jump = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'o') player1.controls.jump = false;
    if (event.key === 'e') player2.controls.jump = false;
});

update();
