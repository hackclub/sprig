/*
@title: Cyber Heist: Protocol Zero
@author: Mohammed Touffeq
@tags: ['stealth', 'action', 'puzzle', 'cyberpunk', 'tactical']
@addedOn: 2026-10-31
@description: AAA tactical stealth game in 16x16 retro cyber aesthetics. Infiltrate 6 corporate security sectors, evade patrolling heavy mechs, bypass high-voltage laser grids using EMP battery cells, and extract the Quantum AI Mainframe!
*/

const player = "p";
const wall = "w";
const guard = "g";
const box = "b";
const swtch = "s";
const laser = "l";
const key = "k";
const door = "d";
const core = "c";

setLegend(
  [player, bitmap`
.....000000.....
....01111110....
...0188888810...
...088DDDD880...
...088DDDD880...
...0188888810...
....00111100....
...0199999910...
..0199DDDD9910..
..0199DDDD9910..
..019999999910..
...0199009910...
....09900990....
....09900990....
...0110..0110...
...000....000...
`],
  [guard, bitmap`
.....000000.....
....01111110....
...0155555510...
...0553333550...
...0553333550...
...0155555510...
....00111100....
...0144444410...
..014455554410..
..014455554410..
..014444444410..
...0144004410...
....04400440....
....04400440....
...0110..0110...
...000....000...
`],
  [box, bitmap`
0000000000000000
0111111111111110
01DDDDDDDDDDDD10
01D0000000000D10
01D0999999990D10
01D09.0880.90D10
01D09.0880.90D10
01D0900880090D10
01D0900880090D10
01D09.0880.90D10
01D09.0880.90D10
01D0999999990D10
01D0000000000D10
01DDDDDDDDDDDD10
0111111111111110
0000000000000000
`],
  [swtch, bitmap`
................
.00000000000000.
.01111111111110.
.01666666666610.
.01600000000610.
.01607777770610.
.01607.66.70610.
.01607666670610.
.01607666670610.
.01607.66.70610.
.01607777770610.
.01600000000610.
.01666666666610.
.01111111111110.
.00000000000000.
................
`],
  [laser, bitmap`
0000000000000000
0111111111111110
....00555500....
....05533550....
....05533550....
....05533550....
....05533550....
....05533550....
....05533550....
....05533550....
....05533550....
....05533550....
....05533550....
....00555500....
0111111111111110
0000000000000000
`],
  [wall, bitmap`
0000000000000000
0111111111111110
0100000000000010
0109999999999010
0109000000009010
0109088888809010
0109080000809010
0109080..0809010
0109080..0809010
0109080000809010
0109088888809010
0109000000009010
0109999999999010
0100000000000010
0111111111111110
0000000000000000
`],
  [key, bitmap`
................
.....000000.....
....05555550....
...0550000550...
...050....050...
...050....050...
...0550000550...
....05555550....
.....005500.....
.......0500.....
.......05550....
.......0500.....
.......05550....
.......050......
.......00.......
................
`],
  [door, bitmap`
0000000000000000
0111111111111110
0144444444444410
0140000000000410
0140555555550410
01405......50410
01405..00..50410
01405.0550.50410
01405.0550.50410
01405..00..50410
01405......50410
0140555555550410
0140000000000410
0144444444444410
0111111111111110
0000000000000000
`],
  [core, bitmap`
......0000......
....00111100....
...0188DD8810...
..018DDDDDD810..
..08DD3333DD80..
.01DD355553DD10.
.01DD355553DD10.
.08DD355553DD80.
.08DD355553DD80.
.01DD355553DD10.
.01DD355553DD10.
..08DD3333DD80..
..018DDDDDD810..
...0188DD8810...
....00111100....
......0000......
`]
);

setSolids([player, wall, door, laser, guard, box]);
setPushables({ [player]: [box] });

