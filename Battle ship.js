/*
@title: Battleship
*/

const player = "p"
const water = "w"
const hit = "h"
const miss = "x"
const hiddenship = "s"

let playerInputEnabled = true

const winSound = tune`
16000`
const lossSound = tune`
1666.6666666666667,
833.3333333333334: A4~833.3333333333334 + C4/833.3333333333334,
833.3333333333334: A4~833.3333333333334,
833.3333333333334: A4~833.3333333333334 + C4/833.3333333333334,
833.3333333333334: F4~833.3333333333334 + G4-833.3333333333334,
833.3333333333334: E4^833.3333333333334 + F4-833.3333333333334,
833.3333333333334: D4^833.3333333333334 + E4-833.3333333333334,
833.3333333333334: C4^833.3333333333334 + D4-833.3333333333334,
19166.666666666668`

setLegend(
  [player, bitmap`
LLLLLLLLLLLLLLLL
L77777777777777L
L77777777777777L
L77777722777777L
L77777700777777L
L77700000000777L
L77700000000777L
L77777700777777L
L77777000077777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
LLLLLLLLLLLLLLLL`],

  [water, bitmap`
7777755577555555
5555775555577755
7777755577775557
5555555555555555
5555777555557775
5777755577777555
5555555555555555
7775557777555577
5555777555557775
5555555555555555
7777755555555777
5555557777757755
7755577555555557
5557555577777777
7555577775555577
5557775555577755`],

  [hiddenship, bitmap`
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

  [hit, bitmap `
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],

  [miss, bitmap `
....22222222....
...2222222222...
..222222222222..
.22222222222222.
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
.22222222222222.
..222222222222..
...2222222222...
....22222222....`],
)

setBackground(water)
setSolids([])

// --- MAP ---
const levels = [
  map`
p......
.......
.......
.......
.......
.......
.......`
]

setMap(levels[0])

// --------------------
//   SHIP PLACEMENT
// --------------------
function getRandomCoord() {
  return {
    x: Math.floor(Math.random() * 7),
    y: Math.floor(Math.random() * 7)
  }
}

function shipsOverlap(a, b) {
  return a.x === b.x && a.y === b.y
}

const ships = []

function placeShip() {
  let pos
  do {
    pos = getRandomCoord()
  } while (ships.some(s => shipsOverlap(s, pos)))

  ships.push(pos)
  addSprite(pos.x, pos.y, hiddenship)
}

placeShip()
placeShip()
placeShip()
placeShip()

// --------------------
//   MOVEMENT
// --------------------
onInput("w", () => { if (playerInputEnabled) getFirst(player).y -= 1 })
onInput("s", () => { if (playerInputEnabled) getFirst(player).y += 1 })
onInput("a", () => { if (playerInputEnabled) getFirst(player).x -= 1 })
onInput("d", () => { if (playerInputEnabled) getFirst(player).x += 1 })

// --------------------
//   SHOOTING
// --------------------
onInput("l", () => {
  if (!playerInputEnabled) return

  const px = getFirst(player).x
  const py = getFirst(player).y
  const tile = getTile(px, py)

  const hasShip = tile.some(t => t.type === hiddenship)
  const hasHit = tile.some(t => t.type === hit)
  const hasMiss = tile.some(t => t.type === miss)

  // Already shot here
  if (hasHit || hasMiss) return

  // Hit
  if (hasShip) {
    clearTile(px, py)
    addSprite(px, py, hit)
    playTune(winSound)
    return
  }

  // Miss
  addSprite(px, py, miss)
})

// --------------------
//   CHECK WIN/LOSS
// --------------------
afterInput(() => {
  // Win condition: all ships hit
  if (tilesWith(hiddenship).length === 0) {
    addText("You Win!")
    playTune(winSound)
    playerInputEnabled = false
    return
  }

  // Loss: 10 misses
  if (tilesWith(miss).length >= 10) {
    addText("No more Ammo")
    playTune(lossSound)
    playerInputEnabled = false
  }
})

    addText("No more Ammo")
    playerInputEnabled = false
  }
})
