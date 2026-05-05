/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: my first game (hope it blows away)
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"

setLegend(
  [ player, bitmap`
....LLLLLL......
....L0CC0L......
.....C00C.......
.....0CC0.......
....4LLLL4......
....4L99L4......
....4L99L4......
....LLLLLL......
.....LLLL.......
.....D..D.......
.....D..D.......
.....D..D.......
.....L..L.......
................
................
................` ]
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