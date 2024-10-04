/*
@title: Tower Defense
@author: Guerriacan
@tags: []
@addedOn: 2024-08-13
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const guiCenter = "0"
const guiTopLeft = "4"
const guiTopRight = "5"
const guiTop = "6"
const guiBottomLeft = "7"
const guiBottomRight = "8"
const guiBottom = "9"
const guiLeft = "l"
const guiRight = "k"

const select = "a"
const greyHeart = "b"
const heart = "c"
const money = "d"

const tank = "g"
const bullet = "h"

const explosion = "i"
const smoke = "j"
const monsterHealth3 = "3"
const monsterHealth2 = "2"
const monsterHealth1 = "1"

const flag = "e"
const portal = "f"
const floor = "n"
const pathRightToLeft = "o"
const pathLeftToRight = "p"
const pathUpToDown = "q"
const pathDownToUp = "r"
const pathUpToLeft = "s"
const pathUpToRight = "t"
const pathDownToLeft = "u"
const pathDownToRight = "v"
const pathLeftToUp = "w"
const pathLeftToDown = "x"
const pathRightToUp = "y"
const pathRightToDown = "z"

const pathTypes = [
  flag, portal,
  pathRightToLeft, pathLeftToRight, pathUpToDown, pathDownToUp,
  pathUpToLeft, pathUpToRight, pathDownToLeft, pathDownToRight,
  pathLeftToUp, pathLeftToDown, pathRightToUp, pathRightToDown
]

const monsterTypes = [
  monsterHealth1, monsterHealth2, monsterHealth3
]

var pathDirections = {}
pathDirections[pathRightToLeft] = { dx: -1, dy: 0, ex: 1, ey: 0 }
pathDirections[pathLeftToRight] = { dx: 1, dy: 0, ex: -1, ey: 0 },
pathDirections[pathUpToDown] = { dx: 0, dy: 1, ex: 0, ey: -1 },
pathDirections[pathDownToUp] = { dx: 0, dy: -1, ex: 0, ey: 1 },
pathDirections[pathUpToLeft] = { dx: -1, dy: 0, ex: 0, ey: -1 },
pathDirections[pathUpToRight] = { dx: 1, dy: 0, ex: 1, ey: -1 },
pathDirections[pathDownToLeft] = { dx: -1, dy: 0, ex: 1, ey: 1 },
pathDirections[pathDownToRight] = { dx: 1, dy: 0, ex: 1, ey: 1 },
pathDirections[pathLeftToUp] = { dx: 0, dy: -1, ex: -1, ey: 0 },
pathDirections[pathLeftToDown] = { dx: 0, dy: 1, ex: -1, ey: 0 },
pathDirections[pathRightToUp] = { dx: 0, dy: -1, ex: 1, ey: 0 },
pathDirections[pathRightToDown] = { dx: 0, dy: 1, ex: 1, ey: 0 }

const TICKMS = 50
var gameTickCounter = 0

var gameStart = false

var lifeCount = 3
var moneyCount = 2
var bulletSpawnRate = 700
var monsterSpeed = 800
var monsterSpawnChance = 30
var monsterSpawnRate = 2000
var moneySpawnRate = 5000

setLegend(
  [guiCenter, bitmap`
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
  [guiTopLeft, bitmap`
....000000000000
..00CCCCCCCCCCCC
.0CCCCCCCCCCCCCC
.0CCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC`],
  [guiTopRight, bitmap`
000000000000....
CCCCCCCCCCCC00..
CCCCCCCCCCCCCC0.
CCCCCCCCCCCCCC0.
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0`],

  [guiTop, bitmap`
0000000000000000
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
  [guiBottom, bitmap`
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
0000000000000000`],

  [guiBottomLeft, bitmap`
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
.0CCCCCCCCCCCCCC
.0CCCCCCCCCCCCCC
..00CCCCCCCCCCCC
....000000000000`],
  [guiBottomRight, bitmap`
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCC0.
CCCCCCCCCCCCCC0.
CCCCCCCCCCCC00..
000000000000....`],
  [guiLeft, bitmap`
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC`],
  [guiRight, bitmap`
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0`],

  [select, bitmap`
2222........2222
2..............2
2..............2
2..............2
................
................
................
................
................
................
................
................
2..............2
2..............2
2..............2
2222........2222`],
  [greyHeart, bitmap`
................
................
................
...000...000....
..0LLL0.0LLL0...
.0L11LL0LL1LL0..
.0L1LLLLL1LLL0..
.0LLLLLLLLLLL0..
.0LL1LLLLLLLL0..
..0LL1LLLLLL0...
...0LLLLLLL0....
....0LLLLL0.....
.....0LLL0......
......0L0.......
.......0........
................`],
  [heart, bitmap`
................
................
................
...000...000....
..03330.03330...
.0322330332330..
.0323333323330..
.0333333333330..
.0332333333330..
..03323333330...
...033333330....
....0333330.....
.....03330......
......030.......
.......0........
................`],
  [money, bitmap`
................
.....00.........
..000CC00.......
...0CCC0........
....0C0.........
...0CCC0........
..0CC6CC0.......
.0C66666C0......
0CC6C6C6C0......
0CC666CCC0......
0CCCC666C0......
0CC6C6C6C0......
.0C66666C0......
.0CCC6CC0.......
..00CCC0........
....000.........`],

  [tank, bitmap`
  ..00000..00000..
  ..0FFF0000FFF0..
  ..0FF444444FF0..
  ..0LL44DD44LL0..
  ..0FF4DDDD4FF0..
  ..0FF4DDDD4FF0..
  ..0LL4DDDD4LL0..
  ..0FF4DDDD4FF0..
  ..0FF4DDDD4FF0..
  ..0LL44DD44LL0..
  ..0FF44DD44FF0..
  ..0FFF0DD0FFF0..
  ..00000DD00000..
  .....00DD00.....
  .....0DDDD0.....
  .....000000.....`],
  [bullet, bitmap`
  ................
  .....000000.....
  .....099960.....
  ......0960......
  .....099690.....
  .....096690.....
  .....096690.....
  .....066990.....
  .....000000.....
  .....09CC90.....
  .....0CCC90.....
  .....0CC990.....
  ......0C90......
  ......0C90......
  .......00.......
  ................`],
  [explosion, bitmap`
...00000...0000.
..0333330.03330.
...033993033930.
...003999339930.
.003339699969330
0339996666669930
0399666626666930
0339966222669330
.03396622669930.
..0396666666930.
.033996666969330
0339939969993330
.03933399933300.
.03303339330330.
.030.003330.00..
..0....000......`],
  [smoke, bitmap`
................
...00000........
..0222220.......
.022222220......
.0222222220000..
012222222122220.
0112222212222220
.011122122222220
.001111112222220
0222222112222210
0222222211222210
0122222211121110
011222221111110.
01111121101100..
.01111110.00....
..000000........`],
  [monsterHealth3, bitmap`
................
................
...0000000000...
..044444444440..
...0000000000...
................
......000.......
.....0FFF00.....
....0FFFFFD0....
...0FFFFFFDD0...
...0FF3F3DDD0...
..0FFF3F3DDDD0..
..0FFFFFDDDDD0..
..00FFDDDDDD00..
...0000000000...
................`],
  [monsterHealth2, bitmap`
................
................
...0000000000...
..033344444440..
...0000000000...
................
......000.......
.....0FFF00.....
....0FFFFFD0....
...0FFFFFFDD0...
...0FF3F3DDD0...
..0FFF3F3DDDD0..
..0FFFFFDDDDD0..
..00FFDDDDDD00..
...0000000000...
................`],
  [monsterHealth1, bitmap`
................
................
...0000000000...
..033333334440..
...0000000000...
................
......000.......
.....0FFF00.....
....0FFFFFD0....
...0FFFFFFDD0...
...0FF3F3DDD0...
..0FFF3F3DDDD0..
..0FFFFFDDDDD0..
..00FFDDDDDD00..
...0000000000...
................`],

  [flag, bitmap`
1LLLLLLLLLLLLLL1
LLFFFFFFFFFFFFLL
LFFFFFFFFFFFFFFL
LFFFF9C57FF77FFL
LFFFF9C5757777FL
LFFFF9C57777FFFL
LFFFF9C577777FFL
LFFFF9CFFFF77FFL
LFFFF9CFFF77FFFL
LFFF19C1FFFFFFFL
LFF1L9CL1FFFFFFL
LFF1F9CF1FFFFFFL
LFFL1111LFFFFFFL
LFFFLLLLFFFFFFFL
LLFFFFFFFFFFFFLL
1LLLLLLLLLLLLLL1`],
  [portal, bitmap`
1LLLLLLLLLLLLLL1
LL0H008800HH00LL
L0H008HHHHH00H0L
L00H88H8888HH0HL
LH0H8HHHHHH8800L
LHH8HH8888HH880L
L0H8H88HH88HHH8L
L0H8H8HHHH8H8H8L
L8H8H8HHHH8H8H0L
L8HHH88HH88H8H0L
L088HH8888HH8HHL
L0088HHHHHH8H0HL
LH0HH8888H88H00L
L0H00HHHHH800H0L
LL00HH008800H0LL
1LLLLLLLLLLLLLL1`],
  [floor, bitmap`
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L
LLLLLLLLLLLLLLLL
111L1111111L1111
111L1111111L1111
111L1111111L1111
LLLLLLLLLLLLLLLL
1111111L1111111L
1111111L1111111L
1111111L1111111L`],
  [pathRightToLeft, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000600000000
6600006666000066
6600006666000066
0000000600000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111`],
  [pathLeftToRight, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000060000000
6600006666000066
6600006666000066
0000000060000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111`],
  [pathUpToDown, bitmap`
1L000006600000L1
1L000006600000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000006600000L1
1L000006600000L1
1L000066660000L1
1L000006600000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000006600000L1
1L000006600000L1`],
  [pathDownToUp, bitmap`
1L000006600000L1
1L000006600000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000006600000L1
1L000066660000L1
1L000006600000L1
1L000006600000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000000000000L1
1L000006600000L1
1L000006600000L1`],
  [pathUpToLeft, bitmap`
1L000006600000L1
LL000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000006600000L1
00000606600000L1
60006666600000L1
60006666600000L1
00000600000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
LLLLLLLLLLLLLLL1
1111111111111111`],
  [pathUpToRight, bitmap`
1L000006600000L1
1L000000000000LL
1L00000000000000
1L00000000000000
1L00000000000000
1L00000660000000
1L00000660600000
1L00000666660006
1L00000666660006
1L00000000600000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1LLLLLLLLLLLLLLL
1111111111111111`],
  [pathDownToLeft, bitmap`
1111111111111111
LLLLLLLLLLLLLLL1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000600000000L1
60006666600000L1
60006666600000L1
00000606600000L1
00000006600000L1
00000000000000L1
00000000000000L1
00000000000000L1
LL000000000000L1
1L000006600000L1`],
  [pathDownToRight, bitmap`
1111111111111111
1LLLLLLLLLLLLLLL
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000600000
1L00000666660006
1L00000666660006
1L00000660600000
1L00000660000000
1L00000000000000
1L00000000000000
1L00000000000000
1L000000000000LL
1L000006600000L1`],
  [pathLeftToUp, bitmap`
1L000006600000L1
LL000000000000L1
00000000000000L1
00000000000000L1
00000006600000L1
00000066660000L1
00000006600000L1
60000666600000L1
60000666600000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
LLLLLLLLLLLLLLL1
1111111111111111`],
  [pathLeftToDown, bitmap`
1111111111111111
LLLLLLLLLLLLLLL1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
00000000000000L1
60000666600000L1
60000666600000L1
00000006600000L1
00000066660000L1
00000006600000L1
00000000000000L1
00000000000000L1
LL000000000000L1
1L000006600000L1`],
  [pathRightToUp, bitmap`
1L000006600000L1
1L000000000000LL
1L00000000000000
1L00000000000000
1L00000660000000
1L00006666000000
1L00000660000000
1L00000666600006
1L00000666600006
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1LLLLLLLLLLLLLLL
1111111111111111`],
  [pathRightToDown, bitmap`
1111111111111111
1LLLLLLLLLLLLLLL
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000000000000
1L00000666600006
1L00000666600006
1L00000660000000
1L00006666000000
1L00000660000000
1L00000000000000
1L00000000000000
1L000000000000LL
1L000006600000L1`],
)

setBackground("n")

const levels = [
  map`
.......adc
..........
.eoooooou.
........r.
.vppppppw.
.r........
.yoooooof.
..........`,
  map`
.......adc
..........
.vpppx.ve.
.r...q.r..
.you.q.yu.
...r.q..r.
.fpw.tppw.
..........`,
  map`
.......adc
..........
.zooooof..
.q........
.q..eoou..
.q.....r..
.tpppppw..
..........`,
  map`
.......adc
..........
.f..zooou.
.q..q...r.
.q..e...r.
.q..r...r.
.tppw...f.
..........`,
  map`
.......adc
..........
.fpppxvpe.
.....qr...
...zutw...
...qr.....
.eosyooof.
..........`,
  map`
.......adc
..........
.fpx......
...tx.....
....tx....
.....tx...
......tpe.
..........`,
  map`
.......adc
..........
.fppppppx.
.fppppppq.
.fppppppe.
.fppppppr.
.fppppppw.
..........`,
  map`
.......adc
..........
.f.zou.e..
.q.q.r.r..
.q.e.f.r..
.q.....r..
.tpppppw..
..........`
]
let level = Math.floor(Math.random() * levels.length)
setMap(levels[level])


function drawGuiStart() {
  addSprite(3, 3, guiTopLeft)
  addSprite(4, 3, guiTop)
  addSprite(5, 3, guiTop)
  addSprite(6, 3, guiTopRight)
  addSprite(3, 4, guiLeft)
  addSprite(4, 4, guiCenter)
  addSprite(5, 4, guiCenter)
  addSprite(6, 4, guiRight)
  addSprite(3, 5, guiBottomLeft)
  addSprite(4, 5, guiBottom)
  addSprite(5, 5, guiBottom)
  addSprite(6, 5, guiBottomRight)

  addText("TO", { 
    x: 8,
    y: 7,
    color: color`2`
  })
  addText("START", { 
    x: 7,
    y: 8,
    color: color`2`
  })
  addText("PRESS", { 
    x: 8,
    y: 9,
    color: color`2`
  })
  addText("A KEY", { 
    x: 7,
    y: 10,
    color: color`2`
  })
}

function drawGuiEnd() {
  addSprite(3, 3, guiTopLeft)
  addSprite(4, 3, guiTop)
  addSprite(5, 3, guiTop)
  addSprite(6, 3, guiTopRight)
  addSprite(3, 4, guiLeft)
  addSprite(4, 4, guiCenter)
  addSprite(5, 4, guiCenter)
  addSprite(6, 4, guiRight)
  addSprite(3, 5, guiBottomLeft)
  addSprite(4, 5, guiBottom)
  addSprite(5, 5, guiBottom)
  addSprite(6, 5, guiBottomRight)

  addText("YOU", { 
    x: 8,
    y: 7,
    color: color`2`
  })
  addText("ARE", { 
    x: 9,
    y: 8,
    color: color`2`
  })
  addText("DEAD", { 
    x: 8,
    y: 9,
    color: color`2`
  })
  addText("x_x", { 
    x: 9,
    y: 10,
    color: color`1`
  })
}


function interactTank() {
  const specificSprite = getTile(getFirst(select).x, getFirst(select).y).find(sprite => sprite.type === tank)
  if (specificSprite) {
    specificSprite.remove()
    moneyCount = moneyCount + 1
  } else {
    if (moneyCount >= 2) {
      addSprite(getFirst(select).x, getFirst(select).y, tank)
      moneyCount = moneyCount - 2
    }
  }
}


function spawnBullet() {
  getAll(tank).forEach(tankSprite => {
    addSprite(tankSprite.x, tankSprite.y, bullet)
  });
}

function moveBullets() {
  getAll(bullet).forEach(bullet => {
    if (bullet.y === height() - 1) {
      bullet.remove()
    }
    bullet.y++
    const monstersInTile = getTile(bullet.x, bullet.y).filter(sprite => monsterTypes.includes(sprite.type))
    if (monstersInTile.length > 0) {
      const monsterHit = monstersInTile[0]
      if (monsterHit.type === monsterHealth1) {
        monsterHit.remove()
        addSprite(bullet.x, bullet.y, smoke)
      } else {
        monsterHit.type = monsterTypes[monsterTypes.indexOf(monsterHit.type) - 1]
      }
      bullet.remove()
    }
  })
}


function spawnMonster(x, y) {
  let chance = Math.floor(Math.random() * 100 + 1)
  if (chance <= monsterSpawnChance) {
    if (getTile(x, y).find(sprite => pathTypes.includes(sprite.type))) {
      if (!getTile(x, y).some(sprite => monsterTypes.includes(sprite.type))) {
        addSprite(x, y, monsterTypes[2])
      }
    }
  }
}

function moveMonsters() {
  const monsters = monsterTypes.flatMap(type => getAll(type))
  monsters.forEach(monster => {
    const currentX = monster.x
    const currentY = monster.y
    const currentTileSprites = getTile(currentX, currentY)
    const currentPathType = currentTileSprites.find(sprite => pathTypes.includes(sprite.type))
    const direction = pathDirections[currentPathType.type]
    if (currentPathType.type === flag) {
      monster.remove()
      addSprite(currentX, currentY, explosion)
      lifeCount--
    } else if (currentPathType.type === portal) {
      for (const [key, value] of Object.entries(pathDirections)) {
        var targetTileX = currentX - value.ex
        var targetTileY = currentY - value.ey
        getTile(targetTileX, targetTileY).forEach(sprite => {
          if (sprite.type === key) {
            monster.x = targetTileX
            monster.y = targetTileY
          }
        })
      }
    } else {
      const nextX = currentX + direction.dx
      const nextY = currentY + direction.dy
      const nextTileSprites = getTile(nextX, nextY)
      const isRoadTile = nextTileSprites.some(sprite => pathTypes.includes(sprite.type))
      if (isRoadTile) {
        monster.x = nextX
        monster.y = nextY
      } else {
        monster.remove()
      }
    }
  });
}

onInput("a", () => {
  getFirst(select).x -= 1
})
onInput("d", () => {
  getFirst(select).x += 1
})
onInput("w", () => {
  getFirst(select).y -= 1
})
onInput("s", () => {
  getFirst(select).y += 1
})

onInput("i", () => {
  interactTank()
})

afterInput(() => {
  if (!gameStart && lifeCount > 0) {
    gameStart = true;
    clearText();
    clearTile(3, 3);
    clearTile(4, 3);
    clearTile(5, 3);
    clearTile(6, 3);
    clearTile(3, 4);
    clearTile(4, 4);
    clearTile(5, 4);
    clearTile(6, 4);
    clearTile(3, 5);
    clearTile(4, 5);
    clearTile(5, 5);
    clearTile(6, 5);
    setMap(levels[level])
  }
})

drawGuiStart()

setInterval(() => {
  if (gameTickCounter < 99900) {
    gameTickCounter += TICKMS
  } else {
    gameTickCounter = 0
  }

  if (gameStart) {
    clearText()
    if (gameTickCounter % monsterSpeed == 0) {
      getAll(explosion).forEach(explosion => { explosion.remove() });
      getAll(portal).forEach(portal => {
        spawnMonster(portal.x, portal.y)
      })
      moveMonsters()
      intervalCounter = 0;
    }
    if (gameTickCounter % bulletSpawnRate == 0) {
      getAll(smoke).forEach(smoke => { smoke.remove() });
      spawnBullet()
    }

    if (gameTickCounter % moneySpawnRate == 0) {
      if (moneyCount < 10) {
        moneyCount++
      }
    }

    addText(moneyCount.toString(), {
      x: 17,
      y: 1,
      color: color`2`
    })
    addText(lifeCount.toString(), {
      x: 19,
      y: 1,
      color: color`2`
    })
  }

  moveBullets()

  if (lifeCount <= 0) {
    gameStart = false
    drawGuiEnd()
  }
}, TICKMS)
