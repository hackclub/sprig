  /*
    @title: Backyard GP
    @author: Karthik
    @description: Inspired by the Nitro Racing game on keypad Nokia Phones.
    @tags: ['racing', 'retro 2d game']
    @addedOn: 2026-11-13
    */
const redCar = "p"
const blueCar = "e"
const tarmac = "r"
const dirt = "g"
const laneMark = "s"

setLegend(
  [redCar, bitmap`......00........
.....0330.......
....033330......
...03333330.....
...00000000.....
...01111110.....
...01166110.....
...01166110.....
...03333330.....
...03333330.....
...03333330.....
...03333330.....
...00000000.....
...00....00.....
...00....00.....
................`],
  [blueCar, bitmap`................
...00....00.....
...00....00.....
...00000000.....
...05555550.....
...05555550.....
...05555550.....
...05555550.....
...01155110.....
...01155110.....
...00000000.....
...05555550.....
....055550......
.....0550.......
......00........
................`],
  [laneMark, bitmap`.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......`],
  [tarmac, bitmap`LLLLLLLLLLLLLLLL
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
LLLLLLLLLLLLLLLL`],
  [dirt, bitmap`CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)

const track = map`ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg
ggrrrrrrgg`

const shift = tune`100: C4-100,
100: E4-100`
const startSound = tune`100: C4-100,
100: E4-100,
100: G4-100`
const pointSound = tune`80: G4-80,
80: C5-80`
const crashSound = tune`
150: undefined-150,
150: undefined-150,
150: undefined-150,
2250,
150: D4~150 + C4~150,
1950`

let mode = 0
let passedCars = 0
let bestRun = 0
let stripeStep = 0
let redX = 5
let fullThrottle = false

setMap(track)
addText("BACKYARD GP", { x: 4, y: 1, color: color`3` })
addText("DODGE FOR POINTS", { x: 3, y: 3, color: color`2` })
addText("A D STEER", { x: 5, y: 5, color: color`2` })
addText("W START", { x: 6, y: 7, color: color`4` })
addText("Made with love", { x: 3, y: 10, color: color`2` })
addText("for cars by Karthik", { x: 0, y: 11, color: color`2` })
addText("Thanks Hack", { x: 4, y: 13, color: color`4` })
addText("Club!!!!!", { x: 5, y: 14, color: color`4` })

function newRace() {
  mode = 1
  passedCars = 0
  stripeStep = 0
  redX = 5
  fullThrottle = false
  setMap(track)
  addSprite(5, 6, redCar)
  clearText()
  addText("POINTS 0", { x: 1, y: 0, color: color`2` })
  addText("S SLOW W FAST", { x: 2, y: 14, color: color`2` })
  playTune(startSound)
}

function crashed() {
  mode = 2
  if (passedCars > bestRun) bestRun = passedCars
  clearText()
  addText("CRASH!", { x: 7, y: 3, color: color`3` })
  playTune(crashSound)
  addText("PASSED " + passedCars, { x: 5, y: 6, color: color`2` })
  addText("BEST " + bestRun, { x: 6, y: 8, color: color`4` })
  addText("W RETRY", { x: 6, y: 12, color: color`2` })
}

onInput("w", () => {
  if (mode === 0 || mode === 2) {
    newRace()
  } else {
    fullThrottle = true
    playTune(shift)
  }
})

onInput("s", () => {
  if (mode === 1) fullThrottle = false
})

onInput("a", () => {
  if (mode === 1 && redX > 3) {
    redX -= 2
    getFirst(redCar).x = redX
    playTune(shift)
    for (let other of getAll(blueCar)) {
      if (other.x === redX && other.y === 6) crashed()
    }
  }
})

onInput("d", () => {
  if (mode === 1 && redX < 7) {
    redX += 2
    getFirst(redCar).x = redX
    playTune(shift)
    for (let other of getAll(blueCar)) {
      if (other.x === redX && other.y === 6) crashed()
    }
  }
})

setInterval(() => {
  if (mode !== 1) return
  stripeStep++
  // lil road scroll thing
  for (let line of getAll(laneMark)) line.remove()
  for (let row = stripeStep % 3; row < 8; row += 3) {
    addSprite(4, row, laneMark)
    addSprite(6, row, laneMark)
  }

  // fast mode skips the wait
  if (fullThrottle || stripeStep % 3 === 0) {
    for (let other of getAll(blueCar)) {
      if (other.y === 7) {
        other.remove()
        passedCars++
        playTune(pointSound)
      } else {
        other.y++
      }
    }
    // traffic rng lol
    if (stripeStep % 6 === 0) {
      addSprite(3 + Math.floor(Math.random() * 3) * 2, 0, blueCar)
    }
    // same tile = rip
    for (let other of getAll(blueCar)) {
      if (other.y === 6 && other.x === redX) crashed()
    }
    if (mode === 1) {
      clearText()
      addText("POINTS " + passedCars, { x: 1, y: 0, color: color`2` })
      if (fullThrottle) addText("FAST", { x: 8, y: 14, color: color`3` })
      else addText("S SLOW W FAST", { x: 2, y: 14, color: color`2` })
    }
  }
}, 220)
