/*
@title: Dino Jump
@description: Chrome dino-style jump game
@author: you
@tags: ['endless runner', 'arcade']
@addedOn: 2026-05-03
*/

const dino = "d"
const cactus = "c"
const ground = "g"
const sky = "s"

setLegend(
  [ dino, bitmap`
................
................
.......000......
.......0.0......
.......000......
......00........
.....0000.......
....0.00........
....0.000000....
.....0000.0.....
......000.......
......0.0.......
.....0..0.......
.....0...0......
......0..0......
................` ],
  [ cactus, bitmap`
................
......0.........
.0...00.........
.0.0.0..........
.0.0.0..........
.0.000..........
.000............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
................` ],
  [ ground, bitmap`
1111111111111111
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
  [ sky, bitmap`
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
7777777777777777` ]
)

setSolids([ dino, ground ])

let score = 0
let gameOver = false
let isJumping = false
let jumpStep = 0
const groundRow = 6
const dinoCol = 1

const levels = [
  map`
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
ssssssssss
gggggggggg
gggggggggg`
]

setMap(levels[0])

// place dino on ground
addSprite(dinoCol, groundRow - 1, dino)

function spawnCactus() {
  if (gameOver) return
  addSprite(9, groundRow - 1, cactus)
}

// jump with W or I
onInput("w", () => {
  if (!isJumping && !gameOver) {
    isJumping = true
    jumpStep = 0
  }
})

onInput("i", () => {
  if (!isJumping && !gameOver) {
    isJumping = true
    jumpStep = 0
  }
})

// restart with S or K after game over
onInput("s", () => {
  if (gameOver) restartGame()
})
onInput("k", () => {
  if (gameOver) restartGame()
})

function restartGame() {
  gameOver = false
  isJumping = false
  jumpStep = 0
  score = 0
  clearText()
  setMap(levels[0])
  addSprite(dinoCol, groundRow - 1, dino)
}

function checkCollision() {
  const d = getFirst(dino)
  if (!d) return
  const allCacti = getAll(cactus)
  for (const c of allCacti) {
    if (c.x === d.x && c.y === d.y) {
      gameOver = true
      addText("GAME OVER", { x: 5, y: 3, color: color`3` })
      addText("Score: " + score, { x: 5, y: 5, color: color`0` })
      addText("S to restart", { x: 3, y: 7, color: color`0` })
    }
  }
}

// main game loop
setInterval(() => {
  if (gameOver) return

  const d = getFirst(dino)
  if (!d) return

  // handle jump arc
  if (isJumping) {
    if (jumpStep === 0) d.y = groundRow - 2
    else if (jumpStep === 1) d.y = groundRow - 3
    else if (jumpStep === 2) d.y = groundRow - 4
    else if (jumpStep === 3) d.y = groundRow - 4
    else if (jumpStep === 4) d.y = groundRow - 3
    else if (jumpStep === 5) d.y = groundRow - 2
    else if (jumpStep === 6) {
      d.y = groundRow - 1
      isJumping = false
    }
    jumpStep++
  }

  // move cacti left
  const allCacti = getAll(cactus)
  for (const c of allCacti) {
    if (c.x <= 0) {
      c.remove()
      score++
    } else {
      c.x -= 1
    }
  }

  checkCollision()

  // update score display
  clearText()
  addText("Score: " + score, { x: 0, y: 0, color: color`0` })

}, 200)

// spawn cacti at random intervals
setInterval(() => {
  if (!gameOver) {
    if (Math.random() < 0.4) {
      spawnCactus()
    }
  }
}, 800)
