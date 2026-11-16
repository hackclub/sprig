/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Egg Saves
@description: A five-level puzzle adventure where Egg must collect tools, defuse bombs, push rocks, and help his turtle friend Bro reach home.
@author: Khaja Yousuf Uddin
@tags: ['puzzle', 'adventure', 'strategy']
@addedOn: 2026-11-03
*/

const player = "p"
const bro = "b"
const background = "g"
const wall = "w"
const rock = "r"
const house = "h"
const bomb = "m"
const tool = "t"
let level = 0

const levels = [

    map`
w...hwwwww
t.w.w...w.
w.w.w.b.m.
....w...r.
..w..www..
..w.......
p.........`,

    map`
....w..wt.
....r..r..
....w.w...
mwww..w.b.
..tw..w...
...w..wwwr
h..wp.....`,

  map`
..........
.....wrw..
.........t
.....wrwww
.....w....
wwww..wwb.
h..mp.....`,

  map`
h....w.t..
.....wwww.
.m........
mbm.p.....
.m..www...
wwwmwt....
t...w.....`,

  map`
p....w....
wwww.w.r..
.tw..wt.r.
..w..wwwwr
.rw.......
w...w.w...
...tw..wwm
h......mbm`
]

const backgroundTune = tune`
200: G4~200 + A4~200 + B4~200 + C4^200 + G5-200,
200: B4~200 + C5~200 + C4^200 + G5-200,
200: C5~200 + D5~200 + G5-200,
200: D5~200 + C5~200 + B4~200 + A4~200 + G4~200,
200: G4~200 + F4~200 + E4/200 + G5-200 + D4/200,
200: E4~200 + A4^200 + C4^200 + G5-200,
200: E4~200 + F4~200 + G4~200 + A4~200 + B4~200,
200: D5~200 + C4^200 + G5-200,
200: D5~200 + C5~200 + B4~200 + A4~200 + G4~200,
200: F4~200 + E4~200 + G5-200,
200: E4~200 + C4^200 + G5-200,
200: E4~200 + F4~200 + C4^200 + A4/200,
200: F4~200 + C4^200 + A4/200,
200: F4~200 + G4~200 + B4~200 + C5~200 + D5~200,
200: G4~200 + A4~200 + B4~200 + E5~200 + F5~200,
200: F5~200 + C4^200 + F4-200,
200: F5~200 + G5/200,
200: F5~200 + F4-200 + G5/200,
200: A4~200 + B4~200 + C5~200 + D5~200 + E5~200,
200: F5~200 + E5~200 + D5~200 + C5~200 + B4~200,
200: F4~200 + C4^200,
200: F4~200 + G4~200 + C4^200 + G5~200 + F5~200,
200: G4~200 + C4^200 + F5~200 + E5~200,
200: G4~200 + A4~200 + E5~200 + D5~200 + C5~200,
200: A4~200 + B4~200 + C5~200,
200: C5~200 + B4^200 + A4^200 + G4^200 + F4^200,
200: C5~200 + D5~200 + E5~200 + C4^200 + E4-200,
200: E5~200 + C4^200 + E4-200 + G5/200,
200: E5~200 + D5~200 + C5~200 + B4~200 + G5/200,
200: B4~200 + A4~200 + G5/200,
200: A4~200 + G4~200 + F4~200 + C4^200 + E4-200,
200: F4~200 + E4~200`

const call = tune`
120,
120: B4~120,
120: G4/120 + F4/120 + E4/120 + D4/120 + A4^120,
120: C4-120 + B4~120,
120: F4^120,
3240`

setLegend(
  [ player, bitmap`
........0.......
.......0L0......
......0LLL0.....
......00000000..
......00200.....
.....0022200....
....002323200...
..0002232322000.
..0.022222220.0.
..0.022222320.0.
....023333320...
....002222200...
.....0000000....
.......0.0......
.......0.0......
......00.00.....` ],

  [ bro, bitmap`
................
................
................
................
................
................
................
......DD........
.....DDDD.44....
....DDDDDD404...
....DDDDDD444...
...4DDDDDD44....
....444444......
....44..44......
................
................`],

  [ background, bitmap`
0000000000000000
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
0000000000000000
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
0000000000000000
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
0000000000000000
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0
LLL0LLL0LLL0LLL0`],

  [ rock, bitmap`
................
................
....0000000.....
...001111100....
...0111L11L00...
..001LLL11L10...
..01111L11L100..
..01L1LL111110..
..011111L11110..
..00LL11111L10..
...01L11L11110..
...00111LL1100..
....000111100...
.....00000000...
................
................`],

  [ tool, bitmap`
................
................
................
.........11.....
.........1......
........LL..1...
........1LL1L...
........L.......
.......11.......
.......L........
......1L........
...LLL1.........
...L..1.........
......L.........
.....1L.........
................`],

  [ house, bitmap`
................
.......00.......
......0330......
.....033L30.....
....03333330....
...03L333L330...
..033LL33L3330..
.03333LL333L330.
0000000000000000
..011111111110..
..011111110110..
..010001107010..
..010C01110110..
..010C01111110..
..000000000000..
................`],

  [ bomb, bitmap`
.00000000000000.
0333333333333330
0333333333333330
0333333333333330
0000000000000000
0222222222222220
0200020220200020
0220220020220220
0220220200220220
0220220220220220
0222222222222220
0000000000000000
0333333333333330
0333333333333330
0333333333333330
.00000000000000.`],

  [ wall, bitmap`
CCCCCCCCCCCCCCCC
99999999999C9999
99999999999C9999
99999999999C9999
99999999999C9999
CCCCCCCCCCCCCCCC
9999C99999999999
9999C99999999999
9999C99999999999
9999C99999999999
CCCCCCCCCCCCCCCC
99999999999999C9
99999999999999C9
99999999999999C9
99999999999999C9
CCCCCCCCCCCCCCCC`]
)

