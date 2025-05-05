/*
@title: Sprigman
@author: Kuberwastaken
@tags: [pacman, arcade, random, maze]
@addedOn: 2025-05-05

A Pac-Man style game with a randomly generated maze every time you start or refresh.
*/

// --- SPRITES ---
const pacman = "p";
const wall = "w";
const pellet = "d";
const power = "o";
const ghost = "g";
const empty = "e";
const background = "b";

setLegend(
  [background, bitmap`
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
0000000000000000`],
  [pacman, bitmap`
................
................
................
......666666....
.....66660666...
....6666666666..
...66666666666..
...666666.......
...666666.......
...66666666666..
....6666666666..
.....66666666...
......666666....
................
................
................`], // Pac-Man: yellow circle with open mouth
  [wall, bitmap`
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
5555555555555555
5555555555555555
5555555555555555
5555555555555555`], // Wall: solid blue (color 1)
  [pellet, bitmap`
................
................
................
................
................
................
.......6666.....
.......6666.....
.......6666.....
.......6666.....
................
................
................
................
................
................`], // Pellet: small white dot
  [power, bitmap`
................
................
................
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....
................
................
................
................`], // Power pellet: larger white dot
  [ghost, bitmap`
.....000000.....
..000022220000..
.00222222222200.
.02222222222220.
.02200222002220.
.02200222002220.
.02200222002220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02222222222220.
.02202200220220.
.00000000000000.
................`], // Ghost: red body, white eyes
  [empty, bitmap`
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
................`]
);

setBackground(background);

// --- AUDIO SETUP ---
let introTracks = [
  tune`
  0,
  141.5095: B4^70.75475,
  141.5095: B5^70.75475,
  141.5095: F#5^70.75474999999997,
  141.5095: D#5^70.75475000000003,
  70.75474999999997: B5^70.75474999999997,
  212.26425000000003: F#5^70.75474999999997,
  283.019: D#5^212.26424999999992,
  141.50949999999995: C5^70.75475000000009,
  141.50949999999995: C6^70.75475000000009,
  141.50950000000017: G5^70.75475000000009,
  141.50949999999995: E5^70.75474999999986,
  70.75475000000009: C6^70.75475000000009,
  212.26425000000003: G5^70.75474999999986,
  283.0189999999999: E5^212.26425000000003,
  141.50950000000017: B4^70.75474999999986,
  141.50949999999972: B5^70.75474999999986,
  141.50950000000017: F#5^70.75475000000031,
  141.50949999999972: D#5^70.75474999999986,
  70.75475000000031: B5^70.75475000000031,
  212.26425000000003: F#5^70.75474999999986,
  283.0189999999999: D#5^212.26425000000003,
  70.75474999999986: D#5^70.75474999999986,
  70.75475000000031: E5^70.75475000000031,
  141.50949999999972: F5^70.75474999999986,
  70.75475000000031: F5^70.75475000000031,
  70.75474999999986: F#5^70.75474999999986,
  141.50950000000017: G5^70.75474999999986,
  70.75474999999986: G5^70.75474999999986,
  70.75474999999986: G#5^70.75474999999986,
  141.50949999999972: A5^70.75474999999986,
  4245.285: B5^141.50950000000063,
  `
];

