const FLAP_UP = "U";
const FLAP_DOWN = "D";
const OBSTACLE = "X";
const BACKGROUND = "B";

let isGameOver = false;
let score = 0;
let speed = 250;
let gap = 4;
let count = 0;

const GAME_OVER_MELODY = tune`
100: C4-100 + E4-100,
100: G4-100 + B4-100,
100: C5-100 + D5-100,
100: E5-100 + F5-100,
100: G5-100,
100: F5-100,
100: E5-100,
100: D5-100,
100: C5-100,
100: B4-100,
100: A4-100,
100: G4-100,
100: F4-100,
100: E4-100,
100: D4-100,
100: C4-100`;

const KEY_TUNE = tune`300: C5~300, 300: D5~300, 12000`;

setLegend(
  [FLAP_UP, bitmap`
................
....888888......
..8888888888....
.888877788888...
88877777777888..
88777777777788..
88777777777778..
88877777777788..
.888877777888...
..8888888888....
....888888......
................
................
................
................
................`],
  [FLAP_DOWN, bitmap`
................
....888888......
..8888888888....
.888877788888...
88877777777888..
88777777777788..
88777777777778..
88877777777788..
.888877777888...
..8888888888....
....888888......
................
................
................
................
................`],
  [OBSTACLE, bitmap`
LLLLLLLLLLLLLLLL
L555L555555L555L
L555L555555L555L
L555L555555L555L
LLLLLLLLLLLLLLLL
L5555555L555555L
L5555555L555555L
L5555555L555555L
LLLLLLLLLLLLLLLL
L555L555555L555L
L555L555555L555L
L555L555555L555L
LLLLLLLLLLLLLLLL
L5555555L555555L
L5555555L555555L
L5555555L555555L`],
  [BACKGROUND, bitmap`
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
.......X..
.......X..
.......X..
.......X..
U.........
.......X..
.......X..
.......X..`
];
setMap(levels[level]);
setBackground(BACKGROUND);

function getBird() {
  return getFirst(FLAP_UP) || getFirst(FLAP_DOWN);
}

onInput("w", () => {
  if (!isGameOver) {
    playTune(KEY_TUNE);
    getBird().y -= 1;
  }
});

onInput("s", () => {
  if (!isGameOver) {
    playTune(KEY_TUNE);
    getBird().y += 1;
  }
});

function generateObstacle() {
  gap = Math.floor(Math.random() * 8);
  for (let y = 0; y < 8; y++) {
    if (y !== gap) {
      addSprite(7, y, OBSTACLE);
    }
  }
  score++;
}

function gameLoop() {
  addText(`Score: ${score}`, { x: 10, y: 1, color: color`5` });

  if (count % 4 === 0) {
    const bird = getBird();
    if (bird.y < 8) bird.y += 1;
  }

  getAll(OBSTACLE).forEach((obstacle) => {
    if (obstacle.x === 0) {
      obstacle.remove();
    } else {
      obstacle.x -= 1;
    }
  });

  if (getAll(OBSTACLE).length === 0) {
    generateObstacle();
  }

  getBird().type = [FLAP_UP, FLAP_DOWN][count % 2];

  if (getAll(OBSTACLE).some((obstacle) => obstacle.x === getBird().x && obstacle.y === getBird().y)) {
    gameOver();
  }

  count++;
  speed = Math.max(50, speed - 1);

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
  playTune(GAME_OVER_MELODY);
  addText("Woah!", { x: 5, y: 7, color: color`5` });
  addText(`Score: ${score}`, { x: 5, y: 8, color: color`5` });
}

gameLoop();