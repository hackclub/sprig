/*
  PAC-MAN COMPLETE VERSION
  Move: WASD
  Restart: J
*/

const player = "p"
const wall = "w"
const dot = "d"
const ghost = "g"
const ghost2 = "h"

/* ===== LEGEND ===== */

setLegend(
  [player, bitmap`
................
................
....00000000....
...0LLLLLLLL0...
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
...0LLLLLLLL0...
....00000000....
................
................`],

  [wall, bitmap`
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

  [dot, bitmap`
................
................
................
................
.......666......
.......666......
.......666......
................
................
................
................
................
................
................
................
................`],

  [ghost, bitmap`
................
................
....33333333....
...3333333333...
..333333333333..
..333300003333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
................
................
................
................
................`],

  [ghost2, bitmap`
................
................
....44444444....
...4444444444...
..444444444444..
..444400004444..
..444444444444..
..444444444444..
..444444444444..
...4444444444...
....44444444....
................
................
................
................
................`]
)

setSolids([player, wall])

/* ===== LEVELS ===== */

const levels = [
map`
wwwwwwwwwwww
wpddddddddgw
w.wwwwwwww.w
wdddddddd..w
w.ww.wwww..w
wddddwwddddw
w.ww.wwww..w
wdddddddhddw
w.wwwwwwww.w
wddddddddddw
w.wwwwwwww.w
wwwwwwwwwwww
`,
map`
wwwwwwwwwwww
wpddddddddgw
w.ww.wwww..w
wddddwwddddw
w.ww.wwww..w
wddddddddddw
w.wwwwwwww.w
wdddddddhddw
w.ww.wwww..w
wddddwwddddw
w.wwwwwwww.w
wwwwwwwwwwww
`
]

/* ===== GAME STATE ===== */

let currentLevel = 0
let score = 0
let lives = 3
let gameOver = false
let ghostInterval = null
let musicInterval = null

// Track eaten dots per level
let eatenDots = []

/* ===== MUSIC (Arcade Style Inspired) ===== */

const introMusic = tune`
150: b4~150,
150: b5~150,
150: fs5~150,
150: ds5~150,
150: b5~150,
150: fs5~150,
150: ds5~150,
300: c5~300
`

const bgLoop = tune`
150: c5~150 + e5~150,
150: g5~150,
150: e5~150,
150: c5~150,
150: g4~150,
150: c5~150,
150: e5~150,
300: g5~300
`

const deathSound = tune`
150: c4-150,
150: a3-150,
300: f3-300
`

const winSound = tune`
150: c5~150,
150: e5~150,
150: g5~150,
300: c6~300
`

function startMusic() {
  playTune(introMusic)
  if (musicInterval) clearInterval(musicInterval)
  musicInterval = setInterval(() => {
    if (!gameOver) playTune(bgLoop)
  }, 1200)
}

function stopMusic() {
  if (musicInterval) {
    clearInterval(musicInterval)
    musicInterval = null
  }
}

/* ===== START LEVEL ===== */

function startLevel(levelIndex) {
  setMap(levels[levelIndex])
  gameOver = false
  updateUI()
  startMusic()

  // Restore eaten dots
  eatenDots[levelIndex] = eatenDots[levelIndex] || []
  eatenDots[levelIndex].forEach(pos => {
    const tile = getTile(pos.x, pos.y)
    tile.forEach(t => {
      if (t.type === dot) t.remove()
    })
  })

  if (ghostInterval) clearInterval(ghostInterval)
  let speed = levelIndex === 0 ? 400 : 200

  ghostInterval = setInterval(() => {
    if (gameOver) return
    moveGhost(ghost)
    moveGhost(ghost2)
    checkLose()
  }, speed)
}

/* ===== UI ===== */

function updateUI() {
  clearText()
  addText("Score: " + score, { x: 0, y: 0, color: color`2` })
  addText("Lvl: " + (currentLevel + 1), { x: 12, y: 0, color: color`3` })
  addText("Lives: " + lives, { x: 0, y: 1, color: color`4` })
}

/* ===== PLAYER ===== */

function eatDots() {
  tilesWith(player, dot).forEach(([pTile, dTile]) => {
    if (dTile) {
      dTile.remove()
      score++
      // record eaten dot for current level
      eatenDots[currentLevel].push({ x: dTile.x, y: dTile.y })
    }
  })
}

function movePlayer(dx, dy) {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return

  const nextX = p.x + dx
  const nextY = p.y + dy

  if (getTile(nextX, nextY).some(t => t.type === wall)) return

  p.x = nextX
  p.y = nextY

  eatDots()
  updateUI()
  checkLose()
  checkWin()
}

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

/* ===== WIN ===== */

function checkWin() {
  if (getAll(dot).length === 0) {
    currentLevel++
    if (currentLevel >= levels.length) {
      stopMusic()
      playTune(winSound)
      clearText()
      addText("YOU WIN!", { x: 3, y: 6, color: color`4` })
      addText("Final Score:", { x: 2, y: 7, color: color`0` })
      addText("   " + score, { x: 5, y: 8, color: color`4` })
      gameOver = true
      return
    }
    startLevel(currentLevel)
  }
}

/* ===== LOSE ===== */

function checkLose() {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return

  getAll(ghost).concat(getAll(ghost2)).forEach(g => {
    if (g.x === p.x && g.y === p.y) {
      lives--
      playTune(deathSound)

      if (lives <= 0) {
        gameOver = true
        stopMusic()
        if (ghostInterval) clearInterval(ghostInterval)

        clearText()
        addText("GAME OVER", { x: 2, y: 6, color: color`3` })
        addText("Final Score:", { x: 2, y: 7, color: color`0` })
        addText("   " + score, { x: 5, y: 8, color: color`4` })
        addText("Press J to Restart", { x: 2, y: 9, color: color`0` })
        return
      }

      // Only reset player and ghosts, do not reset eaten dots
      const mapCopy = levels[currentLevel]
      setMap(mapCopy)
      updateUI()
    }
  })
}

/* ===== BFS PATHFINDING ===== */

function bfsNextStep(sx, sy, tx, ty) {
  const queue = [{ x: sx, y: sy }]
  const visited = {}
  const parent = {}
  const key = (x, y) => `${x},${y}`

  visited[key(sx, sy)] = true

  const dirs = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 }
  ]

  while (queue.length) {
    const cur = queue.shift()
    if (cur.x === tx && cur.y === ty) break

    for (let d of dirs) {
      const nx = cur.x + d.dx
      const ny = cur.y + d.dy
      if (visited[key(nx, ny)]) continue
      if (getTile(nx, ny).some(s => s.type === wall)) continue
      visited[key(nx, ny)] = true
      parent[key(nx, ny)] = cur
      queue.push({ x: nx, y: ny })
    }
  }

  if (!visited[key(tx, ty)]) return null

  let step = { x: tx, y: ty }
  while (parent[key(step.x, step.y)].x !== sx ||
    parent[key(step.x, step.y)].y !== sy) {
    step = parent[key(step.x, step.y)]
  }

  return step
}

/* ===== GHOST MOVEMENT ===== */

function moveGhost(type) {
  const p = getFirst(player)
  if (!p) return

  getAll(type).forEach(g => {
    const next = bfsNextStep(g.x, g.y, p.x, p.y)
    if (!next) return

    const blocked = getTile(next.x, next.y)
      .some(s => s.type === ghost || s.type === ghost2)

    if (!blocked) {
      g.x = next.x
      g.y = next.y
    }
  })
}

/* ===== RESTART ===== */

onInput("j", () => {
  currentLevel = 0
  score = 0
  lives = 3
  eatenDots = [] // reset eaten dots on full restart
  startLevel(currentLevel)
})

startLevel(currentLevel)
