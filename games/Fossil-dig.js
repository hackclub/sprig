/*
@title: Fossil Dig
@author: Advait
@description: Dig through deadly caves to collect fossils while dodging falling rocks, patrolling beetles, and hungry moles. Use dynamite and avalanches to fight back across 10 levels.
@tags: ['puzzle', 'action', 'strategy']
@addedOn: 2026-09-28
*/

/*
HOW TO PLAY
- WASD : move / dig
- K    : drop dynamite (limited per level, shown as T in the top bar)
- J    : start / restart level

- Collect every fossil, then climb the ladder.
- Rocks fall when nothing is under them, and roll off other rocks.
- A falling rock crushes you, or any enemy under it (+100).
- Red beetles patrol tunnels. Purple moles hunt you down.
- Dynamite blasts a 3x3 area: dirt, rocks, cracked stone, enemies, YOU.
  Dynamite next to dynamite = chain reaction.
*/

// =====================================================================
// SPRITE NAMES — one letter each. The same letters are used in the maps.
// Order in setLegend = draw order (earlier = drawn on top).
// =====================================================================
const player = "p";
const boom = "o";      // explosion flash
const beetle = "x";    // patrolling enemy
const mole = "m";      // chasing enemy
const rock = "r";
const dynamite = "t";
const fossil = "f";
const exit = "e";      // ladder
const cracked = "c";   // stone that only dynamite can break
const wall = "w";      // unbreakable
const dirt = "d";
const bg = "b";

// =====================================================================
// ART (16x16 each). Colors: 0 black, L dark gray, 1 gray, 2 white,
// 3 red, C brown, 9 orange, 6 yellow, 7 blue, H purple, 8 pink, . clear
// =====================================================================
setLegend(
  [player, bitmap`
................
.....666666.....
....66666666....
...6666666666...
....99999999....
....90999909....
....99999999....
.....999999.....
....77777777....
...7777777777...
..997777777799..
....77777777....
....LLL..LLL....
....LLL..LLL....
....000..000....
................`],
  [boom, bitmap`
....9......9....
.9...9....9...9.
..9..99..99..9..
...9969999699...
....96666669....
99.9666226669.99
..966622226669..
...9662222669...
...9662222669...
..966622226669..
99.9666226669.99
....96666669....
...9969999699...
..9..99..99..9..
.9...9....9...9.
....9......9....`],
  [beetle, bitmap`
................
....0......0....
.....0....0.....
......3333......
.....333333.....
...0.303303.0...
....33333333....
..0.33033033.0..
....33333333....
...0.333333.0...
....33033033....
..0..333333..0..
.....333333.....
......3333......
................
................`],
  [mole, bitmap`
................
.....HHHHHH.....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
..HH22HHHH22HH..
..HH20HHHH20HH..
.HHHHHHHHHHHHHH.
.HHHHHH88HHHHHH.
.HHHH222222HHHH.
.HHHHH2HH2HHHHH.
.HHHHHHHHHHHHHH.
..HHHHHHHHHHHH..
..22HHHHHHHH22..
.222.HHHHHH.222.
................
................`],
  [rock, bitmap`
................
.....LLLLLL.....
...LL111111LL...
..L1111111111L..
.L111112111111L.
.L111122111111L.
L11111111111111L
L11111111111111L
L1111111111L111L
L111111111L1111L
L11111111111111L
.L111111111111L.
.L111111111111L.
..LL11111111LL..
....LLLLLLLL....
................`],
  [dynamite, bitmap`
................
..........9.....
.........6.6....
..........L.....
.........L......
....3333L333....
...3333333333...
...3222222223...
...3333333333...
...3333333333...
...3222222223...
...3333333333...
...3333333333...
....33333333....
................
................`],
  [fossil, bitmap`
................
................
................
..22........22..
.2222......2222.
.22222222222222.
..222222222222..
.22222222222222.
.2222......2222.
..22........22..
................
................
................
................
................
................`],
  [exit, bitmap`
...9........9...
...9999999999...
...9........9...
...9........9...
...9999999999...
...9........9...
...9........9...
...9999999999...
...9........9...
...9........9...
...9999999999...
...9........9...
...9........9...
...9999999999...
...9........9...
...9........9...`],
  [cracked, bitmap`
LLLLLLLLLLLLLLLL
L11111101111111L
L11111101111111L
L11111110111111L
L11111111011111L
L10011111100111L
L11100111011111L
L11111000111111L
L11111101111111L
L11111101111001L
L11111011110111L
L11110111101111L
L11101111011111L
L11011111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [wall, bitmap`
0000000000000000
0LLLLLL0LLLLLLL0
0LLLLLL0LLLLLLL0
0LLLLLL0LLLLLLL0
0000000000000000
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
0000000000000000
0LLLLLL0LLLLLLL0
0LLLLLL0LLLLLLL0
0LLLLLL0LLLLLLL0
0000000000000000
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL
LLL0LLLLLLL0LLLL`],
  [dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCC0CCCCCCCCCCC
CCCCCCCCCC9CCCCC
CCCCCCCCCCCCCCCC
C9CCCCCCCCCCC0CC
CCCCCCCCCCCCCCCC
CCCCCC0CCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC9CCC
CC0CCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCC9CCCCCCCC
CCCCCCCCCCCCCCCC
CCCC0CCCCCCC0CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
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
0000000000000000`]
);

