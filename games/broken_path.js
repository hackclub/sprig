/*
@title: broken_path
@author: ale_doypapuxd
*/

let level = 1
const levels = [
  ,
  map`
BBBBBB
DDDDDD
PDCCCC
WDDDDC
WDWWWC
WWWDWC`,
  map`
...CWP
...CWW
WCDDDW
WDWWWC
WDWDDD
WWWDDD`,
  map`
DCCC.P
DCCCDC
DCC.DC
DCDC.C
DCCCCC
DDDDDD`,
  map`
DDDDCCCCCCCC
PDCCCCDDCCDC
CCCDDCCDCCCC
CCDDDDCDCDDD
CCCDDCCDCDDD
CDCCCCDDCCCC
CDDDDDDDDDDC
CDDCCCCCCCCC
CCCCCCCCCCCC`,
  map`
.CC.DDDDDPD..CCCC..
.CC.DDDDD.D.DDDDDD.
.....DDDD.D..CCCC..
D....D..DCDDDDDDD..
DDD..D.............
..DD.C.C...........
C..DD............DD
C...D....DD......DB
....DDDDDD.....DDDB
D....D........DDBBB
......D......DDBBBD
...D..D.....DDDDDDD
......D............
......DD...........
..D.D..D....CCCCCC.
............CCCCCC.
........D...CCCCCC.
......DD....CCCCCC.
...D........CCCCCC.
............CCCCCC.
.......D....CCCCCC.
....D..............
.D.................
...................`,
  map`
BBBBBBBBBB
BBBBBBBBBB
DDDDDDDDDD
CCCC.DD.QP
DDDCD.Q.CQ
C.DCD.Q...
..DCD.CDDD
..DCDC.DBB
..D..QDDBB
......DBBB
.....DDBBB
......DBBB
..C..CDBBB`,
  map`
Q.Q.QP
.Q.Q.Q
Q.Q.Q.
.Q.Q.Q
..Q.Q.
C..Q.Q`,
  map`
PDBBBBBBBBBBBBDCC
.DDDDDDDDDDDDDDCC
....D.....D.Q....
......D.D...QQ...
DDDDDDDDDDDDDDDD.
BBBBBBBBBBBBBBBD.`,
  map`
CCCCCCCCCDCCD
CDCDDDDDCDCCD
CDCDCCCDCDCCD
CDCDCPCDCDCCD
CDCDCDDDCDCCD
C.Q.Q..DCCCCD
CC.C.........
DDD..DDDDDDDD`,
  map`
D.QD...D
.QDQ.DQ.
D.Q.C..Q
CC.CDC.C
D...CCCQ
.CDC.DPC
CDC..CD.
...C.CCC`,
  map`
QQQQQQQQ
QQQQQQQQ
CCCQQQQQ
CDCCCDQQ
CCCCDPQQ
CCCCDCQQ
CCCDCCQQ
CCCCCDQQ`,
  map`
BBBBBBB..B.....B......B..BB..BB.
...B.....B......B....B..BCCBBCCB
...B.....B.......B..B...BCCCCCCB
...B.....B........BB....BCCCCCCB
...B.....BBBB.....BB.....BCCCCB.
...B.....B...B...B..B.....BCCB..
...B.....B...B..B....B.....BB...
...B.....B...B.B......B.........
QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
.......................QQQQQQQQQ
...B.....B.......BBBB...QQQQQQQQ
...B.....B......B....B...QQQQQQQ
.BBBBBB..B......B....B....QQQQQQ
...B.....B......BBBBB......QQQQQ
...B.....BBB....B...........QQQQ
...B.....B..B...B............QQQ
Q..B.....B..B....BBBB.........QQ
QQ.............................Q
QQQ..........................B..
QQQQ.........................B..
QQQQQ........BBBBB...BB......B..
QQQQQQ.....BB....B...BBB.....B..
QQQQQQQ....B..BBBB...B.B....BB..
QQQQQQQQ...BBBB......B.BB..BBB..
QQQQQQQQQ..B.........B..B..B.B..
QQQQQQQQQQ.BB.......BB..B..B.B..
QQQQQQQQQQQ.BBBBBB..B...B..BBB..
QQQQQQQQQQQQ.....B..............
QQQQQQQQQQQQQ...................`
]

