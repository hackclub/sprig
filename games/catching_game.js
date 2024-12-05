/*
@title: Catching game
@author: Swastik Bajpai
@tags: []
@addedOn: 2024-06-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const blue = "b"
const fruit = "f"
let gameOver = false;

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
.....CCCCCC.....
................`] ,
  [ blue, bitmap`
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
  [ fruit, bitmap`
.........LLL....
.........LLLL...
.........6L.....
........6666....
........6666....
.......66666....
......66666.....
......66666.....
.....666666.....
....6666666.....
...6666666......
...666666.......
.6666666........
.666666.........
.666............
................`]
)

setSolids([])
let score = 0
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
setSolids[(fruit)]

var gameRunning = true;

function spawnFruits() {
  let x = Math.floor(Math.random() * 10);
  let y = 0;
  addSprite(x, y, fruit);
}

function moveFruits() {
  let fruits = getAll(fruit);

  for (let i = 0; i < fruits.length; i++) {
      fruits[i].y += 1;
  }
}

function despawnFruits() {
  let fruits = getAll(fruit);

  for (let i = 0; i < fruits.length; i++) {
   if (fruits[i].y == 8) {
     fruits[i].remove();
   }
  }
}

function checkHit() {
  let fruits = getAll(fruit);
  let p = getFirst(player);

  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].x == p.x && fruits[i].y == p.y) {
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

setBackground(blue)

var gameLoop = setInterval(() => {
  if (checkHit()) {
    score += 1
    addText(`Score: ${score}`, {
     x: 8, 
     y: 1, 
     color: color`2`
    })
  }
  
  despawnFruits ();
  moveFruits ();
  spawnFruits ();

  

}, 300);
