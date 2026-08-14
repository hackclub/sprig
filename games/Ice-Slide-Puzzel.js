/*
@title: Ice Slide
@description: Everything on this frozen lake keeps going until it hits something.
Slide around, sweep up every gem, then slip into the door. Snow patches and crates
are the only things that will stop you - learn to park them where you need them.
@author: made with Claude
@tags: ['puzzle']

Controls:
  W A S D - slide (you do NOT stop until something blocks you)
  J       - restart the level
  L       - skip the level (if you get truly stuck)
*/

const player = "p";
const wall = "w";
const crate = "b";
const gem = "g";
const doorShut = "d";
const doorOpen = "o";
const snow = "s";
const ice = "i";

setLegend(
  [ice, bitmap`
2222222222222222
2222222222222222
2277222222222222
2222222222222222
2222222222222227
2222222222222277
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222277222222222
2222222222222222
2222222222222222
7722222222222222
2222222222222222
2222222222222222`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L11111L111111L0
0L11111L111111L0
0L11111L111111L0
0LLLLLLLLLLLLLL0
0L11L111111L11L0
0L11L111111L11L0
0L11L111111L11L0
0L11L111111L11L0
0LLLLLLLLLLLLLL0
0L11111L111111L0
0L11111L111111L0
0L11111L111111L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [snow, bitmap`
................
................
....11111111....
..111111111111..
.11111211111111.
.11111111121111.
1112111111111111
1111111112111111
1111211111111111
1111111111112111
.11111121111111.
.11111111111211.
..111111111111..
....11111111....
................
................`],
  [doorShut, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L033333333330L0
0L033333333330L0
0L000000000000L0
0L033333333330L0
0L033333336630L0
0L033333336630L0
0L033333333330L0
0L000000000000L0
0L033333333330L0
0L033333333330L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [doorOpen, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0DDDDDDDDDD0L0
0L0D44444444D0L0
0L0D46666664D0L0
0L0D46666664D0L0
0L0D46666664D0L0
0L0D46666664D0L0
0L0D46666664D0L0
0L0D46666664D0L0
0L0D44444444D0L0
0L0DDDDDDDDDD0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [gem, bitmap`
................
................
.......55.......
......5775......
.....577775.....
....57722775....
...5772277775...
..577222777775..
..577777777775..
...5777777775...
....57777775....
.....577775.....
......5775......
.......55.......
................
................`],
  [crate, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C0CCCCCCCCCC0C0
0CC0CCCCCCCC0CC0
0CCC0CCCCCC0CCC0
0CCCC0CCCC0CCCC0
0CCCCC0CC0CCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCC0CC0CCCCC0
0CCCC0CCCC0CCCC0
0CCC0CCCCCC0CCC0
0CC0CCCCCCCC0CC0
0C0CCCCCCCCCC0C0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [player, bitmap`
................
.....000000.....
....00000000....
...0000000000...
...0022002200...
...0022002200...
...0000990000...
...0000990000...
..000222222000..
..002222222200..
..002222222200..
..002222222200..
..000222222000..
...0000000000...
....99....99....
....99....99....`]
);

setBackground(ice);

const stepSfx = tune`
50: c4~50,
150`;

const gemSfx = tune`
70: e5~70,
70: b5~70,
300`;

const openSfx = tune`
90: c5~90,
90: e5~90,
90: g5~90,
400`;

const winSfx = tune`
110: c5~110,
110: e5~110,
110: g5~110,
110: c5~110,
600`;

const bumpSfx = tune`
60: c4~60,
200`;

const levels = [
  map`
wwwwwwwwww
w........w
w........w
w.p..g..dw
w........w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
w.p......w
w........w
w.......dw
w..g.....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.......dw
w........w
w.s..g...w
w........w
w........w
w.p......w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
w........w
w.g......w
wb.......w
wp.....d.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w......g.w
w........w
w.d....p.w
wsg..b...w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.p......w
w...g....w
w.......gw
w........w
wbd......w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.g....p.w
w......w.w
w.....d..w
w........w
w......g.w
w.sbs....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w..gsd...w
w....w...w
w........w
w....g..ww
w.b...pwgw
w........w
wwwwwwwwww`
];

let level = 0;
let moves = 0;
let finished = false;

function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < width() && y < height();
}

function tileHas(x, y, type) {
  if (!inBounds(x, y)) return false;
  return getTile(x, y).some(s => s.type === type);
}

function gemsLeft() {
  return getAll(gem).length;
}

function blocksSlide(x, y) {
  if (!inBounds(x, y)) return true;
  if (tileHas(x, y, wall)) return true;
  if (tileHas(x, y, doorShut)) return true; // a shut door is solid
  return false;
}

function openDoorIfReady() {
  if (gemsLeft() > 0) return;
  const d = getFirst(doorShut);
  if (!d) return;
  const dx = d.x, dy = d.y;
  d.remove();
  addSprite(dx, dy, doorOpen);
  playTune(openSfx);
}

// a crate is hit head on: it skids away until something stops it
function skidCrate(cx, cy, dx, dy) {
  const c = getTile(cx, cy).find(s => s.type === crate);
  if (!c) return false;
  let movedAny = false;
  for (let guard = 0; guard < 64; guard++) {
    const nx = c.x + dx, ny = c.y + dy;
    if (blocksSlide(nx, ny)) break;
    if (tileHas(nx, ny, crate)) break;
    if (tileHas(nx, ny, doorOpen)) break;
    if (tileHas(nx, ny, gem)) break; // crates never bury a gem
    c.x = nx;
    c.y = ny;
    movedAny = true;
    if (tileHas(c.x, c.y, snow)) break;
  }
  return movedAny;
}

function slide(dx, dy) {
  if (finished) return;
  const p = getFirst(player);
  if (!p) return;

  let moved = false;
  let reachedDoor = false;

  for (let guard = 0; guard < 64; guard++) {
    const nx = p.x + dx, ny = p.y + dy;
    if (blocksSlide(nx, ny)) break;

    if (tileHas(nx, ny, crate)) {
      if (skidCrate(nx, ny, dx, dy)) moved = true;
      break;
    }

    p.x = nx;
    p.y = ny;
    moved = true;

    const g = getTile(p.x, p.y).find(s => s.type === gem);
    if (g) {
      g.remove();
      playTune(gemSfx);
      openDoorIfReady();
    }

    if (tileHas(p.x, p.y, doorOpen)) { reachedDoor = true; break; }
    if (tileHas(p.x, p.y, snow)) break;
  }

  if (moved) {
    moves += 1;
    if (!reachedDoor) playTune(stepSfx);
  } else {
    playTune(bumpSfx);
  }

  if (reachedDoor) nextLevel();
}

function startLevel(n) {
  level = n;
  moves = 0;
  finished = false;
  setMap(levels[level]);
  openDoorIfReady(); // in case a level ships with no gems
  drawHud();
}

function nextLevel() {
  playTune(winSfx);
  if (level + 1 >= levels.length) {
    finished = true;
    clearText();
    addText("that is all of", { y: 5, color: color`0` });
    addText("the ice!", { y: 6, color: color`0` });
    addText("nicely skated.", { y: 8, color: color`5` });
    return;
  }
  startLevel(level + 1);
}

function drawHud() {
  clearText();
  const g = gemsLeft();
  const label = "lvl " + (level + 1) + "/" + levels.length + "   gems " + g;
  addText(label, { x: 1, y: 15, color: color`2` });
}

onInput("w", () => { slide(0, -1); drawHudSafe(); });
onInput("s", () => { slide(0, 1); drawHudSafe(); });
onInput("a", () => { slide(-1, 0); drawHudSafe(); });
onInput("d", () => { slide(1, 0); drawHudSafe(); });

onInput("j", () => {
  // after the last level this starts the whole lake over again
  startLevel(finished ? 0 : level);
});

onInput("l", () => {
  if (finished) return;
  if (level + 1 >= levels.length) {
    finished = true;
    clearText();
    addText("that is all of", { y: 5, color: color`0` });
    addText("the ice!", { y: 6, color: color`0` });
    return;
  }
  startLevel(level + 1);
});

function drawHudSafe() {
  if (!finished) drawHud();
}

startLevel(0);