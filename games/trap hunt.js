/*
@title: trap runner
@author: surojit roy
@tags: []
@addedOn: 2024-08-28 
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
0010033333300101
1001333333330000
0000377337731000
0000333003330010
1010330330331000
0000066666600000
0103333333333010
0003333333333000
0033333333333300
0333333333333330
0333333333333330
1033333333333301
0010333333330000
0000333333330100
0000033003300010
1001000010010000` ],
  [ up, bitmap`
0000033333300000
0000333333330000
0000333333330000
0000333333330000
0000333333330000
0000066666600000
0003333333333000
0003333333333000
0033333333333300
0333333333333330
0333333333333330
0033333333333300
0000333333330000
0000333333330000
0000033003300000
0000000000000000` ],
  [ right_1, bitmap`
0000000000000000
0000033333300000
0000333333330000
0000333333770000
0000333333300000
0000333333030000
0000066666600000
0000333333330000
0000333333330000
0003333333333000
0033333333333300
0033333333333300
0003333333333000
0003333333333000
0003333333333000
0000330003330000` ],
  [ left_1, bitmap`
................
.....333333.....
....33333333....
....77333333....
....33333333....
....33333333....
.....666666.....
....33333333....
....33333333....
...3333333333...
..333333333333..
..333333333333..
...3333333333...
...3333333333...
...3333333333...
....333...33....` ],
  [ right_2, bitmap`
................
.....333333.....
....33333333....
....33333377....
....33333333....
....33333333....
.....666666.....
....33333333....
....33333333....
...333333333....
..33333333333...
..33333333333...
...3333333333...
...3333333333...
...3333..3333...
....33....33....` ],
  [ left_2, bitmap`
................
.....333333.....
....33333333....
....77333333....
....33333333....
....33333333....
.....666666.....
....33333333....
....33333333....
....333333333...
...33333333333..
...33333333333..
...3333333333...
...3333333333...
...3333..3333...
....33....33....` ],
  [ v_wall, bitmap`
0000002222000100
0101002222000000
1000012222010000
0001002222001010
0100002222100000
0000002222000010
0000102222010000
0100002222001010
0000002222000000
0000102222010100
0110002222001000
0000002222000001
0010102222100000
0100012222001000
0010002222010000
0000102222000010` ],
  [ ground, bitmap`
0100000001000010
0000000100000000
0000100000000100
0000000001000000
0100000000010100
0000000100000000
0000010000000010
0010000000100000
0000000000000010
1010000100010000
0000010000000010
0000000010000000
0010000000010000
0000000000000000
1000100100000010
0000000000010000` ],
  [ h_wall, bitmap`
0000001000000100
0010100100010001
1000000000000000
0000100000100100
0001001010000001
0100000000010000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000001000100001
0100100000000100
0000000000010000
0010100100100001
0000000000000000
0100001010010100` ],
  [ u_r, bitmap`
1000010000010001
0010000000000100
0000100000010000
0000000000100010
0101000000000000
0000000000001001
0000100000000000
0101000000000000
0000000000000000
1010010000000000
0000000000000100
0000101001001000
0100000000000001
0000001001010100
0010100010000000
1000000100010001` ],
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
0010010000100000
0000000000001001
1000010010000000
0010000000000001
0000010000100010
0100000010001000
0001000000000000
0000000000000000
1000100000000000
0000000000000000
0010000000010100
0000100000000001
1000000000100100
0000000000000000
0001000000010001
1000000000000100` ],
  [ d_l, bitmap`
1000000000010010
0010100101000000
0000000000010000
0010000010000010
0000001000100000
1000100010000000
0000000000000100
0000000000010000
0000000000000001
0000000000001000
0000010000010010
1001000000000000
0000000000000010
0100010000010000
0010000000000101
0000010000010000` ],
  [ c_r, bitmap`
1000100000001001
0000000000000000
0100100000100100
0000000000000010
0100010000000000
0000000000010100
1000100000000000
0000000000000000
0010000000000000
0000010000000000
1000000000001000
0001000000000001
0100000000001000
0000000000100010
0010010000000000
1001000000010100` ],
  [ c_l, bitmap`
0100010000010000
0001000000000000
0000000000001000
1001000000000010
0000000000010000
0010010000000000
0000000000000100
0000000000000000
0000000000100000
0000000000000010
0100000000001000
0010100000000000
0100000000101010
0000010000000000
0101000000001000
001L100000010010` ],
  [ c_d, bitmap`
1001000010010000
0000001000000101
0000100000000000
0100000010010000
0000100000000101
1000000100010000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000100000100010
0101000000000100
0000000000010000
0010100000000010
0000000000100000
0010000000001001` ],
  [ c_u, bitmap`
1000010000010000
0101000000000001
0000000000001000
1000000000000001
0001000000010000
0100010000000100
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1000010000000010
0000000001000000
0101000000010100
0000001010000000
0100000000100000
0001001000010010` ],
  [ goal, bitmap`
551555551HHHH1HH
55555000000HHHHH
155108888880H1H1
55008833338800HH
506083333338060H
506088333388060H
5500888338880071
5144088888807177
1441L08FF8017777
4444108FF8077777
4414408FF8071771
4444408FF8077777
4444088888807777
4140000000000717
4444444444417777
1441444144417771` ],
  [ chest, bitmap`
000LL1LLL1LL1000
0FF0000000000FF0
0703333333333070
0703333333333070
0703333333333070
0703333333333070
0703330000333070
0000007777000000
0777777007777770
0000770000770000
0703077007703070
0703307777033070
0703330000333070
0703333333333070
0F033333333330F0
0000000000000000` ],
  [ lock, bitmap`
101L555555550001
0005888888885010
0015855555585000
1005850000585100
0055555555555501
058888888888885L
5F888888888888F5
5F888888888888F5
5F888888888888F5
5F888877778888F5
5F888877778888F5
5F888887788888F5
5F888888888888F5
5F888888888888F5
L5FFFFFFFFFFFF51
1L555555555555LL` ]
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

