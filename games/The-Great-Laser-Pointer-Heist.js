/*
  @title: The Great Laser Pointer Heist
  @author: thisisnaman
  @tags: ['puzzle', 'stealth', 'meme', 'gravity']
  @addedOn: 2026-10-08
  @description: Play as Garfield-X the meme cat! Flip gravity, dodge Dr. Stick's flashlight patrols, grab all fish energy drives, and steal the legendary red laser pointer across 7 security zones!
*/

// ===================================================
// 1. SPRITE BITMAP DEFINITIONS (16x16)
// ===================================================

// Clean white backdrop tile for the intro/instructions screen
const whiteTile = bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
`;

// Wall / Laboratory Steel Barrier
const wall = bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0DCCCCCCCCCCCCD0
0DC..........CD0
0DC.DDDDDDDD.CD0
0DC.D......D.CD0
0DC.D......D.CD0
0DC.D......D.CD0
0DC.D......D.CD0
0DC.D......D.CD0
0DC.D......D.CD0
0DC.DDDDDDDD.CD0
0DC..........CD0
0DCCCCCCCCCCCCD0
0DDDDDDDDDDDDDD0
0000000000000000
`;

// Garfield-X: Meme Cat with :3 smug expression
const cat = bitmap`
................
..00........00..
..030......030..
..000000000000..
.00000000000000.
.00LL000000LL00.
.00LL000000LL00.
.000000LL000000.
.00000L00L00000.
.000000LL000000.
..000000000000..
.00000000000000.
.00.00000000.00.
....00....00....
....00....00....
................
`;

// Dr. Stick: Laboratory Patrol Scientist
const stickman = bitmap`
......LLLL......
.....L....L.....
.....L....L.....
......LLLL......
.......LL.......
....LLLLLLLL....
...L...LL...L...
...L...LL...L...
.......LL.......
.......LL.......
......L..L......
.....L....L.....
....L......L....
...L........L...
..L..........L..
................
`;

// Flashlight Detection Beam (Hazard)
const beam = bitmap`
................
................
................
..777777777777..
.77777777777777.
.77337777773377.
.77337777773377.
.77777777777777.
.77777777777777.
.77337777773377.
.77337777773377.
.77777777777777.
..777777777777..
................
................
................
`;

// Fish Energy Drive (Required collectable)
const fish = bitmap`
................
................
.....55.........
...555555.......
..55555555..55..
.55L55555555555.
.55555555555555.
..55555555..55..
...555555.......
.....55.........
................
................
................
................
................
................
`;

// Gravity Inverter Pad
const gravPad = bitmap`
................
................
.......CC.......
......CCCC......
.....CCCCCC.....
....CCCCCCCC....
.......CC.......
.......CC.......
.......CC.......
.......CC.......
....CCCCCCCC....
.....CCCCCC.....
......CCCC......
.......CC.......
................
................
`;

// The Holy Red Laser Pointer (Stage Exit Goal)
const laserGoal = bitmap`
................
................
.....333333.....
....33333333....
...3333333333...
...3344444433...
...3344334433...
...3344334433...
...3344444433...
...3333333333...
....33333333....
.....333333.....
................
................
................
................
`;

// Vertical Patrol Sentry (Dr. Stick - Vertical Sweeper)
const verticalGuard = bitmap`
......LLLL......
.....L.33.L.....
.....L....L.....
......LLLL......
.......LL.......
....LLLLLLLL....
...L...LL...L...
.......LL.......
.......LL.......
......L..L......
.....L....L.....
....L......L....
...L........L...
..L..........L..
................
................
`;

// Golden Victory Trophy
const trophy = bitmap`
................
..777777777777..
..700000000007..
.77000000000077.
.7.7000000007.7.
.7.7000000007.7.
..770000000077..
...7700000077...
....77000077....
.....770077.....
......7007......
......7007......
.....770077.....
....77000077....
...7777777777...
................
`;

// ===================================================
// 2. ENGINE LEGEND REGISTRATION
// ===================================================
setLegend(
  [ "w", wall ],
  [ "k", whiteTile ],
  [ "p", cat ],
  [ "s", stickman ],
  [ "v", verticalGuard ],
  [ "b", beam ],
  [ "f", fish ],
  [ "g", gravPad ],
  [ "l", laserGoal ],
  [ "t", trophy ]
);

