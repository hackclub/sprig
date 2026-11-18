/*
@title: Sprig Delver
@author: Daksh Sukhija
@description: A fast multi-level arcade game.
@tags: ['roguelike', 'strategy']
@addedOn: 2026-11-18
*/

// ---------------------------------------------------------------- sprites
const player      = "p"
const playerHurt  = "q"
const echoS       = "x"
const gem         = "g"
const heart       = "e"
const spikeD      = "1"   // lowered
const spikeW      = "2"   // warning
const spikeU      = "3"   // raised
const exitL       = "l"   // locked portal
const exitO       = "o"   // open portal
const crawler     = "c"
const wisp        = "v"
const sentry      = "n"
const frozen      = "z"
const aim         = "t"
const wall        = "w"
const hud         = "h"
const bg          = "b"

const DYNAMIC = [player, playerHurt, echoS, gem, heart, spikeD, spikeW, spikeU,
                 exitL, exitO, crawler, wisp, sentry, frozen, aim]

setLegend(
  [ player, bitmap`
................
.....777777.....
....77777777....
...7777777777...
...7700000077...
...7702002077...
...7700000077...
....77777777....
...7777777777...
..777777777777..
..776666666677..
..777777777777..
...7777777777...
....77....77....
...000....000...
................` ],

  [ playerHurt, bitmap`
................
.....333333.....
....33333333....
...3333333333...
...3300000033...
...3302002033...
...3300000033...
....33333333....
...3333333333...
..333333333333..
..332222222233..
..333333333333..
...3333333333...
....33....33....
...000....000...
................` ],

  [ echoS, bitmap`
................
.....272727.....
....27272727....
...2727272727...
...2700000072...
...2702002072...
...2700000072...
....72727272....
...7272727272...
..727272727272..
..272727272727..
..727272727272..
...2727272727...
....27....27....
................
................` ],

  [ gem, bitmap`
................
................
................
.....777777.....
....77222777....
...7727777777...
..777777777777..
..777777777777..
...7777777777...
....79999997....
.....999999.....
......9999......
.......99.......
................
................
................` ],

  [ heart, bitmap`
................
................
................
...3333..3333...
..332333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................
................
................` ],

  [ spikeD, bitmap`
................
................
................
................
................
................
....L.......L...
................
........L.......
................
....L.......L...
................
................
................
................
................` ],

  [ spikeW, bitmap`
................
................
................
................
................
................
....6.......6...
....6.......6...
........6.......
........6.......
....6.......6...
....6.......6...
................
................
................
................` ],

  [ spikeU, bitmap`
................
................
................
....2......2....
....1......1....
...111....111...
...111....111...
..11111..11111..
..11111..11111..
..33333..33333..
................
................
................
................
................
................` ],

  [ exitL, bitmap`
................
................
.....LLLLLL.....
...LLLLLLLLLL...
..LLL000000LLL..
..LL00000000LL..
.LL0000000000LL.
.LL0000000000LL.
.LL0000000000LL.
.LL0000000000LL.
..LL00000000LL..
..LLL000000LLL..
...LLLLLLLLLL...
.....LLLLLL.....
................
................` ],

  [ exitO, bitmap`
................
................
.....999999.....
...9999999999...
..999777777999..
..997777777799..
.99777777777799.
.99777722777799.
.99777722777799.
.99777777777799.
..997777777799..
..999777777999..
...9999999999...
.....999999.....
................
................` ],

  [ crawler, bitmap`
................
................
................
....33333333....
...3333333333...
..333333333333..
..332233332233..
..330033330033..
..333333333333..
..330000000033..
..333033033033..
...3333333333...
....33333333....
...33..33..33...
................
................` ],

  [ wisp, bitmap`
................
................
................
.......88.......
......8888......
.....888888.....
....88888888....
...8822882288...
...8800880088...
...8888888888...
....88888888....
....88.88.88....
.....8..8..8....
................
................
................` ],

  [ sentry, bitmap`
................
................
.....111111.....
....11111111....
...1111111111...
...1133333311...
...1111111111...
..LL11111111LL..
..LL11111111LL..
..LL11LLLL11LL..
..LL11111111LL..
...1111111111...
....11....11....
....11....11....
...LLL....LLL...
................` ],

  [ frozen, bitmap`
................
................
................
..222222222222..
..277777777772..
..277777777772..
..277799997772..
..277799997772..
..277799997772..
..277777777772..
..277777777772..
..222222222222..
................
................
................
................` ],

  [ aim, bitmap`
................
................
................
................
................
.....2....2.....
................
................
................
................
.....2....2.....
................
................
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
0000L00000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
00000000000L0000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ]
)

setBackground(bg)
setSolids([wall, hud])

// ---------------------------------------------------------------- sound
const sfxGem = tune`
70: E5~70,
70: A5~70`
const sfxHurt = tune`
90: C4~90,
90: A3~90`
const sfxKill = tune`
60: G5~60,
60: C6~60`
const sfxDash = tune`
50: C5~50,
50: G5~50`
const sfxPulse = tune`
80: C4~80,
80: G4~80,
80: C5~80,
120: E5~120`
const sfxOpen = tune`
100: C5~100,
100: G5~100,
200: C6~200`
const sfxStairs = tune`
120: C5~120,
120: E5~120,
120: G5~120,
240: C6~240`
const sfxDie = tune`
150: G4~150,
150: E4~150,
150: C4~150,
300: A3~300`
const sfxHeal = tune`
100: E5~100,
100: B5~100`
const sfxRewind = tune`
80: G5~80,
80: E5~80,
80: C5~80,
120: G4~120`

// ---------------------------------------------------------------- maps
const W = 10
const H = 8

const titleMap = map`
..........
..........
..........
..........
..........
..........
.px.gcvnl.
..........`

const blankMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`

// ---------------------------------------------------------------- constants
const DIRS = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 }
]

