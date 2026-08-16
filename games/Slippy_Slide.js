/*
@title: Slippy Slide
@author: schnoplet
@tags: []
@addedOn: 2026-04-07
@description: A sliding puzzle game where you must use careful alignment and directional movement to reach the goal.
*/

const P = "p"
const W = "w"
const G = "g"
const F = "f"

setLegend(
  [P, bitmap`
................
................
.......11.......
.....111111.....
....11111111....
....11111111....
...1111111111...
...1111111111...
...1111111111...
...1111111111...
....11111111....
....11111111....
.....111111.....
.......11.......
................
................`],

  [W, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

  [G, bitmap`
................
................
.......44.......
.....444444.....
....44444444....
....44444444....
...4444444444...
...4444444444...
...4444444444...
...4444444444...
....44444444....
....44444444....
.....444444.....
.......44.......
................
................`],

  [F, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setSolids([W])
setBackground(F)

const WIDTH = 10
const HEIGHT = 8

const TITLE_MAP = map`
wwwwwwwwww
wffffffffw
wffffffffw
wffffffffw
wffffffffw
wffffffffw
wffffffffw
wwwwwwwwww`

const DIRS = [
  { dx: 0, dy: -1, key: "U" },
  { dx: 0, dy: 1, key: "D" },
  { dx: -1, dy: 0, key: "L" },
  { dx: 1, dy: 0, key: "R" },
]

const PATTERNS = [
  [
    { dx: 1, dy: 0, len: 4 },
    { dx: 0, dy: 1, len: 2 },
    { dx: -1, dy: 0, len: 3 },
    { dx: 0, dy: 1, len: 2 },
    { dx: 1, dy: 0, len: 2 },
    { dx: 0, dy: -1, len: 1 },
  ],
  [
    { dx: 0, dy: 1, len: 3 },
    { dx: 1, dy: 0, len: 2 },
    { dx: 0, dy: -1, len: 2 },
    { dx: 1, dy: 0, len: 3 },
    { dx: 0, dy: 1, len: 1 },
    { dx: -1, dy: 0, len: 2 },
  ],
  [
    { dx: 1, dy: 0, len: 2 },
    { dx: 0, dy: 1, len: 3 },
    { dx: 1, dy: 0, len: 1 },
    { dx: 0, dy: -1, len: 2 },
    { dx: 1, dy: 0, len: 3 },
    { dx: 0, dy: 1, len: 1 },
  ],
  [
    { dx: 0, dy: 1, len: 2 },
    { dx: 1, dy: 0, len: 4 },
    { dx: 0, dy: -1, len: 1 },
    { dx: 1, dy: 0, len: 2 },
    { dx: 0, dy: 1, len: 2 },
    { dx: -1, dy: 0, len: 3 },
  ],
]

let titleMode = true
let levelNumber = 1
let moving = false
let recentSignatures = []

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function shuffle(list) {
  const arr = list.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}

function keyOf(x, y) {
  return `${x},${y}`
}

function inBounds(x, y) {
  return x > 0 && x < WIDTH - 1 && y > 0 && y < HEIGHT - 1
}

function cloneGrid(fill) {
  return Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => fill))
}

function transformMove(move, mirrorX, mirrorY) {
  return {
    dx: mirrorX ? -move.dx : move.dx,
    dy: mirrorY ? -move.dy : move.dy,
    len: move.len,
    key: move.dx !== 0
      ? (mirrorX ? (move.dx === 1 ? "L" : "R") : (move.dx === 1 ? "R" : "L"))
      : (mirrorY ? (move.dy === 1 ? "U" : "D") : (move.dy === 1 ? "D" : "U"))
  }
}

function transformPoint(pt, mirrorX, mirrorY) {
  return {
    x: mirrorX ? WIDTH - 1 - pt.x : pt.x,
    y: mirrorY ? HEIGHT - 1 - pt.y : pt.y,
  }
}

function fallbackLevel() {
  const grid = cloneGrid(W)

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      grid[y][x] = F
    }
  }

  for (let x = 0; x < WIDTH; x++) {
    grid[0][x] = W
    grid[HEIGHT - 1][x] = W
  }

  for (let y = 0; y < HEIGHT; y++) {
    grid[y][0] = W
    grid[y][WIDTH - 1] = W
  }

  grid[1][1] = P
  grid[HEIGHT - 2][WIDTH - 2] = G

  let walls = 8
  while (walls > 0) {
    const x = randInt(1, WIDTH - 2)
    const y = randInt(1, HEIGHT - 2)

    if (grid[y][x] === F) {
      grid[y][x] = W
      walls--
    }
  }

  return map`${grid.map(r => r.join("")).join("\n")}`
}

function showTitle() {
  titleMode = true
  moving = false
  setMap(TITLE_MAP)
  clearText()
  addText("   SLIPPY SLIDE", { x: 1, y: 5, color: color`0` })
  addText("   by Schnoplet", { x: 1, y: 6, color: color`0` })
  addText("   WASD to slide", { x: 1, y: 8, color: color`0` })
  addText("   'I' to start", { x: 1, y: 9, color: color`0` })
}

function showHud() {
  clearText()
  addText("Lv " + levelNumber, { x: 0, y: 0, color: color`0` })
}

function startGame() {
  if (!titleMode) return
  titleMode = false
  levelNumber = 1
  recentSignatures = []
  loadLevel()
}

function slideOnGrid(grid, x, y, dx, dy) {
  let nx = x
  let ny = y

  while (true) {
    const tx = nx + dx
    const ty = ny + dy
    if (!inBounds(tx, ty)) break
    if (grid[ty][tx] === W) break
    nx = tx
    ny = ty
  }

  return { x: nx, y: ny }
}

