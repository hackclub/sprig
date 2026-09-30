const playerLeft = "l"
const playerRight = "r"
const cheese = "c"
const spike = "s"
const background = "b"
const ground = "g"

const cheeseSfx = tune`
80: E5^80,
80: A5^80`

const deathSfx = tune`
120: A4/120,
120: F4/120,
120: D4/120,
240: A3/240`

const winSfx = tune`
120: C5-120,
120: E5-120,
120: G5-120,
360: C6-360`


setLegend(
  [playerLeft, bitmap`
..LL0.....0LL...
..0810CCC0180...
..L000CCC000L...
...CCCCCCCCC....
...CC111CCCC....
...C12012CCC....
...C100100CC....
...C1LL1LL1C....
....1110111.....
......111..888..
.....LLLLL.8.8..
.....LLLLL...8..
.....1LLL1.888..
......LLL888....
......L.L.......
......L.L.......`],

  [playerRight, bitmap`
...LL0.....0LL..
...0810CCC0180..
...L000CCC000L..
....CCCCCCCCC...
....CCCC111CC...
....CCC21021C...
....CC001001C...
....C1LL1LL1C...
.....1110111....
..888..111......
..8.8.LLLLL.....
..8...LLLLL.....
..888.1LLL1.....
....888LLL......
.......L.L......
.......L.L......`],

  [cheese, bitmap`
................
................
................
................
......6.........
......F6........
.......6.F......
....66...6......
....6F6.........
....66666.......
....6F6F666.....
....F6666F6.....
....FF6F666.....
................
................
................`],

  [spike, bitmap`
................
................
................
................
................
................
................
................
..LL...LL...LL..
..LL...LL...LL..
..LL...LL...LL..
.L11L.L11L.L11L.
.L11L.L11L.L11L.
.L11L.L11L.L11L.
LL11LLL11LLL11LL
L1111L1111L1111L`],

  [background, bitmap`
0000000000000000
0000000000000000
0000000000000200
0000000000000000
0200000000000000
0000000000000000
0000000000000000
0000000000000000
0000002000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000`],

  [ground, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
111111111L111111
11111111LL111111
11111111LL111111
111111111LL11111
1111111LLLLL1111
L11111LL111LLLLL
LLLLLLL111111LL1
11L1111111111L11
1LL111111111LL11
LLL1111111111LLL
LLLLLLLLLLLLLLLL
1111111111111111`]
)

setSolids([playerLeft, playerRight, ground])
setBackground(background)


// World

const level = map`
...........................................
.....................................c.....
.c...............................ggg.g.....
ggg.........................ggg......g.....
.......c.....c..gg.....c.............g.....
......ggg....ggg.................ggg.g......
.r................ss..sss............gs..c.
ggggggggggggggggggggggggggggggggggggggggggg`


// Working with world

const VIEW_WIDTH = 8
const VIEW_HEIGHT = 7

let rows = level.trim().split("\n").map(r => r.trim())

let LEVEL_WIDTH = VIEW_WIDTH
for (const r of rows) {
  if (r.length > LEVEL_WIDTH) LEVEL_WIDTH = r.length
}

rows = rows.map(r => r + ".".repeat(LEVEL_WIDTH - r.length))

while (rows.length < VIEW_HEIGHT) {
  rows.unshift(".".repeat(LEVEL_WIDTH))
}

const LEVEL_HEIGHT = rows.length

// Find player start and count cheese (once, from the pristine level)
let startX = 0
let startY = 0
let TOTAL_CHEESE = 0

for (let y = 0; y < LEVEL_HEIGHT; y++) {
  for (let x = 0; x < LEVEL_WIDTH; x++) {
    const t = rows[y][x]
    if (t === playerRight || t === playerLeft) {
      startX = x
      startY = y
    } else if (t === cheese) {
      TOTAL_CHEESE++
    }
  }
}


// Game state

let state = "menu"      // "menu" | "playing" | "dead" | "won"
let world = []
let player = playerRight
let worldX = 0
let worldY = 0
let score = 0
let rising = 0
const JUMP_HEIGHT = 3
const RESTART_DELAY = 3000

function loadLevel() {
  world = rows.map(r =>
    r.split("").map(t => (t === playerRight || t === playerLeft) ? "." : t)
  )
  worldX = startX
  worldY = startY
  player = playerRight
  score = 0
  rising = 0
}


// Audio

let music = null

function stopMusic() {
  if (music) {
    music.end()
    music = null
  }
}


// Player physics

function solidAt(x, y) {
  if (x < 0 || x >= LEVEL_WIDTH) return true
  if (y < 0) return true
  if (y >= LEVEL_HEIGHT) return true
  return world[y][x] === ground
}

function onGround() {
  return solidAt(worldX, worldY + 1)
}


// Rendering

function updateMap() {


  let gotCheese = false
  if (world[worldY][worldX] === cheese) {
    world[worldY][worldX] = "."
    score++
    gotCheese = true
  }


  const cameraX = Math.max(0, Math.min(worldX - 3, LEVEL_WIDTH - VIEW_WIDTH))
  const cameraY = Math.max(0, Math.min(worldY - 3, LEVEL_HEIGHT - VIEW_HEIGHT))

  const visible = []
  for (let y = 0; y < VIEW_HEIGHT; y++) {
    visible.push(world[cameraY + y].slice(cameraX, cameraX + VIEW_WIDTH).join(""))
  }

  setMap(visible.join("\n"))
  addSprite(worldX - cameraX, worldY - cameraY, player)

  clearText()

  if (world[worldY][worldX] === spike) {
    // Death
    state = "dead"
    stopMusic()
    playTune(deathSfx)
    addText("You died!", { x: 5, y: 1, color: color`2` })
    setTimeout(showMenu, RESTART_DELAY)
  } else if (TOTAL_CHEESE > 0 && score === TOTAL_CHEESE) {
    // Win
    state = "won"
    stopMusic()
    playTune(winSfx)
    addText("You win!", { x: 6, y: 1, color: color`2` })
    setTimeout(showMenu, RESTART_DELAY)
  } else {
    addText("Cheese " + score + "/" + TOTAL_CHEESE, { x: 1, y: 0, color: color`2` })
    if (gotCheese) playTune(cheeseSfx)
  }
}


// Start screen

function showMenu() {
  state = "menu"
  stopMusic()

  const menuRows = []
  for (let y = 0; y < VIEW_HEIGHT; y++) {
    menuRows.push(".".repeat(VIEW_WIDTH))
  }
  // Decoration: player next to a piece of cheese
  menuRows[2] = ".".repeat(3) + playerRight + cheese + ".".repeat(VIEW_WIDTH - 5)

  setMap(menuRows.join("\n"))

  clearText()
  addText("Cheese runner", { x: 3, y: 8, color: color`2` })
  addText("Press any key", { x: 3, y: 10, color: color`2` })
}

function startGame() {
  loadLevel()
  state = "playing"
  updateMap()
}

showMenu()


// Controlling

function handleKey(key) {
  if (state === "menu") {
    startGame()
    return
  }

  if (state !== "playing") return

  if (key === "a") {
    if (solidAt(worldX - 1, worldY)) return
    worldX--
    player = playerLeft
    updateMap()
  } else if (key === "d") {
    if (solidAt(worldX + 1, worldY)) return
    worldX++
    player = playerRight
    updateMap()
  } else if (key === "w") {
    if (rising === 0 && onGround()) {
      rising = JUMP_HEIGHT
    }
  }
}

;["w", "a", "s", "d", "i", "j", "k", "l"].forEach(k => {
  onInput(k, () => handleKey(k))
})


// Physics tick (jump + gravity)

setInterval(() => {
  if (state !== "playing") return

  if (rising > 0) {
    if (solidAt(worldX, worldY - 1)) {
      rising = 0
    } else {
      worldY--
      rising--
    }
    updateMap()
  } else if (!onGround()) {
    worldY++
    updateMap()
  }
}, 150)