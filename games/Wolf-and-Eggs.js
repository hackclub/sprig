/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Wolf and Eggs
@author: diantoniuksc
@tags: []
@addedOn: 2025-04-17
*/

const wolf = "w"
const eggSprite = "e"
const stoneSprite = "s"

setLegend(
  [wolf, bitmap`
......000000......
.....00000000.....
....0000000000....
...000000000000...
...000020200000...
...000000000000...
....0000000000....
..000000000000....
00000000000000....
00000000000000....
.....000000000....
.....000000000....
00000000000000....
..000000000000....
...00000000000....
.....00000000.....`],
  [eggSprite, bitmap`
................
................
................
................
.......00.......
.....000000.....
....00....00....
...00......00...
...00......00...
...00......00...
....00....00....
.....000000.....
.......00.......
................
................
................`],
  [stoneSprite, bitmap`
................
................
................
................
.....000000.....
...00......00...
..0..00..00..0..
..0...0000...0..
..0....00....0..
..0...0000...0..
..0..0....0..0..
...00......00...
.....000000.....
................
................
................`]
)

setSolids([])

let score = 0
let gameOver = false

const eggPaths = [
  { x: 1, spawnY: 0, catchY: 6 },
  { x: 6, spawnY: 0, catchY: 6 }
]

let wolfPos = 0
let fallingItems = [] // now contains both eggs and stones

function placeWolf() {
  getAll(wolf).forEach(w => w.remove())
  const pos = eggPaths[wolfPos]
  addSprite(pos.x, pos.catchY, wolf)
}

setMap(map`
........
........
........
........
........
........
........`)
placeWolf()

onInput("a", () => { if (!gameOver) { wolfPos = 0; placeWolf() } })
onInput("d", () => { if (!gameOver) { wolfPos = 1; placeWolf() } })

function spawnItem() {
  const i = Math.floor(Math.random() * 2)
  const isEgg = Math.random() < 0.7 // 70% chance for egg, 30% for stone
  const { x, spawnY } = eggPaths[i]
  fallingItems.push({
    type: isEgg ? "egg" : "stone",
    path: i,
    x: x,
    y: spawnY
  })
}

function updateItems() {
  fallingItems.forEach(item => item.y += 1)

  for (let i = fallingItems.length - 1; i >= 0; i--) {
    const item = fallingItems[i]
    const end = eggPaths[item.path]
    const wolfSpot = eggPaths[wolfPos]

    if (item.y >= end.catchY) {
      if (item.x === wolfSpot.x && item.y === wolfSpot.catchY) {
        if (item.type === "egg") {
          score++
        } else if (item.type === "stone") {
          endGame("You caught a stone!\nGAME OVER\nScore:" + score)
          return
        }
      } else {
        if (item.type === "egg") {
          score = 0
        }
      }

      clearText()
      addText(`Score: ${score}`, { x: 1, y: 0, color: color`3` })
      fallingItems.splice(i, 1)
    }
  }
}

function drawItems() {
  getAll(eggSprite).forEach(e => e.remove())
  getAll(stoneSprite).forEach(s => s.remove())

  fallingItems.forEach(item => {
    const sprite = item.type === "egg" ? eggSprite : stoneSprite
    addSprite(item.x, item.y, sprite)
  })
}

function endGame(msg) {
  gameOver = true
  clearText()
  addText(msg, { x: 1, y: 3, color: color`3` })
}

setInterval(() => {
  if (gameOver) return

  if (Math.random() < 0.7) spawnItem()
  updateItems()
  drawItems()
}, 600)

afterInput(() => {
  if (!gameOver) {
    clearText()
    addText(`Score: ${score}`, { x: 1, y: 0, color: color`3` })
  }
})
