// Trick-or-Treat Run - by Andrew
// Walk the streets and collect 20 candies before time runs out.
// Watch out for the ghost - if it catches you, you lose 5 seconds
// and the ghost gets sent back to its corner!
//
// HOW TO PLAY
// - Move: W A S D (or the Sprig console buttons)
// - Walk over a candy to collect it. 20 candies wins.
// - Houses and hedges are solid - you cannot walk through them.
// - The ghost drifts toward you. Street 1: it moves every 2nd step
//   you take. Street 2: it moves every step. If it catches you:
//   -5 seconds and the ghost goes back to its own corner, so you
//   keep your spot and get a head start to the next candy.
// - Collect every candy on Street 1 to unlock Street 2.
// - Beat the clock: 150 seconds for all 20 candies.
// - Press J to restart at any time.
//
// A NOTE FROM MUSE FOR ANDREW
// This is a complete, working reference version of YOUR plan - every
// week of your schedule is in here: sprite + movement (Week 2),
// maps + walls (Week 3), scoring + timer + win (Week 4), an opponent
// (Week 5), and title screen + sounds (Week 6). Sprig's gallery asks
// that games be primarily made by the person who submits them, so
// make it yours before Publish Day on Dec 18: redraw the kid in your
// own costume, change the streets, move the candies, tweak the
// timer. That is the builder's job - and it is the fun part.
// (When you publish, Sprig's own share form will ask for the title
// and author - that is where "Trick-or-Treat Run / Andrew" goes.)

// ---------- SOUNDS ----------
const candySound = tune`
90: e5~90,
90: g5~90,
140: c6~140`

const bumpSound = tune`
120: c4~120,
180: a3~180`

const levelSound = tune`
90: c5~90,
90: e5~90,
90: g5~90,
160: c6~160`

const winSound = tune`
120: c5~120,
120: e5~120,
120: g5~120,
120: c6~120,
120: g5~120,
260: c6~260`

const loseSound = tune`
160: g4~160,
160: e4~160,
160: c4~160,
300: a3~300`

// ---------- SPRITES ----------
const player = "p"    // the candy kid - that's you, Andrew
const candy = "c"     // walk over it to collect it
const ghost = "g"     // the opponent - drifts toward you
const house = "h"     // glowing house - solid, you bump into it
const darkHouse = "d" // dark house, no candy - solid too
const fence = "f"     // hedge/fence - solid, the edges of your world
const street = "s"    // street background

