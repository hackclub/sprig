
/*
@title: Haunted-Maze
@author: Savit Arora (Slack: SomeRandom Guy)
@description: You are in a haunted mansion your goal is too escape without being killed by the ghost chasing you through the maps 
@tags: ['maze', 'puzzle']
@addedOn: 2026-03-22
*/


const G = "g";
const E = "e";
const W = "w";
const S = "s";
const B = "b";
const D = "d";

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
................`],
  [B, bitmap`
................
................
....3333333.....
...333333333....
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...333333333....
....3333333.....
.....33333......
......333.......
................
................
................
................`],
  [D, bitmap`
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
5555555555555555`]
);

setSolids([W, G, S, B]);

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
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wg.............w
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
w.www.wwwwwwww.w
wew....d.....sw.
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.............gw
w.wwwwwwwwwwww.w
w.w..........w.w
w.w.wwwwwwww.w.w
w.w.w......w.w.w
w.w.w.wwww.w.w.w
w.w.w.w..w.w.w.w
w.w.w.w.ww.w.w.w
w.w.w.w....w.w.w
w.w.w.wwwwww.w.w
w.w.w....s...w.w
w.www.wwwwwwww.w
wed..........s.w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.............gw
w.wwwwwwwwwwww.w
w.w....s.....w.w
w.w.wwwwwwww.w.w
w.w.w......w.w.w
w.w.w.wwww.w.w.w
w.w.w.w..w.w.w.w
w.w.w.w.ww.w.w.w
w.w.w.w....w.w.w
w.w.w.wwwwww.w.w
w.w.w...s....w.w
w.www.wwwwwwww.w
wed..........s.w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.............gw
w.wwwwwwwwwwww.w
w.w..........w.w
w.w.wwwwwwww.w.w
w.w.w......w.w.w
w.w.w.wwww.w.w.w
w.w.w.w..w.w.w.w
w.w.w.w.ww.w.w.w
w.w.w.w....w.w.w
w.w.w.wwwwww.w.w
w.w.w....b...w.w
w.www.wwwwwwww.w
wed...........w.
wwwwwwwwwwwwwwww`
];

let level = 0;
let moveCount = 0;
let dead = false;
let bossFastToggle = false;

function loadLevel(n) {
  moveCount = 0;
  dead = false;
  bossFastToggle = false;
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
  return tilesWith(W, { x, y }).length > 0;
}

function bfsMove(enemy, ignoreWalls, steps) {
  const ghost = getFirst(G);
  if (!enemy || !ghost) return;

  const sx = enemy.x, sy = enemy.y;
  const gx = ghost.x, gy = ghost.y;
  if (sx === gx && sy === gy) return;

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const queue = [[sx, sy]];
  const prev = {};
  prev[sx + "," + sy] = null;

  for (let i = 0; i < queue.length; i++) {
    const cx = queue[i][0], cy = queue[i][1];
    if (cx === gx && cy === gy) break;
    for (let d = 0; d < 4; d++) {
      const nx = cx + dirs[d][0];
      const ny = cy + dirs[d][1];
      const key = nx + "," + ny;
      if (prev[key] !== undefined) continue;
      if (!ignoreWalls && isWall(nx, ny)) continue;
      prev[key] = [cx, cy];
      queue.push([nx, ny]);
    }
  }

  if (prev[gx + "," + gy] === undefined) return;

  const path = [];
  let cur = [gx, gy];
  while (cur !== null) {
    path.push(cur);
    cur = prev[cur[0] + "," + cur[1]];
  }

  const target = path[Math.max(0, path.length - 1 - steps)];
  if (target) {
    enemy.x = target[0];
    enemy.y = target[1];
  }
}

function moveEnemies() {
  const enemies = getAll(S);
  const bosses = getAll(B);
  enemies.forEach(e => bfsMove(e, false, 1));
  bossFastToggle = !bossFastToggle;
  const bossSteps = bossFastToggle ? 3 : 2;
  bosses.forEach(b => bfsMove(b, true, bossSteps));
}

function checkDeath() {
  const g = getFirst(G);
  if (!g) return;
  const enemies = getAll(S).concat(getAll(B));
  for (let i = 0; i < enemies.length; i++) {
    const e = enemies[i];
    if (e.x === g.x && e.y === g.y) {
      dead = true;
      clearText();
      addText("CAUGHT!", { x: 3, y: 3, color: color`2` });
      addText("press i", { x: 3, y: 4, color: color`L` });
      return;
    }
  }
}

onInput("w", () => { if (!dead) { getFirst(G).y--; moveCount++; updateHUD(); checkDeath(); } });
onInput("s", () => { if (!dead) { getFirst(G).y++; moveCount++; updateHUD(); checkDeath(); } });
onInput("a", () => { if (!dead) { getFirst(G).x--; moveCount++; updateHUD(); checkDeath(); } });
onInput("d", () => { if (!dead) { getFirst(G).x++; moveCount++; updateHUD(); checkDeath(); } });
onInput("i", () => loadLevel(level));

const speeds = [700, 520, 400, 320, 260, 220, 180, 160];
let intervalId = null;

function startInterval() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (dead) return;
    moveEnemies();
    checkDeath();
  }, speeds[level] || 160);
}

afterInput(() => {
  if (dead) return;
  const ghost = getFirst(G);
  const exit = getFirst(E);
  if (!ghost || !exit) return;
  if (ghost.x === exit.x && ghost.y === exit.y) {
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
        addText("YOU WIN!", { x: 3, y: 3, color: color`4` });
        addText("Aight good job thats it", { x: 2, y: 4, color: color`4` });
      } else {
        loadLevel(level);
      }
    }, 250);
  }
});

loadLevel(level);
