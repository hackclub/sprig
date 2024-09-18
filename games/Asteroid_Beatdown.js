/*
@title: Asteroid Beatdown
@author: aidanq06
@tags: []
@addedOn: 2024-09-15
*/

const spaceship = "s";
const asteroid = "a";
const bullet = "b";
const empty = ".";
const background = "n";
const life = "l";

setLegend(
  [ background, bitmap`
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000
00000000000000000`],
  [ spaceship, bitmap`
......0000......
.....002200.....
.....022220.....
....00222200....
....02211220....
...0022112200...
...0221111220...
..002211112200..
.00221177112200.
.02221177112220.
.02221177112220.
.00222111122200.
..002222222200..
...0022222200...
....00222200....
.....000000.....`],
  [ asteroid, bitmap`
....11111111....
...1111L11L11...
..1111LLL11111..
.1111LLLL11L111.
1111LLLLLL1LL111
1111LLLLLL111111
1L111LLLL1111LL1
111111LL11111LL1
11111111111L1111
11LL111111111111
11LLL1111L111111
111L1111LLLL1111
.1111111LLLL111.
..1L111111LL11..
...111L111111...
....11111111....`],
  [ bullet, bitmap`
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......
......7777......`],
  [ life, bitmap`
................
................
...333....333...
..33333..33333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................`]
);

setBackground(background);

let gameState = "menu";
let level = 1;
let score = 0;
let lives = 3;
let gameOver = false;

let ticks = 0;

let playerX = 4;
const playerY = 8;

let asteroids = [];
let bullets = [];

let maxBullets = 1;
let bulletSpeed = 1;
let asteroidSpeed = 0.1; // smaller increments

let asteroidsDestroyed = 0;
const asteroidsForUpgrade = 5; // Set the amount of asteroids for each level upgrade

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

onInput("l", () => {
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
    return; // Don't update game if in menu or tutorial mode
  }

  ticks++;

  let mapArray = currentMap.trim().split('\n').map(row => row.split(''));

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      mapArray[y][x] = empty;
    }
  }

  bullets = bullets.filter(bullet => {
    bullet.y -= bulletSpeed;
    if (bullet.y >= 0) {
      mapArray[Math.floor(bullet.y)][bullet.x] = "b";
      return true;
    }
    return false;
  });

  asteroids = asteroids.filter(asteroid => {
    asteroid.y += asteroidSpeed;
    if (asteroid.y < 9) {
      mapArray[Math.floor(asteroid.y)][asteroid.x] = "a";
      return true;
    } else {
      lives--;
      playTune(tune`
96.46302250803859: C4~96.46302250803859,
2990.3536977491963`);
      if (lives <= 0) {
        gameOver = true;
      }
      return false;
    }
  });

  checkCollisions();

  spawnAsteroids();

  mapArray[playerY][playerX] = spaceship;

  // Display lives in the top left
  for (let i = 0; i < lives; i++) {
    mapArray[0][i+7] = life;
  }

  // Display bullets in the top right
  for (let i = 0; i < bullets.length; i++) {
    mapArray[1][9 - i] = bullet;
  }

  currentMap = mapArray.map(row => row.join('')).join('\n');

  setMap(currentMap);

  clearText();
  addText(`Score: ${score}`, { y: 15, color: color`7` });
  addText(`Level: ${level}`, { y: 1, x: 1, color: color`7` });
  addText(`Asteroids: ${totalAsteroids}`, { y: 17, color: color`7` });

  if (gameOver) {
    addText("Game Over!", { y: 7, color: color`7` });
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
      if (Math.floor(bullets[i].y) === Math.floor(asteroids[j].y) && 
          bullets[i].x === asteroids[j].x) {
        bullets.splice(i, 1);
        asteroids.splice(j, 1);
        playTune(tune`H`);
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
96.46302250803859: C4~96.46302250803859,
2990.3536977491963`);
      if (lives <= 0) {
        gameOver = true;
        playTune(tune`
61.09979633401222: D5-61.09979633401222,
61.09979633401222: G4-61.09979633401222,
61.09979633401222: D4-61.09979633401222,
61.09979633401222: C4-61.09979633401222,
1710.794297352342`);
      }
      return;
    }
  }
}

function upgradeShip() {
  level++;
  totalAsteroids += 10;
  playTune(tune`
61.09979633401222: D4~61.09979633401222,
61.09979633401222: G4~61.09979633401222,
61.09979633401222: D5~61.09979633401222`);
  clearText();
  addText("New ability!", { y: 1, color: color`3` });
  abilityTextTimeout = setTimeout(() => {
    clearText();
  }, 3000);

  asteroidSpeed += 0.05;
  if (maxBullets <= 3){
    maxBullets += 1;
  }
}

function resetGame() {
  gameState = "playing";
  currentMap = createMap();
  setMap(currentMap);
  score = 0;
  lives = 3;
  gameOver = false;
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
  addText("Asteroid Beatdown", { y: 4, color: color`7` });
  addText("press 'j' to play", { y: 6, color: color`H` });
  addText("press 'l'", { y: 8, color: color`4` });
  addText("for tutorial", { y: 9, color: color`4` });
}

let tutorialPage = 0;

function drawTutorial() {
  clearText();

  const tutorialPages = [
    ["'a' to move left", 
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
    addText(line, { y: index + 2, color: color`7` });
  });
}

drawMenu();

setInterval(updateGame, 100);
