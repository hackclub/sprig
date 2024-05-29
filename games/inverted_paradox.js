/*
@title: Inverted Paradox: The Enemy Within
@author: Bernie
@tags: []
@img: ""
@addedOn: 2024-05-29
*/
bitmap`
...777...77.....
....7....7.7....
....7....77.....
...777.7.7..7...
................
..HHHHHHHHHH....
.HH.........HH..
..............H.
................
................
................
................
................
................
................
................`
const player = "p"
const obstacleR = "r"
const obstacleL = "l"
const beam = "b"
const lineL = "a"
const lineR = "b"

setLegend(
  [ player, bitmap`
................
................
................
......C..C......
.....C....C.....
....C..00..C....
...C...00...C...
.C33000..000775.
.C33000..000775.
...C...00...C...
....C..00..C....
.....C....C.....
......C..C......
................
................
................` ],
  [ obstacleR, bitmap`
................
................
................
................
............4L..
...4..........4.
....L.........L.
LFFFFLFFFFCFFFL4
LFFFFLFFFFCFFFL4
....L.........L.
...4..........4.
............4L..
................
................
................
................` ],
  [ obstacleL, bitmap`
................
................
................
................
..L4............
.4..........4...
.L.........L....
4LFFFCFFFFLFFFFL
4LFFFCFFFFLFFFFL
.L.........L....
.4..........4...
..L4............
................
................
................
................` ],

  [ lineL, bitmap`
...............0
..............0.
................
..............0.
...............0
..............0.
................
..............0.
...............0
..............0.
................
..............0.
...............0
..............0.
................
..............0.` ],
  [ lineR, bitmap`
0...............
.0..............
................
.0..............
0...............
.0..............
................
.0..............
0...............
.0..............
................
.0..............
0...............
.0..............
................
.0..............`]
)


setSolids([])

let level = 0
const levels = [
  map`
....ab....
....ab....
....ab....
....ab....
...pab....
....ab....
....ab....
....ab....
....ab....`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("l", () => {
  spawnObstacles()
})

onInput("i", () => {
  moveObstaclesR()
})

onInput("k", () => {
  let obstaclesR = getAll(obstacleR);
  let obstaclesL = getAll(obstacleL);
  let p = getFirst(player);
  
  for (let i = 0; i < obstaclesR.length; i++) {
    if (p.x < 5) { 
      if (obstaclesR[i].y == p.y && obstaclesR[i].x > p.x) {
        obstaclesR[i].remove();
        
      }
    }
    if (p.x > 4) {
      if (obstaclesR[i].y == p.y && obstaclesR[i].x < p.x) {
        obstaclesR[i].remove();
        }
      }
    }
  
  for (let i = 0; i < obstaclesL.length; i++) {
    if (p.x < 5) { 
      if (obstaclesL[i].y == p.y && obstaclesL[i].x > p.x) {
        obstaclesL[i].remove();
        
      }
    }
    if (p.x > 4) {
      if (obstaclesL[i].y == p.y && obstaclesL[i].x < p.x) {
        obstaclesL[i].remove();
      }
    }
  }
})

function spawnObstacles() {
  for (let i = 0; i < 9; i++) {
    if (1 == Math.floor(Math.random() * 5)) {
      let y = i;
      let x = 0;
      addSprite(x, y, obstacleR);
    }
    if (1 == Math.floor(Math.random() * 5)) {
      let y = i;
      let x = 9;
      addSprite(x, y, obstacleL);
    }
  }
}

function moveObstacles() {
  let obstaclesR = getAll(obstacleR);
  
  for (let i = 0; i < obstaclesR.length; i++) {
    obstaclesR[i].x += 1;
  }

  let obstaclesL = getAll(obstacleL);

  for (let i = 0; i < obstaclesL.length; i++) {
    obstaclesL[i].x -= 1;
  }
}

function despawnObstacles() {
  let obstaclesL = getAll(obstacleL);
  
  for (let i = 0; i < obstaclesL.length; i++) {
    if (obstaclesL[i].x == 0) {
      obstaclesL[i].remove();
    }
  }

  let obstaclesR = getAll(obstacleR);
  
  for (let i = 0; i < obstaclesR.length; i++) {
    if (obstaclesR[i].x == 9) {
      obstaclesR[i].remove();
    }
  }
}

  
function checkHit() {
  let obstaclesR = getAll(obstacleR);
  let obstaclesL = getAll(obstacleL);
  let p = getFirst(player);

  for (let i = 0; i < obstaclesR.length; i++) {
    if (obstaclesR[i].x == p.x && obstaclesR[i].y == p.y) {
      return true;
    }
  }
  for (let i = 0; i < obstaclesL.length; i++) {
    if (obstaclesL[i].x == p.x && obstaclesL[i].y == p.y) {
      return true;

    }
  }
  return false
}




var gameLoop = setInterval(() => {
  despawnObstacles()
  moveObstacles()
  spawnObstacles()




  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("lmao", {
      x: 8,
      y: 6,
      color: color`0`
    });
  }




}, 1000);
