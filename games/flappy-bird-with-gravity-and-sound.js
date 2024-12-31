/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: flappy-bird-with-gravity-and-sound
@author: Yug Khandelwal
@addedOn: 2024-12-24
*/

const player = "p";
const obstacle = "o";
const background = "b";
const gameOverMelody = tune`
37.5: E4-37.5 + F4-37.5,
37.5: G4-37.5 + A4-37.5,
37.5: B4-37.5 + C5-37.5,
37.5: D5-37.5,
37.5: D5-37.5,
37.5: D5-37.5 + C5-37.5 + B4-37.5 + A4-37.5,
37.5: G4-37.5,
37.5: G4-37.5 + A4-37.5,
37.5: B4-37.5 + C5-37.5 + D5-37.5,
37.5: E5-37.5 + F5-37.5,
37.5: F5-37.5,
37.5: F5-37.5 + E5-37.5,
37.5: E5-37.5 + D5-37.5 + C5-37.5,
37.5: C5-37.5 + B4-37.5 + A4-37.5,
37.5: G4-37.5 + F4-37.5,
37.5: F4-37.5 + E4-37.5,
37.5: E4-37.5,
37.5: E4-37.5 + F4-37.5,
37.5: F4-37.5 + G4-37.5,
37.5: G4-37.5 + A4-37.5 + B4-37.5 + C5-37.5,
37.5: C5-37.5,
37.5: B4-37.5 + A4-37.5 + G4-37.5 + F4-37.5 + E4-37.5,
37.5: E4-37.5,
37.5: F4-37.5,
37.5: F4-37.5,
37.5: F4-37.5 + G4-37.5 + A4-37.5,
37.5: A4-37.5 + B4-37.5 + C5-37.5,
37.5: C5-37.5 + D5-37.5,
37.5: D5-37.5 + E5-37.5 + F5-37.5 + G5-37.5,
37.5: G5-37.5 + A5-37.5,
37.5: G5-37.5 + F5-37.5 + E5-37.5 + D5-37.5,
37.5: C5-37.5 + B4-37.5`;
const keyTune = tune`
500: G4-500,
15500`;
setLegend(
  [player, bitmap`
................
................
................
.....00000......
...00666600.....
000206666060....
0222206660250...
0666606660250...
.0660666600000..
..0006660999990.
....0666099990..
.....006600000..
.......000......
................
................
................`],
  [obstacle, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
);
let level = 0;
const levels = [
  map`
.......o..
.......o..
.......o..
.......o..
p.........
.......o..
.......o..
.......o..`
]

setMap(levels[level]);
setBackground(background);
setPushables({
  [player]: []
});
var isGameOver = false;
var speed = 250;
var gap = 4;
var count = 0;
var score = 0;
onInput("s", () => {
  if (!isGameOver) {
    playTune(keyTune);
    getFirst(player).y += 1;
  }
});

onInput("w", () => {
  if (!isGameOver) {
    playTune(keyTune);
    getFirst(player).y -= 1;
  }
});

function generateObstacle() {
  gap = Math.floor(Math.random() * 8);
  for (let y = 0; y < 8; y++) {
    if (y != gap) {
      addSprite(7, y, obstacle);
    }
  }
  score++;
}

function gameLoop() {
  addText(`Score: ${score}`, { x: 10, y: 1, color: color`2` })
  if (count % 4 == 0) {
    getAll(player).forEach((p) => {
      if (p.y == 8) {} else {
        p.y += 1;
      };
    });
  }
  getAll(obstacle).forEach((o) => {
    if (o.x == 0) {
      o.remove();
    } else {
      o.x -= 1;
    };
  });
  if (getAll(obstacle).length == 0) {
    generateObstacle();
  }
  if (getFirst(obstacle).x == getFirst(player).x && getFirst(player).y != gap) {
    gameOver();
  }
  count += 1;
  speed -= (250 - speed);
  if (!isGameOver) {
    setTimeout(gameLoop, speed);
  }
}

function gameOver() {
  clearText();
  isGameOver = true;
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
  playTune(gameOverMelody);
  addText("Game over!", { x: 5, y: 7, color: color`2` });
  addText(`Score: ${score}`, { x: 5, y: 8, color: color`2` });
}
gameLoop();
