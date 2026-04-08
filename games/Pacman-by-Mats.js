/*
PAC-MAN — Sprig
Verified rectangular level
*/

// ─────────────
// SPRITES
// ─────────────
const pacman = "p"
const wall = "w"
const pellet = "o"
const empty = "e"
const ghost = "g"

setLegend(
  [ pacman, bitmap`
..333333
.3333333
33333333
33333333
33333333
33333333
.3333333
..333333
`],
  [ wall, bitmap`
11111111
10000001
10111101
10100101
10100101
10111101
10000001
11111111
`],
  [ pellet, bitmap`
........
........
...44...
...44...
...44...
...44...
........
........
`],
  [ ghost, bitmap`
..5555..
.555555.
55555555
55555555
55555555
5.5..5.5
55555555
5.5.5.5.
`],
  [ empty, bitmap`
........
........
........
........
........
........
........
........
`]
)

// ─────────────
// MAP (12 × 9 — EVERY ROW = 12 CHARS)
// ─────────────
setMap(map`
wwwwwwwwwwww
woooooooogow
wowwwwwwwwow
woooooooooow
wowwwwwwwwow
woooooooooow
wowwwwwwwwow
woooooooopow
wwwwwwwwwwww
`)

setBackground(empty)
setSolids([pacman, wall, ghost])

// ─────────────
// GAME STATE
// ─────────────
let score = 0
let gameOver = false

// ─────────────
// CONTROLS
// ─────────────
onInput("w", () => !gameOver && getFirst(pacman).y--)
onInput("s", () => !gameOver && getFirst(pacman).y++)
onInput("a", () => !gameOver && getFirst(pacman).x--)
onInput("d", () => !gameOver && getFirst(pacman).x++)

// ─────────────
// PELLETS
// ─────────────
afterInput(() => {
  if (gameOver) return
  const p = getFirst(pacman)
  getTile(p.x, p.y).forEach(t => {
    if (t.type === pellet) {
      clearTile(p.x, p.y)
      addSprite(p.x, p.y, pacman)
      score++
    }
  })
})

// ─────────────
// GHOST AI
// ─────────────
setInterval(() => {
  if (gameOver) return
  const g = getFirst(ghost)
  const p = getFirst(pacman)
  g.x += Math.sign(p.x - g.x)
}, 600)

// ─────────────
// COLLISION
// ─────────────
afterInput(() => {
  if (gameOver) return
  const p = getFirst(pacman)
  const g = getFirst(ghost)
  if (p.x === g.x && p.y === g.y) {
    gameOver = true
    clearText()
    addText("GAME OVER", { x: 2, y: 4, color: color`3` })
    addText(`SCORE ${score}`, { x: 3, y: 6, color: color`4` })
    freeze()
  }
})
