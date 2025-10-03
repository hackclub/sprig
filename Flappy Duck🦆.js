/*
@title: Fallpy Duck!🦆
@author: DD
@description: Flappy Duck is a cute one-button arcade game: you control a little pixel duck that constantly falls and must flap through a never-ending series of procedurally generated pipe columns. The goal is simple — stay alive as long as you can, pass as many gaps as possible, and beat your high score.
@tags: [flappy, jump, fun, easy, ongoing]
@addedOn: 2025-9-23
*/

const player = "p"
const pipe = "b"
const fallbackPlayer = "d" // fallback sprite key (always defined here)

// Legend: include player, a pipe, and a fallback duck (so addSprite can at least use fallback)
setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ pipe, bitmap`
................
................
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
................
................
................` ],
  // fallback duck: simple visible square so we can still spawn a player
  [ fallbackPlayer, bitmap`
................
................
................
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
....22222222....
................
................
................
................
................
................` ]
)

// basic empty map
setMap(map`
................
................
................
................
................
................
................
................`)

setSolids([])

// Game constants
const START_X = 3
const START_Y = 3
const TICK_MS = 120

let running = false
let duck = null
let columns = []
let score = 0
let highScore = 0
let tickCount = 0
let pipeTimer = 0

// Debug helper: show info in console and on-screen (short)
function debugInfo(msg) {
  console.log(msg)
  // small on-screen log (keeps only last message)
  clearText()
  addText(msg, { x: 0, y: 0, color: color`3` })
}

// Try to create a sprite with two attempts: preferredKey then fallbackKey
function tryAddSprite(x, y, preferredKey, fallbackKey) {
  // clamp coordinates
  const cx = Math.max(0, Math.min(width() - 1, x))
  const cy = Math.max(0, Math.min(height() - 1, y))

  const s1 = addSprite(cx, cy, preferredKey)
  if (s1) {
    console.log(`addSprite succeeded with preferred key '${preferredKey}' at (${cx},${cy})`)
    return { sprite: s1, usedFallback: false }
  }

  console.log(`addSprite failed with preferred key '${preferredKey}', trying fallback '${fallbackKey}'`)

  const s2 = addSprite(cx, cy, fallbackKey)
  if (s2) {
    console.log(`addSprite succeeded with fallback key '${fallbackKey}' at (${cx},${cy})`)
    return { sprite: s2, usedFallback: true }
  }

  console.log(`addSprite failed for both '${preferredKey}' and '${fallbackKey}'`)
  return { sprite: null, usedFallback: null }
}

function spawnPlayer() {
  // remove any existing players
  getAll(player).forEach(s => s.remove())
  getAll(fallbackPlayer).forEach(s => s.remove())

  // helpful debug info about map
  console.log("Map size:", width(), "x", height())

  const result = tryAddSprite(START_X, START_Y, player, fallbackPlayer)

  if (!result.sprite) {
    // cannot create player; give clear on-screen error and stop running
    console.log("ERROR: Could not create player sprite with either key.")
    clearText()
    addText("ERROR: Could not create player sprite.", { x: 0, y: 0, color: color`2` })
    addText("Check legend keys and map size.", { x: 0, y: 1, color: color`2` })
    running = false
    return null
  }

  // set vy safely (some older Sprig runtimes may not preserve custom properties, but many do)
  const spr = result.sprite
  spr.vy = 0
  if (result.usedFallback) {
    console.log("Note: using fallback player sprite. If you expect 'p' to exist, check setLegend.")
  }

  return spr
}

function resetGame() {
  running = false
  // remove all pipes
  getAll(pipe).forEach(s => s.remove())
  columns = []
  score = 0
  tickCount = 0
  pipeTimer = 0

  clearText()
  addText("Score: 0", { x: 0, y: 0, color: color`3` })

  duck = spawnPlayer()
  if (!duck) {
    // spawn failed and spawnPlayer already set running = false and showed message
    return
  }

  running = true
}

// small tick just to show the defensive behavior — no pipes here for brevity
function tick() {
  if (!running) return
  if (!duck) return

  tickCount++

  // gravity: initialize vy if missing
  duck.vy = (duck.vy || 0) + 1
  duck.vy = Math.min(3, duck.vy)
  duck.y += duck.vy

  // out of bounds -> game over
  if (duck.y < 0 || duck.y >= height()) {
    running = false
    clearText()
    addText("Game Over (OOB). Press W to restart", { x: 1, y: 3, color: color`2` })
  }
}

onInput("w", () => {
  if (!running) {
    resetGame()
    return
  }
  if (!duck) return
  duck.vy = -2
  duck.y += duck.vy
})

resetGame()
const loop = setInterval(tick, TICK_MS)
