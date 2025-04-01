/*
@title: Treasure Hunt in the Jungle
@author: Your Name
@tags: ['puzzle', 'adventure']
@addedOn: 2023-10-XX
*/

const adventurer = "A";
const lion = "L";
const snake = "S";
const treasure = "T";

var score = 0;
var timeLeft = 60; // Countdown timer in seconds
var gameOver = false;

// Function to generate random integers
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set up the legend for sprites
setLegend(
  [adventurer, bitmap`
................
................
.0.0............
.0.0..0000.0.0..
..0...0..0.0.0..
...0..0..0.0.0..
.0.0..0..0.0.0..
.00...0000.000..
................
................
................
................
................
................
................
................`],
  [lion, bitmap`
......0000......
....00999900....
..00999999990...
.09999999999900.
099920999209990.
099900999009990.
.0999999999990..
.0999900099990..
.09999909999990.
099990090099990.
09999999999990..
.099999999990...
..0999999990....
...00000000.....
................
................`],
  [snake, bitmap`
................
................
......0000......
.....044440.....
....04044040....
....04044040....
....04444440....
.....084480.....
......0000......
................
................
................
................
................
................
................`],
  [treasure, bitmap`
................
.......77.......
......7777......
.....777777.....
.....777777.....
.....777777.....
.....777777.....
.....777777.....
......7777......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
................`]
);

// Define the levels with more treasures and animals
const levels = [
  map`
..L.T........
.S...T.......
.S.A.........
...........T.
..L..........
.S...........
.....T.......
...........L.
..S..........
S.....T......`,
  map`
T.T.T.T.T....
.S...S.......
.S.L.........
.......T.....
...S.........
..L..........
.....T.......
...........S.
...L.........
A.....T......`
];

let level = 0;
setMap(levels[level]);

// Movement controls
onInput("w", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.y = Math.max(0, adv.y - 1); // Prevent going out of bounds
  }
});

onInput("s", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.y = Math.min(height() - 1, adv.y + 1); // Prevent going out of bounds
  }
});

onInput("a", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.x = Math.max(0, adv.x - 1); // Prevent going out of bounds
  }
});

onInput("d", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.x = Math.min(width() - 1, adv.x + 1); // Prevent going out of bounds
  }
});

// Restart the game using a supported key (e.g., "i")
onInput("i", () => {
  if (gameOver) {
    gameOver = false;
    score = 0;
    timeLeft = 60;
    setMap(levels[level]);
    update();
  }
});

// Function to handle collisions
function checkCollisions() {
  const adventurerPos = getFirst(adventurer);

  // Check for treasure collision
  getAll(treasure).forEach((treasureItem) => {
    if (adventurerPos.x === treasureItem.x && adventurerPos.y === treasureItem.y) {
      score += 10;
      treasureItem.remove();
    }
  });

  // Check for animal collision
  getAll(lion).forEach((lionItem) => {
    if (adventurerPos.x === lionItem.x && adventurerPos.y === lionItem.y) {
      endGame("You were eaten by a lion!");
    }
  });

  getAll(snake).forEach((snakeItem) => {
    if (adventurerPos.x === snakeItem.x && adventurerPos.y === snakeItem.y) {
      endGame("You were bitten by a snake!");
    }
  });
}

// Function to move animals randomly
function moveAnimals() {
  getAll(lion).forEach((lionItem) => {
    const direction = getRandomInt(0, 3);
    if (direction === 0 && lionItem.x > 0) lionItem.x -= 1; // Move left
    else if (direction === 1 && lionItem.x < width() - 1) lionItem.x += 1; // Move right
    else if (direction === 2 && lionItem.y > 0) lionItem.y -= 1; // Move up
    else if (direction === 3 && lionItem.y < height() - 1) lionItem.y += 1; // Move down
  });

  getAll(snake).forEach((snakeItem) => {
    const direction = getRandomInt(0, 3);
    if (direction === 0 && snakeItem.x > 0) snakeItem.x -= 1; // Move left
    else if (direction === 1 && snakeItem.x < width() - 1) snakeItem.x += 1; // Move right
    else if (direction === 2 && snakeItem.y > 0) snakeItem.y -= 1; // Move up
    else if (direction === 3 && snakeItem.y < height() - 1) snakeItem.y += 1; // Move down
  });
}

// Function to spawn new treasures and animals dynamically
function spawnDynamicEntities() {
  if (getRandomInt(0, 10) > 7) { // Random chance to spawn
    const x = getRandomInt(0, width() - 1);
    const y = getRandomInt(0, height() - 1);
    if (getTile(x, y) === ".") { // Only spawn on empty tiles
      addSprite(x, y, treasure);
    }
  }

  if (getRandomInt(0, 10) > 8) { // Random chance to spawn
    const x = getRandomInt(0, width() - 1);
    const y = getRandomInt(0, height() - 1);
    if (getTile(x, y) === ".") { // Only spawn on empty tiles
      addSprite(x, y, getRandomInt(0, 1) === 0 ? lion : snake);
    }
  }
}

// Function to update the game state
function update() {
  if (gameOver) return;

  // Update timer
  timeLeft -= 1;
  clearText();
  addText(`Time: ${timeLeft}`, { x: 1, y: 0, color: color`3` });
  addText(`Score: ${score}`, { x: 10, y: 0, color: color`3` });

  if (timeLeft <= 0) {
    endGame("Time's up! Game Over.");
    return;
  }

  // Move animals
  moveAnimals();

  // Spawn dynamic entities
  spawnDynamicEntities();

  // Check for collisions
  checkCollisions();

  // Check if all treasures are collected
  if (getAll(treasure).length === 0) {
    endGame("Congratulations! You collected all treasures!");
  }

  setTimeout(update, 500); // Update every 0.5 seconds (faster movement)
}

// Function to end the game
function endGame(message) {
  gameOver = true;
  clearText();
  addText(message, { x: 2, y: 5, color: color`3` });
  addText("Press I to restart", { x: 3, y: 7, color: color`3` });
}

// Start the game loop
update();