const DASH_COST  = 1
const PULSE_COST = 2

const STATS = {
  [crawler]: { dmg: 1, pts: 50 },
  [wisp]:    { dmg: 1, pts: 75 },
  [sentry]:  { dmg: 2, pts: 150 }
}

const BOONS = [
  { label: "+1 MAX HP",      ok: () => maxHp < 8,        apply: () => { maxHp++; hp++ } },
  { label: "DASH RANGE +1",  ok: () => dashRange < 5,    apply: () => { dashRange++ } },
  { label: "PULSE RANGE +1", ok: () => pulseR < 5,       apply: () => { pulseR++ } },
  { label: "MAX ENERGY +2",  ok: () => maxEn < 9,        apply: () => { maxEn += 2; en = Math.min(maxEn, en + 2) } },
  { label: "SHARPER BLADE",  ok: () => atk < 3,          apply: () => { atk++ } },
  { label: "HEAL TO FULL",   ok: () => hp < maxHp,       apply: () => { hp = maxHp } },
  { label: "REFILL ENERGY",  ok: () => en < maxEn,       apply: () => { en = maxEn } },
  { label: "+1 REWIND",      ok: () => maxRewinds < 6,   apply: () => { maxRewinds++; rewinds++ } },
  { label: "DEEPER REWIND",  ok: () => rewindDepth < 5,  apply: () => { rewindDepth++ } }
]

// ---------------------------------------------------------------- state
let state = "title"       // title | play | upgrade | over
let floorNum = 1
let score = 0
let hiScore = 0
let bestFloor = 0
let turn = 0

let hp = 3, maxHp = 3
let en = 2, maxEn = 5
let dashRange = 2
let pulseR = 2
let atk = 1

// time powers
let rewinds = 2
let maxRewinds = 3
let rewindDepth = 3
let timeline = []         // [{ snap, action }] one entry per player turn
let echo = null           // { x, y, face, script, step, done }

let px = 1, py = 1
let face = { dx: 1, dy: 0 }
let invuln = 0
let hurtFlash = false

let solid = []
let enemies = []
let gems = []
let hearts = []
let spikes = []
let exitPos = { x: 1, y: 1 }
let exitOpen = false
let gemTotal = 0
let gemsGot = 0
let spikePhase = 0        // 0,1 lowered | 2 warning | 3 raised

let msg = ""
let options = []
let lockUntil = 0
let titleBlink = null

// ---------------------------------------------------------------- helpers
function rnd(n) { return Math.floor(Math.random() * n) }
function locked() { return Date.now() < lockUntil }
function say(t) { msg = t }

