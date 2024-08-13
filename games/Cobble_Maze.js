/*
@title: Cobble Maze
@author: yashsethu
@tags: []
@addedOn: 2024-08-13
*/

const down = "d"
const up = "n"
const right_1 = "r"
const right_2 = "s"
const left_1 = "t"
const left_2 = "u"
const ground = "m"
const v_wall = "v"
const h_wall = "h"
const u_r = "a"
const u_l = "b"
const d_r = "c"
const d_l = "z"
const c_r = "f"
const c_l = "g"
const c_u = "i"
const c_d = "j"
const goal = "w"
const chest = "e"
const lock = "k"

setLegend(
  [ down, bitmap`
LL1LL000000LL1L1
1LL102222220LLLL
LLLL020220201LLL
LLLL02022020LL1L
1L1L022222201LLL
LLLLL022220LLLLL
L1L00CLLLLC00L1L
LLL0LLCLLCLL0LLL
LL00LLLLLLLL00LL
L0220LL33LL0220L
L0220LL33LL0220L
1L000LLLLLL000L1
LL1L0CC00CC0LLLL
LLLL0CC00CC0L1LL
LLLLL00LL00LLL1L
1LL1LLLL1LL1LLLL` ],
  [ up, bitmap`
.....000000.....
....02222220....
....02222220....
....02222220....
....02222220....
.....022220.....
...00CCCCCC00...
...0LLLLLLLL0...
..00LLLLLLLL00..
.0220LLLLLL0220.
.0220LLLLLL0220.
..000LLLLLL000..
....0CC00CC0....
....0CC00CC0....
.....00..00.....
................` ],
  [ right_1, bitmap`
................
.....000000.....
....02222220....
....02222200....
....02222200....
....02222220....
.....022220.....
....0LLCCCL0....
....0LLLLLC0....
...00LLLLLL00...
..0220LLLL3020..
..0220LLLL3020..
...000LLLLL00...
...0C000CCCC0...
...0CC000CCC0...
....00...000....` ],
  [ left_1, bitmap`
................
.....000000.....
....02222220....
....00222220....
....00222220....
....02222220....
.....022220.....
....0LCCCLL0....
....0CLLLLL0....
...00LLLLLL00...
..0203LLLL0220..
..0203LLLL0220..
...00LLLLL000...
...0CCCC000C0...
...0CCC000CC0...
....000...00....` ],
  [ right_2, bitmap`
................
.....000000.....
....02222220....
....02220200....
....02220200....
....02222220....
.....022220.....
....0LLCLLL0....
....0LLLCLL0....
...00LLLLL00....
..020LLLL0220...
..020LLLL0220...
...0CCC000000...
...0CCC00CCC0...
...0CC0..0CC0...
....00....00....` ],
  [ left_2, bitmap`
................
.....000000.....
....02222220....
....00202220....
....00202220....
....02222220....
.....022220.....
....0LLLCLL0....
....0LLCLLL0....
....00LLLLL00...
...0220LLLL020..
...0220LLLL020..
...000000CCC0...
...0CCC00CCC0...
...0CC0..0CC0...
....00....00....` ],
  [ v_wall, bitmap`
LLLLLL0000LLL1LL
L1L1LL0000LLLLLL
1LLLL10000L1LLLL
LLL1LL0000LL1L1L
L1LLLL00001LLLLL
LLLLLL0000LLLL1L
LLLL1L0000L1LLLL
L1LLLL0000LL1L1L
LLLLLL0000LLLLLL
LLLL1L0000L1L1LL
L11LLL0000LL1LLL
LLLLLL0000LLLLL1
LL1L1L00001LLLLL
L1LLL10000LL1LLL
LL1LLL0000L1LLLL
LLLL1L0000LLLL1L` ],
  [ ground, bitmap`
L1LLLLLLL1LLLL1L
LLLLLLL1LLLLLLLL
LLLL1LLLLLLLL1LL
LLLLLLLLL1LLLLLL
L1LLLLLLLLL1L1LL
LLLLLLL1LLLLLLLL
LLLLL1LLLLLLLL1L
LL1LLLLLLL1LLLLL
LLLLLLLLLLLLLL1L
1L1LLLL1LLL1LLLL
LLLLL1LLLLLLLL1L
LLLLLLLL1LLLLLLL
LL1LLLLLLLL1LLLL
LLLLLLLLLLLLLLLL
1LLL1LL1LLLLLL1L
LLLLLLLLLLL1LLLL` ],
  [ h_wall, bitmap`
LLLLLL1LLLLLL1LL
LL1L1LL1LLL1LLL1
1LLLLLLLLLLLLLLL
LLLL1LLLLL1LL1LL
LLL1LL1L1LLLLLL1
L1LLLLLLLLL1LLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLL1LLL1LLLL1
L1LL1LLLLLLLL1LL
LLLLLLLLLLL1LLLL
LL1L1LL1LL1LLLL1
LLLLLLLLLLLLLLLL
L1LLLL1L1LL1L1LL` ],
  [ u_r, bitmap`
1LLLL10000L1LLL1
LL1LLL0000LLL1LL
LLLL1L0000L1LLLL
LLLLLL00001LLL1L
L1L1LL0000LLLLLL
LLLLLL0000LL1LL1
LLLL1L0000000000
L1L1LL0000000000
LLLLLL0000000000
1L1LL10000000000
LLLLLLLLLLLLL1LL
LLLL1L1LL1LL1LLL
L1LLLLLLLLLLLLL1
LLLLLL1LL1L1L1LL
LL1L1LLL1LLLLLLL
1LLLLLL1LLL1LLL1` ],
  [ u_l, bitmap`
LL1LL10000L1LLLL
LLLLLL0000LLL1LL
L1LL1L0000LLLLLL
LL1LLL0000LL1L1L
LLLLLL0000LLLLLL
1LLL1L00001LLLLL
0000000000LL1LLL
0000000000L1LL1L
0000000000LLLLLL
00000000001LLLLL
LLL1LLL1LLL1LL1L
L1LLLLLLLLLLLLLL
LLLLL1LL1LL1LLLL
LL1LLLLLLLLLL1LL
1LLL1LLLLL1LLLL1
LL1LLL1L1LLLL1LL` ],
  [ d_r, bitmap`
LL1LL1LLLL1LLLLL
LLLLLLLLLLLL1LL1
1LLLL1LL1LLLLLLL
LL1LLLLLLLLLLLL1
LLLLL1LLLL1LLL1L
L1LLLLLL1LLL1LLL
LLL1LL0000000000
LLLLLL0000000000
1LLL1L0000000000
LLLLLL0000000000
LL1LLL0000L1L1LL
LLLL1L0000LLLLL1
1LLLLL00001LL1LL
LLLLLL0000LLLLLL
LLL1LL0000L1LLL1
1LLLLL0000LLL1LL` ],
  [ d_l, bitmap`
1LLLLLLLLLL1LL1L
LL1L1LL1L1LLLLLL
LLLLLLLLLLL1LLLL
LL1LLLLL1LLLLL1L
LLLLLL1LLL1LLLLL
1LLL1LLL1LLLLLLL
0000000000LLL1LL
0000000000L1LLLL
0000000000LLLLL1
0000000000LL1LLL
LLLLL10000L1LL1L
1LL1LL0000LLLLLL
LLLLLL0000LLLL1L
L1LLL10000L1LLLL
LL1LLL0000LLL1L1
LLLLL10000L1LLLL` ],
  [ c_r, bitmap`
1LLL1L0000LL1LL1
LLLLLL0000LLLLLL
L1LL1L00001LL1LL
LLLLLL0000LLLL1L
L1LLL10000LLLLLL
LLLLLL0000L1L1LL
1LLL1L0000000000
LLLLLL0000000000
LL1LLL0000000000
LLLLL10000000000
1LLLLL0000LL1LLL
LLL1LL0000LLLLL1
L1LLLL0000LL1LLL
LLLLLL00001LLL1L
LL1LL10000LLLLLL
1LL1LL0000L1L1LL` ],
  [ c_l, bitmap`
L1LLL10000L1LLLL
LLL1LL0000LLLLLL
LLLLLL0000LL1LLL
1LL1LL0000LLLL1L
LLLLLL0000L1LLLL
LL1LL10000LLLLLL
0000000000LLL1LL
0000000000LLLLLL
00000000001LLLLL
0000000000LLLL1L
L1LLLL0000LL1LLL
LL1L1L0000LLLLLL
L1LLLL00001L1L1L
LLLLL10000LLLLLL
L1L1LL0000LL1LLL
LL1L1L0000L1LL1L` ],
  [ c_d, bitmap`
1LL1LLLL1LL1LLLL
LLLLLL1LLLLLL1L1
LLLL1LLLLLLLLLLL
L1LLLLLL1LL1LLLL
LLLL1LLLLLLLL1L1
1LLLLLL1LLL1LLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLL1L00001LLL1L
L1L1LL0000LLL1LL
LLLLLL0000L1LLLL
LL1L1L0000LLLL1L
LLLLLL00001LLLLL
LL1LLL0000LL1LL1` ],
  [ c_u, bitmap`
1LLLL10000L1LLLL
L1L1LL0000LLLLL1
LLLLLL0000LL1LLL
1LLLLL0000LLLLL1
LLL1LL0000L1LLLL
L1LLL10000LLL1LL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1LLLL1LLLLLLLL1L
LLLLLLLLL1LLLLLL
L1L1LLLLLLL1L1LL
LLLLLL1L1LLLLLLL
L1LLLLLLLL1LLLLL
LLL1LL1LLLL1LL1L` ],
  [ goal, bitmap`
LL1LLLLL1LLLL1LL
LLLLL000000LLLLL
1LL106666660L1L1
LL006633336600LL
L06063333336060L
L06066333366060L
LL006663366600L1
L1LL06666660L1LL
1LL1L06FF601LLLL
LLLL106FF60LLLLL
LL1LL06FF60L1LL1
LLLLL06FF60LLLLL
LLLL06666660LLLL
L1L0000000000L1L
LLLLLLLLLLLLLLLL
1LL1LLL1LLL1LLL1` ],
  [ chest, bitmap`
000LL1LLL1LL1000
0FF0000000000FF0
060CCCCCCCCCC060
060CCCCCCCCCC060
060CCCCCCCCCC060
060CCCCCCCCCC060
060CCC0000CCC060
0000006666000000
0666666006666660
0000660000660000
060C06600660C060
060CC066660CC060
060CCC0000CCC060
060CCCCCCCCCC060
0F0CCCCCCCCCC0F0
0000000000000000` ],
  [ lock, bitmap`
1L1L00000000LLL1
LLL0666666660L1L
LL10600000060LLL
1LL060LLLL0601LL
LL000000000000L1
L06666666666660L
0F666666666666F0
0F666666666666F0
0F666666666666F0
0F666600006666F0
0F666600006666F0
0F666660066666F0
0F666666666666F0
0F666666666666F0
L0FFFFFFFFFFFF01
1L000000000000LL` ]
)

