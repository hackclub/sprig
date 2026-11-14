/*
@title: 3D Maze
@author: Joseph Redman
@description: A pixel-level raycaster maze.
@tags: ['maze', 'puzzle']
@addedOn: 2026-11-14
*/
/*
Controls:
  W / S  walk forward / back
  A / D  turn left / right
  J      torch lighting + reflections on / off (off = plain distance fog)
  I      toggle the map of where you've been
  K      new maze
Find the glowing blue block to advance.
*/

// ---------- Screen setup ----------
// Sprig's screen is 10 x 8 tiles of 16 x 16 pixels = 160 x 128 pixels.
// We draw into our own framebuffer, chop it into 80 tile bitmaps, and
// hand them to setLegend every frame. Each tile gets its own sprite key.
const W = 160
const H = 128
const TW = 10
const TH = 8
const EMPTY = "x"
const tileKey = (i) => String.fromCharCode(0x100 + i)

const STATIC_MAP = (() => {
  const rows = []
  for (let ty = 0; ty < TH; ty++) {
    let row = ""
    for (let tx = 0; tx < TW; tx++) row += tileKey(ty * TW + tx)
    rows.push(row)
  }
  return rows.join("\n")
})()

const BLACK_TILE = Array(16).fill("0000000000000000").join("\n")

// framebuffer[y][x] = a Sprig colour character
const fb = []
for (let y = 0; y < H; y++) fb.push(new Array(W).fill("0"))

// ---------- Shading ----------
// Ordered (Bayer) dithering fakes smooth fades with a few palette colours.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

// ramp runs dark -> bright, t is 0..1 along it
function shade(ramp, t, x, y) {
  if (t < 0) t = 0
  if (t > 1) t = 1
  const n = ramp.length
  const s = t * (n - 1)
  const i = Math.floor(s)
  if (i >= n - 1) return ramp[n - 1]
  const f = s - i
  return f > (BAYER[y & 3][x & 3] + 0.5) / 16 ? ramp[i + 1] : ramp[i]
}

// Palette: 0 black, L dark grey, 1 light grey, 2 white, 3 red, C brown,
// F yellowy brown, 6 yellow, 9 orange, 7 teal blue, 5 hot blue
const TORCHLIGHT = ["0", "C", "9", "6", "2"] // black > brown > orange > yellow > white
const BLUELIGHT = ["0", "5", "7"] // black > hot blue > teal (the goal's light)
const FOG = ["0", "L", "1", "2"] // plain mode walls
const FOG_FLOOR = ["0", "L", "1"]

// ---------- Settings ----------
const FOV = 0.66
const MOVE = 0.25
const TURN = 0.25
const RADIUS = 0.2
const MAX_DIST = 7

const TORCH = 1.7 // torch strength
const K_FALL = 1.0 // how fast light fades with distance
const AMBIENT = 0.03
const REFL = 0.3 // floor mirror strength
const GOAL_LIGHT = 3.2 // the goal's blue glow
const GOAL_FALL = 0.45 // it fades more slowly than the torch, so it carries far
let flick = 1 // torch flicker, changes every frame
let glow = 1 // goal glow shimmer
let phase = 0 // flips every frame to shimmer the goal texture

// ---------- State ----------
let level = 1
let grid = []
let seen = []
let px = 1.5
let py = 1.5
let angle = 0
let showMap = false
let rtx = true
let goalX = 1.5
let goalY = 1.5

// ---------- Maze generation (recursive backtracker) ----------

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

