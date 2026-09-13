/*
@title: CYBER RUNNER
@description: Run through the cyber city, collect energy, dodge drones and survive.
@author: Saurabh
@tags: ['runner', 'cyberpunk', 'arcade']
@addedOn: 2026-09-13
*/

// =====================================================
// SPRITES
// =====================================================

const player = "p"
const enemy = "e"
const energy = "c"
const wall = "w"
const road = "r"
const building = "b"
const power = "x"
const finish = "f"

// =====================================================
// SPRITE ART
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
...3333333333...
..333333333333..
..33..3333..33..
..33..3333..33..
.....333333.....
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
................`],

  [wall, bitmap`
1111111111111111
1111111111111111
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1122222222222211
1111111111111111
1111111111111111`],

  [building, bitmap`
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

  [finish, bitmap`
................
....44444444....
...44......44...
..44..4444..44..
..44.44..44.44..
..44.44..44.44..
..44..4444..44..
...44......44...
....44444444....
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

setSolids([player, enemy, wall, building])

// =====================================================
// LEVEL
// =====================================================

const level = map`
wwwwwwwwwwww
w..........w
w..........w
w..........w
w....c.....w
w..........w
w..p.......w
w..........w
w..........w
w..........w
w..........w
wwwwwwwwwwww`

setMap(level)

// =====================================================
// VARIABLES
// =====================================================

let score = 0
let distance = 0
let lives = 3
let speed = 0
let gameOver = false
let gameWon = false

// =====================================================
// GAME TEXT
// =====================================================

function showInfo() {

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

  addText("ENERGY " + distance, {
    x: 1,
    y: 2,
    color: color`4`
  })

  addText("HP " + lives, {
    x: 12,
    y: 1,
    color: color`5`
  })
}

// =====================================================
// MOVE PLAYER
// =====================================================

function movePlayer(direction) {

  if (gameOver || gameWon) {
    return
  }

  const p = getFirst(player)

  if (p == null) {
    return
  }

  if (direction == "w") {
    p.y -= 1
  }

  if (direction == "s") {
    p.y += 1
  }

  if (direction == "a") {
    p.x -= 1
  }

  if (direction == "d") {
    p.x += 1
  }
}

// =====================================================
// COLLECT ENERGY
// =====================================================

function collectEnergy() {

  const items = tilesWith(player, energy)

  if (items.length > 0) {

    items.forEach(tile => {

      const itemsOnTile = getTile(tile[0].x, tile[0].y)

      itemsOnTile.forEach(sprite => {

        if (sprite.type == energy) {
          sprite.remove()
        }

      })

    })

    score += 10
    distance += 1

  }
}

// =====================================================
// POWER-UP
// =====================================================

function collectPower() {

  const items = tilesWith(player, power)

  if (items.length > 0) {

    items.forEach(tile => {

      const itemsOnTile = getTile(tile[0].x, tile[0].y)

      itemsOnTile.forEach(sprite => {

        if (sprite.type == power) {
          sprite.remove()
        }

      })

    })

    lives += 1

  }
}

// =====================================================
// ENEMY HIT
// =====================================================

function checkEnemy() {

  const collision = tilesWith(player, enemy)

  if (collision.length > 0) {

    lives -= 1

    const enemies = getAll(enemy)

    enemies.forEach(e => {
      e.remove()
    })

    if (lives <= 0) {

      gameOver = true

      clearText()

      addText("SYSTEM FAILURE", {
        x: 2,
        y: 4,
        color: color`5`
      })

      addText("SCORE " + score, {
        x: 3,
        y: 6,
        color: color`6`
      })

      addText("PRESS J", {
        x: 3,
        y: 8,
        color: color`3`
      })

    }
  }
}

// =====================================================
// SPAWN ENERGY
// =====================================================

function spawnEnergy() {

  const x = 2 + Math.floor(Math.random() * 8)
  const y = 2 + Math.floor(Math.random() * 7)

  addSprite(x, y, energy)
}

// =====================================================
// SPAWN ENEMY
// =====================================================

function spawnEnemy() {

  const x = 2 + Math.floor(Math.random() * 8)
  const y = 2 + Math.floor(Math.random() * 7)

  addSprite(x, y, enemy)
}

// =====================================================
// RANDOM POWER-UP
// =====================================================

function spawnPower() {

  const x = 2 + Math.floor(Math.random() * 8)
  const y = 2 + Math.floor(Math.random() * 7)

  addSprite(x, y, power)
}

// =====================================================
// RESTART
// =====================================================

function restartGame() {

  setMap(level)

  score = 0
  distance = 0
  lives = 3
  speed = 0

  gameOver = false
  gameWon = false

  showInfo()
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

  if (gameOver || gameWon) {
    return
  }

  collectEnergy()

  collectPower()

  checkEnemy()

  score += 1

  speed += 1

  // Spawn energy regularly
  if (speed % 5 == 0) {
    spawnEnergy()
  }

  // Spawn enemies increasingly often
  if (speed % 8 == 0) {
    spawnEnemy()
  }

  // Spawn power-ups
  if (speed % 25 == 0) {
    spawnPower()
  }

  // Increase difficulty
  if (speed > 100) {
    lives = Math.max(1, lives)
  }

  showInfo()

})

// =====================================================
// START
// =====================================================

restartGame()