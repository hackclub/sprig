/*
@title: Fireball and Waterball
@author: JesseDoesStuff
@tags: []
@addedOn: 2024-06-20
*/
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
3333993333993333
3333333333333333
3333999999993333
.33339999993333.
..333399993333..
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
7777557777557777
7777777777777777
7777555555557777
.77775555557777.
..777755557777..
...7777777777...
....77777777....`],
  [bg, bitmap`
CCCCCC0CCCCCCCCC
CCCCCC0CCCCCCCCC
CCCCCC0CCCCCCCCC
0000000000000000
CCCCCCCCCCCCC0CC
CCCCCCCCCCCCC0CC
CCCCCCCCCCCCC0CC
0000000000000000
CCCCCC0CCCCCCCCC
CCCCCC0CCCCCCCCC
CCCCCC0CCCCCCCCC
0000000000000000
CCCCCCCCCCCCC0CC
CCCCCCCCCCCCC0CC
CCCCCCCCCCCCC0CC
0000000000000000`],
  [wall, bitmap`
0000000000000000
0C000000000000C0
000CCCCCCCCCC000
00C0CCCCCCCC0C00
00CC0CCCCCC0CC00
00CCC0CCCC0CCC00
00CCCC0CC0CCCC00
00CCCCC00CCCCC00
00CCCCC00CCCCC00
00CCCC0CC0CCCC00
00CCC0CCCC0CCC00
00CC0CCCCCC0CC00
00C0CCCCCCCC0C00
000CCCCCCCCCC000
0C000000000000C0
0000000000000000`],
  [g1, bitmap`
3333333333333399
3339999999333339
3999333333993333
3933333333399333
3933399999339933
9939933339333933
9339333339933933
9339333999333933
9339333993333933
9339933333333933
9933933333339933
3933993333399333
3993399999993339
3399333333333339
3339993333339999
3333399999999333`],
  [g2, bitmap`
7777777777777757
7777777777777755
7775555555557775
7755777777755777
7757755555775777
7757557775775777
7757577775775577
7557577557775777
7577577557775777
5577577777755777
5777557777557777
5777755555577777
5577777777777777
7577777777777775
7555777777777755
7775555777755557`]
  
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
let gameON = 1
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
    gameON = 0
  }
})
