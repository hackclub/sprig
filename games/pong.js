/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pong
@author: Irtaza
@tags: [retro, pong, arcade]
@addedOn: 2024-00-00
*/

const player1 = "p"
const player2 = "q"
const ball = "b"

setLegend(
  [ player1, bitmap`
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............` ],
  [ player2, bitmap`
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0` ]
)

setSolids([player1, player2])

let level = 0
const levels = [
  map`
p....q
......
......
......
......`
]

setMap(levels[level])

setPushables({
  [ player1 ]: []
})

onInput("s", () => {
  getFirst(player1).y += 1
})

onInput("w", () => {
  getFirst(player1).y -= 1
})

onInput("k", () => {
  getFirst(player2).y += 1
})

onInput("i", () => {
  getFirst(player2).y -= 1
})

afterInput(() => {
  
})