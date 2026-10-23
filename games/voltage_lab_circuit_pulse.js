/*
@title: Voltage Lab: Circuit Pulse
@author: Aariv Patel
@description: Push and rotate angled optical mirrors across six circuit labs to bounce energy pulses into the target capacitor before your battery drains.
@tags: ['puzzle', 'logic', 'physics']
@addedOn: 2026-10-18
*/

// Sprite Legend Keys:
// p = Engineer (Player)
// # = Insulated Lab Wall (Solid)
// e = Pulse Emitter (Fires East)
// / = Deflector Mirror (/ orientation, pushable + rotatable)
// m = Deflector Mirror (m orientation, pushable + rotatable)
// s = Phase Relay Switch (Opens phase gates when energized)
// g = Locked Phase Gate (Blocks pulse and movement until switch is energized)
// o = Open Phase Gate (Passable by pulse and player)
// c = Target Capacitor Core ( Energize all cores to clear the lab)
// b = Copper Battery Crate (Pushable conductive block, bridges gaps)
// - = Horizontal Pulse Beam
// | = Vertical Pulse Beam
// . = Lab Floor Tile

const playerSprite = bitmap`
................
.....777777.....
....73377337....
....73077037....
....77777777....
.....766667.....
....77777777....
...7777777777...
...7777777777...
...7..7777..7...
......7..7......
.....77..77.....
....711..117....
................
................
................
`;

const wallSprite = bitmap`
1111111111111111
1222222222222201
1211111111111201
121L1111111L1201
1211111111111201
1211111111111201
1211112222111201
1211112002111201
1211112002111201
1211112222111201
1211111111111201
1211111111111201
121L1111111L1201
1211111111111201
1200000000000001
1111111111111111
`;

const emitterSprite = bitmap`
................
..1111111111....
.122222222221...
.12LLLLLLLL2111.
.12L666666L22271
.12L677776LLL771
.12L673376777331
.12L673376777331
.12L677776LLL771
.12L666666L22271
.12LLLLLLLL2111.
.122222222221...
..1111111111....
................
................
................
`;

const mirrorSlashSprite = bitmap`
................
..222......222..
.2112....772112.
.212....773.212.
.......773......
......773.......
.....773........
....773.........
...773..........
..773...........
.212.377....212.
.211277....2112.
..222......222..
................
................
................
`;

const mirrorBackslashSprite = bitmap`
................
..222......222..
.211277....2112.
.212.377....212.
......377.......
.......377......
........377.....
.........377....
..........377...
...........377..
.212....773.212.
.2112....772112.
..222......222..
................
................
................
`;

const switchSprite = bitmap`
................
...1111111111...
..122222222221..
..120000000021..
..120666666021..
..120677776021..
..120673376021..
..120673376021..
..120677776021..
..120666666021..
..120000000021..
..122222222221..
...1111111111...
................
................
................
`;

const gateClosedSprite = bitmap`
..11..11..11..11
..12..12..12..12
4444444444444444
6677667766776677
4444444444444444
..12..12..12..12
..12..12..12..12
4444444444444444
6677667766776677
4444444444444444
..12..12..12..12
..12..12..12..12
4444444444444444
6677667766776677
..12..12..12..12
..11..11..11..11
`;

const gateOpenSprite = bitmap`
..11........11..
..18........81..
................
................
................
..18........81..
..18........81..
................
................
................
..18........81..
..18........81..
................
................
..18........81..
..11........11..
`;

const capacitorSprite = bitmap`
....11111111....
...1222222221...
..129999999921..
..129888888921..
.12983333338921.
.12983888838921.
.12983833838921.
.12983833838921.
.12983888838921.
.12983333338921.
..129888888921..
..129999999921..
...1222222221...
....11111111....
................
................
`;

const batterySprite = bitmap`
................
..555555555555..
.56666666666665.
.56000000000065.
.56077666677065.
.56073766737065.
.56066677666065.
.56066733766065.
.56066733766065.
.56066677666065.
.56073766737065.
.56077666677065.
.56000000000065.
.56666666666665.
..555555555555..
................
`;

const pulseHSprite = bitmap`
................
................
................
................
................
6666666666666666
7777777777777777
3333333333333333
7777777777777777
6666666666666666
................
................
................
................
................
................
`;

const pulseVSprite = bitmap`
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
.....673376.....
`;

const floorSprite = bitmap`
0000000000000000
0000000000000000
00L0000000000L00
0000000000000000
0000000000000000
0000000000000000
0000000LL0000000
000000L00L000000
000000L00L000000
0000000LL0000000
0000000000000000
0000000000000000
0000000000000000
00L0000000000L00
0000000000000000
0000000000000000
`;

