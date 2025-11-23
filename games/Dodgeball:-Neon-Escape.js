/*
@title: Dodgeball- Neon Escape
@author: Shlok Vaidya
@description: A fast paced dodgeball survival game with increasing difficulty.
@tags: ['arcade', 'dodge', 'action']
@addedOn: 2025-11-23
*/

// ⚡ DODGEBALL: Neon Escape - HARD MODE

// === SPRITES ===
const player = "p"
const enemy = "e"
const wall = "w"
const gameBg = "g"
const menuBg = "m"
const decoP = "x"
const decoE = "y"

// === LEGEND ===
// --- LEGEND ---
setLegend(
  [player, bitmap`
.....4..........
....444.........
...44D44........
..44DDD44.......
....4D4.........
....4D4.........
....4D4.........
................
................
................
................
................
................
................
................
................`],
  [enemy, bitmap`
....333....
...33333...
..3333333..
.33333333..
..3333333..
...33333...
....333....
`],
  [wall, bitmap`
11111111111.....
11111111111.....
11111111111.....
11111111111.....
11111111111.....
11111111111.....
11111111111.....
................
................
................
................
................
................
................
................`],
  [gameBg, bitmap`
22222222222
22000000222
22022220222
22022220222
22200000222
22222222222
22222222222
`],
  [menuBg, bitmap`
00000000000
00000000000
00000000000
00000000000
00000000000
00000000000
00000000000
`],
  [decoP, bitmap`
....444....
....444....
44444444444
44444444444
....444....
`],
  [decoE, bitmap`
....333....
...33333...
..3333333..
...33333...
....333....
`],
)

setSolids([player, wall])

// --- MAPS ---
const gameMap = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w....p...w
wwwwwwwwww`

const menuMap = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`

const blankMap = map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`

setSolids([player, wall])

// === GAME STATE ===
let score = 0
let level = 1
let enemySpeed = 500
let spawnSpeed = 800
let gameOver = false
let gameStarted = false

let enemyLoop = null
let spawnLoop = null

// === PRO AUDIO (Sprig-Compatible) ===

// Menu loop vibe
const bgm_menu = tune`
80: c4~80,
80: g3~80,
80: a3~80,
80: g3~80,
repeat
`

// In-game loop vibe (faster + tense)
const bgm_game = tune`
60: c3~60,
60: e3~60,
60: g3~60,
60: c4~60,
60: g3~60,
60: e3~60,
repeat
`

// Start game jingle
const snd_start = tune`
120: c5~120,
120: e5~120,
180: g5~180,
200: c6~240
`

// Game over
const snd_over = tune`
200: a4~160,
200: f4~200,
280: d4~260
`

// SFX
const sfx_hit = tune`
50: c3~50,
50: g2~50,
80: c2~80
`

const sfx_move = tune`
30: g4~40
`

const sfx_levelUp = tune`
60: c5~60,
60: e5~60,
120: g5~120,
160: c6~160
`

const sfx_spawn = tune`
40: g3~40
`

// === UI ===
function drawHUD() {
  clearText()
  addText(`S:${score}`, { x: 2, y: 0, color: color`3` })
  addText(`L:${level}`, { x: 8, y: 0, color: color`3` })
  addText(`Dodgeball`, { x: 5, y: 15,  color: color`2`})
}

// === MUSIC ENGINE (Sprig Safe) ===
function playLoop(tuneData) {
  playTune(tuneData)
  setTimeout(() => {
    if (!gameOver) playLoop(tuneData)
  }, 2000)
}

// === MENU ===
function showMenu() {
  gameStarted = false
  gameOver = false

  setMap(menuMap)
  setBackground(menuBg)
  clearText()

  playLoop(bgm_menu)

  addText("Dodgeball", { x: 5, y: 2, color: color`3` })
  addText("PRESS K", { x: 6, y: 4, color: color`9` })
  addText("CREDITS:", { x: 1, y: 8, color: color`5` })
  addText("Shlok Vaidya", { x: 2, y: 10, color: color`7` })
}

// === GAME START ===
function startGame() {
  clearText()
  setMap(gameMap)
  setBackground(gameBg)

  playTune(snd_start)
  playLoop(bgm_game)

  score = 0
  level = 1
  enemySpeed = 500
  spawnSpeed = 800
  gameOver = false
  gameStarted = true

  drawHUD()

  if (enemyLoop) clearInterval(enemyLoop)
  if (spawnLoop) clearInterval(spawnLoop)

  enemyLoop = setInterval(moveEnemies, enemySpeed)
  spawnLoop = setInterval(gameTick, spawnSpeed)
}

// === ENEMIES ===
function spawnEnemy() {
  if (gameOver) return
  const x = Math.floor(Math.random() * 8) + 1
  addSprite(x, 1, enemy)
  playTune(sfx_spawn)
}

function moveEnemies() {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return

  getAll(enemy).forEach(e => {
    e.y += 1
    if (e.y > 5) e.remove()

    if (e.x === p.x && e.y === p.y) {
      endGame()
    }
  })
}

// === GAME LOOP ===
function gameTick() {
  if (gameOver) return

  score++

  if (score % 10 === 0) {
    level++
    playTune(sfx_levelUp)

    if (enemySpeed > 180) enemySpeed -= 40
    if (spawnSpeed > 200) spawnSpeed -= 40

    clearInterval(enemyLoop)
    clearInterval(spawnLoop)

    enemyLoop = setInterval(moveEnemies, enemySpeed)
    spawnLoop = setInterval(gameTick, spawnSpeed)
  }

  spawnEnemy()
  drawHUD()
}

// === GAME OVER ===
function endGame() {
  gameOver = true

  clearInterval(enemyLoop)
  clearInterval(spawnLoop)

  playTune(sfx_hit)
  playTune(snd_over)

  setMap(blankMap)
  setBackground(menuBg)
  clearText()

  addText("GAME OVER", { x: 2, y: 2, color: color`3` })
  addText(`SCORE: ${score}`, { x: 2, y: 4, color: color`3` })
  addText("PRESS K", { x: 2, y: 6, color: color`3` })
}

// === CONTROLS ===
onInput("a", () => {
  if (!gameStarted || gameOver) return
  const p = getFirst(player)
  if (p && p.x > 1) {
    p.x--
    playTune(sfx_move)
  }
})

onInput("d", () => {
  if (!gameStarted || gameOver) return
  const p = getFirst(player)
  if (p && p.x < 8) {
    p.x++
    playTune(sfx_move)
  }
})

onInput("k", () => {
  if (!gameStarted || gameOver) startGame()
})

// === BOOT ===
showMenu()

