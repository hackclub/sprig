/*
@title: 2048
@author: Apish Rana
@tags: [puzzle]
@addedOn: 2026-05-13
*/
const EMPTY = "0"
const TILE = "1"
setLegend(
  [EMPTY, bitmap`
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

  [TILE, bitmap`
0000000000000000
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
06666666666666F0
0FFFFFFFFFFFFFF0
0000000000000000`]

)

setMap(map`
0000
0000
0000
0000

`)

let board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]

function spawnTile() {
  let empty = []
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y][x] === 0) {
        empty.push([x, y])
      }
    }
  }
  if (empty.length === 0) return
  let spot = empty[Math.floor(Math.random() * empty.length)]
  board[spot[1]][spot[0]] = 2
}
function clearTilemap(){
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
        clearTile(x, y)
    }
  }
}
  
function drawBoard() {
  clearTilemap()
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y][x] !== 0) {
        addSprite(x, y, TILE)
        addText("" + board[y][x], {
          x: x * 4 + 3,
          y: y * 4 + 1,
          color: color`0`
        })
      }
    }
  }
}

function slide(row) {

  row = row.filter(v => v)

  for (let i = 0; i < row.length - 1; i++) {

    if (row[i] === row[i + 1]) {

      row[i] *= 2

      row[i + 1] = 0

    }

  }

  row = row.filter(v => v)

  while (row.length < 4) {

    row.push(0)

  }

  return row

}

function moveLeft() {
  for (let y = 0; y < 4; y++) {
    board[y] = slide(board[y])
  }
}

function moveRight() {

  for (let y = 0; y < 4; y++) {
    board[y] = slide(board[y].reverse()).reverse()
  }
}

function moveUp() {
  for (let x = 0; x < 4; x++) {
    let col = []
    for (let y = 0; y < 4; y++) {
      col.push(board[y][x])
    }
    col = slide(col)
    for (let y = 0; y < 4; y++) {
      board[y][x] = col[y]
    }
  }
}

function moveDown() {
  for (let x = 0; x < 4; x++) {
    let col = []
    for (let y = 0; y < 4; y++) {
      col.push(board[y][x])
    }
    col = slide(col.reverse()).reverse()
    for (let y = 0; y < 4; y++) {
      board[y][x] = col[y]
    }
  }
}

function handleMove(moveFunc) {
  let before = JSON.stringify(board)
  moveFunc()
  if (before !== JSON.stringify(board)) {
    spawnTile()
    clearText()
    drawBoard()
  }
}

onInput("a", () => handleMove(moveLeft))
onInput("d", () => handleMove(moveRight))
onInput("w", () => handleMove(moveUp))
onInput("s", () => handleMove(moveDown))

spawnTile()
spawnTile()
drawBoard()