/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const player2 = "b"
const wall = "w"
let p1 = 0;
let p2 = 0;

setLegend(
  [ player, bitmap`
....333333333...
....3333333333..
....3333333333..
33333333333333..
....2222222233..
...22022202222..
..222222222222..
....222222222...
.....2222222....
......333333....
.....33333333...
....333333333...
...22.3333332...
...2..33..33....
.....33...33....
....333..333....` ],
  [ player2, bitmap`
....55555555....
....555555555...
....555555555...
5555555555555...
....222222222...
...2202202222...
..22222222222...
....222222222...
.....5555555....
.....55555555...
....555555555...
...5555555552...
..22.5555555....
..2..55...55....
....55...55.....
...555..555.....`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL000000LLLLL
LLLLL000000LLLLL
LLLLL000000LLLLL
LLLLL000000LLLLL
LLLLL000000LLLLL
LLLLL000000LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setSolids([player, player2])

let level = 0
const levels = [
  map`
wwwwwwwwwwwwww
w.w....w.....w
w............w
w..w..wwww...w
w..w..p..w.w.w
w..w.....w.w.w
w..w..ww.w.w.w
w.....ww.w.w.w
w........w...w
w.www.b......w
w.......wwww.w
w.www...wwww.w
w............w
wwwwwwwwwwwwww`,
  map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`
]

setMap(levels[level])

setPushables({
  [ player ]: [player2],
  [ player2 ]: [player]
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y += -1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x += -1
})

afterInput(() => {
  if (tilesWith(wall, player2).length == 1) {
    p1 += 1;
    addText(`player 1 won \n score ${p1} - ${p2}`, {y:1,x:4,color:color`3`})
    setTimeout(clearText,3000)
  }
  if (tilesWith(wall,player).length == 1) {
    p2 += 1;
    addText(`player 2 won \n score ${p1} - ${p2}`, {y:4,x:4,color:color`3`})
    setTimeout(clearText,3000)
  }
})


onInput("k", () => {
  getFirst(player2).y += 1
})

onInput("i", () => {
  getFirst(player2).y += -1
})

onInput("l", () => {
  getFirst(player2).x += 1
})
onInput("j", () => {
  getFirst(player2).x += -1
})