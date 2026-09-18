/*
@title: blightwatch
@author: syvrc
@description: BLIGHT WATCH  —  a real-time survival farming game. Plant, grow and harvest crops on an 8x6 field while a purple blight eats the ground out from under you. One button does everything, and what it does depends on the tile you're on.
@tags: ['challenge game']
@addedOn: 2026-08-15
*/


/* ================================================================
   CONTROLS
     w a s d  move one tile
     i        act on the tile you're standing on
                bare soil  -> plant a seed
                gold crop  -> harvest it (+1)
                blight     -> spray it clean (costs you 2 turns
                              of being unable to act)
     j        restart, once the round is over

   WIN   harvest HARVEST_TARGET crops
   LOSE  blight covers 75% of the field, or the clock runs out

================================================================ */

const player = "p";
const ready  = "r";
const sprout = "t";
const seed   = "e";
const blight = "b";
const fence  = "f";
const dirt   = "g";

setLegend(
  [ player, bitmap`
................
.....000000.....
....06666660....
...0666666660...
..066666666660..
..000000000000..
.....099990.....
.....090090.....
.....099990.....
......0990......
....02555520....
...0255555520...
...0255555520...
...0055555500...
....05500550....
....00...00.....` ],

  [ ready, bitmap`
................
......0000......
.....066660.....
....06666660....
....06966960....
....06666660....
.....066660.....
......0000......
......0DD0......
....00D44D00....
...0D444444D0...
....00D44D00....
......0DD0......
....0LLLLLL0....
....0LLLLLL0....
.....000000.....` ],

  [ sprout, bitmap`
................
................
................
................
.......00.......
......0440......
...000044400....
..04444444440...
..04444444440...
...000444000....
......0440......
......0440......
.....0DDDD0.....
....0LLLLLL0....
....0LLLLLL0....
.....000000.....` ],

  [ seed, bitmap`
................
................
................
................
................
................
................
................
................
.......D........
......0D0.......
.....0LLLL0.....
....0LLLLLL0....
....0LLLLLL0....
.....000000.....
................` ],

  [ blight, bitmap`
...HHH....HHH...
..HH8HH..HH8HH..
.HH888HHHH888HH.
.H88HH8HH8HH88H.
HH8HHHHHHHHHH8HH
H8HH8HHHHHH8HH8H
HHHH8HH88HH8HHHH
.HHHHH8888HHHHH.
..HHH88HH88HHH..
.HHHH8HHHH8HHHH.
HH8HHHHHHHHHH8HH
H88HHHH88HHHH88H
.HHHH8HHHH8HHHH.
..HH888HH888HH..
...HHH8HH8HHH...
....HHHHHHHH....` ],

  [ fence, bitmap`
0000000000000000
0FFFFFFFFFFFFFF0
0FCCFFFFFFFFCCF0
0FCCFFFFFFFFCCF0
0FFFFFFFFFFFFFF0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0FFFFFFFFFFFFFF0
0FCCFFFFFFFFCCF0
0FCCFFFFFFFFCCF0
0FFFFFFFFFFFFFF0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000000000000` ],

  [ dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCLCCCCCCCCCC
CCCCCCCCCCCLCCCC
CCLCCCCCCCCCCCCC
CCCCCCCCCCCCCCLC
CCCCCCCLCCCCCCCC
CLCCCCCCCCCCCCCC
CCCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCLCCCCCCCCCCCC
CCCCCCCCCCCCCLCC
CCCCCCLCCCCCCCCC
CCCCCCCCCCCCCCCC
CCLCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ]
);


setSolids([ player, fence ]);
setBackground(dirt);

const level = map`
ffffffffff
f........f
f........f
f........f
f...p....f
f........f
f........f
ffffffffff`;

const HARVEST_TARGET = 54;
const TREAT_LOCK     = 2; 
const MAX_TICKS      = 120;
const BASE_TICK_MS   = 2500;
const MIN_TICK_MS    = 1800; // fastest the field ever gets

const DIRS = [ [1, 0], [-1, 0], [0, 1], [0, -1] ];

let harvested  = 0;
let tickCount  = 0;
let actionLock = 0;
let running    = false;
let tickMs     = BASE_TICK_MS;
let tickId     = null;
let interiorTiles = 0;
let loseAt        = 0;

const plantSfx   = tune`120: C4~120 + G4~120, 120`;
const harvestSfx = tune`110: C5~110, 110: E5~110, 110: G5~110, 110`;
const spraySfx   = tune`90: A3-90, 90: E3-90, 90`;
const spreadSfx  = tune`140: D3-140 + D#3-140, 140`;
const winSfx     = tune`130: C5~130, 130: E5~130, 130: G5~130, 260: C5~260 + E5~260 + G5~260, 130`;
const loseSfx    = tune`200: G3-200, 200: E3-200, 400: C3-400, 200`;

function inField(x, y) {
  return x >= 1 && x <= width() - 2 && y >= 1 && y <= height() - 2;
}

function snapshot() {
  const snap = {};
  const all = getAll();
  for (let i = 0; i < all.length; i++) {
    if (all[i].type === player) continue;
    snap[all[i].x + "," + all[i].y] = all[i].type;
  }
  return snap;
}

function setTile(x, y, type) {
  const here = getTile(x, y);
  for (let i = 0; i < here.length; i++) {
    if (here[i].type !== player) here[i].remove();
  }
  if (type !== null) addSprite(x, y, type);
}

function tileState(x, y) {
  const here = getTile(x, y);
  for (let i = 0; i < here.length; i++) {
    if (here[i].type !== player) return here[i];
  }
  return null;
}

