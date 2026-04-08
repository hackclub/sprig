/*
@title: trail_maze
@author: fynr1x
@tags: [maze, puzzle]
@addedOn: 2026-03-17
*/
const player = "p"
const wall = "w"
const finish = "f"
const blank = "b"

setLegend(
  [ player, bitmap`
0000000000000000
0006666666660000
0066666666660000
0066660066660000
0066660066660000
0066666666660000
0006666666600000
0000066660000000
0000066660000000
0000666666000000
0006600066000000
0066000006600000
0660000000660000
0600000000060000
0000000000000000
0000000000000000` ],
  [ wall, bitmap`
1111111111111111
1100000000000011
1011111111111101
1011111111111101
1011110000111101
1011100000011101
1011100000011101
1011100000011101
1011100000011101
1011110000111101
1011111111111101
1011111111111101
1100000000000011
1111111111111111
0000000000000000
0000000000000000` ],
  [ finish, bitmap`
0000066666000000
0006666666660000
0066600066006600
0066000000006600
0660000660000660
0660066666600660
0660666666660660
0660666666660660
0660066666600660
0660000660000660
0066000000006600
0066600066006600
0006666666660000
0000066666000000
0000000000000000
0000000000000000` ],
  [ blank, bitmap`
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
0000000000000000` ]
)

setSolids([ player, wall ])

let level = 0
let timerInterval = null
let elapsedSeconds = 0
let bestTimes = []
let gameOver = false

const winScreen = map`
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb
bbbbbbbbbb`

const levels = [
  map`
p.....
.wwww.
......
.wwww.
......
wwwwwf`,
  map`
p.....
.wwww.
.w....
.w.www
.w....
.wwwwf`,
  map`
p.w.w.w
.......
w.w.w..
.......
.w.w.ww
.......
ww.w..f`,
  map`
p.w.....
...w.ww.
.w.w..w.
.w...ww.
.wwwww..
.......w
wwwwww.w
f......w`,
  map`
p.........
ww...wwww.
..........
.wwww...ww
..........
ww....www.
..........
fwwwwwwwww`,
  map`
p...........
ww....wwwww.
............
.wwwwwww...w
............
ww...wwwwww.
............
.wwwwwww...w
............
wwwwwwwwwwwf`
]

function startTimer() {
  stopTimer()
  elapsedSeconds = 0
  updateTimerDisplay()
  timerInterval = setInterval(() => {
    elapsedSeconds++
    updateTimerDisplay()
  }, 1000)
}

function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function updateTimerDisplay() {
  clearText()
  const mins = Math.floor(elapsedSeconds / 60)
  const secs = elapsedSeconds % 60
  const timeStr = mins > 0
    ? `${mins}m ${secs < 10 ? "0" : ""}${secs}s`
    : `${secs}s`
  addText(`L${level + 1}  ${timeStr}`, { x: 1, y: 0, color: color`3` })
  addText(`i=reset`, { x: 1, y: 1, color: color`2` })
}

function showWinScreen() {
  gameOver = true
  setMap(winScreen)
  clearText()

  // Total time across all levels
  const total = bestTimes.reduce((a, b) => a + b, 0)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  const totalStr = mins > 0
    ? `${mins}m ${secs < 10 ? "0" : ""}${secs}s`
    : `${secs}s`

  addText(`YOU WIN!`, { x: 1, y: 1, color: color`4` })
  addText(`Total: ${totalStr}`, { x: 1, y: 3, color: color`3` })
  addText(`----------------`, { x: 0, y: 4, color: color`2` })
  addText(`i = play again`, { x: 1, y: 6, color: color`D` })
}

function resetGame() {
  gameOver = false
  level = 0
  bestTimes = []
  setMap(levels[level])
  startTimer()
}

function resetLevel() {
  if (gameOver) {
    resetGame()
    return
  }
  stopTimer()
  setMap(levels[level])
  startTimer()
}

setMap(levels[level])
startTimer()
setPushables({ [player]: [] })

function movePlayer(dx, dy) {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return
  const oldX = p.x
  const oldY = p.y
  if (dx !== 0) p.x += dx
  if (dy !== 0) p.y += dy
  if (p.x !== oldX || p.y !== oldY) {
    addSprite(oldX, oldY, wall)
  }
}

onInput("s", () => movePlayer(0, 1))
onInput("w", () => movePlayer(0, -1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
onInput("i", () => resetLevel())

afterInput(() => {
  if (gameOver) return
  const p = getFirst(player)
  const f = getFirst(finish)
  if (!p || !f) return

  if (p.x === f.x && p.y === f.y) {
    stopTimer()
    bestTimes[level] = bestTimes[level] !== undefined
      ? Math.min(bestTimes[level], elapsedSeconds)
      : elapsedSeconds

    level++
    if (level < levels.length) {
      setMap(levels[level])
      startTimer()
    } else {
      showWinScreen()
    }
  }
})