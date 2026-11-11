/*
@title: Lawnmower
@description: Mow the lawn, avoid the rocks, and survive all four levels!
@author: Aarnav Verma
@tags: ['zen', 'satisfying']
@addedOn: 2026-10-03
*/

const darkGrass = "g"
const lightGrass = "l"
const cutGrass = "c"
const lawnmower = "m"
const rock = "r"

setLegend(
  [lawnmower, bitmap`
................
..........0.....
.........00.....
........0.0.....
........0.0.....
...00...0000....
...066..666666..
..066666666666..
..066666666666..
.0006666666600..
.00066666666000.
.00006666660000.
..000......000..
..000......000..
...0........0...
................`],

  [rock, bitmap`
................
................
................
................
......1111......
....11111111....
...1111111111...
..111111111111..
..111111111111..
..111111111111..
...1111111111...
....11111111....
......1111......
................
................
................`],

  [darkGrass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],

  [lightGrass, bitmap`
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
4444444444444444`],

  [cutGrass, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)

const mowSound = tune`
94.9367088607595: C4^94.9367088607595,
94.9367088607595: G4^94.9367088607595,
2848.1012658227846`

const lostSound = tune`
100: G4~100,
100: E4~100,
100: C4~100,
2900`

const winSound = tune`
100: C4^100,
100: E4^100,
100: G4^100,
100: C5^100,
2800`

let level = 1
let lawnsThisLevel = 0
let gameOver = false
let gameWon = false
let gameStarted = false
let levelWarning = false
let moveCount = 0

const levels = [
  map`
gggg
gggg
gggg
gggg`
]

setMap(levels[0])

addSprite(3, 3, lawnmower)
spawnRocks(1)
showStartScreen()

function showStartScreen() {
  clearText()

  addText("LAWNMOWER", {
    x: 5,
    y: 3,
    color: color`4`
  })

  addText("WASD = Move", {
    x: 4,
    y: 6,
    color: color`0`
  })

  addText("Mow grass twice", {
    x: 2,
    y: 8,
    color: color`0`
  })

  addText("Avoid the rocks!", {
    x: 2,
    y: 10,
    color: color`3`
  })

  addText("I = Start", {
    x: 5,
    y: 13,
    color: color`0`
  })
}

function showLevel() {
  clearText()

  addText("Level = " + level + "/4", {
    x: 3,
    y: 1,
    color: color`0`
  })
}

function showLevel3Warning() {
  levelWarning = true
  clearText()

  addText("LEVEL 3!", {
    x: 6,
    y: 4,
    color: color`4`
  })

  addText("ROCKS CAN MOVE!", {
    x: 2,
    y: 7,
    color: color`3`
  })

  addText("Every 5 moves", {
    x: 3,
    y: 9,
    color: color`0`
  })

  addText("I = Continue", {
    x: 4,
    y: 12,
    color: color`0`
  })
}

function showLevel4Warning() {
  levelWarning = true
  clearText()

  addText("FINAL LEVEL!", {
    x: 4,
    y: 4,
    color: color`4`
  })

  addText("3 MOVING ROCKS!", {
    x: 2,
    y: 7,
    color: color`3`
  })

  addText("Every 3 moves", {
    x: 3,
    y: 9,
    color: color`0`
  })

  addText("I = Continue", {
    x: 4,
    y: 12,
    color: color`0`
  })
}

function getRockCount() {
  if (level === 1) {
    return 1
  }

  if (level === 2) {
    return 2
  }

  if (level === 3) {
    return 2
  }

  return 3
}

function spawnRocks(amount) {
  const mower = getFirst(lawnmower)

  for (let i = 0; i < amount; i++) {
    let rockX = Math.floor(Math.random() * 4)
    let rockY = Math.floor(Math.random() * 4)
    let tile = getTile(rockX, rockY)

    while (
      (rockX === mower.x && rockY === mower.y) ||
      tile.some(sprite => sprite.type === rock)
    ) {
      rockX = Math.floor(Math.random() * 4)
      rockY = Math.floor(Math.random() * 4)
      tile = getTile(rockX, rockY)
    }

    addSprite(rockX, rockY, rock)
  }
}

function moveRocks() {
  getAll(rock).forEach(r => {
    r.remove()
  })

  spawnRocks(getRockCount())
}

function restartGame() {
  level = 1
  lawnsThisLevel = 0
  gameOver = false
  gameWon = false
  gameStarted = false
  levelWarning = false
  moveCount = 0

  setMap(levels[0])

  addSprite(3, 3, lawnmower)
  spawnRocks(1)

  showStartScreen()
}

onInput("i", () => {
  if (!gameStarted) {
    gameStarted = true
    showLevel()
    return
  }

  if (levelWarning) {
    levelWarning = false
    moveCount = 0
    showLevel()
  }
})

onInput("s", () => {
  if (gameStarted && !levelWarning && !gameOver && !gameWon) {
    getFirst(lawnmower).y += 1
    moveCount += 1
  }
})

onInput("w", () => {
  if (gameStarted && !levelWarning && !gameOver && !gameWon) {
    getFirst(lawnmower).y -= 1
    moveCount += 1
  }
})

onInput("a", () => {
  if (gameStarted && !levelWarning && !gameOver && !gameWon) {
    getFirst(lawnmower).x -= 1
    moveCount += 1
  }
})

onInput("d", () => {
  if (gameStarted && !levelWarning && !gameOver && !gameWon) {
    getFirst(lawnmower).x += 1
    moveCount += 1
  }
})

onInput("j", () => {
  if (gameOver || gameWon) {
    restartGame()
  }
})

afterInput(() => {
  if (!gameStarted || levelWarning || gameOver || gameWon) {
    return
  }

  const mower = getFirst(lawnmower)
  const tile = getTile(mower.x, mower.y)

  const grass = tile.find(sprite => sprite.type === darkGrass)
  const light = tile.find(sprite => sprite.type === lightGrass)
  const hitRock = tile.find(sprite => sprite.type === rock)

  if (hitRock) {
    gameOver = true

    playTune(lostSound)

    clearText()

    addText("GAME OVER", {
      x: 5,
      y: 6,
      color: color`3`
    })

    addText("J = Restart", {
      x: 5,
      y: 8,
      color: color`3`
    })

    return
  }

  if (grass) {
    grass.type = lightGrass
    playTune(mowSound)
  } else if (light) {
    light.type = cutGrass
    playTune(mowSound)
  }

  if (level === 3 && moveCount >= 5) {
    moveRocks()
    moveCount = 0
  }

  if (level === 4 && moveCount >= 3) {
    moveRocks()
    moveCount = 0
  }

  const rockCount = getRockCount()
  const cutTiles = getAll(cutGrass)

  if (cutTiles.length === 16 - rockCount) {
    lawnsThisLevel += 1

    if (lawnsThisLevel === 2) {
      if (level === 4) {
        gameWon = true

        playTune(winSound)

        clearText()

        addText("YOU WIN!", {
          x: 6,
          y: 6,
          color: color`4`
        })

        addText("J = Restart", {
          x: 5,
          y: 8,
          color: color`0`
        })

        return
      }

      level += 1
      lawnsThisLevel = 0
    }

    moveCount = 0

    getAll(cutGrass).forEach(grass => {
      grass.type = darkGrass
    })

    getAll(lightGrass).forEach(grass => {
      grass.type = darkGrass
    })

    getAll(rock).forEach(r => {
      r.remove()
    })

    spawnRocks(getRockCount())

    if (level === 3 && lawnsThisLevel === 0) {
      showLevel3Warning()
    } else if (level === 4 && lawnsThisLevel === 0) {
      showLevel4Warning()
    } else {
      showLevel()
    }
  }
})
