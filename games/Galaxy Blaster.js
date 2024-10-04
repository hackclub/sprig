/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Galaxy Blaster
@author: G1useppeV
@tags: []
@addedOn: 2024-09-27
*/

// Define new sprites 

let player = "p";
let enemy = "e";
let bullet = "b";
let enemyBullet = "r";
let background = "g"; 

// Player and Enemy Sprites
setLegend(
  [player, bitmap`
......................
........0.............
.......000............
......00000...........
.....0000000..........
....00.000.00.........
...00000000000........
...00000000000........
..0000000000000.......
...00000000000........
....000000000.........
.....0000000..........
......0...0...........
......0...0...........
.....000.000..........
....000...000.........`],
  [enemy, bitmap`
................
................
................
....00000000000.
....05555555550.
....053L333L350.
....05555355550.
....00005350000.
.......05350....
.......05350....
.......01110....
................
................
................
................
................`],
  [bullet, bitmap`
................
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
................
................
................
................
................
................
................
................`],
  [enemyBullet, bitmap`
................
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
................
................
................
................
................
................
................
................`],
  [background, bitmap`
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

setBackground(background);

// Setup the player movement and shooting
setMap(map`
................
................
................
................
................
................
................
................
................
................
........p.......`);

let playerX = 8; // Starting X position
let playerY = 10; // Fixed Y position for player

// Clear old position and add the player at the new position

function movePlayer(newX) {
  clearTile(playerX, playerY);  // Clear the old position
  playerX = newX;               // Update the new X position
  addSprite(playerX, playerY, player);  // Place the player at the new position
}


// Input to move left and right
onInput("a", () => {
  if (playerX > 0) {
    movePlayer(playerX - 1);
  }
});

onInput("d", () => {
  if (playerX < 15) {
    movePlayer(playerX + 1);
  }
});

// Shooting
onInput("w", () => {
  addSprite(playerX, playerY - 1, bullet);
});

// Moving bullet
let bulletIntervalId = setInterval(() => {
  getAll(bullet).forEach((b) => {
    let x = b.x;
    let y = b.y;
    if (y > 0) {enemyMoveIntervalId
      clearTile(x, y);
      addSprite(x, y - 1, bullet);
    } else {
      clearTile(x, y);
    }
  });
}, 100);

// inital enemies
for (let i = 0; i < 5; i++) {
    addSprite(i * 3, 0, enemy);
  }
// Slow down the enemy spawn rate (every 5 seconds)
  setInterval(() => {
  for (let i = 0; i < 5; i++) {
    addSprite(i * 3, 0, enemy);
  }
}, 5000); // Slower rate (5 seconds)



// Enemies moving
let enemyMoveIntervalId = setInterval(() => {
  getAll(enemy).forEach((e) => {
    let x = e.x;
    let y = e.y;
    if (y < 10) {
      clearTile(x, y);
      addSprite(x, y + 1, enemy);
    } else if (y == 10){
      clearTile(x, y);
    }
  });
}, 1000);

// Randomly select enemies to shoot back
let enemyShootIntervalId = setInterval(() => {
  let enemies = getAll(enemy);
  if (enemies.length > 0) {
    let randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    addSprite(randomEnemy.x, randomEnemy.y + 1, enemyBullet);  // Shoot from below the enemy
  }
}, 2000); // Enemies shoot every 2 seconds

// Move enemy bullets and check for collision with player
let enemyBulletMoveIntervalId = setInterval(() => {
  getAll(enemyBullet).forEach((eb) => {
    let x = eb.x;
    let y = eb.y;
    if (y < 9) {  // As long as the bullet is above the player area
      clearTile(x, y);
      addSprite(x, y + 1, enemyBullet);
    } else {
      clearTile(x, y); // Clear bullet when it moves off-screen
    }

    // Check if the player is hit by the enemy bullet
    if (x === playerX && y + 1 === playerY) {
      endGame("Game Over! ");
    }
  });
}, 100);

// Check if the player collides with an enemy
let collisionCheckIntervalId = setInterval(() => {
  getAll(enemy).forEach((e) => {
    if (e.x === playerX && e.y === playerY) {
      endGame("Game Over!");
      
    }
  });
}, 100);

function endGame(message) {
  console.log(message);
  onInput("w", () => {});
  onInput("a", () => {});
  onInput("d", () => {});
  clearInterval(bulletIntervalId);
  clearInterval(enemyMoveIntervalId);
  clearInterval(enemyShootIntervalId);
  clearInterval(enemyBulletMoveIntervalId);
  clearInterval(collisionCheckIntervalId);  // Stops all intervals, effectively ending the game
  addText(message, { x: 5, y: 5, color: color`3`, scale: 0.2 });
}
