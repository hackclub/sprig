/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: A G00D G4m3. (I think)
@author: 
@tags: []
@addedOn: 2025-00-00
*/
const placer = "r"
const player = "p"
const wall = "w"
const boulder = "b"
const door = "d"
const doorgettingtouched = tilesWith(door)
const checkpoint = "c"

setLegend(
  [ player, bitmap`
................
.00000000000000.
.00000000000000.
.03333330333330.
.03333330333330.
.00333330333330.
.00003300033300.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL3LLLLLLLLL33LL
LLL33LLLLLL33LLL
LLLLL3LLLL3LLLLL
LLLLLL3LL33LLLLL
LLLLLL333LLLLLLL
LLLLLLL33LLLLLLL
LLLLLL3LL3LLLLLL
LLLLL3LLLL3LLLLL
LLLL33LLLL33LLLL
LLL33LLLLLL33LLL
LLL3LLLLLLLL3LLL
L33LLLLLLLLLL33L
L3LLLLLLLLLLLL3L
LLLLLLLLLLLLLL3L`],
  [ boulder, bitmap`
....11111111....
...1111111111...
..111111111111..
.11101111111111.
1111011111111111
1111001110011111
1111100111001111
1111110011100011
1111111011111111
1111111011111111
1111111011111111
1111111000111111
.11111111111111.
..111111111111..
...1111111111...
....11111111....`],
  [door,bitmap`
................
.4444444444444..
.4464446466644..
.4666666666644..
.4444644466644..
.4444444444444..
.4444433444444..
.4444433444444..
.4444444444444..
.4444444444444..
.4444444444444..
.4444444444444..
.4444444444444..
.4444444444444..
.4444444444444..
................`],
  [checkpoint, bitmap`
................
....77777777....
...7777777777...
..777777L77777..
.77777LLL777777.
.77771111117777.
.77771LLLL17777.
.77771LLLL17777.
.77771LLL111777.
.77771111111777.
.77771111111777.
.77771111111777.
..777777777777..
...7777777777...
....77777777....
................`],
  [placer, bitmap`
9999999999999999
9999999999999999
9999777999999999
9999797999999999
9999797999999999
9999797777799999
9999799999799999
9999799999799999
9999799999799999
9999799999799999
9999799999799999
9999777777779999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
)
setSolids([wall, boulder, player])

let level = 0
const levels = [
  map`
wwwww
w..dw
w...w
wp..w
wwwww`,
  map`
wwwwww
w.b.pw
w.bb.w
wd.b.w
w..b.w
wwwwww`,
  map`
wwwwwww
wwpb.cw
wwwwbbw
wbbb..w
wbc.bcw
wd...bw
wwwwwww`,
  map`
wwbwwwww
wd.bb.ww
wrb.bbcw
.rb..bcw
wwbb..cw
wwpww.cw
ww.ccccw
wwwwww.w`,
  map`
wwwwww...
w....w...
wpbb.ww..
w..wrrwww
ww.brrbdw
.w......w
.wwwwwwww`,
  map`
wwwwwwww.
wrrrrrrw.
w..b.w.ww
w.b.w.bdw
w.b.b.b.w
ww....p.w
.wwwwwwww`,
  map`
...............
...............
...............
.....wwwwww....
..wwwwr...w....
..wpbcb.b.w....
..wrwwrwwrw....
..w....b..w....
..w.b.bw.ww....
..wwww...w.....
.....wwwww.....
...............`
]

setMap(levels[level])

setPushables({
  [ player ]: [boulder]
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  if (tilesWith(player, door).length > 0) {
  
    if(tilesWith(boulder, placer).length == tilesWith(placer).length){
    level = (level + 1) % levels.length
    setMap(levels[level])}
  }
  console.log(tilesWith(player))
  if (tilesWith(boulder, checkpoint).length>0) {
      clearTile(tilesWith(boulder, checkpoint)[0][0].x, tilesWith(boulder, checkpoint)[0][1].y)
      console.log(tilesWith(boulder, checkpoint).length)
      console.log(tilesWith(boulder, checkpoint))
  }

  
  
})

console.log(tilesWith(boulder, placer).length = tilesWith(placer).length)