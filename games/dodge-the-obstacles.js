const player = "p"
const obstacle = "o"
let gameOver = false
let started = false
let selectedLevel = 1
let speed = 900
let gameInterval
let score = 0
let spawnInterval

setLegend(
  [player, bitmap`
................
................
................
.......6666.....
......666666....
......666069....
......66666999..
.......666999...
..6.6666666.....
..6066666666....
..66066606666...
..66600066666...
..66666666666...
...666666666....
....6666666.....
................`],
  [obstacle, bitmap`
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

setSolids([])

const levels = [
  map`
o..............
o..............
o..............
o..............
o..............
o..p...........
o..............
o..............
o..............
o..............
o..............
o..............`
]

setMap(levels[0])


addText("  Level: " + selectedLevel, { x: 5, y: 4, color: color`5` })
addText("    w/s to pick,\n     i to start", { x: 1, y: 6, color: color`0` })

setPushables({
  [player]: []
})

onInput("w", () => {
  if (!started) {
    selectedLevel = Math.max(1, selectedLevel - 1)
    clearText()
    addText("  Level: " + selectedLevel, { x: 5, y: 4, color: color`5` })
    addText("    w/s to pick,\n     i to start", { x: 1, y: 6, color: color`0` })
  } else {
    getFirst(player).y -= 1
  }
})

onInput("s", () => {
  if (!started) {
    selectedLevel = Math.min(10, selectedLevel + 1)
    clearText()
    addText("  Level: " + selectedLevel, { x: 5, y: 4, color: color`5` })
    addText("    w/s to pick,\n     i to start", { x: 1, y: 6, color: color`0` })
  } else {
    getFirst(player).y += 1
  }
})

onInput("i", () => {
  if (!started) {
    started = true
    speed = 600 - (selectedLevel * 50)
    clearText()
    startGame()
  } else if (gameOver) {
    clearInterval(spawnInterval)
    clearInterval(gameInterval)
    gameOver = false
    started = false
    selectedLevel = 1
    score = 0
    setMap(levels[0])
    clearText()
    addText("  Level: " + selectedLevel, { x: 5, y: 4, color: color`5` })
    addText("    w/s to pick,\n     i to start", { x: 1, y: 6, color: color`0` })
  }
})

afterInput(() => {})

function spawnObstacle() {
  if (gameOver) return
  const gapRow = Math.floor(Math.random() * 10)
  for (let row = 0; row < 12; row++) {
    if (row !== gapRow && row !== gapRow + 1) {
      addSprite(14, row, obstacle)
    }
  }
}

function moveObstacles() {
  if (gameOver) return
  getAll(obstacle).forEach(obs => {
    obs.x -= 1
    if (obs.x === getFirst(player).x - 1) {
      score += 1
      clearText()
      addText("  Score: " + score / 10, { x: 5, y: 0, color: color`5` })
    }
    if (obs.x < 0) {
      obs.remove()
    }
    if (obs.x === getFirst(player).x && obs.y === getFirst(player).y) {
      addText("Game Over!", { x: 5, y: 4, color: color`3` })
      addText("Press i to restart!", { x: 1, y: 5, color: color`5` })
      gameOver = true
      getAll(obstacle).forEach(o => o.remove())
    }
  })
}

function startGame() {
  spawnInterval = setInterval(() => {
    spawnObstacle()
  }, (1250 * (speed / 100)))
  gameInterval = setInterval(moveObstacles, speed)
}
