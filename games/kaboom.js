const p = "p"
const g = "g"
const o = "o"

// didn't feel like typing all this every time lol
setLegend(
  [p, bitmap`
......CCCC......
......0707......
......1000......
......0111......
......7777......
.....777777.....
.....700007.....
.....707707.....
.....707707.....
.....707707.....
.....707707.....
......7777......
......CCCC......
......CCCC......
......CCCC......
......CCCC......`],
  [g, bitmap`
......000000....
....00CCCCCC00..
.000CCCCCCCCCC00
.0CC0000000000C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCC0C0C0
.0CC0CCCCC0000C0
.0CC0CCCCCC0C0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0
.0CC0CCCCCCCC0C0`],
  [o, bitmap`
.....9L9........
......9L9.......
....0009L900....
...00009L3000...
..00000L300000..
.00000L60000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
...0000000000...
....00000000....`]
)

setSolids([o])

let level = 0

// messy maps lol, works tho
const levels = [
  map`
o.ooo.o....o..o.o.oo
o.ooo.o...ooo..o..oo
o.o...ooo.o.o..o..oo
oooooooooooooooooooo
oo....o.o..o..o.o...
oo..oo..o.oo..o.o...
oo.oo..o..o.ooo.oooo
p.....o..........o.g
oo.ooo..ooo.ooo..o.o
oo.....o..o....o.o..
oo.o..o...oooo..ooo.
oo..oo.......oo.....
oooooooooooooooooooo`,
  map`
p.
o.
g.`
]

setMap(levels[level])

setPushables({ [p]: [] })

// temp fix: spawn a few random rocks
function plopObstacles() {
  for (let i = 0; i < 3; i++) {
    const x = Math.floor(Math.random() * 2)
    const y = 1 + Math.floor(Math.random() * 2)
    if (getTile(x, y) === ".") {
      setTile(x, y, o)
    }
  }
}
plopObstacles()

// kinda cheating but this works for now
const spawn = { x: 0, y: 0 }

onInput("w", () => move(0, -1))
onInput("s", () => move(0, 1))
onInput("a", () => move(-1, 0))
onInput("d", () => move(1, 0))

function move(dx, dy) {
  const player = getFirst(p)
  player.x += dx
  player.y += dy
  handleStuff()
}

// didn't feel like splitting these up tbh
function handleStuff() {
  const you = getFirst(p)
  const win = getFirst(g)

  if (you.x === win.x && you.y === win.y) {
    addText(" nice one!", { x: 1, y: 1 })
  }

  const danger = getAll(o)
  for (let rock of danger) {
    if (you.x === rock.x && you.y === rock.y) {
      addText(" bruh", { x: 1, y: 1 })
      respawn()
      break
    }
  }
}

function respawn() {
  const you = getFirst(p)
  you.x = spawn.x
  you.y = spawn.y
}
