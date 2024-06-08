  const player = "p"
  const wall = "w"
  const goal = "g"

setLegend(
	[ player, bitmap`
..6.............
.666........3.3.
..6..........3..
....00000000....
...0222222220...
..022222222220..
.02220222202220.
.02222222222220.
0022220220222200
.02222200222220.
.02222222222220.
..002222222200..
....00000000....
3.3..0....0...6.
.3...0....0..666
....00....00..6.` ],
    [ wall, bitmap`
.......DDDDD....
...DDDD4444DDDD.
.DDD443DD44D83DD
DD4DD4834DD4344D
D4444DD44D444DDD
DD3D444D438DD44D
D384DD4D4D3444DD
DDD444DDDDDDDDD.
..DDDDDCCCD.....
......CCCC......
......CCCC..3...
..3...C8CC......
......CCCC......
......CCCC.....8
.8...CCCCCC.....
....CCCCC3CC....` ],
    [ goal, bitmap`
............1L..
..........1L....
.......00...1L..
......0CC0.000..
.....0CCCC00F0..
....0CC11CC0F0..
...0CCCCCCCC00..
..0C11CCCCCCC0..
.0CCCCCCC111CC0.
0000000000000000
..0FFFFFFFFFF0..
..0F0000F000F0..
..0F0CC0F070F0..
..0F06C0F000F0..
..0F0CC0FFFFF0..
..000000000000..` ]
)

setSolids([ player, wall ])

let level = 0
const levels = [
	map`
wwwwwwwwwwwwwwwwwww
w...w.............w
w..ww.wwwwwwwwwww.w
w.w...w.........w.w
w.w.w.wwwwwwwww.w.w
w.w.w.........w...w
w.w.w.wwww.w..www.w
w.w.w.w...w.w.ww..w
w.w.w.w.www.w.www.w
w.w.w.w.wpw.w.w.w.w
w.w.w.w.....w.w.w.w
w.w.w.w.www.w.w.w.w
w.w.w.w.w..ww.w.w.w
w.w.w...w.....w.w.w
w.w.wwwww.wwwww.w.w
w.........w.....w.w
w.wwwwwwwww.wwwww.w
w.w...w..gw.w...w.w
w...w.w.www...w...w
wwwwwww.....wwwwwww`,
    map`
wwwwwwwwwwwwwwwwwww
w.................w
w.wwwww.www.wwwww.w
w.w...w.w.w.w...w.w
w.w.w.w.w.w.w.w.w.w
w.w.w.w.....w.w.w.w
w.w.w.www.www.w.w.w
w...w.w.....w.w...w
w.www.w..w.ww.www.w
w...w.wwww..w.w...w
wwwww.w.w..ww.wwwww
w.....w.....w.....w
w.w.wwwww.wwwww.w.w
w.w.w...w.w...w.w.w
w.w.w.w.wgw.w.w.w.w
w.w.w.w.www.w.w.w.w
w.w.w.w.wpw.w.w.w.w
w.....w.....w.....w
wwwwwwwwwwwwwwwwwww`,
    map`
...................
.wwwwwwww.wwwwwwww.
..w.............w..
.ww.wwwwwwwwwww.ww.
..w...........w.w..
.wwwwwwwwwwwwww.ww.
..w.............w..
.ww.wwwwwwwwwwwwww.
..w.............w..
.wwwwwwwwwwwwww.ww.
..w...........w.w..
.ww.wwwwwwwww.w.ww.
..w.w.w.....w.w.w..
.ww.w.w.www.w.w.ww.
..w.w.w.wpw.w.w.w..
.ww.w.w.w.w.w.w.ww.
..w.....w.wgw...w..
.wwwwwwww.wwwwwwww.
...................`
]

setMap(levels[level])

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

afterInput(() => {
  const goalsCovered = tilesWith(player, goal)
  if (goalsCovered.length >= 1) {
    level = level + 1
  if (level < levels.length) {
    setMap(levels[level])
  } else {
    addText("Congrats! You win!", { y: 3, color: color`H`})
  }
  }
})