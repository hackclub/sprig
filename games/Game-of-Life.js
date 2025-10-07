// Conway's Game of Life for Hack Club Sprig
// Works directly in https://sprig.hackclub.com/editor

const WIDTH = 16
const HEIGHT = 16

// Define tiles for alive and dead cells
const aliveTile = bitmap`
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
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`
const deadTile = bitmap`
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
0000000000000000`

setLegend(["a", aliveTile], ["d", deadTile])

let grid = []
let nextGrid = []

for (let y = 0; y < HEIGHT; y++) {
  grid[y] = []
  nextGrid[y] = []
  for (let x = 0; x < WIDTH; x++) {
    grid[y][x] = Math.random() < 0.25 ? 1 : 0
  }
}

function drawGrid() {
  let mapStr = ""
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      mapStr += grid[y][x] ? "a" : "d"
    }
    mapStr += "\n"
  }
  setMap(map`${mapStr}`)
}

function countNeighbors(x, y) {
  let count = 0
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = (x + dx + WIDTH) % WIDTH
      const ny = (y + dy + HEIGHT) % HEIGHT
      count += grid[ny][nx]
    }
  }
  return count
}

function updateGrid() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const n = countNeighbors(x, y)
      const alive = grid[y][x]
      nextGrid[y][x] =
        (alive && (n === 2 || n === 3)) || (!alive && n === 3) ? 1 : 0
    }
  }
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      grid[y][x] = nextGrid[y][x]
    }
  }
}

let running = true
function loop() {
  if (running) updateGrid()
  drawGrid()
  setTimeout(loop, 250)
}
loop()

onInput("a", () => (running = !running))
onInput("d", () => {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      grid[y][x] = Math.random() < 0.25 ? 1 : 0
    }
  }
})
