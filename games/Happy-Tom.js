/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Happy Tom
@author: Jake Schuler
@tags: [infinite, rocks, happy, tom]
@addedOn: 2025-05-04
*/

const player = "p"
const hazard = "h"

let hasStarted = false

setLegend(
  [player, bitmap`
................
................
.....666666.....
...6666666666...
...6666666666...
..666606606666..
..666606606666..
..666606606666..
.06666666666660.
0.660666666066.0
..660666666066..
...6000000006...
...6666666666...
.....666666.....
.....0....0.....
....00....00....`],
  [hazard, bitmap`
....11111111....
...1111111111...
..1111L1111111..
.11111111111111.
1111111111L11111
1111111111111111
111L111L111111L1
1111111111111111
1111111111111111
1L1111111L111111
1111111111111111
11111L1111111111
.11111111111L11.
..111111111111..
...1111111111...
....111L1111....`]
)

setSolids([])

let startscreen = 1
let level = 0
const levels = [
  map`
......
......
......
......
......
......
......
....p.`,
  map`.`
]

// start screen
setMap(levels[startscreen])

addText("Happy Tom", { x: 5, y: 4 })
addText("Press 'K' to", { x: 4, y: 6 })
addText("Start", { x: 8, y: 7 })

setPushables({
  [player]: []
})

// start logic
onInput("k", () => {
  if (hasStarted == false) {
    clearText()
    setMap(levels[level])
    hasStarted = true
  }
})

// movement
onInput("a", () => {
  if (getFirst(player)) {
    getFirst(player).x -= 1
  }
})

onInput("d", () => {
  if (getFirst(player)) {
    getFirst(player).x += 1
  }
})

// game logic
afterInput(() => {
  getAll(hazard).forEach((h) => {
    h.y += 1
    if (h.y == 7 && getFirst(player).x == h.x) {
      setMap(levels[startscreen])

      addText("Happy Tom", { x: 5, y: 4 })
      addText("Press 'K' to", { x: 4, y: 6 })
      addText("Start", { x: 8, y: 7 })
      hasStarted = false
    }
    if (h.y == 7) {
      clearTile(h.x, h.y)
    }
  })
  if (getFirst(player)) {
    addSprite(getRandomInt(0, 6), 0, hazard)
  }
})

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}