function addScore(n) {
  score += n
  if (score > hiScore) hiScore = score
}

function gainEnergy(n) { en = Math.min(maxEn, en + n) }

function enemyAt(x, y) {
  return enemies.find(e => e.hp > 0 && e.x === x && e.y === y)
}

function spikeAt(x, y) {
  return spikes.some(s => s.x === x && s.y === y)
}

function freeFor(x, y) {
  return !solid[y][x] && !enemyAt(x, y) && !(x === px && y === py)
}

// BFS distances from (sx, sy) through open floor
function distMap(sx, sy) {
  const d = []
  for (let y = 0; y < H; y++) d.push(new Array(W).fill(999))
  d[sy][sx] = 0
  const q = [[sx, sy]]
  let head = 0
  while (head < q.length) {
    const c = q[head++]
    for (const dir of DIRS) {
      const nx = c[0] + dir.dx
      const ny = c[1] + dir.dy
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
      if (solid[ny][nx] || d[ny][nx] !== 999) continue
      d[ny][nx] = d[c[1]][c[0]] + 1
      q.push([nx, ny])
    }
  }
  return d
}

// ---------------------------------------------------------------- dungeon generation
// random wall blocks, then keep only the biggest connected area so
// every floor is guaranteed to be fully explorable
function generateFloor() {
  for (let attempt = 0; attempt < 60; attempt++) {
    const g = []
    for (let y = 0; y < H; y++) {
      const row = []
      for (let x = 0; x < W; x++) {
        if (y === 0 || y === H - 1) row.push("h")
        else if (x === 0 || x === W - 1) row.push("w")
        else row.push(".")
      }
      g.push(row)
    }

    const blocks = 8 + Math.min(floorNum, 6)
    for (let i = 0; i < blocks; i++) {
      const x = 1 + rnd(W - 2)
      const y = 1 + rnd(H - 2)
      g[y][x] = "w"
      if (Math.random() < 0.6) {
        const d = DIRS[rnd(4)]
        const nx = x + d.dx
        const ny = y + d.dy
        if (nx >= 1 && nx <= W - 2 && ny >= 1 && ny <= H - 2) g[ny][nx] = "w"
      }
    }

    const label = []
    for (let y = 0; y < H; y++) label.push(new Array(W).fill(-1))
    const sizes = []
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        if (g[y][x] !== "." || label[y][x] !== -1) continue
        const id = sizes.length
        let size = 0
        const stack = [[x, y]]
        label[y][x] = id
        while (stack.length > 0) {
          const c = stack.pop()
          size++
          for (const d of DIRS) {
            const nx = c[0] + d.dx
            const ny = c[1] + d.dy
            if (g[ny][nx] === "." && label[ny][nx] === -1) {
              label[ny][nx] = id
              stack.push([nx, ny])
            }
          }
        }
        sizes.push(size)
      }
    }
    if (sizes.length === 0) continue

    let best = 0
    for (let i = 1; i < sizes.length; i++) if (sizes[i] > sizes[best]) best = i
    if (sizes[best] < 26) continue

    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        if (g[y][x] === "." && label[y][x] !== best) g[y][x] = "w"
      }
    }
    return g
  }

  const g = []
  for (let y = 0; y < H; y++) {
    const row = []
    for (let x = 0; x < W; x++) {
      if (y === 0 || y === H - 1) row.push("h")
      else if (x === 0 || x === W - 1) row.push("w")
      else row.push(".")
    }
    g.push(row)
  }
  return g
}

function takeCell(pool, ok) {
  const idx = []
  for (let i = 0; i < pool.length; i++) if (ok(pool[i])) idx.push(i)
  if (idx.length === 0) return null
  return pool.splice(idx[rnd(idx.length)], 1)[0]
}

