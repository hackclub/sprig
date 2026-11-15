
/*
@title: pong-2player
@description: Classic Pong
@author: techcode1245
@tags: ['pong', '2player']
@addedOn: 2026-11-15
*/

const leftPlayer = "p"
const rightPlayer = "q"
const ball = "b"
const center = "c"
const wall = "w"
const obstacle = "o"

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

  [obstacle, bitmap`
................
................
................
................
......3333......
.....333333.....
....33333333....
....33333333....
....33333333....
.....333333.....
......3333......
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
// right side controls for the right player

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
const winningScore = 5

let ballSprite

let speedLevel = 1
let speedTimer = 0
let obstacleTimer = 0

function showScore() {

  addText(`${score1}     ${score2}`, {
    x: 6,
    y: 1,
    color: color`3`
  })

}

function checkWinner() {

  if (score1 >= winningScore) {

    gameStarted = false
    clearText()

    addText("LEFT WINS!", {
      x: 5,
      y: 9,
      color: color`3`
    })

    addText("RIGHT LOSES", {
      x: 5,
      y: 9,
      color: color`3`
    })

  } else if (score2 >= winningScore) {

    gameStarted = false
    clearText()

    addText("RIGHT WINS!", {
      x: 5,
      y: 9,
      color: color`3`
    })

    addText("LEFT LOSES", {
      x: 5,
      y: 9,
      color: color`3`
    })

  }

}

function addObstacles() {

  const x = Math.floor(Math.random() * 8) + 4
  const y = Math.floor(Math.random() * 10) + 3

  addSprite(x, y, obstacle)

}
function moveObstacles() {

  const obstacles = getAll(obstacle)

  obstacles.forEach(s => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ]
    const direction = directions[
      Math.floor(Math.random() * directions.length)
    ]

    const nextX = s.x + direction[0]
    const nextY = s.y + direction[1]

    if (
      nextX >= 3 &&
      nextX <= 12 &&
      nextY >= 2 &&
      nextY <= 13
    ) {
      s.x = nextX
      s.y = nextY
    }
  })
}
function startGame() {

  gameStarted = true

  score1 = 0
  score2 = 0

  speedLevel = 1
  speedTimer = 0
  obstacleTimer = 0

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

  addObstacles()

  addSprite(ballX, ballY, ball)
  ballSprite = getFirst(ball)

  showScore()

}

//  ball movement and collision stuff: do it today only

function moveBall() {

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
  if (dx > 0 && nextX === 13) {

    const right = getAll(rightPlayer)

    if (right.some(s => s.y === nextY)) {
      dx = -1
    }
  }

  const obstacles = getAll(obstacle)

  if (obstacles.some(s => s.x === nextX && s.y === nextY)) {

    dx *= -1
    dy *= -1

    nextX = ballX + dx
    nextY = ballY + dy

  }
  // computer when in only 1 player game

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
  // player missed the ball! (noob)
  if (ballX <= 0) {

    score2++

    checkWinner()

    if (gameStarted) {

      clearText()
      showScore()

      ballX = 8
      ballY = 8

      dx = 1
      dy = 1

    }
  }
  if (ballX >= 15) {

    score1++

    checkWinner()

    if (gameStarted) {

      clearText()
      showScore()

      ballX = 8
      ballY = 8

      dx = -1
      dy = -1

    }

  }

  if (gameStarted) {
    ballSprite.x = ballX
    ballSprite.y = ballY
  }

}

setInterval(() => {

  if (!gameStarted) return

  speedTimer++
  obstacleTimer++
  //  ball speedincreased every10 seconds

  if (speedTimer >= 10) {

    speedTimer = 0

    if (speedLevel < 4) {
      speedLevel++
    }

    clearText()
    showScore()

    addText(`SPEED ${speedLevel}`, {
      x: 5,
      y: 3,
      color: color`3`
    })

  }
  // random ball obstacle should change direction every few seconds

  if (obstacleTimer >= 4) {
    obstacleTimer = 0
    moveObstacles()
  }

  for (let i = 0; i < speedLevel; i++) {

    if (gameStarted) {
      moveBall()
    }

  }

}, 180)
