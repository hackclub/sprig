const player = "p"
const wall = "w"
const enemy = "e"
const sword = "s"
const end = "n"

setLegend(
  [player, bitmap`
................
.........000....
......11L0......
.....1111L......
.....7171L......
.....1111L......
......11L.......
.......L........
......111.......
.....L171L......
....L.1L1.L.....
....L.111.L.....
......L.L.......
......L.L.......
......L.L.......
................`],
  [wall, bitmap`
.11111111111111.
11111LLLLLLLLL11
11LLLLLLLLL11111
.11111111111111.
...1LLLLLLLL1...
...1LLLLLLLL1...
...1L11LLLLL1...
...1L11LL11L1...
...1L11LL11L1...
...1L11LL11L1...
...1L11LL11L1...
...1L11LL11L1...
...1111LL1111...
....11111111....
................
................`],
  [enemy, bitmap`
................
.........003....
......11L0......
.....1111L......
.....3131L......
.....1111L......
......11L.......
.......L........
......111.......
.....L131L......
....L.1L1.L.....
....L.111.L.....
......L.L.......
......L.L.......
......L.L.......
................`],
  [sword, bitmap`
................
..0.............
...0............
..0.............
...0............
...........0....
...4444444044...
.44444444440444.
4444044444044444
4444404444444444
4444044444444444
4444404444444444
4444444444444444
4444444444444444
.44444444444444.
...4444444444...`],
  [end, bitmap`
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
0000000000000000`]
)

playTune(tune`
500: A4/500,
500: G4/500,
500: A4/500,
500: B4/500,
1000,
500: C5/500,
500: B4/500,
500: C5/500,
500: D5/500,
1000,
500: E5/500,
500: C5/500,
500: D5/500,
500: B4/500,
1000,
500: A4/500,
500: F4/500,
500: D4/500,
500: E4/500,
1000,
500: C5/500,
500: B4/500,
500: C5/500,
500: D5/500,
500: F5/500,
500: E5/500,
500,
500: E4/500`, )

setSolids([wall, player, enemy])

const up_levels = [
  map`
wwwwwwwwww
w...w.e..w
w.w.w.w..w
..w...w.ew
wwwwwww..w
we.......w
w........w
wwww..wwww`,
  map`
wwwwwwwwww
we.w...wew
w...ew...w
..wwwwww.w
.ewe....ew
www.wwwwww
we......ew
wwww..wwww`
]
const down_levels = [
  map`
wwww..wwww
w........w
w.e......w
w........w
w........w
w........w
w........w
wwwwwwwwww`,
  map`
wwww..wwww
we......ew
w.wwwwwwww
w.w...wwe.
w.w.w.ew..
w.w.w.ww.w
we..w...ew
wwwwwwwwww`
]
const left_levels = [
  map`
wwwwwwwwww
w........w
w.....e..w
......w..w
....e.w..w
wwwwwww..w
we.....e.w
wwww..wwww`,
  map`
wwww..wwww
w..w.....w
w..w.....w
...w...eew
...wwwweew
w..ee....w
w..ee....w
wwwwwwwwww`
]
const right_levels = [
  map`
wwwwwwwwww
w.w.w.w..w
w.w.e.w..w
..w.w.w...
..w.w.w...
w.w.w.w..w
w.e.w.e.ew
wwwwwwwwww`,
  map`
wwww..wwww
w..e..e..w
wew.e..w.w
..e.ww....
..e.ww....
wew.e..w.w
w..e..e..w
wwww..wwww`
]

setMap(down_levels[0])
addSprite(5, 5, player)
setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  addSprite(getFirst(player).x - 1, getFirst(player).y, sword)
})
onInput("i", () => {
  addSprite(getFirst(player).x, getFirst(player).y - 1, sword)
})
onInput("k", () => {
  addSprite(getFirst(player).x, getFirst(player).y + 1, sword)
})
onInput("l", () => {
  addSprite(getFirst(player).x + 1, getFirst(player).y, sword)
})

afterInput(() => {
  if (getFirst(player).y == 0) {
    let x = getFirst(player).x
    setMap(up_levels[Math.floor(Math.random()*up_levels.length)])
    addSprite(x, 6, player)
  }
  else if (getFirst(player).y == 7) {
    let x = getFirst(player).x
    setMap(down_levels[Math.floor(Math.random()*down_levels.length)])
    addSprite(x, 1, player)
  }
  else if (getFirst(player).x == 0) {
    let y = getFirst(player).y
    setMap(right_levels[Math.floor(Math.random()*right_levels.length)])
    addSprite(8, y, player)
  }
  else if (getFirst(player).x == 9) {
    let y = getFirst(player).y
    setMap(left_levels[Math.floor(Math.random()*left_levels.length)])
    addSprite(1, y, player)
  }

  for (let e of getAll(enemy)) {
    let best = [0, 0]
    for (let directions of [[-1, 0], [1, 0], [0, 1], [0, -1]].sort(() => Math.random() - 0.5)) {
      if (dist([e.x+best[0], e.y+best[1]], [getFirst(player).x, getFirst(player).y]) >= dist([e.x + directions[0], e.y + directions[1]], [getFirst(player).x, getFirst(player).y])) {
        best = directions.slice()
      }
    }
    e.x += +best[0]
    e.y += +best[1]
    if (getTile(e.x, e.y).some(r=> getAll(sword).includes(r))) clearTile(e.x, e.y)
    else if (dist([e.x, e.y], [getFirst(player).x, getFirst(player).y]) == 1) {
      clearTile(getFirst(player).x, getFirst(player).y)
      setMap(map`
nnnnn
nnnnn
nnnnn
nnnnn`)
      addText("You died lol", {color : 0})
    }
  }
  
  if (getTile(getFirst(player).x, getFirst(player).y).some(r=> getAll(sword).includes(r))) {
      clearTile(getFirst(player).x, getFirst(player).y)
      setMap(map`
nnnnn
nnnnn
nnnnn
nnnnn`)
      addText("You died lol", {color : 0})
  }
  
})

function dist(a, b) {
  return Math.pow(+Math.pow(a[0] - b[0], 2) + +Math.pow(a[1] - b[1], 2), 0.5)
}
