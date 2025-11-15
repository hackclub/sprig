const player = "p"
const wall = "b"
const fakeWall = "f"
const goal = "g"
const teleA = "a"
const teleB = "t"
const moveBlock = "m"
const fakeGoal1 = "h"
const fakeGoal2 = "j"
const fakeGoal3 = "k"
const empty = "e"

setLegend(
  [ empty, bitmap`
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
................` ],
  [ player, bitmap`
................
................
................
................
................
..............0.
...0............
...............0
..0...........00
..0...........0.
..00.........00.
...000....0000..
......00000.....
................
................
................` ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CC00LLLLLLLL00CC
C0CLLLLLLLLLLC0C
C0LC12222221CL0C
CLL1C222222C1LLC
CLL22C2222C22LLC
CLL222C22C222LLC
CLL2222CC2222LLC
CLL2222CC2222LLC
CLL222C22C222LLC
CLL22C2222C22LLC
CLL1C222222C1LLC
C0LC12222221CL0C
C0CLLLLLLLLLLC0C
CC00LLLLLLLL00CC
CCCCCCCCCCCCCCCC` ],
  [ fakeWall, bitmap`
3333333333333333
33LLLLLLLLLLLL33
3L3LLLLLLLLLL3L3
3LL3122222213LL3
3LL1322222231LL3
3LL2232222322LL3
3LL2223223222LL3
3LL2222332222LL3
3LL2222332222LL3
3LL2223223222LL3
3LL2232222322LL3
3LL1322222231LL3
3LL3122222213LL3
3L3LLLLLLLLLL3L3
33LLLLLLLLLLLL33
3333333333333333` ],
  [ goal, bitmap`
....HHHHHHHH....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
HHHH23HHHH23HHHH
HHHH39HHHH39HHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH3HHHHHHHHHH3HH
HH93HHHHHHHH39HH
HH9933HHHH3399HH
HHH9933333399HHH
.HHH99999999HHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
....HHHHHHHH....` ],
  [ teleA, bitmap`
................
................
.......HH.......
......H..H......
.....H.88.H.....
.....H.88.H.....
.....H.HH.H.....
..333H.88.H333..
..333H.88.H333..
.....H.HH.H.....
.....H.88.H.....
.....H.88.H.....
......H..H......
.......HH.......
................
................` ],
  [ teleB, bitmap`
................
................
.......88.......
......8..8......
.....8.HH.8.....
.....8.HH.8.....
.....8.88.8.....
..3338.HH.8333..
..3338.HH.8333..
.....8.88.8.....
.....8.HH.8.....
.....8.HH.8.....
......8..8......
.......88.......
................
................` ],
  [ moveBlock, bitmap`
CFCCCCCCCCCCCCCC
FFFCCCCCCCCCC11C
CFFFCCCCCCCCCLLC
CCFFFCCCCCCCCCCC
CCCFFFCCCCCCCCCC
CCCCFFFCCCCCCCCC
CCCCCFFFCCCCCCCC
CCCCCCFFFCCCCCCC
CCCCCCCFFFCCCCCC
CCCCCCCCFFFCCCCC
CCCCCCCCCFFFCCCC
CCCCCCCCCCFFFCCC
CCCCCCCCCCCFFFCC
C1LCCCCCCCCCFFFC
C11CCCCCCCCCCFFF
CCCCCCCCCCCCCCFC` ],
  [ fakeGoal1, bitmap`
....HHHHHHHH....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
HHHH32HHHH32HHHH
HHHH93HHHH93HHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH3HHHHHHHHHH3HH
HH93HHHHHHHH39HH
HH9933HHHH3399HH
HHH9933333399HHH
.HHH99999999HHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
....HHHHHHHH....` ],
  [ fakeGoal2, bitmap`
....HHHHHHHH....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
HHHH29HHHH29HHHH
HHHH93HHHH93HHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH3HHHHHHHHHH3HH
HH93HHHHHHHH39HH
HH9933HHHH3399HH
HHH9933333399HHH
.HHH99999999HHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
....HHHHHHHH....` ],
  [ fakeGoal3, bitmap`
....HHHHHHHH....
...HHHHHHHHHH...
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
HHHH23HHHH23HHHH
HHHH39HHHH39HHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH9HHHHHHHHHH9HH
HH39HHHHHHHH93HH
HH3399HHHH9933HH
HHH3399999933HHH
.HHH33333333HHH.
..HHHHHHHHHHHH..
...HHHHHHHHHH...
....HHHHHHHH....` ]
)

setBackground(empty)
setSolids([ wall, moveBlock ])

let level = 0
let paused = false

const levels = [
map`
bbbbg
....e
.bbbb
e....
bbbbe
pe...`,

map`
pfee.
bbbbm
e.mf.
a..be
bbb.e
eetge`,

map`
pm..e
mm..e
...fe
ffffe
bbbba
tegbb`,

map`
.m....
.bbbf.
.bj.b.
.bbfbf
.b..fe
.bbbbg
p..fbe`,

map`
pbbb..m...ffa
fb...jbbmfbbf
m..bbbbfefjbf
.bff..bb.bbbf
.b.mmbb.eb.mf
b..j.f..eb..f
...m.f...b.bm
.bbbbbbbfb.bb
bb.b..bhfb..b
b.bjb.bbfbbbb
.bbfbbbbfbbgb
k.m....m.bbtb`,

map`
.tffmfpebejga`,

map`
p..b.bf.b...m..b.b..
.bbb....f.a...b.m...
..b..m......bb..b...
fb...jb....bbb...m..
fbb.....m......bb..j
fbb..ff......j..hb..
..bbb.mf....m....b..
.b....jbb.....m.bb..
.b.....m..b.........
f.m..m.bb..bb.......
mm.j..bb.....bbbb...
..m..b.....m....b...
.....hb..........bb.
mjf..bbb.....bbb.b..
fm...fb.bbbbb.......
.ffmbh.b........b..j
...fbbb.....m.......
..h..mf......m..bbbb
.....tf.....h....mg.`,

map`
p..b.bjb.....bmffb........
e.bb..fb.....bamffb..j....
..b.........bbmffb........
mjb....j....bbb.b......b..
fbb.............bbbb..b..j
fbb..ff......j....hb.bb...
..bbbmmf...........b.b....
.b.....jbb........bbebe...
.b........b...............
f.m.....bb...bb...........
mmjm...bb......bbbb....j..
..m...b............b......
......b...........bb......
mjf...bbb......bbb.b......
fmm..fb.bbbbbbb....b......
.ffmbh.b...........b..j...
...fbbb............b......
..h...f............bbbbbbb
......f....h.......mgfbt.kd`,

map`
bbbbbbbbbbbbbbbb
bpeeeeemeeeeeeb
bbeeebbbbbeeeb
bbeeehbeeeeebb
bbbmeebbbmeebb
bbeeeefeeeebbb
bbebbbbbeeeebb
bbebjjjbeeeebb
bbeeeebeeeeebb
bbbeebbbbbbeeb
bbeeeebeeeegbb
bbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbbbb
bpeeeeeebeeeeeeeb
bbbebbbbebbbbebbb
bbeeeaeeeeeeteeeb
bebbebbmbbebbebeb
bebeebeeeeebebeeb
bebeebhjjhbeebeeb
bebeeebbbbbeeebeb
bebeebeeeeebebeeb
bebmbbebbbbemmbeb
bebeebeeeegbebeeb
bbbbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbbbbb
bpeeeeemfeeeeeeebb
bbbbbebbebbbbbbebb
bbeeefeeeeeefeeebb
bBehbbbbbmbbbbhbb
bbeeeefeeeeeeeeeeb
bmbbbbbbbfbbbbmbbb
bbeeeeebeeeebeeee
bbbbbebebbbebbbbbb
beeeebeeegeeeebeb
bbbbbebebbbebbbbb
beeeebeeeeeeeeeeb
bbbbbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbbb
bpeeeeeeebeeeebb
bebbmbbbeebbmeeb
bebeebhjeebeeeeb
bebeebbbbebbbbeb
bebeeteeeaeebeeb
bebeebbbbbebebeeb
beeeebeeeebeeeeb
bebbebbbbbebbbeb
beeeebeeegeeeeeb
bbbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbb
bpeeeeefeeeebb
bbeebbmbbbeebb
bfeeeeffeeefeb
bbbbeebbbbbeeb
bmeeeebeemeemb
bbbhbebbbbhbbb
beeeeebeegeeeeb
bbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbbb
bpeeeeeeebeeeebb
bebbmbbbbeebbbeb
bebeefeeefeeebeeb
bebeebbbbbbbeebe
bebeebejjhbeebe
beeeebeeeebeeeeb
bmbbbbeebbbbmbbb
beeeeeefeeeegeeb
bbbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbb
bpeeeeemeemeeeeb
bebbbbbbebbbbebb
beefeeefeeeefeeb
bebmbbfhbbfmbebb
beeeeebeeeebeeeb
bbbbbebmbbebbbbb
beeeeeegeeeeeeeb
bbbbbbbbbbbbbbb
`,

map`
kkbjbkj
kkbtbkk
bbbfbfb
htfpftg
bbbfbfb
kkbtbkk
kkbkbkk`,

map`
gbbaff..........
gbf..bb...bbb...
fbbkm.bb.bb..g..
mbb....b.b......
..b..j.b.bb.....
..b...f.bb.bbbbb
...bbb...mf.e..e
.......p..b....e
.bbbbf.....b...e
b..mmmbb..feb...
bb.hmmb...fbe...
bb.t.mb....beee.
b...bbb.....b..k`,

map`
bbbbbbbbbbbbbbb
bpemmmmeeemmegb
bebbbbbb.bbbbbb
beeeefeeefeeeefb
bebbbbbb.bbbbbb
beeemmmebmmeee b
bebbbbbb.bbbbbb
beeeefeeefeeeefb
bebbbbbb.bbbbbb
beeemmmmeeemmeb
bebbbbbb.bbbbbb
beeeeeeeeegeeee
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
`,

map`
bbbbbbbbbbbbbbbbbbb
bpemmmmmmeeemmmmegb
bebbbbbb.bbbbbb.beb
beeeefeefeeeefeefeb
bebbbbbb.bbbbbb.beb
bemmmmbbbmbmmmbmmeb
bebbbbbb.bbbbbb.beb
beeeefeefeeeefeefeb
bebbbbbb.bbbbbb.beb
beeemmmmmmeeemmmmmeb
bebbbbbb.bbbbbb.beb
beeeeeeeeegeeeeeeeeb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb`,

map`
...................................................................
.b.....b.bbbbbb.bbbbbbb.b.....b.bbbbbb.b........b....b.bbbbbbbb....
.b.....b.b....b.b.......b....b..b......b........b....b.b.......b...
.b.....b.b....b.b.......b...b...b......b........b....b.b.......b...
.b.....b.b....b.b.......b..b....b......b........b....b.b.......b...
.b.....b.b....b.b.......b.b.....b......b........b....b.b.......b...
.b.....b.bbbbbb.b.......bb......b......b........b....b.b.......b...
.bbbbbbb.b....b.b.......bbb.....b......b........b....b.b.bbbbbb....
.b.....b.b....b.b.......b..b....b......b........b....b.b.......b...
.b.....b.b....b.b.......b..b....b......b........b....b.b.......b...
.b.....b.b....b.b.......b...b...b......b........b....b.b.......b...
.b.....b.b....b.b.......b...b...b......b........b....b.b.......b...
.b.....b.b....b.b.......b....b..b....eeb........b....b.b.......b...
.b.....b.b....b.bbbbbbb.b.....b.bbbbbbebbbbbbbb.bbbbbb.bbbbbbbb....
.....................................eee...........................
..............bbbbbbbbbbb.b...b.bbbbb.bb...b.b...b..bbb.b.b.b......
...................b......b...b.b...b.b.b..b.b..b..b....b.b.b......
...................b......b...b.b...b.b.bb.b.b.b...b....b.b.b......
........p.....g....b......bbbbb.bbbbb.b..b.b.bb.....bbb.b.b.b......
...................b......b...b.b...b.b...bb.bbb......b.b.b.b......
...................b......b...b.b...b.b...bb.b..b.....b............
...................b......b...b.b...b.b....b.b...b.bbb..b.b.b......`
]

setMap(levels[level])

function showPause() {
  clearText()
  addText("PAUSED", { x: Math.floor(width()/2 - 2), y: Math.floor(height()/2 - 1), color: color`3` })
  addText("J = Restart", { x: Math.floor(width()/2 - 5), y: Math.floor(height()/2 + 1), color: color`3` })
}

function hidePause() {
  clearText()
  addText(`Level: ${level + 1}`, { x: 0, y: 0, color: color`3` })
}

function safeFirst(t) {
  return getFirst(t) || null
}

function tryMove(dx, dy) {
  if (paused) return
  const p = safeFirst(player)
  if (!p) return
  const nx = p.x + dx
  const ny = p.y + dy
  if (nx < 0 || ny < 0 || nx >= width() || ny >= height()) return
  const tile = getTile(nx, ny)
  if (tile.some(o => o.type === wall)) return
  const block = tile.find(o => o.type === moveBlock)
  if (block) {
    const bx = nx + dx
    const by = ny + dy
    if (bx < 0 || by < 0 || bx >= width() || by >= height()) return
    const dest = getTile(bx, by)
    if (dest.some(o => o.type === wall || o.type === moveBlock)) return
    block.x = bx
    block.y = by
  }
  p.x = nx
  p.y = ny
}

onInput("w", () => tryMove(0, -1))
onInput("s", () => tryMove(0, 1))
onInput("a", () => tryMove(-1, 0))
onInput("d", () => tryMove(1, 0))

onInput("i", () => {
  paused = !paused
  paused ? showPause() : hidePause()
})

onInput("j", () => {
  if (paused) {
    setMap(levels[level])
    paused = false
    hidePause()
  }
})

afterInput(() => {
  if (paused) return
  const p = safeFirst(player)
  if (!p) return
  let tile = getTile(p.x, p.y)
  if (tile.some(o => o.type === teleA)) {
    const dest = getAll(teleB)[0] || null
    if (dest) { p.x = dest.x; p.y = dest.y; return }
  } else if (tile.some(o => o.type === teleB)) {
    const dest = getAll(teleA)[0] || null
    if (dest) { p.x = dest.x; p.y = dest.y; return }
  }
  tile = getTile(p.x, p.y)
  if (tile.some(o => [fakeGoal1, fakeGoal2, fakeGoal3].includes(o.type))) {
    level = 0
    setMap(levels[level])
    return
  }
  if (tile.some(o => o.type === goal)) {
    level++
    if (level >= levels.length) level = 0
    setMap(levels[level])
    hidePause()
  }
})

hidePause()
