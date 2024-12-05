
/* 
@title: collectcandy
@author: James C
@tags: []
@addedOn: 2023-11-04
*/

    const player = "p";
const obstacle = "o";
const score = "s";
const wall = "w";



setLegend(
  [obstacle, bitmap`
................
................
....00000.......
....0...00......
....0....00.....
...00.0.0.0000..
.000.........000
0000.0..0.000000
...0.0000..0....
...0.......0....
...0....0..0....
...0....00.0....
...0....00.0....
...0..00.000....
...0000.........
................`], 
  [player, bitmap`
....00000.......
.0000....0......
.0..0..0.00.....
.0........0.....
.0...0.....0....
.0000.00..0.....
..0.000..00.....
...0....00......
...00000........
....00..........
.....0..........
..000000........
.....0.0000.....
.....0..........
...00.00........
..00...0........`],
  [score, bitmap`
................
................
................
................
8....88888....8.
88..8888888..88.
88.888888888888.
888888888888888.
888888888888888.
888888888888888.
888888888888888.
8...8888888..88.
8....88888....8.
................
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setSolids([wall, player])

const levels = [
  map`
........
....w...
........
s..w....
........p
.....w..
.w......
........`,
  map`
...w....
.w....w.
....w...
.w.....p
..s...w.
...w....
w.......
..w...w.`,
  map`
.w....w.
.w....w.
....w...
..w.w...
..w..s.p
...o.w..
...w.w..
...w....`,
  map`
.w...w..
.w...w..
.w.w.w..
...w....
.s.w...p
.w...w..
.w...w..
.w...w..`
];

const backgrounds = [
  bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`,
  bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`,
    bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`,
    bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`
  // Add more background bitmaps as needed
];

setMap(map`
........
........
........
........
........
........
........
....p...`);

var gameRunning = true
var scorenum = 0
var scoreThreshold = 6
var currentLevel = 1

onInput("a", () => {
  if (gameRunning){
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning){
  getFirst(player).x += 1;
  }
});

onInput("w", () => {
  if (gameRunning){
  getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning){
  getFirst(player).y += 1;
  }
});

function spawnObstacles() {
  let x = 0;
  let y =Math.floor(Math.random() *8 );
  addSprite(x,y, obstacle);
}

function spawnScore() {
  let x = Math.floor(Math.random() *8 );
  let y =Math.floor(Math.random() *8 );
  if (getTile(x, y).length == 0) {
    addSprite(x,y, score);
  } else {
    spawnScore();
  }
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++){
    obstacles[i].x +=1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);
  for (let i = 0; i < obstacles.length; i ++){
    if (obstacles[i].x == 7) {
      obstacles[i].remove();
    }
  }
}
function despawnscore() {
  let s = getFirst(score);
  s.remove()
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
  for (let i =0; i < obstacles.length; i++) {
    if (obstacles[i].y == p.y && obstacles[i].x == p.x) {
      return true;
    }
  }
  return false;
}

function checkScore() {
  let s = getFirst(score);
  let p = getFirst(player);
  if (s.y == p.y && s.x == p.x) {
      return true;
    }
  return false;
}

  

var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacles();
  
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("You Got Caught", {
      y:6,
      color: color `3`
    })
  }
}, 1500);

spawnScore();

afterInput(() => {
  if (checkScore()) {
    scorenum += 1;
    addText(scorenum + " candy", {
      y: 0,
      x: 3,
      color: color`6`,
    });
    despawnscore();
    spawnScore();

    if (scorenum >= scoreThreshold) { // Define a score threshold for level transition
      despawnObstacles();
      currentLevel += 1;
      if (currentLevel < levels.length) {
        setMap(levels[currentLevel]);
        scoreThreshold += 10; // Increase score threshold for the next level
      } 
      else {
       
        addText("You Win!", {
          y: 6,
          color: color`3`,
        });
        clearInterval(gameLoop);
      }
    }
  }
});

