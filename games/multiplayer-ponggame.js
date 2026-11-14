
/*
@title: pong-2player
@author: techcode-1245
@description: Classic Pong
@tags: ['pong', '2player']
@addedOn: 2026-11-14
*/

const leftPlayer = "p"
const rightPlayer = "q"
const ball = "b"
const center = "c"
const wall = "w"

setLegend(

  [leftPlayer, bitmap`
................
................
................
................
................
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................
................
................`],

  [rightPlayer, bitmap`
................
................
................
................
................
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................
................
................`],

  [ball, bitmap`
................
................
................
................
................
......3333......
......3333......
......3333......
......3333......
................
................
................
................
................
................
................`],

  [center, bitmap`
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................`],

  [wall, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
)

setSolids([])

let gameStarted = false
let gameMode = 1

// setting up the starting screen

setMap(map`
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
................
`)

function showMenu() {

  clearText()

  addText("P O N G", {
    x: 5,
    y: 3,
    color: color`3`
  })

  addText("SELECT MODE", {
    x: 3,
    y: 6,
    color: color`3`
  })

  addText(
    gameMode === 1 ? "> 1 PLAYER" : "  1 PLAYER",
    {
      x: 4,
      y: 9,
      color: color`3`
    }
  )

  addText(
    gameMode === 2 ? "> 2 PLAYER" : "  2 PLAYER",
    {
      x: 4,
      y: 11,
      color: color`3`
    }
  )

  addText("W/S: SELECT", {
    x: 4,
    y: 14,
    color: color`3`
  })

  addText("J: START", {
    x: 5,
    y: 15,
    color: color`3`
  })
}

showMenu()

// menu selection + paddle movement

onInput("w", () => {

  if (!gameStarted) {
    gameMode = 1
    showMenu()
    return
  }

  movePaddle(leftPlayer, -1)
})

onInput("s", () => {

  if (!gameStarted) {
    gameMode = 2
    showMenu()
    return
  }

  movePaddle(leftPlayer, 1)
})

// lets start the game

onInput("j", () => {

  if (!gameStarted) {
    startGame()
  }

})

// okay, here we go again! lets add paddle movement

function movePaddle(type, direction) {

  const paddle = getAll(type)

  if (paddle.length === 0) return

  const minY = Math.min(...paddle.map(s => s.y))
  const maxY = Math.max(...paddle.map(s => s.y))

  if (direction < 0 && minY > 1) {
    paddle.forEach(s => s.y -= 1)
  }

  if (direction > 0 && maxY < 14) {
    paddle.forEach(s => s.y += 1)
  }
}

// right side controls

onInput("i", () => {
  if (gameStarted && gameMode === 2) {
    movePaddle(rightPlayer, -1)
  }
})

onInput("k", () => {
  if (gameStarted && gameMode === 2) {
    movePaddle(rightPlayer, 1)
  }
})

// task 1: do the game setupppppppp!

let ballX = 8
let ballY = 8

let dx = 1
let dy = 1

let score1 = 0
let score2 = 0

let ballSprite

function startGame() {

  gameStarted = true

  clearText()

  setMap(map`
wwwwwwwwwwwwwwww
.......c........
................
.......c........
................
.......c........
.p.....c......q.
.p............q.
.p.....c......q.
................
.......c........
................
.......c........
................
.......c........
wwwwwwwwwwwwwwww
`)

  ballX = 8
  ballY = 8

  dx = 1
  dy = 1

  addSprite(ballX, ballY, ball)
  ballSprite = getFirst(ball)

}

// ball movement and collision stuff

setInterval(() => {

  if (!gameStarted) return

  let nextX = ballX + dx
  let nextY = ballY + dy

  // top and bottom bounce

  if (nextY <= 1 || nextY >= 14) {
    dy *= -1
    nextY = ballY + dy
  }

  // left paddle collision

  if (dx < 0 && nextX === 2) {

    const left = getAll(leftPlayer)

    if (left.some(s => s.y === nextY)) {
      dx = 1
    }
  }

  // right paddle collision

  if (dx > 0 && nextX === 13) {

    const right = getAll(rightPlayer)

    if (right.some(s => s.y === nextY)) {
      dx = -1
    }
  }

  // computer paddle in 1 player mode

  if (gameMode === 1) {

    const right = getAll(rightPlayer)

    if (right.length > 0) {

      const centerY = Math.round(
        right.reduce((sum, s) => sum + s.y, 0) / right.length
      )

      if (centerY < ballY) {
        movePaddle(rightPlayer, 1)
      }

      if (centerY > ballY) {
        movePaddle(rightPlayer, -1)
      }
    }
  }

  ballX = nextX
  ballY = nextY

  // someone missed the ball!

  if (ballX <= 0) {

    score2++

    ballX = 8
    ballY = 8

    dx = 1
    dy = 1

  }

  if (ballX >= 15) {

    score1++

    ballX = 8
    ballY = 8

    dx = -1
    dy = -1

  }

  ballSprite.x = ballX
  ballSprite.y = ballY

}, 180)
