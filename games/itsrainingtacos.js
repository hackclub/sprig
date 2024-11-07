/*
@title: It's Raining Tacos
@author: omarko
@tags: ['action','survival']
@addedOn: 2024-08-05
*/

// Define sprites
const player = "p";
const obstacle1 = "o";
const obstacle2 = "x";
const obstacle3 = "y";
const background = "g";
const bullet = "b";

// Set legend for sprites
setLegend(
  [obstacle1, bitmap`
.....0000000....
...00666604D0...
..066666660330..
.06666666660320.
.06C666266602C90
06666666C6660C90
0666666666660CC0
0666662666260000
0662C66666666660
0666666666666660
0666000000006660
.000..0..0..000.
..0...0..0...0..
..0..........0..
...0........0...
....00000000....`],
  [obstacle2, bitmap`
......DDDD......
.....D4444D.....
.....D4444D.....
....D444444D....
....D444444D....
...D44444444D...
...D44444444D...
..D444CCCC444D..
..D4402CC0244D..
..D4400CC0044D..
..D44CCCCCC44D..
..D44C0CC0C44D..
..D444C00C444D..
...D44444444D...
....DD4444DD....
......DDDD......`],
  [obstacle3, bitmap`
...............0
..............04
.............04D
..........0000D0
.........033330.
........03333330
........03333330
........03333330
.......033333330
00.....03333330.
030...033333330.
03300033333330..
.033333333330...
.03333333330....
..003333300.....
....00000.......`],
  [player, bitmap`
......999.......
.....66666......
....9999999.....
..69696969696...
...022020220....
...222222222....
...220020022....
....2222222.....
.....F2222F.....
....FF9299FF....
....FF999FFF....
....F66FF66F....
....FFFFFFFF....
....FFF666FF....
......FFFFF.....
.......0.0......`],
  [background, bitmap`
6666....6666....
6666....6666....
6666....6666....
6666....6666....
....6666....6666
....6666....6666
....6666....6666
....6666....6666
6666....6666....
6666....6666....
6666....6666....
6666....6666....
....6666....6666
....6666....6666
....6666....6666
....6666....6666`],
  [bullet, bitmap`
................
................
................
................
................
......999.......
.....99699......
.....96969......
.....96969......
......969.......
......969.......
.......9........
.......9........
................
................
................`]
);

// Set solids
setSolids([player]);

// Map layout
const level = map`
........
........
........
........
........
........
........
....p...`;

setMap(level);

// Set background
setBackground(background);

// Initialize player
let playerSprite = getFirst(player); // Ensure no duplicate players
if (!playerSprite) {
  addSprite(5, 7, player);
}

// Game variables
let gameRunning = false;
let score = 0;
let difficulty = 2000; // Initial obstacle spawn rate (milliseconds)

// Variables to manage obstacle removal timing
const removalDelay = 50; // milliseconds
let removalTimers = {};

// Function to start the game
function startGame() {
  gameRunning = true;
  score = 0;
  difficulty = 2000;
  updateScore();
  clearText();
  
  // Clear any existing obstacles
  clearObstacles();
  
  // Game loop
  gameLoop = setInterval(() => {
    if (gameRunning) {
      moveObstacles();
      despawnObstacles();

      if (checkHit()) {
        clearInterval(gameLoop);
        clearInterval(spawnInterval);
        clearInterval(scoreInterval);
        gameRunning = false;
        gameOverScreen();
      }
    }
  }, 500);

  // Spawn obstacles periodically and increase difficulty over time
  spawnInterval = setInterval(() => {
    if (gameRunning) {
      spawnObstacles();
      // Increase difficulty: spawn obstacles more frequently
      difficulty = Math.max(500, 2000 - (score * 10)); // Decrease spawn rate as score increases
      clearInterval(spawnInterval);
      spawnInterval = setInterval(spawnObstacles, difficulty);
    }
  }, difficulty);

  // Update score every second
  scoreInterval = setInterval(() => {
    if (gameRunning) {
      score += 1;
      updateScore();
    }
  }, 1000);
}

// Player Control
function handleInput() {
  if (!gameRunning) {
    startGame();
  }
}

function movePlayerLeft() {
  if (gameRunning) {
    let p = getFirst(player);
    if (p && p.x > 0) p.x -= 1; // Ensure player doesn't move out of bounds
  }
}

function movePlayerRight() {
  if (gameRunning) {
    let p = getFirst(player);
    if (p && p.x < 7) p.x += 1; // Ensure player doesn't move out of bounds
  }
}

function shoot() {
  if (gameRunning) {
    let p = getFirst(player);
    if (p) {
      addSprite(p.x, p.y - 2, bullet); // Spawn bullet just above the player
    }
  }
}

// Display start message
function displayStartMessage() {
  clearText();
  addText("Press any button", {
    x: 2,
    y: 6,
    color: color`3`
  });
  addText("to start!", {
    x: 5,
    y: 9,
    color: color`3`
  });
}

displayStartMessage();

