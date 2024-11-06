
/* 
@title: FOOD-CATCH
@author: Jakob
@tags: []
@addedOn: 2023-09-02
*/

    const player = "p";
const obstacle = "o";
let score = 0;
let floorfoodhit = 0;
 
setLegend(
  [obstacle, bitmap`
.......C.DDD....
.......CDD4D....
.......CD4D.....
.....333333.....
....33333333....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
................
................
................`],
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
)
 
setMap(map`
..........
..........
..........
..........
..........
..........
..........
....p.....`)
 
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
     floorfoodhit ++;
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      obstacles[i].remove();
      return true;
    }
  }
 
  return false;
}

function gameover(){
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].remove();
  }
  addText("Game Over!", {
    x: 5,
    y: 6,
    color: color`3`
  });
  clearInterval(gameLoop);
  gameRunning = false; 
}

var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
  let scortext = addText("Score:" + score, {
      x: 1,
      y: 1,
      color: color`3`
    });

  let hittext = addText("Misses:" + floorfoodhit, {
    x: 11,
    y: 1,
    color: color`0`
  });
      
 
  if (checkHit()) {
    score ++;
  }
  if (floorfoodhit == 3){
    gameover();  
  }
 
}, 1000);