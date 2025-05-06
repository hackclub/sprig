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
const eyes = "y"; // New eyes sprite for eaten ghosts
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
................`],
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
5555555555555555`],
  [pellet, bitmap`
................
................
................
................
................
................
......6666......
......6666......
......6666......
......6666......
................
................
................
................
................
................`],
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
................`],
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
................`],
  [eyes, bitmap`
................
................
................
..00000..00000..
..02220..02220..
..02220..02220..
..00220..00220..
..00220..00220..
..00220..00220..
..00220..00220..
..02220..02220..
..00000..00000..
................
................
................
................`], // New eyes sprite
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
37.5: D5^37.5,
37.5: C#5^37.5,
37.49999999999999: D5^37.49999999999999,
37.50000000000001: C#5^37.50000000000001,
37.50000000000001: C5^37.50000000000001,
37.49999999999998: C#5^37.49999999999998,
37.500000000000036: C5^37.500000000000036,
37.49999999999998: B4^37.49999999999998,
37.49999999999998: C5^37.49999999999998,
37.500000000000036: B4^37.500000000000036,
37.49999999999998: A#4^37.49999999999998,
37.49999999999998: B4^37.49999999999998,
37.500000000000036: A#4^37.500000000000036,
37.500000000000036: A4^37.500000000000036,
37.49999999999998: G#4^37.49999999999998,
37.49999999999998: A4^37.49999999999998,
37.49999999999998: G#4^37.49999999999998,
37.49999999999998: G4^37.49999999999998,
37.500000000000085: G#4^37.500000000000085,
37.49999999999998: G4^37.49999999999998,
37.49999999999998: F#4^37.49999999999998,
37.49999999999998: G4^37.49999999999998,
37.49999999999998: F#4^37.49999999999998,
37.49999999999998: F4^37.49999999999998,
37.500000000000085: F#4^37.500000000000085,
37.49999999999998: F4^37.49999999999998,
37.49999999999998: E4^37.49999999999998,
37.500000000000085: D#4^37.500000000000085,
37.499999999999865: E4^37.499999999999865,
37.500000000000085: D#4^37.500000000000085,
37.499999999999865: D4^37.499999999999865,
37.500000000000085: D#4^37.500000000000085,
37.500000000000085: D4^37.500000000000085,
37.499999999999865: C#4^37.499999999999865,
37.500000000000085: D4^37.500000000000085,
37.499999999999865: C#4^37.499999999999865,
37.500000000000085: C4^37.500000000000085,
37.500000000000085: C#4^37.500000000000085,
37.499999999999865: C4^37.499999999999865,
37.500000000000085: B3^37.500000000000085,
37.499999999999865: A#3^37.499999999999865,
37.500000000000085: B3^37.500000000000085,
37.500000000000085: A#3^37.500000000000085,
37.499999999999865: A3^37.499999999999865,
37.500000000000085: A#3^37.500000000000085,
37.499999999999865: A3^37.499999999999865,
37.500000000000085: G#3^37.500000000000085,
37.499999999999865: A3^37.499999999999865,
37.500000000000085: E3^37.500000000000085,
37.500000000000085: G3^37.500000000000085,
37.499999999999865: B3^37.499999999999865,
74.99999999999996: D4^37.500000000000085,
37.500000000000085: E3^37.500000000000085,
37.500000000000085: G3^37.500000000000085,
37.500000000000085: B3^37.500000000000085,
2100: D4^37.499999999999645,
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
setSolids([wall, ghost]); // Eyes are not solid

// --- GHOST AI ---
function moveGhosts() {
  if (gameOver || win) return;
  let p = getFirst(pacman);
  ghosts.forEach(g => {
    if (g.eaten) {
      // Handle eaten ghosts (eyes)
      if (g.respawnTimer > 0) {
        g.respawnTimer--;
        // Move randomly
        let options = [];
        if (!getTile(g.x + 1, g.y).some(s => s.type === wall)) options.push([g.x + 1, g.y]);
        if (!getTile(g.x - 1, g.y).some(s => s.type === wall)) options.push([g.x - 1, g.y]);
        if (!getTile(g.x, g.y + 1).some(s => s.type === wall)) options.push([g.x, g.y + 1]);
        if (!getTile(g.x, g.y - 1).some(s => s.type === wall)) options.push([g.x, g.y - 1]);
        if (options.length > 0) {
          let best = options[Math.floor(Math.random() * options.length)];
          clearTile(g.x, g.y);
          g.x = best[0];
          g.y = best[1];
          addSprite(g.x, g.y, eyes);
        }
        // Respawn as normal ghost
        if (g.respawnTimer === 0) {
          g.eaten = false;
          clearTile(g.x, g.y);
          g.x = WIDTH - 2; // Respawn near original position
          g.y = HEIGHT - 2;
          addSprite(g.x, g.y, ghost);
        }
      }
      return;
    }
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
        // Eat ghost, turn to eyes
        g.eaten = true;
        g.respawnTimer = 20; // ~7 seconds (20 * 350ms)
        clearTile(g.x, g.y);
        g.x = best[0];
        g.y = best[1];
        addSprite(g.x, g.y, eyes);
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
  if (!p) {
    console.log("Pacman sprite not found!");
    gameOver = true;
    stopBackgroundMusic();
    play(deathTracks);
    return;
  }
  let newX = p.x + dx;
  let newY = p.y + dy;
  let tile = getTile(newX, newY);
  if (tile.some(s => s.type === wall)) return;

  // Handle ghost collision
  let ghostSprite = tile.find(s => s.type === ghost);
  if (ghostSprite) {
    if (powered > 0) {
      let ghost = ghosts.find(g => g.x === newX && g.y === newY);
      if (ghost) {
        ghost.eaten = true;
        ghost.respawnTimer = 20;
        clearTile(newX, newY); // Clear ghost sprite
        addSprite(newX, newY, eyes);
        ghost.x = newX;
        ghost.y = newY;
        score += 200;
        // Move Pacman to new position
        clearTile(p.x, p.y);
        addSprite(newX, newY, pacman);
      }
    } else {
      gameOver = true;
      stopBackgroundMusic();
      play(deathTracks);
      return;
    }
  } else {
    // Handle pellet or power pellet
    if (tile.some(s => s.type === pellet)) {
      score += 10;
    }
    if (tile.some(s => s.type === power)) {
      powered = 20;
      score += 50;
    }
    // Move Pacman
    clearTile(p.x, p.y);
    addSprite(newX, newY, pacman);
  }

  // Check win condition
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
