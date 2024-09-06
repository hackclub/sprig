// Define sprite characters
const player = "p"
const coin = "c"
const wall = "w"

// Set up the game legend
setLegend(
  [ player, bitmap`
0000.......00000
0220000000002220
0822222222222820
0220002220002200
020020020020020.
020222020222020.
020020020220020.
022000020000020.
022222282222220.
022222888222220.
022222222222220.
022222222222220.
002222222222200.
.0022222222200..
..00000000000...
................`],
  [ coin, bitmap`
................
................
................
................
................
......0000000000
.00..0CCCCCCCCC0
02200CCCCCCCCCC0
02222CCCCCCCCCC0
02222CCCCCCCCCC0
02200CCCCCCCCCC0
.00..0CCCCCCCCC0
......0000000000
................
................
................`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)

// Set up the game map
setMap(map`
wwwwwwwwwwwwwwww
w..............w
w..c...c...c...w
w..............w
w...c.....c....w
w..............w
w....c...c.....w
w..............w
w..c.......c...w
w..............w
w...c...c......w
w..............w
w......p.......w
w..............w
wwwwwwwwwwwwwwww`)

// Set solid objects
setSolids([player, wall])

// Game state
let score = 0

// Main game loop
function gameLoop() {
  // Check for coin collection
  const playerTile = getTile(getFirst(player).x, getFirst(player).y)
  const coinOnTile = playerTile.find(sprite => sprite.type === coin)
  
  if (coinOnTile) {
    coinOnTile.remove()
    score += 1
    updateScore()
  }

  // Check for win condition
  if (getAll(coin).length === 0) {
    addText("NOM NOMMMM!", { y: 8, color: color`H` })
    clearInterval(gameInterval)
  }
}

// Update score display
function updateScore() {
  clearText()
  addText(`Score: ${score}`, { y: 1, color: color`3` })
}

// Handle input
onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

// Start the game
updateScore()
const gameInterval = setInterval(gameLoop, 50)