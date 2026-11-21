/*
@title: LoopHole
@description: A time-loop puzzle. Walk a route, press J, and an echo of you replays it, holding pads so the door opens while you walk a new route to the exit.
@author: himanshusapkota
@tags: ['puzzle']
@addedOn: 2026-11-19
*/
// WASD move, K wait, J send echo, L restart. The door opens when EVERY pad is held.
setLegend(
  ["p", bitmap`
................
................
....00000000....
....00000000....
....02000020....
....00000000....
....00000000....
.....000000.....
...0000000000...
...0000000000...
...00.0000.00...
......0000......
......00.00.....
......00.00.....
......LL.LL.....
................`],
  ["c", bitmap`
................
................
....55555555....
....55555555....
....52555525....
....55555555....
....55555555....
.....555555.....
...5555555555...
...5555555555...
...55.5555.55...
......5555......
.....5.55.5.....
......5..5......
.....5....5.....
................`],
  ["t", bitmap`
................
..333333333333..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..3LLLLLLLLLL3..
..333333333333..
................`],
  ["d", bitmap`
3333333333333333
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3LL33LL33LL33LL3
3333333333333333`],
  ["e", bitmap`
................
....66666666....
..666666666666..
.6666......6666.
.666........666.
.66..........66.
.66....66....66.
.66...6666...66.
.66...6666...66.
.66....66....66.
.66..........66.
.666........666.
.6666......6666.
..666666666666..
....66666666....
................`],
  ["w", bitmap`
LLLLLLLLLLLLLLLL
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111
L111111111111111`]
);

const buzz = tune`
100: C3~100,`;
const ding = tune`
100: C5~100,
100: G5~100,
100: C6~100,`;

// p you, t pad, d door, e exit. [max echoes, map]. Bottom row is the HUD.
const levels = [
  [1, map`
wwwwwwwwww
w...w...ew
w...w....w
wp.td....w
w...w....w
w...w....w
wwwwwwwwww
wwwwwwwwww`],
  [2, map`
wwwwwwwwww
wt..w....w
w...w..e.w
w.p.d....w
w...w....w
wt..w....w
wwwwwwwwww
wwwwwwwwww`],
  [3, map`
wwwwwwwwww
wt..w....w
w...w..e.w
wtp.d....w
w...w....w
wt..w....w
wwwwwwwwww
wwwwwwwwww`]
];

let lv = 0, steps = 0, sx = 0, sy = 0, px = 0, py = 0, state = "play";
let run = [], paths = [], ex = [], ey = [], doors = [];

const on = (x, y) => (px == x && py == y) || ex.some((v, i) => v == x && ey[i] == y);
const blocked = (x, y) => getTile(x, y).some(s => s.type == "w" || s.type == "d");

// put each echo where it was after t steps (it stays on its last tile)
function echoesAt(t) {
  paths.forEach((p, i) => {
    const q = t == 0 ? { x: sx, y: sy } : p[Math.min(t, p.length) - 1];
    ex[i] = q.x;
    ey[i] = q.y;
  });
}

function updateDoors() {
  const open = getAll("t").every(s => on(s.x, s.y));
  doors.forEach(d => {
    const here = getTile(d.x, d.y).filter(s => s.type == "d");
    if (open) here.forEach(s => s.remove());
    else if (here.length == 0 && !on(d.x, d.y)) addSprite(d.x, d.y, "d");
  });
}

function draw() {
  getAll("p").concat(getAll("c")).forEach(s => s.remove());
  ex.forEach((x, i) => addSprite(x, ey[i], "c"));
  addSprite(px, py, "p");
  clearText();
  addText("ECHOES " + paths.length + "/" + levels[lv][0] + "  J=echo", { x: 1, y: 15 });
}

function startRun() {
  steps = 0;
  run = [];
  px = sx;
  py = sy;
  echoesAt(0);
  updateDoors();
  draw();
}

function load(n) {
  lv = n;
  setMap(levels[n][1]);
  sx = getFirst("p").x;
  sy = getFirst("p").y;
  doors = getAll("d").map(s => ({ x: s.x, y: s.y }));
  paths = [];
  ex = [];
  ey = [];
  state = "play";
  startRun();
}

function step(dx, dy) {
  if (state != "play") return;
  echoesAt(steps + 1);
  updateDoors();
  if ((dx != 0 || dy != 0) && blocked(px + dx, py + dy)) {
    echoesAt(steps); // bumped: undo, no step used
    updateDoors();
    return playTune(buzz);
  }
  px += dx;
  py += dy;
  steps++;
  run.push({ x: px, y: py });
  updateDoors();
  draw();
  if (getTile(px, py).some(s => s.type == "e")) {
    state = "won";
    playTune(ding);
    addText("ROOM CLEARED!", { x: 3, y: 6 });
    setTimeout(() => {
      if (lv < levels.length - 1) return load(lv + 1);
      clearText();
      addText("YOU ESCAPED!", { x: 4, y: 6 });
    }, 900);
  }
}

function sendEcho() {
  if (state != "play" || run.length == 0 || paths.length >= levels[lv][0]) return playTune(buzz);
  paths.push(run);
  ex.push(sx);
  ey.push(sy);
  playTune(ding);
  startRun();
}

function restart() {
  if (state != "play") return;
  paths = [];
  ex = [];
  ey = [];
  startRun();
}

onInput("w", () => step(0, -1));
onInput("s", () => step(0, 1));
onInput("a", () => step(-1, 0));
onInput("d", () => step(1, 0));
onInput("k", () => step(0, 0));
onInput("j", sendEcho);
onInput("l", restart);

load(0);