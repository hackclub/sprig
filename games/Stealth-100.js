/*
@title: Stealth 100
@author: unowen[https://github.com/pari55051]
@description: Use your stealth skills to retrieve the Gem succesfully withut being seen by the guard birds
@tags: [stealth, puzzle game, navigation, hideout, heist, hide, guard birds]
@addedOn: 2025-08-03 
*/


/* Instructions:
- WASD controls
- avoid coming in the bird (yellow coloured)'s vision
- reach the blue gem
- can hide in the bush (safe from bird's vision) */

const player = "p"
const wall = "w"
const floor = "f"
const bush = "b"
const goal = "g"
const birdLeft = "l"
const birdRight = "r"
const birdUpDown = "v"

const stepTune = tune`
50: C5~50,
50`
const caughtTune = tune`
75: C5~75,
75: A4~75,
75: G4~75,
75`
const goalTune = tune`
80: C5~80,
80: E5~80,
80: G5~80,
80: B5~80,
80: undefined~80,
2160`
const bushTune = tune`
40: F4~40,
40: C4~40,
40`
const winTune = tune`
100: G4~100,
100: B4~100,
100: D5~100,
100: G5~100,
2800`


setLegend(
  [player, bitmap`
................
................
......LLLL......
.....L2222L.....
....L202202L....
....L222222L....
.....L2222L.....
......LLLL......
.......LL.......
......LHHL......
......LHHL......
......LHHL......
......LHHL......
......LHHL......
......8888......
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L0000L0000L0000L
L0LL0L0LL0L0LL0L
L0000L0000L0000L
L0LL0L0LL0L0LL0L
L0000L0000L0000L
L0LL0L0LL0L0LL0L
L0000L0000L0000L
L0LL0L0LL0L0LL0L
L0000L0000L0000L
L0LL0L0LL0L0LL0L
L0000L0000L0000L
L0LL0L0LL0L0LL0L
L0000L0000L0000L
L0000L0000L0000L
LLLLLLLLLLLLLLLL`],
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
................`],
  [bush, bitmap`
................
................
....DDDDDD......
...D444444D.....
..D44444444D....
..D44444444D....
..D44444444D....
..DD4444444D....
..DD4444444D....
...DD4444DD.....
....DDDDDD......
................
................
................
................
................`],
  [goal, bitmap`
................
................
......555.......
.....55755......
....5577755.....
....5777775.....
....5777775.....
....5577755.....
.....57775......
.....55755......
......555.......
................
................
................
................
................`],
  [birdRight, bitmap`
................
................
......33........
.....3663.......
.....36663......
....366663......
....36336699....
....36333699....
....36666699....
....366663......
.....3663.......
......33........
................
................
................
................`],
  [birdLeft, bitmap`
................
................
........33......
.......3663.....
......36663.....
......366663....
....99663363....
....99633363....
....99666663....
......366663....
.......3663.....
........33......
................
................
................
................`],
  [birdUpDown, bitmap`
.......99.......
.......99.......
......3663......
.....366363.....
.....363363.....
.....366663.....
.....366663.....
......3333......
......3333......
.....366663.....
.....366663.....
.....363363.....
.....363663.....
......3663......
.......99.......
.......99.......`],
)

setBackground(floor)

let level = 0
let gameOver = false

const levels = [
  map`
wwwwwwwwww
w.p..b...w
w..w.....w
w..r.....w
w........w
w........w
w..b....gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w....b..gw
w..wl....w
w..w.....w
w...b....w
w..p.....w
w........w
wwwwwwwwww`,

  map`
wwwwwwwwww
wp...b...w
w...w....w
w..w....lw
wr.......w
w........w
w..b....gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.p..b...w
w..w.....w
w..r..r..w
w........w
w..b..g..w
w........w
wwwwwwwwww`,

  map`
wwwwwwwwww
wp.......w
w....b...w
w..w.....w
w..l..b..w
w....r.b.w
w.......gw
wwwwwwwwww`,

  map`
wwwwwwwwww
wp...b...w
w..w..w..w
w.r.b..r.w
w.....w..w
w..b.b...w
w......bgw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.pb.....w
w..v.b...w
w....w...w
wl..b.r..w
w.r..b..lw
w.......gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w...b...gw
www..b...w
w.b.w....w
w.w.wvw..w
w..r..wr.w
wp.......w
wwwwwwwwww`,

  map`
wwwwwwwwww
w.p....v.w
w..w.w...w
w........w
w.r.br...w
w......b.w
w...b...gw
wwwwwwwwww`,

  map`
wwwwwwwwww
w.p...v..w
wv.w.w.w.w
w....fff.w
w.l..br.bw
w.bv..b..w
w.......gw
wwwwwwwwww`,
]

setMap(levels[level])

function getPlayer() {
  return getFirst(player)
}

// function tryMove(dx, dy) {
//   if (gameOver) return
//   const p = getPlayer()
//   const tx = p.x + dx
//   const ty = p.y + dy
//   const next = getTile(tx, ty)
//   if (next.some(t => t.type === wall || t.type == birdLeft || t.type == birdRight || t.type == birdUpDown)) return
//   p.x = tx
//   p.y = ty
// }
function tryMove(dx, dy) {
  if (gameOver) return

  const p = getPlayer()
  const tx = p.x + dx
  const ty = p.y + dy

  // Check for out-of-bounds
  if (tx < 0 || tx >= width() || ty < 0 || ty >= height()) return

  const next = getTile(tx, ty)

  // Prevent movement into walls or birds
  if (next.some(t =>
    t.type === wall ||
    t.type === birdLeft ||
    t.type === birdRight ||
    t.type === birdUpDown
  )) return

  // Move the player + play sound accordinglyd
  if (getTile(tx, ty).some(t => t.type === bush)) {
    playTune(bushTune)
  } else {
    playTune(stepTune)
  }

  p.x = tx
  p.y = ty
}


let gameMode = "wasd";
let upKey = "w"
let downKey = "s"
let leftKey = "a"
let rightKey = "d"
let levelResetKey = "j"
let gameResetKey = "l"


// movement functions
onInput(upKey, () => tryMove(0, -1))
onInput(downKey, () => tryMove(0, 1))
onInput(leftKey, () => tryMove(-1, 0))
onInput(rightKey, () => tryMove(1, 0))
onInput(levelResetKey, () => {
  gameOver = false
  clearText()
  setMap(levels[level])
  // level = 0
})
onInput(gameResetKey, () => {
  gameOver = false
  clearText()
  level = 0
  setMap(levels[level])
})



// game logic functions
function getLine(x1, x2, y) {
  let line = []
  if (x2 < x1) return line // avoid invalid range
  for (let x = x1; x <= x2; x++) {
    line.push([x, y])
  }
  return line
}

function checkVision() {
  const p = getPlayer()
  const px = p.x
  const py = p.y
  const inBush = getTile(px, py).some(t => t.type === bush)

  let birds = [...getAll(birdLeft), ...getAll(birdRight), ...getAll(birdUpDown)]

  for (let b of birds) {
    if (inBush) continue

    const bx = b.x
    const by = b.y

    // 👁️ Left-facing birds (see left only)
    if (b.type === birdLeft && b.y === py && px < b.x) {
      const vision = getLine(px + 1, b.x - 1, py)
      const blocked = vision.some(([x, y]) =>
        getTile(x, y).some(t => t.type === wall || t.type === bush)
      )
      if (!blocked) {
        gameOver = true
        addText("Caught! Press J", { x: 2, y: 7, color: color`3` })
        playTune(caughtTune)
        return
      }
    }
    
    // 👁️ Right-facing birds (see right only)
    if (b.type === birdRight && b.y === py && px > b.x) {
      const vision = getLine(b.x + 1, px - 1, py)
      const blocked = vision.some(([x, y]) =>
        getTile(x, y).some(t => t.type === wall || t.type === bush)
      )
      if (!blocked) {
        gameOver = true
        addText("Caught! Press J", { x: 2, y: 7, color: color`3` })
        playTune(caughtTune)
        return
      }
    }



    // 👁️ Vertical bird vision — checks both up and down
    if (b.type === birdUpDown && bx === px) {
      // 👁️ Looking down
      if (by < py) {
        const vision = Array.from({ length: py - by - 1 }, (_, i) => [px, by + i + 1])
        const blocked = vision.some(([x, y]) =>
          getTile(x, y).some(t => t.type === wall || t.type === bush)
        )
        if (!blocked) {
          gameOver = true
          addText("Caught! Press J", { x: 2, y: 7, color: color`3` })
          playTune(caughtTune)
          return
        }
      }

      // 👁️ Looking up
      if (by > py) {
        const vision = Array.from({ length: by - py - 1 }, (_, i) => [px, py + i + 1])
        const blocked = vision.some(([x, y]) =>
          getTile(x, y).some(t => t.type === wall || t.type === bush)
        )
        if (!blocked) {
          gameOver = true
          addText("Caught! Press J", { x: 2, y: 7, color: color`3` })
          playTune(caughtTune)
          return
        }
      }
    }
  }
}

function moveBird(oldX, oldY, newX, newY, newType) {
  // Remove just the bird from old position
  const oldSprites = getTile(oldX, oldY).filter(s => 
    s.type !== birdLeft && s.type !== birdRight && s.type !== birdUpDown
  )
  clearTile(oldX, oldY)
  oldSprites.forEach(s => addSprite(oldX, oldY, s.type))

  // Move the bird to the new position
  const newSprites = getTile(newX, newY).map(s => s.type)
  clearTile(newX, newY)
  newSprites.forEach(t => addSprite(newX, newY, t))
  addSprite(newX, newY, newType)
}
// function moveBirds() {
//   getAll(birdLeft).forEach(b => {
//     const nx = b.x - 1
//     const ny = b.y
//     if (getTile(nx, ny).some(t => t.type === wall)) {
//       clearTile(b.x, b.y)
//       addSprite(b.x, b.y, birdRight)
//     } else {
//       // if (getTile(nx, ny).some(t => t.type === bush)) {
//       //   clearTile(b.x, b.y)
//       //   addSprite(nx+1, ny+1, birdLeft)
//       // } else {
//         clearTile(b.x, b.y)
//         addSprite(nx, ny, birdLeft)
//       // }
//     }
//   })

//   getAll(birdRight).forEach(b => {
//     const nx = b.x + 1
//     const ny = b.y
//     if (getTile(nx, ny).some(t => t.type === wall)) {
//       clearTile(b.x, b.y)
//       addSprite(b.x, b.y, birdLeft)
//     } else {
//       clearTile(b.x, b.y)
//       addSprite(nx, ny, birdRight)
//     }
//   })
// }
// function moveBirds() {
//   getAll(birdLeft).forEach(b => {
//     const nx = b.x - 1
//     const ny = b.y
//     if (getTile(nx, ny).some(t => t.type === wall)) {
//       moveBird(b.x, b.y, b.x, b.y, birdRight)
//     } else {
//       moveBird(b.x, b.y, nx, ny, birdLeft)
//     }
//   })

//   getAll(birdRight).forEach(b => {
//     const nx = b.x + 1
//     const ny = b.y
//     if (getTile(nx, ny).some(t => t.type === wall)) {
//       moveBird(b.x, b.y, b.x, b.y, birdLeft)
//     } else {
//       moveBird(b.x, b.y, nx, ny, birdRight)
//     }
//   })
// }
function moveBirds() {
  const birdMovements = []

  // First pass: determine movements for birdLeft
  getAll(birdLeft).forEach(b => {
    const nx = b.x - 1
    const ny = b.y
    if (getTile(nx, ny).some(t => t.type === wall)) {
      birdMovements.push({ fromX: b.x, fromY: b.y, toX: b.x, toY: b.y, type: birdRight })
    } else {
      birdMovements.push({ fromX: b.x, fromY: b.y, toX: nx, toY: ny, type: birdLeft })
    }
  })

  // First pass: determine movements for birdRight
  getAll(birdRight).forEach(b => {
    const nx = b.x + 1
    const ny = b.y
    if (getTile(nx, ny).some(t => t.type === wall)) {
      birdMovements.push({ fromX: b.x, fromY: b.y, toX: b.x, toY: b.y, type: birdLeft })
    } else {
      birdMovements.push({ fromX: b.x, fromY: b.y, toX: nx, toY: ny, type: birdRight })
    }
  })

  // Second pass: remove only bird sprites from all origin tiles
  for (let move of birdMovements) {
    const survivors = getTile(move.fromX, move.fromY).filter(s =>
      s.type !== birdLeft && s.type !== birdRight && s.type !== birdUpDown
    )
    clearTile(move.fromX, move.fromY)
    survivors.forEach(s => addSprite(move.fromX, move.fromY, s.type))
  }

  // Third pass: place birds at new positions
  for (let move of birdMovements) {
    const existing = getTile(move.toX, move.toY).map(t => t.type)
    clearTile(move.toX, move.toY)
    existing.forEach(t => addSprite(move.toX, move.toY, t))
    addSprite(move.toX, move.toY, move.type)
  }
}
// function moveBirds() {
//   const birdMovements = []

//   // Collect birdLeft movement intents
//   getAll(birdLeft).forEach(b => {
//     const nx = b.x - 1
//     const ny = b.y
//     if (getTile(nx, ny).some(t => t.type === wall || t.type === birdLeft || t.type === birdRight || t.type === birdUpDown || t.type === player)) {
//       birdMovements.push({ fromX: b.x, fromY: b.y, toX: b.x, toY: b.y, type: birdRight })
//     } else {
//       birdMovements.push({ fromX: b.x, fromY: b.y, toX: nx, toY: ny, type: birdLeft })
//     }
//   })

//   // Collect birdRight movement intents
//   getAll(birdRight).forEach(b => {
//     const nx = b.x + 1
//     const ny = b.y
//     if (getTile(nx, ny).some(t => t.type === wall || t.type === birdLeft || t.type === birdRight || t.type === birdUpDown || t.type === player)) {
//       birdMovements.push({ fromX: b.x, fromY: b.y, toX: b.x, toY: b.y, type: birdLeft })
//     } else {
//       birdMovements.push({ fromX: b.x, fromY: b.y, toX: nx, toY: ny, type: birdRight })
//     }
//   })

//   // Remove birds only from origin tiles
//   for (let move of birdMovements) {
//     const survivors = getTile(move.fromX, move.fromY).filter(s =>
//       s.type !== birdLeft && s.type !== birdRight && s.type !== birdUpDown
//     )
//     clearTile(move.fromX, move.fromY)
//     survivors.forEach(s => addSprite(move.fromX, move.fromY, s.type))
//   }

//   // Add birds to their new destinations (without clearing other entities)
//   for (let move of birdMovements) {
//     // Check if the destination already contains a bird — if so, skip adding to avoid overlaps
//     const destinationTypes = getTile(move.toX, move.toY).map(t => t.type)
//     if (
//       !destinationTypes.includes(birdLeft) &&
//       !destinationTypes.includes(birdRight) &&
//       !destinationTypes.includes(birdUpDown)
//     ) {
//       addSprite(move.toX, move.toY, move.type)
//     }
//   }
// }



// game running functions
afterInput(() => {
  if (gameOver) return

  moveBirds()
  checkVision()

  const p = getPlayer()
  if (getTile(p.x, p.y).some(t => t.type === goal)) {
    playTune(goalTune)
    level++
    if (level >= levels.length) {
      addText("YOU WIN!", { x: 6, y: 7, color: color`H` })
      playTune(winTune)
      gameOver = true
      level = 0
    } 
    else {
      setMap(levels[level])
    }
  }
})

