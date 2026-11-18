/*
@Title: MAze_CHOPer
@Author: Daksh Sukhija
@description: A fast, three-level arcade game.
@tags: ['arcade', 'maze']
@addedOn: 2026-11-18

CONTROLS
  W A S D  move (Pac-Man keeps gliding, press a direction to queue a turn)
  K        pause / resume
  J        start / play again
*/

// ---------------------------------------------------------------- sprites
const player      = "p"   // facing right, mouth open (also the map marker)
const playerL     = "l"
const playerU     = "u"
const playerD     = "v"
const playerC     = "c"   // mouth closed
const wall        = "w"
const hud         = "h"
const dot         = "d"
const power       = "o"
const fruit       = "f"
const ghostRed    = "1"
const ghostPink   = "2"
const ghostCyan   = "3"
const ghostScared = "s"
const bg          = "b"

const GHOST_KINDS  = [ghostRed, ghostPink, ghostCyan]
const PLAYER_KINDS = [player, playerL, playerU, playerD, playerC]

setLegend(
  [ player, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
..6666666666....
..66666666......
..66666666......
..6666666666....
..666666666666..
...6666666666...
....66666666....
.....666666.....
................
................` ],

  [ playerL, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
....6666666666..
......66666666..
......66666666..
....6666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
................
................` ],

  [ playerU, bitmap`
................
................
.....6....6.....
....66....66....
...6666..6666...
..66666..66666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
................
................` ],

  [ playerD, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..66666..66666..
...6666..6666...
....66....66....
.....6....6.....
................
................` ],

  [ playerC, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
................
................` ],

  [ ghostRed, bitmap`
................
................
...3.......3....
....3..3..3.....
...333333333....
...3..333..3....
..33.0.3.0.33...
.333...3...333..
..33333333333...
...33.....33....
...3..2.2..3....
....3333333.....
.....33333......
................
................
................` ],

  [ ghostPink, bitmap`
................
................
...8.......8....
....8..8..8.....
...888888888....
...8..888..8....
..88.0.8.0.88...
.888...8...888..
..88888888888...
...88.....88....
...8..2.2..8....
....8888888.....
.....88888......
................
................
................` ],

  [ ghostCyan, bitmap`
................
................
...7.......7....
....7..7..7.....
...777777777....
...7..777..7....
..77.0.7.0.77...
.777...7...777..
..77777777777...
...77.....77....
...7..2.2..7....
....7777777.....
.....77777......
................
................
................` ],

  [ ghostScared, bitmap`
................
................
...9.......9....
....9..9..9.....
...999999999....
...9...9...9....
..99.9.9.9.99...
.999...9...999..
..99999999999...
...9..9.9..9....
...9.9.9.9.9....
....9999999.....
.....99999......
................
................
................` ],

  [ power, bitmap`
................
................
................
................
................
.....222222.....
....22222222....
....22222222....
....22222222....
....22222222....
.....222222.....
................
................
................
................
................` ],

  [ dot, bitmap`
................
................
................
................
................
................
......2222......
......2222......
......2222......
......2222......
................
................
................
................
................
................` ],

  [ fruit, bitmap`
................
................
................
..........55....
.........5.5....
........5...5...
.......5....5...
......5.....5...
....333....333..
...33333..33333.
...33333..33333.
...33233..33233.
....333....333..
................
................
................` ],

  [ wall, bitmap`
9999999999999999
9000000900000009
9000000999000009
9000000009000009
9990000000000009
9099000000000999
9000000000000909
9000000000009909
9090000000099009
9990000000000009
9000000000000009
9000000000000009
9000990000000999
9009900000000909
9009000009000009
9999999999999999` ],

  [ hud, bitmap`
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
0000000000000000
0000000000000000` ],

  [ bg, bitmap`
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
0000000000000000
0000000000000000` ]
)

setBackground(bg)
setSolids([wall, hud])

// ---------------------------------------------------------------- sound
const sfxDotA  = tune`
60: C5~60`
const sfxDotB  = tune`
60: E5~60`
const sfxPower = tune`
100: C5~100,
100: E5~100,
100: G5~100,
100: C6~100`
const sfxGhost = tune`
80: G5~80,
80: C6~80,
80: E6~80`
const sfxFruit = tune`
80: E5~80,
80: A5~80,
80: E6~80`
const sfxDie   = tune`
150: G4~150,
150: E4~150,
150: C4~150,
300: A3~300`
const sfxLevel = tune`
120: C5~120,
120: E5~120,
120: G5~120,
240: C6~240`
const sfxLife  = tune`
120: E5~120,
120: G5~120,
120: C6~120,
240: E6~240`

