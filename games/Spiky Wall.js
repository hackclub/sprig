/*
@title: Spiky Wall
@author: Aditya
@tags: []
@addedOn: 2026-01-03
*/

const player = "p"
const spik_left = "l"
const spik_right = "r"
const spik_top = "t"
const spik_bottom = "b"
const block = "o"
const warn_left = "q"
const warn_right = "e"
const warn_top = "u"
const warn_bottom = "n"
const melody = tune`
2000,
500: F4~500 + G4~500 + A4~500 + B4~500 + C5~500,
13500`

setLegend(
  [ player, bitmap`
.....222........
.....333........
...3330333......
..330000033.....
..30.....03.....
..0..0.0..0.....
..0...3...0.....
...0.....0......
....00000.......
.....0..0.......
.....0..0.......
....00..00......
................
................
................
................` ],
  [ spik_left, bitmap`
0...............
C0..............
CC0.............
CCC0............
CCCC0...........
CCCCC0..........
CCCCCC0.........
CCCCCCC00.......
CCCCCCC00.......
CCCCCC0.........
CCCCC0..........
CCCC0...........
CCC0............
CC0.............
C0..............
0...............` ],
  [ spik_right, bitmap`
...............0
..............0C
.............0CC
............0CCC
...........0CCCC
..........0CCCCC
.........0CCCCCC
.......00CCCCCCC
.......00CCCCCCC
.........0CCCCCC
..........0CCCCC
...........0CCCC
............0CCC
.............0CC
..............0C
...............0` ],
  [ spik_top, bitmap`
0CCCCCCCCCCCCCC0
.0CCCCCCCCCCCC0.
..0CCCCCCCCCC0..
...0CCCCCCCC0...
....0CCCCCC0....
.....0CCCC0.....
......0CC0......
.......00.......
.......00.......
................
................
................
................
................
................
................` ],
  [ spik_bottom, bitmap`
................
................
................
................
................
................
................
.......00.......
.......00.......
......0CC0......
.....0CCCC0.....
....0CCCCCC0....
...0CCCCCCCC0...
..0CCCCCCCCCC0..
.0CCCCCCCCCCCC0.
0CCCCCCCCCCCCCC0` ],
  [ block, bitmap`
1111111L11111111
1111111L111111LL
1LLL11LL11LL1111
11111111111LL111
111111L111111111
1111111111111L11
1L11L111LLLL11L1
1L11LL11111111L1
1L111L1111L111L1
1111111L111111L1
1111111111LLL111
111LL1111111L111
1111LL1111111111
1111111111111111
LLL11111LLLL1LLL
11LL111111111111` ],
  [ warn_left, bitmap`
0333333333333333
3033333333333333
3303333333333333
3330333333333333
3333033333333333
3333303333333333
3333330333333333
3333333003333333
3333333003333333
3333330333333333
3333303333333333
3333033333333333
3330333333333333
3303333333333333
3033333333333333
0333333333333333` ],
  [ warn_right, bitmap`
3333333333333330
3333333333333303
3333333333333033
3333333333330333
3333333333303333
3333333333033333
3333333330333333
3333333003333333
3333333003333333
3333333330333333
3333333333033333
3333333333303333
3333333333330333
3333333333333033
3333333333333303
3333333333333330` ],
  [ warn_top, bitmap`
0333333333333330
3033333333333303
3303333333333033
3330333333330333
3333033333303333
3333303333033333
3333330330333333
3333333003333333
3333333003333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ warn_bottom, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333003333333
3333333003333333
3333330330333333
3333303333033333
3333033333303333
3330333333330333
3303333333333033
3033333333333303
0333333333333330` ]
)

setSolids([player, spik_left, spik_right, spik_top, spik_bottom, block])

const levels = [
  map`
.tttttt.
l......r
l......r
l...p..r
l......r
l......r
.bbbbbb.`
]

setMap(levels[0])

setPushables({
  [ player ]: []
})

onInput("s", () => { getFirst(player).y += 1 })
onInput("w", () => { getFirst(player).y -= 1 })
onInput("a", () => { getFirst(player).x -= 1 })
onInput("d", () => { getFirst(player).x += 1 })



