/*
@title: Terraria Lite
@author: Nathan458
@description: This game is Terraria Lite
@tags: ['Terraria', 'Terraria Lite']
@addedOn: 2026-04-06
*/

const breaker = tune`
500: C4/500,
15500`
const killer = tune`
163.9344262295082: C4~163.9344262295082 + D4~163.9344262295082 + E4~163.9344262295082 + F4^163.9344262295082,
5081.9672131147545`

// Player sprites
const playerRightIdle = "t"
const playerRightWalk = "w"
const playerLeftIdle = "x"
const playerLeftWalk = "y"
const playersword = "V"

let currentPlayer = playerRightIdle
let facing = "right"
let walking = false

const playerTypes = [
  playerRightIdle,
  playerRightWalk,
  playerLeftIdle,
  playerLeftWalk,
]

function isPlayerType(type) {
  return playerTypes.includes(type)
}

function getPlayer() {
  return (
    getFirst(playerRightIdle) ||
    getFirst(playerRightWalk) ||
    getFirst(playerLeftIdle) ||
    getFirst(playerLeftWalk)
  )
}

function setTileContents(x, y, types) {
  clearTile(x, y)
  for (const type of types) {
    addSprite(x, y, type)
  }
}

function changePlayerSprite(type) {
  const p = getPlayer()
  if (!p) return

  const x = p.x
  const y = p.y
  const keep = getTile(x, y).filter(s => !isPlayerType(s.type))

  setTileContents(x, y, keep.map(s => s.type))
  addSprite(x, y, type)

  currentPlayer = type
}
function checkLavaDamage() {
  const p = getPlayer()
  if (!p) return

  const tile = getTile(p.x, p.y)

  // If standing in lava
  if (tile.some(s => s.type === lava && lavab)) {
    damagePlayer(1) // damage per tick
  }
}

function movePlayerTo(x, y, type) {
  const p = getPlayer()
  if (!p) return

  const oldX = p.x
  const oldY = p.y
  const keep = getTile(oldX, oldY).filter(s => !isPlayerType(s.type))

  setTileContents(oldX, oldY, keep.map(s => s.type))
  addSprite(x, y, type)

  currentPlayer = type
}

function normalizePlayerType(type) {
  if (type === playerRightWalk) return playerRightIdle
  if (type === playerLeftWalk) return playerLeftIdle
  return type
}

// Blocks
const grass = "a"
const wood = "b"
const planks = "c"
const leaves = "d"
const cobblestone = "e"
const dirt = "f"
const b = "g"
const br = "h"
const bl = "i"
const t = "j"
const tl = "k"
const tr = "l"
const door = "m"
const wooda = "n"
const woodb = "o"
const stonebrick = "p"
const ladder = "q"
const stone = "X"
const ore = "Z"
const ash = "A"
const lava = "L"
const stoneb = "S"

// Entities / background
const sun = "u"
const squirrel = "v"
const zombie = "z"
const sky = "r"
const black = "s"
const torch = "C"
const lavab = "M"

const blocks = {
  grass,
  wood,
  planks,
  leaves,
  cobblestone,
  dirt,
  b,
  br,
  bl,
  t,
  tl,
  tr,
  door,
  wooda,
  woodb,
  stonebrick,
  ladder,
  stone,
  ash,
  torch,
}

const blockOrder = Object.keys(blocks)
let currentBlockIndex = 0

let inventory = {}
for (const key of blockOrder) {
  inventory[blocks[key]] = 0
}

// Day / night
let cycleSeconds = 200
let daySeconds = 150
let worldSecond = 0
let isNight = false

// Health
let maxHealth = 10
let health = maxHealth
let invincibleUntil = 0




// Physics
let gravity = 1
let jumpHeight = 3
let direction = "down"

function isInBounds(x, y) {
  return x >= 0 && x < width() && y >= 0 && y < height()
}

const solidTypes = [
  grass,
  dirt,
  planks,
  ladder,
  zombie,
  ore,
  stone,
  ash,
]

const treeCoreTypes = [wood, wooda, woodb]
const treeMaterialTypes = [wood, wooda, woodb, leaves, b, bl, br, t, tr, tl]

function isSolidAt(x, y) {
  if (!isInBounds(x, y)) return true
  return getTile(x, y).some(s => solidTypes.includes(s.type))
}

