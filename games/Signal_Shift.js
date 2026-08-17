/*
@title: Signal Shift
@author: Atharv Mantri
@description: Guide two linked agents through a neon vault. The white agent follows your movement while the echo moves in reverse, unless you spend limited charge to synchronize them. Collect every signal shard, avoid corruption spikes, and dock both agents at their matching exits.
@tags: ['puzzle', 'strategy', 'original', 'sci-fi']
@addedOn: 2026-07-16
*/

const player = "p"
const echo = "e"
const wall = "w"
const shard = "c"
const battery = "b"
const spike = "h"
const playerGoal = "g"
const echoGoal = "q"
const floor = "f"

setLegend(
  [player, bitmap`
................
......CCCC......
....CCFFFFCC....
...CFFFFFFFFC...
...CFF0FF0FFC...
...CFFFFFFFFC...
....CFFFFFFC....
.....CCCCCC.....
......CFFC......
....CCCCCCCC....
...CC..CC..CC...
...C...CC...C...
......CCCC......
.....CC..CC.....
....CC....CC....
................`],
  [echo, bitmap`
................
......3333......
....33222233....
...3222222223...
...3220320233...
...3222222223...
....32222223....
.....333333.....
......3223......
....33333333....
...33..33..33...
...3...33...3...
......3333......
.....33..33.....
....33....33....
................`],
  [shard, bitmap`
................
.......C........
......CCC.......
.....CCFCC......
....CCFFFCC.....
...CCFFFFFCC....
..CCFFFFFFFCC...
.CCFFFFFFFFFCC..
..CCFFFFFFFCC...
...CCFFFFFCC....
....CCFFFCC.....
.....CCFCC......
......CCC.......
.......C........
................
................`],
  [battery, bitmap`
................
......4444......
......4FF4......
....44444444....
...44FFFFFF44...
...4FFFFFFFF4...
...4FFF44FFF4...
...4FF4444FF4...
...4FF4444FF4...
...4FFF44FFF4...
...4FFFFFFFF4...
...44FFFFFF44...
....44444444....
................
................
................`],
  [spike, bitmap`
................
................
.......2........
......222.......
.....22222......
....22.2.22.....
...22..2..22....
..22...2...22...
.22....2....22..
2222222222222222
2222222222222222
2200220022002200
2200220022002200
................
................
................`],
  [playerGoal, bitmap`
....CCCCCCCC....
..CCC......CCC..
.CC..........CC.
CC....CCCC....CC
C...CC....CC...C
C..CC......CC..C
C..C........C..C
C..C........C..C
C..C........C..C
C..C........C..C
C..CC......CC..C
C...CC....CC...C
CC....CCCC....CC
.CC..........CC.
..CCC......CCC..
....CCCCCCCC....`],
  [echoGoal, bitmap`
....33333333....
..333......333..
.33..........33.
33....3333....33
3...33....33...3
3..33......33..3
3..3........3..3
3..3........3..3
3..3........3..3
3..3........3..3
3..33......33..3
3...33....33...3
33....3333....33
.33..........33.
..333......333..
....33333333....`],
  [wall, bitmap`
1111111111111111
1000000010000001
1000000010000001
1000000010000001
1111111111111111
1000100000001001
1000100000001001
1000100000001001
1111111111111111
1000001001000001
1000001001000001
1000001001000001
1111111111111111
1001000000100001
1001000000100001
1111111111111111`],
  [floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1110111111101111
1111111111111111
1111111111111111
1111110111111111
1111111111111111
1111111111111111
1111111111011111
1111111111111111
1110111111111111
1111111111111111
1111111111111111
1111111011111111
1111111111111111`]
)

setBackground(floor)
setSolids([])

const stepSfx = tune`
60: C4-60,
1860`
const toggleSfx = tune`
100: C4~100,
100: G4~100,
3000`
const shardSfx = tune`
80: E4~80,
80: G4~80,
80: B4~80,
2320`
const batterySfx = tune`
90: C4~90,
90: E4~90,
90: G4~90,
90: C5~90,
2520`
const failSfx = tune`
140: E4-140,
140: D4-140,
140: C4-140,
4060`
const levelSfx = tune`
100: C4~100,
100: E4~100,
100: G4~100,
100: C5~100,
2800`
const winSfx = tune`
120: C4~120,
120: E4~120,
120: G4~120,
120: C5~120,
120: G4~120,
120: C5~120,
3120`

const menuMap = map`
wwwwwwwwww
w........w
w.p..c..ew
w........w
w...gq...w
w..c..c..w
w........w
wwwwwwwwww`

const levels = [
  map`
wwwwwwwwww
w........w
w........w
w.pcgq.e.w
w........w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
w.p.cg...w
w.e..q...w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
ww..q....w
w.c......w
ww.....w.w
w......c.w
w..pgww..w
w...w.we.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w..w...w.w
w..ww...ww
w.e...w..w
w...wpw..w
w....bcw.w
w..g...cqw
wwwwwwwwww`,
  map`
wwwwwwwwww
w..cw..e.w
w.....wchw
wh......ww
w..ghw...w
wc.ww.w.pw
w....w..qw
wwwwwwwwww`,
  map`
wwwwwwwwww
w.w.w..c.w
wcbg.w.hww
w.c..p..ww
w...q....w
wh..ww.wew
w.w....hww
wwwwwwwwww`,
  map`
wwwwwwwwww
w...w..h.w
wc.c.....w
wpgwweh..w
w..qhw.w.w
w..whhw.bw
www...wcww
wwwwwwwwww`,
  map`
wwwwwwwwww
w......whw
w.hcw.wb.w
ww.w.p..cw
whw...hwww
wq.e.cw.ww
wbchwg.w.w
wwwwwwwwww`
]

const startingCharge = [0, 3, 2, 1, 2, 1, 2, 1]
const levelNames = [
  "MIRROR BOOT",
  "SYNC TEST",
  "SPLIT ROUTE",
  "POWER TAP",
  "RED STATIC",
  "CHARGE LOCK",
  "DEEP LINK",
  "FIREWALL"
]
const hints = [
  ["Move right twice.", "Echo goes opposite."],
  ["Press J for SYNC.", "SYNC spends charge."],
  ["Blocked twins can", "move separately."],
  ["Touch yellow cells", "for +2 charge."],
  ["Red static resets", "the whole link."],
  ["Collect all cyan", "before docking."],
  ["Walls are tools.", "Use both modes."],
  ["Final vault: plan", "every sync move."]
]

let gameState = "menu"
let levelIndex = 0
let mode = "mirror"
let charge = 0
let levelMoves = 0
let totalMoves = 0
let totalRestarts = 0
let hintVisible = false

function showMenu() {
  gameState = "menu"
  mode = "mirror"
  setMap(menuMap)
  clearText()
  addText("TWIN//SHIFT", { x: 4, y: 2, color: color`C` })
  addText("ONE INPUT. TWO", { x: 3, y: 5, color: color`F` })
  addText("DIRECTIONS.", { x: 5, y: 7, color: color`3` })
  addText("I: START", { x: 6, y: 11, color: color`4` })
  addText("WASD MOVE  J LINK", { x: 1, y: 13, color: color`F` })
}

function loadLevel(index) {
  levelIndex = index
  gameState = "playing"
  mode = "mirror"
  charge = startingCharge[levelIndex]
  levelMoves = 0
  hintVisible = levelIndex < 2
  setMap(levels[levelIndex])
  showHud()
}

function showHud() {
  clearText()
  const shortMode = mode === "mirror" ? "MIR" : "SYN"
  const remaining = getAll(shard).length
  addText(`L${levelIndex + 1} ${shortMode} C${charge} S${remaining}`, {
    x: 1,
    y: 0,
    color: mode === "mirror" ? color`C` : color`3`
  })
  if (hintVisible) {
    addText(hints[levelIndex][0], { x: 1, y: 12, color: color`4` })
    addText(hints[levelIndex][1], { x: 1, y: 14, color: color`F` })
  }
}

function isWallAt(x, y) {
  if (x < 0 || y < 0 || x >= width() || y >= height()) return true
  return getTile(x, y).some(sprite => sprite.type === wall)
}

function tryMove(sprite, dx, dy) {
  const targetX = sprite.x + dx
  const targetY = sprite.y + dy
  if (!isWallAt(targetX, targetY)) {
    return { x: targetX, y: targetY }
  }
  return { x: sprite.x, y: sprite.y }
}

function moveTwins(dx, dy) {
  if (gameState !== "playing") return

  const p = getFirst(player)
  const e = getFirst(echo)
  if (!p || !e) return

  const echoDx = mode === "sync" ? dx : -dx
  const echoDy = mode === "sync" ? dy : -dy
  const nextP = tryMove(p, dx, dy)
  const nextE = tryMove(e, echoDx, echoDy)

  p.x = nextP.x
  p.y = nextP.y
  e.x = nextE.x
  e.y = nextE.y

  if (mode === "sync") {
    charge -= 1
    if (charge <= 0) {
      charge = 0
      mode = "mirror"
    }
  }

  levelMoves += 1
  totalMoves += 1
  playTune(stepSfx)
  resolveTurn()
}

function collectType(type, sound, chargeGain) {
  let collected = 0
  const p = getFirst(player)
  const e = getFirst(echo)
  getAll(type).forEach(item => {
    const touchedByPlayer = p && item.x === p.x && item.y === p.y
    const touchedByEcho = e && item.x === e.x && item.y === e.y
    if (touchedByPlayer || touchedByEcho) {
      item.remove()
      collected += 1
    }
  })

  if (collected > 0) {
    if (chargeGain > 0) charge += chargeGain * collected
    playTune(sound)
  }
}

function actorOn(type, actorType) {
  const actor = getFirst(actorType)
  if (!actor) return false
  return getTile(actor.x, actor.y).some(sprite => sprite.type === type)
}

function resolveTurn() {
  collectType(shard, shardSfx, 0)
  collectType(battery, batterySfx, 2)

  if (actorOn(spike, player) || actorOn(spike, echo)) {
    failLevel()
    return
  }

  const playerDocked = actorOn(playerGoal, player)
  const echoDocked = actorOn(echoGoal, echo)
  if (getAll(shard).length === 0 && playerDocked && echoDocked) {
    completeLevel()
    return
  }

  showHud()
}

function toggleMode() {
  if (gameState !== "playing") return
  if (mode === "mirror") {
    if (charge <= 0) {
      clearText()
      addText("NO SYNC CHARGE", { x: 3, y: 7, color: color`2` })
      addText("FIND A BATTERY", { x: 3, y: 9, color: color`4` })
      return
    }
    mode = "sync"
  } else {
    mode = "mirror"
  }
  playTune(toggleSfx)
  showHud()
}

function failLevel() {
  gameState = "dead"
  playTune(failSfx)
  clearText()
  addText("SIGNAL LOST", { x: 4, y: 5, color: color`2` })
  addText("I: RETRY", { x: 6, y: 8, color: color`F` })
  addText("K: RETRY", { x: 6, y: 10, color: color`4` })
}

function completeLevel() {
  gameState = "complete"
  playTune(levelSfx)
  clearText()
  addText("LINK STABLE", { x: 4, y: 4, color: color`5` })
  addText(levelNames[levelIndex], { x: 2, y: 7, color: color`C` })
  addText(`${levelMoves} MOVES`, { x: 6, y: 9, color: color`F` })
  addText("I: CONTINUE", { x: 5, y: 12, color: color`4` })
}

function showWin() {
  gameState = "won"
  playTune(winSfx)
  setMap(menuMap)
  clearText()
  addText("VAULT OPEN", { x: 5, y: 3, color: color`5` })
  addText("BOTH AGENTS FREE", { x: 2, y: 6, color: color`C` })
  addText(`${totalMoves} TOTAL MOVES`, { x: 2, y: 9, color: color`F` })
  addText(`${totalRestarts} RESTARTS`, { x: 4, y: 11, color: color`3` })
  addText("I: PLAY AGAIN", { x: 4, y: 14, color: color`4` })
}

function restartLevel() {
  if (gameState === "menu" || gameState === "won") return
  totalRestarts += 1
  loadLevel(levelIndex)
}

onInput("w", () => moveTwins(0, -1))
onInput("a", () => moveTwins(-1, 0))
onInput("s", () => moveTwins(0, 1))
onInput("d", () => moveTwins(1, 0))

onInput("j", () => {
  if (gameState === "menu") {
    loadLevel(0)
  } else {
    toggleMode()
  }
})

onInput("k", () => restartLevel())

onInput("l", () => {
  if (gameState !== "menu") showMenu()
})

onInput("i", () => {
  if (gameState === "menu") {
    totalMoves = 0
    totalRestarts = 0
    loadLevel(0)
  } else if (gameState === "dead") {
    restartLevel()
  } else if (gameState === "complete") {
    if (levelIndex + 1 < levels.length) {
      loadLevel(levelIndex + 1)
    } else {
      showWin()
    }
  } else if (gameState === "won") {
    totalMoves = 0
    totalRestarts = 0
    loadLevel(0)
  } else if (gameState === "playing") {
    hintVisible = !hintVisible
    showHud()
  }
})

showMenu()
