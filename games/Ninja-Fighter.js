/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Ninja Fighter
@description: 
@author:sani*/

const player = "p"
const enemy = "e"
const wall = "w"
const goal = "g"

setLegend(
  [player, bitmap`
................
.......000......
......0330......
......0300......
.....033330.....
.....030030.....
......3330......
......0500......
.....0...0......
.....0...0......
....00...00.....
................
................
................
................
................`],

  [enemy, bitmap`
................
......3333......
......3003......
......3333......
.......33.......
......3333......
......3..3......
.....3....3.....
................
................
................
................
................
................
................
................`],

  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [goal, bitmap`
................
.....666666.....
.....6....6.....
.....6....6.....
.....666666.....
.....6....6.....
.....6....6.....
.....666666.....
................
................
................
................
................
................
................
................`]
)

setSolids([player, wall, enemy])

setMap(map`
wwwwwwwwwwww
wp.........w
w..........w
w....ww....w
w..........w
w........g.w
wwwwwwwwwwww
`)

let health = 5
let score = 0
let gameOver = false

function updateHUD() {
  clearText()

  addText("H:" + health, {
    x: 0,
    y: 0,
    color: color`3`
  })

  addText("S:" + score, {
    x: 0,
    y: 1,
    color: color`4`
  })
}

updateHUD()

// Random enemy spawning
let enemyCount = Math.floor(Math.random() * 4) + 3

for (let i = 0; i < enemyCount; i++) {
  let placed = false

  while (!placed) {
    let x = Math.floor(Math.random() * width())
    let y = Math.floor(Math.random() * height())

    if (getTile(x, y).length === 0) {
      addSprite(x, y, enemy)
      placed = true
    }
  }
}

// Player movement
onInput("w", () => {
  if (!gameOver) getFirst(player).y -= 1
})

onInput("s", () => {
  if (!gameOver) getFirst(player).y += 1
})

onInput("a", () => {
  if (!gameOver) getFirst(player).x -= 1
})

onInput("d", () => {
  if (!gameOver) getFirst(player).x += 1
})

// Sword attack
onInput("j", () => {
  if (gameOver) return

  const p = getFirst(player)

  for (const e of getAll(enemy)) {
    if (
      Math.abs(p.x - e.x) <= 1 &&
      Math.abs(p.y - e.y) <= 1
    ) {
      e.remove()
      score += 10
    }
  }

  updateHUD()
})

afterInput(() => {
  if (gameOver) return

  const p = getFirst(player)

  // Random enemy movement
  for (const e of getAll(enemy)) {
    const dir = Math.floor(Math.random() * 4)

    if (dir === 0 && e.x < width() - 2) e.x += 1
    if (dir === 1 && e.x > 1) e.x -= 1
    if (dir === 2 && e.y < height() - 2) e.y += 1
    if (dir === 3 && e.y > 1) e.y -= 1
  }

  // Damage player
  for (const e of getAll(enemy)) {
    if (
      p.x === e.x &&
      p.y === e.y
    ) {
      health--
      updateHUD()

      if (health <= 0) {
        gameOver = true
        clearText()

        addText("GAME", {
          x: 5,
          y: 5,
          color: color`3`
        })

        addText("OVER", {
          x: 5,
          y: 6,
          color: color`3`
        })
      }
    }
  }

  // Win condition
  const g = getFirst(goal)

  if (
    g &&
    p.x === g.x &&
    p.y === g.y
  ) {
    gameOver = true
    clearText()

    addText("YOU", {
      x: 5,
      y: 5,
      color: color`4`
    })

    addText("WIN!", {
      x: 5,
      y: 6,
      color: color`4`
    })
  }
})