function showSelectedBlock() {
  clearText()

  const type = getCurrentBlockType()
  const name = getBlockNameByType(type)

  addText("Block: " + name, {
    x: 1,
    y: 1,
    color: color`3`
  })
  setTimeout(() => {
    clearText()
  }, 1000)
}

function canZombieMoveTo(x, y) {
  if (!isInBounds(x, y)) return false
  return !getTile(x, y).some(s => solidTypes.includes(s.type) || isPlayerType(s.type) || s.type === zombie)
}

function getBlockNameByType(type) {
  const found = blockOrder.find(name => blocks[name] === type)
  return found || type
}

function getCurrentBlockType() {
  return blocks[blockOrder[currentBlockIndex]]
}

function formatSeconds(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

function secondsUntilPhaseChange() {
  if (isNight) {
    return cycleSeconds - worldSecond
  }
  return daySeconds - worldSecond
}

function addToInventory(type, amount = 1) {
  if (inventory[type] === undefined) return
  inventory[type] += amount
}

function consumeFromInventory(type, amount = 1) {
  if (inventory[type] === undefined) return false
  if (inventory[type] < amount) return false
  inventory[type] -= amount
  return true
}

function removeTypesAt(x, y, typesToRemove) {
  const keep = getTile(x, y).filter(s => !typesToRemove.includes(s.type))
  setTileContents(x, y, keep.map(s => s.type))
}

function attackEntityTile(x, y) {
  const tile = getTile(x, y)
  const hasEntity = tile.some(s => s.type === zombie || s.type === squirrel)
  if (!hasEntity) return

  removeTypesAt(x, y, [zombie, squirrel])
}

function collectMineableBlock(type) {
  if (inventory[type] !== undefined) {
    addToInventory(type, 1)
  }
}

function breakTreeAbove(startX, startY) {
  const visited = new Set()
  const stack = [[startX, startY]]

  while (stack.length > 0) {
    const [x, y] = stack.pop()

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue

        const nx = x + dx
        const ny = y + dy
        if (!isInBounds(nx, ny)) continue
        if (ny > startY) continue

        const key = `${nx},${ny}`
        if (visited.has(key)) continue

        const tile = getTile(nx, ny)
        const treeBlock = tile.find(s => treeMaterialTypes.includes(s.type))
        if (!treeBlock) continue

        visited.add(key)
        collectMineableBlock(treeBlock.type)
        removeTypesAt(nx, ny, [treeBlock.type])
        stack.push([nx, ny])
      }
    }
  }
}

function mineBlockAt(x, y) {
  if (!isInBounds(x, y)) return

  const tile = getTile(x, y)
  const block = tile.find(s => !isPlayerType(s.type) && s.type !== zombie && s.type !== squirrel && s.type !== stoneb && s.type !== lava && s.type !== lavab && s.type !== torch)
  if (!block) return

  const type = block.type
  collectMineableBlock(type)
  removeTypesAt(x, y, [type])

  if (treeCoreTypes.includes(type)) {
    breakTreeAbove(x, y)
  }
}

function placeBlockAt(x, y) {
  if (!isInBounds(x, y)) return
  if (getTile(x, y).length !== 0) return

  const type = getCurrentBlockType()
  if (!consumeFromInventory(type, 1)) return

  addSprite(x, y, type)
}

function getTargetTileFromDirection() {
  const p = getPlayer()
  if (!p) return null

  let x = p.x
  let y = p.y

  if (direction === "up") y--
  if (direction === "down") y++
  if (direction === "left") x--
  if (direction === "right") x++

  if (!isInBounds(x, y)) return null
  return { x, y }
}

function findGroundSpawn() {
  for (let tries = 0; tries < 80; tries++) {
    const x = Math.floor(Math.random() * width())
    for (let y = 0; y < height() - 1; y++) {
      if (getTile(x, y).length === 0 && isSolidAt(x, y + 1)) {
        return { x, y }
        
        
      }
    }
  }
  return null
}

function spawnSquirrels() {
  for (let i = 0; i < 1; i++) {
    const spot = findGroundSpawn()
    if (spot) {
      addSprite(spot.x, spot.y, squirrel)
    }
  }
}

function spawnNightZombies() {
  for (let i = 0; i < 3; i++) {
    const spot = findGroundSpawn()
    if (spot) {
      addSprite(spot.x, spot.y, zombie)
    }
  }
}

