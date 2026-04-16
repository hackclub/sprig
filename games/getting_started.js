const player = "p";
const darkness = "#";
const medkit = "m";
const syringeTop = "s";
const syringeBot = "b";
const stationWall = "w";
const debris = "d";

setLegend(
  [ player, bitmap`
................
....5555555.....
....55....5.....
....5......5....
....5......5....
....5......5....
....5555555.....
.......0........
....00000000....
....0..0..0.....
....0.....0.....
....0.....0.....
....00...00.....
................` ],
  [ darkness, bitmap`
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
0000000000000000` ],
  [ medkit, bitmap`
................
................
...1111111111...
...1........1...
...1...44...1...
...1..4444..1...
...1.444444.1...
...1..4444..1...
...1...44...1...
...1........1...
...1111111111...
................
................
................` ],
  [ syringeTop, bitmap`
....8888888.....
....8888888.....
....8888888.....
....8888888.....
....8888888.....
.....88888......
......888.......
......111.......
......111.......
......111.......
......111.......
......888.......
.......8........
.......8........` ],
  [ syringeBot, bitmap`
.......8........
.......8........
......888.......
......111.......
......111.......
......111.......
......111.......
......888.......
.....88888......
....8888888.....
....8888888.....
....8888888.....
....8888888.....
....8888888.....` ],
  [ stationWall, bitmap`
2222222222222222
2333333333333332
2222222222222222
2333333333333332
2222222222222222
2333333333333332
2222222222222222
2333333333333332
2222222222222222
2333333333333332
2222222222222222
2333333333333332
2222222222222222
................` ],
  [ debris, bitmap`
................
................
................
................
....44....44....
.....44..44.....
......4444......
.......44.......
......4444......
.....44..44.....
....44....44....
................
................
................` ]
);

const hbfLevel = map`
wwwwwwwwwwwwwwww
................
................
................
................
................
...p............
................
................
................
................
................
................
wwwwwwwwwwwwwwww`;

const mazeLevel = map`
wwwwwwwwwwwwwwww
wpw.......w....w
w.w.wwwww.w.ww.w
w...w.....w..w.w
w.www.wwwww.ww.w
w.....w........w
wwwww.w.wwwwwwww
w.....w..w.....w
w.wwwwww.w.www.w
w......w...w...w
wwwwww.wwwww.w.w
wm...........w.w
wwwwwwwwwwwwwwww`;

let gameState = "FLAPPY"; // "FLAPPY" or "MAZE"
let tick = 0;
let score = 0;
let lives = 3;
let invulnTimer = 0;
let baseInterval = 180;
let gameLoop;

// --- STATE MANAGERS ---

function startFlappy(keepScore = false) {
  gameState = "FLAPPY";
  setMap(hbfLevel);
  
  if (!keepScore) score = 0;
  lives = 3;
  tick = 0;
  invulnTimer = 0;
  baseInterval = 180;
  clearText();
  
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(loopBody, baseInterval);
}

function startMaze() {
  gameState = "MAZE";
  setMap(mazeLevel);
  
  // Apply the Fog of War (cover everything in darkness)
  for (let x = 0; x < 16; x++) {
     for (let y = 0; y < 13; y++) {
        addSprite(x, y, darkness);
     }
  }
  
  clearText();
  addText("FIND NALOXONE", {x: 2, y: 0, color: color`3`});
  updateFog();
}

// --- FLAPPY BIRD LOGIC ---