// ---------------------------------------------------------------- levels
// Row 0 is the HUD. Row 4 of every maze is a tunnel: the left and right
// edges are open and the player/ghosts wrap around.
// Dots are placed automatically, ONLY on tiles Pac-Man can actually reach,
// so a badly drawn map can never make a level impossible to finish.
const levels = [
  map`
hhhhhhhhhh
wp...w..1w
w.ww...w.w
w.w..w...w
....ww.w..
w.w....w.w
w.o.w...ow
wwwwwwwwww`,

  map`
hhhhhhhhhh
wp..w...2w
w.ww.w.w.w
w.o..w.w.w
..ww...w..
w..w.w...w
w1.....o.w
wwwwwwwwww`,

  map`
hhhhhhhhhh
w1.w...w3w
w.o.w.w..w
w.w...w.ww
....w.p...
w.ww.w.w.w
w2.o...o.w
wwwwwwwwww`,

  map`
hhhhhhhhhh
w1.w...w2w
w.ww.w...w
wo...w.w.w
....w..w..
w.ww..p.ow
w3.o.w...w
wwwwwwwwww`,

  map`
hhhhhhhhhh
w1...w..3w
w.ww.w.w.w
wo.w...w.w
....w.w...
w.w...w.ww
w2..wp..ow
wwwwwwwwww`
]

const titleMap = map`
..........
..........
..........
..........
..........
..........
.123..d.p.
..........`

// ---------------------------------------------------------------- tuning
const TICK          = 60          // ms per game tick
const PLAYER_PERIOD = 3           // player steps every 3 ticks
const GHOST_DELAY   = { [ghostRed]: 0, [ghostPink]: 30, [ghostCyan]: 70 }
const GHOST_POINTS  = [200, 400, 800, 1600]
const SCATTER       = { [ghostRed]: [9, 1], [ghostPink]: [0, 1], [ghostCyan]: [0, 6] }
// [mode, length in ticks] - ghosts alternate between retreating and hunting
const MODES = [
  ["scatter", 110], ["chase", 330], ["scatter", 100],
  ["chase", 420],   ["scatter", 80], ["chase", 999999]
]

const DIRS = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 }
]

// ---------------------------------------------------------------- state
let state = "title"      // title | play | paused | dying | between | over
let stage = 0            // 0,1,2,... (endless, mazes repeat, game gets faster)
let score = 0
let hiScore = 0
let lives = 3
let nextLife = 1500

let ticker = null
let titleBlink = null
let tickCount = 0
let ready = 0
let scared = 0
let ghostCombo = 0
let modeIndex = 0
let modeTimer = 0
let hudDirty = true
let banner = null
let pauseSaved = null
let dotFlip = false

let px = 1, py = 1
let startX = 1, startY = 1
let dir = { dx: 0, dy: 0 }
let want = { dx: 0, dy: 0 }
let face = { dx: 1, dy: 0 }
let chomp = false

let ghosts = []
let floorTiles = []
let dotsLeft = 0
let dotsEaten = 0
let fruitPos = null
let fruitT = 0

// ---------------------------------------------------------------- helpers
function wrapX(x) {
  const w = width()
  return ((x % w) + w) % w
}

function isWall(x, y) {
  if (y < 0 || y >= height()) return true
  return getTile(wrapX(x), y).some(s => s.type === wall || s.type === hud)
}

// flood-fill: which tiles can be reached from (sx, sy)?
function reachableFrom(sx, sy) {
  const seen = {}
  const queue = [[sx, sy]]
  seen[sx + "," + sy] = true
  while (queue.length > 0) {
    const cur = queue.shift()
    for (const d of DIRS) {
      const nx = wrapX(cur[0] + d.dx)
      const ny = cur[1] + d.dy
      const key = nx + "," + ny
      if (seen[key] || isWall(nx, ny)) continue
      seen[key] = true
      queue.push([nx, ny])
    }
  }
  return seen
}

function ghostPeriod() { return Math.max(3, 6 - Math.floor(stage / 2)) }
function scaredTicks() { return Math.max(60, 120 - stage * 8) }
function fruitValue()  { return 100 + 100 * (stage % 5) }

