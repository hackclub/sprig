/*
@title: Find the Spot
@author: 
@tags: [multiplayer, reflex]
@addedOn: 2025-09-30
*/

// Sprite definitions
const player1 = "p"
const player2 = "q"
const hidden = "h"
const revealed = "r"

// Set up graphics
setLegend(
  [ player1, bitmap`
4444444444444444
4444000000004444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4440000000000444
4444000000004444
4444444444444444` ],
  [ player2, bitmap`
7777777777777777
7777000000007777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7770000000000777
7777000000007777
7777777777777777` ],
  [ hidden, bitmap`
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
................` ],
  [ revealed, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ]
)

setSolids([player1, player2])

// Create empty level
const level = map`
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................
.......................`

setMap(level)

// Game state
let p1Score = 0
let p2Score = 0
let countdown = 6
let canMove = true
let targetPositions = []

// Initialize players
addSprite(3, 8, player1)
addSprite(17, 8, player2)

// Create target tiles (hidden blocks)
function placeHiddenSquare() {
  // Remove any existing target sprites
  getAll(hidden).forEach(sprite => sprite.remove())
  getAll(revealed).forEach(sprite => sprite.remove())
  
  // Reset target positions
  targetPositions = []
  
  // Create new target (2x2 square)
  const x = Math.floor(Math.random() * (width() - 2))
  const y = Math.floor(Math.random() * (height() - 3)) + 2 // Keep away from top HUD area
  
  // Store positions
  targetPositions = [
    {x: x, y: y},
    {x: x+1, y: y},
    {x: x, y: y+1},
    {x: x+1, y: y+1}
  ]
  
  // Add hidden sprites at these positions
  targetPositions.forEach(pos => {
    addSprite(pos.x, pos.y, hidden)
  })
}

// Reveal the hidden target
function revealSquare() {
  // Remove hidden sprites
  getAll(hidden).forEach(sprite => sprite.remove())
  
  // Add revealed sprites
  targetPositions.forEach(pos => {
    addSprite(pos.x, pos.y, revealed)
  })
  
  canMove = false
  
  // Get player positions
  const p1 = getFirst(player1)
  const p2 = getFirst(player2)
  
  // Check if players are on target for points
  const isP1OnTarget = targetPositions.some(pos => pos.x === p1.x && pos.y === p1.y)
  const isP2OnTarget = targetPositions.some(pos => pos.x === p2.x && pos.y === p2.y)
  
  if (isP1OnTarget) p1Score++
  if (isP2OnTarget) p2Score++
  
  updateHUD()
  
  // Start next round after delay
  setTimeout(() => {
    // Remove revealed sprites
    getAll(revealed).forEach(sprite => sprite.remove())
    
    countdown = 6
    canMove = true
    placeHiddenSquare()
    updateHUD()
    tick()
  }, 2000)
}

// Update scores and countdown
function updateHUD() {
  clearText()
  addText(`${p1Score}`, { x: 2, y: 0, color: color`4` })
  addText(`${countdown}`, { x: 10, y: 0, color: color`2` })
  addText(`${p2Score}`, { x: 18, y: 0, color: color`7` })
}

// Timer function
function tick() {
  if (!canMove) return
  
  countdown--
  updateHUD()
  
  if (countdown <= 0) {
    revealSquare()
  } else {
    setTimeout(tick, 1000)
  }
}

// Player controls - fixed to use getFirst() to find the players
onInput("w", () => { 
  if (canMove) getFirst(player1).y -= 1 
})
onInput("s", () => { 
  if (canMove) getFirst(player1).y += 1 
})
onInput("a", () => { 
  if (canMove) getFirst(player1).x -= 1 
})
onInput("d", () => { 
  if (canMove) getFirst(player1).x += 1 
})

onInput("i", () => { 
  if (canMove) getFirst(player2).y -= 1 
})
onInput("k", () => { 
  if (canMove) getFirst(player2).y += 1 
})
onInput("j", () => { 
  if (canMove) getFirst(player2).x -= 1 
})
onInput("l", () => { 
  if (canMove) getFirst(player2).x += 1 
})

// Start game
placeHiddenSquare()
updateHUD()
tick()