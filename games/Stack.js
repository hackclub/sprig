/*
@title: Stack
@author: Maksim Nikolov
@description: You need to stack the blocks and reach the top!
@tags: [Retro]
@addedOn: 2025-10-03
*/

const block = "p"
const sky = "s"
const base = "q"

setLegend(
  [block, bitmap`
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
3333333333333333`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [base, bitmap`
0000000000000000
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
)

const gridWidth = 11
const gridHeight = 13

setSolids([])

const levels = [
  map`
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
sssssssssssss
ssssqqqqqssss`
]

let gameStarted = false

function showTitleScreen() {
  setMap(levels[0])
  clearText()
  addText("STACK", { x: 7, y: 3, color: color`3` })
  addText("Press A to Start", { x: 2, y: 5, color: color`5` })
  addText("Controls:", { x: 6, y: 7, color: color`2` })
  addText("A = Drop Block", { x: 3, y: 10, color: color`2` })
}

function startGame() {
  clearText()
  gameStarted = true
  setMap(levels[0])
  currentX = 3
  currentY = gridHeight - 2
  blockWidth = 5
  lastBlockStart = 3
  moving = true
  score = 0
  direction = 1
  placeBlock(currentX, blockWidth, currentY)
}

showTitleScreen()

let direction = 1
let currentX = 3
let currentY = gridHeight - 2
let blockWidth = 5
let lastBlockStart = 3
let moving = true
let score = 0

function placeBlock(startX, width, y) {
  for (let i = 0; i < width; i++) {
    const x = startX + i
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
      addSprite(x, y, block)
    }
  }
}

function clearRow(y) {
  for (let x = 0; x < gridWidth; x++) {
    if (y >= 0 && y < gridHeight) {
      clearTile(x, y)
      addSprite(x, y, sky)
    }
  }
}

function moveBlock() {
  if (!moving || !gameStarted) return

  clearRow(currentY)

  if (currentX + blockWidth + direction > gridWidth || currentX + direction < 0) {
    direction *= -1
  }

  currentX += direction
  placeBlock(currentX, blockWidth, currentY)
}

function dropBlock() {
  if (!gameStarted) {
    startGame()
    return
  }

  moving = false
  const overlapStart = Math.max(currentX, lastBlockStart)
  const overlapEnd = Math.min(currentX + blockWidth, lastBlockStart + blockWidth)
  const overlapWidth = overlapEnd - overlapStart

  clearRow(currentY)

  if (overlapWidth <= 0) {
    placeBlock(currentX, blockWidth, currentY)
    addText("Game Over", { x: 2, y: 6, color: color`red` })
    addText("Score: " + score, { x: 3, y: 8, color: color`white` })
    gameStarted = false
    return
  }

  placeBlock(overlapStart, overlapWidth, currentY)
  currentY -= 1
  if (currentY < 0) {
    addText("You Win!", { x: 3, y: 6, color: color`green` })
    addText("Score: " + score, { x: 3, y: 8, color: color`white` })
    gameStarted = false
    return
  }

  currentX = 0
  blockWidth = overlapWidth
  lastBlockStart = overlapStart
  moving = true
  score += 1
}

onInput("a", () => {
  dropBlock()
})

setInterval(moveBlock, 110)
