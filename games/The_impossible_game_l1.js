/*
@title: The Impossible Game
@author: @SahilChess
@tags: []
@addedOn: 2024-06-18
*/

const player = "p";
const obstacle = "o";
const wall = "w"
const green = "g"
const leftwall = "l"
const rightwall = "r"

setLegend(
  [obstacle, bitmap`
3..............3
33............33
.33..333333..33.
...3333333333...
...33CCCCCC33...
..33CC6666CC33..
..33C655556C33..
..33C655556C33..
..33C655556C33..
..33C655556C33..
..33CC6666CC33..
...33CCCCCC33...
...3333333333...
..3..333333..3..
.33..........33.
33............33`],
  [player, bitmap`
..C.C...........
6..CC...........
66..C...........
666666666666....
666611111666....
6666166F1666....
.6L611111666....
.7766666666L....
.777777777777...
.7776676677777..
.77767676777777.
.77767776777777.
.77767776777777.
.7777777....0...
....0.......0...
....CC......CCC.`],
  [wall , bitmap`
................
................
................
................
................
................
CCCCCCCCCCCCCCCC
0000000000000000
0000000000000000
CCCCCCCCCCCCCCCC
................
................
................
................
................
................`],
  [green, bitmap`
....44444444....
...4444444444...
..444DDDD7D444..
.44DDDDDD7DDD44.
444DDDDDD7DDD444
44DDDDDDD7DDDD44
44DDDDDDD7DDDD44
44DDDDDDD7DDDD44
44DDDDDDD7DDDD44
4477777777777744
44DDDDDDD7DDDD44
444DDDDDD7DDD444
.44DDDDDD7DDD44.
..444DDDD7D444..
...4444444444...
....44444444....`],
  [leftwall, bitmap`
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............
00C.............`],
  [rightwall, bitmap`
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00
.............C00`],
)

const levels = [ 
  map`
wwwwwwwwwwwwwwwwwwwwwwwp
l.....................r.
l.....................r.
l.....................r.
l.....................r.
l.....................r.
........................
gwwwwwwwwwwwwwwwwwwwww..`,
  map`
ggggggggg
gg.....og
gg......g
g...w...g
g..rpl..g
g...w...g
g......gg
go.....gg
ggggggggg`,
  map`
ooooooooooo
oo.g.gooooo
o.g.g.goooo
og.g.g.gooo
o.g.gwg.goo
og.grplg.go
oog.gwg.g.o
ooog.g.g.go
oooog.g.g.o
ooooog.g.oo
ooooooooooo`,
  ]


setMap(map`
wwwwwwwwwwwwwwwwwwwwwwwp
l.....................r.
l.....................r.
l.....................r.
l.....................r.
l.....................r.
........................
gwwwwwwwwwwwwwwwwwwwww..`)

setSolids([ player, wall, leftwall, rightwall ])

var gameRunning = true; 

onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y += -1;
  }
});

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x += -1;
  }
});


onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});

function spawnObstacle() {
  let x = Math.floor(Math.random() * (17 - 1 + 1) + 1);
  let y = 1; 
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
   if (obstacles[i].y == 6) {
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


function checkWin() {
  let greenSprites = getAll(green);
  let playerSprite = getFirst(player);

  for (let i = 0; i < greenSprites.length; i++) {
    if (greenSprites[i].x === playerSprite.x && greenSprites[i].y === playerSprite.y) {
      return true;
    }
  }
  return false;
}


var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();

  if (checkWin()) {
      clearInterval(gameLoop);
      gameRunning = false;
      setMap(levels[1])
      addText("You win!", {
        x: 5,
        y: 6,
        color: color`4`
      });
  }
  
}, 500);


var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    setMap(levels[2])
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
  
}, 500);