// Add initial input listener to start game on any input
onInput("a", () => { handleInput(); movePlayerLeft(); });
onInput("d", () => { handleInput(); movePlayerRight(); });
onInput("w", () => handleInput());
onInput("s", () => handleInput());
onInput("i", () => handleInput());
onInput("k", () => handleInput());
onInput("j", () => { handleInput(); shoot(); });

// Array of obstacle types
const obstacles = [obstacle1, obstacle2, obstacle3];

// Function to clear all obstacles
function clearObstacles() {
  let allObstacles = getAll(obstacle1).concat(getAll(obstacle2)).concat(getAll(obstacle3));
  for (let i = 0; i < allObstacles.length; i++) {
    allObstacles[i].remove();
  }
}

// Put obstacles in random positions
function spawnObstacles() {
  let x1 = Math.floor(Math.random() * 8);
  let y1 = 0; 
  let obstacleType1 = obstacles[Math.floor(Math.random() * obstacles.length)];
  addSprite(x1, y1, obstacleType1);

  let x2;
  do {
    x2 = Math.floor(Math.random() * 8);
  } while (x2 === x1); // Ensure the second obstacle doesn't spawn in the same position
  let y2 = 0;
  let obstacleType2 = obstacles[Math.floor(Math.random() * obstacles.length)];
  addSprite(x2, y2, obstacleType2);
}

// Make obstacles move
function moveObstacles() {
  let allObstacles = getAll(obstacle1).concat(getAll(obstacle2)).concat(getAll(obstacle3));

  for (let i = 0; i < allObstacles.length; i++) {
    if (allObstacles[i]) {
      allObstacles[i].y += 1;
    }
  }
}

// Make obstacles disappear when they touch the ground
function despawnObstacles() {
  let allObstacles = getAll(obstacle1).concat(getAll(obstacle2)).concat(getAll(obstacle3));

  for (let i = 0; i < allObstacles.length; i++) {
    if (allObstacles[i]) {
      if (allObstacles[i].y >= 7) { // Check if obstacle has reached the bottom
        if (allObstacles[i].type === obstacle1) {
          allObstacles[i].remove(); // Remove obstacle1 when it reaches the bottom
        } else {
          // For obstacles other than obstacle1, set a timer to remove them after a delay
          if (!removalTimers[allObstacles[i].id]) {
            removalTimers[allObstacles[i].id] = setTimeout(() => {
              allObstacles[i].remove();
              delete removalTimers[allObstacles[i].id]; // Clean up timer reference
            }, removalDelay);
          }
        }

        // Check for game over condition for specific obstacles
        if (allObstacles[i].type === obstacle2 || allObstacles[i].type === obstacle3) {
          gameRunning = false;
          clearInterval(gameLoop);
          clearInterval(spawnInterval);
          clearInterval(scoreInterval);
          gameOverScreen();
        }
      }
    }
  }
}

// Function to check if player hits obstacles
function checkHit() {
  let p = getFirst(player);
  if (!p) return false;

  let allObstacles = getAll(obstacle1).concat(getAll(obstacle2)).concat(getAll(obstacle3));
  for (let i = 0; i < allObstacles.length; i++) {
    if (allObstacles[i].x === p.x && allObstacles[i].y === p.y) {
      return true; // Hit detected
    }
  }

  return false; // No hit detected
}

// Function to check if bullets hit obstacles
function checkBulletHit() {
  let allBullets = getAll(bullet);
  let allObstacle1 = getAll(obstacle1);
  let allObstacle2 = getAll(obstacle2);
  let allObstacle3 = getAll(obstacle3);

  allBullets.forEach(bullet => {
    allObstacle1.forEach(obstacle => {
      if (bullet.x === obstacle.x && bullet.y === obstacle.y) {
        bullet.remove();
        obstacle.remove();
        gameRunning = false;
        clearInterval(gameLoop);
        clearInterval(spawnInterval);
        clearInterval(scoreInterval);
        gameOverScreen();
      }
    });

    allObstacle2.forEach(obstacle => {
      if (bullet.x === obstacle.x && bullet.y === obstacle.y) {
        bullet.remove();
        obstacle.remove();
      }
    });

    allObstacle3.forEach(obstacle => {
      if (bullet.x === obstacle.x && bullet.y === obstacle.y) {
        bullet.remove();
        obstacle.remove();
      }
    });
  });
}

// Function to move bullets upwards
function moveBullets() {
  let allBullets = getAll(bullet);

  for (let i = 0; i < allBullets.length; i++) {
    let b = allBullets[i];
    if (b) {
      b.y -= 1;
      // Remove bullet if it reaches the top
      if (b.y <= 0) {
        b.remove();
      }
    }
  }

  checkBulletHit();
}

// Function to update the score
function updateScore() {
  clearText();
  addText("Score: " + score, {
    x: 1,
    y: 1,
    color: color`3`
  });
}

// Function to display the game over screen
function gameOverScreen() {
  clearText();
  addText("Game Over", {
    x: 5,
    y: 6,
    color: color`3`
  });
  addText("Score: " + score, {
    x: 5,
    y: 9,
    color: color`3`
  });

  displayStartMessage();
}

// Move bullets and check for collisions every 100ms
setInterval(() => {
  if (gameRunning) {
    moveBullets();
    checkBulletHit();
  }
}, 100);