function buildFloor() {
  const g = generateFloor()
  setMap(g.map(r => r.join("")).join("\n"))

  solid = []
  const pool = []
  for (let y = 0; y < H; y++) {
    const row = []
    for (let x = 0; x < W; x++) {
      row.push(g[y][x] !== ".")
      if (g[y][x] === ".") pool.push([x, y])
    }
    solid.push(row)
  }

  const start = takeCell(pool, () => true)
  px = start[0]
  py = start[1]
  face = { dx: 1, dy: 0 }
  invuln = 0
  const dm = distMap(px, py)

  let maxD = 0
  for (const c of pool) maxD = Math.max(maxD, dm[c[1]][c[0]])
  const ex = takeCell(pool, c => dm[c[1]][c[0]] >= maxD - 1) || takeCell(pool, () => true)
  exitPos = { x: ex[0], y: ex[1] }
  exitOpen = false

  gemTotal = Math.min(4 + Math.floor(floorNum / 2) + 1, 8)
  gemsGot = 0
  gems = []
  for (let i = 0; i < gemTotal; i++) {
    const c = takeCell(pool, () => true)
    if (c) gems.push({ x: c[0], y: c[1] })
  }
  gemTotal = gems.length

  hearts = []
  if (floorNum >= 2 && Math.random() < 0.6) {
    const c = takeCell(pool, () => true)
    if (c) hearts.push({ x: c[0], y: c[1] })
  }

  enemies = []
  const wanted = []
  const nCrawl = Math.min(1 + Math.floor((floorNum - 1) / 2), 4)
  const nWisp = floorNum >= 2 ? Math.min(1 + Math.floor((floorNum - 2) / 3), 3) : 0
  const nSent = floorNum >= 3 ? Math.min(1 + Math.floor((floorNum - 3) / 3), 2) : 0
  for (let i = 0; i < nCrawl; i++) wanted.push(crawler)
  for (let i = 0; i < nWisp; i++) wanted.push(wisp)
  for (let i = 0; i < nSent; i++) wanted.push(sentry)

  const crawlerHp = 1 + (floorNum >= 3 ? 1 : 0) + (floorNum >= 8 ? 1 : 0)
  for (const type of wanted) {
    const c = takeCell(pool, c => dm[c[1]][c[0]] >= 5) || takeCell(pool, c => dm[c[1]][c[0]] >= 3)
    if (!c) break
    const d = DIRS[rnd(4)]
    enemies.push({
      type: type, x: c[0], y: c[1],
      hp: type === crawler ? crawlerHp : (type === sentry ? 3 : 1),
      stun: 0, dx: d.dx, dy: d.dy
    })
  }

  spikes = []
  spikePhase = 0
  const nSpikes = floorNum >= 2 ? Math.min(floorNum + 1, 7) : 0
  const maxSpikes = Math.floor(pool.length * 0.3)
  for (let i = 0; i < Math.min(nSpikes, maxSpikes); i++) {
    const c = takeCell(pool, c => dm[c[1]][c[0]] >= 2)
    if (c) spikes.push({ x: c[0], y: c[1] })
  }
}

// ---------------------------------------------------------------- rendering
function drawHud() {
  clearText()
  addText("HP " + hp + "/" + maxHp, { x: 0, y: 0, color: color`3` })
  addText("EN " + en + "/" + maxEn, { x: 7, y: 0, color: color`7` })
  addText("FLR" + floorNum, { x: 14, y: 0, color: color`6` })
  addText("GEM " + gemsGot + "/" + gemTotal, { x: 0, y: 1, color: color`5` })
  addText("RW" + rewinds, { x: 9, y: 1, color: rewinds > 0 ? color`8` : color`L` })
  addText("S" + score, { x: 14, y: 1, color: color`2` })

  const canRewind = rewinds > 0 && timeline.length > 0
  addText("J:DASH", { x: 0, y: 14, color: en >= DASH_COST ? color`2` : color`L` })
  addText("L:PULSE", { x: 7, y: 14, color: en >= PULSE_COST ? color`2` : color`L` })
  addText("K:RWD", { x: 15, y: 14, color: canRewind ? color`8` : color`L` })

  if (msg) {
    const x = Math.max(0, Math.floor((20 - msg.length) / 2))
    addText(msg, { x: x, y: 15, color: color`6` })
  }
}

function render() {
  for (const t of DYNAMIC) getAll(t).forEach(s => s.remove())

  const spikeLook = spikePhase === 3 ? spikeU : (spikePhase === 2 ? spikeW : spikeD)
  for (const s of spikes) addSprite(s.x, s.y, spikeLook)
  addSprite(exitPos.x, exitPos.y, exitOpen ? exitO : exitL)
  for (const g of gems) addSprite(g.x, g.y, gem)
  for (const h of hearts) addSprite(h.x, h.y, heart)
  for (const e of enemies) addSprite(e.x, e.y, e.stun > 0 ? frozen : e.type)

  const ax = px + face.dx
  const ay = py + face.dy
  if (!solid[ay][ax]) addSprite(ax, ay, aim)

  if (echo) addSprite(echo.x, echo.y, echoS)
  addSprite(px, py, hurtFlash ? playerHurt : player)
  drawHud()
}

