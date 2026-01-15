// GAME: COIN QUEST - WORKING TEXT DISAPPEARANCE
const player = "p";
const wall = "w";
const coin = "c";
const enemy = "e";
const goal = "g";
const heart = "h";
const spike = "s";

// SPRITES
setLegend(
  [player, bitmap`
................
......0000......
.....0....0.....
....0..00..0....
....0......0....
....0......0....
.....0....0.....
......0000......
.......00.......
.......00.......
......0..0......
......0..0......
.....0....0.....
....0......0....
...0........0...
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [coin, bitmap`
................
......3333......
....33333333....
...3322222233...
...3222222223...
...3222222223...
...3222222223...
...3222222223...
...3222222223...
...3222222223...
...3322222233...
....33333333....
......3333......
................
................`],
  [enemy, bitmap`
................
......2222......
.....2....2.....
....2..22..2....
....2......2....
....2......2....
.....2....2.....
......2222......
.......22.......
.......22.......
......2..2......
......2..2......
.....2....2.....
....2......2....
...2........2...
................`],
  [goal, bitmap`
................
......9999......
.....9....9.....
....9..99..9....
....9......9....
....9......9....
.....9....9.....
......9999......
.......99.......
.......99.......
......9..9......
......9..9......
.....9....9.....
....9......9....
...9........9...
................`],
  [heart, bitmap`
................
......3333......
....33333333....
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................
................
................
................
................`],
  [spike, bitmap`
.......44.......
......4444......
.....444444.....
....44444444....
...44......44...
..44........44..
.44..........44.
44............44
44............44
.44..........44.
..44........44..
...44......44...
....44444444....
.....444444.....
......4444......
.......44.......`]
);

// LEVEL
setMap(map`
wwwwwwwwww
w.p.....gw
w..c.....w
w...e....w
w........w
w..h....ww
w...s....w
w..c.....w
w........w
wwwwwwwwww`);

// GAME STATE
let score = 0;
let lives = 3;
let coinsCollected = 0;
let totalCoins = 0;
let gameActive = true;

// SAFE GET PLAYER FUNCTION
function getPlayer() {
  return getFirst(player);
}

// SIMPLE CLEAR TEXT - WORKS RELIABLY
function clearAllText() {
  // Clear screen by covering with spaces
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      // Add empty text to overwrite any existing text
      addText(" ", { x: x, y: y, color: color`0` });
    }
  }
}

// CLEAR SPECIFIC AREA
function clearArea(x, y, width, height) {
  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      addText(" ", { x: x + dx, y: y + dy, color: color`0` });
    }
  }
}

// HANDLE ALL COLLISIONS
function handleCollisions() {
  const p = getPlayer();
  if (!p) return;
  
  // Save current position before checking
  const currentX = p.x;
  const currentY = p.y;
  
  // Wall collision - bounce back
  if (tilesWith(player, wall).length > 0) {
    p.x = p._prevX || currentX;
    p.y = p._prevY || currentY;
  }
  
  // Save position for next frame
  p._prevX = p.x;
  p._prevY = p.y;
  
  // Coin collection
  const coinTiles = tilesWith(player, coin);
  if (coinTiles.length > 0) {
    coinTiles.forEach(tile => {
      clearTile(tile.x, tile.y);
      score += 100;
      coinsCollected++;
      
      // Show +100 effect
      const effect = addText("+100", { 
        x: tile.x, 
        y: tile.y, 
        color: color`6` 
      });
      setTimeout(() => {
        clearArea(effect.x, effect.y, 4, 1);
      }, 500);
    });
    updateUI();
  }
  
  // Heart collection
  const heartTiles = tilesWith(player, heart);
  if (heartTiles.length > 0) {
    heartTiles.forEach(tile => {
      clearTile(tile.x, tile.y);
      lives++;
      
      // Show +1 LIFE effect
      const effect = addText("+1 LIFE", { 
        x: tile.x - 1, 
        y: tile.y, 
        color: color`2` 
      });
      setTimeout(() => {
        clearArea(effect.x, effect.y, 7, 1);
      }, 500);
    });
    updateUI();
  }
  
  // Spike damage
  if (tilesWith(player, spike).length > 0) {
    lives--;
    updateUI();
    
    // Show damage effect
    const effect = addText("OUCH!", { 
      x: p.x, 
      y: p.y, 
      color: color`1` 
    });
    setTimeout(() => {
      clearArea(effect.x, effect.y, 5, 1);
    }, 500);
    
    // Reset to start position
    p.x = 2;
    p.y = 1;
    
    if (lives <= 0) {
      gameOver();
    }
  }
  
  // Enemy damage
  if (tilesWith(player, enemy).length > 0) {
    lives--;
    updateUI();
    
    // Show damage effect
    const effect = addText("HIT!", { 
      x: p.x, 
      y: p.y, 
      color: color`1` 
    });
    setTimeout(() => {
      clearArea(effect.x, effect.y, 4, 1);
    }, 500);
    
    // Push back to previous position
    p.x = p._prevX || 2;
    p.y = p._prevY || 1;
    
    if (lives <= 0) {
      gameOver();
    }
  }
  
  // Goal check
  if (tilesWith(player, goal).length > 0) {
    if (coinsCollected >= totalCoins) {
      levelComplete();
    } else {
      const needed = totalCoins - coinsCollected;
      const message = addText(`Need ${needed} more!`, { 
        x: 4, 
        y: 8, 
        color: color`3` 
      });
      setTimeout(() => {
        clearArea(4, 8, 13, 1);
      }, 1000);
      
      // Move back
      p.x = currentX;
      p.y = currentY;
    }
  }
}

// UPDATE UI - SIMPLE AND RELIABLE
function updateUI() {
  clearArea(0, 0, 16, 2); // Clear top area
  
  // Add updated UI
  addText(`Score: ${score}`, { 
    x: 1, 
    y: 0, 
    color: color`3` 
  });
  
  addText(`Lives: ${lives}`, { 
    x: 1, 
    y: 1, 
    color: color`2` 
  });
  
  addText(`Coins: ${coinsCollected}/${totalCoins}`, { 
    x: 10, 
    y: 0, 
    color: color`6` 
  });
}

// GAME STATE FUNCTIONS
function gameOver() {
  gameActive = false;
  clearAllText();
  addText("GAME OVER", { y: 6, color: color`1` });
  addText(`Final: ${score}`, { y: 8, color: color`3` });
  addText("Press J", { y: 10, color: color`5` });
}

function levelComplete() {
  gameActive = false;
  clearAllText();
  addText("YOU WIN!", { y: 6, color: color`2` });
  addText(`Score: ${score}`, { y: 8, color: color`3` });
  addText("Press J", { y: 10, color: color`5` });
}

// COUNT COINS
function countCoins() {
  const coins = getAll(coin);
  totalCoins = coins.length;
}

// CONTROLS
onInput("w", () => {
  const p = getPlayer();
  if (!p || !gameActive) return;
  p.y -= 1;
  handleCollisions();
});

onInput("s", () => {
  const p = getPlayer();
  if (!p || !gameActive) return;
  p.y += 1;
  handleCollisions();
});

onInput("a", () => {
  const p = getPlayer();
  if (!p || !gameActive) return;
  p.x -= 1;
  handleCollisions();
});

onInput("d", () => {
  const p = getPlayer();
  if (!p || !gameActive) return;
  p.x += 1;
  handleCollisions();
});

// RESTART
onInput("j", () => {
  if (!gameActive) {
    // Reset everything
    score = 0;
    lives = 3;
    coinsCollected = 0;
    gameActive = true;
    
    // Reset map
    setMap(map`
wwwwwwwwww
w.p.....gw
w..c.....w
w...e....w
w........w
w..h....ww
w...s....w
w..c.....w
w........w
wwwwwwwwww`);
    
    // Reinitialize
    initGame();
  }
});

// INITIALIZE GAME
function initGame() {
  // Clear all text
  clearAllText();
  
  // Count coins
  countCoins();
  
  // Update UI
  updateUI();
  
  // Welcome message - THIS WILL DISAPPEAR!
  addText("COIN QUEST", { y: 4, color: color`3` });
  addText("WASD = Move", { y: 6, color: color`5` });
  addText("J = Restart", { y: 7, color: color`5` });
  
  // Remove welcome messages after 2 seconds
  setTimeout(() => {
    clearArea(0, 4, 16, 4); // Clear area from y=4 to y=7
  }, 2000);
}

// START GAME
initGame();