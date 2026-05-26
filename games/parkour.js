/*
  SPRIG PARKOUR GAME
  By Balram Gautam

  Controls:
  A = left
  D = right
  W = jump
*/

const player = "p"
const ground = "g"
const spike = "s"
const goal = "x"

setLegend(
  [ player, bitmap`
................
................
......3333......
.....333333.....
.....303033.....
.....333333.....
......3333......
.....333333.....
....33333333....
....330..033....
....330..033....
....33333333....
.....33..33.....
....333..333....
....33....33....
................` ],

  [ ground, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111` ],

  [ spike, bitmap`
................
................
................
.......33.......
......3333......
.....333333.....
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],

  [ goal, bitmap`
2222222222222222
2222222222222222
2222000000222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220222220222222
2220000000222222
2222222222222222
2222222222222222` ]
)

setSolids([ player, ground ])

const levels = [
  map`
........................
........................
........................
........................
..............s.........
.........gggggggg.......
........................
.....s..................
..p..gggg.....s........x
gggggggggggggggggggggggg`,

  map`
........................
........................
....................x...
.................gggggg.
............s...........
.........gggggg.........
........................
....s...................
.p..gggg.....s..........
gggggggggggggggggggggggg`
]

let level = 0

setMap(levels[level])

let velocityY = 0
let grounded = false

function resetLevel() {
  setMap(levels[level])
  velocityY = 0
}

function nextLevel() {
  level++

  if (level >= levels.length) {
    clearText()
    addText("YOU WIN!", {
      x: 5,
      y: 6,
      color: color`4`
    })
    return
  }

  setMap(levels[level])
  velocityY = 0
}

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("w", () => {
  if (grounded) {
    velocityY = -2
    grounded = false
  }
})

afterInput(() => {
  const p = getFirst(player)

  // Gravity
  velocityY += 1

  if (velocityY > 1) velocityY = 1

  // Move vertically
  if (velocityY > 0) {
    p.y += 1
  }

  if (velocityY < 0) {
    p.y -= 1
  }

  // Ground check
  grounded = false

  try {
    p.y += 1

    if (p.y !== height()) {
      grounded = true
    }

    p.y -= 1
  } catch {
    grounded = true
  }

  // Spike collision
  if (tilesWith(player, spike).length > 0) {
    clearText()
    addText("OUCH!", {
      x: 7,
      y: 1,
      color: color`3`
    })

    resetLevel()
  }

  // Goal collision
  if (tilesWith(player, goal).length > 0) {
    clearText()
    addText("LEVEL CLEAR!", {
      x: 3,
      y: 1,
      color: color`4`
    })

    nextLevel()
  }
})

addText("PARKOUR!", {
  x: 5,
  y: 1,
  color: color`4`
})