/*
@title: dodge_the_aliens
@author: Chun Han
*/

const player = "p";
const obstacle = "o";

setLegend(
  [obstacle, bitmap`
................
................
....00000.......
...0DDDD0.......
..00....000.....
.00D.0.0.D0.....
.0D.......D0....
.00.4...4.D0....
..0D.444..D0....
..00.....D00....
...00DDDD00.....
....000000......
................
................
................
................`],
  [ player, bitmap`
....777777......
....7....7......
...77777777.....
....000000......
...00....00.....
..00..0.0.0.....
..0..0....0.....
..00..000.0.....
...000..000.....
.....000........
......0.........
..000000000.....
......0.........
......0.........
.....000........
....0...0.......` ]
)
setMap(map`
..........
..........
..........
..........
..........
..........
..........
.....p....`)

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
    obstacles[i].y +=1;
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
    addText("Game Over!!!", {
      x: 5, 
      y: 6,
      color: color`0`
    });
  }
  
}, 1000);



