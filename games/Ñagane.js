// Collect the Gems Game

const player = "p"
const wall = "w"
const gem = "g"

setLegend(
  [ player, bitmap`
................
................
................
................
.......333......
......33333.....
......33333.....
.......333......
.......333......
.......333......
................
................
................
................
................
................` ],
  
  [ wall, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],

  [ gem, bitmap`
................
................
................
................
.......444......
......44444.....
.....4444444....
.....4444444....
.....4444444....
......44444.....
.......444......
................
................
................
................
................` ]
)

setSolids([ player, wall ])

const level = map`
wwwwwwwwww
wp......gw
w..wwww..w
w.g....g.w
w..wwww..w
w....g...w
w..wwww..w
wg......gw
wwwwwwwwww`

setMap(level)

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

afterInput(() => {
  
  let playerSprite = getFirst(player)
  let tile = getTile(playerSprite.x, playerSprite.y)
  for (let t of tile) {
    if (t.type === gem) {
      t.remove()
    }
  }

  
  if (getAll(gem).length === 0) {
    clearText()
    addText("YOU WIN!", { x: 4, y: 4, color: color`3` })
  }
})
