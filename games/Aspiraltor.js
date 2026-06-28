/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Aspiraltor
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"

setLegend(
  [ player, bitmap`
...7........7...
..775555555577..
..555......55...
..5.........5...
..5..0...0..5...
..55...0....5...
...5.......55...
...55.....55....
....77.7.777....
...777.77..7....
...7.7.77..77...
..77.77777..7...
.77..777.77.77..
.7..77.7..7..7..
77.77..77.77.77.
...7....7..77...` ]
)

setSolids([])

let level = 0
const levels = [
  map`
p.
..`
]

setMap(levels[level])
onInput("w", () => { getFirst(player).y -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });


onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  
})