function clearZombies() {
  const all = getAll(zombie)
  for (const zed of all) {
    removeTypesAt(zed.x, zed.y, [zombie])
  }
}

function damagePlayer(amount) {
  if (Date.now() < invincibleUntil) return

  health -= amount
  
  if (health <= 0) {
// Add temporary text
addText("You Died", { x: 2, y: 0 });

setTimeout(() => {
    clearText();
}, 10000);

    respawnAfterDeath()
    return
  }

  invincibleUntil = Date.now() + 500
}

// --- Legends / art ---
setLegend(
  [playerRightIdle, bitmap`
.....C.CC.C.....
...CCCCCCCCCC...
...CCCCCCCCCC...
..CCCCCCCCCCCC..
...CCCCC09CCC...
....C992099C....
.....992099.....
....77999999....
....77666667....
....77666667....
....77666667....
....99666669....
....99FF0F09....
....0FFF0F00....
....0FFFF0F0....
....00000000....`],
  [playerRightWalk, bitmap`
.....C.CC.C.....
...CCCCCCCCCC...
...CCCCCCCCCC...
..CCCCCCCCCCCC..
...CCCCC09CCC...
....C992099C....
.....992099.....
....77999999....
....77666667....
....77666667....
....77666667....
....99666669....
....99FF0F09....
...00FFF0F000...
...00FFFF0F00...
....00000000....`],
  [playerLeftIdle, bitmap`
.....C.CC.C.....
....CCCCCCCCC...
...CCCCCCCCC....
..CCCCCCCCCCC...
...CCC90CCCCC...
....C990299C....
.....990299.....
....99999977....
.....6666677....
.....6666677....
.....6666677....
.....6666699....
.....0F0FF99....
.....0F0FFF0....
....0F0FFFF0....
....00000000....`],
  [playerLeftWalk, bitmap`
.....C.CC.C.....
....CCCCCCCCC...
...CCCCCCCCC....
..CCCCCCCCCCC...
...CCC90CCCCC...
....C990299C....
.....990299.....
....99999977....
.....6666677....
.....6666677....
.....6666677....
.....6666699....
.....0F0FF99....
...00FFF0F000...
..00FFFF0F000...
....00000000....`],
  [playersword, bitmap`
................
................
................
................
........1.......
........L1L.....
.........L1L....
.........L1L....
........L1L.....
....LLLL1L......
...11111L.......
....LLLL........
................
................
................
................`],

  [grass, bitmap`
4444444444444444
DD444444D444D444
CD4D4CDCDDCDDDCD
CCDCDCDCCCCCCDCD
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
CCCCCCCCCCCCCCCC`],
  [wood, bitmap`
...CC0CCCCCCC...
...CC00CCCCCC...
...CCCCCC00CC...
...CCCCCC0CCC...
...CCCCCC0CCC...
...CC0CCC0CCC...
...CC0CCC0CCC...
...CC0CCC0CCC...
...CC0CCC0CCC...
...C00CCCCCCC...
...C0CCCCCCCC...
...CCCCCCCCCC...
...CCCC0CCCCC...
...CCCC00CCCC...
...CCCCC0CCCC...
...CCCCC000CC...`],
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
  [b, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
44DDD44DDDDDDD4D
D44444DDDDD4444D
DDDDDDDDDDDD44DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDDD
DDD4DD44DDDDDDDD
DDD4444DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDC...
...DDDDDDDCCC...
...CCCCC0CCCC...
...CCCCC000CC...`],
  [br, bitmap`
DDDDDDDDDDDDDD44
D44D444DDDDDD44D
DD444DDDDDDDDDDD
DDDDDDDDD4DDDDD.
DDDD4DDDD4DDDD..
DDDD44D444DDDD..
DDDDD444DDDDD...
DDDDDDDDDDDD....
D4444DDDDDD.....
DDDDDDDDD.......
DDDDDD..........
DDDD............
................
................
................
................`],
  [bl, bitmap`
44DDDDDDDDDDDDDD
D44DDDDDD444D44D
DDDDDDDDDDD444DD
.DDDDD4DDDDDDDDD
..DDDD4DDDD4DDDD
...DDD444D44DDDD
.....DDD444DDDDD
......DDDDDDDDDD
........DDD4444D
........DDDDDDDD
..........DDDDDD
............DDDD
...............D
................
................
................`],
  [t, bitmap`
................
.....DDDDDDDD...
.DDDDDDDDDDDDD..
DDDDDD4DDDDDDDDD
DD44444DDD4444DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD44DDDDDDDD
DDDDDDD44DD44DDD
DDDDDDDD4444DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD44DDDDDDDDDDDD
DDD4444DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [tl, bitmap`
................
................
................
.............DDD
..........DDDDDD
........DDDDD444
.....DDDDDDDDDDD
....DDDDDDDDDDDD
...DDDDDDDDDDDDD
..DDDDDD44DD44DD
.DDDDDDDD4444DDD
DDDDD4DDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDD4444DDDDDDD
DDDDDDDDDDDDDDDD`],
  [tr, bitmap`
................
................
................
DDDDD...........
D44DDDDD........
DDDDDDDDD.......
DDDDDDDDDDD.....
DD4DDDDDDDDDD...
DDD44D4DDDDDD...
DDDD444DDDDDDD..
DDDDDDDDDDDDDDD.
DDDDDDDDDDDDDDD.
D4444DDDDDDD4DDD
DD44DDDD444444DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [leaves, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDD44DDDDDDD
DDDDDDDD4444444D
D44DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDD44
DD4DDDDDDDDDD44D
DDD44D4DDDD444DD
DDDD444DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D4444DDDDDDD4DDD
DD44DDDD444444DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [dirt, bitmap`
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
CCCCCCCCCCCCCCCC`],
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
  [door, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFCCCCCFFCCCCCFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [wooda, bitmap`
...CC0CCCCCCC...
...CC00CCCCCC...
...CCCCCC00CC..C
...CCCCCC0CCC..C
...CCCCCC0CCC.CC
...CC0CCC0CCC0C0
...CC0CCC0CCC0C0
...CC0CCC0CCC0CC
...CC0CCC0CCC0CC
...C00CCCCCCC0CC
...C0CCCCCCCC0CC
...CCCCCCCCCC0CC
...CCCC0CCCCC0CC
...CCCC00CCCC0CC
...CCCCC0CCCC0..
...CCCCC000CC...`],
  [woodb, bitmap`
...CCCCCCC0CC...
.CCCCCCCC0CCC...
CCCCC000CCCC....
CC0C00CCCCC.....
C0C00CCCCC......
C00CCCCCC.......
CCCCCCCC........
CCCCCCC.........
CCCCC...........
CCCC............
CCC.............
CC..............
C...............
................
................
................`],
  [stonebrick, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL11111LL11111LL
LL11111LL11111LL
LL11111LL11111LL
LL11111LL11111LL
LL11111LL11111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ladder, bitmap`
LLLLLLFFFFFFFFCC
LLLLLLLLLLLLLCCC
LL11111LL111CCCL
LL1CCCCCCCCCCCLL
LL1FFFFFFFCCC1LL
LL11111LLCCC11LL
LL11111LCCC111LL
CCCCCCCCCCLLLLLL
FFFFFFCCCLLLLLLL
LL111CCC111111LL
LL11CCC1111111LL
CCCCCC11111111LL
FFCCC111111111LL
LCCC1111111111LL
CCCLLLLLLLLLLLLL
CCLLLLLLLLLLLLLL`],
  [sun, bitmap`
7777777777777777
7777666666667777
7776666666666777
7766666666666677
7666666666666667
7666666666666667
7666666666666667
7666666666666667
7666666666666667
7666666666666667
7666666666666667
7666666666666667
7766666666666677
7776666666666777
7777666666667777
7777777777777777`],
  [squirrel, bitmap`
................
................
................
................
....C.C....CC...
...CFCFC..CFFC..
...C0F0FCCFFFC..
...CFFFFCFFFC...
...CF0FFFFFCC...
....CFFFFFFC....
...CFFFCFFFC....
...CFCFCFFC.....
....CFCFFC......
...CFCFFC.......
....CFFC........
.....CC.........`],
  [zombie, bitmap`
.....C.CC.C.....
...CCCCCCCCCC...
...CCCCCCCCCC...
..CCCCCCCCCCCC..
...CCCCC3FCCC...
....CFF23FFC....
.....FF23FF.....
....CCFFFFFF....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....F3DDDDDF....
....3FDD0D03....
....0DDD0D00....
....0DDDD0D0....
....00000000....`],
  [stone, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [stoneb, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ore, bitmap`
1111111111111111
1111111111111991
1111111111111491
1119999911111441
1114444991111111
1111114441111111
1111111111111111
1111111111111111
1111111111199911
1111111111144911
1111119991114411
1491114499911111
1499111444911111
1449111114411111
1144111111111111
1111111111111111`],
  [ash, bitmap`
0000000000000000
00L000LLL00000L0
0000100L00LLLL00
0LLLLLLLLLLLLLL0
0LLLLLLLLL0000L0
0LLLL0000001L000
0L00LLLLLLLLLLL0
0L10LLLLLLLLLLL0
0LLLLLLLL0000000
00000LLLL00LLLL0
00LLLLLLLLLLLL00
0LL000000LLLLLL0
0L00LLLLLLLLLLL0
0L01LLLLLL0000L0
0LLLLLL0LLLLL0L0
0000000000000000`],
  [lava, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333993333333333
3333399993333933
3333333399333993
3333333333333393
9999993333333339
3333333333333339
3333333333333333
3339999999333333
3339333333399993
3333333339993333
3999999993333333
9933333333333333
3333333333333333`],
  [lavab, bitmap`
3333333333333333
3333333333999933
3333333333333333
3333993333333333
3333399993333933
3333333399333993
3333333333333393
9999993333333339
3333333333333339
3333333333333333
3339999999333333
3339333333399993
3333333339993333
3999999993333333
9933333333333333
3333333333333333`],
  [torch, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL99LLLLLLL
LLLLLLL69LLLLLLL
LLLLLLLCFLLLLLLL
LLLLLLLFCLLLLLLL
LLLLLLLCFLLLLLLL
LLLLLLLFFLLLLLLL
LLLLLLLFCLLLLLLL
LLLLLLLFCLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
)


const levels1 = [
  map`
..........
..........
..........
..........
..........
aaaaaaaa..
ffffffffaa
ffffffffff`,//1
  map`
.....kjl..
.....dddl.
.....igdd.
......bgh.
......no..
......b...
aaaaaaaaaa
ffffffffff`,//2
  map`
....kjl...
....dddl..
....dddd..
....iggh..
.....bb...
.....no...
aaaaaaaaaa
ffffffffff`,//3
  map`
..........
..........
..........
...ccccc..
...mpppm..
...mpppm..
aaacccccaa
ffffffffff`,//4
  map`
....dddl..
....igdd..
.....bgh..
.....bb...
.....no...
..aa.b....
aaffaaaaaa
ffffffffff`,//5
]

const levels2 = [
  map`
ffffffffff
fXffffffXf
fXXfXXfXXX
XXXfXXXfXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX`,//1
  map`
ffffffffff
ffffffffXf
fXXfXXfXXX
XXXfXXXfXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX`,//2
  map`
ffffffffff
fXffffffXf
fXXfXXfXXX
XXXfXXXfXX
XcccccXXXX
XbC..b.XXX
Xb...b..XX
XXXXXXXXXX`,//3
  map`
ffffffffff
fXffffffXf
fXXfXXfXXX
XXXfXXXfXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX`,//4
  map`
fXffffffff
XXXXXXffXf
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX`,//5
]

const levels3 = [
  map`
XXXXXXXXXX
ZXXXXXXXXX
XXXXXXXZXX
cccccccccc
b..b.Cb..b
b.zb..b..b
XXXXXXXXXX
XZZZXXXXXX`,//1
  map`
XXXXXXXXXX
XXXXXXXXXZ
XXXXZXXXXX
cccccccccc
bC.b..bC.b
b..b..b..b
XXXXXXXXXX
XXXXXXXXXX`,//2
  map`
ZXXXXXXXXX
XXXXXXXXXX
XXXXZXXXXX
cccccccccc
b..b..b..b
b..bC.b..b
XXXXXXXXXX
XXXXXXXZZX`,//3
  map`
XXXXXXXXXX
XXXXZXXXXZ
XXXZXXXXXX
cccccccccc
bC.b..b..b
b.zb.zb.Cb
XZXXXXXXXX
XXXXXZXXXX`,//4
  map`
XXXXXXXXXX
XXXXXZZXXZ
XZZXXXXXXX
cccccccccc
bC.b..b..b
b.zb..b.zb
XXXXXXXXXX
XXXXXXXXXX`,//5
]

const levels4 = [
  map`
XXXXXXXXXX
XXXXXXXXXX
ZXXXXXXXXX
XXXXXXXZXX
XXXXXXXXXX
XXXXXXXXXX
XXAAXXXXAX
AAAAAAAAAA`,//1
  map`
XXXXXXXXXX
XXXXXXZZXX
XXXXXXXXXX
XXXXXXXXXX
XZZXXXXXXX
XXXXXXXXXX
XAAAAAAXXA
AAAAAAAAAA`,//2
  map`
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXZXXXXX
XZXXXXXXXX
XXXXXXAAAX
AAAAAAAAAA
AAAAAAAAAA`,//3
  map`
XXXXXXXXXX
XXXXXXXXZX
XXZZXXXXZX
XXXXXXXXXX
XXXXXXXXXX
XAAAAAXXXX
AAAAAAAAXX
AAAAAAAAAA`,//4
  map`
XXXXXXXXXX
XXXXXXXXXX
XZXXXXXXXX
XZXXXXXZXX
XXXXXXXXXX
XXXXXXXXXX
XAAAAAXXXX
AAAAAAAAAA`,//5
]

const levels5 = [
  map`
AAAAAAAAAA
AAAAAAAAAA
A....A..AA
A........A
A.......AA
AA......AA
AAAALLLLLL
AAAAAAAAMM`,//1
  map`
AAAAAAAAAA
AAAAAAAAAA
A....A....
A.........
A.........
AA.......A
AALLLLLLLA
AAAAMMMMAA`,//2
  map`
A........A
.........A
..ALLLLLLA
.AMMMMMMMA
.AAAMMMMMA
.AAAMAAAAA
.AAAAAAAAA
AAAAAAAAAA`,//3
  map`
AAAAAAAAAA
AAAAAAA.AA
.........A
..........
..........
........AA
AAAALLLAAA
AAAAAAAAAA`,//4
  map`
..........
..........
..........
..ALLLA...
..AMMMAAA.
.AAMMMAAA.
.AAMMMAAAA
AAAAAAAAAA`,//5

]

// --- Supermap World ---
const supermap = [
  [levels1[0], levels1[1], levels1[2], levels1[3], levels1[4]],
  [levels2[0], levels2[1], levels2[2], levels2[2], levels2[3]],
  [levels3[0], levels3[1], levels3[2], levels3[3], levels3[4]],
  [levels4[0], levels4[1], levels4[2], levels4[3], levels4[4]],
  [levels5[0], levels5[1], levels5[2], levels5[3], levels5[4]],
]

let currentMapX = 0
let currentMapY = 0
let savedMaps = {}

function serializeCurrentLevel() {
  let rows = []

  for (let y = 0; y < height(); y++) {
    let row = ""
    for (let x = 0; x < width(); x++) {
      const tile = getTile(x, y)
      const playerSprite = tile.find(s => isPlayerType(s.type))
if (playerSprite) {
  row += "."
  continue
}

      const block = tile.find(s => s.type !== zombie && s.type !== squirrel)
      row += block ? block.type : "."
    }
    rows.push(row)
  }

  return rows
}


function saveMap() {
  const key = `${currentMapX},${currentMapY}`
  savedMaps[key] = serializeCurrentLevel()
}

function loadMap(spawnX = 1, spawnY = Math.max(0, height() - 3), spawnType = playerRightIdle) {
  const key = `${currentMapX},${currentMapY}`
  const data = savedMaps[key] || supermap[currentMapY]?.[currentMapX]

if (!data) {
  setMap(map`
..........
..........
..........
..........
..........
..........
..........`);

  if (currentMapY > 0) {
    setBackground(stoneb); // underground
  } else {
    setBackground(sky);    // surface
  }

} else if (Array.isArray(data)) {
  setMap(data.join("\n"));

  if (currentMapY > 0) {
    setBackground(stoneb);
  } else {
    setBackground(sky);
  }

} else {
  setMap(data);

  if (currentMapY > 0) {
    setBackground(stoneb);
  } else {
    setBackground(sky);
  }
}
// Remove any existing players first
for (const type of playerTypes) {
  const all = getAll(type)
  for (const p of all) {
    removeTypesAt(p.x, p.y, playerTypes)
  }
}
  addSprite(spawnX, spawnY, spawnType)

  if (isNight) {
    spawnNightZombies()
  }
  spawnSquirrels()
}

function respawnAfterDeath() {
  health = maxHealth
  invincibleUntil = Date.now() + 2000

  loadMap(1, Math.max(0, height() - 3), playerRightIdle)

  const p = getPlayer()
  if (p) {
    currentPlayer = playerRightIdle
    facing = "right"
    direction = "down"
  }
}

function transitionMap(dx, dy) {
  const p = getPlayer()
  if (!p) return

  const maxX = supermap[0].length - 1
  const maxY = supermap.length - 1

  saveMap()

  if (dx === -1 && currentMapX > 0) {
    currentMapX--
    loadMap(width() - 2, p.y, facing === "left" ? playerLeftIdle : playerRightIdle)
    return true
  }

  if (dx === 1 && currentMapX < maxX) {
    currentMapX++
    loadMap(1, p.y, facing === "left" ? playerLeftIdle : playerRightIdle)
    return true
  }

  if (dy === -1 && currentMapY > 0) {
    currentMapY--
    loadMap(p.x, height() - 2, facing === "left" ? playerLeftIdle : playerRightIdle)
    return true
  }

  if (dy === 1 && currentMapY < maxY) {
    currentMapY++
    loadMap(p.x, 1, facing === "left" ? playerLeftIdle : playerRightIdle)
    return true
  }

  return false
}

setSolids([
  playerRightIdle,
  playerRightWalk,
  playerLeftIdle,
  playerLeftWalk,
  grass,
  dirt,
  planks,
  cobblestone,
  ladder,
  zombie,
  stone,
  ore,
  ash,
])

setPushables({
  [playerRightIdle]: [],
  [playerRightWalk]: [],
  [playerLeftIdle]: [],
  [playerLeftWalk]: [],
  [zombie]: [],
})

setBackground(sky)
loadMap(1, Math.max(0, height() - 3), playerRightIdle)

function applyGravity() {
  const playerSprite = getPlayer()
  if (playerSprite) {
    if (playerSprite.y < height() - 1) {
      const belowTile = getTile(playerSprite.x, playerSprite.y + 1)
      if (!belowTile.some(s => solidTypes.includes(s.type))) {
        playerSprite.y += gravity
      }
    } else {
      if (direction === "down" && currentMapY < supermap.length - 1) {
        transitionMap(0, 1)
      }
    }
  }
}

function advanceClock() {
  worldSecond = (worldSecond + 1) % cycleSeconds

  if (worldSecond === daySeconds) {
    isNight = true
    spawnNightZombies()
    setBackground(black)
  }

  if (worldSecond === 0) {
    isNight = false
    clearZombies()
    setBackground(sky)
  }
}

function moveSquirrels() {
  const squirrels = getAll(squirrel)

  for (const s of squirrels) {
    if (s.y < height() - 1 && !isSolidAt(s.x, s.y + 1)) {
      s.y += 1
      continue
    }

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ]

    const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)]
    const nx = s.x + dx
    const ny = s.y + dy

    if (
      isInBounds(nx, ny) &&
      !isSolidAt(nx, ny) &&
      !getTile(nx, ny).some(t => isPlayerType(t.type) || t.type === zombie || t.type === squirrel)
    ) {
      s.x = nx
      s.y = ny
    }
  }
}

