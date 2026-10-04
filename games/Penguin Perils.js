/*
@title: Penguin Perils
@description: Hop the penguin across the perils and reach the green flag
@author: Me, Matt Jay, AKA Penguin-Man-OH on Scratch, https://scratch.mit.edu/projects/976420328
@tags: [platformer, penguin]
@addedOn: 2026-10-03
*/

setLegend(
  ["p", bitmap`
................
................
......0000......
.....000000.....
.....010010.....
.....009900.....
....0022200.....
....00022000....
...0002222000...
..00022222200...
..00222222220...
..00222222220...
...002222220....
....00000000....
.....090.090....
................`],
  ["q", bitmap`
................
................
......0000......
.....000000.....
.....010010.....
.....009900.....
.....0022000....
....00022000....
...0002222000...
...00222222000..
...02222222200..
...02222222200..
....022222200...
....00000000....
....090.090.....
................`],
  ["o", bitmap`
...........0....
....00.....00...
....00...00000..
....00.000222000
....00002222200.
....00022222200.
....0222222220..
...00202220220..
..002220202220..
..023222022320..
..02222222222000
..022L2222L20000
..0022LLLL200...
...000000000....
................
................`],
  ["u", bitmap`
................
.......H........
...H..HHH..H....
....H.HHH.H.....
.....H0H0H......
...HHHH0HHHH....
..HHHHHHHHHHH...
.HHHHH0H0HHHHH..
..HHHHHHHHHHH...
...HH0HHH0HH....
.....H000H......
....H.HHH.H.....
...H..HHH..H....
.......H........
................
................`],
  ["f", bitmap`
..DDDD...DDDD...
DDDDDDDDDDDDD...
DDDDDDDDDDDDDD..
DDDDDDDDDDDDDD..
DDDDDDDDDDDDDD..
DDDDDDDDDDDDDD..
DDDDDDDDDDDDDD..
DDD..DDDDD..DD..
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............`],
  ["w", bitmap`
0000000000002000
0000000000000000
0020020000000000
0000000000000000
0000000002000200
0020000000000000
0000200200200000
0000000000000000
0020000000000000
0000000000002000
0000200000000000
0000000020000000
0000000000000000
0020000000000000
0000000000000200
0000000000200000`],
  ["h", bitmap`
3333333333333333
3333933333933333
3933333333333933
3333333933333333
3333393333333393
9339333339393333
3333339333333333
3339333393333933
3333339333933333
3333339333333339
3393333393339333
3333333333933333
3393993333333333
3333333339333333
3339333333339333
3333339333333333`],
  ["b", bitmap`
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

const levels = [
  map`
................
................
................
................
................
................
...............f
................
................
www...........w.
...w............
.............w..
.....w.w.w.w....
................
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh`,
  map`
...............f
................
..............w.
......w.w.w.w...
...w.w..........
.w..............
................
..w....w....w...
....w....w....w.
..............w.
.............w..
.............w..
............w...
...h..h..h..w...
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
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
...............f
...............w
www.www.www.w.w.
................
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
`,
  map`
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
...h...h...h...f
www.www.www.www.
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
`,
  map`
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
..............f.
................
...h..h.h.h.h..w
wwwhwwhwhwhwhwhw
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
`,
  map`
...............o
................
................
................
................
.............f..
.............ww.
...........wwww.
.........wwwwww.
.......wwwwwwww.
..h..wwwwwwwwww.
wwwwwwwwwwwwwww.
www.............
................
hhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhh
`,
  map`
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbpbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb`
];

setSolids(["p", "q", "w", "b"]);

const BOSS = 5;
const END = 6;
let level = 0;
let facing = "p";
let started = true;
let won = false;
const JUMP = 2;
const TICK = 45;
const HANG = 2; // ticks of float at the top of the arc
let jumpLeft = 0;
let hang = 0;

function player() {
  return getFirst(facing) || getFirst("p") || getFirst("q");
}

function tileIs(x, y, list) {
  const t = getTile(x, y);
  if (!t) return false;
  for (let i = 0; i < t.length; i++)
    for (let j = 0; j < list.length; j++)
      if (t[i].type === list[j]) return true;
  return false;
}

function standing(s) {
  return tileIs(s.x, s.y + 1, ["w", "b"]);
}

function freeSpot() {
  for (let x = 0; x < width(); x++)
    for (let y = 0; y < height(); y++)
      if (getTile(x, y).length === 0) return { x: x, y: y };
  return { x: 1, y: 1 };
}

function startLevel(n) {
  level = n;
  setMap(levels[level]);
  facing = "p";
  jumpLeft = 0;
  hang = 0;
  clearText();
  if (level === END) {
    started = false;
    addText("The End", { x: 6, y: 6, color: color`2` });
    addText("S to restart", { x: 3, y: 9, color: color`2` });
    return;
  }
  started = true;
  const s = freeSpot();
  addSprite(s.x, s.y, "p");
  if (level === 0) {
    addText("Penguin Perils", { x: 2, y: 1, color: color`0` });
    addText("Press S to", { x: 2, y: 3, color: color`0` });
    addText("rstrt any level", { x: 2, y: 5, color: color`0` });
  }
  if (level === BOSS) {
    addText("I don't like", { x: 2, y: 0, color: color`3` });
    addText("penguins.", { x: 2, y: 1, color: color`3` });
    addText("get urchined", { x: 2, y: 2, color: color`3` });
    addText("- orca", { x: 2, y: 3, color: color`3` });
  }
}

// returns true if this call restarted / advanced the level, so callers must
// drop any sprite reference they were holding (setMap invalidates them)
function check() {
  const s = player();
  if (!s) return false;
  if (tileIs(s.x, s.y, ["h", "o", "u"])) { startLevel(level); return true; }
  if (tileIs(s.x, s.y, ["f"])) {
    startLevel(level === BOSS ? END : level + 1);
    return true;
  }
  return false;
}

function walk(dir) {
  if (!started) return;
  let s = player();
  if (!s) return;
  const want = dir < 0 ? "q" : "p";
  if (facing !== want) { s.type = want;
    facing = want; }
  s = player();
  if (!s) return;
  s.x += dir;
  check();
}

function fire() {
  if (level !== BOSS) return;
  const o = getFirst("o");
  if (!o) return;
  if (o.y + 1 >= height()) return;
  addSprite(o.x, o.y + 1, "u");
}

function moveShots() {
  const shots = getAll("u");
  for (let i = 0; i < shots.length; i++) {
    const s = shots[i];
    s.x -= 1;
    s.y += 1;
    if (s.x < 0 || s.y >= height()) s.remove();
  }
}

function gravity() {
  if (!started) return;
  if (check()) return;
  const s = player();
  if (!s) return;
  if (jumpLeft > 0) {
    const was = s.y;
    s.y -= 1;
    if (s.y === was) { jumpLeft = 0;
      hang = HANG; } else { jumpLeft -= 1; if (jumpLeft === 0) hang = HANG; }
  } else if (hang > 0) {
    hang -= 1;
  } else {
    s.y += 1;
  }
  moveShots();
  check();
}

onInput("s", () => {
  if (level === END) { won = false;
    startLevel(0); return; }
  startLevel(level);
});

onInput("w", () => {
  if (!started) return;
  const s = player();
  if (s && jumpLeft === 0 && hang === 0 && standing(s)) { jumpLeft = JUMP;
    hang = 0; }
});

onInput("a", () => walk(-1));
onInput("d", () => walk(1));

startLevel(0);
setInterval(gravity, TICK);
setInterval(fire, 900);