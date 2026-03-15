/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Spriggle Smash
@author: Jacob Navaratne
@tags: [my first project!]
@addedOn: 2026-02-23
*/

const player = "p"
const wall = "w"
const goal = "a"

setLegend(
  [ player, bitmap`
................
................
....DDFDF4......
....F000004.....
...D0222220.....
...C0202020C....
...002020200....
...001222200....
....0111220C....
....C00000......
......0.0.......
......0.0.......
................
................
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLL1
L2121LLLL1LL2L1L
L1LL11LL12LLL1LL
L2LLLLLLLLLL2LLL
L2LL12LL2LL1L2LL
LLLLL1LLLLLLLLL1
L1LLLLLL1LLLLLLL
LLL1L22LL1L1L11L
LLLLLLLLLLLLLLLL
L11LL1LL1LLLL1LL
LLLL2LL2LLL111L1
LLL1LL1L1LLL1LLL
1LLLLLL1LL1LLLL1
LLLL1LLLLLLL1LLL
LLL2LLL1LL121LL1
LL1LLLLLLL1L12LL` ],
  [ goal, bitmap`
4DDDDDDDDDDDDDD4
D44444444444444D
D44DDDDDDDDDD44D
D4D4444444444D4D
D4D44DDDDDD44D4D
D4D4D444444D4D4D
D4D4D44DD44D4D4D
D4D4D4D75D4D4D4D
D4D4D4D57D4D4D4D
D4D4D44DD44D4D4D
D4D4D444444D4D4D
D4D44DDDDDD44D4D
D4D4444444444D4D
D44DDDDDDDDDD44D
D44444444444444D
4DDDDDDDDDDDDDD4`] 
)

// short success chime (tune editor format)
const winTune = tune`
t120
c4-8 e4-8 g4-8 c5-4
`

let currentPlayback = null

let startTime = null        // timestamp in ms when run starts
let timerHandle = null      // interval id so we can stop it

let level = -1  // start at the start screen

const startScreen = map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`

setSolids([ wall , player ])

/* ---------- levels (all maps must be rectangular) ---------- */
const levels = [
  /* level 0: 7 cols x 7 rows (rectangular) */
  map`
.w.......
...www.w.
..w..w...
..w...w..
....wpw..
.ww.www..
..w.wwa..`,

  /* level 1: 11 cols x 11 rows (rectangular) */
  map`
......w..ww.p
.ww..ww.ww..w
..w..w......w
.........w.ww
..wwwww.ww...
ww....w......
.w..w...w.ww.
....w.www.ww.
.wwww.ww.....
...w....w..ww
...aw...w...w`,

  /* level 2: 18 cols x 16 rows (rectangular) */
  map`
wwwwwwwwwwwwwwwwww
w....w......w....w
w.ww.w.wwww.w.ww.w
w.w..w....w.w....w
w.w.ww.ww.w.ww.www
w.w....w..w......w
w.wwww.w.ww.wwww.w
w....w.w....w....w
wwww.w.wwww.w.ww.w
w....w....w.w..w.w
w.ww.wwww.w.ww.w.w
w.w......w....w..w
w.w.wwww.wwww.ww.w
w...w....w......aw
www.w.ww.w.wwwwwww
p...w....w........`,

  /* level 3: 20 cols x 18 rows (rectangular) */
  map`
wwwwwwwwwwwwwwwwwwww
w..w....w....w....aw
w..w.ww.w.ww.w.ww..w
w..w.w..w....w..w..w
w..w.w.ww.ww.ww.w..w
w..w.w....w......w.w
w..w.wwww.w.ww...w.w
w..w......w..w.w.w.w
w..wwwwww.ww.w.w.w.w
w.............w.w..w
w.ww.wwwwwwww.w.ww.w
w.w..w......w.w...ww
w.w.ww.wwww.w.wwwwww
w.w....w..w.w.....ww
w.wwww.w.ww.w.wwwwww
w......w....w.....ww
w.wwwwwwwwww.wwww.ww
p.................ww`
]

/* ---------- initial screen ---------- */
setMap(startScreen)
addText("Press J to start", { y: 6, color: color`3` })

setPushables({
  [ player ]: []
})

/* movement controls */
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

/* --- New small state & helpers to prevent accidental immediate wins --- */
let isRunning = false
let canWin = false

function startLevel(n) {
  level = n
  setMap(levels[level])
  isRunning = true
  canWin = false
  // small delay so map load doesn't immediately trigger a win if player spawns on goal
  setTimeout(() => {
    canWin = true
  }, 50)
}

function startTimer() {
  if (timerHandle) clearInterval(timerHandle)
  startTime = Date.now()
  // update timer at top of screen; use a readable color (color`7`)
  timerHandle = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000)
    clearText()
    addText(`Time: ${seconds}s`, { y: 0, color: color`7` })
  }, 250)
}

function stopTimer() {
  if (timerHandle) {
    clearInterval(timerHandle)
    timerHandle = null
  }
}

/* start / restart button */
onInput("j", () => {
  if (level === -1) {
    // start the first level properly
    startLevel(0)
    startTimer()
    clearText()
  } else if (!isRunning && level === -1) {
    // fallback (not strictly necessary)
    startLevel(0)
    startTimer()
    clearText()
  } else if (!isRunning && level !== -1) {
    // if we are in a non-running state but not start screen, allow restart
    startLevel(0)
    startTimer()
    clearText()
  }
})

// these get run after every input
afterInput(() => {
  // only check wins while a level is actively running
  if (!isRunning) return

  // check if player reached the goal
  const p = getFirst(player)
  const g = getFirst(goal)

  // safety: if player or goal missing, do nothing (but keep timer running)
  if (!p || !g) return

  // only allow winning if the small guard has been lifted
  if (canWin && p.x === g.x && p.y === g.y) {
    level++

    const currentLevel = levels[level]

    // when finishing all levels
    if (currentLevel === undefined) {
      // stop timer
      stopTimer()

      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      clearText()
      addText("Well done!", { y: 4, color: color`7` })
      addText(`Your time: ${elapsed}s`, { y: 5, color: color`7` })
      addText("Press J to restart", { y: 6, color: color`7` })

      // reset state to start screen
      isRunning = false
      level = -1
      setMap(startScreen)
    } else {
      // load next level and reset the small win guard
      setMap(currentLevel)
      canWin = false
      setTimeout(() => {
        canWin = true
      }, 50)
      // stop any previous playback
if (currentPlayback) {
  currentPlayback.end()
  currentPlayback = null
}

// play the win chime once
currentPlayback = playTune(winTune, 1)
    }
  }
})
