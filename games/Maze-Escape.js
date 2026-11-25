
 /*
@title: Quackbound: Three Maze Trials
@author: Abdulla_salmani
@description: A three-level pixel-art duck adventure. Collect 16 dots, discover hidden keys and explore three challenging mazes.
@tags: ['puzzle']
@addedOn: 2026-11-24
*/


// ==========================================
// 1. GAME SPRITES
// ==========================================

const player = "p"
const dot = "d"
const wall = "w"
const key = "k"

// ==========================================
// 2. CUSTOM SOUND EFFECTS
// Click each green tune block to edit it.
// ==========================================

const moveTune = tune`
500: C5^500 + B4^500,
15500`
const bumpTune = tune`
500: C5^500,
500: C5^500 + D5^500,
500: D5^500,
500: E5^500 + F5^500,
500,
500: G5^500,
13000`
const dotTune = tune`
500: C5-500 + B4-500,
15500`
const keyTune = tune`
500: C5/500 + B4/500 + E5-500,
500: C5/500 + B4^500 + E5-500,
500: D5/500 + C5^500,
500: E5/500 + D5^500 + C5^500,
14000`
const levelTune = tune`
500: C5~500 + B4~500,
500: C5~500 + B4~500,
500: C5~500 + B4~500,
14500`
const winTune = tune`
500: E4~500 + D4^500 + G4/500 + C4-500,
500: F4~500 + D4^500 + E4^500 + G4/500 + A4/500,
500: F4~500 + G4~500 + E4^500 + A4/500 + B4/500,
500: G4~500 + E4^500 + F4^500 + B4/500 + D4-500,
500: F4^500 + E4-500 + D4^500 + B4/500,
500: G4~500 + F4~500 + D4^500 + A4/500 + E4-500,
500: F4-500 + E4~500 + D4^500 + A4/500,
500: E4^500 + B4/500 + F4-500,
500: F4-500 + E4^500 + B4/500,
500: F4~500 + E4^500 + C5/500 + B4/500 + G4-500,
500: G4-500 + F4^500 + B4/500,
500: G4~500 + F4^500 + E4^500 + A4-500,
500: F4~500 + E4^500 + A4-500 + B4/500,
500: F4~500 + E4^500 + C5/500 + B4-500,
500: F4~500 + E4^500 + C5/500 + B4-500,
500: F4~500 + E4^500 + C5-500,
500: G4~500 + F4^500 + B4/500 + C5-500,
500: G4~500 + F4^500 + E4^500 + B4/500 + C5/500,
500: G4~500 + F4~500 + D4^500 + D5-500,
500: E4~500 + D4^500 + D5-500 + E5/500,
500: F4~500 + G4~500 + E4^500 + C5/500 + D5/500,
500: A4~500 + B4~500 + C5~500 + E4^500 + F4^500,
500: C5~500 + F4^500 + E5/500 + F5-500,
500: C5~500 + B4~500 + A4~500 + G4~500 + E4^500,
500: G4~500 + F4^500 + F5-500,
500: A4~500 + B4~500 + G4^500 + G5-500,
500: C5~500 + D5~500 + A4^500 + A5/500 + G5-500,
500: D5~500 + E5~500 + F5~500 + G5~500 + A4^500,
500: A5~500 + C5^500 + D5^500 + E5^500 + F5^500,
500: A5~500 + G5~500 + E5^500 + D5^500 + C5^500,
500: F5~500 + E5~500 + D5~500 + B5-500 + G5/500,
500: C5~500 + B4~500 + A4~500 + G4~500 + B5-500`

// ==========================================
// 3. SOUND SETTINGS
// ==========================================

let soundOn = true
let currentSound = null

function playSFX(sound) {

  if (!soundOn) return

  // Stop previous sound to avoid overlapping sounds.

  if (currentSound && currentSound.isPlaying()) {
    currentSound.end()
  }

  currentSound = playTune(sound)
}

// ==========================================
// 4. SPRITE DESIGNS
// ==========================================

