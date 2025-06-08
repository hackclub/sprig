/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: game
@author: 
@tags: []
@addedOn: 2025-00-00
*/


const player = "p"
const cat = "c"
const background = "b"
const wall = "w"
const rock = "r"
const house = "h"
const backgroundTune =tune`
150: E4~150 + F4~150 + G4~150 + C4^150,
150: E4~150 + F4~150 + G4~150 + C4^150,
150: E4~150,
150: E4~150 + C4^150,
150: D4~150 + C4^150,
150: D4~150,
150: D4~150 + E4~150 + F4~150 + C4^150,
150: D4~150 + E4~150 + F4~150 + C4^150,
150: F4~150,
150: F4~150 + C4^150,
150: F4~150 + G4~150 + A4~150 + C4^150,
150: F4~150 + G4~150 + A4~150,
150: A4~150 + C4^150,
150: A4~150 + C4^150,
150: A4~150,
150: A4~150 + C4^150,
150: G4~150 + F4~150 + C4^150,
150: G4~150 + F4~150,
150: E4~150 + C4^150,
150: E4~150 + C4^150,
150: E4~150 + F4~150,
150: E4~150 + F4~150 + C4^150,
150: G4~150 + A4~150 + C4^150,
150: G4~150 + A4~150,
150: A4~150 + C4^150,
150: A4~150 + C4^150,
150: A4~150 + G4~150 + F4~150 + E4~150,
150: A4~150 + G4~150 + F4~150 + E4~150 + C4^150,
150: E4~150 + D4~150 + C4^150,
150: E4~150 + D4~150,
150: F4~150 + G4~150 + A4~150 + C4^150,
150: F4~150 + G4~150 + A4~150 + C4^150`
const meow =tune`
387.0967741935484,
96.7741935483871: C5/96.7741935483871 + F4~96.7741935483871 + A4^96.7741935483871,
96.7741935483871: D4/96.7741935483871 + F4~96.7741935483871 + A4-96.7741935483871,
2516.129032258065`
playTune(backgroundTune, Infinity)

setLegend(
  [ player, bitmap`
......44444.....
......4.4.4.....
......40004.....
......00000.....
......00000.....
......06660.0...
....0003630.0...
....0.0666600...
....0.05550.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................` ],
  [ cat, bitmap`
................
................
.....0..0.....10
....0L00L0...00.
...0L6LLL0...L1.
..8LLLLLLL0..00.
...00LLLL0....L0
.....0LL0.....0L
....0LL0......01
....0LLL00000000
...0LLLLL0LLL000
..00000000000.00
..00.00....00.00
..00.00....L0.L0
..L0.L0.........
................` ],
  [ background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L01111111111110L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01LLLLLLLLLL10L
L01111111111110L
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ rock, bitmap`
................
................
.......1111.....
...0LLLLLLLL10..
...L1LLLLL1LLL..
..0L1LLLLLLLLL1.
..LLL1LLLLLLLLL1
..L1LLLLL111L1L1
..LLLLLLL1LLLLL1
.0L11LLL11LLL0L.
.0LL1LL11LL11LL.
..0L111LLLLL1L0.
..1LLLLLLL1LLL..
..011LL1L1LL0...
....1000000.....
................` ],
   [ house, bitmap`
.......00.......
......0000......
.....009900.....
....00999900....
...0099999900...
..009999999900..
.00999999999900.
0099922999229900
.09992299922990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999922999990.
.09999922999990.
.09999922999990.
.00000000000000.` ],
)

setSolids([player,wall,rock,cat])

let level = 0
const levels = [
  map`
p.w......w
..w..w.w.w
..w..wrwrw
..ww.w...w
..r.rw.w..
rw...w.w..
..rww..c..
h.......ww`
]

setMap(levels[level])

setPushables({
  [ player ]: [rock,cat]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w",() => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -=1
})
onInput("d", () => {
  getFirst(player).x +=1
})
onInput("j", () => {
  setMap(levels[level])
})

let previousCatCoordinates ={"x": getFirst(cat).x, "y": getFirst(cat).y }

addText("press J to reset",{x:2, y:7,color:color`7`})

afterInput(() => {
  clearText();
  if(tilesWith(cat,house).length >= 1){
  addText(" You have won!",{x:7, y:7, color:color`9`})
  } 
 let currentCatCoordinates = {"x": getFirst(cat).x, "y": getFirst(cat).y}
  if(currentCatCoordinates.x != previousCatCoordinates.x ||
   currentCatCoordinates.y != previousCatCoordinates.y){ 
    playTune(meow, 1)
    previousCatCoordinates = currentCatCoordinates
  }
})
