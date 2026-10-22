/*
@title: Bug catcher
@author: Viraj
@tags: ['action']
@description: "In this game you have to catch bugs and prevent bad bugs to stung you, use wasd to move and k to restart and also take potion which spawn every 15 sec if you get stung by badbugs"
@addedOn: 2025-09-02
*/
const player = "p"
const bug = "b"
const wall = "w"
const badbug = "x"
const potion = "o"

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
  [ badbug, bitmap`
................
................
....0...0.......
.....0.0........
.0...000...0....
.0..0DDD0..0....
..0.0DDD0.0.....
...0D4DDD0......
...0D44DD0......
..0999C9990.....
.00999C39900....
0.0993C3990.0...
0.0333C3330.0...
...033C330......
....00000.......
................` ],
  [ potion, bitmap`
.......6F.......
......0000......
.....026F20.....
......0220......
......0220......
....00222200....
...0222DD2220...
...024DDDDD20...
..0224DDDDD220..
..0244DDDDDD20..
..0224DDDDD220..
...024DDDDD20...
...0222442220...
....00222200....
......0000......
................` ]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
w....ww..w
.w.p.w.w.w
.ww..w...w
..w..ww.ww
.........w
w.xww...x.
w...w..www
ww.www...w`
]

let score = 0
let timeLeft = 60
let gameOver = false
let timerId
let stingCount = 0   //  track player stings

// background music playback handle
let bgmPlayback = null

// player speed control
let playerMoveDelay = 0
let playerLastMove = 0

setPushables({
  [ player ]: []
})

// Movement (with speed delay)
function tryMove(dx, dy) {
  if (gameOver) return
  const now = Date.now()
  if (now - playerLastMove < playerMoveDelay) return // slowed movement
  playerLastMove = now
  getFirst(player).x += dx
  getFirst(player).y += dy
}

onInput("w", () => tryMove(0, -1))
onInput("s", () => tryMove(0, 1))
onInput("a", () => tryMove(-1, 0))
onInput("d", () => tryMove(1, 0))

// Restart
onInput("k", () => { startGame() })

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

const gameOverFunk = tune`
180: c4-180,
180: e4-180,
180: g4-180,
360: b4-360,
360: g4-360,
360: e4-360,
720: c4-720
`

function playBackgroundMusic() {
  if (bgmPlayback) {
    try { bgmPlayback.end() } catch (e) {}
    bgmPlayback = null
  }
  bgmPlayback = playTune(funkpopTune, 0) // loop forever
}

function stopBackgroundMusic() {
  if (bgmPlayback) {
    try { bgmPlayback.end() } catch (e) {}
    bgmPlayback = null
  }
}

// Spawn bug in empty tile
function spawnBug() {
  const emptyTiles = []
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const tile = getTile(x, y)
      const isFree = tile.every(t =>
        t.type !== wall && t.type !== bug && t.type !== player && t.type !== badbug && t.type !== potion
      )
      if (isFree) emptyTiles.push({ x, y })
    }
  }
  if (emptyTiles.length > 0) {
    const spot = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    addSprite(spot.x, spot.y, bug)
  }
}

//  Spawn potion in empty tile
function spawnPotion() {
  if (gameOver) return
  const emptyTiles = []
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      const tile = getTile(x, y)
      const isFree = tile.every(t =>
        t.type !== wall &&
        t.type !== bug &&
        t.type !== player &&
        t.type !== badbug &&
        t.type !== potion
      )
      if (isFree) emptyTiles.push({ x, y })
    }
  }
  if (emptyTiles.length > 0) {
    const spot = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
    addSprite(spot.x, spot.y, potion)
  }
}

// HUD
function drawHud() {
  clearText()
  addText(`Score: ${score} | Time: ${timeLeft}s`, { y: 0, color: color`4` })
  addText(`Left: ${2 - stingCount}`, { y: 1, color: color`0` })
}

// Start game
let potionInterval = null
function startGame() {
  stopBackgroundMusic()
  clearText()
  score = 0
  timeLeft = 60
  stingCount = 0
  gameOver = false
  setMap(levels[level])

  // remove all bugs and badbugs
  getAll(bug).forEach(b => b.remove())
  getAll(badbug).forEach(bb => bb.remove())
  getAll(potion).forEach(po => po.remove())

  // spawn 5 good bugs
  for (let i = 0; i < 5; i++) spawnBug()

  // spawn 2 badbugs
  for (let i = 0; i < 2; i++) {
    const emptyTiles = []
    for (let x = 0; x < width(); x++) {
      for (let y = 0; y < height(); y++) {
        const tile = getTile(x, y)
        const isFree = tile.every(t =>
          t.type !== wall && t.type !== bug && t.type !== player && t.type !== badbug && t.type !== potion
        )
        if (isFree) emptyTiles.push({ x, y })
      }
    }
    if (emptyTiles.length > 0) {
      const spot = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
      addSprite(spot.x, spot.y, badbug)
    }
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
      clearText()
      addText("YOU WON!", { y: 6, color: color`3` })
      addText(`FINAL SCORE: ${score}`, { y: 8, color: color`5` })
      addText("Press K to restart", { y: 10, color: color`6` })
      stopBackgroundMusic()
      playTune(gameOverFunk, 1)
    }
  }, 1000)

  if (potionInterval) clearInterval(potionInterval)
  potionInterval = setInterval(() => {
    if (!gameOver) spawnPotion()
  }, 15000) //  every 15s

  playBackgroundMusic()
}

// Catch bugs & check stings & potions
afterInput(() => {
  if (gameOver) return
  const p = getFirst(player)

  // catch good bug
  const tileBugs = getTile(p.x, p.y).filter(t => t.type === bug)
  if (tileBugs.length > 0) {
    tileBugs[0].remove()
    score++
    drawHud()
    playTune(catchSound, 1)
    spawnBug()
  }

  // hit bad bug
  const badOnTile = getTile(p.x, p.y).filter(t => t.type === badbug)
  if (badOnTile.length > 0) {
    stingCount++
    if (stingCount >= 2) {
      // instant death after 2 hits (+extra potions if collected)
      clearInterval(timerId)
      gameOver = true
      clearText()
      addText("YOU GOT STUNG!", { y: 6, color: color`3` })
      addText(`FINAL SCORE: ${score}`, { y: 8, color: color`5` })
      addText("Press K to restart", { y: 10, color: color`6` })
      stopBackgroundMusic()
      playTune(gameOverFunk, 1)
      return
    }
    // first sting → just penalty
    score = Math.max(0, score - 2)
    drawHud()
    playerMoveDelay = 400
    setTimeout(() => playerMoveDelay = 0, 3000)
  }

  // pick potion
  const potions = getTile(p.x, p.y).filter(t => t.type === potion)
  if (potions.length > 0) {
    potions[0].remove()
    if (stingCount > 0) stingCount--  //  heal 1 sting
    clearText()
    drawHud()
    addText("+1 Extra Chance!", { y: 13, color: color`0` })
    setTimeout(() => {
      clearText()
      drawHud()
    }, 1500)
  }
})

// Move good bugs randomly
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
    if (newX < 0 || newX >= width() || newY < 0 || newY >= height()) return
    const targetTile = getTile(newX, newY)
    const isBlocked = targetTile.some(t =>
      t.type === wall || t.type === bug || t.type === player || t.type === badbug || t.type === potion
    )
    if (!isBlocked) {
      b.x = newX
      b.y = newY
    }
  })
}, 500)

//  Move bad bugs slower (400ms)
setInterval(() => {
  if (gameOver) return
  const allBadBugs = getAll(badbug)
  allBadBugs.forEach(bb => {
    const dirs = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ]
    const move = dirs[Math.floor(Math.random() * dirs.length)]
    const newX = bb.x + move.dx
    const newY = bb.y + move.dy
    if (newX < 0 || newX >= width() || newY < 0 || newY >= height()) return
    const targetTile = getTile(newX, newY)
    const isBlocked = targetTile.some(t =>
      t.type === wall || t.type === badbug || t.type === potion
    )
    if (!isBlocked) {
      bb.x = newX
      bb.y = newY
    }
  })
}, 400) //  slower now

// Start
startGame()

