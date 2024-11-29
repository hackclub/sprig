/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: shadowBox
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"

setLegend(
  [ easter-egg, bitmap`
................
................
.......000......
.......060......
......0660...0..
......06660.020.
.0....00600..0..
0200..06660..0..
.0..00000000.0..
......00300.0...
.....066360.....
....006660......
.....0000.......
......0.0.......
.....00.00......
................` ],
  [ up-hand, bitmap``],
  [ down-hand, bitmap``],
  [ left-hand, bitmap`
................
................
................
................
............5505
.......000HH5505
.......2HHHH5H05
.......000HH5H05
..0000002HHH5H05
..2HHHHH2HHH5H05
..5555552HHH5H05
..2HHHHHHHHH5555
................
................
................
................`],
  [ right-hand, bitmap`
................
................
................
................
............5505
.......000HH5505
.......2HHHH5H05
.......000HH5H05
..0000002HHH5H05
..2HHHHH2HHH5H05
..5555552HHH5H05
..2HHHHHHHHH5555
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
p.
..`
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