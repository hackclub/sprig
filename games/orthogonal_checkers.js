/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Orthogonal Checkers
@description: It's like normal checkers but without the useless squares
@author: Pookstir
@tags: ['strategy', '2 player', 'board game', 'multiplayer', 'turn-based']
@addedOn: 2026-07-29
*/

const top = 0
const left = 0

const lightTile = "l"
const darkTile = "d"
const bg = "b"
const lightPiece = "L"
const darkPiece = "D"
const lightKing = "K"
const darkKing = "k"
const cursor = "c"

setLegend(
  [cursor, bitmap`
3333333333333333
3999........9993
39............93
39............93
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
39............93
39............93
3999........9993
3333333333333333`],
  [darkKing, bitmap`
.....LLLLLL.....
...LL000000LL...
..L0000000000L..
.L000000000000L.
.L000000000000L.
L00L000LL000L00L
L00LL0LLLL0LL00L
L00LLLLLLLLLL00L
L00LLLLLLLLLL00L
L00LLLLLLLLLL00L
L00LLLLLLLLLL00L
.L000000000000L.
.L000000000000L.
..L0000000000L..
...LL000000LL...
.....LLLLLL.....`],
  [lightKing, bitmap`
.....111111.....
...1122222211...
..122222222221..
.12222222222221.
.12222222222221.
1221222112221221
1221121111211221
1221111111111221
1221111111111221
1221111111111221
1221111111111221
.12222222222221.
.12222222222221.
..122222222221..
...1122222211...
.....111111.....`],
  [darkPiece, bitmap`
.....LLLLLL.....
...LL000000LL...
..L0000000000L..
.L000000000000L.
.L000000000000L.
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
.L000000000000L.
.L000000000000L.
..L0000000000L..
...LL000000LL...
.....LLLLLL.....`],
  [lightPiece, bitmap`
.....111111.....
...1122222211...
..122222222221..
.12222222222221.
.12222222222221.
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
.12222222222221.
.12222222222221.
..122222222221..
...1122222211...
.....111111.....`],
  [ lightTile, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [darkTile, bitmap`
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
0000000000000000`],
  [bg, bitmap`
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
LLLLLLLLLLLLLLLL`]
)

setBackground(bg)

setSolids([])

let tileExists = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0]
]

let level = 0
const levels = [
  map`
...l......
..ldl.....
.ldldl....
ldldldl...
dldldld...
.dldld....
..dld.....
...d......`
]

setMap(levels[level])

let pieces = {}

for(let i = 0; i < 4; i++) {
  let x = i
  let y = 3 - i
  pieces[getTileKey(x, y)] = createPiece(x, y, true)
}

for(let i = 0; i < 4; i++) {
  let x = i
  let y = 4 - i
  pieces[getTileKey(x, y)] = createPiece(x, y, true)
}

for(let i = 0; i < 4; i++) {
  let x = i + 3
  let y = 7 - i
  pieces[getTileKey(x, y)] = createPiece(x, y, false)
}

for(let i = 0; i < 4; i++) {
  let x = i + 3
  let y = 6 - i
  pieces[getTileKey(x, y)] = createPiece(x, y, false)
}

let cursorObject = createAndGetSprite(3, 0, cursor)

function createAndGetSprite(x, y, sprite) {
  addSprite(x + left, y + top, sprite)

  let sprites = getTile(x + left, y + top)

  for(let i = 0; i < sprites.length; i++) {
    if(sprites[i].type == sprite) {
      return sprites[i]
    }
  }
}

function createPiece(x, y, isLight) {
  let pieceType
  if(isLight) {
    pieceType = lightPiece
  }
  else {
    pieceType = darkPiece
  }

  return createAndGetSprite(x, y, pieceType)
}

function getTileKey(x, y) {
  return x + 10 * y
}

function getTilePos(key) {
  return [key % 10, floor(key / 10.0)]
}

function doesTileExist(x, y) {
  if(x < 0 || x > 6 || y < 0 || y > 7) {
    return false
  }
  return tileExists[y][x] == 1
}

function pieceIsLight(piece) {
  return piece == lightPiece || piece == lightKing
}

