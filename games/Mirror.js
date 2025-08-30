/*
@title: Mirror Maze
@author: Aly Kotb
@tags: ["puzzle", "maze"]
@addedOn: 2025-05-26
*/

const player = "p"
const mirror = "m"
const wall = "b"
const background = "c"
const pGoal = "g"
const mGoal = "G"
const move = tune`
500: C4^500,
15500`
const melody = tune`
500: D4^500,
500: F4~500,
500: G5^500 + E5-500,
500: C4^500,
500: F4~500,
500: G5/500 + A4-500,
500: D4^500,
500: F4~500,
500: G5^500 + D5-500,
500: C4^500,
500: F4~500,
500: G5/500 + A4-500,
500: D4^500,
500: F4~500,
500: G5^500 + E5-500,
500: C4^500,
500: F4~500,
500: G5/500 + A4-500,
500: D4^500,
500: F4~500,
500: G5^500 + D5-500,
500: C4^500,
500: F4~500,
500: G5/500 + A4-500,
500: D4^500,
500: F4~500,
500: G5^500 + E5-500,
500: C4^500,
500: F4~500,
500: G5/500 + A4-500,
500: D4^500,
500: F4~500 + D5-500`

setLegend(
  [ player, bitmap`
..DDDDDDDDDDDD..
.D444444444444D.
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D444DD4444DD444D
D444DD4444DD444D
D444DD4444DD444D
D44444444444444D
D44444DDDD44444D
.D444444444444D.
..DDDDDDDDDDDD..` ],
  [ mirror, bitmap`
..555555555555..
.57777777777775.
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777557777557775
5777557777557775
5777557777557775
5777777777777775
5777775555777775
.57777777777775.
..555555555555..`],
  [ wall, bitmap`
L11111LLL111111L
L1111LL1LL1111LL
LL1LLL111L1111L1
1LLL11111LL11LL1
11L1111111LLLLL1
1LL111111L1111LL
LL111111LL1111LL
1LL11111L11111L1
11LLLLLLL1111LL1
11LL1111L1111L11
1LL111111L111L11
1L1111111LLLLL11
1LLLL11LL1111LL1
LL11LLLL111111LL
L11111LL1111111L
L11111L11111111L` ],
  [ background, bitmap`
0LLLLL000LLLLLL0
0LLLL00L00LLLL00
00L000LLL0LLLL0L
L000LLLLL00LL00L
LL0LLLLLLL00000L
L00LLLLLL0LLLL00
00LLLLLL00LLLL00
L00LLLLL0LLLLL0L
LL0000000LLLL00L
LL00LLLL0LLLL0LL
L00LLLLLL0LLL0LL
L0LLLLLLL00000LL
L0000LL00LLLL00L
00LL0000LLLLLL00
0LLLLL00LLLLLLL0
0LLLLL0LLLLLLLL0` ],
  [ pGoal, bitmap`
................
.....00....000..
..000DD0..0DD0..
..0D4444004440..
..0D444444440...
..0D444444440...
..0D4444444440..
..0D4444444440..
..0D4004444000..
..0F0..0440.....
..060...00......
..060...........
..060...........
..060...........
..000...........
................`],
  [ mGoal, bitmap`
................
.....00....000..
..000550..0550..
..057777007770..
..05777777770...
..05777777770...
..057777777770..
..057777777770..
..057007777000..
..0F0..0770.....
..060...00......
..060...........
..060...........
..060...........
..000...........
................`]

)

setSolids([player, mirror, wall])
setBackground(background)

let level = 0
let introDone = false
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........
.........`,
  map`
bbbbbbbbb
b...b...b
b.p.b.G.b
b...b...b
b...b...b
b.g.b.m.b
b...b...b
bbbbbbbbb`,
  map`
bbbbbbbbb
bp.bm...b
b..bbb..b
b....bb.b
bbb..gb.b
bGbbbbb.b
b.......b
bbbbbbbbb`,
  map`
bbbbbbbbb
b.....p.b
bgbbbb..b
b....b..b
b.b.....b
b.bb.G..b
bm....b.b
bbbbbbbbb`,
  map`
bbbbbbbbb
bp...b..b
bbb..b..b
b.b..b..b
b...b.G.b
b...b.bbb
b.g.b..mb
bbbbbbbbb`,
  map`
bbbbbbbbb
b.m.....b
b.bg..bbb
b....G..b
b.b.....b
b.b..b..b
b.b.p...b
bbbbbbbbb`,
  map`
bbbbbbbbb
b...b...b
bb....G.b
bm.b..b.b
b.......b
b.b.b...b
bg.b...pb
bbbbbbbbb`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
  getFirst(mirror).y += 1
  playTune(move)
})

onInput("s", () => {
  getFirst(player).y += 1
  getFirst(mirror).y -= 1
  playTune(move)
})

onInput("a", () => {
  getFirst(player).x -= 1;
  getFirst(mirror).x += 1;
  playTune(move)
});

onInput("d", () => {
  getFirst(player).x += 1;
  getFirst(mirror).x -= 1
  playTune(move)

});

onInput("k", () => {
  setMap(levels[level]);
});

onInput("i", () => {
  if (!introDone && level === 0) {
    clearText()
    introDone = true
    level = 1
    setMap(levels[level])
  }
})

afterInput(() => {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y)
  const mirrorTile = getTile(getFirst(mirror).x, getFirst(mirror).y)

  let onPlayerGoal = false
  let onMirrorGoal = false

  for (let item of playerTile) {
    if (item.type === pGoal) onPlayerGoal = true
  }

  for (let item of mirrorTile) {
    if (item.type === mGoal) onMirrorGoal = true
  }

  if (onPlayerGoal && onMirrorGoal) {
    level++
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      addText("YOU WIN!!", { x: 6, y: 7, color: color`6` })
    }
  }
})

const playback = playTune(melody, Infinity)

if (level === 0) {
  addText("Mirror Maze", { x: 5, y: 3, color: color`6` })
  addText("W A S D to move", { x: 3, y: 5, color: color`2` })
  addText("Press: ", { x: 2, y: 9, color: color`1` })
  addText("I to start", { x: 2, y: 11, color: color`2` })
  addText("K to reset level", { x: 2, y: 13, color: color`2` })
}

