/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: İnfected
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

/*
====================================================================
 INFECTED — a top-down arcade survival game for Sprig
 You play an antivirus program cleaning a computer of a virus.
====================================================================
 Controls:
   W A S D  -> move
   I / J / K / L -> shoot antivirus packets up / left / down / right

 Goal: destroy viruses, clean infected tiles, and survive as many
 waves as you can. If infection covers 80% of the map, or your
 health hits 0, the mainframe is lost.

 Paste this into a new project at https://sprig.hackclub.com
 and hit Run (or Shift+Enter).
====================================================================
*/

// ==================================================================
// 1. CONFIG
// ==================================================================
const MAP_W = 12;                 // map width in tiles
const MAP_H = 10;                 // map height in tiles
const TICK_MS = 200;               // game loop speed

const MAX_HEALTH = 100;
const DAMAGE_PER_HIT = 10;
const INVULN_TICKS = 4;            // brief invincibility after taking damage

const WAVE_DURATION_TICKS = 100;   // ~20s per wave at 200ms/tick
const SMART_WAVE = 3;              // viruses start chasing the player at this wave

const SHIELD_DURATION_TICKS = 25;  // ~5s of Firewall protection
const SPEED_DURATION_TICKS = 25;   // ~5s of Speed Boost
const SCAN_BURST_RADIUS = 3;       // tiles cleared instantly by Scan Burst
const KILL_CLEAN_RADIUS_NEIGHBORS = true; // clean neighbor tiles when a virus dies

const INFECTION_LOSE_PERCENT = 80;
const POWERUP_CHANCE_PER_TICK = 0.03;

// ==================================================================
// 2. SPRITE KEYS
// ==================================================================
const player = "p";
const bullet = "b";
const virus = "v";
const firewall = "f";     // power-up: temporary shield
const scanburst = "u";    // power-up: destroys nearby viruses
const speedboost = "x";   // power-up: temporary speed
const infected = "n";     // background tile: infected
const clean = "c";        // background tile: clean