/*
const player = "p"
const walla = "a"
const wallb = "b"
const wallc = "c"
const walld = "d"
const green = "g"
const melody = tune`
123.96694214876032,
123.96694214876032: C4^123.96694214876032 + D5/123.96694214876032,
123.96694214876032: D4~123.96694214876032,
123.96694214876032: C4^123.96694214876032 + C5/123.96694214876032,
123.96694214876032: E4~123.96694214876032,
123.96694214876032: C4^123.96694214876032 + B4/123.96694214876032,
123.96694214876032: F4~123.96694214876032,
123.96694214876032: C4^123.96694214876032 + A4/123.96694214876032,
123.96694214876032: G4~123.96694214876032,
123.96694214876032: G4-123.96694214876032,
123.96694214876032: G4-123.96694214876032,
123.96694214876032: G4-123.96694214876032,
123.96694214876032: G4-123.96694214876032,
123.96694214876032: F4/123.96694214876032 + A4^123.96694214876032,
123.96694214876032: E4/123.96694214876032 + B4^123.96694214876032,
123.96694214876032: D4/123.96694214876032 + C5^123.96694214876032,
123.96694214876032: D5^123.96694214876032 + C4/123.96694214876032,
123.96694214876032: G4~123.96694214876032,
123.96694214876032: G4~123.96694214876032 + A4-123.96694214876032,
123.96694214876032: G4~123.96694214876032 + F4-123.96694214876032,
123.96694214876032: F5/123.96694214876032,
123.96694214876032: G4~123.96694214876032,
123.96694214876032: G4~123.96694214876032 + F4/123.96694214876032,
123.96694214876032: G4~123.96694214876032 + A4/123.96694214876032,
123.96694214876032: C4/123.96694214876032,
123.96694214876032,
123.96694214876032: A4^123.96694214876032,
123.96694214876032: G4^123.96694214876032,
123.96694214876032: F4^123.96694214876032,
123.96694214876032: E4^123.96694214876032,
123.96694214876032: D4^123.96694214876032,
123.96694214876032: E4~123.96694214876032 + D4~123.96694214876032 + C4^123.96694214876032`
const playback = playTune(melody, Infinity)
const obstacle = "o"
const air = "w"
const leftblock = "i"
const rightblock = "j"



setLegend(
  [player, bitmap`
..C.C...........
6..CC...........
66..C...........
666666666666....
666611111666....
6666166F1666....
.6L611111666....
.7766666666L....
.777777777777...
.7776676677777..
.77767676777777.
.77767776777777.
.77767776777777.
.7777777....0...
....0.......0...
....CC......CCC.`],
  [walla, bitmap`
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000
............C000`],
  [wallb, bitmap`
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............
000C............`],
  [wallc, bitmap`
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
................
................
CCCCCCCCCCCCCCCC
0000000000000000
0000000000000000
0000000000000000`],
  [walld, bitmap`
0000000000000000
0000000000000000
0000000000000000
CCCCCCCCCCCCCCCC
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
................
................`],
  [green, bitmap`
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
4444444444444444`],
  [obstacle, bitmap`
3..............3
33............33
.33..333333..33.
...3333333333...
...33CCCCCC33...
..33CC6666CC33..
..33C655556C33..
..33C655556C33..
..33C655556C33..
..33C655556C33..
..33CC6666CC33..
...33CCCCCC33...
...3333333333...
..3..333333..3..
.33..........33.
33............33`],
  [air, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222002222222
2222222002222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
)

setSolids([player, walla, wallb, wallc, walld])


let level = 0
const levels = [
  map`
p.............
..............
..............
..............
dddddddddddddd
..............
..............
..............
..............
..............
..............
dddddddddddddd
..............
..............
..............`,
  map`
ogggggggg
ggggggggo
ogggggggg
ggggwgggo
oggwpwggg
ggggwgggo
ogggggggg
ggggggggo
ogggggggg`,
]


var gameRunning = true; 


setMap(levels[0])

setPushables({
  [player]: []
})

onInput("w", () => {
  getFirst(player).y += -1
})

onInput("a", () => {
  getFirst(player).x += -1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})









function spawnObstacle() {
  let x = Math.random() < 0.5 ? 5 : 10
  let y =  Math.floor(Math.random() * 12
  addSprite(x, y, obstacle)
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
*/