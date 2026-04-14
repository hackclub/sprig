/*
@title: Maximus
@author: KeshavDaBoss (Pratham Yadav)
@tags: ['shooter', 'arcade']
@addedOn: 2026-01-28
@description: A shooter arcade game where you move and blast enemies

Controls:
- W/S: Move up/down
- D: Shoot
- J: Restart (after game over)
*/

const player = "p";
const enemy = "e";
const bullet = "b";
const bg = "x";

setLegend(
  [player, bitmap`
................
................
................
.....0..........
.....500........
.....0550.......
.....L00500.....
.....1LL0550....
.....L00500.....
.....0550.......
.....500........
.....0..........
................
................
................
................`],
  [enemy, bitmap`
................
................
................
..........0.....
........003.....
.......0330.....
.....00300L.....
....0330LL1.....
.....00300L.....
.......0330.....
........003.....
..........0.....
................
................
................
................`],
  [bullet, bitmap`
................
................
................
................
................
................
................
................
.....55.........
................
................
................
................
................
................
................`],
  [bg, bitmap`
0000000000000000
0000000000000020
0000000000000000
0002000000000000
0000000000000000
0000000000000200
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0200000000000000
0000000000000000
0000000000000000
0000020000000020
0000000000000000
0000000000000000`]
);

setSolids([]);

let score = 0;
let gameRunning = true;
let enemiesKilled = 0;

// Map is 7 wide x 4 tall - using black background tiles
setMap(map`
.xxxxxx
pxxxxxx
.xxxxxx
.xxxxxx`);

// Movement controls - up and down
onInput("w", () => {
  if (!gameRunning) return;
  const p = getFirst(player);
  if (p && p.y > 0) {
    p.y -= 1;
  }
});

onInput("s", () => {
  if (!gameRunning) return;
  const p = getFirst(player);
  if (p && p.y < 3) {
    p.y += 1;
  }
});

// Shooting - bullets go right
onInput("d", () => {
  if (!gameRunning) return;
  const p = getFirst(player);
  if (p) {
    addSprite(p.x + 1, p.y, bullet);
  }
});

// Restart game
onInput("j", () => {
  if (!gameRunning) {
    restartGame();
  }
});

function restartGame() {
  clearText();
  score = 0;
  enemiesKilled = 0;
  gameRunning = true;
  
  // Clear all sprites first
  getAll(enemy).forEach(e => e.remove());
  getAll(bullet).forEach(b => b.remove());
  
  // Reset the map with black background
  setMap(map`
xxxxxxx
xxxxxxx
pxxxxxx
xxxxxxx`);
  
  updateScore();
}

function updateScore() {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
  if (!gameRunning) {
    addText("Game Over!", { x: 4, y: 6, color: color`3` });
    addText("Press J", { x: 5, y: 8, color: color`2` });
    addText("to Restart", { x: 4, y: 9, color: color`2` });
  }
}

// Spawn enemies from the FAR RIGHT side (x=6 is the rightmost column in a 7-wide map)
function spawnEnemy() {
  if (!gameRunning) return;
  const y = Math.floor(Math.random() * 4);
  addSprite(6, y, enemy);
}

// Calculate spawn rate based on enemies killed (gets faster every 10 enemies)
function getSpawnRate() {
  const speedLevel = Math.floor(enemiesKilled / 10);
  const baseRate = 60; // 3 seconds at 16ms per tick
  const minRate = 20; // Minimum spawn rate (fastest)
  const reduction = speedLevel * 5; // Reduce by 5 ticks per level
  return Math.max(minRate, baseRate - reduction);
}

// Move bullets right and remove them when they go off-screen
function moveBullets() {
  if (!gameRunning) return;
  const bullets = getAll(bullet);
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b) {
      // Remove bullets that are already off-screen or at the edge
      if (b.x >= 6) {
        b.remove();
      } else {
        b.x += 1;
      }
    }
  }
}

// Move enemies left
function moveEnemies() {
  if (!gameRunning) return;
  const enemies = getAll(enemy);
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e) {
      e.x -= 1;
      
      // Check if the enemy reached the left side (player lost)
      if (e.x <= 0) {
        gameRunning = false;
        updateScore();
        return;
      }
    }
  }
}

// Check for collisions between bullets and enemies
function checkCollisions() {
  if (!gameRunning) return;
  const bullets = getAll(bullet);
  const enemies = getAll(enemy);
  
  // Track bullets and enemies to remove
  const bulletsToRemove = [];
  const enemiesToRemove = [];
  
  // Check each bullet against each enemy
  for (let i = 0; i < bullets.length; i++) {
    const b = bullets[i];
    if (!b) continue;
    
    for (let j = 0; j < enemies.length; j++) {
      const e = enemies[j];
      if (!e) continue;
      
      // Hit detection - check if bullet and enemy are on the same tile
      if (b.x === e.x && b.y === e.y) {
        // Mark for removal
        if (!bulletsToRemove.includes(b)) bulletsToRemove.push(b);
        if (!enemiesToRemove.includes(e)) enemiesToRemove.push(e);
      }
    }
  }
  
  // Remove all marked sprites
  bulletsToRemove.forEach(b => b.remove());
  enemiesToRemove.forEach(e => {
    e.remove();
    enemiesKilled++;
    score += 10;
  });
  
  if (enemiesToRemove.length > 0) {
    updateScore();
  }
}

// Game loop - SLOWED DOWN for better gameplay
let enemySpawnCounter = 0;
let bulletMoveCounter = 0;
let enemyMoveCounter = 0;

setInterval(() => {
  if (!gameRunning) return;
  
  // Spawn enemies at progressive rate (gets faster every 10 kills)
  enemySpawnCounter++;
  if (enemySpawnCounter >= getSpawnRate()) {
    spawnEnemy();
    enemySpawnCounter = 0;
  }
  
  // Move bullets every 5 ticks
  bulletMoveCounter++;
  if (bulletMoveCounter >= 5) {
    moveBullets();
    bulletMoveCounter = 0;
  }
  
  // Move enemies every 45 ticks
  enemyMoveCounter++;
  if (enemyMoveCounter >= 45) {
    moveEnemies();
    enemyMoveCounter = 0;
  }
  
  // Check collisions EVERY frame for better hit detection
  checkCollisions();
  
}, 16); // ~60 FPS

// Initialize score display
updateScore();