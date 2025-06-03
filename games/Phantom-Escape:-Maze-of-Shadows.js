// Phantom Escape - A maze escape game
// Objective: Escape the room and avoid danger!
// Controls: W A S D to move
// Author: YourName

// Define sprite characters
const player = "p"
const exit = "e"
const danger = "d"
const wall = "w"

// Define sprite graphics
setLegend(
  [player, bitmap`
................
....0000........
...099990.......
....0000........
................`],
  [exit, bitmap`
................
....3333........
...399993.......
....3333........
................`],
  [danger, bitmap`
................
....6666........
...688886.......
....6666........
................`],
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
)

// Make wall and player solid
setSolids([player, wall])

// Game state variables
let totalScore = 0
let currentRoom = 0
let dangerChance = 0.2

// List of level maps
let rooms = [
  map`
wwwww
wp..w
w...w
w..ew
wwwww`,
  map`
wwwww
w...w
wp..w
w..ew
wwwww`,
  map`
wwwww
w...w
w.e.w
w..pw
wwwww`
]

// Pick a random room index
function randomRoom() {
  return Math.floor(Math.random() * rooms.length)
}

// Decide randomly if the player encounters danger
function encounterDanger() {
  return Math.random() < dangerChance
}

// Load a room and show start text
function loadRoom(index) {
  clearText()
  setMap(rooms[index])
  addText("Escape the maze!", { y: 0, color: color`3` })
}

// Reset the game state
function resetGame() {
  totalScore = 0
  currentRoom = randomRoom()
  loadRoom(currentRoom)
}

// Player movement
onInput("w", () => getFirst(player).y--)
onInput("s", () => getFirst(player).y++)
onInput("a", () => getFirst(player).x--)
onInput("d", () => getFirst(player).x++)

// Game logic after input
afterInput(() => {
  let p = getFirst(player)
  let tile = getTile(p.x, p.y)

  // Win condition
  if (tile.some(t => t.type === exit)) {
    totalScore += 5
    addText("You escaped! +5", { y: 1, color: color`2` })
    currentRoom = randomRoom()
    loadRoom(currentRoom)
  }
  // Danger condition
  else if (encounterDanger()) {
    totalScore -= 1
    addText("Danger! -1", { y: 1, color: color`1` })
    currentRoom = randomRoom()
    loadRoom(currentRoom)
  }

  // Show score at bottom
  addText("Score: " + totalScore, { y: 15, color: color`0` })
})

// Start the game
resetGame()
