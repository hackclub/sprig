/*
@title: GremlinExpress
@author: Popbytes
@tags: []
@addedOn: 2025-05-21
*/
const GREMLIN = "v"
const PATROL1 = "g"
const PATROL2 = "h"
const FLOOR = "f"
const WALL = "x"
const LEVER = "l"
const EXIT = "e"
const POWERUP = "u"

let gameState = "menu"
let chaos = 0
let chaosLimit = 3
let guardSpeed1 = 500
let guardSpeed2 = 700
let guardInterval1
let guardInterval2
let timeLeft = 60
let timerInterval

const menuMap = map`
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff
ffffffffffffffff`

const levels = [
  map`
xxxxxxxxxxxxxxxx
xfflfffffffflfff
xffxggfffffffefx
xffffxxfffffflff
xfflfffffffffffx
xfffffffffflffff
xxxxxxxvffffffff
xxxxxxxxxxxxxxxx`,

  map`
xxxxxxxxxxxxxxxx
xffflfffeflfffff
xffxgfffffffleef
xffffxxfffffffff
xfffffffffflffff
xfflfffffffeflff
xxxxxxxvffffffff
xxxxxxxxxxxxxxxx`,

  map`
xxxxxxxxxxxxxxxx
xflfffllffffffff
xffxghxxxxxxleef
xffffxxfffffflff
xfffffffffflflff
xflffffffffffflf
xxxxxxxvffffffff
xxxxxxxxxxxxxxxx`
]

setLegend(
  [GREMLIN, bitmap`
................
................
................
.......3........
......333.......
......333.......
.......3........
......3.3.......
......3.3.......
.......3........
......3.3.......
.....3...3......
.....3...3......
......333.......
................
................`],
  [PATROL1, bitmap`
................
................
......666.......
.....68886......
....6888886.....
....6888886.....
.....68886......
......666.......
................
................
......6.........
......666.......
......6.6.......
......6.........
................
................`],
  [PATROL2, bitmap`
................
................
......444.......
.....45554......
....4555554.....
....4555554.....
.....45554......
......444.......
................
................
......4.........
......444.......
......4.4.......
......4.........
................
................`],
  [FLOOR, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [WALL, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [LEVER, bitmap`
................
................
................
.......22.......
.......22.......
.......22.......
.......22.......
......2..2......
......2..2......
......2..2......
......2222......
.......22.......
................
................
................
................`],
  [POWERUP, bitmap`
................
................
................
.......5........
......555.......
.......5........
................
................
................
................
................
................
................
................
................
................`],
  [EXIT, bitmap`
................
................
......3333......
.....3....3.....
....3.33.33.....
....3.3.3.3.....
.....3....3.....
......3333......
................
................
................
................
................
................
................
................`]
)

setBackground(FLOOR)

function showMenu() {
  gameState = "menu"
  clearInterval(guardInterval1)
  clearInterval(guardInterval2)
  clearInterval(timerInterval)
  clearText()
  setMap(menuMap)
  addText("GREMLIN EXPRESS", { y: 1, color: color`cyan` })
  addText("i: Easy  k: Med", { y: 3 })
  addText("l: Hard", { y: 4 })
  addText("WASD: Move  J: Use", { y: 5 })
  addText("Press i/k/l to go", { y: 7 })
}


function configureDifficulty(key) {
  if (key === "i") { chaosLimit = 2; guardSpeed1 = 800; guardSpeed2 = 900; timeLeft = 90 }
  if (key === "k") { chaosLimit = 3; guardSpeed1 = 500; guardSpeed2 = 700; timeLeft = 60 }
  if (key === "l") { chaosLimit = 4; guardSpeed1 = 300; guardSpeed2 = 500; timeLeft = 45 }
}

function startGame() {
  gameState = "playing"
  chaos = 0
  updateChaos()
  clearText()
  const lvl = levels[Math.floor(Math.random() * levels.length)]
  setMap(lvl)
  setSolids([GREMLIN, WALL])
  spawnPowerup()
  clearInterval(guardInterval1)
  clearInterval(guardInterval2)
  guardInterval1 = setInterval(() => moveGuard(PATROL1, 1), guardSpeed1)
  guardInterval2 = setInterval(() => moveGuard(PATROL2, -1), guardSpeed2)
  startTimer()
}

function moveGuard(type, dir) {
  const g = getFirst(type)
  const p = getFirst(GREMLIN)
  if (!g || !p) return

  // Chase logic: If on same row, move horizontally toward player if possible
  if (g.y === p.y) {
    let step = p.x > g.x ? 1 : -1
    let nx = g.x + step
    if (!getTile(nx, g.y).some(t => t.type === WALL)) {
      g.x = nx
      return
    }
  }

  // If on same column, move vertically toward player if possible
  if (g.x === p.x) {
    let step = p.y > g.y ? 1 : -1
    let ny = g.y + step
    if (!getTile(g.x, ny).some(t => t.type === WALL)) {
      g.y = ny
      return
    }
  }

  // Patrol logic: move up/down or down/up depending on direction and walls
  let newDir = g.direction ?? dir
  const ny = g.y + newDir
  if (getTile(g.x, ny).some(t => t.type === WALL)) newDir = -newDir
  g.direction = newDir
  g.y += newDir
}

function spawnPowerup() {
  // Avoid spawning on walls or guards or player
  let x, y
  do {
    x = Math.floor(Math.random() * 14) + 1
    y = Math.floor(Math.random() * 6) + 1
  } while (
    getTile(x, y).some(t => [WALL, PATROL1, PATROL2, GREMLIN, LEVER, EXIT].includes(t.type))
  )
  addSprite(x, y, POWERUP)
}

function startTimer() {
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeLeft--
    clearText()
    addText(`CHAOS: ${chaos}/${chaosLimit}`, { y: 0, color: color`red` })
    addText(`TIME: ${timeLeft}s`, { y: 1, color: color`yellow` })
    if (timeLeft <= 0) {
      endGame(false)
    }
  }, 1000)
}

