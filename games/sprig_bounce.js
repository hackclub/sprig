/*
@title: Sprig bounce
@author: Vinesh-0710
@tags: []
@addedOn: 2025-01-17
*/

// define the sprites in our game
const player = "p";
const obstacle = "o";

// assign bitmap art to each sprite
setLegend(
  [obstacle, bitmap`
................
....33333333....
............3...
....66666666....
...6............
....33333333....
............3...
....66666666....
...6............
....33333333....
............3...
....66666666....
...6............
....33333333....
............3...
................`],
  [player, bitmap`
................
.....0000000....
.....0.....0....
.....0.0.0.00...
.....0......0...
.....0.000..0...
.....0......0...
.....00000000...
.....00LLLL00...
.....00000000...
......00..00....
......00..00....
......00..00....
......00..00....
......00..00....
................`],
)

// Step 1 - Add player to map
setMap(map`
........
........
........
........
........
........
.....p..
........`)

// Create a variable that shows when the game is running
var gameRunning = true; 

// Player movement controls
onInput("a", () => {
  if (gameRunning) {
    const playerSprite = getFirst(player);
    if (playerSprite.x > 0) {
      playerSprite.x -= 1; // Move player left
    }
  }
});

onInput("d", () => {
  if (gameRunning) {
    const playerSprite = getFirst(player);
    if (playerSprite.x < 7) {
      playerSprite.x += 1; // Move player right
    }
  }
});

// Function to spawn an obstacle at a random x position
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);  // Random x position (0-7)
  let y = 0;  // Start at the top
  addSprite(x, y, obstacle);
}

// Function to move obstacles down
function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

// Function to despawn obstacles when they reach the bottom
function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y === 7) {  // If the obstacle reaches the bottom row
      obstacles[i].remove();
    }
  }
}

// Function to check if the player was hit by an obstacle
function checkHit() {
  const playerSprite = getFirst(player);
  const obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x === playerSprite.x && obstacles[i].y === playerSprite.y) {
      return true;  // Player is hit if the x and y positions match
    }
  }
  return false;  // No collision
}

// Game loop (runs every second)
var gameLoop = setInterval(() => {
  if (gameRunning) {
    spawnObstacle();   // Spawn a new obstacle periodically
    moveObstacles();   // Move all obstacles down
    despawnObstacles();  // Remove obstacles that reach the bottom

    // Check if the player has been hit by any obstacle
    if (checkHit()) {
      clearInterval(gameLoop);  // Stop the game loop
      gameRunning = false;
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`9`  // Display game over text in red
      });
    }
  }
}, 1000);  // Run every 1000 ms (1 second)
