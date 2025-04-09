/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Wolf and Eggs
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const wolf = "w"
const eggSprite = "e"

setLegend(
  [wolf, bitmap`
000000....000000
......0...0.....
......00000.....
000....0.0......
0.00..0..0..000.
0..00.0...0.0.00
0...0003.30.0..0
0...0.0...000..0
00..0.05550....0
.0....0...0....0
.0...0....0...00
.00..0...0....0.
..000.000000..0.
......0.0..0000.
.....00.00......
................`],
  [eggSprite, bitmap`
................
................
................
................
................
................
................
.......00.......
.....0....0.....
....0......0....
....0......0....
....0......0....
.....0....0.....
.......00.......
................
................`]
)

setSolids([])

let score = 0

// Egg spawn and fall behavior
const eggPaths = [
  { x: 1, spawnY: 0, catchY: 6 },  // Left side
  { x: 6, spawnY: 0, catchY: 6 }   // Right side
]

let wolfPos = 0
let eggs = []

// Place the wolf at the correct position
function placeWolf() {
  getAll(wolf).forEach(w => w.remove())
  const pos = eggPaths[wolfPos]
  addSprite(pos.x, pos.catchY, wolf)
}

// Set up the map (empty background)
setMap(map`
........
........
........
........
........
........
........`)
placeWolf()

// Control inputs to move the wolf
onInput("a", () => { wolfPos = 0; placeWolf() }) // Move left
onInput("d", () => { wolfPos = 1; placeWolf() }) // Move right

// Function to spawn a new egg
function spawnEgg() {
  const i = Math.floor(Math.random() * 2)  // Randomly choose left or right
  const { x, spawnY } = eggPaths[i]
  eggs.push({ path: i, x: x, y: spawnY })
}

// Function to update all eggs
function updateEggs() {
  eggs.forEach(egg => egg.y += 1)  // Move eggs down by 1 unit

  for (let i = eggs.length - 1; i >= 0; i--) {
    const egg = eggs[i]
    const end = eggPaths[egg.path]
    
    // If the egg has reached or passed the catchY
    if (egg.y >= end.catchY) {
      const wolfSpot = eggPaths[wolfPos]
      
      // If the egg is caught
      if (egg.x === wolfSpot.x && egg.y === wolfSpot.catchY) {
        score++  // Increase score on catch
      } else {
        score = 0  // Reset score if the egg is missed
      }

      clearText()
      addText(`Score: ${score}`, { x: 1, y: 0, color: color`3` })

      // Remove the egg after processing (caught or missed)
      eggs.splice(i, 1)
    }
  }
}

// Function to draw all falling eggs on the screen
function drawEggs() {
  getAll(eggSprite).forEach(e => e.remove())  // Remove existing eggs
  eggs.forEach(egg => addSprite(egg.x, egg.y, eggSprite))  // Draw the eggs
}

// Main game loop to spawn, update and draw eggs
setInterval(() => {
  if (Math.random() < 0.7) spawnEgg()  // Random egg spawn
  updateEggs()  // Update positions of eggs
  drawEggs()    // Draw updated eggs
}, 600)

// Update score display after each move
afterInput(() => {

})