function updateChaos() {
  clearText()
  addText(`CHAOS: ${chaos}/${chaosLimit}`, { y: 0, color: color`red` })
}

function endGame(win) {
  clearInterval(guardInterval1)
  clearInterval(guardInterval2)
  clearInterval(timerInterval)
  gameState = "menu"
  clearText()
  addText(win ? "ESCAPED!" : "CAUGHT/TIME UP", { y: 3, color: win ? color`green` : color`red` })
  addText("Press i/k/l to go", { y: 5 })
}


onInput("i", () => { if (gameState === "menu") { configureDifficulty("i"); startGame() } })
onInput("k", () => { if (gameState === "menu") { configureDifficulty("k"); startGame() } })
onInput("l", () => { if (gameState === "menu") { configureDifficulty("l"); startGame() } })

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

onInput("j", () => {
  if (gameState !== "playing") return
  const p = getFirst(GREMLIN)
  if (!p) return
  const here = getTile(p.x, p.y)
  if (here.some(t => t.type === LEVER)) {
    chaos++
    updateChaos()
    if (chaos >= chaosLimit) addText("MAX CHAOS! GET TO EXIT!", { y: 6, color: color`purple` })
  }
  if (here.some(t => t.type === POWERUP)) {
    chaos = Math.max(0, chaos - 1)
    clearTile(p.x, p.y)
    spawnPowerup()
    updateChaos()
  }
})

function movePlayer(dx, dy) {
  if (gameState !== "playing") return
  const p = getFirst(GREMLIN)
  if (!p) return
  const nx = p.x + dx
  const ny = p.y + dy
  if (nx < 0 || nx >= 16 || ny < 0 || ny >= 8) return
  const targetTile = getTile(nx, ny)
  if (targetTile.some(t => t.type === WALL)) return
  p.x = nx
  p.y = ny

  if (targetTile.some(t => t.type === EXIT)) {
    if (chaos >= chaosLimit) {
      endGame(true)
    } else {
      addText("Pull all levers first!", { y: 6, color: color`orange` })
    }
  }

  if (targetTile.some(t => t.type === PATROL1 || t.type === PATROL2)) {
    endGame(false)
  }
}

showMenu()
