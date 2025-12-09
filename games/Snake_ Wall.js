/*
@author: Ethan Lasky
@description: Keybinds: WASD, W & S for cursor moving, I for menu select, ingame J for pause. snake hell, uh oh- ill add more gamemodes & QOL soon, including TUNES! & this game is based off of the 'classic snake' but i like HEAVILY modified it.
@title: SnakeWall
*/

const snakeBody = "s";
const food = "f";
const background = "b";
const wall = "w";
const cursor = "i";

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 1 };
let foodP = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
let wallP = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
let score = 0;
let gameRunning = true;
let wallAmt = 1
let ispause = 1
let ismenu = 1
let cursorP = { x: 0, y: 4 }
let realpause = false
let menulevel = 0
let isspeedselect = false
let isabout = false
let speed = 200

setLegend(
  [cursor, bitmap`
................
................
................
................
...........2....
...........22...
...........222..
...........2222.
...........2222.
...........222..
...........22...
...........2....
................
................
................
................`],
  [wall, bitmap`
................
.33333333333333.
.3CCC1CCCC1CCC3.
.3CCC1CCCC1CCC3.
.31111111111113.
.31CCCC1CCCC1C3.
.31CCCC1CCCC1C3.
.31111111111113.
.3C1CCCC1CCCC13.
.3C1CCCC1CCCC13.
.31111111111113.
.3CCC1CCCC1CCC3.
.3CCC1CCCC1CCC3.
.31111111111113.
.33333333333333.
................`],
  [snakeBody, bitmap`
................
.DDDDDDDDDDDDDD.
.D444444444444D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D4DDDDDDDDDD4D.
.D444444444444D.
.DDDDDDDDDDDDDD.
................`],
  [food, bitmap`
................
.......D........
.......D........
....CCCDDCCC....
...C33333333C...
..C3333333333C..
..C3333333333C..
..C3333333333C..
..C3333333333C..
..C3333333333C..
...C33333333C...
...C33333333C...
....CCCCCCCC....
................
................
................`],
  [background, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`]
);

setBackground(background);
setMap(createMap());

onInput("w", () => { if (direction.y === 0) direction = { x: 0, y: -1 } });
onInput("s", () => { if (direction.y === 0) direction = { x: 0, y: 1 } });
onInput("a", () => { if (direction.x === 0) direction = { x: -1, y: 0 } });
onInput("d", () => { if (direction.x === 0) direction = { x: 1, y: 0 } });

onInput("i", () => { menuselect() });
onInput("j", () => { if (realpause == true) { pause() } });
direction = { x: 0, y: 0 }
pause()

function init(speed) {
  setInterval(() => {
    if (ispause !== 1)
      if (gameRunning) {
        updateSnakePosition();
        checkWall();
        checkFood();
        checkWall();
        render()
      } else { gameOver(); }
  }, speed);
}

function pause() {
  if (ispause == 1 && ismenu == 1 && realpause == false) {
    let blinkOn = true;

    let pauseInt = setInterval(() => {
      if (blinkOn) {
        cursorP = { x: cursorP.x, y: cursorP.y + 2 * direction.y };
        if (cursorP.y + 2 * direction.y < 2) {
          cursorP.y = 2;
        } else {
          if (cursorP.y + 2 * direction.y > 6) {
            cursorP.y = 6;
          } else {
            addSprite(cursorP.x, cursorP.y, cursor);
            direction = { x: 0, y: 0 };
          }
        }
      } else {
        clearTile(cursorP.x, cursorP.y);
        if (cursorP.y + 2 * direction.y < 2) {
          cursorP.y = 2;
        } else {
          if (cursorP.y + 2 * direction.y > 6) {
            cursorP.y = 6;
          } else {
            cursorP = { x: cursorP.x, y: cursorP.y + 2 * direction.y };
            direction = { x: 0, y: 0 };
          }
        }
      }
      blinkOn = !blinkOn;
      direction = { x: 0, y: 0 }

      function menuselect() {
        if (realpause !== true) {

          if (isspeedselect == true) {
            if (cursorP.y == 2) {
              menulevel = 1;
            }
            if (cursorP.y == 4) {
              menulevel = 2;
              if (speed < 2000) {
                speed = speed + 50;
              } else {
                clearText();
                speed = 0;
              }
            }
            if (cursorP.y == 6) {
              menulevel = 3;
              clearText();
              isspeedselect = !isspeedselect
            }

          } else {
            if (isabout == true) {


              if (cursorP.y == 2) {
                menulevel = 1;
              }
              if (cursorP.y == 4) {
                menulevel = 2;
              }
              if (cursorP.y == 6) {
                menulevel = 3;
                clearText();
                isabout = !isabout
              }


            } else {

              if (cursorP.y == 2) {
                clearText();
                isabout = true
              }
              if (cursorP.y == 4) {
                clearText();
                isspeedselect = true;
              }
              if (cursorP.y == 6) {
                clearInterval(pauseInt);
                realpause = true;
                clearTile(cursorP.x, cursorP.y)
                pause();
                init(speed);
              }
            }

            wait(200, () => {
              menulevel = 0
            });
          }
        }
      }


      globalThis.menuselect = menuselect;
      if (isspeedselect == true) {
        addText(`Speed Select`, { x: 4, y: 4, color: menulevel === 1 ? color`D` : color`4` });
        addText(`${speed}ms`, { x: 4, y: 7, color: menulevel === 2 ? color`D` : color`4` });
        addText(`Back`, { x: 4, y: 10, color: menulevel === 3 ? color`D` : color`4` });
      } else {
        if (isabout == true) {
          addText(`Snake(s) 2025`, { x: 4, y: 4, color: menulevel === 1 ? color`1` : color`2` });
          addText(`12/8/25 M/D/Y`, { x: 4, y: 5, color: menulevel === 4 ? color`1` : color`2` });
          addText(`by goober234`, { x: 4, y: 7, color: menulevel === 2 ? color`1` : color`2` });
          addText(`(discord)`, { x: 4, y: 8, color: menulevel === 2 ? color`1` : color`2` });
          addText(`Back`, { x: 4, y: 10, color: menulevel === 3 ? color`D` : color`4` });
        } else {
          addText(`Snake: Wall`, { x: 4, y: 4, color: menulevel === 1 ? color`D` : color`4` });
          addText(`Speed Selector`, { x: 4, y: 7, color: menulevel === 2 ? color`D` : color`4` });
          addText(`Start`, { x: 4, y: 10, color: menulevel === 3 ? color`D` : color`4` });
        }
      }
    }, 200);

  } else {
    if (ispause == 1 && realpause == true) {
      ismenu = 0;
      ispause = 0;
      clearText();
    } else {
      if (ispause == 0 && realpause == true) {
        ispause = 1;
        addText("Paused", { x: 7, y: 7, color: color`2` });
      }
    }
  }
}

function createMap() {
  return map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb`;
}

function updateSnakePosition() {
  const newHead = {
    x: (snake[0].x + direction.x + 10) % 10,
    y: (snake[0].y + direction.y + 10) % 10
  };

  for (let i = 1; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      gameOver();
      return;
    }
  }

  snake.unshift(newHead);

  if (!(newHead.x === foodP.x && newHead.y === foodP.y)) {
    const tail = snake.pop();
    clearTile(tail.x, tail.y);
  }
}

