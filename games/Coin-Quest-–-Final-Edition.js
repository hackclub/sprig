/*
@title: Coin Quest Final Edition
@author: Kabir Saini
@description: A maze-based arcade game where players collect coins, avoid enemies, gain extra lives from hearts, and progress through infinite procedurally generated levels.
@tags: ['maze', 'collect', 'enemy', 'arcade']
@addedOn: 2025-01-19
*/

const PLAYER = "p"
const WALL = "w"
const COIN = "c"
const ENEMY = "e"
const HEART = "h"

const MAX_LIVES = 5
let hitCooldown = 0

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

/* IMPORTANT: enemies are NOT solid */
setSolids([PLAYER, WALL])

let level = 0
let score = 0
let lives = 3
let gameOver = false

/* ---------------- SAFE PROCEDURAL LEVEL ---------------- */

function generateLevel(difficulty) {
  const size = Math.min(9 + difficulty, 13)
  let grid = Array(size).fill(0).map(() => Array(size).fill("."))

  // Border walls
  for (let i = 0; i < size; i++) {
    grid[0][i] = WALL
    grid[size - 1][i] = WALL
    grid[i][0] = WALL
    grid[i][size - 1] = WALL
  }

  // Guaranteed open path
  for (let y = 1; y < size - 1; y++) {
    grid[y][2] = "."
  }

  grid[1][1] = PLAYER

  // Light random walls
  for (let i = 0; i < size; i++) {
    placeRandom(grid, WALL, 0.3)
  }

  const coinCount = 2 + Math.floor(difficulty / 2)
  const enemyCount = Math.min(1 + Math.floor(difficulty / 2), 6)

  for (let i = 0; i < coinCount; i++) placeRandom(grid, COIN)
  for (let i = 0; i < enemyCount; i++) placeRandom(grid, ENEMY)

  if (Math.random() < 0.3) placeRandom(grid, HEART)

  return map`${grid.map(r => r.join("")).join("\n")}`
}

function placeRandom(grid, tile, chance = 1) {
  if (Math.random() > chance) return
  for (let i = 0; i < 50; i++) {
    const x = Math.floor(Math.random() * (grid.length - 2)) + 1
    const y = Math.floor(Math.random() * (grid.length - 2)) + 1
    if (grid[y][x] === ".") {
      grid[y][x] = tile
      return
    }
  }
}

/* ---------------- HUD ---------------- */

function drawHUD() {
  clearText()
  addText("Score: " + score, { x: 0, y: 0 })
  addText("Lives: " + lives + "/" + MAX_LIVES, { x: 0, y: 1 })
  addText("Level: " + (level + 1), { x: 0, y: 2 })
}

function loadLevel() {
  setMap(generateLevel(level))
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

/* ---------------- DAMAGE ---------------- */

function checkEnemyDamage() {
  if (hitCooldown > 0) return
  if (tilesWith(PLAYER, ENEMY).length) {
    lives--
    hitCooldown = 6
    if (lives <= 0) {
      gameOver = true
      clearText()
      addText("GAME OVER", { x: 4, y: 6 })
      addText("Final Score: " + score, { x: 3, y: 8 })
      addText("Press I to Restart", { x: 1, y: 10 })
    } else {
      loadLevel()
    }
  }
}

/* ---------------- GAME LOOP ---------------- */

afterInput(() => {
  if (gameOver) return

  if (hitCooldown > 0) hitCooldown--

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

  checkEnemyDamage()

  if (!gameOver && tilesWith(COIN).length === 0) {
    level++
    loadLevel()
  }
})

setInterval(() => {
  if (gameOver) return

  for (const enemy of getAll(ENEMY)) {
    const d = Math.floor(Math.random() * 4)
    if (d === 0) enemy.y--
    if (d === 1) enemy.y++
    if (d === 2) enemy.x--
    if (d === 3) enemy.x++
  }

  checkEnemyDamage()
}, 600)