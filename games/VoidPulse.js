/*
 * @title: VoidPulse
 * @author: Hack Club Sprig Developer
 * @tags: ['horror', 'stealth', 'maze', 'retro']
 * @description: A tense minimalist horror maze with echolocation, portals, water, fire, and frostfire mechanics. Navigate pitch darkness using sound pulses, warp through dimensional portals, freeze hazards and stalkers across 10 dangerous vaults!
 */

// ==========================================
// 1. SPRITE BITMAPS (16x16 PIXELS)
// ==========================================

const player = bitmap`
................
.....CCCCCC.....
....CCCCCCCC....
...CC111111CC...
...CC111111CC...
...CCCCCCCCCC...
....CCCCCCCC....
.....CCCCCC.....
....33333333....
...3333333333...
...3333..3333...
...3333..3333...
....333..333....
....333..333....
....CCC..CCC....
................`;

// Neon Cyan Cyber Barrier Wall
const wall = bitmap`
CCCCCCCCCCCCCCCC
C00000000000000C
C0CCCCCCCCCCCC0C
C0C0000000000C0C
C0C0CCCCCCCC0C0C
C0C0C000000C0C0C
C0C0C011110C0C0C
C0C0C011110C0C0C
C0C0C011110C0C0C
C0C0C011110C0C0C
C0C0C000000C0C0C
C0C0CCCCCCCC0C0C
C0C0000000000C0C
C0CCCCCCCCCCCC0C
C00000000000000C
CCCCCCCCCCCCCCCC`;

const darkBg = bitmap`
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
0000000000000000`;

const stalker1 = bitmap`
................
...44......44...
...444....444...
....444..444....
...0000000000...
..000000000000..
..003300003300..
..003300003300..
..000044440000..
...0044444400...
...0000000000...
..000.0000.000..
..000.0000.000..
..00...00...00..
..00...00...00..
................`;

const stalker2 = bitmap`
................
...55......55...
...555....555...
....555..555....
...0000000000...
..000000000000..
..007700007700..
..007700007700..
..000055550000..
...0055555500...
...0000000000...
..000.0000.000..
..000.0000.000..
..00...00...00..
..00...00...00..
................`;

const stalker3 = bitmap`
................
...66......66...
...666....666...
....666..666....
...0000000000...
..000000000000..
..001100001100..
..001100001100..
..000066660000..
...0066666600...
...0000000000...
..000.0000.000..
..000.0000.000..
..00...00...00..
..00...00...00..
................`;

const stalker4 = bitmap`
................
...88......88...
...888....888...
....888..888....
...0000000000...
..000000000000..
..001100001100..
..001100001100..
..000088880000..
...0088888800...
...0000000000...
..000.0000.000..
..000.0000.000..
..00...00...00..
..00...00...00..
................`;

const exitLadder = bitmap`
................
...7777777777...
...7........7...
...7777777777...
...7........7...
...7777777777...
...7........7...
...7777777777...
...7........7...
...7777777777...
...7........7...
...7777777777...
...7........7...
...7777777777...
...7........7...
................`;

const key = bitmap`
................
......7777......
.....77..77.....
.....77..77.....
......7777......
.......77.......
.......77.......
.....777777.....
.......77.......
.......77.......
.......7777.....
.......77.......
.......7777.....
.......77.......
.......77.......
................`;

const portalA = bitmap`
....DDDDDDDD....
..DDDCCCCCCDDD..
.DDCC111111CCDD.
.DCC11DDDD11CCD.
DDC11DDDDDD11CDD
DDC1DD....DD1CDD
DC1DD......DD1CD
DC1D........D1CD
DC1D........D1CD
DC1DD......DD1CD
DDC1DD....DD1CDD
DDC11DDDDDD11CDD
.DCC11DDDD11CCD.
.DDCC111111CCDD.
..DDDCCCCCCDDD..
....DDDDDDDD....`;

