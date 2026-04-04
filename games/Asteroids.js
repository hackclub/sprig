const spaceship = "s";
const asteroid = "a";
const bullet = "b";
const empty = ".";
const background = "n";
const life = "l";
setLegend(
  [
    background,
    bitmap`
0000000000000000
0110000000000000
0110000000000000
0000000000000100
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000011000000000
0000011000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000100
0000000000000000`,
  ],
  [
    spaceship,
    bitmap`
.......L........
......L1L.......
......L1L.......
.....L171L......
.....L777L......
.....L777L......
.....L111L......
....L11111L.....
...L111L111L....
..LL111L111LL...
.LL1166L6611LL..
LLLH396L693HLLL.
....H39693H.....
.....H393H......
......H3H.......
.......H........`,
  ],
  [
    asteroid,
    bitmap`
...3399333......
...3996993......
..33966693......
.33996669333....
.399666699933...
.3966666669933..
.3966600066993..
.966600L00069...
9660000LLL0699..
9600LLL0110069..
960L000L1LL009..
960101LL00LL06..
960L11LL011L06..
.660LLLLL1L006..
..660000000066..
...6666666666...`,
  ],
  [
    bullet,
    bitmap`
................
................
................
................
................
................
................
.......H8.......
.......H8.......
.......H8.......
.......H8.......
.......H8.......
.......H8.......
.......H8.......
................
................`,
  ],
  [
    life,
    bitmap`
................
................
................
....33....33....
...3333..3333...
...3333333333...
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................
................`,
  ],
);
setBackground(background);
let gameState = "menu";
let level = 1;
let score = 0;
let lives = 3;
let gameOver = !1;
let ticks = 0;
let playerX = 4;
const playerY = 8;
let asteroids = [];
let bullets = [];
let maxBullets = 1;
let bulletSpeed = 1;
let asteroidSpeed = 0.1;
let asteroidsDestroyed = 0;
const asteroidsForUpgrade = 5;
let totalAsteroids = 5;
let asteroidSpawnRate = 1;
let abilityTextTimeout;
const createMap = () => {
  return map`
..........
..........
..........
..........
..........
..........
..........
..........
....s.....
..........`;
};
let currentMap = createMap();
setMap(currentMap);
onInput("j", () => {
  if (gameState === "menu") {
    gameState = "playing";
    resetGame();
  } else if (gameOver) {
    resetGame();
  }
});
onInput("a", () => {
  if (playerX > 0 && gameState === "playing" && !gameOver) {
    playerX--;
    updateGame();
  }
});
onInput("d", () => {
  if (playerX < 9 && gameState === "playing" && !gameOver) {
    playerX++;
    updateGame();
  }
});
onInput("k", () => {
  if (bullets.length < maxBullets) {
    bullets.push({ x: playerX, y: playerY - 1 });
  }
});
onInput("j", () => {
  if (gameState === "menu") {
    gameState = "tutorial";
    drawTutorial();
  } else if (gameState === "tutorial") {
    gameState = "menu";
    drawMenu();
  }
});
function updateGame() {
  if (gameState === "menu" || gameState === "tutorial") {
    return;
  }
  ticks++;
  let mapArray = currentMap
    .trim()
    .split("\n")
    .map((row) => row.split(""));
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      mapArray[y][x] = empty;
    }
  }
  bullets = bullets.filter((bullet) => {
    bullet.y -= bulletSpeed;
    if (bullet.y >= 0) {
      mapArray[Math.floor(bullet.y)][bullet.x] = "b";
      return !0;
    }
    return !1;
  });
  asteroids = asteroids.filter((asteroid) => {
    asteroid.y += asteroidSpeed;
    if (asteroid.y < 9) {
      mapArray[Math.floor(asteroid.y)][asteroid.x] = "a";
      return !0;
    } else {
      lives--;
      playTune(tune`
96.46302250803859: C4~96.46302250803859,
2990.3536977491963`);
      if (lives <= 0) {
        gameOver = !0;
      }
      return !1;
    }
  });
  checkCollisions();
  spawnAsteroids();
  mapArray[playerY][playerX] = spaceship;
  for (let i = 0; i < lives; i++) {
    mapArray[0][i + 7] = life;
  }
  for (let i = 0; i < bullets.length; i++) {
    mapArray[1][9 - i] = bullet;
  }
  currentMap = mapArray.map((row) => row.join("")).join("\n");
  setMap(currentMap);
  clearText();
  addText(`Score: ${score}`, { y: 15, color: color`H` });
  addText(`Level: ${level}`, { y: 1, x: 1, color: color`H` });
  addText(`Asteroids: ${totalAsteroids}`, { y: 17, color: color`H` });
  if (gameOver) {
    addText("Game Over!", { y: 7, color: color`H` });
    addText("press 'j' to restart", { y: 9, color: color`H` });
  }
}
function spawnAsteroids() {
  if (ticks % 60 === 0 && asteroidsDestroyed < totalAsteroids) {
    let newX = Math.floor(Math.random() * 10);
    asteroids.push({ x: newX, y: 0 });
  }
}
function checkCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (
        Math.floor(bullets[i].y) === Math.floor(asteroids[j].y) &&
        bullets[i].x === asteroids[j].x
      ) {
        bullets.splice(i, 1);
        asteroids.splice(j, 1);
        playTune(tune`
500: C4/500 + D4^500,
15500`);
        score += 10;
        asteroidsDestroyed++;
        if (asteroidsDestroyed % asteroidsForUpgrade === 0) {
          upgradeShip();
        }
        return;
      }
    }
  }
  for (let i = asteroids.length - 1; i >= 0; i--) {
    if (Math.floor(asteroids[i].y) === playerY && asteroids[i].x === playerX) {
      asteroids.splice(i, 1);
      lives--;
      playTune(tune`
379.746835443038: E4^379.746835443038,
379.746835443038: F4^379.746835443038,
379.746835443038: E4^379.746835443038,
379.746835443038: F4^379.746835443038,
379.746835443038: E4^379.746835443038,
379.746835443038: F4^379.746835443038,
9873.417721518988`);
      if (lives <= 0) {
        gameOver = !0;
        playTune(tune`
500: E4~500,
500: E4~500,
500: D4~500,
500: D4~500,
500: C4~500,
500: C4~500,
13000`);
      }
      return;
    }
  }
}
function upgradeShip() {
  level++;
  totalAsteroids += 10;
  playTune(tune`
405.4054054054054: C4-405.4054054054054,
405.4054054054054: F4-405.4054054054054,
405.4054054054054: B4-405.4054054054054,
405.4054054054054: E5-405.4054054054054,
405.4054054054054: A5-405.4054054054054,
10945.945945945947`);
  clearText();
  addText("New ability!", { y: 1, color: color`H` });
  abilityTextTimeout = setTimeout(() => {
    clearText();
  }, 3000);
  asteroidSpeed += 0.05;
  if (maxBullets <= 3) {
    maxBullets += 1;
  }
}
function resetGame() {
  gameState = "playing";
  currentMap = createMap();
  setMap(currentMap);
  score = 0;
  lives = 3;
  gameOver = !1;
  playerX = 4;
  asteroids = [];
  bullets = [];
  level = 1;
  totalAsteroids = 50;
  asteroidsDestroyed = 0;
  bulletSpeed = 1;
  asteroidSpeed = 0.1;
  maxBullets = 1;
}
function drawMenu() {
  clearText();
  addText("Asteroids", { y: 4, color: color`H` });
  addText("press 'l' to play", { y: 6, color: color`H` });
}
let tutorialPage = 0;
function drawTutorial() {
  clearText();
  const tutorialPages = [
    [
      "'a' to move left",
      "'d'to move right",
      "'k' to shoot",
      " ",
      "Destroy asteroids",
      "to level up",
      " ",
      "Don't let asteroids",
      "reach the end!",
      " ",
      "'l' for main menu",
    ],
  ];
  tutorialPages[tutorialPage].forEach((line, index) => {
    addText(line, { y: index + 2, color: color`H` });
  });
}
drawMenu();
setInterval(updateGame, 100);
