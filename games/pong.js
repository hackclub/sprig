/*
@title: Pong
@description: Classic 2-player Pong
@author:
@tags: ['arcade']
@addedOn: 2026-07-04
*/

const leftPaddle = "l"
const rightPaddle = "r"
const ball = "b"

setLegend(
  [leftPaddle, bitmap`
................
................
..333...........
..333...........
..333...........
..333...........
..333...........
..333...........
..333...........
..333...........
..333...........
..333...........
................
................
................
................`],

  [rightPaddle, bitmap`
................
................
...........333..
...........333..
...........333..
...........333..
...........333..
...........333..
...........333..
...........333..
...........333..
...........333..
................
................
................
................`],

  [ball, bitmap`
................
................
................
......6666......
.....666666.....
.....666666.....
......6666......
................
................
................
................
................
................
................
................
................`]
)

setMap(map`
..........
l........r
..........
..........
.....b....
..........
..........
..........
l........r
..........`)

setSolids([])

let dx = 1
let dy = 1

// Left paddle (W/S)
onInput("w", () => {
  const p = getFirst(leftPaddle)
  if (p.y > 0) p.y--
})

onInput("s", () => {
  const p = getFirst(leftPaddle)
  if (p.y < height() - 2) p.y++
})

// Right paddle (I/K)
onInput("i", () => {
  const p = getFirst(rightPaddle)
  if (p.y > 0) p.y--
})

onInput("k", () => {
  const p = getFirst(rightPaddle)
  if (p.y < height() - 2) p.y++
})

function resetBall() {
  const b = getFirst(ball)
  b.x = Math.floor(width() / 2)
  b.y = Math.floor(height() / 2)
  dx *= -1
  dy = Math.random() < 0.5 ? -1 : 1
}

setInterval(() => {
  const b = getFirst(ball)

  let nx = b.x + dx
  let ny = b.y + dy

  // Bounce off top/bottom
  if (ny < 0 || ny >= height()) {
    dy *= -1
    ny = b.y + dy
  }

  // Left paddle collision
  const left = getFirst(leftPaddle)
  if (nx == left.x && ny == left.y) {
    dx = 1
    nx = b.x + dx
  }

  // Right paddle collision
  const right = getFirst(rightPaddle)
  if (nx == right.x && ny == right.y) {
    dx = -1
    nx = b.x + dx
  }

  b.x = nx
  b.y = ny

  // Score (ball leaves screen)
  if (b.x < 0 || b.x >= width()) {
    resetBall()
  }

}, 150)