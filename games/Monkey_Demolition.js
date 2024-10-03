/*
@title: Mirror_Mirror
@author: ethanJPope
@tags: []
@addedOn: 2024-07-11
*/

const monkeyRight = "m"
const monkeyLeft = "l"
const monkeyAttackLeft = "8"
const monkeyAttackRight = "9"

const ground = "g"
const building1 = "1"
const building2 = "2"
const building3 = "3"

let isWon = false
let isAttacking = false
let player = monkeyRight
let isFacingRight = true
let brokenBuildingCount = 0
let buildingCountText = {}
let countdown = 60
let countdownInterval
let level = 0;

const clearAllTiles = () => {
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      clearTile(x, y);
    }
  }
}

const checkBlock = () => {
  const playerSprite = getFirst(player) 
  let nextX = playerSprite.x + (isFacingRight ? 1 : -1)
  const nextTile = getTile(nextX, playerSprite.y)

  nextTile.forEach(sprite => {
    if (sprite.type === building1) {
      sprite.type = building2
    }
  })
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max) 
} 

const checkBrokenBuildings = () => {
  getAll(building2).forEach(block => {
    if (block.type === building2) {
      const adjacentTileRight = getTile(block.x + 1, block.y) 
      const adjacentTileLeft = getTile(block.x - 1, block.y) 
      if (adjacentTileRight.some(sprite => sprite.type === monkeyAttackRight) ||
          adjacentTileLeft.some(sprite => sprite.type === monkeyAttackLeft)) {
        breakBuilding(block) 
      }
    }
  }) 
}

const respawnBuilding = (y) => {
  let newX = getRandomInt(24) 
  addSprite(newX, 5, building1) 
} 

const changeBlockToBuilding3 = (block) => {
  block.type = building3 
}
setLegend(
  [monkeyRight, bitmap`
  ......0000000...
  0....0CCCCCCC0..
  C0..0CCCCCCCCC0.
  0C0.0C00CFFFFF0.
  0C0.00FFCF00FF0.
  0C0.00FFCF00FF0.
  0C0.0C00CFFFFF00
  0C0.0CCCFFFFFFF0
  0C0.0CCFFFFFFFF0
  0C0.0CC0000FF000
  0CC00CC0CC0FFFF0
  .0CC0CC0CC0FFF0.
  ..000CC0000CC0..
  ....0CCCCCCCC0..
  ....0C000000C0..
  ....000....000..`],
  [monkeyLeft, bitmap`
...0000000......
..0CCCCCCC0....0
.0CCCCCCCCC0..0C
.0FFFFFC00C0.0C0
.0FF00FCFF00.0C0
.0FF00FCFF00.0C0
00FFFFFC00C0.0C0
0FFFFFFFCCC0.0C0
0FFFFFFFFCC0.0C0
000FF0000CC0.0C0
0FFFF0CC0CC00CC0
.0FFF0CC0CC0CC0.
..0CC0000CC000..
..0CCCCCCCC0....
..0C000000C0....
..000....000....`],
  [monkeyAttackRight,  bitmap`
  ....0000000.....
  ...0CCCCCCC0....
  ..0CCCCCCCCC0...
  0.0C00CFFFFF0...
  0.00FFCF00FF0...
  0.00FFCF00FF0000
  0.0C00CFFFFF00C0
  0.0CCCFFFFFFF0C0
  0.0CCFFFFFFFF000
  0.0CC0000FF000..
  C00CC0CC0FFFF0..
  CC0CC0CC0FFF0...
  000CC0000CC0....
  ..0CCCCCCCC0....
  ..0C000000C0....
  ..000....000....`],
  [monkeyAttackLeft,  bitmap`
.....0000000....
....0CCCCCCC0...
...0CCCCCCCCC0..
...0FFFFFC00C0.0
...0FF00FCFF00.0
0000FF00FCFF00.0
0C00FFFFFC00C0.0
0C0FFFFFFFCCC0.0
000FFFFFFFFCC0.0
..000FF0000CC0.0
..0FFFF0CC0CC00C
...0FFF0CC0CC0CC
....0CC0000CC000
....0CCCCCCCC0..
....0C000000C0..
....000....000..`],
  [ground, bitmap`
0000000000000000
0000000000000000
0C00000C0000000C
0CC00CCCC0CC0CC0
CCCC0CCCC00CCCCC
CCCC0CCCCCCCCCCC
CC0CCCCCCCCCC0CC
CCCCCCCCCC0CCCC0
0CCCCC0CCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCC0CCCC0C
CCC0CCCCCCCCCCCC
CCCCC0CCCCCCCCCC
CCCCCCCCCCCCC0CC
CC0CCCCCCC0CCCCC
CCCCCC0CCCCCCCC0`],
  [building1, bitmap`
  
.....111111.....
....1LLLLLL1....
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...`],
  [building2, bitmap`
................
....L...........
...1L...........
...1L......L....
...1LL....7L1...
...1LL7.7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...
...1LL7L7L7L1...
...1LL7L7L7L1...
...1LLLLLLLL1...`],
  [building3, bitmap`
................
................
................
................
................
................
1...............
LL..............
L0..............
LLL.............
L00L0...........
LLLLLLL.........
L00L00L00..0....
LLLLLLLLL.LL....
LLLLLLLLLLLLL.L.
1111111111111.LL`],
)

