/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: troll game
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"
const toggle ="t"
const gate ="x"
const walltroll = "h"

const winSound = tune`
200: C5~200,
200: E5~200,
200: G5~200
`

const trollSound = tune`
200: G4~200,
200: F4~200,
200: C4~400
`

const switchSound = tune`
100: C5~100
`



setLegend(
  [player, bitmap`
................
....00000000....
....00....00....
....0.0..0.0....
....0..00..0....
....0......0....
....00000000....
......5555......
...0055555500...
......5555......
......5555......
......6666......
......6666......
......6..6......
......6..6......
......6..6......` ],
  [ wall, bitmap`
....3...3...3...
...363.363.363..
..36.636.636.63.
...363.363.363..
....3...3...3...
....3...3...3...
....3...3...3...
....3...3...3...
....3...3...3...
....3...3...3...
....3...3...3...
....3...3...3...
...363.363.363..
..36.636.636.63.
...363.363.363..
....3...3...3...` ],
  [ goal, bitmap`
................
................
................
................
................
........4.......
.......444......
......44444.....
.......444......
........4.......
................
................
................
................
................
................` ],
  [gate, bitmap`
....5...5...5...
...565.565.565..
..56.656.656.65.
...565.565.565..
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
...565.565.565..
..56.656.656.65.
...565.565.565..
....5...5...5...` ],
  [toggle, bitmap`
................
................
................
................
................
........5.......
.......555......
......55555.....
.......555......
........5.......
................
................
................
................
................
................` ],
  [walltroll, bitmap`
....5...5...5...
...565.565.565..
..56.656.656.65.
...565.565.565..
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
....5...5...5...
...565.565.565..
..56.656.656.65.
...565.565.565..
....5...5...5...` ],
  
)

setSolids([ player, wall,gate,walltroll ])
let gateOpened = false

let level = 0
const levels = [
  map`
p....
xwww.
ght..`,
  
  map`
p....
hxww.
gxt..`,

  map`
pw..t
..w..
x..w.
gh...`,

  map`
gh...
xh.w.
...w.
pww.t`,

  map`
g.ht
..w.
wxw.
p...`,
  map`
pw...
..w..
w....
t.w.x
w.xhg`,
  map`
pxxxg
...w.
..w..
twhhh
.....`,
   map`
px..g
.w...
..w..
...w.
..th.`,
   map`
pw.w.
.x.x.
.wgw.
.hwh.
..t..`,
   map`
p....
.....
.www.
.xgh.
.w.wt`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  const onGoal = tilesWith(player, goal).length > 0
  const onWalltroll = tilesWith(player, walltroll).length > 0
  const onSwitch = tilesWith(player, toggle).length > 0

  if (onSwitch && !gateOpened) {
  gateOpened = true

  playTune(switchSound)

  setSolids([player, wall])
}

if (onGoal) {

  playTune(winSound)

  level++

  if (level < levels.length) {

    gateOpened = false

    clearText()

    setSolids([player, wall, gate, walltroll])

    setMap(levels[level])

  } else {

    clearText()

    addText("GAME WON!", {
      x: 2,
      y: 4,
      color: color`4`
    })

  }
}
if (onWalltroll) {

  playTune(trollSound)

  clearText()

  addText("TROLLED!", {
    x: 3,
    y: 4,
    color: color`3`
  })

  gateOpened = false

  setSolids([player, wall, gate, walltroll])

  setMap(levels[level])
}

})