// ===================================================
// 3. MAP SCREENS & LEVEL CONFIGURATIONS
// ===================================================

// Clean instruction / transition screen covered entirely by white background tiles
const whiteScreenMap = map`
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
`;

// Clean victory screen with Trophy
const winMap = map`
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkttk0kkkkk
kkkkkkkttk0kkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkppkkkkkkk
kkkkkkkppkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkk
`;

// Level Names & descriptions for clean white transitions
const levelMeta = [
  { name: "ZONE 1: VENTILATION SHAFT", tip: "Dr. Stick patrols horizontally. Grab fish and exit!" },
  { name: "ZONE 2: INVERSION TOWER", tip: "Vertical guards sweep up and down! Watch the beam." },
  { name: "ZONE 3: CROSSFIRE CORRIDOR", tip: "Both horizontal and vertical guards overlap here!" },
  { name: "ZONE 4: THE TWIN LABYRINTH", tip: "Use gravity pad G to bypass sentry patrol choke points." },
  { name: "ZONE 5: SENTRY INTERCHANGE", tip: "Multiple patrols! Time your movement through the middle." },
  { name: "ZONE 6: THE CEILING VAULT", tip: "Fish drives are high up. Invert gravity to collect them!" },
  { name: "ZONE 7: RED CORE SANCTUM", tip: "Final security layer! Outsmart all guards to win the Trophy!" }
];

const playableLevels = [
  // Zone 1: The Ventilation Hallway (Open vertical ladders on left & right sides)
  map`
wwwwwwwwwwwwwwww
w.p..........f.w
w..............w
w...wwwwwwww...w
w..............w
w.......s......w
w..............w
w...wwwwwwww...w
w..............w
w..f...........w
w..............w
w...wwwwwwww...w
w..............w
w.......s......w
w......f.....l.w
wwwwwwwwwwwwwwww
`,

  // Zone 2: Inversion Tower (Wide open 3-column thoroughfare, zero blocked pillars)
  map`
wwwwwwwwwwwwwwww
w.p...w....w.f.w
w.....w....w...w
w..f..w.v..w...w
w.....w....w...w
w.....w....w...w
w..............w
w..wwww....ww..w
w..............w
w...w....w.....w
w...w.v..w..f..w
w...w....w.....w
w...w....w.....w
w..............w
w..g.........l.w
wwwwwwwwwwwwwwww
`,

  // Zone 3: Crossfire Corridor (Open doorways on left and right borders)
  map`
wwwwwwwwwwwwwwww
w.p............w
w...wwwwwwww...w
w...w........f.w
w.v.w....s.....w
w...w..........w
w...wwww.www...w
w...f..........w
w...wwww.www...w
w...w..........w
w...w....s.....w
w.v.w........f.w
w...wwwwwwww...w
w..............w
w..g.........l.w
wwwwwwwwwwwwwwww
`,

  // Zone 4: The Twin Labyrinth (Dual vertical lanes with wide central bypasses)
  map`
wwwwwwwwwwwwwwww
w.p............w
w...s...g......w
w..............w
wwww....ww..wwww
w...f......f...w
w..v........v..w
w..............w
w..s........s..w
w..............w
w..g........g..w
wwww....ww..wwww
w..............w
w......s.......w
w......f....l..w
wwwwwwwwwwwwwwww
`,

  // Zone 5: Sentry Interchange (Continuous perimeter lanes & central hub openings)
  map`
wwwwwwwwwwwwwwww
w.p....w....f..w
w......w..v....w
w..s...w.......w
w......w.......w
w...wwwww..w...w
w..............w
w.g.....s....f.w
w..............w
w...w..wwwww...w
w......w..v....w
w..s...w.......w
w......w.......w
w...g......f...w
w............l.w
wwwwwwwwwwwwwwww
`,

  // Zone 6: The Ceiling Vault (Side passages and middle stairs)
  map`
wwwwwwwwwwwwwwww
w.p.f..w..f..f.w
w......w.......w
w.v....w....v..w
w......w.......w
w..wwwww..wwwww.w
w..............w
w......s.......w
w.g............w
w..wwwww..wwwww.w
w..w........w..w
w..w...s....w..w
w..w........w..w
w..wwwww..wwwww.w
w.g..........l.w
wwwwwwwwwwwwwwww
`,

  // Zone 7: Red Core Sanctum (Guaranteed outer perimeter loops and open vaults)
  map`
wwwwwwwwwwwwwwww
w.p....w.f..w..w
w..v...w....w.vw
w......w....w..w
w...wwww..ww...w
w..............w
w..s...f...s...w
w..............w
w...ww..wwww...w
w.g....w....w.gw
w......w....w..w
w..v...w.f..w.vw
w......ww..w...w
w..............w
w......s.....l.w
wwwwwwwwwwwwwwww
`
];

