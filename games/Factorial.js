/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Factorial
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall1 = "1"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall1, bitmap`
DDDDDDDDDDDDDDDD
DCCCCCCCCCCCCCCD
DC666666666666CD
DC699999999996CD
DC697777777796CD
DC697888888796CD
DC6978HHHH8796CD
DC6978HLLH8796CD
DC6978HLLH8796CD
DC6978HHHH8796CD
DC697888888796CD
DC697777777796CD
DC699999999996CD
DC666666666666CD
DCCCCCCCCCCCCCCD
DDDDDDDDDDDDDDDD`]
)

setSolids([wall1])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
....111...
..........
.......p..
..........`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  console.log(getFirst(player).x)
  getFirst(player).x += 1
})

afterInput(() => {
  
})