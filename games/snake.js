const player = "p"
const food = "f"
const wall = "w"
const powerup1 = "u"
const powerup2 = "v"
const powerup3 = "x"
const powerup4 = "y"
const body = "b"

let score = 0
let gameOver = false

setLegend(
  [ player, bitmap`
4444444444444444
4444444444444444
4440044444400444
4440244444402444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ food, bitmap`
........444.....
......33344.....
.....3333333....
....3333333333..
...333333333333.
...333333333333.
...333333333333.
...333333333333.
....33333333333.
....33333333333.
....3333333333..
.....333333333..
.....33333333...
.......333......
................
................` ],
  [ wall, bitmap`
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
0000000000000000` ],
  [ powerup1, bitmap`
........444.....
......66644.....
.....6666666....
....6666666666..
...666666666666.
...666666666666.
...666666666666.
...666666666666.
....66666666666.
....66666666666.
....6666666666..
.....666666666..
.....66666666...
.......666......
................
................` ],
  [ powerup2, bitmap`
  ........444.....
......66644.....
.....6666666....
....6666666666..
...666666666666.
...666666666666.
...666666666666.
...666666666666.
....66666666666.
....66666666666.
....6666666666..
.....666666666..
.....66666666...
.......666......
................
................` ],
  [ powerup3, bitmap`
  ........444.....
......66644.....
.....6666666....
....6666666666..
...666666666666.
...666666666666.
...666666666666.
...666666666666.
....66666666666.
....66666666666.
....6666666666..
.....666666666..
.....66666666...
.......666......
................
................` ],
  [ powerup4, bitmap`
  ........444.....
......66644.....
.....6666666....
....6666666666..
...666666666666.
...666666666666.
...666666666666.
...666666666666.
....66666666666.
....66666666666.
....6666666666..
.....666666666..
.....66666666...
.......666......
................
................` ],
  [ body, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ]
)

const walls = [
  map`
wwwwwwwwwwwwwwwwww
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
w................w
wwwwwwwwwwwwwwwwww`
]

let currentLevel = 0
setMap(walls[currentLevel])
setSolids([ player, body, wall ])

let snakePositions = []
let direction = "d"
let nextDirection = "d"

function initializeSnake() {
  getAll().forEach(sprite => sprite.remove())
  snakePositions = []
  score = 0
  gameOver = false
  direction = "d"
  nextDirection = "d"
  const startX = 6
  const startY = 6
  addSprite(startX, startY, player)
  addSprite(startX - 1, startY, body)
  addSprite(startX - 2, startY, body)
  snakePositions = [
    { x: startX, y: startY, type: player },
    { x: startX - 1, y: startY, type: body },
    { x: startX - 2, y: startY, type: body }
  ]
  clearText()
  spawnFood()
}

function spawnFood() {
  getAll(food).forEach(f => f.remove())
  const emptyTiles = []
  for (let x = 2; x < width() - 2; x++) {
    for (let y = 2; y < height() - 2; y++) {
      if (getTile(x, y).length === 0) {
        emptyTiles.push({ x, y })
      }
    }
  }
  if (emptyTiles.length > 0) {
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    addSprite(randomTile.x, randomTile.y, food)
  }
}

function spawnPowerup() {
  getAll(powerup1).forEach(p => p.remove())
  getAll(powerup2).forEach(p => p.remove())
  getAll(powerup3).forEach(p => p.remove())
  getAll(powerup4).forEach(p => p.remove())
  const emptyTiles = []
  for (let x = 2; x < width() - 2; x++) {
    for (let y = 2; y < height() - 2; y++) {
      if (getTile(x, y).length === 0) {
        emptyTiles.push({ x, y })
      }
    }
  }
  if (emptyTiles.length > 0 && Math.random() < 0.5) {
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    const powerups = [powerup1, powerup1, powerup2, powerup2, powerup3, powerup4]
    const selectedPowerup = powerups[Math.floor(Math.random() * powerups.length)]
    addSprite(randomTile.x, randomTile.y, selectedPowerup)
  }
}

function moveSnake() {
  if (gameOver) return

  direction = nextDirection
  
  let newX = snakePositions[0].x
  let newY = snakePositions[0].y
  
  switch(direction) {
    case "w": newY -= 1; break
    case "s": newY += 1; break
    case "a": newX -= 1; break
    case "d": newX += 1; break
  }

  if (newX < 2 || newX >= width() - 2 || newY < 2 || newY >= height() - 2) {
    gameOver = true
    addText("Game Over!", { y: 6, color: color`3` })
    return
  }

  const hitSelf = snakePositions.slice(1).some(pos => pos.x === newX && pos.y === newY)
  
  if (hitSelf) {
    gameOver = true
    addText("Game Over!", { y: 6, color: color`3` })
    return
  }

  const tileContents = getTile(newX, newY)
  const foodTile = tileContents.find(sprite => sprite.type === food)
  const powerupTile = tileContents.find(sprite => 
    sprite.type === powerup1 || 
    sprite.type === powerup2 || 
    sprite.type === powerup3 || 
    sprite.type === powerup4
  )
  
  let growSnake = false
  if (foodTile) {
    growSnake = true
    foodTile.remove()
    score += 10
    spawnFood()
    spawnPowerup()
  }

  if (powerupTile) {
    powerupTile.remove()
    score += 50
  }

  getAll(player).forEach(s => s.remove())
  getAll(body).forEach(s => s.remove())

  if (!growSnake) {
    snakePositions.pop()
  }

  snakePositions.unshift({ x: newX, y: newY, type: player })

  snakePositions.forEach((pos, index) => {
    addSprite(pos.x, pos.y, index === 0 ? player : body)
  })

  clearText()
  addText(`Score: ${score}`, { y: 1, color: color`4` })
}

onInput("w", () => {
  if (direction !== "s") nextDirection = "w"
})

onInput("s", () => {
  if (direction !== "w") nextDirection = "s"
})

onInput("a", () => {
  if (direction !== "d") nextDirection = "a"
})

onInput("d", () => {
  if (direction !== "a") nextDirection = "d"
})

onInput("j", () => {
  if (gameOver) {
    initializeSnake()
  }
})

initializeSnake()
const gameInterval = setInterval(() => {
  if (Math.random() < 0.1) spawnPowerup()
}, 5000)

setInterval(moveSnake, 200)