const portalB = bitmap`
....CCCCCCCC....
..CCCCDDDDCCCC..
.CCDD111111DDCC.
.CDD11CCCC11DDC.
CCD11CCCCCC11DCC
CCD1CC....CC1DCC
CD1CC......CC1DC
CD1C........C1DC
CD1C........C1DC
CD1CC......CC1DC
CCD1CC....CC1DCC
CCD11CCCCCC11DCC
.CDD11CCCC11DDC.
.CCDD111111DDCC.
..CCCCDDDDCCCC..
....CCCCCCCC....`;

const battery = bitmap`
................
.......77.......
......777.......
.....7777.......
....77777.......
...777777777....
.......7777.....
......77777.....
.....7777.......
....777.........
...77...........
................
................
................
................
................`;

const frostfireOrb = bitmap`
......DDDD......
....DD1111DD....
...D11CCCC11D...
..D1CC3333CC1D..
..D1C337733C1D..
.D1C37711773C1D.
.D1C37111173C1D.
.D1C37111173C1D.
.D1C37711773C1D.
..D1C337733C1D..
..D1CC3333CC1D..
...D11CCCC11D...
....DD1111DD....
......DDDD......
................
................`;

const water = bitmap`
................
..6666....6666..
.66CCCC6666CCCC.
66CCCCCCC66CCCC6
.66CCCC6666CCCC.
..6666....6666..
................
..6666....6666..
.66CCCC6666CCCC.
66CCCCCCC66CCCC6
.66CCCC6666CCCC.
..6666....6666..
................
.666666..666666.
................
................`;

const fire = bitmap`
.......4........
......484.......
.....48884......
.....48784......
....4877784.....
....4871784.....
...487717784....
...487111784....
..48771117784...
..48777177784...
.4887777777884..
.4888777778884..
..48888888884...
...4488888844...
.....444444.....
................`;

// ==========================================
// 2. SPRIG ENGINE CONFIGURATION
// ==========================================

setLegend(
  [ '0', darkBg ],
  [ 'p', player ],
  [ 'w', wall ],
  [ 'm', stalker1 ],
  [ 'n', stalker2 ],
  [ 'o', stalker3 ],
  [ 'q', stalker4 ],
  [ 'e', exitLadder ],
  [ 'k', key ],
  [ '1', portalA ],
  [ '2', portalB ],
  [ 'b', battery ],
  [ 'f', frostfireOrb ],
  [ '~', water ],
  [ '^', fire ]
);

setBackground('0');

// ==========================================
// 3. LEVEL BLUEPRINTS (10 DOUBLE-WIDTH OPEN MAPS)
// ==========================================

