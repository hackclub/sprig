/*
@title: touching simulator
@author: toucher
@tags: [@kids, @fun]
@addedOn: 2025-04-14
*/

const player = "p"
const kid = "k"

setLegend(
  [ player, bitmap`
.......0........
......00000.....
.....0000000....
.......000......
........0.......
...00000000.00..
.....0..0..0....
.......00.......
........0.......
......000.......
.....0...0......
....0.....00....
..00.......0.0..
...0........00..
............0...
................` ],
  [ kid, bitmap`
................
.......333......
......06063.....
.....3006060....
.....3606000....
.....0066660....
......36663.....
....000303......
....00.3.3......
...0.033033.....
0....3...0030.0.
000.00......30..
..0.0.0.0...3.0.
...0.3.0...3.0..
......33033.....
................` ]
)

setSolids([])

let level = 0
const levels = [
  map`
p.
.k`
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

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

afterInput(() => {
  const p = getFirst(player)
  const k = getFirst(kid)
  if (p.x === k.x && p.y === k.y) {
    addText("You touched it!", { y: 4, color: color`0` })
  }
})
