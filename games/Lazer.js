/*
@title:
@author: 
@description:
@tags: []
@addedOn: 2025-MM-DD 
*/

const player = "p"
const laser = "l"
const warn = "w"

setLegend(
    [ player, bitmap`
................
................
................
..11........11..
..11........11..
..11LL....LL11..
..1LL00LL00LL1..
..LLL00LL00LLL..
..L1L00LL00L1L..
..LL1LL11LL1LL..
..L1LLLLLLLL1L..
...LLLLLLLLLL...
....LLLLLLLL....
................
................
................` ],
    [ laser, bitmap`
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333` ],
    [ warn, bitmap`
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555
    5555555555555555` ]
  )

setSolids([player])

const level = map`
................
................
................
................
.......p........
................
................
................`

setMap(level)

setPushables({
    [player]: []
})

onInput("w", () => { if (!gameOver) { getFirst(player).y -= 1; checkHit() } })
onInput("s", () => { if (!gameOver) { getFirst(player).y += 1; checkHit() } })
onInput("a", () => { if (!gameOver) { getFirst(player).x -= 1; checkHit() } })
onInput("d", () => { if (!gameOver) { getFirst(player).x += 1; checkHit() } })

let score = 0
let round = 1
let gameOver = false

addText("AVOID LAZER!", { x: 3, y: 2, color: color`3` })
addText("Move: W A S D", { x: 3, y: 4, color: color`1` })
setTimeout(() => { clearText() }, 3000)

addText("Score: 0", { x: 1, y: 1, color: color`3` })

function spawnLaser() {
    if (gameOver) return
    const orientation = Math.random() < 0.5 ? "row" : "col"
    if (orientation === "row") {
          let y = Math.floor(Math.random() * height())
          for (let x = 0; x < width(); x++) addSprite(x, y, warn)
          setTimeout(() => {
                  for (let x = 0; x < width(); x++) {
                            const tile = getTile(x, y)
                            tile.filter(s => s.type === warn).forEach(s => s.remove())
                            addSprite(x, y, laser)
                  }
                  checkHit()
          }, 1000)
          setTimeout(() => {
                  for (let x = 0; x < width(); x++) {
                            getTile(x, y).filter(s => s.type === laser).forEach(s => s.remove())
                  }
          }, 2500)
    } else {
          let x = Math.floor(Math.random() * width())
          for (let y = 0; y < height(); y++) addSprite(x, y, warn)
          setTimeout(() => {
                  for (let y = 0; y < height(); y++) {
                            const tile = getTile(x, y)
                            tile.filter(s => s.type === warn).forEach(s => s.remove())
                            addSprite(x, y, laser)
                  }
                  checkHit()
          }, 1000)
          setTimeout(() => {
                  for (let y = 0; y < height(); y++) {
                            getTile(x, y).filter(s => s.type === laser).forEach(s => s.remove())
                  }
          }, 2500)
    }
}

function checkHit() {
    if (gameOver) return
    const p = getFirst(player)
    if (!p) return
    const tile = getTile(p.x, p.y)
    for (const t of tile) {
          if (t.type === laser) {
                  gameOver = true
                  clearText()
                  addText("YOU LOSE!", { x: 5, y: 7, color: color`3` })
          }
    }
}

setInterval(() => {
    if (gameOver) return
    score += 10
    clearText()
    addText("Score: " + score, { x: 1, y: 1, color: color`3` })
    if (score >= 100) {
          gameOver = true
          clearText()
          addText("YOU WIN!", { x: 6, y: 7, color: color`4` })
          return
    }
    round++
    for (let i = 0; i < round; i++) {
          setTimeout(spawnLaser, i * 700)
    }
}, 3000)