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
const trap = "t";      // skull trap
const floor = "f";     // disappearing floor
const mover = "m";     // moving spike
const hidden = "h";    // hidden trap
const fakeWall = "x";  // fake wall (looks real, no collision)
const trapWall = "b";  // Looks like a wall, but is a trap.

// --- Artwork & Legend ---
setLegend(
  [player, bitmap`
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
  [goal, bitmap`
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
  [wall, bitmap`
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
  [fakeWall, bitmap`
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
  [trapWall, bitmap`
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
  [spike, bitmap`
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
  [trap, bitmap`
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
  [floor, bitmap`
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
  [mover, bitmap`
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
  [hidden, bitmap`
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
....`,//1
  map`
p..t
.t.t
.t.t
..g.`, //2
  map`
p.tg
..w.
..x.
..w.`, //3
  map`
p...
.w.w
.t.g
x...`, //4
  map`
p.......g
x.xxwxx.x
..w..w..x
..x..x..x
..wxxw..x
..w......
xxxxxxxxx`, //5
  map`
p....wg..
xxxx..xx.
..w....x.
..w.xx.x.
..w.xx.x.
..x....x.
xxxxxxxxx`, //6
  map`
p..x....g
x..x..w.x
x..x..w.x
x..xxx..x
x..w....x
x..xxxxx.
x........`, //7
  map`
pxxxwxxxg
x.......x
x.xxx.x.x
x.x...x.x
x.x.x.x.x
x...w...x
xxxxxxxxx`, //8
  map`
pxxxwxxxg
x...x...x
x.xxx.x.x
x.x..fx.x
xmx.x.x.x
x...w..mx
xxxxxxxxx`, //9
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
wwwwwwwwwwwww.w`, //10
  map`
p.f.f.f.f....
.............
wwwwxwwxwwww.
w...b....w.w.
wwwwwxwwww.w.
w...x....w.w.
wwwwxwwwwwww.
w..tx...tw.w.
wwwwwwwxwwww.
w........w.w.
w.wwwwww.w.w.
w...g.w..w.w.
wwwwwwwwwwww.`, //11
  map`
p.m.x.w.w...w.t.b.g
wwww.wx.w.w.w.w.w.w.w.w
....w.....w.f.w.w.m.w.w
..t.wwwwwwwwwwwwwwwww.w
..m.x...t.......w.w.w.w
wwwwwwwwwwwwwwwwwwwwwww`, //12
  map`
p.w...w...w...w.w.g
.b.w.x.w.b.w.x.w.b.
.w.w.w.w.w.w.w.w.w.
.x.w.t.w.x.w.t.w.x.
.w.w.w.w.w.w.w.w.w.
...x...w...w...w...
.m.w.w.w.m.w.x.x.m.
.w.b.w.x.w.b.w.x.w.
.w.w.w.w.w.w.w.w.w.
.x.w.t.w.x.w.t.w.x.
.w.w.w.w.w.w.w.w.w.
.wwwwwwwwwxxxwwwww.`, //13
  map`
p.t.w.t.w.t.w.t.w..w
..w...w...x...w.w..w
m.w.x.w.b.w.x.w.wm.w
..w...w...w...w.w..w
x.w.t.w.t.w.t.w.tw.w
..x...w...w...w.x..w
m.w.x.w.b.w.x.w.wm.w
..w...w...w...x.w..w
b.w.t.w.t.w.t.w.tw.w
..w...x...w...w.w..w
f.w.x.w.b.w.x.w.wf.w
..w...w...w...w.w..w
..wwwwwwwwwwwwwww..g`, //14
  map`
p.f.f.f.f.f.f.f.f.f..w
.w.w.w.w.w.w.w.w.w.w.w
.x.b.x.b.x.b.x.b.x.b.w
.w.w.w.w.w.w.w.w.w.w.w
.w.w.w.x.w.w.w.w.w.w.w
.w.w.x.w.x.w.w.w.w.w.w
.b.x.b.x.b.x.b.x.b.x.w
.w.w.w.w.x.x.x.x.x.x.w
.w.w.w.x.w.w.w.w.w.w.w
.w.w.w.x.w.w.w.w.w.w.w
wm.m.m.m.m.m.m.m.mm.gw
wwwwwwwwwwwwwwwwwwwwww` //15
];

setMap(levels[level]);

// --- Solids ---
setSolids([player, wall, spike, trap, mover]);

// --- Player Controls ---
onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("j", () => { // Reset game
  level = 0;
  deaths = 0;
  clearText();
  setMap(levels[level]);
});

// --- Game Logic ---
function movePlayer(dx, dy) {
  const p = getFirst(player);
  if (!p) return;

  // Move the player
  p.x += dx;
  p.y += dy;

  const here = getFirst(player);

  // --- Trap Checks ---
  if (tilesWith(player, trap).length > 0 ||
    tilesWith(player, spike).length > 0 ||
    tilesWith(player, mover).length > 0 ||
    tilesWith(player, trapWall).length > 0 ||
    tilesWith(player, hidden).length > 0) {
    deaths++;
    resetLevel();
    return;
  }

  // --- Disappearing Floor ---
  if (tilesWith(player, floor).length > 0) {
    clearTile(here.x, here.y);
    addSprite(here.x, here.y, spike);
    addSprite(here.x, here.y, player);
  }

  // --- Goal Check ---
  if (tilesWith(player, goal).length > 0) {
    level++;
    const nextLevel = levels[level];
    if (nextLevel) {
      setMap(nextLevel);
    } else {
      clearText();
      addText("YOU SURVIVED!", { y: 4, color: color`0` });
      addText(`Total Deaths: ${deaths}`, { y: 6, color: color`C` });
      addText("Press J to restart", { y: 8, color: color`3` });
    }
    return;
  }

  moveSpikes();
}

function resetLevel() {
  setMap(levels[level]);
}

function moveSpikes() {
  const movers = getAll(mover);
  for (const m of movers) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];
    const nx = m.x + dx;
    const ny = m.y + dy;
    
    // Check if the target tile is empty before moving
    if (nx >= 0 && nx < width() && ny >= 0 && ny < height()) {
      const targetTiles = getTile(nx, ny);
      if (targetTiles.length === 0) {
        clearTile(m.x, m.y);
        addSprite(nx, ny, mover);
      }
    }
  }
}
