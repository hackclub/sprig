/*
@title: Almost Terraria
@author: Smil
@tags: [procedural_generation]
@addedOn: 2025-00-00
*/

// tiles
const entity = "p"
const dirt = "d"
const grass = "g"
const stone = "s"

// assets
setLegend(
  [ entity, bitmap`
................
................
................
................
......1111......
.....1....1.....
....1......1....
....1.L..L.1....
....1..LL..1....
....1......1....
.....1....1.....
......1..1......
......1..1......
......1..1......
......1..1......
......1..1......` ],
  [ dirt, bitmap`
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
CCCCCCCCCCCCCCCC` ],
  [ grass, bitmap`
4444444444444444
4444444444444444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
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
CCCCCCCCCCCCCCCC` ],
  [ stone, bitmap`
LLL1LLLLLLL111LL
1111LLL11111LLLL
1LLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL1
LLLLL11111111111
LLL1111111111LLL
LLL1111LLLLLLLLL
LLLLLLLLLLLL1111
L11LLLLLLLL11LLL
11LLLLLLLLLLLLLL
LLLLLL1111LLLLLL
LL1111111LLLLLLL
1111111LLLLLL11L
11111LLLLLL11111
LLLLLLLLLLL1LLLL
LLLLLLLLL11LLLLL` ]
)

// terrain
var terrainTiles = [ dirt, stone, grass ]

// solids
var solidTiles = [ entity, ...terrainTiles ]
setSolids(solidTiles)

// ##################################################################
// ##################################################################
// ##################################################################
// initialize game
setMap(map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`)

// ##################################################################
// ##################################################################
// ##################################################################
// infinite world state
var VIEW_WIDTH = width()
var VIEW_HEIGHT = height()
var PLAYER_SCREEN_X = Math.floor(VIEW_WIDTH / 2)

var world = {}

var playerWorldX = 0
var cameraX = playerWorldX - PLAYER_SCREEN_X

// ##################################################################
// ##################################################################
// ##################################################################
// procedural terrain generation

function seededRandom(n) {
  var x = Math.sin(n * 12.9898) * 43758.5353

  return x - Math.floor(x)
}

function surfaceHeight(x) {
  var wave = Math.sin(x * 0.35) * 1.4
  var jitter = (seededRandom(x) - 0.5) * 1.5
  var h = Math.round(4.5 + wave + jitter)
  
  return Math.max(3, Math.min(6, h))
}

function generateColumn(x) {
  var surfaceY = surfaceHeight(x)
  var col = new Array(VIEW_HEIGHT).fill(null)

  // surface top
  col[surfaceY] = grass

  // surface
  for (var y = surfaceY + 1; y < surfaceY + 4 && y < VIEW_HEIGHT; y++) {
    col[y] = dirt
  }

  // underground
  for (var y = surfaceY + 4; y < VIEW_HEIGHT; y++) {
    col[y] = stone
  }

  return col
}

function getColumn(x) {
  if (!world[x]) {
    world[x] = generateColumn(x)
  }
  return world[x]
}

// ##################################################################
// ##################################################################
// ##################################################################
// helpers

function isSolidAt(x, y) {
  if (y < 0 || y >= VIEW_HEIGHT) return true
  return getColumn(x)[y] !== null
}

function isGrounded() {
  return isSolidAt(playerWorldX, player.y + 1)
}

// rendering

function drawViewport() {
  terrainTiles.forEach(type => getAll(type).forEach(t => t.remove()))
  for (var sx = 0; sx < VIEW_WIDTH; sx++) {
    var col = getColumn(cameraX + sx)
    for (var y = 0; y < VIEW_HEIGHT; y++) {
      if (col[y]) {
        addSprite(sx, y, col[y])
      }
    }
  }
}

// mining

function digAt(x, y) {
  var col = getColumn(x)
  if (!col[y]) return
  col[y] = null
  drawViewport()
}

function placeAt(x, y, type) {
  var col = getColumn(x)
  if (col[y]) return
  col[y] = type
  drawViewport()
}

// ##################################################################
// ##################################################################
// ##################################################################
// spawning

var startCol = getColumn(playerWorldX)
var spawnY = startCol.findIndex(t => t !== null) - 1

addSprite(PLAYER_SCREEN_X, spawnY, entity)
var player = getFirst(entity)

drawViewport()

// ##################################################################
// ##################################################################
// ##################################################################
// variables

var canJump = true
var facing = 1
var heldBlock = stone

// ##################################################################
// ##################################################################
// ##################################################################
// physics
setInterval(() => {
  if (!player) return
  if (!isGrounded()) {
    player.y += 1
  }
}, 700)

// ##################################################################
// ##################################################################
// ##################################################################
// movement
onInput("w", () => {
  if (!isGrounded()) return
  if (!canJump) return
  if (isSolidAt(playerWorldX, player.y - 1)) return
  
  player.y -= 1
  canJump = false

  setTimeout(() => {
    canJump = true
  }, 400)
})

onInput("a", () => {
  facing = -1
  if (isSolidAt(playerWorldX - 1, player.y)) return
  
  playerWorldX -= 1
  cameraX -= 1
  drawViewport()
})

onInput("d", () => {
  facing = 1
  if (isSolidAt(playerWorldX + 1, player.y)) return

  playerWorldX += 1
  cameraX += 1
  drawViewport()
})

// ##################################################################
// ##################################################################
// ##################################################################
// mining and building
onInput("i", () => {
  digAt(playerWorldX + facing, player.y)
})

onInput("j", () => {
  digAt(playerWorldX, player.y + 1)
})

onInput("k", () => {
  placeAt(playerWorldX + facing, player.y, heldBlock)
})

onInput("l", () => {
  placeAt(playerWorldX, player.y + 1, heldBlock)
})
