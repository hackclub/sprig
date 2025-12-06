/*
@title: Battleship+
*/

// --- SYMBOLS ---
const player = "p"
const water = "w"
const hit = "h"    // yellow hit marker
const miss = "x"
const hiddenship = "s" // invisible enemy ship sprite

let gameState = "start" // "start", "play", "end"
let playerInputEnabled = false
let playerLives = 3

const winSound = tune`16000`
const lossSound = tune`
1666.66,
833.33: A4~833 + C4/833,
833.33: A4~833,
833.33: A4~833 + C4/833,
833.33: F4~833 + G4-833,
833.33: E4^833 + F4-833,
833.33: D4^833 + E4-833,
833.33: C4^833 + D4-833,
19166.66`

// --- SPRITES ---
setLegend(
  [player, bitmap`
LLLLLLLLLLLLLLLL
L77777777777777L
L77777777777777L
L77777722777777L
L77777700777777L
L77700000000777L
L77700000000777L
L77777700777777L
L77777000077777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
L77777777777777L
LLLLLLLLLLLLLLLL`],

  [water, bitmap`
7777755577555555
5555775555577755
7777755577775557
5555555555555555
5555777555557775
5777755577777555
5555555555555555
7775557777555577
5555777555557775
5555555555555555
7777755555555777
5555557777757755
7755577555555557
5557555577777777
7555577775555577
5557775555577755`],

  [hiddenship, bitmap`
................
................
................
................
................
................
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

  [hit, bitmap `
....66666666....
...6666666666...
..666666666666..
.66666666666666.
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
.66666666666666.
..666666666666..
...6666666666...
....66666666....`],

  [miss, bitmap `
....22222222....
...2222222222...
..222222222222..
.22222222222222.
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
.22222222222222.
..222222222222..
...2222222222...
....22222222....`]
)

setBackground(water)
setSolids([])

//
// Utility: remove all sprites (keeps the map intact)
//
function clearSprites() {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      const ts = getTile(x, y)
      ts.forEach(t => {
        // remove all sprites (map tiles remain)
        try { t.remove() } catch (e) {}
      })
    }
  }
}

//
// Start screen (keeps map present)
//
function showStartScreen() {
  clearSprites()
  clearText()
  setMap(map`
.......
.......
.......
...p...
.......
.......
.......`)
  addText(" BATTLESHIP ", {x: 1, y: 2, color: color`3`})
  addText("PRESS L", {x: 2, y: 4, color: color`3`})
  addText("TO START", {x: 2, y: 5, color: color`3`})
  gameState = "start"
  playerInputEnabled = false
}

showStartScreen()

// ============================
// GAME VARS / PLACEMENT
// ============================
let ships = []    // list of enemy ship coords (for placement uniqueness)
let enemyShots = []

function randomCoord() {
  return { x: Math.floor(Math.random()*7), y: Math.floor(Math.random()*7) }
}

function placeShip(size) {
  let valid = false
  let coords = []
  while (!valid) {
    coords = []
    const horizontal = Math.random() < 0.5
    const start = randomCoord()
    for (let i = 0; i < size; i++) {
      const x = start.x + (horizontal ? i : 0)
      const y = start.y + (horizontal ? 0 : i)
      if (x > 6 || y > 6) break
      coords.push({x, y})
    }
    valid = coords.length === size && coords.every(c =>
      !ships.some(s => s.x === c.x && s.y === c.y)
    )
  }
  coords.forEach(c => {
    ships.push(c)
    addSprite(c.x, c.y, hiddenship) // invisible on purpose (green concept kept)
  })
}

function placeAllShips() {
  ships = []
  placeShip(2)
  placeShip(3)
  placeShip(3)
}

function resetGame() {
  clearSprites()
  clearText()
  playerLives = 3
  playerInputEnabled = true
  gameState = "play"
  setMap(map`
p......
.......
.......
.......
.......
.......
.......`)
  enemyShots = []
  placeAllShips()
}

// ============================
// CONTROLS (WASD)
// ============================
onInput("w", () => { if (playerInputEnabled) getFirst(player).y -= 1 })
onInput("s", () => { if (playerInputEnabled) getFirst(player).y += 1 })
onInput("a", () => { if (playerInputEnabled) getFirst(player).x -= 1 })
onInput("d", () => { if (playerInputEnabled) getFirst(player).x += 1 })

// ============================
// SHOOT (L)
// ============================
onInput("l", () => {
  if (gameState === "start") {
    resetGame()
    return
  }
  if (gameState !== "play") return
  if (!playerInputEnabled) return

  const px = getFirst(player).x
  const py = getFirst(player).y
  const tile = getTile(px, py)

  const hasShip = tile.some(t => t.type === hiddenship)
  const hasHit = tile.some(t => t.type === hit)
  const hasMiss = tile.some(t => t.type === miss)

  if (hasHit || hasMiss) return

  if (hasShip) {
    // only remove hidden-ship sprites so player and other sprites stay
    tile.filter(t => t.type === hiddenship).forEach(s => s.remove())
    addSprite(px, py, hit) // yellow marker
    playTune(winSound)
  } else {
    addSprite(px, py, miss)
  }

  // enemy shoots back after a short delay
  setTimeout(() => {
    enemyShoot()
    checkEndConditions()
  }, 120)
})

// ============================
// ENEMY SHOOT (AI)
// ============================
function enemyShoot() {
  let x, y, tile
  do {
    x = Math.floor(Math.random()*7)
    y = Math.floor(Math.random()*7)
    tile = getTile(x, y)
  } while (tile.some(t => t.type === miss || t.type === hit))

  // if enemy hits player, decrement lives and show text
  if (tile.some(t => t.type === player)) {
    playerLives -= 1
    addText("YOU WERE HIT!", {x: 0, y: 0, color: color`3`})
    playTune(lossSound)
    if (playerLives <= 0) {
      addText("YOU LOSE", {x: 2, y: 3, color: color`3`})
      playerInputEnabled = false
      gameState = "end"
      addText("PRESS J TO RESTART", {x: 0, y: 5, color: color`3`})
    }
    return
  }

  // otherwise show enemy miss visually
  addSprite(x, y, miss)

  // also ensure enemy's shot removes any hidden ship(s) at that tile (keeps win logic correct)
  tile.filter(t => t.type === hiddenship).forEach(s => s.remove())
}

// ============================
// END CHECK
// ============================
function checkEndConditions() {
  if (gameState !== "play") return

  // win if no more hidden-ship sprites
  if (tilesWith(hiddenship).length === 0) {
    addText("YOU WIN!", {x: 2, y: 3, color: color`3`})
    playTune(winSound)
    playerInputEnabled = false
    gameState = "end"
    addText("PRESS J TO RESTART", {x: 0, y: 5, color: color`3`})
    return
  }
}

// ============================
// RESTART (J)
// ============================
onInput("j", () => {
  clearSprites()
  clearText()
  showStartScreen()
})

// keep checking end each input cycle (safety)
afterInput(() => {
  if (gameState === "play") checkEndConditions()
})

