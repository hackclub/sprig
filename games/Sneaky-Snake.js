/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Snake
@author: Mohamed  
@tags: []
@addedOn: 2024-3-19
*/
const snakeHead = "h";
const snaketail = "b";
const apple = "a";
const fire = "f";

setLegend(
  [ snakeHead, bitmap`
................
................
................
................
.....DDDDDDDD...
....DDDDDDDDDD..
....DD00DD00DD..
....DD00DD00DD..
....DDDDDDDDDD..
....DDDDDDDDDD..
....DDDD33DDDD..
.....DDD33DDD...
........33......
.......3333.....
................
................` ],
  [ snaketail, bitmap`
................
................
................
................
....DDDDDDDDDD..
....DLLLLLLLLD..
....DLDDDDDDDD..
....DLLLLLLLLD..
....DDDDDDDDLD..
....DLLLLLLLLD..
....DLDDDDDDDD..
....DLLLLLLLLD..
....DDDDDDDDDD..
................
................
................` ],
  [ apple, bitmap`
................
.......444......
......343.......
.....33433......
....3333333.....
...333333333....
...333333333....
...333333333....
...333333333....
...333333333....
....3333333.....
.....33333......
......333.......
................
................
................` ],
  [ fire, bitmap`
................
.......99.......
......9999......
.....996699.....
....99666699....
...9966666699...
...9666666669...
...9666666669...
...9966666699...
....99999999....
.....999999.....
................
................
................
................
................` ]
);
setSolids([ snakeHead, snaketail, fire ]);

let level = 0;
const levels = [
  map`
h.......
........
........
........
........
........
........
........`
];

setMap(levels[level]);

let snake = [{ x: 0, y: 0 }];
let direction = { x: 1, y: 0 };
let applePos = { x: 4, y: 4 };
let firePos = { x: Math.floor(Math.random() * 8), y: Math.floor(Math.random() * 8) };
let gameRunning = true;
let speed = 200;
let justAte = false;
let appleCount = 0;

addSprite(applePos.x, applePos.y, apple);
addSprite(firePos.x, firePos.y, fire);

function gameLoop() {
  if (!gameRunning) return;
  setTimeout(() => {
    moveSnake();
    checkCollisions();
    checkApple();
    gameLoop();
  }, speed);
}

function moveSnake() {
  const head = snake[0];
  let newHead = {
    x: (head.x + direction.x + 8) % 8,
    y: (head.y + direction.y + 8) % 8
  };  
  if (getTile(newHead.x, newHead.y).some(t => t.type === snaketail)) {
    gameOver();
    return;
  }
  const tail = snake[snake.length - 1];
  addSprite(tail.x, tail.y, snaketail);
  addSprite(newHead.x, newHead.y, snakeHead);
  snake.unshift(newHead);
  if (!justAte && snake.length > 1) {
    const body = snake.pop();
    clearTile(body.x, body.y);
  }

  justAte = false;
}

function checkCollisions() {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }
  if (head.x === firePos.x && head.y === firePos.y) {
    gameOver();
  }
}

function checkApple() {
  const head = snake[0];
  if (head.x === applePos.x && head.y === applePos.y) {
    justAte = true;
    appleCount++;
    if (appleCount >= 10) {
      winGame();
      return;
    }

    const tail = snake[snake.length - 1];  
    addSprite(tail.x, tail.y, snaketail); 

    clearTile(applePos.x, applePos.y);
    do {
      applePos = {
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8)
      };
    } while (getTile(applePos.x, applePos.y).length > 0);
    addSprite(applePos.x, applePos.y, apple);

    clearTile(firePos.x, firePos.y);
    do {
      firePos = {
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8)
      };
    } while (getTile(firePos.x, firePos.y).length > 0);
    addSprite(firePos.x, firePos.y, fire);
  }
}

function gameOver() {
  gameRunning = false;
  addText("Game Over!", { x: 1, y: 3, color: color`3` });
}

function winGame() {
  gameRunning = false;
  addText("You Win!", { x: 1, y: 3, color: color`2` });
}

onInput("w", () => {
  if (direction.y === 0) direction = { x: 0, y: -1 };
});

onInput("s", () => {
  if (direction.y === 0) direction = { x: 0, y: 1 };
});

onInput("a", () => {
  if (direction.x === 0) direction = { x: -1, y: 0 };
});

onInput("d", () => {
  if (direction.x === 0) direction = { x: 1, y: 0 };
});

gameLoop();