setBackground(bg);

// =====================================================================
// SOUNDS  (~ sine, - square, ^ triangle, / sawtooth)
// =====================================================================
const pickupSound = tune`
80: E5~80,
80: A5~80`;
const boomSound = tune`
100: C3/100,
100: G2/100,
100: C2/100`;
const deathSound = tune`
150: E4-150,
150: C4-150,
300: A3-300`;
const levelSound = tune`
100: C5~100,
100: E5~100,
100: G5~100,
200: C6~200`;
const fuseSound = tune`
60: G4^60`;
const squishSound = tune`
80: A4-80,
80: D4-80`;

// =====================================================================
// LEVELS  (10 wide x 8 tall)
// w wall, c cracked stone, d dirt, r rock, f fossil, p player,
// e ladder, x beetle, m mole, . empty
// Top & bottom rows are walls because text is drawn over them.
// =====================================================================
const levels = [
  // 1 — learn digging + falling rocks
  map`
wwwwwwwwww
wp.dddd.ew
wddrdddddw
wdddddrddw
wddfddddfw
wdddrddddw
wfddddddfw
wwwwwwwwww`,
  // 2 — rows of rocks waiting to drop
  map`
wwwwwwwwww
wpdrdrdrdw
wddddddddw
wdfdwwdfdw
wddddddddw
wrdrdrdrdw
wfddfdddew
wwwwwwwwww`,
  // 3 — first beetle. Drop a rock on it!
  map`
wwwwwwwwww
wpdrddrddw
wddddddddw
w...x....w
wdddddddfw
wfdddddddw
wddfddddew
wwwwwwwwww`,
  // 4 — first mole, sealed in a cave until YOU open it
  map`
wwwwwwwwww
wpddrrrddw
wddddddddw
wdd.....dw
wfd..m..dw
wdd.....fw
wedddddfdw
wwwwwwwwww`,
  // 5 — rock pyramid. Dig under it and it avalanches
  map`
wwwwwwwwww
wpddddddfw
wddddrdddw
wdddrrrddw
wddrrrrrdw
wfddddddfw
wdddddddew
wwwwwwwwww`,
  // 6 — two beetle tunnels
  map`
wwwwwwwwww
wpdddrdddw
wdx..d..fw
wddddddddw
wdrdrdrddw
wdddddddfw
wf..x...ew
wwwwwwwwww`,
  // 7 — two moles in an open cave
  map`
wwwwwwwwww
wprrdrrdrw
wddddddddw
wd...m...w
wf.......w
wd...m..fw
wddddddedw
wwwwwwwwww`,
  // 8 — cracked stone: you NEED dynamite
  map`
wwwwwwwwww
wpddrddddw
wddcccdddw
wddcfcdrdw
wddcccdddw
wddddddrcw
wfdddddcew
wwwwwwwwww`,
  // 9 — beetle and mole split by cracked stone
  map`
wwwwwwwwww
wpdrdrdrdw
wddddddddw
w.x..c..mw
wdddrdddfw
wfdddddddw
wdddfdddew
wwwwwwwwww`,
  // 10 — everything at once
  map`
wwwwwwwwww
wprrdrrdfw
wddddddddw
wdx...ddcw
wddddrd.mw
wfdccdddfw
wmd.fdddew
wwwwwwwwww`,
];