function moveZombies() {
  const playerSprite = getPlayer()
  if (!playerSprite) return

  const zombies = getAll(zombie)

  for (const zed of zombies) {
    const dx = playerSprite.x - zed.x
    const dy = playerSprite.y - zed.y
    const dist = Math.abs(dx) + Math.abs(dy)

    if (dist <= 1) {
      damagePlayer(1)
      
      continue
    }

    let steps = []

    if (Math.abs(dx) >= Math.abs(dy)) {
      steps.push([Math.sign(dx), 0])
      if (dy !== 0) steps.push([0, Math.sign(dy)])
    } else {
      steps.push([0, Math.sign(dy)])
      if (dx !== 0) steps.push([Math.sign(dx), 0])
    }

    steps.push([1, 0], [-1, 0], [0, 1], [0, -1])

    let moved = false
    for (const [sx, sy] of steps) {
      const nx = zed.x + sx
      const ny = zed.y + sy
      if (canZombieMoveTo(nx, ny)) {
        zed.x = nx
        zed.y = ny
        moved = true
        break
      }
    }

    if (!moved) {
      continue
    }

    const newDist = Math.abs(playerSprite.x - zed.x) + Math.abs(playerSprite.y - zed.y)
    if (newDist <= 1) {
      damagePlayer(1)
        addText("Health Warning: " + health, {
    x: 1,
    y: 1,
    color: color`3`
  })

  // Remove after 1 second
  setTimeout(() => {
    clearText()
  }, 1000)
    }
  }
}

