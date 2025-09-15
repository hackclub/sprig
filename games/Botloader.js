/*
@title: Botloader
@author: Rainier-PS
@description: Botloader is a puzzle game where players control a robot with limited battery power. Push boxes onto all target spots before running out of energy. Collect extra batteries along the way to keep moving and complete each level.
@tags: ["puzzle", "logic", "strategy", "box-pushing", "sokoban", "battery", "robot", "sci-fi"]
@addedOn: 2025-08-17 
*/

const robot = "r"
const wall = "w"
const box = "b"
const target = "t"
const battery = "p"
const floor = "f"

setLegend(
  [ robot, bitmap`
.....6....6.....
.....6....6.....
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LL22LL22LL...
...LL62LL62LL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LL622226LL...
...LLL6666LLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
................` ],
  [ wall, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000` ],
  [ box, bitmap`
................
.CCCCCCCCCCCCCC.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.C666666666666C.
.CCCCCCCCCCCCCC.
................` ],
  [ target, bitmap`
................
.66666666666666.
.6CCCCCCCCCCCC6.
.6C6666666666C6.
.6C6........6C6.
.6C6.C....C.6C6.
.6C6..C..C..6C6.
.6C6...CC...6C6.
.6C6...CC...6C6.
.6C6..C..C..6C6.
.6C6.C....C.6C6.
.6C6........6C6.
.6C6666666666C6.
.6CCCCCCCCCCCC6.
.66666666666666.
................` ],
  [ battery, bitmap`
................
................
......444.......
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
................` ],
  [ floor, bitmap`
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
1111111111111111` ]
)

setBackground(floor)

let currentLevel = 0
let batteryCount = 0
let gameWon = false
let gameStarted = false

const levels = [
  map`
wwwwwwwwww
w........w
w..r.....w
w........w
w..b.....w
w........w
w..t.....w
w........w
wppppppw.w
wwwwwwwwww`,
  
  map`
wwwwwwwwww
w........w
w.r......w
w........w
w..b..t..w
w........w
w........w
wppppppppw
w........w
wwwwwwwwww`,
  
  map`
wwwwwwwwww
w........w
w.r......w
w.b......w
w.b..tt..w
w........w
w........w
wppppppppp
wppppppppp
wwwwwwwwww`,
  
  map`
wwwwwwwwww
w........w
w.rwwww..w
w.b....t.w
w.wwwww..w
w........w
w........w
wppppppppw
wppppppppp
wwwwwwwwww`
]

setSolids([robot, wall, box])
setPushables({
  [robot]: [box]
})

const moveSound = tune`
60: C4^60,
1800`

const collectSound = tune`
60: G4^60,
60: A4^60,
1740`

const winSound = tune`
150: C4^150,
150: E4^150,
150: G4^150,
150: C5^150,
450`

const failSound = tune`
150: C4^150,
150: A3^150,
150: F3^150,
450`

function initLevel() {
  clearText()
  setMap(levels[currentLevel])
  batteryCount = getAll(battery).length
  gameWon = false
  gameStarted = true
  updateUI()
}

function showWelcomeScreen() {
  clearText()
  setMap(map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
w...........w
w...........w
w...........w
w...........w
w...........w
wwwwwwwwwwwww`)
  
  addText("BOTLOADER", { x: 5, y: 3, color: color`6` })
  addText("Box Pusher", { x: 5, y: 4, color: color`0` })
  
  addText("HOW TO PLAY:", { x: 5, y: 6, color: color`3` })
  addText("WASD: move", { x: 2, y: 7, color: color`0` })
  addText("K: restart level", { x: 2, y: 8, color: color`0` })
  addText("J: restart all", { x: 2, y: 9, color: color`0` })
  addText("Push boxes to X", { x: 2, y: 10, color: color`0` })
  addText("Step = Battery", { x: 2, y: 11, color: color`0` })
  
  addText("Press I to start", { x: 2, y: 13, color: color`4` })
  
  gameStarted = false
}

