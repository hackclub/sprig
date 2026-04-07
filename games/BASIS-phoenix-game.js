/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: BASIS phoenix game
@description: A Flappy-bird inspired phoenix game.
@author: FYC23
@tags: ['arcade', 'flappy']
@addedOn: 2025-00-00
*/

// Sprite definitions
const player = "p"
const pencilTop = "t"
const pencilBottom = "b"
const shieldPickup = "s"

// Game state variables
let score = 0
let shields = 0
let gameRunning = false
let gameLoopId = null
let pencilsPassed = 0
let tickCount = 0
let currentSpeed = 125
let lastSpeedUpdate = 0

const GRAVITY_INTERVAL = 8      // Apply gravity every N ticks
const SCROLL_INTERVAL = 5       // Scroll pencils every N ticks
const SPAWN_INTERVAL = 20       // Spawn new pencil pair every N ticks
const FLAP_POWER = 2
const GAME_SPEED = 50           // ms between ticks (starting speed) - 20 FPS
const MIN_SPEED = 25            // Minimum speed (fastest the game can get) - 40 FPS
const SPEED_DECREASE = 2        // Decrease speed by this much
const SPEED_UPDATE_INTERVAL = 10 // Update speed every N pencils
const GAP_SIZE = 4              // Size of gap between pencils
const SHIELD_EVERY = 8          // Spawn shield every N pencil pairs

