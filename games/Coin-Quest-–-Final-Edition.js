/*
@title: Coin Quest Final Edition
@author: Kabir Saini
@description: A maze-based arcade game where players collect coins, avoid enemies, gain extra lives from hearts, and progress through handcrafted and infinite procedurally generated levels.
@tags: ['maze', 'collect', 'enemy', 'arcade']
@addedOn: 2025-01-19
*/

const PLAYER = "p"
const WALL = "w"
const COIN = "c"
const ENEMY = "e"
const HEART = "h"

const MAX_LIVES = 5

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
................`],
  [HEART, bitmap`
................
....077770......
...07777770.....
...07777770.....
....077770......
................
................
....077770......
...07777770.....
...07777770.....
....077770......
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

/* ---------------- HANDCRAFTED LEVELS ---------------- */

const baseLevels = [
  map`
wwwwwwwww
wp..c...w
w.www.w.w
w..c....w
wwwwwwwww`,

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
wwwwwwwwww
wp.c..w.ew
w.www.we.w
w..c..h..w
wwwwwwwwww`,

  map`
wwwwwwwwwww
wp..c...e.w
w.www.w.w.w
w..c..c.h.w
wwwwwwwwwww`,

  map`
wwwwwwwwwww
wp.c.e.c..w
w.www.w.w.w
w..c..e.h.w
wwwwwwwwwww`,

  map`
wwwwwwwwwwww
wp.c.e..c..w
w.www.w.w.we
w..c..e..c.w
wwwwwwwwwwww`
]

/* ---------------- PROCEDURAL LEVEL ---------------- */

function generateLevel(difficulty) {
  const size = Math.min(7 + difficulty, 13)
  let grid = Array(size).fill(0).map(() => Array(size).fill("."))

  for (let i = 0; i < size; i++) {
    grid[0][i] = WALL
    grid[size - 1][i] = WALL
    grid[i][0] = WALL
    grid[i][size - 1] = WALL
  }

  for (let i = 0; i < size * 2; i++) {
    placeRandom(grid, WALL)
  }

  grid[1][1] = PLAYER

  const coinCount = 2 + Math.floor(difficulty / 2)
  const enemyCount = Math.min(1 + Math.floor(difficulty / 2), 6)

  for (let i = 0; i < coinCount; i++) placeRandom(grid, COIN)
  for (let i = 0; i < enemyCount; i++) placeRandom(grid, ENEMY)

  if (Math.random() < 0.3) placeRandom(grid, HEART)

  return map`${grid.map(r => r.join("")).join("\n")}`
}

function placeRandom(grid, tile) {
  let placed = false
  while (!placed) {
    const x = Math.floor(Math.random() * (grid.length - 2)) + 1
    const y = Math.floor(Math.random() * (grid.length - 2)) + 1
    if (grid[y][x] === ".") {
      grid[y][x] = tile
      placed = true
    }
  }
}

/* ---------------- GAME FLOW ---------------- */

function drawHUD() {
  clearText()
  addText("Score: " + score, { x: 0, y: 0 })
  addText("Lives: " + lives + "/" + MAX_LIVES, { x: 0, y: 1 })
  addText("Level: " + (level + 1), { x: 0, y: 2 })
}

function loadLevel() {
  if (level < baseLevels.length) {
    setMap(baseLevels[level])
  } else {
    setMap(generateLevel(level - baseLevels.length + 1))
  }
  drawHUD()
}

loadLevel()

/* ---------------- INPUT ---------------- */

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

/* ---------------- COLLISIONS ---------------- */

afterInput(() => {
  if (gameOver) return

  const coinHit = tilesWith(PLAYER, COIN)
  if (coinHit.length) {
    coinHit[0][1].remove()
    score += 10
    drawHUD()
  }

  const heartHit = tilesWith(PLAYER, HEART)
  if (heartHit.length && lives < MAX_LIVES) {
    heartHit[0][1].remove()
    lives++
    drawHUD()
  }

  if (tilesWith(PLAYER, ENEMY).length) {
    lives--
    if (lives <= 0) {
      gameOver = true
      clearText()
      addText("GAME OVER", { x: 4, y: 6 })
      addText("Final Score: " + score, { x: 3, y: 8 })
      addText("Press I to Restart", { x: 1, y: 10 })
      return
    }
    loadLevel()
    return
  }

  if (tilesWith(COIN).length === 0) {
    level++
    loadLevel()
  }
})

/* ---------------- ENEMY MOVEMENT ---------------- */

setInterval(() => {
  if (gameOver) return
  for (const enemy of getAll(ENEMY)) {
    const d = Math.floor(Math.random() * 4)
    if (d === 0) enemy.y--
    if (d === 1) enemy.y++
    if (d === 2) enemy.x--
    if (d === 3) enemy.x++
  }
}, 600)