/*
@title: Dino Game
@author: Jos
@tags: runner, jump, dinosaur, chrome
@addedOn: 2025-11-01
*/

const background = "b"
const player = "p"
const ground = "g"
const cactus = "c"

setLegend(
  [ player, bitmap`
................
...........1111.
..........11211.
..........11111.
1........1111...
11.....11111111.
111..111111.....
11111111111.....
1111111111111...
.1111111111.1...
...11111111.....
.....11...1.....
.....1....11....
.....1.....1....
.....1.....1....
.....11....11...` ],
  [ background, bitmap`
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
................
................
................
................` ],
  [ ground, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ cactus, bitmap`
................
................
................
................
......11........
.....111........
.....111........
.....1111.......
.....1111.......
.....1111.......
..1..1111..1....
..1..1111111....
..1...11111.....
..11..1111......
..11............
................` ]
)

setSolids([player, ground])
setPushables({ [player]: [] })

const level = map`
................
................
................
................
..p.............
gggggggggggggggg`
setMap(level)

let inAir = false
let gameOver = false
let score = 0

function jump() {
  if (!inAir && !gameOver) {
    inAir = true
    getFirst(player).y -= 1
    setTimeout(() => {
      getFirst(player).y -= 1
    }, 80)
    setTimeout(() => {
      getFirst(player).y += 1
    }, 360)
    setTimeout(() => {
      getFirst(player).y += 1
      inAir = false
    }, 250)
  }
}

onInput("s", jump)
onInput("w", jump)

function spawnCactus() {
  if (gameOver) return
  addSprite(15, 4, cactus)
}

function moveCacti() {
  if (gameOver) return
  const cacti = getAll(cactus)
  for (let c of cacti) {
    c.x -= 1
    if (c.x === 0) { // Check if cactus is at the left edge
      c.remove() // Remove the cactus object when it reaches the left edge
    }
    if (c.x === getFirst(player).x && c.y === getFirst(player).y) {
      endGame()
    }
  }
}



function endGame() {
  gameOver = true
  clearText()
  addText("GAME OVER", { x: 4, y: 6, color: color`3` })
  addText("Score: " + score, { x: 5, y: 8, color: color`2` })
  addText("Press d to retry", { x: 3, y: 10, color: color`5` })
}

function restart() {
  if (!gameOver) return
  clearText()
  gameOver = false
  score = 0
  setMap(level)
}

onInput("d", restart)

// game loop
setInterval(() => {
  if (gameOver) return
  moveCacti()
  score++
  clearText()
  addText(score.toString(), { x: 1, y: 1, color: color`2` })
}, 120)

setInterval(() => {
  if (gameOver) return
  if (Math.random() < 0.5) spawnCactus()
}, 700)
