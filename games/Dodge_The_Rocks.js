/*
@title: Dodge_The_Rocks
@description: Fly through an endless asteroid field. Use the laser and bomb to survive as it speeds up.
@author: 
@tags: ['arcade', 'survival']
@addedOn: 2026-10-02
*/

const ship = "p";
const rock = "r";
const space = "b";

setLegend(
  [ship, bitmap`
.......33.......
.......33.......
......3333......
......3333......
.....333333.....
.....333333.....
....33333333....
...3333333333...
..333333333333..
..33L333333L33..
..33.C3333C.33..
.....CCCCCC.....
......CCCC......
................
................
................`],
  [rock, bitmap`
................
......11........
...1122211111...
..12222221LL11..
.1222LL22221LL1.
.122LLL2222221L.
.11222222221LL1.
..122222LL22L1..
.1L2222222LL211.
.11L222222222L1.
..11LL2222LLL1..
...11LLLLLL11...
.....1111.......
................
................
................`],
  [space, bitmap`
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

setBackground(space);
setSolids([]);

const W = 10;
const H = 8;

setMap(map`
..........
..........
..........
..........
..........
..........
..........
....p.....`);

let score = 0;
let alive = true;
let paused = false;
let ammo = 3;
let bombReady = true;
let nextBomb = 0;
let timer;
let safeX = 4;

function showScore() {
  clearText();
  addText("Score: " + score, { x: 1, y: 0, color: color`3` });
  addText("Ammo:" + ammo + " Bomb:" + (bombReady ? "READY" : "..."), { x: 1, y: 1, color: color`3` });
}

function hitCheck() {
  if (tilesWith(ship, rock).length > 0) {
    alive = false;
    addText("GAME OVER", { x: 5, y: 6, color: color`3` });
    addText("Press J to retry", { x: 2, y: 9, color: color`3` });
  }
}

function spawnRocks() {
  // the safe lane drifts at most one column per row, so it's always reachable
  safeX += Math.floor(Math.random() * 3) - 1;
  safeX = Math.max(0, Math.min(W - 1, safeX));

  const chance = Math.min(0.08 + score / 600, 0.25);
  let count = 0;
  for (let x = 0; x < W; x++) {
    if (x === safeX) continue;
    if (count < 3 && Math.random() < chance) {
      addSprite(x, 0, rock);
      count++;
    }
  }
}

function tick() {
  getAll(rock).forEach((r) => {
    if (r.y >= H - 1) r.remove();
    else r.y += 1;
  });

  hitCheck();
  if (!alive) return;

   if (score % 2 === 0) spawnRocks();
  score++;

  if (score % 20 === 0 && ammo < 3) ammo++;
  if (!bombReady && score >= nextBomb) {
    bombReady = true;
    showScore();
  }
  if (score % 5 === 0) showScore();
}

function loop() {
  if (paused) return;
  tick();
  if (alive) {
    timer = setTimeout(loop, Math.max(200, 550 - score * 3));
  }
}

function move(dx, dy) {
  if (!alive || paused) return;
  const s = getFirst(ship);
  const nx = s.x + dx;
  const ny = s.y + dy;
  if (nx >= 0 && nx < W) s.x = nx;
  if (ny >= H - 3 && ny < H) s.y = ny;
  hitCheck();
}

function shoot() {
  if (!alive || paused || ammo <= 0) return;
  const s = getFirst(ship);
  const targets = getAll(rock).filter((r) => r.x === s.x && r.y < s.y);
  if (targets.length === 0) return;
  targets.sort((a, b) => b.y - a.y)[0].remove();
  ammo--;
  showScore();
}

function bomb() {
  if (!alive || paused || !bombReady) return;
  getAll(rock).forEach((r) => r.remove());
  bombReady = false;
  nextBomb = score + 60;
  showScore();
}

function togglePause() {
  if (!alive) return;
  paused = !paused;
  if (paused) {
    clearTimeout(timer);
    addText("PAUSED", { x: 7, y: 6, color: color`3` });
  } else {
    showScore();
    loop();
  }
}

function restart() {
  getAll(rock).forEach((r) => r.remove());
  const s = getFirst(ship);
  s.x = 4;
  s.y = H - 1;
  score = 0;
  ammo = 3;
  bombReady = true;
  nextBomb = 0;
  paused = false;
  alive = true;
  safeX = 4;
  showScore();
  loop();
}

// Left pad: move the ship
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));
onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));

// Right pad: actions
onInput("j", () => { if (alive) shoot(); else restart(); });
onInput("k", () => bomb());
onInput("i", () => togglePause());

showScore();
loop();