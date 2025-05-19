/*
@title: Laser Maze+ Fixed Level Maps + Working Lasers
*/

const player = "p";
const wall = "w";
const laserEmitterUp = "u";
const laserEmitterDown = "d";
const laserEmitterLeft = "l";
const laserEmitterRight = "r";
const laserBeam = "b";
const goal = "g";
const background = ".";

setLegend(
  [player, bitmap`
.....000000.....
.....099990.....
.....096690.....
.....099990.....
.....000000.....
......3003......
.33330000003333.
.30000000000003.
.30000000000003.
.33330000003333.
....30000003....
....30000003....
....30033003....
....30033003....
....30033003....
....33333333....`],
  [wall, bitmap`
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
0000000000000000`],
  [laserEmitterUp, bitmap`
................
.......3........
......333.......
.....33.33......
.....3.3.3......
......333.......
.......3........
................
................
................
................
................
................
................
................
................`],
  [laserEmitterDown, bitmap`
................
................
................
................
................
................
................
.......3........
......333.......
.....33.33......
.....3.3.3......
......333.......
.......3........
................
................
................`],
  [laserEmitterLeft, bitmap`
................
................
................
................
................
.......3........
......33........
.....3.3........
....3..3........
.....3.3........
......33........
.......3........
................
................
................
................`],
  [laserEmitterRight, bitmap`
................
................
................
................
................
.......3........
.......33.......
.......3.3......
.......3..3.....
.......3.3......
.......33.......
.......3........
................
................
................
................`],
  [laserBeam, bitmap`
................
................
................
................
................
................
...4444444444...
...4444444444...
................
................
................
................
................
................
................
................`],
  [goal, bitmap`
................
................
......4444......
.....4....4.....
....4......4....
....4......4....
....4.4444.4....
....4.4..4.4....
....4.4..4.4....
....4.4444.4....
....4......4....
.....4....4.....
......4444......
................
................
................`]
);

setSolids([wall, laserBeam]); // <-- laser emitters no longer block movement

let level = 0;
let totalLevelStartTime = 0;
let levelStartTime = 0;
let timerInterval;

const playerStartPositions = [
  { x: 2, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
];

const levelStrings = [
  `
wwwwwwwwwwwwwwww
w..w.ubb.w...gw
w.w.r.w.b.b.w.w
w.w.b.w.b.b.w.w
w..l.b.b.b.b.w.
w..w.b.b.w...w.
w..w.....w...w.
wwwwwwwwwwwwwwww
`,
  `
wwwwwwwwwwwwwwww
w..u.w.b.u.w..w
w.w.b...w.b..w.
w..r.bw.b.gw.w.
w.w.b.d.w.bw.w.
w..d.w.w.b..ww.
w...w.b.......w
wwwwwwwwwwwwwwww
`,
  `
wwwwwwwwwwwwwwww
w...l.b.w..d.b.w
w.w.b.....w.b.w.
w..u.w.b...w..w.
w...u.w.b.r..w.g
w.b.....w.b....w
w.......w.b....w
wwwwwwwwwwwwwwww
`,
  `
wwwwwwwwwwwwwwww
w.r.b...w..l..w.
w.w.b.w.w.b.w..w
w.l.b..ww.d.b.w.
w.w.b.w.w.b..ww.
w...w.b...w.b.w
w.u.b.........bg
wwwwwwwwwwwwwwww
`,
  `
wwwwwwwwwwwwwwww
w.w.r.b.....l..w
w.w.w.b.....w.gw
w...w.bu....w.w.
w.w.w.b.....ww..
w.....d.b..w..w.
w.......w.b...w.
wwwwwwwwwwwwwwww
`
];

const levels = levelStrings.map((str) => {
  const rows = str.trim().split("\n");
  const width = Math.max(...rows.map(r => r.length));
  return map`${rows.map(r => r.padEnd(width, background)).join("\n")}`;
});

function shootLaser(x, y, dx, dy) {
  const mapWidth = levels[level].width;
  const mapHeight = levels[level].height;

  let cx = x;
  let cy = y;

  while (cx >= 0 && cy >= 0 && cx < mapWidth && cy < mapHeight) {
    const tiles = getTile(cx, cy);
    const types = tiles.map(t => t.type);

    if (
      types.includes(wall) ||
      types.includes(laserEmitterUp) ||
      types.includes(laserEmitterDown) ||
      types.includes(laserEmitterLeft) ||
      types.includes(laserEmitterRight)
    ) break;

    if (!types.includes(laserBeam)) {
      const beam = addSprite(cx, cy, laserBeam);
      beam.isStatic = false;
      beam.z = 10;
    }

    cx += dx;
    cy += dy;
  }
}

function fireLasers() {
  getAll(laserBeam).forEach(b => {
    if (!b.isStatic) b.remove();
  });

  const emitters = [
    [laserEmitterUp, 0, -1],
    [laserEmitterDown, 0, 1],
    [laserEmitterLeft, -1, 0],
    [laserEmitterRight, 1, 0],
  ];

  for (const [type, dx, dy] of emitters) {
    getAll(type).forEach(({ x, y }) => {
      shootLaser(x + dx, y + dy, dx, dy);
    });
  }
}

function movePlayer(dx, dy) {
  const p = getFirst(player);
  if (!p) return;

  const nx = p.x + dx;
  const ny = p.y + dy;

  const tiles = getTile(nx, ny);

  // Block only if wall or laser beam
  if (
    tiles.some(t => t.type === wall || t.type === laserBeam)
  ) return;

  // Allow moving on laser emitters

  p.x = nx;
  p.y = ny;

  fireLasers();
  checkPlayerStatus();
}

function checkPlayerStatus() {
  const p = getFirst(player);
  if (!p) return;

  const tiles = getTile(p.x, p.y);
  const types = tiles.map(t => t.type);

  if (types.includes(laserBeam)) {
    clearInterval(timerInterval);
    clearText();
    addText("ZAPPED!", { y: 6, color: color`3` });
    setTimeout(resetLevel, 1500);
    return;
  }

  if (types.includes(goal)) {
    clearInterval(timerInterval);
    clearText();
    addText("GOAL!", { y: 6, color: color`D` });
    setTimeout(() => startLevel(level + 1), 1500);
    return;
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - levelStartTime) / 1000);
  clearText();
  addText(`LEVEL ${level + 1}/${levels.length}`, { y: 0, x: 1, color: color`H` });
  addText(`Time: ${elapsed}s`, { y: 1, x: 1, color: color`1` });
}

function resetLevel() {
  startLevel(level);
}

function startLevel(n) {
  clearInterval(timerInterval);

  if (n >= levels.length) {
    clearText();
    addText(" YOU WON! ", { y: 6, color: color`3` });
    const totalTime = Math.floor((Date.now() - totalLevelStartTime) / 1000);
    addText(`Total Time: ${totalTime}s`, { y: 8, color: color`3` });
    return;
  }

  level = n;
  setMap(levels[level]);

  getAll(laserBeam).forEach(b => b.remove());
  const existingPlayer = getFirst(player);
  if (existingPlayer) existingPlayer.remove();

  const startPos = playerStartPositions[level] || { x: 2, y: 1 };
  addSprite(startPos.x, startPos.y, player);

  if (level === 0) {
    totalLevelStartTime = Date.now();
  }
  levelStartTime = Date.now();

  clearText();
  fireLasers();
  checkPlayerStatus();
  updateTimer();

  timerInterval = setInterval(updateTimer, 1000);
}

onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("s", () => movePlayer(0, 1));
onInput("d", () => movePlayer(1, 0));

startLevel(0);
