/*
@title: SimpleSnake
@author: wolf-yuan-6115
@tags: []
@addedOn: 2025-08-14
*/

const head_up = "h"
const head_down = "i"
const head_left = "j"
const head_right = "k"
const body_horizontal = "l"
const body_vertical = "m"
const corner_up_right = "n"
const corner_down_right = "o"
const corner_down_left = "p"
const corner_up_left = "q"
const tail_up = "r"
const tail_down = "s"
const tail_left = "t"
const tail_right = "u"
const single_up = "v"
const single_down = "w"
const single_left = "x"
const single_right = "y"
const food = "f"
const wall = "z"
const empty = "e"
const dark_bg = "L"

setLegend(
  // Snake head sprites
  [head_up, bitmap`
................
.....555555.....
....55555555....
...5555555555...
..555565565555..
..555555555555..
..555555555555..
..555565565555..
..555556655555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..`],
  [head_down, bitmap`
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555556655555..
..555565565555..
..555555555555..
..555555555555..
..555565565555..
...5555555555...
....55555555....
.....555555.....
................`],
  [head_left, bitmap`
................
................
....555555555555
...5555555555555
..55555555555555
.555555555555555
.555655655555555
.555555565555555
.555555565555555
.555655655555555
.555555555555555
..55555555555555
...5555555555555
....555555555555
................
................`],
  [head_right, bitmap`
................
................
555555555555....
5555555555555...
55555555555555..
555555555555555.
555555556556555.
555555565555555.
555555565555555.
555555556556555.
555555555555555.
55555555555555..
5555555555555...
555555555555....
................
................`],

  // Body segments
  [body_horizontal, bitmap`
................
................
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
................
................`],
  [body_vertical, bitmap`
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..`],

  // Corner pieces
  [corner_up_right, bitmap`
..555555555555..
..555555555555..
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
...5555555555555
....555555555555
.....55555555555
................
................`],
  [corner_down_right, bitmap`
................
................
.....55555555555
....555555555555
...5555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..55555555555555
..555555555555..
..555555555555..`],
  [corner_down_left, bitmap`
................
................
55555555555.....
555555555555....
5555555555555...
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
..555555555555..
..555555555555..`],
  [corner_up_left, bitmap`
..555555555555..
..555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
55555555555555..
5555555555555...
555555555555....
55555555555.....
................
................`],

  // Single part head
  [single_up, bitmap`
................
.....555555.....
....55555555....
...5555555555...
..555565565555..
..555555555555..
..555555555555..
..555565565555..
..555556655555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
.....555555.....
......5555......`],
  [single_down, bitmap`
......5555......
.....555555.....
...5555555555...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555556655555..
..555565565555..
..555555555555..
..555555555555..
..555565565555..
...5555555555...
....55555555....
.....555555.....
................`],
  [single_left, bitmap`
................
................
....555555555...
...55555555555..
..555555555555..
.55555555555555.
.555655655555555
.555555565555555
.555555565555555
.555655655555555
.55555555555555.
..555555555555..
...55555555555..
....555555555...
................
................`],
  [single_right, bitmap`
................
................
...555555555....
..55555555555...
..555555555555..
.55555555555555.
555555556556555.
555555565555555.
555555565555555.
555555556556555.
.55555555555555.
..555555555555..
..55555555555...
...555555555....
................
................`],

  // Tail pieces
  [tail_up, bitmap`
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...7777777777...
....55555555....
.....777777.....
......5555......
.......55.......
................`],
  [tail_down, bitmap`
................
.......55.......
......5555......
.....777777.....
....55555555....
...7777777777...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..
..555555555555..`],
  [tail_left, bitmap`
................
................
5555555555......
55555555557.....
555555555575....
5555555555757...
55555555557575..
555555555575755.
555555555575755.
55555555557575..
5555555555757...
555555555575....
55555555557.....
5555555555......
................
................`],
  [tail_right, bitmap`
................
................
......5555555555
.....75555555555
....575555555555
...7575555555555
..57575555555555
.557575555555555
.557575555555555
..57575555555555
...7575555555555
....575555555555
.....75555555555
......5555555555
................
................`],

  // Food and wall
  [food, bitmap`
................
................
.........4444...
........44..4...
........4.......
.....334433.....
....34343443....
...3344444333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
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
  [empty, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [dark_bg, bitmap`
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
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

setSolids([head_up, head_down, head_left, head_right, single_up, single_down, single_left, single_right, wall])

const turnMelody = tune`
50: A4~50,
50: D5~50,
1500`
const eatFoodMelody = tune`
80: C5~80,
80: E5~80,
80: G5~80,
80: C6~80,
160: E6~160,
500`
const gameOverMelody = tune`
300: C5~300,
300: A4~300,
300: F4~300,
300: D4~300,
600: C4~600,
1200`
const startMelody = tune`
120: C5~120,
120: D5~120,
120: E5~120,
120: F5~120,
120: G5~120,
120: A5~120,
240: C6~240,
120: G5~120,
240: E5~240,
120: C5~120,
480: G5~480,
1000`

const GAME_STATE = {
  START_SCREEN: 0,
  PLAYING: 1,
  GAME_OVER: 2,
  SETTINGS: 3
}

// Settings system
const THEMES = {
  LIGHT: 0,
  DARK: 1
}

const SPEEDS = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2
}

let gameSettings = {
  theme: THEMES.LIGHT,
  speed: SPEEDS.MEDIUM
}

let settingsMenu = {
  selectedOption: 0,
  options: ['Theme', 'Speed']
}

let gameState = GAME_STATE.START_SCREEN

let level = 0
const levels = [
  map`
zzzzzzzzzz
z........z
z........z
z........z
z........z
z...y....z
z........z
z........z
z........z
zzzzzzzzzz`
]

const startScreenMap = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`

const settingsScreenMap = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`

let snake = [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }]
let direction = { x: 1, y: 0 }
let prevDirection = { x: 1, y: 0 }
let food_pos = { x: 6, y: 3 }
let gameRunning = false
let score = 0

