/*
@title: Lawnmower
@description: Simple but satisying zen loop game. Mow the lawn, and it will come back and don't hit the rocks!
@author: Aarnav Verma
@tags: ['zen', 'satifying']
@addedOn: 2026-10-03
*/

const darkGrass = "g"
const lightGrass = "l"
const cutGrass = "c"
const lawnmower = "m"
const rock = "r"

setLegend(
  [lawnmower, bitmap`
................
..........0.....
.........00.....
........0.0.....
........0.0.....
...00...0000....
...066..666666..
..066666666666..
..066666666666..
.0006666666600..
.00066666666000.
.00006666660000.
..000......000..
..000......000..
...0........0...
................` ],

[rock, bitmap`
................
................
................
................
......1111......
....11111111....
...1111111111...
..111111111111..
..111111111111..
..111111111111..
...1111111111...
....11111111....
......1111......
................
................
................`],
  
  [ darkGrass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  
  [ lightGrass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],

  [ cutGrass, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ]
)

let level = 0
let lawnLevel = 0
let gameOver = false

addText("Lawns mowed: " + lawnLevel, {
  x: 2,
  y: 1,
  color: color`0`
})

const levels = [
  map`
gggg
gggg
gggg
gggg`
]

setMap(levels[level])

addSprite(3, 3, lawnmower)
spawnRock()

function spawnRock() {
  const mower = getFirst(lawnmower)

  let rockX = Math.floor(Math.random() * 4)
  let rockY = Math.floor(Math.random() * 4)

  while (rockX === mower.x && rockY === mower.y) {
    rockX = Math.floor(Math.random() * 4)
    rockY = Math.floor(Math.random() * 4)
  }

  addSprite(rockX, rockY, rock)
}

onInput("s", () => {
  getFirst(lawnmower).y += 1
})

onInput("w", () => {
  getFirst(lawnmower).y -= 1
})

onInput("a", () => {
  getFirst(lawnmower).x -= 1
})

onInput("d", () => {
  getFirst(lawnmower).x += 1  
})

afterInput(() => {
  const mower = getFirst(lawnmower)
  const tile = getTile(mower.x, mower.y)

  const grass = tile.find(sprite => sprite.type === darkGrass)
  const light = tile.find(sprite => sprite.type === lightGrass)
  const hitRock = tile.find(sprite => sprite.type === rock)

if (hitRock) {
    gameOver = true

    clearText()

    addText("GAME OVER", {
      x: 5,
      y: 7,
      color: color`3`
    })

    return
  }

  
  if (grass) {
    grass.type = lightGrass
  }
  else if (light) {
    light.type = cutGrass
  }

  const cutTiles = getAll(cutGrass)

  if (cutTiles.length === 15) {
    lawnLevel += 1

    clearText()

    addText("Lawns mowed: " + lawnLevel, {
      x: 2,
      y: 1,
      color: color`0`
    })

    cutTiles.forEach(tile => {
      tile.type = darkGrass
    })

    getAll(rock).forEach(r => {
      r.remove()
    })

    spawnRock()
  }
})
