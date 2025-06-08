/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: seed-and-shadow
@author: 
@tags: []
@addedOn: 2025-00-00
*/

// Stealth 100 — Stealth Puzzle Game (10 Levels)

const player = "p"
const wall = "w"
const floor = "f"
const bush = "b"
const goal = "g"
const birdLeft = "l"
const birdRight = "r"
const birdUpDown = "v"

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
  [birdLeft, bitmap`
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
  [birdRight, bitmap`
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
w.p..b..gw
w..w.....w
w..r.....w
w........w
w........w
w..b.....w
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
wp...b..gw
w...w....w
w..wr....w
w........w
w........w
w..b.....w
wwwwwwwwww`,

  map`
wwwwwwwwww
w.p..b..gw
w..w.....w
w..r..r..w
w........w
w..b.....w
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

function tryMove(dx, dy) {
  if (gameOver) return
  const p = getPlayer()
  const tx = p.x + dx
  const ty = p.y + dy
  const next = getTile(tx, ty)
  if (next.some(t => t.type === wall)) return
  p.x = tx
  p.y = ty
}

onInput("w", () => tryMove(0, -1))
onInput("s", () => tryMove(0, 1))
onInput("a", () => tryMove(-1, 0))
onInput("d", () => tryMove(1, 0))
onInput("j", () => {
  gameOver = false
  clearText()
  setMap(levels[level])
  // level = 0
})

// function getLine(x1, x2, y) {
//   let line = []
//   for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
//     line.push([x, y])
//   }
//   return line
// }
function getLine(x1, x2, y) {
  let line = []
  if (x2 < x1) return line // avoid invalid range
  for (let x = x1; x <= x2; x++) {
    line.push([x, y])
  }
  return line
}


// function checkVision() {
//   const p = getPlayer()
//   const px = p.x
//   const py = p.y
//   const inBush = getTile(px, py).some(t => t.type === bush)

//   let birds = [...getAll(birdLeft), ...getAll(birdRight), ...getAll(birdUpDown)]
//   for (let b of birds) {
//     if (!inBush) {
//       // Horizontal birds
//       if ((b.type === birdLeft || b.type === birdRight) && b.y === py) {
//         const bx = b.x
//         const vision = bx < px ? getLine(bx + 1, px - 1, py) : getLine(px + 1, bx - 1, py)
//         const blocked = vision.some(([x, y]) =>
//           getTile(x, y).some(t => t.type === wall || t.type === bush)
//         )
//         if (!blocked) {
//           gameOver = true
//           addText("Caught! Press J", { x: 2, y: 7, color: color`3` })
//           return
//         }
//       }

//       // Vertical birds
//       if (b.type === birdUpDown && b.x === px) {
//         const by = b.y
//         const vision = py < by
//           ? Array.from({length: by - py - 1}, (_, i) => [px, py + i + 1])
//           : Array.from({length: py - by - 1}, (_, i) => [px, by + i + 1])

//         const blocked = vision.some(([x, y]) =>
//           getTile(x, y).some(t => t.type === wall || t.type === bush)
//         )
//         if (!blocked) {
//           gameOver = true
//           addText("Caught! Press J", { x: 2, y: 7, color: color`3` })
//           return
//         }
//       }
//     }
//   }
// }
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
          return
        }
      }
    }
  }
}


function moveBirds() {
  getAll(birdLeft).forEach(b => {
    const next = getTile(b.x - 1, b.y)
    if (next.some(t => t.type === wall)) {
      clearTile(b.x, b.y)
      addSprite(b.x, b.y, birdRight)
    } else {
      b.x -= 1
    }
  })
  getAll(birdRight).forEach(b => {
    const next = getTile(b.x + 1, b.y)
    if (next.some(t => t.type === wall)) {
      clearTile(b.x, b.y)
      addSprite(b.x, b.y, birdLeft)
    } else {
      b.x += 1
    }
  })
  // Vertical birds stay static (optional movement can be added later)
}

afterInput(() => {
  if (gameOver) return

  moveBirds()
  checkVision()

  const p = getPlayer()
  if (getTile(p.x, p.y).some(t => t.type === goal)) {
    playTune(tune`
    100: C5~100,
    100: E5~100,
    100: G5~100,
    100`)
    level++
    if (level >= levels.length) {
      addText("YOU WIN!", { x: 6, y: 6, color: color`H` })
      gameOver = true
      level = 0
    } else {
      setMap(levels[level])
    }
  }
})

