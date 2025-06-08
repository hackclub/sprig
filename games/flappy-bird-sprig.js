/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Flappy Bird with Animated Bird, Gravity and Sound
@tags: []
@author: Yug Khandelwal
@addedOn: 2025-01-22
@description: A Flappy Bird clone with animated bird sprites, gravity mechanics, and sound effects. Use 'W' to make the bird fly up and 'S' to make it fall faster. Navigate through the obstacles to score points. The game gets progressively faster as you play.
*/

const flapUp = "u";
const flapDown = "d"
const obstacle = "o";
const background = "b";
const keyTune = tune`
500: G4-500,
15500`;

const bird = () => getFirst("u") || getFirst("d");

setLegend(
  [flapUp, bitmap`
................
................
00..............
220..00000......
62200666600.....
062206666060....
0662206660250...
.066606660250...
..060666600000..
...006660999990.
....0666099990..
.....006600000..
.......000......
................
................
................`],
  [flapDown, bitmap`
................
................
................
....00000.......
..00666600......
.0206666060.....
022206660250....
026606660250....
2260666600000...
26606660999990..
6000666099990...
60..006600000...
0.....000.......
................
................
................`],
  [obstacle, bitmap`
LLLLLLLLLLLLLLLL
L333L333333L333L
L333L333333L333L
L333L333333L333L
LLLLLLLLLLLLLLLL
L3333333L333333L
L3333333L333333L
L3333333L333333L
LLLLLLLLLLLLLLLL
L333L333333L333L
L333L333333L333L
L333L333333L333L
LLLLLLLLLLLLLLLL
L3333333L333333L
L3333333L333333L
L3333333L333333L`],
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
u.........
.......o..
.......o..
.......o..`
]

setMap(levels[level]);
setBackground(background);
setPushables({
  [flapUp]: [],
  [flapDown]: [],
});
var isGameOver = false;
var speed = 250;
var gap = 4;
var count = 0;
var score = 0;
onInput("s", () => {
  const bird = () => getFirst("u") || getFirst("d");
  if (!isGameOver) {
    playTune(keyTune);
    bird().y += 1;
  }
});
onInput("w", () => {
  const bird = () => getFirst("u") || getFirst("d");
  if (!isGameOver) {
    playTune(keyTune);
    bird().y -= 1;
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
    if (bird().y == 8) {} else {
      bird().y += 1;
    };
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
  bird().type = [flapUp, flapDown][count % 2];
  if (getFirst(obstacle).x == bird().x && bird().y != gap) {
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
