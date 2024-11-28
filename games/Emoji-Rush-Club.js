/*
@title: sprig_dodging
@author: sam liu and lucas
@tags: ['tutorial']
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
.....0...0......`],
)

// Step 1 - Add player to map
setMap(map`
........
........
........
........
........
........
........
........`)

// Create a variable that shows when the game is running
var gameRunning = true; 

// START - PLAYER MOVEMENT CONTROLS

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});

// Step 2 - Add move right controls
// END - PLAYER MOVEMENT CONTROLS

// Put obstacle in a random position
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, obstacle);
}

// Make obstacles move
function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

// Make obstacles disappear
function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 8) {
     obstacles[i].remove();
   }
  }
}

// See if the player was hit
function checkHit() {
  // Step 3 - Fix code
  let obstacles = getFirst(obstacle);
  let p = getAll(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {
  // Step 4 - Add all game functions

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }

}, 1000);
