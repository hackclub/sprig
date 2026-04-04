/*
@title Catch the Falling Stars (High Score Fixed)
@author SasiRoxx
*/

const player = "p"
const star = "s"
const sky = "b"
const ground = "g"

setLegend(
  [player, bitmap`
................
................
.....000000.....
.....0.99.0.....
.....0....0.....
.....000000.....
...0...0........
...0...0........
...000000000....
.......0...0....
.......0...0....
.......0........
....0000000.....
....0..0..0.....
....0..0..0.....
................`],
  [star, bitmap`
................
......6666......
.....663366.....
....66366366....
....63666636....
....63333336....
....66666666....
................
................
................
................
................
................
................
................
................`],
  [sky, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
`],
  [ground, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
1111111111111111
4111411411411411
1414114114114114`]
)

setSolids([player])

let score = 0
let highScore = 0
let timeLeft = 120
let gameOver = false

setMap(map`
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
bbbbbbbb
gggpgggg
gggggggg
`)

// ---------- PLAYER ----------
function move(dx) {
  if (gameOver) return
  const p = getFirst(player)
  if (!p) return
  p.x += dx
}

onInput("a", () => move(-1))
onInput("d", () => move(1))

// ---------- STAR SPAWN ----------
const spawnStars = setInterval(() => {
  if (gameOver) return
  addSprite(Math.floor(Math.random() * 8), 0, star)
}, 1000)

// ---------- STAR FALL + COLLISION ----------
const starFall = setInterval(() => {
  if (gameOver) return

  const p = getFirst(player)

  getAll(star).forEach(s => {
    s.y++

    if (p && s.x === p.x && s.y === p.y) {
      s.remove()
      score++
    }

    if (s.y > 7) {
      s.remove()
    }
  })
}, 500)

// ---------- TIMER ----------
const timer = setInterval(() => {
  if (gameOver) return
  timeLeft--
  if (timeLeft <= 0) endGame()
}, 1000)

// ---------- HUD ----------
const hud = setInterval(() => {
  if (gameOver) return

  if (score > highScore) {
    highScore = score
  }

  clearText()
  addText(`HI:${highScore}`, { x: 0, y: 0, color: color`6` })
  addText(`SC:${score}`, { x: 0, y: 1, color: color`3` })
  addText(`T:${timeLeft}`, { x: 0, y: 2, color: color`2` })
}, 200)

// ---------- GAME OVER ----------
function endGame() {
  gameOver = true

  // 🔥 FINAL GUARANTEED UPDATE
  if (score > highScore) {
    highScore = score
  }

  clearInterval(spawnStars)
  clearInterval(starFall)
  clearInterval(timer)
  clearInterval(hud)

  clearText()
  addText("GAME OVER", { x: 3, y: 5, color: color`3` })
  addText(`HIGH:${highScore}`, { x: 2, y: 7, color: color`6` })
}
