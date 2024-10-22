/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: move the kirby
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"

setLegend(
  [ player, bitmap`
................
................
................
................
....888888......
....8.0.08......
....8....8......
....8....8......
....888888......
....33..33......
....33..33......
................
................
................
................
................` ]
)

setSolids([])

let level = 0
const levels = [
  map`
p.....
......
......
......
......`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  
})

onInput("w", () => {
  getFirst(player).y -= 1; // Move up
})

onInput("a", () => {
  getFirst(player).x -= 1; // Move left
})

onInput("d", () => {
  getFirst(player).x += 1; // Move right
})