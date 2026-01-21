/*
@title: Asteroid Destroyer
@author: mihranrazaa
@tags: ['action', 'arcade']
@addedOn: 2025-01-06
*/

const player = "p";
const asteroid = "a";
const shot = "s";
const particle = "x";
const playerInv = "P";
const asteroidInv = "A";
const shotInv = "S";
const particleInv = "X";

setLegend(
  [ player, bitmap`
................
................
.......00.......
......0330......
......0330......
.....033330.....
.....033330.....
....03333330....
....03333330....
...0333333330...
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
  [ playerInv, bitmap`
0000000000000000
0000000000000000
0000000220000000
0000002002000000
0000002002000000
0000020000200000
0000020000200000
0000200000020000
0000200000020000
0002000000002000
0002000000002000
0020000000000200
0020000000000200
0222222222222220
0222222222222220
0000000000000000` ],
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
0000000000000000` ]
);

setSolids([]);

let level = 0;
let score = 0;
let gameOver = false;
let asteroidSpeed = 1000;
let inverted = false;

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

function spawnAsteroid() {
  if (gameOver) return;
  
  const x = Math.floor(Math.random() * 10);
  const y = 0;
  
  const asteroidType = inverted ? asteroidInv : asteroid;
  addSprite(x, y, asteroidType);
  asteroids.push({ x, y, dx: (Math.random() - 0.5) * 0.2, dy: 0.5 });
}

// Initialize game with some asteroids
for (let i = 0; i < 5; i++) {
  spawnAsteroid();
}

// Movement controls
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

onInput("k", () => {
  resetGame();
});

function shoot() {
  const p = getFirst(inverted ? playerInv : player);
  if (!p) return;
  
  const shotType = inverted ? shotInv : shot;
  addSprite(p.x, p.y - 1, shotType);
  shots.push({ x: p.x, y: p.y - 1 });
  
  playTune(tune`
37.5: C5^37.5,
1162.5`);
}

function resetGame() {
  clearText();
  gameOver = false;
  score = 0;
  asteroids = [];
  shots = [];
  particles = [];
  inverted = false;
  
  // Clear all sprites
  getAll(asteroid).forEach(s => s.remove());
  getAll(asteroidInv).forEach(s => s.remove());
  getAll(shot).forEach(s => s.remove());
  getAll(shotInv).forEach(s => s.remove());
  getAll(particle).forEach(s => s.remove());
  getAll(particleInv).forEach(s => s.remove());
  
  setMap(levels[level]);
  
  // Spawn initial asteroids
  for (let i = 0; i < 5; i++) {
    spawnAsteroid();
  }
}

function updateGame() {
  if (gameOver) return;
  
  // Check for color inversion at score 100
  if (score >= 150 && !inverted) {
    inverted = true;
    
    // Clear all sprites and let them respawn with new colors
    getAll(asteroid).forEach(s => s.remove());
    getAll(shot).forEach(s => s.remove());
    getAll(particle).forEach(s => s.remove());
    
    // Reset player with inverted sprite
    const p = getFirst(player);
    if (p) {
      const px = p.x;
      const py = p.y;
      p.remove();
      addSprite(px, py, playerInv);
    }
    
    // Clear arrays and respawn
    asteroids = [];
    shots = [];
    particles = [];
    
    for (let i = 0; i < 5; i++) {
      spawnAsteroid();
    }
    
    clearText();
    setTimeout(() => {
      clearText();
      addText(`Score: ${score}`, { x: 1, y: 1, color: inverted ? color`0` : color`3` });
    }, 1500);
    return;
  }
  
  // Update asteroids
  const allAsteroids = getAll(inverted ? asteroidInv : asteroid);
  asteroids = asteroids.filter((ast, index) => {
    ast.y += ast.dy;
    ast.x += ast.dx;
    
    if (ast.x < 0) ast.x = 9;
    if (ast.x > 9) ast.x = 0;
    
    const sprite = allAsteroids[index];
    if (sprite) {
      sprite.x = Math.floor(ast.x);
      sprite.y = Math.floor(ast.y);
      
      // Check if asteroid hit bottom
      if (ast.y > 9) {
        sprite.remove();
        return false;
      }
      
      // Check collision with player
      const p = getFirst(inverted ? playerInv : player);
      if (p && Math.floor(ast.x) === p.x && Math.floor(ast.y) === p.y) {
        endGame();
        return false;
      }
    }
    
    return true;
  });
  
  // Update shots
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
          score += 5;
          
          const particleType = inverted ? particleInv : particle;
          for (let i = 0; i < 4; i++) {
            addSprite(s.x, s.y, particleType);
            particles.push({ x: s.x, y: s.y, life: 3 });
          }
          
          playTune(tune`
37.5: G4^37.5,
37.5: E4^37.5,
1087.5`);
          
          const astSprite = getAll(inverted ? asteroidInv : asteroid)[astIndex];
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
  
  // Update particles
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
  
  // Display score
  clearText();
  const textColor = inverted ? color`0` : color`3`;
  addText(`Score: ${score}`, { x: 1, y: 1, color: textColor });
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
  addText(`GAME OVER!`, { x: 4, y: 6, color: color`3` });
  addText(`Score: ${score}`, { x: 4, y: 8, color: color`3` });
  addText(`Press K to`, { x: 3, y: 10, color: color`2` });
  addText(`restart`, { x: 5, y: 11, color: color`2` });
}

setInterval(updateGame, 100);

// Background music
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

setTimeout(() => {
  clearText();
}, 3000);