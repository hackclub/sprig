/*
@title: Missile Mania
@author: Nisarga (https://github.com/nisarga-developer)
Instructions:
Hit "run" to execute the code and
start the game (you can also press shift+enter).
The objective is to avoid the the missiles. If the falling missile hits the player, the game ends.
*/

const player = "p";
const obstacle = "o";

setLegend(
  [obstacle, bitmap`
................
....000000000...
....063333360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063LLL360...
....063333360...
....063333360...`],
  [player, bitmap`
................
................
................
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.333.0.....
....0.....0.....
.....DDDDD......
.......D........
.....DDDDD......
.......D........
.......D........
......C.C.......
.....C...C......`],
)
setMap(map`
........
........
........
........
........
........
........
....p...`)
var gameRunning = true; 

onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});


onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});


onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});

function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, obstacle);
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
   if (obstacles[i].y == 8) {
     obstacles[i].remove();
   }
  }
}
function checkHit() {
  let p = getAll(player);  // <-- Add this line
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (obstacles[i].x == p[j].x && obstacles[i].y == p[j].y) {
        return true;
      }
    }
  }
}



var gameLoop = setInterval(() => {

  spawnObstacle();
  moveObstacles();
  despawnObstacles();
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("GAME OVER!", {
      x: 5,
      y: 6,
       color: color`5`
    });
  }

}, 1000);
