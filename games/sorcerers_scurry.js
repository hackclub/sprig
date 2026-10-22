/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sorcerer's Scurry
@description: You're a tiny wizard rat trapped in a magical library, and cursed ink is rising fast! Slide through three increasingly challenging mazes, collect potions, activate magical checkpoints, and reach the portal before the ink catches you.
@author: Alison Fung
@tags: ['puzzle', 'arcade']
@addedOn: 2026-10-19
*/

const player = 'p';
const floor = 'f';
const checkpoint = 'c';
const activated = 'a';
const potion = 'b';
const ink = 'i';
const exit = 'e';
const wall = 'w';
const particle = 'x';

setLegend(
  [player, bitmap`
................
................
.........H6.....
........6.HH....
..........6HH...
.........HHH6...
........H6HHHH..
.......HHHHHH6H.
......08810LL0..
......088111110.
......008810100.
..0000LLL11111C0
.0888LLLLL11880.
08000LLLLLLL00..
.0...0L00LL0....
................`],
  [floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [checkpoint, bitmap`
................
................
................
..........0.....
.........070....
.........070....
........07770...
.....0...070....
....070..070....
....070...0.....
...07770........
....070.........
....070.........
.....0..........
................
................`],
  [activated, bitmap`
................
................
................
..........0.....
.........060....
.........060....
........06660...
.....0...060....
....060..060....
....060...0.....
...06660........
....060.........
....060.........
.....0..........
................
................`],
  [potion, bitmap`
................
................
.....CCCCCC.....
....0CCCCCC0....
....02222220....
.....02CC20.....
.....022220.....
....02244220....
...022444D220...
...024444DD20...
...02444DDD20...
...0224DDD220...
....02222220....
.....000000.....
................
................`],
  [ink, bitmap`
5555555555555555
5555555555555555
5655555555655555
5555555555555555
5555555555555555
5555555555555555
5555555555556555
5555565555555555
5555555555555555
5555555555555555
5555555565555655
5655555555555555
5555555555555555
5555555555556555
5555565555555555
5555555555555555`],
  [exit, bitmap`
..000000000000..
..000000000000..
..00HHHHH8HH00..
..00HH8HHHH800..
..00H8H8HHHH00..
..00HH8HH8HH00..
..008HHHHHHH00..
..00HHH8HHHH00..
..00HHHHHH8H00..
..00H8HHHHHH00..
..00HHHHH8HH00..
..00HHHH8H8H00..
..00H8HHH8HH00..
..00HHHHHHH800..
..000000000000..
..000000000000..`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLL11111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL11111111LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11111111LLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL11111`],
  [particle, bitmap`
................
................
.......6........
.......6........
.......6........
.....66666......
......666.......
..66666666666...
......666.......
.....66666......
.......6........
.......6........
.......6........
................
................
................`]
);
setSolids([player, wall]);
setBackground(floor);

const levels = [
  map`
wwwwwwwwewwwwwww
ww.............w
w........w.....w
w...w.ww......bw
w.....w.......cw
w.........w....w
w.w............w
w..............w
w......ww..w...w
w....w.........w
w...w...p......w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwewwwwwww
ww..w....w.....w
w......w......ww
w........c...www
w..w........b..w
ww...w......w..w
w......w.......w
w........w...w.w
w.bw...........w
ww..w....w..w..w
w.....w.p......w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwewwwwwww
ww.......www.w.w
w.....w....w.w.w
w......w....w.ww
w..w........b..w
w.w...b......w.w
w....w..w....w.w
w..w......w....w
ww..cw.........w
w.b......ww.w..w
w...ww.wp......w
wwwwwwwwwwwwwwww`
];
const menuMap = map`
................
................
................
................
................
................
................
................
................
................
................
................`;
const levelNames = ['THE ENTRANCE', 'POTION CELLAR', 'THE ARCHIVES'];
const inkSpeeds = [3000, 2500, 2000]; // Change to YOUR preferred speeds
const inkStartDelay = 1000;
const slideSpeed = 85;

const slideSound = tune`
75: c5~75,
75: e5~75`;
const potionSound = tune`
100: e5~100,
100: g5~100,
100: b5~100`;
const checkpointSound = tune`
150: c5~150,
150: e5~150,
150: g5~150,
150: c6~150`;
const inkSound = tune`
120: c3^120,
120: b2^120`;
const loseSound = tune`
180: g4~180,
180: e4~180,
180: c4~180,
180: a3~180`;
const levelWinSound = tune`
130: c5~130,
130: e5~130,
130: g5~130,
130: c6~130`;
const finalWinSound = tune`
140: c5~140,
140: e5~140,
140: g5~140,
140: c6~140,
140: g5~140,
280: c6~280`;

let currentLevel = 0;
let score = 0;
let totalPotions = 0;
let gameState = 'menu';
let playing = false;
let sliding = false;
let inkRow = 11;
let inkStartTime = 0;
let lastInkRise = 0;
let inkWarningPlayed = false;
let checkpointPosition = null;
let slideTimer = null;
let transitionTimer = null;
let levelIntroTimer = null;
let generation = 0;

function hasType(x, y, type) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return false;
  return getTile(x, y).some(s => s.type === type);
}
function removeType(x, y, type) {
  if (x < 0 || x >= width() || y < 0 || y >= height()) return;
  for (const s of getTile(x, y).filter(s => s.type === type)) s.remove();
}
function clearGameTimers() {
  generation++;
  clearTimeout(slideTimer);
  clearTimeout(transitionTimer);
  clearTimeout(levelIntroTimer);
  sliding = false;
}
function sparkleEffect(x, y) {
  if (x < 0 || y < 0 || x >= width() || y >= height()) return;
  const token = generation;
  addSprite(x, y, particle);
  const sprites = getTile(x, y).filter(s => s.type === particle);
  const sparkle = sprites[sprites.length - 1];
  setTimeout(() => {
    if (token === generation && sparkle) sparkle.remove();
  }, 300);
}
function updateUI() {
  if (gameState !== 'playing') return;
  clearText();
  addText('LV ' + (currentLevel + 1), { x: 1, y: 1, color: color`2` });
  addText('Potions: ' + totalPotions + '/6', { x: 1, y: 2, color: color`2` });
}
function showTitleScreen() {
  clearGameTimers();
  playing = false;
  gameState = 'menu';
  setMap(menuMap);
  clearText();
  addText('SORCERERS SCURRY', { x: 2, y: 3, color: color`H` });
  addText('A WIZARD RAT TALE', { x: 2, y: 6, color: color`2` });
  addText('WASD: SLIDE', { x: 4, y: 8, color: color`2` });
  addText('GRAB POTIONS', { x: 4, y: 9, color: color`2` });
  addText('DODGE THE INK', { x: 3, y: 10, color: color`2` });
  addText('PRESS J TO START!', { x: 2, y: 12, color: color`4` });
}
function startNewGame() {
  currentLevel = 0;
  totalPotions = 0;
  loadLevel();
}
function loadLevel() {
  clearGameTimers();
  playing = false;
  gameState = 'intro';
  score = 0;
  checkpointPosition = null;
  inkWarningPlayed = false;
  setMap(levels[currentLevel]);
  inkRow = height() - 1;
  clearText();
  addText('LEVEL ' + (currentLevel + 1), { x: 7, y: 5, color: color`4` });
  addText(levelNames[currentLevel], { x: 4, y: 7, color: color`2` });
  const token = generation;
  levelIntroTimer = setTimeout(() => {
    if (token !== generation) return;
    gameState = 'playing';
    playing = true;
    inkStartTime = Date.now() + inkStartDelay;
    lastInkRise = inkStartTime;
    updateUI();
  }, 1800);
}


function lose() {
  if (!playing) return;

    if (checkpointPosition !== null) {
      // Invalidate the current slide and its callbacks
      generation++;
      clearTimeout(slideTimer);
      sliding = false;
  
      const p = getFirst(player);
      if (!p) {
        endGame(false);
        return;
      }
  
      // Save position before consuming checkpoint
      const { x, y } = checkpointPosition;
      checkpointPosition = null;
  
      // Reset the ink flood
      for (let row = 0; row < height(); row++) {
        for (let col = 0; col < width(); col++) {
          removeType(col, row, ink);
        }
      }
  
      inkRow = height() - 1;
      inkWarningPlayed = false;
  
      // Respawn
      p.x = x;
      p.y = y;
  
      // Give another 3-second head start
      inkStartTime = Date.now() + inkStartDelay;
      lastInkRise = inkStartTime;
  
      playTune(checkpointSound);
      sparkleEffect(x, y);
      updateUI();
      return;
    }
  endGame(false);
}


function endGame(won) {
  if (!playing) return;
  clearGameTimers();
  playing = false;
  clearText();
  if (won) {
    if (currentLevel < levels.length - 1) {
      gameState = 'transition';
      playTune(levelWinSound);
      addText('LEVEL COMPLETE!', { x: 2, y: 5, color: color`4` });
      const token = generation;
      transitionTimer = setTimeout(() => {
        if (token !== generation) return;
        currentLevel++;
        loadLevel();
      }, 1500);
    } else {
      gameState = 'victory';
      playTune(finalWinSound);
      setMap(menuMap);
      clearText();
      addText('YOU ESCAPED!', { x: 3, y: 4, color: color`4` });
      addText('LIBRARY SAVED!', { x: 3, y: 6, color: color`2` });
      addText('POTIONS: ' + totalPotions + '/6', { x: 3, y: 8, color: color`6` });
      addText('J - PLAY AGAIN', { x: 3, y: 12, color: color`2` });
    }
  } else {
    gameState = 'gameover';
    playTune(loseSound);
    addText('INK GOT YOU!', { x: 3, y: 5, color: color`3` });
    addText('J - RETRY', { x: 5, y: 7, color: color`2` });
  }
}
function checkPosition() {
  if (!playing) return;
  const p = getFirst(player);
  if (!p) return;
  if (hasType(p.x, p.y, ink)) {
    lose();
    return;
  }
  if (hasType(p.x, p.y, potion)) {
    removeType(p.x, p.y, potion);
    score++;
    totalPotions++;
    playTune(potionSound);
    sparkleEffect(p.x, p.y);
    updateUI();
  }
  if (hasType(p.x, p.y, checkpoint)) {
    removeType(p.x, p.y, checkpoint);
    addSprite(p.x, p.y, activated);
    checkpointPosition = { x: p.x, y: p.y };
    playTune(checkpointSound);
    sparkleEffect(p.x, p.y);
  }
  if (hasType(p.x, p.y, exit)) endGame(true);
}
function slide(dx, dy) {
  if (!playing || sliding) return;
  const p = getFirst(player);
  if (!p) return;
  const nx = p.x + dx;
  const ny = p.y + dy;
  if (nx < 0 || ny < 0 || nx >= width() || ny >= height() || hasType(nx, ny, wall)) return;
  sliding = true;
  playTune(slideSound);
  const token = generation;
  function step() {
    if (token !== generation || !playing) return;
    const rat = getFirst(player);
    if (!rat) { sliding = false; return; }
    const tx = rat.x + dx;
    const ty = rat.y + dy;
    if (tx < 0 || ty < 0 || tx >= width() || ty >= height() || hasType(tx, ty, wall)) {
      sliding = false;
      return;
    }
    rat.x = tx;
    rat.y = ty;
    checkPosition();
    if (token === generation && playing) slideTimer = setTimeout(step, slideSpeed);
  }
  step();
}
function riseInk() {
  if (!playing || Date.now() < inkStartTime) return;
  inkRow--;
  if (inkRow <= 0) { lose(); return; }
  const rat = getFirst(player);
  if (rat && !inkWarningPlayed && inkRow - rat.y <= 3 && inkRow - rat.y >= 0) {
    playTune(inkSound);
    inkWarningPlayed = true;
  }
  for (let x = 1; x < width() - 1; x++) {
    if (!hasType(x, inkRow, wall) && !hasType(x, inkRow, ink)) addSprite(x, inkRow, ink);
  }
  checkPosition();
}
function restart() {
  if (gameState === 'menu' || gameState === 'victory') {
    startNewGame();
  } else if (gameState === 'gameover') {
    totalPotions = Math.max(0, totalPotions - score);
    loadLevel();
  }
}
onInput('w', () => slide(0, -1));
onInput('a', () => slide(-1, 0));
onInput('s', () => slide(0, 1));
onInput('d', () => slide(1, 0));
onInput('j', restart);

// One global timer; no duplicate ink intervals on restart.
setInterval(() => {
  if (!playing || Date.now() < inkStartTime) return;
  const now = Date.now();
  if (now - lastInkRise >= inkSpeeds[currentLevel]) {
    lastInkRise = now;
    riseInk();
  }
}, 100);

showTitleScreen();
