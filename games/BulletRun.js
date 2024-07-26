// Define the sprites in our game
const player = "p";
const bullet = "b";
const goal = "g";
const wall = "w";
const powerUp = "u";
const obstacle = "o";

let bulletSpeed = 250;
let bulletInterval;
let timer = 0;
let isInvincible = true;
let speedBoost = false;
let speedBoostTimer;
let inRandomMode = false;
let gameOver = false;

// Assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
....333333......
...33.3..33.....
..33......3.....
.3....3.3.3.....
.33.......3.....
..333333333.....
....3.3333......
....3...3.......
....3...3.......
....3...3.......
....3...3.......
....3...3.......
....3...3.......
....3...3.......`],
  [bullet, bitmap`
................
................
................
................
................
..00000.........
..00000000......
..000000000000..
..00000000000...
..00000000000...
..000000000.....
..00000.........
..00............
................
................
................`],
  [goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [wall, bitmap`
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
0000000000000000`],
  [powerUp, bitmap`
................
................
......6.........
.....666........
....66666.......
....66666.......
...6666666......
...6666666......
..666666666.....
..666666666.....
.66666666666....
.66666666666....
666666666666....
666666666666....
6666666666666...
6666666666666...`],
  [obstacle, bitmap`
................
................
......8.........
.....888........
....88888.......
....88888.......
...8888888......
...8888888......
..888888888.....
..888888888.....
.88888888888....
.88888888888....
888888888888....
888888888888....
8888888888888...
8888888888888...`]
);

// Create game levels
let level = 0; // This tracks the level we are on
const levels = [
  map`
p.b.
.w..
...g`,
  map`
p..b.
..w..
.b..g`,
  map`
p.wg
.b..
..w.
..wb`,
  map`
pb.w
...w
...w
..bg`,
  map`
pb.b.b
......
.w.w.w
.b.b..
....bg`,
  map`
b.b.b.b.b.b.b.
..............
..............
..............
..............
w.............
p............g
w.............
..............
..............
..............
..............
..............
bb.b.b.b.b.b..`,
  map`
.wbb.w.
.b...bb
w..w..w
.......
pw...wg
...b...
w..w..w
.b...b.
.w.bbwb`,
  map`
pb
w.
w.
w.
w.
..
w.
w.
w.
w.
g.`,
  map`
..gbbw.b................
..bbbwgw.........wwwwww.
.....w.w...wwwwww....b..
..bbbwwwwww...b.....b...
wwwwwww..bw..b.....b....
w.w.bw..b...b.....b.w...
pb.b...b...b..w..b..w..g`,
  // Last challenge level
  map`