function bfsSolvable(grid, start, goal) {
  const queue = [{ x: start.x, y: start.y }]
  const seen = new Set([keyOf(start.x, start.y)])

  while (queue.length) {
    const cur = queue.shift()
    if (cur.x === goal.x && cur.y === goal.y) return true

    for (const d of DIRS) {
      const nxt = slideOnGrid(grid, cur.x, cur.y, d.dx, d.dy)
      const k = keyOf(nxt.x, nxt.y)
      if (!seen.has(k)) {
        seen.add(k)
        queue.push(nxt)
      }
    }
  }

  return false
}

function addBranch(grid, routeSet, start, dx, dy, len) {
  let x = start.x
  let y = start.y

  for (let i = 0; i < len; i++) {
    x += dx
    y += dy
    if (!inBounds(x, y)) return false
    const k = keyOf(x, y)
    if (routeSet.has(k)) return false
    if (grid[y][x] !== W) return false
    grid[y][x] = F
    routeSet.add(k)
  }

  return true
}

function buildLevel() {
  const baseStarts = [
    { x: 1, y: 1 },
    { x: WIDTH - 2, y: 1 },
    { x: 1, y: HEIGHT - 2 },
    { x: WIDTH - 2, y: HEIGHT - 2 },
  ]

  for (let attempt = 0; attempt < 500; attempt++) {
    const grid = cloneGrid(W)
    const routeSet = new Set()

    const mirrorX = Math.random() < 0.5
    const mirrorY = Math.random() < 0.5
    const startBase = pick(baseStarts)
    const start = transformPoint(startBase, mirrorX, mirrorY)
    const pattern = PATTERNS[randInt(0, PATTERNS.length - 1)]
      .map(m => transformMove(m, mirrorX, mirrorY))

    let current = { x: start.x, y: start.y }
    const path = [current]
    const signatureParts = []
    let ok = true

    grid[current.y][current.x] = F
    routeSet.add(keyOf(current.x, current.y))

    for (const move of pattern) {
      const nx = current.x + move.dx * move.len
      const ny = current.y + move.dy * move.len

      if (!inBounds(nx, ny)) {
        ok = false
        break
      }

      const lineCells = []
      let cx = current.x
      let cy = current.y

      for (let i = 0; i < move.len; i++) {
        cx += move.dx
        cy += move.dy

        if (!inBounds(cx, cy)) {
          ok = false
          break
        }

        const k = keyOf(cx, cy)
        if (routeSet.has(k)) {
          ok = false
          break
        }

        lineCells.push({ x: cx, y: cy })
      }

      if (!ok) break

      signatureParts.push(move.key + move.len)

      for (const cell of lineCells) {
        grid[cell.y][cell.x] = F
        routeSet.add(keyOf(cell.x, cell.y))
        path.push({ x: cell.x, y: cell.y })
      }

      current = { x: nx, y: ny }
    }

    if (!ok) continue
    if (signatureParts.length < 5) continue
    if (current.x === start.x && current.y === start.y) continue

    const signature = signatureParts.join(",")
    if (recentSignatures.includes(signature)) continue

    grid[start.y][start.x] = P
    grid[current.y][current.x] = G

    const branchAnchors = shuffle(path.slice(1, path.length - 1)).slice(0, 4)

    for (const anchor of branchAnchors) {
      const dirs = shuffle([
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ])

      for (const d of dirs) {
        if (addBranch(grid, routeSet, anchor, d.dx, d.dy, randInt(1, 2))) {
          break
        }
      }
    }

    let extraWalls = Math.min(8 + levelNumber, 14)
    let tries = 0

    while (extraWalls > 0 && tries < 200) {
      tries++
      const x = randInt(1, WIDTH - 2)
      const y = randInt(1, HEIGHT - 2)

      const k = keyOf(x, y)
      if (routeSet.has(k)) continue
      if (grid[y][x] !== W) continue

      grid[y][x] = W
      extraWalls--
    }

    if (!bfsSolvable(grid, start, current)) continue

    recentSignatures.push(signature)
    if (recentSignatures.length > 10) recentSignatures.shift()

    return map`${grid.map(r => r.join("")).join("\n")}`
  }

  return fallbackLevel()
}

function loadLevel() {
  moving = false
  setMap(buildLevel())
  showHud()
}

function checkWin() {
  const p = getFirst(P)
  if (!p) return

  if (getTile(p.x, p.y).some(t => t.type === G)) {
    moving = true
    clearText()
    addText("CLEAR", { x: 3, y: 3, color: color`0` })

    setTimeout(() => {
      levelNumber++
      loadLevel()
    }, 350)
  }
}

function animSlide(dx, dy) {
  if (titleMode || moving) return
  moving = true

  const p = getFirst(P)
  if (!p) {
    moving = false
    return
  }

  function step() {
    const nx = p.x + dx
    const ny = p.y + dy
    const next = getTile(nx, ny)

    if (next.some(t => t.type === W) || !inBounds(nx, ny)) {
      moving = false
      checkWin()
      return
    }

    p.x = nx
    p.y = ny

    if (getTile(p.x, p.y).some(t => t.type === G)) {
      moving = false
      checkWin()
      return
    }

    setTimeout(step, 40)
  }

  step()
}

onInput("i", startGame)
onInput("w", () => animSlide(0, -1))
onInput("s", () => animSlide(0, 1))
onInput("a", () => animSlide(-1, 0))
onInput("d", () => animSlide(1, 0))

afterInput(() => {})
showTitle()