const BASE_SPEED = 350 // Starting speed in milliseconds
const MIN_SPEED = 120 // Fastest possible speed
const SPEED_DECREASE_PER_POINT = 10 // How much faster per point
let currentSpeed = BASE_SPEED
let gameInterval = null

setMap(startScreenMap)

function getSpeedMultiplier() {
  switch(gameSettings.speed) {
    case SPEEDS.LOW: return 0.7
    case SPEEDS.HIGH: return 1.4
    default: return 1.0
  }
}

function getThemeName() {
  return gameSettings.theme === THEMES.DARK ? "Dark" : "Light"
}

function getSpeedName() {
  switch(gameSettings.speed) {
    case SPEEDS.LOW: return "Low"
    case SPEEDS.HIGH: return "High"
    default: return "Medium"
  }
}

function applyTheme() {
  if (gameSettings.theme === THEMES.DARK) {
    // Fill background with dark tiles
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const sprites = getTile(x, y)
        let hasDarkBg = false
        sprites.forEach(sprite => {
          if (sprite.type === dark_bg) {
            hasDarkBg = true
          }
        })
        if (!hasDarkBg && !sprites.some(s => s.type === wall)) {
          addSprite(x, y, dark_bg)
        }
      }
    }
  } else {
    // Remove dark background tiles
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const sprites = getTile(x, y)
        sprites.forEach(sprite => {
          if (sprite.type === dark_bg) {
            sprite.remove()
          }
        })
      }
    }
  }
}

function clearTileAndReapplyTheme(x, y) {
  clearTile(x, y)
  if (gameSettings.theme === THEMES.DARK) {
    const sprites = getTile(x, y)
    const hasWall = sprites.some(s => s.type === wall)
    if (!hasWall) {
      addSprite(x, y, dark_bg)
    }
  }
}

function showSettingsScreen() {
  gameState = GAME_STATE.SETTINGS
  setMap(settingsScreenMap)
  applyTheme()
  
  clearText()
  addText("SETTINGS", { x: 2, y: 2, color: color`7` })
  
  // Show theme option
  const themeColor = settingsMenu.selectedOption === 0 ? color`4` : color`0`
  addText(`> Theme: ${getThemeName()}`, { x: 1, y: 5, color: themeColor })
  
  // Show speed option
  const speedColor = settingsMenu.selectedOption === 1 ? color`4` : color`0`
  addText(`> Speed: ${getSpeedName()}`, { x: 1, y: 7, color: speedColor })
  
  addText("W/S: Navigate", { x: 2, y: 10, color: color`9` })
  addText("A/D: Change", { x: 2, y: 11, color: color`9` })
  addText("I: Back", { x: 2, y: 12, color: color`9` })
}

function showStartScreen() {
  gameState = GAME_STATE.START_SCREEN
  setMap(startScreenMap)
  applyTheme()
  
  clearText()
  addText("Simply just", { x: 4, y: 2, color: color`0` })
  addText("SNAKE", { x: 4, y: 4, color: color`7` })
  addText("Press I!", { y: 12, color: color`4` })
  addText("Press K for", { y: 13, color: color`6` })
  addText("settings!", { y: 14, color: color`6` })

  addSprite(2, 5, head_right)
  addSprite(1, 5, body_horizontal)
  addSprite(0, 5, tail_right)
  addSprite(4, 5, food)
}