p..w...........................
.www...b........b.w..b.b.......
..ww...b..bb...b.....w..w.bb...
..w.....w...w.......b.bb.......
..www.wwwww...ww.w.....b.......
..w.b.bw.....ww.w..wb........w.
...wbb.ww....w...w...w.........
...w...w......w......w.ww...bb.
........w........w.....w....w..
....b..ww......ww.w..........b.
.............b.w..www.ww.......
.........w.....bw....w....b....
...b............b..............
ww.wb.w.w.ww.......w.w.....b.w.
...b..w......b......w........b.
......w.ww.....w.w..........w..
..b....w.w.....................
..........w..b...w.............
ww....................w...w..b.
..w..............wwww.ww.......
w.b....b...bbwb........w...b...
......ww.........b.............
....w....w.wb......w...........
...b..........ww..w...b......b.
.w.......ww...wbw...bb..ww..wwg`
];

// Set the map displayed to the current level
setMap(levels[level]);

setSolids([player, wall, obstacle]); // Players, walls, and obstacles are the only things that can't run into each other

// Inputs for player movement control
onInput("s", () => {
  if (gameOver) return;
  getFirst(player).y += 1; // Positive y is downwards
});

onInput("d", () => {
  if (gameOver) return;
  getFirst(player).x += 1;
});
onInput("w", () => {
  if (gameOver) return;
  getFirst(player).y -= 1;
});
onInput("a", () => {
  if (gameOver) return;
  getFirst(player).x -= 1;
});

// Bullet movement logic
let bulletDirections = {};

function initializeBulletDirections() {
  const bullets = getAll(bullet);
  bulletDirections = {}; // Reset directions
  for (let b of bullets) {
    bulletDirections[`${b.x},${b.y}`] = 1; // 1 for down, -1 for up
  }
}

function moveBullets() {
  const bullets = getAll(bullet);
  for (let b of bullets) {
    const key = `${b.x},${b.y}`;
    const direction = bulletDirections[key];
    const newY = b.y + direction;

    if (newY < 0 || newY >= height() || getTile(b.x, newY).some(t => t.type === wall)) {
      bulletDirections[key] = -direction; // Switch direction
    } else {
      b.y = newY;
      bulletDirections[`${b.x},${b.y}`] = direction; // Update the new key with direction
    }
  }
}

function updateLevelCounter() {
  clearText();
  if (!inRandomMode) {
    addText(`Level ${level + 1} / ${levels.length}`, { y: 1, color: color`3` });
  }
  addText(`Time: ${timer} s`, { y: 2, color: color`3` });
}

function checkForDeath() {
  const playerBullets = tilesWith(player, bullet).length;
  if (playerBullets > 0 && !isInvincible) {
    clearText();
    addText(`Level ${level + 1} / ${levels.length}`, { y: 1, color: color`3` });
    addText("Game Over!", { y: 4, color: color`3` });
    if (inRandomMode) {
      setMap(generateRandomLevel());
    } else {
      setMap(levels[level]);
    }
    initializeBulletDirections();
    updateLevelCounter();
  }
}

function startBulletInterval() {
  clearInterval(bulletInterval);
  bulletInterval = setInterval(() => {
    moveBullets();
    checkForDeath();
  }, bulletSpeed);
}

// Power-Up Logic
function applyPowerUp() {
  const playerPowerUps = tilesWith(player, powerUp).length;
  if (playerPowerUps > 0) {
    const powerUpTile = getFirst(powerUp);
    clearTile(powerUpTile.x, powerUpTile.y);
    isInvincible = true;
    setTimeout(() => {
      isInvincible = false;
    }, 5000);
  }
}

function checkForObstacle() {
  const playerObstacles = tilesWith(player, obstacle).length;
  if (playerObstacles > 0) {
    const obstacleTile = getFirst(obstacle);
    clearTile(obstacleTile.x, obstacleTile.y);
  }
}

function startSpeedBoost() {
  speedBoost = true;
  clearTimeout(speedBoostTimer);
  speedBoostTimer = setTimeout(() => {
    speedBoost = false;
  }, 5000);
}

// Input to reset level
onInput("j", () => {
  if (gameOver) return;
  setMap(levels[level]);
  initializeBulletDirections();
  updateLevelCounter();
  clearText();
  startBulletInterval();
});

// Add timer for time trials
const timerInterval = setInterval(() => {
  if (!gameOver) {
    timer += 1;
    updateLevelCounter();
  }
}, 1000);

// Calculate ranking
function getRanking(time) {
  if (time <= 40) return "Top 1% - You are god!";
  if (time <= 45) return "Top 2% - try again";
  if (time <= 50) return "Top 3% - try again";
  if (time <= 55) return "Top 5% - try again";
  if (time <= 60) return "Top 10% - try again";
  if (time <= 65) return "Top 15% - try again";
  if (time <= 70) return "Top 20% - try again";
  if (time <= 80) return "Top 25% - try again";
  if (time <= 90) return "Top 50% - try again";
  if (time <= 106) return "Top 75% - try again";
  if (time <= 110) return "Top 80% - try again";
  if (time <= 160) return "Top 85% - try again";
  if (time <= 185) return "Top 90% - try again";
  if (time <= 210) return "Top 99% - try again";
  return "Top 100% - You suck!";
}

// Generate random levels
function generateRandomLevel() {
  const width = Math.floor(Math.random() * 10) + 10;
  const height = Math.floor(Math.random() * 10) + 10;
  
  let mapStr = Array(height).fill('.'.repeat(width)).map(row => row.split(''));

  // Place player and goal
  mapStr[0][0] = 'p';
  mapStr[height - 1][width - 1] = 'g';

  // Place walls and bullets ensuring not to block the player or the goal
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if ((x === 0 && y === 0) || (x === width - 1 && y === height - 1)) continue;
      const randNum = Math.random();
      if (randNum < 0.1) {
        mapStr[y][x] = 'b';
      } else if (randNum < 0.2) {
        mapStr[y][x] = 'w';
      }
    }
  }

  return map`${mapStr.map(row => row.join('')).join('\n')}`;
}

let retryListenerRegistered = false;
let randomLevelListenerRegistered = false;

function showEndScreen() {
  gameOver = true;
  clearInterval(bulletInterval);
  clearText(); // Clear all existing text before adding new text
  addText(`You win! Time: ${timer} s`, { y: 4, color: color`3` });
  const ranking = getRanking(timer);
  addText(ranking, { y: 6, color: color`3` });
  addText("Press 'i' to retry", { y: 8, color: color`3` });
  addText("Press 'k' for random", { y: 10, color: color`3` });
    addText("ai generated levels", { y: 12, color: color`3` });


  if (!retryListenerRegistered) {
    onInput("i", () => {
      if (!gameOver) return;
      level = 0;
      timer = 0;
      bulletSpeed = 250;
      inRandomMode = false;
      gameOver = false;
      setMap(levels[level]);
      initializeBulletDirections();
      updateLevelCounter();
      startBulletInterval();
    });
    retryListenerRegistered = true;
  }

  if (!randomLevelListenerRegistered) {
    onInput("k", () => {
      if (!gameOver) return;
      timer = 0;
      bulletSpeed = 250;
      inRandomMode = true;
      gameOver = false;
      setMap(generateRandomLevel());
      initializeBulletDirections();
      startBulletInterval();
    });
    randomLevelListenerRegistered = true;
  }
}

// After every Input
afterInput(() => {
  if (gameOver) return;
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === 1) {
    if (inRandomMode) {
      setMap(generateRandomLevel());
    } else {
      level += 1; // Increment the level after changing the speed

      if (level < levels.length+1) {
        if (level === 7) {
          bulletSpeed = 75;
        } else if (level === 8) {
          bulletSpeed = 250;
        } else if (level === 10) { // Ensure level 10 condition to show end screen
          gameOver = true;
          showEndScreen();
          return;
        }
        setMap(levels[level]);
      } else {
        clearInterval(bulletInterval); // Clear the interval when the game ends
        clearInterval(timerInterval); // Stop the timer
        showEndScreen();
      }
    }
    initializeBulletDirections();
    updateLevelCounter();
    startBulletInterval(); // Start bullet movement with the new speed
  }

  applyPowerUp();
  checkForObstacle();
  checkForDeath();
});

// Initialize bullet directions on game start
initializeBulletDirections();
updateLevelCounter();
startBulletInterval(); // Start the initial bullet interval