setLegend(
  [ player, bitmap`
................
................
....00000.......
...0.C.C.0......
...0.....0......
...0.333.0......
....00000.......
......0.........
.....000........
....0.0.0.......
...0..0..0......
......0...00....
.....0.0..00....
....0...0.......
....0...0.......
....0...0.......` ],
  [ candy, bitmap`
................
................
................
................
................
................
.....33333......
...333333333....
6.33333333333.6.
663333333333366.
6.33333333333.6.
...333333333....
.....33333......
................
................
................` ],
  [ ghost, bitmap`
................
.....222222.....
....22222222....
...2222222222...
...2202220222...
...2202220222...
...2222222222...
...2220022222...
...2222222222...
...2222222222...
..222222222222..
..222222222222..
..22.2222.222...
..2..2222..22...
................
................` ],
  [ house, bitmap`
................
.......00.......
.......00.......
.....CCCCCC.....
....CCCCCCCC....
...CCCCCCCCCC...
..CCCCCCCCCCCC..
..LLLLLLLLLLLL..
..L666L00L666L..
..L666L00L666L..
..L666L00L666L..
..LLLLL00LLLLL..
..LLLLL00LLLLL..
..LLLLLLLLLLLL..
................
................` ],
  [ darkHouse, bitmap`
................
.......00.......
.......00.......
.....000000.....
....00000000....
...0000000000...
..000000000000..
..LLLLLLLLLLLL..
..L111L00L111L..
..L111L00L111L..
..L111L00L111L..
..LLLLL00LLLLL..
..LLLLL00LLLLL..
..LLLLLLLLLLLL..
................
................` ],
  [ fence, bitmap`
................
................
................
................
................
................
................
.F.F.F.F.F.F.F.F
CFCFCFCFCFCFCFCF
9F9FC9CFCFCFCFCF
CFCFCFCFCFCFC99F
CFCFC9CFCFCFCFCF
CFC9CFC99FC9CFCF
CFC9CFCFCFC9CFCF
C9CFCFCF9FCFCFCF
CFCF9FCFCFCFC9CF` ],
  [ street, bitmap`
LLLLLLLLLLLLLLLL
LL1LLLLLL1LLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLL1L
LLLLLLLLLLLLLLLL
L1LLLLLLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLL1LLLLLLLLLLL
LLLLLLLLLLL1LLLL
LLLLLLLLLLLLLLLL
LLL1LLLLLLLLLLLL
LLLLLLLL1LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL1LLL
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ]
)

setBackground(street)
setSolids([ player, house, darkHouse, fence ])

// ---------- STREETS (MAPS) ----------
// Street 1 has 10 candies. Street 2 has 10 more. 20 wins.
let level = 0
const levels = [
  map`
ffffffffffffff
h..c....c...hf
f....f....c..f
f.c..f..p.c..f
h....f....c..d
f..c..c.f....f
f..g.h.....c.f
f.c......f...f
ffffffffffffff`,
  map`
ffffffffffffff
d..c..h...c..h
f....f...f..gf
f.c..f.c.f.c.f
f....f...f...f
h..c...p...c.d
f..f....f....f
f.c..c..f..c.f
ffffffffffffff`
]

// ---------- GAME STATE ----------
const WIN_CANDIES = 20
let score = 0
let timeLeft = 150
let started = false
let gameOver = false
let won = false
let ghostMoves = 0
let startX = 1
let startY = 1
let ghostStartX = 1
let ghostStartY = 1

// ---------- SCREEN TEXT ----------
function drawHUD() {
  clearText()
  addText(`Candy: ${score}/${WIN_CANDIES}`, { x: 1, y: 0, color: color`6` })
  addText(`T:${timeLeft}`, { x: 15, y: 0, color: color`2` })

  if (won) {
    addText("YOU WIN!", { x: 6, y: 3, color: color`6` })
    addText("20 candies!", { x: 5, y: 4, color: color`9` })
    addText("The bag overflows!", { x: 2, y: 5, color: color`2` })
    addText("Press J to play again", { x: 1, y: 7, color: color`2` })
  } else if (gameOver) {
    addText("TIME'S UP!", { x: 5, y: 3, color: color`3` })
    addText(`You got ${score} candies`, { x: 2, y: 4, color: color`2` })
    addText("Press J to try again", { x: 2, y: 6, color: color`2` })
  } else if (!started) {
    addText("TRICK-OR-TREAT RUN", { x: 1, y: 3, color: color`9` })
    addText("Get 20 candies!", { x: 3, y: 4, color: color`2` })
    addText("WASD to walk", { x: 4, y: 5, color: color`2` })
    addText("Beat the ghost + clock", { x: 1, y: 6, color: color`7` })
  }
}

function loadLevel(n) {
  setMap(levels[n])
  const p = getFirst(player)
  startX = p.x
  startY = p.y
  const g = getFirst(ghost)
  if (g) {
    ghostStartX = g.x
    ghostStartY = g.y
  }
  ghostMoves = 0
  drawHUD()
}

// ---------- GHOST ----------
function moveGhost() {
  const g = getFirst(ghost)
  const p = getFirst(player)
  if (!g || !p) return

  const dx = p.x - g.x
  const dy = p.y - g.y
  // Step toward the player along whichever gap is bigger.
  // The ghost is not solid - it floats right over hedges. Spooky.
  if (Math.abs(dx) >= Math.abs(dy)) {
    g.x += Math.sign(dx)
  } else {
    g.y += Math.sign(dy)
  }

  // Caught you! It costs 5 seconds - and the ghost, not you,
  // gets sent back to its corner. Fair is fair.
  if (g.x === p.x && g.y === p.y) {
    playTune(bumpSound)
    timeLeft -= 5
    g.x = ghostStartX
    g.y = ghostStartY
    if (timeLeft <= 0) {
      timeLeft = 0
      gameOver = true
      playTune(loseSound)
    }
  }
}

// ---------- MOVEMENT ----------
function movePlayer(dx, dy) {
  if (gameOver || won) return
  const p = getFirst(player)
  if (!p) return
  started = true
  p.x += dx
  p.y += dy
}

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

// Restart - works any time, and on the win / lose screens
onInput("j", () => {
  score = 0
  timeLeft = 150
  level = 0
  started = false
  gameOver = false
  won = false
  loadLevel(0)
})

// ---------- AFTER EVERY MOVE ----------
afterInput(() => {
  if (!started || gameOver || won) return
  const p = getFirst(player)
  if (!p) return

  // Collect a candy if we are standing on one
  const here = getTile(p.x, p.y)
  for (const sprite of here) {
    if (sprite.type === candy) {
      sprite.remove()
      score += 1
      playTune(candySound)
    }
  }

  // 20 candies = the bag overflows = YOU WIN
  if (score >= WIN_CANDIES) {
    won = true
    playTune(winSound)
    drawHUD()
    return
  }

  // Street cleared? On to the next street!
  if (getAll(candy).length === 0) {
    level += 1
    playTune(levelSound)
    loadLevel(level)
    return
  }

  // The opponent pushes back: Street 1 it moves every 2nd step,
  // Street 2 it moves every step.
  ghostMoves += 1
  if (level === 0 && ghostMoves % 2 !== 0) {
    drawHUD()
    return
  }
  moveGhost()
  drawHUD()
})

// ---------- CLOCK ----------
setInterval(() => {
  if (!started || gameOver || won) return
  timeLeft -= 1
  if (timeLeft <= 0) {
    timeLeft = 0
    gameOver = true
    playTune(loseSound)
  }
  drawHUD()
}, 1000)

// ---------- START ----------
loadLevel(0)