function loopBody() {
  if (gameState !== "FLAPPY") return;
  
  const p = getFirst(player);
  if (!p) return;

  tick++;
  p.y += 1; // Automatic Gravity

  const topPipes = getAll(syringeTop);
  const botPipes = getAll(syringeBot);
  const stationDebris = getAll(debris);
  
  // Scroll obstacles
  [...topPipes, ...botPipes, ...stationDebris].forEach(obj => {
    obj.x -= 1;
    if (obj.x < 0) {
      obj.remove();
    }
  });

  // Spawn obstacles
  if (tick % 7 === 0) {
     const gapStart = Math.floor(Math.random() * 5) + 3;
     const gapSize = 4;
     
     for (let y = 1; y < 13; y++) {
        if (y < gapStart) {
           addSprite(15, y, syringeTop);
        } else if (y >= gapStart + gapSize) {
           addSprite(15, y, syringeBot);
        }
     }
     score++;
     
     if (Math.random() > 0.6) addSprite(15, 1, debris);
     if (Math.random() > 0.6) addSprite(15, 12, debris);
  }
  
  // Speed up over time
  if (score > 0 && score % 10 === 0 && baseInterval > 100) {
      baseInterval -= 5;
      clearInterval(gameLoop);
      gameLoop = setInterval(loopBody, baseInterval);
  }

  // Collision logic (only check if not currently nauseous)
  let hit = false;
  if (invulnTimer === 0) {
      const tiles = getTile(p.x, p.y);
      for (let i = 0; i < tiles.length; i++) {
         const type = tiles[i].type;
         if (type === syringeTop || type === syringeBot || type === stationWall || type === debris) {
            hit = true;
         }
      }
      
      if (p.y <= 0 || p.y >= 13) hit = true;

      if (hit) {
         lives--;
         if (lives <= 0) {
             startMaze(); // Transition to Labyrinth!
             return;
         } else {
             invulnTimer = 10; // Trigger nausea frames
         }
      }
  }

  // Draw UI and handle nausea animation
  clearText();
  
  if (invulnTimer > 0) {
      invulnTimer--;
      addText("NAUSEOUS!", {x: 4, y: 3, color: color`5`});
      // Nausea animation: wobble X and Y slightly
      p.x = 3 + (invulnTimer % 2 === 0 ? 1 : -1);
      if (invulnTimer % 3 === 0) p.y -= 1;
  } else {
      p.x = 3; // Lock standard X position
  }
  addText(`S:${score} L:${lives}`, {x: 1, y: 1, color: color`3`});
}

// --- MAZE LOGIC & CONTROLS ---

function updateFog() {
  const p = getFirst(player);
  if (!p) return;
  
  // Clear darkness in a radius around the player
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
       if (Math.abs(dx) + Math.abs(dy) <= 3) { 
          const tiles = getTile(p.x + dx, p.y + dy);
          tiles.forEach(t => {
             if (t.type === darkness) t.remove();
          });
       }
    }
  }
}

function tryMoveMaze(dx, dy) {
   const p = getFirst(player);
   if (!p) return;
   
   // Check if the target tile has a wall
   const targetTiles = getTile(p.x + dx, p.y + dy);
   const hitWall = targetTiles.some(t => t.type === stationWall);
   
   if (!hitWall) {
      p.x += dx;
      p.y += dy;
   }
}

// Inputs handle both Flappy jumping and Maze walking
onInput("w", () => {
  if (gameState === "FLAPPY") {
    const p = getFirst(player);
    if (p) p.y -= 2; 
  } else if (gameState === "MAZE") {
    tryMoveMaze(0, -1);
  }
});

onInput("s", () => { if (gameState === "MAZE") tryMoveMaze(0, 1); });
onInput("a", () => { if (gameState === "MAZE") tryMoveMaze(-1, 0); });
onInput("d", () => { if (gameState === "MAZE") tryMoveMaze(1, 0); });

// Check Maze interactions after every step
afterInput(() => {
   if (gameState === "MAZE") {
      updateFog();
      
      const p = getFirst(player);
      if (p) {
         const tiles = getTile(p.x, p.y);
         // If we found the Medkit, go back to Flappy Bird and keep the score!
         if (tiles.some(t => t.type === medkit)) {
            startFlappy(true); 
         }
      }
   }
});

// Start the game!
startFlappy(false);
