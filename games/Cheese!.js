/*
@title: Cheese!
@author: wklnd
@tags: []
@addedOn: 2025-00-00
*/

// ===== SPRITES =====
const player   = "p"
const cheese   = "c"
const wall     = "w"
const guard    = "g"
const bigcheese = "b"
const portal   = "o"
const floor2   = "f"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [ cheese, bitmap`
................
................
....DDDDDDD.....
...DDDDDDDDD....
...DD1D1DDDD....
...DDDDDDDDD....
...D1DDDDD1D....
...DDDDDDDDD....
...DDDD1DDDD....
....DDDDDDD.....
................
................
................
................
................
................`],
  [ wall, bitmap`
1111111111111111
1111111111111111
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1100000000000011
1111111111111111
1111111111111111`],
  [ guard, bitmap`
................
.......444......
......44444.....
.....4.444.4....
.....4.444.4....
......44444.....
...44444444444..
...4.4.444.4.4..
...44444444444..
......4.4.4.....
......4.4.4.....
.....44.044.....
................
................
................
................`],
  [ bigcheese, bitmap`
................
...DDDDDDDDD....
..DDDDDDDDDDD...
..DD0DDD0DDDD...
..DDDDDDDDDDD...
..D0DDDDDDD0D...
..DDDDDDDDDDD...
..DDD0DDD0DDD...
..DDDDDDDDDDD...
...DDDDDDDDD....
....DDDDDDD.....
.....DDDDD......
......DDD.......
.......D........
................
................`],
  [ portal, bitmap`
................
.......55.......
.....555555.....
....55566555....
....55666555....
....55666555....
....55566555....
.....555555.....
.......55.......
................
................
................
................
................
................
................`],
  [ floor2, bitmap`
................
.66...66...66...
................
...66...66...66.
................
.66...66...66...
................
...66...66...66.
................
.66...66...66...
................
...66...66...66.
................
.66...66...66...
................
...66...66...66.`],
)

setSolids([player, wall, guard, bigcheese])

// ===== LEVELS =====
// Level 0: Tutorial room
// Level 1: The Patrol Room
// Level 2: The Hall of Weird Floors
// Level 3: The Boss (Big Cheese)

const levels = [
  map`
wwwwwwww
w......w
w..c...w
w......w
w...c..w
w......w
w..p...w
wwwwwwow`,

  map`
wwwwwwwwwww
w.........w
w.c.w.c...w
w...w.....w
w...w..c..w
wwwww.....w
w.........w
w....g....w
w.c.......w
w.........w
w....p....w
wwwwwwwwwww`,

  map`
wwwwwwwwwwwww
wfffffffffffw
wfcccccccccfw
wf.........fw
wfg........fw
wf.........fw
wfcccccccccfw
wfffffffffffw
wf.........fw
wf......g..fw
wf.........fw
wfp.......ofw
wwwwwwwwwwwww`,

  map`
wwwwwwwwwww
w.........w
w....b....w
w.........w
w.........w
w...c.c...w
w.........w
w.........w
w....p....w
wwwwwwwwwww`,
]

// ===== STATE =====
let level = 0
let cheeseCount = 0
let totalCheese = 0
let guardDir = { x: 1, y: 0 }
let guardTimer = 0
let guardTimer2 = 0
let guardDir2 = { x: 0, y: 1 }
let bossAngle = 0
let bossOscillating = false
let gameWon = false

function startLevel(n) {
  level = n
  setMap(levels[n])
  cheeseCount = 0
  totalCheese = getAll(cheese).length
  guardTimer = 0
  guardTimer2 = 0
  guardDir = { x: 1, y: 0 }
  guardDir2 = { x: 0, y: 1 }
  if (n === 0) addText("collect the cheese!",  { x: 1, y: 0, color: color`D` })
  if (n === 1) addText("watch the guards...", { x: 1, y: 0, color: color`4` })
  if (n === 2) addText("cursed floors...",    { x: 1, y: 0, color: color`6` })
  if (n === 3) addText("THE BIG CHEESE",      { x: 1, y: 0, color: color`D` })
}

startLevel(0)

// ===== INPUT =====
function tryMove(dx, dy) {
  const p = getFirst(player)
  if (!p) return
  p.x += dx
  p.y += dy
  checkCheese()
  checkGuardCollision()
  if (level === 3) checkBossProximity()
}

