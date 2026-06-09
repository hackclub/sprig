/*
  Maze Runner
  Navigate through 3 mazes to reach the star.
  Controls: W A S D
*/

const player = "p"
const wall   = "w"
const goal   = "g"

setLegend(
  [player, bitmap`
................
................
.....00000......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0..0..0.....
.....00000......
......000.......
.....00000......
....0.....0.....
....00...00.....
................
................
................
................`],
  [wall, bitmap`
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
0000000000000000`],
  [goal, bitmap`
................
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
.00000000000000.
.00000000000000.
..000000000000..
...0000000000...
....00000000....
.....000000.....
......0000......
.......00.......
................`]
)

setSolids([wall])

const levels = [
map`
wwwwwwwwwwwwww
w............w
w.wwwwwwwww..w
w.w..........w
w.w.wwwwwwwwww
w.w.w........w
w.w.w.wwwwww.w
w.w.w.w....w.w
w...w.w.p..w.w
wwwww.w....w.w
w.....wwwwww.w
w.wwwwwwwwww.w
w............w
wwwwwwwwwwwg.w`,

map`
wwwwwwwwwwwwww
wp...w.......w
wwww.w.wwww..w
w....w.w..w..w
w.wwww.w..wwww
w.w....w.....w
w.w.wwwwwwww.w
w.w.w........w
w.w.w.wwwwwwww
w.w.w.w......w
w...w.w.wwww.w
wwwww...w..w.w
w.......w..w.w
wwwwwwwwwwwg.w`,

map`
wwwwwwwwwwwwww
wp...........w
w.wwwwwwwwww.w
w.w..........w
w.w.wwwwwwww.w
w.w.w......w.w
w.w.w.wwww.w.w
w.w.w.w..w.w.w
w.w.w.w..w.w.w
w.w.w.wwww.w.w
w.w.w......w.w
w.w.wwwwwwww.w
w.w..........w
wwwwwwwwwwwg.w`
]

let level = 0

function updateHUD() {
  clearText()
  addText("Level " + (level + 1) + "/3", { x: 4, y: 0, color: color`3` })
}

setMap(levels[level])
updateHUD()

function move(dx, dy) {
  const p = getFirst(player)
  if (!p) return
  const nx = p.x + dx
  const ny = p.y + dy
  const goals = getAll(goal).filter(g => g.x === nx && g.y === ny)
  if (goals.length > 0) {
    level++
    if (level >= levels.length) {
      clearText()
      addText("YOU WIN!", { x: 3, y: 5, color: color`3` })
      addText("Nice work!", { x: 2, y: 7, color: color`4` })
      return
    }
    setMap(levels[level])
    updateHUD()
    return
  }
  p.x += dx
  p.y += dy
}

onInput("w", () => move(0, -1))
onInput("s", () => move(0,  1))
onInput("a", () => move(-1, 0))
onInput("d", () => move( 1, 0))