// ---------------------------------------------------------------- combat
function hurt(n, why) {
  if (invuln > 0) {
    say("DODGED!")
    return
  }
  hp -= n
  playTune(sfxHurt)
  say(why || "OUCH!")
  hurtFlash = true
  setTimeout(() => {
    hurtFlash = false
    if (state === "play") render()
  }, 180)
}

function killEnemy(e, reward) {
  e.hp = 0
  enemies = enemies.filter(o => o !== e)
  if (reward) {
    addScore(STATS[e.type].pts)
    gainEnergy(1)
    playTune(sfxKill)
  }
}

function strike(e, dmg) {
  const wasFrozen = e.stun > 0
  e.hp -= dmg
  if (e.hp <= 0) {
    killEnemy(e, true)
    say(wasFrozen ? "SHATTERED!" : "SLAIN!")
  } else {
    say("HIT!")
    playTune(sfxDash)
  }
}

// ---------------------------------------------------------------- enemy AI
function bestStepToward(e, pd) {
  let best = null
  let bestD = pd[e.y][e.x]
  const order = DIRS.slice().sort(() => Math.random() - 0.5)
  for (const d of order) {
    const nx = e.x + d.dx
    const ny = e.y + d.dy
    if (!freeFor(nx, ny)) continue
    if (pd[ny][nx] < bestD) {
      bestD = pd[ny][nx]
      best = d
    }
  }
  return best
}

function randomStep(e) {
  const opts = DIRS.filter(d => freeFor(e.x + d.dx, e.y + d.dy))
  if (opts.length === 0) return null
  return opts[rnd(opts.length)]
}

function sentryAct(e) {
  let alert = false
  if (e.x === px || e.y === py) {
    const sx = Math.sign(px - e.x)
    const sy = Math.sign(py - e.y)
    const dist = Math.abs(px - e.x) + Math.abs(py - e.y)
    if (dist > 0 && dist <= 5) {
      let clear = true
      for (let i = 1; i < dist; i++) {
        if (solid[e.y + sy * i][e.x + sx * i]) {
          clear = false
          break
        }
      }
      if (clear) {
        alert = true
        e.dx = sx
        e.dy = sy
        say("SENTRY CHARGES!")
      }
    }
  }

  const steps = alert ? 2 : 1
  for (let s = 0; s < steps; s++) {
    if (Math.abs(e.x - px) + Math.abs(e.y - py) === 1) break
    let nx = e.x + e.dx
    let ny = e.y + e.dy
    if (!freeFor(nx, ny)) {
      let opts = DIRS.filter(d => freeFor(e.x + d.dx, e.y + d.dy) && !(d.dx === -e.dx && d.dy === -e.dy))
      if (opts.length === 0) opts = DIRS.filter(d => freeFor(e.x + d.dx, e.y + d.dy))
      if (opts.length === 0) break
      const d = opts[rnd(opts.length)]
      e.dx = d.dx
      e.dy = d.dy
      nx = e.x + d.dx
      ny = e.y + d.dy
    }
    e.x = nx
    e.y = ny
  }
}

function enemyAct(e, pd) {
  if (e.hp <= 0) return
  if (e.stun > 0) {
    e.stun--
    return
  }

  if (Math.abs(e.x - px) + Math.abs(e.y - py) === 1) {
    hurt(STATS[e.type].dmg)
    return
  }

  if (e.type === crawler) {
    if (turn % 3 === 0) return
    const d = bestStepToward(e, pd)
    if (d) {
      e.x += d.dx
      e.y += d.dy
    }
  } else if (e.type === wisp) {
    const d = Math.random() < 0.5 ? bestStepToward(e, pd) : randomStep(e)
    if (d) {
      e.x += d.dx
      e.y += d.dy
    }
  } else {
    sentryAct(e)
  }
}

