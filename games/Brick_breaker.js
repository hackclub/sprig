/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Brick_Breaker
@description: classic single-player brick breaker game! Control the paddle to bounce the ball and clear all bricks to win!
@author: Samar mane
@tags: ["arcade", "single-player", "brick breaker", "breakout"]
@addedOn: 07/06/2025
*/
const paddle = "p"
const ball = "b"
const brick = "r"
const wall = "w"
const background = "g" 

const paddle_hit = tune`
150: C4/150,
150: E4~150,
4500`

const brick_break = tune`
100: G4/100,
100: C5/100,
200`

const wall_bounce = tune`
100: F3/100,
200`

const game_over = tune`
300: C3/300,
300: G2/300,
300: F2/300,
600`

const victory = tune`
200: C4/200,
200: E4/200,
200: G4/200,
200: C5/200,
200: E5/200,
400`

setLegend(
  [paddle, bitmap`
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
5555555555555555
5555555555555555
5555555555555555`],

  [ball, bitmap`
................
................
................
................
................
.....FFFFFF.....
....FFFFFFFF....
....FFFFFFFF....
....FFFFFFFF....
....FFFFFFFF....
.....FFFFFF.....
................
................
................
................
................`],

  [brick, bitmap`
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
3333333333333333`],

  [wall, bitmap`
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
0000000000000000`],

  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setSolids([wall])
setBackground(background)

let ballVelocityX = 1
let ballVelocityY = -1
let gameRunning = false
let gameWon = false
let gameOver = false
let bricksRemaining = 0

const level = map`
wwwwwwwwwwwwwwww
wggggggggggggggw
wgrrrrrrrrrrrrgw
wgrrrrrrrrrrrrgw
wgrrrrrrrrrrrrgw
wgrrrrrrrrrrrrgw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wggggggggggggggw
wgggggbggggggggw
wggggggpppgggggw
wwwwwwwwwwwwwwww`

function initGame() {
  setMap(level)
  ballVelocityX = 1
  ballVelocityY = -1
  gameRunning = false
  gameWon = false
  gameOver = false
  bricksRemaining = getAll(brick).length
  updateUI()
}

function updateUI() {
  clearText()
  addText(`Bricks: ${bricksRemaining}`, { x: 1, y: 1, color: color`3` })
  
  if (!gameRunning && !gameWon && !gameOver) {
    addText("Press W to start", { x: 2, y: 8, color: color`F` })
    addText("A/D to move paddle", { x: 2, y: 9, color: color`2` })
  }
  
  if (gameWon) {
    addText("YOU WIN!", { x: 6, y: 7, color: color`4` })
    addText("Press I to restart", { x: 3, y: 8, color: color`2` })
  }
  
  if (gameOver) {
    addText("GAME OVER", { x: 5, y: 7, color: color`3` })
    addText("Press I to restart", { x: 3, y: 8, color: color`2` })
  }
}

function moveBall() {
  if (!gameRunning || gameWon || gameOver) return
  
  const ballSprite = getFirst(ball)
  if (!ballSprite) return
  
  const newX = ballSprite.x + ballVelocityX
  const newY = ballSprite.y + ballVelocityY
  
  if (newX <= 0 || newX >= width() - 1) {
    ballVelocityX = -ballVelocityX
    playTune(wall_bounce)
    return
  }
  
  if (newY <= 0) {
    ballVelocityY = -ballVelocityY
    playTune(wall_bounce)
    return
  }
  
  if (newY >= height() - 1) {
    gameOver = true
    gameRunning = false
    playTune(game_over)
    updateUI()
    return
  }
  
  const tilesAtNewPos = getTile(newX, newY)
  const brickHit = tilesAtNewPos.find(sprite => sprite.type === brick)
  
  if (brickHit) {
    brickHit.remove()
    bricksRemaining--
    ballVelocityY = -ballVelocityY
    playTune(brick_break)
    
    if (bricksRemaining === 0) {
      gameWon = true
      gameRunning = false
      playTune(victory)
      updateUI()
      return
    }
    
    updateUI()
    return
  }
  
  const paddleHit = tilesAtNewPos.find(sprite => sprite.type === paddle)
  if (paddleHit) {
    ballVelocityY = -ballVelocityY
    
    const paddleSprites = getAll(paddle)
    if (paddleSprites.length > 0) {
      const leftPaddle = paddleSprites[0]
      const rightPaddle = paddleSprites[paddleSprites.length - 1]
      
      if (newX <= leftPaddle.x) {
        ballVelocityX = -1
      } else if (newX >= rightPaddle.x) {
        ballVelocityX = 1
      }
    }
    
    playTune(paddle_hit)
    return
  }
  
  ballSprite.x = newX
  ballSprite.y = newY
}

function movePaddle(direction) {
  if (gameWon || gameOver) return
  
  const paddleSprites = getAll(paddle)
  if (paddleSprites.length === 0) return
  
  const leftmost = paddleSprites[0]
  const rightmost = paddleSprites[paddleSprites.length - 1]
  
  if (direction === -1 && leftmost.x <= 1) return
  if (direction === 1 && rightmost.x >= width() - 2) return
  
  paddleSprites.forEach(paddlePiece => {
    paddlePiece.x += direction
  })
}

initGame()

setInterval(moveBall, 200)

onInput("a", () => {
  movePaddle(-1)
})

onInput("d", () => {
  movePaddle(1)
})

onInput("w", () => {
  if (!gameRunning && !gameWon && !gameOver) {
    gameRunning = true
    updateUI()
  }
})

onInput("s", () => {
  if (!gameRunning && !gameWon && !gameOver) {
    gameRunning = true
    updateUI()
  }
})

onInput("i", () => {
  if (gameWon || gameOver) {
    initGame()
  }
})

onInput("j", () => {
  if (gameWon || gameOver) {
    initGame()
  }
})

onInput("k", () => {
  if (gameWon || gameOver) {
    initGame()
  }
})

onInput("l", () => {
  if (gameWon || gameOver) {
    initGame()
  }
})