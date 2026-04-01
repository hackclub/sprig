/*
@title: Anubis - Guide the Dead
@author: dev-ananta
@tags: ["puzzle", "egypt", "souls"]
@addedOn: 2026-04-01
*/

const player = "p"
const wall = "w"
const soul = "s"
const grave = "g"
const floor = "f"
const black_abyss = "b"
const torch = "t"

setLegend(
  [ player, bitmap`
................
.....00.00...FF.
.....00.00...7FF
....F5F5F5.F757F
....FF0400.FF7FF
....66DD0DC.FFF.
....550000C..F..
...0660LLL0..F..
...05000006460..
...66400000460..
...0056565...F..
.....65656...F..
.....00.00...F..
.....FF.FF...F..
.....00.00......
................` ],

  [ wall, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFF5555555555FFF
FF555555555555FF
FF55FFFFFFFF55FF
FF55FFFFFFFF55FF
FF555555555555FF
FFF5555555555FFF
FFFFFFFFFFFFFFFF
FFF5555555555FFF
FF555555555555FF
FF55FFFFFFFF55FF
FF555555555555FF
FFF5555555555FFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],

  [ soul, bitmap`
................
................
....22222222....
....22222222....
....20022002....
....2LL22LL2....
....22222222....
....22222222....
.....222222.....
.....222222.....
.....222222.....
.....222222.....
.....222222.....
.....222222.....
.....22..22.....
................` ],

  [ grave, bitmap`
................
................
.......LLL......
......LLLLL.....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
....000000000...
................
................` ],

  [ floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],

  [ black_abyss, bitmap`
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

  [ torch, bitmap`
.......33.......
......3993......
.....396693.....
.....396693.....
......3CC3......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
................
................
................` ]
)

setBackground(floor)

setSolids([player, wall, soul])

setPushables({
  [player]: [soul]
})

let level = 0

const levels = [
  map`
wwwwwww
w..g..w
w..s..w
w..p..w
w.....w
wwwwwww`,

  map`
wwwwwwww
w..g...w
w..s...w
w..w...w
w.p....w
wwwwwwww`,

  map`
wwwwwwwww
w..g.g..w
w..s.s..w
w...w...w
w..p....w
wwwwwwwww`,

  map`
bbbbbbbbb
btbbbbbtb
bbbbbbbbb
bbbbpbbbb
btbbbbbtb
bbbbbbbbb`
]

setMap(levels[level])

function nextLevel() {
  level += 1

  if (level < levels.length) {
    setMap(levels[level])
    clearText()

    // Special ending screen
    if (level === 3) {
      addText("SOULS GUIDED", {
        x: 2,
        y: 1,
        color: color`3`
      })
    }
  } else {
    clearText()
    addText("ALL SOULS REST", {
      x: 2,
      y: 3,
      color: color`3`
    })
  }
}

function movePlayer(dx, dy) {
  let p = getFirst(player)

  if (
    p.x + dx >= 0 &&
    p.x + dx < width() &&
    p.y + dy >= 0 &&
    p.y + dy < height()
  ) {
    p.x += dx
    p.y += dy
  }
}

onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))

afterInput(() => {
  let soulsOnGraves = tilesWith(soul, grave).length
  let totalSouls = getAll(soul).length

  if (soulsOnGraves === totalSouls && totalSouls > 0 && level < 3) {
    nextLevel()
  }
})