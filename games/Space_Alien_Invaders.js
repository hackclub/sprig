/*
@title: Space Alien Invaders
@author: Mik1
@tags: []
@addedOn: 2024-12-18
*/
// Space Alien Invaders Game
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player settings
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 50,
  color: 'grey',
  speed: 5,
  bullets: []
};

// Alien settings
let aliens = [];
const alienRowsBase = 3;
const alienColsBase = 8;
const alienSize = 40;
const alienPadding = 10;
let alienSpeed = 1;
let alienDirection = 1;
let level = 1;

// Initialize aliens
function createAliens() {
  aliens = [];
  for (let row = 0; row < alienRowsBase + level - 1; row++) {
    for (let col = 0; col < alienColsBase; col++) {
      aliens.push({
        x: col * (alienSize + alienPadding) + 50,
        y: row * (alienSize + alienPadding) + 30,
        width: alienSize,
        height: alienSize,
        color: 'green'
      });
    }
  }
}
createAliens();

// Key controls
const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === ' ' && player.bullets.length < 5) {
    player.bullets.push({
      x: player.x + player.width / 2 - 5,
      y: player.y,
      width: 10,
      height: 20,
      color: 'red',
      speed: 7
    });
  }
});
window.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function update() {
  // Move player
  if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
  if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;

  // Update bullets
  player.bullets.forEach((bullet, index) => {
    bullet.y -= bullet.speed;
    if (bullet.y < 0) player.bullets.splice(index, 1);
  });

  // Move aliens
  let edgeReached = false;
  aliens.forEach(alien => {
    alien.x += alienSpeed * alienDirection;
    if (alien.x + alien.width > canvas.width || alien.x < 0) edgeReached = true;
  });

  if (edgeReached) {
    alienDirection *= -1;
    aliens.forEach(alien => alien.y += alienSize / 2);
  }

  // Check collisions
  player.bullets.forEach((bullet, bIndex) => {
    aliens.forEach((alien, aIndex) => {
      if (
        bullet.x < alien.x + alien.width &&
        bullet.x + bullet.width > alien.x &&
        bullet.y < alien.y + alien.height &&
        bullet.y + bullet.height > alien.y
      ) {
        player.bullets.splice(bIndex, 1);
        aliens.splice(aIndex, 1);
      }
    });
  });

  // Check for next level
  if (aliens.length === 0) {
    level++;
    alienSpeed += 0.5; // Increase alien speed
    createAliens();
  }

  // Game over if aliens reach player
  aliens.forEach(alien => {
    if (alien.y + alien.height > player.y) {
      alert(`Game Over! You reached level ${level}.`);
      document.location.reload();
    }
  });
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw bullets
  player.bullets.forEach(bullet => {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });

  // Draw aliens
  aliens.forEach(alien => {
    ctx.fillStyle = alien.color;
    ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
  });

  // Draw level info
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Level: ${level}`, 10, 20);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