function addScore(n) {
  score += n
  if (score > hiScore) hiScore = score
  if (score >= nextLife) {
    lives = Math.min(5, lives + 1)
    nextLife += 3000
    playTune(sfxLife)
  }
  hudDirty = true
}

// ---------------------------------------------------------------- drawing
function drawHud() {
  clearText()
  addText("SCORE " + score, { x: 0, y: 0, color: color`6` })
  addText("HI" + hiScore, { x: 13, y: 0, color: color`2` })
  addText("LIVES " + lives, { x: 0, y: 1, color: color`3` })
  if (scared > 0) {
    addText("POWER!", { x: 13, y: 1, color: color`5` })
  } else {
    addText("LV" + (stage + 1), { x: 13, y: 1, color: color`2` })
  }
  if (banner) addText(banner.text, { x: banner.x, y: banner.y, color: banner.col })
}

function playerKind() {
  if (chomp) return playerC
  if (face.dx < 0) return playerL
  if (face.dy < 0) return playerU
  if (face.dy > 0) return playerD
  return player
}

function renderPlayer(kind) {
  for (const k of PLAYER_KINDS) getAll(k).forEach(s => s.remove())
  addSprite(px, py, kind || playerKind())
}

function renderGhosts() {
  for (const kind of [...GHOST_KINDS, ghostScared]) {
    getAll(kind).forEach(s => s.remove())
  }
  // flash back to normal colours when the power-up is about to run out
  const flashOff = scared < 36 && Math.floor(scared / 6) % 2 === 0
  for (const g of ghosts) {
    addSprite(g.x, g.y, scared > 0 && !flashOff ? ghostScared : g.kind)
  }
}

function renderFruit() {
  getAll(fruit).forEach(s => s.remove())
  if (!fruitPos) return
  if (fruitT < 40 && Math.floor(fruitT / 5) % 2 === 0) return   // blink
  addSprite(fruitPos.x, fruitPos.y, fruit)
}

function clearActors() {
  for (const k of [...PLAYER_KINDS, ...GHOST_KINDS, ghostScared, fruit]) {
    getAll(k).forEach(s => s.remove())
  }
}

function flush() {
  renderPlayer()
  renderGhosts()
  renderFruit()
  if (hudDirty) {
    drawHud()
    hudDirty = false
  }
}

// ---------------------------------------------------------------- ghosts
function pickByDistance(g, options, tx, ty, closer) {
  let best = options[0]
  let bestDist = closer ? Infinity : -Infinity
  for (const d of options) {
    const dist = Math.abs(g.x + d.dx - tx) + Math.abs(g.y + d.dy - ty)
    if (closer ? dist < bestDist : dist > bestDist) {
      bestDist = dist
      best = d
    }
  }
  return best
}

function chaseTarget(g) {
  if (g.kind === ghostRed) return [px, py]
  if (g.kind === ghostPink) return [px + face.dx * 3, py + face.dy * 3]
  // cyan: draws a line from red through a spot 2 tiles ahead of the player
  // and doubles it, so it tends to cut you off from the other side
  const red = ghosts.find(o => o.kind === ghostRed) || g
  const ax = px + face.dx * 2
  const ay = py + face.dy * 2
  return [2 * ax - red.x, 2 * ay - red.y]
}

function moveGhost(g) {
  let options = DIRS.filter(d => !isWall(g.x + d.dx, g.y + d.dy))
  if (options.length === 0) return

  const noBack = options.filter(d => !(d.dx === -g.dx && d.dy === -g.dy))
  if (noBack.length > 0) options = noBack

  const randomMove = options[Math.floor(Math.random() * options.length)]
  let choice

  if (scared > 0) {
    choice = Math.random() < 0.25 ? randomMove : pickByDistance(g, options, px, py, false)
  } else if (MODES[modeIndex][0] === "scatter") {
    const c = SCATTER[g.kind]
    choice = pickByDistance(g, options, c[0], c[1], true)
  } else {
    const t = chaseTarget(g)
    const sloppy = g.kind === ghostCyan ? 0.2 : 0.12
    choice = Math.random() < sloppy ? randomMove : pickByDistance(g, options, t[0], t[1], true)
  }

  g.dx = choice.dx
  g.dy = choice.dy
  g.x = wrapX(g.x + choice.dx)
  g.y += choice.dy
}

function reverseGhosts() {
  for (const g of ghosts) {
    g.dx = -g.dx
    g.dy = -g.dy
  }
}

