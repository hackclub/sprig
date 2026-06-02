/*
@title: EndlessRunner
@author: Ansh Verma
@description: An endless runner game where you must survive as long as possible without getting squished!
@tags: []
@addedOn: 2026-06-02
*/
const player = "p"
const obstacle = "o"
setLegend(
  [player, bitmap`
................
................
................
....00000000....
...0........0...
...0........0...
...0..7..7..0...
...0........0...
...0........0...
...0.777777.0...
...0........0...
...0........0...
....00000000....
................
................
................`],
  [obstacle, bitmap`
................
................
................
....00000000....
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
....00000000....
................
................
................`]
)
setSolids([player, obstacle])
setPushables({ [obstacle]: [player] })

const levels = [
  map`
.......
.......
p......
.......
.......`
]

let score = 0
let gameOver = false
let level = 1

const LEVEL_2_SCORE = 30
const LEVEL_3_SCORE = 70

const MOVE_SPEED = { 1: 400, 2: 280, 3: 190 }
const SPAWN_SPEED = { 1: 1200, 2: 850, 3: 580 }

let moveInterval = null
let spawnInterval = null

const levelUpTune = tune`
500: c5~500,
500: e5~500,
500: g5~500`

const scoreTune = tune`
100: c5~100`

const deathTune = tune`
200: c3~200,
200: b2~200,
200: a2~200,
400: g2~400`

function getLevel() {
  if (score >= LEVEL_3_SCORE) return 3
  if (score >= LEVEL_2_SCORE) return 2
  return 1
}

function showHUD() {
  clearText()
  addText(`Score:${score}`, { x: 0, y: 0, color: color`7` })
  addText(`Lv:${level}`, { x: 9, y: 0, color: level === 3 ? color`3` : level === 2 ? color`4` : color`6` })
}

function startGame() {
  score = 0
  level = 1
  gameOver = false
  clearText()
  getAll(obstacle).forEach(o => o.remove())
  setMap(levels[0])
  showHUD()

  if (moveInterval) clearInterval(moveInterval)
  if (spawnInterval) clearInterval(spawnInterval)

  startIntervals()
}

function startIntervals() {
  moveInterval = setInterval(() => {
    if (gameOver) return
    const p = getFirst(player)
    if (!p) return

    const newLevel = getLevel()
    if (newLevel !== level) {
      level = newLevel
      playTune(levelUpTune)
      showHUD()
      clearInterval(moveInterval)
      clearInterval(spawnInterval)
      startIntervals()
      return
    }

    getAll(obstacle).forEach(obs => {
      if (obs.x === 1 && p.x === 0 && obs.y === p.y) {
        triggerDeath()
        return
      }
      if (obs.x <= 0) {
        obs.remove()
        score++
        showHUD()
        playTune(scoreTune)
      } else {
        obs.x -= 1
      }
    })

    if (p && p.x < 0) {
      triggerDeath()
    }
  }, MOVE_SPEED[level] || 400)

  spawnInterval = setInterval(() => {
    if (gameOver) return
    generateObstacles()
  }, SPAWN_SPEED[level] || 1200)
}

function triggerDeath() {
  if (gameOver) return
  gameOver = true
  clearInterval(moveInterval)
  clearInterval(spawnInterval)
  playTune(deathTune)
  clearText()
  addText("SQUASHED!", { y: 1, color: color`3` })
  addText(`Score: ${score}`, { y: 2, color: color`7` })
  addText(`Level: ${level}`, { y: 3, color: color`4` })
  addText("j = restart", { y: 4, color: color`3` })
  const p = getFirst(player)
  if (p) p.remove()
}

function generateObstacles() {
  const x = width() - 1
  const numObs = level === 3 ? 3 : 2

  const openRow = Math.floor(Math.random() * height())
  const rows = []
  while (rows.length < numObs) {
    const r = Math.floor(Math.random() * height())
    if (r !== openRow && !rows.includes(r)) {
      rows.push(r)
    }
  }
  rows.forEach(r => addSprite(x, r, obstacle))
}

startGame()

onInput("w", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p) p.y -= 1
})
onInput("a", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p && p.x > 0) p.x -= 1
})
onInput("s", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p) p.y += 1
})
onInput("d", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p && p.x < width() - 2) p.x += 1
})
onInput("j", () => {
  if (!getFirst(player)) {
    startGame()
  }
})
