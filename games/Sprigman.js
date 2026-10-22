/*
@title: Sprigman
@author: Kuberwastaken
@description: None
@tags: []
@addedOn: 2025-05-05

A Pac-Man style game with a randomly generated maze every time you start or refresh.
*/

// --- SPRITES ---
const pacman = "p";
const wall = "w";
const pellet = "d";
const power = "o";
const ghost = "g";
const redGhost = "r"; // Red ghost
const pinkGhost = "k"; // Pink ghost  
const orangeGhost = "n"; // Orange ghost
const eyes = "y"; // Eyes
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
.02202222022220.
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
  [redGhost, bitmap`
.....000000.....
..000033330000..
.00333333333300.
.03333333333330.
.03300333003330.
.03302333023330.
.03300333003330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03303300330330.
.00000000000000.
................`],
  [pinkGhost, bitmap`
.....000000.....
..000088880000..
.00888888888800.
.08888888888880.
.08800888008880.
.08802888028880.
.08800888008880.
.08888888888880.
.08888888888880.
.08888888888880.
.08888888888880.
.08888888888880.
.08888888888880.
.08808800880880.
.00000000000000.
................`],
  [orangeGhost, bitmap`
.....000000.....
..000099990000..
.00999999999900.
.09999999999990.
.09900999009990.
.09902999029990.
.09900999009990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09909900990990.
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
..02220..02220..
..00220..00220..
..00220..00220..
..02220..02220..
..00000..00000..
................
................
................
................`],
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

const eatingSoundTrack = [
  tune`
  25,
  12.5: E4^12.5,
  12.5: G#4^12.5,
  12.5: C5^12.5,
  12.5: D#5^12.5,
  12.5: F#5^12.5,
  62.5: A#5^12.5,
  12.5: B5^12.5,
  12.5: G5^12.5,
  12.5: E5^12.5,
  12.5: C#5^12.5,
  12.5: A4^12.5,
  87.5: F4^12.5,
  12.5: E4^12.5,
  12.5: G#4^12.5,
  12.5: C5^12.5,
  12.5: D#5^12.5,
  12.5: F#5^12.5,
  62.5: A#5^12.5,
  12.5: B5^12.5,
  12.5: G5^12.5,
  12.5: E5^12.5,
  12.5: C#5^12.5,
  12.5: A4^12.5,
  87.5: F4^12.5,
  12.5: E4^12.5,
  12.5: G#4^12.5,
  12.5: C5^12.5,
  12.5: D#5^12.5,
  12.5: F#5^12.5,
  62.5: A#5^12.5,
  12.5: B4^12.5,
  12.5: G4^12.5,
  12.5: E4^12.5,
  12.5: C#4^12.5,
  12.5: A3^12.5,
  87.5: F3^12.5,
  12.5: E3^12.5,
  12.5: G#3^12.5,
  12.5: C4^12.5,
  12.5: D#4^12.5,
  12.5: F#4^12.5,
  62.5: A#4^12.5,
  12.5: B3^12.5,
  12.5: G3^12.5,
  12.5: E3^12.5,
  12.5: C#3^12.5,
  12.5: A2^12.5,
  2137.5: F2^12.5,
  `
];
let eatingPlayback = null;
let pacmanIsActivelyEating = false; // Eating sound state

let playbacks = [];
let backgroundPlayback = null;

function stop() {
  playbacks.forEach((e) => e.end());
  if (backgroundPlayback) {
    backgroundPlayback.forEach(p => p.end());
    backgroundPlayback = null;
  }
  // Note: eatingPlayback is managed by stopEatingSoundNow() now
}

function stopEatingSoundNow() {
  if (eatingPlayback) {
    eatingPlayback.end();
    eatingPlayback = null;
  }
  pacmanIsActivelyEating = false;
}

