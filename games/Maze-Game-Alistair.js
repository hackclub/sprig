const P = "p"
const W = "w"
const G = "g"
const F = "f"

setLegend(
  [P, bitmap`
................
................
......3333......
.....333333.....
.....333333.....
......3333......
......3..3......
.....33..33.....
.....3....3.....
....33....33....
....3......3....
....3......3....
....33....33....
.....33..33.....
......3..3......
................`],
  [W, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1L111111111111L1
1L1LLLLLLLLLL1L1
1L1L11111111L1L1
1L1L1LLLLLL1L1L1
1L1L1L1111L1L1L1
1L1L1L1LL1L1L1L1
1L1L1L1111L1L1L1
1L1L1LLLLLL1L1L1
1L1L11111111L1L1
1L1LLLLLLLLLL1L1
1L111111111111L1
1LLLLLLLLLLLLLL1
1111111111111111`],
  [G, bitmap`
6666666666666666
6777777777777776
6776666666666676
6776777777777676
6776766666667676
6776767777767676
6776767666767676
6776767777767676
6776766666667676
6776777777777676
6776666666666676
6777777777777776
6666666666666666
................
................
................`],
  [F, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
)

setSolids([P, W])

const blankEasy = map`
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff`

const blankMed = map`
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff
fffffffffffffffffff`

const blankHard = map`
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff
fffffffffffffffffffffffff`

const menuMap = map`
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff`

const diffs = [
  { name: "EASY",   blank: blankEasy, w: 15, h: 11 },
  { name: "MEDIUM", blank: blankMed,  w: 19, h: 13 },
  { name: "HARD",   blank: blankHard, w: 25, h: 17 }
]

let bestMs = [null, null, null]
let state = "menu" 
let menuIndex = 0
let startMs = 0
let lastRunMs = 0
let winReturnTicks = 0

function r(n) { return Math.floor(Math.random() * n) }

function fmtMs(ms) {
  const s = Math.floor(ms / 10) / 100
  return s.toFixed(2) + "s"
}

function generateGrid(Wd, Hd) {
  const grid = Array.from({ length: Hd }, () => Array.from({ length: Wd }, () => 1))

  function carve(x, y) {
    grid[y][x] = 0
    const dirs = [[2,0],[-2,0],[0,2],[0,-2]]
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = r(i + 1)
      const t = dirs[i]; dirs[i] = dirs[j]; dirs[j] = t
    }
    for (const [dx, dy] of dirs) {
      const nx = x + dx, ny = y + dy
      if (nx > 0 && nx < Wd - 1 && ny > 0 && ny < Hd - 1 && grid[ny][nx] === 1) {
        grid[y + dy/2][x + dx/2] = 0
        carve(nx, ny)
      }
    }
  }

  carve(1, 1)

  for (let x = 0; x < Wd; x++) { grid[0][x] = 1; grid[Hd-1][x] = 1 }
  for (let y = 0; y < Hd; y++) { grid[y][0] = 1; grid[y][Wd-1] = 1 }

  return grid
}

function farthest(grid) {
  const H = grid.length, Wd = grid[0].length
  const dist = Array.from({ length: H }, () => Array.from({ length: Wd }, () => -1))
  const q = [[1,1]]
  dist[1][1] = 0
  let bx = 1, by = 1, bd = 0

  while (q.length) {
    const [x,y] = q.shift()
    const d = dist[y][x]
    if (d > bd) { bd = d; bx = x; by = y }
    for (const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x+dx, ny = y+dy
      if (nx>=1 && nx<Wd-1 && ny>=1 && ny<H-1 && grid[ny][nx]===0 && dist[ny][nx]===-1) {
        dist[ny][nx] = d+1
        q.push([nx,ny])
      }
    }
  }
  return { x: bx, y: by }
}

function renderMenu() {
  state = "menu"
  setMap(menuMap)
  clearText()

  addText("MAZE RUNNER", { x: 4, y: 2, color: color`5` })
  addText("W/S pick",    { x: 4, y: 5, color: color`7` })
  addText("J start",     { x: 5, y: 6, color: color`7` })

  for (let i = 0; i < 3; i++) {
    const prefix = (i === menuIndex) ? ">" : " "
    const b = bestMs[i] === null ? "--" : fmtMs(bestMs[i])
    addText(prefix + diffs[i].name + "  " + b, { x: 2, y: 9 + i, color: color`3` })
  }
}

function startGame() {
  const d = diffs[menuIndex]
  const grid = generateGrid(d.w, d.h)
  const startX = 1, startY = 1
  const goalPos = farthest(grid)

  setMap(d.blank)
  clearText()

  for (let y = 0; y < d.h; y++) {
    for (let x = 0; x < d.w; x++) {
      if (grid[y][x] === 1) addSprite(x, y, W)
    }
  }

  addSprite(goalPos.x, goalPos.y, G) 
  addSprite(startX, startY, P)

  startMs = Date.now()
  lastRunMs = 0

  state = "play"
}

function onWin() {
  state = "win"
  lastRunMs = Date.now() - startMs
  const curBest = bestMs[menuIndex]
  if (curBest === null || lastRunMs < curBest) bestMs[menuIndex] = lastRunMs

  clearText()
  addText("ESCAPED!", { x: 4, y: 4, color: color`2` })
  addText("TIME: " + fmtMs(lastRunMs), { x: 2, y: 6, color: color`7` })
  addText("BEST: " + fmtMs(bestMs[menuIndex]), { x: 2, y: 7, color: color`7` })
  addText("RETURNING...", { x: 1, y: 9, color: color`3` })

  winReturnTicks = 25
}

let dx = 0
let dy = 0
let lastDirTick = 0
let tick = 0

function setDir(nx, ny) {
  if (state !== "play") return
  dx = nx; dy = ny
  lastDirTick = tick
}

function tryStep() {
  if (state !== "play") return
  const p = getFirst(P)
  if (!p) return

  p.x += dx
  p.y += dy

  if (getTile(p.x, p.y).some(t => t.type === G)) onWin()
}

function drawHUD() {
  if (state !== "play") return
  const ms = Date.now() - startMs
  const best = bestMs[menuIndex]
  clearText()
  addText("TIME " + fmtMs(ms), { x: 0, y: 0, color: color`7` })
  addText("BEST " + (best === null ? "--" : fmtMs(best)), { x: 0, y: 1, color: color`3` })
}

setInterval(() => {
  tick++

  if (state === "play" && tick - lastDirTick > 3) { dx = 0; dy = 0 }
  if (dx !== 0 || dy !== 0) tryStep()

  drawHUD()

  if (state === "win") {
    winReturnTicks--
    if (winReturnTicks <= 0) renderMenu()
  }
}, 80)

function menuUp()   { menuIndex = (menuIndex + 2) % 3; renderMenu() }
function menuDown() { menuIndex = (menuIndex + 1) % 3; renderMenu() }

onInput("w", () => { if (state==="menu") menuUp();   else setDir(0, -1) })
onInput("s", () => { if (state==="menu") menuDown(); else setDir(0,  1) })
onInput("a", () => { if (state==="play") setDir(-1, 0) })
onInput("d", () => { if (state==="play") setDir( 1, 0) })

onInput("j", () => {
  if (state === "menu") startGame()
})

renderMenu()