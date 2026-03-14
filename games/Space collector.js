/*
@title: Space collector
@author: Gabouin
@description: you are the pilot of the spaceship and need to collect all the coins to unlock the acces to other maps via the portals. But be aware... rocks are here to block you and aliens are here to follow you and kill you if they touch you. Don't worry, you have 3 lives !
@tags: ['space', 'shooter']
@addedOn: 2026-03-15
*/
const SHIP   = "p"
const WALL   = "w"
const COIN   = "c"
const ROCK   = "r"
const LASER  = "l"
const PORTAL = "o"
const ENEMY  = "e"
const BG     = "b"

setLegend(
  [BG, bitmap`
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
0000000000000000`],

  [SHIP, bitmap`
................
.......33.......
.......33.......
......3333......
.....333333.....
....33333333....
.....333333.....
...5.333333.5...
..55.333333.55..
.55..333333..55.
.5....3333....5.
......3333......
.......33.......
................
................
................`],

  [ROCK, bitmap`
................
......7777......
....77733777....
...777333377....
..77333333377...
..73333333337...
..73333333337...
..77333333377...
...777333377....
....77733777....
......7777......
................
................
................
................
................`],

  [COIN, bitmap`
................
................
.....666666.....
...6666666666...
...666....666...
..6666.6666666..
..6666.6666666..
..6666....6666..
..6666666.6666..
..6666666.6666..
..6666....6666..
...6666666666...
...6666666666...
.....666666.....
................
................`],

  [LASER, bitmap`
................
.......55.......
.......55.......
.......66.......
.......66.......
.......55.......
.......55.......
................
................
................
................
................
................
................
................
................`],

  [PORTAL, bitmap`
................
.....333333.....
....33300333....
...3330000333...
..330000000033..
..300033330003..
..300333333003..
..300033330003..
..330000000033..
...3330000333...
....33300333....
.....333333.....
................
................
................
................`],

  [ENEMY, bitmap`
................
.....22222......
...222222222....
..2222222222....
..2224444222....
..2224444222....
...222222222....
..2224444222....
..2224444222....
..2222222222....
...222222222....
.....22222......
................
................
................
................`],

  [WALL, bitmap`
................
................
...2222222222...
...2222222222...
...1111111111...
...1111111111...
...2222222222...
...2222222222...
...1111111111...
...1111111111...
...2222222222...
...2222222222...
................
................
................
................`]
)

setBackground(BG)

const levels = [
  map`
wwwwwwwwwwwwwwww
we.............w
w.cr.......c...w
w...........r..w
w...c........c.w
w.......r......w
w......p.......w
w....r.........w
w...c.....r.c..w
w.r............w
w..c........c..w
w......oo..e...w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..r...er...r..w
w...c.......c..w
w..............w
w..c.........c.w
w....r.........w
w......p.......w
w...........r..w
w.cr........c..w
w..............w
w..c.......c...w
w..e...oo....e.w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..r.e.....r...w
w..c.........c.w
w.........r....w
w.c......c..e.cw
w..r...........w
w......p.......w
w...........r..w
w.c...........cw
w....r...c.r...w
w..c.........c.w
w.e....oo....e.w
wwwwwwwwwwwwwwww`
]

let currentLevel  = 0
let totalCoins    = 0
let allCoins      = 0
let lives         = 3
let laserCooldown = 0
let moveCounter   = 0
let gameOver      = false
let levelStars    = []

setSolids([SHIP, WALL, ROCK])
setPushables({ [SHIP]: [] })

function countCoins() {
  return getAll(COIN).length
}

function loadLevel(n) {
  setMap(levels[n])
  laserCooldown = 0
  moveCounter   = 0
  gameOver      = false
  totalCoins    = 0
  allCoins      = countCoins()
  updateHUD()
}

function updateHUD() {
  clearText()
  const h = lives === 3 ? "vvv" : lives === 2 ? "vv." : "v.."
  addText(h, { x: 1., y: 0, color: color`3` })
  const rem = countCoins()
  addText(totalCoins + "/" + allCoins, { x: 7, y: 0, color: color`3` })
  addText("N" + (currentLevel + 1), { x: 14, y: 0, color: color`3` })
  if (rem === 0) {
    addText("GO", { x: 7, y: 11, color: color`3` })
  }
}

loadLevel(0)