function pieceCanMoveDR(piece) {
  return piece != darkPiece
}

function pieceCanMoveTL(piece) {
  return piece != lightPiece
}

function isKingTile(x, y) {
  if(isLightTurn) {
    return x + y == 10
  }
  else {
    return x + y == 3
  }
}

function displayTurn() {
  clearText()

  let message
  let textColor

  if(isLightTurn) {
    message = "White Turn"
    textColor = color`2`
  }
  else {
    message = "Black Turn"
    textColor = color`0`
  }

  addText(message, {x: 9, y: 0, color: textColor})
}

function getColorPieces(isLight) {
  let pieceType
  let kingType
  if(isLight) {
    pieceType = lightPiece
    kingType = lightKing
  }
  else {
    pieceType = darkPiece
    kingType = darkKing
  }

  let pieces = []
  
  let nonKings = getAll(pieceType)
  for(let i = 0; i < nonKings.length; i++) {
    pieces.push(nonKings[i])
  }
  
  let kings = getAll(kingType)
  for(let i = 0; i < kings.length; i++) {
    pieces.push(kings[i])
  }

  return pieces
}

let isLightTurn = true
let canCapture = false
let isChainJump = false
let chainJumpPiece

displayTurn()

onInput("w", () => {
  if(isChainJump) {
    return
  }
  
  let cursorX = cursorObject.x - left
  let cursorY = cursorObject.y - top
  if(doesTileExist(cursorX, cursorY - 1)) {
    cursorObject.y -= 1
  }
})

onInput("s", () => {
  if(isChainJump) {
    return
  }
  
  let cursorX = cursorObject.x - left
  let cursorY = cursorObject.y - top
  if(doesTileExist(cursorX, cursorY + 1)) {
    cursorObject.y += 1
  }
})

onInput("a", () => {
  if(isChainJump) {
    return
  }
  
  let cursorX = cursorObject.x - left
  let cursorY = cursorObject.y - top
  if(doesTileExist(cursorX - 1, cursorY)) {
    cursorObject.x -= 1
  }
})

onInput("d", () => {
  if(isChainJump) {
    return
  }
  
  let cursorX = cursorObject.x - left
  let cursorY = cursorObject.y - top
  if(doesTileExist(cursorX + 1, cursorY)) {
    cursorObject.x += 1
  }
})

onInput("i", () => {
  tryMove(0, -1, true)
})

onInput("k", () => {
  tryMove(0, 1, false)
})

onInput("j", () => {
  tryMove(-1, 0, true)
})

onInput("l", () => {
  tryMove(1, 0, false)
})

function tryMove(x, y, isNegative) {
  let cursorX = cursorObject.x - left
  let cursorY = cursorObject.y - top
  
  if(!(getTileKey(cursorX, cursorY) in pieces)) {
    return
  }

  let piece = pieces[getTileKey(cursorX, cursorY)]

  if(pieceIsLight(piece.type) != isLightTurn) {
    return
  }

  if(canMoveNormal(piece, x, y)) {
    if(canCapture) {
      return
    }
    
    piece.x += x
    piece.y += y

    if(isKingTile(cursorX + x, cursorY + y)) {
      piece.remove()
    
      let pieceX = piece.x - left
      let pieceY = piece.y - top
      
      if(isLightTurn) {
        piece = createAndGetSprite(pieceX, pieceY, lightKing)
      }
      else {
        piece = createAndGetSprite(pieceX, pieceY, darkKing)
      }
    }
    
    delete pieces[getTileKey(cursorX, cursorY)]
    pieces[getTileKey(cursorX + x, cursorY + y)] = piece
    
    isLightTurn = !isLightTurn
    displayTurn()
    turnStart()
  }
  else if(canJump(piece, x, y)) {
    pieces[getTileKey(cursorX + x, cursorY + y)].remove()
    delete pieces[getTileKey(cursorX + x, cursorY + y)]
    
    piece.x += 2 * x
    piece.y += 2 * y
    
    let pieceX = piece.x - left
    let pieceY = piece.y - top
    
    if(isKingTile(pieceX, pieceY)) {
      piece.remove()
      
      if(isLightTurn) {
        piece = createAndGetSprite(pieceX, pieceY, lightKing)
      }
      else {
        piece = createAndGetSprite(pieceX, pieceY, darkKing)
      }
    }
    
    delete pieces[getTileKey(cursorX, cursorY)]
    pieces[getTileKey(cursorX + 2 * x, cursorY + 2 * y)] = piece

    let canChainJump = canJumpAny(piece)

    if(canChainJump) {
      cursorObject.x = piece.x
      cursorObject.y = piece.y
      canCapture = true
      isChainJump = true
    }
    else {
      isLightTurn = !isLightTurn
      isChainJump = false
      displayTurn()
      turnStart()
    }
  }
}