setSolids([monkeyRight, monkeyLeft, ground, building1, building2, monkeyAttackRight, monkeyAttackLeft])
level = 0
const levels = [
  map`
........................
........................
........................
........................
........................
m....1..................
gggggggggggggggggggggggg`,
  map `
......
......
......`
]

setMap(levels[level])


const breakBuilding = (block) => {
  if (block) {
    const y = block.y 
    block.remove()
    respawnBuilding(block.x, y) 
    brokenBuildingCount++ 
    buildingCountText = addText(`Buildings Broken: ${brokenBuildingCount}`, {
      x: 0,
      y: 3,
      size: 25
    })
    if (brokenBuildingCount >= 50) {
      clearAllTiles()
      clearText()
      isWon = true
      level = 1
      const winText = addText(`You Won`, {
        x: 6,
        y: 8,
        color: color`H`
      })
    }
  } 
}
onInput("d", () => {
  if(!isWon) {
    getFirst(player).x += 1
    getFirst(player).type = monkeyRight
    player = monkeyRight
    isFacingRight = true
  }
})

onInput("a", () => {
  if(!isWon) {
    getFirst(player).x -= 1
    getFirst(player).type = monkeyLeft
    player = monkeyLeft
    isFacingRight = false
  }
})

onInput("j", () => {
  level = 0
  brokenBuildingCount = 0
  getFirst(player).type = monkeyRight
  player = monkeyRight
  isFacingRight = true
  clearText()
  buildingCountText = addText(`Buildings Broken: ${brokenBuildingCount}`, {
    x: 0,
    y: 3
  })
  setMap(levels[level])
})
  
onInput("i", () => {
  if(!isWon) {
    const playerSprite = getFirst(player) 
    if (playerSprite && playerSprite.x !== undefined && playerSprite.y !== undefined) {
      if (isFacingRight) {
        playerSprite.type = monkeyAttackRight
        player = monkeyAttackRight
      } else {
        playerSprite.type = monkeyAttackLeft
        player = monkeyAttackLeft
      }
  
      checkBlock()

      const nextX = playerSprite.x + (isFacingRight ? 1 : -1)
      const nextTile = getTile(nextX, playerSprite.y)

      nextTile.forEach(sprite => {
        if (sprite.type === building2) {
          setTimeout(() => {
            changeBlockToBuilding3(sprite)
            breakBuilding(sprite)
          }, 500)
        }
      })
    }
  }
})

afterInput(() => {
  checkBrokenBuildings() 
}) 
