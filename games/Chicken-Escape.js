/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Factory Escape
@author: Adrián Bethencourt Cruzado
@tags: [puzzle]
@addedOn: 2026-02-07
*/

const player = "p"
const egg = "egg"

setLegend(
  [ player, bitmap`
................
................
......0000......
......03330.....
......03330.....
.....0222220....
....022222220...
..00022022020...
..02022022020...
..02222229920...
..02222223220...
..02222223220...
...022222220....
....00C00C0.....
.....00..00.....
................` ],
  [ egg, bitmap`
................
.......00.......
.....001200.....
....0D122210....
...0DD2222210...
...0D222222D0...
..012222222DD0..
..0222DD2222D0..
.0122DDDD222220.
.0D12DDDD222220.
.0D122DD2222220.
..0112222222D0..
..0L1111222DD0..
...0DDD1111D0...
....00DLLL00....
......0000......`],
)

setSolids([])

let level = 0
const levels = [
  map`
...
peegggegg
...`
]

setMap(levels[level])

/* CONTROLS */
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
  
})