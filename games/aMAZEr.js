/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: mazer
@description: fun maze enjoy
@author: 
@tags: ['runner', 'maze']
@addedOn: 2026-10-2
*/

const player = "p"
const wall = "w"
const exit = "e"

setLegend(
  [player, bitmap`
................
................
....0000000000..
....0........0..
....0........0..
....066....660..
....0.6....6.0..
....0........0..
....0........0..
....066....660..
....0.66..66.0..
....0..6666..0..
....0000000000..
................
................
................`],

  [wall, bitmap`
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

  [exit, bitmap`
................
....00000000....
...00......00...
..00........00..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..00........00..
...00......00...
....00000000....
................
................
................`]
)

setSolids([wall])

let level = 0
let time = 25

const levels = [

  map`
wwwwwwww
wp.....w
w.wwww.w
w......w
w.wwww.w
w......e
wwwwwwww`,

  map`
wwwwwwww
wp.....w
w.wwww.w
w.w....w
w.w.ww.w
w...ww.e
wwwwwwww`,

  map`
wwwwwwww
wp.....w
w.wwww.w
w....w.w
wwww.w.w
w......e
wwwwwwww`,

  map`
wwwwwwwwww
wp.......w
w.wwwwwwww
w.....w..w
w.ww..w..w
w..w.....w
w..wwww..w
w........e
wwwwwwwwww`,

  map`
wwwwwwwwww
wp.......w
w.wwwww..w
w.w......w
w.w.wwww.w
w...w....w
w.www.ww.w
w........e
wwwwwwwwww`,

  map`
wwwwwwwwwwww
wp.........w
w.wwwwwww..w
w.w.....w..w
w.w.ww..w..w
w...w...w..w
www.w.wwwwww
w...w....w.w
w.wwwwww...e
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
wp.........w
w.wwwwwww..w
w.w.......ww
w.w.wwwww..w
w...w......w
w.www.wwwwww
w........w.w
w.wwwwww...e
wwwwwwwwwwww`,

  map`
wwwwwwwwwwwwww
wp...........w
w.wwwwwwwww..w
w.w.......w..w
w.w.wwwww.w..w
w...w...w....w
www.w.w.wwww.w
w...w.w......w
w.www.wwwwwwww
w............e
wwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwww
wp...........w
w.wwwwwwwww..w
w.w.........ww
w.w.wwwwwww..w
w...w.....w..w
www.w.wwwww..w
w...w.........w
w.wwwwww.www..w
w............e
wwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwwwwwww..w
w.w.........wwww
w.w.wwwwwww.w..w
w...w.....w....w
www.w.wwwww.ww.w
w...w........w.w
w.wwwwwwwwww.w.w
w..............e
wwwwwwwwwwwwwwww`
]

setMap(levels[level])

// MOVEMENT
onInput("w", () => {
  const p = getFirst(player)
  if (!getTile(p.x, p.y - 1).some(t => t.type === wall)) {
    p.y--
  }
})

onInput("s", () => {
  const p = getFirst(player)
  if (!getTile(p.x, p.y + 1).some(t => t.type === wall)) {
    p.y++
  }
})

onInput("a", () => {
  const p = getFirst(player)
  if (!getTile(p.x - 1, p.y).some(t => t.type === wall)) {
    p.x--
  }
})

onInput("d", () => {
  const p = getFirst(player)
  if (!getTile(p.x + 1, p.y).some(t => t.type === wall)) {
    p.x++
  }
})

// CHECK EXIT
function checkExit() {
  const p = getFirst(player)
  const tiles = getTile(p.x, p.y)

  for (const tile of tiles) {
    if (tile.type === exit) {
      return true
    }
  }

  return false
}

// NEXT LEVEL
afterInput(() => {
  if (checkExit()) {
    level++

    if (level >= levels.length) {
      clearText()

      addText("YOU WIN!", {
        x: 5,
        y: 6
      })

      return
    }

    time = 25
    setMap(levels[level])
  }
})

// TIMER
setInterval(() => {

  if (level >= levels.length) return

  time--

  clearText()

  addText("TIME: " + time, {
    x: 1,
    y: 1
  })

  if (time <= 0) {

    clearText()

    addText("GAME OVER", {
      x: 5,
      y: 6
    })

    level = levels.length
  }

}, 1000)