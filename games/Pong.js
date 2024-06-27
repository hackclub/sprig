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
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............
55..............` ],
  [ player2, bitmap`
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33
..............33` ],
  [ ball, bitmap`
....11111111....
...1111111111...
..111111111111..
.11111111111111.
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
.11111111111111.
..111111111111..
...1111111111...
....11111111....`]
)

setSolids([player1, player2])

let level = 0
const levels = [
  map`
.........
.........
.........
p...b...q
.........
.........
.........`
]

setMap(levels[level])

setPushables({
  [ player1 ]: [],
  [ player2 ]: [],
  [ ball ]: []
})

const ballSpeed = { x: 1, y: 1 }

const moveBall = () => {
  const b = getFirst(ball)
  b.x += ballSpeed.x
  b.y += ballSpeed.y

  if (b.y <= 0 || b.y >= height() - 1) {
    ballSpeed.y = -ballSpeed.y
  }

  if (b.x === getFirst(player1).x  && b.y === getFirst(player1).y) {
    ballSpeed.x = -ballSpeed.x
  } else if (b.x === getFirst(player2).x  && b.y === getFirst(player2).y) {
    ballSpeed.x = -ballSpeed.x
  }

  if (b.x <= 0 && b.y != getFirst(player1).y) {
    addText("Player 2 Wins!", { x: 4, y: 4, color: color`3` })
    clearInterval(ballInterval)
  } else if (b.x >= width() - 1 && b.y != getFirst(player2).y ) {
    addText("Player 1 Wins!", { x: 4, y: 4, color: color`3` })
    clearInterval(ballInterval)
  }

  
}

const resetGame = () => {
  setMap(levels[level])
  clearText()
  ballSpeed.x = 1
  ballSpeed.y = 1
  clearInterval(ballInterval)
  ballInterval = setInterval(moveBall, 500)
}

let ballInterval = setInterval(moveBall, 500)

onInput("s", () => {
  const p1 = getFirst(player1)
  if (p1.y < height() - 1) p1.y += 1
})

onInput("w", () => {
  const p1 = getFirst(player1)
  if (p1.y > 0) p1.y -= 1
})

onInput("k", () => {
  const p2 = getFirst(player2)
  if (p2.y < height() - 1) p2.y += 1
})

onInput("i", () => {
  const p2 = getFirst(player2)
  if (p2.y > 0) p2.y -= 1
})

onInput("a", () => {
  resetGame()
})
