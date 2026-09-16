/*
@title: Robot Level Runner
@author: Player
@tags: ['puzzle', 'action', 'levels']
@addedOn: 2026-08-22
*/

const player = "p"
const wall = "w"
const coin = "c"
const goal = "g"

setLegend(
  [ player, bitmap`
................
....00000000....
...0888888880...
..083388883380..
..083088880380..
..088888888880..
...0888008880...
....00000000....
...0888888880...
..088888888880..
..080888888080..
..080888888080..
...0888888880...
....00000000....
....080..080....
....000..000....` ],
  [ wall, bitmap`
0000000000000000
0111111111111110
0100000110000010
0101110110111010
0101110110111010
0100000110000010
0111111111111110
0000000000000000
0111111111111110
0100000110000010
0101110110111010
0101110110111010
0100000110000010
0111111111111110
0111111111111110
0000000000000000` ],
  [ coin, bitmap`
................
................
.....000000.....
....05555550....
...0555555550...
..055005500550..
..055555555550..
..055555555550..
..055555555550..
..055555555550..
..055005500550..
...0555555550...
....05555550....
.....000000.....
................
................` ],
  [ goal, bitmap`
................
.....000000.....
...0066666600...
..066666666660..
..066000000660..
.06606666660660.
.06606000060660.
.066060..060660.
.066060..060660.
.06606000060660.
.06606666660660.
..066000000660..
..066666666660..
...0066666600...
.....000000.....
................` ]
)

setSolids([ player, wall ])

let level = 0
let score = 0

const levels = [
  // LEVEL 1: Easy Start (Collect 2 coins)
  map`
wwwwwwwwwwwwwwww
w..............w
w..p....c......w
w..............w
w..............w
w......c....g..w
w..............w
wwwwwwwwwwwwwwww`,

  // LEVEL 2: Hallways
  map`
wwwwwwwwwwwwwwww
w.p...w....c...w
w.....w........w
wwww..w..wwwwwww
w.....w........w
w..c..w.....g..w
w.....w........w
wwwwwwwwwwwwwwww`,

  // LEVEL 3: Maze Path
  map`
wwwwwwwwwwwwwwww
w.p.w...c..w...w
w...w.wwww.w.c.w
w.c.w.w..w.w...w
w...w.w..w.www.w
w.www.w..w...g.w
w.....w....c...w
wwwwwwwwwwwwwwww`,

  // LEVEL 4: Four Corners
  map`
wwwwwwwwwwwwwwww
w.c...wwww...c.w
w..p..w..w.....w
wwww..w..w..wwww
w.....w..w.....w
w..c..wwww...c.w
w...........g..w
wwwwwwwwwwwwwwww`,

  // LEVEL 5: Final Challenge
  map`
wwwwwwwwwwwwwwww
w.p.w.c.w.c.w.gw
w.w.w.w.w.w.w.ww
w...w...w...w..w
ww.www.www.www.w
w.c.w.c.w.c.w..w
w..............w
wwwwwwwwwwwwwwww`
]

setMap(levels[level])
addText("Level 1: Collect coins!", { x: 1, y: 0, color: color`5` })

onInput("w", () => {
  const p = getFirst(player)
  if (p) p.y -= 1
})

onInput("s", () => {
  const p = getFirst(player)
  if (p) p.y += 1
})

onInput("a", () => {
  const p = getFirst(player)
  if (p) p.x -= 1
})

onInput("d", () => {
  const p = getFirst(player)
  if (p) p.x += 1
})

afterInput(() => {
  const p = getFirst(player)
  if (!p) return

  // Collect coin if player steps on it
  const coinsOnPlayer = tilesWith(player, coin)
  if (coinsOnPlayer.length > 0) {
    coinsOnPlayer.forEach(tile => {
      tile.forEach(sprite => {
        if (sprite.type === coin) {
          sprite.remove()
          score += 1
        }
      })
    })
  }

  const remainingCoins = tilesWith(coin).length
  const atGoal = tilesWith(player, goal).length > 0

  clearText()

  if (remainingCoins > 0) {
    addText("Coins left: " + remainingCoins, { x: 1, y: 0, color: color`5` })
  } else {
    addText("Portal Open! Go to Green!", { x: 1, y: 0, color: color`6` })
  }

  // When stepping on green goal
  if (atGoal) {
    if (remainingCoins === 0) {
      level += 1
      if (level < levels.length) {
        setMap(levels[level])
        clearText()
        addText("Level " + (level + 1) + " Start!", { x: 1, y: 0, color: color`5` })
      } else {
        clearText()
        addText("YOU BEAT ALL LEVELS!", { x: 1, y: 3, color: color`6` })
      }
    } else {
      clearText()
      addText("Get all coins first!", { x: 1, y: 0, color: color`3` })
    }
  }
})