function growCrops() {
  const grown = getAll(sprout);
  for (let i = 0; i < grown.length; i++) grown[i].type = ready;
  const sprouted = getAll(seed);
  for (let i = 0; i < sprouted.length; i++) sprouted[i].type = sprout;
}

function spreadBlight() {
  const snap = snapshot();
  const sources = getAll(blight);
  const chance = Math.min(0.42, 0.22 + tickCount * 0.006);
  const budget = Math.min(4, 1 + Math.floor(tickCount / 20));

  const candidates = [];
  const claimed = {};
  for (let s = 0; s < sources.length; s++) {
    for (let d = 0; d < DIRS.length; d++) {
      const nx = sources[s].x + DIRS[d][0];
      const ny = sources[s].y + DIRS[d][1];
      const key = nx + "," + ny;
      if (!inField(nx, ny)) continue;
      if (claimed[key]) continue;
      if (snap[key] === blight) continue;
      if (Math.random() >= chance) continue;
      claimed[key] = true;
      candidates.push([ nx, ny ]);
    }
  }

  let infected = 0;
  while (candidates.length > 0 && infected < budget) {
    const pick = Math.floor(Math.random() * candidates.length);
    const tile = candidates.splice(pick, 1)[0];
    setTile(tile[0], tile[1], blight);
    infected++;
  }
  return infected;
}

function newOutbreak() {
  if (getAll(blight).length >= 10) return 0;
  if (Math.random() >= 0.10) return 0;
  const p = getFirst(player);
  for (let tries = 0; tries < 40; tries++) {
    const x = 1 + Math.floor(Math.random() * (width() - 2));
    const y = 1 + Math.floor(Math.random() * (height() - 2));
    if (x === p.x && y === p.y) continue;
    const on = tileState(x, y);
    if (on !== null && on.type === blight) continue;
    setTile(x, y, blight);
    return 1;
  }
  return 0;
}

function tick() {
  if (!running) return;
  tickCount++;
  if (actionLock > 0) actionLock--;

  growCrops();
  const infected = spreadBlight() + newOutbreak();
  if (infected > 0) playTune(spreadSfx);

  const wantMs = Math.max(MIN_TICK_MS, BASE_TICK_MS - Math.floor(tickCount / 8) * 200);
  if (wantMs !== tickMs) {
    tickMs = wantMs;
    schedule();
  }

  drawHUD();

  if (harvested >= HARVEST_TARGET)        endRound("win");
  else if (getAll(blight).length >= loseAt) endRound("lose");
  else if (tickCount >= MAX_TICKS)          endRound("time");
}

function schedule() {
  if (tickId !== null) clearInterval(tickId);
  tickId = setInterval(tick, tickMs);
}

onInput("w", () => { if (running) getFirst(player).y -= 1; });
onInput("s", () => { if (running) getFirst(player).y += 1; });
onInput("a", () => { if (running) getFirst(player).x -= 1; });
onInput("d", () => { if (running) getFirst(player).x += 1; });

onInput("i", () => {
  if (!running || actionLock > 0) return;
  const p = getFirst(player);
  if (!inField(p.x, p.y)) return;

  const on = tileState(p.x, p.y);

  if (on === null) {
    addSprite(p.x, p.y, seed);
    playTune(plantSfx);
  } else if (on.type === ready) {
    on.remove();
    harvested++;
    playTune(harvestSfx);
  } else if (on.type === blight) {
    on.remove();
    actionLock = TREAT_LOCK;
    playTune(spraySfx);
  }
});

onInput("j", () => { if (!running) startRound(); });

afterInput(() => { if (running) drawHUD(); });

function drawHUD() {
  clearText();
  addText("CROPS " + harvested + "/" + HARVEST_TARGET + "  ROT " + getAll(blight).length,
          { x: 0, y: 0, color: color`2` });
  if (actionLock > 0) addText("SPRAYING...", { x: 4, y: 15, color: color`7` });
  else                addText("I ACT   J RESET", { x: 2, y: 15, color: color`1` });
}

function endRound(result) {
  running = false;
  if (tickId !== null) { clearInterval(tickId); tickId = null; }

  clearText();
  if (result === "win") {
    addText("HARVEST COMPLETE", { x: 2, y: 6, color: color`4` });
    playTune(winSfx);
  } else if (result === "lose") {
    addText("THE BLIGHT WINS", { x: 2, y: 6, color: color`H` });
    playTune(loseSfx);
  } else {
    addText("SEASON OVER", { x: 4, y: 6, color: color`6` });
    playTune(loseSfx);
  }
  addText("CROPS SAVED: " + harvested, { x: 3, y: 8, color: color`2` });
  addText("PRESS J TO REPLAY", { x: 1, y: 10, color: color`1` });
}

function startRound() {
  setMap(level);

  harvested  = 0;
  tickCount  = 0;
  actionLock = 0;
  tickMs     = BASE_TICK_MS;
  running    = true;

  interiorTiles = (width() - 2) * (height() - 2);
  loseAt = Math.floor(interiorTiles * 0.75);

  const p = getFirst(player);
  for (let n = 0; n < 2; n++) {
    for (let tries = 0; tries < 40; tries++) {
      const x = 1 + Math.floor(Math.random() * (width() - 2));
      const y = 1 + Math.floor(Math.random() * (height() - 2));
      if (Math.abs(x - p.x) + Math.abs(y - p.y) < 3) continue;
      if (getTile(x, y).length > 0) continue;
      addSprite(x, y, blight);
      break;
    }
  }

  drawHUD();
  schedule();
}

startRound();