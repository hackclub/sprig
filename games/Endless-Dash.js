/*
@title: Endless Dash Pro
@author: Dreamxhava
@description: Use any button jump
@tags: ['game', 'runner', 'dash']
@addedOn: 2026-05-09
*/

const player = "p";
const spike  = "s";
const ground = "g";
const blank  = "b";
const star   = "t";

setLegend(
  [player, bitmap`
................
................
.....000000.....
....07777770....
....07007070....
....07777770....
....07007070....
....07777770....
....07007070....
....07777770....
....07007070....
....07777770....
.....000000.....
................
................
................`],
  [spike, bitmap`
................
................
................
........0.......
.......030......
.......030......
......03330.....
......03330.....
.....0333330....
.....0333330....
....033333330...
....000000000...
................
................
................
................`],
  [ground, bitmap`
3333333333333333
3333333333333333
LLLLLLLLLLLLLLLL
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [blank, bitmap`
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
................
................
................
................
................`],
  [star, bitmap`
................
................
................
......6.........
.....666........
......6.........
................
...........6....
..........666...
...........6....
................
................
................
................
................
................`]
);

const MAP_WIDTH  = 16;
const MAP_HEIGHT = 10;
const FLOOR_Y    = 9;
const PLAYER_X   = 2;

let gameState    = "BANNER";
let score        = 0;
let gameSpeed    = 80;
let gameInterval = null;
let frameCount   = 0;
let lastScoreDrawn = -1;
let bannerFrame  = 0;
let bannerInterval = null;

// Physics
let playerY   = FLOOR_Y - 1;
let velocityY = 0;
const gravity   = 1.1;
const jumpForce = -3.2;
let onGround  = true;

function createMap() {
  let m = "";
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (y === FLOOR_Y) m += ground;
      else if (y === 1 && (x === 3 || x === 8 || x === 13)) m += star;
      else m += blank;
    }
    if (y < MAP_HEIGHT - 1) m += "\n";
  }
  return m;
}

function createGameMap() {
  let m = "";
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      m += (y === FLOOR_Y) ? ground : blank;
    }
    if (y < MAP_HEIGHT - 1) m += "\n";
  }
  return m;
}

// ── Banner ────────────────────────────────────────────────────────────────────
function showBanner() {
  gameState = "BANNER";
  bannerFrame = 0;
  setMap(map`${createMap()}`);
  drawBanner();

  if (bannerInterval) clearInterval(bannerInterval);
  bannerInterval = setInterval(() => {
    bannerFrame++;
    drawBanner();
  }, 400);
}

function drawBanner() {
  clearText();
  // Alternating colour pairs for a pulsing effect
  const c1 = (bannerFrame % 2 === 0) ? color`4` : color`6`;
  const c2 = (bannerFrame % 2 === 0) ? color`6` : color`4`;

  // Title split letter by letter for colour cycling
  const title = "ENDLESS";
  const cols  = [3,4,5,6,7,3,4];
  for (let i = 0; i < title.length; i++) {
    addText(title[i], { x: 3 + i, y: 2, color: (i % 2 === 0) ? c1 : c2 });
  }
  const title2 = "DASH";
  const cols2  = [5,6,3,4];
  for (let i = 0; i < title2.length; i++) {
    addText(title2[i], { x: 6 + i, y: 3, color: (i % 2 === 0) ? c2 : c1 });
  }

  addText("PRO",          { x: 7,  y: 4, color: color`3` });
  addText("JUMP  TO",     { x: 3,  y: 6, color: color`7` });
  addText("START",        { x: 5,  y: 7, color: color`5` });
}

// ── Game start ────────────────────────────────────────────────────────────────
function startGame() {
  if (bannerInterval) { clearInterval(bannerInterval); bannerInterval = null; }

  gameState      = "PLAYING";
  score          = 0;
  gameSpeed      = 80;
  frameCount     = 0;
  lastScoreDrawn = -1;
  playerY        = FLOOR_Y - 1;
  velocityY      = 0;
  onGround       = true;

  clearText();
  setMap(map`${createGameMap()}`);
  addSprite(PLAYER_X, Math.round(playerY), player);

  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}

// ── Collision: pure coordinate math, no getTile ───────────────────────────────
function checkCollision() {
  const py = Math.round(playerY);
  const allSpikes = getAll(spike);
  for (let i = 0; i < allSpikes.length; i++) {
    const s = allSpikes[i];
    // Tight AABB: player is at PLAYER_X, py — spike is 1x1 tile
    // Allow 1-tile tolerance on x, strict on y (they share the same row)
    const dx = Math.abs(s.x - PLAYER_X);
    const dy = Math.abs(s.y - py);
    if (dx < 1 && dy === 0) {
      return true;
    }
  }
  return false;
}

// ── Main loop ─────────────────────────────────────────────────────────────────
function gameLoop() {
  if (gameState !== "PLAYING") return;

  frameCount++;
  score++;

  const p = getFirst(player);
  if (!p) return;

  // 1. Physics
  if (!onGround) {
    velocityY += gravity;
    playerY   += velocityY;
    if (playerY >= FLOOR_Y - 1) {
      playerY   = FLOOR_Y - 1;
      velocityY = 0;
      onGround  = true;
    }
  }
  p.y = Math.round(playerY);

  // 2. Move spikes
  getAll(spike).forEach(s => {
    s.x -= 1;
    // Remove spike if it reaches or goes past the left edge
    if (s.x <= 0) {
      s.remove();
    }
  });

  // 3. Collision check AFTER moving spikes
  if (checkCollision()) {
    endGame();
    return;
  }

  // 4. Spawn with enforced minimum gap
  if (frameCount % 10 === 0) {
    const allSpikes = getAll(spike);
    const lastSpike = allSpikes[allSpikes.length - 1];
    const gapOk = !lastSpike || lastSpike.x <= MAP_WIDTH - 6;
    if (gapOk && Math.random() > 0.5) {
      addSprite(MAP_WIDTH - 1, FLOOR_Y - 1, spike);
    }
  }

  // 5. Progressive difficulty
  if (score % 80 === 0 && gameSpeed > 40) {
    gameSpeed -= 5;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
  }

  // 6. Score — no interpolated strings, build manually
  if (frameCount % 5 === 0 && score !== lastScoreDrawn) {
    clearText();
    const yPos = 2; // Increase this value to move the score text down
    addText("SCORE " + score, { x: 1, y: yPos, color: color`4` });
    lastScoreDrawn = score;
  }
}

// ── Game over ─────────────────────────────────────────────────────────────────
function endGame() {
  gameState = "GAMEOVER";
  clearInterval(gameInterval);
  clearText();
  addText("YOU CRASHED!", { x: 4, y: 3, color: color`3` });
  addText("SCORE " + score, { x: 4, y: 5, color: color`5` });
  addText("JUMP TO",       { x: 4, y: 7, color: color`7` });
  addText("RETRY",         { x: 5, y: 8, color: color`4` });
}

// ── Input ─────────────────────────────────────────────────────────────────────
["w","a","s","d","i","j","k","l"].forEach(k => {
  onInput(k, () => {
    if (gameState === "BANNER" || gameState === "GAMEOVER") {
      startGame();
    } else if (gameState === "PLAYING" && onGround) {
      velocityY = jumpForce;
      onGround  = false;
    }
  });
});

showBanner();
