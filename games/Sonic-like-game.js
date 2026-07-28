// =====================================================
// SONIC-LIKE PLATFORMER — built for Sprig
// (rough pixel art on purpose — looks hand-drawn/amateur!)
// Paste this whole file into the editor at sprig.hackclub.com
// =====================================================
// Controls:
//   a / d  = run left / right
//   w      = jump
//   i      = retry after Game Over
// Goal: collect rings, avoid spikes & badniks, reach the flag!
// =====================================================

const player = "p";
const ground = "g";
const ring   = "r";
const spike  = "s";
const enemy  = "e";
const flag   = "f";

setLegend(
  [ player, bitmap`
................
....3.....3.....
...333...333....
..33333.33333...
..3333333333....
.333333333333...
.311111111133...
.3111.6.111133..
.3111111111133..
..33333333333...
...1......1.....
..11........11..
...1..........1.
......1.1.......
.....6...66.....
....6.....66....`],

  [ ground, bitmap`
4444444444444444
44444444444444.4
444.44444444444.
4444444444444444
44444.4444444444
4444444444.44444
4444444444444444
4.444444444444.4
4444444444444444
444444.444444444
4444444444444444
44444444.4444444
4444444444444444
4.44444444444444
4444444.44444444
4444444444444444`],

  [ ring, bitmap`
................
................
.....888........
....8...88......
...8......8.....
...8.......8....
..8.........8...
..8.........8...
...8........8...
...8.......8....
....8.....8.....
.....88.88......
................
................
................
................`],

  [ spike, bitmap`
................
................
................
................
................
................
..2...2....2....
.222.222..222...
22222.22222.2222
9999999999999999
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],

  [ enemy, bitmap`
................
.....22222......
...222222222....
..22222222222...
.2222222222222..
.2229922299222..
.2222222222222..
.2222000000222..
..22222222222...
..22200222202...
...222222222....
....2222222.....
......2222......
................
................
................`],

  [ flag, bitmap`
.5..............
.577............
.5777...........
.57777..........
.5777...........
.57.............
..5.............
..5.............
..5.............
..5.............
..5.............
..5.............
.444............
44..............
................
................`],
);

setSolids([ player, ground ]);

// --- Levels ------------------------------------------------------
// row layout: rows 0-6 open air, row 7 = mid-air rings (jump grabs),
// row 8 = player/hazards/enemies/flag, row 9 = ground (gaps = pits!)
const levels = [
  map`
................
................
................
................
................
................
................
...r.....r...r..
p.....rs...e...f
gggg.ggggg.ggggg`,
  map`
................
................
................
................
................
................
................
..r.....r...r...
p....e...s...e.f
ggg.ggggggg.gggg`,
];

let level = 0;
let lives = 3;
let rings = 0;
let jumping = false;
let gameRunning = true;
let gameLoop;

function refreshHUD() {
  clearText();
  addText(`Lives:${lives}`, { x: 0, y: 0, color: color`0` });
  addText(`Rings:${rings}`, { x: 9, y: 0, color: color`8` });
}

function loadLevel(n) {
  setMap(levels[n]);
  // alternate starting directions so multiple enemies don't sync up
  getAll(enemy).forEach((en, i) => { en.dir = i % 2 === 0 ? 1 : -1; });
  refreshHUD();
}

function loseLife() {
  lives -= 1;
  if (lives <= 0) {
    gameOver();
  } else {
    loadLevel(level);
  }
}

function nextLevel() {
  level += 1;
  if (level < levels.length) {
    loadLevel(level);
  } else {
    winGame();
  }
}

function winGame() {
  gameRunning = false;
  clearInterval(gameLoop);
  clearText();
  addText("YOU WIN!", { x: 4, y: 3, color: color`3` });
  addText(`Rings: ${rings}`, { x: 4, y: 4, color: color`8` });
}

function gameOver() {
  gameRunning = false;
  clearInterval(gameLoop);
  clearText();
  addText("GAME OVER", { x: 3, y: 3, color: color`3` });
  addText("press i to retry", { x: 1, y: 4, color: color`0` });
}

function tick() {
  if (!gameRunning) return;
  const pl = getFirst(player);
  if (!pl) return;

  // gravity
  const belowHasGround = getTile(pl.x, pl.y + 1).some(t => t.type === ground);
  if (!jumping && !belowHasGround && pl.y < height() - 1) {
    pl.y += 1;
  }

  // fell into a pit (reached the bottom row with no ground under it)
  if (pl.y >= height() - 1) {
    loseLife();
    return;
  }

  // enemy patrol — bounce between the map's edges
  getAll(enemy).forEach(en => {
    en.x += en.dir;
    if (en.x <= 0 || en.x >= width() - 1) en.dir *= -1;
  });

  // collisions
  getAll(ring).forEach(rg => {
    if (rg.x === pl.x && rg.y === pl.y) {
      rg.remove();
      rings += 1;
      refreshHUD();
    }
  });

  const hitHazard = getAll(spike).concat(getAll(enemy))
    .some(hz => hz.x === pl.x && hz.y === pl.y);
  if (hitHazard) {
    loseLife();
    return;
  }

  const fl = getFirst(flag);
  if (fl && fl.x === pl.x && fl.y === pl.y) {
    nextLevel();
  }
}

function startGameLoop() {
  gameLoop = setInterval(tick, 200);
}

onInput("a", () => { if (gameRunning) getFirst(player).x -= 1; });
onInput("d", () => { if (gameRunning) getFirst(player).x += 1; });

onInput("w", () => {
  if (!gameRunning) return;
  const pl = getFirst(player);
  if (!pl || jumping) return;
  const grounded = getTile(pl.x, pl.y + 1).some(t => t.type === ground);
  if (!grounded) return;
  jumping = true;
  pl.y -= 1;
  setTimeout(() => { const p = getFirst(player); if (p) p.y -= 1; }, 120);
  setTimeout(() => { jumping = false; }, 260);
});

onInput("i", () => {
  if (gameRunning) return;
  lives = 3;
  rings = 0;
  level = 0;
  jumping = false;
  gameRunning = true;
  loadLevel(level);
  startGameLoop();
});

loadLevel(level);
startGameLoop();
