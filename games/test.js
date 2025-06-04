/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: test
@author: 
@tags: []
@addedOn: 2025-00-00
*/

// === SPRITES ===
const player = "p"
const wall = "w"
const orb = "o"
const death = "g"
const empty = "."
const background = "b"
const bgm = tune`
120: C4^120,
120: E4^120,
120: G4^120,
120: B4^120,
120: C5^120,
120: B4^120,
120: G4^120,
120: E4^120,
120: F4^120,
120: A4^120,
120: C5^120,
120: A4^120,
120: F4^120,
120: D4^120,
120: G4^120,
120: E4^120,
120: D4^120,
120: C4^120,
120: E4^120,
120: G4^120,
120: B4^120,
120: C5^120,
120: B4^120,
120: G4^120,
120: E4^120,
120: F4^120,
120: A4^120,
120: C5^120,
120: A4^120,
120: F4^120,
120: D4^120,
120: G4^120`
const orbPickup = tune`
120: C4^150, 
120: E4^150, 
120: G4^150, 
120: C5^150`
const gameOverSound = tune`
120: C5^200, 
120: B4^200, 
120: A4^200, 
120: G4^200`



setLegend(
  [player, bitmap`
................
................
................
.......00.......
......0000......
.....003300.....
.....033330.....
.....033330.....
.....033330.....
.....033330.....
.....003300.....
......0000......
.......00.......
................
................
................`],
  [wall, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [orb, bitmap`
................
................
................
................
......9999......
.....996699.....
.....966669.....
.....966669.....
.....966669.....
.....966669.....
.....996699.....
......9999......
................
................
................
................`],
  [death, bitmap`
................
.....CCCCCC.....
....C000000C....
...C03333330C...
..C0336666330C..
..C0363333630C..
..C0363113630C..
..C0363333630C..
..C0366336630C..
..C0336666330C..
...C03333330C...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
................
................`],
  [background, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`]
)

setSolids([player, wall])

setBackground(background)
const playback = playTune(bgm, Infinity)
playback
// === LEVELS ===

const levels = [
  map`
wwwwwwwwww
wp.....o.w
w......g.w
w..og....w
w....o...w
w........w
w........w
wwwwwwwwww`,

  map`
wwwwwwwwww
w......p.w
w..go....w
w..o.g...w
w..g..g..w
w......o.w
w........w
wwwwwwwwww`,

  map`
wwwwwwwwww
w..o...o.w
w...gg...w
w..o..g..w
w....o...w
w.p...g..w
w........w
wwwwwwwwww`,

  map`
wwwwwwwwww
wp......ow
w..w..w..w
w..w..w..w
w.go..o..w
w..w..w..w
w....g...w
wwwwwwwwww`,

  map`
wwwwwwwwww
w...o....w
w.gwpwg..w
w..ogo...w
w.gw.wg..w
w..o.o...w
w....g...w
wwwwwwwwww`,

  map`
wwwwwwwwww
w.ogogo..w
wg.....g.w
w..www...w
w.gopog..w
w........w
w..g.g...w
wwwwwwwwww`,
  map`
wwwwwwwwww
w....ww.ow
w...p.wg.w
w..w.....w
w..wwoww.w
w...g.wo.w
w.....wg.w
wwwwwwwwww`,

  map`
wwwwwwwwww
wwow.g.w.w
wg.gg.g.ww
wg...p.g.w
wg.ggog.ww
wwo.gg.w.w
w.gow.w.ww
wwwwwwwwww`,
]

let currentLevel = 0
let timer = 60
let gameStarted = false
let orbsCollected = 0
let timerInterval = null

// === TITLE SCREEN ===
function showTitleScreen() {
  clearText()
  setMap(map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............`)
  addText("TIME JUMPER", { x: 1, y: 3, color: color`3` })
  addText("Press J to Start", { x: 1, y: 6, color: color`4` })
}

showTitleScreen()

// === START GAME ===
function startGame() {
  gameStarted = true
  currentLevel = 0
  orbsCollected = 0
  timer = 60
  clearText()
  setMap(levels[currentLevel])
  startTimer()
}

onInput("j", () => {
  if (!gameStarted) {
    startGame()
  }
})

// === MOVEMENT ===
onInput("w", () => getFirst(player)?.y > 0 && getFirst(player).y--)
onInput("s", () => getFirst(player)?.y < height() - 1 && getFirst(player).y++)
onInput("a", () => getFirst(player)?.x > 0 && getFirst(player).x--)
onInput("d", () => getFirst(player)?.x < width() - 1 && getFirst(player).x++)

// === TIMER ===
function startTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timer--
    clearText()
    addText(`Time: ${timer}`, { x: 1, y: 0, color: color`2` })
    addText(`Level: ${currentLevel + 1}`, { x: 1, y: 1, color: color`3` })

    if (timer <= 0) {
      clearInterval(timerInterval)
      gameOver()
    }
  }, 1000)
}

// === CHECK ORBS ===
afterInput(() => {
  if (!gameStarted) return
  const p = getFirst(player)
  const things = getTile(p.x, p.y)

  for (let i = 0; i < things.length; i++) {
    if (things[i].type === orb) {
      playTune(orbPickup)
      things[i].remove()
      orbsCollected++
    } else if (things[i].type === death) {
      // Player touched a spike (death tile)
      playback.end(bgm)
      playTune(gameOverSound)
      clearInterval(timerInterval)
      gameOver()
      return
    }
  }

  const remaining = tilesWith(orb)
  if (remaining.length === 0) {
    currentLevel++
    if (currentLevel >= levels.length) {
      youWin()
    } else {
      setMap(levels[currentLevel])
    }
  }
})

// === GAME OVER ===
function gameOver() {
  playback.end()
  clearText()
  setMap(map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`)
  addText("GAME OVER", { x: 2, y: 4, color: color`3` })
  addText(`Score: ${currentLevel}`, { x: 2, y: 6, color: color`H` })
  addText("K = Replay", { x: 2, y: 8, color: color`5` })
  gameStarted = false
}

// === YOU WIN SCREEN ===
function youWin() {
  clearInterval(timerInterval)
  clearText()
  setMap(map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`)
  addText("YOU WIN!", { x: 3, y: 4, color: color`4` })
  addText(`Time Left: ${timer}`, { x: 2, y: 6, color: color`H` })
  addText("K = Replay", { x: 3, y: 8, color: color`5` })
  gameStarted = false
}

onInput("k", () => {
  if (!gameStarted) {
    showTitleScreen()
  }
})

