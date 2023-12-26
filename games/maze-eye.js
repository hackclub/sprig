/*
@title: maze-eye 
@author: acon

a maze, but dodge monsters at the same time!
*/

// define the sprites in our game
const player = "p";
const obstacle = "o";
const monst = "m";
const background = "b";
const wall = "w";
const door = "d";
const unlit = "u";

// assign bitmap art to each sprite
setLegend(
  [obstacle, bitmap`
.333333..3333333
.3...33333755555
.55555.337777757
.577755..5775577
5722277555757.33
572027755777333.
57222577777733..
.577757755577333
.5577577777777.3
..55555775555777
3333335775335555
3333.35775333..5
.33..3.575.333..
..3..335555.3333
.3....3.5555.33.
.33...33...55.3.`],
  [monst, bitmap`
3367573695773.73
3767537695573.69
3967537696537669
7996536396537695
5996536396536395
5979676396536955
.97996679653695.
7977997769536957
7957599995775957
7955555555555997
.955533333555957
5955333233355957
5955333233355953
3955333233359933
339553333355973.
.39955555559733.`],
  [unlit, bitmap`
0000000000000000
0000200022000000
0002200020000200
0022000220002200
0020002000022000
0000020000220000
0002200002200000
0022000002000000
0220000220000200
0000002200002200
0000022000002000
0002200000220000
0022000002200020
0020000022000220
0000000020002200
0000000000000000`],
  [player, bitmap`
................
..222......222..
..3322....2233..
...3222222223...
...2222222222...
...222022022....
....22022022....
....22233222....
.....222222.....
....221111222...
....22221222....
.....2222222....
....122222221...
..1112221222111.
..1112221222111.
................`],
  [background, bitmap`
LCLLLLLLLLLLLLLL
LLLLLLLLLLLCLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL3LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3LLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [wall, bitmap`
3333331L333L3333
33333313333L3333
33333L13333LLL33
33333L133333LL33
L1333LL33333L333
311111333333L33L
33113L333333LLL3
33133LLL33331L33
33133333L3313333
33113333LL113333
3331333333133333
3331333333133333
33L1333LL13LL1L1
3LLLL333133L3313
LL33L31113333333
3333LL333L333333`],
  [door, bitmap`
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L
...CC1CC1CC1CC1L`]
)

setBackground(background)
setSolids([player, wall])

// Step 1 - Add player to map

let level = 0
const levels = [
  map`
..............d
..............d
..............d
..............d
..............d
..............d
..............d
..............d
...p..........d
..............d
..............d
..............d`,
  map`
........o.....d
.......o......d
......o.......d
...o..........d
..............d
..o.......o...d
......o.....o.d
...o..........d
....o.........d
p.....o.......d
...........o..d
.....o........d`, // no walls
  map`
..w.....w.....d
..w.....w.....d
..w.....w.....d
..w..wo.w.....d
..w..w..w.....d
.....w...o....d
p....w....o...d
..w.ow..w.....d
..w..w..w.....d
..w.....w.....d
..w.....w.....d
..w.....w.....d`, // lv 1
  map`
...w.....w...od
p..w..w..w..w.d
...w..wo.w..w.d
...w..w..w..w.d
...w..w..w..w.d
...w..w..w..w.d
...w..w..wo.w.d
...w.ow..w..w.d
...w..w..w..w.d
...w..w..w..w.d
...w..w..w..w.d
......w.....wod`, // straight lines
  map`
........o...ww.
...o.......o.w.
......ww...o.ww
.wwwwww.ww....w
.........ww...w
..........w..ow
w..wwwwwo.w...w
.ww.....o.w...w
..........w...w
.......www..wwd
p....o.w...w..d
.......w......d`, // easy maze
  map`
...uu...uu....d
...uu...uu....d
...uu...uu....d
...uu...uu....d
...uu...uu....d
p..uu...uu....d
...uu...uu....d
...uu...uu....d
...uu...uu....d
...uu...uu....d
...uu...uu....d
...uu...uu....d`, // dark only
  map`
...w...w....ww.
.....w...w...ww
...wwwwwwwwo..w
..wwuuu..o.ww.w
.ww.uuu....ww.w
....uuww.ww.o.w
....uww..w.o..w
...ww...wwuuuww
..ww..wwwuuuwwd
.ww...wwuuuuwod
w.....w..o.w..d
p...www...o...d`, // harder maze
  map`
...w...wwww.w..
..w..ww...ouuwo
....wuuuw.ouuw.
uuw..uwu..wuuwo
uuwwwuwuw.wuuww
.w.wwuuuw.wuu.d
.....www...wo.d
w.w.wuu.ww.woww
.ww.wuw..w.w..w
..w.uuwo.wuwu.w
wwwwww..wuuwu.w
p......wuuuuuw.`, // hardest(?) maze
  map`
.........
.........
.........
....p....
.........
.........
.........` // end
]

const currentLevel = levels[level];
setMap(currentLevel);

let end = 8

// Create a variable that shows when the game is running
var gameRunning = true; 

// START - PLAYER MOVEMENT CONTROLS

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

onInput("l", () => {
  if (gameRunning) {
    clearText();
    if (tutorial <= 5) {
      tutorial++;
    }
  }
});

onInput("i", () => {
  gameRunning = true;
  clearText();
  level = 1;
  const currentLevel = levels[level]
  setMap(currentLevel)
});

// END - PLAYER MOVEMENT CONTROLS

// Put obstacle in a random position
function spawnObstacle() {
  let x = 14;
  let y = Math.floor(Math.random() * 12); 
  addSprite(x, y, obstacle);
}

function spawnMonst() {
  let x = Math.floor(Math.random() * 15);
  let y = 0; 
  addSprite(x, y, monst);
}

// Make obstacles move
function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;
  }
}

function moveMonst() {
  let monsts = getAll(monst);

  for (let i = 0; i < monsts.length; i++) {
    monsts[i].y += 1;
  }
}

// Make obstacles disappear
function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 0) {
     obstacles[i].remove();
   }
  }
}

function despawnMonst() {
  let monsts = getAll(monst);

  for (let i = 0; i < monsts.length; i++) {
   if (monsts[i].y == 11) {
     monsts[i].remove();
   }
  }
}

// See if the player was hit
function checkHit() {
  let obstacles = getAll(obstacle);
  let monsts = getAll(monst);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  for (let i = 0; i < monsts.length; i++) {
    if (monsts[i].x == p.x && monsts[i].y == p.y) {
      return true;
    }
  }

  return false;
}

function checkLevel() {
  let p = getFirst(player);
  if (p.x == 14) {
    level += 1;
    const currentLevel = levels[level];
    setMap(currentLevel) 
  }
}

let tutorial = 1

function tutorialLevel() {
  if (tutorial <= 5) {
    clearText();
    if (tutorial == 1) addText(`L to clear text`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 2) addText(`W A S D to move`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 3) addText(`just run right`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 4) addText(`dodge monsters!`, { x: 1, y: 14, color: color`4` });
    else if (tutorial == 5) addText(`and survive :D`, { x: 1, y: 14, color: color`4` });

    addText("------------->", {x:1, y:1, color: color`4`});
  }
  else {
    clearText();
  }
}

var gameLoop = setInterval(() => {
  // Step 4 - Add all game functions

  if (checkHit()) {
    //clearInterval(gameLoop);
    gameRunning = false;
    addText("game over!", {x:5, y:6, color: color`6`});

    addText("press I to restart", {x:1, y:8, color: color`6`});
  }

  if (level == end) {
    //clearInterval(gameLoop);
    //gameRunning = false;
    addText("you win!", {x:5, y:6, color: color`4`});

    addText("press I to restart", {x:1, y:8, color: color`6`});
  }

  if (level >= 1 && level != end) {
    despawnObstacles();
    moveObstacles();
    spawnObstacle();
    despawnMonst();
    moveMonst();
    spawnMonst();
  }
  else if (level == 0) {
    tutorialLevel();
  }
  
  checkLevel();

}, 1000);
