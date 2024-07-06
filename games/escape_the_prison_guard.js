/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Escape the Prison Guard
@author: Stefan Lighezan
@tags: [game, maze, escape]
@addedOn: 2024-07-02

How to Play:

You are a banana trying to escape a guard in your attempt to escape prison. Outmanuever the guard using WASD. For every move you make, the guard makes one too. Get to the door and try and get the largest score (most floors escaped)
Press J to restart the level if it is impossible to beat.
*/


const player = "p"
const goal = "g"
const wall = "w"
const enemy = "e"

let score = 0
let scoreText = ""

function createScoreText() {
  scoreText = addText(`Score: ${score}`, 8, 8, 6)
}

function updateScoreText() {
  clearText()
  scoreText = addText(`Score: ${score}`, 8, 8, 6)
}



setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [goal, bitmap`
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
C66CCCCCCCCCC...
C66CCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...
CCCCCCCCCCCCC...`],
  [wall, bitmap`
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
0000000000000000`],
  [enemy, bitmap`
................
....666666......
..6666666666....
.333666666633...
.666336663366...
.666666666666...
.666666666666...
.666666666666...
.666633336666...
.666366663666...
..6666666666....
..6666666666....
....666666......
................
................
................`])
setSolids([wall, player])

let level = 0
const levels = [
  map`
........
........
........
........
........
........
......p.
........`
]

let enemySprite
let goalGlobal

function spawnGoal() {
  let goalX, goalY
  do {
    const edges = [
      { x: 0, y: Math.floor(Math.random() * height()) }, // Left edge
      { x: width() - 1, y: Math.floor(Math.random() * height()) }, // Right edge
      { x: Math.floor(Math.random() * width()), y: 0 }, // Top edge
      { x: Math.floor(Math.random() * width()), y: height() - 1 } // Bottom edge
    ]
    const edge = edges[Math.floor(Math.random() * edges.length)]
    goalX = edge.x
    goalY = edge.y
  } while (goalX === getFirst(player).x && goalY === getFirst(player).y)

  addSprite(goalX, goalY, goal)
  addSprite(goalX, goalY, enemy)
  updateScoreText()
  enemySprite = getFirst(enemy)
  goalGlobal = getFirst(goal)
}

function spawnWalls(numWalls) {
  for (let i = 0; i < numWalls; i++) {
    let wallX, wallY
    do {
      wallX = Math.floor(Math.random() * width())
      wallY = Math.floor(Math.random() * height())
    } while (getTile(wallX, wallY).some(sprite => sprite.type !== undefined)) // Ensure no overlap with existing sprites

    addSprite(wallX, wallY, wall)
  }
}



setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  movePlayer(0, 1)
})


onInput("w", () => {
  movePlayer(0, -1)
})

onInput("a", () => {
  movePlayer(-1, 0)
})

onInput("d", () => {
  movePlayer(1, 0)
})

onInput("j", () => {
  restartGame()
})

afterInput(() => {
  if (enemySprite) {
    moveEnemyTowardsPlayer()
    checkCollision()
  }
})

function movePlayer(dx, dy) {
  const playerSprite = getFirst(player)
  playerSprite.x += dx
  playerSprite.y += dy
}

function moveEnemyTowardsPlayer() {
  const playerSprite = getFirst(player)
  const currentX = enemySprite.x
  const currentY = enemySprite.y

  let nextX = currentX
  let nextY = currentY

  if (enemySprite.x < playerSprite.x) {
    nextX = currentX + 1
  } else if (enemySprite.x > playerSprite.x) {
    nextX = currentX - 1
  } else if (enemySprite.y < playerSprite.y) {
    nextY = currentY + 1
  } else if (enemySprite.y > playerSprite.y) {
    nextY = currentY - 1
  }


  const nextTile = getTile(nextX, nextY)
  if (nextTile.some(sprite => sprite.type === wall)) {
    return
  }

  enemySprite.x = nextX
  enemySprite.y = nextY
}

function checkCollision() {
  const playerSprite = getFirst(player)
  if (playerSprite.x === enemySprite.x && playerSprite.y === enemySprite.y) {
    score = 0
    updateScoreText()
    restartGame()
  } else if (playerSprite.x === goalGlobal.x && playerSprite.y === goalGlobal.y) {
    score++
    updateScoreText()
    restartGame()
  }
}

function restartGame() {
  removeAllSprites()
  setMap(levels[level])
  spawnGoal()
  spawnWalls(12)
  spawnPlayerAtRandomPosition()


  enemySprite.x = goalGlobal.x
  enemySprite.y = goalGlobal.y
}

function removeAllSprites() {

  const allSprites = getAll()


  allSprites.forEach(sprite => {
    sprite.remove()
  })
}

function spawnPlayerAtRandomPosition() {
  const playerSprite = getFirst(player)
  let playerX, playerY
  do {
    playerX = Math.floor(Math.random() * width())
    playerY = Math.floor(Math.random() * height())
  } while (getTile(playerX, playerY).some(sprite => sprite.type !== undefined))
  playerSprite.x = playerX
  playerSprite.y = playerY
}


restartGame()