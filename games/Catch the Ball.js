/*
  Game: Catch the Star
  Author: Ramit Neupane
  Description:
  Move your basket to catch falling stars. Score points,
  survive with 3 lives, and progress to harder levels!
*/

// Sprites
const player = "p"
const star = "s"
const wall = "w"

setLegend(
  [ player, bitmap`
................
................
................
................
.....000000.....
....02222220....
...0222222220...
...0222222220...
....02222220....
.....000000.....
................
................
................
................
................
................` ],
  [ star, bitmap`
................
................
.......11.......
......1111......
.....111111.....
......1111......
.......11.......
................
................
................
................
................
................
................
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ]
)

// Setup
let level = 1
let score = 0
let lives = 3

setSolids([ player, wall ])

const levels = [
  map`
wwwwwwww
w......w
w......w
w......w
w..p...w
wwwwwwww`
]

setMap(levels[0])

// Movement
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

// Drop stars automatically
function dropStar() {
  const x = Math.floor(Math.random() * 6) + 1
  addSprite(x, 1, star)
}
setInterval(dropStar, 1200)

// Gravity for stars
setInterval(() => {
  getAll(star).forEach(s => {
    s.y += 1
    if (s.y === 4) {
      const p = getFirst(player)
      if (p && s.x === p.x) {
        score++
        if (score % 5 === 0) {
          level++
        }
      } else {
        lives--
        if (lives <= 0) {
          addText("GAME OVER", { x: 2, y: 2, color: color`3` })
          clearInterval()
        }
      }
      s.remove()
    }
  })
}, 500)

// HUD updater
setInterval(() => {
  clearText()
  addText("Score:" + score, { x: 0, y: 0, color: color`2` })
  addText("Lives:" + lives, { x: 0, y: 1, color: color`4` })
  addText("Lvl:" + level, { x: 6, y: 0, color: color`1` })
}, 200)
