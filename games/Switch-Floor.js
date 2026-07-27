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
const hud = "h"

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
3CCCCCCCCCCCCCC3
3C333333333333C3
3C3CCCCCCCCCC3C3
3C3C33333333C3C3
3C3C3CCCCCC3C3C3
3C3C3C3333C3C3C3
3C3C3C3CC3C3C3C3
3C3C3C3CC3C3C3C3
3C3C3C3333C3C3C3
3C3C3CCCCCC3C3C3
3C3C33333333C3C3
3C3CCCCCCCCCC3C3
3C333333333333C3
3CCCCCCCCCCCCCC3
3333333333333333` ],
  [ goal, bitmap`
7777777777777777
7777777777777777
7777777777777777
77777......77777
7777........7777
777..........777
777..........777
777..........777
777..........777
777..........777
777..........777
7777........7777
77777......77777
7777777777777777
7777777777777777
7777777777777777` ],
  [ hud, bitmap`
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
let goalMoveCounter = 0
let partialFlipSide = 0 // 0 = left half, 1 = right half, alternates

const levels = [
  // level 1: single wall, simple intro to flipping
  map`
psssss
ssssss
dddddd
ssssss
sssssg`,

  // level 2: two walls, must flip twice
  map`
pssss
ddddd
sssss
ddddd
sssdg`,

  // level 3: maze corridors
  map`
pssdss
ssdsss
ddsddd
sssdss
ssdssg
ssdsss`,

  // level 4: checkerboard forces careful flip timing
  map`
psdsdsd
dsdsdsd
sdsdsds
dsdsdsg`,

  // level 5: narrow path with walls on both sides
  map`
pddsdds
sddsdds
sssssss
ddddddd
sssssss
ddsddsd
ddsddsg`
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
  addCenteredText("SWITCH FLOOR", 3, color`2`)
  addCenteredText("L: Play", 6, color`3`)
  addCenteredText("J: Infinite Mode", 8, color`4`)
  if (infHighScore > 0) {
    addCenteredText("INF Best: " + infHighScore, 11, color`4`)
  }
}

function drawHowToPlay() {
  drawBackground()
  clearText()
  addCenteredText("HOW TO PLAY", 1, color`2`)
  addCenteredText("WASD: Move", 3, color`3`)
  addCenteredText("J: Flip floors", 5, color`3`)
  addCenteredText("K: Pause", 7, color`3`)
  addCenteredText("Avoid red tiles!", 9, color`5`)
  addCenteredText("L: Play", 13, color`4`)
}

function drawInfiniteIntro() {
  drawBackground()
  clearText()
  addCenteredText("INFINITE MODE", 1, color`2`)
  addCenteredText("J flips HALF", 3, color`4`)
  addCenteredText("the floor!", 4, color`4`)
  addCenteredText("Goal moves every", 6, color`3`)
  addCenteredText("3 flips!", 7, color`3`)
  addCenteredText("WASD: Move", 9, color`3`)
  addCenteredText("K: Pause", 11, color`3`)
  addCenteredText("L: Start", 13, color`4`)
}

function drawInGameControls() {
  drawBackground()
  clearText()
  addCenteredText("PAUSED", 1, color`2`)
  addCenteredText("WASD: Move", 3, color`3`)
  addCenteredText("J: Flip floors", 5, color`3`)
  addCenteredText("I: Home screen", 7, color`3`)
  addCenteredText("K: This screen", 9, color`3`)
  addCenteredText("L: Resume", 13, color`4`)
}