function attackWithSword() {
  const target = getTargetTileFromDirection()
  if (!target) return
  attackEntityTile(target.x, target.y)
}

function jumpPlayer() {
  const p = getPlayer()
  if (!p) return

  direction = "up"

  const grounded = p.y >= height() - 1 || isSolidAt(p.x, p.y + 1)
  if (!grounded) return

  let steps = 0
  while (steps < jumpHeight && p.y > 0) {
    if (isSolidAt(p.x, p.y - 1)) break
    p.y -= 1
    steps += 1
  }

  if (p.y <= 0 && currentMapY > 0) {
    transitionMap(0, -1)
  }
}

function beginNight() {
  isNight = true
  spawnNightZombies()
}

function beginDay() {
  isNight = false
  clearZombies()
}

setInterval(applyGravity, 300)
setInterval(advanceClock, 1000)
setInterval(moveSquirrels, 650)
setInterval(moveZombies, 500)
setInterval(checkLavaDamage, 500) // every 0.5 seconds

// MOVEMENT
onInput("w", () => {
  const p = getPlayer()
  if (!p) return

  jumpPlayer()
})

onInput("a", () => {
  const p = getPlayer()
  if (!p) return

  facing = "left"
  direction = "left"

  if (p.x <= 0) {
    if (transitionMap(-1, 0)) return
  }

  const nx = p.x - 1
  if (nx >= 0 && !isSolidAt(nx, p.y)) {
    walking = true
    movePlayerTo(nx, p.y, playerLeftWalk)

    setTimeout(() => {
      if (facing === "left") {
        changePlayerSprite(playerLeftIdle)
      }
      walking = false
    }, 150)
  } else {
    changePlayerSprite(playerLeftIdle)
  }
})