setSolids([ down, up, right_1, left_1, right_2, left_2, v_wall, h_wall, u_r, u_l, d_r, d_l, c_r, c_l, c_u, c_d ])

let level = 0
const levels = [
  map`
chjdjhhhhhhz
vmvmvmmmmmmv
vmvmahhzmvmv
vmmmmmmvmvev
fhzkvmmmmfhg
vmvmfhhhhgmw
vmmmvmmmmvmv
vmvmvmvmhbkv
vmvmvmvmmmmv
vmahbmvmchmv
vmmmmmvmvemv
ahhhhhihihhb`,
  map`
chhhhhjhhhhhz
vmmmmmvmmmmev
vmhhzmvmchhhg
vmmmvmvmvmmmv
ahhmvmvmvkvmv
dmmmvmvmmmvmv
chhhbmfhhmvmv
vmmmmmvmmmvmv
vmchhhbkchbmv
vmvemmmmvmmmv
vmahhhhmvmvmv
vmmmmmmmvmvmv
ahhhhhhhbwahb`,
  map`
chhhhhjhhhjhhhjhhhhhh
vmmmmmvemmvmmmvmmmmmw
fhzmvmahzmvmvmahhhhkv
vevkvmmmvmkmvmmmmmmmv
vmvmahzmvmchihjhhmchg
vmvmmmvmmmvmmmvemmvev
vmahzmahhhgmchihjhbmv
vmmmvmmmmmvmvmmmvmmmv
vmchihhkchbmvmvmahhmv
vmvmmmmmvmmmvmvmmmmmv
vmvmhhjhgmhhbmvmvmchg
vmvmmmvmvmmmmmvmvmvmv
vmahhkvmahhmhhbmvmvmv
vmmmmmmmmmmmmmmmvmvmv
fhhhhmvmchzmchhhbmvmv
vmmmmmvmvmvmvmmmmmmmv
vmchhmvmvmvmvmvmchhhg
vmvmmmmmvmmmmmvmvmmmv
vmahhhhmvmhhzmahbmvmv
dmmmmmmmmmmmvmmmmmvev
hhhhhhhhhhhhihhhhhihb`
]

