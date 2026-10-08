/*
@title: Railyard Dispatcher
@author: thisisnaman
@description: Route speeding color-coded trains to matching depots by flipping junction arrows. 3 levels, 3 HP, real-time.
@tags: ['strategy', 'puzzle', 'real-time']
@addedOn: 2026-10-08
*/

// RAILYARD DISPATCHER
//
// HOW TO PLAY (paste into https://sprig.hackclub.com/ -> New Game -> RUN):
// You are the dispatcher. Trains roll in from the top portals.
// Flip the YELLOW arrow junctions to steer each train to its color station:
//   RED train -> RED station | BLUE train -> BLUE station | YELLOW train -> YELLOW station
// - WASD: HOP the green cursor between yellow arrows (fast!)
// - I or J: rotate the arrow under the cursor (up -> right -> down -> left)
// - K: pause / resume. L: restart the whole run.
// Deliver the quota to advance. 3 crashes (derail / wrong station / collision) = game over.
// Default arrows point DOWN, so each train dives straight for the depot
// below it - right depot delivers, wrong depot crashes. Flip arrows to reroute!

const W = "w";
const T = "t";
const UP = "u";
const DN = "d";
const LF = "l";
const RT = "r";
const SP = "s";
const STA_R = "a";
const STA_B = "b";
const STA_Y = "c";
const TRN_R = "R";
const TRN_E = "E";
const TRN_Y = "Y";
const CUR = "p";
const BLK = "x";