// ===================================================
// 4. GAME STATE
// ===================================================
let gameState = "INTRO"; // "INTRO", "TRANSITION", "PLAYING", "BUSTED", "WIN"
let currentLevelIdx = 0;
let fishCollected = 0;
let totalFishInLevel = 0;
let gravityInverted = false;
let guards = [];
let bustedTimer = null;

// ===================================================
// 5. HUD & TEXT OVERLAYS
// ===================================================

function updateHUD() {
  clearText();
  if (gameState === "INTRO") {
    addText("THE GREAT LASER HEIST", { y: 1, color: color`3` });
    addText("Dr. Stick guards the Red Laser", { y: 3, color: color`0` });
    addText("Controls: WASD Move - J Flip Grav", { y: 5, color: color`D` });
    addText("Goal: Eat all fish treats, reach exit", { y: 7, color: color`5` });
    addText("Dodge yellow flashlight beams", { y: 9, color: color`3` });
    addText("Watch out for horizontal & vertical guards", { y: 11, color: color`0` });
    addText("Press K anytime to reset level", { y: 13, color: color`D` });
    addText("PRESS J OR W TO START", { y: 14, color: color`3` });
  } else if (gameState === "TRANSITION") {
    const meta = levelMeta[currentLevelIdx] || { name: `ZONE ${currentLevelIdx + 1}`, tip: "Stay sharp!" };
    addText(meta.name, { y: 2, color: color`3` });
    addText(`PREPARE GARFIELD-X!`, { y: 4, color: color`0` });
    addText(`LEVEL ${currentLevelIdx + 1} OF ${playableLevels.length}`, { y: 6, color: color`D` });
    addText(`MISSION INTEL:`, { y: 8, color: color`5` });
    addText(meta.tip, { y: 10, color: color`0` });
    addText(`PRESS J OR W TO ENTER ZONE`, { y: 13, color: color`3` });
  } else if (gameState === "PLAYING") {
    const gravText = gravityInverted ? "CEILING" : "FLOOR";
    addText(`ZONE ${currentLevelIdx + 1}/${playableLevels.length}  FISH: ${fishCollected}/${totalFishInLevel}  GRAV: ${gravText}`, {
      y: 0,
      color: color`0`
    });
  } else if (gameState === "BUSTED") {
    addText("BUSTED BY DR. STICK!", { y: 3, color: color`3` });
    addText("Flashlight beam detected Garfield-X!", { y: 6, color: color`0` });
    addText("Stay in cover and time your runs!", { y: 8, color: color`D` });
    addText("RESTARTING ZONE...", { y: 11, color: color`3` });
  } else if (gameState === "WIN") {
    addText("HEIST COMPLETE!", { y: 1, color: color`3` });
    addText("GOLDEN TROPHY UNLOCKED!", { y: 3, color: color`7` });
    addText("Garfield-X stole the Red Laser Pointer!", { y: 5, color: color`5` });
    addText("All 7 laboratory zones cleared!", { y: 8, color: color`0` });
    addText("Dr. Stick is totally baffled forever!", { y: 10, color: color`D` });
    addText("PRESS J TO REPLAY HEIST", { y: 14, color: color`3` });
  }
}

// ===================================================
// 6. LEVEL INITIALIZATION
// ===================================================

function getPlayer() {
  return getFirst("p");
}

function clearTileType(type) {
  const tiles = getAll(type);
  if (tiles) {
    tiles.forEach(t => t.remove());
  }
}

