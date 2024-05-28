/*
@title: jumpy_sprig
@tags: ['beginner', 'tutorial']
@img: sprig_dodge
@addedOn: 2022-12-15
*/

// Define the sprites
const player = "p";
const obstacle = "o";

// Assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
................
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.000.0.....
....0.....0.....
.....00000......
.......0........
.....00000......
.......0........
.......0........
......0.0.......
.....0...0......`],
  [obstacle, bitmap`
................
................
................
.....66666......
....6.....6.....
....6.6.6.6.....
....6.....6.....
....6.666.6.....
....6.....6.....
.....66666......
.......6........
.....66666......
.......6........
.......6........
......6.6.......
.....6...6......`]
);

// Initialize the game map
setMap(map`
........
........
........
........
........
........
........
....p...`);

// Game variables
let gameRunning = false;
let gravity = 0.2;
let jumpPower = -3;
let playerYVelocity = 0;
let score = 0;
let timeSinceJump = 60;

// Start button handling
onInput("a", () => {
  if (!gameRunning) {
    gameRunning = true;
    addText("Pause", { x: 0, y: 0, color: color`3` });
    clearText();
  } else {
    gameRunning = false;
    addText("Start", { x: 0, y: 0, color: color`3` });
  }
});

// Player controls
onInput("a", () => {
  if (gameRunning) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (gameRunning) getFirst(player).x += 1;
});

onInput("w", () => {
  if (gameRunning && timeSinceJump >= 47) {
    playerYVelocity = jumpPower;
    timeSinceJump = 0;
  }
});

// Spawn obstacles
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, obstacle);
}

// Move obstacles
function moveObstacles() {
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

// Remove obstacles that go off screen
function despawnObstacles() {
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == 8) {
      obstacles[i].remove();
      score++;
    }
  }
}

// Check for collisions
function checkCollision() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
  return false;
}

// Game loop
var gameLoop = setInterval(() => {
  if (gameRunning) {
    spawnObstacle();
    moveObstacles();
    despawnObstacles();

    let p = getFirst(player);
    p.y += playerYVelocity;
    playerYVelocity += gravity;

    // Screen wrapping
    if (p.x < 0) p.x = 7;
    if (p.x > 7) p.x = 0;

    // Keep the player within vertical bounds
    if (p.y > 7) {
      p.y = 7;
      playerYVelocity = 0;
    }
    if (p.y < 0) {
      p.y = 0;
      playerYVelocity = 0;
    }

    // Check for collisions
    if (checkCollision()) {
      gameRunning = false;
      addText("Game Over!", { x: 3, y: 4, color: color`3` });
      clearInterval(gameLoop);
    }

    timeSinceJump++;
  }
}, 1000);
