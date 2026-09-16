/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: collect the wood
@description: a game where you have to cut trees down and collect more and more wood. 
@author: Danshivam 
@tags: ['collect', 'trees']
@addedOn: 2026-09-12
*/

const player = "p"
const tree = "t"
const wood = "w"
const container = "c"
const pwChop = "h"
const pwPush = "m"
const pwDouble = "x"

setLegend(
  [player, bitmap`
................
................
.......22.......
......2222......
.......22.......
......444.......
.....44444......
....4444444.....
.....44444......
......4.4.......
......4.4.......
.....0...0......
.....0...0......
................
................
................`],

  [tree, bitmap`
................
.......55.......
......5555......
.....555555.....
....55555555....
.....555555.....
....55555555....
.....555555.....
.......33.......
.......33.......
.......33.......
.......33.......
................
................
................
................`],

  [wood, bitmap`
................
................
................
....333.....333.
...33333...33333
....363.....363.
...33333...33333
....333.....333.
................
................
................
................
................
................
................
................`],

  [container, bitmap`
................
................
................
................
...6666666......
...6......6.....
...6......6.....
...6......6.....
...6666666......
................
................
................
................
................
................
................`],

  [pwChop, bitmap`
................
................
.....7777.......
....777777......
...77777777.....
...77777777.....
....777777......
.....7777.......
................
................
................
................
................
................
................
................`],

  [pwPush, bitmap`
................
................
.....8888.......
....888888......
...88888888.....
...88888888.....
....888888......
.....8888.......
................
................
................
................
................
................
................
................`],

  [pwDouble, bitmap`
................
................
.....9999.......
....999999......
...99999999.....
...99999999.....
....999999......
.....9999.......
................
................
................
................
................
................
................
................`]
)

setMap(map`
..........
..........
....p.....
..........
..........
....c.....
..........
..........`)

// ----- state -----
let woodCount = 0
let hitsNeeded = 3
let pushLimit = 1
let doubleActive = false

let chopTimer = null
let pushTimer = null
let doubleTimer = null

let popupMessage = null
let popupTimer = null

function updateHUD() {
  clearText()
  addText(`Wood: ${woodCount}`, { x: 1, y: 1, color: color`0` })

  let status = []
  if (hitsNeeded === 1) status.push("1-Chop")
  if (pushLimit > 1) status.push(`Push x${pushLimit}`)
  if (doubleActive) status.push("2x Wood")
  if (status.length) addText(status.join(" "), { x: 1, y: 2, color: color`5` })

  if (popupMessage) {
    addText(popupMessage, { x: 1, y: 3, color: color`3` })
  }
}
updateHUD()

function showPopup(msg) {
  popupMessage = msg
  if (popupTimer) clearTimeout(popupTimer)
  popupTimer = setTimeout(() => {
    popupMessage = null
    updateHUD()
  }, 2000)
  updateHUD()
}

// ----- movement + chopping + pushing -----
function move(dx, dy) {
  const p = getFirst(player)
  const nx = p.x + dx
  const ny = p.y + dy

  if (nx < 0 || nx >= width() || ny < 0 || ny >= height()) return

  const t = getTile(nx, ny).find(s => s.type === tree)
  if (t) {
    t.hits = (t.hits || 0) + 1
    if (t.hits >= hitsNeeded) {
      const { x, y } = t
      t.remove()
      addSprite(x, y, wood)
    }
    return
  }

  const chain = []
  let cx = nx,
    cy = ny
  while (true) {
    const there = getTile(cx, cy).find(s => s.type === wood)
    if (!there) break
    chain.push(there)
    cx += dx
    cy += dy
  }

  if (chain.length > 0) {
    if (chain.length > pushLimit) return
    if (cx < 0 || cx >= width() || cy < 0 || cy >= height()) return
    const blocked = getTile(cx, cy).some(s => s.type === tree || s.type === wood)
    if (blocked) return

    for (let i = chain.length - 1; i >= 0; i--) {
      chain[i].x += dx
      chain[i].y += dy
    }
  }

  p.x = nx
  p.y = ny
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

// ----- powerup activation -----
function activateChop() {
  hitsNeeded = 1
  showPopup("One-hit chop!")
  if (chopTimer) clearTimeout(chopTimer)
  chopTimer = setTimeout(() => { hitsNeeded = 3;
    updateHUD() }, 10000)
}

function activatePush() {
  pushLimit = 3
  showPopup("Push up to 3 wood!")
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => { pushLimit = 1;
    updateHUD() }, 10000)
}

function activateDouble() {
  doubleActive = true
  showPopup("Double wood!")
  if (doubleTimer) clearTimeout(doubleTimer)
  doubleTimer = setTimeout(() => { doubleActive = false;
    updateHUD() }, 10000)
}

// ----- per-turn checks -----
afterInput(() => {
  tilesWith(wood, container).forEach(tile => {
    const piece = tile.find(s => s.type === wood)
    if (piece) {
      piece.remove()
      woodCount += doubleActive ? 2 : 1
      updateHUD()
    }
  })

  getAll(wood).forEach(piece => {
    if (piece.x <= 0 || piece.x >= width() - 1 || piece.y <= 0 || piece.y >= height() - 1) {
      piece.remove()
    }
  })

  tilesWith(player, pwChop).forEach(tile => {
    tile.find(s => s.type === pwChop).remove()
    activateChop()
  })
  tilesWith(player, pwPush).forEach(tile => {
    tile.find(s => s.type === pwPush).remove()
    activatePush()
  })
  tilesWith(player, pwDouble).forEach(tile => {
    tile.find(s => s.type === pwDouble).remove()
    activateDouble()
  })
})

// ----- spawning -----
function randomEmptyTile() {
  const w = width()
  const h = height()
  for (let i = 0; i < 20; i++) {
    const x = 1 + Math.floor(Math.random() * (w - 2))
    const y = 1 + Math.floor(Math.random() * (h - 2))
    if (getTile(x, y).length === 0) return { x, y }
  }
  return null
}

function spawnTree() {
  if (getAll(tree).length >= 5) return
  const spot = randomEmptyTile()
  if (spot) addSprite(spot.x, spot.y, tree)
}

function spawnPowerup() {
  const totalPowerups = getAll(pwChop).length + getAll(pwPush).length + getAll(pwDouble).length
  if (totalPowerups >= 2) return

  const spot = randomEmptyTile()
  if (!spot) return

  const roll = Math.random()
  const type = roll < 0.34 ? pwChop : roll < 0.67 ? pwPush : pwDouble
  addSprite(spot.x, spot.y, type)
}

setInterval(spawnTree, 4000)
setInterval(spawnPowerup, 10000)

// ----- background music -----
const bgMusic = tune`
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500,
500: G5^500 + F4~500,
500: C4~500,
500: D4^500`
playTune(bgMusic, Infinity)