function setupGuards() {
  guards = [];
  clearTileType("b");

  // Setup Horizontal Guards (s)
  const hGuards = getAll("s");
  if (hGuards) {
    hGuards.forEach((g, idx) => {
      guards.push({
        sprite: g,
        axis: "h",
        dir: idx % 2 === 0 ? 1 : -1
      });
    });
  }

  // Setup Vertical Guards (v)
  const vGuards = getAll("v");
  if (vGuards) {
    vGuards.forEach((g, idx) => {
      guards.push({
        sprite: g,
        axis: "v",
        dir: idx % 2 === 0 ? 1 : -1
      });
    });
  }
}

function showTransitionScreen(idx) {
  gameState = "TRANSITION";
  currentLevelIdx = idx;
  clearTileType("b");
  setMap(whiteScreenMap);
  updateHUD();
  playTune(tune`500:c5-100 650:g5-150`);
}

function startLevel(idx) {
  gameState = "PLAYING";
  currentLevelIdx = idx;
  gravityInverted = false;
  setMap(playableLevels[currentLevelIdx]);

  const allFish = getAll("f");
  totalFishInLevel = allFish ? allFish.length : 0;
  fishCollected = 0;

  setupGuards();
  updateHUD();
}

function showIntroScreen() {
  gameState = "INTRO";
  clearTileType("b");
  setMap(whiteScreenMap);
  updateHUD();
}

function showWinScreen() {
  gameState = "WIN";
  clearTileType("b");
  setMap(winMap);
  updateHUD();
  playTune(tune`
    500:c5-150
    600:e5-150
    700:g5-150
    900:c6-250
    1000:e6-400
  `);
}

// ===================================================
// 7. PATROL & BEAM AI (Horizontal & Vertical)
// ===================================================

function updatePatrols() {
  if (gameState !== "PLAYING") return;

  clearTileType("b");

  guards.forEach(guard => {
    let nx = guard.sprite.x;
    let ny = guard.sprite.y;

    if (guard.axis === "h") {
      nx += guard.dir;
      const hitWall = getTile(nx, ny).some(s => s.type === "w");
      if (hitWall || nx <= 0 || nx >= 15) {
        guard.dir *= -1;
        nx = guard.sprite.x + guard.dir;
      } else {
        guard.sprite.x = nx;
      }

      // Flashlight beam projects 2 tiles horizontally
      for (let dist = 1; dist <= 2; dist++) {
        let bx = guard.sprite.x + (guard.dir * dist);
        let by = guard.sprite.y;

        if (bx > 0 && bx < 15) {
          let wallAtBeam = getTile(bx, by).some(s => s.type === "w");
          if (wallAtBeam) break;

          addSprite(bx, by, "b");

          const player = getPlayer();
          if (player && player.x === bx && player.y === by) {
            triggerBusted();
            return;
          }
        }
      }
    } else {
      // Vertical sentry sweeps up and down
      ny += guard.dir;
      const hitWall = getTile(nx, ny).some(s => s.type === "w");
      if (hitWall || ny <= 0 || ny >= 15) {
        guard.dir *= -1;
        ny = guard.sprite.y + guard.dir;
      } else {
        guard.sprite.y = ny;
      }

      // Flashlight beam projects 2 tiles vertically
      for (let dist = 1; dist <= 2; dist++) {
        let bx = guard.sprite.x;
        let by = guard.sprite.y + (guard.dir * dist);

        if (by > 0 && by < 15) {
          let wallAtBeam = getTile(bx, by).some(s => s.type === "w");
          if (wallAtBeam) break;

          addSprite(bx, by, "b");

          const player = getPlayer();
          if (player && player.x === bx && player.y === by) {
            triggerBusted();
            return;
          }
        }
      }
    }
  });

  const player = getPlayer();
  if (player) {
    guards.forEach(g => {
      if (g.sprite.x === player.x && g.sprite.y === player.y) {
        triggerBusted();
      }
    });
  }
}

function triggerBusted() {
  if (gameState !== "PLAYING") return;
  gameState = "BUSTED";
  clearTileType("b");
  setMap(whiteScreenMap);
  updateHUD();

  playTune(tune`
    320:d4-150
    240:c4-250
    180:a3-350
  `);

  if (bustedTimer) clearTimeout(bustedTimer);
  bustedTimer = setTimeout(() => {
    startLevel(currentLevelIdx);
  }, 1400);
}

