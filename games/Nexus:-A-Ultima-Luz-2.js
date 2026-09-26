/*
@title: Nexus: A Ultima Luz 2
@description: Um roguelike tatico por turnos. Recupere nucleos de energia, sobreviva aos sentinelas e reative o Nexus.
@author: Marcio Vinicius
@tags: ['strategy', 'puzzle', 'adventure']
@addedOn: 2026-09-06

WASD: mover | J: pulso de energia | I: reiniciar | L: iniciar/proxima fase
*/

const player = "p"
const wall = "w"
const core = "c"
const gate = "g"
const portal = "x"
const sentry = "s"
const hunter = "h"
const floor = "f"

setLegend(
  [player, bitmap`
................
.......55.......
......5775......
.....577775.....
.....573375.....
......5775......
......5555......
.....55..55.....
....55....55....
....5......5....
.......55.......
......5..5......
.....55..55.....
................
................
................`],
  [wall, bitmap`
1111111111111111
1222222122222221
1211112121111121
121..12121..121.
1211112121111121
1222222122222221
1111111111111111
2222222222222222
1111111111111111
1222222122222221
1211112121111121
121..12121..121.
1211112121111121
1222222122222221
1111111111111111
2222222222222222`],
  [core, bitmap`
................
.......6........
......666.......
.....66366......
....6633366.....
...66333366.....
....6633366.....
.....66366......
......666.......
.......6........
................
................
................
................
................
................`],
  [gate, bitmap`
....33333333....
...3........3...
..3..000000..3..
..3..0....0..3..
..3..0.33.0..3..
..3..0.33.0..3..
..3..0....0..3..
..3..000000..3..
..3..........3..
..3..000000..3..
..3..0....0..3..
..3..0....0..3..
...3........3...
....33333333....
................
................`],
  [portal, bitmap`
....66666666....
...6........6...
..6..444444..6..
..6..4....4..6..
..6..4.66.4..6..
..6..4.66.4..6..
..6..4....4..6..
..6..444444..6..
..6..........6..
..6..444444..6..
..6..4....4..6..
..6..4....4..6..
...6........6...
....66666666....
................
................`],
  [sentry, bitmap`
................
......0000......
.....022220.....
....02222220....
....02277220....
....02277220....
....02222220....
.....022220.....
......0330......
.....03..30.....
....03....30....
................
................
................
................
................`],
  [hunter, bitmap`
................
.....333333.....
....33000033....
...330222033....
...302222203....
...302772203....
...302222203....
...330222033....
....33000033....
.....333333.....
......3..3......
.....3....3.....
................
................
................
................`],
  [floor, bitmap`
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
................`]
)

setBackground(floor)
setSolids([player, wall, gate, sentry, hunter])

const titleMap = map`
............
............
............
............
............
............
............
............
............
............`

const levels = [
  map`
wwwwwwwwwwww
wp..c......w
w.wwwww.ww.w
w.....w....w
w.www.w.ww.w
w.w...w....w
w.w.www.ww.w
w...c....s.w
w.wwwwwwg..w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wp...w...c.w
w.ww.w.ww..w
w....w.....w
w.wwww..ww.w
w.c....w...w
w.www..w.h.w
w......w...w
w.wwwwwwg..w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wp.c....w..w
w.www.w.w.sw
w.....w.w..w
www.ww.w.w.w
w.c..w...w.w
w.ww.www.w.w
w....h....gw
w.wwwwwwww.w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wp....c....w
w.www.www..w
w...w....w.w
www.w.ww.w.w
w...w.c..w.w
w.www.ww.w.w
w.c....s.hgw
w.wwwwwwww.w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wp.c....w..w
w.www..w.s.w
w...w..w...w
w.w.w.ww.w.w
w.w...c..w.w
w.www.ww.w.w
w.c...h..sgw
w.wwwwwwww.w
wwwwwwwwwwww`
]

let level = 0
let phase = "title"
let hp = 3
let energy = 3
let coresNeeded = 0
let coresFound = 0
let totalCores = 0
let message = ""

const collectSound = tune`
320: C5~320 + E5~320,
320: G5~320 + C6~320`
const pulseSound = tune`
180: C6^180 + G5^180,
180: D6^180 + A5^180`
const hurtSound = tune`
120: E4~120,
120: C4~120,
120: A3~120`
const gateSound = tune`
240: C5^240,
240: E5^240,
240: G5^240,
240: C6^240`

function drawTitle() {
  setMap(titleMap)
  clearText()
  addText("N E X U S", { x: 6, y: 2, color: color`6` })
  addText("A ULTIMA LUZ", { x: 4, y: 4, color: color`3` })
  addText("RECUPERE OS NUCLEOS", { x: 0, y: 7, color: color`0` })
  addText("WASD MOVE  J PULSO", { x: 1, y: 9, color: color`4` })
  addText("L: INICIAR", { x: 5, y: 13, color: color`6` })
}

function drawHud() {
  clearText()
  addText("NEXUS " + (level + 1) + "/" + levels.length, { x: 0, y: 0, color: color`0` })
  addText("VIDA " + hp + "  ENERGIA " + energy, { x: 0, y: 1, color: color`3` })
  addText("NUCLEOS " + coresFound + "/" + coresNeeded, { x: 0, y: 14, color: color`0` })
  if (message !== "") addText(message, { x: 0, y: 15, color: color`2` })
}

