const player = "p"
const bug = "b"
const wall = "w"

setLegend(
  [ player, bitmap`
................
................
......7.........
.....777........
....77777.......
...7777777......
....00000.6.....
....0...0.0.....
....0C.C0.0.....
..000...000.....
..0.0.880.0.....
....0...0.......
.....0.0........
....00.00.......
................
................` ],
  [ bug, bitmap`
................
................
.....0...0......
..0...000...0...
...0.00000.0....
....0333330.....
...033333330....
.0003033303000..
...033333330....
...030303030....
..0.0330330.0...
..0..00000..0...
................
................
................
................` ],
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L00000LLLLLL1L0
0L000000000000L0
0L001100011111L0
0L0011011111L1L0
0L11111111L1L1L0
0L11111LL111L1L0
0L11LLLLL11111L0
0L111111111L11L0
0L1L11111LLL11L0
0L1LLLLL11LL11L0
0L11111L111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
p.wb..b
..wwww.
.....w.
..ww.w.
.www.w.
..bw...`
]

let score = 0
let timeLeft = 60
let gameOver = false
let timerId

setPushables({
  [ player ]: []
})

// Movement controls
onInput("w", () => {
  if (!gameOver) getFirst(player).y -= 1
})
onInput("s", () => {
  if (!gameOver) getFirst(player).y += 1
})
onInput("a", () => {
  if (!gameOver) getFirst(player).x -= 1
})
onInput("d", () => {
  if (!gameOver) getFirst(player).x += 1
})

// Restart game on "k"
onInput("k", () => {
  startGame()
})

// Tunes
const funkpopTune = tune`
500: c4-500,
500: e4-500,
500: g4-500,
500: c5-500,
500: g4-500,
500: e4-500,
500: c4-500,
`

const catchSound = tune`
300: e5-300,
150: g5-150,
300: c6-300
`

function playBackgroundMusic() {
  playTune(funkpopTune, 0) // 0 means loop infinitely
}

function stopBackgroundMusic() {
  stopTune()
}

// Spawn bug at random empty tile
function spawnBug() {
  const emptyTiles = []

  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const tile = getTile(x, y)
      const isFree = tile.every(t =>
        t.type !== wall && t.type !== bug && t.type !== player
      )
      if (isFree) emptyTiles.push({ x, y })
    }
  }

  if (emptyTiles.length > 0) {
    const spot = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    addSprite(spot.x, spot.y, bug)
  }
}

// Start the game
function startGame() {
  clearText()
  score = 0
  timeLeft = 60
  gameOver = false
  setMap(levels[level])

  // Remove all existing bugs (if any)
  getAll(bug).forEach(b => b.remove())

  // Spawn initial bugs (spawn 3 bugs)
  for(let i = 0; i < 3; i++) {
    spawnBug()
  }

  addText(`Score: ${score} | Time: ${timeLeft}s`, { y: 0, color: color`4` })

  if (timerId) clearInterval(timerId)
  timerId = setInterval(() => {
    if (gameOver) return

    timeLeft--
    clearText()
    addText(`Score: ${score} | Time: ${timeLeft}s`, { y: 0, color: color`4` })

    if (timeLeft <= 0) {
      clearInterval(timerId)
      gameOver = true
      addText("TIME OVER", { y: 6, color: color`3` })
      stopBackgroundMusic()
    }
  }, 1000)

  playBackgroundMusic()
}

// Bug catching logic
afterInput(() => {
  if (gameOver) return

  const p = getFirst(player)
  const tileBugs = getTile(p.x, p.y).filter(t => t.type === bug)

  if (tileBugs.length > 0) {
    // Remove the bug sprite
    tileBugs[0].remove()
    score++

    clearText()
    addText(`Score: ${score} | Time: ${timeLeft}s`, { y: 0, color: color`4` })

    playTune(catchSound, 1)
    spawnBug()
  }
})

// Move bugs randomly every 500ms
setInterval(() => {
  if (gameOver) return

  const allBugs = getAll(bug)
  allBugs.forEach(b => {
    const dirs = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ]
    const move = dirs[Math.floor(Math.random() * dirs.length)]
    const newX = b.x + move.dx
    const newY = b.y + move.dy

    const targetTile = getTile(newX, newY)
    const isBlocked = targetTile.some(t =>
      t.type === wall || t.type === bug || t.type === player
    )

    if (!isBlocked) {
      b.x = newX
      b.y = newY
    }
  })
}, 500)

// Start game initially
startGame()
