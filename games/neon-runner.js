/*
@title: Neon Runner
@author: harveywhite444-hash
@description: Collect data chips, avoid enemies, and defeat the core.
@tags: ["action", "adventure"]
@addedOn: 2026-09-16
*/
const p = "p"
const w = "w"
const d = "d"
const k = "k"
const e = "e"
const b = "b"

let level = 0
let hp = 3
let score = 0
let bossHP = 5
let gameOver = false

setLegend(
  [p, bitmap`
................
................
.....333333.....
....33333333....
...3333333333...
...3333333333...
....33333333....
.....333333.....
................
................
................
................
................
................
................
................`],

  [w, bitmap`
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

  [d, bitmap`
5555555555555555
5..............5
5....555555....5
5...55....55...5
5...5......5...5
5...5......5...5
5...5......5...5
5...5......5...5
5...5......5...5
5...55....55...5
5....555555....5
5..............5
5555555555555555
................
................
................`],

  [k, bitmap`
................
.......4........
......444.......
.....44444......
....4444444.....
.....44444......
......444.......
.......4........
................
................
................
................
................
................
................
................`],

  [e, bitmap`
................
....33333333....
...33......33...
..33..3333..33..
..33..3333..33..
...33......33...
....33333333....
................
................
................
................
................
................
................
................
................`],

  [b, bitmap`
................
....66666666....
...6666666666...
..666..66..666..
..666..66..666..
..666666666666..
...6666666666...
....66666666....
................
................
................
................
................
................
................`]
)

setSolids([w])

const level1 = map`
wwwwwwwwwwww
wp.........w
w..k.......w
w....www...w
w..........w
w..e.......w
w......k...w
w..........w
w....www...w
w.........dw
w..........w
wwwwwwwwwwww`

const level2 = map`
wwwwwwwwwwww
wp....k....w
w..www.....w
w..........w
w...e......w
w..........w
w..www.....w
w.k......e.w
w..........w
w..........w
w.........dw
wwwwwwwwwwww`

const level3 = map`
wwwwwwwwwwww
wp.........w
w..........w
w..www.....w
w..w.......w
w..w.b.....w
w..w.......w
w..www.....w
w..k.......w
w....e...k.w
w.........dw
wwwwwwwwwwww`

function updateHUD() {
  clearText()

  let health = ""

  if (hp >= 1) {
    health = health + "|"
  }

  if (hp >= 2) {
    health = health + "|"
  }

  if (hp >= 3) {
    health = health + "|"
  }

  addText("LV" + (level + 1), {
    x: 1,
    y: 0,
    color: color`4`
  })

  addText("HP:" + health, {
    x: 5,
    y: 0,
    color: color`3`
  })

  addText("S:" + score, {
    x: 11,
    y: 0,
    color: color`4`
  })

  if (level == 2) {
    addText("CORE:" + bossHP, {
      x: 1,
      y: 1,
      color: color`6`
    })
  }
}

function isWall(x, y) {
  if (x < 0) {
    return true
  }

  if (y < 0) {
    return true
  }

  if (x > 11) {
    return true
  }

  if (y > 11) {
    return true
  }

  const tiles = getTile(x, y)

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].type == w) {
      return true
    }
  }

  return false
}

function movePlayer(dx, dy) {
  if (gameOver) {
    return
  }

  const player = getFirst(p)

  const nx = player.x + dx
  const ny = player.y + dy

  if (!isWall(nx, ny)) {
    player.x = nx
    player.y = ny
  }
}

function hurtPlayer() {
  hp = hp - 1

  if (hp <= 0) {
    gameOver = true

    clearText()

    addText("GAME OVER", {
      x: 3,
      y: 5,
      color: color`3`
    })

    addText("PRESS L", {
      x: 4,
      y: 7,
      color: color`4`
    })

    return true
  }

  updateHUD()
  return false
}

function collectData() {
  const player = getFirst(p)
  const chips = getAll(k)

  for (let i = 0; i < chips.length; i++) {
    const chip = chips[i]

    if (
      player.x == chip.x &&
      player.y == chip.y
    ) {
      chip.remove()
      score = score + 100
    }
  }
}

function checkEnemyHit() {
  const player = getFirst(p)
  const enemies = getAll(e)

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]

    if (
      player.x == enemy.x &&
      player.y == enemy.y
    ) {
      enemy.remove()

      if (hurtPlayer()) {
        return
      }
    }
  }
}

function enemyCanMove(x, y) {
  if (isWall(x, y)) {
    return false
  }

  return true
}

function moveEnemies() {
  if (gameOver) {
    return
  }

  const player = getFirst(p)
  const enemies = getAll(e)

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]

    let dx = 0
    let dy = 0

    if (enemy.x < player.x) {
      dx = 1
    }

    if (enemy.x > player.x) {
      dx = -1
    }

    if (enemy.y < player.y) {
      dy = 1
    }

    if (enemy.y > player.y) {
      dy = -1
    }

    let moved = false

    if (
      Math.abs(player.x - enemy.x) >=
      Math.abs(player.y - enemy.y)
    ) {
      if (enemyCanMove(enemy.x + dx, enemy.y)) {
        enemy.x = enemy.x + dx
        moved = true
      }

      if (!moved) {
        if (enemyCanMove(enemy.x, enemy.y + dy)) {
          enemy.y = enemy.y + dy
        }
      }
    } else {
      if (enemyCanMove(enemy.x, enemy.y + dy)) {
        enemy.y = enemy.y + dy
        moved = true
      }

      if (!moved) {
        if (enemyCanMove(enemy.x + dx, enemy.y)) {
          enemy.x = enemy.x + dx
        }
      }
    }

    if (
      enemy.x == player.x &&
      enemy.y == player.y
    ) {
      if (hurtPlayer()) {
        return
      }
    }
  }

  updateHUD()
}

function checkDoor() {
  if (gameOver) {
    return
  }

  const player = getFirst(p)
  const doors = getAll(d)

  for (let i = 0; i < doors.length; i++) {
    const door = doors[i]

    if (
      player.x == door.x &&
      player.y == door.y
    ) {

      if (getAll(k).length > 0) {
        clearText()

        addText("DATA LEFT", {
          x: 3,
          y: 5,
          color: color`3`
        })

        addText("FIND IT ALL", {
          x: 2,
          y: 7,
          color: color`4`
        })

        return
      }

      if (level == 0) {
        level = 1
        setMap(level2)
        updateHUD()
        return
      }

      if (level == 1) {
        level = 2
        bossHP = 5
        setMap(level3)
        updateHUD()
        return
      }

      if (level == 2) {

        if (bossHP > 0) {
          clearText()

          addText("CORE ALIVE", {
            x: 2,
            y: 5,
            color: color`3`
          })

          addText("ATTACK IT", {
            x: 3,
            y: 7,
            color: color`6`
          })

          return
        }

        gameOver = true

        clearText()

        addText("HEIST DONE", {
          x: 2,
          y: 5,
          color: color`4`
        })

        addText("SCORE:" + score, {
          x: 3,
          y: 7,
          color: color`5`
        })
      }
    }
  }
}

setMap(level1)

updateHUD()

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

onInput("j", () => {
  if (gameOver) {
    return
  }

  const player = getFirst(p)
  const enemies = getAll(e)

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]

    if (
      Math.abs(player.x - enemy.x) <= 1 &&
      Math.abs(player.y - enemy.y) <= 1
    ) {
      enemy.remove()
      score = score + 150
    }
  }

  const bosses = getAll(b)

  for (let i = 0; i < bosses.length; i++) {
    const boss = bosses[i]

    if (
      Math.abs(player.x - boss.x) <= 1 &&
      Math.abs(player.y - boss.y) <= 1
    ) {
      bossHP = bossHP - 1
      score = score + 50

      if (bossHP <= 0) {
        boss.remove()
        score = score + 500
      }
    }
  }

  updateHUD()
})

onInput("i", () => {
  checkDoor()
})

onInput("k", () => {
  level = 0
  hp = 3
  score = 0
  bossHP = 5
  gameOver = false

  setMap(level1)
  updateHUD()
})

onInput("l", () => {
  level = 0
  hp = 3
  score = 0
  bossHP = 5
  gameOver = false

  setMap(level1)
  updateHUD()
})

afterInput(() => {
  if (gameOver) {
    return
  }

  collectData()
  checkEnemyHit()
  updateHUD()
})

setInterval(() => {
  moveEnemies()
}, 700)
