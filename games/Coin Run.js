/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Coin Run
@author: Nivaan Saggar
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const coin = "c"
const enemy = "e"

setLegend(
  [ player, bitmap`
................
................
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....
.....333333.....
....33333333....
....33333333....
.....333333.....
................
................
................
................` ],
  [ wall, bitmap`
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
1111111111111111` ],
  [ coin, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
...6666666666...
...6666666666...
...6666666666...
...6666666666...
....66666666....
.....666666.....
................
................
................
................
................` ],
  [ enemy, bitmap`
................
................
.....222222.....
....22222222....
...2222222222...
...2220022222...
...2220022222...
...2222222222...
...2222222222...
....22222222....
.....222222.....
................
................
................
................
................` ]
)

setSolids([ player, wall, ])

let isGameOver = false;

let score = 0

setMap(map`
wwwwwwwwww
wp..c...ew
w..ww.ww.w
w..c....cw
w....ww..w
w.c......w
w........w
wwwwwwwwww
`)




addText("Score: 0", { x: 1, y: 1, color: color`3` })

onInput("w", () => getFirst(player).y -= 1)
onInput("s", () => getFirst(player).y += 1)
onInput("a", () => getFirst(player).x -= 1)
onInput("d", () => getFirst(player).x += 1)

afterInput(() => {
  if (isGameOver) return; // stop everything if game over

  // Collect coins
  const coinsCollected = tilesWith(player, coin)
  if (coinsCollected.length > 0) {
    coinsCollected.forEach(tile => tile[1].remove())
    score += 1
    clearText()
    addText("Score: " + score, { x: 1, y: 1, color: color`3` })
  }

  // Enemy AI
const e = getFirst(enemy)
const p = getFirst(player)

if (e && p) {
  if (e.x < p.x && !getTile(e.x + 1, e.y).some(t => t.type === wall)) {
    e.x += 1
  } else if (e.x > p.x && !getTile(e.x - 1, e.y).some(t => t.type === wall)) {
    e.x -= 1
  } 
  else if (e.y < p.y && !getTile(e.x, e.y + 1).some(t => t.type === wall)) {
    e.y += 1
  } else if (e.y > p.y && !getTile(e.x, e.y - 1).some(t => t.type === wall)) {
    e.y -= 1
  }
}



  // Game over
  if (tilesWith(player, enemy).length > 0) {
    clearText()
    addText("GAME OVER", { x: 3, y: 5, color: color`3` })
    isGameOver = true // stop the game
    return
  }

  // Win condition
  if (tilesWith(coin).length === 0) {
    clearText()
    addText("YOU WIN!", { x: 4, y: 5, color: color`6` })
    isGameOver = true // stop the game
  }
})