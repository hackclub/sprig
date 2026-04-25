/*
@title: Spriggle Smash
@author: Jacob Navaratne
@description: A game where "Lil' Guy" gets lost in a maze!
@addedOn: 2026-04-25
@tags: []
*/

const player = "p"
const wall = "w"
const goal = "a"
const portal = "e"
const background = "b"
const level_complete = tune`
164.83516483516485: C5/164.83516483516485 + C4-164.83516483516485,
164.83516483516485: C5/164.83516483516485 + C4-164.83516483516485,
164.83516483516485: G5/164.83516483516485 + C4-164.83516483516485,
164.83516483516485: G5/164.83516483516485 + C4-164.83516483516485,
164.83516483516485: C5/164.83516483516485 + C4-164.83516483516485,
4450.549450549451`

setLegend(
  [player, bitmap`
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
................`],
  [wall, bitmap`
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
LL1LLLLLLL1L12LL`],
  [goal, bitmap`
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
4DDDDDDDDDDDDDD4`],
  [portal, bitmap`
HHHHHHHHHHHHH8HH
H8888888888H888H
H8HHHHHHHHHH8H8H
H8H888888888HH8H
H8H8HHHHHHHH8H8H
H8H8H888888H8H8H
H8H8H8HHHH8H8H8H
H8H8H8H88H8H8H8H
H8H8H8H88H8H8H8H
H8H8H8HHHH8H8H8H
H8H8H8H8888H8H8H
H8H8H8HHHHHH8H8H
H8H88HH888888H8H
H8HHH8HHHHHHHH8H
H888H8888888888H
HHHHHHHHHHHHHHHH`],
  [background, bitmap`
5555555555555555
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5222222222222227
5777777777777777`]
)

const startScreen = map`
ewbbbbbbbbbbwe
wbbbbbbbbbbbbw
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
wbbbbbbbbbbbbw
wwbbbabbbbwwbw
wwweeweaawwwww
wwwwwwaawwwwww
wwwwwwwwwwwwww
`

setSolids([wall, player])
setBackground(background)

const levels = [
  /* level 0 */
  map`
.w.......
...www.w.
..w..w...
..wbb.w..
....wpw..
.ww.www..
..w.wwa..`,

  /* level 1 */
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

  /* level 2: */
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

  /* level 3 */
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
p.................ww`,

  /* level 4 */
  map`
wwwwwwwwwa....w...bwwwww
wwwwwwwwww..w...w..wwwww
wwwwb..wwwwwwww..w..wwww
wwb...........wwwbw..www
ww..ww.ww.ww..wbwbww..ww
wwp.w..w...w.ww.w.w...ww
w..w...w.w......w...w...
.....w.w.ww.ww..ww...w.w
www.ww.w.....ww.w..w.w.w
bw......w..w....w.ww.w..
...w.ww..w.ww..w..w..ww.
w..w..ww......ww.w...ww.
b..ww....wwwwwww...w....
ww.www.ww..ww.bww.w.ww..
w......www.w..wbw.w..w..
w.ww.w.w.w....w.w....ww.
...w.w.w...ww...w..w....
.w..ww.w..ww..w.w.ww...w
bww...www.ww.w..w...ww..
wbb.w.....wbw.....w.....`
]

let level = -1
let isRunning = false
let canWin = false
let startTime = 0
let timerHandle = null

setMap(startScreen)
addText("Press J to start", { y: 6, color: color`0` })

setPushables({
  [player]: []
})

onInput("w", () => {
  const p = getFirst(player)
  if (p) p.y--
})

onInput("s", () => {
  const p = getFirst(player)
  if (p) p.y++
})

onInput("a", () => {
  const p = getFirst(player)
  if (p) p.x--
})

onInput("d", () => {
  const p = getFirst(player)
  if (p) p.x++
})


function startLevel(n) {
  level = n
  setMap(levels[level])
  isRunning = true
  canWin = false
  setTimeout(() => canWin = true, 50)
}

function startTimer() {
  if (timerHandle) clearInterval(timerHandle)
  startTime = Date.now()
  timerHandle = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000)
    clearText()
    addText(`Time: ${seconds}s`, { y: 0, color: color`0` })
  }, 250)
}

function stopTimer() {
  clearInterval(timerHandle)
  timerHandle = null
}

onInput("j", () => {
  if (!isRunning) {
    startLevel(0)
    startTimer()
    clearText()
  }
})

afterInput(() => {
  if (!isRunning) return

  const p = getFirst(player)
  const g = getFirst(goal)
  if (!p || !g) return

  if (canWin && p.x === g.x && p.y === g.y) {
    level++

    if (levels[level] === undefined) {
      stopTimer()
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      clearText()
      addText("Well done!", { y: 4, color: color`0` })
      addText(`Your time: ${elapsed}s`, { y: 5, color: color`0` })
      addText("Press J to restart", { y: 6, color: color`0` })
      isRunning = false
      level = -1
      setMap(startScreen)
      return
    }

    setMap(levels[level])
    canWin = false
    setTimeout(() => canWin = true, 50)
    playTune(level_complete)
  }
})
