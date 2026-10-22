/*
@title: gravity flipper with a twist
@author: manikanta vasamsetti
@tags: ['gravity','platformer','block']
@addedOn: 2026-03-19
@description: A gravity-flipping platformer where you navigate through levels by toggling gravity to activate different platforms and avoid spikes.
*/

const player = "p";
const wall = "w";
const normalPlatform = "n"; // Blue, active in normal gravity
const invertPlatform = "i"; // Red, active in flipped gravity
const goal = "g";
const spike = "s";
const background = "b";

let gameState = "intro";
let currentLevel = 0;
let gravityFlipped = false;
let introBob = false;

setLegend(
  [player, bitmap`
................
................
................
.00000000000000.
.05577277277550.
.05577277277550.
.05577722777550.
.05575757575550.
.05557575757550.
.05555555555550.
.02222L22L22220.
.01111L11L11110.
.01121111112110.
.00002222220000.
.00000000000000.
.00.000..000.00.`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [normalPlatform, bitmap`
0000000000000000
0555555555555550
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0577777777777750
0555555555555550
0000000000000000`],
  [invertPlatform, bitmap`
0000000000000000
0999999999999990
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0933333333333390
0999999999999990
0000000000000000`],
  [goal, bitmap`
................
................
.....000000.....
....02666660....
...0266666660...
..026666666660..
..06666FF66660..
..0666FFFF6660..
..0666FFFF6660..
..06666FF66660..
..066666666690..
...0666666690...
....06666690....
.....000000.....
................
................`],
  [spike, bitmap`
................
................
.......00.......
......0210......
......0210......
.....022110.....
.....022110.....
....02221110....
....02221110....
...0222211110...
...0222211110...
..022222111110..
..022222111110..
.02222221111110.
.01111111111110.
0000000000000000`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
);

setBackground(background);
setSolids([wall]);

const introMap = map`
wwwwwwwwww
w.....g..w
w........w
w...s....w
w........w
w...p....w
w..n...i.w
w........w
w........w
wwwwwwwwww`;

const instructionsMap = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w...p....w
w........w
w........w
w........w
wwwwwwwwww`;

const instructionsMap2 = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`;

const instructionsMap3 = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`;

const instructionsMap4 = map`
wwwwwwwwww
w........w
w........w
w..s.s.s.w
w........w
w..p...g.w
w........w
w........w
w........w
wwwwwwwwww`;

const levels = [
  map`
wwwwwwwwww
w........w
w........w
w........w
w.n......w
w........w
w........w
w........w
wp.....g.w
wwwwwwwwww`,

  map`
wwwwwwwwww
w..w.....w
w........w
w.nw.....w
w..w.....w
w..w.....w
w..w.....w
w..w.....w
wp.w...g.w
wwwwwwwwww`,

  map`
wwwwwwwwww
w..w..w..w
w.....w..w
w..w..w..w
w..wn.w..w
w..w..w..w
w..w..w..w
w..wiww..w
wp.wiii.gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w....w.w.w
w.w..w...w
w.w..w...w
w.w.nw.w.w
w.w..w.w.w
w.w....w.w
w.w....w.w
wpw..w.wgw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.w.i.w..w
w.w.i.w..w
w...w.w..w
wnn.w.w..w
w.w.w.w..w
w.w.w..i.w
w.w.w.ni.w
wpw.w.w.gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.w.w....w
w...i....w
w.w.wnn..w
w.w.w.w..w
w.w.wsws.w
w.w.w.w..w
w.w...w..w
wpw.w.w.gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w....w.w.w
w..w.w...w
w..w.w.w.w
w.nw.w.i.w
w..w.w.w.w
w..w.w.w.w
w..w.w.w.w
wp.w...wgw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.w.w.ww.w
w...w.ii.w
w.w.w.ww.w
w.w.wnww.w
w.w.w.ww.w
w.w.w.ww.w
w.w...ww.w
wpw.w.wwgw
wwww.wwwww`,

  map`
wwwwwwwwww
w...wwww.w
w.w.wwww.w
w.w.wwww.w
w.w.wwww.w
w.w.wwww.w
w.w.wwww.w
w.w.inin.w
wpw.wwwwgw
wwww....ww`,

  map`
wwwwwwwwww
w.w...ww.w
w...w.iw.w
w.w.w.ii.w
w.w.w.ww.w
w.w.wsww.w
w.w.w.ww.w
w.w.w..w.w
wpw.w.wwgw
www.wwwwww`,

  map`
wwwwwwwwww
w..n.w...w
w.ww...w.w
w.ww.w.w.w
w.wwiw.w.w
w.ww.w.w.w
w.ww.w.w.w
w.ww.n.w.w
wpwwsw.wgw
wwwwww.www`,

  map`
wwwwwwwwww
w.ww...w.w
w.ww.w...w
w.ww.i.w.w
w.wwnn.w.w
w.ww.w.w.w
w.ww.w.w.w
w.w..w.w.w
wpii.w.wgw
wwww.wwwww`,

  map`
wwwwwwwwww
w...ww...w
w.w.w..w.w
w.w.ww.w.w
w.wnwwnw.w
wsw.nn.w.w
w.w..w.w.w
w.w..w.w.w
wpi.ww.wgw
www.w.wwww`,

  map`
wwwwwwwwww
w.ww.w.w.w
w.ww.w...w
w.ww.w.w.w
w.ww.w.w.w
w.in.s.w.w
w.ww.w.w.w
w.ww...w.w
wpww.w.wgw
wwwwnwwwww`,

  map`
wwwwwwwwww
w.ww.www.w
w.ww.ini.w
w.ww.www.w
w.wwnwww.w
w.ww.sww.w
w.ww.www.w
w.n..www.w
wpww.wwwgw
www..w.www`
];

// Check if movement is blocked at position (x, y)
// Walls are always solid
// Blue platforms are solid when gravity is DOWN (normal)
// Red platforms are solid when gravity is UP (flipped)
function isBlocked(x, y) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return true;

  const tile = getTile(x, y);
  for (const sprite of tile) {
    if (sprite.type === wall) return true;
    if (sprite.type === normalPlatform && !gravityFlipped) return true;
    if (sprite.type === invertPlatform && gravityFlipped) return true;
  }
  return false;
}

function getPlayer() {
  return getFirst(player);
}

function renderHUD() {
  if (gameState !== "playing") return;
  clearText();
  addText(gravityFlipped ? "GRAVITY: UP" : "GRAVITY: DOWN", {
    x: 1,
    y: 1,
    color: gravityFlipped ? color`3` : color`5`
  });
  addText(`LEVEL ${currentLevel + 1}/${levels.length}`, {
    x: 1,
    y: 2,
    color: color`2`
  });
}

function showIntro() {
  gameState = "intro";
  gravityFlipped = false;
  introBob = false;
  setMap(introMap);
  clearText();
  addText("GRAVITY PLATFORMER", { x: 1, y: 1, color: color`5` });
  addText("WITH TWISTS", { x: 4, y: 2, color: color`3` });
  addText("A shifting world", { x: 2, y: 4, color: color`2` });
  addText("Press L to continue", { x: 1, y: 13, color: color`2` });
}

function showInstructions() {
  gameState = "instructions";
  gravityFlipped = false;
  setMap(instructionsMap);
  clearText();
  addText("HOW TO PLAY", { x: 4, y: 1, color: color`6` });
  addText("- PAGE 1/4 -", { x: 4, y: 2, color: color`2` });
  addText("", { x: 0, y: 3, color: color`2` });
  addText("CONTROLS:", { x: 5, y: 4, color: color`L` });
  addText("A/D: Move", { x: 5, y: 5, color: color`2` });
  addText("W: Flip Gravity", { x: 2, y: 6, color: color`2` });
  addText("J: Reset Level", { x: 3, y: 7, color: color`2` });
  addText("", { x: 0, y: 8, color: color`2` });
  addText("THE TWIST:", { x: 5, y: 9, color: color`L` });
  addText("Platforms change!", { x: 1, y: 10, color: color`5` });
  addText("Blue & Red switch", { x: 1, y: 11, color: color`3` });
  addText("based on gravity", { x: 2, y: 12, color: color`2` });
  addText("", { x: 0, y: 13, color: color`2` });
  addText("L: Next Page", { x: 4, y: 14, color: color`6` });
}

function showInstructions2() {
  gameState = "instructions2";
  gravityFlipped = false;
  setMap(instructionsMap2);
  clearText();
  addText("BLUE PLATFORMS", { x: 3, y: 1, color: color`5` });
  addText("- PAGE 2/4 -", { x: 4, y: 2, color: color`2` });
  addText("", { x: 0, y: 3, color: color`2` });
  addText("When gravity is", { x: 2, y: 4, color: color`2` });
  addText("DOWN (normal):", { x: 3, y: 5, color: color`5` });
  addText("", { x: 0, y: 6, color: color`2` });
  addText("Blue platforms =", { x: 2, y: 7, color: color`2` });
  addText("SOLID EVERYWHERE", { x: 2, y: 8, color: color`4` });
  addText("", { x: 0, y: 9, color: color`2` });
  addText("Can't pass through", { x: 1, y: 10, color: color`2` });
  addText("from any direction!", { x: 0, y: 11, color: color`3` });
  addText("", { x: 0, y: 12, color: color`2` });
  addText("", { x: 0, y: 13, color: color`2` });
  addText("L: Next Page", { x: 4, y: 14, color: color`6` });
}

function showInstructions3() {
  gameState = "instructions3";
  gravityFlipped = false;
  setMap(instructionsMap3);
  clearText();
  addText("RED PLATFORMS", { x: 3, y: 1, color: color`3` });
  addText("- PAGE 3/4 -", { x: 4, y: 2, color: color`2` });
  addText("", { x: 0, y: 3, color: color`2` });
  addText("When gravity is", { x: 2, y: 4, color: color`2` });
  addText("UP (flipped):", { x: 3, y: 5, color: color`3` });
  addText("", { x: 0, y: 6, color: color`2` });
  addText("Red platforms =", { x: 2, y: 7, color: color`2` });
  addText("SOLID EVERYWHERE", { x: 2, y: 8, color: color`4` });
  addText("", { x: 0, y: 9, color: color`2` });
  addText("Blue platforms =", { x: 2, y: 10, color: color`2` });
  addText("PASSABLE now!", { x: 3, y: 11, color: color`5` });
  addText("", { x: 0, y: 12, color: color`2` });
  addText("", { x: 0, y: 13, color: color`2` });
  addText("L: Next Page", { x: 4, y: 14, color: color`6` });
}

function showInstructions4() {
  gameState = "instructions4";
  gravityFlipped = false;
  setMap(instructionsMap4);
  clearText();
  addText("DANGERS & GOAL", { x: 3, y: 1, color: color`4` });
  addText("- PAGE 4/4 -", { x: 4, y: 2, color: color`2` });
  addText("", { x: 0, y: 3, color: color`2` });
  addText("SPIKES (gray):", { x: 3, y: 7, color: color`3` });
  addText("Touch = DEATH!", { x: 3, y: 8, color: color`3` });
  addText("Avoid them!", { x: 4, y: 9, color: color`2` });
  addText("", { x: 0, y: 10, color: color`2` });
  addText("GOAL (yellow):", { x: 3, y: 11, color: color`4` });
  addText("Reach to win!", { x: 3, y: 12, color: color`4` });
  addText("", { x: 0, y: 13, color: color`2` });
  addText("L: START GAME", { x: 3, y: 14, color: color`6` });
}

function showLevelComplete() {
  gameState = "levelcomplete";
  clearText();
  playTune(goalTune);
  addText("LEVEL COMPLETE!", { x: 2, y: 6, color: color`4` });
  addText(`Level ${currentLevel + 1}/${levels.length}`, { x: 4, y: 8, color: color`2` });
  addText("L - Next Level", { x: 3, y: 12, color: color`6` });
  addText("K - Retry Level", { x: 2, y: 14, color: color`3` });
}

function showGameOver(reason) {
  gameState = "gameover";
  clearText();
  playTune(deathTune);
  addText("GAME OVER", { x: 5, y: 6, color: color`3` });
  addText(reason || "You died", { x: 4, y: 8, color: color`2` });
  addText("Press K to retry", { x: 2, y: 14, color: color`2` });
}

function showWin() {
  gameState = "win";
  clearText();
  playTune(winTune);
  addText("YOU WIN!", { x: 6, y: 6, color: color`4` });
  addText("Press K", { x: 6, y: 8, color: color`2` });
  addText("to restart", { x: 5, y: 9, color: color`2` });
}

function loadLevel(index) {
  currentLevel = index;
  gravityFlipped = false;
  setMap(levels[currentLevel]);
  renderHUD();
}

function startGame() {
  currentLevel = 0;
  gravityFlipped = false;
  gameState = "playing";
  playTune(startTune);
  loadLevel(0);
}

function resetLevel() {
  if (gameState !== "playing") return;
  gravityFlipped = false;
  playTune(resetTune);
  loadLevel(currentLevel);
}

function retryCurrentLevel() {
  if (gameState !== "gameover" && gameState !== "levelcomplete") return;
  gravityFlipped = false;
  gameState = "playing";
  playTune(resetTune);
  loadLevel(currentLevel);
}

function advanceToNextLevel() {
  if (gameState !== "levelcomplete") return;
  currentLevel += 1;
  if (currentLevel >= levels.length) {
    showWin();
  } else {
    gameState = "playing";
    playTune(levelTune);
    loadLevel(currentLevel);
  }
}

function moveHorizontal(dx) {
  if (gameState !== "playing") return;

  const p = getPlayer();
  if (!p) return;

  const nx = p.x + dx;
  if (isBlocked(nx, p.y)) {
    playTune(bumpTune);
    return;
  }

  p.x = nx;
  playTune(moveTune);
  checkTileEffects();
}

function flipGravity() {
  if (gameState !== "playing") return;

  gravityFlipped = !gravityFlipped;
  playTune(flipTune);
  renderHUD();
}

// FIX #1: Clean checkTileEffects - one loop, immediate exit, no duplication
function checkTileEffects() {
  if (gameState !== "playing") return;

  const p = getPlayer();
  if (!p) return;

  const tile = getTile(p.x, p.y);

  for (const sprite of tile) {
    if (sprite.type === spike) {
      showGameOver("Spikes got you");
      return;
    }

    if (sprite.type === goal) {
      if (currentLevel + 1 >= levels.length) {
        showWin();
      } else {
        showLevelComplete();
      }
      return;
    }
  }
}

// Intro bobbing animation
setInterval(() => {
  if (gameState !== "intro") return;
  const p = getPlayer();
  if (!p) return;
  introBob = !introBob;
  p.y = introBob ? 4 : 5;
}, 500);

// FIX #2: Gravity loop with proper state checking - prevents post-win chaos
setInterval(() => {
  if (gameState !== "playing") return;

  const p = getPlayer();
  if (!p) return;

  const direction = gravityFlipped ? -1 : 1;
  const nextY = p.y + direction;

  if (nextY < 0 || nextY >= height()) {
    showGameOver("You fell into the void");
    return;
  }

  if (!isBlocked(p.x, nextY)) {
    p.y = nextY;
  }

  checkTileEffects();
}, 120);

// FIX #3: Input priority - levelcomplete first to prevent stuck states
onInput("l", () => {
  // PRIORITY: level completion takes precedence
  if (gameState === "levelcomplete") {
    advanceToNextLevel();
    return;
  }

  if (gameState === "intro") {
    playTune(pageTune);
    showInstructions();
    return;
  }

  if (gameState === "instructions") {
    playTune(pageTune);
    showInstructions2();
    return;
  }

  if (gameState === "instructions2") {
    playTune(pageTune);
    showInstructions3();
    return;
  }

  if (gameState === "instructions3") {
    playTune(pageTune);
    showInstructions4();
    return;
  }

  if (gameState === "instructions4") {
    startGame();
    return;
  }
});

onInput("a", () => moveHorizontal(-1));
onInput("d", () => moveHorizontal(1));
onInput("w", () => flipGravity());
onInput("j", () => resetLevel());

onInput("k", () => {
  if (gameState === "gameover") {
    retryCurrentLevel();
    return;
  }

  if (gameState === "levelcomplete") {
    retryCurrentLevel();
    return;
  }

  if (gameState === "win") {
    startGame();
  }
});

const moveTune = tune`
70: C5~70,
70: D5~70,
70: E5~70,
1100`;

const bumpTune = tune`
50: C3~50,
50: C3~50,
1000`;

const flipTune = tune`
60: C4^60,
60: E4^60,
60: G4^60,
60: C5^60,
1600`;

const resetTune = tune`
80: E4~80,
80: C4~80,
80: E4~80,
1300`;

const pageTune = tune`
70: G4^70,
70: C5^70,
70: E5^70,
1400`;

const goalTune = tune`
120: C5^120,
120: E5^120,
120: G5^120,
2200`;

const levelTune = tune`
100: D5^100,
100: F5^100,
100: A5^100,
2000`;

const startTune = tune`
120: E4^120,
120: G4^120,
120: B4^120,
2200`;

const deathTune = tune`
90: C4~90,
90: A3~90,
90: F3~90,
1400`;

const winTune = tune`
150: C5^150,
150: E5^150,
150: G5^150,
150: C6^150,
2600`;

showIntro();