onInput("w", () => tryMove(0, -1))
onInput("s", () => tryMove(0,  1))
onInput("a", () => tryMove(-1, 0))
onInput("d", () => tryMove( 1, 0))

// ===== CHEESE COLLECTION =====
function checkCheese() {
  const p = getFirst(player)
  if (!p) return
  const cheeses = getAll(cheese)
  cheeses.forEach(c => {
    if (c.x === p.x && c.y === p.y) {
      c.remove()
      cheeseCount++
      addText("+" + cheeseCount, { x: p.x, y: p.y, color: color`D` })
    }
  })
  if (getAll(cheese).length === 0 && !gameWon) {
    checkPortal()
  }
}

function checkPortal() {
  const p = getFirst(player)
  const portals = getAll(portal)
  if (portals.length > 0) {
    // guide player to portal
    addText("find the portal!", { x: 1, y: 0, color: color`5` })
  } else {
    // no portal needed: advance immediately
    advanceLevel()
  }
}

// ===== PORTAL =====
afterInput(() => {
  const p = getFirst(player)
  if (!p) return
  const portals = getAll(portal)
  portals.forEach(port => {
    if (port.x === p.x && port.y === p.y && getAll(cheese).length === 0) {
      advanceLevel()
    }
  })
  moveGuards()
  if (level === 3) moveBigCheese()
})

function advanceLevel() {
  if (level < levels.length - 1) {
    clearText()
    startLevel(level + 1)
  } else {
    gameWon = true
    clearText()
    addText("you are\nthe cheese\nnow.", { x: 0, y: 1, color: color`D` })
  }
}

// ===== GUARD MOVEMENT =====
function moveGuards() {
  if (level < 1) return
  guardTimer++
  if (guardTimer < 3) return
  guardTimer = 0

  const guards = getAll(guard)
  if (guards.length === 0) return

  // First guard: horizontal patrol with bounce
  const g1 = guards[0]
  if (g1) {
    const nx = g1.x + guardDir.x
    const ny = g1.y + guardDir.y
    const blocked = getTile(nx, ny).some(t => t.type === wall || t.type === bigcheese)
    if (blocked) {
      guardDir.x *= -1
      guardDir.y *= -1
    } else {
      g1.x = nx
      g1.y = ny
    }
    checkGuardCollision()
  }

  // Second guard (level 2+): vertical patrol
  if (level >= 2 && guards.length > 1) {
    guardTimer2++
    const g2 = guards[1]
    if (g2) {
      const nx2 = g2.x + guardDir2.x
      const ny2 = g2.y + guardDir2.y
      const blocked2 = getTile(nx2, ny2).some(t => t.type === wall)
      if (blocked2) {
        guardDir2.x *= -1
        guardDir2.y *= -1
      } else {
        g2.x = nx2
        g2.y = ny2
      }
      checkGuardCollision()
    }
  }
}

function checkGuardCollision() {
  const p = getFirst(player)
  if (!p) return
  const guards = getAll(guard)
  guards.forEach(g => {
    if (g.x === p.x && g.y === p.y) {
      clearText()
      addText("caught!\npress i\nto retry", { x: 1, y: 1, color: color`4` })
      p.x = Math.floor(levels[level].split('\n')[0].length / 2)
      p.y = Math.floor(levels[level].split('\n').length - 2)
    }
  })
}

// ===== BIG CHEESE BOSS =====
function moveBigCheese() {
  const bc = getFirst(bigcheese)
  const p  = getFirst(player)
  if (!bc || !p) return

  bossAngle++
  // Big cheese slowly drifts toward player every 4 ticks
  if (bossAngle % 4 === 0) {
    const dx = Math.sign(p.x - bc.x)
    const dy = Math.sign(p.y - bc.y)
    // Alternate x/y chase to feel organic
    if (bossAngle % 8 === 0) {
      bc.x += dx
    } else {
      bc.y += dy
    }
    checkBossProximity()
  }
}

function checkBossProximity() {
  const bc = getFirst(bigcheese)
  const p  = getFirst(player)
  if (!bc || !p) return
  const dist = Math.abs(bc.x - p.x) + Math.abs(bc.y - p.y)
  if (dist <= 1) {
    clearText()
    addText("squished by\ncheese!\npress i\nto retry", { x: 0, y: 1, color: color`D` })
    p.x = 4
    p.y = 8
  }
}

// ===== RESTART =====
onInput("i", () => {
  clearText()
  startLevel(level)
})