const levels = [
  // Stage 1: Tutorial 1 (Echo & Movement - No monsters, wide open chamber)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp.................w",
    "w..................w",
    "w..wwwww....wwwww..w",
    "w..wwwww....wwwww..w",
    "w..w............w..w",
    "w..w............w..w",
    "w..w......e.....w..w",
    "w..w............w..w",
    "w..w............w..w",
    "w..wwwww....wwwww..w",
    "w..wwwww....wwwww..w",
    "w..................w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 2: Tutorial 2 (Golden Key & Exit - No monsters, dual open wings)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w........w",
    "w.........w........w",
    "w..wwww...w...www..w",
    "w..wwww...w...www..w",
    "w.........w........w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w.........w........w",
    "w.........w........w",
    "w..wwww...w...www..w",
    "w..k......w......e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 3: Tutorial 3 (Echo Hunter - 1 Slow Stalker 'm', Big Double Ring)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp.................w",
    "w..................w",
    "w..wwwwww..wwwwww..w",
    "w..wwwwww..wwwwww..w",
    "w..w....b.......w..w",
    "w..w............w..w",
    "w..w....wwww....w..w",
    "w..w....w..w....w..w",
    "w..w....wwww....w..w",
    "w..w.......m....w..w",
    "w..wwwwww..wwwwww..w",
    "w..k............e..w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 4: Dimensional Portals (1 Monster 'm', Portals 1 & 2 with wide passages)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w........w",
    "w....1....w...2....w",
    "w..wwww...w...www..w",
    "w..wwww...w...www..w",
    "w.........w........w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w.........w........w",
    "w.........w...m....w",
    "w..wwww...w...www..w",
    "w..k......w...b..e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 5: Frostfire Orb & Water Hazard (1 Monster 'm', wide dry bypass)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w........w",
    "w....f....w........w",
    "w..wwww...w...www..w",
    "w..w~~~~~~w...w....w",
    "w..w~~~~~~w...w....w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w.........w........w",
    "w.........w...m....w",
    "w..wwww...w...www..w",
    "w..k......w......e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 6: Dual Stalkers & Fire Pits (2 Monsters 'm','n', wide open loop)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w...k....w",
    "w....f....w........w",
    "w..wwww...w...www..w",
    "w..w^^^^^^w...w....w",
    "w..w^^^^^^w...w....w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w.........w...b....w",
    "w...m.....w...n....w",
    "w..wwww...w...www..w",
    "w.........w......e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 7: Portal Gauntlet & Fast Dual Stalkers (2 Fast Monsters 'm','n')
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w........w",
    "w....1....w...k....w",
    "w..wwww...w...www..w",
    "w.........w...2....w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w...m.....w...n....w",
    "w.........w...b....w",
    "w..wwww...w...www..w",
    "w..f......w......e.w",
    "w.........w........w",
    "w..................w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 8: Triple Threat & Dual Hazards (3 Monsters 'm','n','o', dual corridors)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w...k....w",
    "w....f....w........w",
    "w..wwww...w...www..w",
    "w..w~~~~~~w...w....w",
    "w..w^^^^^^w...w....w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w...m.....w...n....w",
    "w.........w...o....w",
    "w..wwww...w...www..w",
    "w..b......w......e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 9: Subterranean Labyrinth (3 Agile Monsters, Portals, Hazards)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w...1....w",
    "w....f....w........w",
    "w..wwww...w...www..w",
    "w..w~~~~~~w...w^^^^w",
    "w..w~~~~~~w...w^^^^w",
    "w.........w........w",
    "wwww..ww..w..ww..www",
    "w...m.....w...n....w",
    "w...2.....w...o....w",
    "w..wwww...w...www..w",
    "w..k......w...b..e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ],

  // Stage 10: The Void Core Boss (4 Stalkers 'm','n','o','q', Ultimate Arena)
  [
    "wwwwwwwwwwwwwwwwwwww",
    "wp........w...k....w",
    "w....f....w........w",
    "w..wwww...w...www..w",
    "w..1......w......2.w",
    "w..w~~~~~~w...w^^^^w",
    "w..w~~~~~~w...w^^^^w",
    "wwww..ww..w..ww..www",
    "w...m..n..w..o..q..w",
    "w.........w........w",
    "w..wwww...w...www..w",
    "w..b......w......e.w",
    "w.........w........w",
    "w..................w",
    "wwwwwwwwwwwwwwwwwwww"
  ]
];

// ==========================================
// 4. TIMING & AUDIO UTILITIES
// ==========================================

function after(ms, callback) {
  return setTimeout(callback, ms);
}

function every(ms, callback) {
  return setInterval(callback, ms);
}

function sfx(tuneData) {
  try {
    if (typeof playTune === 'function') {
      playTune(tuneData);
    }
  } catch (err) {
    // Audio safeguard: continues gameplay seamlessly without error
  }
}

// On-screen HUD / Alert Messaging for Sprig
function showMessage(text, x = 1, y = 1) {
  try {
    if (typeof clearText === 'function') clearText();
    if (typeof addText === 'function') addText(text, { x, y });
  } catch (err) {
    // Fallback if text engine is unavailable
  }
}

// ==========================================
// 5. GAME STATE
// ==========================================

let currentStage = 0;
let playerX = 1;
let playerY = 1;

let stalkerX = -1;
let stalkerY = -1;
let stalker2X = -1;
let stalker2Y = -1;
let stalker3X = -1;
let stalker3Y = -1;
let stalker4X = -1;
let stalker4Y = -1;

let exitX = -1;
let exitY = -1;
let keyX = -1;
let keyY = -1;
let hasKey = false;

