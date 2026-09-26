/*
@title: Crystal Escape
@description: Collect every crystal and escape the dungeon!
@author: Tejus
@tags: ['arcade', 'maze', 'adventure']
@addedOn: 2026-09-20
*/

const player = "p"
const wall = "w"
const crystal = "c"
const enemy = "e"
const exit = "x"
const floor = "f"
const coin = "o"
const potion = "h"
const key = "k"
const door = "d"
const trap = "t"
const guard = "g"
const gem = "m"

setLegend(
  [player, bitmap`
................
................
......000.......
.....0...0......
....0.....0.....
....0.000.0.....
....0.333.0.....
....0.....0.....
.....0...0......
......000.......
......0.0.......
.....0...0......
....0.....0.....
....0.....0.....
.....00000......
................`],

  [wall, bitmap`
1111111111111111
1111111111111111
11............11
11............11
11..11111111..11
11..11111111..11
11............11
11............11
11..11111111..11
11..11111111..11
11............11
11............11
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [crystal, bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33333333....
....33333333....
.....333333.....
......3333......
.......33.......
.......33.......
......3333......
.....33..33.....
................
................
................`],

  [enemy, bitmap`
................
.....000000.....
...0000000000...
..00..0000..00..
..00..0000..00..
.00000000000000.
.000..0000..000.
.000..0000..000.
.00000000000000.
..00..0000..00..
..00..0000..00..
...0000000000...
.....00..00.....
....00....00....
................
................`],

  [exit, bitmap`
................
................
....55555555....
...55......55...
..55........55..
..5....55....5..
..5...5555...5..
..5...5555...5..
..5....55....5..
..55........55..
...55......55...
....55555555....
................
................
................
................`],

  [floor, bitmap`
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

  [coin, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....
................
................
................
................`],

  [potion, bitmap`
................
................
......777.......
.....77777......
.....77777......
.....77777......
....7777777.....
....7777777.....
....7777777.....
.....77777......
.....77777......
.....77777......
......777.......
................
................
................`],

  [key, bitmap`
................
................
......6666......
.....66..66.....
.....66.........
.....66666......
.....66.........
.....66.........
.....666666.....
.......666......
.......666......
.......666......
.......666......
................
................
................`],

  [door, bitmap`
1111111111111111
1111111111111111
11....6666....11
11...666666...11
11..66666666..11
11..66666666..11
11..66666666..11
11..66666666..11
11..66666666..11
11..66666666..11
11...666666...11
11....6666....11
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [trap, bitmap`
................
................
..666666666666..
.66666666666666.
.66..66..66..66.
.66..66..66..66.
.66666666666666.
..666666666666..
.66666666666666.
.66..66..66..66.
.66..66..66..66.
.66666666666666.
..666666666666..
................
................
................`],

  [guard, bitmap`
................
....00000000....
...0000000000...
..000..0000..00.
..000..0000..00.
..00000000000000
..00000000000000
..000..0000..00.
..000..0000..00.
..00000000000000
...000000000000.
....00000000....
.....00..00.....
....00....00....
................
................`],

  [gem, bitmap`
................
................
......3333......
.....333333.....
....33333333....
...3333333333...
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
......3333......
.....33..33.....
................
................
................`]
)

setSolids([
  player,
  wall,
  enemy,
  guard,
  door
])

setBackground(floor)

setPushables({
  [player]: []
})

let level = 0
let lives = 3
let health = 5
let maxHealth = 5
let crystals = 0
let score = 0
let coins = 0
let keys = 0
let turns = 0
let kills = 0
let trapsTriggered = 0
let gameOver = false
let victory = false
let shield = false
let dashReady = true
let pulseReady = true
let invincible = false

const levels = [

  map`
............
wwwwwwwwwwww
w.p....c...w
w.wwww.www.w
w....k.....w
w.wwww.ww..w
w.c..e.....w
w....wwww..w
w....h..o..w
w.wwww.wwx.w
w..m..t....w
wwwwwwwwwwww`,

  map`
............
wwwwwwwwwwww
w.p....w...w
w.wwww.w.c.w
w....k.w...w
w.wwww.www.w
w.c..e.....w
w....wwww..w
w..h..o....w
w.wwww.wwx.w
w..m..t....w
wwwwwwwwwwww`,

  map`
............
wwwwwwwwwwww
w.p...w....w
w.ww..w.c..w
w..e..w....w
w.wwwww.ww.w
w.c..k.....w
w....wwww..w
w..h..t.o..w
w.wwww.wwx.w
w..m.......w
wwwwwwwwwwww`,

  map`
............
wwwwwwwwwwww
w.p..c..e..w
w.wwww.ww..w
w..k...g.c.w
w.wwww.ww..w
w..o..t....w
w.wwww.ww..w
w..h..e....w
w.wwww.ww..w
w..m..d.x..w
wwwwwwwwwwww`
]

function resetVariables() {
  health = maxHealth
  shield = false
  dashReady = true
  pulseReady = true
  invincible = false
  turns = 0
}

function startGame() {
  level = 0
  lives = 3
  health = 5
  maxHealth = 5
  crystals = 0
  score = 0
  coins = 0
  keys = 0
  turns = 0
  kills = 0
  trapsTriggered = 0
  gameOver = false
  victory = false

  resetVariables()
  setMap(levels[level])
}

function playerSprite() {
  return getFirst(player)
}

function distanceBetween(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function distanceToPlayer(sprite) {
  const p = playerSprite()

  if (!p) {
    return 999
  }

  return distanceBetween(sprite, p)
}

function isBlockedAt(x, y) {
  const walls = getAll(wall)
  const doors = getAll(door)

  for (const w of walls) {
    if (w.x === x && w.y === y) {
      return true
    }
  }

  for (const d of doors) {
    if (d.x === x && d.y === y) {
      return true
    }
  }

  return false
}

function isOccupiedByEnemy(x, y) {
  const enemies = getAll(enemy)
  const guards = getAll(guard)

  for (const e of enemies) {
    if (e.x === x && e.y === y) {
      return true
    }
  }

  for (const g of guards) {
    if (g.x === x && g.y === y) {
      return true
    }
  }

  return false
}

function canMoveTo(x, y) {
  if (x < 0 || y < 0) {
    return false
  }

  if (isBlockedAt(x, y)) {
    return false
  }

  return true
}

function hasTypeAt(x, y, type) {
  const sprites = getAll(type)

  for (const sprite of sprites) {
    if (sprite.x === x && sprite.y === y) {
      return true
    }
  }

  return false
}

function damagePlayer(amount) {
  if (invincible) {
    return
  }

  if (shield) {
    shield = false
    invincible = true
    return
  }

  health -= amount

  if (health < 0) {
    health = 0
  }

  if (health <= 0) {
    loseLife()
  }
}

function loseLife() {
  lives -= 1

  if (lives <= 0) {
    showGameOver()
    return
  }

  health = maxHealth
  shield = false
  dashReady = true
  pulseReady = true
  invincible = false

  setMap(levels[level])

  clearText()

  addText("LIFE LOST", {
    x: 8,
    y: 5,
    color: color`3`
  })

  addText("LIVES: " + lives, {
    x: 9,
    y: 7,
    color: color`7`
  })
}

function collectCrystals() {
  const tiles = tilesWith(player, crystal)

  for (const tile of tiles) {
    for (const sprite of tile) {
      if (sprite.type === crystal) {
        sprite.remove()
        crystals += 1
        score += 100
      }
    }
  }
}

function collectCoins() {
  const tiles = tilesWith(player, coin)

  for (const tile of tiles) {
    for (const sprite of tile) {
      if (sprite.type === coin) {
        sprite.remove()
        coins += 1
        score += 25
      }
    }
  }
}

function collectPotion() {
  const tiles = tilesWith(player, potion)

  for (const tile of tiles) {
    for (const sprite of tile) {
      if (sprite.type === potion) {
        sprite.remove()
        health += 2

        if (health > maxHealth) {
          health = maxHealth
        }

        score += 50
      }
    }
  }
}

function collectKey() {
  const tiles = tilesWith(player, key)

  for (const tile of tiles) {
    for (const sprite of tile) {
      if (sprite.type === key) {
        sprite.remove()
        keys += 1
        score += 75
      }
    }
  }
}

function collectGem() {
  const tiles = tilesWith(player, gem)

  for (const tile of tiles) {
    for (const sprite of tile) {
      if (sprite.type === gem) {
        sprite.remove()
        score += 250
      }
    }
  }
}

function unlockDoor() {
  if (keys <= 0) {
    return
  }

  const p = playerSprite()

  if (!p) {
    return
  }

  const doors = getAll(door)

  for (const d of doors) {
    if (distanceBetween(p, d) <= 1) {
      d.remove()
      keys -= 1
      score += 150
      return
    }
  }
}

function triggerTraps() {
  const danger = tilesWith(player, trap)

  if (danger.length === 0) {
    return
  }

  if (invincible) {
    return
  }

  trapsTriggered += 1
  score -= 10
  damagePlayer(1)
  invincible = true
}

function checkEnemyCollision() {
  const danger = tilesWith(player, enemy)
  const guards = tilesWith(player, guard)

  if (danger.length > 0 || guards.length > 0) {
    damagePlayer(1)
    invincible = true
  }
}

function moveEnemyRandomly(e) {
  const directions = [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: 1},
    {x: 0, y: -1}
  ]

  const direction =
    directions[Math.floor(Math.random() * directions.length)]

  const nx = e.x + direction.x
  const ny = e.y + direction.y

  if (!canMoveTo(nx, ny)) {
    return
  }

  if (isOccupiedByEnemy(nx, ny)) {
    return
  }

  e.x = nx
  e.y = ny
}

function moveEnemyTowardPlayer(e) {
  const p = playerSprite()

  if (!p) {
    return
  }

  const dx = p.x - e.x
  const dy = p.y - e.y

  let nx = e.x
  let ny = e.y

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      nx += 1
    }

    if (dx < 0) {
      nx -= 1
    }
  } else {
    if (dy > 0) {
      ny += 1
    }

    if (dy < 0) {
      ny -= 1
    }
  }

  if (
    canMoveTo(nx, ny) &&
    !isOccupiedByEnemy(nx, ny)
  ) {
    e.x = nx
    e.y = ny
  }
}

function updateEnemies() {
  const enemies = getAll(enemy)

  for (const e of enemies) {
    if (distanceToPlayer(e) <= 5) {
      moveEnemyTowardPlayer(e)
    } else {
      moveEnemyRandomly(e)
    }
  }

  const guards = getAll(guard)

  for (const g of guards) {
    if (distanceToPlayer(g) <= 8) {
      moveEnemyTowardPlayer(g)
    } else {
      moveEnemyRandomly(g)
    }
  }
}

function attackNearbyEnemy() {
  if (!pulseReady) {
    return
  }

  const p = playerSprite()

  if (!p) {
    return
  }

  pulseReady = false

  let defeated = 0

  const enemies = getAll(enemy)

  for (const e of enemies) {
    if (distanceBetween(p, e) <= 1) {
      e.remove()
      defeated += 1
    }
  }

  const guards = getAll(guard)

  for (const g of guards) {
    if (distanceBetween(p, g) <= 1) {
      g.remove()
      defeated += 1
    }
  }

  if (defeated > 0) {
    kills += defeated
    score += defeated * 125
  }
}

function dash(dx, dy) {
  if (!dashReady) {
    return
  }

  const p = playerSprite()

  if (!p) {
    return
  }

  const nx = p.x + dx * 2
  const ny = p.y + dy * 2

  const sx = p.x + dx
  const sy = p.y + dy

  if (
    canMoveTo(nx, ny) &&
    !isOccupiedByEnemy(nx, ny)
  ) {
    p.x = nx
    p.y = ny
    dashReady = false
    score += 10
    return
  }

  if (
    canMoveTo(sx, sy) &&
    !isOccupiedByEnemy(sx, sy)
  ) {
    p.x = sx
    p.y = sy
    dashReady = false
    score += 5
  }
}

function activateShield() {
  if (!shield) {
    shield = true
    score += 10
  }
}

function recoverAbilities() {
  if (turns % 4 === 0) {
    dashReady = true
  }

  if (turns % 3 === 0) {
    pulseReady = true
  }
}

function updateInvincibility() {
  if (invincible && turns % 2 === 0) {
    invincible = false
  }
}

function advanceLevel() {
  level += 1

  if (level >= levels.length) {
    showVictory()
    return
  }

  health = maxHealth
  shield = false
  dashReady = true
  pulseReady = true
  invincible = false

  setMap(levels[level])

  score += 500
}

function checkExit() {
  const atExit = tilesWith(player, exit)

  if (atExit.length === 0) {
    return
  }

  const remaining = getAll(crystal).length

  if (remaining > 0) {
    return
  }

  advanceLevel()
}

function updateHUD() {
  clearText()

  addText("LV" + (level + 1), {
    x: 2,
    y: 0,
    color: color`7`
  })

  addText("HP" + health, {
    x: 6,
    y: 0,
    color: color`3`
  })

  addText("L" + lives, {
    x: 11,
    y: 0,
    color: color`6`
  })

  addText("C" + crystals, {
    x: 15,
    y: 0,
    color: color`3`
  })

  addText("K" + keys, {
    x: 21,
    y: 0,
    color: color`6`
  })

  addText("O" + coins, {
    x: 26,
    y: 0,
    color: color`7`
  })
}

function showGameOver() {
  gameOver = true

  clearText()

  addText("GAME OVER", {
    x: 8,
    y: 4,
    color: color`3`
  })

  addText("SCORE " + score, {
    x: 8,
    y: 6,
    color: color`7`
  })

  addText("KILLS " + kills, {
    x: 9,
    y: 7,
    color: color`6`
  })

  addText("PRESS J", {
    x: 9,
    y: 9,
    color: color`3`
  })
}

function showVictory() {
  victory = true
  gameOver = true

  clearText()

  addText("YOU ESCAPED!", {
    x: 6,
    y: 3,
    color: color`3`
  })

  addText("SCORE " + score, {
    x: 8,
    y: 5,
    color: color`7`
  })

  addText("CRYSTALS " + crystals, {
    x: 7,
    y: 6,
    color: color`3`
  })

  addText("KILLS " + kills, {
    x: 9,
    y: 7,
    color: color`6`
  })

  addText("COINS " + coins, {
    x: 9,
    y: 8,
    color: color`7`
  })

  addText("PRESS J", {
    x: 9,
    y: 10,
    color: color`6`
  })
}

function movePlayer(dx, dy) {
  if (gameOver) {
    return
  }

  const p = playerSprite()

  if (!p) {
    return
  }

  const nx = p.x + dx
  const ny = p.y + dy

  if (!canMoveTo(nx, ny)) {
    return
  }

  p.x = nx
  p.y = ny
}

function updateGame() {
  if (gameOver) {
    return
  }

  collectCrystals()
  collectCoins()
  collectPotion()
  collectKey()
  collectGem()

  unlockDoor()
  triggerTraps()

  updateEnemies()
  checkEnemyCollision()

  recoverAbilities()
  updateInvincibility()

  checkExit()

  turns += 1

  updateHUD()
}

onInput("w", () => {
  movePlayer(0, -1)
})

onInput("a", () => {
  movePlayer(-1, 0)
})

onInput("s", () => {
  movePlayer(0, 1)
})

onInput("d", () => {
  movePlayer(1, 0)
})

onInput("i", () => {
  if (!gameOver) {
    activateShield()
  }
})

onInput("j", () => {
  if (gameOver) {
    startGame()
    return
  }

  attackNearbyEnemy()
})

onInput("k", () => {
  if (!gameOver) {
    dash(0, 1)
  }
})

onInput("l", () => {
  if (!gameOver) {
    dash(1, 0)
  }
})

afterInput(() => {
  updateGame()
})

startGame()
