/*
@title: Raincatch
@author: A Malladi
@tags: ['endless']
@addedOn: 2023-12-31
*/


const player = "p"
const raindrop = "d" // Added raindrop symbol

let score = 0

setLegend(
  [ 
    player, 
    bitmap`
....LLLL0000....
..LL1111LLLL00..
.0111111LLLLLL0.
.001111LLLLLL0L.
.0L0011LLLL001L.
.0L1L000000111L.
.0LL1L11111211L.
.0LLL1L1111211L.
.0LL1L11112111L.
..0LL1L111211L..
..0LLL1L11111L..
..0LLLL111111L..
...0LL1L1111L...
...0LLL1L11LL...
....0L1L111L....
....00000000....` 
  ],
  [
  raindrop,
  bitmap`
.......0........
......070.......
......0770......
......0770......
.....077770.....
.....077270.....
....0577270.....
...005777270....
..05557772770...
..055777727770..
..055777777770..
...0555577770...
...0555577770...
....05555550....
....00555500....
......0000......`
  ]
)

setSolids([])

let level = 0
const levels = [
  map`
...........
...........
...........
...........
...........
...........
...........
....p......`
]

setMap(levels[level])

setPushables({
  [player]: []
})

setPushables({
  [raindrop]: [] // Initialize an empty array for raindrops
})

function getRandomEmptyCell() {
  const emptyCells = []
  for (let x = 0; x < 11; x++) {  // Iterate over the x-axis of the map
    if (getTile(x, 0).length === 0) {
      emptyCells.push(x)
    }
  }
  
  return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null; //take a random empty cell
}

function spawnRaindrop() {
  const emptyCell = getRandomEmptyCell()
  addSprite(emptyCell, 0, raindrop)
}

function moveRaindrops() {
  for (const raindropSprite of getAll(raindrop)) {
    raindropSprite.y += 1 // Make raindrops fall downward
  }
}

function delRaindrop() {
  const playerX = getFirst(player).x
  for (const raindropSprite of getAll(raindrop)) {
    if (raindropSprite.y === height() - 1) {
      // Display a message when raindrop reaches the bottom


      if (raindropSprite.x !== playerX) {
        // Clear raindrop if player is not in the same column
        clearTile(raindropSprite.x, raindropSprite.y)
      }
    }
    if (raindropSprite.x === playerX && raindropSprite.y === height()-2) {
      score += 1 //increment score if raindrop caught
      clearTile(raindropSprite.x, raindropSprite.y)
    }
  }
}

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("i", () => {
  score = 0
})

let frameCount = 0;

function frameUpdate() {
  clearText()
  if(frameCount<20){
    addText("Catch the rain!", {x: 2, y: 5, color: color`5`})
  }
  addText(`Score: ${score}; Reset=i`, {x: 0, y: 1, color: color`0`})
  delRaindrop()
  moveRaindrops()
  if (Math.floor(Math.random() * 5) === 0) {
    spawnRaindrop()
  }
  frameCount += 1
}

setInterval(frameUpdate, 200)

afterInput(() => {
})