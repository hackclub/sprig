/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Quest of skviki
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"

setLegend(
  [ player, bitmap`
................
................
................
................
....00000000....
....0......0....
....0.0..0.0....
....0......0....
....00....00....
....0.0000.0....
....0......0....
....00000000....
................
................
................
................` ]
)

setSolids([])

let level = 0
const levels = [
  map`
.......
.......
...p...
.......
.......`
]
const wall = "w"

setMap(levels[level])

setPushables({
  [ player ]: []
})
onInput("d", () => {
  getFirst(player).x += 1
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
afterInput(() => {
  
})