/*
@title: Bug catcher
@author: Viraj
@tags: [In this game which i've made you've to catch the bugs which are moving around the map in 60 seconds and when the time overs you can see your final score and press K to restart the game]
@addedOn: 2025-05-23
*/
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
ww.wwwww.
w.p.wb..b
.w.wwwww.
.w.....w.
....ww.w.
w..www.w.
ww..bw...`
]

let score = 0
let timeLeft = 60
let gameOver = false
let timerId

// handle for background music playback so we can stop it
let bgmPlayback = null

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

// NEW: one-shot funk jingle for game over
const gameOverFunk = tune`
180: c4-180,
180: e4-180,
180: g4-180,
360: b4-360,
360: g4-360,
360: e4-360,
720: c4-720
`

// play/stop background music with a handle
function playBackgroundMusic() {
  // end any previous loop before starting a new one
  if (bgmPlayback) {
    try { bgmPlayback.end() } catch (e) {}
    bgmPlayback = null
  }
  // 0 = loop infinitely in Sprig
  bgmPlayback = playTune(funkpopTune, 0)
}

function stopBackgroundMusic() {
  if (bgmPlayback) {
    try { bgmPlayback.end() } catch (e) {}
    bgmPlayback = null
  }
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

// HUD helper
function drawHud() {
  clearText()
  addText(`Score: ${score} | Time: ${timeLeft}s`, { y: 0, color: color`4` })
}

// Start the game
function startGame() {
  stopBackgroundMusic()   // stop any existing loop first
  clearText()
  score = 0
  timeLeft = 60
  gameOver = false
  setMap(levels[level])

  // Remove all existing bugs (if any)
  getAll(bug).forEach(b => b.remove())

  // Spawn initial bugs (spawn 4 bugs)
  for (let i = 0; i < 4; i++) {
    spawnBug()
  }

  drawHud()

  if (timerId) clearInterval(timerId)
  timerId = setInterval(() => {
    if (gameOver) return

    timeLeft--
    drawHud()

    if (timeLeft <= 0) {
      clearInterval(timerId)
      gameOver = true

      // TIME OVER + FINAL SCORE (BLUE) + restart hint
      addText("TIME OVER", { y: 6, color: color`3` })
      addText(`FINAL SCORE: ${score}`, { y: 8, color: color`1` }) // blue
      addText("Press K to restart", { y: 10, color: color`6` })

      // stop loop and play the one-shot funk jingle
      stopBackgroundMusic()
      playTune(gameOverFunk, 1)
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

    drawHud()

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

    // Guard against moving off the map
    if (newX < 0 || newX >= width() || newY < 0 || newY >= height()) return

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