function drawLevelText() {
  clearText()
  for (let x = 0; x < 3; x++) {
    addSprite(x, height() - 1, hud)
  }
  if (infiniteMode) {
    addText("I" + infiniteLevel, { x: 0, y: 15, color: color`2` })
    if (deaths > 0) addText("D" + deaths, { x: 2, y: 15, color: color`9` })
  } else {
    addText("L" + (levelIndex + 1), { x: 0, y: 15, color: color`4` })
    if (deaths > 0) addText("D" + deaths, { x: 2, y: 15, color: color`9` })
  }
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

function goHome() {
  levelIndex = 0
  infiniteMode = false
  infiniteLevel = 0
  deaths = 0
  gameState = "start"
  drawStartScreen()
}

function spawnRandomDanger() {
  const safeTiles = tilesWith(safe).filter(t => {
    const x = t[0].x
    const y = t[0].y
    const hasPlayer = tilesWith(player).some(p => p[0].x === x && p[0].y === y)
    const hasGoal   = tilesWith(goal).some(g => g[0].x === x && g[0].y === y)
    return !hasPlayer && !hasGoal
  })
  if (safeTiles.length === 0) return
  const pick = safeTiles[Math.floor(Math.random() * safeTiles.length)]
  clearTile(pick[0].x, pick[0].y)
  addSprite(pick[0].x, pick[0].y, danger)
}

// move goal to a random safe tile
function moveGoal() {
  const goalTiles = tilesWith(goal)
  if (goalTiles.length === 0) return
  const oldX = goalTiles[0][0].x
  const oldY = goalTiles[0][0].y
  clearTile(oldX, oldY)
  addSprite(oldX, oldY, safe)

  const safeTiles = tilesWith(safe).filter(t => {
    const x = t[0].x
    const y = t[0].y
    const hasPlayer = tilesWith(player).some(p => p[0].x === x && p[0].y === y)
    return !hasPlayer
  })
  if (safeTiles.length === 0) return
  const pick = safeTiles[Math.floor(Math.random() * safeTiles.length)]
  clearTile(pick[0].x, pick[0].y)
  addSprite(pick[0].x, pick[0].y, goal)
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

  // pick a layout type based on level and randomness
  const layoutType = (infiniteLevel <= 2)
    ? 0 // always walls early on
    : Math.floor(Math.random() * 4)

  if (layoutType === 0) {
    // full danger walls
    const wallCount = 1 + Math.min(Math.floor(infiniteLevel / 2), 3)
    const usedRows = new Set([0, rows - 1])
    for (let w = 0; w < wallCount; w++) {
      let wy, attempts = 0
      do {
        wy = 1 + Math.floor(Math.random() * (rows - 2))
        attempts++
      } while (usedRows.has(wy) && attempts < 20)
      if (attempts < 20) {
        usedRows.add(wy)
        grid[wy] = danger.repeat(cols)
      }
    }
  } else if (layoutType === 1) {
    // checkerboard
    for (let y = 0; y < rows; y++) {
      let row = ""
      for (let x = 0; x < cols; x++) {
        row += (x + y) % 2 === 0 ? danger : safe
      }
      grid[y] = row
    }
  } else if (layoutType === 2) {
    // diagonal corridors of danger
    for (let y = 0; y < rows; y++) {
      let row = ""
      for (let x = 0; x < cols; x++) {
        row += (x + y) % 3 === 0 ? danger : safe
      }
      grid[y] = row
    }
  } else if (layoutType === 3) {
    // island layout — mostly danger with safe islands
    for (let y = 0; y < rows; y++) {
      let row = ""
      for (let x = 0; x < cols; x++) {
        row += (x % 3 === 1 && y % 2 === 0) ? safe : danger
      }
      grid[y] = row
    }
  }

  // narrow corridor layout every 5 levels
  if (infiniteLevel % 5 === 0 && infiniteLevel > 0) {
    for (let y = 0; y < rows; y++) {
      let row = ""
      for (let x = 0; x < cols; x++) {
        // only middle row is safe
        row += (y === Math.floor(rows / 2)) ? safe : danger
      }
      grid[y] = row
    }
  }

  // always ensure player start and goal are safe
  grid[0] = player + safe.repeat(cols - 1)
  grid[rows - 1] = safe.repeat(cols - 1) + goal

  return grid.join("\n")
}

function doPartialFlip() {
  const p = getFirst(player)
  if (!p) return

  const w = width()
  const h = height()
  const half = Math.floor(w / 2)

  // alternate which half flips
  const flipLeft = partialFlipSide === 0
  partialFlipSide = 1 - partialFlipSide

  const xStart = flipLeft ? 0 : half
  const xEnd   = flipLeft ? half : w

  for (let x = xStart; x < xEnd; x++) {
    for (let y = 0; y < h; y++) {
      if (x === p.x && y === p.y) continue

      const hasSafe   = tilesWith(safe).some(t => t[0].x === x && t[0].y === y)
      const hasDanger = tilesWith(danger).some(t => t[0].x === x && t[0].y === y)
      const hasGoal   = tilesWith(goal).some(t => t[0].x === x && t[0].y === y)

      if (hasSafe || hasDanger) {
        clearTile(x, y)
        if (hasGoal)   addSprite(x, y, goal)
        if (hasSafe)   addSprite(x, y, danger)
        if (hasDanger) addSprite(x, y, safe)
      }
    }
  }

  // move goal every 3 flips
  goalMoveCounter++
  if (goalMoveCounter % 3 === 0) moveGoal()
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
  goalMoveCounter = 0
  partialFlipSide = 0
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
  } else if (gameState === "infiniteIntro") {
    gameState = "playing"
    loadInfiniteLevel()
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
    gameState === "controls" ||
    gameState === "win" ||
    gameState === "howtoplay" ||
    gameState === "infiniteIntro"
  ) {
    goHome()
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
  // start or win screen enters infinite intro
  if (gameState === "start" || gameState === "win") {
    infiniteMode = true
    infiniteLevel = 0
    gameState = "infiniteIntro"
    drawInfiniteIntro()
    return
  }

  if (gameState !== "playing") return

  if (infiniteMode) {
    // infinite mode uses partial flip with moving goal
    doPartialFlip()
  } else {
    // story mode uses full flip
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

        const hasSafe   = tilesWith(safe).some(t => t[0].x === x && t[0].y === y)
        const hasDanger = tilesWith(danger).some(t => t[0].x === x && t[0].y === y)
        const hasGoal   = tilesWith(goal).some(t => t[0].x === x && t[0].y === y)

        if (hasSafe || hasDanger) {
          clearTile(x, y)
          if (hasGoal)   addSprite(x, y, goal)
          if (hasSafe)   addSprite(x, y, danger)
          if (hasDanger) addSprite(x, y, safe)
        }
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
