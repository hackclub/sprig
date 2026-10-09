// Sprig Chrome Dino Clone with Game Over Screen Flash & Restart

// 1. Define Visual Sprites (5x5 pixels)
// 2 = Red palette indicator for game over explosion state
setLegend(
  ["p", bitmap`
.000.
00000
0.0..
00000
0.0..`], // Player Dino (Black)
  ["c", bitmap`
..3..
.333.
..3..
..3..
.333.`], // Cactus Obstacle (Green)
  ["r", bitmap`
22222
22222
22222
22222
22222`] // Exploding Red Backdrop Grid Tile
);

// 2. Build the initial horizontal track map layout
setMap(map`
................
................
................
p....c.....c....`);

// 3. Game Settings & Setup Configurations
let score = 0;
let jumpStage = 0; 
let isGameOver = false;

// Action helper to start the jump sequence safely
function triggerJump() {
  if (isGameOver) {
    resetGame();
    return;
  }
  const livePlayer = getFirst("p");
  if (livePlayer && livePlayer.y === 3 && jumpStage === 0) {
    jumpStage = 1;
  }
}

// 4. Gravity & Jump Physics Routine
function applyGravity() {
  if (jumpStage === 0 || isGameOver) return;
  
  const livePlayer = getFirst("p");
  if (!livePlayer) return;

  if (jumpStage === 1) {
    livePlayer.y = 2; 
    jumpStage = 2;
  } else if (jumpStage === 2) {
    livePlayer.y = 1; 
    jumpStage = 3;
  } else if (jumpStage === 3) {
    livePlayer.y = 2; 
    jumpStage = 4;
  } else if (jumpStage === 4) {
    livePlayer.y = 3; 
    jumpStage = 0; 
  }
}

// Trigger screen-shake and paint canvas red upon impact
function triggerGameOverVisuals() {
  isGameOver = true;
  
  // Flash full track layout red using the 'r' background tiles
  setMap(map`
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr
rrrrrrrrrrrrrrrr`);

  // Clear top interface layout scores and print game over alerts
  clearText();
  addText("GAME OVER!", { x: 4, y: 1 });
  addText("Press Space to Retry", { x: 1, y: 2 });
}

// Check every game tick for structural sprite collisions
function checkCollisions() {
  if (isGameOver) return;

  const livePlayer = getFirst("p");
  if (!livePlayer) return;

  const tilesAtPlayer = getTile(livePlayer.x, livePlayer.y);
  if (tilesAtPlayer.some(t => t.type === "c")) {
    triggerGameOverVisuals();
  }
}

// Completely clean up data trackers and rebuild running map state
function resetGame() {
  isGameOver = false;
  score = 0;
  jumpStage = 0;
  
  // Re-generate fresh game components configuration maps
  setMap(map`
................
................
................
p....c.....c....`);
  
  clearText();
}

// 5. Input Control Hooks
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); 
    triggerJump();
  }
});

onInput("w", () => {
  triggerJump();
});

// 6. Primary Obstacle & World Scrolling Tick Loop
setInterval(() => {
  if (isGameOver) return; // Freeze movements while dead

  applyGravity();

  // Pull all existing obstacles leftward across map grid columns
  const cacti = getAll("c");
  cacti.forEach(cactus => {
    let targetX = cactus.x - 1;
    
    if (targetX < 0) {
      cactus.x = 15;
      score += 1;
    } else {
      cactus.x = targetX;
    }
  });

  checkCollisions();
  
  if (!isGameOver) {
    clearText();
    addText(`SCORE: ${score}`, { x: 1, y: 0 });
  }
}, 150);

