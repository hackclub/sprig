/*
@author: Ethan Lasky
@description: Keybinds: WASD, W & S for cursor moving, I for menu select, ingame J for pause. snake hell, uh oh- ill add more gamemodes & QOL soon, including TUNES! & this game is based off of the 'classic snake' but i like HEAVILY modified it.
@title: Snake: Wall
*/

const snakeBody = "s";
const food = "f";
const background = "b";
const wall = "w";
const cursor = "i";

const select = tune`
300: E5-300,
9300`
const selection = tune`
150: C5-150,
150: C5-150,
4500`
const eat = tune`
150: C5-150,
150: G5-150,
4500`
const gameover = tune`
150: G5-150,
150: E5-150,
150: C5-150,
150: G4-150,
150: B4-150,
150: E5-150,
150: C5-150,
3750`

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let foodP = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
let wallP = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
let score = 0;
let gameRunning = true;
let wallAmt = 1;
let ispause = 1;
let ismenu = 1;
let cursorP = { x: 0, y: 4 };
let realpause = false;
let menulevel = 0;
let isspeedselect = false;
let isabout = false;
let ismodeselect = false;
let ismute = false;
let speed = 200;
let walls = [];
let foods = [];
let initv = null;
let pauseInt = null;
let deadInt = null;
let maxH = 2
let maxL = (!isspeedselect && !isabout) ? 8 : 6;
let blinkOn = null;

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

onInput("i", () => { menuselect(); if (gameRunning !== true){ endmenu(); }});
onInput("j", () => { if (realpause == true && gameRunning == true) { pause() } });
direction = { x: 0, y: 0 }
pause()

function init(speed) {
  placeNewFood();
  placeNewWall()
  initv = setInterval(() => {
    if (ispause !== 1)
      if (gameRunning) {
        checkFood();
        checkWall();
        updateSnakePosition();
        render()
      } else { gameOver(); if (ismute == false) { playTune(gameover); } clearInterval(initv); }
  }, speed);
}

function restart() {
  if (gameRunning == false) {
  clearInterval(pauseInt);
  clearInterval(deadInt);
  deadInt = null;
  initv = null;
  pauseInt = null;
  maxH = 2
  maxL = (!isspeedselect && !isabout) ? 8 : 6;
              for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    clearTile(x, y);
    }
  }
  snake = [{ x: 5, y: 5 }];
  direction = { x: 0, y: 0 };
  foodP = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
  wallP = { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) };
  score = 0;
  gameRunning = true;
  wallAmt = 1;
  ispause = 1;
  ismenu = 1;
  cursorP = { x: 0, y: 4 };
  realpause = false;
  menulevel = 0;
  isspeedselect = false;
  isabout = false;
  ismodeselect = false;
  walls = [];
  foods = [];
  clearText();
  pause();
  }
}

