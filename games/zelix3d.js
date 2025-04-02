/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Zelix 2D
@author: Zenneth
@tags: [#jumping]
@addedOn: 2024-00-00

press a and d to move the platorm, spam j to jump less high, if you touch the top of the screen you loose
*/
const BALL = "p"
const PLATFORM = "x"
const DOT = "d"

setLegend(
  [ BALL, bitmap`
..3333..
.333333.
33333333
33333333
33333333
33333333
.333333.
..3333..
` ],
  [ PLATFORM, bitmap`
44444444
44444444
` ],
  [ DOT, bitmap`
2
` ]
)

const level = map`
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
`
setMap(level)
setSolids([ PLATFORM ])

let gridWidth = 16
let gridHeight = 16
let platformY = 12
let platformGapWidth = 4
let platformGapX = 6
let ballPos = { x: 8, y: 0 }
let ballVel = 0
let gravity = 0.2
let bounceSpeed = -1.5
let score = 0
let gameOver = false

let ballSprite = addSprite(Math.floor(ballPos.x), Math.floor(ballPos.y), BALL)
clearText()
addText("Score: " + score, { x: 1, y: 1, color: color`3` })
let prevTile = { x: Math.floor(ballPos.x), y: Math.floor(ballPos.y) }

function generateDottedLine() {
  let dots = getAll(DOT)
  for (let d of dots) { d.remove() }
  let dotX = platformGapX + Math.floor(platformGapWidth / 2)
  for (let y = 0; y < platformY; y++) {
    if (y % 2 === 0) {
      let wrappedX = ((dotX % gridWidth) + gridWidth) % gridWidth
      addSprite(wrappedX, y, DOT)
    }
  }
}

function generatePlatform() {
  for (let x = 0; x < gridWidth; x++) {
    let sprites = getTile(x, platformY)
    for (let s of sprites) { if (s.type === PLATFORM) s.remove() }
    if (x < platformGapX || x >= platformGapX + platformGapWidth) {
      addSprite(x, platformY, PLATFORM)
    }
  }
  generateDottedLine()
}

generatePlatform()

function updateGame() {
  if (gameOver) return
  ballVel += gravity
  ballPos.y += ballVel
  if (ballPos.y < 0) {
    if (ballSprite) { ballSprite.remove(); ballSprite = undefined }
    clearText()
    addText("Game Over!\nScore: " + score + "\nPress L to reset", { x: 4, y: 8, color: color`3` })
    gameOver = true
    clearInterval(gameInterval)
    return
  }
  if (ballPos.y >= gridHeight) {
    score++
    clearText()
    addText("Score: " + score, { x: 1, y: 1, color: color`3` })
    platformGapX = Math.floor(Math.random() * (gridWidth - platformGapWidth))
    generatePlatform()
    getAll(BALL).forEach(s => s.remove())
    ballPos.y = platformY - 5
    ballVel = 0
    ballSprite = addSprite(Math.floor(ballPos.x), Math.floor(ballPos.y), BALL)
    prevTile = { x: Math.floor(ballPos.x), y: Math.floor(ballPos.y) }
    return
  }
  let newTileX = Math.floor(ballPos.x)
  let newTileY = Math.floor(ballPos.y)
  if (newTileX !== prevTile.x || newTileY !== prevTile.y) {
    clearTile(prevTile.x, prevTile.y)
    prevTile.x = newTileX
    prevTile.y = newTileY
  }
  if (!ballSprite) { ballSprite = addSprite(newTileX, newTileY, BALL) }
  else { ballSprite.x = newTileX; ballSprite.y = newTileY }
  if (newTileY >= platformY && ballVel > 0) {
    let ballCol = newTileX
    if (ballCol < platformGapX || ballCol >= platformGapX + platformGapWidth) {
      ballVel = bounceSpeed
      bounceSpeed -= 0.75
    }
  }
}

function resetGame() {
  clearText()
  platformGapX = 6
  ballPos = { x: 8, y: 0 }
  ballVel = 0
  bounceSpeed = -1.5
  score = 0
  gameOver = false
  generatePlatform()
  getAll(BALL).forEach(s => s.remove())
  ballSprite = addSprite(Math.floor(ballPos.x), Math.floor(ballPos.y), BALL)
  prevTile = { x: Math.floor(ballPos.x), y: Math.floor(ballPos.y) }
  addText("Score: " + score, { x: 1, y: 1, color: color`3` })
  gameInterval = setInterval(updateGame, 50)
}

onInput("a", () => {
  if (gameOver) return
  platformGapX = (platformGapX - 1 + gridWidth) % gridWidth
  generatePlatform()
})
onInput("d", () => {
  if (gameOver) return
  platformGapX = (platformGapX + 1) % gridWidth
  generatePlatform()
})
onInput("k", () => {
  if (gameOver) return
  if (bounceSpeed + 0.25 > -0.5) {
    bounceSpeed = -0.5
  } else {
    bounceSpeed += 0.25
  }
})
onInput("l", () => {
  if (gameOver) resetGame()
})

let gameInterval = setInterval(updateGame, 50)
