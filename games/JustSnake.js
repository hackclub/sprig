/*
@title: just_snake
@author: jonasvanleeuwen19
@tags: ['snake', 'classic']
@addedOn: 2026-07-27
*/

const head_up = "u"
const head_down = "n"
const head_left = "l"
const head_right = "r"
const body = "b"
const apple = "a"
const bg = "g"
const wall = "w"

const eatSfx = tune`
200: c5~200,
400`

const loseSfx = tune`
150: c4~150,
150: c3~150,
300`

const restartSfx = tune`
120: g5~120,
120`

const bgm = tune`
200: c4~200,
200: e4~200,
200: g4~200,
200: e4~200,
200: c4~200,
200: e4~200,
200: g4~200,
200: b4~200,
200: a4~200,
200: g4~200,
200: e4~200,
200: c4~200`

let playback

setLegend(
  [head_up, bitmap`
.....000000.....
...0006666000...
..006666666600..
.00666666666600.
.06660666606660.
0066020660206600
0666000660006660
0666606666066660
0666666666666660
0666666666666660
0066666666666600
.06666666666660.
.00666666666600.
..006666666600..
...0006666000...
.....000000.....`],
  [head_down, bitmap`
.....000000.....
...0006666000...
..006666666600..
.00666666666600.
.06666666666660.
0066666666666600
0666666666666660
0666666666666660
0666606666066660
0666000660006660
0066020660206600
.06660666606660.
.00666666666600.
..006666666600..
...0006666000...
.....000000.....`],
  [head_left, bitmap`
.....000000.....
...0006666000...
..006666666600..
.00666666666600.
.06660066666660.
0066020066666600
0666600666666660
0666666666666660
0666666666666660
0666600666666660
0066020066666600
.06660066666660.
.00666666666600.
..006666666600..
...0006666000...
.....000000.....`],
  [head_right, bitmap`
.....000000.....
...0006666000...
..006666666600..
.00666666666600.
.06666666006660.
0066666600206600
0666666660066660
0666666666666660
0666666666666660
0666666660066660
0066666600206600
.06666666006660.
.00666666666600.
..006666666600..
...0006666000...
.....000000.....`],
  [body, bitmap`
.....000000.....
...000HHHH000...
..00HHHHHHHH00..
.00HHHHHHHHHH00.
.0HHHHHHHHHHHH0.
00HHHHHHHHHHHH00
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
00HHHHHHHHHHHH00
.0HHHHHHHHHHHH0.
.00HHHHHHHHHH00.
..00HHHHHHHH00..
...000HHHH000...
.....000000.....`],
  [apple, bitmap`
.........000....
......0.044400..
.......04444440.
...000.0440000..
..033300003330..
.03333333333330.
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
.03333333333330.
.03333333333330.
..033333333330..
...0033333300...
.....000000.....`],
[bg, bitmap`
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD
44444444DDDDDDDD`],
[wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`]
)

setBackground(bg)

let snake, dx, dy, gameOver

function startGame() {
  playTune(restartSfx)
  snake = [
    {x: 5, y: 5},
    {x: 4, y: 5},
    {x: 3, y: 5}
  ]

  dx = 1
  dy = 0
  gameOver = false

  clearText()

  setMap(map`
wwwwwwwwwwww
w..........w
w..........w
w..........w
w..........w
w..........w
w..........w
w..........w
w..........w
w..........w
wwwwwwwwwwww`)

  spawnApple()
  drawSnake()
  playback = playTune(bgm, Infinity)
}

function spawnApple() {
  while (true) {
    let x = Math.floor(Math.random() * width())
    let y = Math.floor(Math.random() * height())

    let occupied = snake.some(s => s.x === x && s.y === y)
    let wallHere = getTile(x, y).some(s => s.type === wall)

    if (!occupied && !wallHere) {
      addSprite(x, y, apple)
      break
    }
  }
}

function drawSnake() {
  getAll(head_up).forEach(s => s.remove())
  getAll(head_down).forEach(s => s.remove())
  getAll(head_left).forEach(s => s.remove())
  getAll(head_right).forEach(s => s.remove())
  getAll(body).forEach(s => s.remove())

  let headType =
    dx === 1 ? head_right :
    dx === -1 ? head_left :
    dy === -1 ? head_up :
    head_down

  addSprite(snake[0].x, snake[0].y, headType)

  for (let i = 1; i < snake.length; i++) {
    addSprite(snake[i].x, snake[i].y, body)
  }
}

function moveSnake() {
  if (gameOver) return

  const newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  }

  if (
    newHead.x < 0 ||
    newHead.x >= width() ||
    newHead.y < 0 ||
    newHead.y >= height()
  ) return lose()

  if (getTile(newHead.x, newHead.y).some(s => s.type === wall))
    return lose()

  if (snake.some(s => s.x === newHead.x && s.y === newHead.y))
    return lose()

  snake.unshift(newHead)

  if (getTile(newHead.x, newHead.y).some(s => s.type === apple)) {
    getAll(apple).forEach(a => a.remove())
    playTune(eatSfx)
    spawnApple()
  } else {
    snake.pop()
  }

  drawSnake()

  clearText()
  addText("Score: " + (snake.length - 3), {
    x: 5,
    y: 0,
    color: color`2`
  })
}

function lose() {
  gameOver = true
  clearText()
  playback.end()
  addText("GAME OVER", { x: 5, y: 0, color: color`2` })
  addText("Press J", { x: 6, y: 15, color: color`2` })
  playTune(loseSfx)
}

onInput("w", () => { if (dy !== 1) { dx = 0; dy = -1 } })
onInput("s", () => { if (dy !== -1) { dx = 0; dy = 1 } })
onInput("a", () => { if (dx !== 1) { dx = -1; dy = 0 } })
onInput("d", () => { if (dx !== -1) { dx = 1; dy = 0 } })

onInput("j", () => startGame())

startGame()
setInterval(moveSnake, 250)