// Returns a grid where 1 = wall, 0 = open, 2 = goal.
function generateMaze(cw, ch) {
  const w = cw * 2 + 1
  const h = ch * 2 + 1
  const g = []
  for (let y = 0; y < h; y++) g.push(new Array(w).fill(1))

  const stack = [[1, 1]]
  g[1][1] = 0
  while (stack.length > 0) {
    const [x, y] = stack[stack.length - 1]
    let moved = false
    for (const [dx, dy] of shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]])) {
      const nx = x + dx
      const ny = y + dy
      if (nx > 0 && ny > 0 && nx < w - 1 && ny < h - 1 && g[ny][nx] === 1) {
        g[y + dy / 2][x + dx / 2] = 0
        g[ny][nx] = 0
        stack.push([nx, ny])
        moved = true
        break
      }
    }
    if (!moved) stack.pop()
  }

  // Goal goes on the open tile farthest from the start (BFS)
  const dist = []
  for (let y = 0; y < h; y++) dist.push(new Array(w).fill(-1))
  const queue = [[1, 1]]
  dist[1][1] = 0
  let far = [1, 1]
  while (queue.length > 0) {
    const [x, y] = queue.shift()
    if (dist[y][x] > dist[far[1]][far[0]]) far = [x, y]
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx
      const ny = y + dy
      if (g[ny][nx] === 0 && dist[ny][nx] === -1) {
        dist[ny][nx] = dist[y][x] + 1
        queue.push([nx, ny])
      }
    }
  }
  g[far[1]][far[0]] = 2
  return g
}

function markSeen() {
  const cx = Math.floor(px)
  const cy = Math.floor(py)
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = cx + dx
      const y = cy + dy
      if (y >= 0 && y < seen.length && x >= 0 && x < seen[0].length) seen[y][x] = true
    }
  }
}

// ---------- Textures ----------

// Floor: checkerboard, one square per maze tile. Returns a brightness multiplier.
function floorTex(fx, fy) {
  return (Math.floor(fx) + Math.floor(fy)) & 1 ? 0.35 : 1
}

// Sky: no roof, just a night sky with a few stars. Stars are fixed to the world
// (they depend on the ray's compass direction), so they slide past as you turn.
function skyPixel(rdx, rdy, y) {
  const sx = Math.floor(Math.atan2(rdy, rdx) * 45)
  const h = Math.abs((sx * 73856093) ^ (y * 19349663)) % 131
  return h === 0 ? "2" : h === 1 ? "1" : h === 2 ? "L" : "0"
}

// Bricks: v = 0 (top) .. 1 (bottom), wallX = 0..1 along the wall. Returns a brightness multiplier.
function brickTex(v, wallX) {
  const bv = v * 4
  const row = Math.floor(bv)
  const fv = bv - row
  const u = (wallX + (row % 2) * 0.5) * 2
  const fu = u - Math.floor(u)
  return fv < 0.1 || fu < 0.05 ? 0.5 : 1
}

// ---------- Raycasting ----------

function castRay(x, dirX, dirY, planeX, planeY) {
  const camX = 2 * (x + 0.5) / W - 1
  const rdx = dirX + planeX * camX
  const rdy = dirY + planeY * camX

  let mapX = Math.floor(px)
  let mapY = Math.floor(py)
  const ddx = rdx === 0 ? 1e30 : Math.abs(1 / rdx)
  const ddy = rdy === 0 ? 1e30 : Math.abs(1 / rdy)
  let stepX, stepY, sideX, sideY
  if (rdx < 0) { stepX = -1; sideX = (px - mapX) * ddx } else { stepX = 1; sideX = (mapX + 1 - px) * ddx }
  if (rdy < 0) { stepY = -1; sideY = (py - mapY) * ddy } else { stepY = 1; sideY = (mapY + 1 - py) * ddy }

  let side = 0
  for (let i = 0; i < 100; i++) {
    if (sideX < sideY) { sideX += ddx; mapX += stepX; side = 0 }
    else { sideY += ddy; mapY += stepY; side = 1 }
    if (grid[mapY][mapX] !== 0) break
  }

  const perp = Math.max(0.05, side === 0 ? sideX - ddx : sideY - ddy)
  let wallX = side === 0 ? py + perp * rdy : px + perp * rdx
  wallX -= Math.floor(wallX)
  return {
    rdx, rdy, side, perp, wallX,
    nx: side === 0 ? -stepX : 0, // wall normal
    ny: side === 0 ? 0 : -stepY,
    isGoal: grid[mapY][mapX] === 2,
  }
}

