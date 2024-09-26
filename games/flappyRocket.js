/*
@title: Flappy Rocket
@author: quantumDSflux
@tags: []
@addedOn: 2024-09-16
*/

const player = "p";
const pipe = "P";

// Define the bird and pipe sprites
setLegend(
  [ player, bitmap`
................
................
................
.......66666....
.666666111116...
.66000L11111666.
836LLLD1011111L.
336000DCCC113310
336000DCCC113310
836000000L1111L.
.66000000111666.
.666666111116...
.......66666....
................
................
................` ],
  [ pipe, bitmap`
0000000000000000
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0000000000000000` ]
);

// Map dimensions to fit full screen (160x128)
const screenWidth = 20; // 160 pixels wide with 8x8 tiles = 20 tiles
const screenHeight = 16; // 128 pixels high with 8x8 tiles = 16 tiles

// Set up the initial level
const level = 0;
const levels = [
  map`
p...................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
];

setMap(levels[level]);

setSolids([]);

// Bird's gravity and jump mechanics
let gravity = 0.5;
let jumpPower = -1.7;
let velocity = 0;

// Ensure player starts 7 blocks from the left edge
const playerSprite = getFirst(player);
if (playerSprite) {
  playerSprite.x = 7; // Set starting X position to 7 blocks (56 pixels) from the left edge
  playerSprite.y = Math.floor(screenHeight / 2); // Set starting Y position in the middle
}

// Score variable
let score = 0;

// Game Over flag
let gameOver = false;

// Handle flap input
function flap() {
  if (!gameOver) {
    velocity = jumpPower;
  }
}

// Handle restart input
function restartGame() {
  if (gameOver) {
    // Reset game state
    score = 0;
    velocity = 0;
    gameOver = false;
    playerSprite.x = 7;
    playerSprite.y = Math.floor(screenHeight / 2);

    // Remove all pipes
    getAll(pipe).forEach(pipeSprite => pipeSprite.remove());

    // Restart the game loop
    clearInterval(gameLoop); // Stop the old game loop
    gameLoop = setInterval(updateGame, 100); // Restart the game loop
    clearInterval(pipeSpawner); // Stop old pipe spawning
    pipeSpawner = setInterval(() => spawnPipe(), 2000); // Restart pipe spawning

    // Clear text
    clearText();
  }
}

onInput("s", flap);
onInput("w", flap);
onInput("i", flap);
onInput("k", restartGame);

// Function to spawn pipes at random heights with a gap
function spawnPipe() {
  const pipeGap = 4; // Set the gap size for the bird to pass through to 4 blocks
  const gapStart = Math.floor(Math.random() * (screenHeight - pipeGap - 2)) + 1; // Randomize gap position
  for (let y = 0; y < screenHeight; y++) {
    if (y < gapStart || y >= gapStart + pipeGap) {
      addSprite(screenWidth - 1, y, pipe);
    }
  }
}

// Counter to control pipe movement speed
let pipeMovementCounter = 0;

// Move pipes to the left and remove those that are out of bounds
function movePipes() {
  pipeMovementCounter++;
  // Move pipes every 2 updates instead of every 1 to decrease speed by 10%
  if (pipeMovementCounter % 2 === 0) {
    getAll(pipe).forEach((pipeSprite) => {
      pipeSprite.x -= 1;

      // Remove pipes that go out of bounds (i.e., touch the left wall)
      if (pipeSprite.x < 0) {
        pipeSprite.remove();
      }

      // Increase score when pipes pass the player's position
      if (pipeSprite.x === playerSprite.x - 1) {
        score++;
      }

      // Check for collisions with the player
      if (playerSprite &&
          pipeSprite.x === playerSprite.x &&
          pipeSprite.y === playerSprite.y) {
        gameOver = true;
        clearInterval(gameLoop); // Stop the game loop
        clearInterval(pipeSpawner); // Stop pipe spawning
        clearText(); // Clear previous text

        // Display "Game Over" message and instructions to restart
        addText("Game Over!", { x: 4, y: 6, color: color`1wwwwww` }); // Display "Game Over" message

        // Draw box around the restart message
        addText("Press K to Restart", { x: 2, y: 8, color: color`1` }); // Display restart message
        addText("###############", { x: 1, y: 7, color: color`0` }); // Box top
        addText("#             #", { x: 1, y: 8, color: color`0` }); // Box middle
        addText("###############", { x: 1, y: 9, color: color`0` }); // Box bottom
      }
    });
  }
}

// Automatically spawn pipes every 2 seconds
let pipeSpawner = setInterval(() => {
  if (!gameOver) {
    spawnPipe();
  }
}, 2000); // Spawning pipes every 2000 milliseconds (2 seconds)

// Function to display the score
function displayScore() {
  // Clear text before drawing the score
  clearText();
  // Draw the score text
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`1` }); // Specify the position and color
}

// Continuously move pipes and update the game state
function updateGame() {
  if (playerSprite && !gameOver) {
    // Apply gravity
    velocity += gravity;
    playerSprite.y += Math.round(velocity);

    // Prevent the bird from going out of bounds
    if (playerSprite.y >= screenHeight - 1) {
      playerSprite.y = screenHeight - 1;
      velocity = 0;
    }

    if (playerSprite.y < 0) {
      playerSprite.y = 0;
      velocity = 0;
    }
  }

  // Move pipes
  movePipes();

  // Display the score
  displayScore();
}

// Set up a game loop to continuously update the game state
let gameLoop = setInterval(updateGame, 100); // Update the game state every 100 milliseconds
