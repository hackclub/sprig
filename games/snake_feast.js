/*
@title: Snake Feast
@author: chaste
@tags: []
@addedOn: 2024-06-07
@img: ""
*/

const snakeHead = "H";
const snakeBody = "B";
const orange = "O";
const obstacle = "X";
const wall = "W";

setLegend(
  [ snakeHead, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ snakeBody, bitmap`
................
................
................
....00000000....
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
....00000000....
................
................
................
................`],
  [ orange, bitmap`
................
................
................
.......9........
......999.......
.....99999......
....9999999.....
....9999999.....
....9999999.....
.....99999......
......999.......
.......9........
................
................
................
................`],
  [ obstacle, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
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
WWWWWWWWWWWWWWWW
W..............W
W..............W
W..............W
W..............W
W..............W
W.....H........W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
W..............W
WWWWWWWWWWWWWWWW`,
  map`
WWWWWWWWWWWWWWWW
W......X.......W
W......X.......W
W..............W
W..............W
W.....H........W
W.....B........W
W.....B........W
W.....B........W
W.....B........W
W..............W
W..............W
W..............W
W......O.......W
W..............W
WWWWWWWWWWWWWWWW`
];

let currentLevel = levels[level];
setMap(currentLevel);

setSolids([snakeHead, snakeBody, obstacle, wall]); 

let snake = [];
let snakeDirection = "right";
let growing = false;
let gameOver = false;

const eatSound = tune`
500: c5~500 + d5~500,
500: g4~500,
15000`;
const gameOverSound = tune`
500: f5~500 + d5~500,
500: c5~500,
15000`;

function initializeSnake() {
  snake = [getFirst(snakeHead)];
  snakeDirection = "right";
  growing = false;
  gameOver = false;
}

initializeSnake();

function placeOrange() {
  let emptyTiles = [];
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      let tile = getTile(x, y);
      if (tile.length === 0 || tile.every(sprite => ![snakeHead, snakeBody, obstacle, wall].includes(sprite.type))) {
        emptyTiles.push({ x, y });
      }
    }
  }

  if (emptyTiles.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyTiles.length);
    let { x, y } = emptyTiles[randomIndex];
    addSprite(x, y, orange);
  }
}

placeOrange();

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
    
    if (newHeadTile.find(t => t.type === obstacle) || newHeadTile.find(t => t.type === wall) || newHeadTile.find(t => t.type === snakeBody)) {
      playTune(gameOverSound);
      addText("Game Over!", { y: 4, color: color`3` });
      gameOver = true;
      return;
    }

    if (newHeadTile.find(t => t.type === orange)) {
      playTune(eatSound);
      growing = true;
      clearTile(newHead.x, newHead.y);
      placeOrange();
    }

    addSprite(newHead.x, newHead.y, snakeHead);
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
  if (!gameOver && snakeDirection !== "down") {
    snakeDirection = "up";
  }
});

onInput("a", () => {
  if (!gameOver && snakeDirection !== "right") {
    snakeDirection = "left";
  }
});

onInput("s", () => {
  if (!gameOver && snakeDirection !== "up") {
    snakeDirection = "down";
  }
});

onInput("d", () => {
  if (!gameOver && snakeDirection !== "left") {
    snakeDirection = "right";
  }
});

onInput("i", () => {
  const currentLevel = levels[level]; 

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    initializeSnake();
    placeOrange();
  }
});


afterInput(() => {
  moveSnake();
});