onInput("w", () => { if (!gameOver) { const s = getFirst(SHIP); if (s) s.y -= 1 } })
onInput("s", () => { if (!gameOver) { const s = getFirst(SHIP); if (s) s.y += 1 } })
onInput("a", () => { if (!gameOver) { const s = getFirst(SHIP); if (s) s.x -= 1 } })
onInput("d", () => { if (!gameOver) { const s = getFirst(SHIP); if (s) s.x += 1 } })

onInput("i", () => {
  if (gameOver) {
    lives = 3; currentLevel = 0; levelStars = []
    loadLevel(0)
    return
  }
  if (laserCooldown > 0) return
  const ship = getFirst(SHIP)
  if (!ship) return
  addSprite(ship.x, ship.y - 1, LASER)
  laserCooldown = 2
})

function moveEnemies() {
  const ship = getFirst(SHIP)
  if (!ship) return
  getAll(ENEMY).forEach(enemy => {
    const dx = ship.x - enemy.x
    const dy = ship.y - enemy.y
    if (Math.abs(dx) >= Math.abs(dy)) {
      const nx = enemy.x + Math.sign(dx)
      const blocked = getTile(nx, enemy.y).some(
        s => s.type === WALL || s.type === ROCK || s.type === ENEMY
      )
      if (!blocked) enemy.x = nx
      else {
        const ny = enemy.y + Math.sign(dy)
        const b2 = getTile(enemy.x, ny).some(
          s => s.type === WALL || s.type === ROCK || s.type === ENEMY
        )
        if (!b2) enemy.y = ny
      }
    } else {
      const ny = enemy.y + Math.sign(dy)
      const blocked = getTile(enemy.x, ny).some(
        s => s.type === WALL || s.type === ROCK || s.type === ENEMY
      )
      if (!blocked) enemy.y = ny
      else {
        const nx = enemy.x + Math.sign(dx)
        const b2 = getTile(nx, enemy.y).some(
          s => s.type === WALL || s.type === ROCK || s.type === ENEMY
        )
        if (!b2) enemy.x = nx
      }
    }
  })
}

function killPlayer() {
  lives--
  if (lives <= 0) {
    gameOver = true
    clearText()
    addText("MORT",      { x: 6, y: 4, color: color`0` })
    addText("I RESTART", { x: 3, y: 7, color: color`0` })
  } else {
    setMap(levels[currentLevel])
    laserCooldown = 0
    moveCounter   = 0
    allCoins      = countCoins()
    totalCoins    = 0
    updateHUD()
  }
}

afterInput(() => {
  if (gameOver) return
  const ship = getFirst(SHIP)
  if (!ship) return

  if (laserCooldown > 0) laserCooldown--

  getAll(LASER).forEach(l => {
    l.y -= 1
    if (l.y < 0) { l.remove(); return }
    getTile(l.x, l.y).forEach(s => {
      if (s.type === ROCK)  { s.remove(); l.remove(); updateHUD() }
      if (s.type === ENEMY) { s.remove(); l.remove() }
    })
  })

  moveCounter++
  if (moveCounter % 2 === 0) moveEnemies()

  if (getTile(ship.x, ship.y).some(s => s.type === ROCK)) {
    killPlayer(); return
  }
  if (getTile(ship.x, ship.y).some(s => s.type === ENEMY)) {
    killPlayer(); return
  }

  getTile(ship.x, ship.y).forEach(s => {
    if (s.type === COIN) {
      s.remove()
      totalCoins++
      updateHUD()
    }
  })

  getTile(ship.x, ship.y).forEach(s => {
    if (s.type === PORTAL) {
      if (countCoins() > 0) return
      const stars = lives === 3 ? 3 : lives === 2 ? 2 : 1
      levelStars.push(stars)
      if (currentLevel < levels.length - 1) {
        currentLevel++
        lives = Math.min(lives + 1, 3)
        loadLevel(currentLevel)
      } else {
        gameOver = true
        const totalSt = levelStars.reduce((a, b) => a + b, 0)
        const maxSt   = levels.length * 3
        clearText()
        addText("VICTOIRE", { x: 3, y: 1, color: color`0` })
        levelStars.forEach((st, i) => {
          addText("N" + (i+1) + " " + "X".repeat(st) + "-".repeat(3-st),
            { x: 4, y: 3 + i, color: color`0` })
        })
        addText(totalSt === maxSt ? "PARFAIT" : totalSt >= maxSt*0.6 ? "BIEN" : "CONTINUE",
          { x: 3, y: 3 + levels.length + 1, color: color`0` })
        addText("I RESTART", { x: 3, y: 3 + levels.length + 3, color: color`0` })
      }
    }
  })
})
