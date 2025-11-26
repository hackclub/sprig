/*
@title: Two Player Snake Game
@author: Tejaji
@tags: ['multiplayer']
@addedOn: 2025-11-26
*/

// Define sprites
const player1Head = "1";
const player1Body = "b";
const player1Tail = "t";
const player2Head = "2";
const player2Body = "c";
const player2Tail = "r";
const food = "f";
const wall = "w";

// Set legends with bitmap art
setLegend(
  [player1Head, bitmap`
.00000000000000.
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666006666006660
0666666666666660
0666666666666660
0666000000006660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
.00000000000000.`],
  [player1Body, bitmap`
.00000000000000.
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
.00000000000000.`],
  [player1Tail, bitmap`
.00000000000000.
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0066666666666600
.00666666666600.
..006666666600..
...0066666600...
....00666600....
.....000000.....`],
  [player2Head, bitmap`
.00000000000000.
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333003333003330
0333333333333330
0333333333333330
0333000000003330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
.00000000000000.`],
  [player2Body, bitmap`
.00000000000000.
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
.00000000000000.`],
  [player2Tail, bitmap`
.00000000000000.
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
.00333333333300.
..003333333300..
...0033333300...
....00333300....
.....000000.....`],
  [food, bitmap`
...D........D...
....D..44..D....
.....D4444D.....
...9999999999...
..999999999999..
.99999999999999.
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
.99999999999999.
..999999999999..
...9999999999...
....99999999....
.....999999.....`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`]
);

// Create initial map
const level = map`
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w.............f....w
w..................w
w..................w
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww`;

setMap(level);

// Game state
let snake1 = [{x: 2, y: 2}];
let snake2 = [{x: 7, y: 7}];
let direction1 = {x: 1, y: 0};
let direction2 = {x: -1, y: 0};
let nextDirection1 = {x: 1, y: 0};
let nextDirection2 = {x: -1, y: 0};
let gameRunning = true;
let lastMoveTime = Date.now();
let moveInterval = 200; // milliseconds between moves

// Place initial snakes
function drawSnakes() {
  // Clear all snake sprites
  getAll(player1Head).forEach(s => s.remove());
  getAll(player1Body).forEach(s => s.remove());
  getAll(player1Tail).forEach(s => s.remove());
  getAll(player2Head).forEach(s => s.remove());
  getAll(player2Body).forEach(s => s.remove());
  getAll(player2Tail).forEach(s => s.remove());
  
  // Draw snake 1
  addSprite(snake1[0].x, snake1[0].y, player1Head);
  for (let i = 1; i < snake1.length - 1; i++) {
    addSprite(snake1[i].x, snake1[i].y, player1Body);
  }
  if (snake1.length > 1) {
    addSprite(snake1[snake1.length - 1].x, snake1[snake1.length - 1].y, player1Tail);
  }
  
  // Draw snake 2
  addSprite(snake2[0].x, snake2[0].y, player2Head);
  for (let i = 1; i < snake2.length - 1; i++) {
    addSprite(snake2[i].x, snake2[i].y, player2Body);
  }
  if (snake2.length > 1) {
    addSprite(snake2[snake2.length - 1].x, snake2[snake2.length - 1].y, player2Tail);
  }
}

// Spawn food
function spawnFood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 8) + 1;
    y = Math.floor(Math.random() * 8) + 1;
  } while (isOccupied(x, y));
  
  addSprite(x, y, food);
}

// Check if position is occupied
function isOccupied(x, y) {
  for (let seg of snake1) {
    if (seg.x === x && seg.y === y) return true;
  }
  for (let seg of snake2) {
    if (seg.x === x && seg.y === y) return true;
  }
  return false;
}

// Check collision
function checkCollision(snake, otherSnake) {
  const head = snake[0];
  
  // Wall collision
  if (head.x <= 0 || head.x >= 9 || head.y <= 0 || head.y >= 9) {
    return true;
  }
  
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  
  // Other snake collision
  for (let seg of otherSnake) {
    if (head.x === seg.x && head.y === seg.y) {
      return true;
    }
  }
  
  return false;
}

// Update game
function update() {
  if (!gameRunning) return;
  
  // Calculate new head positions
  const newHead1 = {
    x: snake1[0].x + direction1.x,
    y: snake1[0].y + direction1.y
  };
  
  const newHead2 = {
    x: snake2[0].x + direction2.x,
    y: snake2[0].y + direction2.y
  };
  
  // Insert new heads
  snake1.unshift(newHead1);
  snake2.unshift(newHead2);
  
  // Check collisions
  const collision1 = checkCollision(snake1, snake2);
  const collision2 = checkCollision(snake2, snake1);
  
  if (collision1 && collision2) {
    endGame("Draw!");
    return;
  } else if (collision1) {
    endGame("Player 2 Wins!");
    return;
  } else if (collision2) {
    endGame("Player 1 Wins!");
    return;
  }
  
  // Check food collision for snake 1
  const foodTiles = getTile(newHead1.x, newHead1.y).filter(t => t.type === food);
  if (foodTiles.length > 0) {
    clearTile(newHead1.x, newHead1.y);
    spawnFood();
  } else {
    snake1.pop();
  }
  
  // Check food collision for snake 2
  const foodTiles2 = getTile(newHead2.x, newHead2.y).filter(t => t.type === food);
  if (foodTiles2.length > 0) {
    clearTile(newHead2.x, newHead2.y);
    spawnFood();
  } else {
    snake2.pop();
  }
  
  drawSnakes();
}

// End game
function endGame(message) {
  gameRunning = false;
  addText(message, { x: 4, y: 4, color: color`3` });
  addText("Press K to restart", { x: 2, y: 6, color: color`L` });
}

// Reset game
function resetGame() {
  snake1 = [{x: 2, y: 2}];
  snake2 = [{x: 7, y: 7}];
  direction1 = {x: 1, y: 0};
  direction2 = {x: -1, y: 0};
  gameRunning = true;
  clearText();
  setMap(level);
  drawSnakes();
  spawnFood();
}

// Controls for Player 1 (WASD)
onInput("w", () => {
  if (!gameRunning) return;
  if (direction1.y === 0) {
    nextDirection1 = {x: 0, y: -1};
  }
  tryMove();
});

onInput("s", () => {
  if (!gameRunning) return;
  if (direction1.y === 0) {
    nextDirection1 = {x: 0, y: 1};
  }
  tryMove();
});

onInput("a", () => {
  if (!gameRunning) return;
  if (direction1.x === 0) {
    nextDirection1 = {x: -1, y: 0};
  }
  tryMove();
});

onInput("d", () => {
  if (!gameRunning) return;
  if (direction1.x === 0) {
    nextDirection1 = {x: 1, y: 0};
  }
  tryMove();
});

// Controls for Player 2 (IJKL)
onInput("i", () => {
  if (!gameRunning) return;
  if (direction2.y === 0) {
    nextDirection2 = {x: 0, y: -1};
  }
  tryMove();
});

onInput("k", () => {
  if (!gameRunning) {
    resetGame();
    return;
  }
  if (direction2.y === 0) {
    nextDirection2 = {x: 0, y: 1};
  }
  tryMove();
});

onInput("j", () => {
  if (!gameRunning) return;
  if (direction2.x === 0) {
    nextDirection2 = {x: -1, y: 0};
  }
  tryMove();
});

onInput("l", () => {
  if (!gameRunning) return;
  if (direction2.x === 0) {
    nextDirection2 = {x: 1, y: 0};
  }
  tryMove();
});

// Auto-move the snakes at regular intervals
function tryMove() {
  const currentTime = Date.now();
  if (currentTime - lastMoveTime >= moveInterval) {
    lastMoveTime = currentTime;
    direction1 = nextDirection1;
    direction2 = nextDirection2;
    update();
  }
}

// Continuous game loop
function gameLoop() {
  if (!gameRunning) return;
  
  const currentTime = Date.now();
  if (currentTime - lastMoveTime >= moveInterval) {
    lastMoveTime = currentTime;
    direction1 = nextDirection1;
    direction2 = nextDirection2;
    update();
  }
  
  setTimeout(gameLoop, 50);
}

setTimeout(gameLoop, moveInterval);

// Start game
drawSnakes();
spawnFood();
