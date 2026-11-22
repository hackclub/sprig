/*
@title: Heart Platformer
@tags: ['platformer']
@addedOn: 2026-11-21
*/
const player = "p"
const playerLeft = "q"
const heart = "h"
const flag = "f"
const pole = "o"
const grass = "g"
const dirt = "d"
const sky = "s"
setLegend(
  [player, bitmap`
.......CC.......
....CCCCC.CC....
...CCCCCCCCCC...
...C88CCC888C...
.CCC88888888CC..
.CCC88888888CC..
.CC88C888C88CC..
CCC888888888CCC.
CC888888888888C.
.8888888888888..
CC88888888888C..
CCC888888888CCC.
.CC888888888CC..
.CC888888888C...
..CC8888888C....
....888.888.....
`],
  [playerLeft, bitmap`
.......CC.......
....CC.CCCCC....
...CCCCCCCCCC...
...C888CCC88C...
..CC88888888CCC.
..CC88888888CCC.
..CC88C888C88CC.
.CCC888888888CCC
.C888888888888CC
..8888888888888.
..C88888888888CC
.CCC888888888CCC
..CC888888888CC.
...C888888888CC.
....C8888888CC..
.....888.888....`],
  [heart, bitmap`
................
................
...CCC....CCC...
..C333C..C333C..
.C33333CC33333C.
C3333333333333CC
C33883333333333C
C3333333333CC33C
C333333333CCC33C
.C3333333CCC33C.
..C333333CC33C..
...C3333CC33C...
....C333C33C....
.....CC333C.....
......CCCC......
.......CC.......`],
  [flag, bitmap`
.....LL.........
.....LL66666....
.....LL66666666.
.....LL66666666.
.....LL66666666.
.....LL66666....
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
`],
  [pole, bitmap`
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........
.....LL.........`],
  [grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
`],
  [dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
`]
)
setBackground(sky)
const levels = [
  map`
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
.........................................................
............................h............................
..........................ggggg..........................
....................h..............................f.....
..p...............ggggg...........ggggg............o.....
ggggggggggggggg...........................ggggggggggggg..
ddddddddddddddd...........................ddddddddddddd..
`,
  map`
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
........................................................................
.....................................................h..................
.......................h....gggg...h................gggg..........f.....
......................gggg........gggg........gggg................o.....
..p............gggg.......................................gggggggggggg..
ggggggggggggg...........................ggg...............dddddddddddd..
ddddddddddddd...........................................................
`,
  map`
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
.........................................................................................
...............................................................h.........................
..........................h...ggg..............................gg........................
.........................ggg.......ggg....................gg.............................
.........................................h..........................ggg...........f......
....................ggg..................gg.........gg............................o......
..p...........ggg.............................gg..........................ggggggggggggg..
gggggggggg................................................................ddddddddddddd..
dddddddddd...............................................................................
`,
  map`
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
........................................................................................
.............................h....gg..........................gg........................
............................gg..........gg...............h..............................
.......................gg.....................gg.........gg.........gg..................
.................gg.................................gg............................f.....
..p........gg.....................................................................o.....
gggggggg.................................................................ggggggggggggg..
dddddddd.................................................................ddddddddddddd..
`
]
const VIEW_W = 20
const VIEW_H = 16
const DT = 1 / 30
const SPEED = 5.5
const GRAV = 26
const JUMP = 12
const MAX_FALL = 14
const HB_L = 0.2
const HB_R = 0.8
const HB_T = 0.1
const HB_B = 1.0
let level = 0
let grid = []
let W = 0
let H = 0
let hearts = 0
let cam = 0
let dirty = true
let won = false
let sprite = null
let hudKey = ""
let P = { x: 0, y: 0, vy: 0, dir: 0, face: 1, ground: false, coyote: 0, jumpBuf: 0, cx: 0, cy: 0 }

function loadLevel(n) {
  level = n
  won = false
  grid = levels[n].trim().split("\n").map(row => row.trim().split(""))
  H = grid.length
  W = grid[0].length
  hearts = 0
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (grid[r][c] == "p") {
        grid[r][c] = "."
        P = { x: c, y: r, vy: 0, dir: 0, face: 1, ground: true, coyote: 0, jumpBuf: 0, cx: c, cy: r }
      }
    }
  }
  cam = 0
  dirty = true
  hudKey = ""
}

function solidAt(c, r) {
  if (c < 0 || c >= W) return true
  if (r < 0 || r >= H) return false
  const t = grid[r][c]
  return t == "g" || t == "d"
}

function hits(x, y) {
  const left = Math.floor(x + HB_L)
  const right = Math.floor(x + HB_R - 0.000001)
  const top = Math.floor(y + HB_T)
  const bottom = Math.floor(y + HB_B - 0.000001)
  for (let r = top; r <= bottom; r++) {
    for (let c = left; c <= right; c++) {
      if (solidAt(c, r)) return true
    }
  }
  return false
}

