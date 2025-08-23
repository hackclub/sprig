/*
@title: Reverse Pac-Man
@author: Evah Shaji
@addedOn: 2025-08-23
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

Reverse Pac-Man - You are the ghost! Chase and catch all the Pac-Men!
Controls: WASD to move
Goal: Catch all yellow Pac-Men within the time limit
*/

const player = "p"
const wall = "w"
const pacman = "m"
const dot = "d"
const empty = "e"

setLegend(
  [ player, bitmap`
................
.....000000.....
...0033333300...
..003333333300..
.00333000333300.
.03333000333330.
.03330000033330.
.03333333333330.
.03330000033330.
.03330000033330.
.00333333333300.
..003333333300..
...0033333300...
.....000000.....
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
  [ pacman, bitmap`
................
................
................
...666666666....
..66666666666...
.6666666666666..
.6666666666666..
666600666666666.
666666666666666.
666666666666666.
.6666666666666..
.6666666666666..
..66666666666...
...666666666....
................
................` ],
  [ dot, bitmap`
................
................
................
................
................
................
......6666......
......6666......
......6666......
......6666......
................
................
................
................
................
................` ],
  [ empty, bitmap`
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
................` ]
)

setSolids([player, wall])

let level = 0
let score = 0
let timeLeft = 60
let gameRunning = true
let pacmenPositions = []
let pacmenMoveTimer = 0

const levels = [
  map`
wwwwwwwwwwwwwwww
w.d.d.d.d.d.d.dw
wd.w.w.w.w.w.w.w
w.d.d.d.d.d.d.dw
w.w.w.w.w.w.w.dw
w.d.d.d.d.d.d.dw
wd.w.w.w.w.w.w.w
w.d.d.d.d.d.d.dw
w.w.w.w.w.w.w.dw
w.d.d.d.d.d.d.dw
wd.w.w.w.w.w.w.w
w.d.d.d.d.d.d.dw
w.w.w.w.w.w.w.dw
wm.d.d.p.d.d.m.w
wwwwwwwwwwwwwwww`,
  
  map`
wwwwwwwwwwwwwwww
wm.............w
w.ww.wwwwww.ww.w
w..............w
w.ww.w.ww.w.ww.w
w....w.dd.w....w
wwww.wwddww.wwww
w..w.d.dd.d.w..w
www..ddpdd..wwww
w..w.d.dd.d.w..w
wwww.wwddww.wwww
w....w.dd.w....w
w.ww.w.ww.w.ww.w
w..............w
w.ww.wwwwww.ww.w
wm.............w
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
w.d.d.d.d.d.d.dw
wd.w.w.w.w.w.w.w
w.d.d.d.d.d.d.dw
w.w.w.w.w.w.w.dw
wm....d.d....m.w
w.w.w.w.w.w.w.dw
w.d.d.d.p.d.d.dw
wd.w.w.w.w.w.w.w
wm....d.d....mw
w.w.w.w.w.w.w.dw
w.d.d.d.d.d.d.dw
wd.w.w.w.w.w.w.w
w.d.d.d.d.d.d.dw
wwwwwwwwwwwwwwww`
]

setMap(levels[level])

// Initialize Pac-Men positions
function initPacMen() {
  pacmenPositions = []
  const pacmans = getAll(pacman)
  for (let p of pacmans) {
    pacmenPositions.push({
      x: p.x,
      y: p.y,
      dx: Math.random() < 0.5 ? -1 : 1,
      dy: 0
    })
  }
}

initPacMen()

// Timer function
function updateTimer() {
  if (!gameRunning) return
  
  if (timeLeft > 0) {
    timeLeft--
    clearText()
    addText(`Score: ${score}`, { x: 1, y: 1, color: color`6` })
    addText(`Time: ${timeLeft}s`, { x: 1, y: 2, color: color`3` })
    addText(`Pac-Men: ${getAll(pacman).length}`, { x: 1, y: 3, color: color`6` })
    
    setTimeout(updateTimer, 1000)
  } else {
    gameOver()
  }
}

// Start timer
updateTimer()

// Move Pac-Men AI
function movePacMen() {
  if (!gameRunning) return
  
  const pacmans = getAll(pacman)
  
  for (let i = 0; i < pacmans.length; i++) {
    const p = pacmans[i]
    const pos = pacmenPositions[i]
    if (!pos) continue
    
    // Try to move in current direction
    let newX = p.x + pos.dx
    let newY = p.y + pos.dy
    
    // Check if move is valid (not into wall)
    const tileAtNewPos = getTile(newX, newY)
    const hasWall = tileAtNewPos.some(sprite => sprite.type === wall)
    
    if (hasWall || newX < 0 || newX >= width() || newY < 0 || newY >= height()) {
      // Hit wall, change direction randomly
      const directions = [
        { dx: 1, dy: 0 },   // right
        { dx: -1, dy: 0 },  // left
        { dx: 0, dy: 1 },   // down
        { dx: 0, dy: -1 }   // up
      ]
      
      // Try different directions until we find a valid one
      let validDirectionFound = false
      for (let attempts = 0; attempts < 4; attempts++) {
        const dir = directions[Math.floor(Math.random() * 4)]
        newX = p.x + dir.dx
        newY = p.y + dir.dy
        
        const testTile = getTile(newX, newY)
        const testHasWall = testTile.some(sprite => sprite.type === wall)
        
        if (!testHasWall && newX >= 0 && newX < width() && newY >= 0 && newY < height()) {
          pos.dx = dir.dx
          pos.dy = dir.dy
          validDirectionFound = true
          break
        }
      }
      
      if (!validDirectionFound) {
        continue // Skip this pac-man this turn
      }
    }
    
    // Move the pac-man
    p.x = newX
    p.y = newY
  }
  
  setTimeout(movePacMen, 300) // Move every 300ms
}

// Start Pac-Men movement
movePacMen()

// Player movement
onInput("s", () => {
  if (!gameRunning) return
  getFirst(player).y += 1
  checkCollision()
})

onInput("w", () => {
  if (!gameRunning) return
  getFirst(player).y -= 1
  checkCollision()
})

onInput("a", () => {
  if (!gameRunning) return
  getFirst(player).x -= 1
  checkCollision()
})

onInput("d", () => {
  if (!gameRunning) return
  getFirst(player).x += 1
  checkCollision()
})

// Check collision with Pac-Men
function checkCollision() {
  const playerSprite = getFirst(player)
  const pacmans = getAll(pacman)
  
  for (let p of pacmans) {
    if (playerSprite.x === p.x && playerSprite.y === p.y) {
      p.remove()
      score += 100
      
      // Remove from tracking array
      for (let i = 0; i < pacmenPositions.length; i++) {
        if (pacmenPositions[i] && 
            pacmans.indexOf(p) === i) {
          pacmenPositions.splice(i, 1)
          break
        }
      }
      
      // Check if all caught
      if (getAll(pacman).length === 0) {
        nextLevel()
      }
      break
    }
  }
  
  // Update display
  clearText()
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`6` })
  addText(`Time: ${timeLeft}s`, { x: 1, y: 2, color: color`3` })
  addText(`Pac-Men: ${getAll(pacman).length}`, { x: 1, y: 3, color: color`6` })
}

// Next level
function nextLevel() {
  level++
  if (level < levels.length) {
    setMap(levels[level])
    initPacMen()
    timeLeft += 30 // Bonus time for completing level
    clearText()
    addText(`Level ${level + 1}!`, { x: 6, y: 7, color: color`4` })
    addText(`+30 seconds!`, { x: 5, y: 8, color: color`4` })
    
    setTimeout(() => {
      clearText()
    }, 2000)
  } else {
    // Victory!
    gameRunning = false
    clearText()
    addText(`YOU WIN!`, { x: 6, y: 6, color: color`4` })
    addText(`Final Score: ${score}`, { x: 3, y: 8, color: color`6` })
    addText(`Press J to restart`, { x: 2, y: 10, color: color`2` })
  }
}

// Game over
function gameOver() {
  gameRunning = false
  clearText()
  addText(`GAME OVER!`, { x: 5, y: 6, color: color`3` })
  addText(`Score: ${score}`, { x: 6, y: 8, color: color`6` })
  addText(`Press J to restart`, { x: 2, y: 10, color: color`2` })
}

// Restart game
onInput("j", () => {
  level = 0
  score = 0
  timeLeft = 60
  gameRunning = true
  setMap(levels[level])
  initPacMen()
  movePacMen()
  updateTimer()
  clearText()
})

// Initial display
clearText()
addText(`Score: ${score}`, { x: 1, y: 1, color: color`6` })
addText(`Time: ${timeLeft}s`, { x: 1, y: 2, color: color`3` })
addText(`Pac-Men: ${getAll(pacman).length}`, { x: 1, y: 3, color: color`6` })
addText(`Catch all Pac-Men!`, { x: 2, y: 14, color: color`4` })
addText(`WASD to move`, { x: 4, y: 15, color: color`2` })