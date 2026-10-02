/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Lawnmower
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const darkGrass = "g"
const lightGrass = "l"
const cutGrass = "c"
const lawnmower = "m"

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

setSolids([])

let level = 0
let lawnLevel = 0

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

  if (grass) {
    grass.type = lightGrass
  }
  else if (light) {
    light.type = cutGrass
  }

  const cutTiles = getAll(cutGrass)

  if (cutTiles.length === 16) {
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
  }
})