function wait(ms, callback) {
  let elapsed = 0;
  const interval = 50;

  const id = setInterval(() => {
    elapsed += interval;
    if (elapsed >= ms) {
      clearInterval(id);
      callback();
    }
  }, interval);
}

function checkFood() {
  if (snake[0].x === foodP.x && snake[0].y === foodP.y) {
    score++;
    placeNewWall();
    placeNewFood();
    wallAmt++;
  }
};

function checkWall() {
  if (snake[0].x === wallP.x && snake[0].y === wallP.y) {
    gameOver();
  }
}

function placeNewFood() {
  foodP = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
  if (wall.x === foodP.x && wall.y === foodP.y)
    placeNewFood()
};

function placeNewWall() {
  wallP = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
}

function render() {
  clearTile(wallP.x, wallP.y);
  addSprite(wallP.x, wallP.y, wall);
  clearTile(foodP.x, foodP.y);
  addSprite(foodP.x, foodP.y, food);
  for (let i = 0; i < snake.length; i++) {
    addSprite(snake[i].x, snake[i].y, snakeBody);
  }
  clearText();
  addText(`${score}`, { x: 3, y: 1, color: color`4` });
}

function gameOver() {
  gameRunning = false;
  clearText();
  addText("Game Over", { x: 6, y: 7, color: color`7` });
  addText(`Score: ${score}`, { x: 6, y: 8, color: color`4` });
  addText(`Walls: ${wallAmt}`, { x: 6, y: 9, color: color`9` });
}