// ==================================================================
// 3. LEGEND (art)
// ==================================================================
// Palette reference (Sprig's built-in colors used in this game):
//   4 = green (clean)     H = purple (infected)
//   3 = red (virus)       7 = light blue (player/antivirus)
//   2 = white             0 = black (outlines)   5 = dark blue
//   6 = yellow            C = brown
// Order below = z-order, first entries draw on top.
setLegend(
  [ player, bitmap`
................
.....077770.....
....07777770....
...0777777770...
..077772277770..
..077772277770..
..072222222270..
...0222222220...
...0777227770...
....07722770....
.....077770.....
......0770......
.......00.......
................
................
................` ],
  [ bullet, bitmap`
................
................
................
................
................
.......00.......
......0770......
......0220......
......0220......
......0770......
.......00.......
................
................
................
................
................` ],
  [ virus, bitmap`
................
.......00.......
................
......0330......
....03333330....
.0.0333333330.0.
..033333333330..
..033303303330..
..033333333330..
..033C3333C330..
.0.0333333330.0.
....03333330....
......0330......
................
.......00.......
................` ],
  [ firewall, bitmap`
................
................
......0550......
.....055550.....
....05522550....
....05522550....
....05522550....
.....052250.....
.....055550.....
......0550......
.......00.......
................
................
................
................
................` ],
  [ scanburst, bitmap`
................
................
................
................
.......66.......
.......66.......
......2662......
....66622666....
....66622666....
......2662......
.......66.......
.......66.......
................
................
................
................` ],
  [ speedboost, bitmap`
................
................
.........66.....
........66......
.......66.......
......6666......
.......66.......
......66........
.....6666.......
.....66.........
....66..........
...66...........
................
................
................
................` ],
  [ infected, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHH8HHHHHHH
HH8HHHHHHHHHHHHH
HHHHHHHHH8HHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHH8HHHHHHHHHH
HHHHHHHHHHHH8HHH
HHHHHHHHHHHHHHHH
HHH8HHHHHHHHHHHH
HHHHHHHHHH8HHHHH
HHHHHHHHHHHHHHHH
HHHHHH8HHHHHHHHH
H8HHHHHHHHHHH8HH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH` ],
  [ clean, bitmap`
4444444444444444
44444444D4444444
44D4444444444444
444444444D444444
4444444444444444
4444444444444444
44444D4444444444
444444444444D444
4444444444444444
444D444444444444
4444444444D44444
4444444444444444
444444D444444444
4D44444444444D44
4444444444444444
4444444444444444` ],
);

// ==================================================================
// 4. MAP SETUP
// ==================================================================
function buildCleanMap() {
  let rows = [];
  for (let y = 0; y < MAP_H; y++) {
    let row = "";
    for (let x = 0; x < MAP_W; x++) row += clean;
    rows.push(row);
  }
  return rows.join("\n");
}

setMap(map`${buildCleanMap()}`);

const startX = Math.floor(MAP_W / 2);
const startY = Math.floor(MAP_H / 2);
addSprite(startX, startY, player);

// ==================================================================
// 5. GAME STATE
// ==================================================================
let health = MAX_HEALTH;
let score = 0;
let wave = 1;
let gameOver = false;

let shieldTicks = 0;
let speedTicks = 0;
let invulnTicks = 0;

let waveTimer = WAVE_DURATION_TICKS;
let spawnCooldown = 2;
let waveAnnounceTicks = 0; // shows a "WAVE X" banner for a few ticks

let bullets = []; // { sprite, dx, dy }

// ==================================================================
// 6. HELPERS
// ==================================================================
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function inBounds(x, y) {
  return x >= 0 && x < MAP_W && y >= 0 && y < MAP_H;
}

function neighbors4(x, y) {
  return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([nx, ny]) =>
    inBounds(nx, ny)
  );
}

// Finds the background sprite (clean or infected) sitting at a tile.
function getBackgroundAt(x, y) {
  return getTile(x, y).find((s) => s.type === clean || s.type === infected);
}

function infectTile(x, y) {
  const bg = getBackgroundAt(x, y);
  if (bg && bg.type === clean) bg.type = infected;
}

function cleanTile(x, y) {
  const bg = getBackgroundAt(x, y);
  if (bg && bg.type === infected) bg.type = clean;
}

function infectionPercent() {
  return (getAll(infected).length / (MAP_W * MAP_H)) * 100;
}

// Finds a random tile with no virus/power-up on it (and not the player's tile)
function randomEmptyTile() {
  const p = getFirst(player);
  for (let attempt = 0; attempt < 30; attempt++) {
    const x = Math.floor(Math.random() * MAP_W);
    const y = Math.floor(Math.random() * MAP_H);
    if (x === p.x && y === p.y) continue;
    const occupied = getTile(x, y).some(
      (s) => s.type === virus || s.type === firewall || s.type === scanburst || s.type === speedboost
    );
    if (!occupied) return { x, y };
  }
  return null;
}

// ==================================================================
// 7. VIRUS SPAWNING (mechanic 2)
// ==================================================================
function spawnVirus() {
  const spot = randomEmptyTile();
  if (!spot) return;
  addSprite(spot.x, spot.y, virus);
  infectTile(spot.x, spot.y); // the virus's own tile becomes infected immediately
}

// ==================================================================
// 8. INFECTION SPREADING (mechanic 3)
// ==================================================================
function spreadInfection() {
  const chance = clamp(0.05 + wave * 0.01, 0.05, 0.25);
  const infectedTiles = getAll(infected); // snapshot before mutating
  for (const tile of infectedTiles) {
    if (Math.random() < chance) {
      const options = neighbors4(tile.x, tile.y);
      if (options.length > 0) {
        const [nx, ny] = options[Math.floor(Math.random() * options.length)];
        infectTile(nx, ny);
      }
    }
  }
}

// ==================================================================
// 9. SHOOTING (mechanic 4)
// ==================================================================
function shootBullet(dx, dy) {
  if (gameOver) return;
  const p = getFirst(player);
  const bx = clamp(p.x + dx, 0, MAP_W - 1);
  const by = clamp(p.y + dy, 0, MAP_H - 1);
  if (bx === p.x && by === p.y) return; // no room to fire at the edge
  addSprite(bx, by, bullet);
  const sprite = getTile(bx, by).find((s) => s.type === bullet);
  if (sprite) bullets.push({ sprite, dx, dy });
}

onInput("i", () => shootBullet(0, -1));
onInput("k", () => shootBullet(0, 1));
onInput("j", () => shootBullet(-1, 0));
onInput("l", () => shootBullet(1, 0));

function updateBullets() {
  const remaining = [];
  for (const b of bullets) {
    b.sprite.x += b.dx;
    b.sprite.y += b.dy;
    const { x, y } = b.sprite;

    if (!inBounds(x, y)) {
      b.sprite.remove();
      continue;
    }

    const hit = getTile(x, y).find((s) => s.type === virus);
    if (hit) {
      killVirus(hit);
      b.sprite.remove();
      continue;
    }

    remaining.push(b);
  }
  bullets = remaining;
}

// ==================================================================
// 10. DESTROYING VIRUSES + CLEANING TILES (mechanic 5)
// ==================================================================
function killVirus(v) {
  const vx = v.x;
  const vy = v.y;
  v.remove();
  score += 10 + wave * 2;

  cleanTile(vx, vy);
  if (KILL_CLEAN_RADIUS_NEIGHBORS) {
    for (const [nx, ny] of neighbors4(vx, vy)) {
      cleanTile(nx, ny);
    }
  }
}

// ==================================================================
// 11. MOVEMENT + POWER-UP PICKUP
// ==================================================================
function checkPickup() {
  const p = getFirst(player);
  const pu = getTile(p.x, p.y).find(
    (s) => s.type === firewall || s.type === scanburst || s.type === speedboost
  );
  if (!pu) return;

  if (pu.type === firewall) {
    shieldTicks = SHIELD_DURATION_TICKS;
  } else if (pu.type === speedboost) {
    speedTicks = SPEED_DURATION_TICKS;
  } else if (pu.type === scanburst) {
    for (const v of getAll(virus)) {
      if (Math.abs(v.x - p.x) + Math.abs(v.y - p.y) <= SCAN_BURST_RADIUS) {
        killVirus(v);
      }
    }
  }
  pu.remove();
}

function movePlayer(dx, dy) {
  if (gameOver) return;
  const p = getFirst(player);
  const steps = speedTicks > 0 ? 2 : 1;
  p.x = clamp(p.x + dx * steps, 0, MAP_W - 1);
  p.y = clamp(p.y + dy * steps, 0, MAP_H - 1);
  checkPickup();
}

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

// ==================================================================
// 12. POWER-UP SPAWNING (mechanic 9)
// ==================================================================
function spawnPowerup() {
  const spot = randomEmptyTile();
  if (!spot) return;
  const roll = Math.random();
  const type = roll < 0.34 ? firewall : roll < 0.67 ? scanburst : speedboost;
  addSprite(spot.x, spot.y, type);
}

// ==================================================================
// 13. VIRUS MOVEMENT — faster / smarter viruses on later waves (mechanic 8)
// ==================================================================
function moveViruses() {
  if (wave < SMART_WAVE) return; // early waves: viruses stay put
  const p = getFirst(player);
  const moveChance = clamp(0.2 + (wave - SMART_WAVE) * 0.1, 0.2, 0.9);

  for (const v of getAll(virus)) {
    if (Math.random() > moveChance) continue;
    let nx = v.x;
    let ny = v.y;
    if (Math.random() < 0.5) nx += Math.sign(p.x - v.x);
    else ny += Math.sign(p.y - v.y);
    nx = clamp(nx, 0, MAP_W - 1);
    ny = clamp(ny, 0, MAP_H - 1);
    v.x = nx;
    v.y = ny;
    infectTile(nx, ny);
  }
}

// ==================================================================
// 14. PLAYER DAMAGE
// ==================================================================
function checkPlayerDamage() {
  if (invulnTicks > 0) {
    invulnTicks--;
    return;
  }
  const p = getFirst(player);
  const touchingVirus = getTile(p.x, p.y).some((s) => s.type === virus);
  if (touchingVirus && shieldTicks <= 0) {
    health = clamp(health - DAMAGE_PER_HIT, 0, MAX_HEALTH);
    invulnTicks = INVULN_TICKS;
  }
}

// ==================================================================
// 15. HUD (Wave, Infection %, Health, Score)
// ==================================================================
function updateHUD(pct) {
  clearText();
  addText("W" + wave, { x: 0, y: 0, color: color`2` });
  addText(Math.floor(pct) + "%", { x: 2, y: 0, color: color`H` });
  addText("HP" + health, { x: 5, y: 0, color: color`3` });
  addText("$" + score, { x: 9, y: 0, color: color`6` });
  if (shieldTicks > 0) addText("SHIELD", { x: 0, y: 9, color: color`5` });
  if (speedTicks > 0) addText("SPEED", { x: 7, y: 9, color: color`6` });

  // wave banner takes priority for a few ticks right after a wave changes
  if (waveAnnounceTicks > 0) {
    addText("WAVE " + wave, { x: 3, y: 4, color: color`3` });
    waveAnnounceTicks--;
  }
}

// ==================================================================
// 16. GAME OVER
// ==================================================================
function endGame() {
  gameOver = true;
  clearInterval(gameLoop);
  clearText();
  addText("INFECTION CRITICAL", { x: 0, y: 3, color: color`3` });
  addText("GAME OVER", { x: 2, y: 5, color: color`0` });
  addText("Wave: " + wave, { x: 1, y: 7, color: color`2` });
  addText("Score: " + score, { x: 1, y: 8, color: color`6` });
}

// ==================================================================
// 17. WAVES (mechanic 7)
// ==================================================================
function updateWave() {
  waveTimer--;
  if (waveTimer <= 0) {
    wave++;
    waveTimer = WAVE_DURATION_TICKS;
    waveAnnounceTicks = 10; // ~2s banner, drawn in updateHUD
  }
}

// ==================================================================
// 18. MAIN GAME LOOP
// ==================================================================
// spawn a couple of viruses immediately so the game doesn't start empty
spawnVirus();
spawnVirus();

let gameLoop = setInterval(() => {
  if (gameOver) return;

  if (shieldTicks > 0) shieldTicks--;
  if (speedTicks > 0) speedTicks--;

  updateWave();

  spawnCooldown--;
  const spawnInterval = clamp(10 - wave, 3, 10);
  if (spawnCooldown <= 0) {
    spawnVirus();
    spawnCooldown = spawnInterval;
  }

  if (Math.random() < POWERUP_CHANCE_PER_TICK) spawnPowerup();

  spreadInfection();
  moveViruses();
  updateBullets();
  checkPlayerDamage();

  const pct = infectionPercent();
  if (pct >= INFECTION_LOSE_PERCENT || health <= 0) {
    endGame();
    return;
  }

  updateHUD(pct);
}, TICK_MS);