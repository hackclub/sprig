/*
@title: Dodge
@author: 
@tags: [arcade, avoider, reflex]
@addedOn: 2024-00-00
*/

const player = "p";
const obstacle = "o";

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  
  [ obstacle, bitmap`
................
................
................
......6666......
.....666666.....
.....666666.....
......6666......
.......66.......
................
......6666......
.....666666.....
.....666666.....
......6666......
................
................
................` ]
);

setSolids([ player ]);
let level = 0;

width = 8;
height = 10;

const levels = [
  map`
........
........
........
........
........
........
........
........
........
....p...`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});

// Player movement
onInput("a", () => {
  let p = getFirst(player);
  if (p.x > 0) p.x -= 1;
});

onInput("d", () => {
  let p = getFirst(player);
  if (p.x < width - 1) p.x += 1;
});

function spawnObstacle() {
  let x = Math.floor(Math.random() * width);
  addSprite(x, 0, obstacle);
}

function moveObstacles() {
  let obstacles = getAll(obstacle);
  for (let o of obstacles) {
    if (o.y < height - 1) {
      o.y += 1;
    } else {
      o.remove();
    }
  }
}

// Check for collisions
function checkCollision() {
  let p = getFirst(player);
  let obstacles = getAll(obstacle);
  for (let o of obstacles) {
    if (o.x === p.x && o.y === p.y) {
      endGame();
    }
  }
}

// End the game
function endGame() {
  clearInterval(gameLoop);
  clearText();
  addText("Game Over!", { x: 3, y: 5, color: color`3` });
}

let speed = 1000; // Start speed (1 second per tick)

// Game loop
let gameLoop = setInterval(() => {
  spawnObstacle();
  moveObstacles();
  checkCollision();
  
  // Speed up every 10 seconds
  if (speed > 300) {
    speed -= 10;
    clearInterval(gameLoop);
    gameLoop = setInterval(() => {
      spawnObstacle();
      moveObstacles();
      checkCollision();
    }, speed);
  }
}, speed);