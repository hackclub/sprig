/*
@title: Sweeping The Mines
@description: A remake of the classic game minesweeper 
@author: Harini Moodley 
@tags: ['puzzle']
@addedOn: 2026-06-23
*/


const cursor = "c"
const hidden = "h"
const flagged = "f"
const revealed = "r"
const mine = "m"

// Number tiles
const n1 = "1"
const n2 = "2"
const n3 = "3"
const n4 = "4"
const n5 = "5"
const n6 = "6"
const n7 = "7"
const n8 = "8"

const ROWS = 9
const COLS = 9
const MINE_COUNT = 10

let mineSet, revealedSet, flaggedSet, gameOver, started

setLegend(
  [cursor,  bitmap`
0000000000000000
0000000000000000
0006600000066000
0060060000600600
0600006006000060
0600006006000060
0060060000600600
0006600000066000
0000000000000000
0000000000000000
0600006006000060
0060060000600600
0006600000066000
0000000000000000
0000000000000000
0000000000000000`],
  [hidden,  bitmap`
1111111111111111
1666666666666661
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1600000000000061
1666666666666661
1111111111111111`],
  [flagged, bitmap`
1111111111111111
1666666666666661
1600000000000061
1600003000000061
1600033000000061
1600333000000061
1600033000000061
1600003000000061
1600000000000061
1600000300000061
1600000300000061
1600003330000061
1600000000000061
1666666666666661
1111111111111111`],
  [revealed,bitmap`
0000000000000000
0777777777777770
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0700000000000070
0777777777777770
0000000000000000`],
  [mine,    bitmap`
0000000000000000
0000000000000000
0000033300000000
0000333330000000
0003333333000000
0003333333000000
0003333333000000
0000333330000000
0000033300000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n1, bitmap`
0000000000000000
0000000000000000
0000005000000000
0000055000000000
0000005000000000
0000005000000000
0000005000000000
0000005000000000
0000055500000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n2, bitmap`
0000000000000000
0000000000000000
0000055000000000
0000500500000000
0000000500000000
0000005000000000
0000050000000000
0000500000000000
0000555500000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n3, bitmap`
0000000000000000
0000000000000000
0000055000000000
0000000500000000
0000000500000000
0000055000000000
0000000500000000
0000000500000000
0000055000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n4, bitmap`
0000000000000000
0000000000000000
0000500500000000
0000500500000000
0000555500000000
0000000500000000
0000000500000000
0000000500000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n5, bitmap`
0000000000000000
0000000000000000
0000055500000000
0000500000000000
0000500000000000
0000055000000000
0000000500000000
0000000500000000
0000055000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n6, bitmap`
0000000000000000
0000000000000000
0000005000000000
0000050000000000
0000500000000000
0000555000000000
0000500500000000
0000500500000000
0000055000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n7, bitmap`
0000000000000000
0000000000000000
0000555500000000
0000000500000000
0000005000000000
0000005000000000
0000050000000000
0000050000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [n8, bitmap`
0000000000000000
0000000000000000
0000055000000000
0000500500000000
0000500500000000
0000055000000000
0000500500000000
0000500500000000
0000055000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
)

const NUMBER_TYPES = [null, n1, n2, n3, n4, n5, n6, n7, n8]

function idx(x, y) { return y * COLS + x }
function isMine(x, y) { return mineSet.has(idx(x, y)) }

function inBounds(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS
}

function countAdj(x, y) {
  let n = 0
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      if (inBounds(x+dx, y+dy) && isMine(x+dx, y+dy)) n++
    }
  return n
}

function placeMines(sx, sy) {
  const exclude = new Set()
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const nx = sx+dx, ny = sy+dy
      if (inBounds(nx, ny)) exclude.add(idx(nx, ny))
    }
  while (mineSet.size < MINE_COUNT) {
    const i = Math.floor(Math.random() * ROWS * COLS)
    if (!exclude.has(i)) mineSet.add(i)
  }
}

function revealTile(x, y) {
  const i = idx(x, y)
  if (revealedSet.has(i) || flaggedSet.has(i)) return
  revealedSet.add(i)

  const sprites = getTile(x, y)
  sprites.forEach(s => { if (s.type === hidden) s.remove() })

  const n = countAdj(x, y)
  if (n > 0) {
    addSprite(x, y, NUMBER_TYPES[n])
  } else {
    addSprite(x, y, revealed)
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue
        const nx = x+dx, ny = y+dy
        if (inBounds(nx, ny)) revealTile(nx, ny)
      }
  }
}

function checkWin() {
  const safe = ROWS * COLS - MINE_COUNT
  if (revealedSet.size >= safe) {
    gameOver = true
    clearText()
    addText("YOU WIN!", { x: 2, y: 4, color: color`4` })
  }
}

function initGame() {
  gameOver = false
  started = false
  mineSet = new Set()
  revealedSet = new Set()
  flaggedSet = new Set()
  clearText()

  // Build the map: all hidden tiles
  let mapStr = ""
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      mapStr += hidden
    }
    if (y < ROWS - 1) mapStr += "\n"
  }
  setMap(map`${mapStr}`)

  // Place cursor in center
  addSprite(4, 4, cursor)
  addText("i:reveal k:flag j:new", { x: 0, y: 0, color: color`3` })
}

onInput("w", () => {
  if (gameOver) return
  const c = getFirst(cursor)
  if (c && c.y > 0) c.y -= 1
})
onInput("s", () => {
  if (gameOver) return
  const c = getFirst(cursor)
  if (c && c.y < ROWS - 1) c.y += 1
})
onInput("a", () => {
  if (gameOver) return
  const c = getFirst(cursor)
  if (c && c.x > 0) c.x -= 1
})
onInput("d", () => {
  if (gameOver) return
  const c = getFirst(cursor)
  if (c && c.x < COLS - 1) c.x += 1
})

// Reveal
onInput("i", () => {
  if (gameOver) return
  const c = getFirst(cursor)
  if (!c) return
  const x = c.x, y = c.y
  const i = idx(x, y)
  if (revealedSet.has(i) || flaggedSet.has(i)) return

  if (!started) {
    started = true
    placeMines(x, y)
  }

  if (isMine(x, y)) {
    gameOver = true
    // Reveal all mines
    for (let my = 0; my < ROWS; my++)
      for (let mx = 0; mx < COLS; mx++)
        if (isMine(mx, my)) {
          getTile(mx, my).forEach(s => s.remove())
          addSprite(mx, my, mine)
        }
    clearText()
    addText("BOOM! j=new", { x: 1, y: 4, color: color`2` })
    return
  }

  revealTile(x, y)
  checkWin()
})

// Flag
onInput("k", () => {
  if (gameOver) return
  const c = getFirst(cursor)
  if (!c) return
  const x = c.x, y = c.y
  const i = idx(x, y)
  if (revealedSet.has(i)) return

  if (flaggedSet.has(i)) {
    flaggedSet.delete(i)
    getTile(x, y).forEach(s => { if (s.type === flagged) s.remove() })
    addSprite(x, y, hidden)
  } else {
    flaggedSet.add(i)
    getTile(x, y).forEach(s => { if (s.type === hidden) s.remove() })
    addSprite(x, y, flagged)
  }
})

// New game
onInput("j", () => { initGame() })

initGame()