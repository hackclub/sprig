
/*
@title: Laser Labyrinth
@description: Dodge lasers, rotate mirrors, and solve 8 puzzles!
@author: Rushil W.
@tags: ['puzzle', 'laser', 'maze']
*/

const player = "p"
const wall = "w"
const emitter = "e"
const mirrorBack = "m"
const mirrorSlash = "n"
const target = "t"
const crystal = "c"
const beamH = "h"
const beamV = "v"
const floor = "f"

setLegend(
  [player, bitmap`
................
......3333......
....33333333....
...3333333333...
...3300330033...
...3300330033...
...3333333333...
....33300333....
.....333333.....
....66666666....
...6666666666...
...66.6666.66...
...66.6666.66...
.....66..66.....
.....66..66.....
................`],

  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L12222222222221L
L12000000000221L
L12000000000221L
L12000000000221L
L12000000000221L
L12000000000221L
L12000000000221L
L12000000000221L
L12000000000221L
L12000000000221L
L12222222222221L
L11111111111111L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],

  [emitter, bitmap`
................
....33333333....
...3333333333...
..333333333333..
..330000000033..
..330000000033..
..33333333333333
..33333333333333
..33333333333333
..33333333333333
..330000000033..
..330000000033..
..333333333333..
...3333333333...
....33333333....
................`],

  [mirrorBack, bitmap`
................
.66.............
.666............
..666...........
...666..........
....666.........
.....666........
......666.......
.......666......
........666.....
.........666....
..........666...
...........666..
............666.
.............66.
................`],

  [mirrorSlash, bitmap`
................
.............66.
............666.
...........666..
..........666...
.........666....
........666.....
.......666......
......666.......
.....666........
....666.........
...666..........
..666...........
.666............
.66.............
................`],

  [target, bitmap`
................
.....777777.....
...7777777777...
..777......777..
..77........77..
.77...7777...77.
.77..777777..77.
.77..77..77..77.
.77..77..77..77.
.77..777777..77.
.77...7777...77.
..77........77..
..777......777..
...7777777777...
.....777777.....
................`],

  [crystal, bitmap`
................
.......7........
......777.......
.....77777......
....7777777.....
...777777777....
..77777777777...
.7777777777777..
..77777777777...
...777777777....
....7777777.....
.....77777......
......777.......
.......7........
................
................`],

  [beamH, bitmap`
................
................
................
................
................
................
3333333333333333
3333333333333333
3333333333333333
3333333333333333
................
................
................
................
................
................`],

  [beamV, bitmap`
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......`],

  [floor, bitmap`
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
0000000000000000`]
)

setBackground(floor)

setSolids([
  player,
  wall,
  emitter,
  mirrorBack,
  mirrorSlash
])

let level = 0
let moves = 0
let rotations = 0
let totalMoves = 0
let mode = "menu"
let targetsHit = 0
let totalTargets = 0
let levelCrystals = 0

const levelNames = [
  "FIRST LIGHT",
  "REVERSE",
  "DOUBLE BOUNCE",
  "ZIGZAG",
  "LONG WAY",
  "TWIN BEAMS",
  "FOUR CORNERS",
  "FINAL CROSSING"
]

const levels = [
  map`
............
............
wwwwwwwwwwww
w..........w
w.....t....w
w..........w
w..........w
w..........w
w.e...m....w
w..p.......w
w..........w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w.e.....n..w
w..........w
w..........w
w..........w
w..p.......w
w...c...t..w
w..........w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w..........w
w....m...t.w
w..........w
w..........w
w.p........w
w.e..m...c.w
w..........w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w........t.w
w.e.n......w
w..........w
w..........w
w...m....m.w
w.p.....c..w
w..........w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w..n....n..w
w..........w
w..........w
w..........w
w.......t..w
w.em.....c.w
w.p........w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w.e...n....w
w........t.w
w..........w
w.....t....w
w.e......m.w
w....c.....w
w..p.......w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w.......m.tw
w.e.n......w
w..........w
w..........w
w..........w
w...m...m..w
w.p......c.w
wwwwwwwwwwww`,

  map`
............
............
wwwwwwwwwwww
w..........w
w..c....t..w
w.e..n.....w
w........t.w
w.e.....m..w
w..........w
w....n...m.w
w..p......cw
wwwwwwwwwwww`
]

