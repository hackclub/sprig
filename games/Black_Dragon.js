// @author: Rajiv kumar
// @tags:arcade, retro, classic
// @description: A classic snake game built for Sprig

// 1. Define Visual Assets
const head = "h";
const body = "b";
const fruit = "f";
const empty = ".";

setLegend(
  [ head, bitmap`
................
...33333333.....
...303333033....
..33333333333...
..333333333333..
..333333333333..
...3333333333...
....33333333....
................
................
................
................
................
................
................
................` ],
  [ body, bitmap`
................
....55555555....
...5555555555...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
....55555555....
................
................
................
................
................
................
................` ],
  [ fruit, bitmap`
................
.......5........
......5.........
.....777777.....
....77777777....
...7777777777...
...7777777777...
....77777777....
.....777777.....
................
................
................
................
................
................
................` ]
);

// 2. Map Configuration (20x15 Canvas)
const level = map`
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
....................`;

setMap(level);

// 3. Game Variables & State
let snake = [];
let dx = 1;
let dy = 0;
let score = 0;
let highScore = 0;
let gameActive = true;

// 4. Helper Function: Random Fruit Generator
function spawnFruit() {
  let spawned = false;
  while (!spawned) {
    let rx = Math.floor(Math.random() * width());
    let ry = Math.floor(Math.random() * height());

    let hittingSnake = snake.some(segment => segment.x === rx && segment.y === ry);

    if (!hittingSnake) {
      clearTile(rx, ry);
      addSprite(rx, ry, fruit);
      spawned = true;
    }
  }
}

// Helper Function: Initialize/Reset Game State
function initGame() {
  // Wipe all text layers from the screen layout completely
  clearText();

  // Clear existing items on map grid cells
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      clearTile(x, y);
    }
  }

  // Reset snake position and length
  snake = [
    { x: 5, y: 7 },
    { x: 4, y: 7 },
    { x: 3, y: 7 }
  ];

  // Reset movement vector direction & score
  dx = 1;
  dy = 0;
  score = 0;
  gameActive = true;

  // Spawn fresh yellow food
  spawnFruit();
}

// Boot up game values for the first time
initGame();

// 5. Main Runtime Frame Tick Loop
function updateGame() {
  // Clear all text layers at the start of the frame
  clearText();

  if (!gameActive) {
    // Redraw game over screen elements if inactive
    addText("Game Over!\nPress W Key", { x: 4, y: 6, color: color`red` });
    addText("Score: " + score, { x: 1, y: 1, color: color`black` });
    addText("Hi: " + highScore, { x: 14, y: 1, color: color`black` });
    return;
  }

  // Exact head array list indexing
  let newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // Border Boundary Map Edge Check
  if (newHead.x < 0 || newHead.x >= width() || newHead.y < 0 || newHead.y >= height()) {
    gameActive = false;
    return;
  }

  // Self Tail Collision Check
  let selfCollision = snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
  if (selfCollision) {
    gameActive = false;
    return;
  }

  // Advance snake coordinates list tracking
  snake.unshift(newHead);

  // Check if snake head overlaps food element layer
  let currentTileSprites = getTile(newHead.x, newHead.y);
  let ateFruit = currentTileSprites.some(s => s.type === fruit);

  if (ateFruit) {
    score += 1;
    if (score > highScore) {
      highScore = score;
    }
    clearTile(newHead.x, newHead.y);
    spawnFruit();
  } else {
    let tail = snake.pop();
    clearTile(tail.x, tail.y);
  }

  // Render tracking layers onto the map board grid system
  snake.forEach((segment, index) => {
    clearTile(segment.x, segment.y);
    if (index === 0) {
      addSprite(segment.x, segment.y, head);
    } else {
      addSprite(segment.x, segment.y, body);
    }
  });

  // Render text values for the current frame layer
  addText("Score: " + score, { x: 1, y: 1, color: color`black` });
  addText("Hi: " + highScore, { x: 14, y: 1, color: color`black` });
}

// 6. Input Handler & Direction Controllers
function handleInput(moveFunc) {
  if (!gameActive) {
    initGame(); // Pressing any valid game key resets game
  } else {
    moveFunc();
  }
}

function goUp()    { if (dy !== 1)  { dx = 0;  dy = -1; } }
function goDown()  { if (dy !== -1) { dx = 0;  dy = 1;  } }
function goLeft()  { if (dx !== 1)  { dx = -1; dy = 0;  } }
function goRight() { if (dx !== -1) { dx = 1;  dy = 0;  } }

// Input Set 1: WASD Mechanics
onInput("w", () => handleInput(goUp));
onInput("s", () => handleInput(goDown));
onInput("a", () => handleInput(goLeft));
onInput("d", () => handleInput(goRight));

// Input Set 2: Arrow Keyboard Mappings (Mapped through Sprig's i, j, k, l)
onInput("i", () => handleInput(goUp));
onInput("k", () => handleInput(goDown));
onInput("j", () => handleInput(goLeft));
onInput("l", () => handleInput(goRight));

// 7. Loop Clock Interval Timing (180ms steps)
setInterval(updateGame, 180);