function calculateSpeed(score) {
  const baseSpeed = BASE_SPEED * getSpeedMultiplier()
  const newSpeed = baseSpeed - (score * SPEED_DECREASE_PER_POINT)
  return Math.max(newSpeed, MIN_SPEED)
}

function updateGameSpeed() {
  const newSpeed = calculateSpeed(score)
  const oldSpeed = currentSpeed
  currentSpeed = newSpeed

  if (gameInterval) {
    clearInterval(gameInterval)
  }
  gameInterval = setInterval(() => {
    moveSnake()
  }, currentSpeed)
}

function generateFood() {
  let newX, newY
  do {
    newX = Math.floor(Math.random() * 8) + 1
    newY = Math.floor(Math.random() * 8) + 1
  } while (snake.some(segment => segment.x === newX && segment.y === newY))

  return { x: newX, y: newY }
}

function getSegmentSprite(index) {
  if (snake.length === 1) {
    if (direction.x === 1) return single_right
    if (direction.x === -1) return single_left
    if (direction.y === 1) return single_down
    if (direction.y === -1) return single_up
  }

  if (index === 0) {
    // Head
    if (direction.x === 1) return head_right
    if (direction.x === -1) return head_left
    if (direction.y === 1) return head_down
    if (direction.y === -1) return head_up
  } else if (index === snake.length - 1) {
    // Tail
    const tail = snake[index]
    const beforeTail = snake[index - 1]
    const tailDir = {
      x: beforeTail.x - tail.x,
      y: beforeTail.y - tail.y
    }

    if (tailDir.x === 1) return tail_right
    if (tailDir.x === -1) return tail_left
    if (tailDir.y === 1) return tail_down
    if (tailDir.y === -1) return tail_up
  } else {
    const current = snake[index]
    const prev = snake[index - 1]
    const next = snake[index + 1]

    const connectsUp = prev.y < current.y || next.y < current.y
    const connectsDown = prev.y > current.y || next.y > current.y
    const connectsLeft = prev.x < current.x || next.x < current.x
    const connectsRight = prev.x > current.x || next.x > current.x

    const verticalConnection = connectsUp || connectsDown
    const horizontalConnection = connectsLeft || connectsRight

    if (verticalConnection && horizontalConnection) {
      if (connectsUp && connectsRight) return corner_up_right
      if (connectsDown && connectsRight) return corner_down_right
      if (connectsDown && connectsLeft) return corner_down_left
      if (connectsUp && connectsLeft) return corner_up_left
    } else {
      // Straight body segment
      if (horizontalConnection) return body_horizontal
      if (verticalConnection) return body_vertical
    }
  }

  return body_horizontal // fallback
}

function drawSnake() {
  for (let x = 1; x < 9; x++) {
    for (let y = 1; y < 9; y++) {
      const sprites = getTile(x, y)
      sprites.forEach(sprite => {
        if ([head_up, head_down, head_left, head_right,
            body_horizontal, body_vertical,
            corner_up_right, corner_down_right, corner_down_left, corner_up_left,
            tail_up, tail_down, tail_left, tail_right,
            single_up, single_down, single_left, single_right
          ].includes(sprite.type)) {
          sprite.remove()
        }
      })
    }
  }

  snake.forEach((segment, index) => {
    const spriteType = getSegmentSprite(index)
    addSprite(segment.x, segment.y, spriteType)
  })
}

// Move snake
function moveSnake() {
  if (!gameRunning || gameState !== GAME_STATE.PLAYING) return

  const head = snake[0]
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  }

  // Check wall collision
  if (newHead.x <= 0 || newHead.x >= 9 || newHead.y <= 0 || newHead.y >= 9) {
    gameOver()
    return
  }

  // Check self collision
  if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    gameOver()
    return
  }

  snake.unshift(newHead)
  prevDirection = { ...direction }

  // Check food collision
  if (newHead.x === food_pos.x && newHead.y === food_pos.y) {
    score++
    clearTileAndReapplyTheme(food_pos.x, food_pos.y)
    food_pos = generateFood()
    addSprite(food_pos.x, food_pos.y, food)
    clearText()
    addText(`Score: ${score}`, { y: 1, color: color`9` })

    playTune(eatFoodMelody)

    updateGameSpeed()
  } else {
    snake.pop()
  }

  drawSnake()
}