function step() {
  if (P.dir != 0) {
    let nx = P.x + P.dir * SPEED * DT
    if (hits(nx, P.y)) {
      if (P.dir > 0) nx = Math.floor(nx + HB_R) - HB_R - 0.0001
      else nx = Math.floor(nx + HB_L) + 1 - HB_L + 0.0001
    }
    P.x = nx
    P.face = P.dir
  }
  if (P.jumpBuf > 0) P.jumpBuf--
  if (P.coyote > 0) P.coyote--
  if (P.jumpBuf > 0 && (P.ground || P.coyote > 0)) {
    P.vy = -JUMP
    P.ground = false
    P.coyote = 0
    P.jumpBuf = 0
  }
  P.vy = Math.min(P.vy + GRAV * DT, MAX_FALL)
  let ny = P.y + P.vy * DT
  const wasOnGround = P.ground
  P.ground = false
  if (hits(P.x, ny)) {
    if (P.vy > 0) {
      ny = Math.floor(ny + HB_B) - HB_B - 0.0001
      P.ground = true
    } else {
      ny = Math.floor(ny + HB_T) + 1 - HB_T + 0.0001
    }
    P.vy = 0
  }
  P.y = ny
  if (wasOnGround && !P.ground && P.vy >= 0) P.coyote = 4
  const left = Math.floor(P.x + HB_L)
  const right = Math.floor(P.x + HB_R - 0.000001)
  const top = Math.floor(P.y + HB_T)
  const bottom = Math.floor(P.y + HB_B - 0.000001)
  let atFlag = false
  for (let r = top; r <= bottom; r++) {
    for (let c = left; c <= right; c++) {
      if (r < 0 || r >= H || c < 0 || c >= W) continue
      const tile = grid[r][c]
      if (tile == "h") {
        grid[r][c] = "."
        hearts++
        P.cx = c
        P.cy = r
        dirty = true
      }
      if (tile == "f" || tile == "o") atFlag = true
    }
  }
  if (atFlag) return "goal"
  if (P.y > H + 1) return "dead"
  return null
}

function die() {
  if (hearts > 0) {
    hearts--
    P.x = P.cx
    P.y = P.cy
    P.vy = 0
    P.dir = 0
    P.ground = false
  } else {
    loadLevel(level)
  }
}

function viewString() {
  const rows = []
  for (let r = 0; r < VIEW_H; r++) {
    rows.push(grid[r].slice(cam, cam + VIEW_W).join(""))
  }
  return rows.join("\n")
}

function updateCamera() {
  const oldCam = cam
  const screenX = P.x - cam
  if (screenX > 12) cam = Math.floor(P.x - 12)
  if (screenX < 7) cam = Math.ceil(P.x - 7)
  cam = Math.max(0, Math.min(W - VIEW_W, cam))
  if (cam != oldCam) dirty = true
}

function drawPlayer() {
  const tx = Math.round(P.x) - cam
  const ty = Math.round(P.y)
  const type = P.face > 0 ? player : playerLeft
  if (ty < 0 || ty >= VIEW_H || tx < 0 || tx >= VIEW_W) {
    if (sprite) {
      sprite.remove()
      sprite = null
    }
    return
  }
  if (!sprite || sprite.type != type) {
    if (sprite) sprite.remove()
    addSprite(tx, ty, type)
    sprite = getFirst(type)
  } else {
    sprite.x = tx
    sprite.y = ty
  }
}

function drawHud() {
  const key = hearts + "," + level
  if (key == hudKey) return
  hudKey = key
  clearText()
  addText("HEARTS " + hearts, { x: 1, y: 0, color: color`0` })
  addText("LEVEL " + (level + 1), { x: 13, y: 0, color: color`0` })
}

function render() {
  updateCamera()
  if (dirty) {
    setMap(viewString())
    sprite = null
    dirty = false
  }
  drawPlayer()
  drawHud()
}

function showWin() {
  won = true
  sprite = null
  hudKey = ""
  setMap(("....................\n").repeat(VIEW_H))
  clearText()
  addText("YOU WIN!", { y: 5, color: color`0` })
  addText("hearts left: " + hearts, { y: 7, color: color`3` })
  addText("press j to", { y: 10, color: color`L` })
  addText("play again", { y: 11, color: color`L` })
}

function nextLevel() {
  if (level + 1 < levels.length) loadLevel(level + 1)
  else showWin()
}
onInput("d", () => { P.dir = 1 })
onInput("a", () => { P.dir = -1 })
onInput("s", () => { P.dir = 0 })
onInput("w", () => { P.jumpBuf = 6 })
onInput("j", () => { loadLevel(won ? 0 : level) })
onInput("i", () => { loadLevel(Math.max(0, won ? levels.length - 1 : level - 1)) })
onInput("l", () => { if (!won) nextLevel() })
setInterval(() => {
  if (won) return
  const result = step()
  if (result == "goal") nextLevel()
  if (result == "dead") die()
  if (!won) render()
}, 33)
loadLevel(0)
render()