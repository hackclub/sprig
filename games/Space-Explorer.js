const player = "p";
const asteroid = "a";
const bullet = "b";
const background = "g";

setLegend(
  [ player, bitmap`
.......2........
......222.......
.....22222......
....2222222.....
...222222222....
..22222222222...
.2222222222222..
2222222222222222
.2222222222222..
..22222222222...
...222222222....
....2222222.....
.....22222......
......222.......
.......2........
................` ],

  [ asteroid, bitmap`
................
................
......33333.....
.....3333333....
....333333333...
...33333333333..
..3333333333333.
.333333333333333
.333333333333333
.333333333333333
..3333333333333.
...33333333333..
....333333333...
.....3333333....
......33333.....
................` ],

  [ bullet, bitmap`
................
................
................
.......9........
......999.......
.......9........
................
................
................
................
................
................
................
................
................
................` ],

  [ background, bitmap`
000LLLLLLLL00000
000LLLLLLL000000
L0000LLLLL000000
L0000LLLLLL00000
L00000LLLLLL0000
LLL000LLLLLL0000
LLL00000LLLL0000
0LLL0000L0LL0000
000LLLL000LLL000
000LLLL000LLLL00
000LLLLL000LLLLL
LL0000LLL000LLLL
LL00000LLL00LLLL
LLL0000LLL00LLLL
LLLL0000LLL000LL
LLLL00000L000000` ]
);

setBackground(background);

let gameOver = false;
let paused = false;
let shipX = 8;
let shipY = 12;
let bullets = [];
let asteroids = [];
let asteroidSpeed = 0.5;
let score = 0;

function safeAddSprite(x, y, spriteKey) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  if (ix < 0 || ix > 15 || iy < 0 || iy > 15) return;
  addSprite(ix, iy, spriteKey);
}

function initGame() {
  clearText();
  
  const emptyMap = map`
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg`;
  setMap(emptyMap);
  gameOver = false;
  paused = false;
  score = 0;
  bullets = [];
  asteroids = [];
  asteroidSpeed = 0.5;
  shipX = 8;
  shipY = 12;
  
  for (let i = 0; i < 3; i++) {
    spawnAsteroid();
  }
}

function spawnAsteroid() {
  let x = Math.floor(Math.random() * 14) + 1;
  asteroids.push({ x: x, y: -1, speed: asteroidSpeed });
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 1;
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
}

function updateAsteroids() {
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].y += asteroids[i].speed;
    if (asteroids[i].y > 16) {
      asteroids.splice(i, 1);
      spawnAsteroid();
    }
  }
}


function checkCollisions() {

  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    for (let j = asteroids.length - 1; j >= 0; j--) {
      const a = asteroids[j];
      if (Math.abs(b.x - a.x) < 2 && Math.abs(b.y - a.y) < 2) {
        bullets.splice(i, 1);
        asteroids.splice(j, 1);
        score++;
        spawnAsteroid();
        break;
      }
    }
  }
  for (const a of asteroids) {
    if (Math.abs(shipX - a.x) < 2 && Math.abs(shipY - a.y) < 2) {
      endGame();
      return;
    }
  }
}

function drawGame() {
  const emptyMap = map`
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg`;
  setMap(emptyMap);
  
  safeAddSprite(shipX, shipY, player);
  
  for (const b of bullets) {
    safeAddSprite(b.x, b.y, bullet);
  }
  for (const a of asteroids) {
    safeAddSprite(a.x, a.y, asteroid);
  }
  
  if (paused) {
    addText("Paused", { x: 4, y: 7, color: color`2` });
  }
}


function endGame() {
  gameOver = true;
  clearText();
  addText("Game Over!", { x: 4, y: 7, color: color`3` });
  addText("Final Score: " + score, { x: 2, y: 9, color: color`4` });
}

onInput("a", () => {
  if (!gameOver && !paused) {
    shipX = Math.max(0, shipX - 1);
  }
});
onInput("d", () => {
  if (!gameOver && !paused) {
    shipX = Math.min(15, shipX + 1);
  }
});
onInput("w", () => {
  if (!gameOver && !paused) {
    bullets.push({ x: shipX, y: shipY - 1 });
  }
});
onInput("j", () => {
  if (!gameOver) {
    initGame();
  }
});
onInput("i", () => {
  if (!gameOver) {
    paused = !paused;
    if (!paused) {
      clearText();
    }
  }
});

function gameLoop() {
  if (gameOver) return;
  if (!paused) {
    updateBullets();
    updateAsteroids();
    checkCollisions();
  }
  drawGame();
}

initGame();
setInterval(gameLoop, 100);