function showVictoryScreen() {
  clearText()
  setMap(map`
wwwwwwwwwwwww
w...........w
w...........w
w...........w
w...........w
w...........w
w...........w
w...........w
w...........w
wwwwwwwwwwwww`)
  
  addText("CONGRATULATIONS!", { x: 2, y: 3, color: color`4` })
  addText("MISSION COMPLETE", { x: 2, y: 4, color: color`6` })
  
  addText("Final Stats:", { x: 4, y: 6, color: color`3` })
  addText("Levels Completed: ", { x: 2, y: 7, color: color`0` })
  addText("4", { x: 10, y: 8, color: color`0` })
  addText("Bot Status: ", { x: 5, y: 9, color: color`3` })
  addText("CHARGED", { x: 7, y: 10, color: color`3` })
  
  addText("Press J to", { x: 5, y: 12, color: color`4` })
  addText("play again", { x: 5, y: 13, color: color`4` })
  
  gameStarted = false
}

function updateUI() {
  if (!gameStarted) return
  
  clearText()
  addText(`Level: ${currentLevel + 1}`, { x: 2, y: 0, color: color`2` })
  addText(`Battery: ${batteryCount}`, { x: 2, y: 1, color: color`2` })
  
  if (gameWon) {
    addText("Level Complete!", { x: 3, y: 4, color: color`4` })
    if (currentLevel < levels.length - 1) {
      addText("Press I for next", { x: 2, y: 5, color: color`0` })
    } else {
      showVictoryScreen()
      return
    }
  } else if (batteryCount === 0 && !checkWin()) {
    addText("Out of Battery", { x: 3, y: 4, color: color`3` })
    addText("Restart: K", { x: 5, y: 5, color: color`0` })
  }
}

function checkWin() {
  const boxes = getAll(box)
  const targets = getAll(target)
  
  if (boxes.length === 0) return false
  
  for (let boxSprite of boxes) {
    const tile = getTile(boxSprite.x, boxSprite.y)
    const hasTarget = tile.some(sprite => sprite.type === target)
    if (!hasTarget) return false
  }
  
  return true
}

function moveRobot(dx, dy) {
  if (!gameStarted || gameWon || batteryCount === 0) return
  
  const robotSprite = getFirst(robot)
  const newX = robotSprite.x + dx
  const newY = robotSprite.y + dy
  
  const targetTile = getTile(newX, newY)
  const hasWall = targetTile.some(sprite => sprite.type === wall)
  
  if (hasWall) return
  
  const hasBox = targetTile.some(sprite => sprite.type === box)
  if (hasBox) {
    const boxSprite = targetTile.find(sprite => sprite.type === box)
    const boxNewX = boxSprite.x + dx
    const boxNewY = boxSprite.y + dy
    
    const boxTargetTile = getTile(boxNewX, boxNewY)
    const boxHasWall = boxTargetTile.some(sprite => sprite.type === wall)
    const boxHasBox = boxTargetTile.some(sprite => sprite.type === box)
    
    if (boxHasWall || boxHasBox) return
    
    boxSprite.x = boxNewX
    boxSprite.y = boxNewY
  }
  
  robotSprite.x = newX
  robotSprite.y = newY
  
  const tile = getTile(robotSprite.x, robotSprite.y)
  const batterySprite = tile.find(sprite => sprite.type === battery)
  if (batterySprite) {
    batterySprite.remove()
    batteryCount++
    playTune(collectSound)
  } else {
    batteryCount--
    playTune(moveSound)
  }
  
  updateUI()
  
  if (checkWin()) {
    gameWon = true
    playTune(winSound)
    updateUI()
  } else if (batteryCount === 0) {
    playTune(failSound)
    updateUI()
  }
}

onInput("w", () => moveRobot(0, -1))
onInput("a", () => moveRobot(-1, 0))
onInput("s", () => moveRobot(0, 1))
onInput("d", () => moveRobot(1, 0))

onInput("i", () => {
  if (!gameStarted) {
    initLevel()
  } else if (gameWon && currentLevel < levels.length - 1) {
    currentLevel++
    initLevel()
  }
})

onInput("k", () => {
  if (gameStarted) {
    initLevel()
  }
})

onInput("j", () => {
  currentLevel = 0
  showWelcomeScreen()
})

showWelcomeScreen()