function isValidSpawn(x, y) {
  // exclude corners
  if ((x === 0 && y === 0) ||
      (x === 0 && y === height()-1) ||
      (x === width()-1 && y === 0) ||
      (x === width()-1 && y === height()-1)) {
    return false
  }
  // exclude spikes and player
  const sprites = getTile(x, y).map(s => s.type)
  if (sprites.includes(spik_left) || sprites.includes(spik_right) ||
      sprites.includes(spik_top)  || sprites.includes(spik_bottom) ||
      sprites.includes(player)) {
    return false
  }
  return true
}
function spawnObstacle() {
  const blocks = getAll(block)
  if (blocks.length < 3) {
    let placed = false
    while (!placed) {
      const x = Math.floor(Math.random() * width())
      const y = Math.floor(Math.random() * height())
      if (isValidSpawn(x, y) && getTile(x, y).length === 0) {
        addSprite(x, y, block)
        placed = true
      }
    }
  } else {
    const b = blocks[Math.floor(Math.random() * blocks.length)]
    let moved = false
    while (!moved) {
      const x = Math.floor(Math.random() * width())
      const y = Math.floor(Math.random() * height())
      if (isValidSpawn(x, y) && getTile(x, y).length === 0) {
        b.x = x
        b.y = y
        moved = true
      }
    }
  }
}

function removeWarningAt(x, y, warnKind) {
  const sprites = getTile(x, y)
  if (sprites.length === 0) return
  // rebuild tile without the warning kind
  const keep = sprites.filter(s => s.type !== warnKind)
  clearTile(x, y)
  keep.forEach(s => addSprite(x, y, s.type))  // use s.type, not s
}
function removeAllOfWarning(warnKind) {
  const positions = tilesWith(warnKind)
  positions.forEach(tile => {
    const x = tile[0].x
    const y = tile[0].y
    removeWarningAt(x, y, warnKind)
  })
}

function clearAllWarnings() {
  removeAllOfWarning(warn_left)
  removeAllOfWarning(warn_right)
  removeAllOfWarning(warn_top)
  removeAllOfWarning(warn_bottom)
}

// --- Flash one wall at a time (adds warning sprites on top of spikes) ---
function flashWall(chosenWall) {
  clearAllWarnings()

  if (chosenWall === spik_left) {
    tilesWith(spik_left).forEach(tile => addSprite(tile[0].x, tile[0].y, warn_left))
  }
  if (chosenWall === spik_right) {
    tilesWith(spik_right).forEach(tile => addSprite(tile[0].x, tile[0].y, warn_right))
  }
  if (chosenWall === spik_top) {
    tilesWith(spik_top).forEach(tile => addSprite(tile[0].x, tile[0].y, warn_top))
  }
  if (chosenWall === spik_bottom) {
    tilesWith(spik_bottom).forEach(tile => addSprite(tile[0].x, tile[0].y, warn_bottom))
  }

  setTimeout(() => {
    clearAllWarnings() // removes only warnings; spikes stay
  }, 1000)
}

// --- Death check ---
function checkDeath(chosenWall) {
  const p = getFirst(player)
  let safe = false

  if (chosenWall === spik_left) {
    for (let x = 0; x < p.x; x++) {
      if (tilesWith(block).some(tile => tile[0].x === x && tile[0].y === p.y)) { safe = true; break }
    }
  }
  if (chosenWall === spik_right) {
    for (let x = p.x + 1; x < width(); x++) {
      if (tilesWith(block).some(tile => tile[0].x === x && tile[0].y === p.y)) { safe = true; break }
    }
  }
  if (chosenWall === spik_top) {
    for (let y = 0; y < p.y; y++) {
      if (tilesWith(block).some(tile => tile[0].y === y && tile[0].x === p.x)) { safe = true; break }
    }
  }
  if (chosenWall === spik_bottom) {
    for (let y = p.y + 1; y < height(); y++) {
      if (tilesWith(block).some(tile => tile[0].y === y && tile[0].x === p.x)) { safe = true; break }
    }
  }

  if (!safe) {
    addText("YOU DIED!", { x: 4, y: 3, color: color`3` })
  } else {
    addText("SAFE!", { x: 5, y: 3, color: color`4` })
    setTimeout(() => clearText(), 1000)
  }
}
// --- Main loop ---
function gameLoop() {
  clearText()
  const walls = [spik_left, spik_right, spik_top, spik_bottom]
  const chosen = walls[Math.floor(Math.random() * walls.length)]

  flashWall(chosen)
  spawnObstacle()

  setTimeout(() => {
    checkDeath(chosen)
  }, 2000)
}

// --- Starting countdown ---
function startCountdown() {
  addText("3", { x: 7, y: 3, color: color`3` })
  setTimeout(() => {
    clearText()
    addText("2", { x: 7, y: 3, color: color`3` })
  }, 1000)
  setTimeout(() => {
    clearText()
    addText("1", { x: 7, y: 3, color: color`3` })
  }, 2000)
  setTimeout(() => {
    clearText()
    playTune(melody)
    addText("GO!", { x: 6, y: 3, color: color`2` })
  }, 3000)
  setTimeout(() => {
    clearText()
    gameLoop()                  // run immediately after countdown
    setInterval(gameLoop, 5000) // then every 5 seconds
  }, 4000)
}

// start the countdown when the game loads
startCountdown()