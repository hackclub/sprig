/*
@title: Super Mari-O
@author: EVan XaVier
@tags: ['collector', 'arcade']
@addedOn: 2025-00-00
*/

const player = "p"
const coin = "c"
const superCoin = "s"
const obstacle = "o"

setLegend(
  [player, bitmap`
....LLLLL.......
....LLLLL.......
...LLLLLLL......
....00000.......
....05.50.......
....0.L.0.......
....00000.......
....22022.......
..0.00000.0.....
..0.03330.0.....
..000.3.000.....
....0...0.......
....00000.......
.....0.0........
....00.00.......
................`],
  [coin, bitmap`
................
......0000......
....00FFFF00....
...0FFFFFFFF0...
..0FFFFFFFFFF0..
..0FFFFFFFFFF0..
..0FFFFFFFFFF0..
...0FFFFFFFF0...
....00FFFF00....
......0000......
................
................
................
................
................
................`],
  [superCoin, bitmap`
................
....0000000.....
...0LLLLLLL0....
..0LL00000LL0...
..0L0LLLLL0L0...
..0L0L000L0L0...
..0L0LLLLL0L0...
..0LL00000LL0...
...0LLLLLLL0....
....0000000.....
................
................
................
................
................
................`],
  [obstacle, bitmap`
................
................
.....00000......
....0DDDDD0.....
....0D000D0.....
....0D0L0D0.....
....0D000D0.....
....0DDDDD0.....
.....00000......
................
................
................
................
................
................
................`]
)

setSolids([])

const MAP_WIDTH = 8
const MAP_HEIGHT = 8
const TOTAL_TILES = MAP_WIDTH * MAP_HEIGHT  // 64
const FILL_THRESHOLD = 0.85  // grid considered "full" at 85%
const SUPER_MODE_DURATION = 10000  // 10 seconds in ms
const CIRCLE_RADIUS = 2  // radius of the orbiting ring

let score = 0
let superScore = 0
let coinCount = 0
let obstacleCount = 0
let inSuperMode = false
let superModeTimer = null
let superModeCoinsAtStart = 0
let superModeCoinsCollected = 0
let circleAngle = 0  // current rotation angle of the circle

setMap(map`
........
........
........
........
........
........
........
........`)

addSprite(1, 1, player)

// ── Utility ──────────────────────────────────────────────────────────────────

function emptyTiles() {
  let empty = []
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      if (getAll().filter(s => s.x === x && s.y === y).length === 0) {
        empty.push({ x, y })
      }
    }
  }
  return empty
}

function randomEmpty() {
  const tiles = emptyTiles()
  if (tiles.length === 0) return null
  return tiles[Math.floor(Math.random() * tiles.length)]
}

function totalSprites() {
  return getAll(coin).length + getAll(obstacle).length + getAll(superCoin).length
}

// ── Spawning ─────────────────────────────────────────────────────────────────

function spawnCoin() {
  const t = randomEmpty()
  if (t) { addSprite(t.x, t.y, coin); coinCount++ }
}

function spawnObstacle() {
  const t = randomEmpty()
  if (t) { addSprite(t.x, t.y, obstacle); obstacleCount++ }
}

function maybeSpawnSuper() {
  if (Math.random() < 0.25) {
    const t = randomEmpty()
    if (t) addSprite(t.x, t.y, superCoin)
  }
}

// ── Super coin map effect ─────────────────────────────────────────────────────

function applySuperEffect() {
  const targetCoins = Math.floor(coinCount * 1.5)
  const targetObstacles = Math.min(obstacleCount * obstacleCount, 10)
  const coinsToAdd = targetCoins - coinCount
  const obstaclesToAdd = targetObstacles - obstacleCount
  for (let i = 0; i < coinsToAdd; i++) spawnCoin()
  for (let i = 0; i < obstaclesToAdd; i++) spawnObstacle()
}

// ── Grid full check ───────────────────────────────────────────────────────────

function checkGridFull() {
  if (inSuperMode) return
  const occupied = TOTAL_TILES - emptyTiles().length
  if (occupied / TOTAL_TILES >= FILL_THRESHOLD) {
    triggerGridPurgeAndSuperMode()
  }
}

function triggerGridPurgeAndSuperMode() {
  // Remove half of each type
  const allCoins = getAll(coin)
  const allObstacles = getAll(obstacle)
  const allSupers = getAll(superCoin)

  const removeHalf = (arr) => {
    const half = Math.floor(arr.length / 2)
    for (let i = 0; i < half; i++) arr[i].remove()
  }

  removeHalf(allCoins)
  removeHalf(allObstacles)
  removeHalf(allSupers)

  coinCount = getAll(coin).length
  obstacleCount = getAll(obstacle).length

  enterSuperMode()
}

// ── Super Mode ────────────────────────────────────────────────────────────────

