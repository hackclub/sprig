/*
@title: Robo Dodge
@author: ej2508
@description: Steer your robo with W A S D and dodge the falling rocks. Every rock you dodge scores a point.
@tags: ['dodge', 'arcade']
@addedOn: 2026-09-20
*/

const player = "p"
const rock = "r"
let gameOver = false
let score = 0
const x = Math.floor(Math.random() * width())

function spawnRock() {
  const x = Math.floor(Math.random() * width())
  addSprite(x, 0, rock)
}

const timer = setInterval(() => {
  getAll(rock).forEach(r => {
    if (r.y === height() - 1) {
      r.remove()      
        score += 1    
    } else {
      r.y += 1     
    }
  })
  spawnRock()
    clearText()
  addText("score: " + score, { x: 1, y: 1 })
  checkHit()
}, 700)

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
....3.....3.....
....0000000.....
....07LLL70.....
....0000000.....
......000.......
..00..000..00...
..00.00000.00...
.L0000LLL0000L..
..00.00000.00...
..00.......00...` ],
  [ rock, bitmap`
................
..CC............
..CC............
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
................`]
)
setSolids([])

let level = 0
const levels = [
  map`
.....
.....
.....
.....
.p...
.....`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

function checkHit() {
  if (gameOver) return
  if (tilesWith(player, rock).length > 0) {
    gameOver = true
    clearInterval(timer)
    addText("game over", { y: 4, color: color`3` })
     addText("score: " + score, { y: 6, color: color`3` })
  }
}

if (tilesWith(player, rock).length > 0) {
  gameOver = true
  clearInterval(timer)
  addText("game over", { y: 4, color: color`3` })
}

afterInput(() => {
  checkHit()
})
