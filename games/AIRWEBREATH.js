/*
THE LAST BREATH
An environmental experience
Each move is one breath
*/

// SPRITES
const PLAYER = "p"
const SMOG = "s"
const WALL = "x"

setLegend(
  [PLAYER, bitmap`
..222..
.23332.
2333332
.23332.
..2.2..
.2...2.
`],
  [SMOG, bitmap`
.66666.
6666666
6666666
6666666
.66666.
`],
  [WALL, bitmap`
4444444
4333334
4333334
4333334
4444444
`]
)

// MAP (empty world)
setMap(map`
xxxxxxxxxx
x........x
x........x
x........x
x....p...x
x........x
x........x
x........x
xxxxxxxxxx
`)

setSolids([PLAYER, WALL])

let breath = 20
let tick = 0

const thoughts = [
  "Air feels heavy",
  "Breathing hurts",
  "Smog everywhere",
  "I need clean air",
  "This is not normal"
]

// MOVEMENT = BREATH COST
function move(dx, dy) {
  if (breath <= 0) return
  const p = getFirst(PLAYER)
  p.x += dx
  p.y += dy
  breath--
  updateThought()
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

// WORLD GETS WORSE OVER TIME
afterInput(() => {
  tick++

  if (tick % 2 === 0) {
    spawnSmog()
  }

  checkCollision()
})

// SPAWN POLLUTION
function spawnSmog() {
  const x = Math.floor(Math.random() * 8) + 1
  const y = Math.floor(Math.random() * 6) + 1

  if (getTile(x, y).length === 0) {
    addSprite(x, y, SMOG)
  }
}

// COLLISION = LOSE BREATH
function checkCollision() {
  const p = getFirst(PLAYER)
  getTile(p.x, p.y).forEach(t => {
    if (t.type === SMOG) {
      breath = 0
      endGame()
    }
  })
}

// MINIMAL THOUGHT UI
function updateThought() {
  clearText()
  addText("Breath: " + breath, { x: 1, y: 0 })

  if (breath <= thoughts.length * 3) {
    const t = thoughts[Math.floor((20 - breath) / 3)]
    if (t) addText(t, { x: 1, y: 8 })
  }
}

// ENDING
function endGame() {
  clearText()
  addText("NO AIR LEFT", { x: 2, y: 4 })
  addText("POLLUTION WON", { x: 1, y: 6 })
}

// START
updateThought()
