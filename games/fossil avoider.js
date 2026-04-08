/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: fossil avoider
@author: Casey Lee
@description: In my game you are a paleontologist tasked with uncovering fossils a 100 meter^2 area of earth, unfortunately your drill will instantly destroy any fossils directly under it so you must only dig not fossils.  On the bright side your trusty ground penetrating radar can tell you how many fossils each block is surrounded by but only after it has been mined.
@tags: [wasd to move, j to mine, k to reset]
@addedOn: 2025-00-00
*/


const cursor = "p"
const fossil = "m"
const block = "b"
const back = "k"
const one = "o"
const two = "t"
const three = "h"
const four = "f"
const five = "i"
const six = "s"
const seven = "v"
const eight = "e"

setLegend(
  [cursor, bitmap`
................
................
................
................
.......00.......
......0000......
......0000......
.....000000.....
.....000000.....
....00000000....
.......00.......
.......00.......
.......00.......
................
................
................`],
  [fossil, bitmap`
.66666666666666.
6666666666666666
666FFFFFFFFFF666
66FFFCFFFFCFFF66
66FFCCCCCCCCFF66
66FFFCFFFFCFFF66
66FFFFCCCCFFFF66
66FFFCFCFFCFFF66
66FFCCFCFCFCFF66
66FFFCFCFCFCFF66
66FFFFFFFCFFFF66
66FFFFFFFFFFFF66
66FFFFFFFFFFFF66
666FFFFFFFFFF666
6666666666666666
.66666666666666.`],
  [block, bitmap`
6666666666666666
6666666666666666
6966666966669666
666666F666666666
6FF666FF66666F66
66F966669666FF66
6666666666666666
6666666666696696
6966966666666666
6666666666666666
666666F66669F666
6666FFF66666FF66
6666666666666F66
6696666966666666
6666666666669666
6666666666666666`],
  [back, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [one, bitmap`
1111111111111111
1111111171111111
1111111771111111
1111117171111111
1111171171111111
1111111171111111
1111111171111111
1111111171111111
1111111171111111
1111111171111111
1111111171111111
1111111171111111
1111177777771111
1111111111111111
1111111111111111
1111111111111111`],
  [two, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111119999111111
1111191111911111
1111911111191111
1111111111191111
1111111111191111
1111111111191111
1111111111911111
1111111119111111
1111111991111111
1111199111111111
1111999999991111
1111111111111111
1111111111111111`],
  [three, bitmap`
1111111111111111
1111111111111111
1111133333111111
1111111111311111
1111111111311111
1111111111311111
1111111111311111
1111133333111111
1111111111311111
1111111111311111
1111111111311111
1111111111311111
1111133333111111
1111111111111111
1111111111111111
1111111111111111`],
  [four, bitmap`
1111111111111111
1111111111111111
111111111FF11111
11111111F1F11111
1111111F11F11111
111111F111F11111
11111F1111F11111
11111FFFFFFFF111
1111111111F11111
1111111111F11111
1111111111F11111
1111111111F11111
1111111111F11111
1111111111F11111
1111111111F11111
1111111111111111`],
  [five, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111188888881111
1111811111111111
1111811111111111
1111811111111111
1111888888811111
1111111111181111
1111111111118111
1111111111118111
1111111111118111
1111111111118111
1111811111181111
1111188888811111
1111111111111111`],
  [six, bitmap`
1111111111111111
1111111111111111
11111CCCC1111111
1111C1111C111111
111C111111C11111
111C111111111111
111C111111111111
111C1CCCC1111111
111CC1111C111111
111C111111C11111
111C111111C11111
1111C1111C111111
11111CCCC1111111
1111111111111111
1111111111111111
1111111111111111`],
  [seven, bitmap`
1111111111111111
1111111111111111
1111555555551111
1111111111151111
1111111111511111
1111111111511111
1111111115111111
1111111115111111
1111111151111111
1111111151111111
1111111511111111
1111111511111111
1111115111111111
1111115111111111
1111111111111111
1111111111111111`],
  [eight, bitmap`
1111111111111111
1111111111111111
111111HHHHH11111
11111H11111H1111
1111H1111111H111
1111H1111111H111
1111H1111111H111
11111H11111H1111
111111HHHHH11111
11111H11111H1111
1111H1111111H111
1111H1111111H111
1111H1111111H111
11111H11111H1111
111111HHHHH11111
1111111111111111`]
)

setBackground(back)
setSolids([])
setPushables({
  [cursor]: [] })
const W = 10
const H = 10
const fossil_COUNT = 10
const numToTile = { 1: one, 2: two, 3: three, 4: four, 5: five, 6: six, 7: seven, 8: eight }
const idx = (x, y) => y * W + x
const ix = i => i % W
const iy = i => Math.floor(i / W)
const inBounds = (x, y) => x >= 0 && x < W && y >= 0 && y < H

const neighbors = (x, y) => {
  const res = []
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = x + dx,
        ny = y + dy
      if (inBounds(nx, ny)) res.push([nx, ny])
    }
  }
  return res
}