setSolids([player, wall, rock, bro, bomb])
setMap(levels[level])

setPushables({
  [ player ]: [rock, bro]
})

let toolsCollected = 0
let bombMessage = ""
let levelComplete = false
let endingMessage = ""
let waitingMessage = ""
let crushMessage = ""
let gameComplete = false

let previousBroCoordinates = { "x": getFirst(bro).x, "y": getFirst(bro).y }

function movePlayer(dx, dy) {
  if (levelComplete || gameComplete) return

  let p = getFirst(player)
  let nextTile = getTile(p.x + dx, p.y + dy)
  let targetBomb = nextTile.find(sprite => sprite.type == bomb)

  if (targetBomb) {
    if (toolsCollected < 1) {
      bombMessage = "Need 1 tool!"
      return
    }

    targetBomb.remove()
    toolsCollected--
    bombMessage = "Bomb defused!"
  }

  p.x += dx
  p.y += dy
}

function nextLevel() {
  if (!levelComplete) return

  if (level < levels.length - 1) {
    level++
    setMap(levels[level])

    toolsCollected = 0
    bombMessage = ""
    endingMessage = ""
    waitingMessage = ""
    levelComplete = false

    previousBroCoordinates = {
      x: getFirst(bro).x,
      y: getFirst(bro).y
    }
  } else {
    gameComplete = true
  }
}

onInput("k", nextLevel)
onInput("s", () => movePlayer(0, 1))
onInput("w", () => movePlayer(0, -1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
onInput("j", () => {
  setMap(levels[level])
  toolsCollected = 0
  bombMessage = ""
  endingMessage = ""
  waitingMessage = ""
  crushMessage = ""
  levelComplete = false
  gameComplete = false
  previousBroCoordinates = { "x": getFirst(bro).x, "y": getFirst(bro).y }
})

let music = 1
let backgroundPlayback = playTune(backgroundTune, Infinity)
addText("Press J to reset", {x:2, y:7, color:color`0`})

onInput("i", () => {
  if (music == 1) {
    backgroundPlayback.end()
    music = 0
  } else {
    backgroundPlayback = playTune(backgroundTune, Infinity)
    music = 1
  }
})

afterInput(() => {
  clearText()

  if (tilesWith(rock, house).length > 0) {
    level = 0
    setMap(levels[level])

    toolsCollected = 0
    bombMessage = ""
    endingMessage = ""
    waitingMessage = ""
    levelComplete = false
    gameComplete = false
    crushMessage = "Home Crushed!"
    previousBroCoordinates = { "x": getFirst(bro).x, "y": getFirst(bro).y }
  }

  if (gameComplete) {
    addText("Game Complete!", {x:1, y:7, color:color`0`})
    return
  }

  tilesWith(rock, tool).forEach(([r, t]) => {
    t.remove()
    addText("Tool crushed!", {x:3, y:7, color:color`5`})
  })

  let collectedTools = tilesWith(player, tool)

  collectedTools.forEach(([p, t]) => {
    t.remove()
    toolsCollected++
  })

  if (bombMessage != "") {
    addText(bombMessage, {x:3, y:7, color:color`5`})
    bombMessage = ""
  }

  addText("LEVEL " + (level + 1) + "/" + levels.length, { x:1, y:0, color:color`5` })
  addText("Tools: " + toolsCollected, { x:1, y:1, color:color`5` })

  if (!levelComplete) {
    let playerHome = tilesWith(player, house).length > 0
    let broHome = tilesWith(bro, house).length > 0

    waitingMessage = ""

    if (broHome &&  toolsCollected > 0) {
      endingMessage ="Prepared!"
      levelComplete = true

    } else if (playerHome && !broHome && toolsCollected > 0) {
      endingMessage = "Survivor"
      levelComplete = true

    } else if (playerHome && !broHome) {
      waitingMessage = "Wait for Bro!"

    } else if (broHome) {
      endingMessage = "Together Again"
      levelComplete = true
    }
  }

  if (crushMessage != "") {
    addText(crushMessage, {x:1, y:7, color:color`5`})
    crushMessage = ""
  } else if (waitingMessage != "") {
    addText(waitingMessage, {x:1, y:7, color:color`5`})
  }

  if (levelComplete) {
    addText(endingMessage, {x:1, y:7, color:color`0`})
    addText("Press K", {x:1, y:6, color:color`5`})
  }

  let currentBroCoordinates = {
    "x": getFirst(bro).x,
    "y": getFirst(bro).y
  }

  if ( currentBroCoordinates.x != previousBroCoordinates.x ||
    currentBroCoordinates.y != previousBroCoordinates.y ) {
      playTune(call, 1)
  }

  previousBroCoordinates = currentBroCoordinates
})