/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: MazeGame(Reach green box)
@author: Sai Avula
@tags: []
@addedOn: 2024-08-06
*/

const player = "p"
const black = "b"
const white = "w"
const s = "s"
const e = "e"
const t = "t"
const d = "d"
const i = "i"
const f = "f"
const c = "c"
const u = "u"
const l = "l"
const y = "y"
const p = ","
const r = "r"
const q = "q"
const o = "o"
const a = "a"
const h = "h"
const n = "n"
const g = "g"
const semicolon = ":"
const one = "1"
const two = "2"
const three = "3"
const green = "]"

let difficulty = 1
let startmap = 0
let leveltoplay = 4


setLegend(
  [player, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [black, bitmap`
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
  [white, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [s, bitmap`
................
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..000000000000..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
..000000000000..
................`],
  [e, bitmap`
................
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..000000000000..
................`],
  [t, bitmap`
................
..0000000000000.
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
................`],
  [d, bitmap`
................
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
................`],
  [i, bitmap`
................
..0000000000000.
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
..0000000000000.
................`],
  [f, bitmap`
................
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
................`],
  [c, bitmap`
................
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..000000000000..
................`],
  [u, bitmap`
................
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
................`],
  [l, bitmap`
................
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..000000000000..
................`],
  [y, bitmap`
................
...0.........0..
...0.........0..
...0.........0..
...0.........0..
...0.........0..
...0.........0..
...0.........0..
...00000000000..
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
................`],
  [semicolon, bitmap`
................
................
................
................
...0............
................
................
................
................
................
................
...0............
................
................
................
................`],
  [one, bitmap`
................
...000000.......
...0....0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
..0000000000000.
................`],
  [two, bitmap`
................
..000000000000..
.............0..
.............0..
............00..
..........000...
.........00.....
........00......
.......00.......
......00........
....000.........
...00...........
...0............
..00............
..000000000000..
................`],
  [three, bitmap`
................
..000000000000..
.............0..
.............0..
.............0..
.............0..
.............0..
..000000000000..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
..000000000000..
................`],
  [p, bitmap`
................
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
................`],
  [r, bitmap`
................
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
..00............
..0.00..........
..0...0.........
..0....00.......
..0......0......
..0.......00....
..0.........00..
................`],
  [q, bitmap`
................
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0........0.0..
..0.........00..
..000000000000..
..............0.
...............0`],
  [o, bitmap`
................
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
................`],
  [a, bitmap`
................
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
................`],
  [h, bitmap`
................
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..`],
  [n, bitmap`
................
..000........0..
..0.0........0..
..0..0.......0..
..0...0......0..
..0...0......0..
..0....0.....0..
..0.....0....0..
..0.....0....0..
..0......0...0..
..0......0...0..
..0.......0..0..
..0........0.0..
..0.........00..
..0..........0..
................`],
  [g, bitmap`
................
..000000000000..
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0....0000000..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..0..........0..
..000000000000..
................`],
  [green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
)

setSolids([player, black])

let level = 0
const levels = [
  map`
.................
.................
.................
.................
.................
set.difficulty:1.
.................
,ress.i.td.start.
.................
,ress.l.td.change
.................
.................
.................
.................
.................`,
  map`
.................
.................
.................
.................
.................
set.difficulty:2.
.................
,ress.i.td.start.
.................
,ress.l.td.change
.................
.................
.................
.................
.................`,
  map`
.................
.................
.................
.................
.................
set.difficulty:3.
.................
,ress.i.td.start.
.................
,ress.l.td.change
.................
.................
.................
.................
.................`,
  map`
bbbbbbbbbbbbb......bbb....bbbbbbb
b.bb.....bbbb.bbbb.bbb.bbbb.....]
b.bb.bbb.bbbb.bbbb.bbb...bb.bbbbb
b.bb.bbb....b.bbbb.bbbbb.bb.bbbbb
b.bb.bbbbbb.b....b.bbbbb.bb.bbbbb
b.bb.bbbbbb.b.bb.b.bbbbb.bb....bb
b.bb.bb.bbb.b.bb.b.b.....bbbbb.bb
b.bb.bb.bbb.b.bb.b.b.bbbbbbbbb.bb
b....bb.bbb.b.bb.b.b.bbbbbbb...bb
b.bbbbb.bbb.b.bb.b.b.........bbbb
b.bbbbb.bbb.b.bb.b.b.bbbbbbbbbbbb
b...bbb.bbb.b.bbbb.b.bbbbb.......
bbb.......b.b..b...b.bb....bbbbb.
bbb.bbbbbbb.bb.b.bbb.b..bbbbbbbb.
bbb.b.....b....b.bbb...bb.....bb.
bbb.b.bbb.bbbbbb.bbbbbbbb.bbb.bb.
bbb.b.bbb....bbb.bbbb.....bbb....
bbb.b.bbbbbbbbbb.bbbb.bbbbbbbbbbb
p.....bbbbbbbbbb......bbbbbbbbbbb`,
  map`
bbbbbbb........bb........b.....b......
b...bbb.bbbbbb.bb.bbbbbb.b.b.b.b.bbbb.
b.b.bbb.bbbbbb.bb.b....b.b.b.b.b.bbbb.
b.b.bbb.bbbbbb....b.bb.b.b.b.b.b.bbbb.
b.b...b......bbbbbb.bb.b.b.b.b.b.bbbb.
b.bbb.bbbbbb.bbb....bb.b.b.b.b.b.bbbb.
b...b.b....b.bbb.bbbbb.bbb.b.b.b.bbbb.
bbb.b.b....b.bbb.bbbbb.b...b.b.b.bbbb.
bbb.b.bbbbbb.bbb.b.....b.bbb.b.b.bbbb.
b...b..........b.b.bbbbb.b...b.b.bbbb.
b.bbbbbbbbbbbb.b.b.bb....b.bbb.b.bbbb.
b.bbbbbbbbbbbb.b.b.bb.b.bb.bb..b.bbbb.
b.bbbbbbbbbbbb.b.b.bb.b.b..bb.bb.bb...
b.bbbbbbb...bb.b.b.bb.b.b.bbb....bb.bb
b......bb.bbbb.b.b.bb.b.b.bbbbbbbbb.bb
b.bbbb.bb.bbbb.b.b.bb.b.b.bbb.bbbbb.bb
b.bbbb.bb.bbb..b.b.bb.b.b.bbb.bbbbb.bb
b.bbbb.bb.bbb.bb.b.bb.b.b.bbb.bbbbbbbb
b.bbbb....bbb....b.bb.b.b.bbb.bbbbbbbb
bpbbbbbbbbbbbbbbbb....b.b.....bbbbbbbb`,
  map``
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("i", () => {
  if(startmap == 2)
  {
    leveltoplay = 5
  }
  if(startmap == 1)
  {
     leveltoplay = 4
  }
  if(startmap == 0)
  {
    leveltoplay = 3
  }
  if (leveltoplay !== undefined) {
    clearText("");
    setMap(levels[leveltoplay])
  }
  
})

onInput("l", () => {
  startmap++
  if(startmap == 3)
  {
    startmap = 0
  }
  setMap(levels[startmap])
  
})

afterInput(() => {
  const targetnum = tilesWith(green).length;

  const covered = tilesWith(green, player).length

  if(targetnum == covered && targetnum != 0)
  {
    setMap(levels[0])
  }
})