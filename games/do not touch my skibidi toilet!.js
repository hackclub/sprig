/*
@title: Hand Dodge
@author: Laurentsandler
@tags: []
@addedOn: 2025-07-19
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

Hand Dodge - Move your hand left and right to avoid the falling hands!
Use A and D to move left and right.
*/

const player = "p"
const fallingHand = "f"
const background = "b"

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
.....CCCCC......
.....CCCCC......
....CCCCCCC.....
....CCCCCCC.....
....CCCCCCC.....
....CCCCCCC.....
....CCCCCCC.....
....CCCCCCC.....
................
................` ],
  [ fallingHand, bitmap`
................
................
....33333.......
....33333.......
....33333.......
....33333.......
....33333.......
....33333.......
...3333333......
...3333333......
...3333333......
...3333333......
................
................
................
................` ],
  [ background, bitmap`
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
0000000000000000` ]
)

setBackground(background)

let level = 0
let score = 0
let gameRunning = true

const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
.....p....`
]

setMap(levels[level])
setSolids([])

// Game variables
let spawnTimer = 0
let spawnDelay = 60 // frames between spawns
let gameSpeed = 1

// Display initial score
addText("Score: 0", { x: 1, y: 1, color: color`2` })
addText("Move with A/D", { x: 1, y: 14, color: color`7` })

// Input handlers
onInput("a", () => {
  if (!gameRunning) return
  
  let p = getFirst(player)
  if (p && p.x > 0) {
    p.x -= 1
  }
})

onInput("d", () => {
  if (!gameRunning) return
  
  let p = getFirst(player)
  if (p && p.x < width() - 1) {
    p.x += 1
  }
})

onInput("w", () => {
  if (!gameRunning) {
    // Restart game
    gameRunning = true
    score = 0
    spawnTimer = 0
    gameSpeed = 1
    
    // Clear all falling hands
    getAll(fallingHand).forEach(hand => hand.remove())
    
    // Reset player position
    setMap(levels[level])
    
    clearText()
    addText("Score: 0", { x: 1, y: 1, color: color`2` })
    addText("Move with A/D", { x: 1, y: 14, color: color`7` })
  }
})

// Game loop
setInterval(() => {
  if (!gameRunning) return
  
  // Spawn falling hands
  spawnTimer++
  if (spawnTimer >= spawnDelay) {
    let randomX = Math.floor(Math.random() * width())
    addSprite(randomX, 0, fallingHand)
    spawnTimer = 0
    
    // Gradually increase difficulty
    if (spawnDelay > 20) {
      spawnDelay -= 0.5
    }
  }
  
  // Move falling hands down
  getAll(fallingHand).forEach(hand => {
    hand.y += 1
    
    // Remove hands that fall off screen and increase score
    if (hand.y >= height()) {
      hand.remove()
      score += 10
      
      // Update score display
      clearText()
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`2` })
      addText("Move with A/D", { x: 1, y: 14, color: color`7` })
    }
  })
  
  // Check collision
  let playerSprite = getFirst(player)
  if (playerSprite) {
    let playerTile = getTile(playerSprite.x, playerSprite.y)
    let hasCollision = playerTile.some(sprite => sprite.type === fallingHand)
    
    if (hasCollision) {
      gameRunning = false
      
      clearText()
      addText("GAME OVER!", { x: 3, y: 6, color: color`3` })
      addText(`Final Score: ${score}`, { x: 1, y: 8, color: color`2` })
      addText("Press W to restart", { x: 1, y: 10, color: color`7` })
    }
  }
}, 100) // Game runs at ~10 FPS for smooth gameplay