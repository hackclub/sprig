const car = "C"
const enemy = "E"
const coin = "O"

setLegend(
  [car, bitmap`
................
.....000000.....
....00000000....
...00......00...
...00......00...
...0000000000...
....00000000....
.....000000.....
.....000000.....
....00000000....
...00......00...
...00......00...
................
................
................
................`],

  [enemy, bitmap`
................
.....333333.....
....33333333....
...33......33...
...33......33...
...3333333333...
....33333333....
.....333333.....
.....333333.....
....33333333....
...33......33...
...33......33...
................
................
................
................`],

  [coin, bitmap`
................
................
.....666666.....
....66....66....
...66......66...
...6........6...
...6........6...
...6........6...
...66......66...
....66....66....
.....666666.....
................
................
................
................
................`]
)

const level = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
...C......
`

setMap(level)

let player = getFirst(car)

let score = 0
let best = 0
let gameOver = false
let timer = 0

function scoreText() {
  clearText()
  addText("SCORE: " + score, {
    x: 1,
    y: 1,
    color: color`3`
  })
}

scoreText()

function left() {
  if (gameOver) {
    restart()
    return
  }

  if (player && player.x > 2) {
    player.x--
  }
}

function right() {
  if (gameOver) {
    restart()
    return
  }

  if (player && player.x < 7) {
    player.x++
  }
}

onInput("a", left)
onInput("j", left)
onInput("d", right)
onInput("l", right)

setInterval(() => {
  if (gameOver) return

  if (!player) {
    player = getFirst(car)
    if (!player) return
  }

  timer++

  if (timer >= 5) {
    let lane = Math.floor(Math.random() * 6) + 2

    addSprite(lane, 0, enemy)

    if (Math.random() > 0.5) {
      let coinLane = Math.floor(Math.random() * 6) + 2
      addSprite(coinLane, 0, coin)
    }

    timer = 0
  }

  for (const e of getAll(enemy)) {
    e.y++

    if (e.x === player.x && e.y === player.y) {
      gameOverScreen()
      return
    }

    if (e.y >= 10) {
      e.remove()
      score++
      scoreText()
    }
  }

  for (const c of getAll(coin)) {
    c.y++

    if (c.x === player.x && c.y === player.y) {
      c.remove()
      score += 5
      scoreText()
    }

    if (c.y >= 10) {
      c.remove()
    }
  }
}, 300)

function gameOverScreen() {
  gameOver = true

  if (score > best) {
    best = score
  }

  clearText()

  addText("CRASH!", {
    x: 3,
    y: 3,
    color: color`3`
  })

  addText("SCORE " + score, {
    x: 2,
    y: 5,
    color: color`6`
  })

  addText("BEST " + best, {
    x: 2,
    y: 6,
    color: color`5`
  })

  addText("A / D = AGAIN", {
    x: 1,
    y: 8,
    color: color`2`
  })
}

function restart() {
  setMap(level)

  player = getFirst(car)

  score = 0
  gameOver = false
  timer = 0

  scoreText()
}