const dead = map`
WWWWWW
WWWWWW
WWWWWW
WWWWWW
WWWWWW
WWWWWW`
const start = map`
BBWCWP
BBWCWW
WCDDDW
WDWWWC
WDWDDD
WWWDDD`
const player = "P"
const backdrop = "B"
const wall = "W"
const coin = "C"
const brokenwall = "D"
const box = "Q"
const collect = tune`
275.22935779816515,
275.22935779816515: c4-275.22935779816515 + d4-275.22935779816515 + g4-275.22935779816515 + c5-275.22935779816515,
275.22935779816515: d5-275.22935779816515 + g4-275.22935779816515 + d4/275.22935779816515 + c4-275.22935779816515 + e4-275.22935779816515,
7981.6513761467895`
const walk = tune`
149.2537313432836: c4^149.2537313432836,
149.2537313432836: c4^149.2537313432836,
4477.611940298508`
const lose = tune`
500,
500: e4^500 + f4^500 + d5~500,
500: f4^500,
500: c5~500 + a4-500,
500: a4-500,
500,
500: g4/500 + a4/500 + e4^500,
12500`

setLegend(
  [player, bitmap`
................
......6666......
.....666666.....
....66066066....
....66666666....
....66666666....
....66000066....
.....6CCCC6.....
......CCCC......
.....5CCCC5.....
...5555555555...
...5.555555.5.4.
...5.555555.LL4.
.....5L55L5...4.
......L..L......
......0..0......`],
  [backdrop, bitmap`
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
  [wall, bitmap`
1111111111LL1111
1111111111LL1111
1111111111LL1111
1111111111LL1111
1111111111LL1111
111111111LLLL111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL1
1111111111111111
1111111111111111
111111111111111L
L1111111111111LL
LL111111111111LL
LLLLL11111111LLL
LLL1111111111LLL
LLL111111111111L`],
  [coin, bitmap`
1111111111LL1111
1111111111LL1111
1111111111LL1111
11111166666L1111
1111166666661111
1111666F6FFF6111
LLLL66FF6F6F6LLL
LLLL6FFF6F6F6LL1
1111666F6F6F6111
1111666F6F6F6111
1111666F6FFF611L
L1111666666611LL
LL111166666111LL
LLLLL11111111LLL
LLL1111111111LLL
LLL111111111111L`],
  [box, bitmap`
0000000000000000
00CCCCC00CCCCC00
0C0CCCC00CCCC0C0
0CC0CCC00CCC0CC0
0CCC0CC00CC0CCC0
0CCCC0C00C0CCCC0
0CCCCC0000CCCCC0
0000000000000000
0000000000000000
0CCCCC0000CCCCC0
0CCCC0C00C0CCCC0
0CCC0CC00CC0CCC0
0CC0CCC00CCC0CC0
0C0CCCC00CCCC0C0
00CCCCC00CCCCC00
0000000000000000`],
  [brokenwall, bitmap`
1000000011LL1111
0000000000L00011
0000000000000001
1111000000000001
1110000000000001
1100000000000001
L00000000000000L
L000000000000001
1000000000000001
1000000000000001
100000000000000L
L0000000000000LL
L0000000000000LL
LL00000000000LLL
LLL0000100001LLL
LLL111110001000L`]
)
setBackground(wall)
setPushables({ 
  [player]: [ box, player ] 
})
setMap(levels[level])
addText("Get the coins", 4, 6, color `3`)
setSolids([player, brokenwall, box])

const currentlevel = levels

afterInput(() => {
    if (getAll(coin).length < 0.5) {
      level = level + 1
      
      setMap(levels[level])
      playTune(collect)
      clearText()
    }
})

afterInput(() => {
    if (getAll(player).length < 1) {
      playTune(lose)
      setMap(levels[1])
      setMap(levels[level])
    }
})


onInput("w", () => {
  const x = (getFirst(player).x)
  const y = (getFirst(player).y)
  getFirst(player).y -= 1
  clearTile(x, y)

  if (getAll(player).length = 1) {
      addSprite(x, y, brokenwall)
      playTune(walk)
  }
  if (getAll(player).length = 0) {
    addSprite(x, y, player)
  }
})

onInput("a", () => {
  const x = (getFirst(player).x)
  const y = (getFirst(player).y)
  getFirst(player).x -= 1
  clearTile(x, y)

  if (getAll(player).length = 1) {
      addSprite(x, y, brokenwall)
      playTune(walk)
  }
  if (getAll(player).length = 0) {
    addSprite(x, y, player)
  }
})
onInput("s", () => {
  const x = (getFirst(player).x)
  const y = (getFirst(player).y)
  getFirst(player).y += 1
  clearTile(x, y)

  if (getAll(player).length = 1) {
      addSprite(x, y, brokenwall)
      playTune(walk)
  }
  if (getAll(player).length = 0) {
    addSprite(x, y, player)
  }
})
onInput("d", () => {
  const x = (getFirst(player).x)
  const y = (getFirst(player).y)
  getFirst(player).x += 1
  clearTile(x, y)

  if (getAll(player).length = 1) {
      addSprite(x, y, brokenwall)
      playTune(walk)
  }
  if (getAll(player).length = 0) {
    addSprite(x, y, player)
  }
})