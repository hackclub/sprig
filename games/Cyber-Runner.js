/*
@title: CYBER RUNNER
@description: Escape the cyber city, collect energy and dodge enemy drones.
@author: Saurabh
@tags: ['arcade', 'runner', 'cyberpunk']
@addedOn: 2026-09-13
*/

const player = "p"
const enemy = "e"
const energy = "c"
const power = "x"
const wall = "w"
const road = "r"

// =====================================================
// SPRITES
// =====================================================

setLegend(

  [player, bitmap`
................
.....333333.....
....33333333....
...3333333333...
...3303330333...
...3333333333...
....33333333....
.....333333.....
....33333333....
...3333333333...
..33..3333..33..
..33..3333..33..
.....33..33.....
....33....33....
...33......33...
................`],

  [enemy, bitmap`
................
....55555555....
...5555555555...
..555555555555..
..550555550555..
..555555555555..
...5555555555...
....55555555....
.....555555.....
....55555555....
...55..55..55...
..55...55...55..
................
................
................
................`],

  [energy, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
...6666666666...
....66666666....
.....666666.....
......6666......
.....666666.....
................
................
................
................
................
................`],

  [power, bitmap`
................
.....444444.....
....44444444....
...44......44...
..44..4444..44..
..44.444444.44..
..44..4444..44..
...44......44...
....44444444....
.....444444.....
................
................
................
................
................
................`],

  [wall, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],

  [road, bitmap`
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
................
................
................
................
................
................`]
)

// =====================================================
// SOLIDS
// =====================================================

setSolids([player, wall])

// =====================================================
// MAP
// =====================================================

const gameMap = map`
wwwwwwwwwwww
w..........w
w..........w
w..........w
w..........w
w.....c....w
w..........w
w.....p....w
w..........w
w..........w
w.....x....w
wwwwwwwwwwww`

setMap(gameMap)

// =====================================================
// GAME VARIABLES
// =====================================================

let score = 0
let energyCount = 0
let hp = 3
let turn = 0
let difficulty = 0
let gameOver = false
let invincible = 0

// =====================================================
// UI
// =====================================================

function showUI() {

  clearText()

  addText("CYBER RUNNER", {
    x: 1,
    y: 0,
    color: color`3`
  })

  addText("SCORE " + score, {
    x: 1,
    y: 1,
    color: color`6`
  })

  addText("ENERGY " + energyCount, {
    x: 1,
    y: 2,
    color: color`4`
  })

  addText("HP " + hp, {
    x: 12,
    y: 1,
    color: color`5`
  })
}

// =====================================================
// RANDOM POSITION
// =====================================================

function randomX() {
  return 2 + Math.floor(Math.random() * 8)
}

function randomY() {
  return 2 + Math.floor(Math.random() * 8)
}

// =====================================================
// SPAWN ENERGY
// =====================================================

function spawnEnergy() {

  addSprite(
    randomX(),
    randomY(),
    energy
  )
}

// =====================================================
// SPAWN ENEMY
// =====================================================

function spawnEnemy() {

  addSprite(
    randomX(),
    randomY(),
    enemy
  )
}

// =====================================================
// SPAWN POWER-UP
// =====================================================

function spawnPower() {

  addSprite(
    randomX(),
    randomY(),
    power
  )
}

// =====================================================
// MOVE ENEMIES
// =====================================================

function moveEnemies() {

  const enemies = getAll(enemy)
  const p = getFirst(player)

  if (p == null) {
    return
  }

  enemies.forEach(e => {

    if (e.x < p.x) {
      e.x += 1
    }

    if (e.x > p.x) {
      e.x -= 1
    }

    if (e.y < p.y) {
      e.y += 1
    }

    if (e.y > p.y) {
      e.y -= 1
    }

  })
}

// =====================================================
// PLAYER MOVEMENT
// =====================================================

function movePlayer(direction) {

  if (gameOver) {
    return
  }

  const p = getFirst(player)

  if (p == null) {
    return
  }

  if (direction == "w") {
    p.y -= 1
  }

  if (direction == "a") {
    p.x -= 1
  }

  if (direction == "s") {
    p.y += 1
  }

  if (direction == "d") {
    p.x += 1
  }
}

// =====================================================
// COLLECT ENERGY
// =====================================================

function collectEnergy() {

  const tiles = tilesWith(player, energy)

  if (tiles.length == 0) {
    return
  }

  tiles.forEach(tile => {

    const sprites = getTile(tile[0].x, tile[0].y)

    sprites.forEach(s => {

      if (s.type == energy) {
        s.remove()
      }

    })

  })

  energyCount += 1
  score += 25
}

// =====================================================
// COLLECT POWER-UP
// =====================================================

function collectPower() {

  const tiles = tilesWith(player, power)

  if (tiles.length == 0) {
    return
  }

  tiles.forEach(tile => {

    const sprites = getTile(tile[0].x, tile[0].y)

    sprites.forEach(s => {

      if (s.type == power) {
        s.remove()
      }

    })

  })

  hp += 1
  score += 50
}

// =====================================================
// ENEMY COLLISION
// =====================================================

function enemyCollision() {

  if (invincible > 0) {
    return
  }

  const collision = tilesWith(player, enemy)

  if (collision.length == 0) {
    return
  }

  hp -= 1
  invincible = 5

  const enemies = getAll(enemy)

  enemies.forEach(e => {
    e.remove()
  })

  if (hp <= 0) {
    endGame()
  }
}

// =====================================================
// GAME OVER
// =====================================================

function endGame() {

  gameOver = true

  clearText()

  addText("GAME OVER", {
    x: 3,
    y: 3,
    color: color`5`
  })

  addText("SCORE " + score, {
    x: 3,
    y: 5,
    color: color`6`
  })

  addText("ENERGY " + energyCount, {
    x: 3,
    y: 7,
    color: color`4`
  })

  addText("PRESS J", {
    x: 3,
    y: 9,
    color: color`3`
  })
}

// =====================================================
// RESTART
// =====================================================

function restartGame() {

  setMap(gameMap)

  score = 0
  energyCount = 0
  hp = 3
  turn = 0
  difficulty = 0
  invincible = 0
  gameOver = false

  spawnEnergy()
  spawnEnergy()
  spawnEnergy()

  showUI()
}

// =====================================================
// CONTROLS
// =====================================================

onInput("w", () => {
  movePlayer("w")
})

onInput("a", () => {
  movePlayer("a")
})

onInput("s", () => {
  movePlayer("s")
})

onInput("d", () => {
  movePlayer("d")
})

onInput("j", () => {
  restartGame()
})

// =====================================================
// GAME UPDATE
// =====================================================

afterInput(() => {

  if (gameOver) {
    return
  }

  turn += 1
  score += 1

  if (invincible > 0) {
    invincible -= 1
  }

  // Collect items
  collectEnergy()
  collectPower()

  // Enemies move
  if (turn % 2 == 0) {
    moveEnemies()
  }

  // Check collision
  enemyCollision()

  if (gameOver) {
    return
  }

  // Spawn energy
  if (turn % 4 == 0) {
    spawnEnergy()
  }

  // Spawn enemies
  if (turn % 8 == 0) {
    spawnEnemy()
  }

  // Spawn power-up
  if (turn % 30 == 0) {
    spawnPower()
  }

  // Increase difficulty
  if (turn % 25 == 0) {
    difficulty += 1
  }

  showUI()
})

// =====================================================
// START
// =====================================================

restartGame()