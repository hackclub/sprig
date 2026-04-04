/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Factory Escape
@author: Adrián Bethencourt Cruzado
@description: In this game you control a chicken using WASD and help her escape, you also have a partner you can control with IJKL.
@tags: [puzzle, co-op]
@addedOn: 2026-02-07
*/

const player = "p"
const second = "t"
const egg = "e"
const pan = "n"
const ball = "b"
const wall = "w"
const exit = "x"

setLegend(
  [ player, bitmap`
................
................
......0000......
......03330.....
......03330.....
.....0222220....
....022222220...
..00022022020...
..02022022020...
..02222229920...
..02222223220...
..02222223220...
...022222220....
....00C00C0.....
.....00..00.....
................` ],
  [ second, bitmap`
................
................
......0000......
.....03330......
.....03330......
....0LLLLL0.....
...0LLLLLLL0....
...0L0LL0LL000..
...0L0LL0LL0L0..
...0L99LLLLLL0..
...0LL3LLLLLL0..
...0LL3LLLLLL0..
....0LLLLLLL0...
.....0C00C00....
.....00..00.....
................`],
  [ egg, bitmap`
................
.......00.......
.....001200.....
....0D122210....
...0DD2222210...
...0D222222D0...
..012222222DD0..
..0222DD2222D0..
.0122DDDD222220.
.0D12DDDD222220.
.0D122DD2222220.
..0112222222D0..
..0L1111222DD0..
...0DDD1111D0...
....00DLLL00....
......0000......`],
  [ pan, bitmap`
................
................
................
................
....1...1.......
.....1...1......
.....1...1......
....1...1.......
...1...1......0.
...1...1.....030
....1...1...030.
...........030..
.000000000030...
0LLLLLLLLLL0....
.00LLLLLL00.....
...000000.......`],
  [ ball, bitmap`
....00000000....
...0LLLLLLLL0...
..0L111111LLL0..
.0L11111111LLL0.
0L1122221111LLL0
0L1220022111LLL0
0L1222022111LLL0
0L1222022111LLL0
0L1220002111LLL0
0L1122221111LLL0
0L1111111111LLL0
0LL11111111LLLL0
.0LL111111LLLL0.
..0LLLLLLLLLL0..
...0LLLLLLLL0...
....00000000....`],
  [ wall, bitmap`
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
  [ exit, bitmap `
0000000000000000
0000020002000000
0000002020000000
0000000200000000
0000002020000000
0000020002000000
0000000000000000
00000.....000000
00...........000
0.............00
................
................
................
................
................
................`]
)

setSolids([egg, player, second, wall, ball])

let level = 0
const levels = [
  map`
wxw
.e.
p..`,
  map`
...ww
.wbxw
.e..w
pw.ww` ,
  map`
.wxw
....
wbw.
p.wt`, 
  map`
wwxwt
...e.
ww.w.
.e.w.
pw.w.`,
]

setMap(levels[level])

/* PUSHING OBJECTS */
setPushables({
  [ player ]: [egg, ball],
  [ second ]: [egg, ball],
})

/* CONTROLS FIRST PLAYER */
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

/* CONTROLS FIRST PLAYER */
onInput("k", () => {
  getFirst(second).y += 1
})

onInput("i", () => {
  getFirst(second).y -= 1
})

onInput("l", () => {
  getFirst(second).x += 1
})

onInput("j", () => {
  getFirst(second).x -= 1
})



afterInput(() => {
  
  // 1 if the player is in the exit
  const goal = tilesWith(exit, player).length;
  
  if (goal === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you escaped!", { y: 3, color: color`3` });
    }
  }
})
