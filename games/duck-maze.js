const player = "p"
const apple = "a"
const wall = "w"
const wall2 = "q"

setLegend(
  [player, bitmap`
..........33....
.........3333...
........000000..
.......06666660.
......0666606660
......0666606699
......0666666699
.......0666660..
..0.....00000...
..00000006660...
.0066666666660..
.0066600006660..
..066006666660..
..00660000660...
...066666660....
....0000000.....` ],
  [apple, bitmap`
................
................
.........C......
........C.......
.......D44......
.......44D......
......33333.....
.....3333333....
....333333333...
...33333333333..
...33333333333..
...33333333333..
...33333333333..
...33333333333..
....333333333...
.....3333333....` ],
  [wall, bitmap`
H0H0H0H0H0H0H0H0
H0H0H0H0H0H0H0HH
H0H0H0H0H0H0H000
H0H0H0H0H0H0HHHH
H0H0H0H0H0H00000
H0H0H0H0H0HHHHHH
H0H0H0H0H0000000
H0H0H0H0HHHHHHHH
H0H0H0H000000000
H0H0H0HHHHHHHHHH
H0H0H00000000000
H0H0HHHHHHHHHHHH
H0H0000000000000
H0HHHHHHHHHHHHHH
H000000000000000
HHHHHHHHHHHHHHHH` ],
  [wall2, bitmap`
H0H0H0H0H0H0H0H0
H0H0H0H0H0H0H0HH
H0H0H0H0H0H0H000
H0H0H0H0H0H0HHHH
H0H0H0H0H0H00000
H0H0H0H0H0HHHHHH
H0H0H0H0H0000000
H0H0H0H0HHHHHHHH
H0H0H0H000000000
H0H0H0HHHHHHHHHH
H0H0H00000000000
H0H0HHHHHHHHHHHH
H0H0000000000000
H0HHHHHHHHHHHHHH
H000000000000000
HHHHHHHHHHHHHHHH` ]
)

setSolids([ player, wall, wall2 ])

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

let level = 0
const levels = [

  map`
www.....w...
ww...ww...w.
p...w...w...
...wwwwww.ww
wwwww...w...
www...w.w.w.
qq..w..w.w..
a..w........`,
  map`
ww..........
p.q.wqqqqq..
..q......q..
q....www..q.
..wwwqwwqq..
ww.........q
aww.wq.q.qww
.....qq..qqq`,
  map`
qqqqqqqqqqqq
p...qqqqqqqq
qqq..qqqqqqq
a..q..qqqqqq
ww..q..qqqqq
www..q..qqqq
wwww..q..qqq
wwwww..q.wqq
wwwwww...wwq`
]

setMap(levels[level])
afterInput(() => {
if (tilesWith(player, apple).length > 0) {
 level += 1

if (level < levels.length) {
setMap(levels[level]) 
} else {
addText("You win!", { y: 4, color: color`3` }) 
}
}
})