const levelNames = [
  "First Dig", "Rockfall", "Beetle Run", "Mole Hole", "Pyramid",
  "The Hive", "The Chase", "Demolition", "The Nest", "Mother Lode",
];

// Dynamite you get on each level
const tntPerLevel = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3];

// Decorative map behind the title screen
const titleMap = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
wpdrfxmtew
wwwwwwwwww`;

// =====================================================================
// GAME STATE
// =====================================================================
let state = "title";   // "title" | "play" | "dead" | "won"
let level = 0;
let score = 0;
let levelStartScore = 0; // score restored when you retry a level
let deaths = 0;
let tnt = 0;             // dynamite left this level
let message = "";        // death message
let tickCount = 0;
let fallingRocks = new Set(); // "x,y" of rocks that moved last tick
let bombs = [];          // lit dynamite: {x, y, fuse}
let booms = [];          // explosion flashes: {x, y, life}

// ---------- helpers ----------
const inBounds = (x, y) => x >= 0 && y >= 0 && x < width() && y < height();

// Empty = nothing on the tile (explosion flashes don't count)
function isEmpty(x, y) {
  if (!inBounds(x, y)) return false;
  return getTile(x, y).every((s) => s.type === boom);
}

const tileHas = (x, y, type) =>
  inBounds(x, y) && getTile(x, y).some((s) => s.type === type);

const isEnemy = (s) => s.type === beetle || s.type === mole;

// =====================================================================
// SCREENS / HUD
// =====================================================================
function updateHud() {
  clearText();

  if (state === "title") {
    addText("FOSSIL DIG", { x: 5, y: 2, color: color`6` });
    addText("dig dodge detonate", { x: 1, y: 4, color: color`9` });
    addText("WASD  move/dig", { x: 3, y: 7, color: color`2` });
    addText("K     dynamite", { x: 3, y: 8, color: color`2` });
    addText("J     start", { x: 3, y: 9, color: color`2` });
    return;
  }

  if (state === "won") {
    addText("YOU WIN!", { x: 6, y: 4, color: color`6` });
    addText(`Score  ${score}`, { x: 5, y: 7, color: color`2` });
    addText(`Deaths ${deaths}`, { x: 5, y: 8, color: color`2` });
    addText("J: play again", { x: 4, y: 11, color: color`9` });
    return;
  }

  // Top bar: Level, Fossils left, dynamite (T), score
  const left = getAll(fossil).length;
  addText(`L${level + 1} F${left} T${tnt} ${score}`, { x: 1, y: 0, color: color`6` });

  // Bottom bar: level name, or a heads-up when the ladder is open
  addText(left === 0 ? "LADDER OPEN!" : levelNames[level], {
    x: 1,
    y: 15,
    color: left === 0 ? color`4` : color`2`,
  });

  if (state === "dead") {
    addText(message, { x: Math.floor((20 - message.length) / 2), y: 6, color: color`3` });
    addText("J to retry", { x: 5, y: 8, color: color`2` });
  }
}

function showTitle() {
  state = "title";
  setMap(titleMap);
  updateHud();
}

function startGame() {
  level = 0;
  score = 0;
  levelStartScore = 0;
  deaths = 0;
  loadLevel(0);
}

// Load (or retry) a level
function loadLevel(i) {
  setMap(levels[i]);
  tnt = tntPerLevel[i];
  score = levelStartScore;
  bombs = [];
  booms = [];
  fallingRocks = new Set();
  message = "";
  state = "play";
  updateHud();
}

function nextLevel() {
  playTune(levelSound);
  score += 250;              // level clear bonus
  levelStartScore = score;
  level++;
  if (level < levels.length) {
    loadLevel(level);
  } else {
    state = "won";
    updateHud();
  }
}

function die(msg) {
  if (state !== "play") return;
  state = "dead";
  deaths++;
  message = msg;
  playTune(deathSound);
  updateHud();
}

// =====================================================================
// PLAYER INPUT
// =====================================================================
function tryMove(dx, dy) {
  if (state !== "play") return;

  const p = getFirst(player);
  const nx = p.x + dx;
  const ny = p.y + dy;
  if (!inBounds(nx, ny)) return;

  const tile = getTile(nx, ny);
  const has = (type) => tile.some((s) => s.type === type);

  // Solid stuff you can't walk through
  if (has(wall) || has(cracked) || has(dynamite)) return;

  // Walking into an enemy = bad idea
  if (tile.some(isEnemy)) {
    die("GOT EATEN!");
    return;
  }

  // Ladder only works once every fossil is collected
  if (has(exit)) {
    if (getAll(fossil).length === 0) nextLevel();
    return;
  }

  // Push a rock sideways into an empty space (not up/down)
  if (has(rock)) {
    if (dy !== 0) return;
    if (!isEmpty(nx + dx, ny)) return;
    tile.find((s) => s.type === rock).x = nx + dx;
  }

  // Dig through dirt
  tile.filter((s) => s.type === dirt).forEach((s) => s.remove());

  // Grab fossils
  const f = tile.find((s) => s.type === fossil);
  if (f) {
    f.remove();
    score += 50;
    playTune(pickupSound);
  }

  p.x = nx;
  p.y = ny;
  updateHud();
}

onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

// K: drop lit dynamite where you're standing
onInput("k", () => {
  if (state !== "play" || tnt <= 0) return;
  const p = getFirst(player);
  if (tileHas(p.x, p.y, dynamite)) return;
  addSprite(p.x, p.y, dynamite);
  bombs.push({ x: p.x, y: p.y, fuse: 8 }); // 8 ticks ≈ 1.6 seconds
  tnt--;
  playTune(fuseSound);
  updateHud();
});

// J: start from title, retry level, or replay after winning
onInput("j", () => {
  if (state === "title") startGame();
  else if (state === "won") showTitle();
  else loadLevel(level);
});

// =====================================================================
// EXPLOSIONS
// =====================================================================
function addBoom(x, y) {
  if (tileHas(x, y, boom)) return;
  addSprite(x, y, boom);
  booms.push({ x, y, life: 2 });
}

// Fade out explosion flashes
function updateBooms() {
  for (const b of booms) {
    b.life--;
    if (b.life <= 0) {
      const s = getTile(b.x, b.y).find((s) => s.type === boom);
      if (s) s.remove();
    }
  }
  booms = booms.filter((b) => b.life > 0);
}

// Count down every lit stick
function updateBombs() {
  for (const b of [...bombs]) {
    b.fuse--;
    if (b.fuse <= 0) explode(b);
    if (state !== "play") return;
  }
}

// Blast a 3x3 area around the dynamite
function explode(b) {
  bombs = bombs.filter((o) => o !== b);
  playTune(boomSound);
  let hitPlayer = false;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = b.x + dx;
      const y = b.y + dy;
      if (!inBounds(x, y)) continue;

      for (const s of [...getTile(x, y)]) {
        // These survive: outer walls, the ladder, fossils
        if (s.type === wall || s.type === exit || s.type === fossil) continue;

        if (s.type === player) {
          hitPlayer = true;
          continue;
        }

        if (s.type === dynamite) {
          if (x === b.x && y === b.y) {
            s.remove(); // this stick is gone
          } else {
            // CHAIN REACTION: neighbouring stick goes off next tick
            const other = bombs.find((o) => o.x === x && o.y === y);
            if (other) other.fuse = Math.min(other.fuse, 1);
          }
          continue;
        }

        if (isEnemy(s)) score += 100;
        s.remove(); // dirt, rocks, cracked stone, enemies
      }

      // Show a flash wherever the blast cleared the tile
      if (isEmpty(x, y)) addBoom(x, y);
    }
  }

  if (hitPlayer) die("BLOWN UP!");
}

// =====================================================================
// ROCK PHYSICS
// =====================================================================
function updateRocks() {
  const nowFalling = new Set();

  // Lowest rocks first so whole stacks fall together
  const rocks = getAll(rock).sort((a, b) => b.y - a.y);

  for (const r of rocks) {
    const key = `${r.x},${r.y}`;
    const wasFalling = fallingRocks.has(key);
    const belowY = r.y + 1;
    if (!inBounds(r.x, belowY)) continue;

    // 1) Nothing below: fall
    if (isEmpty(r.x, belowY)) {
      r.y = belowY;
      nowFalling.add(`${r.x},${r.y}`);
      continue;
    }

    const below = getTile(r.x, belowY);

    // 2) Already falling and you're underneath: SQUASHED
    //    (standing under a resting rock is safe)
    if (wasFalling && below.some((s) => s.type === player)) {
      die("SQUASHED!");
      return;
    }

    // 3) Already falling onto an enemy: squish it, keep falling
    if (wasFalling && below.some(isEnemy)) {
      below.filter(isEnemy).forEach((s) => s.remove());
      addBoom(r.x, belowY);
      score += 100;
      playTune(squishSound);
      nowFalling.add(key);
      continue;
    }

    // 4) Sitting on another rock: roll off left or right if there's room
    if (below.some((s) => s.type === rock)) {
      for (const side of [-1, 1]) {
        if (isEmpty(r.x + side, r.y) && isEmpty(r.x + side, belowY)) {
          r.x += side;
          nowFalling.add(`${r.x},${r.y}`);
          break;
        }
      }
    }
  }

  fallingRocks = nowFalling;
}

// =====================================================================
// ENEMIES
// =====================================================================
// Try to step an enemy onto (nx, ny). Returns true if it moved (or ate you).
function enemyStep(e, nx, ny) {
  if (!inBounds(nx, ny)) return false;
  if (tileHas(nx, ny, player)) {
    die("GOT EATEN!");
    return true;
  }
  if (isEmpty(nx, ny)) {
    e.x = nx;
    e.y = ny;
    return true;
  }
  return false;
}

// Beetles: go straight until blocked, then turn clockwise
const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // up, right, down, left

function moveBeetles() {
  for (const b of getAll(beetle)) {
    if (b.dir === undefined) b.dir = 1; // start heading right
    for (let i = 0; i < 4; i++) {
      const d = (b.dir + i) % 4;
      if (enemyStep(b, b.x + DIRS[d][0], b.y + DIRS[d][1])) {
        b.dir = d;
        break;
      }
    }
    if (state !== "play") return;
  }
}

// Moles: step toward the player through open space (they can't dig)
function moveMoles() {
  const p = getFirst(player);
  for (const m of getAll(mole)) {
    const distX = p.x - m.x;
    const distY = p.y - m.y;
    const sx = Math.sign(distX);
    const sy = Math.sign(distY);

    // Try the longer direction first, then the other one
    const tries = Math.abs(distX) >= Math.abs(distY)
      ? [[sx, 0], [0, sy]]
      : [[0, sy], [sx, 0]];

    for (const [dx, dy] of tries) {
      if (dx === 0 && dy === 0) continue;
      if (enemyStep(m, m.x + dx, m.y + dy)) break;
    }
    if (state !== "play") return;
  }
}

// =====================================================================
// MAIN LOOP — runs every 200ms
// =====================================================================
function tick() {
  if (state !== "play") return;
  tickCount++;

  updateBooms();
  updateBombs();
  if (state !== "play") return;

  updateRocks();
  if (state !== "play") return;

  if (tickCount % 2 === 0) moveBeetles(); // beetles: every 0.4s
  if (state !== "play") return;

  if (tickCount % 3 === 0) moveMoles();   // moles: every 0.6s (a bit slower)
  if (state !== "play") return;

  updateHud();
}

setInterval(tick, 200);

showTitle();
