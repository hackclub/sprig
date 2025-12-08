/*
@title: SuperChess
@author: Shubham
@description: Chess, but your brain forgot to render the pieces.
@tags: ['chess', 'strategy', 'board', 'classic', 'two-player']
@addedOn: 2025-12-08
*/

// === PIECE DEFINITIONS ===
const empty = "e"
const cursor = "c"
const highlight = "h"

// White pieces
const wKing = "K"
const wQueen = "Q" 
const wRook = "R"
const wBishop = "B"
const wKnight = "N"
const wPawn = "P"

// Black pieces
const bKing = "k"
const bQueen = "q"
const bRook = "r"
const bBishop = "b"
const bKnight = "n"
const bPawn = "p"

// Board squares
const lightSquare = "l"
const darkSquare = "d"

// === SPRITES AND BITMAPS ===
setLegend(
  [empty, bitmap`
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
................`],
  
  [cursor, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],

  [highlight, bitmap`
5555555555555555
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5..............5
5555555555555555`],

  [lightSquare, bitmap`
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
1111111111111111`],

  [darkSquare, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],

  // White pieces
  [wKing, bitmap`
................
................
......22........
.....2222.......
....222222......
....2.22.2......
...22.22.22.....
...2222222......
...2222222......
...22222222.....
..2222222222....
..2.222222.2....
..2........2....
..2222222222....
................
................`],

  [wQueen, bitmap`
................
................
................
...2..2..2......
..222222222.....
..2.2.22.2.2....
..2.222222.2....
..2.222222.2....
...2222222......
...22222222.....
..2222222222....
..2.222222.2....
..2........2....
..2222222222....
................
................`],

  [wRook, bitmap`
................
................
................
...22.22.22.....
...22.22.22.....
...22222222.....
...22222222.....
....222222......
....222222......
....222222......
....222222......
...22222222.....
..2222222222....
..2222222222....
................
................`],

  [wBishop, bitmap`
................
................
......22........
.....2222.......
....222222......
....222222......
....222222......
.....2222.......
.....2222.......
....222222......
...22222222.....
..2222222222....
..2........2....
..2222222222....
................
................`],

  [wKnight, bitmap`
................
................
.....222........
....22222.......
...222.222......
..222..222......
..22...2222.....
.......2222.....
......22222.....
.....222222.....
....2222222.....
...222222222....
..2.......22....
..2222222222....
................
................`],

  [wPawn, bitmap`
................
................
................
................
......22........
.....2222.......
....222222......
....222222......
.....2222.......
.....2222.......
....222222......
...22222222.....
..2222222222....
..2222222222....
................
................`],

  // Black pieces
  [bKing, bitmap`
................
................
......00........
.....0000.......
....000000......
....0.00.0......
...00.00.00.....
...00000000.....
...00000000.....
...000000000....
..00000000000...
..0.000000.0....
..0........0....
..00000000000...
................
................`],

  [bQueen, bitmap`
................
................
................
...0..0..0......
..000000000.....
..0.0.00.0.0....
..0.000000.0....
..0.000000.0....
...00000000.....
...000000000....
..00000000000...
..0.000000.0....
..0........0....
..00000000000...
................
................`],

  [bRook, bitmap`
................
................
................
...00.00.00.....
...00.00.00.....
...000000000....
...000000000....
....0000000.....
....0000000.....
....0000000.....
....0000000.....
...000000000....
..00000000000...
..00000000000...
................
................`],

  [bBishop, bitmap`
................
................
......00........
.....0000.......
....000000......
....000000......
....000000......
.....0000.......
.....0000.......
....000000......
...000000000....
..00000000000...
..0........0....
..00000000000...
................
................`],

  [bKnight, bitmap`
................
................
.....000........
....00000.......
...000.000......
..000..000......
..00...0000.....
.......0000.....
......00000.....
.....000000.....
....00000000....
...0000000000...
..0.......00....
..00000000000...
................
................`],

  [bPawn, bitmap`
................
................
................
................
......00........
.....0000.......
....000000......
....000000......
.....0000.......
.....0000.......
....000000......
...000000000....
..00000000000...
..00000000000...
................
................`]
)

