const player = "p"
const platform = "g"
const background = "b"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
.....DDDDDDD....
.....DDDDDDD....
.....D00D00D....
.....D20620D....
.....DDD6DDD....
.....DDDDDDD....
.....D44D44D....
......44.44.....
......44.44.....
......44.44.....
......44.44.....
................`],
  [ platform, bitmap`
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
4444444444444444`],
  [ background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
)

setSolids([player, platform])

// Initialize map with background
let initialMap = map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`

setMap(initialMap)

// Game variables
let playerVelocityY = 0
let cameraY = 0
let score = 0
let gameStarted = false
const gravity = 0.3
const jumpStrength = -6
const maxFallSpeed = 8
const platformGap = 3 // Distance between platform rows

// Create initial player and platforms
addSprite(10, 14, player)
addSprite(8, 15, platform)
addSprite(9, 15, platform)
addSprite(10, 15, platform)
addSprite(11, 15, platform)
addSprite(12, 15, platform)

// Generate initial platforms
function generatePlatforms() {
  // Generate platforms going upward
  for (let y = 12; y >= 0; y -= platformGap) {
    const platformLength = Math.floor(Math.random() * 3) + 2 // 2-4 blocks long
    const startX = Math.floor(Math.random() * (width() - platformLength))
    
    for (let x = startX; x < startX + platformLength; x++) {
      addSprite(x, y, platform)
    }
  }
}

generatePlatforms()

// Game physics loop
function gameLoop() {
  const p = getFirst(player)
  if (!p) return
  
  // Apply gravity
  playerVelocityY += gravity
  if (playerVelocityY > maxFallSpeed) {
    playerVelocityY = maxFallSpeed
  }
  
  // Check for platform collision when falling
  if (playerVelocityY > 0) {
    const belowTiles = getTile(p.x, p.y + 1)
    for (let sprite of belowTiles) {
      if (sprite.type === platform) {
        playerVelocityY = jumpStrength // Bounce!
        gameStarted = true
        break
      }
    }
  }
  
  // Move player vertically
  const newY = p.y + Math.round(playerVelocityY * 0.5)
  
  // Check boundaries and move
  if (newY >= 0 && newY < height()) {
    p.y = newY
  }
  
  // Camera follows player up - shift world down when player gets too high
  if (p.y < 6 && playerVelocityY < 0) {
    // Get all current platforms
    const currentPlatforms = getAll(platform)
    
    // Store platform positions
    const platformPositions = []
    for (let plat of currentPlatforms) {
      platformPositions.push({x: plat.x, y: plat.y})
    }
    
    // Remove all platforms
    for (let plat of currentPlatforms) {
      plat.remove()
    }
    
    // Re-add platforms one row lower
    for (let pos of platformPositions) {
      if (pos.y + 1 < height()) { // Only add if still on screen
        addSprite(pos.x, pos.y + 1, platform)
      }
    }
    
    // Move player down to stay in middle of screen
    p.y += 1
    score += 10
    
    // Add new platform row at the top
    if (Math.random() < 0.7) { // 70% chance of platform
      const platformLength = Math.floor(Math.random() * 4) + 2 // 2-5 blocks
      const startX = Math.floor(Math.random() * (width() - platformLength))
      
      for (let x = startX; x < startX + platformLength; x++) {
        addSprite(x, 0, platform)
      }
    }
  }
  
  // Game over if player falls too far
  if (p.y >= height() - 1) {
    clearText()
    addText("Game Over!", { y: 4, color: color`3` })
    addText(`Score: ${score}`, { y: 6, color: color`3` })
    addText("Press any key", { y: 8, color: color`3` })
    addText("to restart", { y: 9, color: color`3` })
    return
  }
  
  // Update score display
  clearText()
  if (gameStarted) {
    addText(`Score: ${score}`, { y: 1, color: color`2` })
  } else {
    addText("Use A/D to move", { y: 1, color: color`2` })
    addText("Land on platforms", { y: 2, color: color`2` })
    addText("to jump!", { y: 3, color: color`2` })
  }
}

// Start game loop
const gameInterval = setInterval(gameLoop, 80)

// Input handlers
onInput("a", () => {
  const p = getFirst(player)
  if (p && p.x > 0) {
    p.x -= 1
  }
})

onInput("d", () => {
  const p = getFirst(player)
  if (p && p.x < width() - 1) {
    p.x += 1
  }
})

// Screen wrapping
onInput("a", () => {
  const p = getFirst(player)
  if (p && p.x <= 0) {
    p.x = width() - 1
  }
})

onInput("d", () => {
  const p = getFirst(player)
  if (p && p.x >= width() - 1) {
    p.x = 0
  }
})

// Restart game
function restartGame() {
  const p = getFirst(player)
  if (!p || p.y >= height() - 1) {
    // Clear all platforms
    const platforms = getAll(platform)
    for (let platform of platforms) {
      platform.remove()
    }
    
    // Clear all sprites and reset map
    clearTile()
    setMap(initialMap)
    
    // Reset variables
    playerVelocityY = 0
    cameraY = 0
    score = 0
    gameStarted = false
    
    // Recreate player and initial platforms
    addSprite(10, 14, player)
    addSprite(8, 15, platform)
    addSprite(9, 15, platform)
    addSprite(10, 15, platform)
    addSprite(11, 15, platform)
    addSprite(12, 15, platform)
    
    generatePlatforms()
    clearText()
  }
}

onInput("w", restartGame)
onInput("s", restartGame)
onInput("a", () => {
  if (getFirst(player).y >= height() - 1) {
    restartGame()
  }
})
onInput("d", () => {
  if (getFirst(player).y >= height() - 1) {
    restartGame()
  }
})