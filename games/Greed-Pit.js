/*
  GREED PIT - FINAL FIXED VERSION
  - Background is solid dark (no white spots).
  - Game Over text is centered and guaranteed to show.
  - Fixed "Multiple Player" bug on restart.
*/

const player = "p"
const coin = "c"
const gem = "g"
const bomb = "b"
const bg = "d" 

setLegend(
  [ player, bitmap`
................
......000.......
.....0...0......
.....0.0.0......
.....0...0......
......000.......
.......0........
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
.....00000......
.......0........
......0.0.......
.....0...0......
....0.....0.....` ],
  [ coin, bitmap`
................
......6666......
.....699996.....
....6966696.....
....6966696.....
....6966696.....
.....699996.....
......6666......
......6666......
.....699996.....
....6966696.....
....6966696.....
....6966696.....
.....699996.....
......6666......
................` ],
  [ gem, bitmap`
................
......4..4......
.....444444.....
....4.4444.4....
....44.44.44....
.....4.44.4.....
......4444......
.......44.......
......4444......
.....4.44.4.....
....44.44.44....
....4.4444.4....
.....444444.....
......4..4......
................
................` ],
  [ bomb, bitmap`
................
......333.......
.....33333......
....3333333.....
...333333333....
...333333333....
...333333333....
...333333333....
....3333333.....
.....33333......
......333.......
.......3........
......333.......
.....33333......
....3333333.....
...333333333....` ],
  [ bg, bitmap`
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

setMap(map`
dddddddddd
dddddddddd
dddddddddd
dddddddddd
dddddddddd
dddddddddd
dddddddddd
dddddddddd
dddddddddd
dddddddddd`)

addSprite(4, 9, player)

let score = 0
let highScore = 0
let gameRunning = true

onInput("a", () => { if (gameRunning && getFirst(player)) getFirst(player).x -= 1 })
onInput("d", () => { if (gameRunning && getFirst(player)) getFirst(player).x += 1 })
onInput("w", () => { if (gameRunning && getFirst(player)) getFirst(player).y -= 1 })
onInput("s", () => { if (gameRunning && getFirst(player)) getFirst(player).y += 1 })

// Duplicate controls for JKL
onInput("j", () => { if (gameRunning && getFirst(player)) getFirst(player).x -= 1 })
onInput("l", () => { if (gameRunning && getFirst(player)) getFirst(player).x += 1 })
onInput("i", () => { if (gameRunning && getFirst(player)) getFirst(player).y -= 1 })
onInput("k", () => { if (gameRunning && getFirst(player)) getFirst(player).y += 1 })

function spawnItem() {
  if (!gameRunning) return
  const x = Math.floor(Math.random() * 10)
  const roll = Math.random()
  if (roll < 0.5) addSprite(x, 0, coin)
  else if (roll < 0.8) addSprite(x, 0, gem)
  else addSprite(x, 0, bomb)
}

function moveFallingShit() {
  getAll(coin).forEach(s => s.y += 1)
  getAll(gem).forEach(s => s.y += 1)
  getAll(bomb).forEach(s => s.y += 1)
}

function nukeOffscreenCrap() {
  getAll(coin).forEach(s => { if (s.y >= 9) s.remove() })
  getAll(gem).forEach(s => { if (s.y >= 9) s.remove() })
  getAll(bomb).forEach(s => { if (s.y >= 9) s.remove() })
}

function checkHits() {
  const p = getFirst(player)
  if (!p) return

  getAll(coin).forEach(c => {
    if (c.x === p.x && c.y === p.y) {
      score += 10
      c.remove()
      playTune(tune`3e4 3c4`, 1)
    }
  })

  getAll(gem).forEach(g => {
    if (g.x === p.x && g.y === p.y) {
      score += 50
      g.remove()
      playTune(tune`1f4 2g4 3c5`, 1)
    }
  })

  getAll(bomb).forEach(b => {
    if (b.x === p.x && b.y === p.y) {
      if (score > highScore) highScore = score
      gameRunning = false
      gameOverScreen()
    }
  })
}

function drawScore() {
  if (!gameRunning) return // Stop score drawing if dead
  clearText()
  addText("SCORE " + score, { x: 1, y: 1, color: color`6` })
  if (highScore > 0) addText("HI " + highScore, { x: 7, y: 0, color: color`9` })
}

function gameOverScreen() {
  // Clean up all items
  getAll(coin).forEach(s => s.remove())
  getAll(gem).forEach(s => s.remove())
  getAll(bomb).forEach(s => s.remove())

  playTune(tune`1c4 1e4 1g4 4c3`, 1)

  clearText()
  // Centered messages
  addText("GAME OVER", { x: 3, y: 3, color: color`3` })
  addText("FINAL: " + score, { x: 3, y: 5, color: color`9` })
  addText("HI: " + highScore, { x: 3, y: 6, color: color`D` })
  
  addText("PRESS J", { x: 3, y: 9, color: color`6` })
  addText("TO RESTART", { x: 2, y: 10, color: color`6` })
}

// Game Loop
setInterval(() => {
  if (!gameRunning) return

  moveFallingShit()
  checkHits()
  nukeOffscreenCrap()
  drawScore()

  if (Math.random() < 0.8) spawnItem()
}, 200)

spawnItem()
drawScore()

onInput("j", () => {
  if (!gameRunning) {
    // Reset everything
    score = 0
    gameRunning = true
    
    // Remove the old player sprite before adding a new one
    if (getFirst(player)) getFirst(player).remove()
    addSprite(4, 9, player)
    
    clearText()
    drawScore()
  }
})