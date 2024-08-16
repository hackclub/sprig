/*
@title: Traditional Snake
@author: dmcegan
@tags: ['classic']
@addedOn: 2024-08-15
*/
const snakeBody = "s";
const apple = "a";
const wall = "w";

//let repeat = null;

setLegend(
  [ snakeBody, bitmap`
................
...DDDDDDDDDD...
..D4444444444D..
.D444444444444D.
.D444444444444D.
.D444444444444D.
.D444444444444D.
.D444440344444D.
.D444440044444D.
.D444444444444D.
.D444444444444D.
.D444444444444D.
.D444444444444D.
..D4444444444D..
...DDDDDDDDDD...
................`],
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
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
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
168.53932584269663: D5^168.53932584269663 + A5^168.53932584269663 + F5^168.53932584269663,
168.53932584269663: E5^168.53932584269663 + G5^168.53932584269663,
5056.179775280899`;
const gameOverSound = tune`
150.7537688442211: C5^150.7537688442211,
150.7537688442211: B4^150.7537688442211,
150.7537688442211: A4^150.7537688442211,
150.7537688442211: F4^150.7537688442211,
150.7537688442211: D4^150.7537688442211,
150.7537688442211: C4^150.7537688442211,
3919.597989949749`;

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

