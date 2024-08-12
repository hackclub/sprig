/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Collector's Quest
@author: PawiX25
@tags: []
@addedOn: 2024-08-13
*/

const player = "p"
const enemy = "e"
const wall = "w"
const collectible = "c"

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
  
  [ enemy, bitmap`
................
................
.......333......
.......3.3......
......3..3......
......3...3.3...
....3334.43.3...
....3.3...333...
....3.34443.....
......3...3.....
.....3....3.....
.....3...3......
......333.......
......3.3.......
.....33.33......
................` ],

    [ wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1L1111111111L1L
L1L1LLLLLLLL1L1L
L1L1L1111111L1L1
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L1111111L1L1
L1L1LLLLLLLL1L1L
L1L1111111111L1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  
  [ collectible, bitmap`
................
................
.......666......
.......6.6......
......6..6......
......6...6.6...
....6665.56.6...
....6.6...666...
....6.65556.....
......6...6.....
.....6....6.....
.....6...6......
......666.......
......6.6.......
.....66.66......
................` ]
)

setSolids([wall, player])

let level = 0;
const levels = [
  map`
p.w.w...
.w.w.w..
.w.e.w..
...w.c..
..w...w.
w....w..
w.w.w..w`,
  map`
p..w.w..
..w.w.w.
.w.e...w
....w.c.
......w.
w.w.w.w.
....w...`,
  map`
p...w..w
w.w.w.w.
...e.w.w
w..w..c.
w.w.w..w
.w...w..
..w.w...`,
  map`
p.w.....
w....w..
..w.e...
w...w.c.
.w......
w.w....w
...w.w..`,
  map`
p..w..w.
.w.....w
..e.....
.w.w.w.c
.......w
....w.w.
w.w..w..`,
  map`
p.....w.
w.w.w.w.
....e.w.
w.w...c.
.w.w..w.
w....w.w
..w.w...`,
  map`
p.w..w.w
w...w..w
..w.e.w.
....w.w.
w.w....c
.w......
...w.w..`,
  map`
p......w
...w.w.w
w.e.....
..w...c.
w...w.w.
.....w..
..w.....`,
];


setMap(levels[level])

setPushables({
  [player]: []
})

onInput("w", () => {
  clearText()
  getFirst(player).y -= 1
})

onInput("s", () => {
  clearText()
  getFirst(player).y += 1
})

onInput("a", () => {
  clearText()
  getFirst(player).x -= 1
})

onInput("d", () => {
  clearText()
  getFirst(player).x += 1
})

afterInput(() => {
  const playerPosition = getFirst(player)
  const enemyPosition = getFirst(enemy)

  const dx = playerPosition.x - enemyPosition.x
  const dy = playerPosition.y - enemyPosition.y

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && getTile(enemyPosition.x + 1, enemyPosition.y).length === 0) {
      enemyPosition.x += 1
    } else if (dx < 0 && getTile(enemyPosition.x - 1, enemyPosition.y).length === 0) {
      enemyPosition.x -= 1
    }
  } else {
    if (dy > 0 && getTile(enemyPosition.x, enemyPosition.y + 1).length === 0) {
      enemyPosition.y += 1
    } else if (dy < 0 && getTile(enemyPosition.x, enemyPosition.y - 1).length === 0) {
      enemyPosition.y -= 1
    }
  }

  if (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y) {
    addText("Game Over", { x: 6, y: 6, color: color`3` })
    setMap(levels[level])
  }

  const collectibles = getAll(collectible)
  for (const item of collectibles) {
    if (playerPosition.x === item.x && playerPosition.y === item.y) {
      clearTile(item.x, item.y)
      
      if (getAll(collectible).length === 0) {
        level += 1
        if (level < levels.length) {
          clearText()
          addText("Collected!", { x: 6, y: 6, color: color`5` })
          setMap(levels[level])
        } else {
          clearText()
          addText("You Win!", { x: 6, y: 6, color: color`6` })
        }
      } else {
        addText("Collected!", { x: 6, y: 6, color: color`5` })
      }
    }
  }
})