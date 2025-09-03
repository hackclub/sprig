const r = "r"
const g = "g"
const b = "b"
const y = "y"
const p = "p"
const o = "o"
const c = "c"

const COLORS = [r, g, b, y, p, o, c]

setLegend(
  [r, bitmap`
11111
11111
11111
11111
11111`],
  [g, bitmap`
22222
22222
22222
22222
22222`],
  [b, bitmap`
33333
33333
33333
33333
33333`],
  [y, bitmap`
44444
44444
44444
44444
44444`],
  [p, bitmap`
55555
55555
55555
55555
55555`],
  [o, bitmap`
66666
66666
66666
66666
66666`],
  [c, bitmap`
77777
77777
77777
77777
77777`]
)

const ROWS = 12
const COLS = 8

// Create a blank map with proper dimensions
let mapString = ""
for (let y = 0; y < ROWS; y++) {
  mapString += ".".repeat(COLS) + "\n"
}
setMap(mapString.trim())

let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null))

const SHAPES = [
  [[0,0],[1,0],[0,1],[1,1]], // O
  [[0,0],[0,1],[0,2],[0,3]], // I
  [[0,0],[1,0],[1,1],[2,1]], // Z
  [[1,0],[2,0],[0,1],[1,1]], // S
  [[1,0],[0,1],[1,1],[2,1]], // T
  [[0,0],[0,1],[0,2],[1,2]], // L
  [[1,0],[1,1],[1,2],[0,2]]  // J
]

let currentShape = []
let currentColor = ""
let offsetX = 3
let offsetY = 0
let running = true

function spawnShape() {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  currentColor = COLORS[Math.floor(Math.random() * COLORS.length)]
  currentShape = shape.map(([x, y]) => [x + offsetX, y + offsetY])
  if (!canMove(currentShape, 0, 0)) running = false
}

function canMove(shape, dx, dy) {
  return shape.every(([x, y]) => {
    const nx = x + dx
    const ny = y + dy
    return nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && grid[ny][nx] === null
  })
}

function mergeShape() {
  currentShape.forEach(([x, y]) => grid[y][x] = currentColor)
}

function clearLines() {
  for (let y = ROWS - 1; y >= 0; y--) {
    if (grid[y].every(c => c !== null)) {
      grid.splice(y, 1)
      grid.unshift(Array(COLS).fill(null))
      y++
    }
  }
}

function drawGrid() {
  getAll().forEach(s => clearTile(s.x, s.y))
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] !== null) addSprite(x, y, grid[y][x])
    }
  }
  currentShape.forEach(([x, y]) => {
    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) addSprite(x, y, currentColor)
  })
}

onInput("a", () => {
  if (canMove(currentShape, -1, 0)) currentShape = currentShape.map(([x, y]) => [x - 1, y])
})

onInput("d", () => {
  if (canMove(currentShape, 1, 0)) currentShape = currentShape.map(([x, y]) => [x + 1, y])
})

onInput("s", () => {
  if (canMove(currentShape, 0, 1)) currentShape = currentShape.map(([x, y]) => [x, y + 1])
  else {
    mergeShape()
    clearLines()
    spawnShape()
    offsetX = 3
    offsetY = 0
  }
})

spawnShape()

setInterval(() => {
  if (!running) return
  if (canMove(currentShape, 0, 1)) currentShape = currentShape.map(([x, y]) => [x, y + 1])
  else {
    mergeShape()
    clearLines()
    spawnShape()
    offsetX = 3
    offsetY = 0
    if (!running) addText("GAME OVER", { x: 2, y: 5 })
  }
  drawGrid()
}, 700)
