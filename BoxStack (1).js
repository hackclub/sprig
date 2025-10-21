
@title: BoxStack
@author: Ice (Very Chill)
@description: Push boxes and flatten them all out to win!
@tags: [#puzzle]
@addedOn: 2025-10-06

const player = "p"
const stackof1 = "1"
const stackof2 = "2"
const stackof3 = "3"
const stackof4 = "4"

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
  [ stackof1, bitmap`
................
.00000000000000.
.0............0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0.0000000000.0.
.0............0.
.00000000000000.
................` ],
  [ stackof2, bitmap`
................
.0000000000.....
.0........0.....
.0.000000.0.....
.0.000000.0.....
.0.000000000000.
.0.000........0.
.0.000.000000.0.
.0.000.000000.0.
.0...0.000000.0.
.00000.000000.0.
.....0.000000.0.
.....0.000000.0.
.....0........0.
.....0000000000.
................` ],
  [ stackof3, bitmap`
....000000000...
....0.......0...
....0.00000.0...
....0.00000.0...
....0.00000.0...
....0.00000.0...
00000.......0...
0...0.......00..
0.000000000000..
0.0000.00000.0..
0.0000.00000.0..
0.0000.00000.0..
0.0000.00000.0..
0....0.00000.0..
000000.......0..
.....000000000..` ],
  [ stackof4, bitmap`
0000000000......
0.....0000000000
0.00000........0
0.00000.000000.0
0.00000.000000.0
0.00000000000000
0000000........0
00....0.000000.0
00.0000.000000.0
00.0000.000000.0
.0.0000.000000.0
.0.0000.000000.0
.0.0000.000000.0
.0.0000........0
.0....0000000000
.0000000000.....` ],
 )

setSolids([player, stackof1, stackof2, stackof3, stackof4])

let level = 0
let level_finished = false
let lastX = 0
let lastY = 0
const levels = [
  map`
p.........
..........
..........
.1.2.3.4..
..........
..........
..........
..........`,
  map`
p.........
....2..2..
.3........
......2.2.
4..3......
......3...
..1.....2.
..........`,
  map`
p....4....
...3..3...
.3..4...3.
..........
...4..4...
..3.....3.
4....3....
..........`,
  map`
p.........
3...3..3..
.....3..3.
..3.......
.3.3.3..3.
......3...
.3..3..3..
..........`,
  map`
p.....4...
.4....4...
....4...4.
4.........
..44....4.
..........
....4.....
......4...`,
]

state = {}

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  push(0, 1)
})

onInput("w", () => {
  push(0, -1)
})

onInput("a", () => {
  push(-1, 0)
})

onInput("d", () => {
  push(1, 0)
})

function set_level_item(x, y, item) {
  console.log("setting "+item+""+" at "+"("+x+","+y+")")
  clearTile(x, y)
  addSprite(x, y, item)
}

function get_level_item(x, y) {
  return getTile(x, y)
}

function isvalid(x, y) {
  return x >= 0 && x < 10 && y >= 0 && y < 8
}

function push(dx, dy) {
  clearText()
  if (level_finished) {
    level_finished = false
    level++;
    setMap(levels[level]);
    return
  }
  p = getFirst(player)
  x = p.x
  y = p.y
  newx = x + dx
  newy = y + dy
  if (!isvalid(newx, newy)) {
    return
  }
  targets = get_level_item(newx, newy)
  console.log("targets: " + targets)
  if (targets.length > 0) {
    target = targets[0].type
    if (target == stackof2 || target == stackof3 || target == stackof4) {
      flatten(target, newx, newy, dx, dy)
    }
  }
  p.x += dx
  p.y += dy
}

function flatten(target, x, y, dx, dy) {
  console.log("flattening "+target+" at ("+x+", "+y+"), direction = ("+dx+", "+dy+")")
  num = parseInt(target, 10)
  for (let i = 1; i < num; i++) {
    xi = x + dx * i
    yi = y + dy * i
    if (!isvalid(xi, yi) || get_level_item(xi, yi).length > 0) {
      addText("no space", { y: 4, color: color`3` });
      console.log("failed, no space")
      return
    }
  }
  console.log("success")
  for (let i = 0; i < num; i++) {
    set_level_item(x + dx * i, y + dy * i, "1")
  }
  check_completion()
}

function check_completion() {
  const stacks = [
    ...getAll(stackof2),
    ...getAll(stackof3),
    ...getAll(stackof4)
  ];

  if (stacks.length === 0) {
    if (levels[level+1]) {
      level_finished = true
      addText("press to continue", { y: 4, color: color`3` });
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
}

afterInput(() => {
  
})
