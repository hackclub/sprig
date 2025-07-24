
@title: The Unknown
@author: Adam Nguyen
@tags: []
@addedOn: 2025-24-07
@description: An endless Google dino insperated game. You play as a fish trying to avoid obstical
const player = "p"
const cactus = "c"
const rock = "r"
const skull = "s"

setLegend(
  [ player, bitmap`
................
................
................
................
................
.10..101010101..
.041.010101550..
.1550101010551..
.0551010101010..
.140.101010101..
.01..010101010..
................
................
................
................
................` ],

  [ cactus, bitmap`
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33
..33..33..33..33` ],

  [ rock, bitmap`
................
................
.....33333......
....3333333.....
....3333333.....
.....33333......
................
................
................
................
................
................
................
................
................
................` ],

  [ skull, bitmap`
................
................
......666.......
.....66666......
.....66666......
......666.......
.....6..6.......
....666666......
.....6..6.......
....6.66.6......
.....6666.......
................
................
................
................
................` ]
)

setSolids([])

const obstacleTypes = [cactus, rock, skull]

let level = 0
const levels = [
  map`
......
......
......
p.....
......`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

// === PLAYER JUMP ===
let isJumping = false
onInput("w", () => {
  if (!isJumping) {
    isJumping = true
    getFirst(player).y -= 1
    setTimeout(() => {
      getFirst(player).y += 1
      isJumping = false
    }, 400)
  }
})

// === OBSTACLE SPAWN ===
function spawnObstacle() {
  const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)]
  let x = width() - 1
  let y = 3 // ground level
  addSprite(x, y, type)
}

// === OBSTACLE MOVEMENT LOOP ===
// Make faster by reducing interval to 100ms
let obstacleInterval = setInterval(() => {
  let allObstacles = []
  for (let type of obstacleTypes) {
    allObstacles = allObstacles.concat(getAll(type))
  }

  for (let obs of allObstacles) {
    obs.x -= 1

    // Remove when hitting edge (fix)
    if (obs.x <= 0) obs.remove()

    // COLLISION DETECTION
    let p = getFirst(player)
    if (obs.x === p.x && obs.y === p.y) {
      gameOver()
    }
  }
}, 100) // ← Faster speed here

// === RANDOM SPAWN LOOP ===
let spawnLoopRunning = true
function randomSpawnLoop() {
  if (!spawnLoopRunning) return
  spawnObstacle()
  let delay = Math.floor(Math.random() * 1000) + 700
  setTimeout(randomSpawnLoop, delay)
}
randomSpawnLoop()

// === TIMER ===
let seconds = 0
addText("Time: 0", { x: 1, y: 0, color: color`3` })

let timerInterval = setInterval(() => {
  seconds += 1
  clearText()
  addText(`Time: ${seconds} seconds`, { x: 1, y: 0, color: color`3` })
}, 1000)

// === END GAME ===
function gameOver() {
  clearInterval(obstacleInterval)
  clearInterval(timerInterval)
  spawnLoopRunning = false
  clearText()
  addText(`GAME OVER`, { x: 3, y: 5, color: color`red` })
addText(`Time: ${seconds} seconds`, { x: 1, y: 0, color: color`3` })
  // Disable input
  onInput("w", () => {})
}