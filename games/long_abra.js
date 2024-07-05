const player = 'p';
const obstacle = 'o';
const blob = 'b';

setLegend(
  [obstacle, bitmap`
................
................
........0.......
........0.......
...9999999999...
.99999999999999.
9999909999099999
9999909999099999
9999909999099999
9909999999999099
9900099999900099
.99900000000999.
...9999999999...
................
................
................`],
  [player, bitmap`
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
.....44444444...
...44440440444..
..4444404404444.
4440444444444044
4440000000000044
4444444444444444`],
  [blob, bitmap`
................
................
................
.......44444....
......4444444...
....4444444444..
....4444444444..
....4444444444..
....4444444444..
.....444444444..
.....44444444...
.......4444.....
................
................
................
................`]
);

setMap(map`
........
........
........
........
........
........
........
...p....`);
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

function spawnObstacles() {
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

function despawnPlayer() {
  let player1 = getAll(player);
  for (let i = 0; i < player1.length; i++) {
  if (player1[i].y == 7) {
      player1[i].remove();
    }
  }
}

function despawnAllObstacles() {
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == 1,2,3,4,5,6,7) {
      obstacles[i].remove();
    }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == p.y && obstacles[i].x == p.x) {
      return true;
    }
  }
  
  return false;
}

var gameLoop = setInterval(() => {
  despawnObstacles()
  moveObstacles()
  spawnObstacles()

  if(checkHit()) {clearInterval(gameLoop);
    despawnPlayer();
    despawnAllObstacles();
    clearInterval(gameLoop);
    gameRunning = false;
    addText("game over", {
      y: 6
    });
    addText("u suck", {
      y: 7
    });
  }
}, 1000);