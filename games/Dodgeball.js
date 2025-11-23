// ⚡ DODGEBALL: Neon Escape - HARD MODE

const player = "p"
const enemy = "e"
const wall = "w"
const bg = "b"

setLegend(
  [player, bitmap`
....444....
....444....
....444....
44444444444
44444444444
....444....
....444....
`],
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
11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
11111111111
`],
  [bg, bitmap`
22222222222
22000000222
22022220222
22022220222
22200000222
22222222222
22222222222
`]
)

setBackground(bg)

setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w....p...w
wwwwwwwwww
`)

setSolids([player, wall])

let score = 0
let level = 1
let speed = 800
let moveSpeed = 500
let gameOver = false

// 🧱 DASHBOARD
function drawHUD() {
  clearText()
  addText(`S:${score}`, { x: 0, y: 0, color: color`3` })
  addText(`L:${level}`, { x: 6, y: 0, color: color`3` })
}

function spawnEnemy() {
  if (gameOver) return

  const x = Math.floor(Math.random() * 8) + 1
  addSprite(x, 1, enemy)
}

function moveEnemies() {
  getAll(enemy).forEach(e => {
    e.y += 1

    if (e.y > 4) e.remove()

    const p = getFirst(player)
    if (e.x === p.x && e.y === p.y) {
      gameOver = true
      clearText()
      addText("GAME OVER", { x: 2, y: 2, color: color`3` })
      addText(`Score:${score}`, { x: 2, y: 3, color: color`3` })
    }
  })
}

// 🎮 Controls
onInput("a", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p.x > 1) p.x -= 1
})

onInput("d", () => {
  if (gameOver) return
  const p = getFirst(player)
  if (p.x < 8) p.x += 1
})

// 🧠 Difficulty scaling
setInterval(() => {
  if (gameOver) return

  score += 2  // ⚡ 100% faster score growth

  if (score % 10 === 0) {
    level += 2  // ⚡ level increases 2x faster

    // ⚡ Speed now ramps up twice as fast
    if (speed > 200) speed -= 100
    if (moveSpeed > 150) moveSpeed -= 50
  }

  spawnEnemy()
  drawHUD()
}, speed)


// 💥 Enemy movement loop
setInterval(() => {
  if (!gameOver) moveEnemies()
}, moveSpeed)
