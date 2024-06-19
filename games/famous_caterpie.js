// define some of the sprites for my levels
const p1 = "1"
const p2 = "2"
const bg = "b"
const wall = "w"
const g1 = "3"
const g2 = "4"

// bitmaps for my different objects
setLegend(
  [p1, bitmap`
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],
  [p2, bitmap`
....77777777....
...7777777777...
..777777777777..
.77777777777777.
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
.77777777777777.
..777777777777..
...7777777777...
....77777777....`],
  [bg, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
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
  [g1, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [g2, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
  
)

setSolids([p1, wall, p2])

const levels = [
  map`
wwwwwwwwwwwww
w1bbbbwbbbbbw
wbbbbbwbbwbbw
wbw4bbwbbwwbw
wbwwwwwbbwbbw
wbbbw3bbwwbww
wbbbwwwwwbbbw
wbbwwbbbbbwbw
wbbbbbwwwww2w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w3bbwbbbw14w
wbwbwbwbwbbw
wbwbwbwbwbbw
wbwbwbwbwbbw
wbwbwbwbwbbw
wbwbwbwbwbbw
wbwbwbwbwbbw
w2wbbbwbbbbw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wbbbbwbbbwbw
wbbwbwbwbwbw
w41wbbbwbbbw
wwwwwwwwwwbw
wbbbbbbb2wbw
wbwwwwww3wbw
wbwwwwwwwwbw
wbbbbbbbbbbw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w32bbbw1bb4w
wwwwwbwbbbbw
wbwbbbwwwwbw
wbwbwbwbbbbw
wbwbwbwbwwww
wbwbwbwbbbbw
wbwbwbwwwwbw
wbbbwbbbbbbw
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wbbbbbbbbbbw
wbwwwwwwwwbw
wbbbbw3bwwbw
wwb2wwwbbbbw
wbwwbwbwwwbw
wbbbbbbbbbbw
wbbwwbwbwwbw
w1bw4bwbwbbw
wwwwwwwwwwww`,
  map`
........................
........................
..433433433333433433....
...4333.433433433433....
....43..433433433433....
....43..433333.4333.....
........................
........................
........................
........................
........................
..43..43433333433.43433.
..434343..43..434343433.
..433333..43..434343....
...4343.43333343.433433.
........................
........................
........................
........................
........................`
]
let level = 0
setMap(levels[level])
setBackground(bg)

// player 1 controls
onInput("w", () => {
  getFirst(p1).y -= 1
})

onInput("s", () => {
  getFirst(p1).y += 1
})

onInput("a", () => {
  getFirst(p1).x -= 1
})

onInput("d", () => {
  getFirst(p1).x += 1
})

//player 2 controls
onInput("i", () => {
  getFirst(p2).y -= 1
})

onInput("k", () => {
  getFirst(p2).y += 1
})

onInput("j", () => {
  getFirst(p2).x -= 1
})

onInput("l", () => {
  getFirst(p2).x += 1
})

afterInput(() => {
  let g1s = getFirst(g1)
  let g2s = getFirst(g2)
  if (g1s.x == getFirst(p1).x && g1s.y == getFirst(p1).y && g2s.x == getFirst(p2).x && g2s.y == getFirst(p2).y) {
    playTune(tune`
107.14285714285714: C4-107.14285714285714,
107.14285714285714: D4-107.14285714285714,
107.14285714285714: E4-107.14285714285714,
3107.142857142857`)
    level+=1
    setMap(levels[level])
  }
})