function sendHome(g) {
  g.x = g.sx
  g.y = g.sy
  g.dx = 0
  g.dy = 0
  g.wait = 25
}

// returns true if the player died
function touch(g) {
  if (g.x !== px || g.y !== py) return false
  if (scared > 0) {
    addScore(GHOST_POINTS[Math.min(ghostCombo, 3)])
    ghostCombo++
    sendHome(g)
    playTune(sfxGhost)
    return false
  }
  killPlayer()
  return true
}

function moveGhosts() {
  const base = ghostPeriod()
  for (const g of ghosts) {
    if (g.wait > 0) {
      g.wait--
      continue
    }
    let per = scared > 0 ? base + 2 : base
    // the red ghost gets angry when only a few dots are left
    if (g.kind === ghostRed && dotsLeft <= 8 && scared === 0) per = Math.max(3, per - 1)
    if (tickCount % per !== 0) continue

    moveGhost(g)
    if (touch(g)) return
  }
}

// ---------------------------------------------------------------- player
function stepPlayer() {
  // take a queued turn as soon as the way is clear
  if ((want.dx !== 0 || want.dy !== 0) && !isWall(px + want.dx, py + want.dy)) {
    dir = { dx: want.dx, dy: want.dy }
  }
  if (dir.dx === 0 && dir.dy === 0) return

  const nx = wrapX(px + dir.dx)
  const ny = py + dir.dy
  if (isWall(nx, ny)) {
    dir = { dx: 0, dy: 0 }
    return
  }

  px = nx
  py = ny
  face = { dx: dir.dx, dy: dir.dy }
  chomp = !chomp

  eatAt(px, py)

  for (const g of ghosts) {
    if (touch(g)) return
  }

  if (dotsLeft === 0) levelComplete()
}

function eatAt(x, y) {
  for (const s of getTile(x, y)) {
    if (s.type === dot) {
      s.remove()
      dotsLeft--
      dotsEaten++
      addScore(10)
      playTune(dotFlip ? sfxDotA : sfxDotB)
      dotFlip = !dotFlip
      maybeSpawnFruit()
    } else if (s.type === power) {
      s.remove()
      addScore(50)
      scared = scaredTicks()
      ghostCombo = 0
      reverseGhosts()
      playTune(sfxPower)
      hudDirty = true
    }
  }
  if (fruitPos && fruitPos.x === x && fruitPos.y === y) {
    fruitPos = null
    addScore(fruitValue())
    playTune(sfxFruit)
  }
}

function maybeSpawnFruit() {
  if (fruitPos) return
  if (dotsEaten !== 12 && dotsEaten !== 28) return
  for (let tries = 0; tries < 20; tries++) {
    const t = floorTiles[Math.floor(Math.random() * floorTiles.length)]
    if (t[0] === px && t[1] === py) continue
    fruitPos = { x: t[0], y: t[1] }
    fruitT = 170
    return
  }
}

function setWant(dx, dy) {
  want = { dx: dx, dy: dy }
  if (state !== "play") return
  // reversing feels better if it happens instantly
  if (dx === -dir.dx && dy === -dir.dy && (dx !== 0 || dy !== 0) && !isWall(px + dx, py + dy)) {
    dir = { dx: dx, dy: dy }
    face = { dx: dx, dy: dy }
    renderPlayer()
  }
}

// ---------------------------------------------------------------- flow
function resetPositions() {
  px = startX
  py = startY
  dir = { dx: 0, dy: 0 }
  want = { dx: 0, dy: 0 }
  face = { dx: 1, dy: 0 }
  chomp = false
  scared = 0
  ghostCombo = 0
  fruitPos = null
  for (const g of ghosts) {
    g.x = g.sx
    g.y = g.sy
    g.dx = 0
    g.dy = 0
    g.wait = GHOST_DELAY[g.kind]
  }
  ready = 30
  banner = { text: "READY!", x: 7, y: 8, col: color`6` }
}

