// 🐍 Classic Snake Game for Sprig
// Made by Tejaj + GPT-5 😎

const snake = "s"
const apple = "a"
const grass = "g"
const head = "h"

setLegend(
  [snake, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [apple, bitmap`
......D...D.....
.......D.D......
...9999999999...
..999999999999..
.99999999999999.
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
.99999999999999.
..999999999999..
...9999999999...
....99999999....
.....999999.....`],
  [grass, bitmap`
4444444444444444
4444444444444444
44DDD4444D444D44
4D444D4444DDD444
4444444444444444
4444444444444444
4D444D4444DDD444
44DDD4444D444D44
4444444444444444
4444444444444444
44DDD4444D444D44
4D444D4444DDD444
4444444444444444
4444DD4444DD4444
44DD44444444DD44
4444444444444444`],
  [head, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDD5
DDDDDDDDDDDDDD55
DDDDDDDDDDDDDD55
DDDDDDDDDDDDDD55
DDDDDDDDDDDDDDD5
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDD5
DDDDDDDDDDDDDD55
DDDDDDDDDDDDDD55
DDDDDDDDDDDDDD55
DDDDDDDDDDDDDDD5
DDDDDDDDDDDDDDDD`]
)

setSolids([snake])

let level = [
  map`
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg
gggggggggggggggggggg`,
]

setMap(level[0])

// --- Initial snake setup ---
let snakeBody = [{ x: 4, y: 4 }]
let dir = { x: 1, y: 0 }
let applePos = randomApple()

addSprite(snakeBody[0].x, snakeBody[0].y, head)
addSprite(applePos.x, applePos.y, apple)

function randomApple() {
  let x = Math.floor(Math.random() * width())
  let y = Math.floor(Math.random() * height())
  return { x, y }
}

// --- Controls ---
onInput("w", () => { if (dir.y == 0) dir = { x: 0, y: -1 } })
onInput("s", () => { if (dir.y == 0) dir = { x: 0, y: 1 } })
onInput("a", () => { if (dir.x == 0) dir = { x: -1, y: 0 } })
onInput("d", () => { if (dir.x == 0) dir = { x: 1, y: 0 } })

let speed = 250
let alive = true
let score = 0

function move() {
  if (!alive) return

  let headPos = snakeBody[0]
  let newHead = { x: headPos.x + dir.x, y: headPos.y + dir.y }

  // collision with wall
  if (
    newHead.x < 0 ||
    newHead.x >= width() ||
    newHead.y < 0 ||
    newHead.y >= height()
  ) {
    gameOver()
    return
  }

  // collision with self
  for (let part of snakeBody) {
    if (part.x === newHead.x && part.y === newHead.y) {
      gameOver()
      return
    }
  }

  snakeBody.unshift(newHead)

  // apple eaten?
  if (newHead.x === applePos.x && newHead.y === applePos.y) {
    score++
    playTune(music)
    applePos = randomApple()
  } else {
    snakeBody.pop()
  }

  // clear + redraw
  clearTiles()
  addSprite(applePos.x, applePos.y, apple)

  // Draw head first, then body
  addSprite(snakeBody[0].x, snakeBody[0].y, head)
  for (let i = 1; i < snakeBody.length; i++) {
    addSprite(snakeBody[i].x, snakeBody[i].y, snake)
  }
}

function clearTiles() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      clearTile(x, y)
    }
  }
}

function gameOver() {
  alive = false
  clearTiles()
  addText("Game Over!", { x: 6, y: 7, color: color`3` })
  addText(`Score: ${score}`, { x: 7, y: 9, color: color`2` })
}

const music = tune`
100,
100: c5~100,
100: d5~100,
100: e5~100,
100: g5~100,
100: a5~100,
100: c6~100`

setInterval(move, speed)
