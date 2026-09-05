/*
@title: snak
@author: ranveerlabs
@description: classic snake game but u play as the food
@tags: ['arcade', 'survival']
@addedOn: 2026-09-05
*/
const head = "h"
const body = "b"
const you = "y"

setLegend(
  [ head, bitmap`
66666666
66666666
66666666
66666666
66666666
66666666
66666666
66666666` ],
  [ body, bitmap`
55555555
55555555
55555555
55555555
55555555
55555555
55555555
55555555` ],
  [ you, bitmap`
33333333
33333333
33333333
33333333
33333333
33333333
33333333
33333333` ],
)

setMap(map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`)

const W = 20
const H = 16
const GOAL = 100

let snake = []
let player = { x: 3, y: 3 }
let drawn = []
let dir = { x: -1, y: 0 }
let elapsed = 0
let over = false
let speed = 320
let growTimer = 0

function draw() {
  for (let i = 0; i < drawn.length; i++) {
    clearTile(drawn[i].x, drawn[i].y)
  }
  drawn = []

  for (let i = 0; i < snake.length; i++) {
    const s = snake[i]
    addSprite(s.x, s.y, i === 0 ? head : body)
    drawn.push({ x: s.x, y: s.y })
  }

  addSprite(player.x, player.y, you)
  drawn.push({ x: player.x, y: player.y })

  clearText()
  addText("TIME " + elapsed + "/" + GOAL, { x: 0, y: 0, color: color`D` })
}

function endGame(win) {
  over = true
  for (let i = 0; i < drawn.length; i++) {
    clearTile(drawn[i].x, drawn[i].y)
  }
  drawn = []
  clearText()
  if (win) {
    addText("YOU SURVIVED", { x: 4, y: 7, color: color`D` })
  } else {
    addText("CAUGHT", { x: 7, y: 7, color: color`D` })
    addText("LASTED " + elapsed + "S", { x: 5, y: 9, color: color`D` })
  }
  addText("J TO RESTART", { x: 4, y: 11, color: color`D` })
}

function chase() {
  const h = snake[0]
  const dxWant = player.x - h.x
  const dyWant = player.y - h.y

  let options = []
  if (Math.abs(dxWant) > Math.abs(dyWant)) {
    if (dxWant !== 0) options.push({ x: dxWant > 0 ? 1 : -1, y: 0 })
    if (dyWant !== 0) options.push({ x: 0, y: dyWant > 0 ? 1 : -1 })
  } else {
    if (dyWant !== 0) options.push({ x: 0, y: dyWant > 0 ? 1 : -1 })
    if (dxWant !== 0) options.push({ x: dxWant > 0 ? 1 : -1, y: 0 })
  }
  options.push({ x: 1, y: 0 })
  options.push({ x: -1, y: 0 })
  options.push({ x: 0, y: 1 })
  options.push({ x: 0, y: -1 })

  for (let i = 0; i < options.length; i++) {
    const o = options[i]
    if (o.x === -dir.x && o.y === -dir.y) continue
    const nx = h.x + o.x
    const ny = h.y + o.y
    if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue
    let selfHit = false
    for (let j = 0; j < snake.length - 1; j++) {
      if (snake[j].x === nx && snake[j].y === ny) { selfHit = true; break }
    }
    if (selfHit) continue
    return o
  }
  return null
}

function reset() {
  for (let i = 0; i < drawn.length; i++) {
    clearTile(drawn[i].x, drawn[i].y)
  }
  drawn = []

  snake = [
    { x: 16, y: 12 },
    { x: 17, y: 12 },
    { x: 18, y: 12 }
  ]
  player = { x: 3, y: 3 }
  dir = { x: -1, y: 0 }
  elapsed = 0
  speed = 320
  growTimer = 0
  over = false

  draw()
  setTimeout(tick, speed)
}

function movePlayer(dx, dy) {
  if (over) return
  const nx = player.x + dx
  const ny = player.y + dy
  if (nx < 0 || nx >= W || ny < 0 || ny >= H) return
  player.x = nx
  player.y = ny
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === nx && snake[i].y === ny) {
      draw()
      endGame(false)
      return
    }
  }
  draw()
}

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
onInput("j", () => { if (over) reset() })

function tick() {
  if (over) return

  const move = chase()
  if (move) {
    dir = move
    const h = snake[0]
    snake.unshift({ x: h.x + move.x, y: h.y + move.y })
    growTimer++
    if (growTimer % 6 !== 0 || snake.length > 30) {
      snake.pop()
    }
  }

  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === player.x && snake[i].y === player.y) {
      draw()
      endGame(false)
      return
    }
  }

  elapsed += 1
  if (elapsed >= GOAL) {
    endGame(true)
    return
  }

  if (elapsed % 20 === 0 && speed > 160) speed -= 20

  draw()
  setTimeout(tick, speed)
}

reset()
