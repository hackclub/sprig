/*
@title: Tic Tac Toe
@description: Classic 2 player tic tac toe
@author: Balram Gautam
@tags: ['board', 'strategy']
@addedOn: 2026-05-27
*/

const cursor = "c"
const xPiece = "x"
const oPiece = "o"
const tile = "t"

setLegend(
  [cursor, bitmap`
................
..222222222222..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..2..........2..
..222222222222..
................
................`],

  [xPiece, bitmap`
................
..33........33..
...33......33...
....33....33....
.....33..33.....
......3333......
.......33.......
......3333......
.....33..33.....
....33....33....
...33......33...
..33........33..
................
................
................
................`],

  [oPiece, bitmap`
................
.....444444.....
....44....44....
...44......44...
...44......44...
...44......44...
...44......44...
...44......44...
...44......44...
....44....44....
.....444444.....
................
................
................
................
................`],

  [tile, bitmap`
1111111111111111
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1000000000000001
1111111111111111`]
)

setMap(map`
ttt
tct
ttt`
)

setBackground(tile)

let turn = "X"
let gameOver = false

addText("TURN: X", {
  x: 1,
  y: 13,
  color: color`3`
})

function updateTurnText() {
  clearText()

  if (!gameOver) {
    addText("TURN: " + turn, {
      x: 1,
      y: 13,
      color: turn == "X" ? color`3` : color`4`
    })
  }
}

function checkWinner() {
  const board = []

  for (let y = 0; y < 3; y++) {
    board[y] = []

    for (let x = 0; x < 3; x++) {
      let tileData = getTile(x, y)

      if (tileData.some(s => s.type == xPiece)) {
        board[y][x] = "X"
      }

      else if (tileData.some(s => s.type == oPiece)) {
        board[y][x] = "O"
      }

      else {
        board[y][x] = ""
      }
    }
  }

  const wins = [
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],

    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],

    [[0,0],[1,1],[2,2]],
    [[2,0],[1,1],[0,2]]
  ]

  for (let combo of wins) {
    let [a,b,c] = combo

    let v1 = board[a[1]][a[0]]
    let v2 = board[b[1]][b[0]]
    let v3 = board[c[1]][c[0]]

    if (v1 != "" && v1 == v2 && v2 == v3) {
      gameOver = true

      clearText()

      addText(v1 + " WINS!", {
        x: 4,
        y: 13,
        color: v1 == "X" ? color`3` : color`4`
      })

      return
    }
  }

  // draw check
  let filled = 0

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] != "") filled++
    }
  }

  if (filled == 9) {
    gameOver = true

    clearText()

    addText("DRAW!", {
      x: 5,
      y: 13,
      color: color`2`
    })
  }
}

// movement
onInput("w", () => {
  if (gameOver) return

  let c = getFirst(cursor)

  if (c.y > 0) c.y -= 1
})

onInput("s", () => {
  if (gameOver) return

  let c = getFirst(cursor)

  if (c.y < 2) c.y += 1
})

onInput("a", () => {
  if (gameOver) return

  let c = getFirst(cursor)

  if (c.x > 0) c.x -= 1
})

onInput("d", () => {
  if (gameOver) return

  let c = getFirst(cursor)

  if (c.x < 2) c.x += 1
})

// place piece
onInput("j", () => {
  if (gameOver) return

  let c = getFirst(cursor)

  let currentTile = getTile(c.x, c.y)

  let occupied =
    currentTile.some(s => s.type == xPiece) ||
    currentTile.some(s => s.type == oPiece)

  if (!occupied) {
    if (turn == "X") {
      addSprite(c.x, c.y, xPiece)
      turn = "O"
    } else {
      addSprite(c.x, c.y, oPiece)
      turn = "X"
    }

    updateTurnText()
    checkWinner()
  }
})