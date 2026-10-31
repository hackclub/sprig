/*
@title: Cyber Heist: Protocol Zero
@author: Mohammed Touffeq
@tags: ['stealth', 'action', 'puzzle', 'cyberpunk', 'boss']
@addedOn: 2026-10-31
@description: A 6-floor tactical stealth game! Infiltrate corporate mega-vaults, evade patrolling robotic guards, push EMP power cells to disable deadly laser grids, and hack the central AI core!
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
................
....00000000....
...0888888880...
..083388883380..
..083388883380..
..088888888880..
..088888888880..
...0880000880...
....00111100....
...0199999910...
...0999999990...
...0999999990...
....09900990....
....09900990....
....000..000....
................
`],
  [guard, bitmap`
................
....00000000....
...0555555550...
..053355553350..
..053355553350..
..055555555550..
...0550000550...
....00444400....
...0411111140...
...0111111110...
...0110000110...
...0110000110...
....01100110....
....01100110....
....000..000....
................
`],
  [box, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0D000000000000D0
0D099999999990D0
0D09..0990..90D0
0D09..0990..90D0
0D090009900090D0
0D099999999990D0
0D099999999990D0
0D090009900090D0
0D09..0990..90D0
0D09..0990..90D0
0D099999999990D0
0D000000000000D0
0DDDDDDDDDDDDDD0
0000000000000000
`],
  [swtch, bitmap`
................
.00000000000000.
.06666666666660.
.06000000000060.
.06077777777060.
.0607......7060.
.0607..66..7060.
.0607.6666.7060.
.0607.6666.7060.
.0607..66..7060.
.0607......7060.
.06077777777060.
.06000000000060.
.06666666666660.
.00000000000000.
................
`],
  [laser, bitmap`
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
.....05500550...
`],
  [wall, bitmap`
0000000000000000
0111111111111110
0199999999999910
0190000000000910
0190888888880910
0190800000080910
019080....080910
019080....080910
019080....080910
019080....080910
0190800000080910
0190888888880910
0190000000000910
0199999999999910
0111111111111110
0000000000000000
`],
  [key, bitmap`
................
................
.....55555......
....55...55.....
....55...55.....
.....55555......
......555.......
......555.......
......55555.....
......555.......
......55555.....
......555.......
......555.......
................
................
................
`],
  [door, bitmap`
0000000000000000
0444444444444440
0400000000000040
0405555555555040
0405.......55040
0405...00..55040
0405..0550.55040
0405..0550.55040
0405...00..55040
0405.......55040
0405.......55040
0405555555555040
0400000000000040
0444444444444440
0000000000000000
0000000000000000
`],
  [core, bitmap`
................
.......00.......
.....00DD00.....
....0DDDDDD0....
...0DD3333DD0...
..0DDD3553DDD0..
..0DDD3553DDD0..
.0DDDD3553DDDD0.
.0DDDD3553DDDD0.
..0DDD3553DDD0..
..0DDD3553DDD0..
...0DD3333DD0...
....0DDDDDD0....
.....00DD00.....
.......00.......
................
`]
);

setSolids([player, wall, door, laser, guard, box]);
setPushables({ [player]: [box] });

const levels = [
  // Sector 1: Cyber Security Infiltration
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
  // Sector 2: Robotic Guard Patrol
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
  // Sector 3: EMP Power Grid & Lasers
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
  // Sector 4: Double Guard Matrix
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
  // Sector 5: Reactor Core Complex
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
  // Sector 6: Final Boss AI Chamber
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
      addText("EMP ONLINE: LASERS DOWN", { y: 1, color: "6" });
    }
  }
}

function checkCollisions() {
  const p = getFirst(player);
  if (!p) return;

  // Key pickup
  const keysOnTile = getTile(p.x, p.y).filter(s => s.type === key);
  if (keysOnTile.length > 0) {
    keysOnTile.forEach(k => k.remove());
    hasKey = true;
    playTune(sndKey);
    addText("KEYCARD ACQUIRED", { y: 1, color: "5" });
  }

  // Guard detection / Alert
  const guardsNear = getAll(guard).filter(g => {
    let dist = Math.abs(g.x - p.x) + Math.abs(g.y - p.y);
    return dist <= 1;
  });

  if (guardsNear.length > 0) {
    shields--;
    playTune(sndAlert);
    if (shields <= 0) {
      addText("SHIELD DEPLETED! RESTARTING SECTOR...", { y: 7, color: "3" });
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

  // Core reached -> Next level
  const coresOnTile = getTile(p.x, p.y).filter(s => s.type === core);
  if (coresOnTile.length > 0) {
    playTune(sndWin);
    currentLevel++;
    if (currentLevel < levels.length) {
      hasKey = false;
      shields = 3;
      setMap(levels[currentLevel]);
      clearText();
      addText("SECTOR " + (currentLevel + 1) + " INFILTRATED!", { y: 1, color: "6" });
    } else {
      clearText();
      addText("MISSION COMPLETE! AI CORE EXTRACTED!", { y: 7, color: "5" });
    }
  }
}

function tryOpenDoor(targetX, targetY) {
  const doors = getTile(targetX, targetY).filter(s => s.type === door);
  if (doors.length > 0 && hasKey) {
    doors.forEach(d => d.remove());
    hasKey = false;
    playTune(sndDoor);
    addText("GATE UNLOCKED", { y: 1, color: "6" });
    return true;
  }
  return false;
}

afterInput(() => {
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