const levels = [
  // Sector 1: Perimeter Infiltration
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwwww.w
w.w....w.w...w.w
w.w.ww.w.w.w.w.w
w.w..w.w.w.w.w.w
w.ww.w.w.w.w.w.w
w....w...w.w.w.w
wwwwww.www.w.w.w
w......w...w.w.w
w.wwwwww.www.w.w
w.w....w.....w.w
w.w.ww.wwwww.w.w
w...w..d....cw.w
w.k.w..w.....w.w
wwwwwwwwwwwwwwww
`,
  // Sector 2: Sentry Drone Patrol
  map`
wwwwwwwwwwwwwwww
wp.............w
wwwwww.wwwwwww.w
w......g.......w
w.wwwwwwwwwwww.w
w..............w
wwwwwwwwwwwwww.w
w......g.......w
w.wwwwwwwwwwww.w
w..............w
wwwwwwwwwwwwww.w
w..k...g.......w
w.wwwwwwwwwwww.w
w...wd......cw.w
w...w........w.w
wwwwwwwwwwwwwwww
`,
  // Sector 3: Laser Grid & Power Coupling
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwww.wwwww.w
w.w....w.w...w.w
w.w.b..w.w.s.w.w
w.w....w.w...w.w
w.wwwwww.wwwww.w
w..............w
wwwwww.l.wwwwwww
w......l.......w
w.wwwwwwwwwwww.w
w.w..........k.w
w.w.wwwwwwwwww.w
w...wd......cw.w
w...w..........w
wwwwwwwwwwwwwwww
`,
  // Sector 4: Double Enforcer Corridors
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwwwwwwww.w
w.w..g......kw.w
w.w.wwwwwwwwww.w
w.w..........w.w
w.wwwwwwwwww.w.w
w.w..g.......w.w
w.w.wwwwwwwwww.w
w.w..........w.w
w.wwwwwwwwww.w.w
w.w..g.......w.w
w.w.wwwwwwwwww.w
w...wd......cw.w
w...w..........w
wwwwwwwwwwwwwwww
`,
  // Sector 5: High-Voltage Coolant Core
  map`
wwwwwwwwwwwwwwww
wp...w.s.....w.w
w.ww.w.l.www.w.w
w.w..w.l.w...w.w
w.w.bw...w.www.w
w.w..w.w.w.w...w
w.wwww.w.w.w.w.w
w......w.w.w.w.w
wwwwww.w.w.w.w.w
w......w.w...w.w
w.wwwwww.wwwww.w
w.w..........k.w
w.w.wwwwwwwwww.w
w...wd......cw.w
w...w..........w
wwwwwwwwwwwwwwww
`,
  // Sector 6: Central AI Supercomputer Vault
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwww.www.www.w
w.w.s..w.l.w.s.w
w.w.b..w.l.w.b.w
w.w....w.l.w...w
w.wwww.w.l.w.w.w
w......w.l.w.w.w
wwwwww.w.l.w.w.w
w......w...w.w.w
w.wwwwww.www.w.w
w.w..g...g...k.w
w.w.wwwwwwwwww.w
w...wd......cw.w
w...w..........w
wwwwwwwwwwwwwwww
`
];

let currentLevel = 0;
let hasKey = false;
let shields = 3;
let stealthScore = 1000;
let stepsTaken = 0;
let guardDirections = [1, -1, 1, -1];

setMap(levels[currentLevel]);

const sndMove = tune`
  140: c4-10
`;

const sndKey = tune`
  180: e4-10 g4-10 c5-20 e5-20
`;

const sndDoor = tune`
  180: f4-10 d4-10 a3-20
`;

const sndAlert = tune`
  200: f5-20 c5-20 f5-20 c5-20
`;

const sndEmp = tune`
  220: c4-10 g4-10 c5-20 g5-30
`;

const sndWin = tune`
  250: c4-10 e4-10 g4-10 c5-20 e5-20 g5-30 c6-40
`;

