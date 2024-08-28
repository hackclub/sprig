/*
@title: PlasticPickup
@author: pizzalover125
@tags: []
@addedOn: 2024-08-15
*/

const player = "p"
const sky = "b"
const obstacle = "o"
const bottle = "g"
let maxJump = 2;
let playerUpwardsVel = -1;
let gameOver = false;
let points = 0;

addText(String(points), {
  x: 1,
  y: 1,
  color: color`H`
});

setLegend(
  [player, bitmap`
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
....55555555....
....55555555....
....55555555....
....55555555....`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [bottle, bitmap`
......5555......
......5555......
......2222......
.....222222.....
.....222222.....
.....222222.....
.....555555.....
.....555555.....
.....555555.....
.....555555.....
.....222222.....
.....222222.....
.....222222.....
.....222222.....
.....222222.....
.....222222.....`],
  [obstacle, bitmap`
...111....111...
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..`]
)

setSolids([])

let level = 0
const levels = [
  map`
...........
...........
...........
...........
...........
...........
...........
...........
.....p.....`
]

setMap(levels[level])
setSolids[(obstacle)]

var gameRunning = true;

function spawnObstacle() {
  let x = Math.floor(Math.random() * 11);
  let y = 0;

  clearTile(x, y)
  addSprite(x, y, obstacle);
}

function spawnBottle() {
  let x = Math.floor(Math.random() * 11);
  let y = 0;

  clearTile(x, y)
  addSprite(x, y, bottle);
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

function moveBottles() {
  let bottles = getAll(bottle);

  for (let i = 0; i < bottles.length; i++) {
    bottles[i].y += 1;
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

function despawnBottles() {
  let bottles = getAll(bottle);

  for (let i = 0; i < bottles.length; i++) {
    if (bottles[i].y == 8) {
      bottles[i].remove();
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

function checkPoint() {
  let bottles = getAll(bottle);
  let p = getFirst(player);

  for (let i = 0; i < bottles.length; i++) {
    if (bottles[i].x == p.x && bottles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

setBackground(sky)

var gameLoop = setInterval(() => {
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("You died!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }

  if (checkPoint()) {
    clearText();
    points += 1;
    addText(String(points), {
      x: 1,
      y: 1,
      color: color`H`
    });
  }

  console.log(getAll(bottle));

  despawnObstacles();
  despawnBottles();
  moveObstacles();
  moveBottles();
  spawnObstacle();
  spawnBottle();
}, 500);

