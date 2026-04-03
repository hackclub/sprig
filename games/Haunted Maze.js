const G = "g";
const E = "e";
const W = "w";
const S = "s";

setLegend(
  [G, bitmap`
................
................
....7777777.....
...777777777....
..77F7777F777...
..77777777777...
..77.......77...
..77777777777...
...777777777....
....7777777.....
....77...77.....
...77.....77....
..77.......77...
................
................
................`],
  [E, bitmap`
5555555555555555
5555555555555555
5566666666666655
5566666666666655
5566500000566655
5566500000566655
5566500000566655
556650LLLL566655
556650LLLL566655
5566500000566655
5566566665566655
5566566665566655
5566666666666655
5555555555555555
5555555555555555
5555555555555555`],
  [W, bitmap`
1111111111111111
1111111111111111
1122222222222211
1122222222222211
1122111111122211
1122111111122211
1122111111122211
1122111111122211
1122111111122211
1122111111122211
1122222222222211
1122222222222211
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [S, bitmap`
................
...LLLLLLLL.....
..LL0LLLL0LL....
..LLLLLLLLLL....
...LLLLLLLL.....
...LLLLLLLL.....
..LLLLLLLLLL....
.LL..LLLL..LL...
.LL..LLLL..LL...
..LL..LL..LL....
...LL....LL.....
...LL....LL.....
..LLL....LLL....
................
................
................`]
);

setSolids([W, G, S]);

const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w.wwwwwwwwwwww.w
w.w............w
w.w.wwwwwwwwww.w
w.w.w..........w
w.w.w.wwwwwwww.w
w.w.w.w........w
w.w.w.w.wwwwww.w
w.w.w.w.w......w
w.w.w.w.w.wwwwww
w.g.w.w.w......w
w.www.w.wwwwww.w
w.....w.......sw
wwwwwwwwwwwwwwew`,

  map`
wwwwwwwwwwwwwwww
w.e............w
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
w.g...........sw
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w..............w
w.wwwwwwwwwwww.w
w.w..........w.w
w.w.wwwwwwww.w.w
w.w.w......w.w.w
w.w.w.wwww.w.w.w
w.w.w.w..w.w.w.w
w.w.w.w.ww.w.w.w
w.w.w.w....w.w.w
w.w.w.wwwwww.w.w
w.g.w........w.w
w.www.wwwwwwww.w
wew...........sw
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w..............w
w.wwwwwwwwwwww.w
w.w..........w.w
w.w.wwwwwwww.w.w
w.w.w......w.w.w
w.w.w.wwww.w.w.w
w.w.w.w..w.w.w.w
w.w.w.w.ww.w.w.w
w.w.w.w....w.w.w
w.w.w.wwwwww.w.w
w.w.w........w.w
w.g.wwwwwwwwww.w
wew..........s.w
wwwwwwwwwwwwwwww`
];

let level = 0;
let moveCount = 0;
let dead = false;

function loadLevel(n) {
  moveCount = 0;
  dead = false;
  setMap(levels[n]);
  updateHUD();
  startInterval();
}

function updateHUD() {
  clearText();
  addText(`L${level + 1}`, { x: 0, y: 0, color: color`7` });
  addText(`${moveCount}`, { x: 13, y: 0, color: color`7` });
}

function isWall(x, y) {
  return tilesWith(W, {x: x, y: y}).length > 0;
}

function moveSkeleton() {
  const skeleton = getFirst(S);
  const ghost = getFirst(G);
  if (!skeleton || !ghost) return;

  const sx = skeleton.x;
  const sy = skeleton.y;
  const gx = ghost.x;
  const gy = ghost.y;
  if (sx === gx && sy === gy) return;

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const queue = [[sx, sy]];
  const prev = {};
  prev[sx + "," + sy] = null;

  for (let qi = 0; qi < queue.length; qi++) {
    const cx = queue[qi][0];
    const cy = queue[qi][1];
    if (cx === gx && cy === gy) break;
    for (let di = 0; di < 4; di++) {
      const nx = cx + dirs[di][0];
      const ny = cy + dirs[di][1];
      const key = nx + "," + ny;
      if (prev[key] !== undefined) continue;
      if (isWall(nx, ny)) continue;
      prev[key] = [cx, cy];
      queue.push([nx, ny]);
    }
  }

  if (prev[gx + "," + gy] === undefined) return;

  // Walk back from goal to skeleton, collecting the path
  const path = [];
  let cur = [gx, gy];
  while (cur !== null) {
    path.push(cur);
    cur = prev[cur[0] + "," + cur[1]];
  }
  // path is [goal, ..., firstStepAfterSkeleton, skeletonPos]
  // The next step for skeleton is path[path.length - 2]
  if (path.length >= 2) {
    const next = path[path.length - 2];
    skeleton.x = next[0];
    skeleton.y = next[1];
  }
}

onInput("w", () => { if (!dead) { getFirst(G).y -= 1; moveCount++; updateHUD(); } });
onInput("s", () => { if (!dead) { getFirst(G).y += 1; moveCount++; updateHUD(); } });
onInput("a", () => { if (!dead) { getFirst(G).x -= 1; moveCount++; updateHUD(); } });
onInput("d", () => { if (!dead) { getFirst(G).x += 1; moveCount++; updateHUD(); } });
onInput("i", () => loadLevel(level));

const speeds = [700, 500, 380, 280];
let intervalId = null;

function startInterval() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (dead) return;
    moveSkeleton();
    const ghost = getFirst(G);
    const skeleton = getFirst(S);
    if (skeleton && ghost && ghost.x === skeleton.x && ghost.y === skeleton.y) {
      dead = true;
      clearText();
      addText("CAUGHT!", { x: 3, y: 3, color: color`2` });
      addText("press i", { x: 3, y: 4, color: color`L` });
    }
  }, speeds[level] || 280);
}

afterInput(() => {
  if (dead) return;
  const ghost = getFirst(G);
  const exit = getFirst(E);
  const skeleton = getFirst(S);
  if (!ghost) return;

  if (skeleton && ghost.x === skeleton.x && ghost.y === skeleton.y) {
    dead = true;
    clearText();
    addText("CAUGHT!", { x: 3, y: 3, color: color`2` });
    addText("press i", { x: 3, y: 4, color: color`L` });
    return;
  }

  if (exit && ghost.x === exit.x && ghost.y === exit.y) {
    dead = true;
    clearText();
    addText("ESCAPED!", { x: 2, y: 3, color: color`4` });
    setTimeout(() => {
      level++;
      dead = false;
      if (level >= levels.length) {
        level = 0;
        dead = true;
        clearText();
        addText("YOU WIN!", { x: 2, y: 3, color: color`4` });
        addText("Aight thats it", { x: 2, y: 4, color: color`L` });
      } else {
        loadLevel(level);
      }
    }, 1200);
  }
});

loadLevel(level);