function gameOver() {
  gameRunning = false
  gameState = GAME_STATE.GAME_OVER

  if (gameInterval) {
    clearInterval(gameInterval)
    gameInterval = null
  }

  playTune(gameOverMelody)

  clearText()
  addText("Game Over!", { y: 6, color: color`3` })
  addText(`Your Score: ${score}`, { y: 8, color: color`6` })
  addText("I to restart!", { y: 10, color: color`7` })
  addText("K for menu!", { y: 11, color: color`5` })
}

function startGame() {
  gameState = GAME_STATE.PLAYING
  snake = [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }]
  direction = { x: 1, y: 0 }
  prevDirection = { x: 1, y: 0 }
  score = 0
  gameRunning = true

  currentSpeed = BASE_SPEED * getSpeedMultiplier()

  if (gameInterval) {
    clearInterval(gameInterval)
  }

  setMap(levels[level])
  applyTheme()
  food_pos = generateFood()
  addSprite(food_pos.x, food_pos.y, food)
  drawSnake()
  clearText()
  addText(`Score: ${score}`, { y: 1, color: color`9` })

  gameInterval = setInterval(() => {
    moveSnake()
  }, currentSpeed)

  playTune(startMelody)
}

function restartGame() {
  if (gameState === GAME_STATE.GAME_OVER) {
    startGame()
  }
}

function checkDirectionChange(newDirection) {
  if (gameRunning && gameState === GAME_STATE.PLAYING &&
    (direction.x !== newDirection.x || direction.y !== newDirection.y)) {
    playTune(turnMelody)
  }
}

// Settings navigation
function navigateSettings(direction) {
  if (direction === 'up') {
    settingsMenu.selectedOption = Math.max(0, settingsMenu.selectedOption - 1)
  } else if (direction === 'down') {
    settingsMenu.selectedOption = Math.min(settingsMenu.options.length - 1, settingsMenu.selectedOption + 1)
  }
  showSettingsScreen()
}

function changeSettingValue(direction) {
  if (settingsMenu.selectedOption === 0) { // Theme
    if (direction === 'left') {
      gameSettings.theme = THEMES.LIGHT
    } else if (direction === 'right') {
      gameSettings.theme = THEMES.DARK
    }
  } else if (settingsMenu.selectedOption === 1) { // Speed
    if (direction === 'left') {
      gameSettings.speed = Math.max(0, gameSettings.speed - 1)
    } else if (direction === 'right') {
      gameSettings.speed = Math.min(2, gameSettings.speed + 1)
    }
  }
  showSettingsScreen()
}

// Controls
onInput("w", () => {
  if (gameState === GAME_STATE.PLAYING && gameRunning && direction.y !== 1) {
    const newDirection = { x: 0, y: -1 }
    checkDirectionChange(newDirection)
    direction = newDirection
  } else if (gameState === GAME_STATE.SETTINGS) {
    navigateSettings('up')
  }
})

onInput("s", () => {
  if (gameState === GAME_STATE.PLAYING && gameRunning && direction.y !== -1) {
    const newDirection = { x: 0, y: 1 }
    checkDirectionChange(newDirection)
    direction = newDirection
  } else if (gameState === GAME_STATE.SETTINGS) {
    navigateSettings('down')
  }
})

onInput("a", () => {
  if (gameState === GAME_STATE.PLAYING && gameRunning && direction.x !== 1) {
    const newDirection = { x: -1, y: 0 }
    checkDirectionChange(newDirection)
    direction = newDirection
  } else if (gameState === GAME_STATE.SETTINGS) {
    changeSettingValue('left')
  }
})

onInput("d", () => {
  if (gameState === GAME_STATE.PLAYING && gameRunning && direction.x !== -1) {
    const newDirection = { x: 1, y: 0 }
    checkDirectionChange(newDirection)
    direction = newDirection
  } else if (gameState === GAME_STATE.SETTINGS) {
    changeSettingValue('right')
  }
})

onInput("i", () => {
  if (gameState === GAME_STATE.START_SCREEN) {
    startGame()
  } else if (gameState === GAME_STATE.GAME_OVER) {
    restartGame()
  } else if (gameState === GAME_STATE.SETTINGS) {
    showStartScreen()
  }
})

onInput("k", () => {
  if (gameState === GAME_STATE.START_SCREEN) {
    showSettingsScreen()
  } else if (gameState === GAME_STATE.GAME_OVER) {
    showStartScreen()
  }
})

showStartScreen()
