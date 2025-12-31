// ===== SPACE DEFENDER SIDE-MOTION EDITION =====

// ---- SPRITES ----
const player = "p"
const enemy = "e"
const bullet = "b"
const star = "s"
const power = "u"
const background = "g"

setLegend(
  [player, bitmap`
....0...........
...090..........
..09990.........
.0099900........
..09990.........
..00900.........
...000..........
....0...........
................
................
................
................
................
................
................
................`],

  [enemy, bitmap`
..44444.........
.4444444........
.4004004........
.444D444........
..44444.........
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

  [bullet, bitmap`
................
....6...........
....9...........
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

  [power, bitmap`
....3...........
...333..........
..33333.........
...333..........
....3...........
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

  [star, bitmap`
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

  [background, bitmap`
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
0000000000000000`]
)

setBackground(background)

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`)

// ---- GAME STATE ----
let score = 0
let highScore = 0
let level = 1
let health = 3
let gameStarted = false
let gameOver = false
let storyMode = true
let canShoot = true
let rapidFire = false
let enemyDir = 1   // 1 = right, -1 = left

// ---- STORY SCREEN ----
addText("YEAR 2147", { x: 2, y: 1 })
addText("ALIENS INVADE", { x: 0, y: 3 })
addText("YOU ARE", { x: 3, y: 5 })
addText("LAST PILOT", { x: 1, y: 6 })
addText("PRESS W", { x: 3, y: 7 })

onInput("w", () => {
  if (storyMode) {
    storyMode = false
    showTitle()
  } else if (!gameStarted) {
    startGame()
  } else if (canShoot) {
    shoot()
  }
})

// ---- TITLE ----
function showTitle() {
  clearText()
  addText("SPACE DEFENDER", { x: 1, y: 3 })
  addText("W = START", { x: 2, y: 5 })
  addText("A/D MOVE", { x: 2, y: 6 })
}

// ---- CLEAN ----
function wipe() {
  getAll(player).forEach(s => s.remove())
  getAll(enemy).forEach(s => s.remove())
  getAll(bullet).forEach(s => s.remove())
  getAll(star).forEach(s => s.remove())
  getAll(power).forEach(s => s.remove())
}

// ---- START ----
function startGame() {
  wipe()
  clearText()
  gameStarted = true
  gameOver = false
  level = 1
  score = 0
  health = 3
  rapidFire = false
  setupLevel()
}

// ---- LEVEL ----
function setupLevel() {
  wipe()
  addSprite(4, 7, player)

  for (let i = 0; i < level + 2; i++) {
    addSprite(2 + i * 2, 1, enemy)
  }
}

// ---- HUD ----
function hud() {
  clearText()
  addText("S:" + score, { x: 0, y: 0 })
  addText("H:" + health, { x: 4, y: 0 })
  addText("L:" + level, { x: 8, y: 0 })
  addText("HI:" + highScore, { x: 0, y: 7 })
}

// ---- CONTROLS ----
onInput("a", () => {
  if (!gameStarted || gameOver) return
  let p = getFirst(player)
  if (p.x > 0) p.x--
})

onInput("d", () => {
  if (!gameStarted || gameOver) return
  let p = getFirst(player)
  if (p.x < 9) p.x++
})

// ---- SHOOT ----
function shoot() {
  let p = getFirst(player)
  addSprite(p.x, p.y - 1, bullet)
  canShoot = false
  setTimeout(() => canShoot = true, rapidFire ? 200 : 450)
}

// ---- POWER UPS ----
setInterval(() => {
  if (!gameStarted || gameOver) return
  if (Math.random() < 0.25) {
    addSprite(Math.floor(Math.random() * 10), 0, power)
  }
}, 5000)

setInterval(() => {
  getAll(power).forEach(p => {
    p.y++
    if (p.y >= height()) p.remove()
  })
}, 700)

// ---- STARS ----
setInterval(() => {
  if (!gameStarted || gameOver) return
  addSprite(Math.floor(Math.random() * 10), 0, star)
}, 900)

setInterval(() => {
  getAll(star).forEach(s => {
    s.y++
    if (s.y >= height()) s.remove()
  })
}, 600)

// ---- ENEMY SIDE MOVEMENT (SLOW) ----
setInterval(() => {
  if (!gameStarted || gameOver) return

  let hitWall = false

  getAll(enemy).forEach(e => {
    if (e.x === 0 || e.x === 9) hitWall = true
  })

  if (hitWall) enemyDir *= -1

  getAll(enemy).forEach(e => {
    e.x += enemyDir
  })

}, 900)

// ---- MAIN LOOP (SLOW) ----
setInterval(() => {
  if (!gameStarted || gameOver) return

  // bullet movement
  getAll(bullet).forEach(b => {
    b.y--
    if (b.y < 0) b.remove()
  })

  // bullet collision
  getAll(bullet).forEach(b => {
    getAll(enemy).forEach(e => {
      if (b.x === e.x && b.y === e.y) {
        b.remove()
        e.remove()
        score++
      }
    })
  })

  // player + power
  getAll(player).forEach(p => {
    getAll(power).forEach(u => {
      if (p.x === u.x && p.y === u.y) {
        u.remove()
        if (Math.random() < 0.5) health++
        else {
          rapidFire = true
          setTimeout(() => rapidFire = false, 5000)
        }
      }
    })
  })

  if (getAll(enemy).length === 0) {
    level++
    setupLevel()
  }

  hud()

}, 450)

// ---- HEALTH CHECK (NO FORWARD ENEMIES ANYMORE) ----
setInterval(() => {
  if (!gameStarted || gameOver) return
  if (health <= 0) endGame()
}, 600)

// ---- GAME OVER ----
function endGame() {
  gameOver = true
  if (score > highScore) highScore = score
  wipe()
  clearText()
  addText("GAME OVER", { x: 3, y: 3 })
  addText("SCORE: " + score, { x: 2, y: 5 })
  addText("HIGH: " + highScore, { x: 2, y: 6 })
  addText("PRESS S", { x: 3, y: 7 })
}

// ---- RETRY ----
onInput("s", () => {
  if (gameOver) startGame()
})