// Is there a clear line between two points? (grid DDA; walls occlude)
function visible(x0, y0, x1, y1) {
  const dx = x1 - x0
  const dy = y1 - y0
  let mx = Math.floor(x0)
  let my = Math.floor(y0)
  const ex = Math.floor(x1)
  const ey = Math.floor(y1)
  if (mx === ex && my === ey) return true
  const adx = dx === 0 ? 1e30 : Math.abs(1 / dx)
  const ady = dy === 0 ? 1e30 : Math.abs(1 / dy)
  const stepX = dx < 0 ? -1 : 1
  const stepY = dy < 0 ? -1 : 1
  let sideX = dx < 0 ? (x0 - mx) * adx : (mx + 1 - x0) * adx
  let sideY = dy < 0 ? (y0 - my) * ady : (my + 1 - y0) * ady
  for (let i = 0; i < 64; i++) {
    if (sideX < sideY) { sideX += adx; mx += stepX } else { sideY += ady; my += stepY }
    if (mx === ex && my === ey) return true
    if (grid[my][mx] !== 0) return false
  }
  return true
}

// The goal block: a shimmering mix of teal and blue. t = how bright (0..1).
function goalColor(t, x, y) {
  const c = ((x >> 1) + (y >> 1) + phase) & 1 ? "7" : "5"
  return shade(["0", c], t, x, y)
}

// ---------- Torch lighting ----------
// The torch is at the camera, so every surface we can see is in line of sight:
// no shadow rays needed. Light = strength * cos(angle) / (1 + k * distance^2).

// bw = warm torch brightness, bb = blue goal-light brightness.
// Where both reach a pixel, the hue is dithered between the two.
function lightPixel(bw, bb, x, y) {
  const total = bw + bb
  const blueFrac = bb / total
  const ramp = blueFrac > (BAYER[(y + 2) & 3][(x + 1) & 3] + 0.5) / 16 ? BLUELIGHT : TORCHLIGHT
  return shade(ramp, 1 - Math.exp(-total), x, y)
}

function renderTorch(dirX, dirY, planeX, planeY) {
  flick = 0.88 + Math.random() * 0.24
  glow = 0.92 + Math.random() * 0.16
  phase = (phase + 1) & 1
  const T = TORCH * flick

  for (let x = 0; x < W; x++) {
    const r = castRay(x, dirX, dirY, planeX, planeY)
    const rl = Math.hypot(r.rdx, r.rdy)
    const lineH = H / r.perp
    const top = H / 2 - lineH / 2
    const bottom = H / 2 + lineH / 2

    // torch -> wall point, horizontally
    const dh = r.perp * rl
    const cT2 = dh * dh
    const cosT = Math.max(0, (r.nx * -r.rdx + r.ny * -r.rdy) / rl)
    const cTA = T * cosT * dh

    // goal light -> wall point. One shadow ray per column (all walls are the same height).
    let gOn = false
    let gD2 = 0
    let gA = 0
    if (!r.isGoal) {
      const hx = px + r.perp * r.rdx + r.nx * 0.02
      const hy = py + r.perp * r.rdy + r.ny * 0.02
      const ldx = goalX - hx
      const ldy = goalY - hy
      const d2h = ldx * ldx + ldy * ldy
      if (d2h < 100) {
        const dhg = Math.sqrt(d2h)
        const cosG = (r.nx * ldx + r.ny * ldy) / dhg
        if (cosG > 0 && visible(hx, hy, goalX, goalY)) {
          gOn = true
          gD2 = d2h
          gA = GOAL_LIGHT * glow * cosG * dhg
        }
      }
    }

    // brightness of this wall at height z (0 floor .. 1 top)
    const wallWarm = (z) => {
      const d2 = cT2 + (z - 0.5) * (z - 0.5)
      return AMBIENT + cTA / (Math.sqrt(d2) * (1 + K_FALL * d2))
    }
    const wallBlue = (z) => {
      if (!gOn) return 0
      const d2 = gD2 + (z - 0.5) * (z - 0.5)
      return gA / (Math.sqrt(d2) * (1 + GOAL_FALL * d2))
    }

    const yTop = Math.max(0, Math.ceil(top - 0.5))
    const yBot = Math.min(H - 1, Math.floor(bottom - 0.5))

    // sky
    for (let y = 0; y < yTop; y++) fb[y][x] = skyPixel(r.rdx, r.rdy, y)

    // wall
    for (let y = yTop; y <= yBot; y++) {
      if (r.isGoal) {
        fb[y][x] = goalColor(0.8 + 0.2 * Math.max(0, 1 - r.perp / 10), x, y)
        continue
      }
      const v = (y + 0.5 - top) / lineH
      const m = brickTex(v, r.wallX)
      fb[y][x] = lightPixel(wallWarm(1 - v) * m, wallBlue(1 - v) * m, x, y)
    }

    // floor: checkerboard lit by both lights (with traced shadows from the goal's glow),
    // plus a mirror image of this column's wall
    const yFloor = Math.max(Math.floor(H / 2), yBot + 1)
    for (let y = yFloor; y < H; y++) {
      const yc = y + 0.5
      const d = H / (2 * yc - H)
      const fx = px + d * r.rdx
      const fy = py + d * r.rdy
      const th = d * rl
      let d2 = th * th + 0.25
      let bw = AMBIENT + (T * 0.5) / (Math.sqrt(d2) * (1 + K_FALL * d2))
      let bb = 0
      const gx = goalX - fx
      const gy = goalY - fy
      const g2 = gx * gx + gy * gy
      if (g2 < 100) {
        d2 = g2 + 0.25
        const c = (GOAL_LIGHT * glow * 0.5) / (Math.sqrt(d2) * (1 + GOAL_FALL * d2))
        if (c > 0.02 && visible(fx, fy, goalX, goalY)) bb = c
      }
      const tex = floorTex(fx, fy)
      bw *= tex
      bb *= tex
      const ry = yc - bottom
      if (ry < lineH) {
        // the reflected ray hits this same wall, at mirrored height ry / lineH
        if (r.isGoal) {
          bb += REFL * 1.6
        } else {
          const m = brickTex(1 - ry / lineH, r.wallX)
          bw += REFL * wallWarm(ry / lineH) * m
          bb += REFL * wallBlue(ry / lineH) * m
        }
      }
      fb[y][x] = lightPixel(bw, bb, x, y)
    }
  }
}

