/*
@title: Traditional Snake
@description: "Traditional Snake" is a retro-style game where players control a snake using directional keys to eat apples and grow in length. The objective is to maximize the snake's size without crashing into walls or itself. As the player collects apples, the game becomes more challenging with the increased size of the snake.
@author: dmcegan
@tags: ['retro']
@addedOn: 2024-07-05
*/
const snakeHead = "h";
const snakeBody = "s";
const apple = "a";
const strawberry = "t";
const watermelon = "w";
const slowPower = "p";  // Slow motion power-up
const shrinkPower = "r"; // Shrink power-up
const wall = "b";
const grass = "g";

//let repeat = null;

setLegend(
  [ snakeHead, bitmap`
................
................
......3333......
.....333333.....
....33333333....
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
................
................`],
  [ snakeBody, bitmap`
................
................
......2222......
.....222222.....
....22222222....
...2222222222...
..222222222222..
..222222222222..
..222222222222..
..222222222222..
...2222222222...
....22222222....
.....222222.....
......2222......
................
................`],
  [ apple, bitmap`
................
................
......0000......
.....0CCCC0.....
....0CCCCCC0....
...0CCCCCCCC0...
..0CCCCCCCCCC0..
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
..0CCCCCCCCCC0..
...0CCCCCCCC0...
....0CCCCCC0....
.....0CCCC0.....
......0000......
................`],
  [ strawberry, bitmap`
................
................
......0000......
.....0DDDD0.....
....0DDDDDD0....
...0DDDDDDDD0...
..0DDDDDDDDDD0..
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
..0DDDDDDDDDD0..
...0DDDDDDDD0...
....0DDDDDD0....
.....0DDDD0.....
......0000......
................`],
  [ watermelon, bitmap`
................
................
......0000......
.....099990.....
....09999990....
...0999999990...
..099999999990..
.09999999999990.
.09999999999990.
.09999999999990.
..099999999990..
...0999999990...
....09999990....
.....099990.....
......0000......
................`],
  [ slowPower, bitmap`
................
................
......0000......
.....011110.....
....01111110....
...0111111110...
..011111111110..
.01111111111110.
.01111111111110.
.01111111111110.
..011111111110..
...0111111110...
....01111110....
.....011110.....
......0000......
................`],  // Blue hourglass for slow time
  [ shrinkPower, bitmap`
................
................
......0000......
.....0660060....
....066600660...
...06666006660..
..0666660066660.
.066666600666660
.066666600666660
.06666600666660.
..066660066660..
...0666006660...
....06600660....
.....060060.....
......0000......
................`], // Orange shrink symbol
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ grass, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
);

setBackground(grass);

let level = 0; 
const levels = [
  map`
bbbbbbbbbbbbbbbb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bgggggghgggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bggggggggggggggb
bbbbbbbbbbbbbbbb`,
];

let currentLevel = levels[level];
setMap(currentLevel);

setSolids([snakeHead, snakeBody, wall]); 

let snake = [getFirst(snakeHead)];
let snakeDirection = "right";
let growing = false;
let gameOver = false;
let gameSpeed = 120; // Normal speed (ms between moves)
let slowTimer = 0;
let shrinkTimer = 0;

const eatSound = tune`
125.52301255230125: C5^125.52301255230125 + A4^125.52301255230125 + E5^125.52301255230125,
3891.213389121339`;
const gameOverSound = tune`
272.72727272727275: E5^272.72727272727275,
272.72727272727275: C5^272.72727272727275,
272.72727272727275: F4^272.72727272727275,
7909.09090909091`;
const powerUpSound = tune`
125: E5^125 + G5^125,
125: E5^125 + G5^125,
125: E5^125 + G5^125,
3750`;

function placeItem() {
  let emptyTiles = [];
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      let tile = getTile(x, y);
      if (tile.length === 0 || tile.every(sprite => ![snakeHead, snakeBody, wall].includes(sprite.type))) {
        emptyTiles.push({ x, y });
      }
    }
  }

  if (emptyTiles.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyTiles.length);
    let { x, y } = emptyTiles[randomIndex];
    
    // Randomly choose between fruit or power-up
    const randomChoice = Math.random();
    
    if (randomChoice < 0.7) {
      // 70% chance of regular fruit
      const fruits = [apple, strawberry, watermelon];
      const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
      addSprite(x, y, randomFruit);
    } else if (randomChoice < 0.85) {
      // 15% chance of slow power-up
      addSprite(x, y, slowPower);
    } else {
      // 15% chance of shrink power-up
      addSprite(x, y, shrinkPower);
    }
  }
}

placeItem();