setMap(levels[level])

let current_sprite = down
let keys = 0

onInput("s", () => {
  let player = getFirst(current_sprite)
  let destTile = getTile(player.x, player.y + 1) // Check the tile below the player

  // Check if the destination tile is of type 'ground' or 'goal' before moving
  let destType = destTile.length > 0 ? destTile[0].type : ''
  if (destType === lock && keys > 0) {
    keys -= 1
    destType = ground
  }
  if (destType === ground || destType === goal || destType === chest) {
    if (destType === chest) {
      keys += 1
    }
    clearTile(player.x, player.y)
    current_sprite = down
    addSprite(player.x, player.y + 1, current_sprite) // Spawn new player sprite below
    addSprite(player.x, player.y, ground) // Replace ground tile where the player moved from
  }
})

onInput("w", () => {
  let player = getFirst(current_sprite)
  let destTile = getTile(player.x, player.y - 1) // Check the tile above the player
  
  // Check if the destination tile is of type 'ground' or 'goal' before moving
  let destType = destTile.length > 0 ? destTile[0].type : ''
  if (destType === lock && keys > 0) {
    keys -= 1
    destType = ground
  }
  if (destType === ground || destType === goal || destType === chest) {
    if (destType === chest) {
      keys += 1
    }
    clearTile(player.x, player.y)
    current_sprite = up
    addSprite(player.x, player.y - 1, current_sprite) // Spawn new player sprite above
    addSprite(player.x, player.y, ground) // Replace ground tile where the player moved from
  }
})

