const player = "p"
const tacos = "t"



setLegend(
  [
    player,
    bitmap`
.....5555555....
....559999955...
....990999099...
....990999099...
....999999999...
....999000099...
....990999909...
....999000099...
........00......
.....0..00..0...
.....0..00..0...
......000000....
........00......
........00......
.......0000.....
......00..00....`
  ],
  [
    tacos,
    bitmap`
................
................
................
................
................
......0000000...
...000CCCCCC0...
...04666666440..
...04666666640..
..046620620640..
..0466006006440.
.0C663363366640.
.04666666666640.
04666666666666C0
0466666666666640
0000000000000000`
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
.....p.....`
]

setMap(levels[level])

setPushables({
  [player]: []
})

setPushables({
  [tacos]: []
})

function getRandomEmptyCell() {
  const emptyCells = []
  for (let x = 0; x < 11; x++) {
    if (getTile(x, 0).length === 0) {
      emptyCells.push(x)
    }
  }

  return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
}

function spawnTaco() {
  const emptyCell = getRandomEmptyCell()
  addSprite(emptyCell, 0, tacos)
}

function moveTacos() {
  for (const tacoSprite of getAll(tacos)) {
    if (tacoSprite.y < height() - 1) { // Check if taco is not at the bottom
      tacoSprite.y += 1; // Move tacos downward
    } else {
      clearTile(tacoSprite.x, tacoSprite.y); // Clear taco when it reaches the bottom
    }
  }
}


function handleCollision() {
  const playerX = getFirst(player).x;
  for (const tacoSprite of getAll(tacos)) {
    if (tacoSprite.y === height() - 1 && tacoSprite.x === playerX) {
      gameOver(); // Game Over if player is hit by a taco
    }
  }
}


function gameOver() {
  clearText(); // Clear all text
  // Display Game Over message
  addText("Game Over!", { x: 4, y: 5, color: color`8` });
  addText("Press j to reset", { x: 4, y: 6, color: color`8` });
}


onInput("a", () => {
    getFirst(player).x -= 1;
})

onInput("d", () => {
  getFirst(player).x += 1
})

let frameCount = 0;

function frameUpdate() {
  handleCollision()
  moveTacos()
  if (Math.floor(Math.random() * 4) === 0) {
    spawnTaco()
  }
  frameCount += 1
}
// Add an event listener for the "j" key input to reset the game
onInput("j", () => {
  resetGame()
})

function resetGame() {
  // Clear all sprites and text on the screen
  clearText()

  // Reset player position or add player if not present
let playerSprite = getFirst(player);
if (!playerSprite) {
  // If player sprite doesn't exist, add a new one at position (4, 7)
  addSprite(4, 7, player);
  playerSprite = getFirst(player); // Retrieve the newly added player sprite
}
  if (!playerSprite) {
    // If player is not present, add a new one at position (4, 7)
    addSprite(4, 7, player);
  } else {
    // Reset player position if player exists
    playerSprite.x = 4;
    playerSprite.y = 7;
  }

  // Reset frame count
  frameCount = 0

  // Clear any game over messages
}



setInterval(frameUpdate, 200)

afterInput(() => {})