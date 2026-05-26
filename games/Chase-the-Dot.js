const head = "h"
const body = "b"
const food = "f"
const boom = "x"
const bg = "g"

setLegend(
  [head, bitmap`
................
....44444444....
...4444444444...
..444444444444..
..444....44444..
..444....44444..
..444444444444..
..444444444444..
..444....44444..
..444....44444..
..444444444444..
...4444444444...
....44444444....
................
................
................`],

  [body, bitmap`
................
....33333333....
...3333333333...
..333333333333..
..333....33333..
..333....33333..
..333333333333..
..333333333333..
..333....33333..
..333....33333..
..333333333333..
...3333333333...
....33333333....
................
................
................`],

  [food, bitmap`
................
................
......2222......
.....222222.....
....22222222....
....22222222....
.....222222.....
......2222......
................
................
................
................
................
................
................
................`],

  [boom, bitmap`
................
....22222222....
..222222222222..
..22..22..2222..
..22......2222..
..22.2222.2222..
..22......2222..
..2222..222222..
..222222222222..
....22222222....
................
................
................
................
................
................`],

  [bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setMap(map`
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
gggggggggggg
`)

let snake
let direction
let score
let highScore = 0
let gameOver
let speed = 200

function startGame() {

  getAll(head).forEach(s => s.remove())
  getAll(body).forEach(s => s.remove())
  getAll(food).forEach(s => s.remove())
  getAll(boom).forEach(s => s.remove())

  snake = [
    {x: 5, y: 6},
    {x: 4, y: 6},
    {x: 3, y: 6}
  ]

  direction = "right"
  score = 0
  gameOver = false

  spawnFood()
  drawSnake()
  updateUI()

  moveSnake()
}

function drawSnake() {

  getAll(head).forEach(s => s.remove())
  getAll(body).forEach(s => s.remove())

  for (let i = 0; i < snake.length; i++) {

    if (i == 0) {
      addSprite(snake[i].x, snake[i].y, head)
    } else {
      addSprite(snake[i].x, snake[i].y, body)
    }
  }
}

function spawnFood() {

  getAll(food).forEach(f => f.remove())

  let fx = Math.floor(Math.random() * width())
  let fy = Math.floor(Math.random() * (height() - 2)) + 2

  addSprite(fx, fy, food)
}

function updateUI() {

  clearText()

  addText("SCORE " + score, {
    x: 1,
    y: 0,
    color: color`2`
  })

  addText("HIGH " + highScore, {
    x: 1,
    y: 1,
    color: color`3`
  })
}

function moveSnake() {

  if (gameOver) return

  let newHead = {
    x: snake[0].x,
    y: snake[0].y
  }

  if (direction == "right") newHead.x += 1
  if (direction == "left") newHead.x -= 1
  if (direction == "up") newHead.y -= 1
  if (direction == "down") newHead.y += 1

  // Wrap around
  if (newHead.x < 0) newHead.x = width() - 1
  if (newHead.x >= width()) newHead.x = 0

  if (newHead.y < 2) newHead.y = height() - 1
  if (newHead.y >= height()) newHead.y = 2

  // Self collision
  for (let part of snake) {
    if (part.x == newHead.x && part.y == newHead.y) {
      explode()
      return
    }
  }

  snake.unshift(newHead)

  let ate = false

  const tile = getTile(newHead.x, newHead.y)

  tile.forEach(sprite => {

    if (sprite.type == food) {

      sprite.remove()

      ate = true
      score += 1

      if (score > highScore) {
        highScore = score
      }

      tune`
120: C5,
120: G5
`

      spawnFood()
    }
  })

  if (!ate) {
    snake.pop()
  }

  drawSnake()
  updateUI()

  setTimeout(moveSnake, speed)
}

function explode() {

  gameOver = true

  addSprite(snake[0].x, snake[0].y, boom)

  tune`
250: E5,
250: D5,
500: C5
`

  clearText()

  addText("GAME OVER", {
    x: 1,
    y: 0,
    color: color`2`
  })

  addText("HIGH " + highScore, {
    x: 1,
    y: 1,
    color: color`4`
  })
}

function restartCheck() {
  if (gameOver) {
    startGame()
  }
}

onInput("w", () => {
  restartCheck()
  if (direction != "down") direction = "up"
})

onInput("s", () => {
  restartCheck()
  if (direction != "up") direction = "down"
})

onInput("a", () => {
  restartCheck()
  if (direction != "right") direction = "left"
})

onInput("d", () => {
  restartCheck()
  if (direction != "left") direction = "right"
})

onInput("i", restartCheck)
onInput("j", restartCheck)
onInput("k", restartCheck)
onInput("l", restartCheck)

startGame()