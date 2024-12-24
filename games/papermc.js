/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: papermc
@author: nulladmin1
@tags: []
@addedOn: 2024-12-24
*/

// The player sprite
const player = "p"

// Different blocks in the game
const grass = "g"
const wood = "w"
const planks = "o"
const leaves = "l"
const cobblestone = "c"
const tnt = "t"
const diamond = "d"

// The sky
const sky = "s"

// Black screen in the beginning
const black = "b"

// Gravity
let gravity = 1

// The direction the player is facing
let direction = "down"

setLegend(
  [player, bitmap`
................
.....CCCCCC.....
.....CFFFFC.....
.....F5FF5F.....
.....FFFFFF.....
.....F0000F.....
.....FFFFFF.....
...DDDDDDDDDD...
...FFDDDDDDFF...
...FFDDDDDDFF...
...FFDDDDDDFF...
...FFDDDDDDFF...
.....55555D.....
.....555555.....
.....55..55.....
.....55..55.....`],
  [grass, bitmap` 
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDCC
CDDDDDDDDDDDDCCC
CCDCCCCCCCCCCCCC
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
CCCCCCCCCCCCCCCC`],
  [wood, bitmap`
CC0CCCCCCCCCCCCC
CC0C0CCCC00CCC0C
CC0C0C0CC0CCCC0C
CC0C0C0CC00CCC0C
CC0C0C00CCC0CCCC
CC0CCCC0CCC0CCCC
CC0CCCC0CCC00CCC
CC0CCCC0CCCC0C0C
CC0CCCCCC0CCCC0C
C0CC0CCC00CCCC0C
C00C0CC00CCCCC0C
CC0C0CCCCCCC000C
C0CCC0CC00CC0CCC
C0CCC0CC0CC00CCC
C0CCC0CC0CC0CCCC
CCCCC0CC0CC0CC0C`],
  [planks, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [leaves, bitmap`
DDDDDDDDDDDDDDDD
D..DDD.DDDDD...D
DD.DDDD.DD.D.DDD
D.D.DDDD.D.DD.DD
D.D.DD.DD.D.D.DD
D.DD.D.DDD.D.D.D
D..D.D.DD.DD.DDD
DDD.D..DD.DDD.DD
D.DD.DDD.D.DD.DD
D..DD.D.DDD.DDDD
DD.DDD.D.DDD..DD
DDD.D..DD..DDD.D
DDD..DDDDDD.D.DD
D.D.DDDD...DD.DD
D.......DDD..DDD
DDDDDDDDDDDDDDDD`],
  [cobblestone, bitmap`
111111111LLL1111
1LL1111111L11LL1
1LL1LLLL11111LL1
1L11LLLL111111L1
1111LLLL111LLL11
L111111111LLL11L
L111LL1L11LLL11L
111LLL1L11111111
111LLL111LLLL111
1LL11L11LLLLL1L1
1LL11L11LLLLLLL1
111L11111LLL1LL1
11LLL1LL11111LL1
11LLL1LL11111111
11LLL1LL11LLLL11
111111111LLLLLL1`],
  [tnt, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
2200020220200022
2220220020220222
2220220200220222
2220220220220222
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [diamond, bitmap`
5555555555555555
5777777777777775
5777777777777775
5722277777777275
5727777777772225
5722722272277275
5727727272777275
5727722272777275
5777777777777775
5777772772777775
5777777722272275
5722272772727275
5727272772722775
5727272772772275
5777777777777775
5555555555555555`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [black, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
)

let currentBlockIndex = 0
const blocks = {
  grass: "g",
  wood: "w",
  planks: "o",
  leaves: "l",
  cobblestone: "c",
  tnt: "t",
  diamond: "d"
}
// Levels
let level = 0
const levels = [
  map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb`,
  map`
..........
.....lll..
.p...lll..
....llwll.
.....lwl..
......w...
gggggggggg
cccccccccc`,
]

setSolids([player, ...Object.values(blocks)])

// Set background
setBackground(sky);

// Gravity
function applyGravity() {
  const playerSprite = getFirst(player)
  if (playerSprite) {
    const belowTile = getTile(playerSprite.x, playerSprite.y + 1)
    if (!belowTile.some(sprite => Object.keys(blocks).includes(sprite))) {
      playerSprite.y += gravity
    }
  }
}
// Start screen
setMap(levels[level])

addText("Controls:", {
  x: 1,
  y: 1,
  color: color`2`,
})

addText("WASD - to move", {
  x: 2,
  y: 2,
  color: color`2`,
})

addText("\nK, L - \nto place, destroy \nblocks", {
  x: 2,
  y: 3,
  color: color`2`,
})

addText("\nI - \ncycle through\nblocks", {
  x: 2,
  y: 7,
  color: `2`,
})

addText("\nJ - reset map", {
  x: 2,
  y: 11,
  color: color`2`
})

setPushables({
  [player]: []
})

// Start Game Function
function startGame() {
  clearText()
  level = 1
  setMap(levels[level])
}

function getCurrentBlock() {
  return Object.values(blocks)[currentBlockIndex]
}

// Gravity interval
let gravityInterval = setInterval(applyGravity, 300)

// Movement Keys
onInput("w", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    const aboveTile = getTile(playerSprite.x, playerSprite.y - 1)
    const isSolidAbove = aboveTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidAbove) {
      playerSprite.y -= 1
      direction = "up"
    }
  }
})


onInput("a", () => {
  if (level == 0) startGame()
  clearText()
  playerSprite = getFirst(player)
  playerSprite.x -= 1
  if (playerSprite) {
    const leftTile = getTile(playerSprite.x - 1, playerSprite.y)
    const isSolidLeft = leftTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidLeft) {
      direction = "left"
    }
  }
})

onInput("d", () => {
  if (level == 0) startGame()
  clearText()
  playerSprite = getFirst(player)
  playerSprite.x += 1

  if (playerSprite) {
    const rightTile = getTile(playerSprite.x + 1, playerSprite.y)
    const isSolidRight = rightTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidRight) {
      direction = "right"
    }
  }
})

onInput("s", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    const belowTile = getTile(playerSprite.x, playerSprite.y + 1)
    const isSolidBelow = belowTile.some(sprite => Object.keys(blocks).includes(sprite))
    if (!isSolidBelow) {
      direction = "down"
    }
  }
})

// Place block
onInput("k", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    let targetX = playerSprite.x
    let targetY = playerSprite.y

    if (direction === "up") {
      targetY -= 1
    } else if (direction === "down") {
      targetY += 1
    } else if (direction === "left") {
      targetX -= 1
    } else if (direction === "right") {
      targetX += 1
    }

    const targetTile = getTile(targetX, targetY)
    const isTargetEmpty = targetTile.length === 0

    if (isTargetEmpty) {
      addSprite(targetX, targetY, getCurrentBlock())
    }
  }
})

// Destroy block
onInput("l", () => {
  if (level == 0) startGame()
  clearText()
  const playerSprite = getFirst(player)
  if (playerSprite) {
    let targetX = playerSprite.x
    let targetY = playerSprite.y

    if (direction === "up") {
      targetY -= 1
    } else if (direction === "down") {
      targetY += 1
    } else if (direction === "left") {
      targetX -= 1
    } else if (direction === "right") {
      targetX += 1
    }

    const targetTile = getTile(targetX, targetY)
    const isTargetEmpty = targetTile.length === 0

    if (!isTargetEmpty) {
      clearTile(targetX, targetY)
    }
  }
})

// Cycle through available blocks
onInput("i", () => {
  if (level == 0) startGame()
  clearText()
  currentBlockIndex = (currentBlockIndex + 1) % Object.keys(blocks).length
  addText("Current block: ", {
    x: 3,
    y: 4,
    color: color`3`
  })
  addText(Object.keys(blocks)[currentBlockIndex], {
    x: 3,
    y: 5,
    color: color`5`
  })
})

// Reset Level
onInput("j", () => {
  if (level == 0) startGame()
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

afterInput(() => {})
