/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Gold RUSH'd
@author: DevTechJr
@tags: ['catch','gold]
@img: ""
@addedOn: 2024-05-23

Instructions:
catch all the gold as much as possible.

Controls:
AD : left/right
*/

const player = "p" // Unused
const fruit = "f" //added fruit
const ground = "g" //ground
const basket = "b" // basket
const ladybug = "l" // ladybug

setLegend(
  [ basket, bitmap `
................
................
................
................
................
................
................
.00000000000000.
.00666626666260.
.00622226226260.
.00626626226260.
.00622626226220.
..0666626666260.
..022222222220..
..000000000000..
...00....0000...`],
  [ player, bitmap`
................
................
.......L........
......L1L.......
......L1L.......
......L1L.......
......L1L.......
......L1L.......
......L1L.......
....000L000.....
....0LLL110.....
.....0CCC0......
......0C0.......
......0C0.......
......0C0.......
.......0........` ], //unused
  [ fruit, bitmap `
................
....6666........
..6666666.......
..6FF6666666....
..6FFF6666666...
..66666666666...
..66666666666...
...66666666666..
...666666FFF66..
...66666FFF66...
....666666666...
.....66666666...
.......666666...
.........666....
................
................`],
  [ ground, bitmap `
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
LL000LL000LL000L
LL000LL000LL000L
LL000LL000LL000L
LL000LL000LL000L
LL000LL000LL000L
LL000LL000LL000L
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL`],
  [ ladybug, bitmap `
................
................
........LLLLLLL.
.LLLL..LLL000LL.
.LLLLLLLL00L0LL.
.LL0LLLLLLLL00L.
..L00LLLLLLLLLL.
..LL00LLLLLLLLL.
..LL00LLLLLLLL..
..LL0LLLL00LLL..
..LLLLLLLL00L...
..LLLLLLLLL0L...
...LLLLLLLLLL...
....LLL...LL....
................
................`]
)

setSolids([])
let score = 0

let level = 0
const levels = [
  map`
........
........
........
........
........
........
b.......
gggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

var gameRunning = true; 

onInput("a", () => {
  if (gameRunning) {
    getFirst(basket).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(basket).x += 1;
  }
});

function spawnFruit() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, fruit);
}

function moveFruit() {
  let fruits = getAll(fruit);

  for (let i = 0; i < fruits.length; i++) {
    fruits[i].y += 1;
  }
  
}
function despawnFruit() {
  let fruits = getAll(fruit);

  for (let i = 0; i < fruits.length; i++) {
   if (fruits[i].y == 7) {
     fruits[i].remove();
   }
  }
}

function spawnLadybug() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, ladybug);
}

function moveLadybug() {
  let ladybugs = getAll(ladybug);

  for (let j = 0; j < ladybugs.length; j++) {
    ladybugs[j].y += 1;
  }
  
}
function despawnLadybug() {
  const basketX = getFirst(basket).x
  const basketY = getFirst(basket).y
  let ladybugs = getAll(ladybug);

  for (let j = 0; j < ladybugs.length; j++) {
   if (ladybugs[j].y == 7) {
     ladybugs[j].remove();
   }   

  }
}

function checkHit() {
  let ladybugs = getAll(ladybug);
  let b = getFirst(basket);

  for (let i = 0; i < ladybugs.length; i++) {
    if (ladybugs[i].x == b.x && ladybugs[i].y == b.y) {
      return true;
    }
  }

  return false;
}

function checkHitFruits() {
  let fruits = getAll(fruit);
  let b = getFirst(basket);

  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].x == b.x && fruits[i].y == b.y) {
      return true;
    }
  }

  return false;
}


var gameLoop = setInterval(() => {
  moveFruit();
  spawnFruit();
  despawnFruit();
  
  moveLadybug();
  spawnLadybug();
  despawnLadybug();
  if (checkHit()) {
    score -= 3
  }
  if (checkHitFruits()) {
    score += 1
  }
  
  addText(`Gold: ${score}`, {x: 2, y: 1, color: color`6`})
  

}, 250);