setLegend(
  ["p", playerSprite],
  ["#", wallSprite],
  ["e", emitterSprite],
  ["/", mirrorSlashSprite],
  ["m", mirrorBackslashSprite],
  ["s", switchSprite],
  ["g", gateClosedSprite],
  ["o", gateOpenSprite],
  ["c", capacitorSprite],
  ["b", batterySprite],
  ["-", pulseHSprite],
  ["|", pulseVSprite],
  ["f", floorSprite]
);

setBackground("f");

const levels = [
  // Level 1: Basic single deflection into capacitor
  map`
##########
#p.......#
#e....m..#
#........#
#........#
#.....c..#
#........#
##########
`,
  // Level 2: Two mirrors, push into alignment
  map`
##########
#p../....#
#e.......#
#...#....#
#........#
#.m....c.#
#........#
##########
`,
  // Level 3: Unlock the phase gate by hitting the switch first
  map`
##########
#p.....s.#
#e..../..#
#...####.#
#.m..../.#
#..g...c.#
#........#
##########
`,
  // Level 4: Double deflection through a narrow conduit
  map`
##########
#p.m...s.#
#e.......#
####.#####
#..../...#
#.m..g.c.#
#..../...#
##########
`,
  // Level 5: Conductive battery bridge + phase gate routing
  map`
##########
#p..b..m.#
#e.......#
#..###...#
#../...s.#
#..g.....#
#..m...c.#
##########
`,
  // Level 6: Master Lab - Full multi-stage optical circuit
  map`
##########
#p./...s.#
#e.......#
#..##.##.#
#..m.../.#
#.m..g...#
#....m.c.#
##########
`
];

const levelNames = [
  "L1: First Reflection",
  "L2: Twin Deflectors",
  "L3: Phase Relay Gate",
  "L4: Conduit Bypass",
  "L5: Copper Bridge",
  "L6: Master Grid"
];

const levelParSteps = [12, 18, 22, 26, 28, 34];

setSolids(["#", "e", "s", "g", "c"]);
setPushables({
  p: ["/", "m", "b"],
  "/": ["/", "m", "b"],
  "m": ["/", "m", "b"],
  b: ["/", "m", "b"]
});

let currentLevel = 0;
let stepsRemaining = levelParSteps[0];
let totalMoves = 0;
let lastFacingDx = 1;
let lastFacingDy = 0;
let gatesUnlocked = false;
let boosterUsed = false;
let gameWon = false;

function clearBeams() {
  tilesWith("-").forEach((t) => t.remove());
  tilesWith("|").forEach((t) => t.remove());
}

function updateGates(openState) {
  if (openState) {
    tilesWith("g").forEach((t) => {
      const x = t.x;
      const y = t.y;
      t.remove();
      addSprite(x, y, "o");
    });
  } else {
    tilesWith("o").forEach((t) => {
      const x = t.x;
      const y = t.y;
      t.remove();
      addSprite(x, y, "g");
    });
  }
}

function renderHud(statusMsg) {
  clearText();
  if (gameWon) {
    addText("VOLTAGE LAB COMPLETE!", { x: 1, y: 2, color: color`7` });
    addText("All 6 Labs Energized", { x: 1, y: 5, color: color`8` });
    addText("Total Steps: " + totalMoves, { x: 2, y: 8, color: color`6` });
    addText("Press L to Play Again", { x: 1, y: 12, color: color`3` });
    return;
  }
  addText(levelNames[currentLevel], { x: 1, y: 0, color: color`6` });
  addText("Batt:" + stepsRemaining + " J:Fire K:Rot", {
    x: 1,
    y: 15,
    color: stepsRemaining <= 4 ? color`3` : color`2`
  });
  if (statusMsg) {
    addText(statusMsg, { x: 1, y: 1, color: color`8` });
  }
}

function loadLevel(idx) {
  currentLevel = idx;
  stepsRemaining = levelParSteps[idx];
  gatesUnlocked = false;
  boosterUsed = false;
  gameWon = false;
  setMap(levels[idx]);
  renderHud("");
}

