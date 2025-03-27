const player = "p"
const food = "f"
const wall = "w"
const powerup = "u"
const body = "b"

let score = 0
let gameOver = false

// Game configuration
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
  [ powerup, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
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

// Create walls covering entire screen edges
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

// Initial game setup
let currentLevel = 0
setMap(walls[currentLevel])
setSolids([ player, body, wall ])

// Snake initial state
let snakePositions = []
let direction = "d"
let nextDirection = "d"

// Spawn initial snake
function initializeSnake() {
  // Clear any existing sprites
  getAll().forEach(sprite => sprite.remove())
  
  // Reset game state
  snakePositions = []
  score = 0
  gameOver = false
  direction = "d"
  nextDirection = "d"
  
  // Add initial snake segments in the middle of the play area
  const startX = 6
  const startY = 6
  
  addSprite(startX, startY, player)
  addSprite(startX - 1, startY, body)
  addSprite(startX - 2, startY, body)
  
  // Track snake positions
  snakePositions = [
    { x: startX, y: startY, type: player },
    { x: startX - 1, y: startY, type: body },
    { x: startX - 2, y: startY, type: body }
  ]
  
  // Clear any previous text
  clearText()
  
  // Spawn initial food
  spawnFood()
}

// Spawn food function
function spawnFood() {
  // Remove existing food
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

// Spawn powerup function
function spawnPowerup() {
  // Remove existing powerups
  getAll(powerup).forEach(p => p.remove())
  
  const emptyTiles = []
  for (let x = 2; x < width() - 2; x++) {
    for (let y = 2; y < height() - 2; y++) {
      if (getTile(x, y).length === 0) {
        emptyTiles.push({ x, y })
      }
    }
  }
  
  if (emptyTiles.length > 0 && Math.random() < 0.2) {
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    addSprite(randomTile.x, randomTile.y, powerup)
  }
}

// Move snake function
function moveSnake() {
  if (gameOver) return

  // Update direction
  direction = nextDirection
  
  // Determine new head position based on direction
  let newX = snakePositions[0].x
  let newY = snakePositions[0].y
  
  switch(direction) {
    case "w": newY -= 1; break
    case "s": newY += 1; break
    case "a": newX -= 1; break
    case "d": newX += 1; break
  }
  
  // Check if new position is within map bounds
  if (newX < 2 || newX >= width() - 2 || newY < 2 || newY >= height() - 2) {
    gameOver = true
    addText("Game Over!", { y: 6, color: color`3` })
    return
  }
  
  // Check for self-collision
  const hitSelf = snakePositions.slice(1).some(pos => pos.x === newX && pos.y === newY)
  
  if (hitSelf) {
    gameOver = true
    addText("Game Over!", { y: 6, color: color`3` })
    return
  }
  
  // Check for food
  const tileContents = getTile(newX, newY)
  const foodTile = tileContents.find(sprite => sprite.type === food)
  const powerupTile = tileContents.find(sprite => sprite.type === powerup)
  
  // Remove last body segment
  let growSnake = false
  if (foodTile) {
    growSnake = true
    foodTile.remove()
    score += 10
    spawnFood()
    spawnPowerup()
  }
  
  // Handle powerup collection
  if (powerupTile) {
    powerupTile.remove()
    score += 50
  }
  
  // Remove existing sprites
  getAll(player).forEach(s => s.remove())
  getAll(body).forEach(s => s.remove())
  
  // Update snake positions
  if (!growSnake) {
    snakePositions.pop()
  }
  
  // Add new head
  snakePositions.unshift({ x: newX, y: newY, type: player })
  
  // Redraw snake
  snakePositions.forEach((pos, index) => {
    addSprite(pos.x, pos.y, index === 0 ? player : body)
  })
  
  // Update score
  clearText()
  addText(`Score: ${score}`, { y: 1, color: color`4` })
}

// Input handling
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

// Reset game on "j" key
onInput("j", () => {
  if (gameOver) {
    initializeSnake()
  }
})

// Initial game setup
initializeSnake()

// Game loop
const gameInterval = setInterval(moveSnake, 200)