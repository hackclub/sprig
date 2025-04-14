/**
 * Snake Game :)
 * Author: Adarsh D
 * GITHUB : Greninja44
 * This is a classic Snake Game built with JavaScript. The player controls the snake
 * using arrow keys to eat food, which makes the snake longer. The game ends when the snake collides 
 * with the walls or itself.
 * Email: greninja220324@gmail.com
 * Key Features:
 * - Snake movement and collision detection
 * - Growing snake on food consumption
 * - Cage-like background
 */


// Define sprite characters
const snake = "s"
const apple = "a"
const wall = "w"
const floor = "f"

// Create how each sprite looks visually
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
1000000000000001
1010101010101011
1000000000000001
1010101010101011
1000000000000001
1010101010101011
1000000000000001
1010101010101011
1000000000000001
1010101010101011
1000000000000001
1010101010101011
1000000000000001
1010101010101011
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

// Snake and wall are solid objects
setSolids([snake, wall])

// Set background floor tile
setBackground(floor)

// Create the game map with cage-like walls
let level = map`
wwwwwwwwwwwwwwww
wffffffffffffffw
wffffffffffffffw
wffffffffffffffw
wffffffffffffffw
wffffffffffffffw
wffffffffffffffw
wwwwwwwwwwwwwwww`
setMap(level)

// Game state variables
let snakeBody = [{ x: 5, y: 3 }] // Starting position of snake
let dir = { x: 1, y: 0 }         // Snake moves to the right initially
let gameOver = false            // Track if game is over
let appleX = 8                  // Initial apple position
let appleY = 3

// Function to draw everything on the screen
function draw() {
  // Clear only the inner play area (not the walls)
  for (let y = 1; y < 7; y++) {
    for (let x = 1; x < 15; x++) {
      clearTile(x, y)
    }
  }

  // Draw snake segments
  for (let part of snakeBody) {
    addSprite(part.x, part.y, snake)
  }

  // Draw apple
  addSprite(appleX, appleY, apple)
}

// Function to update snake movement
function move() {
  if (gameOver) return // Don’t move if game is over

  // Calculate next head position
  let head = { x: snakeBody[0].x + dir.x, y: snakeBody[0].y + dir.y }

  // Check for collision with wall or itself
  if (getTile(head.x, head.y).some(t => t.type === wall || t.type === snake)) {
    gameOver = true
    addText("Game Over!", { x: 5, y: 6, color: color`3` })
    return
  }

  // Add new head to the front
  snakeBody.unshift(head)

  // If snake eats apple
  if (head.x === appleX && head.y === appleY) {
    spawnApple() // Place new apple
  } else {
    snakeBody.pop() // Otherwise, remove tail
  }

  draw() // Redraw snake and apple
}

// Spawn apple at a random empty position
function spawnApple() {
  let x, y
  do {
    x = Math.floor(Math.random() * 14) + 1
    y = Math.floor(Math.random() * 6) + 1
  } while (snakeBody.some(p => p.x === x && p.y === y)) // Avoid spawning on snake

  appleX = x
  appleY = y
}

// Controls for direction
onInput("w", () => { if (dir.y !== 1) dir = { x: 0, y: -1 } }) // Up
onInput("s", () => { if (dir.y !== -1) dir = { x: 0, y: 1 } }) // Down
onInput("a", () => { if (dir.x !== 1) dir = { x: -1, y: 0 } }) // Left
onInput("d", () => { if (dir.x !== -1) dir = { x: 1, y: 0 } }) // Right

// Initial draw and start game loop
draw()
setInterval(move, 300) // Move snake every 300ms
