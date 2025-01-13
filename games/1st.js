// Define the sprites in our game
const player = "p";
const projectile = "*";
const enemy = "e";
const wall = "w";

// Assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
................
.....0..........
....0.0.........
...0000.........
..0.0.0.........
...0.0..........
....0...........
................
................
................
................
................
................`],
  [projectile, bitmap`
................
................
.....000........
....00000.......
.....000........
................
................
................
................
................
................
................
................
................`],
  [enemy, bitmap`
................
.....00.........
....0000........
...000000.......
...000000.......
....0000........
.....00.........
................
................
................
................
................
................
................
................`],
  [wall, bitmap`
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
0000000000000000`]
);

// Create game levels (ensure all levels are rectangular)
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwwwwwwwwwwww
wp.............w
w..............w
w....e.........w
w..............w
w......e.......w
w..............w
w....e.........w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w..............w
w....e....e....w
w..............w
w......e.......w
w..............w
w....e.........w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w..............w
w....e.........w
w....e.........w
w..............w
w....e.........w
w....e.........w
w....e.........w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`
];

// Set the current level
const currentLevel = levels[level];
setMap(currentLevel);

// Set the player and wall as solid objects (cannot pass through)
setSolids([player, wall]);

// Projectiles and enemies
let playerX = 0;
let playerY = 0;
let projectiles = [];

// Input for player movement control
onInput("w", () => {
  playerY -= 1;
  setPlayerPosition(playerX, playerY);
});

onInput("s", () => {
  playerY += 1;
  setPlayerPosition(playerX, playerY);
});

onInput("a", () => {
  playerX -= 1;
  setPlayerPosition(playerX, playerY);
});

onInput("d", () => {
  playerX += 1;
  setPlayerPosition(playerX, playerY);
});

// Shoot projectiles when the "i" key is pressed
onInput("i", () => {
  const projectileX = playerX + 1; // fire to the right of the player
  const projectileY = playerY;
  const newProjectile = { x: projectileX, y: projectileY };
  projectiles.push(newProjectile);
  spawnProjectile(newProjectile);
});

// Function to set player position
function setPlayerPosition(x, y) {
  clearText(""); // Remove any text
  getFirst(player).x = x;
  getFirst(player).y = y;
}

// Move projectiles across the map
function spawnProjectile(projectile) {
  setTimeout(() => {
    projectile.x += 1;
    if (projectile.x < 16) { // If the projectile is still within bounds
      setMap(map); // Update the map with projectile movement
      spawnProjectile(projectile); // Keep moving the projectile
    }
  }, 100); // Delay to simulate projectile speed
}

// Simple enemy movement (random up/down)
function moveEnemies() {
  tilesWith(enemy).forEach(enemyTile => {
    let randomDirection = Math.random() < 0.5 ? "up" : "down";
    if (randomDirection === "up") {
      enemyTile.y -= 1;
    } else {
      enemyTile.y += 1;
    }
  });
}

// After every input, check for collisions and enemy behavior
afterInput(() => {
  moveEnemies(); // Move enemies randomly
  
  // Check if any projectile hits an enemy
  projectiles.forEach(projectile => {
    tilesWith(projectile).forEach(projectileTile => {
      tilesWith(enemy).forEach(enemyTile => {
        if (projectileTile.x === enemyTile.x && projectileTile.y === enemyTile.y) {
          // If a projectile hits an enemy, remove both
          enemyTile.remove();
          projectileTile.remove();
        }
      });
    });
  });

  // Check if all enemies are defeated and move to the next level
  if (tilesWith(enemy).length === 0) {
    level += 1; // Increase level
    const nextLevel = levels[level];
    if (nextLevel) {
      setMap(nextLevel);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
    }
  }
});