setLegend(

  // YELLOW CARTOON DUCK

  [player, bitmap`
................
................
......666.......
....666666......
...66666666.....
..6666666666....
.666666666666...
.6666666666663..
.66666066666633.
..666666666633..
...66666666.....
....666666......
.....6666.......
....33....33....
................
................`],

  // COLLECTIBLE DOT

  [dot, bitmap`
................
................
................
................
................
................
................
.......00.......
.......00.......
................
................
................
................
................
................
................`],

  // YELLOW KEY

  [key, bitmap`
................
................
....6666........
...66..66.......
...66..66.......
....6666........
......66........
......66........
......6666......
......6666......
......66........
......66........
......66........
................
................
................`],

  // BLACK WALL

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
0000000000000000`]
)

// ==========================================
// 5. COLLISION SETTINGS
// ==========================================

setSolids([player, wall])

// ==========================================
// 6. THREE LEVEL MAPS
// All levels contain exactly 16 dots.
// ==========================================

const levels = [

  // LEVEL 1 - EASY

  map`
wwwwwwwwww
w..d.d.dpw
w.ww.ww.dw
wd.d.d.d.w
w.ww.ww.dw
wd.d.d.d.w
w..d.d.d.w
wwwwwwwwww`,

  // LEVEL 2 - INTERMEDIATE

  map`
wwwwwwwwww
w.pd.d.d.w
w.ww.w..dw
wd.d.wd.dw
w.ww.w..dw
wd.d.d.d.w
w..d.d.d.w
wwwwwwwwww`,

  // LEVEL 3 - ADVANCED

  map`
wwwwwwwwww
w..d.wddpw
w.ww....dw
wd.d.wd.dw
w.ww....dw
wd.d.d.d.w
w..d.d.d.w
wwwwwwwwww`
]

// ==========================================
// 7. MENU MAP
// Same duck as gameplay.
// ==========================================


const menuMap = map`
wwwwwwwwww
w...p....w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`


// ==========================================
// 8. GAME VARIABLES
// ==========================================

let levelIndex = 0
let score = 0
let totalDots = 0

let gameStarted = false
let keyAppeared = false
let gameWon = false

const completed = [false, false, false]

// ==========================================
// 9. START MENU
// ==========================================

function showMenu() {

  clearText()

  addText("MAZE ESCAPE", {
    x: 4,
    y: 4,
    color: color`3`
  })

  addText("PIXEL MAZE QUEST", {
    x: 2,
    y: 6,
    color: color`6`
  })

  addText("COLLECT 16 DOTS", {
    x: 2,
    y: 8,
    color: color`0`
  })

  addText("FIND THE KEY", {
    x: 4,
    y: 10,
    color: color`0`
  })

  addText("WASD TO MOVE", {
    x: 4,
    y: 11,
    color: color`6`
  })

  addText("I TOGGLE SOUND", {
    x: 3,
    y: 12,
    color: color`0`
  })

  addText("J OR L TO START", {
    x: 2,
    y: 13,
    color: color`3`
  })
}

// ==========================================
// 10. GAME HUD
// ==========================================

function showHUD() {

  clearText()

  // LEVEL AND SCORE

  addText(`L${levelIndex + 1} ${score}/${totalDots}`, {
    x: 1,
    y: 0,
    color: color`2`
  })

  // LEVEL 1 PROGRESS

  addText(completed[0] ? "V" : "1", {
    x: 13,
    y: 0,
    color: completed[0] ? color`4` : color`2`
  })

  // LEVEL 2 PROGRESS

  addText(completed[1] ? "V" : "2", {
    x: 15,
    y: 0,
    color: completed[1] ? color`4` : color`2`
  })

  // LEVEL 3 PROGRESS

  addText(completed[2] ? "V" : "3", {
    x: 17,
    y: 0,
    color: completed[2] ? color`4` : color`2`
  })

  // SOUND STATUS

  addText(soundOn ? "I: SOUND ON" : "I: SOUND OFF", {
    x: 1,
    y: 14,
    color: color`6`
  })
}

// ==========================================
// 11. LOAD LEVEL
// ==========================================

function loadLevel(index) {

  if (index < 0 || index >= levels.length) return

  levelIndex = index

  score = 0
  keyAppeared = false

  setMap(levels[levelIndex])

  totalDots = getAll(dot).length

  showHUD()
}

// ==========================================
// 12. START GAME
// ==========================================

function startGame() {

  if (gameStarted) return

  gameStarted = true
  gameWon = false

  loadLevel(0)

  playSFX(levelTune)
}

// ==========================================
// 13. RESTART GAME
// ==========================================

function restartGame() {

  if (!gameStarted) return

  completed[0] = false
  completed[1] = false
  completed[2] = false

  gameWon = false

  loadLevel(0)

  playSFX(levelTune)
}

// ==========================================
// 14. FINAL WIN SCREEN
// ==========================================

function showWinScreen() {

  clearText()

  addText("V  V  V", {
    x: 6,
    y: 2,
    color: color`4`
  })

  addText("YOU WIN!", {
    x: 5,
    y: 5,
    color: color`4`
  })

  addText("3 LEVELS CLEARED", {
    x: 1,
    y: 8,
    color: color`3`
  })

  addText("K TO PLAY AGAIN", {
    x: 2,
    y: 11,
    color: color`6`
  })

  addText(soundOn ? "I: SOUND ON" : "I: SOUND OFF", {
    x: 4,
    y: 14,
    color: color`6`
  })
}

function finishGame() {

  gameWon = true

  playSFX(winTune)

  showWinScreen()
}

// ==========================================
// 15. COMPLETE LEVEL
// ==========================================

function completeLevel() {

  completed[levelIndex] = true

  // FINAL LEVEL

  if (levelIndex === 2) {

    finishGame()

    return
  }

  // NEXT LEVEL

  const nextLevel = levelIndex + 1

  playSFX(levelTune)

  loadLevel(nextLevel)

  addText(`LEVEL ${nextLevel + 1}`, {
    x: 5,
    y: 6,
    color: color`4`
  })

  addText("KEY FOUND!", {
    x: 4,
    y: 8,
    color: color`6`
  })
}

// ==========================================
// 16. PLAYER MOVEMENT
// ==========================================

function movePlayer(dx, dy) {

  if (!gameStarted || gameWon) return

  const p = getFirst(player)

  if (!p) return

  // CHECK NEXT TILE

  const nextTile = getTile(
    p.x + dx,
    p.y + dy
  )

  // WALL COLLISION SOUND

  if (nextTile.some(sprite => sprite.type === wall)) {

    playSFX(bumpTune)

    return
  }

  // MOVE PLAYER

  p.x += dx
  p.y += dy

  playSFX(moveTune)
}

// FOUR MOVEMENT CONTROLS

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

// ==========================================
// 17. SOUND ON / OFF
// Press I to toggle sound.
// ==========================================

function toggleSound() {

  soundOn = !soundOn

  if (!soundOn && currentSound && currentSound.isPlaying()) {

    currentSound.end()
    currentSound = null
  }

  // Refresh the current screen

  if (gameWon) {

    showWinScreen()

  } else if (gameStarted) {

    showHUD()

  } else {

    showMenu()
  }
}

// ==========================================
// 18. START AND RESTART BUTTONS
// ==========================================

onInput("j", () => startGame())

onInput("l", () => startGame())

onInput("k", () => restartGame())

onInput("i", () => toggleSound())

// ==========================================
// 19. DOT COLLECTION AND KEY SYSTEM
// ==========================================

afterInput(() => {

  if (!gameStarted || gameWon) return

  const p = getFirst(player)

  if (!p) return

  // COLLECT DOTS

  getTile(p.x, p.y).forEach((sprite) => {

    if (sprite.type === dot) {

      sprite.remove()

      score += 1

      playSFX(dotTune)
    }
  })

  // ALL DOTS COLLECTED
  // KEY APPEARS AT TOP LEFT
  // NO BLUE GATE

  if (!keyAppeared && getAll(dot).length === 0) {

    keyAppeared = true

    addSprite(1, 1, key)

    playSFX(keyTune)

    showHUD()

    addText("KEY APPEARED!", {
      x: 3,
      y: 5,
      color: color`6`
    })

    return
  }

  // COLLECT KEY

  if (keyAppeared) {

    const foundKey = getTile(p.x, p.y).find(
      sprite => sprite.type === key
    )

    if (foundKey) {

      foundKey.remove()

      completeLevel()

      return
    }
  }

  // REFRESH SCORE

  showHUD()
})

// ==========================================
// 20. INITIAL GAME SCREEN
// ==========================================

setMap(menuMap)

showMenu()
