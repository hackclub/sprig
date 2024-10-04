/*
@title: RR Run
@author: Weston Bui
@tags: ['puzzle']
@addedOn: 2024-05-10
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const player = "p"
const box = "b"
const wall = "w"
const goal = "g"
const bomb = "y"
const explosion = "x"
const key = "k"
const lock = "l"
const restart = "r"

setLegend(
  [ player, bitmap`
...00000000000..
...06620602660..
...06620602660..
...00066066600..
......000000....
.....0000000....
....00..0..00...
..000...0...000.
........0.......
........0.......
.......000......
......00.00.....
.....00...00....
...000.....000..
...0.........0..
0000.........000` ], [box,bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDCCDDCCCCDCCDDD
CDDCCDDCCDDCCCDD
CCCCCCDCCCCCCCDD
CCCCCCCCCCCCCCCD
CCDDCCCCCCCDDCCC
CCCDDCCCCCDDCCCC
CCCC20CCC02CCCCC
CCCC20CCC02CCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCDDDDDDDDDDDCCC
CCDCCCCCCCCCDCCC
CCCCCCCCCCCCCCCC`],[wall,bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],[goal,bitmap`
................
................
................
................
................
.DDDDD...DDDDD..
.D..DDD..D...DD.
.D....D..D....D.
.D....D..D....D.
.D...DD..D...DD.
.DDDDD...DDDDD..
.DDDDD...DDDDD..
.D...D...D...D..
.D...DD..D...DD.
.D....D..D....D.
.D....D..D....D.`],[bomb,bitmap`
.........9......
........99......
.......LLL......
.......L........
..000000000000..
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
..000000000000..`],[explosion,bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9969999999999996
9999996996996969
9699969999999999
9996996999999699
9999999969699999
9669999699999969
.99966966996999.
..999996996699..
...6969969699...
..996696969996..
.9669966966969..`],[key,bitmap`
......6666......
.....66666......
....666666......
...6666666......
......6666......
....666666......
...6666666......
......6666......
..666666666666..
..666666666666..
..666666666666..
..666......666..
..666......666..
..666666666666..
..666666666666..
..6666666666666.`], [lock, bitmap`
LLLLLLLLLLLLLLLL
LLL1111111111LLL
LLL1222222221LLL
LLL1222222221LLL
LLL1111111111LLL
LLL1111111111LLL
LL111111111111LL
LL1111LLL11111LL
LL11111LL11111LL
LL1111LLL11111LL
LL11111LL11111LL
LL111111111111LL
LLL1111111111LLL
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000`],[restart, bitmap`
4444.4..444.4..4
4..4.4.44.4444.4
4.44.4.44.44.444
444..4.44.44..4.
4....4.44444..4.
4....4.4...4..4.
................
................
................
.4.444.4.44444.4
4444..444.4.44.4
4.44..4.4.4.44.4
4.44..4.4.4.4444
444444444.4.4.44
4.44.44.4.4.4..4
4.44444.44444..4`]
)

let level = 5
const levels = [
  map`
wwww.wwg
...b....
.ww..bww
.w.wwyw.
.ww....b
....w.w.
wwwwwbw.
p.......`,
  map`
gwww.www
.w.b....
....w.ww
ywwb.b..
ww..ww..
....wxw.
wwwwwwwb
p.......`,
  map`
www..b..yy.g
www...w....w
y..yw.wwwyw.
yy.w.....b..
wywwwwwwyw..
...w......wb
.ww..bwww...
.w.y.....www
.ww.www..b.w
..b.w.w.w..w
wwwwwbwbyw.w
p........b..`,
  map`
ww...wwww......g
ww........wwwwww
wwlwwwwwwww.....
ww...........w..
ww..www.w.w..w..
w.ww..kw.w.www..
ww..b..b........
w....www........
w.w.w...ww.ww...
w.www..b.wb.wwww
w......w.......w
wwww..wwwwwb...w
w.w.w.w...w.ww.w
w..b.ww.w.b..w.w
wbw.www.w.w.wwbw
p.w..b...w......`,
  map`
ky...wwy......lg
.w.b....byywb.ww
......w.w.......
.wwyw..b..wwwbwy
wy...w..ww.....y
.w.w..ww..b..wyy
.b..w...b.yww.ww
.wwwyb.ww.w..b..
.w...wy..w..y.ww
b..w...b...w.b.y
..wywww.wyw..wyw
yyw...w.wwy.wywy
xwwbw.www.....b.
xwy.y...www.www.
www.wwy.b.yw...b
p..b.www.....y..`,
  map`
p..........r
.w.wwwww..w.
.wwww.ww..w.
..w.w.ww..w.
..w.wwwwwww.
............
w...wwwww..w
w...w.w.ww.w
w.w.w.w.w.ww
.w.w.wwww..w`
]

setMap(levels[level])

setSolids([player, box, wall, lock])
setPushables({
  [ player ]: [box]
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y += -1
})

onInput("a", () => {
  getFirst(player).x += -1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  if(getFirst(goal) && getFirst(player).x == getFirst(goal).x && getFirst(player).y == getFirst(goal).y){
    level +=1
    setMap(levels[level])
  }
})
afterInput(() => {
  let p = getFirst(player)
  getAll(bomb).forEach((bomb) => {
    if (bomb.x == p.x && bomb.y == p.y) {
      bomb.remove()
      setMap(levels[level])
    }
  })
})
afterInput(() => {
  let p = getFirst(player)
  let k = getFirst(key)
  if (k && p.x === k.x && p.y === k.y) {
    getAll(lock).forEach((l) => l.remove())
    k.remove()
  }
})
afterInput(() => {
  let p = getFirst(player)
  let r = getFirst(restart)
  if (r && p.x === r.x && p.y === r.y){
    level = 0
    setMap(levels[level])
  }
})