setLegend(
  [CUR, bitmap`
4444444444444444
4444444444444444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
444..........444
4444444444444444
4444444444444444`],
  [TRN_R, bitmap`
................
.22222222222222.
.23333333333332.
.23222222222232.
.23222222222232.
.23333333333332.
.23333333333332.
.23003333330032.
.23003333330032.
.23333333333332.
.23333333333332.
.23300000000332.
.23300000000332.
.22222222222222.
................
................`],
  [TRN_E, bitmap`
................
.22222222222222.
.25555555555552.
.25222222222252.
.25222222222252.
.25555555555552.
.25555555555552.
.25005555550052.
.25005555550052.
.25555555555552.
.25555555555552.
.25500000000552.
.25500000000552.
.22222222222222.
................
................`],
  [TRN_Y, bitmap`
................
.22222222222222.
.26666666666662.
.26222222222262.
.26222222222262.
.26666666666662.
.26666666666662.
.26006666660062.
.26006666660062.
.26666666666662.
.26666666666662.
.26600000000662.
.26600000000662.
.22222222222222.
................
................`],
  [STA_R, bitmap`
3333333333333333
3222222222222233
3222222222222233
3223333333332233
3223222222222233
3223222222222233
3223222222222233
3223222222222233
3223222222222233
3223000000002233
3223000000002233
3223000000002233
3223000000002233
3223333333332233
3333333333333333
3333333333333333`],
  [STA_B, bitmap`
5555555555555555
5222222222222255
5222222222222255
5225555555552255
5225222222222255
5225222222222255
5225222222222255
5225222222222255
5225222222222255
5225000000002255
5225000000002255
5225000000002255
5225000000002255
5225555555552255
5555555555555555
5555555555555555`],
  [STA_Y, bitmap`
6666666666666666
6222222222222266
6222222222222266
6226666666662266
6226200000022266
6226200000022266
6226200000022266
6226200000022266
6226200000022266
6226000000002266
6226000000002266
6226000000002266
6226000000002266
6226666666662266
6666666666666666
6666666666666666`],
  [SP, bitmap`
5555555555555555
5222222222222255
5222222222222255
5225555555552255
5225255555252255
5225255555252255
5225255555252255
5225255555252255
5225255555252255
5225255555252255
5225555555552255
5222222222222255
5222222222222255
5555555555555555
5555555555555555
5555555555555555`],
  [UP, bitmap`
0000000000000000
0000006666000000
0000066666600000
0000666666660000
0006666666666000
0066666666666600
0066666666666600
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000000000000000
0000000000000000`],
  [DN, bitmap`
0000000000000000
0000000000000000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0000066666600000
0066666666666600
0066666666666600
0006666666666000
0000666666660000
0000066666600000
0000000000000000`],
  [LF, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0066000000000000
0666600000000000
6666666666666600
6666666666666600
6666666666666600
6666666666666600
0666600000000000
0066000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [RT, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000006600
0000000000066660
0066666666666666
0066666666666666
0066666666666666
0066666666666666
0000000000066660
0000000000006600
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [T, bitmap`
L0L11LLLLLL11L0L
LLL11LLLLLL11LLL
LLL11LLLLLL11LLL
1111111111111111
1111111111111111
LLL11LL00LL11LLL
LLL11LL00LL11LLL
L0L11LLLLLL11L0L
LLL11LLLLLL11LLL
LLL11LL00LL11LLL
LLL11LL00LL11LLL
1111111111111111
1111111111111111
LLL11LLLLLL11LLL
L0L11LLLLLL11L0L
LLL11LLLLLL11LLL`],
  [W, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL00LLLLLLLL00LL
LL00LLLLLLLL00LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL00LLLLLLLL00LL
LL00LLLLLLLL00LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [BLK, bitmap`
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
setSolids([]);
setBackground(W);

// ---------- board geometry ----------
const MW = 12;
const MH = 10;

const SWITCH_SPOTS = [
  { x: 2, y: 3 }, { x: 6, y: 3 }, { x: 9, y: 3 },
  { x: 2, y: 6 }, { x: 6, y: 6 }, { x: 9, y: 6 },
];
const SPAWNERS = [
  { x: 2, y: 1, dx: 0, dy: 1 },
  { x: 9, y: 1, dx: 0, dy: 1 },
];
const STATIONS = [
  { x: 2, y: 8, color: "E", tile: STA_B },
  { x: 6, y: 8, color: "Y", tile: STA_Y },
  { x: 9, y: 8, color: "R", tile: STA_R },
];

const LEVELS = [
  { quota: 3, tickMs: 750, spawnMs: 3600, colors: ["R", "E"], maxTrains: 1, walls: [] },
  { quota: 6, tickMs: 550, spawnMs: 2800, colors: ["R", "E", "Y"], maxTrains: 2, walls: [{ x: 5, y: 4 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 5 }] },
  { quota: 8, tickMs: 420, spawnMs: 2200, colors: ["R", "E", "Y"], maxTrains: 3, walls: [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 4, y: 5 }, { x: 7, y: 5 }] },
];

const DIRS = [
  { ch: UP, dx: 0, dy: -1 },
  { ch: RT, dx: 1, dy: 0 },
  { ch: DN, dx: 0, dy: 1 },
  { ch: LF, dx: -1, dy: 0 },
];
function dirOf(ch) {
  for (const d of DIRS) if (d.ch === ch) return d;
  return null;
}
function arrowChar(ch) {
  if (ch === UP) return "^";
  if (ch === RT) return ">";
  if (ch === DN) return "v";
  if (ch === LF) return "<";
  return "?";
}
function trainCharFor(color) {
  return color === "R" ? TRN_R : color === "E" ? TRN_E : TRN_Y;
}
function stationColorFor(tile) {
  if (tile === STA_R) return "R";
  if (tile === STA_B) return "E";
  if (tile === STA_Y) return "Y";
  return null;
}

// ---------- state ----------
let state = "title"; // title | playing | paused | gameover | win
let levelIdx = 0;
let delivered = 0;
let lives = 3;
let score = 0;
let trains = [];
let base = [];
let cursor = { x: 6, y: 3 };
let tickTimer = null;
let spawnTimer = null;
let msg = "";
let msgT = 0;
let flash = 0;
let tickN = 0;

const sfxSwitch = tune`100: C5~100`;
const sfxHop = tune`120: E5~120`;
const sfxSpawn = tune`150: C4~150`;
const sfxGood = tune`150: C4~150, 150: E4~150, 300: G4~300`;
const sfxBad = tune`250: A4~250, 250: F4~250`;
const sfxWin = tune`120: C4~120, 120: E4~120, 120: G4~120, 120: C5~120, 120: E5~120, 300: G5~300`;
const sfxLevel = tune`120: G4~120, 120: C5~120, 250: E5~250`;

function buildBase(li) {
  const lv = LEVELS[li];
  const g = [];
  for (let y = 0; y < MH; y++) {
    const row = [];
    for (let x = 0; x < MW; x++) {
      if (x === 0 || y === 0 || x === MW - 1 || y === MH - 1) row.push(W);
      else row.push(T);
    }
    g.push(row);
  }
  for (const s of SPAWNERS) g[s.y][s.x] = SP;
  for (const st of STATIONS.filter(s => lv.colors.includes(s.color))) g[st.y][st.x] = st.tile;
  for (const wsec of lv.walls) {
    if (g[wsec.y] && g[wsec.y][wsec.x] !== undefined) {
      // never overwrite spawners / stations / switches
      let protected_ = false;
      for (const s of SPAWNERS) if (s.x === wsec.x && s.y === wsec.y) protected_ = true;
      for (const st of STATIONS) if (st.x === wsec.x && st.y === wsec.y) protected_ = true;
      for (const sw of SWITCH_SPOTS) if (sw.x === wsec.x && sw.y === wsec.y) protected_ = true;
      if (!protected_) g[wsec.y][wsec.x] = W;
    }
  }
  for (const sw of SWITCH_SPOTS) {
    if (g[sw.y][sw.x] !== W) g[sw.y][sw.x] = DN;
  }
  return g;
}

function render() {
  if (state === "title") {
    const brows = [];
    for (let y = 0; y < MH; y++) brows.push(BLK.repeat(MW));
    setMap(brows.join("\n"));
    clearText();
    addText("RAIL YARD", { x: 6, y: 1, color: color`6` });
    addText("DISPATCHER", { x: 5, y: 2, color: color`6` });
    addText("Send each train to", { x: 1, y: 4, color: color`2` });
    addText("its SAME-COLOR depot", { x: 0, y: 5, color: color`2` });
    addText("red->red blue->blue", { x: 0, y: 7, color: color`3` });
    addText("yellow->yellow", { x: 3, y: 8, color: color`6` });
    addText("WASD: hop arrows", { x: 1, y: 10, color: color`2` });
    addText("I/J: flip arrow", { x: 2, y: 11, color: color`2` });
    addText("K: pause L: restart", { x: 0, y: 12, color: color`2` });
    addText("press I to start", { x: 2, y: 14, color: color`4` });
    return;
  }
  const rows = [];
  for (let y = 0; y < MH; y++) rows.push(base[y].join(""));
  setMap(rows.join("\n"));
  for (const t of trains) addSprite(t.x, t.y, trainCharFor(t.color));
  if (state === "paused") addSprite(cursor.x, cursor.y, CUR);
  else if (state === "playing" && tickN % 2 === 0) addSprite(cursor.x, cursor.y, CUR);
  clearText();
  const lv = LEVELS[levelIdx];
  let hud;
  if (msgT > 0) {
    hud = msg;
    msgT--;
  } else {
    hud = "L" + (levelIdx + 1) + " " + delivered + "/" + lv.quota + " H" + lives + " S" + score;
    const under = base[cursor.y][cursor.x];
    if (dirOf(under) !== null) hud += " " + arrowChar(under);
  }
  addText(hud, { x: 0, y: 0, color: color`2` });
  if (state === "paused") {
    addText("PAUSED - K resume", { x: 2, y: 6, color: color`6` });
  } else if (state === "gameover") {
    addText("DERAILED!", { x: 6, y: 4, color: color`3` });
    addText("score " + score, { x: 6, y: 6, color: color`2` });
    addText("L restart", { x: 6, y: 8, color: color`2` });
  } else if (state === "win") {
    addText("ALL LINES CLEAR!", { x: 2, y: 4, color: color`4` });
    addText("score " + score, { x: 6, y: 6, color: color`2` });
    addText("L play again", { x: 4, y: 8, color: color`2` });
  } else {
    if (flash > 0) {
      addText("! ! !", { x: 8, y: 7, color: color`3` });
      flash--;
    }
  }
}

function say(m) { msg = m; msgT = 6; }

function stopTimers() {
  if (tickTimer !== null) { clearInterval(tickTimer); tickTimer = null; }
  if (spawnTimer !== null) { clearInterval(spawnTimer); spawnTimer = null; }
}

function startLevel(li) {
  levelIdx = li;
  delivered = 0;
  trains = [];
  base = buildBase(li);
  cursor = { x: 6, y: 3 };
  render();
  stopTimers();
  const lv = LEVELS[li];
  tickTimer = setInterval(tick, lv.tickMs);
  spawnTimer = setInterval(spawnTick, lv.spawnMs);
  // instant first train so the level starts moving right away
  spawnTick();
}

function startGame() {
  state = "playing";
  levelIdx = 0;
  lives = 3;
  score = 0;
  startLevel(0);
  say("match colors!");
}

function crashAt(x, y, why) {
  lives--;
  flash = 8;
  playTune(sfxBad);
  say(why + " -1HP");
  // remove every train on that tile
  trains = trains.filter(t => !(t.x === x && t.y === y));
  if (lives <= 0) {
    state = "gameover";
    stopTimers();
  }
  render();
}

function deliverTrain(t) {
  delivered++;
  score += 100 + levelIdx * 50;
  playTune(sfxGood);
  trains = trains.filter(o => o !== t);
  const lv = LEVELS[levelIdx];
  if (delivered >= lv.quota) {
    if (levelIdx >= LEVELS.length - 1) {
      state = "win";
      stopTimers();
      playTune(sfxWin);
    } else {
      playTune(sfxLevel);
      startLevel(levelIdx + 1);
      say("level " + (levelIdx + 1) + "!");
      return;
    }
  }
  render();
}

function inBounds(x, y) { return x >= 0 && y >= 0 && x < MW && y < MH; }

function tick() {
  if (state !== "playing") return;
  tickN++;
  if (trains.length === 0) { render(); return; }
  // compute intended moves
  const moves = [];
  for (const t of trains) {
    const nx = t.x + t.dx;
    const ny = t.y + t.dy;
    moves.push({ t, nx, ny });
  }
  // collision: two trains targeting same tile
  const targetCount = {};
  for (const m of moves) {
    const k = m.nx + "," + m.ny;
    targetCount[k] = (targetCount[k] || 0) + 1;
  }
  let crashed = false;
  for (const m of moves) {
    const k = m.nx + "," + m.ny;
    if (targetCount[k] > 1) {
      crashAt(m.nx, m.ny, "collision");
      crashed = true;
      break;
    }
  }
  if (crashed) return;
  // head-on swap: A->B pos and B->A pos
  for (let i = 0; i < moves.length; i++) {
    for (let j = i + 1; j < moves.length; j++) {
      const a = moves[i], b = moves[j];
      if (a.nx === b.t.x && a.ny === b.t.y && b.nx === a.t.x && b.ny === a.t.y) {
        crashAt(a.nx, a.ny, "head-on");
        return;
      }
    }
  }
  // resolve each move in order
  const snapshot = moves.slice();
  for (const m of snapshot) {
    // train may already be removed by an earlier crash this tick
    if (trains.indexOf(m.t) === -1) continue;
    const { nx, ny } = m;
    if (!inBounds(nx, ny)) { crashAt(m.t.x, m.t.y, "derailed"); return; }
    const tile = base[ny][nx];
    if (tile === W) { crashAt(nx, ny, "derailed"); return; }
    const sc = stationColorFor(tile);
    if (sc !== null) {
      // entering a station tile: move then resolve
      m.t.x = nx; m.t.y = ny;
      if (sc === m.t.color) deliverTrain(m.t);
      else crashAt(nx, ny, "wrong depot");
      if (state !== "playing") return;
      continue;
    }
    const dd = dirOf(tile);
    if (dd !== null) {
      m.t.x = nx; m.t.y = ny;
      m.t.dx = dd.dx; m.t.dy = dd.dy;
      continue;
    }
    // plain track or spawner: keep heading
    if (tile === T || tile === SP) {
      m.t.x = nx; m.t.y = ny;
      continue;
    }
    crashAt(nx, ny, "derailed");
    return;
  }
  render();
}

function spawnTick() {
  if (state !== "playing") return;
  const lv = LEVELS[levelIdx];
  if (trains.length >= lv.maxTrains) return;
  const free = SPAWNERS.filter(s => !trains.some(t => t.x === s.x && t.y === s.y));
  if (free.length === 0) return;
  const s = free[Math.floor(Math.random() * free.length)];
  const color = lv.colors[Math.floor(Math.random() * lv.colors.length)];
  trains.push({ x: s.x, y: s.y, dx: s.dx, dy: s.dy, color });
  playTune(sfxSpawn);
  render();
}

function cycleSwitch() {
  if (state !== "playing") return;
  const tile = base[cursor.y][cursor.x];
  const idx = DIRS.findIndex(d => d.ch === tile);
  if (idx === -1) return;
  base[cursor.y][cursor.x] = DIRS[(idx + 1) % DIRS.length].ch;
  playTune(sfxSwitch);
  render();
}

function hopDir(px, py) {
  if (state !== "playing") return;
  let best = -1, bs = 1e9;
  for (let i = 0; i < SWITCH_SPOTS.length; i++) {
    const s = SWITCH_SPOTS[i];
    if (s.x === cursor.x && s.y === cursor.y) continue;
    const dx = s.x - cursor.x, dy = s.y - cursor.y;
    if (px > 0 && dx <= 0) continue;
    if (px < 0 && dx >= 0) continue;
    if (py > 0 && dy <= 0) continue;
    if (py < 0 && dy >= 0) continue;
    const along = px !== 0 ? Math.abs(dx) : Math.abs(dy);
    const off = px !== 0 ? Math.abs(dy) : Math.abs(dx);
    const score = along + off * 2;
    if (score < bs) { bs = score; best = i; }
  }
  if (best === -1) return;
  cursor.x = SWITCH_SPOTS[best].x;
  cursor.y = SWITCH_SPOTS[best].y;
  playTune(sfxHop);
  render();
}

// ---------- input ----------
onInput("w", () => {
  if (state === "title") { startGame(); return; }
  if (state === "gameover" || state === "win") return;
  hopDir(0, -1);
});
onInput("s", () => {
  if (state === "title") { startGame(); return; }
  if (state === "gameover" || state === "win") return;
  hopDir(0, 1);
});
onInput("a", () => {
  if (state === "title") { startGame(); return; }
  if (state === "gameover" || state === "win") return;
  hopDir(-1, 0);
});
onInput("d", () => {
  if (state === "title") { startGame(); return; }
  if (state === "gameover" || state === "win") return;
  hopDir(1, 0);
});
onInput("j", () => {
  if (state === "title") { startGame(); return; }
  cycleSwitch();
});
onInput("i", () => {
  if (state === "title") { startGame(); return; }
  cycleSwitch();
});
onInput("k", () => {
  if (state === "title") { startGame(); return; }
  if (state === "gameover" || state === "win") return;
  if (state === "playing") {
    state = "paused";
    stopTimers();
    render();
  } else if (state === "paused") {
    state = "playing";
    const lv = LEVELS[levelIdx];
    tickTimer = setInterval(tick, lv.tickMs);
    spawnTimer = setInterval(spawnTick, lv.spawnMs);
    render();
  }
});
onInput("l", () => {
  // full restart from anywhere
  lives = 3;
  score = 0;
  state = "playing";
  startLevel(0);
  say("restarted!");
});

base = buildBase(0);
render();