setLegend(
  [ player, bitmap`
................
.6..............
663.............
6333......6.....
69933....6.66...
.699333..66933..
.6699333..99303.
...6993333.33366
...66999333393C.
....6693333993C.
.66.333339999C..
699933999933C...
.663333333CC....
.....CCCCC......
................
................` ],
  [ pencilTop, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
06LLLLLLLLLLLL60
06LLLLLLLLLLLL60
0666666006666660
0666660..0666660
066660....066660
00000......00000` ],
  [ pencilBottom, bitmap`
00000......00000
066660....066660
0666660..0666660
0666666006666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0888888888888880
0888888888888880
0888888888888880
0000000000000000` ],
  [ shieldPickup, bitmap`
................
.....777777.....
....77777777....
...7777777777...
..777777777777..
..777777777777..
..777755557777..
..777755557777..
..777755557777..
..777755557777..
...7775555777...
....77555577....
.....775577.....
......7777......
.......77.......
................` ]
)

// Create the game map - 10 wide, 8 tall
const gameMap = map`
..........
..........
..........
p.........
..........
..........
..........
..........`

setMap(gameMap)

// No solids needed - we handle collision manually
setSolids([])

// No pushables needed
setPushables({})

// Update the UI display
function updateUI() {
  clearText()
  addText(`Score: ${score}`, { x: 0, y: 0, color: color`6` })
  addText(`Shields: ${shields}`, { x: 10, y: 0, color: color`7` })
}

// Check for collisions
function checkCollisions() {
  const phoenix = getFirst(player)
  if (!phoenix) return false
  
  const phoenixX = phoenix.x
  const phoenixY = phoenix.y
  
  // Check boundary collision (top and bottom)
  if (phoenixY < 0 || phoenixY >= height()) {
    return true // Game over
  }
  
  // Check collision with pencils
  const spritesAtPhoenix = getTile(phoenixX, phoenixY)
  
  for (const sprite of spritesAtPhoenix) {
    if (sprite.type === pencilTop || sprite.type === pencilBottom) {
      if (shields > 0) {
        // Use shield and remove the pencil
        shields--
        sprite.remove()
        updateUI()
        return false // Protected by shield
      } else {
        return true // Game over
      }
    }
    
    if (sprite.type === shieldPickup) {
      // Collect shield (max 9)
      if (shields < 9) {
        shields++
      }
      sprite.remove()
      updateUI()
    }
  }
  
  return false
}

// Spawn a pair of pencils at the right edge with a random gap
function spawnPencilPair() {
  const mapWidth = width()
  const mapHeight = height()
  const spawnX = mapWidth - 1
  
  // Random gap position (ensure gap fits within map)
  const minGapStart = 1
  const maxGapStart = mapHeight - GAP_SIZE - 1
  const gapStart = Math.floor(Math.random() * (maxGapStart - minGapStart + 1)) + minGapStart
  
  // Spawn top pencils (above gap)
  for (let y = 0; y < gapStart; y++) {
    addSprite(spawnX, y, pencilTop)
  }
  
  // Spawn bottom pencils (below gap)
  for (let y = gapStart + GAP_SIZE; y < mapHeight; y++) {
    addSprite(spawnX, y, pencilBottom)
  }
  
  // Track pencils for shield spawning
  pencilsPassed++
  
  // Spawn shield every SHIELD_EVERY pencil pairs
  if (pencilsPassed % SHIELD_EVERY === 0) {
    const shieldY = gapStart + Math.floor(GAP_SIZE / 2)
    addSprite(spawnX, shieldY, shieldPickup)
  }
}

// Move all pencils and shields to the left
function scrollObstacles() {
  const allPencilsTop = getAll(pencilTop)
  const allPencilsBottom = getAll(pencilBottom)
  const allShields = getAll(shieldPickup)
  
  const phoenix = getFirst(player)
  const phoenixX = phoenix ? phoenix.x : 0
  
  // Track which x positions had pencils before moving
  const pencilXPositions = new Set()
  for (const p of allPencilsTop) {
    pencilXPositions.add(p.x)
  }
  for (const p of allPencilsBottom) {
    pencilXPositions.add(p.x)
  }
  
  // Move pencils left
  for (const pencil of allPencilsTop) {
    if (pencil.x <= 0) {
      pencil.remove()
    } else {
      // Check if pencil is passing the phoenix (for scoring)
      if (pencil.x === phoenixX + 1) {
        // Will add score when any pencil from this column passes
      }
      pencil.x -= 1
    }
  }
  
  for (const pencil of allPencilsBottom) {
    if (pencil.x <= 0) {
      pencil.remove()
    } else {
      pencil.x -= 1
    }
  }
  
  // Move shields left
  for (const shield of allShields) {
    if (shield.x <= 0) {
      shield.remove()
    } else {
      shield.x -= 1
    }
  }
  
  // Score when pencils pass the phoenix
  // Check if any pencil column just passed the phoenix
  for (const oldX of pencilXPositions) {
    if (oldX - 1 === phoenixX) {
      score++
      updateUI()
      
      // Update game speed every SPEED_UPDATE_INTERVAL pencils
      if (score > 0 && score % SPEED_UPDATE_INTERVAL === 0 && score !== lastSpeedUpdate) {
        lastSpeedUpdate = score
        if (currentSpeed > MIN_SPEED) {
          currentSpeed = Math.max(MIN_SPEED, currentSpeed - SPEED_DECREASE)
          // Restart interval with new speed
          if (gameLoopId) {
            clearInterval(gameLoopId)
            gameLoopId = setInterval(gameLoop, currentSpeed)
          }
        }
      }
      
      break // Only count once per column
    }
  }
}

// Apply gravity to phoenix
function applyGravity() {
  const phoenix = getFirst(player)
  if (phoenix && phoenix.y < height() - 1) {
    phoenix.y += 1
  }
}

// Main game loop
function gameLoop() {
  if (!gameRunning) return
  
  tickCount++
  
  // Apply gravity periodically
  if (tickCount % GRAVITY_INTERVAL === 0) {
    applyGravity()
  }
  
  // Scroll obstacles periodically
  if (tickCount % SCROLL_INTERVAL === 0) {
    scrollObstacles()
  }
  
  // Spawn new pencil pairs periodically
  if (tickCount % SPAWN_INTERVAL === 0) {
    spawnPencilPair()
  }
  
  // Check for collisions
  if (checkCollisions()) {
    gameOver()
    return
  }
}

// Start the game
function startGame() {
  if (gameRunning) return
  
  // Reset game state
  score = 0
  shields = 0
  pencilsPassed = 0
  tickCount = 0
  currentSpeed = GAME_SPEED
  lastSpeedUpdate = 0
  gameRunning = true
  
  // Reset map
  setMap(gameMap)
  
  // Update UI
  updateUI()
  
  // Start game loop
  gameLoopId = setInterval(gameLoop, currentSpeed)
}

// End the game
function gameOver() {
  gameRunning = false
  
  if (gameLoopId) {
    clearInterval(gameLoopId)
    gameLoopId = null
  }
  
  clearText()
  addText("GAME OVER!", { x: 5, y: 3, color: color`3` })
  addText(`Score: ${score}`, { x: 6, y: 5, color: color`6` })
  addText(`Press J`, { x: 6, y: 7, color: color`2` })
  addText(`to restart`, { x: 4, y: 8, color: color`2` })
}

// Input: W to flap
onInput("w", () => {
  if (!gameRunning) {
    startGame()
    return
  }
  
  const phoenix = getFirst(player)
  if (phoenix) {
    // Flap up
    phoenix.y = Math.max(0, phoenix.y - FLAP_POWER)
  }
})

// Input: J to restart
onInput("j", () => {
  if (!gameRunning) {
    startGame()
  }
})

// After input check
afterInput(() => {
  if (gameRunning && checkCollisions()) {
    gameOver()
  }
})

// Initial UI - show start message
clearText()
addText("FLAPPY PHOENIX", { x: 2, y: 2, color: color`6` })
addText("Press W to", { x: 4, y: 4, color: color`2` })
addText("start & flap!", { x: 3, y: 5, color: color`2` })
addText("Collect shields", { x: 2, y: 7, color: color`7` })
addText("for protection!", { x: 2, y: 8, color: color`7` })
addText("Max 9 shields!", { x: 2, y: 10, color: color`7` })