function updateTimers() {
  // Update slow timer
  if (slowTimer > 0) {
    slowTimer--;
    if (slowTimer === 0) {
      gameSpeed = 120; // Reset to normal speed
    }
  }
  
  // Update shrink timer
  if (shrinkTimer > 0) {
    shrinkTimer--;
  }
}

function applyShrink() {
  // Remove tail segments to shrink snake (minimum 3 segments)
  const segmentsToRemove = Math.min(3, snake.length - 1);
  for (let i = 0; i < segmentsToRemove; i++) {
    let tail = snake.pop();
    if (tail) {
      clearTile(tail.x, tail.y);
    }
  }
}

function restartGame() {
  // Clear game over text
  clearText();
  
  // Reset game state
  gameOver = false;
  growing = false;
  snakeDirection = "right";
  gameSpeed = 120;
  slowTimer = 0;
  shrinkTimer = 0;
  
  // Clear all sprites
  getAll().forEach(sprite => {
    if (sprite.type === snakeHead || sprite.type === snakeBody || 
        sprite.type === apple || sprite.type === strawberry || 
        sprite.type === watermelon || sprite.type === slowPower || 
        sprite.type === shrinkPower) {
      sprite.remove();
    }
  });
  
  // Reset snake
  snake = [];
  setMap(levels[level]);
  snake = [getFirst(snakeHead)];
  
  // Place first item
  placeItem();
}

function moveSnake() {
  if (gameOver) return;

  let head = snake[0];
  let newHead;
  
  if (snakeDirection === "up") {
    newHead = { x: head.x, y: head.y - 1 };
  } else if (snakeDirection === "down") {
    newHead = { x: head.x, y: head.y + 1 };
  } else if (snakeDirection === "left") {
    newHead = { x: head.x - 1, y: head.y };
  } else if (snakeDirection === "right") {
    newHead = { x: head.x + 1, y: head.y };
  }

  if (newHead) {
    let newHeadTile = getTile(newHead.x, newHead.y);
    
    if (newHeadTile.find(t => t.type === wall) || newHeadTile.find(t => t.type === snakeBody)) {
      playTune(gameOverSound);
      addText("Game Over!", { 
        x: 5, 
        y: 7, 
        color: color`3` 
      });
      addText("Press 'K' to restart", { 
        x: 3, 
        y: 9, 
        color: color`3` 
      });
      gameOver = true;
      return;
    }

    // Check what was eaten
    const item = newHeadTile.find(t => t.type === apple || t.type === strawberry || 
                                       t.type === watermelon || t.type === slowPower || 
                                       t.type === shrinkPower);
    if (item) {
      if (item.type === apple || item.type === strawberry || item.type === watermelon) {
        playTune(eatSound);
        growing = true;
      } else if (item.type === slowPower) {
        playTune(powerUpSound);
        gameSpeed = 200; // Slow down (higher number = slower)
        slowTimer = 25; // ~5 seconds (25 game loops * ~200ms)
        addText("SLOW MOTION!", { 
          x: 4, 
          y: 11, 
          color: color`1` 
        });
        setTimeout(() => clearText(), 1000);
      } else if (item.type === shrinkPower) {
        playTune(powerUpSound);
        applyShrink();
        shrinkTimer = 25; // ~5 seconds
        addText("SHRINK!", { 
          x: 6, 
          y: 11, 
          color: color`6` 
        });
        setTimeout(() => clearText(), 1000);
      }
      
      item.remove();
      placeItem();
    }

    // Update snake head position
    const headSprite = getFirst(snakeHead);
    if (headSprite) {
      headSprite.type = snakeBody; // Change old head to body
    }
    
    // Add new head
    addSprite(newHead.x, newHead.y, snakeHead);
    
    snake.unshift(newHead);
    
    if (!growing) {
      let tail = snake.pop();
      if (tail) {
        clearTile(tail.x, tail.y);
      }
    } else {
      growing = false;
    }
  }
}

onInput("w", () => {
    snakeDirection = "up";
});

onInput("a", () => {
    snakeDirection = "left";
});

onInput("s", () => {
    snakeDirection = "down";
});

onInput("d", () => {
    snakeDirection = "right";
});

// Add restart functionality
onInput("k", () => {
  if (gameOver) {
    restartGame();
  }
});

// Main game loop
let gameLoopInterval;

function startGameLoop() {
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval);
  }
  
  gameLoopInterval = setInterval(() => {
    if (!gameOver) {
      moveSnake();
      updateTimers();
    }
  }, gameSpeed);
}

// Update game speed when it changes
function updateGameSpeed(newSpeed) {
  gameSpeed = newSpeed;
  startGameLoop();
}

// Start the initial game loop
startGameLoop();