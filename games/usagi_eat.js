
/*
@title: fat bunny
@description: fat bunny eats a lot
@author:rlu
@tags: ['fat', 'bunny']
@addedOn: 2026-11-18
*/

const topLeft = "a"
const topRight = "b"
const bottomLeft = "c"
const bottomRight = "d"
const carrot = "e"
const background = "g"
const star = "f"
const planet = "h"
const floater = "i"
const goldenCarrot = "k"
const sparkle = "l"

let gameStarted = false
let score = 0
let sparkleCountdown = 0

setLegend(
  [background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],

  [topLeft, bitmap`
.............00.
............0860
............0860
............0860
..........006666
.........0666666
........06600666
........06066666
.......066660666
.......066602066
.......066600066
.......068880660
.......068886600
........06666666
........06666660
.........0066666`],

  [topRight, bitmap`
00..............
680.............
680.............
680.............
66600...........
666660..........
6600660.........
6666060.........
66066660........
60206660........
60006660........
66088860........
06688860........
6666660.........
6666660.........
666600..........`],

  [bottomLeft, bitmap`
.......006666666
.......066666666
........00666666
.........0666666
..........066666
...........06666
............0660
.............00.
................
................
................
................
................
................
................
................`],

  [bottomRight, bitmap`
66666600........
66666660........
6666600.........
666660..........
66660...........
6660............
660.............
00..............
................
................
................
................
................
................
................
................`],

  [carrot, bitmap`
................
.........0......
.....DD.0C0.....
....D44DC0......
.....DD4C00.....
....099DC660....
...0339966690...
...0339966990...
...0333999930...
...0333333330...
...0333333330...
....03333330....
.....000000.....
................
................
................`],

  [goldenCarrot, bitmap`
................
................
........0.......
.......090......
.....00960......
.....02330......
...002233200....
..022223322200..
..0222222222200.
..0666666666660.
..0666666666660.
..0233233323320.
..0666666666660.
...00000000000..
................
................`],

  [star, bitmap`
................
................
......0000......
.....022220.....
.....022220.....
...0022222200...
..022226622220..
..022266662220..
..022226622220..
...0022222200...
.....022220.....
.....022220.....
......0000......
................
................
................`],

  ["j", bitmap`
................
.......6........
................
.......6........
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

  [planet, bitmap`
................
................
......00........
.....0880.......
....088880...0..
....088880..0...
..00088880.0....
.0880888800000..
.08888888660..0.
.08888886600....
.008888660......
...008660.......
....0600........
....00..........
................
................`],

  [floater, bitmap`
................
................
................
................
................
................
................
................
......D..D......
......D..D......
......D..D......
......D..D......
................
................
................
................`],

  [sparkle, bitmap`
................
..6.............
..6.............
.666............
66666...........
.666............
..6.............
..6.............
................
.............6..
.............6..
............666.
...........66666
............666.
.............6..
.............6..`]
)

setSolids([])

setBackground(background)

setMap(map`
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
................`)

addSprite(7, 7, topLeft)
addSprite(8, 7, topRight)
addSprite(7, 8, bottomLeft)
addSprite(8, 8, bottomRight)

addText("fat bunny eats", {
  x: 3,
  y: 3,
  color: color`2`
})

addText("apple&cake", {
  x: 5,
  y: 5,
  color: color`2`
})

addText("wasd to move", {
  x: 4,
  y: 9,
  color: color`D`
})

addText("press j", {
  x: 6,
  y: 11,
  color: color`D`
})

const level = map`
................
................
..k.............
................
...........e....
................
................
.......ab.......
.......cd.......
................
....e...........
................
.............e..
................
................
................`

function updateScore() {
  clearText()
  addText("score: " + score, {
    x: 3,
    y: 14,
    color: color`D`
  })
}

function goldenEffect() {
  const bunnyParts = [
    getFirst(topLeft),
    getFirst(topRight),
    getFirst(bottomLeft),
    getFirst(bottomRight)
  ]

  for (const part of bunnyParts) {
    if (!part) continue
    addSprite(part.x, part.y, sparkle)
  }

  sparkleCountdown = 1
}

function spawnCarrot() {
  let x
  let y

  do {
    x = Math.floor(Math.random() * width())
    y = Math.floor(Math.random() * height())
  } while (getTile(x, y).length > 0)

  if (Math.random() < 0.2) {
    addSprite(x, y, goldenCarrot)
  } else {
    addSprite(x, y, carrot)
  }
}

function checkFood() {
  const parts = [
    getFirst(topLeft),
    getFirst(topRight),
    getFirst(bottomLeft),
    getFirst(bottomRight)
  ]

  let pointsEarned = 0
  let gotGoldenCarrot = false

  for (const part of parts) {
    if (!part) continue

    const items = getTile(part.x, part.y)

    for (const item of items) {
      if (item.type === carrot) {
        item.remove()
        pointsEarned += 1
      }

      if (item.type === goldenCarrot) {
        item.remove()
        pointsEarned += 5
        gotGoldenCarrot = true
      }
    }
  }

  if (gotGoldenCarrot) {
    goldenEffect()
  }

  if (pointsEarned > 0) {
    score += pointsEarned
    updateScore()
    spawnCarrot()
  }
}

function moveCharacter(dx, dy) {
  if (!gameStarted) return

  const a = getFirst(topLeft)
  const b = getFirst(topRight)
  const c = getFirst(bottomLeft)
  const d = getFirst(bottomRight)

  if (!a || !b || !c || !d) return

  if (a.x + dx < 0 || a.x + dx + 1 >= width()) return
  if (a.y + dy < 0 || a.y + dy + 1 >= height()) return

  a.x += dx
  b.x += dx
  c.x += dx
  d.x += dx

  a.y += dy
  b.y += dy
  c.y += dy
  d.y += dy

  checkFood()
}

function startGame() {
  if (gameStarted) return

  gameStarted = true
  score = 0
  sparkleCountdown = 0

  setMap(level)
  setBackground(background)

  addSprite(1, 1, star)
  addSprite(5, 2, star)
  addSprite(14, 1, star)
  addSprite(2, 6, star)
  addSprite(14, 6, star)
  addSprite(1, 12, star)
  addSprite(6, 13, star)
  addSprite(14, 12, star)
  addSprite(9, 1, star)
  addSprite(12, 14, star)

  addSprite(13, 3, planet)
  addSprite(1, 9, planet)

  addSprite(3, 4, floater)
  addSprite(12, 10, floater)
  addSprite(7, 4, floater)
  addSprite(12, 1, floater)
  addSprite(4, 8, floater)
  addSprite(13, 6, floater)
  addSprite(10, 6, floater)
  addSprite(6, 11, floater)
  addSprite(13, 13, floater)
  addSprite(3, 13, floater)
  addSprite(9, 3, floater)
  addSprite(10, 10, floater)
  addSprite(11, 8, floater)
  addSprite(5, 5, floater)
  addSprite(2, 10, floater)

  updateScore()

  const stars = getAll(star)
  const planets = getAll(planet)

  let planetDirections = [-1, 1]
  let floatSteps = 0

  setInterval(() => {
    if (!gameStarted) return

    if (sparkleCountdown > 0) {
      sparkleCountdown--

      if (sparkleCountdown === 0) {
        const remainingSparkles = getAll(sparkle)

        for (const item of remainingSparkles) {
          item.remove()
        }
      }
    }

    for (let i = 0; i < planets.length; i++) {
      const item = planets[i]

      if (!item) continue

      if (item.y >= (i === 0 ? 1 : 10)) {
        planetDirections[i] = -1
      }

      if (item.y <= (i === 0 ? 2 : 10)) {
        planetDirections[i] = 1
      }

      item.y += planetDirections[i]
    }

    floatSteps++

    for (let i = 0; i < stars.length; i++) {
      const item = stars[i]

      if (!item) continue

      if ((floatSteps + i) % 2 === 0) {
        item.type = star
      } else {
        item.type = "j"
      }
    }
  }, 500)
}

onInput("j", () => {
  if (!gameStarted) {
    startGame()
  }
})

onInput("w", () => {
  moveCharacter(0, -1)
})

onInput("s", () => {
  moveCharacter(0, 1)
})

onInput("a", () => {
  moveCharacter(-1, 0)
})

onInput("d", () => {
  moveCharacter(1, 0)
})
