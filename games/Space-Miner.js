const player = "p";
const wall = "w";
const crystal = "c";
const asteroid = "a";
const enemy = "e";
const oxygen_pickup = "o";
const exit = "x";
const shield = "s";
const speed = "v";
const oxygen_tank = "t";
setLegend(
  [player, bitmap`................
................
................
........111.....
.......11111....
......1111111...
.....11111111...
....111111111...
...11111111111..
..111111111111..
..111111111111..
...11111111111..
....111111111...
.....11111111...
......1111111...
.......11111....
........111.....`],
  [wall, bitmap`8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [crystal, bitmap`................
................
................
........7.......
.......777......
......77777.....
.....7777777....
....77777777....
...7777777777...
..777777777777..
..777777777777..
...7777777777...
....77777777....
.....7777777....
......77777.....
.......777......`],
  [asteroid, bitmap`................
................
................
.....888888.....
....88888888....
...8888888888...
..888888888888..
.8888888888888..
.8888888888888..
..888888888888..
...8888888888...
....88888888....
.....888888.....
................
................
................`],
  [enemy, bitmap`................
................
......222.......
.....22222......
....2222222.....
...222222222....
..22222222222...
.222222222222...
22222222222222..
22222222222222..
.222222222222...
..22222222222...
...222222222....
....2222222.....
.....22222......`],
  [oxygen_pickup, bitmap`................
................
................
......555.......
.....55555......
....5555555.....
...55555555.....
..5555555555....
.555555555555...
.555555555555...
..5555555555....
...55555555.....
....5555555.....
.....55555......
......555.......`],
  [exit, bitmap`................
................
................
......000.......
.....00000......
....0000000.....
...000000000....
..00000000000...
.000000000000...
.000000000000...
..00000000000...
...000000000....
....0000000.....
.....00000......
......000.......`],
  [shield, bitmap`................
................
................
......999.......
.....99999......
....9999999.....
...999999999....
..99999999999...
.999999999999...
.999999999999...
..99999999999...
...999999999....
....9999999.....
.....99999......
......999.......`],
  [speed, bitmap`................
................
................
......666.......
.....66666......
....6666666.....
...666666666....
..66666666666...
.666666666666...
.666666666666...
..66666666666...
...666666666....
....6666666.....
.....66666......
......666.......`],
  [oxygen_tank, bitmap`................
................
................
......333.......
.....33333......
....3333333.....
...333333333....
..33333333333...
.333333333333...
.333333333333...
..33333333333...
...333333333....
....3333333.....
.....33333......
......333.......`]
);
setSolids([wall, asteroid]);
const TILE_SIZE = 1;
const MAX_HEALTH = 3;
const MAX_OXYGEN = 100;
const OXYGEN_DRAIN_RATE = 2;
const OXYGEN_REFILL_AMOUNT = 30;
const SHIELD_DURATION = 10;
const SPEED_DURATION = 8;
const LEVEL_COUNT = 5;
let gameState = "intro";
let currentLevel = 1;
let score = 0;
let health = MAX_HEALTH;
let oxygen = MAX_OXYGEN;
let crystalsCollected = 0;
let totalCrystals = 0;
let shieldActive = false;
let shieldTimer = 0;
let speedActive = false;
let speedTimer = 0;
const levels = [
  map`wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w..c...............w
w.....c............w
w........c.........w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w..................w
w.................xw
wwwwwwwwwwwwwwwwwwww`,
  map`wwwwwwwwwwwwwwwwwwww
w..................w
w..c...a...........w
w.......a...c......w
w....a.......a.....w
w..c...............w
w..................w
w.......a..........w
w...........a......w
w..................w
w..a...............w
w.......a...c......w
w..................w
w.................ow
w..................w
w..................w
w..................w
w..................w
w.................xw
wwwwwwwwwwwwwwwwwwww`,
  map`wwwwwwwwwwwwwwwwwwww
w..................w
w..c...e...........w
w.......e...c......w
w....a.......e.....w
w..c...............w
w..................w
w.......e..........w
w...........e......w
w..................w
w..e...............w
w.......a...c......w
w..................w
w.................ow
w..................w
w..................w
w..................w
w..................w
w.................xw
wwwwwwwwwwwwwwwwwwww`,
  map`wwwwwwwwwwwwwwwwwwww
w.c................w
w.w...........e....w
w.w..c.............w
w.w.......a........w
w.w...........c....w
w.w.e..............w
w.w............e...w
w.....a............w
w..c...............w
w...........e......w
w.......a...c......w
w..................w
w.................ow
w..................w
w..................w
w..................w
w..................w
w.................xw
wwwwwwwwwwwwwwwwwwww`,
  map`wwwwwwwwwwwwwwwwwwww
w.c.e..............w
w.w.a...........e..w
w.w..c...e........w.
w.w.......a...c....w
w.w...e............w
w.w.............e..w
w.w.a..............w
w.....e...a........w
w..c...............w
w.e............e...w
w.......a...c...e..w
w..................w
w.................ow
w..................w
w..................w
w..................w
w..................w
w.................xw
wwwwwwwwwwwwwwwwwwww`
];
const collectSound = tune`
200: E5~200,
200: G5~200
`;
const damageSound = tune`
300: C4~300,
300: A3~300
`;
const winSound = tune`
200: G4~200,
200: A4~200,
200: B4~200,
200: D5~400
`;
const loseSound = tune`
300: G4~300,
300: E4~300,
300: C4~450
`;
const powerupSound = tune`
150: B4~150,
150: D5~150,
150: G5~225
`;
const levelCompleteSound = tune`
200: E4~200,
200: G4~200,
200: B4~200
`;
function playCollectSound() {
  playTune(collectSound);
}
function playDamageSound() {
  playTune(damageSound);
}
function playWinSound() {
  playTune(winSound);
}
function playLoseSound() {
  playTune(loseSound);
}
function playPowerupSound() {
  playTune(powerupSound);
}
function playLevelCompleteSound() {
  playTune(levelCompleteSound);
}
function loadLevel(levelIndex) {
  const levelData = levels[levelIndex - 1];
  if (!levelData) {
    gameState = "win";
    return;
  }
  clearTiles();
  setMap(levelData);
  totalCrystals = getAll(crystal).length;
  crystalsCollected = 0;
  addSprite(1, 1, player);
  oxygen = MAX_OXYGEN;
  shieldActive = false;
  shieldTimer = 0;
  speedActive = false;
  speedTimer = 0;
}
function clearTiles() {
  const allSprites = getAll();
  for (const s of allSprites) {
    s.remove();
  }
}
function getPlayer() {
  const allSprites = getAll();
  for (const s of allSprites) {
    if (s.type === player) {
      return s;
    }
  }
  return null;
}
function movePlayer(dx, dy) {
  if (gameState !== "playing") return;
  const p = getPlayer();
  if (!p) return;
  const newX = p.x + dx;
  const newY = p.y + dy;
  if (newX < 0 || newX >= 20 || newY < 0 || newY >= 20) return;
  const tileAtNewPos = getTile(newX, newY);
  const hasWall = tileAtNewPos.length > 0 && tileAtNewPos.some(s => s.type === wall);
  if (hasWall) return;
  p.x = newX;
  p.y = newY;
  if (speedActive) {
  }
}
function checkCollisions() {
  const p = getPlayer();
  if (!p) return;
  const allSprites = getAll();
  for (const s of allSprites) {
    if (s === p) continue;
    if (s.x === p.x && s.y === p.y) {
      handleCollision(s);
    }
  }
}
function handleCollision(sprite) {
  switch (sprite.type) {
    case crystal:
      collectCrystal(sprite);
      break;
    case asteroid:
      hitObstacle(sprite);
      break;
    case enemy:
      hitEnemy(sprite);
      break;
    case oxygen_pickup:
      collectOxygen(sprite);
      break;
    case exit:
      tryExit(sprite);
      break;
    case shield:
      collectShield(sprite);
      break;
    case speed:
      collectSpeed(sprite);
      break;
    case oxygen_tank:
      collectOxygenTank(sprite);
      break;
  }
}
function collectCrystal(sprite) {
  sprite.remove();
  crystalsCollected++;
  score += 10;
  playCollectSound();
  if (crystalsCollected >= totalCrystals) {
  }
}
function collectOxygen(sprite) {
  sprite.remove();
  oxygen = Math.min(oxygen + 15, MAX_OXYGEN);
  playCollectSound();
}
function collectShield(sprite) {
  sprite.remove();
  shieldActive = true;
  shieldTimer = SHIELD_DURATION;
  playPowerupSound();
}
function collectSpeed(sprite) {
  sprite.remove();
  speedActive = true;
  speedTimer = SPEED_DURATION;
  playPowerupSound();
}
function collectOxygenTank(sprite) {
  sprite.remove();
  oxygen = Math.min(oxygen + OXYGEN_REFILL_AMOUNT, MAX_OXYGEN);
  playPowerupSound();
}
function hitObstacle(sprite) {
  if (shieldActive) {
    return;
  }
  takeDamage(1);
}
function hitEnemy(sprite) {
  if (shieldActive) {
    sprite.remove();
    playDamageSound();
    return;
  }
  takeDamage(1);
}
function takeDamage(amount) {
  health -= amount;
  playDamageSound();
  if (health <= 0) {
    gameState = "gameover";
    playLoseSound();
  }
}
function tryExit(sprite) {
  if (crystalsCollected >= totalCrystals) {
    playLevelCompleteSound();
    currentLevel++;
    if (currentLevel > LEVEL_COUNT) {
      gameState = "win";
      playWinSound();
    } else {
      loadLevel(currentLevel);
    }
  }
}
function updateEnemies() {
  const enemies = getAll(enemy);
  for (const enemy of enemies) {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const newX = enemy.x + dir.dx;
    const newY = enemy.y + dir.dy;
    if (newX >= 0 && newX < 20 && newY >= 0 && newY < 20) {
      const tileAtNewPos = getTile(newX, newY);
      const hasWall = tileAtNewPos.length > 0 && tileAtNewPos.some(s => s.type === wall);
      if (!hasWall) {
        enemy.x = newX;
        enemy.y = newY;
      }
    }
  }
}
function updateOxygen() {
  if (gameState !== "playing") return;
  oxygen -= OXYGEN_DRAIN_RATE;
  if (oxygen <= 0) {
    oxygen = 0;
    gameState = "gameover";
    playLoseSound();
  }
}
function updatePowerUps() {
  if (shieldActive) {
    shieldTimer--;
    if (shieldTimer <= 0) {
      shieldActive = false;
    }
  }
  if (speedActive) {
    speedTimer--;
    if (speedTimer <= 0) {
      speedActive = false;
    }
  }
}
onInput("i", () => {
  if (gameState === "intro") {
    gameState = "playing";
    loadLevel(1);
    drawUI();
  }
});
onInput("j", () => {
  gameState = "playing";
  currentLevel = 1;
  score = 0;
  health = MAX_HEALTH;
  oxygen = MAX_OXYGEN;
  crystalsCollected = 0;
  shieldActive = false;
  speedActive = false;
  loadLevel(1);
  drawUI();
});
onInput("k", () => {
  if (gameState === "playing") {
    gameState = "paused";
  } else if (gameState === "paused") {
    gameState = "playing";
  }
});
onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));
afterInput(() => {
  if (gameState === "playing") {
    updateOxygen();
    updatePowerUps();
    updateEnemies();
    checkCollisions();
    drawUI();
  } else if (gameState === "intro") {
    drawIntroScreen();
  } else if (gameState === "paused") {
    drawPauseScreen();
  } else if (gameState === "gameover") {
    drawGameOverScreen();
  } else if (gameState === "win") {
    drawWinScreen();
  }
});
function drawUI() {
  clearText();
  let healthStr = "HP: " + health;
  addText(healthStr, { x: 1, y: 21, color: color`3` });
  const oxygenPercent = Math.floor(oxygen);
  addText(`O2: ${oxygenPercent}%`, { x: 10, y: 21, color: color`5` });
  addText(`Score: ${score}`, { x: 1, y: 22, color: color`6` });
  addText(`Level: ${currentLevel}`, { x: 15, y: 21, color: color`7` });
  addText(`Crystals: ${crystalsCollected}/${totalCrystals}`, { x: 10, y: 22, color: color`5` });
  if (shieldActive) {
    addText("SHIELD", { x: 1, y: 23, color: color`1` });
  }
  if (speedActive) {
    addText("SPEED", { x: 10, y: 23, color: color`2` });
  }
}
function drawIntroScreen() {
  clearText();
  addText("SPACE MINER", { x: 6, y: 8, color: color`5` });
  addText("============", { x: 6, y: 9, color: color`5` });
  addText("Collect all crystals", { x: 4, y: 11, color: color`7` });
  addText("Avoid asteroids & enemies", { x: 3, y: 12, color: color`7` });
  addText("Watch your oxygen!", { x: 4, y: 13, color: color`7` });
  addText("Press I to start", { x: 5, y: 15, color: color`6` });
  addText("WASD to move", { x: 5, y: 17, color: color`4` });
  addText("K to pause, J restart", { x: 3, y: 18, color: color`4` });
}
function drawPauseScreen() {
  clearText();
  addText("PAUSED", { x: 8, y: 10, color: color`6` });
  addText("Press K to resume", { x: 5, y: 12, color: color`7` });
}
function drawGameOverScreen() {
  clearText();
  addText("GAME OVER", { x: 6, y: 9, color: color`3` });
  addText(`Final Score: ${score}`, { x: 5, y: 11, color: color`7` });
  addText(`Level: ${currentLevel}`, { x: 6, y: 12, color: color`7` });
  addText("Press J to restart", { x: 5, y: 14, color: color`6` });
}
function drawWinScreen() {
  clearText();
  addText("YOU WIN!", { x: 7, y: 9, color: color`2` });
  addText(`Final Score: ${score}`, { x: 5, y: 11, color: color`7` });
  addText("All levels complete!", { x: 4, y: 12, color: color`7` });
  addText("Press J to play again", { x: 4, y: 14, color: color`6` });
}
setMap(levels[0]);
addSprite(1, 1, player);
drawIntroScreen();