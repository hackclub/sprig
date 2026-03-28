/*
@title: ZIBTE Random Maze
@author: Zak Boem
@tags: [maze, random]
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"

setLegend(
  [ player, bitmap`
.......000......
......07670.....
......06360.....
.......060......
........0.......
........0.......
......0.0.0.....
.......000......
........0.......
........0.......
........0.......
.......0.0......
......0...0.....
................
................
................` ],
  
  [ wall, bitmap`
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
0000000000000000` ],

  [ goal, bitmap`
................
................
................
.....5....5.....
.....5....5.....
.....555555.....
.....555555.....
.....555555.....
.....5....5.....
.....5....5.....
................
................
................
................
................
................` ]
)

// Define solids and pushables to enable collision physics
setSolids([player, wall])
setPushables({
  [ player ]: []
})

let isWon = false
let restartTimeout = null

// --- MAZE GENERATION LOGIC ---

function generateMaze() {
  isWon = false
  const w = 16
  const h = 16
  const mapArr = []

  // 1. Start with a grid full of walls
  for (let y = 0; y < h; y++) {
    let row = []
    for (let x = 0; x < w; x++) {
      row.push(wall)
    }
    mapArr.push(row)
  }

  // 2. Recursive Backtracking function to carve paths
  function carve(cx, cy) {
    mapArr[cy][cx] = "." // Dig the current spot

    // Possible directions: Up, Down, Left, Right (jumping 2 tiles to leave walls)
    const dirs = [
      [0, -2], [0, 2], [-2, 0], [2, 0]
    ]
    
    // Shuffle directions to make it random
    dirs.sort(() => Math.random() - 0.5)

    for (const [dx, dy] of dirs) {
      const nx = cx + dx
      const ny = cy + dy

      // Check if the new spot is inside the grid bounds
      // We use 'w-1' and 'h-1' to keep a border of walls around the edge
      if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1) {
        // If the spot is a wall, dig through to it
        if (mapArr[ny][nx] === wall) {
          mapArr[cy + dy/2][cx + dx/2] = "." // Knock down the wall in between
          carve(nx, ny) // Continue digging from the new spot
        }
      }
    }
  }

  // Start digging from top-left (1,1)
  carve(1, 1)

  // 3. Place Player and Goal
  mapArr[1][1] = player
  mapArr[13][13] = goal

  // 4. Convert the array to a text string for setMap
  return mapArr.map(row => row.join("")).join("\n")
}

// Start the game with a generated maze
setMap(generateMaze())

// --- INPUTS ---

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

// Restart key
onInput("k", () => {
  clearTimeout(restartTimeout)
  setMap(generateMaze())
})

// Win Check
afterInput(() => {
  const p = getFirst(player)
  const tilesOnPlayer = getTile(p.x, p.y)
  const goalSprite = tilesOnPlayer.find(tile => tile.type === goal)
  
  if (goalSprite && !isWon) {
    isWon = true
    goalSprite.remove() // Visual feedback: Trophy disappears
    // Auto restart after 3 seconds
    restartTimeout = setTimeout(() => {
      setMap(generateMaze())
    }, 3000)
  }
})