let portal1X = -1;
let portal1Y = -1;
let portal2X = -1;
let portal2Y = -1;

let batteryX = -1;
let batteryY = -1;

let frostfireX = -1;
let frostfireY = -1;
let frostfireCharges = 0;
let stunTimer = 0;

let echoCharges = 8;
let isEchoing = false;
let echoCooldown = false;
let soundOriginX = -1;
let soundOriginY = -1;

let isGameOver = false;
let isGameWon = false;
let stageCleared = false;

// Dynamic Audio State
let audioTimer = 0;
let nextHeartbeatTime = 0;
let nextAmbientTime = 6000;

// Speed progression: stages become progressively faster and tighter
const stalkerSpeeds = [
  99999, // 1: Tutorial 1 (no monsters)
  99999, // 2: Tutorial 2 (no monsters)
  1200,  // 3: Tutorial 3 (very slow, easy to avoid)
  1050,  // 4: Portals trial
  950,   // 5: Frostfire waters
  850,   // 6: Fire pits dual stalkers
  750,   // 7: Dual fast stalkers
  680,   // 8: Triple stalkers
  600,   // 9: Labyrinth triple stalkers
  520    // 10: Quad stalker final boss!
];

// ==========================================
// 6. SCREEN RENDERING & FOG-OF-WAR
// ==========================================

function drawScreen() {
  const mapData = levels[currentStage];
  const renderedRows = [];

  for (let y = 0; y < 15; y++) {
    let rowChars = '';
    for (let x = 0; x < 20; x++) {
      // Player always visible
      if (x === playerX && y === playerY) {
        rowChars += 'p';
        continue;
      }

      // If game is over, stage cleared, or won, illuminate everything
      if (isGameOver || isGameWon || stageCleared) {
        if (stalkerX !== -1 && x === stalkerX && y === stalkerY) rowChars += 'm';
        else if (stalker2X !== -1 && x === stalker2X && y === stalker2Y) rowChars += 'n';
        else if (stalker3X !== -1 && x === stalker3X && y === stalker3Y) rowChars += 'o';
        else if (stalker4X !== -1 && x === stalker4X && y === stalker4Y) rowChars += 'q';
        else if (x === exitX && y === exitY) rowChars += 'e';
        else if (x === keyX && y === keyY && !hasKey) rowChars += 'k';
        else if (x === portal1X && y === portal1Y) rowChars += '1';
        else if (x === portal2X && y === portal2Y) rowChars += '2';
        else if (x === batteryX && y === batteryY) rowChars += 'b';
        else if (x === frostfireX && y === frostfireY) rowChars += 'f';
        else {
          const tile = mapData[y][x];
          rowChars += (tile === 'w' || tile === '~' || tile === '^') ? tile : '.';
        }
        continue;
      }

      // Echo wave illumination check (Manhattan radius 8)
      if (isEchoing) {
        const distFromPulse = Math.abs(x - soundOriginX) + Math.abs(y - soundOriginY);
        if (distFromPulse <= 8) {
          if (stalkerX !== -1 && x === stalkerX && y === stalkerY) rowChars += 'm';
          else if (stalker2X !== -1 && x === stalker2X && y === stalker2Y) rowChars += 'n';
          else if (stalker3X !== -1 && x === stalker3X && y === stalker3Y) rowChars += 'o';
          else if (stalker4X !== -1 && x === stalker4X && y === stalker4Y) rowChars += 'q';
          else if (x === exitX && y === exitY) rowChars += 'e';
          else if (x === keyX && y === keyY && !hasKey) rowChars += 'k';
          else if (x === portal1X && y === portal1Y) rowChars += '1';
          else if (x === portal2X && y === portal2Y) rowChars += '2';
          else if (x === batteryX && y === batteryY) rowChars += 'b';
          else if (x === frostfireX && y === frostfireY) rowChars += 'f';
          else {
            const tile = mapData[y][x];
            rowChars += (tile === 'w' || tile === '~' || tile === '^') ? tile : '.';
          }
          continue;
        }
      }

      // Ambient torchlight around player (radius 1)
      const distFromPlayer = Math.abs(x - playerX) + Math.abs(y - playerY);
      if (distFromPlayer <= 1) {
        const tile = mapData[y][x];
        rowChars += (tile === 'w' || tile === '~' || tile === '^') ? tile : '.';
        continue;
      }

      // Pitch black darkness
      rowChars += '.';
    }
    renderedRows.push(rowChars);
  }

  setMap(renderedRows.join('\n'));
}

