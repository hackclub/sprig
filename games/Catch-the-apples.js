/*
@title: Catch the apples
@author: Jack
@tags: ["endless" , "timed"]
@addedOn: 2024-01-13
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

Instructions:
Catch as many apples as you can and avoid the bugs. Each apple caught will increase the score by 1, 
whereas each bug caught will decrease the score by 2. 

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
...0000000000...
.00L11111111100.
0LLLLLL111111110
00LLLLLL11111100
0100LLLLL11100L0
011100000000LLL0
011111111111LLL0
011111111111LLL0
.0111111111LLL0.
.011111111LLLL0.
.01111111LLLLL0.
..011111LLLLL0..
..011111LLLLL0..
...0000000000...`],
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
..........4D....
........C4DDD...
.......CCDD.....
.......CDD......
.....00C000.....
....033C3330....
...0322333330...
..032233333330..
..032233333330..
..0333333333C0..
..0333333333C0..
...03333333C0...
....03333CC0....
.....000000.....
................`],
  [ ground, bitmap `
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ ladybug, bitmap `
................
................
................
................
................
.....33033......
....3330333.....
...330303033....
...333303333....
...330303303....
...333303033....
....3330333.....
.....30003......
.....00000......
.....00000......
......000.......`]
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
  
  addText(`Apples: ${score}`, {x: 2, y: 1, color: color`L`})
  

}, 250);
