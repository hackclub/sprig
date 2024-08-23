/*
@title: maze runner
@author: surojit
@tags: []
@addedOn: 24 august 24
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
001LL33333300101
1001333333330000
0000377777731000
0000333333330010
1010336666331000
0000033333300000
0103333333333010
0003333333333000
0033333333333300
0333333333333330
0333333333333330
1033333333333301
0010333333330000
0000333333330100
0000033003300010
100100001LL10000` ],
  [ up, bitmap`
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
.....3333333....
...3333333333...
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
..333333333333..
....33333333....
....33333333....
.....33..33.....
................` ],
  [ v_wall, bitmap`
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
2222222222222222` ],
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
6666666666666666
6666666666666666
6666666666666666
6666666666666666
0000001000100001
0100100000000100
0000000000010000
0010100100100001
0000000000000000
0100001010010100` ],
  [ u_r, bitmap`
1000016666010001
0010006666000100
0000106666010000
0000006666100010
0101006666000000
0000006666001001
0000106666666666
0101006666666666
0000006666666666
1010016666666666
0000000000000100
0000101001001000
0100000000000001
0000001001010100
0010100010000000
1000000100010001` ],
  [ u_l, bitmap`
0010016666010000
0000006666000100
0100106666000000
0010006666001010
0000006666000000
1000106666100000
6666666666001000
6666666666010010
6666666666000000
6666666666100000
0001000100010010
0100000000000000
0000010010010000
0010000000000100
1000100000100001
0010001010000100` ],
  [ d_r, bitmap`
0010010000100000
0000000000001001
1000010010000000
0010000000000001
0000010000100010
0100000010001000
0001006666666666
0000006666666666
1000106666666666
0000006666666666
0010006666010100
0000106666000001
1000006666100100
0000006666000000
0001006666010001
1000006666000100` ],
  [ d_l, bitmap`
1000000000010010
0010100101000000
0000000000010000
0010000010000010
0000001000100000
1000100000000000
6666666666000100
6666666666010000
6666666666000001
6666666666001000
0000016666010010
1001006666000000
0000006666000010
0100016666010000
0010006666000101
0000016666010000` ],
  [ c_r, bitmap`
1000106666001001
0000006666000000
0100106666100100
0000006666000010
0100016666000000
0000006666010100
1000106666666666
0000006666666666
0010006666666666
0000016666666666
1000006666001000
0001006666000001
0100006666001000
0000006666100010
0010016666000000
1001006666010100` ],
  [ c_l, bitmap`
0100016666010000
0001006666000000
0000006666001000
1001006666000010
0000006666010000
0010016666000000
6666666666000100
6666666666000000
6666666666100000
6666666666000010
0100006666001000
0010106666000000
0100006666101010
0000016666000000
0101006666001000
0010106666010010` ],
  [ c_d, bitmap`
1001000010010000
0000001000000101
0000100000000000
0100000010010000
0000100000000101
1000000100010000
6666666666666666
6666666666666666
6666666666666666
6666666666666666
0000106666100010
0100006666000100
0000006666010000
0010106666000010
0000006666100000
0010006666001001` ],
  [ c_u, bitmap`
1000016666010000
0101006666000001
0000006666001000
1000006666000001
0001006666010000
0100016666000100
6666666666666666
6666666666666666
6666666666666666
6666666666666666
1000010000000010
0000000001000000
0101000000010100
0000001010000000
0100000000100000
0001001000010010` ],
  [ goal, bitmap`
9919999914444144
9999933333344444
1991066666604141
9900660000660044
9060600000060604
9060660000660604
9900666006660051
9177066666605155
1771L36FF6315555
7777136FF6355555
7717736FF6351551
7777736FF6355555
7777066666605555
7170000000000515
77777777777L5555
1771777177715551` ],
  [ chest, bitmap`
0000000000000000
0FF0000000000FF0
060HHHHHHHHHH060
060HHHHHHHHHH060
060HHHHHHHHHH060
060HHHHHHHHHH060
060HHH0000HHH060
0000003333000000
0333333003333330
0000330000330000
0607033003307060
0607703333077060
0607770000777060
0607777777777060
0F077777777770F0
0000000000000000` ],
  [ lock, bitmap`
101L888888880001
0008CCCCCCCC8010
0018C888888C8000
1008C8LLLL8C8100
0088888888888801
02CCCCCCCCCCCC20
8FCCCCCCCCCCCCF8
8FCCCCCCCCCCCCF8
8FCCCCCCCCCCCCF8
8FCCCC7777CCCCF8
8FCCCC7777CCCCF8
8FCCCCC77CCCCCF8
8FCCCCCCCCCCCCF8
8FCCCCCCCCCCCCF8
L0FFFFFFFFFFFF21
1L888888888888LL` ]
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
    addSprite(player.x - 1, player.y, current_sprite) 
    addSprite(player.x, player.y, ground) 
  }
})

onInput("d", () => {
  let player = getFirst(current_sprite)
  let destTile = getTile(player.x + 1, player.y)  
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