// ==========================================
// 7. STAGE INITIALIZATION
// ==========================================

function initStage(stageIndex) {
  currentStage = stageIndex;
  const mapData = levels[currentStage];

  hasKey = false;
  isEchoing = false;
  echoCooldown = false;
  soundOriginX = -1;
  soundOriginY = -1;
  isGameOver = false;
  isGameWon = false;
  stageCleared = false;
  stunTimer = 0;

  audioTimer = 0;
  nextHeartbeatTime = 0;
  nextAmbientTime = 6000;

  keyX = -1; keyY = -1;
  stalkerX = -1; stalkerY = -1;
  stalker2X = -1; stalker2Y = -1;
  stalker3X = -1; stalker3Y = -1;
  stalker4X = -1; stalker4Y = -1;
  portal1X = -1; portal1Y = -1;
  portal2X = -1; portal2Y = -1;
  batteryX = -1; batteryY = -1;
  frostfireX = -1; frostfireY = -1;

  echoCharges = currentStage < 3 ? 8 : currentStage < 6 ? 6 : 5;

  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 20; x++) {
      const tile = mapData[y][x];
      if (tile === 'p') { playerX = x; playerY = y; }
      if (tile === 'm') { stalkerX = x; stalkerY = y; }
      if (tile === 'n') { stalker2X = x; stalker2Y = y; }
      if (tile === 'o') { stalker3X = x; stalker3Y = y; }
      if (tile === 'q') { stalker4X = x; stalker4Y = y; }
      if (tile === 'e') { exitX = x; exitY = y; }
      if (tile === 'k') { keyX = x; keyY = y; }
      if (tile === '1') { portal1X = x; portal1Y = y; }
      if (tile === '2') { portal2X = x; portal2Y = y; }
      if (tile === 'b') { batteryX = x; batteryY = y; }
      if (tile === 'f') { frostfireX = x; frostfireY = y; }
    }
  }

  drawScreen();
  // Creepy ambient dungeon intro drone
  sfx('110:140, 98:160, 82:200, 73:320');
  
  // HUD announcement
  const keyMsg = keyX !== -1 ? " | KEY: REQ" : "";
  showMessage("STAGE " + (currentStage + 1) + "/10" + keyMsg + " | ECHO:" + echoCharges);
}

// ==========================================
// 8. ECHOLOCATION MECHANIC
// ==========================================

function triggerEcho() {
  if (isGameOver || isGameWon || stageCleared) return;

  // If battery empty, play soft click
  if (echoCharges <= 0) {
    sfx('130:40, 95:60');
    showMessage("BATTERY DEPLETED! FIND CELL");
    return;
  }

  if (echoCooldown || isEchoing) return;

  echoCharges--;
  echoCooldown = true;
  isEchoing = true;
  soundOriginX = playerX;
  soundOriginY = playerY;

  // High-ping resonant sonar pulse
  sfx('392:50, 587:60, 880:80, 1175:120');
  drawScreen();

  const keyMsg = keyX !== -1 ? (hasKey ? " | KEY: YES" : " | KEY: REQ") : "";
  showMessage("STAGE " + (currentStage + 1) + "/10" + keyMsg + " | ECHO:" + echoCharges);

  // Wave fades back to dark after 1.1 seconds
  after(1100, () => {
    isEchoing = false;
    drawScreen();
  });

  // Short cooldown before next pulse
  after(400, () => {
    echoCooldown = false;
  });
}

// ==========================================
// 9. TACTICAL FROSTFIRE BLAST (K KEY)
// ==========================================

