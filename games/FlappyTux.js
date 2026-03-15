/*
@title: Flappy Tux (Flappy bird with the linux mascot)
@author: Darshan Saravanan
@Inspiration: Yug Khandelwal
@description: A Flappy Bird clone with the Linux Mascot TUX. Use 'W' to make the bird fly up and 'S' to make it fall faster. The game gets progressively faster as you play.
*/

const flapitUp = "u";
const flapitDown = "d"
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

const bird = () => getFirst("u") || getFirst("d");

setLegend(
  [flapitUp, bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LL20LL20LL0..
..0LL00LL00LL0..
..0LLL6666LLL0..
.06LLLL66LLLL60.
.06LLL2222LLL60.
.0L0L222222L0L0.
..002222222200..
...0222222220...
...0660000660...
....00....00....
................
................`],
  [flapitDown, bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LL02LL02LL0..
..0LL00LL00LL0..
..0LLL6666LLL0..
.0LLLLL66LLLLL0.
.06LLL2222LLL60.
.060L222222L060.
..002222222200..
...0222222220...
...0660000660...
....00....00....
................
................`],
  [obstacle, bitmap`
LLLLLLLLLLLLLLLL
L222L222222L222L
L222L222222L222L
L222L222222L222L
LLLLLLLLLLLLLLLL
L2222222L222222L
L2222222L222222L
L2222222L222222L
LLLLLLLLLLLLLLLL
L222L222222L222L
L222L222222L222L
L222L222222L222L
LLLLLLLLLLLLLLLL
L2222222L222222L
L2222222L222222L
L2222222L222222L`],
  [background, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`]
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
  [flapitUp]: [],
  [flapitDown]: [],
});
var isDaGameOver = false;
var speed = 250;
var gap = 4;
var count = 0;
var score = 0;
onInput("s", () => {
  const bird = () => getFirst("u") || getFirst("d");
  if (!isDaGameOver) {
    playTune(keyTune);
    bird().y += 1;
  }
});
onInput("w", () => {
  const bird = () => getFirst("u") || getFirst("d");
  if (!isDaGameOver) {
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
  bird().type = [flapitUp, flapitDown][count % 2];
  if (getFirst(obstacle).x == bird().x && bird().y != gap) {
    gameOver();
  }
  count += 1;

 
  speed -= (250 - speed);
  if (!isDaGameOver) {
    setTimeout(gameLoop, speed);
  }
}

function gameOver() {
  clearText();
  isDaGameOver = true;
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
  addText("Game over bud!", { x: 5, y: 7, color: color`2` });
  addText(`Your Score: ${score}`, { x: 5, y: 8, color: color`2` });
}
gameLoop();
