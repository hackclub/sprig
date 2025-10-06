/*
@title: Highway Rush Pro
@author: Vihanga
@tags: ['racing']
*/

const player = "p";
const obstacle = "o";
const road = "r";
const grass = "g";
const coin = "c";
const fuel = "f";
const enemy = "e";

setLegend(
  [player, bitmap`
................
................
.....000000.....
....00666600....
...0066666600...
....06666660....
....00666600....
....00222200....
....02222220....
....02222220....
....02222220....
....02222220....
....00222200....
.....000000.....
................
................`],
  [obstacle, bitmap`
................
.....000000.....
....00333300....
....03333330....
....03333330....
....00333300....
....00999900....
....09999990....
....09999990....
....09999990....
....09999990....
....00999900....
.....000000.....
................
................`],
  [enemy, bitmap`
................
.....000000.....
....00222200....
....02222220....
....02222220....
....00222200....
....00333300....
....03333330....
....03333330....
....03333330....
....03333330....
....00333300....
.....000000.....
................
................`],
   [coin, bitmap`
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....`],
  [fuel, bitmap`
...3333.........
...33.3.....00..
...33.3....0000.
...33333333330..
...C33333333C0..
...CC333333CC...
...3CC3333CC3...
...33CCCCCC33...
...333C33C333...
...333C33C333...
...333CCCC333...
...33CCCCCC33...
...3CC3333CC3...
...CC333333C3...
...C3333333CC...
................`],
  [road, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
);

let level = 0;
const levels = [
  map`
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggrrrgg
gggprrgg
gggrrrgg
gggrrrgg`
];

setMap(levels[level]);

let score = 0;
let highScore = 0;
let gameRunning = false;
let gameSpeed = 500;
let fuelLevel = 100;
let showMenu = true;
let difficulty = 1;

// Show main menu
function showMainMenu() {
  clearText();
  addText("HIGHWAY RUSH", { x: 2, y: 2, color: color`6` });
  addText("PRO", { x: 7, y: 3, color: color`6` });
  addText("", { x: 0, y: 5, color: color`2` });
  addText("W/S - Select", { x: 2, y: 7, color: color`2` });
  addText("I - Start", { x: 3, y: 8, color: color`2` });
  addText("", { x: 0, y: 10, color: color`2` });
  addText(`Hi: ${highScore}`, { x: 4, y: 12, color: color`3` });
  
  if (difficulty === 1) {
    addText("> EASY", { x: 4, y: 10, color: color`8` });
    addText("  HARD", { x: 4, y: 11, color: color`5` });
  } else {
    addText("  EASY", { x: 4, y: 10, color: color`5` });
    addText("> HARD", { x: 4, y: 11, color: color`8` });
  }
}

// Movement controls
onInput("a", () => {
  if (!gameRunning || showMenu) return;
  const p = getFirst(player);
  if (p.x > 3) {
    p.x -= 1;
    playTune(moveTune);
  }
});

onInput("d", () => {
  if (!gameRunning || showMenu) return;
  const p = getFirst(player);
  if (p.x < 5) {
    p.x += 1;
    playTune(moveTune);
  }
});

// Menu navigation
onInput("w", () => {
  if (showMenu && !gameRunning) {
    difficulty = 1;
    showMainMenu();
    playTune(menuTune);
  }
});

onInput("s", () => {
  if (showMenu && !gameRunning) {
    difficulty = 2;
    showMainMenu();
    playTune(menuTune);
  }
});

// Start game
onInput("i", () => {
  if (showMenu) {
    showMenu = false;
    startGame();
  } else if (!gameRunning) {
    restartGame();
  }
});

function startGame() {
  gameRunning = true;
  score = 0;
  fuelLevel = 100;
  gameSpeed = difficulty === 1 ? 500 : 350;
  clearText();
  updateHUD();
  playTune(startTune);
  gameLoop();
  spawnLoop();
  fuelLoop();
}

function restartGame() {
  // Remove all sprites
  const allSprites = getAll();
  for (const s of allSprites) {
    s.remove();
  }

  // Reset the map
  setMap(levels[level]);

  // Start the game
  startGame();
}

function spawnObstacle() {
  if (!gameRunning) return;
  
  const lanes = [3, 4, 5];
  const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
  const rand = Math.random();
  
  if (rand < 0.25) {
    addSprite(randomLane, 0, coin);
  } else if (rand < 0.45 && fuelLevel < 70) {
    addSprite(randomLane, 0, fuel);
  } else if (rand < 0.55 && difficulty === 2) {
    addSprite(randomLane, 0, enemy);
  } else if (rand < 0.95) {
    addSprite(randomLane, 0, obstacle);
  }
}

function moveObstacles() {
  if (!gameRunning) return;
  
  const obstacles = getAll(obstacle);
  const coins = getAll(coin);
  const fuels = getAll(fuel);
  const enemies = getAll(enemy);
  const allObjects = [...obstacles, ...coins, ...fuels, ...enemies];
  
  for (const obj of allObjects) {
    obj.y += 1;
    
    if (obj.y >= height()) {
      obj.remove();
      if (obj.type === obstacle || obj.type === enemy) {
        score += difficulty === 2 ? 2 : 1;
        if (score % 10 === 0 && gameSpeed > 150) {
          gameSpeed -= 25;
          playTune(speedUpTune);
        }
      }
    }
  }
  
  checkCollisions();
  updateHUD();
}

function checkCollisions() {
  const p = getFirst(player);
  if (!p) return;
  
  const spritesHere = getTile(p.x, p.y);
  
  for (const sprite of spritesHere) {
    if (sprite.type === obstacle || sprite.type === enemy) {
      gameOver();
      return;
    }
    if (sprite.type === coin) {
      sprite.remove();
      score += difficulty === 2 ? 10 : 5;
      playTune(collectTune);
    }
    if (sprite.type === fuel) {
      sprite.remove();
      fuelLevel = Math.min(100, fuelLevel + 30);
      playTune(fuelTune);
    }
  }
}

function gameOver() {
  gameRunning = false;
  
  if (score > highScore) {
    highScore = score;
    playTune(newHighScoreTune);
  } else {
    playTune(gameOverTune);
  }
  
  clearText();
  addText("GAME OVER!", { x: 3, y: 4, color: color`3` });
  addText(`Score: ${score}`, { x: 4, y: 6, color: color`6` });
  addText(`Best: ${highScore}`, { x: 4, y: 7, color: color`6` });
  addText("", { x: 0, y: 9, color: color`2` });
  addText("Press I", { x: 4, y: 10, color: color`2` });
  addText("to retry", { x: 4, y: 11, color: color`2` });
}

function updateHUD() {
  if (!gameRunning) return; // prevent HUD from overwriting Game Over
  
  clearText();
  addText(`Sc:${score}`, { x: 1, y: 1, color: color`6` });
  
  const fuelBars = Math.floor(fuelLevel / 10);
  let fuelColor = color`4`;
  if (fuelLevel < 30) fuelColor = color`3`;
  else if (fuelLevel < 60) fuelColor = color`9`;
  
  addText(`F:${'|'.repeat(fuelBars)}`, { x: 1, y: 14, color: fuelColor });
}

function fuelLoop() {
  if (!gameRunning) return;
  
  fuelLevel -= difficulty === 2 ? 0.8 : 0.5;
  
  if (fuelLevel <= 0) {
    gameOver();
    return;
  }
  
  if (fuelLevel < 20) {
    playTune(lowFuelTune);
  }
  
  setTimeout(fuelLoop, 200);
}

// Game loop
function gameLoop() {
  if (!gameRunning) return;
  
  moveObstacles();
  
  setTimeout(() => {
    if (gameRunning) gameLoop();
  }, gameSpeed);
}

// Spawn obstacles periodically
function spawnLoop() {
  if (gameRunning) {
    spawnObstacle();
  }
  if (!showMenu) {
    setTimeout(spawnLoop, difficulty === 2 ? 1200 : 1500);
  }
}

// Sound effects
const moveTune = tune`
50: C5^50,
1450`;

const menuTune = tune`
50: E5^50,
1450`;

const collectTune = tune`
75: C5^75,
75: E5^75,
75: G5^75,
75: C6^75,
2175`;

const fuelTune = tune`
75: G4^75,
75: C5^75,
75: E5^75,
2175`;

const speedUpTune = tune`
100: C5^100,
100: D5^100,
100: E5^100,
100: G5^100,
1600`;

const lowFuelTune = tune`
100: E4^100,
100: C4^100,
1800`;

const gameOverTune = tune`
150: G4^150,
150: F4^150,
150: E4^150,
150: D4^150,
150: C4^150,
3000`;

const newHighScoreTune = tune`
100: C5^100,
100: E5^100,
100: G5^100,
100: C6^100,
100: G5^100,
100: C6^100,
100: E6^100,
2300`;

const startTune = tune`
75: G4^75,
75: C5^75,
75: E5^75,
75: G5^75,
2100`;

// Start with menu
showMainMenu();
