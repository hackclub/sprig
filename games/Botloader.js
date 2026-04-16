/*
@title: Botloader
@author: Rainier-PS
@description: Botloader is a puzzle game where players control a robot with limited battery power. Push boxes onto all target spots before running out of energy. Collect extra batteries along the way to keep moving and complete each level.
@tags: ["puzzle", "logic", "strategy", "box-pushing", "sokoban", "battery", "robot", "sci-fi"]
@addedOn: 2026-03-25

CONTROLS:
- W / A / S / D: Move the robot (up / left / down / right)
- I: Start game / Continue to next level (after completing a level)
- K: Restart current level
- J: Return to main menu (resets progress)

OBJECTIVE:
- Push all boxes (b) onto target tiles (t) to complete the level.
- Each move consumes 1 battery power.
- Collect batteries (p) to increase your remaining energy.
- You cannot move when the battery reaches 0.
- Avoid getting boxes stuck in corners or unreachable positions.
- Complete all levels to finish the game.

TIPS:
- Plan your moves, battery is limited!
- You can only push one box at a time.
- Walls (w) block movement and cannot be passed.
- If stuck or out of battery, press K to retry the level.

Enjoy!!!
*/

const robot = "r"
const wall = "w"
const box = "b"
const target = "t"
const battery = "p"
const floor = "f"

