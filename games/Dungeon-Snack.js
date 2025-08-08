/*
@title: Dungeon Snack HARDMODE
@author: Shlok
@tags: [maze, ai, collect, chase, hardmode]
@addedOn: 2025-07-04
*/

const player = "p"
const wall = "w"
const coin = "$"
const slime = "e"
const rock = "r"
const leaf = "l"

setLegend(
  [ player, bitmap`
................
................
.......00.......
......0000......
......0..0......
......0..0......
......0000......
......0..0......
......0..0......
......0..0......
......0..0......
......0..0......
......0..0......
......0..0......
......0..0......
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ coin, bitmap`
................
................
......3333......
.....366663.....
....36666663....
....36666663....
....36666663....
.....366663.....
......3333......
................
................
................
................
................
................
................` ],
  [ slime, bitmap`
................
................
.....6666.......
....677776......
...67777776.....
..6777777776....
..6777777776....
..6777777776....
..6777777776....
...67777776.....
....666666......
................
................
................
................
................` ],
  [ rock, bitmap`
................
................
....FFFFFFFF....
...FDDDDDDDF....
..FDDDDDDDDDF...
..FDDDDDDDDDF...
..FDDDDDDDDDF...
..FDDDDDDDDDF...
..FDDDDDDDDDF...
...FDDDDDDDF....
....FFFFFFFF....
................
................
................
................
................` ],
  [ leaf, bitmap`
................
................
......444.......
.....46664......
....4666664.....
....4666664.....
....4666664.....
.....46664......
......444.......
................
................
................
................
................
................
................` ]
)

setSolids([ player, wall, rock, leaf ])
setPushables({ [player]: [rock, leaf] })

const levels = [
  map`
wwwwwwwwwwww
wp..$....$.w
w..r..r....w
w....wwww..w
w..$...$...w
w.l..r..r..w
w..wwwwww..w
w..$....$..w
w...e.e.e..w
wwwwwwwwwwww`
]

setMap(levels[0])

let timeLeft = 30

onInput("w", () => tryMove(0, -1))
onInput("s", () => tryMove(0, 1))
onInput("a", () => tryMove(-1, 0))
onInput("d", () => tryMove(1, 0))

function tryMove(dx, dy) {
  const p = getFirst(player)
  const tx = p.x + dx
  const ty = p.y + dy
  const frontTile = getTile(tx, ty)
  const leafTile = frontTile.find(t => t.type === leaf)
  if (leafTile) leafTile.remove()
  p.x = tx
  p.y = ty

  // Check for coins
  const coins = getTile(p.x, p.y).filter(s => s.type === coin)
  for (const c of coins) c.remove()

  if (getAll(coin).length === 0) {
    showMessage("ALL COINS GOT!", "2")
  }
}

function showMessage(msg, colorCode) {
  clearText()
  addText(msg, { x: 2, y: 1, color: color`0` })
  addText(msg, { x: 3, y: 2, color: color`${colorCode}` })
}

function moveAllSlimes() {
  const slimes = getAll(slime)
  const p = getFirst(player)

  for (const e of slimes) {
    const queue = [{ x: e.x, y: e.y, path: [] }]
    const visited = {}
    visited[`${e.x},${e.y}`] = true

    const dirs = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ]

    while (queue.length > 0) {
      const curr = queue.shift()
      if (curr.x === p.x && curr.y === p.y) {
        const nextMove = curr.path[0]
        if (nextMove) {
          e.x = nextMove.x
          e.y = nextMove.y
        }
        break
      }

      for (const dir of dirs) {
        const nx = curr.x + dir.dx
        const ny = curr.y + dir.dy
        const key = `${nx},${ny}`

        if (nx >= 0 && ny >= 0 && nx < width() && ny < height() && !visited[key]) {
          const tile = getTile(nx, ny)
          const isBlocked = tile.some(t =>
            t.type === wall ||
            t.type === rock ||
            t.type === leaf ||
            t.type === slime
          )

          if (!isBlocked) {
            visited[key] = true
            queue.push({
              x: nx,
              y: ny,
              path: [...curr.path, { x: nx, y: ny }]
            })
          }
        }
      }
    }

    // Check collision after move
    if (e.x === p.x && e.y === p.y) {
      showMessage("YOU GOT SLIMED!", "3")
      setTimeout(() => {
        clearText()
        timeLeft = 30
        setMap(levels[0])
      }, 2000)
    }
  }
}

// Slimes move on an interval
setInterval(() => {
  moveAllSlimes()
}, 500) // every 0.5s

// Timer pressure
setInterval(() => {
  timeLeft--
  clearText()
  addText(`Time: ${timeLeft}`, { x: 1, y: 1, color: color`2` })
  if (timeLeft <= 0) {
    showMessage("OUT OF TIME", "3")
    setTimeout(() => {
      timeLeft = 30
      setMap(levels[0])
    }, 2000)
  }
}, 1000)
