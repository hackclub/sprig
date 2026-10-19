/*
@title: Brick Field
@author: TheDerpyMit
@description: The goal is to destroy all the bricks and get the highest score before you run out of lives
@tags: ['puzzle']
@addedOn: 2026-10-19
*/


const player = "p"
const wall = "w"
const brick = "b"
const bumper = "o"

setLegend(
  [player, bitmap`
................
.......00.......
......3333......
.....333333.....
...3333333333...
..3...3333...3..
......3333......
.....3....3.....
.....3....3.....
.....3....3.....
.....3....3.....
.....3....3.....
.....3....3.....
....3......3....
................
................`],
  [wall, bitmap`
11C1111111111C11
111111111C111111
111C1C11111C1111
C111111111111111
111111111C1111C1
11CC11C1111C11C1
1111111111111111
111C11CC11111C11
C111111111111111
1C11111C1111CC11
1111C111C1111C1C
1111111111C1111C
1C1111C111111C11
111C111111111111
111CCC1111C11111
1C1111C11111C11C`],
  [brick, bitmap`
0000000000000000
0LLLLFFFFFFLLLL0
0LFFFFFFFFFFFFL0
0LFFFFFFFFFFFFL0
0LFFFFFFFFFFFFL0
0FFFFFFFFFFFFFF0
0FFFFF6666FFFFF0
0FFFFF6666FFFFF0
0FFFFF6666FFFFF0
0FFFFF6666FFFFF0
0FFFFFFFFFFFFFF0
0LFFFFFFFFFFFFL0
0LFFFFFFFFFFFFL0
0LFFFFFFFFFFFFL0
0LLLLLFFFFLLLLL0
0000000000000000`],
  [bumper, bitmap`
................
......4444......
....44444444....
...444444444....
...444444444....
....44444444....
......4444......
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

setSolids([wall, brick, bumper])

const level = map`
wwwwwwwwwwwwwwww
w..............w
w.b.b.b.b.b.b..w
w.b.b.b.b.b.b..w
w..............w
w..o......o....w
w..............w
w.b.b.b.b.b.b..w
w..............w
w....o....o....w
w..............w
w.b.b.b.b.b.b..w
w..............w
w.......p......w
w..............w
wwwwwwwwwwwwwwww
`

setMap(level)
setBackground(wall)

let score = 0
let lives = 3
let started = false
let gameOver = false

let vx = 0
let vy = -1

let leftFlipper = false
let rightFlipper = false

function ball() {
  return getFirst(player)
}

function hasType(x, y, type) {
  return getTile(x, y).some(sprite => sprite.type === type)
}

function removeBrick(x, y) {
  const tile = getTile(x, y)
  for (const sprite of tile) {
    if (sprite.type === brick) {
      sprite.remove()
      score += 10
      return true
    }
  }
  return false
}

function updateHUD() {
  clearText()
  addText("SCORE " + score, {
    x: 1,
    y: 1,
    color: color`3`
  })
  addText("LIVES " + lives, {
    x: 10,
    y: 1,
    color: color`3`
  })
}

function restart() {
  setMap(level)

  score = 0
  lives = 3
  started = false
  gameOver = false
  vx = 0
  vy = -1
  leftFlipper = false
  rightFlipper = false

  updateHUD()
}

function loseLife() {
  lives -= 1

  if (lives <= 0) {
    gameOver = true
    clearText()
    addText("GAME OVER", {
      x: 5,
      y: 6,
      color: color`3`
    })
    addText("SCORE " + score, {
      x: 5,
      y: 8,
      color: color`3`
    })
    addText("PRESS I", {
      x: 5,
      y: 10,
      color: color`7`
    })
    return
  }

  const oldBall = ball()
  oldBall.remove()

  addSprite(8, 13, player)

  vx = 0
  vy = -1
  started = false

  updateHUD()
}

onInput("w", () => {
  if (gameOver || started) return

  started = true
  vx = 0
  vy = -1
})

onInput("a", () => {
  if (gameOver) return

  leftFlipper = true

  if (started && ball().y >= 11) {
    vx = -1
    vy = -1
  }
})

onInput("d", () => {
  if (gameOver) return

  rightFlipper = true

  if (started && ball().y >= 11) {
    vx = 1
    vy = -1
  }
})

onInput("s", () => {
  if (gameOver || !started) return
  if (ball().y >= 10) {
    vy = -1
  }
})

onInput("i", () => {
  if (gameOver) restart()
})

function tick() {
  if (!started || gameOver) return

  const b = ball()

  const nextX = b.x + vx

  if (hasType(nextX, b.y, wall)) {
    vx = -vx
  } else if (hasType(nextX, b.y, bumper)) {
    vx = -vx
    vy = -vy
  } else if (hasType(nextX, b.y, brick)) {
    removeBrick(nextX, b.y)
    vx = -vx
    vy = -vy
  } else {
    b.x = nextX
  }

  const nextY = b.y + vy

  if (hasType(b.x, nextY, wall)) {
    vy = -vy
  } else if (hasType(b.x, nextY, bumper)) {
    vy = -vy
    vx = -vx
  } else if (hasType(b.x, nextY, brick)) {
    removeBrick(b.x, nextY)
    vy = -vy
  } else {
    b.y = nextY
  }

  if (b.y >= 14) {
    loseLife()
    return
  }

  if (b.y >= 12) {
    if (leftFlipper) {
      vx = -1
      vy = -1
    }

    if (rightFlipper) {
      vx = 1
      vy = -1
    }
  }

  leftFlipper = false
  rightFlipper = false

  if (getAll(brick).length === 0) {
    gameOver = true
    clearText()
    addText("YOU WON!", {
      x: 5,
      y: 6,
      color: color`4`
    })
    addText("SCORE " + score, {
      x: 5,
      y: 8,
      color: color`3`
    })
    addText("PRESS I", {
      x: 5,
      y: 10,
      color: color`5`
    })
    return
  }

  updateHUD()
}

setInterval(tick, 180)
updateHUD()