// ---------------------------------------------------------------- time: snapshots, rewind, echo
function snapshot() {
  return {
    px: px, py: py,
    face: { dx: face.dx, dy: face.dy },
    hp: hp, en: en, invuln: invuln, score: score,
    spikePhase: spikePhase, exitOpen: exitOpen, gemsGot: gemsGot, turn: turn,
    enemies: enemies.map(e => Object.assign({}, e)),
    gems: gems.map(g => Object.assign({}, g)),
    hearts: hearts.map(h => Object.assign({}, h)),
    echo: echo ? copyEcho(echo) : null
  }
}

function copyEcho(c) {
  return Object.assign({}, c, {
    face: { dx: c.face.dx, dy: c.face.dy },
    script: c.script.slice()
  })
}

function restore(s) {
  px = s.px
  py = s.py
  face = { dx: s.face.dx, dy: s.face.dy }
  hp = s.hp
  en = s.en
  invuln = s.invuln
  score = s.score
  spikePhase = s.spikePhase
  exitOpen = s.exitOpen
  gemsGot = s.gemsGot
  turn = s.turn
  enemies = s.enemies.map(e => Object.assign({}, e))
  gems = s.gems.map(g => Object.assign({}, g))
  hearts = s.hearts.map(h => Object.assign({}, h))
  echo = s.echo ? copyEcho(s.echo) : null
}

// every turn-using action records a snapshot (the world BEFORE it happened)
// plus a description of the action, which an echo can replay later
function beginAction(action) {
  msg = ""
  timeline.push({ snap: snapshot(), action: action })
  if (timeline.length > 8) timeline.shift()
}

function doRewind(auto) {
  const n = Math.min(rewindDepth, timeline.length)
  const popped = timeline.splice(timeline.length - n, n)
  restore(popped[0].snap)
  rewinds--
  const script = popped.map(h => h.action)
  echo = { x: px, y: py, face: { dx: face.dx, dy: face.dy }, script: script, step: 0, done: false }
  playTune(sfxRewind)
  msg = auto ? "TIME SAVES YOU!" : "REWIND! ECHO x" + n
  render()
}

function rewind() {
  if (state !== "play") return
  if (rewinds <= 0) {
    msg = "NO REWINDS"
    render()
    return
  }
  if (timeline.length === 0) {
    msg = "NOTHING TO UNDO"
    render()
    return
  }
  doRewind(false)
}

// ---- dash helpers (shared by the player and the echo)
function dashPath(x, y, f, range) {
  const path = []
  let cx = x
  let cy = y
  for (let i = 0; i < range; i++) {
    const nx = cx + f.dx
    const ny = cy + f.dy
    if (solid[ny][nx]) break
    path.push([nx, ny])
    cx = nx
    cy = ny
  }
  return path
}

// slash everything on the path, collect loot, return index of landing tile (-1 = none)
function slashAndLand(path) {
  for (const t of path) {
    const e = enemyAt(t[0], t[1])
    if (e) strike(e, atk + (e.stun > 0 ? 1 : 0))
  }
  let land = -1
  for (let i = path.length - 1; i >= 0; i--) {
    if (!enemyAt(path[i][0], path[i][1])) {
      land = i
      break
    }
  }
  for (let i = 0; i <= land; i++) pickupsAt(path[i][0], path[i][1])
  return land
}

// the echo performs ONE recorded action per player turn - for free, and it
// cannot be hurt. Gems it grabs and enemies it kills count for you.
function echoAct() {
  if (!echo) return
  if (echo.done) {
    echo = null
    return
  }
  const a = echo.script[echo.step]
  echo.step++

  if (a) {
    if (a.t === "move") {
      echo.face = { dx: a.dx, dy: a.dy }
      const nx = echo.x + a.dx
      const ny = echo.y + a.dy
      if (!solid[ny][nx]) {
        const e = enemyAt(nx, ny)
        if (e) {
          strike(e, atk + (e.stun > 0 ? 1 : 0))
        } else {
          echo.x = nx
          echo.y = ny
          pickupsAt(nx, ny)
        }
      }
    } else if (a.t === "dash") {
      const f = { dx: a.dx, dy: a.dy }
      echo.face = f
      const path = dashPath(echo.x, echo.y, f, a.range)
      if (path.length > 0) {
        const land = slashAndLand(path)
        if (land >= 0) {
          echo.x = path[land][0]
          echo.y = path[land][1]
        }
      }
    } else if (a.t === "pulse") {
      for (const e of enemies) {
        if (Math.abs(e.x - echo.x) + Math.abs(e.y - echo.y) <= a.r) e.stun = 4
      }
    }
  }

  if (echo.step >= echo.script.length) echo.done = true
}

