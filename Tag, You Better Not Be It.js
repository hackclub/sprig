/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tag, You Better Not Be It
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const enemy = "e"

setLegend(
  [ player, bitmap`
................
......0000......
....00HHHH00....
...0HHHHHHHH0...
..0HH0HHHH0HH0..
..0H070HH070H0..
.0HHH0HHHH0HHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHH00HHHHH0.
..0HHH0HH0HHH0..
..0HH0HHHH0HH0..
...0HHHHHHHH0...
....00HHHH00....
......0000......
................` ],
  [ enemy, bitmap`
................
......0000......
....30000003....
...0030000300...
..000030030000..
..000300003000..
.00003000030000.
.00003000030000.
.00000000000000.
.00000000000000.
..000000000000..
..000033330000..
...0030000300...
....00000000....
......0000......
................` ]
)

setSolids([])

let gameOver = false
let level = 0
const levels = [
  map`
..........e
...........
...........
...........
...........
...........
...........
...........
...........
p..........`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  if (gameOver) return
  getFirst(player).y += 1
})

onInput("w", () => {
  if (gameOver) return
  getFirst(player).y -= 1
})

onInput("d", () => {
  if (gameOver) return
  getFirst(player).x += 1
})

onInput("a", () => {
  if (gameOver) return
  getFirst(player).x -= 1
})

let enemyLoop = setInterval(() => {
  let p = getFirst(player)
  let e = getFirst(enemy)

  if (!p || !e) return

  if (e.x < p.x) {
    e.x += 1 }
  else if (e.x > p.x) {
    e.x -= 1 }

  if (e.y < p.y) {
    e.y += 1 }
  else if (e.y > p.y) {
    e.y -= 1 }
  if (p.x === e.x && p.y === e.y) {
    clearInterval(enemyLoop)
    clearTile()
    addText("You Got Tagged! :c", {y: 5, color: color`3` })
  }
}, 250);
    afterInput(() => {
})