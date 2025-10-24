/*
@title: Fair Chaotic Coin Dash
@author: Aakash Vishnuvarth
@description: Dodge spikes, collect orbs! Score shown as coins on the left.
@tags: [runner, action, reflex, endless, score]
@addedOn: 2025-10-20
*/

const WIDTH = 16
const HEIGHT = 16

const runnerTile = bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`

const orbTile = bitmap`
................
................
.......22.......
......2222......
......2222......
.......22.......
................
................
................
................
................
................
................
................
................
................`

const spikeTile = bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`

const scoreTile = bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`

setLegend(
  ["R", runnerTile],
  ["O", orbTile],
  ["X", spikeTile],
  ["S", scoreTile]
)

let lane = 1
const LANE_ROWS = [5, 9, 13]
let obstacles = []
let gameOver = false
let speed = 200
let nextSpawnIn = 3
let frameCount = 0
let score = 0
const MIN_SPEED = 70

// --- DEFINE gameLoop BEFORE initGame ---
function gameLoop() {
  if (!gameOver) {
    updateWorld()
    setTimeout(gameLoop, speed)
  }
}

function initGame() {
  lane = 1
  obstacles = []
  gameOver = false
  speed = 200
  nextSpawnIn = 3
  frameCount = 0
  score = 0
  draw()
  gameLoop() // ✅ Now safe: gameLoop is already defined
}

function draw() {
  let mapStr = ""
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (x === 0) {
        mapStr += (y < score) ? "S" : "."
        continue
      }
      if (x === 3 && y === LANE_ROWS[lane]) {
        mapStr += "R"
        continue
      }
      let cell = "."
      for (const obs of obstacles) {
        if (obs.x === x && LANE_ROWS[obs.y] === y) {
          cell = obs.type
          break
        }
      }
      mapStr += cell
    }
    mapStr += "\n"
  }
  setMap(map`${mapStr}`)
}

function spawnObstacle() {
  const chaosFactor = Math.min(1, frameCount / 600)
  const tripleSpawnChance = 0.10 * (1 - chaosFactor)
  const doubleSpawnChance = 0.20 + 0.10 * chaosFactor

  const rand = Math.random()
  let lanesToSpawn = []

  if (rand < 0.6) {
    lanesToSpawn = [Math.floor(Math.random() * 3)]
  } else if (rand < 0.6 + doubleSpawnChance) {
    const l1 = Math.floor(Math.random() * 3)
    let l2 = Math.floor(Math.random() * 3)
    while (l2 === l1) l2 = Math.floor(Math.random() * 3)
    lanesToSpawn = [l1, l2]
  } else if (rand < 0.6 + doubleSpawnChance + tripleSpawnChance) {
    lanesToSpawn = [0, 1, 2]
  } else {
    lanesToSpawn = [Math.floor(Math.random() * 3)]
  }

  for (const laneIdx of lanesToSpawn) {
    const isOrb = Math.random() < 0.5
    const type = isOrb ? "O" : "X"
    const spawnX = WIDTH - 1 - Math.floor(Math.random() * 2)
    obstacles.push({ x: spawnX, y: laneIdx, type })
  }
}

function updateWorld() {
  if (gameOver) return

  for (const obs of obstacles) {
    obs.x -= 1
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i]
    if (obs.x === 3 && obs.y === lane) {
      if (obs.type === "X") {
        gameOver = true
        setTimeout(() => {
          let scoreStr = ""
          for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
              if (x === 0 && y < score) {
                scoreStr += "S"
              } else {
                scoreStr += "."
              }
            }
            scoreStr += "\n"
          }
          setMap(map`${scoreStr}`)
          setTimeout(() => {
            let lose = "X".repeat(WIDTH * HEIGHT).match(new RegExp(`.{1,${WIDTH}}`, "g")).join("\n")
            setMap(map`${lose}`)
          }, 600)
        }, 200)
        return
      } else if (obs.type === "O") {
        score++
        obstacles.splice(i, 1)
      }
    }
  }

  obstacles = obstacles.filter(obs => obs.x >= -1)

  nextSpawnIn--
  if (nextSpawnIn <= 0) {
    spawnObstacle()
    const minDelay = 1
    const maxDelay = Math.max(2, 4 - Math.floor(Math.min(300, frameCount) / 100))
    nextSpawnIn = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay
  }

  frameCount++
  if (frameCount % 100 === 0 && speed > MIN_SPEED) {
    speed -= 8
    if (speed < MIN_SPEED) speed = MIN_SPEED
  }

  draw()
}

onInput("w", () => {
  if (!gameOver && lane > 0) {
    lane -= 1
    draw()
  }
})

onInput("s", () => {
  if (!gameOver && lane < 2) {
    lane += 1
    draw()
  }
})

onInput("k", () => {
  initGame()
})

initGame()