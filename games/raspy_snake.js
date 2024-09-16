/*
@title: SnakeGame
@author: Elijah Grandell
@tags: []
@addedOn: 2024-09-16
*/

const player = "p";
const food = "f";

setLegend(
  [ player, bitmap`
................
..0000000000000.
..0000000000000.
..0044444444400.
..0044444444400.
..0044444444400.
..0044444444400.
..0044444444400.
..0044444444400.
..0044444444400.
..0044444444400.
..0044444444400.
..0000000000000.
..0000000000000.
................
................` ],
  [ food, bitmap`
................
................
..........000...
.......0.0DDD00.
........0DDDDDD0
....000.0000000.
...033C000CCCC0.
..03333CCCCCCCC0
.033233333CCCCC0
.032333333CCCCC0
.033333333CCCCC0
..033333333CCC0.
..033333333CCC0.
...03333333CC0..
....003333300...
......00000.....` ]
);

setSolids([]);

let level = 0;
const levels = [
  map`
p.........
..........
..........
..........
..........
..........
..........
..........
..........
..........`
];

setMap(levels[level]);

// Set the background color to brown
addText("", {x: 0, y: 0, color: color`1`});

setPushables({
  [ player ]: []
});

let snake = [{x: 0, y: 0}];
let direction = {x: 1, y: 0};
let foodPosition = {x: 1, y: 1};

// Initialize score and highscore
let score = 0;
let highscore = 0;
let gameInterval = null; // Initialize with null
let isGameOver = false;

// Function to clear the board
function clearBoard() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      getTile(x, y).forEach(t => t.remove()); // Remove all sprites from the tile
    }
  }
}

// Function to place food randomly on the grid
function placeFood() {
  const emptyCells = [];
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      if (!getTile(x, y).some(t => t.type === player)) {
        emptyCells.push({x, y});
      }
    }
  }
  foodPosition = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  addSprite(foodPosition.x, foodPosition.y, food);
}

placeFood();

onInput("w", () => {
  if (direction.y === 0 && !isGameOver) direction = {x: 0, y: -1};
});

onInput("a", () => {
  if (direction.x === 0 && !isGameOver) direction = {x: -1, y: 0};
});

onInput("s", () => {
  if (direction.y === 0 && !isGameOver) direction = {x: 0, y: 1};
});

onInput("d", () => {
  if (direction.x === 0 && !isGameOver) direction = {x: 1, y: 0};
});

onInput("k", () => {
  if (isGameOver) restartGame();
});

function moveSnake() {
  const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
  
  // Check if the snake hits the wall or itself
  if (head.x < 0 || head.x >= width() || head.y < 0 || head.y >= height() || getTile(head.x, head.y).some(t => t.type === player)) {
    return gameOver();
  }
  
  snake.unshift(head);
  addSprite(head.x, head.y, player);
  
  // Check if the snake eats food
  if (head.x === foodPosition.x && head.y === foodPosition.y) {
    getTile(foodPosition.x, foodPosition.y).forEach(t => {
      if (t.type === food) t.remove();
    });
    placeFood();
    score++; // Increase score when food is eaten
    updateScoreDisplay(); // Update the score display
  } else {
    const tail = snake.pop();
    getTile(tail.x, tail.y).forEach(t => {
      if (t.type === player) t.remove();
    });
  }
}

function updateScoreDisplay() {
  clearText(); // Clear the previous score display
  addText(`Score: ${score}`, {x: 3, y: 1, color: color`0`});
  addText(`Highscore: ${highscore}`, {x: 3, y: 2, color: color`4`});
}

function gameOver() {
  clearInterval(gameInterval);
  isGameOver = true;
  addText("Game Over", {x: 5, y: 7, color: color`3`});
  addText("Press 'K'", {x: 5, y: 9, color: color`0`});
  addText("to Restart.", {x: 4, y: 11, color: color`0`});
  
  // Update highscore if the current score is higher
  if (score > highscore) {
    highscore = score;
  }
}
  updateScoreDisplay()

function restartGame() {
  // Clear the game board
  clearBoard();
  
  // Reset the game state
  snake = [{x: 0, y: 0}];
  direction = {x: 1, y: 0};
  score = 0;
  isGameOver = false;
  
  // Start the game loop again
  updateScoreDisplay();
  placeFood(); // Place the food again after clearing the board
  gameInterval = setInterval(moveSnake, 200);
}

// Start the initial game loop
gameInterval = setInterval(moveSnake, 200);

updateScoreDisplay(); // Initial score display

afterInput(() => {});
