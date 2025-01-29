/*
@title: Another Maze Runner
@author: AyoubChafiq
@tags: []
@addedOn: 2024-06-07
@img: ""
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const player = "p";
const wall = "w";
const background = "b";
const prize = "o";
const prize2 = "f";
const prize3 = "g";
const pushablewalls = "a";
const key = "d";
const lockedwalls = "u";
const unlockedwalls = "t";
const spike = "s";
const ice = "i";
const player2 = "m";
const key2 = "l";
const lockedwalls2 = "c";
const swap = "h";
const enemy = "q"
const enemy2 = "j"
const background2 = "r"
const black = "e"


const red = `3`
const blue = `5`

function style1() {
  setLegend([player, bitmap`
................
......00000.....
......02220.....
......02220.....
......02220.....
......00000.....
....000333000...
....0.03330.0...
......03330.....
......00000.....
......0...0.....
......0...0.....
......0...0.....
......0...0.....
................
................`],
    [player2, bitmap`
  ................
  ......00000.....
  ......02220.....
  ......02220.....
  ......02220.....
  ......00000.....
  ....000555000...
  ....0.05550.0...
  ......05550.....
  ......00000.....
  ......0...0.....
  ......0...0.....
  ......0...0.....
  ......0...0.....
  ................
  ................`],
    [enemy, bitmap`
  ...0000000......
  ...0333330......
  ...0330330......
  ...0332330......
  ...0333330......
  0000333330000...
  0333CCCCC3330...
  0333CCCCC3330...
  0333CCCCC3330...
  0333CCCCC3330...
  0333CCCCC3330...
  0000CCCCC0000000
  0333CCCCC333LLL0
  0000CCCCC0000LL0
  ....00.00...0000
  ...000.000......`],
    [enemy2, bitmap`
  ...0000000......
  ...0555550......
  ...0550550......
  ...0552550......
  ...0555550......
  0000555550000...
  0555CCCCC5550...
  0555CCCCC5550...
  0555CCCCC5550...
  0555CCCCC5550...
  0555CCCCC5550...
  0000CCCCC0000000
  0555CCCCC555LLL0
  0000CCCCC0000LL0
  ....00.00...0000
  ...000.000......`],
    [wall, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LLLL00000000LLLL
  LLL1022222222LLL
  LL001022222220LL
  LL020102222220LL
  LL022010222220LL
  LL022201022220LL
  LL022220102220LL
  LL022222010220LL
  LL022222201020LL
  LL022222220100LL
  LLL2222222201LLL
  LLLL00000000LLLL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
    [background, bitmap`
  4444444444444444
  4444444444444444
  4444444444444444
  44D4D4D4D4D4D444
  444D4D4D4D4D4D44
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  4444444444444444
  444D4D4D4D4D4D44
  44D4D4D4D4D4D444
  4444444444444444
  4444444444444444
  4444444444444444`],
    [prize, bitmap`
  ................
  ................
  ................
  ................
  3..3.3.3.3.3..3.
  6..6.6.6.6.6..6.
  66.6.6.6.6.6.66.
  .6.6.6.6.6.6.6..
  .6666666666666..
  .6666666666666..
  .6666666666666..
  .6666666666666..
  .6666666666666..
  ................
  ................
  ................`],
    [prize2, bitmap`
  ................
  ................
  ................
  ................
  3..3.3..........
  6..6.6..........
  66.6.6..........
  .6.6.6..........
  .6666660........
  .66666660.......
  .6666660........
  .66666660.......
  .6666660........
  ................
  ................
  ................`],
    [prize3, bitmap`
  ................
  ................
  ................
  ................
  .........5.5..5.
  .........6.6..6.
  .........6.6.66.
  .........6.6.6..
  ........066666..
  .......0666666..
  ........066666..
  .......0666666..
  ........066666..
  ................
  ................
  ................`],
    [pushablewalls, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LL000000000000LL
  LL03HHH11HHH30LL
  LL0H3HH11HH3H0LL
  LL0HH3H11H3HH0LL
  LL0HHH3113HHH0LL
  LL011113311110LL
  LL011113311110LL
  LL0HHH3113HHH0LL
  LL0HH3H11H3HH0LL
  LL0H3HH11HH3H0LL
  LL03HHH11HHH30LL
  LL000000000000LL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
    [key, bitmap`
  ......6666......
  .....666666.....
  ....666..666....
  ....66....66....
  ....66....66....
  ....666..666....
  .....666666.....
  ......6666......
  .......66.......
  .......66.......
  ......1FF1......
  .......66.......
  .......666666...
  .......66.......
  ......1FF1......
  .......666666...`],
    [lockedwalls, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LL000000000000LL
  LL033333333330LL
  LL033330033330LL
  LL033303303330LL
  LL0333033L3330LL
  LL033000000330LL
  LL033002200330LL
  LL033022220330LL
  LL033002200330LL
  LL033002200330LL
  LL033000000330LL
  LL000000000000LL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
    [unlockedwalls, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LL000000000000LL
  LL044444444440LL
  LL044444400440LL
  LL044444044040LL
  LL044444044L40LL
  LL040000004440LL
  LL040022004440LL
  LL040222204440LL
  LL040022004440LL
  LL040022004440LL
  LL040000004440LL
  LL000000000000LL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
    [spike, bitmap`
  ................
  ................
  ................
  ................
  .......0........
  ......000.......
  .....00L00......
  ....00LLL00.....
  ...00LL1LL00....
  ..00LL111LL00...
  .00LL11211LL00..
  00LL1122211LL00.
  0LL112222211LL00
  ................
  ................
  ................`],
    [ice, bitmap`
  7777777777777777
  7577777777777777
  7757777577777777
  7777777757777777
  7777577777777777
  7777757777777777
  7777777777757777
  7777777577775777
  7757777757777777
  7775777777777777
  7777777777577777
  7777777777757777
  7777775777777777
  7577777577777577
  7757777777777757
  7777777777777777`],
    [key2, bitmap`
  ......5555......
  .....555555.....
  ....555..555....
  ....55....55....
  ....55....55....
  ....555..555....
  .....555555.....
  ......5555......
  .......55.......
  .......55.......
  ......1FF1......
  .......55.......
  .......555555...
  .......55.......
  ......1FF1......
  .......555555...`],
    [lockedwalls2, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LL000000000000LL
  LL055555555550LL
  LL055550055550LL
  LL055505505550LL
  LL0555055L5550LL
  LL055000000550LL
  LL055002200550LL
  LL055022220550LL
  LL055002200550LL
  LL055002200550LL
  LL055000000550LL
  LL000000000000LL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
    [swap, bitmap`
  ................
  ................
  ................
  .....000000.....
  ....00333300....
  ...0030500300...
  ...0300500030...
  ...0355555530...
  ...0300500030...
  ...0300500030...
  ...0030500300...
  ....00333300....
  .....000000.....
  ................
  ................
  ................`],
    [background2, bitmap`
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1`],
    [black, bitmap`
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
  LLLLLLLLLLLLLLLL`],
  )
}



function style2() {
  setLegend(
    [player, bitmap`
  0000.000000.....
  055001L1L1L0....
  050011L1L1L0....
  000001111110.0..
  0.01L0000000010.
  ..0L1CCCCC0.010.
  ..0L1C0CC00.010.
  ..01LC0CC00.010.
  ...0LCCCCC0.010.
  .00000LLL000010.
  0LL1011111005550
  .0500LL101050C0.
  000000001010550.
  07300LL1110.00..
  03700550050.....
  .00.0LL00LL0....`],
    [player2, bitmap`
  0000.000000.....
  0HH003434340....
  0H0033434340..0.
  000003333330.090
  0.03000000000990
  ..040777770.0990
  ..040775750.0990
  ..030775750.090.
  ...00777770.090.
  .00000000000090.
  044303333300LLL0
  .0H004430307070.
  000000003030700.
  04D00443330.00..
  0D400HH00H0.....
  .00.04400440....`],
    [enemy, bitmap`
  ...0000000......
  ...0333330......
  ...0330330......
  ...0332330......
  ...0333330......
  0000333330000...
  0333CCCCC3330...
  0333CCCCC3330...
  0333CCCCC3330...
  0333CCCCC3330...
  0333CCCCC3330...
  0000CCCCC0000000
  0333CCCCC333LLL0
  0000CCCCC0000LL0
  ....00.00...0000
  ...000.000......`],
    [enemy2, bitmap`
  ...0000000......
  ...0555550......
  ...0550550......
  ...0552550......
  ...0555550......
  0000555550000...
  0555CCCCC5550...
  0555CCCCC5550...
  0555CCCCC5550...
  0555CCCCC5550...
  0555CCCCC5550...
  0000CCCCC0000000
  0555CCCCC555LLL0
  0000CCCCC0000LL0
  ....00.00...0000
  ...000.000......`],
    [wall, bitmap`
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
  LLLLLLLLLLLLLLLL`],
    [background, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLL1LLLLLLLL
  LLLLLLLLLLL111LL
  LL111LLLLL11111L
  L11111LLLL11111L
  L11111LLLLL111LL
  LL111LLLLLLLLLLL
  LLLLLL111LLLLLLL
  LLLLL11111LL1LLL
  LLLLL11111LLLLLL
  LL11LL111LLLL11L
  L1111LLLLLLLL11L
  111111LLLL11LLLL
  L1111LLLL1111LLL
  LL11LLLLLL111LLL
  LLLLLLLLLL11LLLL`],
    [prize, bitmap`
  ................
  ................
  ................
  ................
  3..3.3.3.3.3..3.
  6..6.6.6.6.6..6.
  66.6.6.6.6.6.66.
  .6.6.6.6.6.6.6..
  .6666666666666..
  .6666666666666..
  .6666666666666..
  .6666666666666..
  .6666666666666..
  ................
  ................
  ................`],
    [prize2, bitmap`
  ................
  ................
  ................
  ................
  3..3.3..........
  6..6.6..........
  66.6.6..........
  .6.6.6..........
  .6666660........
  .66666660.......
  .6666660........
  .66666660.......
  .6666660........
  ................
  ................
  ................`],
    [prize3, bitmap`
  ................
  ................
  ................
  ................
  .........5.5..5.
  .........6.6..6.
  .........6.6.66.
  .........6.6.6..
  ........066666..
  .......0666666..
  ........066666..
  .......0666666..
  ........066666..
  ................
  ................
  ................`],
    [pushablewalls, bitmap`
  ....11111111....
  ...1LLLLLLLL1...
  ..1LL111111LL1..
  .1L1111111111L1.
  1LL1111111111LL1
  1L111111111111L1
  1L111111111111L1
  1L111111111111L1
  1L111111111111L1
  1L111111111111L1
  1L111111111111L1
  1LL1111111111LL1
  .1L1111111111L1.
  ..1LL111111LL1..
  ...1LLLLLLLL1...
  ....11111111....`],
    [key, bitmap`
  ......6666......
  .....666666.....
  ....666..666....
  ....66....66....
  ....66....66....
  ....666..666....
  .....666666.....
  ......6666......
  .......66.......
  .......66.......
  ......1FF1......
  .......66.......
  .......666666...
  .......66.......
  ......1FF1......
  .......666666...`],
    [lockedwalls, bitmap`
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L101L1L1L1
  L1L1L1L0L0L1L1L1
  L1L1L101L101L1L1
  L1L1L1000001L1L1
  L1L1L1002001L1L1
  L1L1L1002001L1L1
  L1L1L1002001L1L1
  L1L1L1L000L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1`],
    [unlockedwalls, bitmap`
  1L1LLLLLLLLLL1L1
  1L1L1LLLLLL1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1L1LL1L1L1L1
  1L1L1LLLLLL1L1L1
  1L1LLLLLLLLLL1L1`],
    [spike, bitmap`
................
.......11.......
......1111......
..2..111111.....
....21111111....
..21211221211...
..121112111111..
.11111111212121.
1111111122111211
1111111122112111
1111112111111111
1121111111121111
1121111112112111
1111111211121111
1111111111111211
1111211111111111`],
    [ice, bitmap`
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
    [key2, bitmap`
  ......5555......
  .....555555.....
  ....555..555....
  ....55....55....
  ....55....55....
  ....555..555....
  .....555555.....
  ......5555......
  .......55.......
  .......55.......
  ......1FF1......
  .......55.......
  .......555555...
  .......55.......
  ......1FF1......
  .......555555...`],
    [lockedwalls2, bitmap`
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L101L1L1L1
  L1L1L1L0L0L1L1L1
  L1L1L101L101L1L1
  L1L1L1000001L1L1
  L1L1L1002001L1L1
  L1L1L1002001L1L1
  L1L1L1002001L1L1
  L1L1L1L000L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1
  L1L1L1L1L1L1L1L1`],
    [swap, bitmap`
................
................
................
.....LLLLLL.....
....LLHDDHLL....
...LLHHDDHHLL...
...LHHHDDHHHL...
...L333D3333L...
...L3333D333L...
...LHHHDDHHHL...
...LLHHDDHHLL...
....LLHDDHLL....
.....LLLLLL.....
................
................
................`],
    [black, bitmap`
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
LLLLLLLLLLLLLLLL`]
  )
}

function style3() {
  [player, bitmap`
................
................
.....999999.....
....99999F39....
....999993F9....
....9999999999..
....55777755....
...5577777755...
...5770770775...
...5770770775...
...5770770775...
...5777777775...
...5577777755...
....55555555....
................
................`],
  setLegend([player, bitmap`
................
...0000000000...
..009999999900..
..09999993D990..
..0999999D399000
..09999999999990
..09999999999990
..55777777775500
.55777077077755.
.57777077077775.
.57777077077775.
.57777077077775.
.57777777777775.
.55777777777755.
..555555555555..
...5555555555...`],
    [player2, bitmap`
......HHHHHHH...
.....HHHHHH.....
....HHHHHHHH....
...HHHHHHHHHH...
...6666666666...
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..338888888833..
.33888088088833.
.38888088088883.
.38888088088883.
.38888088088883.
.38888888888883.
.33888888888833.
..333333333333..
...3333333333...`],
    [enemy, bitmap`
...5055505......
..550070055.....
..577373775.....
..577373775.....
..577373775.....
5555777775555...
5777555557775...
5777555557775...
5777555557775...
5777555557775...
5777555557775...
57775555577LLL55
57775555577L1175
55555555555LL775
....55.55...LLL5
...555.555......`],
    [enemy2, bitmap`
...H0HHH0H......
..HH00800HH.....
..H8858588H.....
..H8858588H.....
..H8858588H.....
HHHH88888HHHH...
H888HHHHH888H...
H888HHHHH888H...
H888HHHHH888H...
H888HHHHH888H...
H888HHHHH888H...
H888HHHHH88111HH
H888HHHHH881228H
HHHHHHHHHHH1188H
....HH.HH...111H
...HHH.HHH......`],
    [wall, bitmap`
LLLLLLLLLLLLLLLL
LL111111112222LL
L10111111111102L
L11111111111112L
L11111111111112L
L11111111111111L
L11111111111112L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L10111111111101L
LL111111111111LL
LLLLLLLLLLLLLLLL`],
    [background, bitmap`
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444
DDDDDDDD44444444`],
    [prize, bitmap`
................
................
......3333......
.....333333.....
.....333333.....
.....333333.....
.....333333.....
......3333......
.......55.......
......5555......
.....555555.....
.....555555.....
.....555555.....
.....555555.....
......5555......
................`],
    [prize2, bitmap`
................
................
................
................
.......55.......
......5555......
.....555555.....
.....555555.....
.....555555.....
.....555555.....
......5555......
................
................
................
................
................`],
    [prize3, bitmap`
................
................
................
................
................
......33333.....
.....3333333....
.....3333333....
.....3333333....
.....3333333....
.....3333333....
......33333.....
................
................
................
................`],
    [pushablewalls, bitmap`
CCCCCCCCCCCCCCCC
CLFFFFFFFFFFFFLC
CFCCCCCCCCCCCCFC
CFCFFCFFFFFFFCFC
CFCFLFCFFFFFFCFC
CFCCFFFCFFFFFCFC
CFCFCFFFCFFFFCFC
CFCFFCFFFCFFFCFC
CFCFFFCFFFCFFCFC
CFCFFFFCFFFCFCFC
CFCFFFFFCFFFCCFC
CFCFFFFFFCFLFCFC
CFCFFFFFFFCFFCFC
CFCCCCCCCCCCCCFC
CLFFFFFFFFFFFFLC
CCCCCCCCCCCCCCCC`],
    [key, bitmap`
................
..5555..........
.555555.........
.55..55.........
.55..55.........
.555555.........
..555555........
......555...55..
.......555.555..
........55555...
.........555....
..........555.55
...........55555
............555.
.............55.
................`],
    [lockedwalls, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL000000000000LL
LL077555555770LL
LL075500005570LL
LL055500005550LL
LL055500005550LL
LL055550055550LL
LL055550055550LL
LL055550055550LL
LL055550055550LL
LL075555555570LL
LL077555555770LL
LL000000000000LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [unlockedwalls, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL000000000000LL
LL044DDDDDD440LL
LL04DDDDDDDD40LL
LL0DDDDDDDDDD0LL
LL0DDDDD000DD0LL
LL0DD000000DD0LL
LL0DD000000DD0LL
LL0DDDDD000DD0LL
LL0DDDDDDDDDD0LL
LL04DDDDDDDD40LL
LL044DDDDDD440LL
LL000000000000LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [spike, bitmap`
.....3....3.....
....333..333....
...3393333933...
..339999999933..
.33999999999933.
3399999999999933
.33999333399933.
..39993..39993..
..39993..39993..
.33999333399933.
3399999999999933
.33999999999933.
..339999999933..
...3393333933...
....333..333....
.....3....3.....`],
    [ice, bitmap`
7777777777777777
7757777577222227
7577777777222227
7777777777777227
7777777777777227
7777777777777227
7577777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777757
7777777777777777
7777777777777777
7577777777777777
7757577775777757
7777777777777777`],
    [key2, bitmap`
................
..3333..........
.333333.........
.33..33.........
.33..33.........
.333333.........
..333333........
......333...33..
.......333.333..
........33333...
.........333....
..........333.33
...........33333
............333.
.............33.
................`],
    [lockedwalls2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL000000000000LL
LL088333333880LL
LL083333333380LL
LL033300003330LL
LL033300003330LL
LL033330033330LL
LL033330033330LL
LL033330033330LL
LL033333333330LL
LL083333333380LL
LL088333333880LL
LL000000000000LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [swap, bitmap`
................
................
................
.....000000.....
....05550000....
...0005500000...
...0050500000...
...0500000000...
...0000000030...
...0000030300...
...0000033000...
....00003330....
.....000000.....
................
................
................`],
    [background2, bitmap`
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1
  1D1D1D1D1D1D1D1D
  D1D1D1D1D1D1D1D1`],
    [black, bitmap`
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
LLLLLLLLLLLLLLLL`]
  )

}

style1()

//for (let i=0; i<style1.length; i++) {
//setLegend(
//[style[i]]
//)
//}
setBackground(background);
setSolids([player, wall, pushablewalls, lockedwalls, player2, lockedwalls2])



var level = 0
const levels = [
  map`
eeeeeeeeeee
...........
...........
...........
...........
...........
...........
...........
...........
eeeeeeeeeee`,
  map`
p.........
m.........
a.........
s.........
..........
d.........
u.........
t.........
i.........
i.........`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`,
  map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............`,
  map`
p.........
wwww......
w..w.www.w
w.ww...w.w
w......w.w
wwwwwwww.w
w........w
w.wwwwwwww
w.wwwwwwwo
w.........`,
  map`
...a......
.p.a....o.
...a......
w.ww......
w.w....www
w.w....w.w
w.wwwwww.w
w........w
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
w....w...w
w....w...w
w....w...w
w.p..u.o.w
w....w...w
waaaaw...w
w....w...w
w.d..w...w
wwwwwwwwww`,
  map`
sssssswwww
ssss....ow
ssss.sw..w
ssss.sw..w
sp.u..wwww
s.sss.sdss
s.s...s.ss
s.sssss.ss
s.......ss
ssssssssss`,
  map`
wwwwwww...
.p....w.ww
wwwww.w.wd
........w.
w.www.www.
w.w.......
..wwwwwww.
..........
..wwwwwwww
........uo`,
  map`
wwwwwwwowwwwwww
wpiiiiiiiiiii.w
wiiiiiiii.iiiiw
wi.iiiiiiii.iiw
wii.iiiiiiii.iw
wiii.iii.iiiiiw
wii.i.iiiiiiiiw
wiiiiii..iiiiiw
wiii.iiiiii.iiw
wiiii.iii.iiiiw
wiiiiiiiiiiiiiw
wiiiiiiiiiiiiiw
wi.iiiiiiiiii.w
w.iiiiiiiiii.iw
wwwwwwwwwwwwwww`,
  map`
m........wp
.........wu
.........w.
.........w.
.........w.
.........wl
.........w.
...d.....w.
cw.......w.
gwiiiiiiiwf`,
  map`
.....s..w.
.....s.lw.
..g..s..w.
.....s..w.
.....s..wf
sssscs.mu.
....ds..w.
.sssss..w.
.s...s..w.
ps...s..wh`,
  map`
s.........
s......www
s......w.f
s......w..
s.p....wq.
s....d.u..
s.m....wj.
s......w.g
s......www
s.........`,
  map`
..udfglc..
..wwwwww..
.a......a.
..........
..........
..p....m..
..........
..iiiiii..
..........
sss....sss`
]
setMap(levels[level])



function enemycollide(enemy, object) {
  return (tilesWith(enemy, object).length)
}

function enemyx1(Firstenemy, Firstplayer) {
  if ((Firstplayer.x > getFirst(Firstenemy).x) && turn > 0) {
    getFirst(Firstenemy).x += 1
    turn -= 1
    if (enemycollide(Firstenemy, wall) + enemycollide(Firstenemy, spike) + enemycollide(Firstenemy, lockedwalls) + enemycollide(Firstenemy, lockedwalls2) == 1) {
      getFirst(Firstenemy).x -= 1
      turn += 1
    }
  }
}

function enemyx2(Firstenemy, Firstplayer) {
  if ((Firstplayer.x < getFirst(Firstenemy).x) && turn > 0) {
    getFirst(Firstenemy).x -= 1
    turn -= 1
    if (enemycollide(Firstenemy, wall) + enemycollide(Firstenemy, spike) + enemycollide(Firstenemy, lockedwalls) + enemycollide(Firstenemy, lockedwalls2) == 1) {
      getFirst(Firstenemy).x += 1
      turn += 1
    }
  }
}

function enemyy1(Firstenemy, Firstplayer) {
  if ((Firstplayer.y > getFirst(Firstenemy).y) && turn > 0) {
    getFirst(Firstenemy).y += 1
    turn -= 1
    if (enemycollide(Firstenemy, wall) + enemycollide(Firstenemy, spike) + enemycollide(Firstenemy, lockedwalls) + enemycollide(Firstenemy, lockedwalls2) == 1) {
      getFirst(Firstenemy).y -= 1
      turn += 1
    }
  }
}

function enemyy2(Firstenemy, Firstplayer) {
  if ((Firstplayer.y < getFirst(Firstenemy).y) && (turn > 0)) {
    getFirst(Firstenemy).y -= 1
    turn -= 1
    if (enemycollide(Firstenemy, wall) + enemycollide(Firstenemy, spike) + enemycollide(Firstenemy, lockedwalls) + enemycollide(Firstenemy, lockedwalls2) == 1) {
      getFirst(Firstenemy).y += 1
      turn += 1
    }
  }
}

setInterval(() => {
  turn = 1
  let random = getRandomInt(2)
  let random2 = getRandomInt(2)
  if ((tilesWith(enemy).length > 0) && (random == 1)) {
    enemyx1(((enemy)), (getFirst(player)))
    enemyx2(((enemy)), (getFirst(player)))
    enemyy1(((enemy)), (getFirst(player)))
    enemyy2(((enemy)), (getFirst(player)))
  }
  if ((tilesWith(enemy).length > 0) && (random == 0)) {
    enemyy1(((enemy)), (getFirst(player)))
    enemyy2(((enemy)), (getFirst(player)))
    enemyx1(((enemy)), (getFirst(player)))
    enemyx2(((enemy)), (getFirst(player)))
  }
  turn = 1
  if ((tilesWith(enemy2).length > 0) && (random2 == 1)) {
    enemyx1(((enemy2)), (getFirst(player2)))
    enemyx2(((enemy2)), (getFirst(player2)))
    enemyy1(((enemy2)), (getFirst(player2)))
    enemyy2(((enemy2)), (getFirst(player2)))
  }
  if ((tilesWith(enemy2).length > 0) && (random2 == 0)) {
    enemyy1(((enemy2)), (getFirst(player2)))
    enemyy2(((enemy2)), (getFirst(player2)))
    enemyx1(((enemy2)), (getFirst(player2)))
    enemyx2(((enemy2)), (getFirst(player2)))
  }
  let death3 = (tilesWith(player, enemy).length) + (tilesWith(player2, enemy2).length)
  if (death3 > 0) {
    setMap(levels[level])
  }
}, 500);

setPushables({
  [player]: [pushablewalls, player, player2],
  [player2]: [pushablewalls, player2, player]
})

let texts2 = [
  ["Basic   ", blue],
  ["Dungeon ", blue],
  ["Slime   ", blue],
  ["Back", red]
]

let texts1 = [
  ["Start   ", red],
  ["Tutorial", blue],
  ["Theme    ", blue],
  ["Levels   ", blue]
]
let texts3 = [
  ["Level One    ", red],
  ["Level Two    ", blue],
  ["Level Three  ", blue],
  ["Level Four   ", blue],
  ["Level Five       ", blue],
  ["Level Six    ", blue],
  ["Level Seven  ", blue],
  ["Level Eight  ", blue],
  ["Level Nine   ", blue],
  ["Back         ", blue]
]

function scroll(text, levelex, height, xval) {
  if (level == levelex) {
    setBackground(background2)
    clearText()
    let count = 1
    for (let i = 0; i < text.length; i++) {
      let next = text[i + 1]
      if (i + 1 == text.length) {
        next = text[i - text.length + 1]
      }
      if ((count > 0) && (text[i][1] == red)) {
        next[1] = red
        text[i][1] = blue
        count -= 1
        addText(next[0], { x: xval, y: height, color: red })
      }
      addText(text[i][0], { x: xval, y: i + height, color: text[i][1] })
    }
    addText(text[0][0], { x: xval, y: height, color: text[0][1] })
  }
}

function setup(text, levelex, height, xval) {
  if (level == levelex) {
    clearText()
    for (let i = 0; i < text.length; i++) {
      setBackground(background2)
      addText(text[i][0], { x: xval, y: i + height, color: text[i][1] })
    }
  }
}
setup(texts1, 0, 5, 7)

onInput("s", () => {

  scroll(texts1, 0, 5, 7)

  scroll(texts2, 2, 5, 7)

  scroll(texts3, 3, 1, 4)
  if ((tilesWith(player).length > 0) && level > 2 && level != levels.length - 1) {
    //playTune(stepsound)
    getFirst(player).y += 1
    steps[level] -= 1
    var x = 50
    while (((tilesWith(player, ice)).length == 1) && (x > 0)) {
      getFirst(player).y += 1
      x -= 1
    }

  }
})
onInput("w", () => {

  if ((tilesWith(player).length > 0) && level > 2 && level != levels.length - 1) {
    getFirst(player).y -= 1
    steps[level] -= 1
    var x = 50
    while (((tilesWith(player, ice)).length == 1) && (x > 0)) {
      getFirst(player).y -= 1
      x -= 1
    }
  }
  if (level < 4) {
    if ((level == 0) && (texts1[0][1] == red)) {
      level += 4
      setMap(levels[level])
      clearText()
      setBackground(background)
    }
    if ((level == 2) && (texts2[0][1] == red)) {
      style1()
    }
    if ((level == 2) && (texts2[1][1] == red)) {
      style2()
    }
    if ((level == 2) && (texts2[2][1] == red)) {
      style3()
    }
    if (level == 3) {
      for (let i = 0; i < texts3.length; i++)
        if (texts3[i][1] == red) {
          level = i + 4
          setMap(levels[level])
          clearText()
          setBackground(background)
        }
    }
    if ((level == 3) && texts3[texts3.length - 1][1] == red) {
      level = 0
      setMap(levels[level])
      clearText()
      setup(texts1, 0, 5, 7)
    }
    if ((level == 0) && (texts1[3][1] == red)) {
      level += 3
      setMap(levels[level])
      clearText()
      setup(texts3, 3, 1, 4)
    }
    if ((level == 2) && texts2[texts2.length - 1][1] == red) {
      level = 0
      setMap(levels[level])
      clearText()
      scroll(texts1, 0, 5, 7)
    }
    if ((level == 0) && (texts1[2][1] == red)) {
      level += 2
      setMap(levels[level])
      clearText()
      setup(texts2, 2, 5, 7)
    }
    if ((level == 1)) {
      level = 0
      setMap(levels[level])
      clearText()
      scroll(texts1, 0, 5, 7)
    }
    if ((level == 0) && (texts1[1][1] == red)) {
      level += 1
      setMap(levels[level])
      clearText()
      addText("wasd-player", { x: 4, y: 0, color: blue })
      addText("ijkl-player2", { x: 4, y: 2, color: blue })
      addText("Pushable block", { x: 4, y: 4, color: blue })
      addText("Spikes", { x: 4, y: 5, color: blue })
      addText("Key", { x: 4, y: 8, color: blue })
      addText("Locked wall", { x: 4, y: 10, color: blue })
      addText("Unlocked wall", { x: 4, y: 12, color: blue })
      addText("Ice", { x: 4, y: 14, color: blue })
    }
  }
  if (level == levels.length - 1) {
    level = 0
    setMap(levels[level])
    clearText()
    scroll(texts1, 0, 5, 7)
  }
})
onInput("a", () => {
  if ((tilesWith(player).length > 0) && level > 2 && level != levels.length - 1) {
    getFirst(player).x -= 1
    steps[level] -= 1
    var x = 50
    while (((tilesWith(player, ice)).length == 1) && (x > 0)) {
      getFirst(player).x -= 1
      x -= 1
    }
  }
})
onInput("d", () => {
  if ((tilesWith(player).length > 0) && level > 2 && level != levels.length - 1) {
    //playTune(stepsound)
    getFirst(player).x += 1
    steps[level] -= 1
    var x = 50
    while (((tilesWith(player, ice)).length == 1) && (x > 0)) {
      getFirst(player).x += 1
      x -= 1
    }
  }
})
onInput("k", () => {
  if ((tilesWith(player2).length > 0) && level > 2 && level != levels.length - 1) {
    //playTune(stepsound)
    getFirst(player2).y += 1
    steps3[level] -= 1
    var x = 50
    while (((tilesWith(player2, ice)).length == 1) && (x > 0)) {
      getFirst(player2).y += 1
      x -= 1
    }
  }
})
onInput("i", () => {
  if ((tilesWith(player2).length > 0) && level > 2 && level != levels.length - 1) {
    //playTune(stepsound)
    getFirst(player2).y -= 1
    steps3[level] -= 1
    var x = 50
    while (((tilesWith(player2, ice)).length == 1) && (x > 0)) {
      getFirst(player2).y -= 1
      x -= 1
    }
  }
})
onInput("j", () => {
  if ((tilesWith(player2).length > 0) && level > 2 && level != levels.length - 1) {
    //playTune(stepsound)
    getFirst(player2).x -= 1
    steps3[level] -= 1
    var x = 50
    while (((tilesWith(player2, ice)).length == 1) && (x > 0)) {
      getFirst(player2).x -= 1
      x -= 1
    }
  }
})
onInput("l", () => {
  if ((tilesWith(player2).length > 0) && level > 2 && level != levels.length - 1) {
    //playTune(stepsound)
    getFirst(player2).x += 1
    steps3[level] -= 1
    var x = 50
    while (((tilesWith(player2, ice)).length == 1) && (x > 0)) {
      getFirst(player2).x += 1
      x -= 1
    }
  }
})





let steps = [-1, -1, -1, -1, -1, -1, -1, -1, 38, -1, 10, -1, -1, -1, -1]
let steps2 = [-1, -1, -1, -1, -1, -1, -1, -1, 38, -1, 10, -1, -1, -1, -1]
let steps3 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, -1, -1, -1, -1]
let steps4 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, -1, -1, -1, -1]

afterInput(() => {

  const win = (tilesWith(player, prize)).length + (tilesWith(player2, prize)).length + ((tilesWith(player, prize2)).length / 2) + ((tilesWith(player2, prize3)).length / 2)

  var unlock = (tilesWith(player, key))
  var unlock2 = (tilesWith(player2, key))
  var unlock3 = (tilesWith(player, key2))
  var unlock4 = (tilesWith(player2, key2))

  var swap1 = ((tilesWith(player, swap)).length)
  var swap2 = ((tilesWith(player2, swap)).length)

  const death = (tilesWith(player, spike).length) + (tilesWith(player2, spike).length) + (tilesWith(player, enemy).length) + (tilesWith(player2, enemy2).length)


  if ((unlock.length > 0) || (unlock2.length > 0)) {
    var lockedx = (getFirst(lockedwalls)).x
    var lockedy = (getFirst(lockedwalls)).y
    var keyx = (getFirst(key)).x
    var keyy = (getFirst(key)).y
    clearTile(lockedx, lockedy)
    addSprite(lockedx, lockedy, unlockedwalls)
    clearTile(keyx, keyy)
    if (unlock.length > 0) {
      addSprite(keyx, keyy, player)
    }
    if (unlock2.length > 0) {
      addSprite(keyx, keyy, player2)
    }
  }
  if ((unlock3.length > 0) || (unlock4.length > 0)) {
    var lockedx = (getFirst(lockedwalls2)).x
    var lockedy = (getFirst(lockedwalls2)).y
    var keyx = (getFirst(key2)).x
    var keyy = (getFirst(key2)).y
    clearTile(lockedx, lockedy)
    addSprite(lockedx, lockedy, unlockedwalls)
    clearTile(keyx, keyy)
    if (unlock3.length == 1) {
      addSprite(keyx, keyy, player)
    }
    if (unlock4.length == 1) {
      addSprite(keyx, keyy, player2)
    }
  }

  if ((steps[level] > 0) || (steps3[level] > 0)) {
    clearText()
    addText((String(steps[level])), { x: 15, y: 0, color: color`0` })
    if (getAll(player2).length == 1) {
      addText((String(steps3[level])), { x: 5, y: 0, color: color`0` })
    }
  }

  if ((steps[level] == 0) || (steps3[level] == 0)) {
    setMap(levels[level])
    steps[level] = steps2[level]
    steps3[level] = steps4[level]
    clearText()
  }

  if (win > 0.5) {
    level += 1
    if (level < levels.length) {
      setMap(levels[level])
    }
    clearText()
  }

  if ((death > 0)) {
    setMap(levels[level])
    clearText()
    steps[level] = steps2[level]
    steps3[level] = steps4[level]
  }

  if ((steps[level] == 0) || (steps3[level] == 0)) {
    setMap(levels[level])
    steps[level] = steps2[level]
    steps3[level] = steps4[level]
    clearText()
  }

  if (swap1 + swap2 == 1) {
    getFirst(player).type = "m"
    getFirst(player2).type = "p"
    var playerxy = [getFirst(player).x, getFirst(player).y]
    var player2xy = [getFirst(player2).x, getFirst(player2).y]
    if (swap2 > 0) {
      clearTile(playerxy[0], playerxy[1])
      addSprite(playerxy[0], playerxy[1], player)
    }
    if (swap1 > 0) {
      clearTile(player2xy[0], player2xy[1])
      addSprite(player2xy[0], player2xy[1], player2)
    }
  }
  if (level + 1 == levels.length) {
    addText("Return to menu: ", { x: 3, y: 5, color: color`2` })
  }
})
