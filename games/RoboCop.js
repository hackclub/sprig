const player = "p"
const bullet = "b"
const background = "a"
const obstacle = "o"

setLegend(
  [ player, bitmap`
................
................
....1111L.......
...1111LLL......
...00000L1......
...1111LL1......
...666600.......
....000001L.....
...LL000LLLL....
..1L11L11LL10...
..1L11L111L1L...
..1L111LLLL1L...
..0L0000000L0...
.00L00...00L0...
.0..00...00.....
.0.000...000....` ],
  [ bullet, bitmap`
................
................
................
................
................
................
................
................
................
.....00.........
.....00.........
....0FF0........
....0FF0........
....0000........
................
................` ],
  [ background, bitmap`
6FFFF1161FFFFFF6
6FFFF1161FFFFFF6
6FFFF1161FFFFFF6
6FFFF1161FFFFFF6
6FFFF1111FFFFFF6
6FFFF1111FFFFFF6
6FFFF11611FFFFF6
6FFFFF1611FFFFF6
6FFFFF1611FFFFF6
6FFFFF1611FFFFF6
6FFFFF1611FFFFF6
6FFFFF111FFFFFF6
6FFFFF161FFFFFF6
6FFFF11611FFFFF6
6FFFF11611FFFFF6
6FFFF11611FFFFF6` ],
  [obstacle, bitmap`
........0.......
........0.......
........0.......
.......050......
.......050......
.......050......
......05750.....
......05750.....
.....0577750....
.....0577750....
....052777750...
....052277750...
.....0527770....
.....0552250....
.....0000000....
................`],
)

setBackground(background)

setSolids([])

let level = 0
const levels = [
  map`
.........
.........
.........
.......p.
.........`
]

setMap(levels[level]);
let gameRunning = true;

setPushables({
  [ player ]: []
})

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1
  }
})

onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y -= 1
  }
})

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1
  }
})

onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1
  }
})
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
      color: color`0`
    });
  }

  }, 1000);

