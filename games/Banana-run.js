/**
 * Monkey Runner — Sprig-compatible
 *
 * Sprig hardware joystick layout:
 *   Left cluster  →  w=up  a=left  s=down  d=right   (left joystick)
 *   Right cluster →  i=up  j=left  k=down  l=right   (right joystick / action)
 *
 *   w / i  → jump
 *   a / j  → move left
 *   d / l  → move right
 *   s / k  → (reserved / duck)
 *
 * How to run in Sprig:
 *   1. Go to https://sprig.hackclub.com/editor
 *   2. Paste this file into the editor
 *   3. Click Run (or press Ctrl+Enter)
 */

// ─── Sprites ─────────────────────────────────────────────────────────────────

const monkey = "m";
const banana = "b";
const gem    = "g";
const ground = "G";
const plat   = "P";
const spike  = "S";
const vine   = "V";

setLegend(
  [monkey, bitmap`
................
................
..0000000000....
.0CC0C00C0C0....
.0CCCCCCCC00....
.00CC0000000....
..00000000......
...0CCCC00......
..0C0CC0C0......
..00000000......
...0....0.......
...0....0.......
................
................
................
................`],

  [banana, bitmap`
................
................
....0000........
...0CCCC0.......
..0CCCCC00......
..0CCCCCC0......
...0CCCCC0......
....00CCC0......
......000.......
................
................
................
................
................
................
................`],

  [gem, bitmap`
................
.......0........
......000.......
.....07070......
....0777770.....
...077777770....
..07777777770...
.0777777777770..
..07777777770...
...077777770....
....0777770.....
.....07070......
......000.......
.......0........
................
................`],

  [ground, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0000000000000000`],

  [plat, bitmap`
0000000000000000
0555555555555550
0555555555555550
0555555555555550
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0000000000000000`],

  [spike, bitmap`
................
........0.......
.......000......
.......0C0......
......00C00.....
.....000C000....
....0000C0000...
...00000C00000..
..000000C000000.
.0000000C0000000
0000000000000000
................
................
................
................
................`],

  [vine, bitmap`
.......00.......
......0CC0......
......0CC0......
.......00.......
.......00.......
.....0000000....
....0CCCCCCC0...
.....0000000....
.......00.......
.......00.......
......0CC0......
......0CC0......
.......00.......
.......00.......
.....0000000....
....0CCCCCCC0...`]
);

// ─── Game state ───────────────────────────────────────────────────────────────

let score = 0;
let best  = 0;
let lives = 3;
let level = 1;
let phase = "idle";  // "idle" | "playing" | "dead"

// ─── Level builder ────────────────────────────────────────────────────────────

const WIDTH  = 20;
const HEIGHT = 14;

function buildMap(lvl) {
  const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill("."));

  // Solid ground row
  for (let x = 0; x < WIDTH; x++) grid[HEIGHT - 1][x] = "G";

  // Gaps in the ground
  const gapChance = 0.08 + lvl * 0.02;
  for (let x = 3; x < WIDTH - 3; x++) {
    if (Math.random() < gapChance) {
      grid[HEIGHT - 1][x] = ".";
      if (Math.random() < 0.5) grid[HEIGHT - 1][x + 1] = ".";
    }
  }

  // Floating platforms with bananas on top
  const numPlats = 4 + lvl;
  for (let i = 0; i < numPlats; i++) {
    const py = HEIGHT - 4 - Math.floor(Math.random() * 5);
    const px = 1 + Math.floor(Math.random() * (WIDTH - 5));
    const pw = 2 + Math.floor(Math.random() * 3);
    for (let dx = 0; dx < pw; dx++) {
      if (px + dx < WIDTH) grid[py][px + dx] = "P";
    }
    if (py - 1 >= 0 && Math.random() < 0.7) {
      grid[py - 1][px + Math.floor(pw / 2)] = "b";
    }
  }

  // Spikes
  const spikeCount = 2 + lvl;
  for (let i = 0; i < spikeCount; i++) {
    const sx = 4 + Math.floor(Math.random() * (WIDTH - 6));
    if (grid[HEIGHT - 2][sx] === ".") grid[HEIGHT - 2][sx] = "S";
  }

  // Vines over gaps
  for (let x = 1; x < WIDTH - 1; x++) {
    if (grid[HEIGHT - 1][x] === "." && Math.random() < 0.4) {
      const vy = HEIGHT - 4;
      if (grid[vy][x] === ".") grid[vy][x] = "V";
    }
  }

  // Ground-level bananas
  const bananaCount = 5 + lvl * 2;
  let placed = 0;
  while (placed < bananaCount) {
    const bx = 1 + Math.floor(Math.random() * (WIDTH - 2));
    const by = HEIGHT - 2;
    if (grid[by][bx] === ".") { grid[by][bx] = "b"; placed++; }
  }

  // Goal gem at far right
  grid[HEIGHT - 5][WIDTH - 2] = "g";
  grid[HEIGHT - 4][WIDTH - 2] = "P";
  grid[HEIGHT - 4][WIDTH - 3] = "P";

  // Monkey spawn (safe top-left)
  grid[HEIGHT - 2][1] = "m";

  return grid.map(row => row.join("")).join("\n");
}

// ─── Shared action handlers ───────────────────────────────────────────────────

function doJump() {
  if (phase === "idle" || phase === "dead") { startGame(); return; }
  const [m] = getAll(monkey);
  if (!m) return;
  const below = getTile(m.x, m.y + 1);
  if (below && (below.type === ground || below.type === plat)) {
    m.y -= 1;
    scheduleGravity();
  }
}

function doLeft() {
  if (phase !== "playing") return;
  const [m] = getAll(monkey);
  if (!m) return;
  if (m.x - 1 >= 0) m.x -= 1;
  checkCollisions(m);
}

function doRight() {
  if (phase !== "playing") return;
  const [m] = getAll(monkey);
  if (!m) return;
  if (m.x + 1 < WIDTH) m.x += 1;
  checkCollisions(m);
}

// ─── Controls — all 8 valid Sprig keys, no others ────────────────────────────
//
//  Left joystick     Right joystick
//      w                  i
//    a   d              j   l
//      s                  k

onInput("w", doJump);   // left stick up  → jump / start
onInput("i", doJump);   // right stick up → jump / start (action button)

onInput("a", doLeft);   // left stick left
onInput("j", doLeft);   // right stick left

onInput("d", doRight);  // left stick right
onInput("l", doRight);  // right stick right

onInput("s", () => {});  // left stick down  — reserved
onInput("k", () => {});  // right stick down — reserved

// ─── Physics ──────────────────────────────────────────────────────────────────

let gravityInterval = null;

function scheduleGravity() {
  if (gravityInterval) return;
  gravityInterval = setInterval(applyGravity, 120);
}

function applyGravity() {
  if (phase !== "playing") {
    clearInterval(gravityInterval);
    gravityInterval = null;
    return;
  }
  const [m] = getAll(monkey);
  if (!m) return;

  const below   = getTile(m.x, m.y + 1);
  const onSolid = below && (below.type === ground || below.type === plat);

  if (!onSolid) {
    if (m.y + 1 < HEIGHT) {
      m.y += 1;
      checkCollisions(m);
    } else {
      loseLife();
    }
  } else {
    clearInterval(gravityInterval);
    gravityInterval = null;
  }
}

// ─── Collision / pickup ───────────────────────────────────────────────────────

function checkCollisions(m) {
  const here = getTile(m.x, m.y);
  if (!here) return;

  here.forEach(sprite => {
    if (sprite.type === banana) {
      sprite.remove();
      score += 10;
      if (score > best) best = score;
      updateHUD();
      checkLevelClear();
    } else if (sprite.type === gem) {
      sprite.remove();
      score += 50;
      if (score > best) best = score;
      updateHUD();
      checkLevelClear();
    } else if (sprite.type === spike) {
      loseLife();
    } else if (sprite.type === vine) {
      m.y = Math.max(0, m.y - 2);
    }
  });
}

function checkLevelClear() {
  if (getAll(banana).length === 0 && getAll(gem).length === 0) {
    level++;
    addText(`Level ${level}!`, { x: 5, y: 6, color: color`7` });
    setTimeout(() => {
      clearText();
      setMap(buildMap(level));
      scheduleGravity();
    }, 1200);
  }
}

// ─── Lives ────────────────────────────────────────────────────────────────────

function loseLife() {
  lives--;
  updateHUD();
  if (lives <= 0) {
    phase = "dead";
    clearInterval(gravityInterval);
    gravityInterval = null;
    if (score > best) best = score;
    addText("GAME OVER",       { x: 4, y: 5, color: color`3` });
    addText(`score: ${score}`, { x: 4, y: 7, color: color`7` });
    addText("press W or I",    { x: 3, y: 9, color: color`6` });
  } else {
    const [m] = getAll(monkey);
    if (m) { m.x = 1; m.y = HEIGHT - 2; }
    addText(`-1 life`, { x: 7, y: 6, color: color`3` });
    setTimeout(clearText, 800);
  }
}

// ─── HUD ──────────────────────────────────────────────────────────────────────

function updateHUD() {
  clearText();
  addText(`${score}`,   { x: 1,  y: 0, color: color`7` });
  addText(`L${lives}`,  { x: 14, y: 0, color: color`3` });
  addText(`lv${level}`, { x: 17, y: 0, color: color`6` });
}

// ─── Start ────────────────────────────────────────────────────────────────────

function startGame() {
  score = 0; lives = 3; level = 1;
  phase = "playing";
  clearText();
  setMap(buildMap(level));
  updateHUD();
  scheduleGravity();
}

// ─── Title screen ─────────────────────────────────────────────────────────────

function showTitle() {
  setMap(`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
GGGGGGGGGGGGGGGGGGGG`);

  addText("MONKEY",           { x: 6, y: 4,  color: color`4` });
  addText("RUNNER",           { x: 6, y: 5,  color: color`7` });
  addText("collect bananas",  { x: 2, y: 7,  color: color`6` });
  addText("dodge spikes",     { x: 3, y: 8,  color: color`3` });
  addText("reach the gem",    { x: 3, y: 9,  color: color`5` });
  addText("W or I to start",  { x: 2, y: 11, color: color`7` });
}

showTitle();