function turnStart() {
  let pieces = getColorPieces(isLightTurn)
  if(pieces.length == 0) {
    if(isLightTurn) {
      endGame("Black wins", false, true)
    }
    else {
      endGame("White wins", true, true)
    }
    return
  }

  canCapture = false
  let isStalemate = true
  for(let i = 0; i < pieces.length; i++) {
    if(canJumpAny(pieces[i])) {
      isStalemate = false
      canCapture = true
      break
    }
    else if(canMoveNormalAny(pieces[i])) {
      isStalemate = false
    }
  }

  if(isStalemate) {
    if(isLightTurn) {
      endGame("Black achieved\n  stalemate", false, false)
    }
    else {
      endGame("White achieved\n  stalemate", true, false)
    }
  }
}

function canMoveAny(piece) {
  return canMoveNormalAny(piece) || canJumpAny(piece)
}

function canMoveNormalAny(piece) {
  if(canMoveNormal(piece, 1, 0)) return true
  if(canMoveNormal(piece, -1, 0)) return true
  if(canMoveNormal(piece, 0, 1)) return true
  if(canMoveNormal(piece, 0, -1)) return true
  
  return false
}

function canJumpAny(piece) {
  if(canJump(piece, 1, 0)) return true
  if(canJump(piece, -1, 0)) return true
  if(canJump(piece, 0, 1)) return true
  if(canJump(piece, 0, -1)) return true
  
  return false
}

function canMoveNormal(piece, x, y) {
  let isNegative = x < 0 || y < 0

  if(isNegative) {
    if(!pieceCanMoveTL(piece.type)) {
      return false
    }
  }
  else {
    if(!pieceCanMoveDR(piece.type)) {
      return false
    }
  }

  let pieceX = piece.x - left
  let pieceY = piece.y - top

  if(!doesTileExist(pieceX + x, pieceY + y)) {
    return false
  }
  if(getTileKey(pieceX + x, pieceY + y) in pieces) {
    return false
  }

  return true
}

function canJump(piece, x, y) {
  let isNegative = x < 0 || y < 0

  if(isNegative) {
    if(!pieceCanMoveTL(piece.type)) {
      return false
    }
  }
  else {
    if(!pieceCanMoveDR(piece.type)) {
      return false
    }
  }

  let pieceX = piece.x - left
  let pieceY = piece.y - top

  if(!doesTileExist(pieceX + x, pieceY + y)) {
    return false
  }
  if(!(getTileKey(pieceX + x, pieceY + y) in pieces)) {
    return false
  }
  let neighbor = pieces[getTileKey(pieceX + x, pieceY + y)]
  if(pieceIsLight(neighbor.type) == pieceIsLight(piece.type)) {
    return false
  }
  if(getTileKey(pieceX + 2 * x, pieceY + 2 * y) in pieces) {
    return false
  }
  if(!doesTileExist(pieceX + 2 * x, pieceY + 2 * y)) {
    return false
  }

  return true
}

function endGame(message, lightText, isWin) {
  clearText()
  for(let x = 0; x < width(); x++) {
    for(let y = 0; y < height(); y++) {
      clearTile(x, y)
    }
  }
  
  let textColor
  if(lightText) {
    textColor = color`2`
  }
  else {
    textColor = color`0`
  }

  let textX
  if(isWin) {
    textX = 5
  }
  else {
    textX = 3
  }
  
  addText(message, {
    x: textX,
    y: 5,
    color: textColor
  })
}

afterInput(() => {
  
})        