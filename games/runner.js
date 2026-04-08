/*
SPRIG SURVIVOR – Boss Edition
*/

const player = "p"
const enemy = "e"
const boss = "B"
const bullet = "b"
const wall = "w"
const coin = "c"

setLegend(
  [ player, bitmap`
..3333..
.333333.
33333333
33.33.33
33333333
.333333.
..3333..
........`],
  [ enemy, bitmap`
..5555..
.555555.
55555555
55.55.55
55555555
.555555.
..5555..
........`],
  [ boss, bitmap`
..8888..
.888888.
88888888
88.88.88
88888888
.888888.
..8888..
........`],
  [ bullet, bitmap`
........
........
..9999..
..9999..
........
........
........
........`],
  [ wall, bitmap`
77777777
77777777
77777777
77777777
77777777
77777777
77777777
77777777`],
  [ coin, bitmap`
........
..6666..
.666666.
.666666.
.666666.
.666666.
..6666..
........`]
)

setSolids([player, wall, enemy, boss])

setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww
`)

let hp = 3
let score = 0
let gameOver = false
let enemySpeed = 600
let lastDir = "d"

// Boss state
let bossActive = false
let bossHP = 3

// ---------------- HUD ----------------
function hud() {
  clearText()
  addText("HP:" + "*".repeat(hp), { x: 0, y: 0, color: color`3` })
  addText("Score:" + score, { x: 0, y: 1, color: color`6` })
  if (bossActive) addText("BOSS HP:" + "*".repeat(bossHP), { x: 6, y: 0, color: color`5` })
}

// ---------------- ENEMY SPAWN ----------------
function spawnEnemy() {
  addSprite(8, Math.floor(Math.random() * 6 + 1), enemy)
}

// ---------------- COIN SPAWN ----------------
function spawnCoin() {
  const x = Math.floor(Math.random() * 8 + 1)
  const y = Math.floor(Math.random() * 6 + 1)
  addSprite(x, y, coin)
}

// Spawn initial coins
for (let i = 0; i < 3; i++) spawnCoin()

// ---------------- LOSE HP ----------------
function loseHP() {
  hp--
  hud()
  if (hp <= 0) {
    gameOver = true
    clearText()
    addText("GAME OVER", { x: 2, y: 6, color: color`5` })
    addText("Press I", { x: 3, y: 8, color: color`6` })
  }
}

// ---------------- PLAYER MOVEMENT ----------------
onInput("w", () => !gameOver && (getFirst(player).y--, lastDir="w"))
onInput("s", () => !gameOver && (getFirst(player).y++, lastDir="s"))
onInput("a", () => !gameOver && (getFirst(player).x--, lastDir="a"))
onInput("d", () => !gameOver && (getFirst(player).x++, lastDir="d"))

// ---------------- SHOOT ----------------
onInput("j", () => {
  if (gameOver) return
  const p = getFirst(player)
  const b = addSprite(p.x, p.y, bullet)
  b.dir = lastDir
})

// ---------------- RESTART ----------------
onInput("i", () => {
  clearText()
  setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww
`)
  hp = 3
  score = 0
  enemySpeed = 600
  bossActive = false
  bossHP = 3
  gameOver = false
  addSprite(1, 1, player)
  spawnEnemy()
  for (let i = 0; i < 3; i++) spawnCoin()
  hud()
})

// ---------------- BULLET MOVE ----------------
setInterval(() => {
  if (gameOver) return
  for (const b of getAll(bullet)) {
    if (b.dir === "w") b.y--
    if (b.dir === "s") b.y++
    if (b.dir === "a") b.x--
    if (b.dir === "d") b.x++
  }
}, 100)

// ---------------- ENEMY AI (CHASE PLAYER) ----------------
setInterval(() => {
  if (gameOver) return
  const p = getFirst(player)
  // Regular enemies
  for (const e of getAll(enemy)) {
    if (Math.abs(p.x - e.x) > Math.abs(p.y - e.y)) {
      e.x += p.x > e.x ? 1 : -1
    } else {
      e.y += p.y > e.y ? 1 : -1
    }
  }
  // Boss AI
  if (bossActive) {
    const B = getAll(boss)[0]
    if (Math.abs(p.x - B.x) > Math.abs(p.y - B.y)) {
      B.x += p.x > B.x ? 1 : -1
    } else {
      B.y += p.y > B.y ? 1 : -1
    }
  }
}, enemySpeed)

// ---------------- COLLISIONS ----------------
afterInput(() => {
  if (gameOver) return
  const p = getFirst(player)

  // Enemy touching player
  for (const e of getAll(enemy)) {
    if (e.x === p.x && e.y === p.y) {
      e.remove()
      loseHP()
      spawnEnemy()
    }
  }

  // Bullet hits enemy
  for (const b of getAll(bullet)) {
    for (const e of getAll(enemy)) {
      if (b.x === e.x && b.y === e.y) {
        b.remove()
        e.remove()
        score += 10
        enemySpeed = Math.max(200, enemySpeed - 20)
        hud()
        spawnEnemy()
      }
    }
    // Bullet hits boss
    if (bossActive) {
      const B = getAll(boss)[0]
      if (b.x === B.x && b.y === B.y) {
        b.remove()
        bossHP--
        hud()
        if (bossHP <= 0) {
          B.remove()
          bossActive = false
          score += 50
          // Drop extra coins
          for (let i=0;i<5;i++) spawnCoin()
        }
      }
    }
  }

  // Player collects coins
  for (const c of getAll(coin)) {
    if (c.x === p.x && c.y === p.y) {
      c.remove()
      score += 10
      hud()
      spawnCoin()
    }
  }

  // Spawn boss at 100 points if not active
  if (score >= 100 && !bossActive) {
    addSprite(4, 3, boss)
    bossActive = true
    bossHP = 3
  }
})

// ---------------- START GAME ----------------
addSprite(1, 1, player)
spawnEnemy()
hud()
