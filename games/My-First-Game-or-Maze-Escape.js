/* 
@title: Simple Maze Escape
@author: Junior Developer
@description: Collect the coin and reach the exit!
*/

// 1. Define Sprites
const player = "p"
const wall = "w"
const coin = "c"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ coin, bitmap`
................
.....333333.....
...3355555533...
..355555555553..
..3555....5553..
.3555..55..5553.
.3555..55..5553.
.3555..55..5553.
.3555..55..5553.
.3555......5553.
..3555....5553..
..355555555553..
...3355555533...
.....333333.....
................
................` ]
)

// 2. Set Physics Rules
setSolids([ player, wall ])

// 3. Define Level Map
const level = map`
wwwwwwww
wp.....w
w..w...w
w..w.c.w
w..w...w
wwwwwwww`

setMap(level)

// 4. Player Controls (WASD)
onInput("w", () => { getFirst(player).y -= 1 })
onInput("s", () => { getFirst(player).y += 1 })
onInput("a", () => { getFirst(player).x -= 1 })
onInput("d", () => { getFirst(player).x += 1 })

// 5. Check Win Condition
afterInput(() => {
  const coinsLeft = getAll(coin)
  const p = getFirst(player)
  
  // Coin collect logic
  coinsLeft.forEach(c => {
    if (c.x === p.x && c.y === p.y) {
      c.remove()
    }
  })

  // Win condition display
  if (getAll(coin).length === 0) {
    addText("YOU WIN!", { x: 1, y: 3, color: color`3` })
  }
})