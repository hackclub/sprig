/*
@title: Cat Game
@description: A super cool cat game where you get as many treats as you can within the time limit!
@author: Gatoware
@tags: ['cat', 'game']
@addedOn: 2026-11-24
*/

const player = "p"
const treat = "t"

setLegend(
  [player, bitmap`
................
................
....0.....0.....
...060...060....
...063000360....
...066666660....
..0606660600....
..0066366600....
....0666660..0..
....066660..060.
....0666660060..
....066666660...
....06060660....
....000.000.....
................
................`],
  [treat, bitmap`
................
................
................
................
............0...
....00000..00...
...0CCC4C00C0...
..0C0CCCCCCC0...
..0CCCCCCCCC0...
...0CC4CC00C0...
....00000..00...
............0...
................
................
................
................`]
)

setSolids([])

let score = 0
let highscore = 0
let time = 300
let level = 0

const levels = [
  map`
........
.t......
........
...p....
........
........
........`,
  map`
........
........
........
........
........
........
........`
]

function gameOver() {
  highscore = Math.max(score, highscore)
  level = 1
  setMap(levels[level])
  clearText()

  addText("Game Over!", {
    x: 5, y: 4, color: color`3`
  })

  addText("Score: " + score, {
    x: 5, y: 6, color: color`0`
  })

  addText("High Score: " + highscore, {
    x: 3, y: 8, color: color`0`
  })

  addText("Press J to retry", {
    x: 2, y: 12, color: color`0`
  })
}

function updateText() {
  clearText()

  addText("Score: " + score + " Time: " + time, {
    x: 1, y: 0, color: color`0`
  })
}

function restartGame() {
  level = 0
  score = 0
  time = 300
  setMap(levels[level])
  updateText()
}

setMap(levels[level])
updateText()

setPushables({
  [player]: []
})

onInput("w", () => {
  if (level === 0) getFirst(player).y -= 1
})

onInput("a", () => {
  if (level === 0) getFirst(player).x -= 1
})

onInput("s", () => {
  if (level === 0) getFirst(player).y += 1
})

onInput("d", () => {
  if (level === 0) getFirst(player).x += 1
})

onInput("j", () => {
  if (level === 1) restartGame()
})

setInterval(() => {
  if (level !== 0) return

  time--

  if (time <= 0) {
    gameOver()
    return
  }

  if (Math.random() < 0.15) { // random chance!
    addSprite(
      Math.floor(Math.random() * width()),
      Math.floor(Math.random() * height()),
      treat
    )
  }

  updateText()
}, 200)

afterInput(() => {
  if (level !== 0) return

  const p = getFirst(player)

  for (const t of getTile(p.x, p.y)) {
    if (t.type === treat) {
      t.remove()
      score++
      updateText()
    }
  }

  if (getAll(treat).length === 0) {
    addSprite(
      Math.floor(Math.random() * width()),
      Math.floor(Math.random() * height()),
      treat
    )
  }
})