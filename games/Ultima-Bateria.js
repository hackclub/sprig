/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Ultima Bateria
@description: Um robo com a bateria quase no fim precisa atravessar salas cheias de robos-inimigos, recolher pilhas de energia e chegar ao portal antes que a energia acabe.
@author: Marcio Venicius
@tags: ['puzzle', 'maze', 'arcade']
@addedOn: 2026-09-06
*/

const player = "p"
const battery = "b"
const wall = "w"
const enemy = "e"
const goal = "g"

setLegend(
  [ player, bitmap`
................
....00000000....
....05555550....
....05666650....
....05555550....
....00000000....
................
....0000000000..
....0555555077..
....0555555077..
....0555555000..
....00000000....
.....00..00.....
.....00..00.....
.....00..00.....
................` ],

  [ battery, bitmap`
................
................
................
......0330......
......0330......
....00000000....
....07777770....
....07333370....
....07333370....
....07333370....
....07777770....
....00000000....
................
................
................
................` ],

  [ wall, bitmap`
0000000000000000
0444444404444444
0444444404444444
0444444404444444
0444444404444444
0444444404444444
0444444404444444
0000000000000000
0000000000000000
0444444404444444
0444444404444444
0444444404444444
0444444404444444
0444444404444444
0444444404444444
0000000000000000` ],

  [ enemy, bitmap`
................
................
................
...0000000000...
...0222222220...
...0222222220...
...0229029020...
...0220920920...
...0222222220...
...0222222220...
...0200000020...
...0200000020...
...0000000000...
................
................
................` ],

  [ goal, bitmap`
................
...0000000000...
...0444444440...
...0466666640...
...0460000640...
...0460000640...
...0460000640...
...0460000640...
...0460000640...
...0460000640...
...0460000640...
...0460000640...
...0466666640...
...0444444440...
...0000000000...
................` ]
)

setSolids([ wall, player ])

const startEnergy = 20
const maxEnergy = 30
let energy = startEnergy
let level = 0
let frozen = false

const levels = [
  map`
wwwwwwwww
wp..b...w
w.wwwww.w
w.w...w.w
w.w.e.w.w
w.w...w.w
w.wwwww.w
w.b.g.b.w
wwwwwwwww`,

  map`
wwwwwwwwwww
wp...b....w
w.www.www.w
w.w.....w.w
w.w.ebe.w.w
w.w.....w.w
w.www.www.w
w...b.g...w
wwwwwwwwwww`,

  map`
wwwwwwwwwwwww
wp.......b..w
w.wwwwwwwww.w
w.w.......w.w
w.w.wwwww.w.w
w.w.w.e.w.w.w
w.we.w.w.ew.w
w.w.w...w.w.w
w.w.wwwww.w.w
w.we......w.w
w.wwwwwwwww.w
w..b.b.g.b..w
wwwwwwwwwwwww`
]

const winTune = tune`
140
C4 E4 G4 C5 - - - -`

function showHUD() {
  clearText()
  addText(`Bateria: ${energy}`, { x: 0, y: 0, color: color`3` })
  addText(`Sala ${level + 1}/${levels.length}`, { x: 0, y: 1, color: color`1` })
}

function loadLevel(n) {
  setMap(levels[n])
  showHUD()
}

function resetGame() {
  level = 0
  energy = startEnergy
  frozen = false
  loadLevel(level)
}

loadLevel(level)

function moveEnemies() {
  const dirs = [ [1,0], [-1,0], [0,1], [0,-1] ]
  getAll(enemy).forEach((en) => {
    const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)]
    const nx = en.x + dx
    const ny = en.y + dy
    if (nx < 0 || ny < 0 || nx >= width() || ny >= height()) return
    const occupants = getTile(nx, ny)
    const blocked = occupants.some((s) => s.type === wall)
    if (!blocked) {
      en.x = nx
      en.y = ny
    }
  })
}

function move(dx, dy) {
  if (frozen) return
  const p1 = getFirst(player)
  const nx = p1.x + dx
  const ny = p1.y + dy
  if (nx < 0 || ny < 0 || nx >= width() || ny >= height()) return
  const occupants = getTile(nx, ny)
  const blocked = occupants.some((s) => s.type === wall)
  if (blocked) return
  p1.x = nx
  p1.y = ny
  energy -= 1
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

afterInput(() => {
  if (frozen) return

  const p1 = getFirst(player)

  const here = getTile(p1.x, p1.y)
  here.filter((s) => s.type === battery).forEach((s) => {
    energy = Math.min(maxEnergy, energy + 8)
    s.remove()
  })

  if (here.some((s) => s.type === enemy)) {
    energy -= 6
    here.filter((s) => s.type === enemy).forEach((s) => s.remove())
  }

  moveEnemies()

  if (energy <= 0) {
    frozen = true
    clearText()
    addText("Bateria acabou!", { y: 3, color: color`5` })
    addText("Reiniciando...", { y: 5, color: color`1` })
    setTimeout(resetGame, 1400)
    return
  }

  if (tilesWith(player, goal).length > 0) {
    level += 1
    if (level < levels.length) {
      energy = Math.min(maxEnergy, energy + 6)
      loadLevel(level)
    } else {
      frozen = true
      clearText()
      addText("Voce venceu!", { y: 3, color: color`6` })
      addText(`Energia final: ${energy}`, { y: 5, color: color`3` })
      playTune(winTune)
    }
    return
  }

  showHUD()
})