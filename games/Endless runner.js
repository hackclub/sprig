/*
@title: Endless runner
@description: "
@author: Ansh Verma
@tags: ['runner']
@addedOn: 2022-05-13

Instructions:
A fun endless runner game, where you must avoid the boxes and avoid getting pushed to the edge of the screen and become "squashed." 
Press WASD to move and J to restart. Very self-explanatory.


*/

const player = "p"
const obstacle = "o"

setLegend(
  [player, bitmap`
................
................
................
....00000000....
...0........0...
...0........0...
...0..7..7..0...
...0........0...
...0........0...
...0.777777.0...
...0........0...
...0........0...
....00000000....
................
................
................`],
  [obstacle, bitmap`
................
................
................
....00000000....
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
....00000000....
................
................
................`]
)

setSolids([player, obstacle])
setPushables({ [obstacle]: [player] })

const levels = [
  map`
.......
.......
p......
.......
.......`
]

// Function to start or reset the game
function startGame() {
  clearText()
  getAll(obstacle).forEach(o => o.remove())
  setMap(levels[0])
}

startGame()

function generateObstacles() {
  const x = width() - 1
  let y1 = Math.floor(Math.random() * height())
  let y2 = Math.floor(Math.random() * height())
  while (y2 === y1) {
    y2 = Math.floor(Math.random() * height())
  }
  addSprite(x, y1, obstacle)
  addSprite(x, y2, obstacle)
}

setInterval(() => {
  const p = getFirst(player)
  if (!p) return

  getAll(obstacle).forEach(obs => {
    // Fixed the typo here: changed ) to }
    if (obs.x === 1 && p.x === 0 && obs.y === p.y) {
      addText("SQUISHED!", { y: 2, color: color`3` })
      addText("Press j to restart!", { y: 4, color: color`3` })
      p.remove()
    }

    if (obs.x <= 0) {
      obs.remove()
    } else {
      obs.x -= 1
    }
  })

  if (p && p.x < 0) {
    addText("GAME OVER", { y: 2, color: color`3` })
    addText("Press j to restart!", { y: 4, color: color`3` })
    p.remove()
  }
}, 200)

setInterval(generateObstacles, 600)

onInput("w", () => { if (getFirst(player)) getFirst(player).y -= 1 })
onInput("a", () => { if (getFirst(player)) getFirst(player).x -= 1 })
onInput("s", () => { if (getFirst(player)) getFirst(player).y += 1 })
onInput("d", () => { if (getFirst(player)) getFirst(player).x += 1 })

// Restart logic
onInput("j", () => {
  if (!getFirst(player)) {
    startGame()
  }
})