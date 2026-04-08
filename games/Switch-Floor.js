/*
@title: Switch Floor
@author: InfinityByte
@description: Navigate to the goal while avoiding red danger tiles. Press J to flip the entire floor, turning safe tiles into danger and danger tiles into safe. The tile you stand on never flips. Beat all 3 levels to unlock Infinite Mode.
@tags: ['puzzle', 'platformer', 'arcade', 'infinite']
@addedOn: 2026-03-22
*/

const player = "p"
const safe = "s"
const danger = "d"
const goal = "g"

setLegend(
  [ player, bitmap`
................
................
................
.......0000.....
.....000..00....
....00.....00...
....0..0.0..0...
....0.......0...
....0.00000.0...
....0......00...
....00....00....
.....000000.....
................
................
................
................` ],
  [ safe, bitmap`
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
1111111111111111` ],
  [ danger, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ goal, bitmap`
................
....66666666....
....6......6....
....6.6666.6....
....6.6..6.6....
....6.6666.6....
....6......6....
....66666666....
................
................
................
................
................
................
................
................` ]
)

setSolids([])

let flipped = false
let levelIndex = 0
let gameState = "start"
let prevGameState = "playing"
let infiniteMode = false
let infiniteLevel = 0
let deaths = 0
let infHighScore = 0
let savedMap = null

const levels = [
  map`
psssss
ssssss
dddddd
ssssss
sssssg`,

  map`
pssss
ddddd
sssss
ddddd
sssdg`,

  map`
pssdss
ssdsss
ddsddd
sssdss
ssdssg
ssdsss`
]

// ---------- UI ----------

function drawBackground() {
  const rows = []
  for (let y = 0; y < 16; y++) {
    let row = ""
    for (let x = 0; x < 20; x++) row += "s"
    rows.push(row)
  }
  setMap(rows.join("\n"))
}

function addCenteredText(text, y, colorCode) {
  const x = Math.floor((20 - text.length) / 2)
  addText(text, { x, y, color: colorCode })
}

function drawStartScreen() {
  drawBackground()
  clearText()
  addCenteredText("SWITCH FLOOR", 4, color`2`)
  addCenteredText("Press L to Start", 7, color`3`)
  if (infHighScore > 0) {
    addCenteredText("INF Best: " + infHighScore, 10, color`4`)
  }
}

function drawHowToPlay() {
  drawBackground()
  clearText()
  addCenteredText("HOW TO PLAY", 1, color`2`)
  addCenteredText("WASD: Move", 3, color`3`)
  addCenteredText("J: Flip floors", 5, color`3`)
  addCenteredText("K: Controls", 7, color`3`)
  addCenteredText("I: Home screen", 9, color`3`)
  addCenteredText("Avoid red tiles!", 11, color`5`)
  addCenteredText("L: Play", 13, color`4`)
}

function drawInGameControls() {
  drawBackground()
  clearText()
  addCenteredText("CONTROLS", 1, color`2`)
  addCenteredText("WASD: Move", 3, color`3`)
  addCenteredText("J: Flip floors", 5, color`3`)
  addCenteredText("K: This screen", 7, color`3`)
  addCenteredText("I: Home screen", 9, color`3`)
  addCenteredText("L: Resume", 13, color`4`)
}

function drawLevelText() {
  clearText()
  if (infiniteMode) {
    addText("INF " + infiniteLevel, { x: 0, y: 14, color: color`2` })
  } else {
    addText("Lv" + (levelIndex + 1), { x: 0, y: 14, color: color`4` })
  }
  if (deaths > 0) {
    addText("D:" + deaths, { x: 16, y: 14, color: color`3` })
  }
  addText("K=help", { x: 7, y: 15, color: color`1` })
}

function drawLevelComplete() {
  drawBackground()
  clearText()
  addCenteredText("Level Complete!", 4, color`2`)
  addCenteredText("Deaths: " + deaths, 6, color`3`)
  addCenteredText("Press L", 9, color`4`)
}

function drawWinScreen() {
  drawBackground()
  clearText()
  addCenteredText("YOU WIN!", 2, color`2`)
  addCenteredText("Deaths: " + deaths, 4, color`3`)
  if (infHighScore > 0) {
    addCenteredText("INF Best: " + infHighScore, 6, color`4`)
  }
  addCenteredText("I: Home", 9, color`3`)
  addCenteredText("J: Infinite Mode", 11, color`4`)
}

function drawInfiniteLevelComplete() {
  drawBackground()
  clearText()
  addCenteredText("Nice!", 4, color`2`)
  addCenteredText("Deaths: " + deaths, 6, color`3`)
  addCenteredText("Press L Next", 9, color`4`)
}

function snapshotMap() {
  savedMap = []
  for (let y = 0; y < height(); y++) {
    let row = ""
    for (let x = 0; x < width(); x++) {
      const tile = getTile(x, y)
      const hasP = tile.some(s => s.type === player)
      const hasG = tile.some(s => s.type === goal)
      const hasD = tile.some(s => s.type === danger)
      if (hasP) row += player
      else if (hasG) row += goal
      else if (hasD) row += danger
      else row += safe
    }
    savedMap.push(row)
  }
}

