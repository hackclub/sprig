
/* 
@title: 4_Colour_Drawing
@author: Dexter Speed
@tags: ['sandbox']
@img: ""
@addedOn: 2023-08-18
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "u"
const black = "b"
const dark = "d"
const light = "l"
const white = "w"

setLegend(
  [ player, bitmap`
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
22222......LLLLL
22222......LLLLL
22222......LLLLL
22222......LLLLL
22222......LLLLL
.....111111.....
.....111111.....
.....111111.....
.....111111.....
.....111111.....` ], [ black, bitmap`
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
0000000000000000` ], [dark, bitmap`
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
LLLLLLLLLLLLLLLL` ], [ light, bitmap`
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
1111111111111111` ], [ white, bitmap`
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
2222222222222222` ]
)

setSolids([])

let level = 0
const levels = [
  map`
....................
....................
....................
....................
....................
....................
....................
....................
..........u.........
....................
....................
....................
....................
....................
....................
....................
....................
....................`
]

setBackground(black)
setMap(levels[level])

setPushables({
  [ player ]: []
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
let x = getFirst(player).x
let y = getFirst(player).y
onInput("i", () => {
  let x = getFirst(player).x
  let y = getFirst(player).y
  clearTile(x, y)
  addSprite(x, y, black)
  addSprite(x, y, player)
})
onInput("j", () => {
  let x = getFirst(player).x
  let y = getFirst(player).y
  clearTile(x, y)
  addSprite(x, y, white)
  addSprite(x, y, player)
})
onInput("k", () => {
  let x = getFirst(player).x
  let y = getFirst(player).y
  clearTile(x, y)
  addSprite(x, y, dark)
  addSprite(x, y, player)
})
onInput("l", () => {
  let x = getFirst(player).x
  let y = getFirst(player).y
  clearTile(x, y)
  addSprite(x, y, light)
  addSprite(x, y, player)
})