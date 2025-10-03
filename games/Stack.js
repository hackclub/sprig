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
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssssssssss
sssqqqqqsss`
]

setMap(levels[0])

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
  if (!moving) return

  // Clear current row
  clearRow(currentY)

  if (currentX + blockWidth + direction > gridWidth || currentX + direction < 0) {
    direction *= -1
  }

  currentX += direction

  // Draw new position
  placeBlock(currentX, blockWidth, currentY)
}

function dropBlock() {
  moving = false

  const overlapStart = Math.max(currentX, lastBlockStart)
  const overlapEnd = Math.min(currentX + blockWidth, lastBlockStart + blockWidth)
  const overlapWidth = overlapEnd - overlapStart

  clearRow(currentY)

  if (overlapWidth <= 0) {
    // Game Over
    placeBlock(currentX, blockWidth, currentY)
    addText("Game Over", { x: 2, y: 6, color: color`red` })
    addText("Score: " + score, { x: 3, y: 8, color: color`white` })
    return
  }

  // Place the trimmed block
  placeBlock(overlapStart, overlapWidth, currentY)

  // Update for next round
  currentY -= 1
  if (currentY < 0) {
    addText("You Win!", { x: 3, y: 6, color: color`green` })
    addText("Score: " + score, { x: 3, y: 8, color: color`white` })
    return
  }

  currentX = 0
  blockWidth = overlapWidth
  lastBlockStart = overlapStart
  moving = true
  score += 1
}

// Input to drop the block
onInput("a", () => {
  if (moving) {
    dropBlock()
  }
})

// Start moving blocks
setInterval(moveBlock, 110)