// ---------------------------------------------------------------- turn engine
function endTurn() {
  turn++
  echoAct()

  const raised = spikePhase === 3

  // spikes bite whoever ends the turn on them while raised
  if (raised && spikeAt(px, py)) hurt(1, "SPIKES!")

  const pd = distMap(px, py)
  for (const e of enemies.slice()) enemyAct(e, pd)

  if (raised) {
    for (const e of enemies.slice()) {
      if (e.type !== wisp && spikeAt(e.x, e.y)) {
        e.hp -= 1
        if (e.hp <= 0) killEnemy(e, false)
      }
    }
  }

  spikePhase = (spikePhase + 1) % 4
  if (invuln > 0) invuln--

  if (hp <= 0) {
    // time itself refuses to let you die while you have rewinds left
    if (rewinds > 0 && timeline.length > 0) {
      doRewind(true)
      return
    }
    gameOver()
    return
  }
  render()
}

function pickupsAt(x, y) {
  for (let i = gems.length - 1; i >= 0; i--) {
    if (gems[i].x === x && gems[i].y === y) {
      gems.splice(i, 1)
      gemsGot++
      addScore(100)
      gainEnergy(1)
      playTune(sfxGem)
      say("GEM!")
      if (gemsGot >= gemTotal && !exitOpen) {
        exitOpen = true
        playTune(sfxOpen)
        say("EXIT OPEN!")
      }
    }
  }
  for (let i = hearts.length - 1; i >= 0; i--) {
    if (hearts[i].x === x && hearts[i].y === y && hp < maxHp) {
      hearts.splice(i, 1)
      hp++
      addScore(50)
      playTune(sfxHeal)
      say("+1 HP")
    }
  }
}

function checkExit() {
  if (exitOpen && px === exitPos.x && py === exitPos.y) floorComplete()
}

// ---------------------------------------------------------------- player actions
function tryMove(dx, dy) {
  if (state !== "play") return
  face = { dx: dx, dy: dy }
  const nx = px + dx
  const ny = py + dy

  if (solid[ny][nx]) {   // bumping a wall costs nothing, it just turns you
    msg = ""
    render()
    return
  }

  beginAction({ t: "move", dx: dx, dy: dy })

  const e = enemyAt(nx, ny)
  if (e) {
    strike(e, atk + (e.stun > 0 ? 1 : 0))
    endTurn()
    return
  }

  px = nx
  py = ny
  pickupsAt(px, py)
  checkExit()
  if (state === "play") endTurn()
}

function dash() {
  if (state !== "play") return
  if (en < DASH_COST) {
    msg = "NEED ENERGY"
    render()
    return
  }
  const path = dashPath(px, py, face, dashRange)
  if (path.length === 0) {
    msg = "BLOCKED"
    render()
    return
  }

  beginAction({ t: "dash", dx: face.dx, dy: face.dy, range: dashRange })
  en -= DASH_COST
  playTune(sfxDash)

  const land = slashAndLand(path)
  if (land >= 0) {
    px = path[land][0]
    py = path[land][1]
  }

  invuln = 1   // untouchable for this turn
  checkExit()
  if (state === "play") endTurn()
}

function pulse() {
  if (state !== "play") return
  if (en < PULSE_COST) {
    msg = "NEED 2 ENERGY"
    render()
    return
  }
  const targets = enemies.filter(e => Math.abs(e.x - px) + Math.abs(e.y - py) <= pulseR)
  if (targets.length === 0) {
    msg = "NO TARGETS"
    render()
    return
  }
  beginAction({ t: "pulse", r: pulseR })
  en -= PULSE_COST
  for (const e of targets) e.stun = 4
  playTune(sfxPulse)
  say("FROZEN " + targets.length + "!")
  endTurn()
}

function waitTurn() {
  if (state !== "play") return
  beginAction({ t: "wait" })
  say("...")
  endTurn()
}