// ---------- Plain mode: simple distance fog ----------

function renderFlat(dirX, dirY, planeX, planeY) {
  phase = (phase + 1) & 1
  for (let x = 0; x < W; x++) {
    const r = castRay(x, dirX, dirY, planeX, planeY)
    const lineH = H / r.perp
    const top = H / 2 - lineH / 2
    const bottom = H / 2 + lineH / 2
    const yTop = Math.max(0, Math.ceil(top - 0.5))
    const yBot = Math.min(H - 1, Math.floor(bottom - 0.5))
    const fogWall = 1 - r.perp / MAX_DIST

    for (let y = 0; y < yTop; y++) fb[y][x] = skyPixel(r.rdx, r.rdy, y)
    for (let y = yTop; y <= yBot; y++) {
      if (r.isGoal) { fb[y][x] = goalColor(0.8 + 0.2 * Math.max(0, fogWall), x, y); continue }
      const v = (y + 0.5 - top) / lineH
      const b = (fogWall * (r.side === 0 ? 1 : 0.7)) * brickTex(v, r.wallX)
      fb[y][x] = shade(FOG, b, x, y)
    }
    for (let y = Math.max(Math.floor(H / 2), yBot + 1); y < H; y++) {
      const d = H / (2 * (y + 0.5) - H)
      const m = floorTex(px + d * r.rdx, py + d * r.rdy)
      fb[y][x] = shade(FOG_FLOOR, (1 - d / MAX_DIST) * m, x, y)
    }
  }
}

// ---------- The torch in your hand ----------

function drawHeldTorch() {
  const cx = 134 + Math.round((Math.random() - 0.5) * 2)
  // stick
  for (let y = 100; y < H; y++) {
    for (let x = cx - 3; x <= cx + 3; x++) {
      if (x < 0 || x >= W) continue
      fb[y][x] = x === cx - 3 || y > 120 ? "0" : x >= cx + 1 ? "C" : "F"
    }
  }
  // flame: a flickering teardrop
  const fy = 91
  const rh = 11 + Math.random() * 3
  for (let y = Math.floor(fy - rh - 2); y <= fy + 10; y++) {
    for (let x = cx - 10; x <= cx + 10; x++) {
      if (x < 0 || x >= W || y < 0 || y >= H) continue
      const dy = (y - fy) / rh
      const dx = x - cx
      const w = 6 * (dy < 0 ? Math.max(0, 1 + dy * 0.85) : 1)
      if (w <= 0) continue
      const d = Math.sqrt((dx / w) * (dx / w) + dy * dy)
      if (d >= 1) continue
      fb[y][x] = d < 0.3 ? "2" : d < 0.6 ? "6" : "9"
    }
  }
}

