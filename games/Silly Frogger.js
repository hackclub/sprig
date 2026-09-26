/*
@title: Frogger
@description: Cross the busy highway and dangerous river!
@author: Me
@tags: ['arcade', 'frogger']
*/

// --- 1. SPRITES & BITMAPS ---
const frog = "p";
const car = "c";
const truck = "t";
const road = "r";
const grass = "g";
const wall = "x";

setLegend(
  [ frog, bitmap`
................
.....555555.....
....50055005....
....50055005....
...5555555555...
...5.555555.5...
...5555555555...
....55555555....
...555....555...
..55........55..
..5..........5..
..55........55..
...555....555...
................
................
................`],
  [ car, bitmap`
................
................
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2220022222200222
2220022222200222
2222222222222222
2222222222222222
2220022222200222
2220022222200222
2222222222222222
2222222222222222
................
................`],
  [ truck, bitmap`
................
................
................
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
................
................
................
................`],
  [ road, bitmap`
1111111111111111
1111111111111111
1111111111111111
6611661166116611
6611661166116611
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
6611661166116611
6611661166116611
1111111111111111
1111111111111111
1111111111111111`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
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

let score = 0;
let lives = 3;
let gameOver = false;

const baseMap = map`
xggggggggx
xrrrrrrrrx
xrrrrrrrrx
xrrrrrrrrx
xggggggggx
xrrrrrrrrx
xrrrrrrrrx
xggggggggx`;

setMap(baseMap);
setSolids([wall]);

let obstacles = [
  { type: car, x: 2, y: 1, dir: 1 },
  { type: truck, x: 6, y: 1, dir: 1 },
  { type: truck, x: 1, y: 2, dir: -1 },
  { type: car, x: 5, y: 2, dir: -1 },
  { type: car, x: 3, y: 3, dir: 1 },
  { type: truck, x: 7, y: 3, dir: 1 },
  { type: car, x: 1, y: 5, dir: -1 },
  { type: car, x: 5, y: 5, dir: -1 },
  { type: truck, x: 2, y: 6, dir: 1 },
  { type: truck, x: 6, y: 6, dir: 1 }
];

function spawnPlayer() {
  const p = getFirst(frog);
  if (p) {
    p.x = 4;
    p.y = 7;
  } else {
    addSprite(4, 7, frog);
  }
}

spawnPlayer();

function drawScene() {
  clearText();
  addText(`pts:${score} v:${lives}`, { y: 0, color: color`0` });

  getAll(car).forEach(s => s.remove());
  getAll(truck).forEach(s => s.remove());

  obstacles.forEach(obs => {
    addSprite(obs.x, obs.y, obs.type);
  });
}

function resetGame() {
  score = 0;
  lives = 3;
  gameOver = false;
  spawnPlayer();
  drawScene();
}

function killPlayer() {
  lives -= 1;
  if (lives <= 0) {
    gameOver = true;
    addText("game over! (j) restart", { y: 4, color: color`2` });
  } else {
    spawnPlayer();
  }
}

setInterval(() => {
  if (gameOver) return;

  const p = getFirst(frog);
  if (!p) return;

  obstacles.forEach(obs => {
    obs.x += obs.dir;

    if (obs.dir === 1 && obs.x > 8) obs.x = 1;
    if (obs.dir === -1 && obs.x < 1) obs.x = 8;
  });

  const hitCar = obstacles.some(obs => (obs.type === car || obs.type === truck) && obs.x === p.x && obs.y === p.y);
  if (hitCar) {
    killPlayer();
  }

  drawScene();
}, 450);

onInput("w", () => {
  if (gameOver) return;
  const p = getFirst(frog);
  if (p && p.y > 0) p.y -= 1;

  if (p && p.y === 0) {
    score += 100;
    spawnPlayer();
  }
  checkImmediateCollision();
});

onInput("s", () => {
  if (gameOver) return;
  const p = getFirst(frog);
  if (p && p.y < 7) p.y += 1;
  checkImmediateCollision();
});

onInput("a", () => {
  if (gameOver) return;
  const p = getFirst(frog);
  if (p && p.x > 1) p.x -= 1;
  checkImmediateCollision();
});

onInput("d", () => {
  if (gameOver) return;
  const p = getFirst(frog);
  if (p && p.x < 8) p.x += 1;
  checkImmediateCollision();
});

onInput("j", () => {
  resetGame();
});

function checkImmediateCollision() {
  const p = getFirst(frog);
  if (!p) return;

  const hitCar = obstacles.some(obs => (obs.type === car || obs.type === truck) && obs.x === p.x && obs.y === p.y);
  if (hitCar) {
    killPlayer();
  }
  drawScene();
}