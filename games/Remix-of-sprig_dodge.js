 /*
@title: sprig_dodging
@description: Dodge the obstacles and learn how to use Sprig with an enhanced dodge game! Use W, A, S, D to move, avoid obstacles, and survive as long as possible.
@author: sam liu, lucas, and you
@tags: ['tutorial', 'arcade']
@addedOn: 2022-12-15
*/

// define the sprites in our game
const player = "p";
const obstacle = "o";

// assign bitmap art to each sprite
setLegend(
  [obstacle, bitmap`
.......66.......
........6.......
.....66.6.6.....
....66.66.66....
....666666.6....
...6699999966...
...69999999966..
..669999999996..
..669933339996..
..699333333996..
..699333333996..
...69333333996..
...69333333996..
...6993333996...
....66999996....
.....666666.....`],
  [player, bitmap`
................
................
................
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.000.0.....
....0.....0.....
.....00000......
.......0........
.....00000......
.......0........
.......0........
......0.0.......
.....0...0......`]
);

// Set up the initial map (8x8 grid)
setMap(map`
........
........
........
........
........
........
........
...p....`);

// Game state variables
var gameRunning = true; 
var score = 0;

// PLAYER MOVEMENT CONTROLS (W, A, S, D)
onInput("w", () => {
  if (gameRunning) {
    let p = getFirst(player);
    if (p && p.y > 0) p.y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    let p = getFirst(player);
    if (p && p.y < 7) p.y += 1;
  }
});

onInput("a", () => {
  if (gameRunning) {
    let p = getFirst(player);
    if (p && p.x > 0) p.x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    let p = getFirst(player);
    if (p && p.x < 7) p.x += 1;
  }
});

// GAME FUNCTIONS
function spawnObstacle() {
  let randomX = Math.floor(Math.random() * 8);
  addSprite(randomX, 0, obstacle);
}

function moveObstacles() {
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y > 7) {
      obstacles[i].remove();
    }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
  if (!p) return false;
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x === p.x && obstacles[i].y === p.y) {
      return true;
    }
  }
  return false;
}

// MAIN GAME LOOP (setInterval updates every 500ms)
var gameLoop = setInterval(() => {
  if (!gameRunning) return;

  score += 1;
  moveObstacles();
  despawnObstacles();
  spawnObstacle();

  // Check collision / Game Over
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over! Score: " + score, { x: 1, y: 4, color: color`3` });
  }
}, 500);