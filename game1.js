/*
@title: Meteor Shower - FALLING ASTEROIDS + SHOOTING
@author: you
@tags: []
*/

const ship = "s"
const asteroid = "a" 
const laser = "l"
const star = "*"
const wall = "w"

setLegend(
  [ ship, bitmap`
.......0........
......000.......
.....00000......
.....0...0......
....0.....0.....
...0...0...0....
..0...000...0...
.0...0...0...0..
..0...000...0...
...0...0...0....
....0.....0.....
.....0...0......
......000.......
.......0........
................
................` ],
  
  [ asteroid, bitmap`
......6666......
.....666666.....
....66666666....
....66666666....
....66666666....
.....666666.....
......6666......
......6666......
.....666666.....
.....666666.....
......6666......
................
................
................
................
................` ],
  
  [ laser, bitmap`
................ 
................ 
................ 
................ 
.....555........
.....555........
.....555........
.....555........
.....555........
.....555........
.....555........
................ 
................ 
................ 
................ 
................` ],
  
  [ star, bitmap`
................
.......3........
......333.......
.....33333......
......333.......
.......3........
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
  
  [ wall, bitmap`
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
1111111111111111` ]
)

setSolids([ ship, asteroid, wall ])

let lives = 3
let score = 0
let gameOver = false
let asteroidY = [] // Track falling asteroids

// Start empty playfield with walls
setMap(map`
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w`)

addSprite(6, 12, ship) // Ship at bottom

const moveTune = tune`50: C5~50`
const hitTune = tune`100: C4-100`
const laserTune = tune`50: E5~50`

function respawn() {
  lives = 3
  score = 0
  gameOver = false
  asteroidY = []
  clearText()
  clearSprites()
  setMap(map`
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w`)
  addSprite(6, 12, ship)
}

function shootLaser() {
  if (!gameOver) {
    const shipSprite = getFirst(ship)
    if (shipSprite) {
      addSprite(shipSprite.x, shipSprite.y - 1, laser)
      playTune(laserTune)
    }
  }
}

// WASD Movement + L = SHOOT
onInput("w", () => {
  if (!gameOver) {
    const shipSprite = getFirst(ship)
    if (shipSprite) shipSprite.y = Math.max(1, shipSprite.y - 1)
    playTune(moveTune)
  }
})

onInput("s", () => {
  if (!gameOver) {
    const shipSprite = getFirst(ship)
    if (shipSprite) shipSprite.y = Math.min(13, shipSprite.y + 1)
    playTune(moveTune)
  }
})

onInput("a", () => {
  if (!gameOver) {
    const shipSprite = getFirst(ship)
    if (shipSprite) shipSprite.x = Math.max(1, shipSprite.x - 1)
    playTune(moveTune)
  }
})

onInput("d", () => {
  if (!gameOver) {
    const shipSprite = getFirst(ship)
    if (shipSprite) shipSprite.x = Math.min(13, shipSprite.x + 1)
    playTune(moveTune)
  }
})

onInput("l", shootLaser)
onInput("j", respawn)

afterInput(() => {
  if (gameOver) return
  
  // SPAWN FALLING ASTEROIDS FROM TOP
  if (Math.random() < 0.15) {
    const randX = Math.floor(Math.random() * 13) + 1
    addSprite(randX, 1, asteroid)
    asteroidY[randX] = 1 // Track this column's asteroid
  }
  
  // MAKE ASTEROIDS FALL (move down each column)
  for (let x = 1; x < 15; x++) {
    const tile = getTile(x, asteroidY[x] || 15)
    if (tile.some(s => s.type === asteroid)) {
      asteroidY[x] = (asteroidY[x] || 1) + 1
      if (asteroidY[x] > 14) {
        asteroidY[x] = 0 // Reset fallen asteroid
      }
    }
  }
  
  // MOVE LASERS UP
  const lasers = getAll(laser)
  lasers.forEach(l => {
    l.y -= 1
    if (l.y < 1) l.remove()
  })
  
  // COLLISION: Laser hits Asteroid
  lasers.forEach(l => {
    const laserTile = getTile(l.x, l.y)
    if (laserTile.some(s => s.type === asteroid)) {
      laserTile.forEach(s => {
        if (s.type === asteroid) s.remove()
      })
      l.remove()
      score += 100 // Fixed score update!
      playTune(hitTune)
    }
  })
  
  // COLLISION: Ship hits Asteroid  
  const shipSprite = getFirst(ship)
  if (shipSprite) {
    const shipTile = getTile(shipSprite.x, shipSprite.y)
    if (shipTile.some(s => s.type === asteroid)) {
      lives -= 1
      playTune(hitTune)
      shipSprite.x = 6
      shipSprite.y = 12
      shipTile.forEach(s => {
        if (s.type === asteroid) s.remove()
      })
      
      if (lives <= 0) {
        gameOver = true
        clearText()
        addText("GAME OVER", { x: 4, y: 4, color: color`1` })
        addText("Score: " + score, { x: 3, y: 6, color: color`2` })
        addText("Press J to restart", { x: 1, y: 8, color: color`3` })
        return
      }
    }
  }
  
  // FIXED SCORE DISPLAY
  clearText()
 
  addText("Score: " + score, { x: 9, y: 0, color: color`4` })
})

