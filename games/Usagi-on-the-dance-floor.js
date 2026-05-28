/*
@title: smokedsalmon
@description: memorize the patterns
@author:
@tags: ['memory', 'pattern']
@addedOn: 2026-05-10
*/

const player1 = "p"
const player2 = "q"
let pose = 0

const up = "u"
const right = "r"
const down = "d"
const left = "l"
const flash = "f"

const soundUp = tune`
100: C5~100,
100`

const soundRight = tune`
100: E5~100,
100`

const soundDown = tune`
100: G5~100,
100`

const soundLeft = tune`
100: A5~100,
100`

setLegend(
  [ player1, bitmap`
.....00000......
.....06060......
.....08080......
....000000......
..0006600600....
.060666660660...
.066066066660...
.088606886660...
.006686666000...
.0006666600660..
.0666666666660..
.000666666600...
...066666660....
...000666660....
.....0660060....
......00.00.....`],

  [ player2, bitmap`
.......000......
......06060.....
......08080.....
....00000000....
...006006060....
..06606666060...
..06666060660...
..06668606860...
..06666686660...
...0066666600...
..066066666660..
..06066666600...
...066666660....
....0660600.....
.....00.00......
................`],

  [ up, bitmap`
................
................
................
.......77.......
......7777......
.....777777.....
....77777777....
.......77.......
.......77.......
.......77.......
................
................
................
................
................
................`],

  [ right, bitmap`
................
................
................
................
........66......
.........66.....
....66666666....
....66666666....
.........66.....
........66......
................
................
................
................
................
................`],

  [ down, bitmap`
................
................
................
................
................
................
.......88.......
.......88.......
.......88.......
....88888888....
.....888888.....
......8888......
.......88.......
................
................
................`],

  [ left, bitmap`
................
................
................
................
......44........
.....44.........
....44444444....
....44444444....
.....44.........
......44........
................
................
................
................
................
................`],

  [ flash, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
)

setSolids([])

const levelMap = map`
.u.
lpr
.d.`

setMap(levelMap)

setPushables({
  [ player1 ]: [],
  [ player2 ]: []
})

const spots = {
  u: [1, 0],
  r: [2, 1],
  d: [1, 2],
  l: [0, 1]
}

const keys = {
  u: up,
  r: right,
  d: down,
  l: left
}

const patterns = [
  ["u", "r", "d"],
  ["l", "u", "r", "d"],
  ["d", "l", "u", "r", "u"],
  ["r", "d", "l", "u", "r", "l"],
  ["u", "d", "l", "r", "u", "r", "d"]
]

let level = 0
let inputSpot = 0
let showing = true
let currentPattern = []

function getPattern() {
  if (!patterns[level]) {
    const lastPattern = patterns[patterns.length - 1]
    const choices = ["u", "r", "d", "l"]
    const nextKey = choices[Math.floor(Math.random() * choices.length)]

    patterns[level] = lastPattern.concat([nextKey])
  }

  return patterns[level]
}

function drawKeys() {
  clearTile(0, 0)
  clearTile(1, 0)
  clearTile(2, 0)
  clearTile(0, 1)
  clearTile(1, 1)
  clearTile(2, 1)
  clearTile(0, 2)
  clearTile(1, 2)
  clearTile(2, 2)

  for (const k in spots) {
    const x = spots[k][0]
    const y = spots[k][1]
    addSprite(x, y, keys[k])
  }

  if (pose === 0) {
    addSprite(1, 1, player1)
  } else {
    addSprite(1, 1, player2)
  }
}

function lightKey(k) {
  const x = spots[k][0]
  const y = spots[k][1]
  clearTile(x, y)
  addSprite(x, y, flash)
}

function showPattern() {
  showing = true
  inputSpot = 0
  clearText()
  drawKeys()

  currentPattern = getPattern()
  const pattern = currentPattern

  if (level < 5) {
    addText("Level " + (level + 1), { x: 5, y: 1 })
  } else {
    addText("Infinite " + (level - 4), { x: 4, y: 1 })
  }

  addText("Memorize!", { x: 4, y: 14 })

  let i = 0

  const loop = () => {
    drawKeys()

    if (i >= pattern.length) {
      clearText()
      addText("Your turn!", { x: 5, y: 1 })
      showing = false
      return
    }

    lightKey(pattern[i])
    i++
    setTimeout(loop, 700)
  }

  setTimeout(loop, 700)
}

function press(k) {
  if (showing) return

  if (k === "u") playTune(soundUp)
  if (k === "r") playTune(soundRight)
  if (k === "d") playTune(soundDown)
  if (k === "l") playTune(soundLeft)

  const pattern = currentPattern

  pose = 1 - pose
  lightKey(k)
  setTimeout(drawKeys, 200)

  if (k === pattern[inputSpot]) {
    inputSpot++

    if (inputSpot === pattern.length) {
      level++

      if (level === 5) {
        clearText()
        drawKeys()
        addText("THE END", { x: 6, y: 6 })
        addText("Infinite mode!", { x: 3, y: 8 })
        setTimeout(showPattern, 2000)
      } else {
        clearText()
        addText("Nice!", { x: 7, y: 7 })
        setTimeout(showPattern, 1000)
      }
    }
  } else {
    clearText()
    drawKeys()
    addText("Wrong!", { x: 7, y: 6 })
    addText("Try again", { x: 5, y: 8 })
    setTimeout(showPattern, 1000)
  }
}

onInput("w", () => press("u"))
onInput("d", () => press("r"))
onInput("s", () => press("d"))
onInput("a", () => press("l"))

drawKeys()
showPattern()

afterInput(() => {})
