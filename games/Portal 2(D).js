/*
@title: Portal 2(D)
@author: NicTrix23
@tags: []
@addedOn: 2026-01-28
*/

const player = "p"
const prtOrg = "O"
const prtBlu = "B"
const tst = "t"
const floor = "f"
const walk = "w"
const btn = "b"
const btp = "ü"
const door = "d"
const exit = "e"
const blocker = "ö"
const fake = "i"
const flingplate = "n"



setLegend(
  [player, bitmap`
................
.....00000......
.....0...0......
.....0...0......
.....0...0......
.....00000......
.......0........
......000.......
.....0.0.0......
....0..0..0.....
.......0........
.......0........
.......0........
.......0........
......000.......
.....0...0......`],
  [prtOrg, bitmap`
................
................
................
......9999......
.....996699.....
....99666699....
....96666669....
....96666669....
....96666669....
....96666669....
....96666669....
....96666669....
....96666669....
....99666699....
.....996699.....
......9999......`],
  [prtBlu, bitmap`
................
................
................
......5555......
.....557755.....
....55777755....
....57777775....
....57777775....
....57777775....
....57777775....
....57777775....
....57777775....
....57777775....
....55777755....
.....557755.....
......5555......`],
  [tst, bitmap`
................
................
................
................
................
................
.......33.......
.......00.......
.......00.......
.......33.......
................
................
................
................
................
................`],
  [floor, bitmap`
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
2222222222222222`],
  [walk, bitmap`
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
0000000000000000`],
  [btn, bitmap`
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
....33333333....
...3333333333...
...3333333333...
..111111111111..`],
  [btp, bitmap`
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
...3333333333...
..111111111111..`],
  [door, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111117777111110
0111177777711110
0777777777777770
0111177777711110
0111117777111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110`],
  [exit, bitmap`
4444444444444444
4222424242422244
4244424242442444
4222442442442444
4244424242442444
4222424242442444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`, ],
  [blocker, bitmap`
66..66..66..66..
6..66..66..66..6
..66..66..66..66
.66..66..66..66.
66..66..66..66..
6..66..66..66..6
..66..66..66..66
.66..66..66..66.
66..66..66..66..
6..66..66..66..6
..66..66..66..66
.66..66..66..66.
66..66..66..66..
6..66..66..66..6
..66..66...6..66
.66..66..66..66.`],
  [fake, bitmap`
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
0000000000000002`],
  [flingplate, bitmap`
................
................
................
.......4........
......444.......
.....44444......
.......4........
.......4........
.......4........
.......4........
.......4........
................
................
................
.11777777777711.
1111111111111111`]
)

setSolids(
  [player, walk, door, blocker]
)

let level = 0
const levels = [
  map`
wffffffffffwfffw
wffpffffffföfbfw
wwwwwwwffffwwwww
wfffffffffffffww
wfwwwwwwwwwwiwww
wfwfffffffffdffw
wfwfffffffffdffw
wfwwwwwwwwwwiwww
wfffffffdfefffff
wfffffffdfefffff
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
fffffffffffffff
fffffffffffffff
fffffwffffwffff
ffffffdfffwffff
ffffpwffffwffff
fffwwwwwfffffff
fffwffffwffffdd
ffbwfffffwfffdf
iwwwffffffwffde
iiiiiiiiiiiiiii`,
  map`
................
...........www..
iw.........w..ww
iw..........b.w.
iw.p..w....www..
iwwwwww....www..
iw...ö...ddwww..
iwb..ö.wdeewww..
iiwwwwwwweewww..
iiiiiiiiiiiw....`,
  map`
...............
.p.............
.............e.
............www
wwwwww.........
...............
.........n.....
......wwwwww...
...............`,
  map`
..ww....bi.edd.
...w...wwwwwdd.
...w......ww...
...w.......w..n
...ww.n...bw..w
...pw.www.wwn..
....www.....w..
.........n.....
.........w...n.`,
  map`
wp..öb.wwwww..e
wwdwwwww.....ww
.........www...
w..............
.www........n..
............w..
........n......
........w......
......n........`,
  map`
w..ö.......ö..w
w..ö.......ö..w
w..ö..w.w..ö..w
w.bö..wpw..öb.w
wwww..www..wwww
...............
....n.....n....
....wwdddww....
.....iieww.....`,
  map`
...............
.w...w.w.w...w.
.w...w.w.ww..w.
.w.w.w.w.w.w.w.
.w.w.w.w.w.w.w.
.w.w.w.w.w..ww.
..w.w..w.w...w.
...............
...............`
]

setMap(levels[level])

setPushables({
  [player]: []
})

let lastDir = { x: 1, y: 0 }
let portalCooldown = 0
let exitedPortal = null

let vy = 0
const gravity = 0.7
const jumpPower = -1.8
const springPower = -2.5
const physicsSpeed = 200

function inBounds(x, y) {
  return x >= 0 && x < width() && y >= 0 && y < height()
}

function isSolidType(t) {
  return t === walk || t === door || t === blocker
}

function isSolidAt(x, y) {
  if (!inBounds(x, y)) return true
  return getTile(x, y).some(t => isSolidType(t.type))
}

function movePlayer(dx, dy) {
  const p = getFirst(player)
  if (!p) return
  const nx = p.x + dx
  const ny = p.y + dy
  if (isSolidAt(nx, ny)) return
  p.x = nx
  p.y = ny
}

onInput("a", () => {
  movePlayer(-1, 0)
  lastDir = { x: -1, y: 0 }
})

onInput("d", () => {
  movePlayer(1, 0)
  lastDir = { x: 1, y: 0 }
})

onInput("w", () => {
  const p = getFirst(player)
  if (!p) return
  if (!isSolidAt(p.x, p.y + 1)) return
  vy = jumpPower
})

function shootPortal(type) {
  const p = getFirst(player)
  if (!p) return

  let x = p.x
  let y = p.y
  let px = x
  let py = y
  let found = false

  while (true) {
    x += lastDir.x
    y += lastDir.y
    if (!inBounds(x, y)) break
    const tile = getTile(x, y)
    if (tile.some(t => t.type === walk)) {
      px = x - lastDir.x
      py = y - lastDir.y
      found = true
      break
    }
  }

  if (!found) return
  if (!inBounds(px, py)) return
  if (px === p.x && py === p.y) return

  getAll(type).forEach(o => o.remove())
  addSprite(px, py, type)
}

onInput("j", () => shootPortal(prtOrg))
onInput("l", () => shootPortal(prtBlu))

function physicsLoop() {
  const p = getFirst(player)
  if (!p) return

  vy += gravity

  const here = getTile(p.x, p.y)

  if (here.some(t => t.type === flingplate) && vy >= 0) {
    vy = springPower
  }

  const step = Math.sign(vy)

  for (let i = 0; i < Math.abs(vy); i++) {
    if (isSolidAt(p.x, p.y + step)) {
      vy = 0
      break
    }
    p.y += step
  }

  if (portalCooldown > 0) portalCooldown--

  const onOrg = here.some(t => t.type === prtOrg)
  const onBlu = here.some(t => t.type === prtBlu)

  if (!onOrg && !onBlu) {
    exitedPortal = null
  }

  if (portalCooldown === 0 && exitedPortal === null) {
    if (onOrg) {
      const b = getFirst(prtBlu)
      if (b) {
        p.x = b.x
        p.y = b.y
        portalCooldown = 2
        exitedPortal = prtBlu
      }
    } else if (onBlu) {
      const o = getFirst(prtOrg)
      if (o) {
        p.x = o.x
        p.y = o.y
        portalCooldown = 2
        exitedPortal = prtOrg
      }
    }
  }

  if (here.some(t => t.type === exit)) {
    level++
    if (level < levels.length) {
      setMap(levels[level])
      vy = 0
      portalCooldown = 0
      exitedPortal = null
    }
  }

  for (const b of getAll(btn)) {
    if (p.x === b.x && p.y === b.y) b.type = btp
  }

  if (getAll(btn).length === 0) {
    getAll(door).forEach(d => d.remove())
  }

  setTimeout(physicsLoop, physicsSpeed)
}

physicsLoop()

onInput("i", () => {
  setMap(levels[level])
  vy = 0
  portalCooldown = 0
  exitedPortal = null
})