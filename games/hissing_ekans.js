const canvasWidth = 400;
const canvasHeight = 400;
const playerSize = 20;
const enemySize = 20;

let player = {
    x: canvasWidth / 2,
    y: canvasHeight - playerSize,
    size: playerSize,
    moveLeft: false,
    moveRight: false,
};

let enemies = [];
let gameOver = false;

function setup() {
    // Initialize enemies
    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: Math.random() * canvasWidth,
            y: Math.random() * (canvasHeight / 2),
            size: enemySize,
            speed: Math.random() * 3 + 2
        });
    }
}

function update() {
    if (!gameOver) {
        // Update player position
        if (player.moveLeft) {
            player.x -= 5;
        }
        if (player.moveRight) {
            player.x += 5;
        }
        player.x = Math.max(0, Math.min(canvasWidth - player.size, player.x));

        // Update enemies position
        for (let enemy of enemies) {
            enemy.y += enemy.speed;
            if (enemy.y > canvasHeight) {
                enemy.y = 0;
                enemy.x = Math.random() * canvasWidth;
            }

            // Check for collision
            if (Math.hypot(player.x - enemy.x, player.y - enemy.y) < (player.size + enemy.size) / 2) {
                gameOver = true;
            }
        }
    }
}

function draw() {
    clearCanvas(); // Clear the canvas for the next frame

    // Draw player
    drawRect(player.x, player.y, player.size, player.size, "black");

    // Draw enemies
    for (let enemy of enemies) {
        drawCircle(enemy.x, enemy.y, enemy.size, "red");
    }

    if (gameOver) {
        drawText("Game Over", canvasWidth / 2, canvasHeight / 2, "32px Arial", "black");
    }
}

// Sprig-specific functions for input handling and drawing
function keyDown(key) {
    if (key === "ArrowLeft") {
        player.moveLeft = true;
    } else if (key === "ArrowRight") {
        player.moveRight = true;
    }
}

function keyUp(key) {
    if (key === "ArrowLeft") {
        player.moveLeft = false;
    } else if (key === "ArrowRight") {
        player.moveRight = false;
    }
}

function clearCanvas() {
    // Implement the canvas clearing logic as per Sprig
}

function drawRect(x, y, width, height, color) {
    // Implement the rectangle drawing logic as per Sprig
}

function drawCircle(x, y, diameter, color) {
    // Implement the circle drawing logic as per Sprig
}

function drawText(text, x, y, font, color) {
    // Implement the text drawing logic as per Sprig
}

// Run the setup function to initialize the game
setup();

// Main game loop
setInterval(() => {
    update();
    draw();
}, 1000 / 60); // 60 FPS
