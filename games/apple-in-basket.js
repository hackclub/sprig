
/*
@title: apple-in-basket
@author: kithu
@description: Collect small apples and big apples to get points.
@tags: ['puzzle']
@addedOn: 2026-11-21
*/


const player = "p"
const apple1 = "a"
const apple2 = "b"
const green = "green"

setLegend(
  [player, bitmap`
................
................
................
................
....CC9CC9......
....C....C......
...C......C.....
...CCCCCC9C.....
...CCCCCCCC.....
...C9CCCC9C.....
...CC99CCCC.....
....9C9C99......
................
................
................
................`],
  [apple1, bitmap`
................
................
................
................
................
......C4........
......C.4.......
....33C33.......
....33333.......
....33333.......
.....333........
................
................
................
................
................`],
  [apple2, bitmap`
................
................
................
................
................
....44C.........
...4DDC.........
..4DD3C33.......
..DD333333......
...3333333......
...3333333......
....33333.......
................
................
................
................`]
)

setSolids([player])

let gameOver = false
let score = 0
let timeLeft = 10

const levels = [
  map`
abaaa
ababa
baaba
abaab
bapbb`
]

setMap(levels[0])

setPushables({
  [player]: []
})

function updateText() {
  clearText()

  addText("Score: " + score, {
    x: 1,
    y: 1,
    color: color`3`
  })

  addText("Time: " + timeLeft, {
    x: 1,
    y: 0,
    color: color`6`
  })
}

updateText()

setInterval(() => {
  if (!gameOver) {
    timeLeft -= 1

    if (timeLeft <= 0) {
      timeLeft = 0
      gameOver = true
      clearText()

      addText("GAME OVER Oof!", {
        x: 3,
        y: 5,
        color: color`3`
      })

      addText("Score: " + score, {
        x: 3,
        y: 7,
        color: color`3`
      })
    } else {
      updateText()
    }
  }
}, 1000)

// Moving up
onInput("w", () => {
  if (!gameOver && getFirst(player).y > 0) {
    getFirst(player).y -= 1
  }
})

// Moving left
onInput("a", () => {
  if (!gameOver && getFirst(player).x > 0) {
    getFirst(player).x -= 1
  }
})

// Moving right
onInput("d", () => {
  if (!gameOver && getFirst(player).x < 4) {
    getFirst(player).x += 1
  }
})

// Moving down
onInput("s", () => {
  if (!gameOver && getFirst(player).y < 4) {
    getFirst(player).y += 1
  }
})

// Collect apples
afterInput(() => {
  if (gameOver) return

  const playerSprite = getFirst(player)
  const sprites = getTile(playerSprite.x, playerSprite.y)

  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].type === apple1 || sprites[i].type === apple2) {
      sprites[i].remove()
      score += 1
    }
  }

  // Update display
  updateText()

  // Winner screen
  if (score == 24) {
    gameOver = true
    clearText()

    addText("WINNER!", {
      x: 1,
      y: 1,
      color: color`6`
    })

    addText("Score: " + score, {
      x: 2,
      y: 3,
      color: color`3`
    })
  }
})