function fireFrostfire() {
  if (isGameOver || isGameWon || stageCleared) return;
  if (frostfireCharges <= 0) {
    sfx('130:40, 95:60');
    showMessage("NO FROSTFIRE! COLLECT ORB (F)");
    return;
  }

  frostfireCharges--;
  stunTimer = 70; // 3.5 seconds freeze (70 * 50ms)
  soundOriginX = -1;
  soundOriginY = -1;
  // Shattering cryogenic detonation shockwave
  sfx('1318:40, 1046:50, 784:60, 523:70, 330:90, 196:120, 110:200, 65:300');
  showMessage("STALKERS FROZEN! RUN!");
  drawScreen();
}

// ==========================================
// 10. PLAYER MOVEMENT & INTERACTIONS
// ==========================================

function move(dx, dy) {
  if (isGameOver || isGameWon || stageCleared) return;

  const mapData = levels[currentStage];
  let targetX = playerX + dx;
  let targetY = playerY + dy;

  // Boundary check
  if (targetX < 0 || targetX >= 20 || targetY < 0 || targetY >= 15) {
    sfx('85:30, 60:40');
    return;
  }

  const targetTile = mapData[targetY][targetX];

  // Wall bump check
  if (targetTile === 'w') {
    sfx('85:30, 60:40');
    return;
  }

  // Water / Fire hazard check (Requires Frostfire protection)
  if (targetTile === '~' || targetTile === '^') {
    if (frostfireCharges <= 0) {
      // Barrier warning: cannot cross water/fire without frostfire orb
      sfx('110:50, 80:70');
      showMessage("HAZARD BARRIER! NEED FROSTFIRE");
      return;
    }
    // Safe hazard traversal sound
    if (targetTile === '~') sfx('600:35, 800:50');
    if (targetTile === '^') sfx('800:35, 500:50');
  }

  // Wormhole Teleportation (1 <-> 2) - Rising sci-fi warp sweep
  if (targetX === portal1X && targetY === portal1Y && portal2X !== -1) {
    targetX = portal2X;
    targetY = portal2Y;
    sfx('220:35, 330:40, 494:45, 659:50, 880:60, 1175:70, 1568:110');
    showMessage("WARP TRANSIT COMPLETE!");
  } else if (targetX === portal2X && targetY === portal2Y && portal1X !== -1) {
    targetX = portal1X;
    targetY = portal1Y;
    sfx('220:35, 330:40, 494:45, 659:50, 880:60, 1175:70, 1568:110');
    showMessage("WARP TRANSIT COMPLETE!");
  }

  playerX = targetX;
  playerY = targetY;
  sfx('160:15'); // Footstep

  // Key item collection
  if (playerX === keyX && playerY === keyY && !hasKey) {
    hasKey = true;
    sfx('523:60, 659:60, 784:70, 1046:100, 1318:180');
    showMessage("KEY FOUND! EXIT UNLOCKED!");
  }

  // Battery pack pickup (+3 echo charges)
  if (playerX === batteryX && playerY === batteryY) {
    batteryX = -1; batteryY = -1;
    echoCharges += 3;
    sfx('440:40, 660:50, 880:60, 1320:110');
    showMessage("+3 ECHO CHARGES RECHARGED!");
  }

  // Frostfire Orb pickup (+1 tactical blast & hazard immunity)
  if (playerX === frostfireX && playerY === frostfireY) {
    frostfireX = -1; frostfireY = -1;
    frostfireCharges++;
    sfx('523:50, 659:50, 784:60, 1046:70, 1318:90, 1760:140');
    showMessage("FROSTFIRE ACQUIRED! PRESS K");
  }

  // Exit ladder reach
  if (playerX === exitX && playerY === exitY) {
    if (keyX !== -1 && !hasKey) {
      sfx('130:50, 95:70'); // Locked
      showMessage("LOCKED! FIND GOLDEN KEY FIRST!");
    } else {
      if (currentStage < levels.length - 1) {
        stageCleared = true;
        sfx('392:70, 523:70, 659:90, 784:110, 1046:220');
        showMessage("STAGE " + (currentStage + 1) + " CLEARED! PRESS J TO CONTINUE");
        drawScreen();
        return;
      } else {
        isGameWon = true;
        sfx('523:100, 659:100, 784:120, 1046:140, 880:100, 1046:120, 1318:350');
        showMessage("VICTORY! VOIDPULSE 10/10 CLEARED!");
      }
    }
  }

  // Stalker collision check (frozen stalkers cannot catch player!)
  if (stunTimer <= 0) {
    if ((stalkerX !== -1 && playerX === stalkerX && playerY === stalkerY) ||
        (stalker2X !== -1 && playerX === stalker2X && playerY === stalker2Y) ||
        (stalker3X !== -1 && playerX === stalker3X && playerY === stalker3Y) ||
        (stalker4X !== -1 && playerX === stalker4X && playerY === stalker4Y)) {
      isGameOver = true;
      sfx('587:80, 466:90, 415:110, 311:130, 233:160, 164:220, 110:300, 65:500');
      showMessage("CAUGHT BY STALKER! PRESS L TO RETRY");
    }
  }

  drawScreen();
}

