/*
@title: BlastOff
@author: Fahad
@tags: ['endless','action']
@addedOn: 2024-06-04

@img: ""

Movement:
  w - Up
  s - Down

Objective:
  Dodge the incoming birds, and get high score!
*/

const player = "p"
const bird = "b"
const sky = "s"
const cloud1 = "c"
const cloud2 = "v"

const rocketMoveTune = tune`
85.22727272727273,
85.22727272727273: B4~85.22727272727273,
85.22727272727273: F5~85.22727272727273,
2471.5909090909095`
const gameOverTune = tune`
104.8951048951049,
104.8951048951049: F4/104.8951048951049,
104.8951048951049: F4/104.8951048951049,
104.8951048951049: F4/104.8951048951049,
104.8951048951049: E4-104.8951048951049,
104.8951048951049: E4-104.8951048951049,
104.8951048951049: C4-104.8951048951049 + E4-104.8951048951049,
104.8951048951049: C4-104.8951048951049,
104.8951048951049: C4-104.8951048951049,
2412.5874125874125` 
const gameBeginTune = tune`
136.36363636363637,
136.36363636363637: B4/136.36363636363637,
136.36363636363637: B4/136.36363636363637,
136.36363636363637: E5-136.36363636363637,
136.36363636363637: E5-136.36363636363637,
136.36363636363637: G5-136.36363636363637,
136.36363636363637: G5-136.36363636363637,
3409.0909090909095`

setLegend(
  [ player, bitmap`
.00.............
0990............
09900...........
099990..........
0990000000......
000222222200....
.0022222222200..
.02222220002990.
.02222220002990.
.0022222222200..
000222222200....
0990000000......
099990..........
09900...........
0990............
.00.............` ],
  [ bird, bitmap`
................
................
................
................
..000...........
.0HHH0..........
.0H0H00000000000
06HHH00HHHHHH0H0
.00000H0HHHHH000
.....0HH000000..
......00HHHH0...
........0000....
................
................
................
................` ],
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
  [cloud1, bitmap`
................
................
................
................
................
........22......
......222222....
......222222....
....222222222...
....222222222...
....222222222...
..2222222222222.
..2222222222222.
..2222222222222.
................
................`],
  [cloud2, bitmap`
................
................
................
......2222222...
......2222222...
...22222222222..
...22222222222..
................
................
................
..22............
.22222..........
.22222..........
................
................
................`]
)

// Initial value
const birdSpawnX = 6
const birdSpawnYEnd = 5
const birdFlightSpeed = 300
const birdSpawnRate = 0.2

function resetGame() {
  clearText();
  getAll(bird).forEach((eachBird) => {
    eachBird.remove();
  })
  
  score = 0
  getFirst(player).y = 2
  playTune(gameBeginTune)
}

let gameOver = false
let canRestart = false
let score = 0

setBackground(
  sky
)

let level = 0
const levels = [
  map`
v..c...
.v...v.
.p.c.vc
v.v....
.......`
]

setMap(levels[level])

onInput("w", () => {
  if (gameOver) return;
  getFirst(player).y -= 1
  playTune(rocketMoveTune)
})

onInput("s", () => {
  if (gameOver) return;
  getFirst(player).y += 1
  playTune(rocketMoveTune)
})

onInput("l", () => {
  if (!canRestart) return;
  resetGame()
  canRestart = false
  gameOver = false
})

setInterval(async () => {
  if (!gameOver) return;

  addText("Game Over!", {x: 4, y: 4, color: color`3`})
  canRestart = true
  addText("Press'l'to restart", {y: 8, color: color`D`})
  
},30)

// Spawning birds
setInterval(() => {
  if (gameOver) return;
  for (let y = 0; y < birdSpawnYEnd; y++) {
    if (Math.random() < birdSpawnRate) {
      addSprite(birdSpawnX, y,  bird);
    }
  }
},birdFlightSpeed)

// Moving birds
setInterval(() => {
  if (gameOver) return;
  
  getAll(bird).forEach((birdSprite) => {
    // Reached end of screen
    if (birdSprite.x === 0) {
      birdSprite.remove();
      score += 1
      return;
    }
    birdSprite.x -= 1
  })
},birdFlightSpeed)

// Checking for collision
setInterval(() => {
  getAll(bird).forEach((birdSprite) => {
    getTile(birdSprite.x, birdSprite.y).forEach((spriteInTile) => {
      if (spriteInTile.type === player) {
        gameOver = true
        playTune(gameOverTune)
        birdSprite.remove();
        return;
      }
    })
  })
}, 60)

setInterval(()=>{
  if (gameOver) return;
  clearText();
  addText(`Score: ${score}`, {x: 6, y: 1, color: color`0`})
},30)