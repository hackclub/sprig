/*
@title: New New Ton
@description: A maze game with 3 levels, a step counter and sound effects. Find your way through each maze and reach the red flag to win.
@author: Himanshu Sapkota
@tags: ['beginner', 'maze', 'puzzle']
@addedOn: 2026-11-08
*/

const player = "p"
const goal = "g"
const wall = "w"

setLegend(
  [player, bitmap`
................
.....000000.....
....00000000....
....06666660....
....06066060....
....06666660....
....06666660....
......6666......
...7777777777...
..667777777766..
..667777777766..
...7777777777...
....LL....LL....
....LL....LL....
....00....00....
................`],
  [goal, bitmap`
................
................
...333333333....
...333333333....
...333333333....
...3333333333...
...3333333333...
...333333333....
...333333333....
...33...........
...33...........
...33...........
...33...........
...33...........
................
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setSolids([player, wall])

const moveTune = tune`
50: C5~50,
50`

const levelTune = tune`
100: E5~100,
100: G5~100,
100: C6~100,
100`

const winTune = tune`
150: C5~150,
150: E5~150,
150: G5~150,
150: C6~150,
150`

const levels = [
  map`
wwwwwwwwww
wp...w...w
w.ww.w.w.w
w.w..w.w.w
w.w.ww.w.w
w.w....w.w
w....w..gw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.w.....w
w..w.www.w
ww.w.w...w
w..w.w.www
w.ww.w...w
w....w.wgw
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.......w
wwwwwww.ww
w.......ww
w.wwwwwwww
w........w
wwwww.wwgw
wwwwwwwwww`
]

const emptyMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`

let level = 0
let steps = 0
let total = 0
let won = false
let lastX = 0
let lastY = 0

function showHud() {
  clearText()
  addText("Level " + (level + 1), { x: 1, y: 0, color: color`0` })
  addText("Steps " + steps, { x: 11, y: 0, color: color`0` })
  addText("J: restart", { x: 5, y: 15, color: color`0` })
}

function startLevel() {
  setMap(levels[level])
  const p = getFirst(player)
  lastX = p.x
  lastY = p.y
  showHud()
}

function restartGame() {
  won = false
  level = 0
  steps = 0
  total = 0
  startLevel()
}

startLevel()

onInput("w", () => { if (!won) getFirst(player).y -= 1 })
onInput("s", () => { if (!won) getFirst(player).y += 1 })
onInput("a", () => { if (!won) getFirst(player).x -= 1 })
onInput("d", () => { if (!won) getFirst(player).x += 1 })
onInput("j", () => { restartGame() })

afterInput(() => {
  if (won) return

  const p = getFirst(player)
  if (p.x !== lastX || p.y !== lastY) {
    lastX = p.x
    lastY = p.y
    steps += 1
    total += 1
    playTune(moveTune)
    showHud()
  }

  if (tilesWith(player, goal).length > 0) {
    if (level < levels.length - 1) {
      level += 1
      steps = 0
      playTune(levelTune)
      startLevel()
    } else {
      won = true
      playTune(winTune)
      setMap(emptyMap)
      clearText()
      addText("You win!", { x: 6, y: 6, color: color`0` })
      addText("Total steps " + total, { x: 3, y: 8, color: color`0` })
      addText("J: play again", { x: 3, y: 11, color: color`0` })
    }
  }
})
