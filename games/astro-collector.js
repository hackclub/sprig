// Game for Hack Club Sprig "You Ship, We Ship" challenge.
// Objective: Collect 10 Gems (G) before crashing into an Asteroid (A).

// --- GAME STATE VARIABLES ---
let score = 0;
const WIN_SCORE = 50;
let ASTEROID_SPAWN_RATE = 0;
const GEM_SPAWN_RATE = 6;
let tickCount = 0;
let isGameOver = false;
let highScore = 0;

// --- 1. DEFINE SPRITES (LEGEND) ---
setLegend(
  ["P", bitmap`
................
.....000000.....
.....077770.....
.....076670.....
.....076670.....
....00777700....
...0000000000...
..003330033300..
.00H33000033H00.
00HH000LL000HH00
0H00000FF00000H0
0006360FF0636000
0633330LL0333360
0000360000630000
...0000000000...
.......00.......`],
  ["G", bitmap`
................
.....777777.....
....77444477....
...7740000477...
...7440440447...
...7440660447...
...7440660447...
...7440440447...
...7740000477...
....77444477....
.....777777.....
................
................
................
................
................`],
  ["A", bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33.33.33....
...33.3333.33...
..333333333333..
..333.3333.333..
...33.3333.33...
....33.33.33....
.....333333.....
......3333......
.......33.......
................
................`]
);

// --- 2. INITIALIZE GAME MAP ---
setMap(map`
P.........
..........
..........
..........
..........
..........
..........
..........
..........
..........`);

// Reference player sprite for convenience
const player = getFirst("P");

// --- 3. UTILITY FUNCTION: BOUNDARY CHECK BEFORE MOVING ---
function canMoveSprite(sprite, dx, dy) {
  const newX = sprite.x + dx;
  const newY = sprite.y + dy;
  return newX >= 0 && newX < 10 && newY >= 0 && newY < 10;
}

// --- 4. PLAYER MOVEMENT ---
onInput("d", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, 1, 0)) {
    player.x += 1;
    checkCollisions();
  }
});

onInput("a", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, -1, 0)) {
    player.x -= 1;
    checkCollisions();
  }
});

onInput("s", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, 0, 1)) {
    player.y += 1;
    checkCollisions();
  }
});

onInput("w", () => {
  if (isGameOver) return;
  if (canMoveSprite(player, 0, -1)) {
    player.y -= 1;
    checkCollisions();
  }
});

// --- 5. COLLISION CHECK ---
function checkCollisions() {
  const tilesAtPlayer = getTile(player.x, player.y);
  
  for (const sprite of tilesAtPlayer) {
    if (sprite === player) continue;
    
    if (sprite.type === "G") {
      sprite.remove();
      score++;
      updateScoreDisplay();
      
      if (score >= WIN_SCORE) {
        endGame(true);
        return;
      }
    }
    
    if (sprite.type === "A") {
      endGame(false);
      return;
    }
  }
}

// --- 6. SPAWN ITEMS ---
function spawnNewItem(type) {
  const freePositions = [];
  for (let x = 0; x < 10; x++) {
    const spritesHere = getTile(x, 0);
    if (spritesHere.length === 0) {
      freePositions.push(x);
    }
  }
  if (freePositions.length > 0) {
    const spawnX = freePositions[Math.floor(Math.random() * freePositions.length)];
    addSprite(spawnX, 0, type);
  }
}

// --- 7. GAME LOOP ---
let gameInterval = setInterval(() => {
  if (isGameOver) return;

  // Move asteroids and gems down by 1 tile
  const asteroids = getAll("A");
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    if (canMoveSprite(asteroid, 0, 1)) {
      asteroid.y += 1;
      // Check collision after moving
      if (asteroid.x === player.x && asteroid.y === player.y) {
        endGame(false);
        return;
      }
    } else {
      asteroid.remove(); // Remove if at bottom
    }
  }

  // Move gems down too
  const gems = getAll("G");
  for (let i = gems.length - 1; i >= 0; i--) {
    const gem = gems[i];
    if (canMoveSprite(gem, 0, 1)) {
      gem.y += 1;
    } else {
      gem.remove(); // Remove if at bottom
    }
  }

  // Spawn new items based on tick count
  tickCount++;
  
  // Increase difficulty over time
  ASTEROID_SPAWN_RATE = Math.max(15, 30 - Math.floor(score / 2));
  
  if (tickCount % ASTEROID_SPAWN_RATE === 0) {
    spawnNewItem("A");
  }
  if (tickCount % GEM_SPAWN_RATE === 0) {
    spawnNewItem("G");
  }
}, 300);

// --- 8. UI FUNCTIONS ---
function updateScoreDisplay() {
  clearText();
  addText(`Gems: ${score}/${WIN_SCORE}`, { x: 1, y: 1, color: color`6` });
  if (highScore > 0) {
    addText(`High: ${highScore}`, { x: 1, y: 2, color: color`3` });
  }
}

// --- 9. END GAME ---
function endGame(won) {
  isGameOver = true;
  clearInterval(gameInterval);
  
  if (score > highScore) {
    highScore = score;
  }
  
  clearText();
  if (won) {
    addText("YOU WIN!", { x: 6, y: 7, color: color`4` });
    addText(`Final Score: ${score}`, { x: 2, y: 8, color: color`6` });
  } else {
    addText("CRASHED!", { x: 6, y: 7, color: color`3` });
    addText("GAME OVER", { x: 5, y: 8, color: color`3` });
    addText(`Score: ${score}`, { x: 6, y: 9, color: color`6` });
  }
  addText("Press J to restart", { x: 2, y: 11, color: color`2` });
}

// --- 10. RESTART FUNCTIONALITY ---
onInput("j", () => { 
  if (isGameOver) restartGame(); 
});

function restartGame() {
  // Clear the old interval
  clearInterval(gameInterval);
  
  // Reset game state
  score = 0;
  tickCount = 0;
  isGameOver = false;
  ASTEROID_SPAWN_RATE = 30;
  
  // Clear all sprites except player
  getAll("A").forEach(sprite => sprite.remove());
  getAll("G").forEach(sprite => sprite.remove());
  
  // Reset player position
  player.x = 0;
  player.y = 0;
  
  // Start new game interval
  gameInterval = setInterval(() => {
    if (isGameOver) return;

    // Move asteroids and gems down by 1 tile
    const asteroids = getAll("A");
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];
      if (canMoveSprite(asteroid, 0, 1)) {
        asteroid.y += 1;
        // Check collision after moving
        if (asteroid.x === player.x && asteroid.y === player.y) {
          endGame(false);
          return;
        }
      } else {
        asteroid.remove(); // Remove if at bottom
      }
    }

    // Move gems down too
    const gems = getAll("G");
    for (let i = gems.length - 1; i >= 0; i--) {
      const gem = gems[i];
      if (canMoveSprite(gem, 0, 1)) {
        gem.y += 1;
      } else {
        gem.remove(); // Remove if at bottom
      }
    }

    // Spawn new items based on tick count
    tickCount++;
    
    // Increase difficulty over time
    ASTEROID_SPAWN_RATE = Math.max(15, 30 - Math.floor(score / 2));
    
    if (tickCount % ASTEROID_SPAWN_RATE === 0) {
      spawnNewItem("A");
    }
    if (tickCount % GEM_SPAWN_RATE === 0) {
      spawnNewItem("G");
    }
  }, 300);
  
  // Update display
  updateScoreDisplay();
}

// --- 11. INITIALIZATION ---
updateScoreDisplay();
