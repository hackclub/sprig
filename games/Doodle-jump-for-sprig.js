/*
@title: Doodle Jump Infinite (Max Platforms)
@description: Spawns dense clusters of platforms frequently while leaving the bottom floor untouched.
@author: Casper Lepouttre
@tags: ['arcade', 'platformer', 'infinite']
*/

const player = "p";
const platform = "b";
const wall = "w";

setLegend(
  [ player, bitmap`
................
......55........
.....5775.......
.....5775.......
.....5555.......
......55........
................` ],
  [ platform, bitmap`
................
................
................
................
....00000000....
....00000000....
................
................` ],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ]
)

setSolids([]);

// Start with a clean map layout
const levels = [
  map`
w........w
w..b.....w
w.....b..w
w........w
w....b...w
w........w
w..b.....w
w.....b..w
w........w
w....b...w
w....p...w
w.bbbbbb.w`
];

setMap(levels[0]);

// Game Variables
let score = 0;
let gameOver = false;

// Physics numbers scaled perfectly for Sprig's tick rate
let playerY = 10;
let playerX = 4;
let yVelocity = 0;
const jumpStrength = -6; 
const gravity = 1;       

// --- Controls ---
onInput("a", () => {
  if (gameOver) return;
  if (playerX > 1) playerX--;
});

onInput("d", () => {
  if (gameOver) return;
  if (playerX < 8) playerX++;
});

// Main Game Loop (Runs at 15 frames per second for smooth grid physics)
setInterval(() => {
  if (gameOver) return;

  const p = getFirst(player);
  if (!p) return;

  // Apply gravity to velocity
  yVelocity += gravity;
  if (yVelocity > 2) yVelocity = 2; // Cap falling speed

  // Move player based on velocity sign
  if (yVelocity < 0) {
    // JUMPING UP: Move up 1 tile per tick
    playerY--;
    yVelocity++; 
  } else if (yVelocity > 0) {
    // FALLING DOWN: Check for platform collisions below
    const tilesUnderneath = getTile(playerX, playerY + 1);
    const hitPlatform = tilesUnderneath.some(t => t.type === platform);

    if (hitPlatform) {
      yVelocity = jumpStrength; // Bounce!
    } else {
      playerY++; // Keep falling
    }
  }

  // --- INFINITE CAMERA SCROLL ENGINE ---
  // If the player goes higher than the middle row (row 5), shift the entire world down
  if (playerY < 5) {
    playerY++; // Push player down to keep them on screen
    score += 10;

    // 1. Gather all platforms and shift them down EXCEPT the static base floor
    const allPlatforms = getAll(platform);
    allPlatforms.forEach(b => {
      if (b.y < 11) {
        b.y++;
        if (b.y >= 11) {
          b.remove(); // Safely delete if it hits or passes the base floor row
        }
      }
    });

    // 2. Gather all side walls and shift them down so level borders cycle seamlessly
    const allWalls = getAll(wall);
    allWalls.forEach(w => {
      w.y++;
      if (w.y >= 12) {
        let savedX = w.x; 
        w.remove(); 
        addSprite(savedX, 0, wall); 
      }
    });

    // 3. HIGH SPAWN RATE ENGINE (Attempts two separate lane spawns per scroll step)
    if (Math.random() < 0.85) {
      let spawnX1 = Math.floor(Math.random() * 4) + 1; // Left half lanes (1-4)
      addSprite(spawnX1, 1, platform); 
    }
    if (Math.random() < 0.60) {
      let spawnX2 = Math.floor(Math.random() * 4) + 5; // Right half lanes (5-8)
      addSprite(spawnX2, 1, platform); 
    }
  }

  // Update visual sprite position
  p.x = playerX;
  p.y = playerY;

  // --- GAME OVER CONDITIONS ---
  if (playerY >= 11) {
    gameOver = true;
    addText(`Game Over!\nScore: ${score}`, { y: 5, color: color`red` });
    p.remove();
  }
}, 70);