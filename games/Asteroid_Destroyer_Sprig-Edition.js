/*
@title: Asteroid Destroyer
@author: mihranrazaa
@description: Classic arcade space shooter with combo system, power-ups, and color-shifting gameplay(Inspired by ChromeDino), Based on my Asteroid_Destroyer game (only for linux and win..).
@tags: ['action', 'arcade']
@addedOn: 2026-01-06
*/

const player = "p";
const asteroid = "a";
const smallAsteroid = "m";
const shot = "s";
const particle = "x";
const powerup = "u";
const star = "t";
const playerInv = "P";
const asteroidInv = "A";
const smallAsteroidInv = "M";
const shotInv = "S";
const particleInv = "X";
const powerupInv = "U";

setLegend(
  [ player, bitmap`
................
................
................
................
......3..3......
.......33.......
.......33.......
.....000000.....
.....000000.....
.....000000.....
...0333333330...
..033333333330..
..033333333330..
.00000000000000.
.00000000000000.
................` ],
  [ asteroid, bitmap`
................
...000000000....
..00111111000...
.0011111111100..
.0111111111110..
0011111111111100
0111111111111110
0111111111111110
0111111111111110
0111111111111110
.011111111111100
.0111111111110..
..00111111100...
...000000000....
................
................` ],
  [ smallAsteroid, bitmap`
................
................
................
.....00000......
....0011100.....
....0111110.....
....0111110.....
....0111110.....
.....00000......
................
................
................
................
................
................
................` ],
  [ shot, bitmap`
................
................
................
................
................
................
.......33.......
.......33.......
................
................
................
................
................
................
................
................` ],
  [ particle, bitmap`
................
................
................
................
................
.......3........
......333.......
.......3........
................
................
................
................
................
................
................
................` ],
  [ powerup, bitmap`
................
................
.....666666.....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
.....666666.....
................
................
................
................
................
................
................` ],
  [ star, bitmap`
................
................
................
................
................
.......2........
................
................
................
................
................
................
................
................
................
................` ],
  [ playerInv, bitmap`
................
................
................
................
......1..1......
.......11.......
.......11.......
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
...L11111111L...
..L1111111111L..
..L1111111111L..
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
................` ],
  [ asteroidInv, bitmap`
0000000000000000
0002222222220000
0022000000222000
0220000000002200
0200000000000200
2200000000000022
2000000000000002
2000000000000002
2000000000000002
2000000000000002
0200000000000220
0220000000002200
0022000000222000
0002222222220000
0000000000000000
0000000000000000` ],
  [ smallAsteroidInv, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000022222000000
0000220002000000
0000220000200000
0000220000200000
0000220000200000
0000022222000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ shotInv, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000220000000
0000000220000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ particleInv, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000200000000
0000002220000000
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ powerupInv, bitmap`
0000000000000000
0000000000000000
0000044444000000
0000440000440000
0000440000440000
0000440000440000
0000440000440000
0000440000440000
0000044444000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ]
);

setSolids([]);

let level = 0;
let score = 0;
let gameOver = false;
let inverted = false;
let combo = 0;
let maxCombo = 0;
let rapidFireActive = false;
let rapidFireTimeout = null;

const levels = [
  map`
..........
..........
..........
..........
....p.....
..........
..........
..........
..........
..........`
];

setMap(levels[level]);

let asteroids = [];
let shots = [];
let particles = [];
let powerups = [];
let stars = [];

function createStars() {
  for (let i = 0; i < 15; i++) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    addSprite(x, y, star);
    stars.push({ x, y, speed: 0.1 + Math.random() * 0.2 });
  }
}

createStars();

// Spawn asteroid
function spawnAsteroid() {
  if (gameOver) return;
  
  const x = Math.floor(Math.random() * 10);
  const y = 0;
  const isSmall = Math.random() < 0.3;
  
  const asteroidType = inverted ? 
    (isSmall ? smallAsteroidInv : asteroidInv) : 
    (isSmall ? smallAsteroid : asteroid);
  
  addSprite(x, y, asteroidType);
  asteroids.push({ 
    x, 
    y, 
    dx: (Math.random() - 0.5) * 0.2, 
    dy: 0.4 + Math.random() * 0.2,
    isSmall: isSmall
  });
}

function spawnPowerup() {
  if (gameOver || powerups.length > 0) return;
  
  const x = Math.floor(Math.random() * 10);
  const y = 0;
  
  const powerupType = inverted ? powerupInv : powerup;
  addSprite(x, y, powerupType);
  powerups.push({ x, y, dy: 0.3 });
}

for (let i = 0; i < 5; i++) {
  spawnAsteroid();
}

// Movement input (Walking no jutsu)
onInput("w", () => {
  if (gameOver) return;
  const p = getFirst(inverted ? playerInv : player);
  if (p && p.y > 0) {
    p.y -= 1;
  }
});

onInput("s", () => {
  if (gameOver) return;
  const p = getFirst(inverted ? playerInv : player);
  if (p && p.y < 9) {
    p.y += 1;
  }
});

onInput("a", () => {
  if (gameOver) return;
  const p = getFirst(inverted ? playerInv : player);
  if (p && p.x > 0) {
    p.x -= 1;
  }
});

onInput("d", () => {
  if (gameOver) return;
  const p = getFirst(inverted ? playerInv : player);
  if (p && p.x < 9) {
    p.x += 1;
  }
});

onInput("j", () => {
  if (gameOver) return;
  shoot();
});

onInput("i", () => {
  if (gameOver) {
    resetGame();
  }
});

function shoot() {
  const p = getFirst(inverted ? playerInv : player);
  if (!p) return;
  
  const shotType = inverted ? shotInv : shot;
  addSprite(p.x, p.y - 1, shotType);
  shots.push({ x: p.x, y: p.y - 1 });
  
  if (rapidFireActive) {
    if (p.x > 0) {
      addSprite(p.x - 1, p.y - 1, shotType);
      shots.push({ x: p.x - 1, y: p.y - 1 });
    }
    if (p.x < 9) {
      addSprite(p.x + 1, p.y - 1, shotType);
      shots.push({ x: p.x + 1, y: p.y - 1 });
    }
  }
  
  playTune(tune`
37.5: C5^37.5,
1162.5`);
}

function resetGame() {
  clearText();
  gameOver = false;
  score = 0;
  combo = 0;
  maxCombo = 0;
  asteroids = [];
  shots = [];
  particles = [];
  powerups = [];
  inverted = false;
  rapidFireActive = false;
  
  if (rapidFireTimeout) {
    clearTimeout(rapidFireTimeout);
    rapidFireTimeout = null;
  }
  
  // Clear all sprites
  getAll(asteroid).forEach(s => s.remove());
  getAll(asteroidInv).forEach(s => s.remove());
  getAll(smallAsteroid).forEach(s => s.remove());
  getAll(smallAsteroidInv).forEach(s => s.remove());
  getAll(shot).forEach(s => s.remove());
  getAll(shotInv).forEach(s => s.remove());
  getAll(particle).forEach(s => s.remove());
  getAll(particleInv).forEach(s => s.remove());
  getAll(powerup).forEach(s => s.remove());
  getAll(powerupInv).forEach(s => s.remove());
  
  // Reset player position
  setMap(levels[level]);
  
  // Recreate stars
  stars = [];
  getAll(star).forEach(s => s.remove());
  createStars();
  
  // Spawn initial asteroids
  for (let i = 0; i < 5; i++) {
    spawnAsteroid();
  }
}

function updateGame() {
  if (gameOver) return;
  
  if (score >= 250 && score < 350 && !inverted) {
    inverted = true;
    
    getAll(asteroid).forEach(s => s.remove());
    getAll(smallAsteroid).forEach(s => s.remove());
    getAll(shot).forEach(s => s.remove());
    getAll(particle).forEach(s => s.remove());
    getAll(powerup).forEach(s => s.remove());
    
    const p = getFirst(player);
    if (p) {
      const px = p.x;
      const py = p.y;
      p.remove();
      addSprite(px, py, playerInv);
    }
    
    // Clear arrays & Respawn (Summoning no jutsu)
    asteroids = [];
    shots = [];
    particles = [];
    powerups = [];
    
    for (let i = 0; i < 5; i++) {
      spawnAsteroid();
    }
    
    clearText();
    addText(`COLOR INVERTED!`, { x: 2, y: 7, color: color`6` });
    setTimeout(() => {
      clearText();
      const textColor = inverted ? color`0` : color`3`;
      addText(`Score: ${score}`, { x: 1, y: 1, color: textColor });
    }, 1500);
    return;
  }
  
  // Reverse no justu
  if (score >= 350 && inverted) {
    inverted = false;
    
    getAll(asteroidInv).forEach(s => s.remove());
    getAll(smallAsteroidInv).forEach(s => s.remove());
    getAll(shotInv).forEach(s => s.remove());
    getAll(particleInv).forEach(s => s.remove());
    getAll(powerupInv).forEach(s => s.remove());
    
    const p = getFirst(playerInv);
    if (p) {
      const px = p.x;
      const py = p.y;
      p.remove();
      addSprite(px, py, player);
    }
    
    asteroids = [];
    shots = [];
    particles = [];
    powerups = [];
    
    for (let i = 0; i < 5; i++) {
      spawnAsteroid();
    }
    
    clearText();
    addText(`BACK TO NORMAL!`, { x: 2, y: 7, color: color`6` });
    setTimeout(() => {
      clearText();
      const textColor = inverted ? color`0` : color`3`;
      addText(`Score: ${score}`, { x: 1, y: 1, color: textColor });
    }, 1500);
    return;
  }
  
  //parallax effect
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > 9) {
      s.y = 0;
      s.x = Math.floor(Math.random() * 10);
    }
    const starSprites = getAll(star);
    starSprites.forEach(sprite => {
      if (Math.abs(sprite.x - s.x) < 0.1 && Math.abs(sprite.y - Math.floor(s.y)) < 0.1) {
        sprite.y = Math.floor(s.y);
      }
    });
  });
  
  // Update asteroids
  const allAsteroids = [
    ...getAll(inverted ? asteroidInv : asteroid),
    ...getAll(inverted ? smallAsteroidInv : smallAsteroid)
  ];
  
  asteroids = asteroids.filter((ast, index) => {
    ast.y += ast.dy;
    ast.x += ast.dx;
    
    // Wrap horizontally
    if (ast.x < 0) ast.x = 9;
    if (ast.x > 9) ast.x = 0;
    
    const sprite = allAsteroids[index];
    if (sprite) {
      sprite.x = Math.floor(ast.x);
      sprite.y = Math.floor(ast.y);
      
      if (ast.y > 9.5) {
        sprite.remove();
        combo = 0; 
        return false;
      }
      
      const p = getFirst(inverted ? playerInv : player);
      if (p && Math.floor(ast.x) === p.x && Math.floor(ast.y) === p.y) {
        endGame();
        return false;
      }
    }
    
    return true;
  });
  
  const allPowerups = getAll(inverted ? powerupInv : powerup);
  powerups = powerups.filter((pow, index) => {
    pow.y += pow.dy;
    
    const sprite = allPowerups[index];
    if (sprite) {
      sprite.y = Math.floor(pow.y);
      
      if (pow.y > 9) {
        sprite.remove();
        return false;
      }
      
      const p = getFirst(inverted ? playerInv : player);
      if (p && sprite.x === p.x && Math.floor(pow.y) === p.y) {
        // rapid fire
        rapidFireActive = true;
        score += 10;
        sprite.remove();
        
        playTune(tune`
75: C5^75,
75: E5^75,
75: G5^75,
2175`);
        
        if (rapidFireTimeout) clearTimeout(rapidFireTimeout);
        rapidFireTimeout = setTimeout(() => {
          rapidFireActive = false;
        }, 5000);
        
        return false;
      }
    }
    
    return true;
  });
  
  const allShots = getAll(inverted ? shotInv : shot);
  shots = shots.filter((s, index) => {
    s.y -= 1;
    
    const sprite = allShots[index];
    if (sprite) {
      sprite.y = s.y;
      
      if (s.y < 0) {
        sprite.remove();
        return false;
      }
      
      let hit = false;
      asteroids = asteroids.filter((ast, astIndex) => {
        if (Math.floor(ast.x) === s.x && Math.floor(ast.y) === s.y) {
          hit = true;
          const points = ast.isSmall ? 10 : 5;
          score += points;
          combo++;
          if (combo > maxCombo) maxCombo = combo;
          
          // Bonus points for combos
          if (combo >= 5) score += combo;
          
          const particleType = inverted ? particleInv : particle;
          for (let i = 0; i < 4; i++) {
            addSprite(s.x, s.y, particleType);
            particles.push({ x: s.x, y: s.y, life: 3 });
          }
          
          playTune(tune`
37.5: G4^37.5,
37.5: E4^37.5,
1087.5`);
          
          const astSprite = allAsteroids[astIndex];
          if (astSprite) astSprite.remove();
          
          return false;
        }
        return true;
      });
      
      if (hit) {
        sprite.remove();
        return false;
      }
    }
    
    return true;
  });
  
  // Updates particles
  const allParticles = getAll(inverted ? particleInv : particle);
  particles = particles.filter((p, index) => {
    p.life -= 1;
    if (p.life <= 0) {
      const sprite = allParticles[index];
      if (sprite) sprite.remove();
      return false;
    }
    return true;
  });
  
  if (Math.random() < 0.08) {
    spawnAsteroid();
  }
  
  if (Math.random() < 0.01 && score > 20) {
    spawnPowerup();
  }
  
  // Displays score and combo
  clearText();
  const textColor = inverted ? color`0` : color`3`;
  addText(`Score: ${score}`, { x: 1, y: 1, color: textColor });
  
  if (combo >= 3) {
    addText(`Combo: ${combo}x`, { x: 1, y: 2, color: color`6` });
  }
  
  if (rapidFireActive) {
    addText(`RAPID FIRE!`, { x: 1, y: 3, color: color`6` });
  }
}

function endGame() {
  gameOver = true;
  
  playTune(tune`
150: G4^150,
150: F4^150,
150: E4^150,
150: D4^150,
150: C4^150,
3750`);
  
  clearText();
  addText(`GAME OVER!`, { x: 4, y: 5, color: color`3` });
  addText(`Score: ${score}`, { x: 4, y: 7, color: color`3` });
  addText(`Max Combo: ${maxCombo}x`, { x: 2, y: 9, color: color`6` });
  addText(`Press I to`, { x: 3, y: 11, color: color`2` });
  addText(`restart`, { x: 5, y: 12, color: color`2` });
}

setInterval(updateGame, 100);


// Crazzy aah BGM
const backgroundMusic = tune`
500: C4~500 + E4~500 + G4~500,
500: C4~500 + E4~500 + G4~500,
500: D4~500 + F4~500 + A4~500,
500: D4~500 + F4~500 + A4~500,
500: E4~500 + G4~500 + B4~500,
500: E4~500 + G4-500 + B4~500,
500: F4~500 + A4~500 + C5~500 + E5-500,
500: F4~500 + A4~500 + C5~500 + F5-500 + E5-500,
500: G4~500 + B4~500 + D5~500 + A4^500 + D4-500,
500: G4~500 + B4~500 + D5~500 + F4^500 + A4^500,
500: A4~500 + C5~500 + E5~500 + G4^500 + D5^500,
500: A4^500 + C5~500 + E5~500 + G4^500 + B4^500,
500: G4~500 + B4~500 + D5~500 + C5^500 + F4-500,
500: G4~500 + B4~500 + D5~500 + C5^500 + F4-500,
500: F4~500 + A4~500 + C5~500 + E5^500 + F5-500,
500: F4~500 + A4~500 + C5~500 + E5^500 + G5-500,
500: C5^500 + D5^500 + A4/500 + F5/500 + E5/500,
500: E5/500 + C5/500 + B4/500 + A4/500 + F4/500,
500: G5/500 + F5/500 + E5/500 + D5/500 + C5/500,
500: D5/500 + C5/500 + G4/500 + F5/500 + B4/500,
500: A4/500 + B4/500 + C5/500 + D5/500 + E5/500,
500: F4/500 + G4/500 + A4/500 + B4/500 + C5/500,
500: C5~500 + B4-500 + D5-500 + E5-500 + C4-500,
500: B4-500 + C5-500 + D5-500 + C4-500,
500: C4-500,
3500`;

const playback = playTune(backgroundMusic, Infinity);

// Show intructions on first opening
addText(`Asteroid Destroyer`, { x: 1, y: 1, color: color`3` });
addText(`WASD: Move`, { x: 1, y: 12, color: color`6` });
addText(`J: Shoot`, { x: 1, y: 13, color: color`6` });
addText(`Collect powerups!`, { x: 0, y: 14, color: color`6` });
addText(`I: Restart`, { x: 1, y: 15, color: color`6` });


// Why are you still here? LOL
setTimeout(() => {
  clearText();
}, 3000);
