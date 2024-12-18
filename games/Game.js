// Define game sprites
setLegend(
  [ p ], // player sprite
  [ '#', bitmap`
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
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
  `], // platform sprite
  [ '@', bitmap`
    0000066666600000
    0000666666660000
    0006666666666000
    0066666666666600
    0066666666666600
    6666666666666666
    6666666666666666
    6666666666666666
    6666666666666666
    6666666666666666
    0066666666666600
    0066666666666600
    0006666666666000
    0000666666660000
    0000066666600000
    0000000000000000
  `] // player sprite
)

// Create the level layout
setMap(`
################
#              #
#    @         #
#  ####        #
#              #
#         #### #
#              #
################
`)

// Game variables
let playerX = 2
let playerY = 2
let velocityY = 0
const gravity = 0.5
let isJumping = false

// Game loop
onInput("w", () => {
  if (!isJumping) {
    velocityY = -4
    isJumping = true
  }
})

onInput("a", () => {
  if (getFirst(playerX - 1, playerY) !== "#") {
    playerX--
  }
})

onInput("d", () => {
  if (getFirst(playerX + 1, playerY) !== "#") {
    playerX++
  }
})

afterInput(() => {
  // Apply gravity
  velocityY += gravity
  
  // Update player position
  if (getFirst(playerX, playerY + velocityY) !== "#") {
    playerY += velocityY
  } else {
    velocityY = 0
    isJumping = false
  }
  
  // Update the game state
  clearTile(playerX, playerY)
  addSprite(playerX, playerY, "@")
})