let deathTracks = [
  tune`
  0,
  31.25: F5^127.08333333333333,
  32.291666666666664: E5^64.58333333333334,
  128.12500000000003: E7^128.12500000000003,
  0: D#5^32.291666666666664,
  32.291666666666664: E5^32.291666666666664,
  31.24999999999997: D5^63.541666666666636,
  64.58333333333333: D#7^128.12500000000006,
  0: D#5^63.54166666666672,
  0: E5^31.25,
  31.25: E7^95.83333333333339,
  32.29166666666672: F5^32.29166666666672,
  64.58333333333333: D5^32.291666666666664,
  63.541666666666664: C#6^31.25,
  32.29166666666661: D5^32.29166666666661,
  0: D#5^31.25,
  0: E5^31.25,
  31.25: E7^63.54166666666672,
  0: C5^32.29166666666672,
  64.58333333333333: C#6^64.58333333333333,
  95.83333333333344: B5^32.29166666666672,
  0: C5^32.29166666666661,
  0: D5^32.29166666666661,
  0: C#6^32.29166666666661,
  64.58333333333333: D7^95.83333333333333,
  31.25: B5^31.25,
  0: G#4^32.29166666666661,
  0: A4^32.29166666666661,
  0: A#4^32.29166666666661,
  64.58333333333333: A5^32.29166666666661,
  31.25: B5^31.25,
  32.29166666666661: C#6^32.29166666666661,
  32.29166666666672: A#4^64.58333333333333,
  32.29166666666661: A4^32.29166666666661,
  0: G4^31.25,
  0: G#4^31.25,
  0: G5^31.25,
  63.54166666666661: G#6^31.25,
  32.29166666666683: A4^32.29166666666683,
  0: A#4^31.25,
  31.25: B5^31.25,
  0: G#4^32.29166666666661,
  32.29166666666661: B6^32.29166666666661,
  0: G5^64.58333333333321,
  32.29166666666661: G#6^32.29166666666661,
  32.29166666666661: F4^32.29166666666661,
  0: E4^31.25,
  31.25: F5^31.25,
  32.29166666666683: G4^32.29166666666683,
  0: G#4^32.29166666666661,
  32.29166666666661: G5^32.29166666666661,
  0: A#4^31.25,
  63.54166666666661: G#6^31.25,
  0: E4^64.58333333333344,
  32.29166666666683: F5^32.29166666666683,
  0: D4^32.29166666666661,
  63.54166666666661: D#4^32.29166666666661,
  0: F5^64.58333333333321,
  32.29166666666661: G5^32.29166666666661,
  0: G#4^32.29166666666661,
  32.29166666666661: G#6^32.29166666666661,
  0: D4^32.29166666666683,
  63.54166666666683: E4^32.29166666666683,
  0: A#3^32.29166666666661,
  0: B3^32.29166666666661,
  0: C4^32.29166666666661,
  0: C#4^32.29166666666661,
  64.58333333333321: C6^32.29166666666661,
  31.25: D4^31.25,
  32.29166666666661: F5^32.29166666666661,
  32.29166666666683: C4^32.29166666666683,
  0: A#3^63.54166666666661,
  0: B3^32.29166666666661,
  32.29166666666661: C6^32.29166666666661,
  95.83333333333321: G3^31.25,
  0: C4^31.25,
  0: D4^31.25,
  63.54166666666683: E4^31.25,
  32.29166666666661: G3^32.29166666666661,
  95.83333333333321: E3^32.29166666666661,
  2111.458333333333: C4^32.29166666666661,
  `
];

let winTracks = [
  tune`
  0,
  0: C4^142.857,
  285.714: C3^142.857,
  0: C4^142.857,
  142.857: C3^142.857,
  0: G4^1285.7130000000002,
  428.571: G3^1285.7130000000002,
  `
];

let backgroundTracks = [
  tune``
];

let playbacks = [];
let backgroundPlayback = null;

function stop() {
  playbacks.forEach((e) => e.end());
  if (backgroundPlayback) {
    backgroundPlayback.forEach(p => p.end());
    backgroundPlayback = null;
  }
}

function play(song) {
  stop();
  playbacks = song.map((e) => playTune(e));
}

function startBackgroundMusic() {
  if (!backgroundPlayback) {
    backgroundPlayback = backgroundTracks.map(t => playTune(t));
  }
}

function stopBackgroundMusic() {
  if (backgroundPlayback) {
    backgroundPlayback.forEach(p => p.end());
    backgroundPlayback = null;
  }
}

// Play intro at start
play(introTracks);

// Start background music after intro
setTimeout(() => {
  startBackgroundMusic();
}, 70); 

// --- GAME STATE ---
const WIDTH = 20;
const HEIGHT = 10;
let score = 0;
let powered = 0;
let gameOver = false;
let win = false;
let ghosts = [];
let seed = Math.floor(Math.random() * 1000000);

// --- RANDOM MAZE GENERATION ---
function rand(x, y) {
  // Simple deterministic pseudo-random
  let n = Math.sin(x * 928371 + y * 123456 + seed) * 10000;
  return n - Math.floor(n);
}
function generateMaze() {
  let map = [];
  for (let y = 0; y < HEIGHT; y++) {
    let row = "";
    for (let x = 0; x < WIDTH; x++) {
      if (y === 0 || y === HEIGHT - 1 || x === 0 || x === WIDTH - 1) {
        row += wall;
      } else if (rand(x, y) < 0.18) {
        row += wall;
      } else if (rand(x, y) > 0.98) {
        row += power;
      } else {
        row += pellet;
      }
    }
    map.push(row);
  }
  // Place Pacman
  let px = 1, py = 1;
  map[py] = map[py].substring(0, px) + pacman + map[py].substring(px + 1);
  // Place ghosts
  ghosts = [];
  for (let i = 0; i < 3; i++) {
    let gx = WIDTH - 2 - i, gy = HEIGHT - 2;
    map[gy] = map[gy].substring(0, gx) + ghost + map[gy].substring(gx + 1);
    ghosts.push({ x: gx, y: gy, scatter: false });
  }
  return map;
}

function setRandomMap() {
  setMap(generateMaze().join("\n"));
  score = 0;
  powered = 0;
  gameOver = false;
  win = false;
}

setRandomMap();
setSolids([wall, ghost]);

