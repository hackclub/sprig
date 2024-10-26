/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Googly boo
@author: 
@tags: []
@addedOn: 2024-00-00
*/const snakeHead = "H";
const snakeBody = "B";
const mouse = "M";

setLegend(
  [snakeHead, bitmap`
................
................
................
................
................
........00..00..
........00..00..
..00000000000000
3.30600000000000
.30000000..00..0
.......00..00..0
................
................
................
................
................`],
  [snakeBody, bitmap`
................
................
................
................
................
....L0L0L.......
....L0L0L.......
....L0L0L.......
....L0L0L.......
................
................
................
................
................
................
................`],
  [mouse, bitmap`
................
................
................
................
.........00000..
......00.000000.
.....0000000000.
...300600000000C
....00000000000C
.....0000000000C
......00.00000.C
...........CCCC.
..........C.....
........CC......
................
................`]
);

let snake = [{ x: 2, y: 2 }];
let direction = { dx: 1, dy: 0 };
let score = 0;
let isGameOver = false;

setMap(map`
........
........
........
........
........
........
........
........`);

addSprite(snake[0].x, snake[0].y, snakeHead);

function spawnMouse() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 8);
    y = Math.floor(Math.random() * 8);
  } while (getTile(x, y).length > 0);
  addSprite(x, y, mouse);
}

onInput("w", () => { if (direction.dy === 0) direction = { dx: 0, dy: -1 }; });
onInput("s", () => { if (direction.dy === 0) direction = { dx: 0, dy: 1 }; });
onInput("a", () => { if (direction.dx === 0) direction = { dx: -1, dy: 0 }; });
onInput("d", () => { if (direction.dx === 0) direction = { dx: 1, dy: 0 }; });

function moveSnake() {
  if (isGameOver) return;

  let head = { x: snake[0].x + direction.dx, y: snake[0].y + direction.dy };

  if (head.x < 0 || head.x >= 8 || head.y < 0 || head.y >= 8 || getTile(head.x, head.y).includes(snakeBody)) {
    endGame();
    return;
  }

  snake.unshift(head);
  addSprite(head.x, head.y, snakeHead);

  if (getTile(head.x, head.y).includes(mouse)) {
    score += 1;
    updateScore();
    spawnMouse();
  } else {
    let tail = snake.pop();
    clearTile(tail.x, tail.y);
  }

  if (snake.length > 1) {
    clearTile(snake[1].x, snake[1].y);
    addSprite(snake[1].x, snake[1].y, snakeBody);
  }

  setTimeout(moveSnake, 300 - score * 10);
}

function updateScore() {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 0 });
}

function endGame() {
  isGameOver = true;
  clearText();
  addText(`Game Over! Final Score: ${score}`, { x: 1, y: 0 });
}

spawnMouse();
updateScore();
moveSnake();
