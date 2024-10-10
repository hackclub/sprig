/*
Dodge the falling obstacles by moving left or right.
Survive as long as you can!
*/

// Define the player and obstacle sprites
const player = "p";
const obstacle = "o";
const outline = "b";
const blacktile = "d";

// Sprites setup
setLegend(
  [player, bitmap`
2000000000000002
0000000LL0000000
0000000LL0000000
0000000LL0000000
2000000LL0000002
000000L77L000000
000000L77L000000
00000L1771L00000
2000L117711L0002
0000L111111L0000
000L11111111L000
000L11111111L000
200LLLLLLLLLL002
00000LL00LL00000
0000066006600000
0000006006000000`],
  [obstacle, bitmap`
................
................
................
.......000000...
....0001111110..
...011L111LL10..
...01111111L10..
...01111111110..
....01L111L110..
....01111L1110..
.....01111000...
.....001100.....
.......00.......
................
................
................`],
  [outline, bitmap`
0..............0
................
................
................
0..............0
................
................
................
0..............0
................
................
................
0..............0
................
................
................`],
  [blacktile, bitmap`
2000000000000002
0000000000000000
0000000000000000
0000000000000000
2000000000000002
0000000000000000
0000000000000000
0000000000000000
2000000000000002
0000000000000000
0000000000000000
0000000000000000
2000000000000002
0000000000000000
0000000000000000
0000000000000000`]
);

// Create game map with an empty space at the bottom for player movement
setMap(map`
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
ddddd
pdddd`);

// Initialize the score
let score = 0;
let obstacleSpeed = 200; // Initial speed of obstacles (in milliseconds)
let spawnInterval = 1000; // Initial spawn interval for obstacles

// Display the score on the screen
function displayScore() {
  // Clear previous score text
  clearText();

  // Add score text in two lines
  addText(`Score:`, { x: 0, y: 0, color: color`3` });
  addText(`${score}`, { x: 0, y: 1, color: color`3` });
}

// Function to reset the game state
function resetGame() {
  score = 0;
  obstacleSpeed = 200;
  spawnInterval = 1000;

  // Clear the map and display player
  setMap(map`
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  ddddd
  pdddd`);
  
  displayScore();

  // Restart intervals
  obstacleInterval = setInterval(spawnObstacle, spawnInterval);
  gameInterval = setInterval(moveObstacles, obstacleSpeed);
  scoreInterval = setInterval(updateScore, 1000);
}

// Create game loop to update score
function updateScore() {
  score++;
  displayScore();

  // Increase speed and spawn rate every 10 points
  if (score % 10 === 0) {
    obstacleSpeed = Math.max(50, obstacleSpeed - 100); // Decrease fall speed significantly
    spawnInterval = Math.max(200, spawnInterval - 200); // Decrease spawn interval significantly

    // Clear and reset intervals with new values
    clearInterval(gameInterval);
    gameInterval = setInterval(moveObstacles, obstacleSpeed); // Update movement speed

    clearInterval(obstacleInterval);
    obstacleInterval = setInterval(spawnObstacle, spawnInterval); // Update spawn rate
  }
}

// Define controls for player movement
onInput("a", () => {
  // Move left
  const playerSprite = getFirst(player);
  if (playerSprite.x > 0) {
    // Leave a black tile behind
    addSprite(playerSprite.x, playerSprite.y, blacktile);
    playerSprite.x -= 1;
  }
});

onInput("d", () => {
  // Move right
  const playerSprite = getFirst(player);
  if (playerSprite.x < 4) {
    // Leave a black tile behind
    addSprite(playerSprite.x, playerSprite.y, blacktile);
    playerSprite.x += 1;
  }
});

// Function to randomly spawn obstacles
function spawnObstacle() {
  let xPosition = Math.floor(Math.random() * 5);
  addSprite(xPosition, 0, obstacle);
}

// Function to move obstacles down
function moveObstacles() {
  getAll(obstacle).forEach(obs => {
    obs.y += 1;
    // If an obstacle reaches the bottom, remove it
    if (obs.y > 11) {
      obs.remove();
    }
    // Check if the player gets hit
    if (obs.x === getFirst(player).x && obs.y === getFirst(player).y) {
      endGame();
    }
  });
}

// End the game if the player is hit
function endGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  clearInterval(scoreInterval);
  addText("Game Over", { y: 6, color: color`3` });
  addText(`Final Score: ${score}`, { y: 8, color: color`3` });
  
  // Add retry button
  addText(`Retry? Press W`, { x: 3, y: 10, color: color`3` });
  onInput("w", () => {
    resetGame(); // Reset game on input
  });
}

// Set initial intervals to keep spawning obstacles and moving them
let obstacleInterval = setInterval(spawnObstacle, spawnInterval); // Spawn every second
let gameInterval = setInterval(moveObstacles, obstacleSpeed); // Move obstacles initially
let scoreInterval = setInterval(updateScore, 1000); // Update score every second
