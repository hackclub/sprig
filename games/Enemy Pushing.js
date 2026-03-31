/*
Use left keys to move player, right keys to move enemies

@title: Enemy Pushing
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const explosion = "e"
const enemy = "b"
const bigEnemy = "q"
const crate = "c"
const flag = "f"

setLegend(
  [ player, bitmap`
................
................
...00000000000..
..033333333330..
..033333330130..
..033333330030..
..033333333330..
..033333333330..
..03333333330...
..033333333330..
..033333333330..
...0330003330...
...000...0000...
................
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ explosion, bitmap`
....6......6....
....6.....66....
....66....6.6...
.....6...6..3...
66666666.6336...
...6666633636...
.6...633399.33..
..6.3333999336..
..633339333636..
...6.3333333.6..
...66..6.333.6..
.....666.66633..
...6666666..6...
.....6666.......
................
................` ] ,
  [ enemy, bitmap`
................
................
................
................
........00......
....0000990000..
.....099999990..
.....090990990..
.....099999990..
....0999999990..
....0999009990..
....099099090...
....099999990...
.....0999900....
.....00900......
.......0........` ] ,
  [ bigEnemy, bitmap`
.....00000000...
...0033333330...
...03333333330..
..003333333330..
..033633336330..
..033333333330..
..033333333330..
..036333333330..
..036633333660..
..033633333630..
..033366636630..
..033333366300..
..00333333330...
...0033333300...
.....0000000....
.........0......` ],
  [ crate, bitmap`
LLLLLLLLLLLLLLLL
LCC11111111111CL
LL1C111111111C1L
LL11C111111CC11L
L1111C1111C1111L
L1111CC11C11111L
L111111CCC11111L
L1111111CC11111L
L111111C11C1111L
L11111C1111C111L
L1111C111111C11L
L111C11111111C1L
L11C1111111111CL
L1CC1111111111CL
L1C111111111111L
LLLLLLLLLLLLLLLL` ],
  [ flag, bitmap`
................
................
......4444444...
.....L44444444..
.....L44444444..
.....L44444444..
.....LDDD4DDDDD.
.....L..DD......
.....0L.........
......L.........
......0L........
.......L........
.......L........
.......L........
.......0........
................` ] 
)

setSolids([ player, wall, enemy, crate, bigEnemy ])

let level = 0
let steps = 0
const levels = [
  map`
p
.
.
c
f
b
.`,
  map`
.pw.
bcfb
.ww.`,
  map`
.w.
p..
.wc
wfq`,
  map`
p..c..c.c..
wwwbw......
..w.wwwwwww
bbwb....c.f
..wwwwww...`,
  map`
.w..bw.
.wfc.w.
wwww..w
...c..w
b.b.w.w
wwwwwcw
p......`,
  map`
bb..b..f
bwwwwww.
p..bbb..`,
  map`
p..
wwc
.b.
fb.`,
  map`
...bbbb.bbbbbb...
....bbbbbbbb.....
p...bb.b.bb.....f`,
  map`
.b....w.
.ww.b...
.fwb.w..
....w.w.
.b.ww.b.
www....w
...w.bw.
.b..b...
ww...w.p`,
  map`
bb.c.b...
.wwwww.w.
..wwbb..b
p.bbb.w..
.wwwwww.w
......c.f`,
  map`
p.bbbbbbb.cfw
wwwwwwwww.wbw
w.........wbw
bbww..ww..wb.
bbbbw.w..wwwb
bwwb..w...w.b
bbwbw...wwwwb
bwbb.w.......`,
  map`
p.q.q.q.q.c
.cccccccc.c
...q.q.qc.c
.cccbbbbc..
.cccccccc.c
..q.q.q...f`
]

setMap(levels[level])

setPushables({
  [ player ]: [ crate ],
  [ bigEnemy ]: [ crate ],
})

onInput("s", () => {
  getFirst(player).y += 1
  steps++
})

onInput("w", () => {
  getFirst(player).y -= 1
  steps++
})

onInput("a", () => {
  getFirst(player).x -= 1
  steps++
})

onInput("d", () => {
  getFirst(player).x += 1
  steps++
})

onInput("i", () => {
  getAll(enemy).forEach(bad => {
    bad.y -= 1;
  })

  getAll(bigEnemy).forEach(bad => {
    bad.y -= 1;
  })
})

onInput("k", () => {
  getAll(enemy).forEach(bad => {
    bad.y += 1;
  })

  getAll(bigEnemy).forEach(bad => {
    bad.y += 1;
  })
})

onInput("j", () => {
  getAll(enemy).forEach(bad => {
    bad.x -= 1;
  })

  getAll(bigEnemy).forEach(bad => {
    bad.x -= 1;
  })
})

onInput("l", () => {
  getAll(enemy).forEach(bad => {
    bad.x += 1;
  })

  getAll(bigEnemy).forEach(bad => {
    bad.x += 1;
  })
})

afterInput(() => {
  getAll(enemy).forEach(bad => {
    bad.x += Math.floor(Math.random() * 3) - 1;
    bad.y += Math.floor(Math.random() * 3) - 1;
  })

  // Check if player reached flag
  if (getFirst(flag).x == getFirst(player).x && getFirst(flag).y == getFirst(player).y) {
    level++;

    if (level >= levels.length) {
      addText("you win!", { 
        x: 6,
        y: 4,
        color: color`4`
      })
    } else {
      setMap(levels[level])
    }
  }

  // Update text
  clearText()
  addText(steps.toString(), { 
    x: 0,
    y: 0,
    color: color`7`
  })

  if (level == 0) {
    addText("use arrow keys", { 
        x: 0,
        y: 1,
        color: color`7`
      })
  }

  if (level == 2) {
    addText("use other keys", { 
        x: 0,
        y: 1,
        color: color`7`
      })

    addText("to move enemies", { 
        x: 0,
        y: 2,
        color: color`7`
      })
  }
})