// ---------------------------------------------------------------- flow
function startFloor() {
  buildFloor()
  state = "play"
  msg = "FLOOR " + floorNum
  turn = 0
  timeline = []
  echo = null
  render()
}

function newRun() {
  clearInterval(titleBlink)
  floorNum = 1
  score = 0
  hp = 3
  maxHp = 3
  en = 2
  maxEn = 5
  dashRange = 2
  pulseR = 2
  atk = 1
  rewinds = 2
  maxRewinds = 3
  rewindDepth = 3
  startFloor()
}

function floorComplete() {
  state = "upgrade"
  playTune(sfxStairs)
  bestFloor = Math.max(bestFloor, floorNum)
  const bonus = 200 * floorNum + 25 * hp
  addScore(bonus)
  hp = Math.min(maxHp, hp + 1)

  const pool = BOONS.filter(b => b.ok())
  pool.sort(() => Math.random() - 0.5)
  options = pool.slice(0, 3)

  lockUntil = Date.now() + 500
  setMap(blankMap)
  clearText()
  addText("FLOOR " + floorNum + " CLEAR!", { x: 3, y: 1, color: color`6` })
  addText("BONUS +" + bonus, { x: 5, y: 3, color: color`5` })
  addText("+1 REWIND CHARGE", { x: 2, y: 4, color: color`8` })
  addText("CHOOSE A BOON", { x: 3, y: 6, color: color`2` })
  const keys = ["J", "K", "L"]
  for (let i = 0; i < options.length; i++) {
    addText(keys[i] + " " + options[i].label, { x: 2, y: 8 + i * 2, color: color`7` })
  }
}

function pick(i) {
  if (state !== "upgrade" || locked() || !options[i]) return
  options[i].apply()
  rewinds = Math.min(maxRewinds, rewinds + 1)
  floorNum++
  startFloor()
}

function gameOver() {
  state = "over"
  playTune(sfxDie)
  bestFloor = Math.max(bestFloor, floorNum)
  lockUntil = Date.now() + 800
  setMap(blankMap)
  clearText()
  addText("TIME RAN OUT", { x: 4, y: 2, color: color`3` })
  addText("DEPTH  " + floorNum, { x: 5, y: 5, color: color`6` })
  addText("SCORE  " + score, { x: 5, y: 7, color: color`2` })
  addText("BEST   " + hiScore, { x: 5, y: 9, color: color`5` })
  addText("J = TRY AGAIN", { x: 3, y: 13, color: color`2` })
}

function showTitle() {
  state = "title"
  clearInterval(titleBlink)
  setMap(titleMap)
  let on = true
  const draw = () => {
    clearText()
    addText("ECHO DELVER", { x: 4, y: 1, color: color`6` })
    addText("ENEMIES MOVE WHEN", { x: 1, y: 3, color: color`3` })
    addText("YOU DO. THINK!", { x: 3, y: 4, color: color`3` })
    addText("WASD MOVE + ATTACK", { x: 1, y: 6, color: color`2` })
    addText("J DASH   L PULSE", { x: 2, y: 7, color: color`2` })
    addText("K REWIND: AN ECHO", { x: 1, y: 9, color: color`8` })
    addText("REPLAYS YOUR MOVES", { x: 1, y: 10, color: color`8` })
    if (on) addText("PRESS J", { x: 6, y: 14, color: color`6` })
    if (hiScore > 0) addText("BEST " + hiScore, { x: 5, y: 15, color: color`7` })
  }
  draw()
  titleBlink = setInterval(() => {
    on = !on
    draw()
  }, 500)
}

// ---------------------------------------------------------------- input
onInput("w", () => tryMove(0, -1))
onInput("s", () => tryMove(0, 1))
onInput("a", () => tryMove(-1, 0))
onInput("d", () => tryMove(1, 0))
onInput("i", () => waitTurn())

onInput("j", () => {
  if (state === "play") dash()
  else if (state === "upgrade") pick(0)
  else if ((state === "title" || state === "over") && !locked()) newRun()
})
onInput("k", () => {
  if (state === "play") rewind()
  else if (state === "upgrade") pick(1)
})
onInput("l", () => {
  if (state === "play") pulse()
  else if (state === "upgrade") pick(2)
})

showTitle()