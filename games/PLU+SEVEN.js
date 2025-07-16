/*
@title: TBD
@author: solace
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const innerWall = "f"
const coin = "c"
const laser = "l"

let coinCount = 0

setLegend(
  [ player, bitmap`
................
....77777777....
...7777777777...
..777777777777..
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
..777777777777..
...7777777777...
....77777777....
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ innerWall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ coin, bitmap`
................
................
................
.......66.......
.......66.......
......6666......
.....666666.....
...6666666666...
...6666666666...
.....666666.....
......6666......
.......66.......
.......66.......
................
................
................`],
  [ laser, bitmap`
................
................
................
................
................
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
................
................
................
................
................`]
)

const blankMap = map`
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
................`

addText("Coins: " + coinCount, {
x: 6,
y: 15,
color: color`L`
})

setSolids([ player, wall, innerWall ])

let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffw
wfffffffffffffffffffffffw
wfflf.ffl.fffff.c.....ffw
wff...fff.flfffff.fff.ffw
wff.fcf...f.ffl.f.lfl.ffw
wff.ffflf...fff.f.fff.ffw
wff.fffff.f.f.........ffw
wff.......f...f..fffffffw
wffffffffff..fff..ffffffw
wff.ff..lf.....ff..ffcffw
wff....fff.....fff..f.ffw
wffcff.flf..p..ffff...ffw
wffff..f.f.....ffff.ffffw
wfffff...ff..fff......ffw
wff....f.........f..flffw
wff.fffff..ffff.fff.ffffw
wff.flf....f.cflf...ffffw
wff...ff.fff.ffff.f...ffw
wffff.ff.flf......fff.ffw
wfffc.ff.f...ffff.fc..ffw
wfffffffffffffffffffffffw
wfffffffffffffffffffffffw
wwwwfffffffffffffffffwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffw
wfffffffffffffffffffffffw
wffcf.ff...fff...ffcf.ffw
wff.f.f..f.f.f.f..f.f.ffw
wff.f....f.....f....f.ffw
wff.f.f.ffff.ffff.f.f.ffw
wff...f.fc......f.f...ffw
wffffff.ffff.ffff.ffffffw
wffllll.lff...ffl.llllffw
wff......f.....f......ffw
wfflll.llf.....fll.lllffw
wff.c....f..p..f....c.ffw
wffll.lllf.....flll.llffw
wffll.lllff...fflll.llffw
wffff.ffffff.ffffff.ffffw
wff.f.f...........f.f.ffw
wff.f.fff.f...f.fff.f.ffw
wff....f...fff...f....ffw
wff.ff.f.f..f..f.f.ff.ffw
wff.fc...ff.fcff....f.ffw
wfffffffffffffffffffffffw
wfffffffffffffffffffffffw
wwwwfffffffffffffffffwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
wfffffffffffffffffffffffw
wfffffffffffffffffffffffw
wff............c......ffw
wffllll.ll.lll.ll.llllffw
wffclll.ll.lll.ll.lllcffw
wff...l.ll.....ll.l...ffw
wffll.l.l..lll..l.l.llffw
wffl.................lffw
wfflllll.ff...ff.lllllffw
wffl.....f.....f.....lffw
wffl.llllf.....fllll.lffw
wffl.llllf..p..fllll.lffw
wffl....cf.....f.....lffw
wfflllll.ff...ff.lllllffw
wffl................clffw
wffll.l.l..lll..l.l.llffw
wff...l.ll.....ll.l...ffw
wff.lll.ll.lll.ll.lll.ffw
wffllll.ll.lll.ll.llllffw
wffllc....lllll....cllffw
wfffffffffffffffffffffffw
wfffffffffffffffffffffffw
wwwwfffffffffffffffffwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

// Create a tune:
const up = tune`16000`;
const down = tune`16000`;
const left = tune`16000`;
const right = tune`16000`;

// inputs for player movement control
let inputEnabled = true

onInput("s", () => {
  if (!inputEnabled) return
  getFirst(player).y += 1
  playTune(down)
})

onInput("d", () => {
  if (!inputEnabled) return
  getFirst(player).x += 1
  playTune(right)
})

onInput("a", () => {
  if (!inputEnabled) return
  getFirst(player).x -= 1
  playTune(left)
})

onInput("w", () => {
  if (!inputEnabled) return
  getFirst(player).y -= 1
  playTune(up)
})

function removeInputHandlers() {
  onInput("w", () => {})
  onInput("a", () => {})
  onInput("s", () => {})
  onInput("d", () => {})
}

afterInput(() => {
  const p = getFirst(player)
  const objAtPlayer = getTile(p.x, p.y)

  for (let obj of objAtPlayer) {
    if (obj.type === coin) {
      coinCount++
      obj.remove()
      clearText()
      addText("Coins: " + coinCount, {
        x: 6,
        y: 15,
        color: color`L`
      })
    }

    if (obj.type === laser) {
      clearText()
      setMap(blankMap)
      addText("GAME OVER", {
        x: 6,
        y: 6,
        color: color`red`
      })
      inputEnabled = false
    }

    if (coinCount === 7) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
    clearText()
    coinCount = 0
    addText("Coins: " + coinCount, {
    x: 6,
    y: 15,
    color: color`L`
    })

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap(blankMap)
      clearText()
      addText("you win!", { y: 4, color: color`4` });
    }
  }
  }
})