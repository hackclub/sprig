const player = "p";
const food = "f";

setLegend(
  [ player, bitmap`
..............6.
.............666
..............6.
..333.....333...
.33333...33333..
3333333.3333333.
333333333333333.
333333333333333.
333333333333333.
.3333333333333..
..33333333333...
...333333333....
....3333333.....
.....33333......
......333.......
.......3........` ], 

  [ food, bitmap`
................
................
......6666......
.....666666.....
....66666666....
....66666666....
....66666666....
.....666666.....
......6666......
.......66.......
.......66.......
.......66.......
.......66.......
................
................
................` ]
);

setSolids([player]);

let level = 0;
const levels = [
  map`
..........
..........
..........
..........
......p...
..........
..........
..........
..........
..........`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});

let snake = [getFirst(player)];
let direction = { x: 1, y: 0 };
let gameOver = false;
let gameStarted = false; // 🚨 Prevents movement until game starts
let score = 0; // Score initialization
let speed = 300; // Initial speed of the game (lower = faster)

let gameInterval; // Variable to store the game loop interval

// Function to show start screen
function showStartScreen() {
  clearText();
  addText("HEARTs GAME", { x: 4, y: 5, color: color`6` });
  addText("PRESS i", { x: 4, y: 7, color: color`8` });
}

// Function to show death screen
function showDeathScreen() {
  clearText();
  
  addText("GAME OVER", { x: 6, y: 6, color: color`3` });
  addText("I 2 RESTART", { x: 5, y: 8, color: color`8` });
  addText("SCORE: " + score, { x: 5, y: 10, color: color`7` });

  gameOver = true;
  clearInterval(gameInterval); // Stop the game loop
}

// Improved food placement function
function placeFood() {
  let emptySpaces = [];
  
  // Loop through all tiles and find empty ones
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      if (getTile(x, y).length === 0) {  // Check if tile is empty
        emptySpaces.push({ x, y });
      }
    }
  }

  if (emptySpaces.length > 0) {
    let randomTile = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    addSprite(randomTile.x, randomTile.y, food);
  }
}

// Show the start screen before the game begins
showStartScreen();

// Start game when "i" is pressed
onInput("i", () => {
  if (gameOver) {
    gameOver = false;
    gameStarted = false;
    score = 0; // Reset score
    clearText();
    setMap(levels[level]);  // Reset map
    snake = [getFirst(player)];
    direction = { x: 1, y: 0 };
    speed = 300; // Reset speed
    placeFood();
    showStartScreen(); // Go back to start screen
  }
});

onInput("w", () => { if (gameStarted && !gameOver) direction = { x: 0, y: -1 }; });
onInput("s", () => { if (gameStarted && !gameOver) direction = { x: 0, y: 1 }; });
onInput("a", () => { if (gameStarted && !gameOver) direction = { x: -1, y: 0 }; });
onInput("d", () => { if (gameStarted && !gameOver) direction = { x: 1, y: 0 }; });

// Start game when "i" is pressed
onInput("i", () => {
  if (!gameStarted) {
    gameStarted = true;
    clearText();
    placeFood();
    gameInterval = setInterval(gameLoop, speed); // Start the game loop
  }
});

function gameLoop() {
  if (gameOver || !gameStarted) return; // 🚨 Stop movement if game hasn't started

  let head = snake[0];
  let newHead = { x: head.x + direction.x, y: head.y + direction.y };

  // Check for collisions with walls
  if (newHead.x < 0 || newHead.x >= width() || newHead.y < 0 || newHead.y >= height()) {
    showDeathScreen();
    return;
  }
  
  let foodTile = getTile(newHead.x, newHead.y).find(t => t.type === food);
  if (foodTile) {
    foodTile.remove();
    placeFood();
    score++; // Increment score when food is eaten

    // Increase speed when food is eaten
    if (speed > 100) { // Prevent speed from becoming too fast
      speed -= 20; // Reduce interval to speed up
      clearInterval(gameInterval); // Clear current interval
      gameInterval = setInterval(gameLoop, speed); // Set new interval
    }
  } else {
    let tail = snake.pop();
    tail.x = newHead.x;
    tail.y = newHead.y;
    snake.unshift(tail);
  }
  
  getFirst(player).x = newHead.x;
  getFirst(player).y = newHead.y;

  // Update the score on the screen
  clearText();

}

