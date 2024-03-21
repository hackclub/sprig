


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
.......00000....
..000000LLL0000.
00LLLLLLLLLLLLL0
00LLLLLLLLLLLLL0
000LLLLLLLLLLLL0
020000LLLLLLL000
0222000000000020
0277277727772220
0272272727272220
0272277727272220
0277272727272220
0000000000000000`],
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
.......88.......
.....8888.......
...888888.......
...888888.......
..888888888.....
.888888888888...
.88888088088888.
.88888788788888.
..8888888888888.
...8880808888...
....88000888....
...8888888......
..888888888.....
..888888888.....
...88888888.....`],
  [ ground, bitmap `
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
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
........333.....
........363.....
.......666......
.......6........
......000.......
....000000......
...00000000.....
...00000000.....
...00000200.....
...00000000.....
.....00000......
................
................
................
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
    const melody = tune`
500,
500: E4~500,
500: E4~500,
500: F4~500,
500: F4~500,
500: F4~500,
500: F4~500,
500: F4~500,
500: F4~500,
500: F4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500: G4~500,
500: A4~500,
500: A4~500,
500: A4~500,
500: A4~500,
500: A4~500,
500: A4~500,
500: B4~500,
500: B4~500,
500: B4~500,
500: B4~500,
500: B4~500,
500: B4~500,
500: C5~500,
500`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(basket).x += 1;
    const melody = tune`
1000,
500: B4^500,
500: B4^500,
500: B4^500,
500: B4^500,
500: B4^500,
500: B4^500,
500: A4^500,
500: A4^500,
500: A4^500,
500: A4^500,
500: A4^500,
500: A4^500,
500: G4^500,
500: G4^500,
500: G4^500,
7500`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()
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