// --- GHOST AI ---
function moveGhosts() {
  if (gameOver || win) return;
  let p = getFirst(pacman);
  ghosts.forEach(g => {
    let dx = p.x - g.x;
    let dy = p.y - g.y;
    let options = [];
    if (!getTile(g.x + 1, g.y).some(s => s.type === wall)) options.push([g.x + 1, g.y]);
    if (!getTile(g.x - 1, g.y).some(s => s.type === wall)) options.push([g.x - 1, g.y]);
    if (!getTile(g.x, g.y + 1).some(s => s.type === wall)) options.push([g.x, g.y + 1]);
    if (!getTile(g.x, g.y - 1).some(s => s.type === wall)) options.push([g.x, g.y - 1]);
    if (options.length === 0) return;
    // Scatter if powered, else chase
    let best;
    if (powered > 0) {
      // Move away from Pacman
      best = options.reduce((a, b) => (Math.abs(a[0] - p.x) + Math.abs(a[1] - p.y) > Math.abs(b[0] - p.x) + Math.abs(b[1] - p.y) ? a : b));
    } else {
      // Move toward Pacman
      best = options.reduce((a, b) => (Math.abs(a[0] - p.x) + Math.abs(a[1] - p.y) < Math.abs(b[0] - p.x) + Math.abs(b[1] - p.y) ? a : b));
    }
    // Move ghost
    let tile = getTile(best[0], best[1]);
    if (tile.some(s => s.type === pacman)) {
      if (powered > 0) {
        // Eat ghost
        let idx = ghosts.indexOf(g);
        ghosts.splice(idx, 1);
        clearTile(g.x, g.y);
        score += 50;
      } else {
        gameOver = true;
      }
    } else {
      clearTile(g.x, g.y);
      g.x = best[0];
      g.y = best[1];
      addSprite(g.x, g.y, ghost);
    }
  });
}

setInterval(moveGhosts, 350);

// --- INPUT ---
function tryMove(dx, dy) {
  if (gameOver || win) return;
  let p = getFirst(pacman);
  let newX = p.x + dx;
  let newY = p.y + dy;
  let tile = getTile(newX, newY);
  if (tile.some(s => s.type === wall)) return;
  if (tile.some(s => s.type === ghost)) {
    if (powered > 0) {
      clearTile(newX, newY);
      score += 200;
    } else {
      gameOver = true;
      stopBackgroundMusic();
      play(deathTracks);
      return;
    }
  }
  if (tile.some(s => s.type === pellet)) {
    score += 10;
  }
  if (tile.some(s => s.type === power)) {
    powered = 20;
    score += 50;
  }
  clearTile(p.x, p.y);
  addSprite(newX, newY, pacman);
  // Win condition: count pellets and power pellets left
  let pelletsLeft = 0;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let t = getTile(x, y);
      if (t.some(s => s.type === pellet || s.type === power)) pelletsLeft++;
    }
  }
  if (pelletsLeft === 0) {
    win = true;
    stopBackgroundMusic();
    play(winTracks);
  }
}

onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));
onInput("k", () => {
  seed = Math.floor(Math.random() * 1000000);
  setRandomMap();
  stop(); // Stop any current sounds
  play(introTracks); // Play intro again
  setTimeout(() => {
    startBackgroundMusic();
  }, 70);
});

// --- POWER TIMER ---
setInterval(() => {
  if (powered > 0) powered--;
}, 300);

// --- UI ---
afterInput(() => {
  clearText();
  // Top left: Game title
  addText("SPRIGMAN", { x: 0, y: 0 });
  // Top right: Score
  let scoreText = `SCORE: ${score}`;
  addText(scoreText, { x: WIDTH - scoreText.length, y: 0, color: color`3` });
  // Power indicator (top right, below score)
  if (powered > 0) addText(`POWER!`, { x: WIDTH - 7, y: 1, color: color`2` });
  // Centered game over / win
  if (gameOver) {
    let goText = "GAME OVER";
    addText(goText, { x: Math.max(0, Math.floor((WIDTH - goText.length) / 2)), y: Math.floor(HEIGHT / 2), color: color`2` });
    let restartText = "Press K to restart";
    addText(restartText, { x: Math.max(0, Math.floor((WIDTH - restartText.length) / 2)), y: HEIGHT + 2, color: color`4` });
  }
  if (win) {
    let winText = "YOU WIN!";
    addText(winText, { x: Math.max(0, Math.floor((WIDTH - winText.length) / 2)), y: Math.floor(HEIGHT / 2), color: color`2` });
    let restartText = "Press K for new map";
    addText(restartText, { x: Math.max(0, Math.floor((WIDTH - restartText.length) / 2)), y: HEIGHT + 2, color: color`4` });
    let finalScoreText = `Final Score: ${score}`;
    addText(finalScoreText, { x: Math.max(0, Math.floor((WIDTH - finalScoreText.length) / 2)), y: Math.floor(HEIGHT / 2) + 2, color: color`4` });
  }
});

// --- INSTRUCTIONS ---
