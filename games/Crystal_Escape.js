/*
@title: Crystal Escape
@description: Collect every crystal and escape the dungeon!
@author: Tejus
@tags: ['arcade', 'maze', 'adventure']
@addedOn: 2026-09-20
*/

const player = "p"
const wall = "w"
const crystal = "c"
const enemy = "e"
const exit = "x"
const floor = "f"

setLegend(
  [player, bitmap`
................
................
......000.......
.....0...0......
....0.....0.....
....0.000.0.....
....0.333.0.....
....0.....0.....
.....0...0......
......000.......
......0.0.......
.....0...0......
....0.....0.....
....0.....0.....
.....00000......
................`],

  [wall, bitmap`
1111111111111111
1111111111111111
11............11
11............11
11..11111111..11
11..11111111..11
11............11
11............11
11..11111111..11
11..11111111..11
11............11
11............11
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],

  [crystal, bitmap`
................
................
.......33.......
......3333......
.....333333.....
....33333333....
....33333333....
.....333333.....
......3333......
.......33.......
.......33.......
......3333......
.....33..33.....
................
................
................`],

  [enemy, bitmap`
................
.....000000.....
...0000000000...
..00..0000..00..
..00..0000..00..
.00000000000000.
.000..0000..000.
.000..0000..000.
.00000000000000.
..00..0000..00..
..00..0000..00..
...0000000000...
.....00..00.....
....00....00....
................
................`],

  [exit, bitmap`
................
................
....55555555....
...55......55...
..55........55..
..5....55....5..
..5...5555...5..
..5...5555...5..
..5....55....5..
..55........55..
...55......55...
....55555555....
................
................
................
................`],

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
................`]
)

setSolids([player, wall, enemy])

setBackground(floor)

let level = 0
let crystals = 0
let lives = 3
let gameOver = false

const levels = [
  map`
wwwwwwwwwwww
w.p....c...w
w.wwww.www.w
w....e.....w
w.wwww.ww..w
w.c........w
w....wwww..w
w....c.....w
w.wwww.wwx.w
w..........w
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
w.p....w...w
w.wwww.w.c.w
w....e.w...w
w.wwww.www.w
w.c........w
w....wwww..w
w..c.......w
w.wwww.wwx.w
w..........w
wwwwwwwwwwww`,

  map`
wwwwwwwwwwww
w.p...w....w
w.ww..w.c..w
w..e..w....w
w.wwwww.ww.w
w.c........w
w....wwww..w
w..c.......w
w.wwww.wwx.w
w..........w
wwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("w", () => {
  if (!gameOver) {
    getFirst(player).y -= 1
  }
})

onInput("a", () => {
  if (!gameOver) {
    getFirst(player).x -= 1
  }
})

onInput("s", () => {
  if (!gameOver) {
    getFirst(player).y += 1
  }
})

onInput("d", () => {
  if (!gameOver) {
    getFirst(player).x += 1
  }
})

onInput("j", () => {
  if (gameOver) {
    level = 0
    lives = 3
    crystals = 0
    gameOver = false
    clearText()
    setMap(levels[level])
  } else {
    crystals = 0
    setMap(levels[level])
  }
})

afterInput(() => {
  if (gameOver) return

  const collected = tilesWith(player, crystal)

  if (collected.length > 0) {
    crystals += collected.length

    for (const tile of collected) {
      for (const sprite of tile) {
        if (sprite.type === crystal) {
          sprite.remove()
        }
      }
    }
  }

  const danger = tilesWith(player, enemy)

  if (danger.length > 0) {
    lives -= 1

    if (lives <= 0) {
      clearText()

      addText("GAME OVER", {
        x: 4,
        y: 5,
        color: color`3`
      })

      addText("Press J", {
        x: 5,
        y: 7,
        color: color`7`
      })

      gameOver = true
      return
    }

    setMap(levels[level])
    return
  }

  const atExit = tilesWith(player, exit)

  if (atExit.length > 0) {
    const remaining = getAll(crystal).length

    if (remaining === 0) {
      level += 1

      if (level < levels.length) {
        setMap(levels[level])
      } else {
        clearText()

        addText("YOU ESCAPED!", {
          x: 3,
          y: 4,
          color: color`3`
        })

        addText("CRYSTALS: " + crystals, {
          x: 2,
          y: 6,
          color: color`7`
        })

        addText("Press J", {
          x: 5,
          y: 8,
          color: color`6`
        })

        gameOver = true
      }
    }
  }
})