// ==========================================
// 11. MONSTER PATHFINDING (BFS)
// ==========================================

function stepStalker(startX, startY, targetX, targetY) {
  if (startX === targetX && startY === targetY) {
    return { x: startX, y: startY };
  }

  const mapData = levels[currentStage];
  const queue = [];
  const visited = [];

  for (let r = 0; r < 15; r++) {
    visited.push(new Array(20).fill(false));
  }
  visited[startY][startX] = true;

  const dirs = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 }
  ];

  for (let i = 0; i < dirs.length; i++) {
    const nx = startX + dirs[i].dx;
    const ny = startY + dirs[i].dy;
    if (nx >= 0 && nx < 20 && ny >= 0 && ny < 15 && mapData[ny][nx] !== 'w') {
      visited[ny][nx] = true;
      queue.push({ x: nx, y: ny, firstDx: dirs[i].dx, firstDy: dirs[i].dy });
    }
  }

  while (queue.length > 0) {
    const node = queue.shift();
    if (node.x === targetX && node.y === targetY) {
      return { x: startX + node.firstDx, y: startY + node.firstDy };
    }

    for (let i = 0; i < dirs.length; i++) {
      const nx = node.x + dirs[i].dx;
      const ny = node.y + dirs[i].dy;
      if (nx >= 0 && nx < 20 && ny >= 0 && ny < 15 && !visited[ny][nx] && mapData[ny][nx] !== 'w') {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny, firstDx: node.firstDx, firstDy: node.firstDy });
      }
    }
  }

  return { x: startX, y: startY };
}

function updateStalkers() {
  if (isGameOver || isGameWon || stageCleared) return;

  const targetX = soundOriginX >= 0 ? soundOriginX : playerX;
  const targetY = soundOriginY >= 0 ? soundOriginY : playerY;

  if (stalkerX !== -1) {
    const nextPos1 = stepStalker(stalkerX, stalkerY, targetX, targetY);
    stalkerX = nextPos1.x;
    stalkerY = nextPos1.y;
  }

  if (stalker2X !== -1) {
    const nextPos2 = stepStalker(stalker2X, stalker2Y, targetX, targetY);
    stalker2X = nextPos2.x;
    stalker2Y = nextPos2.y;
  }

  if (stalker3X !== -1) {
    const nextPos3 = stepStalker(stalker3X, stalker3Y, targetX, targetY);
    stalker3X = nextPos3.x;
    stalker3Y = nextPos3.y;
  }

  if (stalker4X !== -1) {
    const nextPos4 = stepStalker(stalker4X, stalker4Y, targetX, targetY);
    stalker4X = nextPos4.x;
    stalker4Y = nextPos4.y;
  }

  if (stalkerX === soundOriginX && stalkerY === soundOriginY) {
    soundOriginX = -1;
    soundOriginY = -1;
  }

  if (stunTimer <= 0) {
    if ((stalkerX !== -1 && stalkerX === playerX && stalkerY === playerY) ||
        (stalker2X !== -1 && stalker2X === playerX && stalker2Y === playerY) ||
        (stalker3X !== -1 && stalker3X === playerX && stalker3Y === playerY) ||
        (stalker4X !== -1 && stalker4X === playerX && stalker4Y === playerY)) {
      isGameOver = true;
      sfx('587:80, 466:90, 415:110, 311:130, 233:160, 164:220, 110:300, 65:500');
      showMessage("CAUGHT BY STALKER! PRESS L TO RETRY");
    }
  }

  drawScreen();
}