function pause() {
  if (ispause == 1 && ismenu == 1 && realpause == false && gameRunning) {
    blinkOn = true;
    pauseInt = setInterval(() => {
      maxH = 2
      maxL = (!isspeedselect && !isabout) ? 8 : 6;

      if (cursorP.y + 2 * direction.y !== cursorP.y && ismute == false) { playTune(select); };
      clearTile(cursorP.x, cursorP.y);

      if (blinkOn) {
        cursorP = { x: cursorP.x, y: cursorP.y + 2 * direction.y };
        if (cursorP.y + 2 * direction.y < maxH) {
          cursorP.y = maxH;
        } else {
          if (cursorP.y + 2 * direction.y > maxL) {
            cursorP.y = maxL;
          } else {
            addSprite(cursorP.x, cursorP.y, cursor);
            direction = { x: 0, y: 0 };
          }
        }
      } else {
        clearTile(cursorP.x, cursorP.y);
        if (cursorP.y + 2 * direction.y < maxH) {
          cursorP.y = maxH;
        } else {
          if (cursorP.y + 2 * direction.y > maxL) {
            cursorP.y = maxL;
          } else {
            cursorP = { x: cursorP.x, y: cursorP.y + 2 * direction.y };
            direction = { x: 0, y: 0 };
          }
        }
      }
      blinkOn = !blinkOn;
      direction = { x: 0, y: 0 }

      function menuselect() {
        if (realpause !== true && gameRunning) {
          if (ismute == false) { playTune(selection); }

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
              if (ismodeselect == true) {

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
                  ismenu =  false;
                  clearTile(cursorP.x, cursorP.y)
                  pause();
                  init(speed);
                }
                if (cursorP.y == 8) {
                  ismute = !ismute;
                }
              }
            }
          }
          wait(200, () => {
            menulevel = 0
          });
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
          addText(`12/8/25 M/D/Y`, { x: 4, y: 5, color: menulevel === 1 ? color`1` : color`2` });
          addText(`by goober234`, { x: 4, y: 7, color: menulevel === 2 ? color`1` : color`2` });
          addText(`(discord)`, { x: 4, y: 8, color: menulevel === 2 ? color`1` : color`2` });
          addText(`Back`, { x: 4, y: 10, color: menulevel === 3 ? color`D` : color`4` });
        } else {
          if (ismodeselect == true) {

          } else {
            addText(`Snake: Wall`, { x: 4, y: 4, color: menulevel === 1 ? color`D` : color`4` });
            addText(`Speed Select`, { x: 4, y: 7, color: menulevel === 2 ? color`D` : color`4` });
            addText(`Start`, { x: 4, y: 10, color: menulevel === 3 ? color`D` : color`4` });
            addText(`Mute`, { x: 4, y: 13, color: ismute == true ? color`D` : color`4` });
          }
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
    if (ismute == false) { playTune(eat); }
    placeNewWall();
    placeNewFood();
    wallAmt++;
  }
};

function checkWall() {
  const head = snake[0];
  const W = 10;
  const H = 10;
  let nextX = head.x + direction.x;
  let nextY = head.y + direction.y;
  const wrapping =
    nextX < 0 || nextX >= W ||
    nextY < 0 || nextY >= H;

  let targetX = nextX;
  let targetY = nextY;
  if (wrapping) {
    targetX = (nextX + W) % W;
    targetY = (nextY + H) % H;
  }
  for (let w of walls) {
    if (w.x === targetX && w.y === targetY) {
      gameOver();
      return;
    }
  }
}

function placeNewFood() {
  foodP = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };

  for (let w of walls) {
    if (w.x === foodP.x && w.y === foodP.y) {
      return placeNewFood();
    }
  }

  foods.push({ x: foodP.x, y: foodP.y });
}

function placeNewWall() {
  wallP = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };

  walls.push({ x: wallP.x, y: wallP.y });
}

function render() {

  for (let w of walls) {
    clearTile(w.x, w.y);
    addSprite(w.x, w.y, wall);
  }

  clearTile(foodP.x, foodP.y);
  addSprite(foodP.x, foodP.y, food);


  for (let i = 0; i < snake.length; i++) {
    addSprite(snake[i].x, snake[i].y, snakeBody);
  }
  clearText();
  addText(`${score}`, { x: 3, y: 1, color: color`4` });
}

function gameOver() {
  pauseInt = null;
  gameRunning = false;
  clearText();
  addText("Game Over", { x: 6, y: 5, color: color`7` });
  addText(`Score: ${score}`, { x: 6, y: 6, color: color`4` });
  addText(`Walls: ${wallAmt}`, { x: 6, y: 7, color: color`9` });
 // addText(`Restart`, { x: 4, y: 10, color: menulevel === 3 ? color`1` : color`2` });
 // addText(`Main Menu`, { x: 4, y: 13, color: menulevel === 3 ? color`1` : color`2` });
 // cant figure out lol


if (1233123123 === false) {
    blinkOn = true;
    cursorP = { x: 0, y: 6 };
    maxH = 6;
    maxL = 8;
    deadInt = setInterval(() => {
      if (cursorP.y + 2 * direction.y !== cursorP.y && ismute == false) { playTune(select); };
      clearTile(cursorP.x, cursorP.y);
      if (blinkOn) {
        cursorP = { x: cursorP.x, y: cursorP.y + 2 * direction.y };
        if (cursorP.y + 2 * direction.y < maxH) {
          cursorP.y = maxH;
        } else {
          if (cursorP.y + 2 * direction.y > maxL) {
            cursorP.y = maxL;
          } else {
            addSprite(cursorP.x, cursorP.y, cursor);
            direction = { x: 0, y: 0 };
          }
        }
      } else {
        clearTile(cursorP.x, cursorP.y);
        if (cursorP.y + 2 * direction.y < maxH) {
          cursorP.y = maxH;
        } else {
          if (cursorP.y + 2 * direction.y > maxL) {
            cursorP.y = maxL;
          } else {
            cursorP = { x: cursorP.x, y: cursorP.y + 2 * direction.y };
            direction = { x: 0, y: 0 };
          }
        }
      }
      blinkOn = !blinkOn;
      direction = { x: 0, y: 0 }

      
      function endmenu() {
        if (gameRunning !== true) {
          if (ismute == false) { playTune(selection); }
            if (cursorP.y == 6) {
              restart();
              return;
              }
            if (cursorP.y == 8) {           
              }
            }
      }
      globalThis.endmenu = endmenu;
          }, 200);
        }
}