const blankScreen = map`
............
............
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

function showMenu() {
  mode = "menu"
  clearText()
  setMap(blankScreen)

  addText("LASER LABYRINTH", {
    x: 2, y: 2,
    color: color`7`
  })

  addText("MIRROR PUZZLE", {
    x: 4, y: 4,
    color: color`6`
  })

  addText("8 LEVELS", {
    x: 6, y: 6,
    color: color`2`
  })

  addText("WASD = MOVE", {
    x: 4, y: 8,
    color: color`2`
  })

  addText("J = ROTATE", {
    x: 4, y: 10,
    color: color`2`
  })

  addText("DODGE RED LASERS!", {
    x: 2, y: 12,
    color: color`3`
  })

  addText("PRESS I TO START", {
    x: 2, y: 14,
    color: color`7`
  })
}

function startLevel() {
  mode = "playing"
  moves = 0
  rotations = 0
  targetsHit = 0

  clearText()
  setMap(levels[level])

  totalTargets = getAll(target).length
  levelCrystals = getAll(crystal).length

  updateLaser()

  if (mode === "playing") {
    showHUD()
  }
}

function showHUD() {
  if (mode !== "playing") return

  clearText()

  addText(
    "LV " + (level + 1) + "/8  MOVES " + moves,
    {
      x: 1,
      y: 0,
      color: color`7`
    }
  )
}

function hasType(x, y, type) {
  if (
    x < 0 ||
    y < 0 ||
    x >= width() ||
    y >= height()
  ) {
    return false
  }

  return getTile(x, y).some(
    s => s.type === type
  )
}

function onLaser(x, y) {
  return (
    hasType(x, y, beamH) ||
    hasType(x, y, beamV)
  )
}

function updateLaser() {
  if (mode !== "playing") return

  getAll(beamH).forEach(s => s.remove())
  getAll(beamV).forEach(s => s.remove())

  const sources = getAll(emitter)
  const activated = new Set()

  for (const source of sources) {
    let x = source.x
    let y = source.y
    let dx = 1
    let dy = 0

    const visited = new Set()
    const limit = width() * height() * 4

    for (let step = 0; step < limit; step++) {
      x += dx
      y += dy

      if (
        x < 0 ||
        y < 0 ||
        x >= width() ||
        y >= height()
      ) {
        break
      }

      const state =
        x + "," + y + "," + dx + "," + dy

      if (visited.has(state)) break
      visited.add(state)

      if (hasType(x, y, wall)) break
      if (hasType(x, y, emitter)) break

      if (hasType(x, y, mirrorBack)) {
        const oldDx = dx
        dx = dy
        dy = oldDx
        continue
      }

      if (hasType(x, y, mirrorSlash)) {
        const oldDx = dx
        dx = -dy
        dy = -oldDx
        continue
      }

      if (dx !== 0) {
        if (!hasType(x, y, beamH)) {
          addSprite(x, y, beamH)
        }
      } else {
        if (!hasType(x, y, beamV)) {
          addSprite(x, y, beamV)
        }
      }

      if (hasType(x, y, target)) {
        activated.add(x + "," + y)
        break
      }
    }
  }

  targetsHit = activated.size

  const p = getFirst(player)

  if (p && onLaser(p.x, p.y)) {
    zapPlayer()
    return
  }

  checkWin()
}

function zapPlayer() {
  if (mode !== "playing") return

  mode = "dead"

  clearText()
  setMap(blankScreen)

  addText("YOU GOT ZAPPED!", {
    x: 2, y: 3,
    color: color`3`
  })

  addText("AVOID THE LASERS", {
    x: 2, y: 6,
    color: color`2`
  })

  addText("LEVEL " + (level + 1), {
    x: 6, y: 8,
    color: color`7`
  })

  addText("K = TRY AGAIN", {
    x: 3, y: 11,
    color: color`6`
  })
}

function collectCrystals() {
  if (mode !== "playing") return

  const p = getFirst(player)
  if (!p) return

  getAll(crystal).forEach(gem => {
    if (
      gem.x === p.x &&
      gem.y === p.y
    ) {
      gem.remove()
    }
  })
}

function rotateMirror() {
  if (mode !== "playing") return

  const p = getFirst(player)
  if (!p) return

  const mirrors = [
    ...getAll(mirrorBack),
    ...getAll(mirrorSlash)
  ]

  for (const mirror of mirrors) {
    const distance =
      Math.abs(p.x - mirror.x) +
      Math.abs(p.y - mirror.y)

    if (distance === 1) {
      if (mirror.type === mirrorBack) {
        mirror.type = mirrorSlash
      } else {
        mirror.type = mirrorBack
      }

      rotations++
      return
    }
  }
}

function checkWin() {
  if (mode !== "playing") return

  const remaining = getAll(crystal).length

  if (
    totalTargets > 0 &&
    targetsHit === totalTargets &&
    remaining === 0
  ) {
    completeLevel()
  }
}

function completeLevel() {
  mode = "clear"
  totalMoves += moves

  clearText()
  setMap(blankScreen)

  addText("LEVEL COMPLETE!", {
    x: 2, y: 2,
    color: color`7`
  })

  addText("LEVEL " + (level + 1) + " OF 8", {
    x: 4, y: 5,
    color: color`2`
  })

  addText("MOVES: " + moves, {
    x: 5, y: 7,
    color: color`6`
  })

  addText("ROTATIONS: " + rotations, {
    x: 3, y: 9,
    color: color`6`
  })

  if (level < levels.length - 1) {
    addText("L = NEXT LEVEL", {
      x: 3, y: 12,
      color: color`7`
    })
  } else {
    addText("L = FINISH GAME", {
      x: 2, y: 12,
      color: color`7`
    })
  }

  addText("K = RETRY", {
    x: 5, y: 14,
    color: color`2`
  })
}

function finishGame() {
  mode = "finished"

  clearText()
  setMap(blankScreen)

  addText("CONGRATULATIONS!", {
    x: 2, y: 2,
    color: color`7`
  })

  addText("LASER MASTER!", {
    x: 4, y: 5,
    color: color`6`
  })

  addText("ALL 8 LEVELS", {
    x: 4, y: 8,
    color: color`2`
  })

  addText("COMPLETED!", {
    x: 5, y: 10,
    color: color`7`
  })

  addText("I = PLAY AGAIN", {
    x: 3, y: 13,
    color: color`6`
  })
}

function movePlayer(dx, dy) {
  if (mode !== "playing") return

  const p = getFirst(player)
  if (!p) return

  const nx = p.x + dx
  const ny = p.y + dy

  if (
    nx < 0 ||
    ny < 0 ||
    nx >= width() ||
    ny >= height()
  ) {
    return
  }

  if (onLaser(nx, ny)) {
    zapPlayer()
    return
  }

  const oldX = p.x
  const oldY = p.y

  p.x = nx
  p.y = ny

  if (
    p.x !== oldX ||
    p.y !== oldY
  ) {
    moves++
  }
}

onInput("w", () => {
  movePlayer(0, -1)
})

onInput("s", () => {
  movePlayer(0, 1)
})

onInput("a", () => {
  movePlayer(-1, 0)
})

onInput("d", () => {
  movePlayer(1, 0)
})

onInput("j", () => {
  rotateMirror()
})

onInput("k", () => {
  if (
    mode === "playing" ||
    mode === "dead" ||
    mode === "clear"
  ) {
    startLevel()
  }
})

onInput("l", () => {
  if (mode !== "clear") return

  level++

  if (level < levels.length) {
    startLevel()
  } else {
    finishGame()
  }
})

onInput("i", () => {
  if (
    mode === "menu" ||
    mode === "finished"
  ) {
    level = 0
    totalMoves = 0
    startLevel()
  }
})

afterInput(() => {
  if (mode !== "playing") return

  collectCrystals()
  updateLaser()

  if (mode === "playing") {
    showHUD()
  }
})

showMenu()