// ===================================================
// 8. MOVEMENT, INTERACTION & GRAVITY
// ===================================================

function applyGravity() {
  if (gameState !== "PLAYING") return;
  const player = getPlayer();
  if (!player) return;

  const dy = gravityInverted ? -1 : 1;
  let targetY = player.y + dy;

  while (targetY >= 0 && targetY <= 15) {
    let blocked = getTile(player.x, targetY).some(s => s.type === "w");
    if (blocked) break;

    player.y = targetY;
    handleInteractions(player.x, player.y);
    targetY = player.y + dy;
  }
}

function handleInteractions(x, y) {
  const player = getPlayer();
  if (!player) return;

  // 1. Collect Fish Energy
  const fishHere = getTile(x, y).find(s => s.type === "f");
  if (fishHere) {
    fishHere.remove();
    fishCollected++;
    playTune(tune`550:c5-80 650:g5-120`);
    updateHUD();
  }

  // 2. Step on Gravity Pad
  const padHere = getTile(x, y).find(s => s.type === "g");
  if (padHere) {
    gravityInverted = !gravityInverted;
    playTune(tune`420:e4-120 750:b5-180`);
    updateHUD();
    applyGravity();
  }

  // 3. Goal check: Red Laser Pointer
  const goalHere = getTile(x, y).find(s => s.type === "l");
  if (goalHere) {
    if (fishCollected >= totalFishInLevel) {
      if (currentLevelIdx < playableLevels.length - 1) {
        playTune(tune`600:c5-100 750:e5-100 900:c6-250`);
        showTransitionScreen(currentLevelIdx + 1);
      } else {
        showWinScreen();
      }
    } else {
      playTune(tune`220:e3-150`);
    }
  }

  // 4. Beam Alert
  const beamHere = getTile(x, y).find(s => s.type === "b");
  if (beamHere) {
    triggerBusted();
  }
}

function tryMove(dx, dy) {
  if (gameState !== "PLAYING") return;
  const player = getPlayer();
  if (!player) return;

  const tx = player.x + dx;
  const ty = player.y + dy;

  // Ensure boundaries and wall collisions are respected (0-15 grid coordinates)
  if (tx < 0 || tx > 15 || ty < 0 || ty > 15) return;
  const isWall = getTile(tx, ty).some(s => s.type === "w");
  if (isWall) return;

  player.x = tx;
  player.y = ty;

  handleInteractions(player.x, player.y);
}

// ===================================================
// 9. CONTROLLER INPUT BINDINGS
// ===================================================

onInput("w", () => {
  if (gameState === "INTRO" || gameState === "TRANSITION") {
    startLevel(currentLevelIdx);
  } else if (gameState === "BUSTED") {
    if (bustedTimer) clearTimeout(bustedTimer);
    startLevel(currentLevelIdx);
  } else {
    tryMove(0, -1);
  }
});

onInput("s", () => {
  tryMove(0, 1);
});

onInput("a", () => {
  tryMove(-1, 0);
});

onInput("d", () => {
  tryMove(1, 0);
});

// Flip Gravity or progress through screens
onInput("j", () => {
  if (gameState === "INTRO" || gameState === "TRANSITION") {
    startLevel(currentLevelIdx);
  } else if (gameState === "WIN") {
    currentLevelIdx = 0;
    showIntroScreen();
  } else if (gameState === "BUSTED") {
    if (bustedTimer) clearTimeout(bustedTimer);
    startLevel(currentLevelIdx);
  } else {
    gravityInverted = !gravityInverted;
    playTune(tune`360:d4-90 560:a4-130`);
    updateHUD();
    applyGravity();
  }
});

// Reset current level immediately if needed
onInput("k", () => {
  if (gameState === "PLAYING" || gameState === "BUSTED") {
    if (bustedTimer) clearTimeout(bustedTimer);
    startLevel(currentLevelIdx);
  }
});

// ===================================================
// 10. ENGINE LOOP TICKER
// ===================================================

setInterval(() => {
  updatePatrols();
}, 420);

// Launch on the clean instruction screen
showIntroScreen();