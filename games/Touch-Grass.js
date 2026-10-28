// ==========================================
// 🌱 TOUCH GRASS: GUARANTEED OPEN PATHS
// Hack Club Sprig (sprig.hackclub.com)
// ==========================================

// 1. SPRITE BITMAP DEFINITIONS
const player = bitmap`
................
....00000000....
...0777777770...
..077777777770..
..070000000070..
..070..0..0.70..
..070000000070..
..077777777770..
...0777777770...
....00000000....
...070000770....
..070....070....
..070....070....
.0000....0000...
................
................`;

const grass = bitmap`
.3..3...3...3...
333.3.333.333.3.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`;

const wall = bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
0000000000000000
4444444444444444
4444444444444444
4444444444444444
4444444444444444
0000000000000000
4444444444444444
4444444444444444
4444444444444444
4444444444444444
0000000000000000
................`;

const spike = bitmap`
................
.......00.......
......0880......
......0880......
.....088880.....
.....088880.....
....08888880....
....08888880....
...0888888880...
...0888888880...
..088888888880..
..088888888880..
.08888888888880.
.08888888888880.
0000000000000000
................`;

// 2. REGISTER SPRITES
setLegend(
  [ "p", player ],
  [ "g", grass ],
  [ "w", wall ],
  [ "s", spike ]
);

// 3. WIDE OPEN, 100% SOLVABLE LEVEL POOL (Strict 16x16 Rectangles)
const levelPool = [
  // Layout 1: Snake Corridor
  map`
wwwwwwwwwwwwwwww
wp.............w
wwwwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwwwww
w..............w
wwwwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwwwww
w..............w
wwwwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwwwww
w............g.w
wwwwwwwwwwwwwwww
`,
  // Layout 2: Open Rooms with Side Spikes
  map`
wwwwwwwwwwwwwwww
wp...s.........w
w.wwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwww.w
w.s............w
w.wwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwww.w
w.s............w
w.wwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwww.w
w.s..........g.w
wwwwwwwwwwwwwwww
`,
  // Layout 3: Zig-Zag Open Lanes
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwwwwwww.ww
w.w............w
w.w.wwwwwwwwww.w
w.w............w
w.wwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwww.w
w.s..........s.w
w.wwwwwwwwwwww.w
w..............w
w.wwwwwwwwwwww.w
w............g.w
wwwwwwwwwwwwwwww
`,
  // Layout 4: Central Islands
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwww.ww.wwww.w
w.w....s...s...w
w.w.wwww.ww.ww.w
w.w............w
w.w.wwwwwwwwww.w
w.w............w
w.wwwwwwwwwwww.w
w.s............w
w.wwwwwwwwwwww.w
w.w............w
w.wwwwwwwwwwww.w
w............g.w
wwwwwwwwwwwwwwww
`
];

let levelCount = 1;
let currentMapIndex = 0;
let levelQueue = [];

function getNextMapIndex() {
  if (levelQueue.length === 0) {
    let indices = levelPool.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    if (indices[0] === currentMapIndex && indices.length > 1) {
      let temp = indices[0];
      indices[0] = indices[1];
      indices[1] = temp;
    }
    levelQueue = indices;
  }
  return levelQueue.shift();
}

setMap(levelPool[currentMapIndex]);
setSolids(["w"]);

function isSolid(x, y) {
  const tiles = getTile(x, y);
  return tiles.some(t => t.type === "w");
}

// 4. CONTROLS
onInput("a", () => {
  const p = getFirst("p");
  if (p && !isSolid(p.x - 1, p.y)) p.x -= 1;
});

onInput("d", () => {
  const p = getFirst("p");
  if (p && !isSolid(p.x + 1, p.y)) p.x += 1;
});

onInput("w", () => {
  const p = getFirst("p");
  if (p && !isSolid(p.x, p.y - 1)) p.y -= 1;
});

onInput("s", () => {
  const p = getFirst("p");
  if (p && !isSolid(p.x, p.y + 1)) p.y += 1;
});

// 5. GAME LOGIC
afterInput(() => {
  const p = getFirst("p");
  if (!p) return;
  const currentTiles = getTile(p.x, p.y);
  
  if (currentTiles.some(t => t.type === "s")) {
    setMap(levelPool[currentMapIndex]);
    addText("OUCH! SPIKES!", { x: 5, y: 7, color: color`8` });
  }
  
  if (currentTiles.some(t => t.type === "g")) {
    levelCount++;
    currentMapIndex = getNextMapIndex();
    setMap(levelPool[currentMapIndex]);
    addText(`LEVEL ${levelCount}: GRASS!`, { x: 3, y: 7, color: color`3` });
  }
});