let fossils
let counts
let coveredLeft
let gameOver = false
const base = map`
p.........
..........
..........
..........
..........
..........
..........
..........
..........
..........`
setMap(base)

function placeCovers() {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      addSprite(x, y, block)
    }
  }
}

function generatefossils() {
  fossils = new Set()
  while (fossils.size < fossil_COUNT) {
    fossils.add(Math.floor(Math.random() * W * H))
  }
}

function computeCounts() {
  counts = new Array(W * H).fill(0)
  for (const i of fossils) {
    const x = ix(i),
      y = iy(i)
    for (const [nx, ny] of neighbors(x, y)) {
      const j = idx(nx, ny)
      if (!fossils.has(j)) counts[j]++
    }
  }
}

function isCovered(x, y) {
  const tile = getTile(x, y)
  for (const s of tile) { if (s.type === block) return true }
  return false
}

function removeBlock(x, y) {
  const tile = getTile(x, y)
  for (const s of tile) {
    if (s.type === block) {
      s.remove()
      return
    }
  }
}

function showfossil(x, y) {
  addSprite(x, y, fossil)
}

function revealNumber(x, y) {
  const c = counts[idx(x, y)]
  if (c > 0) addSprite(x, y, numToTile[c])
}

function revealFlood(x, y) {
  const q = [
    [x, y]
  ]
  const seen = new Set([idx(x, y)])
  while (q.length) {
    const [cx, cy] = q.shift()
    if (!isCovered(cx, cy)) continue
    removeBlock(cx, cy)
    coveredLeft--

    const c = counts[idx(cx, cy)]
    if (c > 0) {
      addSprite(cx, cy, numToTile[c])
      continue
    }
    for (const [nx, ny] of neighbors(cx, cy)) {
      const j = idx(nx, ny)
      if (!seen.has(j) && !fossils.has(j)) {
        seen.add(j)
        q.push([nx, ny])
      }
    }
  }
}

function reveal(x, y) {
  if (gameOver || !inBounds(x, y) || !isCovered(x, y)) return
  const i = idx(x, y)
  if (fossils.has(i)) {
    for (const m of fossils) {
      showfossil(ix(m), iy(m))
      if (isCovered(ix(m), iy(m))) removeBlock(ix(m), iy(m))
    }
    gameOver = true
    return
  }

  const c = counts[i]
  if (c === 0) {
    revealFlood(x, y)
  } else {
    removeBlock(x, y)
    coveredLeft--
    addSprite(x, y, numToTile[c])
  }

  if (!gameOver && coveredLeft === 0) {
    gameOver = true
  }
}


function init() {
  clearText()
  gameOver = false
  const p = getFirst(cursor)
  if (!p) addSprite(0, 0, cursor)
  else { p.x = 0;
    p.y = 0 }
  placeCovers()
  generatefossils()
  computeCounts()
  coveredLeft = W * H - fossil_COUNT
}

init()
onInput("w", () => { if (gameOver) return; const p = getFirst(cursor); if (p.y > 0) p.y-- })
onInput("s", () => { if (gameOver) return; const p = getFirst(cursor); if (p.y < H - 1) p.y++ })
onInput("a", () => { if (gameOver) return; const p = getFirst(cursor); if (p.x > 0) p.x-- })
onInput("d", () => { if (gameOver) return; const p = getFirst(cursor); if (p.x < W - 1) p.x++ })
onInput("j", () => { if (gameOver) return; const p = getFirst(cursor);
  reveal(p.x, p.y) })
onInput("k", () => {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const tile = getTile(x, y)
      for (const s of tile) {
        if (s.type !== cursor) s.remove()
      }
    }
  }
  init()
})

afterInput(() => {})
