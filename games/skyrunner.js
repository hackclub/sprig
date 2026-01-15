/*
@title: skyrun
@author: Mahesh
@description: L = Start
W = Jump
K = Restart lkk 
*/

/* Controls
L = Start
W = Jump
K = Restart
*/

// ===== SPRITES =====
const PLAYER = "p"
const GROUND = "g"
const SPIKE = "s"
const SKY = "b"

// ===== GAME STATE =====
let vy = 0
let gameOver = true
let score = 0
let speed = 160

// ===== LEGEND =====
setLegend(
[PLAYER, bitmap`
................
....66666.......
....63636.......
....66666.......
....66666.......
....6...6.......
...663.366......
................
................
................
................
................
................
................
................
................`],
[GROUND, bitmap`
................
................
................
................
................
................
................
................
................
................
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
[SPIKE, bitmap`
................
................
................
................
................
................
................
................
....3333........
...333333.......
..33333333......
....3333........
................
................
................
................`],
[SKY, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
)

setBackground(SKY)
setSolids([PLAYER])

// ===== MAP =====
setMap(map`
bbbbbbbb
pbbbbbbb
gggggggg`)

// ===== PLAYER GET =====
function getPlayer() {
  return getFirst(PLAYER)
}

// ===== PHYSICS =====
function physics() {
  const p = getPlayer()
  if (!p) return

  p.y += Math.sign(vy)
  vy += 1

  if (p.y > 2) {
    p.y = 2
    vy = 0
  }

  if (!gameOver) setTimeout(physics, 30)
}

// ===== GAME LOOP =====
function loop() {
  const p = getPlayer()
  if (!p) return

  // move spikes
  getAll(SPIKE).forEach(o => {
    if (o.x <= 0) o.remove()
    else o.x--
  })

  // spawn spikes
  if (Math.random() < 0.15) {
    addSprite(width() - 1, 2, SPIKE)
  }

  // collision
  if (tilesWith(SPIKE, PLAYER).length > 0) {
    endGame()
    return
  }

  score++
  speed = Math.max(80, 160 - score)

  clearText()
  addText(`skyrunner`, { x: 5, y: 0, color: color`3` })
  addText(`Score: ${score}`, { x: 0, y: 1, color: color`4` })

  if (!gameOver) setTimeout(loop, speed)
}

// ===== INPUT =====
onInput("l", () => gameOver && startGame())
onInput("k", () => gameOver && startGame())
onInput("w", () => {
  const p = getPlayer()
  if (p && p.y === 2) vy = -7
})

// ===== GAME OVER =====
function endGame() {
  gameOver = true
  clearText()
  addText(`GAME OVER`, { x: 3, y: 6, color: color`4` })
  addText(`Score: ${score}`, { x: 4, y: 8, color: color`6` })
  addText(`Press K`, { x: 5, y: 10, color: color`7` })
}

// ===== START GAME =====
function startGame() {
  gameOver = false
  score = 0
  vy = 0

  getAll(SPIKE).forEach(s => s.remove())

  const p = getPlayer()
  if (!p) addSprite(1, 2, PLAYER)
  else { p.x = 1; p.y = 2 }

  physics()
  loop()
}

// ===== MENU =====
clearText()
addText(`skyrunner`, { x: 5, y: 5, color: color`3` })
addText(`Press L`, { x: 5, y: 7, color: color`7` })


