/*
@title: Coin Collector
@author: 
@tags: [maze, puzzle]
@addedOn: 2025-12-11
Collect all coins to advance! Avoid the red enemies.
Use WASD to move.
*/

const player = "p"
const wall = "w"
const coin = "c"
const enemy = "e"
const goal = "g"

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
....0.00000.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ coin, bitmap`
................
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
................` ],
  [ enemy, bitmap`
................
................
.....33333......
....3333333.....
...333333333....
...333333333....
...333333333....
....3333333.....
.....33333......
......333.......
.....33.33......
....33...33.....
...33.....33....
................
................
................` ],
  [ goal, bitmap`
................
................
.....444444.....
....44444444....
...4444444444...
...4444DD4444...
...444DDDD444...
...444DDDD444...
...444DDDD444...
...4444DD4444...
...4444444444...
....44444444....
.....444444.....
................
................
................` ]
)

setSolids([player, wall, enemy])

let level = 0
const levels = [
  map`
p.w.c.w.c
..w...w..
w.w.w.w.w
c.......c
www...www
c.......c
w.w.w.w.w
..w...w..
c.w...w.g`,
  map`
p.c.....c
..w...w..
..w...w..
www...www
c.......c
www...www
..w...w..
..w...w..
c.......g`,
  map`
p..wwwwww
.ww.c...c
.w..ww...
.w.w.w.w.
.c.w.w.c.
.www.w.ww
.c...w..g
wwww.ww..
c.......c`
]

setMap(levels[level])

setPushables({
  [player]: []
})

// Player movement
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

// Check win condition after each input
afterInput(() => {
  // Collect coins
  const playerTile = getTile(getFirst(player).x, getFirst(player).y)
  playerTile.forEach(sprite => {
    if (sprite.type === coin) {
      sprite.remove()
      playTune(collectSound)
    }
  })
  
  // Check if all coins collected
  const coinsLeft = getAll(coin).length
  
  if (coinsLeft === 0) {
    // Check if player reached goal
    const onGoal = tilesWith(player, goal).length > 0
    
    if (onGoal) {
      level += 1
      
      if (level < levels.length) {
        setMap(levels[level])
        playTune(winSound)
        addText("Level Complete!", { y: 4, color: color`4` })
        setTimeout(() => clearText(), 1500)
      } else {
        playTune(victorySound)
        addText("You Win!", { y: 4, color: color`6` })
        addText("All levels", { y: 6, color: color`6` })
        addText("complete!", { y: 7, color: color`6` })
      }
    }
  }
  
  // Display coins remaining
  clearText()
  if (level < levels.length) {
    addText(`Coins: ${coinsLeft}`, { x: 1, y: 1, color: color`6` })
    addText(`Level: ${level + 1}`, { x: 1, y: 2, color: color`2` })
  }
})

// Sound effects
const collectSound = tune`
500: C5-500 + E5-500,
15500`

const winSound = tune`
150: C5-150,
150: E5-150,
150: G5-150,
150: C6-150,
4350`

const victorySound = tune`
200: C5-200,
200: D5-200,
200: E5-200,
200: F5-200,
200: G5-200,
200: A5-200,
200: B5-200,
200: C6-200,
3400`

// Initial display
addText(`Coins: ${getAll(coin).length}`, { x: 1, y: 1, color: color`6` })
addText(`Level: 1`, { x: 1, y: 2, color: color`2` })