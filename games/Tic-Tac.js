/*
@title: Tic-Tac
@description: classic two-player tic-tac-toe. Line up three X's or O's to win.
@author: @Developer-Vini(Marcinho)
@tags: ["titactoe", "game", "sprig", "puzzle game"]
@addedOn: 2025-11-05
*/

const cursor = "c"
const cell = "e"
const xs = "x"
const os = "o"

setLegend(
  [ cursor, bitmap`
2222222222222222
2222222222222222
22............22
22............22
22............22
22............22
22............22
22............22
22............22
22............22
22............22
22............22
22............22
22............22
2222222222222222
2222222222222222` ],
  [ xs, bitmap`
................
................
..33........33..
...33......33...
....33....33....
.....33..33.....
......3333......
.......33.......
.......33.......
......3333......
.....33..33.....
....33....33....
...33......33...
..33........33..
................
................` ],
  [ os, bitmap`
................
................
......5555......
....55555555....
...55......55...
..55........55..
..55........55..
..55........55..
..55........55..
..55........55..
..55........55..
...55......55...
....55555555....
......5555......
................
................` ],
  [ cell, bitmap`
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
1111111111111111` ]
)

const level = map`
.eee.
.eee.
.eee.
.....`

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

let board = []
let turn = xs
let over = false
let cx = 1
let cy = 1

function showStatus(msg, col) {
  clearText()
  addText(msg, { x: Math.floor((20 - msg.length) / 2), y: 13, color: col })
  addText("K:jogar J:reiniciar", { x: 0, y: 14, color: color`1` })
}

function turnText() {
  if (turn === xs) showStatus("Vez do X", color`3`)
  else showStatus("Vez do O", color`5`)
}

function winner() {
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i][0]
    const b = lines[i][1]
    const c = lines[i][2]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function start() {
  setMap(level)
  board = [null, null, null, null, null, null, null, null, null]
  turn = xs
  over = false
  cx = 1
  cy = 1
  addSprite(1 + cx, cy, cursor)
  turnText()
}

function move(dx, dy) {
  cx = Math.min(2, Math.max(0, cx + dx))
  cy = Math.min(2, Math.max(0, cy + dy))
  const c = getFirst(cursor)
  c.x = 1 + cx
  c.y = cy
}

function play() {
  if (over) return
  const i = cy * 3 + cx
  if (board[i]) return

  board[i] = turn
  addSprite(1 + cx, cy, turn)

  const w = winner()
  if (w) {
    over = true
    if (w === xs) showStatus("X win!", color`3`)
    else showStatus("O win!", color`5`)
    return
  }

  let full = true
  for (let j = 0; j < 9; j++) {
    if (!board[j]) full = false
  }
  if (full) {
    over = true
    showStatus("draw!", color`2`)
    return
  }

  turn = turn === xs ? os : xs
  turnText()
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))
onInput("k", play)
onInput("j", start)

start()
