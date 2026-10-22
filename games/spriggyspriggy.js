/*
@title: Dungeonsnodragons
@author: arsenal4eva
@description: A fun tile-based maze game!
@tags: ['maze', 'puzzle']
@addedOn: 2026-09-17
*/

//Controls: W,A,S,D to move up, down, left, right respectively

const player = "p"
const wall = "w"
const enemy = "e"
const key = "k"
const door = "d"
const coin = "c"
const spike = "s"

setLegend(
  [
    player,
    bitmap`
................
................
.....333333.....
....33333333....
....33333333....
.....333333.....
......3333......
.....333333.....
....33333333....
...3333333333...
...3333333333...
....33....33....
....33....33....
...33......33...
................
................`
  ],

  [
    wall,
    bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLDDDDDDDDDDDDLL
LLDDDDDDDDDDDDLL
LLDDLLLLLLDDDDLL
LLDDLLLLLLDDDDLL
LLDDDDDDDDDDDDLL
LLDDDDDDDDDDDDLL
LLDDDDDDDDDDDDLL
LLDDLLLLLLDDDDLL
LLDDLLLLLLDDDDLL
LLDDDDDDDDDDDDLL
LLDDDDDDDDDDDDLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`
  ],

  [
    enemy,
    bitmap`
................
......4444......
....44444444....
...4444444444...
...44..44..44...
...4444444444...
....44444444....
......4444......
.....444444.....
....44....44....
...44......44...
................
................
................
................
................`
  ],

  [
    key,
    bitmap`
................
................
......666.......
.....6666.......
.....666........
.....666........
.....666........
.....666........
.....666........
.....6666666....
.....6666666....
................
................
................
................
................`
  ],

  [
    door,
    bitmap`
1111111111111111
1111111111111111
111...........11
111...........11
111.....4.....11
111....444....11
111.....4.....11
111...........11
111...........11
111...........11
111...........11
111...........11
111...........11
1111111111111111
1111111111111111
1111111111111111`
  ],

  [
    coin,
    bitmap`
................
................
......5555......
....55555555....
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
....55555555....
......5555......
................
................
................
................`
  ],

  [
    spike,
    bitmap`
................
................
................
................
.......3........
......333.......
.....33333......
....3333333.....
...333333333....
..33333333333...
.3333333333333..
................
................
................
................
................`
  ]
)

let currentLevel = 1
let hasKey = false
let score = 0
let lives = 3

let gameOver = false
let gameWon = false


const level1 = map`
wwwwwwwwwwwwwwww
w.pc...........w
w..............w
w..c.......e...w
w..............w
w....wwww......w
w....w.........w
w....w..c......w
w....w.........w
w....wwww......w
w..............w
w.......e......w
w..............w
w..........k...w
w............d.w
wwwwwwwwwwwwwwww
`

const level2 = map`
wwwwwwwwwwwwwwww
w.pc...........w
w....wwww......w
w....w.........w
w....w.........w
w....w..e......w
w....w.........w
w....wwww......w
w..............w
w..c.......c...w
w..............w
w.......e......w
w..............w
w..........k...w
w............d.w
wwwwwwwwwwwwwwww
`

const level3 = map`
wwwwwwwwwwwwwwww
w.pc...........w
w....wwww......w
w....w.........w
w....w..e......w
w....w.........w
w....w.........w
w....wwww......w
w..............w
w......s.......w
w......s.......w
w..c...s...e...w
w......s.......w
w..........k...w
w............d.w
wwwwwwwwwwwwwwww
`

const level4 = map`
wwwwwwwwwwwwwwww
w.pc...........w
w....ssss......w
w....s.........w
w....s.........w
w....s....e....w
w....s.........w
w....ssss......w
w..............w
w..c...........w
w..............w
w.......e......w
w..............w
w..........k...w
w............d.w
wwwwwwwwwwwwwwww
`

const level5 = map`
wwwwwwwwwwwwwwww
w.pc..e........w
w..............w
w..c.......e...w
w....wwww......w
w....w.........w
w....w..s......w
w....w..s......w
w....wwww......w
w..............w
w..e.......c...w
w..............w
w.......e..k...w
w..............w
w............d.w
wwwwwwwwwwwwwwww
`

function loadLevel() {
  hasKey = false

  if (currentLevel === 1) {
    setMap(level1)
  }

  if (currentLevel === 2) {
    setMap(level2)
  }

  if (currentLevel === 3) {
    setMap(level3)
  }

  if (currentLevel === 4) {
    setMap(level4)
  }

  if (currentLevel === 5) {
    setMap(level5)
  }

  updateUI()
}

function updateUI() {
  clearText()

  if (gameOver) {
    addText("GAME OVER", {
      x: 6,
      y: 5,
      color: color`3`
    })

    addText("SCORE: " + score, {
      x: 6,
      y: 7,
      color: color`5`
    })

    addText("PRESS J", {
      x: 7,
      y: 9,
      color: color`6`
    })

    return
  }

  if (gameWon) {
    addText("YOU WIN!", {
      x: 6,
      y: 5,
      color: color`6`
    })

    addText("SCORE: " + score, {
      x: 6,
      y: 7,
      color: color`5`
    })

    addText("PRESS J", {
      x: 7,
      y: 9,
      color: color`3`
    })

    return
  }

  addText("LEVEL " + currentLevel, {
    x: 1,
    y: 0,
    color: color`6`
  })

  addText("KEY:" + (hasKey ? "YES" : "NO"), {
    x: 6,
    y: 0,
    color: color`6`
  })

  addText("LIVES:" + lives, {
    x: 1,
    y: 1,
    color: color`3`
  })

  addText("SCORE:" + score, {
    x: 9,
    y: 1,
    color: color`5`
  })
}


onInput("w", () => {
  if (gameOver || gameWon) return

  const p = getFirst(player)

  if (p) {
    p.y -= 1
  }
})

onInput("s", () => {
  if (gameOver || gameWon) return

  const p = getFirst(player)

  if (p) {
    p.y += 1
  }
})

onInput("a", () => {
  if (gameOver || gameWon) return

  const p = getFirst(player)

  if (p) {
    p.x -= 1
  }
})

onInput("d", () => {
  if (gameOver || gameWon) return

  const p = getFirst(player)

  if (p) {
    p.x += 1
  }
})

onInput("j", () => {
  if (!gameOver && !gameWon) return

  currentLevel = 1
  hasKey = false
  score = 0
  lives = 3
  gameOver = false
  gameWon = false

  loadLevel()
})

afterInput(() => {
  if (gameOver || gameWon) return

  checkCoins()
  checkKey()
  checkSpikes()
  checkEnemies()
  checkDoor()

  if (!gameOver && !gameWon) {
    moveEnemies()
  }

  updateUI()
})


function checkCoins() {
  const p = getFirst(player)

  if (!p) return

  const coins = getAll(coin)

  for (const c of coins) {
    if (p.x === c.x && p.y === c.y) {
      score += 10
      c.remove()
    }
  }
}


function checkKey() {
  const p = getFirst(player)

  if (!p) return

  const keys = getAll(key)

  for (const k of keys) {
    if (p.x === k.x && p.y === k.y) {
      hasKey = true
      score += 100
      k.remove()
    }
  }
}


function checkSpikes() {
  const p = getFirst(player)

  if (!p) return

  const spikes = getAll(spike)

  for (const s of spikes) {
    if (p.x === s.x && p.y === s.y) {
      loseLife()
      return
    }
  }
}


function checkEnemies() {
  const p = getFirst(player)

  if (!p) return

  const enemies = getAll(enemy)

  for (const e of enemies) {
    if (p.x === e.x && p.y === e.y) {
      loseLife()
      return
    }
  }
}

function loseLife() {
  lives -= 1

  if (lives <= 0) {
    gameOver = true
    updateUI()
    return
  }

  const p = getFirst(player)

  if (p) {
    p.x = 2
    p.y = 2
  }
}


function checkDoor() {
  const p = getFirst(player)

  if (!p) return

  const doors = getAll(door)

  for (const d of doors) {
    if (p.x === d.x && p.y === d.y) {

      if (!hasKey) {
        return
      }

      if (currentLevel < 5) {
        score += 50
        currentLevel += 1

        loadLevel()
      } else {
        score += 500
        gameWon = true

        updateUI()
      }
    }
  }
}


function moveEnemies() {

  const enemies = getAll(enemy)

  for (const e of enemies) {

    // Random direction
    const direction = Math.floor(Math.random() * 4)

    let newX = e.x
    let newY = e.y

    if (direction === 0) {
      newX += 1
    }

    if (direction === 1) {
      newX -= 1
    }

    if (direction === 2) {
      newY += 1
    }

    if (direction === 3) {
      newY -= 1
    }

    // Keep enemies inside the level
    if (newX <= 0 || newX >= 15) {
      continue
    }

    if (newY <= 0 || newY >= 15) {
      continue
    }

    // Don't move onto walls
    if (tilesWith(wall).some(tile =>
      tile.x === newX && tile.y === newY
    )) {
      continue
    }

    // Don't move onto another enemy
    if (enemies.some(other =>
      other !== e &&
      other.x === newX &&
      other.y === newY
    )) {
      continue
    }

    e.x = newX
    e.y = newY
  }

  // Check if an enemy moved onto player
  checkEnemies()
}


loadLevel()
