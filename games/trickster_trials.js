/*
@title: trickster_trials
@description: A rage-platformer where walls may betray you — some tiles are fake, some are solid walls, and the player must survive tricky levels to reach the goal.
@author: Yax
@tags: ['troll', 'puzzle', 'trap', 'rage']
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
const trapWall = "b"; // --- NEW --- Looks like a wall, but is a trap.

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
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL
CCCCLCCCCLCCCCLC
CCCCLCCCCLCCCCLC
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL
CCCCLCCCCLCCCCLC
CCCCLCCCCLCCCCLC
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL`],
  [ fakeWall, bitmap`
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL
CCCCLCCCCLCCCCLC
CCCCLCCCCLCCCCLC
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL
CCCCLCCCCLCCCCLC
CCCCLCCCCLCCCCLC
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL`],
  // --- NEW --- Trap Wall sprite, looks identical to the others.
  [ trapWall, bitmap`
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL
CCCCLCCCCLCCCCLC
CCCCLCCCCLCCCCLC
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL
CCCCLCCCCLCCCCLC
CCCCLCCCCLCCCCLC
LLLLLLLLLLLLLLLL
LCCCCLCCCCLCCCCL
LCCCCLCCCCLCCCCL
LLLLLLLLLLLLLLLL`],
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
  // --- NEW, LARGER & MORE COMPLEX LEVELS ---
  map`
p.x.wwwwwwwww.g
w.w.w.x.w...w.w
w.w.x.w.w.w.w.w
w.w.w.w.w.w.w.w
w...w.x.w...x.w
wwwwwww.w.wwwww
w.t.x.w.w.w...w
w.w.w.w.x.w.w.w
w...w.w...w.x.w
wwwwwwwwwwwww.w`,
  // --- UPDATED with trap wall 'b' ---
  map`
p.f.f.f.f...
............
wwwwxwxwwwww
w...b....w.w
wwwwwxwwww.w
w...x....w.w
wwwwxwwwwwww
w..tx...tw.w
wwwwwwwxwwww
w........w.w
w.wwwwww.w.w
w...g....w.w
wwwwwwwwwwww`,
  // --- UPDATED with trap wall 'b' ---
  map`
p.m...x.w.w...w...t.b.g
wwww.wx.w.w.w.w.w.w.w.w
....w.....w.f.w.w.m.w.w
..t.wwwwwwwwwwwwwwwww.w
..m.x...t...............w
wwwwwwwwwwwwwwwwwwwwwww`
, map`
p.w...w...w...w.w.g
.b.w.x.w.b.w.x.w.b.
.w.w.w.w.w.w.w.w.w.
.x.w.t.w.x.w.t.w.x.
.w.w.w.w.w.w.w.w.w.
...f...f...f...f...
.m.w.w.w.m.w.w.w.m.
.w.b.w.x.w.b.w.x.w.
.w.w.w.w.w.w.w.w.w.
.x.w.t.w.x.w.t.w.x.
.w.w.w.w.w.w.w.w.w.
...................`,
  map`
p.t.w.t.w.t.w.t.wddw
..w...w...w...w.w..w
m.w.x.w.b.w.x.w.wm.w
..w...w...w...w.w..w
x.w.t.w.t.w.t.w.tw.w
..w...w...w...w.w..w
m.w.x.w.b.w.x.w.wm.w
..w...w...w...w.w..w
b.w.t.w.t.w.t.w.tw.w
..w...w...w...w.w..w
f.w.x.w.b.w.x.w.wf.w
..w...w...w...w.w..w
k..................g`,
  map`
p.f.f.f.f.f.f.f.f.f.e
.w.w.w.w.w.w.w.w.w.w.
.x.b.x.b.x.b.x.b.x.b.
.w.w.w.w.w.w.w.w.w.w.
.f.f.f.f.f.f.f.f.f.f.
.w.w.w.w.w.w.w.w.w.w.
.b.x.b.x.b.x.b.x.b.x.
.w.w.w.w.w.w.w.w.w.w.
.f.f.f.f.f.f.f.f.f.f.
.w.w.w.w.w.w.w.w.w.w.
...................g.
.m.m.m.m.m.m.m.m.m.m.`
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

  // Check for traps (and the new trap wall)
  // --- UPDATED --- condition now includes trapWall
  if (tilesWith(player, hidden).length > 0
   || tilesWith(player, trap).length > 0
   || tilesWith(player, spike).length > 0
   || tilesWith(player, mover).length > 0
   || tilesWith(player, trapWall).length > 0) {
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
