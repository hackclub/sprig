/*
@title: Star Run
@author: Pranav V.M
@description Collect all the stars without getting touched by the space monsters
@tags: ['action']
@addedOn: 2026-11-22
*/

const player = "p"
const enemyH = "e"
const enemyV = "v"
const star = "s"
const wall = "w"
const floor = "f"

setLegend(
  [player, bitmap`
................
......2222......
.....222222.....
.....202202.....
.....222222.....
......2222......
....77777777....
...7777777777...
...7777777777...
...77.7777.77...
......7777......
......7..7......
......7..7......
.....77..77.....
................
................`],
  [enemyH, bitmap`
................
...3........3...
...33......33...
...3333333333...
..333333333333..
..332233332233..
..330233330233..
..333333333333..
..330000000033..
..332222222233..
..333333333333..
...3333333333...
...33.3333.33...
...33......33...
................
................`],
  [enemyV, bitmap`
................
...3........3...
...33......33...
...3333333333...
..333333333333..
..332233332233..
..330233330233..
..333333333333..
..330000000033..
..332222222233..
..333333333333..
...3333333333...
...33.3333.33...
...33......33...
................
................`],
  [star, bitmap`
................
................
.......77.......
.......77.......
......7777......
......7777......
..7777777777777.
...77777777777..
.....777777.....
....77777777....
....777..777....
...777....777...
................
................
................
................`],
  [wall, bitmap`
CCCCCCCCCCCCCCCC
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
C00000000000000C
CCCCCCCCCCCCCCCC`],
  [floor, bitmap`
1000000000000000
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
0000000000000000`]
)

setSolids([player, wall])
setBackground(floor)

const blank = map`
..........
..........
..........
..........
..........
..........
..........
..........`

const levels = [
  // 1 EASY: no monsters
  map`
wwwwwwwwww
wp.....s.w
w.ww.ww..w
w..s..s..w
w.ww.ww..w
w.s....s.w
w........w
wwwwwwwwww`,
  // 2 EASY+: one slow monster along the bottom
  map`
wwwwwwwwww
wp..s...sw
w.ww.ww..w
w.s....s.w
w.ww.ww..w
w........w
ws..e...sw
wwwwwwwwww`,
  // 3 MEDIUM: one monster through the middle
  map`
wwwwwwwwww
wp.......w
w.ww.ww.sw
ws..e...sw
w.ww.ww..w
w..s..s..w
w........w
wwwwwwwwww`,
  // 4 HARD: three monsters
  map`
wwwwwwwwww
wp.s.....w
w..e....sw
w.ww.ww..w
ws..v...sw
w.ww.ww..w
w..s.e...w
wwwwwwwwww`,
  // 5 EXPERT: four monsters
  map`
wwwwwwwwww
wp.s.....w
w.ww.ww..w
ws...e..sw
w.ww.wwv.w
w..s.es..w
ws.e....sw
wwwwwwwwww`
]

const names = ["EASY", "EASY+", "MEDIUM", "HARD", "EXPERT"]
const speeds = [0, 650, 500, 400, 330] // ms per monster step, lower = faster

let level = 0
let state = "title"
let collected = 0
let need = 0
let deaths = 0
let startTime = 0
let enemies = []
let graceTimer = null
let patrolTimer = null
let retryTimer = null

function stopTimers() {
  if (graceTimer) clearTimeout(graceTimer)
  if (patrolTimer) clearInterval(patrolTimer)
  if (retryTimer) clearTimeout(retryTimer)
  graceTimer = null
  patrolTimer = null
  retryTimer = null
}

function blocked(x, y) {
  if (x < 0 || y < 0 || x >= width() || y >= height()) return true
  return getTile(x, y).some(s => s.type === wall)
}

function checkCaught() {
  const p = getFirst(player)
  if (state !== "play" || !p) return
  if (enemies.some(e => e.s.x === p.x && e.s.y === p.y)) die()
}

function tick() {
  if (state !== "play") return
  enemies.forEach(e => {
    let nx = e.s.x + e.dx
    let ny = e.s.y + e.dy
    if (blocked(nx, ny)) {
      e.dx = -e.dx
      e.dy = -e.dy
      nx = e.s.x + e.dx
      ny = e.s.y + e.dy
    }
    if (!blocked(nx, ny)) {
      e.s.x = nx
      e.s.y = ny
    }
  })
  checkCaught()
}

function showTitle() {
  state = "title"
  stopTimers()
  setMap(blank)
  clearText()
  addText("STAR RUN", { x: 6, y: 3, color: color`7` })
  addText("grab all the stars", { x: 1, y: 6, color: color`2` })
  addText("dodge the monsters", { x: 1, y: 7, color: color`2` })
  addText("5 levels", { x: 6, y: 9, color: color`L` })
  addText("press I to start", { x: 2, y: 13, color: color`5` })
}

function hud() {
  clearText()
  addText(names[level], { x: 1, y: 0, color: color`2` })
  addText(`stars ${collected}/${need}`, { x: 10, y: 0, color: color`7` })
}

function load(n) {
  stopTimers()
  setMap(levels[n])
  state = "play"
  collected = 0
  need = getAll(star).length
  enemies = getAll(enemyH)
    .map(s => ({ s: s, dx: 1, dy: 0 }))
    .concat(getAll(enemyV).map(s => ({ s: s, dx: 0, dy: 1 })))
  hud()
  if (enemies.length > 0) {
    // 1.5 second head start before the monsters move
    graceTimer = setTimeout(() => {
      patrolTimer = setInterval(tick, speeds[n])
    }, 1500)
  }
}

function die() {
  state = "dead"
  stopTimers()
  deaths++
  addText("CAUGHT!", { x: 6, y: 7, color: color`3` })
  retryTimer = setTimeout(() => load(level), 1200)
}

function levelDone() {
  state = "wait"
  stopTimers()
  addText("CLEAR!", { x: 7, y: 7, color: color`5` })
  retryTimer = setTimeout(() => {
    level++
    if (level >= levels.length) showEnd()
    else load(level)
  }, 1200)
}

function showEnd() {
  state = "end"
  stopTimers()
  const secs = Math.round((Date.now() - startTime) / 1000)
  setMap(blank)
  clearText()
  addText("YOU WIN!", { x: 6, y: 3, color: color`5` })
  addText(`time: ${secs}s`, { x: 6, y: 6, color: color`2` })
  addText(`caught: ${deaths}x`, { x: 6, y: 7, color: color`2` })
  addText("press I to replay", { x: 1, y: 12, color: color`L` })
}

function move(dx, dy) {
  if (state !== "play") return
  const p = getFirst(player)
  p.x += dx
  p.y += dy
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

onInput("j", () => {
  if (state === "play") load(level)
})

onInput("i", () => {
  if (state === "title" || state === "end") {
    level = 0
    deaths = 0
    startTime = Date.now()
    load(0)
  }
})

afterInput(() => {
  if (state !== "play") return
  const p = getFirst(player)
  const s = getTile(p.x, p.y).find(t => t.type === star)
  if (s) {
    s.remove()
    collected++
  }
  hud()
  checkCaught()
  if (state === "play" && collected === need) levelDone()
})

showTitle()