function startEatingSound() {
  if (!eatingPlayback) {
    eatingPlayback = playTune(eatingSoundTrack[0]);
    eatingPlayback.loop = true;
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
let pacDirection = "right"; // Track Pacman's direction

// --- RANDOM MAZE GENERATION ---
function rand(x, y) {
  // Simple deterministic pseudo-random
  let n = Math.sin(x * 928371 + y * 123456 + seed) * 10000;
  return n - Math.floor(n);
}

function generateFallbackMaze() {
    let map = [];
    const ghostStartsFallback = [
        { x: WIDTH - 2, y: HEIGHT - 2, type: redGhost },
        { x: WIDTH - 3, y: HEIGHT - 2, type: pinkGhost },
        { x: WIDTH - 4, y: HEIGHT - 2, type: orangeGhost }
    ];
    for (let y = 0; y < HEIGHT; y++) {
        let row = "";
        for (let x = 0; x < WIDTH; x++) {
            if (y === 0 || y === HEIGHT - 1 || x === 0 || x === WIDTH - 1) {
                row += wall;
            } else if (x === 1 && y === 1) {
                row += pacman;
            } else if (ghostStartsFallback.some(gs => gs.x === x && gs.y === y)) {
                const ghost = ghostStartsFallback.find(gs => gs.x ===x && gs.y ===y);
                row += ghost.type;
            }
            else {
                row += pellet; // Very open map
            }
        }
        map.push(row);
    }
    return map;
}

function tryGenerateMazeInternal() {
  const ghostStarts = [
    { x: WIDTH - 2, y: HEIGHT - 2, type: redGhost },
    { x: WIDTH - 3, y: HEIGHT - 2, type: pinkGhost },
    { x: WIDTH - 4, y: HEIGHT - 2, type: orangeGhost }
  ];
  
  let tempGrid = []; 
  for (let y = 0; y < HEIGHT; y++) {
    let row = [];
    for (let x = 0; x < WIDTH; x++) {
      if (y === 0 || y === HEIGHT - 1 || x === 0 || x === WIDTH - 1) {
        row.push(wall);
      } else if (x === 1 && y === 1) {
        row.push('P_START_MARKER'); 
      } else if (ghostStarts.some(gs => gs.x === x && gs.y === y)) {
        row.push('G_START_MARKER'); 
      } else if (rand(x, y) < 0.18) {
        row.push(wall);
      } else {
        row.push('EMPTY_MARKER');
      }
    }
    tempGrid.push(row);
  }

  let reachableCells = new Set();
  if (tempGrid[1][1] === wall) return null; 

  let queue = [[1, 1]]; // [y, x] for Pacman's start
  reachableCells.add(`1,1`);

  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // dy, dx

  while (queue.length > 0) {
    const [cy, cx] = queue.shift();
    
    for (const [dy, dx] of directions) {
      const ny = cy + dy;
      const nx = cx + dx;

      if (ny > 0 && ny < HEIGHT - 1 && nx > 0 && nx < WIDTH - 1) {
        if (tempGrid[ny][nx] !== wall && !reachableCells.has(`${ny},${nx}`)) {
          reachableCells.add(`${ny},${nx}`);
          queue.push([ny, nx]);
        }
      }
    }
  }

  for (const gs of ghostStarts) {
    if (tempGrid[gs.y][gs.x] === wall || !reachableCells.has(`${gs.y},${gs.x}`)) {
      return null; 
    }
  }
  
  let finalMapRows = [];
  for (let y = 0; y < HEIGHT; y++) {
    let rowStr = "";
    for (let x = 0; x < WIDTH; x++) {
      const cellKey = `${y},${x}`;
      const initialCellTypeInGrid = tempGrid[y][x];

      if (initialCellTypeInGrid === wall) {
        rowStr += wall;
      } else if (reachableCells.has(cellKey)) {
        if (x === 1 && y === 1) {
          rowStr += pacman;
        } else {
          let isGhostStartCell = false;
          for (const gs of ghostStarts) {
            if (gs.x === x && gs.y === y) {
              rowStr += gs.type;
              isGhostStartCell = true;
              break;
            }
          }
          if (!isGhostStartCell) {
            if (rand(x, y) > 0.98) {
              rowStr += power;
            } else {
              rowStr += pellet;
            }
          }
        }
      } else { 
        rowStr += wall;
      }
    }
    finalMapRows.push(rowStr);
  }
  return finalMapRows;
}

function generateMaze() {
  let mapData;
  let attempts = 0;
  const MAX_ATTEMPTS = 25; // Increased max attempts slightly

  do {
    if (attempts > 0) {
      seed = Math.floor(Math.random() * 1000000); 
    }
    mapData = tryGenerateMazeInternal();
    attempts++;
  } while (!mapData && attempts < MAX_ATTEMPTS);

  if (!mapData) {
    console.warn("Failed to generate a valid connected maze after " + MAX_ATTEMPTS + " attempts. Using fallback.");
    return generateFallbackMaze(); 
  }
  
  return mapData;
}

function setRandomMap() {
  stopEatingSoundNow(); // Stop any eating sound from a previous game
  // Create the maze
  setMap(generateMaze().join("\n"));
  score = 0;
  powered = 0;
  gameOver = false;
  win = false;
  
  // Initialize ghosts with specialized behaviors
  ghosts = [];
  for (let i = 0; i < 3; i++) {
    let gx = WIDTH - 2 - i, gy = HEIGHT - 2;
    let ghostType;
    switch(i) {
      case 0: ghostType = redGhost; break;
      case 1: ghostType = pinkGhost; break;
      case 2: ghostType = orangeGhost; break;
      default: ghostType = ghost;
    }
    
    let g = { 
      x: gx, 
      y: gy, 
      scatter: false,
      eaten: false, // Explicitly set eaten property to false
      personality: i, // 0=Red (direct), 1=Pink (ambush), 2=Orange (random)
      moveTimer: i * 3, // Stagger ghost movement timing
      scatterMode: false,
      scatterTimer: 0,
      scatterTarget: { x: 0, y: 0 },
      type: ghostType  // Store the ghost type
    };
    
    // Set different scatter corners
    switch(i) {
      case 0: // Red - top right
        g.scatterTarget = { x: WIDTH - 2, y: 1 };
        break;
      case 1: // Pink - top left
        g.scatterTarget = { x: 1, y: 1 };
        break;
      case 2: // Orange - bottom left
        g.scatterTarget = { x: 1, y: HEIGHT - 2 };
        break;
    }
    
    ghosts.push(g);
  }
}

setRandomMap();
// Explicitly exclude eyes from solids
setSolids([wall, redGhost, pinkGhost, orangeGhost, ghost]);

// --- GHOST AI ---
function moveGhosts() {
  if (gameOver || win) return;
  let p = getFirst(pacman);
  
  ghosts.forEach((g, index) => {
    // Update ghost movement timer
    if (g.moveTimer > 0) {
      g.moveTimer--;
      return; // Skip this ghost's turn to move
    }
    
    // Reset timer - different speeds based on ghost type and powered state
    g.moveTimer = powered > 0 ? 1 : (g.personality === 0 ? 0 : g.personality);
    
    // Periodically toggle scatter mode
    if (!powered > 0 && Math.random() < 0.005) {
      g.scatterMode = !g.scatterMode;
      g.scatterTimer = g.scatterMode ? 15 : 0; // Scatter mode lasts ~5 seconds
    }
    
    // Decrease scatter timer
    if (g.scatterTimer > 0) {
      g.scatterTimer--;
      if (g.scatterTimer === 0) {
        g.scatterMode = false;
      }
    }
    
    if (g.eaten) {
      // Handle eaten ghosts (eyes)
      if (g.respawnTimer > 0) {
        g.respawnTimer--;
        
        let oldEyeX = g.x;
        let oldEyeY = g.y;
        let pacmanSprite = getFirst(pacman); // Get current Pacman sprite reference

        // Eyes move directly toward home for respawn (or randomly if preferred)
        let options = [];
        if (!getTile(g.x + 1, g.y).some(s => s.type === wall)) options.push([g.x + 1, g.y]);
        if (!getTile(g.x - 1, g.y).some(s => s.type === wall)) options.push([g.x - 1, g.y]);
        if (!getTile(g.x, g.y + 1).some(s => s.type === wall)) options.push([g.x, g.y + 1]);
        if (!getTile(g.x, g.y - 1).some(s => s.type === wall)) options.push([g.x, g.y - 1]);
        
        if (options.length > 0) {
          let homeX = WIDTH - 2; // Example home X
          let homeY = HEIGHT - 2; // Example home Y
          let best = options.reduce((a, b) => {
            let distA = Math.abs(a[0] - homeX) + Math.abs(a[1] - homeY);
            let distB = Math.abs(b[0] - homeX) + Math.abs(b[1] - homeY);
            return distA < distB ? a : b;
          });
          
          let newEyeX = best[0];
          let newEyeY = best[1];

          // Clear the old eye position. This might also clear Pacman if they were on the same tile.
          clearTile(oldEyeX, oldEyeY);
          
          g.x = newEyeX;
          g.y = newEyeY;
          addSprite(g.x, g.y, eyes); // Add eye to its new position

          // Ensure Pacman sprite is preserved and correctly placed
          if (pacmanSprite) {
            // If Pacman was at the old eye position AND the eye moved away from it,
            // Pacman needs to be re-added to that old position.
            if (pacmanSprite.x === oldEyeX && pacmanSprite.y === oldEyeY && 
                (oldEyeX !== newEyeX || oldEyeY !== newEyeY)) {
              addSprite(oldEyeX, oldEyeY, pacman);
            }
            // If Pacman is at the new eye position (either it was there already, or eye moved to it),
            // ensure Pacman is drawn (typically on top by being added last or if engine handles layers).
            if (pacmanSprite.x === newEyeX && pacmanSprite.y === newEyeY) {
              addSprite(newEyeX, newEyeY, pacman);
            }
          }
        }
        
        // Respawn as normal ghost
        if (g.respawnTimer === 0) {
          g.eaten = false;
          g.scatterMode = false;
          // Clear current eyes sprite before adding ghost sprite
          clearTile(g.x, g.y); 
          g.x = WIDTH - 2 - index; 
          g.y = HEIGHT - 2;
          addSprite(g.x, g.y, g.type); 
        }
      }
      return; // I THINK FIXED COLLISION LOGIC
    }
    
    // Get available move options
    let options = [];
    if (!getTile(g.x + 1, g.y).some(s => s.type === wall)) options.push([g.x + 1, g.y]);
    if (!getTile(g.x - 1, g.y).some(s => s.type === wall)) options.push([g.x - 1, g.y]);
    if (!getTile(g.x, g.y + 1).some(s => s.type === wall)) options.push([g.x, g.y + 1]);
    if (!getTile(g.x, g.y - 1).some(s => s.type === wall)) options.push([g.x, g.y - 1]);
    if (options.length === 0) return;
    
    // Remove the option that would make the ghost turn back (no 180° turns)
    if (g.lastX !== undefined && g.lastY !== undefined) {
      options = options.filter(opt => !(opt[0] === g.lastX && opt[1] === g.lastY));
      if (options.length === 0) {
        // If removing the backtracking option leaves no options, allow backtracking
        if (!getTile(g.lastX, g.lastY).some(s => s.type === wall)) {
          options.push([g.lastX, g.lastY]);
        }
      }
    }
    
    let targetX = p.x;
    let targetY = p.y;
    
    // Different ghost behaviors based on index
    if (powered > 0 || g.scatterMode) {
      // Scatter behavior - target specific corners
      targetX = g.scatterTarget.x;
      targetY = g.scatterTarget.y;
      
      // If powered, run away directly from Pacman
      if (powered > 0) {
        targetX = WIDTH - p.x;
        targetY = HEIGHT - p.y;
      }
    } else {
      // Normal chase behavior
      switch (g.personality) {
        case 0: // Red ghost - direct chase
          // Just chase directly
          targetX = p.x;
          targetY = p.y;
          break;
        case 1: // Pink ghost - ambush ahead of Pacman
          // Use the tracked direction
          if (pacDirection === "right") {
            targetX = p.x + 4;
            targetY = p.y;
          } else if (pacDirection === "left") {
            targetX = p.x - 4;
            targetY = p.y;
          } else if (pacDirection === "up") {
            targetX = p.x;
            targetY = p.y - 4;
          } else if (pacDirection === "down") {
            targetX = p.x;
            targetY = p.y + 4;
          }
          
          // Keep within bounds
          targetX = Math.max(1, Math.min(WIDTH-2, targetX));
          targetY = Math.max(1, Math.min(HEIGHT-2, targetY));
          break;
        case 2: // Orange ghost - patrol
          // Calculate distance to Pacman
          let dist = Math.abs(g.x - p.x) + Math.abs(g.y - p.y);
          if (dist < 6) {
            // When close, move to bottom left corner
            targetX = 1;
            targetY = HEIGHT - 2;
          } else {
            // When far, chase directly
            targetX = p.x;
            targetY = p.y;
          }
          break;
      }
    }
    
    // Choose the best move option
    let best;
    if (options.length === 1) {
      best = options[0]; // Only one choice
    } else {
      // Add randomness based on ghost personality
      let randomChance = 0.1;
      if (g.personality === 2) randomChance = 0.25; // Orange is more random
      
      if (Math.random() < randomChance) {
        // Occasional random move to prevent getting stuck and add unpredictability
        best = options[Math.floor(Math.random() * options.length)];
      } else {
        // Normal targeting behavior
        best = options.reduce((a, b) => {
          let distA = Math.abs(a[0] - targetX) + Math.abs(a[1] - targetY);
          let distB = Math.abs(b[0] - targetX) + Math.abs(b[1] - targetY);
          
          if (powered > 0 || g.scatterMode) {
            // During scatter or when powered, prioritize moves that are further from target
            return distA > distB ? a : b;
          } else {
            // During chase, prioritize moves that are closer to target
            return distA < distB ? a : b;
          }
        });
      }
    }
    
    // Move ghost - use ghost's specific type
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
      } else if (!g.eaten) {
        // Only regular ghosts kill pacman, eyes don't
        gameOver = true;
      }
    } else {
      clearTile(g.x, g.y);
      // Save last position before moving
      g.lastX = g.x;
      g.lastY = g.y;
      g.x = best[0];
      g.y = best[1];
      addSprite(g.x, g.y, g.type); // Use the ghost's type
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
    stopEatingSoundNow(); // Stop eating sound on game over
    play(deathTracks);
    return;
  }
  
  // Update Pacman direction based on movement
  if (dx === 1) pacDirection = "right";
  else if (dx === -1) pacDirection = "left";
  else if (dy === 1) pacDirection = "down";
  else if (dy === -1) pacDirection = "up";
  
  let currentPacmanX = p.x;
  let currentPacmanY = p.y;
  let newX = currentPacmanX + dx;
  let newY = currentPacmanY + dy;
  
  let targetTileSprites = getTile(newX, newY);
  
  // Check for wall collision
  if (targetTileSprites.some(s => s.type === wall)) {
    pacmanIsActivelyEating = false; // Not moving, so not eating
    return;
  }

  // Check if the target tile has a pellet or power pellet
  let hasPellet = targetTileSprites.some(s => s.type === pellet || s.type === power);
  
  // Set eating flag if moving to tile with a pellet
  pacmanIsActivelyEating = hasPellet;
  
  // Check for ghost collision (any non-eaten ghost type)
  let ghostSpriteOnTargetTile = targetTileSprites.find(s => 
    !s.eaten && (s.type === ghost || s.type === redGhost || s.type === pinkGhost || s.type === orangeGhost)
  );
  
  if (ghostSpriteOnTargetTile) {
    if (powered > 0) {
      let ghostObject = ghosts.find(g => g.x === newX && g.y === newY && !g.eaten);
      if (ghostObject) {
        ghostObject.eaten = true;
        ghostObject.respawnTimer = 20;
        // Ghost object's location remains newX, newY as eyes

        score += 200;

        // Sprite management:
        // 1. Clear Pacman from its original tile if it actually moved.
        if (currentPacmanX !== newX || currentPacmanY !== newY) {
          clearTile(currentPacmanX, currentPacmanY);
        }
        // 2. Clear the target tile (which contained the original ghost, and Pacman if it didn't move)
        clearTile(newX, newY); 
        // 3. Add eyes and Pacman to the target tile.
        addSprite(newX, newY, eyes);
        addSprite(newX, newY, pacman); // Pacman is now definitively at newX, newY
      }
    } else {
      // Pacman not powered and hits a ghost.
      gameOver = true;
      stopBackgroundMusic();
      stopEatingSoundNow(); // Stop eating sound on game over
      play(deathTracks);
      return;
    }
  } else {
    // No ghost collision on the target tile. Pacman moves normally.
    clearTile(currentPacmanX, currentPacmanY); // Clear Pacman from old position
    
    // Handle pellet or power pellet collection on new tile before adding Pacman
    if (targetTileSprites.some(s => s.type === pellet)) {
      score += 10;
      // Remove pellet sprite - clear and re-add other things or manage tile carefully
      // For simplicity, Sprig games often just let Pacman cover it.
      // To properly remove: get all sprites on newX,newY, filter out pellet, clearTile, re-add others.
    }
    if (targetTileSprites.some(s => s.type === power)) {
      powered = 20;
      score += 50;
      // Similar removal logic for power pellet if desired.
    }
    
    addSprite(newX, newY, pacman); // Add Pacman to new position
  }

  // Check win condition (pellets and power pellets)
  let pelletsLeft = 0;
  for (let y_coord = 0; y_coord < HEIGHT; y_coord++) {
    for (let x_coord = 0; x_coord < WIDTH; x_coord++) {
      let t = getTile(x_coord, y_coord);
      if (t.some(s => s.type === pellet || s.type === power)) pelletsLeft++;
    }
  }
  if (pelletsLeft === 0) {
    win = true;
    stopBackgroundMusic();
    stopEatingSoundNow(); // Stop eating sound on win
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
  stopEatingSoundNow(); // Stop eating sound when restarting
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
  
  // Handle eating sound based on eating state
  if (pacmanIsActivelyEating && !gameOver && !win) {
    startEatingSound();
  } else {
    stopEatingSoundNow();
  }
  
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
