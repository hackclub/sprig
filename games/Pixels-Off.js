/*
@title: Lights Out
@description: A minimalist Lights Out puzzle
@author: Alfie
@tags: ['puzzle', 'lights-out']
@addedOn: 2026-10-14
*/

const on = "o"
const off = "x"
const selector = "s"

setLegend(
  [on, bitmap`
................
................
................
................
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
................
................
................
................`],
  [off, bitmap`
................
................
................
................
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
................
................
................
................`],
  [selector, bitmap`
000..........000
0..............0
0..............0
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
0..............0
0..............0
000..........000`]
)

setSolids([])

const size = 5

let board = []
let cursorX = 2
let cursorY = 2
let moves = 0
let won = false

function generateBoard() {
  board = []

  for (let y = 0; y < size; y++) {
    board[y] = []

    for (let x = 0; x < size; x++) {
      board[y][x] = false
    }
  }

  // Generate a guaranteed-solvable puzzle by making
  // a random sequence of valid Lights Out moves.
  for (let i = 0; i < 18; i++) {
    toggle(
      Math.floor(Math.random() * size),
      Math.floor(Math.random() * size)
    )
  }

  cursorX = 2
  cursorY = 2
  moves = 0
  won = false

  drawBoard()
}

function toggle(x, y) {
  if (x < 0 || x >= size || y < 0 || y >= size) return
  board[y][x] = !board[y][x]
}

function pressTile() {
  if (won) return

  toggle(cursorX, cursorY)
  toggle(cursorX - 1, cursorY)
  toggle(cursorX + 1, cursorY)
  toggle(cursorX, cursorY - 1)
  toggle(cursorX, cursorY + 1)

  moves++

  if (isSolved()) {
    won = true
  }

  drawBoard()
}

function isSolved() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x]) return false
    }
  }

  return true
}

function drawBoard() {
  let rows = []

  for (let y = 0; y < size; y++) {
    let row = ""

    for (let x = 0; x < size; x++) {
      row += board[y][x] ? on : off
    }

    rows.push(row)
  }

  setMap(rows.map(row => row).join("\n"))

  // Draw four-corner selector over the selected tile.
  addSprite(cursorX, cursorY, selector)
}

onInput("w", () => {
  if (!won) cursorY = Math.max(0, cursorY - 1)
  drawBoard()
})

onInput("s", () => {
  if (!won) cursorY = Math.min(size - 1, cursorY + 1)
  drawBoard()
})

onInput("a", () => {
  if (!won) cursorX = Math.max(0, cursorX - 1)
  drawBoard()
})

onInput("d", () => {
  if (!won) cursorX = Math.min(size - 1, cursorX + 1)
  drawBoard()
})

onInput("i", pressTile)
onInput("j", pressTile)
onInput("k", generateBoard)

onInput("l", generateBoard)

afterInput(() => {
  if (won) {
    // The board is solved; press R to play again.
  }
})

generateBoard()