/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Memory Maze
@author: pjontop
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"
const floor = "f"
const blank = "b"

setLegend(
  [player, bitmap`
................
................
................
......0000......
.....00..00.....
.....00..00.....
......0000......
......0..0......
......0..0......
......0000......
.....00..00.....
.....00..00.....
......0000......
................
................
................`],
  [wall, bitmap`
4444444444444444
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4666666666666664
4444444444444444`],
  [goal, bitmap`
................
................
................
.......33.......
......3333......
.....333333.....
.....333333.....
......3333......
.......33.......
................
................
................
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
................`],
  [blank, bitmap`
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
1111111111111111`]
)

setSolids([player, wall])

const levels = [
  map`
wwwwwwwwww
wpfffffffw
wfwffffgfw
wfwfwfwffw
wfffffwffw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpfwfffffw
wfwfwwwffw
wfwfwfgffw
wfffffwffw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpfwwwwwww
wfffffffww
wfwfwfwfgw
wfwfwffffw
wwwwwwwwww`
]

let level = 0
let lives = 3
let timeLeft = 30
let timerId

function startLevel() {
  clearText()
  setMap(levels[level])
  timeLeft = 30
  drawUI()
  hideMazeDelayed()
  startTimer()
}

function drawUI() {
  clearText()
  addText(`Lives: ${lives}`, { x: 0, y: 0, color: color`3` })
  addText(`Time: ${timeLeft}`, { x: 10, y: 0, color: color`4` })
  addText(`Lvl: ${level+1}`, { x: 0, y: 1, color: color`2` })
}

function hideMazeDelayed() {
  setTimeout(() => {
    for (let y = 0; y < height(); y++) {
      for (let x = 0; x < width(); x++) {
        const tile = getTile(x, y)
        if (tile.length && (tile[0].type === wall || tile[0].type === floor)) {
          clearTile(x, y)
          addSprite(x, y, blank)
        }
      }
    }
  }, 3000)
}

function startTimer() {
  if (timerId) clearInterval(timerId)
  timerId = setInterval(() => {
    timeLeft--
    drawUI()
    if (timeLeft <= 0) {
      loseLife("Time's up!")
    }
  }, 1000)
}

function loseLife(message) {
  lives--
  clearInterval(timerId)
  clearText()
  addText(message, { y: 6, color: color`2` })
  if (lives > 0) {
    setTimeout(startLevel, 2000)
  } else {
    setTimeout(() => {
      addText("GAME OVER", { y: 7, color: color`2` })
    }, 1000)
  }
}

function nextLevel() {
  clearInterval(timerId)
  level++
  if (level < levels.length) {
    startLevel()
  } else {
    clearText()
    addText("YOU WIN!", { y: 6, color: color`3` })
  }
}

// Controls
onInput("w", () => moveOrLose(0, -1))
onInput("a", () => moveOrLose(-1, 0))
onInput("s", () => moveOrLose(0, 1))
onInput("d", () => moveOrLose(1, 0))

// Hint key
onInput("j", () => {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      const tile = getTile(x, y)
      if (tile.length && tile[0].type === blank) {
        clearTile(x, y)
        const origTile = levels[level].get(x, y)
        if (origTile === "w") addSprite(x, y, wall)
        if (origTile === "f") addSprite(x, y, floor)
      }
    }
  }
  setTimeout(() => {
    hideMazeDelayed()
  }, 1000)
})

function moveOrLose(dx, dy) {
  const p = getFirst(player)
  const x = p.x + dx
  const y = p.y + dy

  const nextTile = getTile(x, y)
  if (nextTile.length && nextTile[0].type === wall) {
    loseLife("You hit a wall!")
  } else {
    p.x = x
    p.y = y
  }
}

afterInput(() => {
  const p = getFirst(player)
  const g = getFirst(goal)
  if (p.x === g.x && p.y === g.y) {
    nextLevel()
  }
})

startLevel()
