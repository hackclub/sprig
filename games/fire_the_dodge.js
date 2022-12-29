/*
@title: fire_the_dodge
@author: vasanth
*/
 
const player = "p";
const obstacle = "o";
 
setLegend(
  [obstacle, bitmap`
................
........33......
......333333....
......337733....
.....33777733...
....3377667733..
....33766667333.
...337760067733.
...337766667733.
....3377667733..
.....33777733...
......337733....
.......3333.....
........33......
................
................`],
  [player, bitmap`
................
................
......CCC.......
......CCCCC.....
......F111F.....
......10101.....
......11111.....
......11111.....
.......LLL......
......5LLL5.....
.....5533355....
.....5564655....
.....1533351....
.......777......
.......7.7......
......DD.DD.....`]
)
 
setMap(map`
........
........
........
........
........
........
........
...p....`)
 
var gameRunning = true;
 
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
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
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