setSolids([])

// === GAME STATE ===
let board = []
let currentPlayer = "white"
let selectedSquare = null
let cursorX = 4
let cursorY = 6
let gameStarted = false
let possibleMoves = []
let capturedPieces = { white: [], black: [] }
let moveHistory = []
let checkStatus = { white: false, black: false }

// === SOUND EFFECTS ===
const moveSound = tune`
100: C4~100,
3100`

const captureSound = tune`
100: E5~100,
100: C4~100,
3000`

const selectSound = tune`
50: G4~50,
1550`

const errorSound = tune`
150: C3~150,
4650`

const checkSound = tune`
100: B5~100,
100: G5~100,
100: E5~100,
2900`

// === INITIAL BOARD SETUP ===
const levels = [
  map`
rnbqkbnr
pppppppp
eeeeeeee
eeeeeeee
eeeeeeee
eeeeeeee
PPPPPPPP
RNBQKBNR`
]

setMap(levels[0])
setPushables({})

// === INITIALIZATION ===
function initGame() {
  board = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['e','e','e','e','e','e','e','e'],
    ['e','e','e','e','e','e','e','e'],
    ['e','e','e','e','e','e','e','e'],
    ['e','e','e','e','e','e','e','e'],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
  ]
  
  gameStarted = true
  currentPlayer = "white"
  selectedSquare = null
  possibleMoves = []
  capturedPieces = { white: [], black: [] }
  moveHistory = []
  checkStatus = { white: false, black: false }
  cursorX = 4
  cursorY = 6
  
  updateBoard()
  updateDisplay()
}

// === DISPLAY FUNCTIONS ===
function updateBoard() {
  // Clear all sprites
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      clearTile(x, y)
      
      // Add board square
      let squareColor = (x + y) % 2 === 0 ? lightSquare : darkSquare
      addSprite(x, y, squareColor)
      
      // Add piece if exists
      if (board[y][x] !== 'e') {
        addSprite(x, y, board[y][x])
      }
    }
  }
  
  // Show possible moves
  for (let move of possibleMoves) {
    addSprite(move.x, move.y, highlight)
    // Re-add piece on highlighted square if exists
    if (board[move.y][move.x] !== 'e') {
      addSprite(move.x, move.y, board[move.y][move.x])
    }
  }
  
  // Add cursor
  addSprite(cursorX, cursorY, cursor)
}

function updateDisplay() {
  clearText()
  
  // Title
  addText("CHESS", { x: 7, y: 0, color: color`3` })
  
  // Current player with check status
  let playerColor = currentPlayer === "white" ? color`2` : color`0`
  let statusText = currentPlayer === "white" ? "W" : "B"
  if (checkStatus[currentPlayer]) {
    statusText += " CHECK!"
    playerColor = color`3`
  }
  addText(statusText, { x: 1, y: 0, color: playerColor })
  
  // Selected piece info
  if (selectedSquare) {
    let piece = board[selectedSquare.y][selectedSquare.x]
    let pieceName = getPieceName(piece)
    addText(`>${pieceName}`, { x: 9, y: 1, color: color`5` })
  }
  
  // Move counter
  if (moveHistory.length > 0) {
    addText(`M:${moveHistory.length}`, { x: 1, y: 1, color: color`1` })
  }
}
// === CHESS LOGIC ===
function getPieceColor(piece) {
  if (piece === 'e') return null
  return piece === piece.toUpperCase() ? "white" : "black"
}

function getPieceName(piece) {
  switch (piece.toLowerCase()) {
    case 'k': return "King"
    case 'q': return "Queen"
    case 'r': return "Rook"
    case 'b': return "Bishop"
    case 'n': return "Knight"
    case 'p': return "Pawn"
    default: return "Empty"
  }
}

function getAllPossibleMoves(fromX, fromY) {
  let moves = []
  let piece = board[fromY][fromX]
  
  if (piece === 'e') return moves
  
  // Check all squares on board
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (isValidMove(fromX, fromY, x, y, false)) {
        moves.push({x: x, y: y})
      }
    }
  }
  
  return moves
}

