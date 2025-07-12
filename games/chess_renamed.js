/*
@title: Chess
@author: Krish Arora
@tags: []
@addedOn: 2024-01-01
@description: A classic game of chess implemented in Sprig. Play against a friend in this turn-based strategy game where you move pieces on an 8x8 board. White moves first, and the goal is to checkmate your opponent's king. Features include piece movement validation, check/checkmate detection, and insufficient material draw conditions.
*/

const selectedEmpty = "s"
const lightEmpty = "m"
const darkEmpty = "M"

const pawnWhiteLightSquare = "p"
const knightWhiteLightSquare = "n"
const bishopWhiteLightSquare = "b"
const rookWhiteLightSquare = "r"
const queenWhiteLightSquare = "q"
const kingWhiteLightSquare = "k"

const pawnWhiteDarkSquare = "P"
const knightWhiteDarkSquare = "N"
const bishopWhiteDarkSquare = "B"
const rookWhiteDarkSquare = "R"
const queenWhiteDarkSquare = "Q"
const kingWhiteDarkSquare = "K"

const pawnWhiteSelectedSquare = "1"
const knightWhiteSelectedSquare = "2"
const bishopWhiteSelectedSquare = "3"
const rookWhiteSelectedSquare = "4"
const queenWhiteSelectedSquare = "5"
const kingWhiteSelectedSquare = "6"

const pawnBlackLightSquare = "a"
const knightBlackLightSquare = "c"
const bishopBlackLightSquare = "e"
const rookBlackLightSquare = "f"
const queenBlackLightSquare = "g"
const kingBlackLightSquare = "h"

const pawnBlackDarkSquare = "A"
const knightBlackDarkSquare = "C"
const bishopBlackDarkSquare = "E"
const rookBlackDarkSquare = "F"
const queenBlackDarkSquare = "G"
const kingBlackDarkSquare = "H"

const pawnBlackSelectedSquare = "!"
const knightBlackSelectedSquare = "@"
const bishopBlackSelectedSquare = "#"
const rookBlackSelectedSquare = "$"
const queenBlackSelectedSquare = "%"
const kingBlackSelectedSquare = "^"

