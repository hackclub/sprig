/*
@title: Snake Adventure
@author: Kazi Zayeed
@description: Classic snake game where you control a growing snake to collect food while avoiding obstacles.
@tags: []
@img: ""
@addedOn: 2025-08-25
*/

// Define sprites
const player = "p"
const food = "f"
const wall = "w"
const tail = "t"

// Set up the sprite graphics using bitmap
setLegend(
  [ player, bitmap`
................
................
................
.....000000.....
....00LLLL00....
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LL0LL0LL0...
...0LLLLLLLL0...
...0LL0000LL0...
...0LLLLLLLL0...
....00LLLL00....
.....000000.....
................
................
................`],
  [ food, bitmap`
................
................
................
.....3333333....
....333333333...
...33333333333..
..3333333333333.
..3333333333333.
..3333333333333.
..3333333333333.
...33333333333..
....333333333...
.....3333333....
................
................
................`],
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
0000000000000000`],
  [ tail, bitmap`
................
................
................
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....
................
................
................`]
)

// Set up the level
let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w..............w
w..............w
w..............w
w.......f......w
w..............w
w..............w
w..............w
w.......p......w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`
]

setMap(levels[level])

// Game state
let snake = [{x: 7, y: 10}] // Start position
let direction = {x: 0, y: -1} // Start moving up
let score = 0
let gameRunning = true

// Place food randomly
function placeFood() {
  let placed = false
  while (!placed) {
    let x = Math.floor(Math.random() * 14) + 1
    let y = Math.floor(Math.random() * 14) + 1
    
    // Check if position is empty (not occupied by snake or walls)
    let occupied = false
    for (let segment of snake) {
      if (segment.x === x && segment.y === y) {
        occupied = true
        break
      }
    }
    
    if (!occupied && getTile(x, y).length === 0) {
      addSprite(x, y, food)
      placed = true
    }
  }
}

// Update snake position
function updateSnake() {
  if (!gameRunning) return
  
  // Calculate new head position
  let head = snake[0]
  let newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  }
  
  // Check for wall collision
  if (newHead.x < 1 || newHead.x > 14 || newHead.y < 1 || newHead.y > 14) {
    gameOver()
    return
  }
  
  // Check for self collision
  for (let segment of snake) {
    if (segment.x === newHead.x && segment.y === newHead.y) {
      gameOver()
      return
    }
  }
  
  // Check for food
  let ate = false
  let tiles = getTile(newHead.x, newHead.y)
  for (let tile of tiles) {
    if (tile.type === food) {
      ate = true
      clearTile(newHead.x, newHead.y)
      score++
      break
    }
  }
  
  // Add new head
  snake.unshift(newHead)
  addSprite(newHead.x, newHead.y, player)
  
  if (!ate) {
    // Remove tail if didn't eat
    let oldTail = snake.pop()
    clearTile(oldTail.x, oldTail.y)
  } else {
    // Place new food
    placeFood()
  }
  
  // Update tail sprites
  for (let i = 1; i < snake.length; i++) {
    clearTile(snake[i].x, snake[i].y)
    addSprite(snake[i].x, snake[i].y, tail)
  }
}

function gameOver() {
  gameRunning = false
  addText(`Game Over! Score: ${score}`, { y: 2, color: color`3` })
  addText("Press j to restart", { y: 4, color: color`6` })
}

function restart() {
  clearText()
  snake = [{x: 7, y: 10}]
  direction = {x: 0, y: -1}
  score = 0
  gameRunning = true
  setMap(levels[level])
  placeFood()
}

// Input handlers
onInput("w", () => {
  if (gameRunning && direction.y === 0) {
    direction = {x: 0, y: -1}
  }
})

onInput("s", () => {
  if (gameRunning && direction.y === 0) {
    direction = {x: 0, y: 1}
  }
})

onInput("a", () => {
  if (gameRunning && direction.x === 0) {
    direction = {x: -1, y: 0}
  }
})

onInput("d", () => {
  if (gameRunning && direction.x === 0) {
    direction = {x: 1, y: 0}
  }
})

onInput("j", () => {
  if (!gameRunning) {
    restart()
  }
})

// Game loop
const gameLoop = setInterval(() => {
  updateSnake()
}, 300) // Move every 300ms

// Initialize game
placeFood()
addText(`Score: ${score}`, { y: 1, color: color`4` })
addText("WASD to move", { y: 15, color: color`2` })