// Chop the framebuffer into 16x16 tiles and push them to the engine as sprites.
function present() {
  const entries = []
  for (let ty = 0; ty < TH; ty++) {
    for (let tx = 0; tx < TW; tx++) {
      const rows = []
      for (let r = 0; r < 16; r++) {
        rows.push(fb[ty * 16 + r].slice(tx * 16, tx * 16 + 16).join(""))
      }
      entries.push([tileKey(ty * TW + tx), rows.join("\n")])
    }
  }
  setLegend(...entries)
  setMap(STATIC_MAP)
}

function render() {
  if (showMap) {
    drawMapView()
    return
  }
  const dirX = Math.cos(angle)
  const dirY = Math.sin(angle)
  const planeX = -dirY * FOV
  const planeY = dirX * FOV
  if (rtx) renderTorch(dirX, dirY, planeX, planeY)
  else renderFlat(dirX, dirY, planeX, planeY)
  drawHeldTorch()
  present()
  clearText()
  addText("Lv" + level, { x: 1, y: 0, color: color`7` })
}

function drawMapView() {
  setLegend([EMPTY, BLACK_TILE])
  setMap(Array(TH).fill(EMPTY.repeat(TW)).join("\n"))
  clearText()

  const h = grid.length
  const w = grid[0].length
  const ox = Math.floor((20 - w) / 2)
  const oy = Math.max(0, Math.floor((15 - h) / 2))

  for (let y = 0; y < h; y++) {
    let line = ""
    for (let x = 0; x < w; x++) {
      if (!seen[y][x]) line += " "
      else if (grid[y][x] === 1) line += "#"
      else line += "."
    }
    addText(line, { x: ox, y: oy + y, color: color`L` })
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (seen[y][x] && grid[y][x] === 2) addText("G", { x: ox + x, y: oy + y, color: color`7` })
    }
  }
  // arrow pointing the way we face
  const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const arrows = [">", "v", "<", "^"]
  const arrow = arrows[Math.round(a / (Math.PI / 2)) % 4]
  addText(arrow, { x: ox + Math.floor(px), y: oy + Math.floor(py), color: color`3` })
  addText("I: back", { x: 6, y: 15, color: color`2` })
}

// ---------- Movement with wall collision ----------

function solidAt(x, y) {
  return grid[Math.floor(y)][Math.floor(x)] === 1
}

function blocked(x, y) {
  return (
    solidAt(x - RADIUS, y - RADIUS) || solidAt(x + RADIUS, y - RADIUS) ||
    solidAt(x - RADIUS, y + RADIUS) || solidAt(x + RADIUS, y + RADIUS)
  )
}

function move(dx, dy) {
  // try each axis separately so you slide along walls
  if (!blocked(px + dx, py)) px += dx
  if (!blocked(px, py + dy)) py += dy
  markSeen()
}

// ---------- Game flow ----------

function startLevel() {
  const cw = Math.min(3 + level, 9)
  const ch = Math.min(2 + level, 6)
  grid = generateMaze(cw, ch)
  seen = grid.map(row => row.map(() => false))
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 2) { goalX = x + 0.5; goalY = y + 0.5 }
    }
  }
  px = 1.5
  py = 1.5
  angle = grid[1][2] === 0 ? 0 : Math.PI / 2 // face down the first open corridor
  markSeen()
  render()
}

startLevel()

onInput("w", () => { if (!showMap) move(Math.cos(angle) * MOVE, Math.sin(angle) * MOVE) })
onInput("s", () => { if (!showMap) move(-Math.cos(angle) * MOVE, -Math.sin(angle) * MOVE) })
onInput("a", () => { if (!showMap) angle -= TURN })
onInput("d", () => { if (!showMap) angle += TURN })
onInput("j", () => { rtx = !rtx })
onInput("i", () => { showMap = !showMap })
onInput("k", () => { showMap = false; startLevel() })

afterInput(() => {
  if (grid[Math.floor(py)][Math.floor(px)] === 2) {
    level++
    showMap = false
    startLevel()
    return
  }
  render()
})
