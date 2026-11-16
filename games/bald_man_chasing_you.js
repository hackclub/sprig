
/* 
@title: maze_game_starter
@description: A simple template to help you get started with making a maze game.
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

/*
@title: Detention Dash
@description: Find four notebooks and escape school before the teacher catches you.
Based on Cheru Berhanu's maze_game_starter.
*/

const player = "p"
const teacher = "t"
const wall = "w"
const notebook = "n"
const lockedExit = "e"
const openExit = "o"
const floor = "f"

// Sprites listed first are drawn on top.
setLegend(
  [teacher, bitmap`
................
......CCCC......
.....C9999C.....
.....C9090C.....
.....C9999C.....
......C00C......
.....333333.....
....33833833..6.
....33033033.66.
....9303309366..
.....L3333L66...
.....LLLLLL6....
.....LL..LL.....
.....LL..LL.....
....000..000....
................`],
  [player, bitmap`
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
................`],
  [notebook, bitmap`
................
................
................
....HHHHHHHH....
...H88888888H...
...H8266288H....
...H8266288H....
...H8888888H....
...H8888888H....
...H8888888H....
...HHHHHHHHH....
...H2222222H....
....HHHHHHHH....
................
................
................`],
  [lockedExit, bitmap`
................
...0000000000...
...0LLLLLLLL0...
...0L333333L0...
...0L300003L0...
...0L30LL03L0...
...0L300003L0...
...0L333333L0...
...0LLLLLLLL0...
...0LLLLLL60....
...0LLLLLL60....
...0LLLLLLLL0...
...0LLLLLLLL0...
...0000000000...
..111111111111..
................`],
  [openExit, bitmap`
................
...0000000000...
...0DDDDDDDD0...
...0D444444D0...
...0D442444D0...
...0D422244D0...
...0D222224D0...
...0D442444D0...
...0D442444D0...
...0D444444D0...
...0D444444D0...
...0D444444D0...
...0DDDDDDDD0...
...0000000000...
..111111111111..
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
LL1LLLLLLLLL1LLL
LL1LLLLLLLLL1LLL
LL1LLLLLLLLL1LLL
LLLLLLLLLLLLLLLL
LLLLLLL1LLLLLLLL
LLLLLLL1LLLLLLLL
LLLLLLL1LLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [floor, bitmap`
1111111111111111
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222
1222222222222222`]
)

setSolids([player, wall, lockedExit])
setBackground(floor)

let level = 0
const levels = [
  map`
wwwwwwwwww
wp.nw...ew
w.w.w.ww.w
w.n....w.w
www.ww.w.w
wn..w..n.w
w....t...w
wwwwwwwwww`
]

let state
let moved
let totalBooks
let stepsSinceChase

function reset() {
  setMap(levels[level])
  state = "playing"
  moved = false
  totalBooks = getAll(notebook).length
  stepsSinceChase = 0
  showStatus()
}

function showStatus() {
  clearText()
  const books = totalBooks - getAll(notebook).length

  if (state === "caught" || state === "escaped") {
    const heading = state === "caught" ? "YOU GOT CAUGHT" : "YOU ESCAPED!"
    addText(heading, { y: 0, color: color`6` })
    addText("J TO PLAY AGAIN", { y: 15, color: color`2` })
    return
  }

  addText(`NOTEBOOKS ${books}/${totalBooks}`, { y: 0, color: color`2` })
  let hint = "WASD TO MOVE"
  if (books > 0) hint = "TEACHER IS COMING"
  if (books === totalBooks) hint = "EXIT OPEN!"
  addText(hint, { y: 15, color: color`6` })
}

function movePlayer(dx, dy) {
  if (state !== "playing") return
  const student = getFirst(player)
  const { x, y } = student
  if (dx !== 0) student.x += dx
  if (dy !== 0) student.y += dy
  moved = student.x !== x || student.y !== y
}

// Search nearby tiles first to find the shortest route around walls.
function chase(student, pursuer) {
  const queue = [{ x: pursuer.x, y: pursuer.y, firstStep: null }]
  const visited = new Set([pursuer.y * width() + pursuer.x])
  const blocked = new Set(getAll(wall).concat(getAll(lockedExit))
    .map(sprite => sprite.y * width() + sprite.x))
  const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]]

  for (let i = 0; i < queue.length; i++) {
    const { x, y, firstStep } = queue[i]
    if (x === student.x && y === student.y) {
      pursuer.x = firstStep.x
      pursuer.y = firstStep.y
      return
    }

    for (const [dx, dy] of directions) {
      const nextX = x + dx
      const nextY = y + dy
      if (nextX < 0 || nextX >= width() || nextY < 0 || nextY >= height()) continue
      const index = nextY * width() + nextX
      if (visited.has(index) || blocked.has(index)) continue
      visited.add(index)
      queue.push({ x: nextX, y: nextY, firstStep: firstStep || { x: nextX, y: nextY } })
    }
  }
}

onInput("w", () => movePlayer(0, -1))
onInput("a", () => movePlayer(-1, 0))
onInput("s", () => movePlayer(0, 1))
onInput("d", () => movePlayer(1, 0))
onInput("j", reset)

afterInput(() => {
  if (!moved || state !== "playing") return
  moved = false

  const student = getFirst(player)
  const pursuer = getFirst(teacher)
  const tile = getTile(student.x, student.y)
  const book = tile.find(sprite => sprite.type === notebook)
  if (book) book.remove()

  const books = totalBooks - getAll(notebook).length
  const door = getFirst(lockedExit)
  if (books === totalBooks && door) door.type = openExit

  if (tile.includes(pursuer)) {
    state = "caught"
  } else if (tile.some(sprite => sprite.type === openExit)) {
    state = "escaped"
  } else if (books > 0) {
    // The teacher moves every third step, then every second step.
    const pace = books >= 3 ? 2 : 3
    stepsSinceChase++
    if (stepsSinceChase >= pace) {
      stepsSinceChase = 0
      chase(student, pursuer)
      if (student.x === pursuer.x && student.y === pursuer.y) state = "caught"
    }
  }

  showStatus()
})

reset()