function tracePulse() {
  clearBeams();
  const emitters = tilesWith("e");
  if (emitters.length === 0) return { capacitorHit: false, switchJustHit: false };

  let switchJustHit = false;
  let capacitorHit = false;

  const start = emitters[0];
  let x = start.x;
  let y = start.y;
  let dx = 1;
  let dy = 0;
  let safety = 0;

  while (safety < 64) {
    safety++;
    x += dx;
    y += dy;

    if (x < 0 || x >= 10 || y < 0 || y >= 8) break;

    const cell = getTile(x, y);
    const hasWall = cell.some((s) => s.type === "#");
    const hasClosedGate = cell.some((s) => s.type === "g");
    const hasEmitter = cell.some((s) => s.type === "e");

    if (hasWall || hasClosedGate || hasEmitter) {
      break;
    }

    const hasSwitch = cell.some((s) => s.type === "s");
    if (hasSwitch) {
      if (!gatesUnlocked) {
        gatesUnlocked = true;
        switchJustHit = true;
        updateGates(true);
      }
      break;
    }

    const hasBattery = cell.some((s) => s.type === "b");
    if (hasBattery && !boosterUsed) {
      boosterUsed = true;
      stepsRemaining += 4;
    }

    const hasCapacitor = cell.some((s) => s.type === "c");
    if (hasCapacitor) {
      capacitorHit = true;
      break;
    }

    const hasSlash = cell.some((s) => s.type === "/");
    const hasBackslash = cell.some((s) => s.type === "m");

    if (hasSlash) {
      // "/" reflects (1,0)->(0,-1), (-1,0)->(0,1), (0,1)->(-1,0), (0,-1)->(1,0)
      const nextDx = -dy;
      const nextDy = -dx;
      dx = nextDx;
      dy = nextDy;
    } else if (hasBackslash) {
      // "m" reflects (1,0)->(0,1), (-1,0)->(0,-1), (0,1)->(1,0), (0,-1)->(-1,0)
      const nextDx = dy;
      const nextDy = dx;
      dx = nextDx;
      dy = nextDy;
    } else {
      const beamType = dx !== 0 ? "-" : "|";
      addSprite(x, y, beamType);
    }
  }

  return { capacitorHit, switchJustHit };
}

function movePlayer(dx, dy) {
  if (gameWon) return;
  clearBeams();
  lastFacingDx = dx;
  lastFacingDy = dy;

  const p = getFirst("p");
  if (!p) return;

  const oldX = p.x;
  const oldY = p.y;
  p.x += dx;
  p.y += dy;

  if (p.x !== oldX || p.y !== oldY) {
    stepsRemaining--;
    totalMoves++;
    playTune(tune`120: c5~60`);
    if (stepsRemaining <= 0) {
      playTune(tune`140: g3~120 + c3~180`);
      loadLevel(currentLevel);
      renderHud("Battery Drained! Reset");
      return;
    }
  }
  renderHud("");
}

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

// K rotates the mirror directly in front of the engineer (or any adjacent mirror)
onInput("k", () => {
  if (gameWon) return;
  clearBeams();
  const p = getFirst("p");
  if (!p) return;

  const dirs = [
    [lastFacingDx, lastFacingDy],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  for (let i = 0; i < dirs.length; i++) {
    const tx = p.x + dirs[i][0];
    const ty = p.y + dirs[i][1];
    if (tx < 0 || tx >= 10 || ty < 0 || ty >= 8) continue;

    const cell = getTile(tx, ty);
    const slash = cell.find((s) => s.type === "/");
    const backslash = cell.find((s) => s.type === "m");

    if (slash) {
      slash.remove();
      addSprite(tx, ty, "m");
      playTune(tune`150: e5~70`);
      renderHud("Mirror Rotated (\\)");
      return;
    }
    if (backslash) {
      backslash.remove();
      addSprite(tx, ty, "/");
      playTune(tune`150: g5~70`);
      renderHud("Mirror Rotated (/)");
      return;
    }
  }
  renderHud("Stand next to a mirror");
});

// J fires the emitter pulse and checks if the capacitor receives voltage
onInput("j", () => {
  if (gameWon) return;
  const result = tracePulse();
  if (result.capacitorHit) {
    playTune(tune`160: c5~90 + e5~90 + g5~90 + c6~180`);
    if (currentLevel + 1 < levels.length) {
      loadLevel(currentLevel + 1);
      renderHud("Core Charged! Next Lab");
    } else {
      gameWon = true;
      renderHud("");
    }
  } else if (result.switchJustHit) {
    playTune(tune`150: d5~80 + a5~120`);
    renderHud("Phase Gate Unlocked!");
  } else {
    playTune(tune`140: a4~80 + f4~100`);
    renderHud("Pulse Missed Capacitor");
  }
});

// L restarts the current level (or restarts game after winning)
onInput("l", () => {
  if (gameWon) {
    totalMoves = 0;
    loadLevel(0);
    return;
  }
  loadLevel(currentLevel);
  renderHud("Lab Reset");
});

// I cycles levels for quick testing and review
onInput("i", () => {
  const next = (currentLevel + 1) % levels.length;
  loadLevel(next);
  renderHud("Switched to L" + (next + 1));
});

afterInput(() => {
  // Ensure player stays visible above floor tiles
});

loadLevel(0);