function spawnRandomDanger() {
  const safeTiles = tilesWith(safe).filter(t => {
    const x = t[0].x
    const y = t[0].y
    const hasPlayer = tilesWith(player).some(p => p[0].x === x && p[0].y === y)
    const hasGoal   = tilesWith(goal).some(g => g[0].x === x && g[0].y === y)
    return !hasPlayer && !hasGoal
  })
  if (safeTiles.length === 0) return
  const pick = safeTiles[Math.floor(Math.random() * safeTiles.length)]
  clearTile(pick[0].x, pick[0].y)
  addSprite(pick[0].x, pick[0].y, danger)
}

function generateRandomLevel() {
  const cols = 6 + Math.min(infiniteLevel, 6)
  const rows = 7
  let grid = []

  for (let y = 0; y < rows; y++) {
    let row = ""
    for (let x = 0; x < cols; x++) row += safe
    grid.push(row)
  }

  const wallCount = 1 + Math.min(Math.floor(infiniteLevel / 2), 3)
  const usedRows = new Set([0, rows - 1])
  for (let w = 0; w < wallCount; w++) {
    let wy
    let attempts = 0
    do {
      wy = 1 + Math.floor(Math.random() * (rows - 2))
      attempts++
    } while (usedRows.has(wy) && attempts < 20)
    if (attempts < 20) {
      usedRows.add(wy)
      grid[wy] = danger.repeat(cols)
    }
  }

  grid[0] = player + grid[0].slice(1)
  grid[rows - 1] = grid[rows - 1].slice(0, cols - 1) + goal

  return grid.join("\n")
}

function loadLevel() {
  flipped = false
  deaths = 0
  setMap(levels[levelIndex])
  drawLevelText()
}

function loadInfiniteLevel() {
  flipped = false
  deaths = 0
  infiniteLevel++
  if (infiniteLevel > infHighScore) infHighScore = infiniteLevel
  setMap(generateRandomLevel())
  drawLevelText()
}

// ---------- Init ----------
drawStartScreen()

// ---------- Controls ----------

onInput("l", () => {
  if (gameState === "start") {
    gameState = "howtoplay"
    drawHowToPlay()
  } else if (gameState === "howtoplay") {
    gameState = "playing"
    infiniteMode = false
    loadLevel()
  } else if (gameState === "controls") {
    gameState = prevGameState
    if (prevGameState === "playing") {
      if (savedMap) setMap(savedMap.join("\n"))
      drawLevelText()
    } else if (prevGameState === "levelComplete") {
      if (infiniteMode) drawInfiniteLevelComplete()
      else drawLevelComplete()
    }
  } else if (gameState === "levelComplete") {
    if (infiniteMode) {
      gameState = "playing"
      loadInfiniteLevel()
    } else {
      levelIndex++
      if (levelIndex < levels.length) {
        gameState = "playing"
        loadLevel()
      } else {
        gameState = "win"
        drawWinScreen()
      }
    }
  }
})

onInput("i", () => {
  if (
    gameState === "playing" ||
    gameState === "levelComplete" ||
    gameState === "howtoplay" ||
    gameState === "controls" ||
    gameState === "win"
  ) {
    levelIndex = 0
    infiniteMode = false
    infiniteLevel = 0
    deaths = 0
    gameState = "start"
    drawStartScreen()
  }
})

onInput("k", () => {
  if (gameState === "playing" || gameState === "levelComplete") {
    snapshotMap()
    prevGameState = gameState
    gameState = "controls"
    drawInGameControls()
  }
})

onInput("j", () => {
  if (gameState === "win") {
    infiniteMode = true
    infiniteLevel = 0
    gameState = "playing"
    loadInfiniteLevel()
    return
  }

  if (gameState !== "playing") return
  flipped = !flipped

  const p = getFirst(player)
  if (!p) return
  const px = p.x
  const py = p.y
  const w = width()
  const h = height()

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      if (x === px && y === py) continue

      const hasSafe   = tilesWith(safe).some(t => t[0].x === x && t[0].y === y)
      const hasDanger = tilesWith(danger).some(t => t[0].x === x && t[0].y === y)
      const hasGoal   = tilesWith(goal).some(t => t[0].x === x && t[0].y === y)

      if (hasSafe || hasDanger) {
        clearTile(x, y)
        if (hasGoal)   addSprite(x, y, goal)
        if (hasSafe)   addSprite(x, y, danger)
        if (hasDanger) addSprite(x, y, safe)
      }
    }
  }
})

onInput("w", () => { if (gameState === "playing") getFirst(player).y -= 1 })
onInput("a", () => { if (gameState === "playing") getFirst(player).x -= 1 })
onInput("s", () => { if (gameState === "playing") getFirst(player).y += 1 })
onInput("d", () => { if (gameState === "playing") getFirst(player).x += 1 })

// ---------- Game Logic ----------
afterInput(() => {
  if (gameState !== "playing") return
  const p = getFirst(player)
  if (!p) return

  if (p.x < 0) p.x = width() - 1
  if (p.x >= width()) p.x = 0
  if (p.y < 0) p.y = height() - 1
  if (p.y >= height()) p.y = 0

  if (tilesWith(player, danger).length > 0) {
    deaths++
    p.x = 0
    p.y = 0
    drawLevelText()
  }

  if (tilesWith(player, goal).length > 0) {
    gameState = "levelComplete"
    if (infiniteMode) drawInfiniteLevelComplete()
    else drawLevelComplete()
  }
})
