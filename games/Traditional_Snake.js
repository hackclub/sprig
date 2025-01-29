/*
@title: Traditional Snake
@author: dmcegan
@tags: ['retro']
@addedOn: 2024-07-05
*/
const snakeBody = "s";
const apple = "a";
const wall = "w";

//let repeat = null;

setLegend(
  [ snakeBody, bitmap`
..DDDDDDDDDDDD..
.DD4444444444DD.
DD444444444444DD
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444400444444D
D44444400444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
DD444444444444DD
.DD4444444444DD.
..DDDDDDDDDDDD..`],
  [ apple, bitmap`
.........4C.....
........4C4.....
........C44.....
...0000C00000...
...0330003330...
..003333333300..
..033333333330..
..033333333330..
..033333333330..
..033333333330..
..033333333300..
..00033333330...
....000333000...
......00000.....
................
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

let level = 0; 
const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w..............w
w..............w
w..............w
w.....s........w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`,
];

let currentLevel = levels[level];
setMap(currentLevel);

setSolids([snakeBody, wall]); 

let snake = [getFirst(snakeBody)];
let snakeDirection = "right";
let growing = false;
let gameOver = false;

const eatSound = tune`
125.52301255230125: C5^125.52301255230125 + A4^125.52301255230125 + E5^125.52301255230125,
3891.213389121339`;
const gameOverSound = tune`
272.72727272727275: E5^272.72727272727275,
272.72727272727275: C5^272.72727272727275,
272.72727272727275: F4^272.72727272727275,
7909.09090909091`;

function placeApple() {
  let emptyTiles = [];
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      let tile = getTile(x, y);
      if (tile.length === 0 || tile.every(sprite => ![snakeBody, wall].includes(sprite.type))) {
        emptyTiles.push({ x, y });
      }
    }
  }

  if (emptyTiles.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyTiles.length);
    let { x, y } = emptyTiles[randomIndex];
    addSprite(x, y, apple);
  }
}

placeApple();

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
      addText("Game Over!", { y: 4, color: color`3` });
      gameOver = true;
      return;
    }

    if (newHeadTile.find(t => t.type === apple)) {
      playTune(eatSound);
      growing = true;
      clearTile(newHead.x, newHead.y);
      placeApple();
    }

    addSprite(newHead.x, newHead.y, snakeBody);
    if (snake.length > 0) {
      addSprite(head.x, head.y, snakeBody);
    }
    
    snake.unshift(newHead);
    
    if (!growing) {
      let tail = snake.pop();
      clearTile(tail.x, tail.y);
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

setInterval(moveSnake, 120);
