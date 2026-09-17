const player = "p"
const wall = "w"
const coin = "c"
const exit = "x"

setLegend(
  [player, bitmap`
................
................
....333333......
...33333333.....
...33333333.....
....333333......
.....3333.......
....33..33......
....33..33......
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

  [coin, bitmap`
................
................
......6666......
.....666666.....
....66666666....
....66666666....
.....666666.....
......6666......
................
................
................
................
................
................
................
................`],

  [exit, bitmap`
................
....44444444....
...44......44...
..44........44..
..4....44....4..
..4....44....4..
..4....44....4..
..4....44....4..
..4..........4..
...44......44...
....44444444....
................
................
................
................
................`]
)

setSolids([player, wall])

const gameMap = map`
wwwwwwwwww
wp.......w
w.c......w
w........w
w....c...w
w........w
w..c.....w
w......c.w
w.c.....xw
wwwwwwwwww`

setMap(gameMap)

let score = 0
let gameWon = false

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  if (gameWon) return

  const playerSprite = getFirst(player)
  const currentTile = getTile(playerSprite.x, playerSprite.y)

  for (const item of currentTile) {
    if (item.type === coin) {
      item.remove()
      score += 1
    }

    if (item.type === exit && score === 5) {
      gameWon = true

      clearText()

      addText("YOU WIN!", {
        x: 3,
        y: 5,
        color: color`6`
      })

      addText("Score: " + score, {
        x: 3,
        y: 7,
        color: color`4`
      })

      addText("Press J", {
        x: 4,
        y: 9,
        color: color`3`
      })

      return
    }
  }

  clearText()

  addText("CRYSTALS: " + score + "/5", {
    x: 1,
    y: 0,
    color: color`6`
  })
})

onInput("j", () => {
  setMap(gameMap)

  score = 0
  gameWon = false

  clearText()

  addText("CRYSTALS: 0/5", {
    x: 1,
    y: 0,
    color: color`6`
  })
})

addText("CRYSTALS: 0/5", {
  x: 1,
  y: 0,
  color: color`6`
})