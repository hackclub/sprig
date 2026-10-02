/*
@title: SKY STRIKE
@description: Arcade plane shooter
@author: Adan
@tags: ['shooter', 'plane']
*/

const player = "p"
const enemy = "e"
const laser = "l"
const sky = "s"

setLegend(
  [sky, bitmap`
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
1111111111111111`],

  [player, bitmap`
................
................
.......3........
......333.......
.....33333......
....3333333.....
...333333333....
..33333333333...
...333333333....
....3333333.....
.....33333......
......333.......
.....33.33......
....33...33.....
................
................`],

  [enemy, bitmap`
................
................
.......5........
......555.......
.....55555......
....5555555.....
...555555555....
..55555555555...
...555555555....
....5555555.....
.....55555......
......555.......
.......5........
......5.5.......
................
................`],

  [laser, bitmap`
................
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
.......3........
................
................
................
................`]
)

setBackground(sky)

setMap(map`
..........
..........
..........
..........
..........
..........
..........
....p.....`)

let score = 0
let lives = 3
let gameOver = false

let enemyTimer = 0
let enemyMoveTimer = 0
let scoreTimer = 0

function hud() {
  clearText()

  addText("SCORE " + score, {
    x: 1,
    y: 1,
    color: color`3`
  })

  addText("LIVES " + lives, {
    x: 1,
    y: 2,
    color: color`3`
  })
}

function gameOverScreen() {
  gameOver = true

  clearText()

  addText("GAME OVER", {
    x: 6,
    y: 6,
    color: color`5`
  })

  addText("SCORE " + score, {
    x: 6,
    y: 8,
    color: color`3`
  })

  addText("PRESS J", {
    x: 7,
    y: 10,
    color: color`3`
  })
}

function loseLife() {
  lives--

  if (lives <= 0) {
    gameOverScreen()
  } else {
    hud()
  }
}

onInput("w", () => {
  if (gameOver) return

  const p = getFirst(player)

  if (p && p.y > 0) {
    p.y -= 1
  }
})

onInput("a", () => {
  if (gameOver) return

  const p = getFirst(player)

  if (p && p.x > 0) {
    p.x -= 1
  }
})

onInput("s", () => {
  if (gameOver) return

  const p = getFirst(player)

  if (p && p.y < height() - 1) {
    p.y += 1
  }
})

onInput("d", () => {
  if (gameOver) return

  const p = getFirst(player)

  if (p && p.x < width() - 1) {
    p.x += 1
  }
})

onInput("i", () => {
  if (gameOver) return

  const p = getFirst(player)

  if (p && p.y > 0) {
    addSprite(p.x, p.y - 1, laser)
  }
})

onInput("j", () => {
  location.reload()
})

function moveLasers() {
  getAll(laser).forEach(l => {
    if (l.y <= 0) {
      l.remove()
    } else {
      l.y -= 1
    }
  })
}

function moveEnemies() {
  enemyMoveTimer++

  if (enemyMoveTimer < 5) return

  enemyMoveTimer = 0

  getAll(enemy).forEach(e => {
    if (e.y < height() - 1) {
      e.y += 1
    } else {
      e.remove()
      loseLife()
    }
  })
}

function checkHits() {
  getAll(laser).forEach(l => {
    getAll(enemy).forEach(e => {

      if (l.x === e.x && l.y === e.y) {
        l.remove()
        e.remove()

        score += 25
        hud()
      }

    })
  })

  const p = getFirst(player)

  if (!p) return

  getAll(enemy).forEach(e => {

    if (p.x === e.x && p.y === e.y) {
      e.remove()
      loseLife()
    }

  })
}

function gameLoop() {
  if (gameOver) return

  moveLasers()
  moveEnemies()
  checkHits()

  enemyTimer++

  if (enemyTimer >= 16) {
    enemyTimer = 0
    addSprite(
      Math.floor(Math.random() * width()),
      0,
      enemy
    )
  }

  scoreTimer++

  if (scoreTimer >= 20) {
    scoreTimer = 0
    score += 10
    hud()
  }
}

hud()

setInterval(gameLoop, 150)