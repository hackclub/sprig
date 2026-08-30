// POLARITY INVADERS — a classic-style Space Invaders build for Sprig
// (sprig.hackclub.com), with one twist mechanic layered on top.
//
// CLASSIC FEATURES: full-width invader formation, invaders shoot back,
// destructible shield bunkers, a bonus UFO that crosses the top, 3 lives,
// and the swarm speeds up the fewer invaders are left (the classic
// "panic" acceleration).
//
// THE TWIST: invaders come in two types, Orb and Spike. Your laser also
// has a type, toggled on the fly. Matching laser kills an invader. Wrong
// laser doesn't kill it — it flips the invader's type to match your shot
// AND shoves it one row closer to you. Read the swarm, switch your laser,
// don't panic-fire.
//
// Controls: a/d = move, i = shoot, j = toggle laser type (Orb <-> Spike)
// s = restart after Game Over

const player = "p";
const orbInv = "o";
const spikeInv = "k";
const orbBullet = "b";
const spikeBullet = "v";
const enemyBullet = "e";
const shield = "h";
const ufo = "u";
const bg = "z";

setLegend(
  [bg, bitmap`
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
  [ufo, bitmap`
................
................
....77777777....
...7799999977...
..799999999997..
..777777777777..
...7.7.7.7.7....
................
................
................
................
................
................
................
................
................`],
  [orbBullet, bitmap`
................
................
................
................
................
................
.......99.......
.......99.......
.......99.......
................
................
................
................
................
................
................`],
  [spikeBullet, bitmap`
................
................
................
................
................
................
.......66.......
.......66.......
.......66.......
................
................
................
................
................
................
................`],
  [enemyBullet, bitmap`
................
................
................
................
................
................
......3333......
......3333......
......3333......
................
................
................
................
................
................
................`],
  [orbInv, bitmap`
................
................
.....9999.......
....999999......
...99999999.....
...99999999.....
...99999999.....
...99999999.....
....999999......
.....9999.......
................
................
................
................
................
................`],
  [spikeInv, bitmap`
................
........6.......
.......666......
......66666.....
.....6666666....
....666666666...
...66666666666..
....666666666...
.....6666666....
......66666.....
.......666......
........6.......
................
................
................
................`],
  [shield, bitmap`
................
................
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..55........55..
..55........55..
................
................
................
................
................
................`],
  [player, bitmap`
................
................
................
........2.......
........2.......
.......222......
.......2L2......
......22L22.....
......2L1L2.....
.....2211122....
.....2222222....
................
................
................
................
................`]
);

const W = 10;
const H = 13;

const level = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........
.....p....`;
setMap(level);
setBackground(bg);

let gameRunning = true;
let score = 0;
let wave = 1;
let lives = 3;
let laserType = "orb"; // "orb" or "spike"

let swarmDir = 1;
let swarmTickCounter = 0;
let swarmTickInterval = 12;
let initialInvaderCount = 1;

let ufoTickCounter = 0;
let invulnTicks = 0; // brief invincibility after losing a life

let gameLoop;

function drawHud() {
  clearText();
  addText(`Lives:${lives} Wave:${wave} Score:${score} Laser:${laserType.toUpperCase()}`, {
    x: 0,
    y: 0,
    color: color`3`,
  });
}

function allInvaders() {
  return [...getAll(orbInv), ...getAll(spikeInv)];
}

// --- Player controls ---
onInput("a", () => {
  if (!gameRunning) return;
  const p = getFirst(player);
  if (p.x > 0) p.x -= 1;
});
onInput("d", () => {
  if (!gameRunning) return;
  const p = getFirst(player);
  if (p.x < W - 1) p.x += 1;
});
onInput("j", () => {
  if (!gameRunning) return;
  laserType = laserType === "orb" ? "spike" : "orb";
  drawHud();
});
const MAX_PLAYER_BULLETS = 3;
onInput("i", () => {
  if (!gameRunning) return;
  const activeBullets = getAll(orbBullet).length + getAll(spikeBullet).length;
  if (activeBullets >= MAX_PLAYER_BULLETS) return;
  const p = getFirst(player);
  const type = laserType === "orb" ? orbBullet : spikeBullet;
  addSprite(p.x, p.y - 1, type);
});
onInput("s", () => {
  if (!gameRunning) restartGame();
});

// --- Shields ---
function spawnShields() {
  getAll(shield).forEach((s) => s.remove());
  const cols = [1, Math.floor(W / 2), W - 2];
  const y = H - 4;
  cols.forEach((x) => {
    addSprite(x, y, shield);
    const s = getAll(shield).find((sh) => sh.x === x && sh.y === y);
    if (s) s.hp = 4;
  });
}

function damageShield(s) {
  s.hp -= 1;
  if (s.hp <= 0) s.remove();
}

// --- Wave setup ---
function spawnWave(n) {
  getAll(orbInv).forEach((e) => e.remove());
  getAll(spikeInv).forEach((e) => e.remove());

  const rows = Math.min(5, 3 + Math.floor(n / 3));
  const cols = W - 2; // leave 1 col margin each side
  for (let row = 0; row < rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const type = Math.random() < 0.5 ? orbInv : spikeInv;
      addSprite(col, row, type);
    }
  }
  initialInvaderCount = rows * cols;
  swarmDir = 1;
  swarmTickCounter = 0;
  swarmTickInterval = Math.max(3, 14 - n);
}

// --- Swarm movement (speeds up as invaders thin out, classic panic effect) ---
function currentSwarmSpeed() {
  const remaining = allInvaders().length;
  const ratio = Math.max(0.15, remaining / initialInvaderCount);
  return Math.max(2, Math.round(swarmTickInterval * ratio));
}

function moveSwarm() {
  const invaders = allInvaders();
  if (invaders.length === 0) return;

  const hitEdge = invaders.some(
    (e) => (swarmDir === 1 && e.x >= W - 1) || (swarmDir === -1 && e.x <= 0)
  );

  if (hitEdge) {
    invaders.forEach((e) => (e.y = Math.min(H - 1, e.y + 1)));
    swarmDir *= -1;
  } else {
    invaders.forEach((e) => (e.x += swarmDir));
  }
}

// --- Invaders shoot back ---
function enemyFire() {
  const invaders = allInvaders();
  if (invaders.length === 0) return;
  if (Math.random() > 0.12) return;

  // pick the bottom-most invader in a random column so shots come from the front rank
  const byCol = {};
  invaders.forEach((e) => {
    if (!byCol[e.x] || e.y > byCol[e.x].y) byCol[e.x] = e;
  });
  const shooters = Object.values(byCol);
  const shooter = shooters[Math.floor(Math.random() * shooters.length)];
  addSprite(shooter.x, shooter.y + 1, enemyBullet);
}

function updateEnemyBullets() {
  getAll(enemyBullet).forEach((b) => {
    if (b.y + 1 >= H) {
      b.remove();
      return;
    }
    b.y += 1;
    const hitShield = getAll(shield).find((s) => s.x === b.x && s.y === b.y);
    if (hitShield) {
      damageShield(hitShield);
      b.remove();
      return;
    }
    const p = getFirst(player);
    if (b.x === p.x && b.y === p.y) {
      b.remove();
      loseLife();
    }
  });
}

// --- UFO bonus ---
function maybeSpawnUfo() {
  if (getAll(ufo).length > 0) return;
  if (Math.random() < 0.004) {
    const dir = Math.random() < 0.5 ? 1 : -1;
    const ux = dir === 1 ? 0 : W - 1;
    addSprite(ux, 0, ufo);
    const u = getAll(ufo).find((uf) => uf.x === ux && uf.y === 0);
    if (u) u.dir = dir;
  }
}

function updateUfo() {
  ufoTickCounter += 1;
  if (ufoTickCounter < 3) return;
  ufoTickCounter = 0;
  getAll(ufo).forEach((u) => {
    const nextX = u.x + u.dir;
    if (nextX < 0 || nextX > W - 1) {
      u.remove();
      return;
    }
    u.x = nextX;
  });
}

// --- Player bullets: move + resolve hits ---
function updateBullets() {
  getAll(orbBullet).forEach((b) => resolveBullet(b, "orb"));
  getAll(spikeBullet).forEach((b) => resolveBullet(b, "spike"));
}

function resolveBullet(b, bulletKind) {
  if (b.y - 1 < 0) {
    b.remove();
    return;
  }
  b.y -= 1;

  const hitShield = getAll(shield).find((s) => s.x === b.x && s.y === b.y);
  if (hitShield) {
    damageShield(hitShield);
    b.remove();
    return;
  }

  const hitUfo = getAll(ufo).find((u) => u.x === b.x && u.y === b.y);
  if (hitUfo) {
    hitUfo.remove();
    b.remove();
    score += 50;
    return;
  }

  const invaders = allInvaders();
  const target = invaders.find((e) => e.x === b.x && e.y === b.y);
  if (!target) return;

  const targetKind = target.type === orbInv ? "orb" : "spike";

  if (targetKind === bulletKind) {
    target.remove();
    score += 10;
  } else {
    const newType = bulletKind === "orb" ? orbInv : spikeInv;
    const x = target.x;
    const y = Math.min(H - 5, target.y + 1);
    target.remove();
    addSprite(x, y, newType);
    score = Math.max(0, score - 2);
  }
  b.remove();
}

// --- Win / lose ---
function checkWaveClear() {
  if (allInvaders().length === 0) {
    wave += 1;
    spawnWave(wave);
    spawnShields();
    drawHud();
  }
}

function loseLife() {
  if (invulnTicks > 0) return;
  lives -= 1;
  drawHud();
  if (lives <= 0) {
    endGame();
    return;
  }
  invulnTicks = 15; // ~1.2s of breathing room at 80ms/tick
  getAll(player).forEach((p) => (p.x = Math.floor(W / 2)));
}

function checkInvasion() {
  const p = getFirst(player);
  const reached = allInvaders().some((e) => e.y >= p.y);
  // Classic rule: invaders reaching your line is instant game over, not a
  // lost life — only enemy bullets cost you a life. This also avoids an
  // invader sitting on your row forever and re-triggering every tick.
  if (reached) endGame();
}

function endGame() {
  gameRunning = false;
  clearInterval(gameLoop);
  addText("Game Over!", { x: 2, y: 5, color: color`3` });
  addText("Press s to restart", { x: 0, y: 7, color: color`1` });
}

function restartGame() {
  getAll(orbBullet).forEach((b) => b.remove());
  getAll(spikeBullet).forEach((b) => b.remove());
  getAll(enemyBullet).forEach((b) => b.remove());
  getAll(ufo).forEach((u) => u.remove());
  const p = getFirst(player);
  p.x = Math.floor(W / 2);
  score = 0;
  wave = 1;
  lives = 3;
  laserType = "orb";
  invulnTicks = 0;
  gameRunning = true;
  spawnWave(wave);
  spawnShields();
  drawHud();
  startLoop();
}

function startLoop() {
  gameLoop = setInterval(() => {
    if (invulnTicks > 0) invulnTicks -= 1;

    updateBullets();
    updateEnemyBullets();
    updateUfo();
    maybeSpawnUfo();
    enemyFire();

    swarmTickCounter += 1;
    if (swarmTickCounter >= currentSwarmSpeed()) {
      swarmTickCounter = 0;
      moveSwarm();
    }

    checkInvasion();
    if (!gameRunning) return;
    checkWaveClear();
  }, 80);
}

spawnWave(wave);
spawnShields();
drawHud();
startLoop();