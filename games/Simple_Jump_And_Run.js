/*

@title: Little jump and run game
@author: Vincent Abeln
@tags: [JumpAndRun]
*/

const player = "p"
const grass_block_1 = "1"
const grass_block_2 = "2"
const grass_block_3 = "3"
const grass_block_4 = "4"
const grass_patch_left = "5"
const grass_patch_right = "6"
const stone_block_1 = "s"
const stone_block_2 = "S"
const stone_block_3 = "0"
const stone_block_4 = "9"
const coin = "c"
const finish_line = "f"
const cloud = "w"
const static_cloud = "W"
const barrier = "B"

setLegend(
  [player, bitmap`
....LLLLLLLL....
...L21111111L...
..L211111111L...
..L11LLLLLLLL...
..L11LCDCLDCL...
..L11L94994C...0
..LLL999999C0.0L
....55CCCCC100L1
.00000555550LL1L
022211077755LDL0
02211L07775C5LL0
0111LL055555500.
.011L055775....0
..0L0..575......
...0....55......
.........5......`],

  [grass_block_1, bitmap`
....DDDDDDDDDD..
..DDDDDCDCCCCDD.
.DDDDCCCDCCDCDDD
DDDDDCCCCDCCCDDD
DDDDCDDCCCCDCCCD
DCCCCCCCCCCDCCCC
CDDCCCCCCCCCCCCD
CDCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCLLCCCLCC
CCCCCLLLLLLLLLCC
CLLLL11LLL1LLLLC
CLLLL1LLL1111LLC`],
  [grass_block_2, bitmap`
....DDDDDDDDDDDD
..DDDDDCDCCCCDDD
.DDDDCCCDCCDCCCC
DDDDDCCCCDCCCCCC
DDDDCDDCCCCCCCCC
DCCCCCCCCCCCCCCC
CDDCCCCCCCCCCCCC
CDCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CDCCCCCCLLCCCLCC
DCCCCLLLLLLLLLCC
DLLLL11LLL1LLLLC
DLLLL1LLL1111LLC`],
  [grass_block_3, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDCDCCCCDDD
DCDDDCCCDCCDCCCC
DCCCCCCCCDCCCCCC
CCCDCDDCCCCCCCCC
CCCCCCCCCCCCCCCC
CCDCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCLLCCCLCC
CCCCCLLLLLLLLLCC
CLLLL11LLL1LLLLC
CLLLL1LLL1111LLC`],
  [grass_block_4, bitmap`
DDDDDDDDDDDDDD..
DDDDDDDCDCCCCDD.
DDCDCCCCDCCDCDDD
CCCDDCCCCDCCCDDD
DDDDCCCCCCCDCCCD
CCDCCCCCCCCDCCCC
CCCCCCCCCCCCCCCD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCLLCCCLDC
CCCCCLLLLLLLLLCD
CLLLL11LLL1LLLLD
CLLLL1LLL1111LLC`],

  [grass_patch_left, bitmap`
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
D...............
D...............
DD..............
DDDD............`],
  [grass_patch_right, bitmap`
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
...............D
...............D
..............DD
............DDDD`],

  [stone_block_1, bitmap`
LLLLLLLL1LLLLLLL
LLLLLLLL11LLLLLL
LLLL1LLLL11LLLLL
11LL11LLLL1LLLL1
L1LLL11LLL11LLLL
L1LLLL1LLLLLLLLL
11LLLL11LLLLLL11
L111LLL11LLLL11L
LLL11LLLLLLLL1LL
LLLLLLLLLLL11LLL
LLLLLLLLLL11LLLL
LLLLLLLLLLLLLLLL
LL11LLLLLLLLLLLL
LLL111LLLLLLLLLL
LLLLL111LLLLLLLL
LLLLLLL11LLLLLLL`],
  [stone_block_2, bitmap`
LLLLLLLL1LLLLLLL
LLLLLLL111LL11LL
L111LLLLLLLLL11L
11LLLLLLLLLLLL11
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
11LLLLL111111111
11LLLLL11111LLLL
11LLLLLLL11LLLLL
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL11LLLLLLLLLL
LLLLL111LLLLLLLL
LLLLLLL1LLLLLLLL
LLLLLLL1LLLLLLLL
LLLLLLL11LLLLLLL`],
  [stone_block_3, bitmap`
LLLLLLLL1LLLLLLL
LLLLLLLL11LLLLLL
LLLL1LLL11LLLLLL
11LL11LLL1LLLLL1
LLL111LLLLLLLLLL
L1L111LLLL11LL11
1111LLLLLL111111
L11LLLLLL111LLLL
L111LLLL1111LLLL
LLL1LLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLL111LLLLL
LLLLLLL111LLLLLL
LLLLLLL11LLLLLLL`],
  [stone_block_4, bitmap`
LLLLLLL11LLLLLLL
LLLLLLL111LL1LLL
LLL1LLLL1L1111LL
11111LLL11111111
LL111LLL1L1LL111
L11LL1LLLLLL111L
111111LLLLLL1111
11L11LLLLLLL11LL
1LLLLLLLLLLLL1LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL1111LLLLLLLLLL
LLLL111LLLLLLLLL
LLLLL111LL11LLLL
LLLLLLL111111LLL
LLLLLLL11LLLLLLL`],

  [coin, bitmap`
................
................
................
.....000000.....
....06666660....
...066FFFF660...
...0626666F60...
...0626666F60...
...0626666F60...
...0626666F60...
...0662222660...
....06666660....
.....000000.....
................
................
................`],

  [finish_line, bitmap`
................
................
0022002200220022
0022002200220022
2200220022002200
2200220022002200
0022002200220022
0022002200220022
2200220022002200
2200220022002200
..C..........C..
..C..........C..
..C..........C..
..C..........C..
..C..........C..
..C..........C..`],

  [cloud, bitmap`
....11111111....
1111112222221111
.112222222221111
.11112212222221.
..1122122111221.
...112222222211.
....11121111111.
......1111111...
................
................
................
................
................
................
................
................`],
  [static_cloud, bitmap`
1122212222111212
2222222222222222
2222222222222222
1222222222222221
1122222222222221
1122222222222222
1122222222222222
1222222222221222
1121222222212211
.1211222222221..
.122121221211...
..1222222211....
..11111111......
................
................
................`],

  [barrier, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]

)
setSolids([
  player,
  grass_block_1, grass_block_2, grass_block_3, grass_block_4,
  stone_block_1, stone_block_2, stone_block_3, stone_block_4,
  cloud, static_cloud,
  barrier
])

setPushables({
  [player]: []
})

const spritesCountingAsAir = [coin, finish_line, grass_patch_left, grass_patch_right]
const collectibles = [coin]

let collectedCollectibles = {}

let level = 0

//Good map ratio: 5x3
let map_width = 30
let map_height = 18

const levels = [
  map`
p........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.............6245..c.....
.......62456230s34.......
...62333s933sssS9s.......
.623ss0sSs9sSSssSs5....f.
239ssSsssSSs0ssSs93333333
sSS0ss0sS0Ssssss0s9sS9ssS
SSsSssss9SS9ss0SsssSs0S0s`,
  map`
p..............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
...............................
.............c.................
......6233345..6233345.........
.....62sssss3333sssss3333334...
...623sSsSssssSssSSssSssSSss...
.623sSSsssSsSssssSss...........
23ssSssSSSssssSssssscsssSSss45f
SssssSSssssssssSsssssssSSsssS33`,
  map`
ss0000sssssssssssss0sssss0s0s0ss9s9S9
sSsS0999S909Ss9Ss9099sS909sS0S900s0s0
SSsS0s00S00sss999sss90S00S99S9sssSS00
p....9ssSs0s......ss9ssss0s999SS0SSs9
......ssS90.........ss9s90ss0s0sS0S0S
.......ssss..........s090s99S....s09S
........ss......1....s900SSS.......99
........s9.....6S....s9s090..........
........0s....23S...s990sSS..........
........ss...2SSS...09sss90.........f
........s...6SSS...s9s.cs0.......WWWW
........9...2SS....s9..s9S...........
....24..9...SSS..s99..s0s............
....sS.......S...000.s00S......1.....
....S0......SS...0s..ss........S5....
....0S......SS..9s...S0.......6945...
....Ss......SS..s9..S0S......629s4...
....0s......S...0s.........62390sS5.c
...6SS5....6S.............62S9sSS045.
2333SS333333S3333333333333399s99Ss934
SSs00ssSSss0sSSS0SSssssS0sS000ss0s0sS`,
  map`
ss0000sssssssssssss0sssss0s0s0ss9s9S9
sSsS0999S909Ss9Ss9099sS909sS0S900s0s0
SSsS0s00S00sss999sss90S00S99S9sssSS00
p....9ssSs0s......ss9ssss0s999SS0SSs9
......ssS90.........ss9s90ss0s0sS0S0S
.......ssss..........s090s99S....s09S
........ss......1....s900SSS.......99
........s9.....6S....s9s090..........
........0s....23S...s990sSS..........
........ss...2SSS...09sss90.........f
........s...6SSS...s9s.cs0.......WWWW
........9...2SS....s9..s9S...........
....24..9...SSS..s99..s0s............
....sS.......S...000.s00S......1.....
....S0......SS...0s..ss........S5....
....0S......SS..9s...S0.......6945...
....Ss......SS..s9..S0S......629s4...
....0s......S...0s.........62390sS5.c
...6SS5....6S.............62S9sSS045.
2333SS333333S3333333333333399s99Ss934
SSs00ssSSss0sSSS0SSssssS0sS000ss0s0sS`,
  map`
p.................c..................
.................WW..................
.......WWWW...............WW.........
........WWW.............WWWWW........
.........W.............WWWWWW.....WWW
..........................WW.....WWWW
...............................WWWWW.
...............c.............WWWWWW..
.............WWWWWW.......WWWWWWWWW.c
...............WWW.........WWWWWWW...
.................W.............WW..WW
WWW..................................
WW...................................
.....................................
.....................................
...WWWWWW............................
...WWWWW............WWWWW.....WW.f...
.....WW..............WW.......WWWW...
................................WWW..
.....................................
.....................................`,
  map`
pS0sSssss0S.009s0s000000c............
..S0S0sSsS...00990s99s0000...f.......
....S0SSsS......000ss900ss0000.......
....SS0SS.........ss0990ss90000......
.....ss................9s09s9900.....
.....SS................0000009ss90...
......S.....................000sss00.
......S........................sssss.
..................................s..
WW...................................
W........000000......................
..........0000ss0.............0sS....
.............090s09s9.......0990S0...
..............000000990s0..0s0scSs9..
..................000s999ss0900..09..
...................s0s00s0ssss00.....
.....................00090ss0s000....
........................0000s09s000..
..............9............000s0090..
.............00s............c0ss00s0.
.......W.....s009...........000900s00`,
  map`
p....................................
.....................................
.........................sss.........
.........................ssss........
........................ssSss........
........................00Sss.f......
........................0099SSs......
........................0s999Ss......
.......................ss09s9sSs.....
.......................ss00S9ssss....
.......................ss00s9Sssss...
........................ss0s9Sssss...
.........................0.90sss9s...
............................s0Sss9...
.......................s9...00009ss..
5......................ssSs.09S99ss..
45....................sssS..0090sss..
s345......WWW.........ssss.S9ss9S0s..
sss3345..............sss90c0099Sss0s.
ssssss45............0S090S0SS9999s0sc
sssssss4...........sss099s999999900ss`,
  map`
p.WWWWWWWWWWWWWW...........WWWWWWWWW.....................W.........
..WWWWWWWWWWWW...............WWWWWWWWWW....WW...........WWWW.......
.WWWWWWWWWWWW................WWWWWWWWWW...WWWc.......WWWWWWWW......
.WWWWWWWWWWW........cWWWWW.......WWWWW...WWWWWW.....WWWWWWWW.......
...................WWWWWWWW.............WWWWWW.....WWWWWWWW........
...................WWWWWWWWW............WWWWWW.....WWWWWWWW.......W
...................WWWWWWWWW............WWWWW.......WWWWW.......WWW
....................WWWWWWWW............W..W........WWWW.......WWWW
..............W......WWWWWWW.........................W.......WWWWWW
............WWWWW....WWWWWW..........WWWWW..................WWWWWWW
............WWWW.......WWWW.........WWWWW...................WWWWWWW
...........WWWWW........WWW.........WWW.....6233345........WWWWWW..
...........WWWW.........WWW........WWWWW...62sssss45.......WWWW....
345.......WWWWW.........WW.........WWWWW...2sssssss34.....WWWWW....
ss3345......cW..........WW.62334....WWWW.c6ssssssssss.....W........
sssss334........6233345.W.62ssss......WW.23ssssssssss5.............
ssssssss5......23sssss4...2sssss.........ssssssssssss34...........f
ssssssss334....ssssssss...ssssss.........ssssssssssssss.........233`,
  map`
WWWWW.............................
WWWWW...........................f.
WWWWW.......WWWWWWWWW..........WWW
WWWWW......WWWWWWWWWWWW...........
WWWW.......WWWWWWWWWWW............
WWWW..........W.WWWWW.............
WWW................W..............
WWW.....................W.........
WW........c............WWWWWW.....
p.........W............WWWWWW.....
.........WWW............WWWWW.....
.......WWWWWWW..........WWWWW.....
........WWWWWWW...........W.......
........WWWWWWWW..................
.........WW..WW...................
................................WW
...............................WWW
......................WW.......WWW
....................WWWWWW.......W
...................WWc............
...................WWWWWWW........
.....................WWW..........
......WWWWc.......................
......WWWWW.......................
......WWWWW.......................
.......WWW........................
..................W...............
...............WWWWW.....WW.......
..............WWWWWW....WWWWW.....
.................WWWW.WWWWWWWW....
.WWW..................WWWWWWWW....
.WWWWW..................WWWWWW....
.WWWWWW...........................
..WWWWWW..........................
...W.W.W..........................
..................................
..........WWWWWWWW................
.........WWWWWWWWWW...............
..........WWWWWWWWWWWWW...........
.............WWWWWWWW.............
..................................
..................................
..................................
.............................WWWWW
..........WWW.............WWWWWWWW
...........WWW.............WWWWWWW
..............................WWWW
..................................
..................................
WWWW..............................
WW................................
W.............c...................
..............WWW.................
.............WWWW........WWW......
..............WW........WWWW......`,
  map`
p..........................................
...........................................
...........................................
................c..........................
..............WWWW.........................
...........................................
.....................WWWWW.................
...........................................
...........................................
.........WWWWW.............................
...........................................
...........................................
............................615245.........
..........................623s3ss45....f...
33333333345......6151...623sssssss33333345.
000000s0ss3345.623s3s...2ss090SSSSssssssS34
sS99SS0099Sss333ss099s..sss009900SSSSs9ssss
sSs9000sss9sssssssss0ss.ssssssss9sssS09SSSs
sS09SsssssSss900ssS...........sssss9s09SSSs
s0sssscs..S0S9SS09..........S...ss.sss000ss
9ssss.....S0ss900S.........S9S......s.sssss
ss.........S9S90S.........s9ss...........s.
s..........SSs0S..........S0SS.............
s...........SssS..........90S..............
s............Ss0.........S9S...............
0.....999SS...SS........S09Ss..........c...
0s...00SS...............00SSS............ss
SssSS0SS...............SS0sS99.........sss0
S99Sssss............S9999SSss99SS..sssssS99
S999SSSsSSSs999SSSsssss99s0000SSS.s0S9S990S
ssss00000SSSS0099000s00S099ssssssss0900ssss`
]

const totalCoins = levels.reduce((acc, lvl) => { return acc + lvl.toString().match(/c/g).length }, 0)
let collectedCoins = 0
let gameFinished = false

let playerX = 0
let playerY = 0

const isTileEmpty = (x, y) => {
  const spritesInTile = getTile(x, y).filter((sprite) => !spritesCountingAsAir.includes(sprite.type));
  return spritesInTile.length === 0;
}

let horizontalShifts = 0
let verticalShifts = 0

function sliceMapToFit() {
  let currentLevel = levels[level].split("\n").map((li) => li.split(""))
  while (currentLevel.length > map_height) {
    currentLevel.pop()
  }
  while (currentLevel.length < map_height) {
    currentLevel.unshift(Array.from({ length: map_width }, () => barrier))
    verticalShifts--
  }
  currentLevel.map((li) => {
    while (li.length > map_width) {
      li.pop()
    }
    while (li.length < map_width) {
      li.push(barrier)
    }
  })
  setMap(map`${currentLevel.map((l) => l.join("")).join("\n")}`)
  console.log(playerX, playerY)
  applyGravityToPlayer()
}
enableSpecialSettingsForLevel(0)
sliceMapToFit()

function changeMapHorizonticallyDynamically(left_right) {
  let playerSprite = getFirst(player)
  const currentLevel = levels[level].trim().split("\n").map((li) => li.split(""))
  const tilesAlreadySkipped = -horizontalShifts
  if (currentLevel[0].length < map_width) return false

  if (left_right === "right" && playerSprite.x > map_width / 2) {
    if (currentLevel[0][tilesAlreadySkipped + map_width - 1]) {
      for (let x = 0; x < map_width; x++) {
        for (let y = 0; y < map_height; y++) {
          const tile = getTile(x, y).filter((sprite) => sprite.type != player)
          tile.forEach((sprite) => x === 0 ? sprite.remove() : sprite.x -= 1)
        }
      }
      horizontalShifts--;
      currentLevel.forEach((val, ind) => {
        const x = map_width - 1
        const y = ind + verticalShifts + 1
        if (val[tilesAlreadySkipped + map_width - 1] === player) return
        if (y >= map_height || y < 0) return
        if (collectibles.includes(val[tilesAlreadySkipped + map_width - 1]) && collectedCollectibles[val[tilesAlreadySkipped + map_width - 1]]) {
          if (collectedCollectibles[val[tilesAlreadySkipped + map_width - 1]].includes((tilesAlreadySkipped + map_width - 1) + "x" + ind + "l" + level)) return
        }
        addSprite(x, y, val[tilesAlreadySkipped + map_width - 1])
      })
      return true
    }
  } else if (left_right === "left" && playerSprite.x < map_width / 2) {
    if (currentLevel[0][tilesAlreadySkipped - 1]) {
      for (let x = map_width - 1; x >= 0; x--) {
        for (let y = 0; y < map_height; y++) {
          const tile = getTile(x, y).filter((sprite) => sprite.type != player)
          tile.forEach((sprite) => x === map_width - 1 ? sprite.remove() : sprite.x += 1)
        }
      }
      horizontalShifts++;
      currentLevel.forEach((val, ind) => {
        const x = 0
        const y = ind + verticalShifts + 1
        if (val[tilesAlreadySkipped - 1] === player) return
        if (y >= map_height || y < 0) return
        if (collectibles.includes(val[tilesAlreadySkipped - 1]) && collectedCollectibles[val[tilesAlreadySkipped - 1]]) {
          if (collectedCollectibles[val[tilesAlreadySkipped - 1]].includes((tilesAlreadySkipped - 2) + "x" + ind + "l" + level)) return
        }
        addSprite(x, y, val[tilesAlreadySkipped - 1])
      })
      return true
    }
  }
  return false
}

function changeMapVerticallyDynamically(up_down) {
  let playerSprite = getFirst(player);
  const currentLevel = levels[level].trim().split("\n").map((li) => li.split(""));
  const tilesAlreadySkipped = -verticalShifts
  if (currentLevel.length < map_height) return false

  if (up_down === "up" && playerSprite.y < map_height / 2) {
    if (currentLevel[tilesAlreadySkipped - 1]) {
      for (let y = map_height - 1; y >= 0; y--) {
        for (let x = 0; x < map_width; x++) {
          const tile = getTile(x, y).filter((sprite) => sprite.type != player);
          tile.forEach((sprite) => y === map_height - 1 ? sprite.remove() : sprite.y += 1);
        }
      }
      verticalShifts++;
      currentLevel[tilesAlreadySkipped - 1].forEach((val, ind) => {
        const x = ind + horizontalShifts 
        const y = 0
        if (x < 0 || x >= map_width) return
        if (val === player) return
        if (collectibles.includes(val) && collectedCollectibles[val]) {
          if (collectedCollectibles[val].includes(ind + "x" + (tilesAlreadySkipped - 2) + "l" + level)) return
        }
        addSprite(x, y, val)
      })
      return true;
    }
  } else if (up_down === "down" && playerSprite.y > map_height / 2) {
    if (currentLevel[tilesAlreadySkipped + map_height - 1]) {
      for (let y = 0; y < map_height; y++) {
        for (let x = 0; x < map_width; x++) {
          const tile = getTile(x, y).filter((sprite) => sprite.type != player);
          tile.forEach((sprite) => y === 0 ? sprite.remove() : sprite.y -= 1);
        }
      }
      verticalShifts--;
      currentLevel[tilesAlreadySkipped + map_height - 1].forEach((val, ind) => {
        const x = ind + horizontalShifts 
        const y = map_height - 1
        if (x < 0 || x >= map_width) return
        if (val === player) return
        if (collectibles.includes(val) && collectedCollectibles[val]) {
          if (collectedCollectibles[val].includes(ind + "x" + (tilesAlreadySkipped + map_height - 1) + "l" + level)) return
        }
        addSprite(x, y, val)
      })
      return true;
    }
  }

  return false;
}

onInput("s", () => {
  applyGravityToPlayer()
})
onInput("w", () => {
  moveY("up")
})
onInput("d", () => {
  moveX("right")
})
onInput("a", () => {
  moveX("left")
})
onInput("k", () => {
  if (gameFinished) return;
  let playerSprite = getFirst(player)
  spawnCloud(playerSprite.x, playerSprite.y + 1)
})
onInput("j", () => {
  if (gameFinished) return;
  let playerSprite = getFirst(player)
  spawnCloud(playerSprite.x - 1, playerSprite.y + 1)
})
onInput("l", () => {
  if (gameFinished) return;
  let playerSprite = getFirst(player)
  spawnCloud(playerSprite.x + 1, playerSprite.y + 1)
})

function applyGravityToPlayer() {
  for (let i = 0; i < levels[level].length + 10; i++) {
    if (!moveY("down")) break;
  }
}

function moveX(left_right) {
  if (gameFinished) return false;
  if (left_right === "left") {
    if (isTileEmpty(getFirst(player).x - 1, getFirst(player).y) && getFirst(player).x - 1 >= 0) {
      playerX--;
      if (!changeMapHorizonticallyDynamically("left")) getFirst(player).x -= 1
    } else return false
  } else {
    if (isTileEmpty(getFirst(player).x + 1, getFirst(player).y) && getFirst(player).x + 1 < map_width) {
      playerX++;
      if (!changeMapHorizonticallyDynamically("right")) getFirst(player).x += 1
    } else return false
  };
  afterMove()
  return true;
}

function moveY(up_down) {
  if (gameFinished) return false;
  if (up_down === "up") {
    if (isTileEmpty(getFirst(player).x, getFirst(player).y - 1) && getFirst(player).y - 1 >= 0) {
      playerY--;
      if (!changeMapVerticallyDynamically("up")) getFirst(player).y -= 1
    } else return false;
  } else {
    if(getFirst(player).y + 1 >= map_height) {
      for(let cl in collectedCollectibles) {
        collectedCollectibles[cl] = collectedCollectibles[cl].filter((entry) => !entry.includes("l" + level))
      }
      level--;
      finishGame()
      return false
    }
    else if (isTileEmpty(getFirst(player).x, getFirst(player).y + 1)) {
      playerY++;
      if (!changeMapVerticallyDynamically("down")) getFirst(player).y += 1
    } else return false;
  }
  afterMove()
  return true;
}

const cloudDespawnMs = 1000
let clouds = []

function spawnCloud(x, y) {

  if (clouds.map((cloud) => cloud.x + "." + cloud.y).includes(x + "." + y)) clouds.splice(0, 0, clouds.splice(clouds.map((cloud) => cloud.x + "." + cloud.y).indexOf(x + "." + y), 1)[0])
  else if (isTileEmpty(x, y)) {
    setTimeout(() => {
      const tileWithCloud = clouds.shift()
      const [clX, clY] = [tileWithCloud.x, tileWithCloud.y]

      tileWithCloud.remove()

      if (getTile(clX, clY - 1).filter((sprite) => sprite.type === player)[0] || (getTile(clX, clY - 2).filter((sprite) => sprite.type === player)[0] && isTileEmpty(clX, clY - 1))) {
        applyGravityToPlayer()
      }
    }, cloudDespawnMs)
    addSprite(x, y, cloud)
    clouds.push(getTile(x, y).filter((sprite) => sprite.type === cloud)[0])
  }
}


let lastMoveInAir = false
afterInput(() => {
  if (gameFinished) return;
  let playerSprite = getFirst(player)

  if (isTileEmpty(playerSprite.x, playerSprite.y + 1)) {
    if (lastMoveInAir) {
      applyGravityToPlayer()
      lastMoveInAir = false
    } else lastMoveInAir = true
  } else lastMoveInAir = false
})

function afterMove() {
  if (gameFinished) return;
  let playerSprite = getFirst(player)
  const onTiles = getTile(playerSprite.x, playerSprite.y)
  const onCollectibles = onTiles.filter((sprite) => collectibles.includes(sprite.type))
  const onFinishLine = onTiles.filter((sprite) => sprite.type === finish_line)[0] ? true : false

  if (onCollectibles.length > 0) {
    onCollectibles.forEach((collectible) => {
      if (!collectedCollectibles[collectible.type]) collectedCollectibles[collectible.type] = []
      if (!collectedCollectibles[collectible.type].includes(playerX + "x" + playerY + "l" + level)) collectedCollectibles[collectible.type].push(playerX + "x" + playerY + "l" + level)
      collectible.remove()
    })
  }
  if (onFinishLine) {
    finishGame()
  }
  addText("C:" + (collectedCollectibles[coin] ? collectedCollectibles[coin].length : "0") + "/" + totalCoins + "  L:" + (level+1) + "/" + levels.length)
}

function finishGame() {
  level++;
  if (levels[level]) sliceMapToFit()
  else {
    level--;
    gameFinished = true;
    addText("GameOver", options = { y: 1 })
  }
  applyGravityToPlayer()
}

function enableSpecialSettingsForLevel(lvl) {
  if(lvl === 0) {
    map_height = 15
    map_width = 25
  } else if(lvl === 2) {
    addText("Press j,k,l", options = {y: 2})
    addText("to place clouds", options = {y: 3})
    addText("below the player", options = {y: 4})
  } else if(lvl === 4) {}
}

function resetSettingsToDefault() {
  clearText()
  
  playerX = 0;
  playerY = 0;
  
  horizontalShifts = 0;
  verticalShifts = 0;
  
  map_width = 30
  map_height = 18
}