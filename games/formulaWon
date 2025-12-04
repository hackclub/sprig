/*
@title: formulaWon
*/

const player = "p"
const chequered = "f"
const straightTrack = "s"
const sidewaysTrack = "w"
const corner1 = "c"
const corner2 = "t"
const corner3 = "b"
const corner4 = "h"

setLegend(
  [ player, bitmap`
................
...LLLLLLLLLLL..
...L223333322L..
....L1111111L...
...06L33233L60..
...06L33233L60..
.....L33233L....
.....L33233L....
.....L33233L....
...06L33233L60..
...06L33233L60..
.....L33233L....
.....L33233L....
....L2332332L...
....LLLLLLLLL...
................` ],

  [ chequered, bitmap`
..020202020202..
..202020202020..
..L..........L..
..L..........L..
..L..........L..
..L..........L..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..` ],

  [ straightTrack, bitmap`
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..
..12L000000L31..
..13L000000L21..` ],
  
  [ sidewaysTrack, bitmap`
................
................
1111111111111111
3232323232323232
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
2323232323232323
1111111111111111
................
................` ],

  [ corner1, bitmap`
................
................
..11111111111111
..13232323232323
..12LLLLLLLLLLLL
..13L00000000000
..12L00000000000
..13L00000000000
..12L00000000000
..13L00000000000
..12L00000000000
..13L000000LLLLL
..12L000000L3232
..13L000000L2111
..12L000000L31..
..13L000000L21..` ],

  [ corner2, bitmap`
................
................
11111111111111..
32323232323231..
LLLLLLLLLLLL21..
00000000000L31..
00000000000L21..
00000000000L31..
00000000000L21..
00000000000L31..
00000000000L21..
LLLLL000000L31..
2323L000000L21..
1112L000000L31..
..13L000000L21..
..12L000000L31..` ],

  [ corner3, bitmap`
..12L000000L31..
..13L000000L21..
1112L000000L31..
2323L000000L21..
LLLLL000000L31..
00000000000L21..
00000000000L31..
00000000000L21..
00000000000L31..
00000000000L21..
00000000000L31..
LLLLLLLLLLLL21..
32323232323231..
11111111111111..
................
................` ],

  [ corner4, bitmap`
..13L000000L21..
..12L000000L31..
..13L000000L2111
..12L000000L3232
..13L000000LLLLL
..12L00000000000
..13L00000000000
..12L00000000000
..13L00000000000
..12L00000000000
..13L00000000000
..12LLLLLLLLLLLL
..13232323232323
..11111111111111
................
................` ]
  
)

setSolids([])

let level = 0

const levels = [
  map`
..cwwwwt
..scwt.s
..ss.s.s
..ss.s.s
..hb.s.s
..cwwb.f
..s.....
..p.....`
]

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

afterInput(() => {
  const p = getFirst(player)
  const here = getTile(p.x, p.y)
  const safeTiles = [chequered, straightTrack, sidewaysTrack, corner1, corner2, corner3, corner4]
  const isSafe = here.every(obj => safeTiles.includes(obj.type))
  if (here.length === 1 && here[0].type === player){
    clearText()
    addText("Game over!", { x: 6, y: 7, color: color`3`})
    return
  }
  if (here.some(obj => obj.type == chequered)) {
    clearText()
    addText("Congratulations!", { x: 2, y: 2, color: color`7`})
    addText("You win!", { x: 6, y: 8, color: color`7`})
    return
  }
})
                
