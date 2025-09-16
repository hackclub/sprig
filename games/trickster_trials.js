/*
@title: trickster_trials
@description: Hard troll puzzle game full of traps, disappearing floors, moving spikes, and fake walls!
@author: Yax
@tags: ['troll', 'puzzle', 'trap']
@addedOn: 2025-08-24
*/

// --- Sprite Definitions ---
const player = "p";
const goal = "g";
const wall = "w";
const spike = "s";
const trap = "t";     // skull trap
const floor = "f";    // disappearing floor
const mover = "m";    // moving spike
const hidden = "h";   // hidden trap
const fakeWall = "x"; // fake wall (looks real, no collision)

// --- Artwork & Legend ---
setLegend(
  [ player, bitmap`
................
................
.......C.C......
.......CCC......
......CCCCC.....
.....CCCCCCC....
.......C.C......
......C...C.....
.....C.....C....
....C.......C...
...C.........C..
..C...........C.
.C.............C
................
................
................`],
  [ goal, bitmap`
................
....LLLLLLLL....
...LLLLLLLLLL...
...LCCCCCCCCL...
....LCCCCCCL....
.....LCCCCL.....
......LCCL......
......LCCL......
......LCCL......
......LCCL......
....LLCCCCLL....
...LLLLLLLLLL...
..LLLLLLLLLLLL..
................
................
................`],
  [ wall, bitmap`
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000`],
  [ fakeWall, bitmap`
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000
00000000DDDDDDDD
00000000DDDDDDDD
DDDDDDDD00000000
DDDDDDDD00000000`],
  [ spike, bitmap`
................
................
................
................
................
................
................
................
................
.......2........
......222.......
.....22222......
....2222222.....
...222222222....
..22222222222...
.2222222222222..`],
  [ trap, bitmap`
................
.....CCCCCC.....
...CCCCCCCCCC...
..CCC.CCC.CCC...
..CC..CCC..CC...
..CCCCCCCCCCC...
..C.C.C.C.C.C...
..C.C.C.C.C.C...
..CCCCCCCCCCC...
...C.......C....
....C.....C.....
.....CCCCC......
................
................
................
................`],
  [ floor, bitmap`
DDDDDDDDDDDDDDDD
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
D.D.D.D.D.D.D.D.
DDDDDDDDDDDDDDDD`],
  [ mover, bitmap`
................
.......2........
......222.......
.....22222......
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
................
................
................
................`],
  [ hidden, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
);

// --- Game State ---
let level = 0;
let deaths = 0;

// --- Level Maps ---
const levels = [
  map`
p..g
....
....
....`,
  map`
p..t
.t.t
.t.t
..g.`,
  map`
p.tg
..w.
..x.
..w.`,
  map`
p...
.w.w
.t.g
x...`,
  map`
p.......g
x.xxwxx.x
..w..w..x
..x..x..x
..wxxw..x
..w......
xxxxxxxxx`,
  map`
p....wg..
xxxx..xx.
..w....x.
..w.xx.x.
..w.xx.x.
..x....x.
xxxxxxxxx`,
  map`
p..x....g
x..x..w.x
x..x..w.x
x..xxx..x
x..w....x
x..xxxxx.
x........`,
  map`
pxxxwxxxg
x.......x
x.xxx.x.x
x.x...x.x
x.x.x.x.x
x...w...x
xxxxxxxxx`,
  map`
pxxxwxxxg
x...x...x
x.xxx.x.x
x.x..fx.x
xmx.x.x.x
x...w..mx
xxxxxxxxx`,
  // --- NEW LEVELS START HERE ---
  map`
p.m.w.m.g
.w..w..w.
.m.ww.m..
.w..w..w.
.........
.t.t.t.t.
xxxxxxxxx`,
  map`
p.f.f.f.g
.h.h.h.h.
.f.f.f.f.
.h.h.h.h.
.f.f.f.f.
.h.h.h.h.
.........`,
  map`
p.w...w.g
..w.x.w..
m.w.w.w.m
..w.w.w..
x...f...x
..w.w.w..
m.w.w.w.m
..w.x.w..
..w...w..`,
  map`
p.x.m.w.g
w.m.w.w.w
w.f.m.x.w
w.w.x.w.w
m...x.h.m
w.w.w.w.w
w.x.f.x.w
w.m.w.m.w
xxxxxxxxx`
];

setMap(levels[level]);
setSolids([player, wall, spike, trap, mover]);

// --- Player Controls ---
onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("j", () => { // Reset game
  if (level >= levels.length) {
    level = 0;
    deaths = 0;
    clearText();
    setMap(levels[level]);
  } else {
    resetLevel();
  }
});

// --- Game Logic ---
function movePlayer(dx, dy) {
  const p = getFirst(player);
  if (!p) return;

  const nx = p.x + dx;
  const ny = p.y + dy;
  if (nx < 0 || ny < 0 || nx >= width() || ny >= height()) return;

  p.x = nx;
  p.y = ny;

  // Check for disappearing floor
  if (tilesWith(player, floor).length > 0) {
    const here = getFirst(player);
    clearTile(here.x, here.y);
    addSprite(here.x, here.y, spike); // Leave a spike behind
    addSprite(here.x, here.y, player);
  }

  // Check for traps
  if (tilesWith(player, hidden).length > 0 || tilesWith(player, trap).length > 0 || tilesWith(player, spike).length > 0 || tilesWith(player, mover).length > 0) {
    deaths++;
    resetLevel();
    return;
  }

  // Check for goal
  if (tilesWith(player, goal).length > 0) {
    level++;
    const next = levels[level];
    if (next) {
      clearText();
      setMap(next);
    } else {
      // Game Win Condition
      clearText();
      addText("YOU SURVIVED!", { y: 4, color: color`L` });
      addText(`Total Deaths: ${deaths}`, { y: 6, color: color`C` });
      addText("Press J to restart", { y: 8, color: color`2` });
    }
  }

  moveSpikes();
}

function resetLevel() {
  clearText();
  setMap(levels[level]);
}

function moveSpikes() {
  const movers = getAll(mover);
  for (const m of movers) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
    const nx = m.x + dx;
    const ny = m.y + dy;
    if (nx >= 0 && nx < width() && ny >= 0 && ny < height()) {
      if (getTile(nx, ny).length === 0) { // Can only move to empty tiles
        clearTile(m.x, m.y);
        addSprite(nx, ny, mover);
      }
    }
  }
}
