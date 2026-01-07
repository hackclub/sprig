/*
@title: Final Minute
*/

const player = "p"
const bot = "b"
const wall = "w"
const floor = "f"

// ----- SPRITES -----
setLegend(
  [ player, bitmap`
................
................
......0000......
.....022220.....
....02222220....
....02222220....
....02222220....
.....022220.....
......0000......
......0..0......
......0..0......
......0..0......
......0000......
......0..0......
.....00..00.....
................` ],

  [ bot, bitmap`
................
................
......3333......
.....3....3.....
....3.9999.3....
....3.9..9.3....
....3.9999.3....
.....3....3.....
......3333......
......3..3......
......3..3......
......3..3......
......3333......
......3..3......
.....33..33.....
................` ],

  [ wall, bitmap`
2222222222222222
2777777777777772
2722222222222272
2727777777777272
2727222222227272
2727277777777272
2727272222227272
2727277777777272
2727272222227272
2727277777777272
2727222222227272
2727777777777272
2722222222222272
2777777777777772
2222222222222222
2222222222222222` ],

  [ floor, bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666` ]
)

setSolids([wall])

// ----- STATE -----
let gameStarted = false
let gameOver = false
let it = "player"
let timeLeft = 120   // 2 MINUTES
let tagCooldown = 0
let frameCounter = 0

// ----- START GAME -----
function startGame() {
  gameStarted = true
  gameOver = false
  it = "player"
  timeLeft = 120
  tagCooldown = 0
  frameCounter = 0
  
  clearText()

  // BOUNDARIES FIXED: outer ring is all walls
  setMap(map`
wwwwwwwwwwwwwwww
w....w.....w...w
w.p..w.f...w...w
w....w.f...w...w
w.ffff.w.w.w...w
w......w.w.b...w
w......w.......w
wwwwwwwwwwwwwwww`)

  setPushables({ [player]: [] })
}

// ----- MOVEMENT -----
function tryMove(sprite, dx, dy) {
  if (!sprite || gameOver) return
  const nx = sprite.x + dx
  const ny = sprite.y + dy
  const tile = getTile(nx, ny)
  
  if (tile.some(t => t.type === wall)) return
  
  sprite.x = nx
  sprite.y = ny
  
  if (sprite.type === player) checkTag()
}

onInput("w", () => tryMove(getFirst(player), 0, -1))
onInput("s", () => tryMove(getFirst(player), 0, 1))
onInput("a", () => tryMove(getFirst(player), -1, 0))
onInput("d", () => tryMove(getFirst(player), 1, 0))

onInput("k", () => {
  if (gameOver) startGame()
})

// ----- TAG LOGIC -----
function checkTag() {
  if (tagCooldown > 0) return
  const p = getFirst(player)
  const b = getFirst(bot)
  if (!p || !b) return

  if (p.x === b.x && p.y === b.y) {
    it = it === "player" ? "bot" : "player"
    tagCooldown = 15
  }
}

// ----- BOT AI -----
function botMove() {
  const p = getFirst(player)
  const b = getFirst(bot)
  if (!p || !b) return

  const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  let bestMove = null
  let bestScore = it === "player" ? -999 : 999

  for (let [dx, dy] of moves) {
    const nx = b.x + dx
    const ny = b.y + dy
    const tile = getTile(nx, ny)
    if (tile.some(t => t.type === wall)) continue

    const dist = Math.abs(nx - p.x) + Math.abs(ny - p.y)
    if (it === "player") {
      if (dist > bestScore) { bestScore = dist; bestMove = [dx, dy] }
    } else {
      if (dist < bestScore) { bestScore = dist; bestMove = [dx, dy] }
    }
  }
  if (bestMove) tryMove(b, bestMove[0], bestMove[1])
}

// ----- GAME LOOP -----
setInterval(() => {
  if (!gameStarted || gameOver) return

  if (frameCounter % 2 === 0) {
    botMove()
    checkTag()
  }

  if (tagCooldown > 0) tagCooldown--

  if (frameCounter % 10 === 0) {
    timeLeft--
  }
  
  frameCounter++

  clearText()
  addText("Time: " + timeLeft, { y: 0 })
  addText("IT: " + it, { y: 1 })

  if (timeLeft <= 0) {
    gameOver = true
    clearText()
    addText(it === "player" ? "YOU LOSE" : "YOU WIN", { y: 5 })
    addText("Press K to Restart", { y: 7 })
  }
}, 100)

startGame()