const player = "p";
const obstacle = "o";


setLegend(
  [obstacle, bitmap`
................
....LLLLLLLLLLL.
...L11222222221L
....LLLLL22221L.
.....L122LLLLL..
....L122222211L.
.....L1222LLLL..
......LLLL21L...
.....L1122221L..
......LLL221L...
......L12LLL....
.....L122211L...
......L12LLL....
.......LL2L.....
......L12L......
.......LL.......`],
  [player, bitmap`
................
................
................
................
................
................
................
.......C........
......CCC.......
.....CCCCC......
....CCCCCCC.....
.....77777......
.....55775......
.....77777......
.....777C7......
.....777C7......`],
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
    getFirst(player).y-=1
    getFirst(player).y-=1
    getFirst(player).y-=1
    getFirst(player).y-=1
    getFirst(player).y-=1
    getFirst(player).y-=1
    getFirst(player).y-=1
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Hurricane Tortilla", {
      x: 0,
      y: 5,
      color: color`3`
    })
    addText("blew you away!", {
      x: 3,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);