function isValidMove(fromX, fromY, toX, toY, checkForCheck = true) {
  if (toX < 0 || toX > 7 || toY < 0 || toY > 7) return false
  
  let piece = board[fromY][fromX]
  let target = board[toY][toX]
  let pieceColor = getPieceColor(piece)
  let targetColor = getPieceColor(target)
  
  // Can't capture own pieces
  if (targetColor === pieceColor) return false
  
  // Check piece-specific movement rules
  if (!isPieceMoveValid(piece, fromX, fromY, toX, toY, target)) {
    return false
  }
  
  // Check if move would leave king in check
  if (checkForCheck) {
    // Simulate move
    let originalTarget = board[toY][toX]
    board[toY][toX] = piece
    board[fromY][fromX] = 'e'
    
    let inCheck = isKingInCheck(pieceColor)
    
    // Undo move
    board[fromY][fromX] = piece
    board[toY][toX] = originalTarget
    
    if (inCheck) return false
  }
  
  return true
}

function isPieceMoveValid(piece, fromX, fromY, toX, toY, target) {
  let dx = toX - fromX
  let dy = toY - fromY
  let pieceColor = getPieceColor(piece)
  
  switch (piece.toLowerCase()) {
    case 'p': // Pawn
      let direction = pieceColor === "white" ? -1 : 1
      let startRow = pieceColor === "white" ? 6 : 1
      
      // Forward move
      if (dx === 0 && target === 'e') {
        if (dy === direction) return true
        if (fromY === startRow && dy === direction * 2 && 
            board[fromY + direction][fromX] === 'e') return true
      }
      // Diagonal capture
      if (Math.abs(dx) === 1 && dy === direction && target !== 'e') {
        return true
      }
      return false
      
    case 'r': // Rook
      return (dx === 0 || dy === 0) && isPathClear(fromX, fromY, toX, toY)
      
    case 'n': // Knight
      return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || 
             (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      
    case 'b': // Bishop
      return Math.abs(dx) === Math.abs(dy) && isPathClear(fromX, fromY, toX, toY)
      
    case 'q': // Queen
      return ((dx === 0 || dy === 0) || (Math.abs(dx) === Math.abs(dy))) && 
             isPathClear(fromX, fromY, toX, toY)
      
    case 'k': // King
      return Math.abs(dx) <= 1 && Math.abs(dy) <= 1
  }
  
  return false
}

function isPathClear(fromX, fromY, toX, toY) {
  let dx = toX - fromX
  let dy = toY - fromY
  let steps = Math.max(Math.abs(dx), Math.abs(dy))
  
  if (steps === 0) return true
  
  let stepX = dx === 0 ? 0 : dx / Math.abs(dx)
  let stepY = dy === 0 ? 0 : dy / Math.abs(dy)
  
  for (let i = 1; i < steps; i++) {
    let checkX = fromX + stepX * i
    let checkY = fromY + stepY * i
    if (board[checkY][checkX] !== 'e') {
      return false
    }
  }
  
  return true
}

function findKing(color) {
  let kingChar = color === "white" ? 'K' : 'k'
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x] === kingChar) {
        return {x: x, y: y}
      }
    }
  }
  return null
}

function isKingInCheck(color) {
  let king = findKing(color)
  if (!king) return false
  
  let enemyColor = color === "white" ? "black" : "white"
  
  // Check if any enemy piece can attack the king
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let piece = board[y][x]
      if (piece !== 'e' && getPieceColor(piece) === enemyColor) {
        if (isPieceMoveValid(piece, x, y, king.x, king.y, 'K')) {
          return true
        }
      }
    }
  }
  
  return false
}