function getClosestStalkerDist() {
  let minD = 999;
  if (stalkerX >= 0) minD = Math.min(minD, Math.abs(stalkerX - playerX) + Math.abs(stalkerY - playerY));
  if (stalker2X >= 0) minD = Math.min(minD, Math.abs(stalker2X - playerX) + Math.abs(stalker2Y - playerY));
  if (stalker3X >= 0) minD = Math.min(minD, Math.abs(stalker3X - playerX) + Math.abs(stalker3Y - playerY));
  if (stalker4X >= 0) minD = Math.min(minD, Math.abs(stalker4X - playerX) + Math.abs(stalker4Y - playerY));
  return minD;
}

// ==========================================
// 12. INPUT MAPPINGS & DYNAMIC GAME TICK
// ==========================================

onInput('w', () => move(0, -1));
onInput('s', () => move(0, 1));
onInput('a', () => move(-1, 0));
onInput('d', () => move(1, 0));

onInput('j', () => {
  if (stageCleared) {
    initStage(currentStage + 1);
    return;
  }
  triggerEcho();
});

onInput('i', () => {
  if (stageCleared) {
    initStage(currentStage + 1);
    return;
  }
  triggerEcho();
});

onInput('k', () => fireFrostfire());
onInput('l', () => initStage(currentStage));

// Dynamic 50ms game loop accumulator for accurate per-stage monster speeds
let elapsedStalkerTimer = 0;
every(50, () => {
  if (isGameOver || isGameWon || stageCleared) return;

  if (stunTimer > 0) {
    stunTimer--;
    return;
  }

  elapsedStalkerTimer += 50;
  const currentSpeed = stalkerSpeeds[currentStage] || 800;
  if (elapsedStalkerTimer >= currentSpeed) {
    elapsedStalkerTimer = 0;
    updateStalkers();
  }
});

// Dynamic audio loop: proximity heartbeat warning and subtle cavern ambient drone
every(100, () => {
  if (isGameOver || isGameWon || stageCleared) return;
  audioTimer += 100;

  if (stunTimer > 0) return;

  const dist = getClosestStalkerDist();

  if (dist <= 3) {
    if (audioTimer >= nextHeartbeatTime) {
      sfx('110:50, 75:80, 55:100'); // Rapid panic heartbeat
      nextHeartbeatTime = audioTimer + 700; // Pulse every 700ms
    }
  } else if (dist <= 5) {
    if (audioTimer >= nextHeartbeatTime) {
      sfx('85:60, 60:90'); // Tense rhythmic thud
      nextHeartbeatTime = audioTimer + 1400; // Pulse every 1.4s
    }
  } else {
    if (audioTimer >= nextAmbientTime) {
      sfx('98:120, 110:140, 82:200'); // Creepy subterranean cavern resonance
      nextAmbientTime = audioTimer + 9000; // Plays every 9 seconds
    }
  }
});

// Passive battery trickle charge: restore 1 charge every 4 seconds
let passiveBatteryTimer = 0;
every(1000, () => {
  if (isGameOver || isGameWon || stageCleared) return;
  passiveBatteryTimer++;
  if (passiveBatteryTimer >= 4) {
    passiveBatteryTimer = 0;
    const maxCharges = currentStage < 3 ? 8 : currentStage < 6 ? 6 : 5;
    if (echoCharges < maxCharges) {
      echoCharges++;
      drawScreen();
    }
  }
});

// Start game on Stage 1
initStage(0);