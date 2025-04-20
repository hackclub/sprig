// SNAKE TUNNEL RUSH  🐍🚇
//Author - Adarsh D
// A very hard game
// github : @Greninja44
const snake = "s"
const apple = "a"
const wall = "w"
const floor = "f"

setLegend(
  [snake, bitmap`
................
................
.....000000.....
....06000060....
...0606000600...
...0666666660...
...0666666660...
...0669999660...
...0669999660...
...0666666660...
...0666666660...
....06000060....
.....000000.....
................
................
................`],
  [apple, bitmap`
................
................
................
......3333......
.....366663.....
.....366663.....
.....366663.....
.....366663.....
.....366663.....
......3333......
................
................
................
................
................
................`],
  [wall, bitmap`
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
1111111111111111`],
  [floor, bitmap`
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

setSolids([snake, wall])
setBackground(floor)

const WIDTH = 16
const HEIGHT = 8

// Initialize empty map
let level = ""
for (let y = 0; y < HEIGHT; y++) {
  level += "f".repeat(WIDTH) + "\n"
}
setMap(map`${level.trim()}`)

let snakeBody = [{ x: 2, y: 4 }]
let dir = { x: 0, y: 0 } // Vertical only control
let tunnelY = 3
let gameOver = false
let tick = 0
let speed = 250
let appleX = 8
let appleY = 4
let difficultyTimer = 0

function draw() {
  clearScreen()

  for (let part of snakeBody) {
    addSprite(part.x, part.y, snake)
  }

  addSprite(appleX, appleY, apple)
}

function clearScreen() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      clearTile(x, y)
    }
  }
}

function spawnApple() {
  let x, y
  do {
    x = WIDTH - 2
    y = Math.floor(Math.random() * HEIGHT)
  } while (getTile(x, y).length > 0)
  appleX = x
  appleY = y
}

function generateTunnelColumn() {
  // Determine if we're in "easy mode"
  const easyMode = difficultyTimer < 20 * (1000 / speed)
  let tunnelHeight = easyMode ? 3 : 2
  let movementChance = easyMode ? 0.3 : 1

  // Random tunnel shift with limited movement early on
  if (Math.random() < movementChance) {
    tunnelY += Math.floor(Math.random() * 3) - 1
  }

  // Clamp tunnel position
  if (tunnelY < 0) tunnelY = 0
  if (tunnelY > HEIGHT - tunnelHeight) tunnelY = HEIGHT - tunnelHeight

  // Place walls, leaving a gap for the tunnel
  for (let y = 0; y < HEIGHT; y++) {
    let inTunnel = false
    for (let i = 0; i < tunnelHeight; i++) {
      if (y === tunnelY + i) inTunnel = true
    }
    if (!inTunnel) {
      addSprite(WIDTH - 1, y, wall)
    }
  }
}

function shiftMapLeft() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 1; x < WIDTH; x++) {
      const tiles = getTile(x, y)
      clearTile(x - 1, y)
      for (let tile of tiles) {
        addSprite(x - 1, y, tile.type)
      }
    }
    clearTile(WIDTH - 1, y)
  }
  generateTunnelColumn()
}

function move() {
  if (gameOver) return

  tick++
  difficultyTimer++

  // Gradually speed up after easy phase
  if (tick % 10 === 0 && speed > 100 && difficultyTimer > 20 * (1000 / speed)) {
    speed -= 5
  }

  shiftMapLeft()

  let head = {
    x: snakeBody[0].x + 1,
    y: snakeBody[0].y + dir.y
  }

  if (
    head.x >= WIDTH ||
    head.y < 0 ||
    head.y >= HEIGHT ||
    getTile(head.x, head.y).some(t => t.type === wall || t.type === snake)
  ) {
    gameOver = true
    addText("TUNNEL CRASH!", { x: 3, y: 4, color: color`3` })
    return
  }

  snakeBody.unshift(head)

  if (head.x === appleX && head.y === appleY) {
    spawnApple()
  } else {
    snakeBody.pop()
  }

  draw()
}

// Controls (up and down only)
onInput("w", () => dir = { x: 0, y: -1 })
onInput("s", () => dir = { x: 0, y: 1 })

// Start
draw()
spawnApple()

setInterval(() => {
  move()
}, speed)