onInput("d", () => {
  const p = getPlayer()
  if (!p) return

  facing = "right"
  direction = "right"

  if (p.x >= width() - 1) {
    if (transitionMap(1, 0)) return
  }

  const nx = p.x + 1
  if (nx < width() && !isSolidAt(nx, p.y)) {
    walking = true
    movePlayerTo(nx, p.y, playerRightWalk)

    setTimeout(() => {
      if (facing === "right") {
        changePlayerSprite(playerRightIdle)
      }
      walking = false
    }, 150)
  } else {
    changePlayerSprite(playerRightIdle)
  }
})

onInput("s", () => {
  const p = getPlayer()
  if (!p) return

  direction = "down"

  if (p.y >= height() - 1) {
    transitionMap(0, 1)
  }
})

// PLACE
onInput("k", () => {
  const target = getTargetTileFromDirection()
  if (!target) return
  placeBlockAt(target.x, target.y)
})

// MINE / DESTROY
onInput("l", () => {
  const target = getTargetTileFromDirection()
  if (!target) return
  mineBlockAt(target.x, target.y)
  playTune(breaker)
})

// CYCLE BLOCK
onInput("i", () => {
  currentBlockIndex = (currentBlockIndex + 1) % blockOrder.length
  showSelectedBlock()
})

onInput("j", () => {
  const p = getPlayer()
  if (!p) return

  if (getAll(playersword).length > 0) return

  let sx = p.x
  let sy = p.y

  // Place sword based on direction
  if (direction === "right") sx++
  if (direction === "left") sx--
  if (direction === "up") sy--
  if (direction === "down") sy++

  addSprite(sx, sy, playersword)

  playTune(killer)
  attackWithSword()

  setTimeout(() => {
    getAll(playersword).forEach(s => s.remove())
  }, 100)
})

afterInput(() => {
  const p = getPlayer()
  if (!p) return

  if (p.y <= 0 && direction === "up") {
    transitionMap(0, -1)
    return
  }

  if (p.y >= height() - 1 && direction === "down") {
    transitionMap(0, 1)
    return
  }

  saveMap()
})