function isCheckmate(color) {
  // First check if king is in check
  if (!isKingInCheck(color)) return false
  
  // Try all possible moves for all pieces of this color
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let piece = board[y][x]
      if (piece !== 'e' && getPieceColor(piece) === color) {
        // Try all possible destinations
        for (let destY = 0; destY < 8; destY++) {
          for (let destX = 0; destX < 8; destX++) {
            if (isValidMove(x, y, destX, destY, true)) {
              // Found a valid move - not checkmate
              return false
            }
          }
        }
      }
    }
  }
  
  // No valid moves found - checkmate!
  return true
}

function makeMove(fromX, fromY, toX, toY) {
  let piece = board[fromY][fromX]
  let target = board[toY][toX]
  
  // Record move
  moveHistory.push({
    from: {x: fromX, y: fromY},
    to: {x: toX, y: toY},
    piece: piece,
    captured: target
  })
  
  // Capture piece
  if (target !== 'e') {
    capturedPieces[getPieceColor(target)].push(target)
    playTune(captureSound)
  } else {
    playTune(moveSound)
  }
  
  // Move piece
  board[toY][toX] = piece
  board[fromY][fromX] = 'e'
  
  // Check for pawn promotion
  if (piece.toLowerCase() === 'p') {
    if ((piece === 'P' && toY === 0) || (piece === 'p' && toY === 7)) {
      // Auto-promote to queen
      board[toY][toX] = piece === 'P' ? 'Q' : 'q'
    }
  }
  
  // Switch players
  currentPlayer = currentPlayer === "white" ? "black" : "white"
  
  // Check for check/checkmate
  checkStatus.white = isKingInCheck("white")
  checkStatus.black = isKingInCheck("black")
  
  if (checkStatus[currentPlayer]) {
    playTune(checkSound)
    if (isCheckmate(currentPlayer)) {
      let winner = currentPlayer === "white" ? "BLACK" : "WHITE"
      addText(`${winner} WINS!`, { x: 5, y: 7, color: color`3` })
      gameStarted = false
    }
  }
  
  updateBoard()
  updateDisplay()
}

// === CONTROLS ===
onInput("w", () => {
  if (gameStarted && cursorY > 0) {
    cursorY--
    updateBoard()
  }
})

onInput("s", () => {
  if (gameStarted && cursorY < 7) {
    cursorY++
    updateBoard()
  }
})

onInput("a", () => {
  if (gameStarted && cursorX > 0) {
    cursorX--
    updateBoard()
  }
})

onInput("d", () => {
  if (gameStarted && cursorX < 7) {
    cursorX++
    updateBoard()
  }
})

onInput("i", () => {
  if (!gameStarted) return
  
  let piece = board[cursorY][cursorX]
  
  if (selectedSquare === null) {
    // Select piece
    if (piece !== 'e' && getPieceColor(piece) === currentPlayer) {
      selectedSquare = {x: cursorX, y: cursorY}
      possibleMoves = getAllPossibleMoves(cursorX, cursorY)
      playTune(selectSound)
      updateBoard()
      updateDisplay()
    }
  } else {
    // Try to move or reselect
    if (selectedSquare.x === cursorX && selectedSquare.y === cursorY) {
      // Deselect
      selectedSquare = null
      possibleMoves = []
      playTune(selectSound)
    } else if (isValidMove(selectedSquare.x, selectedSquare.y, cursorX, cursorY)) {
      // Make the move
      makeMove(selectedSquare.x, selectedSquare.y, cursorX, cursorY)
      selectedSquare = null
      possibleMoves = []
    } else {
      // Try to select new piece
      if (piece !== 'e' && getPieceColor(piece) === currentPlayer) {
        selectedSquare = {x: cursorX, y: cursorY}
        possibleMoves = getAllPossibleMoves(cursorX, cursorY)
        playTune(selectSound)
      } else {
        // Invalid move
        playTune(errorSound)
        selectedSquare = null
        possibleMoves = []
      }
    }
    updateBoard()
    updateDisplay()
  }
})

onInput("j", () => {
  // Cancel selection
  if (selectedSquare !== null) {
    selectedSquare = null
    possibleMoves = []
    playTune(selectSound)
    updateBoard()
    updateDisplay()
  }
})

onInput("k", () => {
  // Reset game
  initGame()
})

// === START GAME ===
initGame()