function enterSuperMode() {
  inSuperMode = true
  superModeCoinsAtStart = getAll(coin).length
  superModeCoinsCollected = 0
  circleAngle = 0

  updateText()
  positionCircle()  // arrange everything into the circle immediately

  // After 10 seconds, evaluate survival
  superModeTimer = setTimeout(() => {
    endSuperMode()
  }, SUPER_MODE_DURATION)
}

// Positions all coins and obstacles in a circle around the player.
// On each call (i.e. each move), the circle jumps to a random offset angle.
function positionCircle() {
  const p = getFirst(player)
  const allItems = [...getAll(coin), ...getAll(obstacle), ...getAll(superCoin)]
  const count = allItems.length
  if (count === 0) return

  // Jump the circle to a random angle each time Mari-O moves
  circleAngle = Math.random() * 2 * Math.PI

  // Place items evenly around CIRCLE_RADIUS, centred on player
  allItems.forEach((sprite, i) => {
    const angle = circleAngle + (2 * Math.PI * i) / count
    let nx = p.x + Math.round(CIRCLE_RADIUS * Math.cos(angle))
    let ny = p.y + Math.round(CIRCLE_RADIUS * Math.sin(angle))

    // Clamp to grid bounds
    nx = Math.max(0, Math.min(MAP_WIDTH - 1, nx))
    ny = Math.max(0, Math.min(MAP_HEIGHT - 1, ny))

    sprite.x = nx
    sprite.y = ny
  })
}

function endSuperMode() {
  inSuperMode = false
  if (superModeTimer) { clearTimeout(superModeTimer); superModeTimer = null }

  const required = Math.ceil(superModeCoinsAtStart * 0.5)

  if (superModeCoinsCollected < required) {
    // Game over — insufficient performance
    clearText()
    addText("GAME OVER", { x: 2, y: 3, color: color`2` })
    addText(`Got ${superModeCoinsCollected}/${required}`, { x: 2, y: 4, color: color`9` })
    addText("Press i to", { x: 2, y: 5, color: color`9` })
    addText("restart", { x: 3, y: 6, color: color`9` })
    // Freeze all input by setting a dead flag
    gameOver = true
  } else {
    // Survived — resume normal play
    updateText()
  }
}

// ── Text ──────────────────────────────────────────────────────────────────────

let gameOver = false

function updateText() {
  clearText()
  if (inSuperMode) {
    const required = Math.ceil(superModeCoinsAtStart * 0.5)
    addText("SUPER MODE!", { x: 1, y: 0, color: color`L` })
    addText(`${superModeCoinsCollected}/${required}`, { x: 1, y: 1, color: color`4` })
  } else {
    addText(`Score:${score}`, { x: 1, y: 0, color: color`3` })
    if (superScore > 0) {
      addText(`SUP:${superScore}`, { x: 1, y: 1, color: color`L` })
    }
  }
}

// ── Initial spawns ────────────────────────────────────────────────────────────

spawnCoin()
spawnCoin()
spawnObstacle()
updateText()

// ── Input ─────────────────────────────────────────────────────────────────────

onInput("w", () => { if (!gameOver) getFirst(player).y -= 1 })
onInput("s", () => { if (!gameOver) getFirst(player).y += 1 })
onInput("a", () => { if (!gameOver) getFirst(player).x -= 1 })
onInput("d", () => { if (!gameOver) getFirst(player).x += 1 })

// Restart
onInput("i", () => {
  if (gameOver) {
    gameOver = false
    score = 0
    superScore = 0
    coinCount = 0
    obstacleCount = 0
    inSuperMode = false
    if (superModeTimer) { clearTimeout(superModeTimer); superModeTimer = null }

    // Clear all sprites and reset
    getAll(coin).forEach(s => s.remove())
    getAll(obstacle).forEach(s => s.remove())
    getAll(superCoin).forEach(s => s.remove())
    getFirst(player).x = 1
    getFirst(player).y = 1

    spawnCoin()
    spawnCoin()
    spawnObstacle()
    updateText()
  }
})

// ── After each move ───────────────────────────────────────────────────────────

afterInput(() => {
  if (gameOver) return
  const p = getFirst(player)

  // Regular coin
  getAll(coin).filter(c => c.x === p.x && c.y === p.y).forEach(c => {
    c.remove()
    coinCount--
    score += 1
    if (inSuperMode) {
      superModeCoinsCollected++
    } else {
      spawnCoin()
      maybeSpawnSuper()
      if (score % 3 === 0) spawnObstacle()
    }
  })

  // Super coin
  getAll(superCoin).filter(s => s.x === p.x && s.y === p.y).forEach(s => {
    s.remove()
    superScore += 1
    score += 3
    if (!inSuperMode) applySuperEffect()
  })

  // Obstacle
  getAll(obstacle).filter(ob => ob.x === p.x && ob.y === p.y).forEach(ob => {
    ob.remove()
    obstacleCount--
    score = Math.max(0, score - 2)
    if (!inSuperMode) spawnObstacle()
  })

  // Reposition circle if in super mode
  if (inSuperMode) positionCircle()

  // Check if grid is getting full
  checkGridFull()

  updateText()
})