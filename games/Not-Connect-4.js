/*
@title: not_connect_4
@author: GithubAnant
@description: A chaotic twist on Connect 4 where the board changes after every move.
@tags: [strategy, chaos, puzzle]
@addedOn: 2025-10-30
*/

const player = "p"
const computer = "c"
const empty = "e"
const playerGray = "g"
const computerGray = "h"

setLegend(
  [ player, bitmap`
................
................
................
.....555555.....
....55555555....
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
....55555555....
.....555555.....
................
................
................` ],
  [ computer, bitmap`
................
................
................
.....333333.....
....33333333....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
................
................
................` ],
  [ empty, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000` ],
  [ playerGray, bitmap`
................
................
................
.....111111.....
....11111111....
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
....11111111....
.....111111.....
................
................
................` ],
  [ computerGray, bitmap`
................
................
................
.....111111.....
....11111111....
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
...1111111111...
....11111111....
.....111111.....
................
................
................` ]
)

let level = 0
const levels = [
  map`
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee
eeeeeee`
]

setMap(levels[level])
setSolids([player, computer, empty])

let currentCol = 3
let isPlayerTurn = true
let gameOver = false
let moveCount = 0
let chaosMode = ""
let chaosActive = false

// Draw cursor
function drawCursor() {
  clearText()
  const cursorPositions = [1, 4, 7, 9, 12, 15, 18]
  addText("v", { x: cursorPositions[currentCol], y: 0, color: color`5` })
  
  if (chaosMode) {
    addText(chaosMode, { x: 1, y: 1, color: color`6` })
  }
  
  if (gameOver) {
    addText("Game Over!", { x: 4, y: 7, color: color`4` })
    addText("Press W", { x: 5, y: 8, color: color`4` })
  }
}

drawCursor()

onInput("a", () => {
  if (gameOver || !isPlayerTurn) return
  currentCol = Math.max(0, currentCol - 1)
  drawCursor()
})

onInput("d", () => {
  if (gameOver || !isPlayerTurn) return
  currentCol = Math.min(6, currentCol + 1)
  drawCursor()
})

onInput("j", () => {
  if (gameOver || !isPlayerTurn) return
  dropPiece(currentCol, player)
})

onInput("w", () => {
  if (!gameOver) return
  resetGame()
})

function dropPiece(col, piece) {
  const tiles = getTile(col, 0)
  
  // Find lowest empty spot
  let row = -1
  for (let r = 5; r >= 0; r--) {
    const tile = getTile(col, r)
    if (tile.length > 0 && tile[0].type === empty) {
      row = r
      break
    }
  }
  
  if (row === -1) return false // Column full
  
  // Place piece
  getTile(col, row)[0].type = piece
  moveCount++
  
  if (checkWin(piece)) {
    gameOver = true
    chaosMode = piece === player ? "YOU WIN!?" : "CPU WINS!"
    drawCursor()
    return true
  }
  
  // Trigger chaos after player move
  if (piece === player) {
    setTimeout(() => {
      triggerChaos()
      // Computer's turn after chaos
      setTimeout(() => {
        if (!gameOver) {
          computerMove()
        }
      }, 1000)
    }, 300)
  } else {
    isPlayerTurn = true
    drawCursor()
  }
  
  return true
}

function computerMove() {
  isPlayerTurn = false
  
  // Computer tries to win or block
  let col = findWinningMove(computer)
  if (col === -1) col = findWinningMove(player)
  if (col === -1) col = Math.floor(Math.random() * 7)
  
  // Find valid column
  let attempts = 0
  while (!canDrop(col) && attempts < 7) {
    col = (col + 1) % 7
    attempts++
  }
  
  if (canDrop(col)) {
    dropPiece(col, computer)
  }
}

function canDrop(col) {
  for (let r = 5; r >= 0; r--) {
    const tile = getTile(col, r)
    if (tile.length > 0 && tile[0].type === empty) return true
  }
  return false
}

function findWinningMove(piece) {
  for (let col = 0; col < 7; col++) {
    if (!canDrop(col)) continue
    
    // Simulate drop
    let row = -1
    for (let r = 5; r >= 0; r--) {
      const tile = getTile(col, r)
      if (tile.length > 0 && tile[0].type === empty) {
        row = r
        break
      }
    }
    
    if (row !== -1) {
      getTile(col, row)[0].type = piece
      const wins = checkWin(piece)
      getTile(col, row)[0].type = empty
      if (wins) return col
    }
  }
  return -1
}

function checkWin(piece) {
  // Check horizontal, vertical, diagonal
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (getTile(c, r)[0]?.type !== piece) continue
      
      // Horizontal
      if (c <= 3) {
        let count = 0
        for (let i = 0; i < 4; i++) {
          if (getTile(c + i, r)[0]?.type === piece) count++
        }
        if (count === 4) return true
      }
      
      // Vertical
      if (r <= 2) {
        let count = 0
        for (let i = 0; i < 4; i++) {
          if (getTile(c, r + i)[0]?.type === piece) count++
        }
        if (count === 4) return true
      }
      
      // Diagonal down-right
      if (r <= 2 && c <= 3) {
        let count = 0
        for (let i = 0; i < 4; i++) {
          if (getTile(c + i, r + i)[0]?.type === piece) count++
        }
        if (count === 4) return true
      }
      
      // Diagonal up-right
      if (r >= 3 && c <= 3) {
        let count = 0
        for (let i = 0; i < 4; i++) {
          if (getTile(c + i, r - i)[0]?.type === piece) count++
        }
        if (count === 4) return true
      }
    }
  }
  return false
}

function triggerChaos() {
  const chaosEvents = [
    flipBoard,
    randomizeBoard,
    makeGrayscale,
    invertColors,
    shuffleRows,
    tiltLeft,
    tiltRight,
    earthquake
  ]
  
  const event = chaosEvents[Math.floor(Math.random() * chaosEvents.length)]
  event()
}

function flipBoard() {
  chaosMode = "FLIPPED!"
  drawCursor()
  
  // Flip horizontally
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 3; c++) {
      const left = getTile(c, r)[0]
      const right = getTile(6 - c, r)[0]
      const temp = left.type
      left.type = right.type
      right.type = temp
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function randomizeBoard() {
  chaosMode = "RANDOMIZED!"
  drawCursor()
  
  const pieces = []
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const type = getTile(c, r)[0].type
      if (type !== empty) pieces.push(type)
    }
  }
  
  // Shuffle pieces
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]]
  }
  
  // Clear board
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      getTile(c, r)[0].type = empty
    }
  }
  
  // Drop pieces randomly with gravity
  for (let piece of pieces) {
    let col = Math.floor(Math.random() * 7)
    let attempts = 0
    while (!canDrop(col) && attempts < 7) {
      col = (col + 1) % 7
      attempts++
    }
    if (canDrop(col)) {
      for (let r = 5; r >= 0; r--) {
        if (getTile(col, r)[0].type === empty) {
          getTile(col, r)[0].type = piece
          break
        }
      }
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function makeGrayscale() {
  chaosMode = "B&W MODE!"
  drawCursor()
  
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const tile = getTile(c, r)[0]
      if (tile.type === player) tile.type = playerGray
      else if (tile.type === computer) tile.type = computerGray
    }
  }
  
  // Gray mode stays on until player makes their next move
  // Will be cleared in dropPiece when player plays
}

function invertColors() {
  chaosMode = "INVERTED!"
  drawCursor()
  
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const tile = getTile(c, r)[0]
      if (tile.type === player) tile.type = computer
      else if (tile.type === computer) tile.type = player
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function shuffleRows() {
  chaosMode = "SHUFFLED!"
  drawCursor()
  
  // Collect all non-empty pieces
  const pieces = []
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const type = getTile(c, r)[0].type
      if (type !== empty) pieces.push(type)
    }
  }
  
  // Shuffle pieces
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]]
  }
  
  // Clear board
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      getTile(c, r)[0].type = empty
    }
  }
  
  // Drop shuffled pieces with gravity
  let pieceIdx = 0
  for (let c = 0; c < 7; c++) {
    let piecesInCol = Math.floor(pieces.length / 7) + (c < pieces.length % 7 ? 1 : 0)
    for (let i = 0; i < piecesInCol && pieceIdx < pieces.length; i++) {
      getTile(c, 5 - i)[0].type = pieces[pieceIdx++]
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function tiltLeft() {
  chaosMode = "TILT LEFT!"
  drawCursor()
  
  // Board tilts left, pieces slide to the left side
  for (let r = 0; r < 6; r++) {
    const pieces = []
    for (let c = 0; c < 7; c++) {
      const type = getTile(c, r)[0].type
      if (type !== empty) pieces.push(type)
      getTile(c, r)[0].type = empty
    }
    // Pack pieces to the left
    for (let i = 0; i < pieces.length; i++) {
      getTile(i, r)[0].type = pieces[i]
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function tiltRight() {
  chaosMode = "TILT RIGHT!"
  drawCursor()
  
  // Board tilts right, pieces slide to the right side
  for (let r = 0; r < 6; r++) {
    const pieces = []
    for (let c = 0; c < 7; c++) {
      const type = getTile(c, r)[0].type
      if (type !== empty) pieces.push(type)
      getTile(c, r)[0].type = empty
    }
    // Pack pieces to the right
    for (let i = 0; i < pieces.length; i++) {
      getTile(6 - i, r)[0].type = pieces[pieces.length - 1 - i]
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function earthquake() {
  chaosMode = "EARTHQUAKE!"
  drawCursor()
  
  // Shake things up - randomly move some pieces around but keep gravity
  for (let c = 0; c < 7; c++) {
    const pieces = []
    for (let r = 0; r < 6; r++) {
      const type = getTile(c, r)[0].type
      if (type !== empty) pieces.push(type)
      getTile(c, r)[0].type = empty
    }
    
    // Randomly drop pieces into nearby columns
    for (let piece of pieces) {
      let targetCol = c + Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
      targetCol = Math.max(0, Math.min(6, targetCol))
      
      // Drop into target column
      for (let r = 5; r >= 0; r--) {
        if (getTile(targetCol, r)[0].type === empty) {
          getTile(targetCol, r)[0].type = piece
          break
        }
      }
    }
  }
  
  checkForWinAfterChaos()
  setTimeout(() => { chaosMode = ""; drawCursor() }, 2000)
}

function checkForWinAfterChaos() {
  if (checkWin(player)) {
    gameOver = true
    chaosMode = "YOU WIN!?"
    drawCursor()
  } else if (checkWin(computer)) {
    gameOver = true
    chaosMode = "CPU WINS!"
    drawCursor()
  }
}

function resetGame() {
  setMap(levels[level])
  currentCol = 3
  isPlayerTurn = true
  gameOver = false
  moveCount = 0
  chaosMode = ""
  drawCursor()
}
