/*
@title: Giga Chad
@description: "Giga Chad" is a chaotic arcade game where players control a hyper-muscled hero in a wild series of challenges. Inspired by meme culture and classic beat 'em ups, Giga Chad smashes through obstacles, lifts impossible weights, and battles over-the-top enemies. The game features fast-paced action, humorous animations, and power-ups that turn the hero even more giga. Score points by performing feats of strength, dodging hazards, and unleashing special moves. Only the chaddest can conquer every stage!
@author: Vrund4591
@tags: ['arcade','action','meme']
@addedOn: 2025-09-07

[Game description and controls will be customized based on the actual game mechanics]

The Asymmetrical Pilot: Control a huge mech with dual D-pad controls!
Left D-pad: Move the mech's legs (tank-style movement)
Right D-pad: Aim the mech's torso and weapons independently
*/

const player = "p";
const enemy = "e";
const bullet = "b";
const enemyBullet = "x";
const powerup = "u";
const explosion = "z";
const background = "g";

setLegend(
  [ player, bitmap`
................
................
.....000000.....
....00666600....
....06666660....
....06666660....
....00666600....
.....000000.....
....00000000....
...0066666600...
..006666666600..
..066666666660..
..066666666660..
..006666666600..
...0000000000...
................`],
  [ enemy, bitmap`
................
................
.....333333.....
....33333333....
....32222223....
....32222223....
....33333333....
.....333333.....
....33333333....
...3322222233...
..332222222233..
..322222222223..
..322222222223..
..332222222233..
...3333333333...
................`],
  [ bullet, bitmap`
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
................
................`],
  [ enemyBullet, bitmap`
................
................
................
................
................
......3333......
......3333......
......3333......
......3333......
................
................
................
................
................
................
................`],
  [ powerup, bitmap`
................
................
.....444444.....
....44444444....
....42222224....
....42222224....
....42222224....
....42222224....
....44444444....
.....444444.....
................
................
................
................
................
................`],
  [ explosion, bitmap`
................
................
.....999999.....
....99999999....
....99999999....
....99999999....
....99999999....
....99999999....
....99999999....
.....999999.....
................
................
................
................
................
................`],
  [ background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggpgggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg
gggggggggggggggg`
];

setMap(levels[level]);

// Game state
let gameState = {
  score: 0,
  health: 100,
  wave: 1,
  enemies: [],
  bullets: [],
  enemyBullets: [],
  powerups: [],
  explosions: [],
  gameOver: false
};

// Mech state
let mech = {
  x: 7,
  y: 7,
  // Leg direction (for movement)
  legAngle: 0, // 0=up, 1=right, 2=down, 3=left
  // Torso direction (for aiming)
  torsoAngle: 0, // 0=up, 1=right, 2=down, 3=left
  // Movement physics
  velocityX: 0,
  velocityY: 0,
  maxSpeed: 0.3,
  acceleration: 0.05,
  friction: 0.02,
  // Shooting
  lastShot: 0,
  shotCooldown: 15, // frames between shots
  // Power-ups
  weaponType: 'normal', // normal, shotgun, laser
  legType: 'normal' // normal, treads, hover
};

// Direction vectors
const directions = [
  { x: 0, y: -1 }, // up
  { x: 1, y: 0 },  // right
  { x: 0, y: 1 },  // down
  { x: -1, y: 0 }  // left
];

// Initialize game
function initGame() {
  gameState.score = 0;
  gameState.health = 100;
  gameState.wave = 1;
  gameState.enemies = [];
  gameState.bullets = [];
  gameState.enemyBullets = [];
  gameState.powerups = [];
  gameState.explosions = [];
  gameState.gameOver = false;
  
  mech.x = 7;
  mech.y = 7;
  mech.legAngle = 0;
  mech.torsoAngle = 0;
  mech.velocityX = 0;
  mech.velocityY = 0;
  
  spawnWave();
}

// Spawn enemies for current wave
function spawnWave() {
  const numEnemies = Math.min(3 + gameState.wave, 8);
  
  for (let i = 0; i < numEnemies; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 16);
      y = Math.floor(Math.random() * 16);
    } while (Math.abs(x - mech.x) < 3 && Math.abs(y - mech.y) < 3);
    
    gameState.enemies.push({
      x: x,
      y: y,
      health: 2,
      lastShot: 0,
      shotCooldown: 60 + Math.random() * 60
    });
  }
  
  // Spawn power-up occasionally
  if (Math.random() < 0.3) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 16);
      y = Math.floor(Math.random() * 16);
    } while (Math.abs(x - mech.x) < 2 && Math.abs(y - mech.y) < 2);
    
    gameState.powerups.push({
      x: x,
      y: y,
      type: Math.random() < 0.5 ? 'weapon' : 'legs'
    });
  }
}

// Update mech physics
function updateMech() {
  // Apply friction
  mech.velocityX *= (1 - mech.friction);
  mech.velocityY *= (1 - mech.friction);
  
  // Update position
  mech.x += mech.velocityX;
  mech.y += mech.velocityY;
  
  // Boundary checking
  mech.x = Math.max(0, Math.min(15, mech.x));
  mech.y = Math.max(0, Math.min(15, mech.y));
  
  // Update cooldowns
  if (mech.lastShot > 0) mech.lastShot--;
}

// Update bullets
function updateBullets() {
  // Update player bullets
  for (let i = gameState.bullets.length - 1; i >= 0; i--) {
    const bullet = gameState.bullets[i];
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    
    // Remove if out of bounds
    if (bullet.x < 0 || bullet.x >= 16 || bullet.y < 0 || bullet.y >= 16) {
      gameState.bullets.splice(i, 1);
      continue;
    }
    
    // Check enemy collisions
    for (let j = gameState.enemies.length - 1; j >= 0; j--) {
      const enemy = gameState.enemies[j];
      if (Math.abs(bullet.x - enemy.x) < 0.8 && Math.abs(bullet.y - enemy.y) < 0.8) {
        enemy.health--;
        gameState.bullets.splice(i, 1);
        
        if (enemy.health <= 0) {
          gameState.score += 10;
          gameState.enemies.splice(j, 1);
          
          // Create explosion
          gameState.explosions.push({
            x: enemy.x,
            y: enemy.y,
            timer: 10
          });
        }
        break;
      }
    }
  }
  
  // Update enemy bullets
  for (let i = gameState.enemyBullets.length - 1; i >= 0; i--) {
    const bullet = gameState.enemyBullets[i];
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    
    // Remove if out of bounds
    if (bullet.x < 0 || bullet.x >= 16 || bullet.y < 0 || bullet.y >= 16) {
      gameState.enemyBullets.splice(i, 1);
      continue;
    }
    
    // Check player collision
    if (Math.abs(bullet.x - mech.x) < 0.8 && Math.abs(bullet.y - mech.y) < 0.8) {
      gameState.health -= 10;
      gameState.enemyBullets.splice(i, 1);
      
      if (gameState.health <= 0) {
        gameState.gameOver = true;
      }
    }
  }
}

// Update enemies
function updateEnemies() {
  for (let enemy of gameState.enemies) {
    // Simple AI: move towards player and shoot occasionally
    const dx = mech.x - enemy.x;
    const dy = mech.y - enemy.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 1) {
      enemy.x += (dx / dist) * 0.02;
      enemy.y += (dy / dist) * 0.02;
      
      // Keep enemies within bounds
      enemy.x = Math.max(0, Math.min(15, enemy.x));
      enemy.y = Math.max(0, Math.min(15, enemy.y));
    }
    
    // Shooting
    enemy.lastShot++;
    if (enemy.lastShot >= enemy.shotCooldown && dist < 8) {
      enemy.lastShot = 0;
      
      gameState.enemyBullets.push({
        x: enemy.x,
        y: enemy.y,
        vx: (dx / dist) * 0.15,
        vy: (dy / dist) * 0.15
      });
    }
  }
}

// Update power-ups
function updatePowerups() {
  for (let i = gameState.powerups.length - 1; i >= 0; i--) {
    const powerup = gameState.powerups[i];
    
    // Check collision with player
    if (Math.abs(powerup.x - mech.x) < 1 && Math.abs(powerup.y - mech.y) < 1) {
      if (powerup.type === 'weapon') {
        const weapons = ['normal', 'shotgun', 'laser'];
        mech.weaponType = weapons[Math.floor(Math.random() * weapons.length)];
      } else {
        const legs = ['normal', 'treads', 'hover'];
        mech.legType = legs[Math.floor(Math.random() * legs.length)];
      }
      
      gameState.powerups.splice(i, 1);
    }
  }
}

// Update explosions
function updateExplosions() {
  for (let i = gameState.explosions.length - 1; i >= 0; i--) {
    gameState.explosions[i].timer--;
    if (gameState.explosions[i].timer <= 0) {
      gameState.explosions.splice(i, 1);
    }
  }
}

// Shoot bullet
function shoot() {
  if (mech.lastShot > 0) return;
  
  const dir = directions[mech.torsoAngle];
  
  if (mech.weaponType === 'shotgun') {
    // Shotgun: 3 bullets in a spread
    for (let i = -1; i <= 1; i++) {
      const angle = mech.torsoAngle * Math.PI / 2 + i * 0.3;
      gameState.bullets.push({
        x: mech.x,
        y: mech.y,
        vx: Math.sin(angle) * 0.2,
        vy: -Math.cos(angle) * 0.2
      });
    }
    mech.lastShot = mech.shotCooldown * 1.5;
  } else if (mech.weaponType === 'laser') {
    // Laser: fast, piercing bullet
    gameState.bullets.push({
      x: mech.x,
      y: mech.y,
      vx: dir.x * 0.3,
      vy: dir.y * 0.3
    });
    mech.lastShot = mech.shotCooldown * 0.5;
  } else {
    // Normal bullet
    gameState.bullets.push({
      x: mech.x,
      y: mech.y,
      vx: dir.x * 0.2,
      vy: dir.y * 0.2
    });
    mech.lastShot = mech.shotCooldown;
  }
}

// Input handling
onInput("w", () => {
  if (gameState.gameOver) {
    initGame();
    return;
  }
  
  // Left D-pad UP: Move mech forward
  const dir = directions[mech.legAngle];
  const accel = mech.legType === 'hover' ? mech.acceleration * 1.5 : mech.acceleration;
  
  mech.velocityX += dir.x * accel;
  mech.velocityY += dir.y * accel;
  
  // Limit speed
  const speed = Math.sqrt(mech.velocityX * mech.velocityX + mech.velocityY * mech.velocityY);
  const maxSpeed = mech.legType === 'treads' ? mech.maxSpeed * 1.3 : mech.maxSpeed;
  
  if (speed > maxSpeed) {
    mech.velocityX = (mech.velocityX / speed) * maxSpeed;
    mech.velocityY = (mech.velocityY / speed) * maxSpeed;
  }
});

onInput("a", () => {
  if (!gameState.gameOver) {
    // Left D-pad LEFT: Turn mech left
    mech.legAngle = (mech.legAngle + 3) % 4;
  }
});

onInput("d", () => {
  if (!gameState.gameOver) {
    // Left D-pad RIGHT: Turn mech right
    mech.legAngle = (mech.legAngle + 1) % 4;
  }
});

onInput("i", () => {
  if (!gameState.gameOver) {
    // Right D-pad UP: Aim torso up and shoot
    mech.torsoAngle = 0;
    shoot();
  }
});

onInput("j", () => {
  if (!gameState.gameOver) {
    // Right D-pad LEFT: Aim torso left and shoot
    mech.torsoAngle = 3;
    shoot();
  }
});

onInput("l", () => {
  if (!gameState.gameOver) {
    // Right D-pad RIGHT: Aim torso right and shoot
    mech.torsoAngle = 1;
    shoot();
  }
});

onInput("k", () => {
  if (!gameState.gameOver) {
    // Right D-pad DOWN: Aim torso down and shoot
    mech.torsoAngle = 2;
    shoot();
  }
});

// Render function
function render() {
  clearText();
  
  // Clear sprites
  getAll().forEach(sprite => sprite.remove());
  
  if (gameState.gameOver) {
    addText("GAME OVER", { x: 6, y: 7, color: color`3` });
    addText(`Score: ${gameState.score}`, { x: 5, y: 9, color: color`0` });
    addText("Press W to restart", { x: 2, y: 11, color: color`0` });
    return;
  }
  
  // Helper function to clamp coordinates to valid range
  function clampCoord(coord) {
    return Math.max(0, Math.min(15, Math.round(coord)));
  }
  
  // Render player
  addSprite(clampCoord(mech.x), clampCoord(mech.y), player);
  
  // Render enemies
  for (let enemy of gameState.enemies) {
    addSprite(clampCoord(enemy.x), clampCoord(enemy.y), "e");
  }
  
  // Render bullets
  for (let bullet of gameState.bullets) {
    const x = clampCoord(bullet.x);
    const y = clampCoord(bullet.y);
    if (x >= 0 && x <= 15 && y >= 0 && y <= 15) {
      addSprite(x, y, "b");
    }
  }
  
  // Render enemy bullets
  for (let bullet of gameState.enemyBullets) {
    const x = clampCoord(bullet.x);
    const y = clampCoord(bullet.y);
    if (x >= 0 && x <= 15 && y >= 0 && y <= 15) {
      addSprite(x, y, "x");
    }
  }
  
  // Render power-ups
  for (let powerup of gameState.powerups) {
    addSprite(clampCoord(powerup.x), clampCoord(powerup.y), "u");
  }
  
  // Render explosions
  for (let explosion of gameState.explosions) {
    addSprite(clampCoord(explosion.x), clampCoord(explosion.y), "z");
  }
  
  // UI
  addText(`Health: ${gameState.health}`, { x: 1, y: 1, color: color`4` });
  addText(`Score: ${gameState.score}`, { x: 1, y: 2, color: color`6` });
  addText(`Wave: ${gameState.wave}`, { x: 1, y: 3, color: color`5` });
  
  if (mech.weaponType !== 'normal') {
    addText(`Weapon: ${mech.weaponType}`, { x: 1, y: 14, color: color`2` });
  }
  if (mech.legType !== 'normal') {
    addText(`Legs: ${mech.legType}`, { x: 1, y: 15, color: color`2` });
  }
  
  // Direction indicators
  const legDir = ['^', '>', 'v', '<'][mech.legAngle];
  const torsoDir = ['^', '>', 'v', '<'][mech.torsoAngle];
  addText(`L:${legDir}`, { x: 13, y: 14, color: color`3` });
  addText(`T:${torsoDir}`, { x: 13, y: 15, color: color`6` });
}

// Game loop
function gameLoop() {
  if (gameState.gameOver) {
    render();
    return;
  }
  
  updateMech();
  updateBullets();
  updateEnemies();
  updatePowerups();
  updateExplosions();
  
  // Check if wave is complete
  if (gameState.enemies.length === 0) {
    gameState.wave++;
    spawnWave();
  }
  
  render();
}

// Start game
initGame();
setInterval(gameLoop, 1000 / 30); // 30 FPS
