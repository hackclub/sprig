/*
    @title: box pusher
    @author: rufus
    @description: push the boxes onto the goals. boxes on ice will slide. WASD to move, K to undo, J to restart the level.
    @tags: ['puzzle']
    @addedOn: 2026-11-14
    */

const player = "p"
const crate = "c"
const target = "t"
const ice = "i"
const wall = "w"
const floor = "f"

setLegend(
  [player, bitmap`
.......22.......
......2222......
....22222222....
..222222222222..
....D444444D....
...D44444444D...
...D44044044D...
...D44444444D...
...D40444404D...
...D40040004D...
...D44000444D...
....D444444D....
.....DDDDDD.....
................
................
................`],
  [crate, bitmap`
................
.CCCCCCCCCCCCCC.
.C99999CC99999C.
.C99999CC99999C.
.C00099CC99099C.
.C090090099090C.
.C090090C09900C.
.C00CCC0C0C00CC.
.C000CC0C0C0C0C.
.C0909900000900.
.C00099CC909990.
.C99999CC99999C.
.C99999CC99999C.
.C99999CC99999C.
.CCCCCCCCCCCCCC.
................`],
  [target, bitmap`
................
.....333333.....
....33333333....
..333322223333..
..332223322233..
.33222333322233.
.33223322332233.
.33223222232233.
.33223322332233.
..322333333223..
..322223322223..
..333222222333..
...3333333333...
......3333......
................
................`],
  [ice, bitmap`
7777777777777777
7777777777777727
7727777777777277
7277777777772777
7777777777727777
7777777777277777
7777777777777777
7777777777777777
7777777777777777
7777727777777777
7777277777777777
7772777777777777
7727777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L1111111L1111111
L1111111L1111111
L1111111L1111111
LLLLLLLLLLLLLLLL
1111L1111111L111
1111L1111111L111
1111L1111111L111
LLLLLLLLLLLLLLLL
L1111111L1111111
L1111111L1111111
L1111111L1111111
LLLLLLLLLLLLLLLL
1111L1111111L111
1111L1111111L111
1111L1111111L111`],
  [floor, bitmap`
0000000000000000
0000000000000000
0000000000000000
000000000000L000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000L00000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setBackground(floor)
setSolids([player, crate, wall])
setPushables({
  [player]: [crate]
})

const levels = [
  map`
wwwwwwww
wp.....w
w..c...w
w....t.w
w......w
wwwwwwww`,
  map`
wwwwwwww
wp.....w
w.c.c..w
w......w
w.t..t.w
wwwwwwww`,
  map`
wwwwwwww
wp.....w
w.c....w
w..w..tw
w.c....w
w.....tw
wwwwwwww`,
  map`
wwwwwwww
wp.....w
w.c....w
w.c...tw
w.c...tw
w.....tw
wwwwwwww`,
  map`
wwwwwwww
w..t...w
w..c...w
wtcpct.w
w..c...w
w..t...w
wwwwwwww`,
  map`
wwwwwwww
wp...t.w
wtc..c.w
w......w
w.c..ctw
w.t....w
wwwwwwww`,
  map`
wwwwwwww
w..p...w
w..c...w
w..c...w
w..tt..w
w......w
wwwwwwww`,
  map`
wwwwwwww
w.....tw
w....c.w
w..pc..w
w......w
wt.....w
wwwwwwww`,
  map`
wwwwwwww
w......w
w.cc...w
w.pc.t.w
w..c.t.w
wt...t.w
wwwwwwww`,
  map`
wwwwwwww
w...w.tw
w.c.w..w
wpc...tw
w.c.w..w
w...w.tw
wwwwwwww`,
  map`
wwwwwwww
w......w
wpciiitw
w......w
wwwwwwww`,
  map`
wwwwwwwww
wp......w
w..c....w
w.ciiii.w
w..iiii.w
w..iiiitw
w..t....w
wwwwwwwww`,
  map`
wwwwwwwww
w......ww
wpciiiiiw
w....wtww
w.c..wwww
w....wwww
wwwwwwwww`,
  map`
wwwwwwwwww
w...t....w
w.iiiiii.w
w.iiciii.w
wpiicitw.w
w.iiiici.w
w.t......w
wwwwwwwwww`,
  map`
wwwwwwwwwwww
wp....w....w
w.cc..i..t.w
w.....i....w
wiiiiiiiiiiw
w..t..i..c.w
w.....i....w
w.....w..t.w
wwwwwwwwwwww`,
  map`
wwwwwwwwww
w..w.....w
w.cii.iitw
wp.iiciiiw
w..iiwi..w
w.ciii.c.w
w..t..t..w
wwwwwwwwww`,
  map`
wwwwwwwwww
wp...w...w
w.c..i.t.w
w...ciii.w
w.c..i...w
wiiiii..tw
w....t...w
wwwwwwwwww`,
  map`
wwwwwwwwwwww
wt..w......w
w...wiiiii.w
w.c.iiiiii.w
wp.ciiwiictw
w...iiiiii.w
w.c.wiiiii.w
wt..w....t.w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w....t.....w
w.iiiiiiii.w
w.i..c...i.w
wpictwwtci.w
w.i...c..i.w
w.iiiiiiii.w
w.....t....w
wwwwwwwwwwww`,
]

const hints = {
  10: "Boxes slide on ice!"
}

const winSound = tune`
200: C5~200,
200: E5~200,
200: G5~200,
5800`
const pushSound = tune`
60: C4~60,
1860`
const slideSound = tune`
50: A5~50,
50: E5~50,
1500`

let level = 0
let finished = false
let moves = 0
let totalMoves = 0
let history = []

let lastDx = 0
let lastDy = 0
let moved = false
let startX = 0
let startY = 0
let pushed = null
let before = null

function crateAt(x, y) {
  return getTile(x, y).find(s => s.type === crate)
}

function isIce(x, y) {
  return getTile(x, y).some(s => s.type === ice)
}

function snapshot() {
  return getAll()
    .filter(s => s.type === player || s.type === crate)
    .map(s => ({ type: s.type, x: s.x, y: s.y }))
}

function drawHud() {
  clearText()
  addText("Level " + (level + 1) + "/" + levels.length, { x: 1, y: 0, color: color`2` })
  addText("Moves " + moves, { x: 1, y: 15, color: color`2` })
  if (hints[level]) addText(hints[level], { x: 1, y: 13, color: color`7` })
}

function showLevel() {
  setMap(levels[level])
  moves = 0
  history = []
  drawHud()
}
showLevel()

function move(dx, dy) {
  if (finished) return
  const p = getFirst(player)
  lastDx = dx
  lastDy = dy
  startX = p.x
  startY = p.y
  before = snapshot()
  pushed = crateAt(p.x + dx, p.y + dy) || null
  if (dx) p.x += dx
  if (dy) p.y += dy
  moved = true
}

function slide(c) {
  let slid = false
  for (let i = 0; i < 100 && isIce(c.x, c.y); i++) {
    const ox = c.x
    const oy = c.y
    if (lastDx) c.x += lastDx
    if (lastDy) c.y += lastDy
    if (c.x === ox && c.y === oy) break
    slid = true
  }
  return slid
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

onInput("j", () => {
  if (finished) {
    finished = false
    level = 0
    totalMoves = 0
  }
  showLevel()
})

onInput("k", () => {
  if (finished || history.length === 0) return
  const snap = history.pop()
  getAll(player).forEach(s => s.remove())
  getAll(crate).forEach(s => s.remove())
  snap.forEach(s => addSprite(s.x, s.y, s.type))
  moves--
  drawHud()
})

afterInput(() => {
  if (!moved) return
  moved = false
  if (finished) return

  const p = getFirst(player)
  if (p.x === startX && p.y === startY) return

  history.push(before)
  moves++
  if (pushed) {
    if (slide(pushed)) playTune(slideSound)
    else playTune(pushSound)
  }
  drawHud()

  if (tilesWith(target, crate).length === tilesWith(target).length) {
    playTune(winSound)
    totalMoves += moves
    level++
    if (level >= levels.length) {
      finished = true
      clearText()
      addText("You win!", { x: 6, y: 5, color: color`6` })
      addText("Total moves: " + totalMoves, { x: 3, y: 7, color: color`2` })
      addText("J: play again", { x: 4, y: 9, color: color`2` })
    } else {
      showLevel()
    }
  }
})
