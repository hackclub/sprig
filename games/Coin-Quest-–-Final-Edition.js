/*
@title: Coin Quest – Final Edition
@author: Kabir Saini
@tags: [maze, collect, enemy, arcade]
*/

const PLAYER = "p"
const WALL = "w"
const COIN = "c"
const ENEMY = "e"

setLegend(
  [PLAYER, bitmap`
................
....333333......
....333333......
....333333......
....333333......
................
................
....333333......
....333333......
....333333......
....333333......
................
................
................
................
................`],
  [WALL, bitmap`
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
  [COIN, bitmap`
................
................
.....6666.......
....666666......
....666666......
.....6666.......
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
  [ENEMY, bitmap`
................
....555555......
....555555......
....555555......
....555555......
................
................
....555555......
....555555......
....555555......
....555555......
................
................
................
................
................`]
)

setSolids([PLAYER, WALL, ENEMY])

let level = 0
let score = 0
let lives = 3
let gameOver = false

const levels = [
  map`
wwwwwwwww
wp..c..ew
w.www.w.w
w..c....w
wwwwwwwww`,
  map`
wwwwwwwwww
wp.c..w..w
w.www.we.w
w..c.....w
wwwwwwwwww`,
  map`
wwwwwwwwwww
wp..c...e.w
w.www.w.w.w
w..c..c...w
wwwwwwwwwww`
]

function drawHUD() {
  clearText()
  addText("Score: " + score, { x: 0, y: 0 })
  addText("Lives: " + lives, { x: 0, y: 1 })
  addText("Level: " + (level + 1), { x: 0, y: 2 })
  if (gameOver) {
    addText("Press I to Restart", { x: 1, y: 11 })
  }
}

function loadLevel() {
  setMap(levels[level])
  drawHUD()
}

loadLevel()

onInput("w", () => !gameOver && getFirst(PLAYER).y--)
onInput("s", () => !gameOver && getFirst(PLAYER).y++)
onInput("a", () => !gameOver && getFirst(PLAYER).x--)
onInput("d", () => !gameOver && getFirst(PLAYER).x++)

onInput("i", () => {
  if (!gameOver) return
  level = 0
  score = 0
  lives = 3
  gameOver = false
  loadLevel()
})

afterInput(() => {
  if (gameOver) return

  const coinHit = tilesWith(PLAYER, COIN)
  if (coinHit.length) {
    coinHit[0][1].remove()
    score += 10
    drawHUD()
  }

  if (tilesWith(PLAYER, ENEMY).length) {
    lives--
    if (lives <= 0) {
      gameOver = true
      clearText()
      addText("GAME OVER", { x: 4, y: 6 })
      addText("Score: " + score, { x: 4, y: 7 })
      addText("Press I to Restart", { x: 1, y: 9 })
      return
    }
    loadLevel()
    return
  }

  if (tilesWith(COIN).length === 0) {
    level++
    if (level < levels.length) {
      loadLevel()
    } else {
      gameOver = true
      clearText()
      addText("YOU WIN!", { x: 5, y: 6 })
      addText("Final Score: " + score, { x: 2, y: 8 })
      addText("Press I to Restart", { x: 1, y: 10 })
    }
  }
})

setInterval(() => {
  if (gameOver) return
  for (const e of getAll(ENEMY)) {
    const d = Math.floor(Math.random() * 4)
    if (d === 0) e.y--
    if (d === 1) e.y++
    if (d === 2) e.x--
    if (d === 3) e.x++
  }
}, 600)