setLegend(
  [ pawnBlackDarkSquare, bitmap`
5555555555555555
5555555555555555
5555555005555555
5555550220555555
5555502002055555
5555502002055555
5555550220555555
5555502002055555
5555502002055555
5555502002055555
5555502002055555
5555020000205555
5550222222220555
5550000000000555
5550222222220555
5550000000000555` ],
  [ knightBlackDarkSquare, bitmap`
5555555022055555
5555505002005555
5555020000020555
5550202000002055
5502020002002055
5020000220002055
5020022020000205
5502200020000205
5550055020000205
5555550200000205
5555502000002055
5555020000002055
5555020000002055
5550000000000005
5550222222222205
5550000000000005` ],
  [ bishopBlackDarkSquare, bitmap`
5555555005555555
5555550220555555
5555555005555555
5555550220555555
5555502002055555
5555020000205555
5550200002020555
5550200020020555
5550200000020555
5555020000205555
5555022222205555
5555020000205555
5555502002055555
5555020000205555
5550222222220555
5550000000000555` ],
  [ rookBlackDarkSquare, bitmap`
5500002002000055
5502220220222055
5502022002202055
5502000000002055
5502222222222055
5550200000020555
5555020000205555
5555020000205555
5555020000205555
5555020000205555
5555020000205555
5550200000020555
5550222222220555
5502000000002055
5502222222222055
5500000000000055` ],
  [ queenBlackDarkSquare, bitmap`
5555555005555555
5555550220555555
0555550220555550
0055502002055500
0200502002050020
0222020000202220
0200200000020020
5020000000000205
5020000000000205
5020222222220205
5502000000002055
5502222222222055
5022000000002205
5020000000000205
5002222222222005
5550000000000555` ],
  [ kingBlackDarkSquare, bitmap`
5555550000555555
5555500220055555
5555502002055555
5550002002000555
5502220220222055
5020002002000205
0200000220000020
0200000220000020
0200000220000020
0200000000000020
5020222222220205
5502000000002055
5502222222222055
5502000000002055
5500222222220055
5550000000000555` ],
  
  [ pawnBlackLightSquare, bitmap`
7777777777777777
7777777777777777
7777777007777777
7777770220777777
7777702002077777
7777702002077777
7777770220777777
7777702002077777
7777702002077777
7777702002077777
7777702002077777
7777020000207777
7770222222220777
7770000000000777
7770222222220777
7770000000000777` ],
  [ knightBlackLightSquare, bitmap`
7777777022077777
7777707002007777
7777020000020777
7770202000002077
7702020002002077
7020000220002077
7020022020000207
7702200020000207
7770077020000207
7777770200000207
7777702000002077
7777020000002077
7777020000002077
7770000000000007
7770222222222207
7770000000000007` ],
  [ bishopBlackLightSquare, bitmap`
7777777007777777
7777770220777777
7777777007777777
7777770220777777
7777702002077777
7777020000207777
7770200002020777
7770200020020777
7770200000020777
7777020000207777
7777022222207777
7777020000207777
7777702002077777
7777020000207777
7770222222220777
7770000000000777` ],
  [ rookBlackLightSquare, bitmap`
7700002002000077
7702220220222077
7702022002202077
7702000000002077
7702222222222077
7770200000020777
7777020000207777
7777020000207777
7777020000207777
7777020000207777
7777020000207777
7770200000020777
7770222222220777
7702000000002077
7702222222222077
7700000000000077` ],
  [ queenBlackLightSquare, bitmap`
7777777007777777
7777770220777777
0777770220777770
0077702002077700
0200702002070020
0222020000202220
0200200000020020
7020000000000207
7020000000000207
7020222222220207
7702000000002077
7702222222222077
7022000000002207
7020000000000207
7002222222222007
7770000000000777` ],
  [ kingBlackLightSquare, bitmap`
7777770000777777
7777700220077777
7777702002077777
7770002002000777
7702220220222077
7020002002000207
0200000220000020
0200000220000020
0200000220000020
0200000000000020
7020222222220207
7702000000002077
7702222222222077
7702000000002077
7700222222220077
7770000000000777` ],
  
  [ pawnBlackSelectedSquare, bitmap`
3333333333333333
3333333333333333
3333333003333333
3333330220333333
3333302002033333
3333302002033333
3333330220333333
3333302002033333
3333302002033333
3333302002033333
3333302002033333
3333020000203333
3330222222220333
3330000000000333
3330222222220333
3330000000000333` ],
  [ knightBlackSelectedSquare, bitmap`
3333333022033333
3333303002003333
3333020000020333
3330202000002033
3302020002002033
3020000220002033
3020022020000203
3302200020000203
3330033020000203
3333330200000203
3333302000002033
3333020000002033
3333020000002033
3332222222222223
3332000000000023
3332222222222223` ],
  [ bishopBlackSelectedSquare, bitmap`
3333333003333333
3333330220333333
3333333003333333
3333330220333333
3333302002033333
3333020000203333
3330200002020333
3330200020020333
3330200000020333
3333020000203333
3333022222203333
3333020000203333
3333302002033333
3333020000203333
3330222222220333
3330000000000333` ],
  [ rookBlackSelectedSquare, bitmap`
3322220220222233
3320002002000233
3320200220020233
3320222222220233
3320000000000233
3332022222202333
3333202222023333
3333202222023333
3333202222023333
3333202222023333
3333202222023333
3332022222202333
3332000000002333
3320222222220233
3320000000000233
3322222222222233` ],
  [ queenBlackSelectedSquare, bitmap`
3333333003333333
3333330220333333
2333330220333332
2233320220233322
2022320220232202
2000202222020002
2022022222202202
3202222222222023
3202222222222023
3202000000002023
3320222222220233
3320000000000233
3200222222220023
3202222222222023
3220000000000223
3332222222222333` ],
  [ kingBlackSelectedSquare, bitmap`
3333330000333333
3333300220033333
3333302002033333
3330002002000333
3302220220222033
3020002002000203
0200000220000020
0200000220000020
0200000220000020
0200000000000020
3020222222220203
3302000000002033
3302222222222033
3302000000002033
3300222222220033
3330000000000333` ],
  
  [ selectedEmpty, bitmap`
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
  [ darkEmpty, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ lightEmpty, bitmap`
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
7777777777777777` ]
)

const screens = [
  map`
fCeGhEcF
AaAaAaAa
mMmMmMmM
MmMmMmMm
mMmMmMmM
MmMmMmMm
pPpPpPpP
RnBqKbNr`, 
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
]
let board

const placeSound = tune`
147.05882352941177,
147.05882352941177: F5~147.05882352941177 + E5-147.05882352941177,
147.05882352941177: E5~147.05882352941177 + D5-147.05882352941177,
4264.705882352941`

const selectSound = tune`
500: C5~500 + B4-500,
15500`

const cannotSelectSound = tune`
152.28426395939087: E4~152.28426395939087 + D4-152.28426395939087,
152.28426395939087: F4~152.28426395939087 + E4-152.28426395939087,
4568.527918781726`

const wasdSound = tune`
500: D5/500,
15500`

const endSound = tune`
97.71986970684038: B4-97.71986970684038 + C5-97.71986970684038,
97.71986970684038,
97.71986970684038: E5-97.71986970684038 + C5-97.71986970684038,
97.71986970684038: B4-97.71986970684038,
97.71986970684038: B4-97.71986970684038 + C5-97.71986970684038,
2638.4364820846904`

const startSound = tune`
73.17073170731707: E5/73.17073170731707 + F5/73.17073170731707,
73.17073170731707: D5/73.17073170731707 + C5/73.17073170731707,
73.17073170731707: B4/73.17073170731707 + A4/73.17073170731707,
73.17073170731707: A4/73.17073170731707 + G4/73.17073170731707,
73.17073170731707: G4/73.17073170731707 + F4/73.17073170731707,
73.17073170731707: F4/73.17073170731707 + E4/73.17073170731707,
73.17073170731707: G4/73.17073170731707 + A4/73.17073170731707,
73.17073170731707: B4/73.17073170731707 + C5/73.17073170731707,
73.17073170731707: D5/73.17073170731707 + E5/73.17073170731707,
73.17073170731707: F5/73.17073170731707 + G5/73.17073170731707,
73.17073170731707: A5/73.17073170731707 + B5/73.17073170731707,
1536.5853658536585`

// Screen control functions
function getSprite(board, x, y) {
  if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
    return board[y][x]
  } else {
    return '.'
  }
}

function setSprite(board, x, y, newSprite) {
    clearTile(x, y)
    addSprite(x, y, newSprite)
    board[y][x] = newSprite
}

function darkOrLight(x, y) {
  if ((x+y) % 2 == 0) {
    return 'light'
  } else {
    return 'dark'
  }
}

// Selection functions
function selectSquare(board, x, y) {
  let sprites = ['m', 'p', 'n', 'b', 'r', 'q', 'k', 'a', 'c', 'e', 'f', 'g', 'h']
  let correspondingSprites = ['s', '1', '2', '3', '4', '5', '6', '!', '@', '#', '$', '%', '^']

  // Invert X and Y into absolute position
  x = x - 1
  y = 8 - y

  let sprite = getSprite(board, x, y).toLowerCase()
  
  if (sprites.includes(sprite)) {
    let indexOfSprite = sprites.indexOf(sprite)
    let newSprite = correspondingSprites[indexOfSprite]

    setSprite(board, x, y, newSprite)
  }
}

function unselectSquare(board, x, y) {
  const sprites = ['s', '1', '2', '3', '4', '5', '6', '!', '@', '#', '$', '%', '^'];
  const correspondingSprites = ['m', 'p', 'n', 'b', 'r', 'q', 'k', 'a', 'c', 'e', 'f', 'g', 'h'];

  // Invert X and Y into absolute position
  x = x - 1;
  y = 8 - y;
  
  let sprite = getSprite(board, x, y);
  
  if (sprites.includes(sprite)) {
    let indexOfSprite = sprites.indexOf(sprite);
    let newSprite = correspondingSprites[indexOfSprite];

    if (darkOrLight(x, y) == 'dark') {
      newSprite = newSprite.toUpperCase()
    }
  
    setSprite(board, x, y, newSprite)
  }
}

function unselectAllSquares(board) {
  const sprites = ['s', 's', '1', '2', '3', '4', '5', '6', '!', '@', '#', '$', '%', '^'];
  const correspondingSprites = ['d', 'l', 'p', 'n', 'b', 'r', 'q', 'k', 'a', 'c', 'e', 'f', 'g', 'h'];

  for (let x = 1; x <= 8; x++) {
    for (let y = 1; y <= 8; y++) {
      unselectSquare(board, x, y)
    }
  }
}

// Information retrieval functions
function checkPiece(board, x, y) {
  const spritesForWhite = ['p', 'n', 'b', 'r', 'q', 'k', '1', '2', '3', '4', '5', '6'];
  const correspondingNamesForWhite = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King', 'Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King'];
  
  const spritesForBlack = ['a', 'c', 'e', 'f', 'g', 'h', '!', '@', '#', '$', '%', '^'];
  const correspondingNamesForBlack = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King', 'Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King'];

  // Invert X and Y into absolute position
  x = x - 1
  y = 8 - y

  let sprite = getSprite(board, x, y).toLowerCase()

  if (spritesForWhite.includes(sprite)) {
    let indexOfSprite = spritesForWhite.indexOf(sprite);
    let name = correspondingNamesForWhite[indexOfSprite];
    return ["White", name]
  } else if (spritesForBlack.includes(sprite)) {
    let indexOfSprite = spritesForBlack.indexOf(sprite);
    let name = correspondingNamesForBlack[indexOfSprite];
    return ["Black", name]
  } else if (sprite == 'm' || sprite == 's') {
    return 'empty'
  } else {
    return 'out of board'
  }
}

function checkPossibleMoves(board, x, y) {
  let piece = checkPiece(board, x, y)

  if (piece == 'empty') {
    return 'empty'
  }
  
  let pieceColor = piece[0]
  let pieceName = piece[1]
  let possibleMoves = []

  if (pieceName == 'Pawn') {
    // Check Forward Piece
    let forwardPiece = checkPiece(board, x, y+1)
    if (forwardPiece == 'empty') {
      possibleMoves.push([x, y+1])
    }

    // Check Two Forward Piece if at Start
    if (y == 2) {
      let twoForwardPiece = checkPiece(board, x, y+2)
      if (twoForwardPiece == 'empty') {
        possibleMoves.push([x, y+2])
      }
    }

    // Check diagonal captures
    let rightDiagonalPiece = checkPiece(board, x-1, y+1)
    if (rightDiagonalPiece != 'empty' && rightDiagonalPiece != 'out of board' && rightDiagonalPiece[0] != pieceColor) {
      possibleMoves.push([x-1, y+1])
    }

    // Check diagonal captures
    let leftDiagonalPiece = checkPiece(board, x+1, y+1)
    if (leftDiagonalPiece != 'empty' && leftDiagonalPiece != 'out of board' && leftDiagonalPiece[0] != pieceColor) {
      possibleMoves.push([x+1, y+1])
    }
  }
  
  if (pieceName == 'Knight') {
    // Check Top Middle Right
    let topMiddleRight = checkPiece(board, x+1, y+2)
    if (topMiddleRight != 'out of board' && (topMiddleRight == 'empty' || topMiddleRight[0] != pieceColor)) {
      possibleMoves.push([x+1, y+2])
    }
    
    // Check Top Middle Left
    let topMiddleLeft = checkPiece(board, x-1, y+2)
    if (topMiddleLeft != 'out of board' && (topMiddleLeft == 'empty' || topMiddleLeft[0] != pieceColor)) {
      possibleMoves.push([x-1, y+2])
    }
    
    // Check Top Right
    let topRight = checkPiece(board, x+2, y+1)
    if (topRight != 'out of board' && (topRight == 'empty' || topRight[0] != pieceColor)) {
      possibleMoves.push([x+2, y+1])
    }

    // Check Top Left
    let topLeft = checkPiece(board, x-2, y+1)
    if (topLeft != 'out of board' && (topLeft == 'empty' || topLeft[0] != pieceColor)) {
      possibleMoves.push([x-2, y+1])
    }

    // Check Bottom Middle Right
    let bottomMiddleRight = checkPiece(board, x+1, y-2)
    if (bottomMiddleRight != 'out of board' && (bottomMiddleRight == 'empty' || bottomMiddleRight[0] != pieceColor)) {
      possibleMoves.push([x+1, y-2])
    }

    // Check Bottom Middle Left
    let bottomMiddleLeft = checkPiece(board, x-1, y-2)
    if (bottomMiddleLeft != 'out of board' && (bottomMiddleLeft == 'empty' || bottomMiddleLeft[0] != pieceColor)) {
      possibleMoves.push([x-1, y-2])
    }

    // Check Bottom Right
    let bottomRight = checkPiece(board, x+2, y-1)
    if (bottomRight != 'out of board' && (bottomRight == 'empty' || bottomRight[0] != pieceColor)) {
      possibleMoves.push([x+2, y-1])
    }

    // Check Bottom Left
    let bottomLeft = checkPiece(board, x-2, y-1)
    if (bottomLeft != 'out of board' && (bottomLeft == 'empty' || bottomLeft[0] != pieceColor)) {
      possibleMoves.push([x-2, y-1])
    }
  }
  
  if (pieceName == 'Bishop' || pieceName == 'Queen') {
    // Top Right Diagonal
    for (let i = 1; i <= 7; i++) {
      let squarex = x+i
      let squarey = y+i
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }

    // Top Left Diagonal
    for (let i = 1; i <= 7; i++) {
      let squarex = x-i
      let squarey = y+i
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }

    // Bottom Right Diagonal
    for (let i = 1; i <= 7; i++) {
      let squarex = x+i
      let squarey = y-i
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }

    // Bottom Left Diagonal
    for (let i = 1; i <= 7; i++) {
      let squarex = x-i
      let squarey = y-i
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }
  } 
  
  if (pieceName == 'Rook' || pieceName == 'Queen') {
    // Up Line
    for (let i = 1; i <= 7; i++) {
      let squarex = x
      let squarey = y+i
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }

    // Down Line
    for (let i = 1; i <= 7; i++) {
      let squarex = x
      let squarey = y-i
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }

    // Left Line
    for (let i = 1; i <= 7; i++) {
      let squarex = x-i
      let squarey = y
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }

    // Right Line
    for (let i = 1; i <= 7; i++) {
      let squarex = x+i
      let squarey = y
      let square = checkPiece(board, squarex, squarey)
      if (square != 'out of board') {
        if (square == 'empty') {
          possibleMoves.push([squarex, squarey])
        } else if (square[0] != pieceColor) {
          possibleMoves.push([squarex, squarey])
          break
        } else {
          break
        }
      }
    }
  }

  if (pieceName == 'King') {
    // Up
    let up = checkPiece(board, x, y+1)
    if (up != 'out of board' && (up == 'empty' || up[0] != pieceColor)) {
      possibleMoves.push([x, y+1])
    }

    // Down
    let down = checkPiece(board, x, y-1)
    if (down != 'out of board' && (down == 'empty' || down[0] != pieceColor)) {
      possibleMoves.push([x, y-1])
    }

    // Left
    let left = checkPiece(board, x-1, y)
    if (left != 'out of board' && (left == 'empty' || left[0] != pieceColor)) {
      possibleMoves.push([x-1, y])
    }

    // Right
    let right = checkPiece(board, x+1, y)
    if (right != 'out of board' && (right == 'empty' || right[0] != pieceColor)) {
      possibleMoves.push([x+1, y])
    }

    // Top Right
    let topRight = checkPiece(board, x+1, y+1)
    if (topRight != 'out of board' && (topRight == 'empty' || topRight[0] != pieceColor)) {
      possibleMoves.push([x+1, y+1])
    }

    // Top Left
    let topLeft = checkPiece(board, x-1, y+1)
    if (topLeft != 'out of board' && (topLeft == 'empty' || topLeft[0] != pieceColor)) {
      possibleMoves.push([x-1, y+1])
    }

    // Bottom Right
    let bottomRight = checkPiece(board, x+1, y-1)
    if (bottomRight != 'out of board' && (bottomRight == 'empty' || bottomRight[0] != pieceColor)) {
      possibleMoves.push([x+1, y-1])
    }

    // Bottom Left
    let bottomLeft = checkPiece(board, x-1, y-1)
    if (bottomLeft != 'out of board' && (bottomLeft == 'empty' || bottomLeft[0] != pieceColor)) {
      possibleMoves.push([x-1, y-1])
    }
  }

  return possibleMoves
}

function simulateBoard(board, x, y, toX, toY) {
  x = x - 1
  y = 8 - y
  toX = toX - 1
  toY = 8 - toY
  let simulatedBoard = board.map(row => row.slice());

  if (darkOrLight(toX, toY) == 'dark') {
    simulatedBoard[toY][toX] = simulatedBoard[y][x].toUpperCase()
  } else {
    simulatedBoard[toY][toX] = simulatedBoard[y][x].toLowerCase()
  }

  if (darkOrLight(x, y) == 'dark') {
    simulatedBoard[y][x] = 'M'
  } else {
    simulatedBoard[y][x] = 'm'
  }

  return simulatedBoard
}

// Game state validator functions
function isCheck(board) {
  let whiteKingX
  let whiteKingY
  let blackKingX
  let blackKingY
  let whiteControls = new Set()
  let blackControls = new Set()

  for (let x = 0; x <= 7; x++) {
    for (let y = 0; y <= 7; y++) {
      let sprite = getSprite(board, x, y).toLowerCase();
      
      if (sprite == 'k' || sprite == '6') {
        whiteKingX = x;
        whiteKingY = y;
      } else if (sprite == 'h' || sprite == '^') {
        blackKingX = x;
        blackKingY = y;
      } 
      
      let piece = checkPiece(board, x + 1, 8 - y);
      if (piece[0] == 'White') {
        checkPossibleMoves(board, x + 1, 8 - y).forEach(move => {
          whiteControls.add(JSON.stringify(move));
        });
      } else if (piece[0] == 'Black') {
        checkPossibleMoves(board, x + 1, 8 - y).forEach(move => {
          blackControls.add(JSON.stringify(move));
        });
      }
    }
  }

  whiteControls = Array.from(whiteControls).map(JSON.parse)
  blackControls = Array.from(blackControls).map(JSON.parse)

  function containsCoordinate(array, coordinate) {
    return array.some(item => item[0] === coordinate[0] && item[1] === coordinate[1]);
  }

  whiteKingX = whiteKingX + 1
  whiteKingY = 8 - whiteKingY
  blackKingX = blackKingX + 1
  blackKingY = 8 - blackKingY
  
  if (containsCoordinate(blackControls, [whiteKingX, whiteKingY])) {
    return 'White Is Checked';
  } else if (containsCoordinate(whiteControls, [blackKingX, blackKingY])) {
    return 'Black Is Checked';
  } else {
    return 'No Check';
  }
}

function isCheckmate(board) {
  let checkStatus = isCheck(board);
  if (checkStatus === 'No Check') {
    return 'No Checkmates';
  }

  let colorInCheck = checkStatus === 'White Is Checked' ? 'White' : 'Black';
  
  // Simulate all possible moves to see if they stop checkmate
  for (let x = 1; x <= 8; x++) {
    for (let y = 1; y <= 8; y++) {
      let piece = checkPiece(board, x, y);
      if (piece[0] === colorInCheck) {
        let moves = checkPossibleMoves(board, x, y);
        if (moves !== 'empty') {
          for (let move of moves) {
            let [toX, toY] = move;
            simulatedBoard = simulateBoard(board, x, y, toX, toY)
            
            // Check if the simulated move prevents check
            if (isCheck(simulatedBoard) == "No Checkmates") {
              return "Not checkmate";
            }
          }
        }
      }
    }
  }

  return colorInCheck === 'White' ? 'White is in Checkmate' : 'Black is in Checkmate';
}

function isStalemate(board) {
  let checkStatus = isCheck(board);
  if (checkStatus !== 'No Check') {
    return false;
  }

  let whiteHasNoMoves = true
  let blackHasNoMoves = true

  // Check all squares to see if the player has any legal moves
  for (let x = 1; x <= 8; x++) {
    for (let y = 1; y <= 8; y++) {
      let piece = checkPiece(board, x, y)
      if (piece[0] === 'White') {
        let moves = checkPossibleMoves(board, x, y)
        if (moves !== 'empty') {
          for (let move of moves) {
            let [toX, toY] = move;
            
            simulatedBoard = simulateBoard(board, x, y, toX, toY)
            
            // Check if the simulated move prevents check
            if (isCheck(simulatedBoard) != 'White Is Checked') {
              whiteHasNoMoves = false
            }
          }
        }
      } else if (piece[0] === 'Black') {
        let moves = checkPossibleMoves(board, x, y)
        if (moves !== 'empty') {
          for (let move of moves) {
            let [toX, toY] = move;
            
            simulatedBoard = simulateBoard(board, x, y, toX, toY)
            
            // Check if the simulated move prevents check
            if (isCheck(simulatedBoard) != 'Black Is Checked') {
              blackHasNoMoves = false
            }
          }
        }
      }
    }
  }

  if (whiteHasNoMoves || blackHasNoMoves) {
    return true;
  } else {
    return false;
  }
}

function isDrawByInsufficientMaterial(board) {
  let whiteHasInsufficientMaterial = true
  let blackHasInsufficientMaterial = true
  let whitePieces = []
  let blackPieces = []

  for (let x = 1; x <= 8; x++) {
    for (let y = 1; y <= 8; y++) {
      let piece = checkPiece(board, x, y)

      if (piece[0] == 'White') {
        whitePieces.push(piece[1])
      } else if (piece[0] == 'Black') {
        blackPieces.push(piece[1])
      }
    }
  }

  if (whitePieces.includes('Pawn') || whitePieces.includes('Rook') || whitePieces.includes('Queen')) {
    whiteHasInsufficientMaterial = false
  } else if ((whitePieces.filter(x => x === 'Bishop').length >= 2) || (whitePieces.includes('Bishop') && whitePieces.includes('Knight'))) {
    whiteHasInsufficientMaterial = false
  }

  if (blackPieces.includes('Pawn') || blackPieces.includes('Rook') || blackPieces.includes('Queen')) {
    blackHasInsufficientMaterial = false
  } else if ((blackPieces.filter(x => x === 'Bishop').length >= 2) || (blackPieces.includes('Bishop') && blackPieces.includes('Knight'))) {
    blackHasInsufficientMaterial = false
  }

  if (whiteHasInsufficientMaterial && blackHasInsufficientMaterial) {
    return true
  }
  return false
}

// Main game cycle functions
function checkState(board) {
  if (isCheckmate(board) == 'Black is in Checkmate') {
    return ['White wins', 'Checkmate']
  } else if (isCheckmate(board) == 'White is in Checkmate') {
    return ['Black wins', 'Checkmate']
  } else if (isStalemate(board)) {
    return ['Draw', 'Stalemate']
  } else if (isDrawByInsufficientMaterial(board)) {
    return ['Draw', 'Insuff. Material']
  } else {
    return 'Ongoing'
  }
}

function move(board, x, y, toX, toY) {
  let piece = checkPiece(board, x, y)
  let simulatedBoard = simulateBoard(board, x, y, toX, toY)

  if (piece[0] != 'White' && piece[0] != 'Black') {
    return null;
  }
  
  // Check if it is a legal move
  if (!checkPossibleMoves(board, x, y).some(move => move[0] === toX && move[1] === toY)) {
    return null;
  }
  
  // Check for move leading to check
  if ((isCheck(simulatedBoard) == 'White Is Checked' && piece[0] == 'White') || (isCheck(simulatedBoard) == 'Black Is Checked' && piece[0] == 'Black')) {
    return null;
  }

  // Make move
  x = x - 1
  y = 8 - y
  toX = toX - 1
  toY = 8 - toY

  lastMoves.push(JSON.parse(JSON.stringify(board)))
  
  if (darkOrLight(toX, toY) == 'dark') {
    if (!(checkPiece(board, x+1, 8-y)[1] == 'Pawn' && 8-y == 7)) {
      setSprite(board, toX, toY, board[y][x].toUpperCase())
    } else {
      let queen = checkPiece(board, x, y)[0] == 'White' ? 'q' : 'g'
      setSprite(board, toX, toY, queen.toUpperCase())
    }
  } else {
    if (!(checkPiece(board, x+1, 8-y)[1] == 'Pawn' && 8-y == 7)) {
      setSprite(board, toX, toY, board[y][x].toLowerCase())
    } else {
      let queen = checkPiece(board, x+1, 8-y)[0] == 'White' ? 'q' : 'g'
      setSprite(board, toX, toY, queen.toLowerCase())
    }
  }

  if (darkOrLight(x, y) == 'dark') {
    setSprite(board, x, y, 'M')
  } else {
    setSprite(board, x, y, 'm')
  }
  
  return 'Successful'
}

function flipBoard(board) {
  let flippedBoard = [[], [], [], [], [], [], [], []]

  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      flippedBoard[y].push(board[7-y][7-x])
    }
  }

  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      setSprite(board, x, y, flippedBoard[y][x])
    }
  }
}

function startGame() {
  setMap(screens[0])
  clearText()

  board = [[], [], [], [], [], [], [], []]
  const content = screens[0].startsWith('\n') ? screens[0].substring(1) : screens[0];
  const rows = content.split('\n')
  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      board[y].push(rows[y][x])
    }
  }

  selectedX = 5
  selectedY = 4
  placingX = 5
  placingY = 4
  isPlacing = false
  turn = 'White'
  isPlaying = true
  lastMoves = []
  selectSquare(board, selectedX, selectedY)
}

function endGame(state, reason) {
  setMap(screens[1])
  let x = 20 - state.length
  addText(state, {x: x/2, y: 6, color: color`0`})
  x = 20 - reason.length
  addText(reason, {x: Math.ceil(x/2), y: 8, color: color`0`})
  isPlaying = false
}

function undo(lastMove) {
  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      setSprite(board, x, y, lastMove[y][x])
    }
  }
}

let selectedX = 5
let selectedY = 4
let placingX = 5
let placingY = 4
let isPlacing = false
let turn = 'White'
let isPlaying = true
let lastMoves = []
playTune(startSound)
startGame()
selectSquare(board, selectedX, selectedY)

onInput("w", () => {
  if (isPlaying && isPlacing && placingY < 8) {
    unselectAllSquares(board)
    placingY++
    selectSquare(board, placingX, placingY)
    playTune(wasdSound)
  } else if (isPlaying && !isPlacing && selectedY < 8) {
    unselectAllSquares(board)
    selectedY++
    playTune(wasdSound)
  }
  
  selectSquare(board, selectedX, selectedY)
})

onInput("a", () => {
  if (isPlaying && isPlacing && placingX > 1) {
    unselectAllSquares(board)
    placingX--
    selectSquare(board, placingX, placingY)
    playTune(wasdSound)
  } else if (isPlaying && !isPlacing && selectedX > 1) {
    unselectAllSquares(board)
    selectedX--
    playTune(wasdSound)
  }
  
  selectSquare(board, selectedX, selectedY)
})

onInput("s", () => {
  if (isPlaying && isPlacing && placingY > 1) {
    unselectAllSquares(board)
    placingY--
    selectSquare(board, placingX, placingY)
    playTune(wasdSound)
  } else if (isPlaying && !isPlacing && selectedY > 1) {
    unselectAllSquares(board)
    selectedY--
    playTune(wasdSound)
  }
  
  selectSquare(board, selectedX, selectedY)
})

onInput("d", () => { 
  if (isPlaying && isPlacing && placingX < 8) {
    unselectAllSquares(board)
    placingX++
    playTune(wasdSound)
    selectSquare(board, placingX, placingY)
  } else if (isPlaying && !isPlacing && selectedX < 8) {
    unselectAllSquares(board)
    selectedX++
    playTune(wasdSound)
  }
  
  selectSquare(board, selectedX, selectedY)
})

onInput("i", () => {
  if (isPlaying && isPlacing) {
    isPlacing = !isPlacing
    unselectSquare(board, placingX, placingY)
    playTune(selectSound)
  } else if (isPlaying && checkPiece(board, selectedX, selectedY)[0] == turn) {
    isPlacing = !isPlacing
    selectSquare(board, placingX, placingY)
    playTune(selectSound)
  } else {
    playTune(cannotSelectSound)
  }
})

onInput("l", () => {
  if (isPlaying && isPlacing && checkPiece(board, selectedX, selectedY)[0] == turn && checkPiece(board, selectedX, selectedY)[0] != checkPiece(board, placingX, placingY)[0]) {
    let moveStatus = move(board, selectedX, selectedY, placingX, placingY)
    if (moveStatus == 'Successful') {
      flipBoard(board)
      unselectAllSquares(board)
      selectedX = 5
      selectedY = 4
      selectSquare(board, selectedX, selectedY)
      isPlacing = false
      if (turn == 'White') {
        turn = 'Black'
      } else {
        turn = 'White'
      }
      
      playTune(placeSound)

      let gameState = checkState(board)
      if (gameState != 'Ongoing') {
        playTune(endSound)
        endGame(gameState[0], gameState[1])
      }
    }
  }
})

onInput("j", () => {
  if (!isPlaying) {
    isPlaying = true
    playTune(startSound)
    startGame()
  } else {
    isPlaying = false
    playTune(endSound)
    if (turn == 'White') {
      endGame('Black Wins', 'Resignation')
    } else {
      endGame('White Wins', 'Resignation')
    }
  }
})

onInput("k", () => {
  if (lastMoves.length > 0 && isPlaying) {
    undo(lastMoves[lastMoves.length-1])
    unselectAllSquares(board)
    selectedX = 5
    selectedY = 4
    selectSquare(board, selectedX, selectedY)
    isPlacing = false
    if (turn == 'White') {
      turn = 'Black'
    } else {
      turn = 'White'
    }
  }
})