function moveGuards() {
  const allGuards = getAll(guard);
  allGuards.forEach((g, idx) => {
    let dir = guardDirections[idx % guardDirections.length] || 1;
    let nextX = g.x + dir;
    let tileSprites = getTile(nextX, g.y);
    let blocked = tileSprites.some(s => s.type === wall || s.type === door || s.type === laser || s.type === box);
    if (blocked || nextX <= 0 || nextX >= 15) {
      guardDirections[idx % guardDirections.length] = -dir;
    } else {
      g.x = nextX;
    }
  });
}

function checkEMP() {
  const switches = getAll(swtch);
  let allActivated = switches.length > 0;
  switches.forEach(s => {
    let hasBox = getTile(s.x, s.y).some(item => item.type === box);
    if (!hasBox) allActivated = false;
  });

  if (allActivated && switches.length > 0) {
    const lasers = getAll(laser);
    if (lasers.length > 0) {
      lasers.forEach(l => l.remove());
      playTune(sndEmp);
      addText("EMP ONLINE: LASERS OFFLINE", { y: 1, color: "6" });
    }
  }
}

function checkCollisions() {
  const p = getFirst(player);
  if (!p) return;

  // Keycard pickup
  const keysOnTile = getTile(p.x, p.y).filter(s => s.type === key);
  if (keysOnTile.length > 0) {
    keysOnTile.forEach(k => k.remove());
    hasKey = true;
    playTune(sndKey);
    addText("ENCRYPTION KEYCARD ACQUIRED", { y: 1, color: "5" });
  }

  // Guard proximity alert
  const guardsNear = getAll(guard).filter(g => {
    let dist = Math.abs(g.x - p.x) + Math.abs(g.y - p.y);
    return dist <= 1;
  });

  if (guardsNear.length > 0) {
    shields--;
    stealthScore = Math.max(0, stealthScore - 150);
    playTune(sndAlert);
    if (shields <= 0) {
      addText("BREACH DETECTED! RESETTING SECTOR...", { y: 7, color: "3" });
      shields = 3;
      hasKey = false;
      setMap(levels[currentLevel]);
      return;
    } else {
      addText("ALERT! SHIELD: " + shields + "/3", { y: 1, color: "3" });
      p.x = 1;
      p.y = 1;
    }
  }

  // AI Core extracted -> Sector clear
  const coresOnTile = getTile(p.x, p.y).filter(s => s.type === core);
  if (coresOnTile.length > 0) {
    playTune(sndWin);
    currentLevel++;
    if (currentLevel < levels.length) {
      hasKey = false;
      shields = 3;
      setMap(levels[currentLevel]);
      clearText();
      addText("SECTOR " + (currentLevel + 1) + " BREACHED! SCORE: " + stealthScore, { y: 1, color: "6" });
    } else {
      clearText();
      addText("MISSION COMPLETE! RANK: GHOST OPERATIVE", { y: 7, color: "5" });
    }
  }
}

function tryOpenDoor(targetX, targetY) {
  const doors = getTile(targetX, targetY).filter(s => s.type === door);
  if (doors.length > 0 && hasKey) {
    doors.forEach(d => d.remove());
    hasKey = false;
    playTune(sndDoor);
    addText("SECURITY BLAST DOOR UNLOCKED", { y: 1, color: "6" });
    return true;
  }
  return false;
}

afterInput(() => {
  stepsTaken++;
  moveGuards();
  checkEMP();
  checkCollisions();
});

onInput("w", () => {
  const p = getFirst(player);
  if (!p) return;
  tryOpenDoor(p.x, p.y - 1);
  p.y -= 1;
  playTune(sndMove);
});

onInput("s", () => {
  const p = getFirst(player);
  if (!p) return;
  tryOpenDoor(p.x, p.y + 1);
  p.y += 1;
  playTune(sndMove);
});

onInput("a", () => {
  const p = getFirst(player);
  if (!p) return;
  tryOpenDoor(p.x - 1, p.y);
  p.x -= 1;
  playTune(sndMove);
});

onInput("d", () => {
  const p = getFirst(player);
  if (!p) return;
  tryOpenDoor(p.x + 1, p.y);
  p.x += 1;
  playTune(sndMove);
});
