/*
@title: Space Invader
@description: A compitive shooting game where you need to kill the aliens before they touch the bottom.
@author: avalynndev
@tags: ['shooter']
@addedOn: 2025-09-29
*/

const player = "p"
const alien = "a"
const bullet = "b"
const bg = "x"

setLegend(
  [ player, bitmap`
................
................
.......22.......
......2222......
.....277772.....
....22777722....
....22777722....
....22222222....
....22222222....
....22.22.22....
....22.22.22....
...222.22.222...
...22..22..22...
..22...22...22..
................
................`],
  [ alien, bitmap`
................
....44....44....
....44....44....
...4444444444...
..444444444444..
..444224411444..
..444444444444..
....44....44....
...44......44...
..44........44..
................
................
................
................
................
................`],
  [ bullet, bitmap`
................
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................
................
................
................
................
................
................
................`],
  [ bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

const level = map`
...................
..............a....
..........a........
.a...a.......a...a.
........a..a.......
...a...........a...
.........a..a......
..a...a.........a..
...................
...................
...................
...................
...................
...................
....p..............`


setMap(level)
setBackground(bg)
let gameOver = false
let score = 0
let alienDir = 1
let moveCount = 0
let lastShot = 0
const shootCooldown = 200 

onInput("w", () => {
  if (gameOver) return
  const now = Date.now()
  if (now - lastShot < shootCooldown) return
  
  const p = getFirst(player)
  if (p) {
    addSprite(p.x, p.y - 1, bullet)
    lastShot = now
  }
})

onInput("a", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p && p.x > 0) p.x -= 1
})

onInput("d", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p && p.x < width() - 1) p.x += 1
})

onInput("s", () => {
  gameOver = false
  score = 0
  alienDir = 1
  moveCount = 0
  clearText()
  addText(`Score: 0`, { x: 1, y: 1, color: color`7` })
  setMap(level)
})

setInterval(() => {
  if (gameOver) return
  
  for (const b of getAll(bullet)) {
    const hit = getTile(b.x, b.y).find(s => s.type === alien)
    if (hit) {
      hit.remove()
      b.remove()
      score += 10
      clearText()
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`7` })
      continue
    }
    
    b.y -= 1
    if (b.y < 0) b.remove()
  }
  
  moveCount++
  if (moveCount >= 10) {
    moveCount = 0
    const aliens = getAll(alien)
    
    for (const a of aliens) {
      a.y += 1
      if (a.y >= height() - 1) {
        gameOver = true
        clearText()
        addText("GAME OVER!", { x: 2, y: 4, color: color`3` })
        addText(`Score: ${score}`, { x: 2, y: 6, color: color`7` })
      }
    }
  }
  
  if (getAll(alien).length === 0) {
    gameOver = true
    clearText()
    addText("YOU WIN!", { x: 2, y: 4, color: color`4` })
    addText(`Score: ${score}`, { x: 2, y: 6, color: color`7` })
  }
}, 100)

addText(`Score: 0`, { x: 1, y: 1, color: color`7` })