function loadLevel() {
  clearInterval(ticker)
  clearInterval(titleBlink)
  setMap(levels[stage % levels.length])

  const p = getFirst(player)
  startX = p.x
  startY = p.y

  // dots only on reachable floor tiles
  const reach = reachableFrom(startX, startY)
  floorTiles = []
  for (let y = 1; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      if (!reach[x + "," + y]) continue
      floorTiles.push([x, y])
      if (getTile(x, y).length === 0) addSprite(x, y, dot)
    }
  }
  p.remove()

  ghosts = []
  for (const kind of GHOST_KINDS) {
    const s = getFirst(kind)
    if (s) ghosts.push({ kind: kind, x: s.x, y: s.y, sx: s.x, sy: s.y, dx: 0, dy: 0, wait: 0 })
  }

  dotsLeft = getAll(dot).length
  dotsEaten = 0
  tickCount = 0
  modeIndex = 0
  modeTimer = MODES[0][1]
  state = "play"
  resetPositions()

  flush()
  hudDirty = false
  drawHud()
  ticker = setInterval(tick, TICK)
}

function tick() {
  if (state !== "play") return
  tickCount++

  if (ready > 0) {
    ready--
    if (ready === 0) {
      banner = null
      hudDirty = true
    }
    flush()
    return
  }

  if (modeIndex < MODES.length - 1) {
    modeTimer--
    if (modeTimer <= 0) {
      modeIndex++
      modeTimer = MODES[modeIndex][1]
      reverseGhosts()
    }
  }

  if (scared > 0) {
    scared--
    if (scared === 0) {
      ghostCombo = 0
      hudDirty = true
    }
  }

  if (tickCount % PLAYER_PERIOD === 0) stepPlayer()
  if (state !== "play") return

  moveGhosts()
  if (state !== "play") return

  if (fruitPos) {
    fruitT--
    if (fruitT <= 0) fruitPos = null
  }

  flush()
}

function killPlayer() {
  state = "dying"
  lives--
  playTune(sfxDie)
  banner = null
  drawHud()

  const spin = [playerU, playerL, playerD, player]
  let i = 0
  const spinner = setInterval(() => {
    renderPlayer(spin[i % 4])
    i++
    if (i >= 12) {
      clearInterval(spinner)
      afterDeath()
    }
  }, 90)
}

function afterDeath() {
  if (lives <= 0) {
    endGame()
    return
  }
  resetPositions()
  state = "play"
  flush()
  drawHud()
}

function levelComplete() {
  state = "between"
  playTune(sfxLevel)
  addScore(100 * (stage + 1))
  clearActors()
  banner = { text: "STAGE CLEAR!", x: 4, y: 8, col: color`6` }
  drawHud()
  setTimeout(() => {
    stage++
    banner = null
    loadLevel()
  }, 1600)
}

function endGame() {
  state = "over"
  clearInterval(ticker)
  banner = null
  drawHud()
  addText("GAME OVER", { x: 5, y: 7, color: color`3` })
  addText("SCORE " + score, { x: 5, y: 9, color: color`6` })
  if (score >= hiScore && score > 0) {
    addText("NEW HIGH SCORE!", { x: 2, y: 11, color: color`5` })
  }
  addText("J = PLAY AGAIN", { x: 3, y: 13, color: color`2` })
}

function newGame() {
  stage = 0
  score = 0
  lives = 3
  nextLife = 1500
  loadLevel()
}

function showTitle() {
  state = "title"
  clearInterval(ticker)
  clearInterval(titleBlink)
  setMap(titleMap)
  let on = true
  const draw = () => {
    clearText()
    addText("PAC-SPRIG", { x: 5, y: 2, color: color`6` })
    addText("DELUXE", { x: 7, y: 4, color: color`3` })
    addText("HI " + hiScore, { x: 0, y: 0, color: color`2` })
    addText("WASD MOVE", { x: 5, y: 10, color: color`7` })
    addText("K PAUSE", { x: 6, y: 11, color: color`7` })
    if (on) addText("PRESS J", { x: 6, y: 13, color: color`2` })
  }
  draw()
  titleBlink = setInterval(() => {
    on = !on
    draw()
  }, 500)
}

// ---------------------------------------------------------------- input
onInput("w", () => setWant(0, -1))
onInput("s", () => setWant(0, 1))
onInput("a", () => setWant(-1, 0))
onInput("d", () => setWant(1, 0))

onInput("j", () => {
  if (state === "title" || state === "over") newGame()
})

onInput("k", () => {
  if (state === "play") {
    state = "paused"
    pauseSaved = banner
    banner = { text: "PAUSED", x: 7, y: 8, col: color`2` }
    drawHud()
  } else if (state === "paused") {
    state = "play"
    banner = pauseSaved
    pauseSaved = null
    drawHud()
  }
})

showTitle()