setLegend(
  [ robot, bitmap`
................
...0000000000...
1.0LLLLLLLLLL0.1
0.0LL000000LL0.0
000L0FFFFFF0L000
0.0L0FFFFFF0L0.0
..0LL000000LL0..
...0LLLLLLLL0...
....00000000....
...00LLLLLL00...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...010LLLL010...
...000L00L000...
.....00..00.....` ],
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
..000000000000..
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0FFFFFFFFFFFF0.
.0CCCCCCCCCCCC0.
.0CCCC6666CCCC0.
.0CCCC6666CCCC0.
.0CCCCCCCCCCCC0.
.0CCCC6666CCCC0.
.0CCCCCCCCCCCC0.
.0FFFFFFFFFFFF0.
.0FFFFFFFFFFFF0.
.0CCCCCCCCCCCC0.
..000000000000..
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
......000.......
....00LLL00.....
....D44444D.....
....4440444.....
....4400044.....
....4440444.....
....4444444.....
....4444444.....
....4444444.....
....4444444.....
....4400044.....
....D44444D.....
....0000000.....
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
  // 1-10
  map`
wwwwwwwwww
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
wppppppppw
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w.r......w
w.b..pp..w
w.b..tt..w
w........w
wppppppppw
wppppppppw
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
wwwwwwwwww`,
  map`
wwwwwwwwww
wtw.w..ppw
w.w.w..ppw
w.w.w....w
w.....wwww
wpw.w.p..w
wpp.b.w..w
wpp...w.rw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtpppbpptw
wp......pw
wpppbppppw
wppppbpppw
wp......pw
wp......pw
wtppbrpptw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpppp..prw
wpbbw..www
wpppp..ppw
wwwwwttwww
wppppppppw
wwppwwwwww
wppppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtpw..pppw
wtpww.pbpw
wtp.w.pwpw
wtp.w.pwpw
wtp...wwpw
wtpw..prpw
wtpw..wppw
wwwwwwwwww`,
  map`
wwwwwwwwww
w....r..tw
wpbpwwwwpw
wpwppppwpw
wpwppppwpw
wpwppppwpw
wpwwwwpbpw
wt.......w
wwwwwwwwww`,
  map`
wwwwwwwwww
wrppwtpppw
wpwbwwpppw
w...p....w
wppwwwpwpw
wppwtppppw
wpwwwbwwpw
wpp...pppw
wwwwwwwwww`,
  // 11-20
  map`
wwwwwwwwww
wppppppppw
wpb....bpw
wp..tt..pw
wp..ww..pw
wp..tt..pw
wpb....bpw
wpppprpppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpppw..ppw
wpwww..wpw
w.....wwpw
wwtw...www
wppwb....w
wppp..wwpw
wppp..wrpw
wwwwwwwwww`,
  map`
wwwwwwwwww
wrw......w
wpw.wwww.w
wpw.wppp.w
wpb.ppwp.w
wpp.ppwp.w
wwwwpwwp.w
wtpppppp.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wppp.....w
wppp.....w
wppwppwwww
wpptbbtppw
wwwwppwppw
w.....pppw
wr....pppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppp..pppw
wppb..wppw
wppw..wwtw
wppw..wppw
wtww..wppw
wppw..bppw
wppr..pppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppppw
wpppwpwwww
wwwwwppptw
wt.......w
wpppwwwbww
wwwbwppppw
wrpppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wr.......w
w.pppppp.w
w.wwppww.w
w.bppppw.w
w.wppppt.w
w.wwppww.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppppw
wpwwwwpwww
wpwppppwrw
wpwbwwwwpw
wppppptwpw
wpwwwwwwpw
wppppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppwpppw
wppppppppw
wppwppwppw
wpbppwpppw
wwppwppppw
wppwppppww
wrwtpppwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wtpwpppppw
w..wppb..w
w..wppw..w
w..wppw..w
w..wppw..w
w..bppw..w
wrppppwptw
wwwwwwwwww`,
  
  //21-30
  map`
wwwwwwwwww
wpp.pp.ppw
wpb.tp.bpw
wp..ww..pw
wp..tt..pw
wp..ww..pw
wpb.pt.bpw
wpp.pr.ppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpptw..ppw
wppww..wpw
w.....wwpw
wwpw...www
wppw...bpw
wppp..wwpw
wppp..wrpw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtw......w
wpw.wwww.w
wpw.wppp.w
wpb.wpwp.w
wpp.ppwp.w
wwwwwwwp.w
wrpppppp.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wppp..pppw
wppwbbwppw
wppwttwwpw
wppbttbppw
wwwwttwppw
w..wbbwppw
wr....pppw
wwwwwwwwww`, 
  map`
wwwwwwwwww
wppw..pppw
wppt..wppw
wppw..wbww
wppw..wppw
wwbw..wppw
wppw..tppw
wppr..wppw
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
wpwwwpbppw
wppwppwppw
wppwppwppw
wppbpwwwtw
wppwppwppw
wrtwppwppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wr.......w
w.pppppp.w
w.wwppww.w
w.bppppt.w
w.tppppb.w
w.wwppww.w
w.pppppp.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppprw
w.wwwwpwww
w.wppppwtw
w.wbwwww.w
wppppppppw
w.wwwwww.w
wppppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppppw
wpbppppbpw
wppwppwppw
wpppttpppw
wwwppwpwww
wpwwpwpwpw
wrpppwpppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wwpppptpww
wp.w..b.pw
wp.w..w.pw
wp.w..wrpw
wp.w..w.pw
wp.b..w.pw
wwptppppww
wwwwwwwwww`,
  
  //31-40
  map`
wwwwwwwwww
wppppppppw
wpt....tpw
wp..bb..pw
wp......pw
wp..bb..pw
wpt....tpw
wpppprpppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpptwppppw
wppwwppppw
w......wtw
wwbww..www
wppw.....w
wppppbwwpw
wpppppwrpw
wwwwwwwwww`,
  map`
wwwwwwwwww
wrw......w
wpw.wwww.w
wpw.wppppw
wpb.ppwpbw
wpp.ppwppw
wwwwpwwppw
wtpppppptw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppp..pppw
wpptbbtppw
wpwwppwwpw
wpwtbbtwpw
wpwwppwwpw
wpptbbtppw
wrpp..pppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppp..pppw
wppbbbwppw
wppwttwwtw
wppwwwwppw
wtwwttwppw
wppwbbbppw
wppr..pppw
wwwwwwwwww`, 
  map`
wwwwwwwwww
wpppprpppw
wpbpwwpbpw
wpwtpptwpw
wtwwbbwwtw
wpwtpptwpw
wpbpwwpbpw
wppppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wrpppppppw
wpwwbbwwpw
wpwtpptwpw
wpbppppbpw
wpwtpptwpw
wpwwwwwwpw
wppppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppppw
wpwwwbwwpw
wpt....bpw
wpwwwtwwpw
wp.....tpw
wpwwwbwwpw
wrpppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppppw
wpwppppppw
wwwb.bwtww
wt.....w.w
ww..w....w
wppwwwppww
wrpppppwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwtwwpprpw
wpppppwwpw
wpppbppwpw
www.ww...w
wpw..w...w
wpww.b.www
wppppppptw
wwwwwwwwww`,


  //41-50
  map`
wwwwwwwwww
wppppppppw
wpbwwwwbpw
wp..tt..pw
wwwwwwwwpw
wp..tt..pw
wpbwwwwbpw
wpppprpppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpprwpptpw
wbwwwppwpw
wppppppwpw
wtwtwbpwww
wppp...ppw
wpww..wwpw
wppw..wppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wrw....wtw
wpw.wwww.w
wpw.wppp.w
wpb.pppp.w
wpp.ppwp.w
wwwwbwwp.w
wtpppppp.w
wwwwwwwwww`,
  map`
wwwwwwwwww
wptptptppw
wpbpbpbbtw
wppppppppw
wtbpprpbtw
wppppppppw
wtbbpbpbpw
wpptptptpw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtbppppbtw
wpwwpwwwpw
wpwppptwpw
wpwwbbpwpw
wpwtpppwpw
wpwwwpwwpw
wtbrpppbtw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpppwppwtw
wpwpwwpwpw
wpwppppwpw
wrw..b...w
wwwbpwwppw
wtpppwpppw
wppppwpppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wrpppppppw
wpwwwwwwww
wpwt...b.w
wpw.wwwwpw
wpw.wt.b.w
wpw.w.wwpw
wpp.p.pppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtbpprpbtw
wpwwwwpwpw
wpwppppwpw
wpwpbwwwpw
wpwppptwpw
wpwpwwwwpw
wtbppppbtw
wwwwwwwwww`,
  map`
wwwwwwwwww
wppppppppw
wpwbppwwpw
wpwpwwtwpw
wppppppppw
wpwtwwpwpw
wpwwppbwpw
wrpppppppw
wwwwwwwwww`,
  map`
wwwwwwwwww
wtpwpppptw
w..bppb..w
w..wppw..w
wwwwrpwwww
w..wppw..w
w..bppb..w
wtppppwptw
wwwwwwwwww`,

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
wwwwwwwwww
..........
..........
..........
..........
..........
..........
wwwwwwwwww`)
  
  addText("BOTLOADER", { x: 5, y: 3, color: color`6` })
  addText("Box Pusher", { x: 5, y: 4, color: color`0` })
  
  addText("HOW TO PLAY:", { x: 5, y: 6, color: color`3` })
  addText("WASD: move", { x: 2, y: 7, color: color`0` })
  addText("K: restart level", { x: 2, y: 8, color: color`0` })
  addText("J: restart all", { x: 2, y: 9, color: color`0` })
  addText("Push boxes to X", { x: 2, y: 10, color: color`0` })
  
  addText("Press I to start", { x: 2, y: 12, color: color`4` })
  
  gameStarted = false
}

function showVictoryScreen() {
  clearText()
  setMap(map`
wwwwwwwwww
..........
..........
..........
..........
..........
..........
wwwwwwwwww`)
  
  addText("MISSION COMPLETE", { x: 2, y: 3, color: color`4` })
  
  addText("Final Stats:", { x: 4, y: 5, color: color`6` })
  addText("Levels Completed: ", { x: 2, y: 6, color: color`0` })
  addText(`${levels.length}`, { x: 10, y: 7, color: color`0` })
  addText("Bot Status: ", { x: 5, y: 8, color: color`3` })
  addText("CHARGED", { x: 7, y: 9, color: color`3` })
  
  addText("Press J to", { x: 5, y: 11, color: color`4` })
  addText("play again", { x: 5, y: 12, color: color`4` })
  
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