function loadLevel() {
  setMap(levels[level])
  hp = 3
  energy = 3
  coresNeeded = getAll(core).length
  coresFound = 0
  message = "ENCONTRE OS NUCLEOS"
  phase = "playing"
  drawHud()
}

function hasType(x, y, type) {
  return getTile(x, y).some(sprite => sprite.type === type)
}

function isWallOrGate(x, y) {
  return hasType(x, y, wall) || hasType(x, y, gate)
}

function collectCore() {
  const hero = getFirst(player)
  const found = getTile(hero.x, hero.y).filter(sprite => sprite.type === core)
  if (found.length === 0) return
  found.forEach(sprite => sprite.remove())
  coresFound += found.length
  totalCores += found.length
  energy = Math.min(3, energy + 1)
  playTune(collectSound)
  if (coresFound === coresNeeded) {
    getAll(gate).forEach(sprite => sprite.type = portal)
    message = "PORTAL REATIVADO"
    playTune(gateSound)
  } else {
    message = "NUCLEO ABSORVIDO"
  }
}

function lose() {
  phase = "dead"
  playTune(hurtSound)
  clearText()
  addText("SINAL PERDIDO", { x: 3, y: 5, color: color`3` })
  addText("L: TENTAR DE NOVO", { x: 1, y: 9, color: color`6` })
}

function enemyStep(enemy, dx, dy) {
  const nx = enemy.x + dx
  const ny = enemy.y + dy
  const hero = getFirst(player)
  if (nx === hero.x && ny === hero.y) {
    hp -= 1
    message = "SENTINELA ATINGIU VOCE"
    return true
  }
  if (isWallOrGate(nx, ny)) return false
  if (hasType(nx, ny, sentry) || hasType(nx, ny, hunter)) return false
  enemy.x = nx
  enemy.y = ny
  return true
}

function moveEnemy(enemy) {
  const hero = getFirst(player)
  const dx = hero.x - enemy.x
  const dy = hero.y - enemy.y
  const horizontalFirst = Math.abs(dx) >= Math.abs(dy)
  const primaryX = dx === 0 ? 0 : (dx > 0 ? 1 : -1)
  const primaryY = dy === 0 ? 0 : (dy > 0 ? 1 : -1)
  if (horizontalFirst && primaryX !== 0 && enemyStep(enemy, primaryX, 0)) return
  if (!horizontalFirst && primaryY !== 0 && enemyStep(enemy, 0, primaryY)) return
  if (horizontalFirst && primaryY !== 0) enemyStep(enemy, 0, primaryY)
  if (!horizontalFirst && primaryX !== 0) enemyStep(enemy, primaryX, 0)
}

function enemiesTurn() {
  getAll(sentry).forEach(enemy => moveEnemy(enemy))
  getAll(hunter).forEach(enemy => {
    moveEnemy(enemy)
    if (phase === "playing" && hp > 0) moveEnemy(enemy)
  })
  if (hp <= 0) lose()
}

function finishLevel() {
  phase = "between"
  level += 1
  clearText()
  if (level === levels.length) {
    phase = "won"
    addText("NEXUS REATIVADO", { x: 2, y: 5, color: color`6` })
    addText("A CIDADE RESPIRA", { x: 1, y: 7, color: color`4` })
    addText("NUCLEOS: " + totalCores, { x: 3, y: 10, color: color`3` })
    addText("L: NOVA JORNADA", { x: 1, y: 13, color: color`2` })
  } else {
    addText("SETOR LIMPO", { x: 4, y: 5, color: color`6` })
    addText("L: PROXIMO SETOR", { x: 1, y: 9, color: color`4` })
  }
}

function resolveTurn() {
  if (phase !== "playing") return
  const hero = getFirst(player)
  collectCore()
  if (hasType(hero.x, hero.y, portal)) {
    finishLevel()
    return
  }
  enemiesTurn()
  if (phase === "playing") drawHud()
}

function move(dx, dy) {
  if (phase !== "playing") return
  const hero = getFirst(player)
  const oldX = hero.x
  const oldY = hero.y
  hero.x += dx
  hero.y += dy
  if (hero.x === oldX && hero.y === oldY) {
    message = "CAMINHO BLOQUEADO"
    drawHud()
    return
  }
  message = ""
  resolveTurn()
}

function pulse() {
  if (phase !== "playing") return
  if (energy === 0) {
    message = "ENERGIA INSUFICIENTE"
    drawHud()
    return
  }
  const hero = getFirst(player)
  const targets = []
  const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]]
  directions.forEach(direction => {
    const x = hero.x + direction[0]
    const y = hero.y + direction[1]
    getTile(x, y).forEach(sprite => {
      if (sprite.type === sentry || sprite.type === hunter) targets.push(sprite)
    })
  })
  energy -= 1
  playTune(pulseSound)
  if (targets.length > 0) {
    targets.forEach(sprite => sprite.remove())
    message = "PULSO: " + targets.length + " INIMIGO"
  } else {
    message = "PULSO VAZIO"
  }
  resolveTurn()
}

onInput("w", () => move(0, -1))
onInput("a", () => move(-1, 0))
onInput("s", () => move(0, 1))
onInput("d", () => move(1, 0))
onInput("j", pulse)
onInput("i", () => {
  if (phase === "playing" || phase === "dead") loadLevel()
})
onInput("l", () => {
  if (phase === "title" || phase === "between") loadLevel()
  else if (phase === "dead") loadLevel()
  else if (phase === "won") {
    level = 0
    totalCores = 0
    loadLevel()
  }
})

drawTitle()