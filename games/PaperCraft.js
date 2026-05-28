/*
========================================
PAPRCRAFT ALPHA 6
TREES + PIGS + BETTER BUILDING
========================================

NEW FEATURES
- Trees
- Pigs
- Better terrain
- Better placing logic
- Grass + Dirt only
- Ambient life

========================================
CONTROLS
========================================

A = Move Left
D = Move Right
W = Jump

S = Mine
K = Place Dirt

========================================
*/

const player = "p"
const grass = "g"
const dirt = "d"
const leaves = "v"
const wood = "o"
const pig = "i"
const sky = "."
const crack = "x"

const WORLD_WIDTH = 64
const WORLD_HEIGHT = 32

const VIEW_WIDTH = 16
const VIEW_HEIGHT = 16

let world = []

let gameState = "menu"

let playerX = 8
let playerY = 5

let velocityY = 0
let grounded = false

let cameraX = 0

let facing = 1

let pigs = []

// ========================================
// GRAPHICS
// ========================================

setLegend(

[player, bitmap`
................
.....6666.......
....6CCCC6......
....6CCCC6......
.....6666.......
......66........
.....6..6.......
....6....6......
....6....6......
.....6..6.......
......66........
................
................
................
................
................`],

[grass, bitmap`
4444444444444444
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4444444444444444
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

[dirt, bitmap`
3333333333333333
3331333333331333
3333333333333333
3333333133333333
3333333333333333
3331333333333333
3333333333133333
3333333333333333
3333331333333333
3333333333333333
3333133333333333
3333333333333333
3333333331333333
3333333333333333
3331333333333333
3333333333333333`],

[wood, bitmap`
6666666666666666
6555555555555556
6556555555565556
6555555655555556
6555555555555556
6555655555556556
6555555555555556
6555556555555556
6555555555655556
6555555555555556
6555655555555556
6555555555555556
6555555556555556
6555555555555556
6555655555555556
6666666666666666`],

[leaves, bitmap`
4444444444444444
4777777777777774
4777477777777774
4777777777477774
4777777777777774
4777774777777774
4777777777777774
4777777777774774
4777777777777774
4777477777777774
4777777777777774
4777777774777774
4777777777777774
4777777777777774
4777477777777774
4444444444444444`],

[pig, bitmap`
................
................
....CCCCCC......
...C333333C.....
...C333333C.....
....CCCCCC......
....C.C..C......
...C..CC..C.....
...C......C.....
....CCCCCC......
................
................
................
................
................
................`],

[crack, bitmap`
................
....3......3....
......3..3......
.......33.......
......3333......
.....33..33.....
....3......3....
................
................
....3......3....
......3..3......
.......33.......
......3333......
.....33..33.....
....3......3....
................`]
)

// ========================================
// SOLIDS
// ========================================

setSolids([
grass,
dirt,
wood
])

// ========================================
// MENU
// ========================================

function showMenu() {

  setMap(map`
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
`)

  clearText()

  addText("PAPRCRAFT", {
    x: 2,
    y: 5,
    color: color`4`
  })
  
  addText("ALPHA 0.6", {
    x: 4,
    y: 6,
    color: color`1`
  })

  addText("PRESS K", {
    x: 6,
    y: 10,
    color: color`6`
  })

}

showMenu()

// ========================================
// WORLD GEN
// ========================================

function generateWorld() {

  world = []
  pigs = []

  for (let y = 0; y < WORLD_HEIGHT; y++) {

    let row = []

    for (let x = 0; x < WORLD_WIDTH; x++) {

      let surface =
        12 +
        Math.floor(Math.sin(x / 5) * 2)

      if (y < surface) {
        row.push(sky)
      }

      else if (y === surface) {
        row.push(grass)
      }

      else {
        row.push(dirt)
      }

    }

    world.push(row)

  }

  // TREES
  for (let t = 0; t < 8; t++) {

    let tx = Math.floor(Math.random() * WORLD_WIDTH)

    let surface = findSurface(tx)

    // trunk
    for (let h = 0; h < 3; h++) {
      world[surface - h][tx] = wood
    }

    // leaves
    world[surface - 3][tx] = leaves
    world[surface - 2][tx - 1] = leaves
    world[surface - 2][tx + 1] = leaves
    world[surface - 3][tx - 1] = leaves
    world[surface - 3][tx + 1] = leaves

  }

  // PIGS
  for (let p = 0; p < 5; p++) {

    let px = Math.floor(Math.random() * WORLD_WIDTH)
    let py = findSurface(px) - 1

    pigs.push({
      x: px,
      y: py
    })

  }

}

// ========================================
// FIND SURFACE
// ========================================

function findSurface(x) {

  for (let y = 0; y < WORLD_HEIGHT; y++) {

    if (world[y][x] === grass) {
      return y
    }

  }

  return 10

}

// ========================================
// SOLID CHECK
// ========================================

function isSolid(x, y) {

  if (
    x < 0 ||
    y < 0 ||
    x >= WORLD_WIDTH ||
    y >= WORLD_HEIGHT
  ) {
    return true
  }

  return (
    world[y][x] === grass ||
    world[y][x] === dirt ||
    world[y][x] === wood
  )

}

// ========================================
// CAMERA
// ========================================

function updateCamera() {

  cameraX = playerX - 8

  if (cameraX < 0) {
    cameraX = 0
  }

  if (cameraX > WORLD_WIDTH - VIEW_WIDTH) {
    cameraX = WORLD_WIDTH - VIEW_WIDTH
  }

}

// ========================================
// RENDER
// ========================================

function renderWorld() {

  let rows = []

  for (let y = 0; y < VIEW_HEIGHT; y++) {

    let row = ""

    for (let x = 0; x < VIEW_WIDTH; x++) {

      let wx = x + cameraX
      let wy = y

      let tile = sky

      // SAFE WORLD ACCESS
      if (
        wy >= 0 &&
        wy < WORLD_HEIGHT &&
        wx >= 0 &&
        wx < WORLD_WIDTH
      ) {

        tile = world[wy][wx]

      }

      // PLAYER
      if (
        wx === playerX &&
        wy === playerY
      ) {

        tile = player

      }

      // PIGS
      for (let pigData of pigs) {

        if (
          pigData.x === wx &&
          pigData.y === wy
        ) {

          tile = pig

        }

      }

      row += tile

    }

    // FORCE EXACT WIDTH
    row = row.slice(0, VIEW_WIDTH)

    rows.push(row)

  }

  // FORCE PERFECT RECTANGLE
  let finalMap = rows.join("\n")

  setMap(map`${finalMap}`)

}
// ========================================
// START GAME
// ========================================

function startGame() {

  // REMOVE MENU TEXT
  clearText()

  gameState = "game"

  generateWorld()

  playerX = 8
  playerY = 5

  updateCamera()
  renderWorld()

}

// ========================================
// MOVEMENT
// ========================================

onInput("a", () => {

  if (gameState !== "game") return

  facing = -1

  if (!isSolid(playerX - 1, playerY)) {
    playerX--
  }

  updateCamera()
  renderWorld()

})

onInput("d", () => {

  if (gameState === "menu") {
    startGame()
    return
  }

  if (gameState !== "game") return

  facing = 1

  if (!isSolid(playerX + 1, playerY)) {
    playerX++
  }

  updateCamera()
  renderWorld()

})

onInput("w", () => {

  if (gameState !== "game") return

  if (grounded) {

    velocityY = -2
    grounded = false

  }

})

// ========================================
// MINE
// ========================================

onInput("s", () => {

  if (gameState !== "game") return

  let targetX = playerX + facing
  let targetY = playerY

  // mine down if front empty
  if (!isSolid(targetX, targetY)) {

    targetX = playerX
    targetY = playerY + 1

  }

  if (
    targetX < 0 ||
    targetX >= WORLD_WIDTH ||
    targetY < 0 ||
    targetY >= WORLD_HEIGHT
  ) return

  let localX = targetX - cameraX
  let localY = targetY

  addSprite(localX, localY, crack)

  setTimeout(() => {

    world[targetY][targetX] = sky

    renderWorld()

  }, 100)

})

// ========================================
// PLACE BLOCK
// ========================================

onInput("k", () => {

  if (gameState === "menu") {
    startGame()
    return
  }

  if (gameState !== "game") return

  let targetX = playerX + facing
  let targetY = playerY

  // if front occupied OR airborne
  // place below player

  if (
    isSolid(targetX, targetY) ||
    !grounded
  ) {

    targetX = playerX
    targetY = playerY + 1

  }

  // bounds check
  if (
    targetX < 0 ||
    targetX >= WORLD_WIDTH ||
    targetY < 0 ||
    targetY >= WORLD_HEIGHT
  ) return

  // place only in air
  if (!isSolid(targetX, targetY)) {

    world[targetY][targetX] = dirt

  }

  renderWorld()

})
// ========================================
// PIG AI
// ========================================

setInterval(() => {

  if (gameState !== "game") return

  for (let pigData of pigs) {

    let move = Math.floor(Math.random() * 3) - 1

    let newX = pigData.x + move

    if (
      !isSolid(newX, pigData.y) &&
      isSolid(newX, pigData.y + 1)
    ) {

      pigData.x = newX

    }

  }

  renderWorld()

}, 700)

// ========================================
// GRAVITY
// ========================================

setInterval(() => {

  if (gameState !== "game") return

  // falling
  if (!isSolid(playerX, playerY + 1)) {

    playerY++
    grounded = false

  }

  else {

    grounded = true

  }

  // jumping
  if (velocityY < 0) {

    if (!isSolid(playerX, playerY - 1)) {
      playerY--
    }

    velocityY++

  }

  updateCamera()
  renderWorld()

}, 120)