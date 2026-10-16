/*
@title: Last Battery
@description: A turn-based survival puzzle game where every move drains your energy. Explore a dangerous underground facility, collect batteries, avoid security drones, and find the exit before your power runs out.
@author: Tashfeen Miyar
@tags: ['puzzle', 'turn-based', 'strategy', 'survival', 'dungeon', 'robot', 'maze', 'retro']
@addedOn: 2026-09-05
*/

const player = "p"
const wall = "w"
const exit = "e"
const battery = "b"
const drone = "d"
let score = 0
let energy = 20
let gameOver = false
let turnTaken = false

setLegend(
  [ player, bitmap`
................
................
......0000......
.....022220.....
.....020020.....
.....022220.....
......0000......
.......00.......
......0..0......
.....0.00.0.....
................
................
................
................
................
................` ],

  [ wall, bitmap`
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
0000000000000000` ],

  [ exit, bitmap`
................
................
...0000000000...
...0........0...
...0.222222.0...
...0.202202.0...
...0.222222.0...
...0.202202.0...
...0.222222.0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0000000000...
................` ],

  [ battery, bitmap`
................
................
.......00.......
......0220......
......0220......
......0220......
......0000......
......0000......
......0000......
......0000......
......0220......
......0000......
................
................
................
................` ],

  [ drone, bitmap`
................
................
................
..0.........0...
...20.....02....
...00..0..00....
.....00000......
....0022200.....
....0022200.....
.....00000......
...00..0..00....
...20.....02....
..0.........0...
................
................
................` ]
)

setSolids([wall])

let level = 0
const levels = [
  map`
wwwwwwwwwww
wp....d...w
w.www.www.w
w...w.....w
w...wbwww.w
w........ew
wwwwwwwwwww`,

  map`
wwwwwwwwwww
w.p.......w
w.www.www.w
w.......dbw
w.www.wwwww
wb.......ew
wwwwwwwwwww`,

  map`
wwwwwwwwwww
wbd.....e.w
w.www.www.w
w..bw.w...w
w.www.wwwbw
w.....p...w
wwwwwwwwwww`
]

function movePlayer(dx, dy) {
  if (gameOver) return

  const playerSprite = getFirst(player)

  const newX = playerSprite.x + dx
  const newY = playerSprite.y + dy

  if (
    newX < 0 ||
    newX >= width() ||
    newY < 0 ||
    newY >= height()
  ) {
      turnTaken = false
      return
  }

  const targetTile = getTile(newX, newY)

  for (const sprite of targetTile) {
    if (sprite.type === wall) {
      turnTaken = false
      return
    }
  }

  playerSprite.x = newX
  playerSprite.y = newY

  energy -= 1
  turnTaken = true
}

function updateEnergy() {
  clearText()

  addText("SCORE: " + (score), {
    x: 1,
    y: 2
  })

  addText("ENERGY: " + energy, {
    x: 1,
    y: 13
  })

  if (energy <= 5 && energy > 0) {
    addText("!", {
      x: 10,
      y: 13
    })
  }

  if (energy <= 0) {
    energy = 0
    gameOver = true
    clearText()

    addText("POWER OUT!", {
      x: 5,
      y: 2
    })

    addText("press I to RESTART", {
      x: 1,
      y: 13
    })
  }
}

function findPath(startX, startY, targetX, targetY) {
  const queue = [[startX, startY]]
  const visited = [`${startX},${startY}`]
  const cameFrom = {}

  while (queue.length > 0) {
    const current = queue.shift()
    const x = current[0]
    const y = current[1]

    if (x === targetX && y === targetY) {
      break
    }

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]

    for (const direction of directions) {
      const nextX = x + direction[0]
      const nextY = y + direction[1]

      if (
          nextX < 0 ||
          nextX >= width() ||
          nextY < 0 ||
          nextY >= height()
      ) {
          continue
      }

      const key = `${nextX},${nextY}`

      if (visited.includes(key)) continue

      const targetTile = getTile(nextX, nextY)
      let blocked = false

      for (const sprite of targetTile) {
        if (sprite.type === wall) {
          blocked = true
          break
        }
      }

      if (blocked) continue

      visited.push(key)
      cameFrom[key] = `${x},${y}`
      queue.push([nextX, nextY])
    }
  }

  const targetKey = `${targetX},${targetY}`

  if (!visited.includes(targetKey)) {
    return []
  }

  const path = []
  let currentKey = targetKey

  while (currentKey !== `${startX},${startY}`) {
    const parts = currentKey.split(",")
    const x = Number(parts[0])
    const y = Number(parts[1])

    path.unshift([x, y])
    currentKey = cameFrom[currentKey]
  }

  return path
}

function moveDrone() {
  const droneSprite = getFirst(drone)
  const playerSprite = getFirst(player)

  if (!droneSprite || !playerSprite) return

  const path = findPath(
    droneSprite.x,
    droneSprite.y,
    playerSprite.x,
    playerSprite.y
  )

  if (path.length > 0) {
    const nextPosition = path[0]

    droneSprite.x = nextPosition[0]
    droneSprite.y = nextPosition[1]
  }
}

function loadLevel() {
  setMap(levels[level])
}

function restartGame() {
  level = 0
  score = 0
  energy = 20
  gameOver = false
  turnTaken = false

  loadLevel()
  updateEnergy()
}

loadLevel()
updateEnergy()

setPushables({
  [ player ]: []
})
onInput("w", () => {
  movePlayer(0, -1)
})

onInput("s", () => {
  movePlayer(0, 1)
})

onInput("a", () => {
  movePlayer(-1, 0)
})

onInput("d", () => {
  movePlayer(1, 0)
})

onInput("i", () => {
  if (!gameOver) return

  restartGame()
})

afterInput(() => {
  if (gameOver) return

  if (!turnTaken) return

  const batteries = tilesWith(battery, player)

  if (batteries.length > 0) {
    energy += 10

    for (const tile of batteries) {
      for (const sprite of tile) {
        if (sprite.type === battery) {
          sprite.remove()
        }
      }
    }
  }

  if (energy <= 0) {
    updateEnergy()
    return
  }

  moveDrone()

  if (tilesWith(drone, player).length > 0) {
    gameOver = true
    clearText()

    addText("CAUGHT!", {
      x: 6,
      y: 2
    })

    addText("press I to RESTART", {
      x: 1,
      y: 13
    })

    return
  }

  updateEnergy()

  if (tilesWith(exit, player).length > 0) {
    score += 1
    level += 1

    if (level >= levels.length) {
      level = 0
    }

    energy = 20
    loadLevel()
    updateEnergy()
  }

  turnTaken = false
})