onInput("a", () => {
  let player = getFirst(current_sprite)
  let destTile = getTile(player.x - 1, player.y) // Check the tile to the left of the player

  // Check if the destination tile is of type 'ground' or 'goal' before moving
  let destType = destTile.length > 0 ? destTile[0].type : ''
  if (destType === lock && keys > 0) {
    keys -= 1
    destType = ground
  }
  if (destType === ground || destType === goal || destType === chest) {
    if (destType === chest) {
      keys += 1
    }
    clearTile(player.x, player.y)
    current_sprite = current_sprite === left_1 ? left_2 : left_1
    addSprite(player.x - 1, player.y, current_sprite) // Spawn new player sprite to the left
    addSprite(player.x, player.y, ground) // Replace ground tile where the player moved from
  }
})

onInput("d", () => {
  let player = getFirst(current_sprite)
  let destTile = getTile(player.x + 1, player.y) // Check the tile to the right of the player

  // Check if the destination tile is of type 'ground' or 'goal' before moving
  let destType = destTile.length > 0 ? destTile[0].type : ''
  if (destType === lock && keys > 0) {
    keys -= 1
    destType = ground
  }
  if (destType === ground || destType === goal || destType === chest) {
    if (destType === chest) {
      keys += 1
    }
    clearTile(player.x, player.y)
    current_sprite = current_sprite === right_1 ? right_2 : right_1
    addSprite(player.x + 1, player.y, current_sprite) // Spawn new player sprite to the right
    addSprite(player.x, player.y, ground) // Replace ground tile where the player moved from
  }
})

afterInput(() => {
  if (tilesWith(goal, current_sprite).length === 1) {
    if (level === levels.length - 1) {
      // Check if the current level is the last level
      addText("YOU WIN!", { y: 4, color: color`3` })
    } else {
      level += 1;
      setMap(levels[level]); // Change the map to the next level
      current_sprite = down
    }
  }
})
