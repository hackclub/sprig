/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: bomb blast
@description: Blow up crates and clear every enemy. W/A/S/D move, J drops a bomb, K restarts the level.
@author: 
@tags: ['puzzle', 'bomberman']
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const crate = "c"
const bomb = "b"
const fire = "f"
const enemy = "e"
const floor = "t"

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
  [ wall, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000` ],
  [ crate, bitmap`
9999999999999999
9666666666666669
9666666666666669
9666666666666669
9666666666666669
9666666666666669
9666666666666669
9999999999999999
9999999999999999
9666666666666669
9666666666666669
9666666666666669
9666666666666669
9666666666666669
9666666666666669
9999999999999999` ],
  [ bomb, bitmap`
................
..........9.....
.........9......
......00000.....
.....0000000....
....000000000...
....0LL000000...
....0LL000000...
....000000000...
....000000000...
....000000000...
.....0000000....
......00000.....
................
................
................` ],
  [ fire, bitmap`
..999999999999..
.99999999999999.
9999999999999999
9999999999999999
9996666666666999
9996666666666999
9996666666666999
9996666666666999
9996666666666999
9996666666666999
9996666666666999
9996666666666999
9999999999999999
9999999999999999
.99999999999999.
..999999999999..` ],
  [ enemy, bitmap`
................
................
................
....FFFFFFFF....
...FFFFFFFFFF...
..FFFFFFFFFFFF..
..FF5FFFFFF5FF..
..FF0FFFFFF0FF..
..FFFFFFFFFFFF..
..FFFFFFFFFFFF..
..FFFFFFFFFFFF..
..FF.FFFFFF.FF..
..F...FFFF...F..
................
................
................` ],
  [ floor, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ]
)

setSolids([ player, wall, crate ])

setBackground(floor)

let level = 0
const levels = [
  map`
wwwwwwwww
wp.c...ew
w.w.w.w.w
w.c...c.w
w.w.w.w.w
w.c.e.c.w
wwwwwwwww`,
  map`
wwwwwwwww
wp..c..ew
w.w.w.w.w
wcc...ccw
w.w.w.w.w
we..c...w
wwwwwwwww`,
  map`
wwwwwwwww
wp.c.c.ew
w.w.w.w.w
wc..e..cw
w.w.w.w.w
we.c.c..w
wwwwwwwww`
]

const FUSE_MS = 1800
const FIRE_MS = 400
const RANGE = 2

let state = "play" // play | win | lose | done
let gen = 0        // bumps every time a level loads, so old timers do nothing
let bombActive = false

function loadLevel() {
  gen++
  bombActive = false
  state = "play"
  clearText()
  setMap(levels[level])
  setPushables({
    [ player ]: []
  })
  addText("Level " + (level + 1), { x: 1, y: 15, color: color`3` })
}

function outOfBounds(x, y) {
  return x < 0 || y < 0 || x >= width() || y >= height()
}

function lose() {
  if (state !== "play") return
  state = "lose"
  addText("BOOM! K = retry", { x: 3, y: 7, color: color`3` })
}

function checkPlayer() {
  const p = getFirst(player)
  if (!p || state !== "play") return
  const types = getTile(p.x, p.y).map(t => t.type)
  if (types.includes(enemy) || types.includes(fire)) lose()
}

function checkWin() {
  if (state !== "play") return
  if (getAll(enemy).length > 0) return
  level++
  if (level >= levels.length) {
    state = "done"
    addText("YOU WIN!", { x: 6, y: 7, color: color`4` })
    addText("K = play again", { x: 3, y: 9, color: color`3` })
    level = 0
  } else {
    state = "win"
    addText("Cleared!", { x: 6, y: 7, color: color`4` })
    const g = gen
    setTimeout(() => { if (g === gen) loadLevel() }, 1200)
  }
}

function explode(x, y, g) {
  if (g !== gen) return
  getTile(x, y).filter(t => t.type === bomb).forEach(t => t.remove())
  bombActive = false

  const cells = [ [ x, y ] ]
  const dirs = [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ] ]
  dirs.forEach(([ dx, dy ]) => {
    for (let i = 1; i <= RANGE; i++) {
      const nx = x + dx * i
      const ny = y + dy * i
      if (outOfBounds(nx, ny)) break
      const types = getTile(nx, ny).map(t => t.type)
      if (types.includes(wall)) break
      cells.push([ nx, ny ])
      if (types.includes(crate)) break // fire stops at the first crate
    }
  })

  cells.forEach(([ cx, cy ]) => {
    getTile(cx, cy).forEach(t => {
      if (t.type === crate || t.type === enemy) t.remove()
    })
    addSprite(cx, cy, fire)
  })

  checkPlayer()
  checkWin()

  setTimeout(() => {
    if (g !== gen) return
    getAll(fire).forEach(f => f.remove())
  }, FIRE_MS)
}

function moveEnemies() {
  if (state !== "play") return
  const dirs = [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ] ]
  getAll(enemy).forEach(e => {
    const [ dx, dy ] = dirs[Math.floor(Math.random() * 4)]
    const nx = e.x + dx
    const ny = e.y + dy
    if (outOfBounds(nx, ny)) return
    const types = getTile(nx, ny).map(t => t.type)
    if (types.some(t => t === wall || t === crate || t === bomb || t === enemy)) return
    e.x = nx
    e.y = ny
    if (types.includes(fire)) e.remove()
  })
  checkPlayer()
  checkWin()
}

setInterval(moveEnemies, 500)

onInput("w", () => { if (state === "play") getFirst(player).y -= 1 })
onInput("s", () => { if (state === "play") getFirst(player).y += 1 })
onInput("a", () => { if (state === "play") getFirst(player).x -= 1 })
onInput("d", () => { if (state === "play") getFirst(player).x += 1 })

onInput("j", () => {
  if (state !== "play" || bombActive) return
  const p = getFirst(player)
  const bx = p.x
  const by = p.y
  addSprite(bx, by, bomb)
  bombActive = true
  const g = gen
  setTimeout(() => explode(bx, by, g), FUSE_MS)
})

onInput("k", () => {
  loadLevel()
})

afterInput(() => {
  checkPlayer()
})

loadLevel()