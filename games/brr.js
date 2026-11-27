//guy's brr just play
//¯\(°_o)/¯//

const player = "p"
const coin = "c"
const enemy = "e"
const wall = "w"

setLegend(
  [player, bitmap`
................
................
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
................
................
................
................`],
  [coin, bitmap`
................
................
................
......6666......
.....666666.....
....66666666....
....66666666....
....66666666....
....66666666....
.....666666.....
......6666......
................
................
................
................
................`],
  [enemy, bitmap`
................
................
...333333333....
...333333333....
...330333033....
...330333033....
...333333333....
...333333333....
...330000033....
...333333333....
...333333333....
...333333333....
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
1111111111111111`]
)

setSolids([wall])

setMap(map`
wwwwwwwwww
w........w
w..w.....w
w....c...w
w.p......w
w....w...w
w.......ew
wwwwwwwwww`)

let score = 0
let gameOver = false

function drawScore() {
  clearText()
  addText(`Score: ${score}`, { x: 1, y: 0, color: color`2` })
}
drawScore()

function randomCoin() {
  // find a random empty tile
  for (let i = 0; i < 50; i++) {
    const x = 1 + Math.floor(Math.random() * 8)
    const y = 1 + Math.floor(Math.random() * 6)
    if (getTile(x, y).length === 0) {
      addSprite(x, y, coin)
      return
    }
  }
}

function endGame() {
  gameOver = true
  clearInterval(loop)
  addText("GAME OVER", { x: 5, y: 6, color: color`3` })
  addText(`Score: ${score}`, { x: 5, y: 8, color: color`2` })
}

onInput("w", () => { if (!gameOver) getFirst(player).y -= 1 })
onInput("s", () => { if (!gameOver) getFirst(player).y += 1 })
onInput("a", () => { if (!gameOver) getFirst(player).x -= 1 })
onInput("d", () => { if (!gameOver) getFirst(player).x += 1 })

afterInput(() => {
  if (gameOver) return
  const p = getFirst(player)

  getAll(coin).forEach(c => {
    if (c.x === p.x && c.y === p.y) {
      c.remove()
      score++
      drawScore()
      randomCoin()
    }
  })

  const e = getFirst(enemy)
  if (e.x === p.x && e.y === p.y) endGame()
})


const loop = setInterval(() => {
  if (gameOver) return
  const p = getFirst(player)
  const e = getFirst(enemy)
  const dx = p.x - e.x
  const dy = p.y - e.y

  if (Math.abs(dx) > Math.abs(dy)) e.x += Math.sign(dx)
  else e.y += Math.sign(dy)

  if (e.x === p.x && e.y === p.y) endGame()
}, 600)