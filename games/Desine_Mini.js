/*
@title: Desine Mini
@author: Guy Sandler
@tags: []
@addedOn: 2023-11-18
full, more playable, unity version: https://webeaftos.olive2.repl.co/
controls: awd, j for attack
please do not hold a button
*/
const player = "1";
const attack = "2";
const tile1 = "3";
const background1 = "4";
const background2 = "g";
const Portal = "5";
const enemy1 = "6";
const spike = "7";
const spike2 = "8";
const enemy2 = "9";
const arrow = "a";
const enemy3 = "b";
const boss1p1 = "c";
const boss1p2 = "d";
const boss1p3 = "e";
const boss1p4 = "f";
const badstar = "h";
const goodstar = "i";
const HealthBar1 = "j"
const HealthBar2 = "k"
const HealthBar3 = "l"
const HealthBar4 = "m"
const HealthBar5 = "n"
const HealthBar6 = "o"
const boss1icon = "p"
const tile2 = "q"
const tile2b = "r"
const spawner = "s"
const menu1 = "t"
const menuselect = "u"
const enemy4 = "v";

let timePlayed = 0
let deaths = 0
let playerBitMap = bitmap`
................
................
................
................
....00000000....
....00000000....
....02002000....
....02002000....
....00000000....
....00000000....
....00000000....
..0000000000.00.
..00.........00.
................
....00....00....
....00....00....`;
let attackBitMap = bitmap`
................
................
................
................
................
................
................
222.............
22222222........
...2222222222222
........22222222
................
................
................
................
................`;
let goodstarMap = bitmap`
................
................
.......00.......
......0LL0......
......0LL0......
.....0LLLL0.....
...00LL77LL00...
..0LLL7777LLL0..
..0LLL7777LLL0..
...00LL77LL00...
.....0LLLL0.....
......0LL0......
......0LL0......
.......00.......
................
................`;
let badstarMap = bitmap`
................
................
.......00.......
......0LL0......
......0LL0......
.....0LLLL0.....
...00LL33LL00...
..0LLL3333LLL0..
..0LLL3333LLL0..
...00LL33LL00...
.....0LLLL0.....
......0LL0......
......0LL0......
.......00.......
................
................`;
let boss1p1Map = bitmap`
.........0000000
.........0000000
.........000002L
.........0000022
.........000002L
.........00000L1
.........0000000
.........0000000
.........0000000
................
................
................
................
.......000......
.......000......
.......000......`;
let boss1p2Map = bitmap`
................
................
................
................
.............22.
............2...
............LL22
...........LLLL.
............LL2.
.........0000002
.........0000000
.........0000220
.........0000230
.........0000230
.........0000220
.........0000000`;
let boss1p3Map = bitmap`
0000000000.LLLL.
0000000000..LL2.
1L2L1L2L1L..2..2
L222L222L2...22.
222L222L22......
L2L1L2L1L2......
0000000000......
0000000000......
0000000000......
................
................
................
................
.........000....
.........000....
.........000....`;
let boss1p4Map = bitmap`
................
.......22.......
......2..22.....
......LL2.......
.....LLLL.2.....
......LL22......
................
................
................
0000000000......
0000000000......
0000220000......
0000230000......
0000230000...22.
0000220000..2...
0000000000..LL22`;
setLegend(
    [player, playerBitMap],
    [attack, attackBitMap],
    [tile1, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
LL000000000000LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL00LL0LL0LL00LL
LL000000000000LL
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [background1, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
    [background2, bitmap`
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
    [Portal, bitmap`
5522............
5522............
55222...........
55222...........
5522............
5522............
5522............
55222...........
55222...........
55222...........
5522............
5522............
55222...........
55222...........
55222...........
55222...........`],
    [enemy1, bitmap`
................
................
................
................
....00000000....
....00020020....
....00020020....
....00000000....
....00020200....
....00222220....
....00202020....
.00.0000000000..
.00.........00..
................
....00....00....
....00....00....`],
    [spike, bitmap`
................
................
................
................
................
................
................
................
...0........0...
..0L0......0L0..
..0L0......0L0..
..0L0......0L0..
.0L1L0....0L1L0.
.0L1L0....0L1L0.
0L111L0000L111L0
0LLLL111111LLLL0`],
    [spike2, bitmap`
...0........0...
..0L0......0L0..
..0L0......0L0..
..0L0......0L0..
.0L1L0....0L1L0.
.0L1L0....0L1L0.
0L111L0000L111L0
0LLLL111111LLLL0
LLLLLLLLLLLLLLLL
LL000000000000LL
L00L0LL00LL0L00L
L0LL0LL00LL0LL0L
L0LL0LL00LL0LL0L
L00L0LL00LL0L00L
LL000000000000LL
LLLLLLLLLLLLLLLL`],
    [enemy2, bitmap`
.......00000....
....000L2L20....
....0LLL2L20....
...0LLLLLLLL0...
..0LLLL0202L0...
..0LLLL2020L0...
..0LLLLLLLL00...
..0LLLLLLLL0....
...0LLLLLLLL0...
....0LLLLLLLL0..
....0LLLLLLLL0..
...0LLLLLLLL0...
...0LLLLLLL0....
...0LLLLLLL0....
...0LLLLLLLL0...
....00000000....`],
    [arrow, bitmap`
................
................
................
................
..........4.....
..........44....
..........4D4...
..4444444DDDD4..
..4444444DDDD4..
..........4D4...
..........44....
..........4.....
................
................
................
................`],
    [enemy3, bitmap`
................
................
................
.........L......
........LLL.....
.......LLLL.....
......LLLLL.....
...00000000000..
..000000000020..
..0000LLLL0020..
...000LLLLL000..
.......LLLL.....
........LLL.....
.........L......
................
................`],
    [enemy4, bitmap`
................
................
................
.........6......
........666.....
.......6666.....
......66666.....
...FFFFFFFFFFF..
..FFFFFFFFFF2F..
..FFFF6666FF2F..
...FFF66666FFF..
.......6666.....
........666.....
.........6......
................
................`],
    [boss1p1, boss1p1Map],
    [boss1p2, boss1p2Map],
    [boss1p3, boss1p3Map],
    [boss1p4, boss1p4Map],
    [badstar, badstarMap],
    [goodstar, goodstarMap],
    [HealthBar1, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
4DD4D44444DDDD44
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
4D44D44DD4DD4D4D
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [HealthBar2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
4DD4D44444DDDD44
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
4D44D44DD4DD4D4D
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [HealthBar3, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
4DD4D44444DDD0LL
333333333333340L
33333333333333DL
3333333333333334
333333333333333D
333333333333333D
3333333333333334
333333333333334L
3333333333333D0L
4D44D44DD4DD40LL
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [HealthBar4, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
4DD4D44444DDD0LL
000000000000040L
00000000000000DL
0000000000000004
000000000000000D
000000000000000D
0000000000000004
000000000000004L
0000000000000D0L
4D44D44DD4DD40LL
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [HealthBar5, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
LL0DDD44444D4DD4
L043333333333333
LD33333333333333
4333333333333333
D333333333333333
D333333333333333
4333333333333333
L433333333333333
L0D3333333333333
LL04DD4DD44D44D4
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [HealthBar6, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
LL0DDD44444D4DD4
L040000000000000
LD00000000000000
4000000000000000
D000000000000000
D000000000000000
4000000000000000
L400000000000000
L0D0000000000000
LL04DD4DD44D44D4
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [boss1icon, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
LL000000000000LL
LL002300002300LL
LL002300002300LL
LL002300002300LL
LL000000000000LL
LL0L1L2L1L2L10LL
LL02L222L222L0LL
LL022L222L2220LL
LL02L1L2L1L2L0LL
LL000000000000LL
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
    [tile2, bitmap`
DCCCDDDCCDCDD3CC
DCDDCCCD3CDCCDCC
C3C..........CDC
CD............CD
CD............C3
C..............D
D..............C
................
................
................
................
................
................
................
................
................`],
    [tile2b, bitmap`
DCCCDDDCCDCDD3CC
DCDDCCCD3CDCCDCC
C3C..........CDC
CD............CD
CD............C3
C..............D
D..............C
................
................
................
................
................
................
................
................
................`],
    [spawner, bitmap`
0000000000000000
00.....2.2....00
0.00...2.2..00.0
0.00....2...00.0
0...0...2..0...0
0....002C00....0
022..002300....0
0..22C33322..220
022..22333C22..0
0....003200..220
0....00C200....0
0...0..2...0...0
0.00...2....00.0
0.00..2.2...00.0
00....2.2.....00
0000000000000000`],
    [menu1, bitmap`
................
...LLLLLLLLLL...
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
...LLLLLLLLLL...
................`],
    [menuselect, bitmap`
..HHHHHHHHHHHH..
HHH..........HHH
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
HHH..........HHH
..HHHHHHHHHHHH..`],
)

function updateSpriteMap() {
    setLegend(
        [player, playerBitMap],
        [attack, attackBitMap],
        [tile1, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LLL0000000000LLL
  LL000000000000LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL00LL0LL0LL00LL
  LL000000000000LL
  LLL0000000000LLL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
        [background1, bitmap`
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111`],
        [Portal, bitmap`
5522............
5522............
55222...........
55222...........
5522............
5522............
5522............
55222...........
55222...........
55222...........
5522............
5522............
55222...........
55222...........
55222...........
55222...........`],
        [enemy1, bitmap`
  ................
  ................
  ................
  ................
  ....00000000....
  ....00020020....
  ....00020020....
  ....00000000....
  ....00020200....
  ....00222220....
  ....00202020....
  .00.0000000000..
  .00.........00..
  ................
  ....00....00....
  ....00....00....`],
        [spike, bitmap`
................
................
................
................
................
................
................
................
...0........0...
..0L0......0L0..
..0L0......0L0..
..0L0......0L0..
.0L1L0....0L1L0.
.0L1L0....0L1L0.
0L111L0000L111L0
0LLLL111111LLLL0`],
        [spike2, bitmap`
...0........0...
..0L0......0L0..
..0L0......0L0..
..0L0......0L0..
.0L1L0....0L1L0.
.0L1L0....0L1L0.
0L111L0000L111L0
0LLLL111111LLLL0
LLLLLLLLLLLLLLLL
LL000000000000LL
L00L0LL00LL0L00L
L0LL0LL00LL0LL0L
L0LL0LL00LL0LL0L
L00L0LL00LL0L00L
LL000000000000LL
LLLLLLLLLLLLLLLL`],
        [enemy2, bitmap`
.......00000....
....000L2L20....
....0LLL2L20....
...0LLLLLLLL0...
..0LLLL0202L0...
..0LLLL2020L0...
..0LLLLLLLL00...
..0LLLLLLLL0....
...0LLLLLLLL0...
....0LLLLLLLL0..
....0LLLLLLLL0..
...0LLLLLLLL0...
...0LLLLLLL0....
...0LLLLLLL0....
...0LLLLLLLL0...
....00000000....`],
        [arrow, bitmap`
................
................
................
................
..........4.....
..........44....
..........4D4...
..4444444DDDD4..
..4444444DDDD4..
..........4D4...
..........44....
..........4.....
................
................
................
................`],
        [enemy3, bitmap`
................
................
................
.........L......
........LLL.....
.......LLLL.....
......LLLLL.....
...00000000000..
..000000000020..
..0000LLLL0020..
...000LLLLL000..
.......LLLL.....
........LLL.....
.........L......
................
................`],
        [enemy4, bitmap`
................
................
................
.........6......
........666.....
.......6666.....
......66666.....
...FFFFFFFFFFF..
..FFFFFFFFFF2F..
..FFFF6666FF2F..
...FFF66666FFF..
.......6666.....
........666.....
.........6......
................
................`],
        [boss1p1, boss1p1Map],
        [boss1p2, boss1p2Map],
        [boss1p3, boss1p3Map],
        [boss1p4, boss1p4Map],
        [badstar, badstarMap],
        [goodstar, goodstarMap],
        [HealthBar1, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
4DD4D44444DDDD44
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
4D44D44DD4DD4D4D
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
        [HealthBar2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
4DD4D44444DDDD44
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
4D44D44DD4DD4D4D
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
        [HealthBar3, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LLL0000000000LLL
  4DD4D44444DDD0LL
  333333333333340L
  33333333333333DL
  3333333333333334
  333333333333333D
  333333333333333D
  3333333333333334
  333333333333334L
  3333333333333D0L
  4D44D44DD4DD40LL
  LLL0000000000LLL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
        [HealthBar4, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LLL0000000000LLL
  4DD4D44444DDD0LL
  000000000000040L
  00000000000000DL
  0000000000000004
  000000000000000D
  000000000000000D
  0000000000000004
  000000000000004L
  0000000000000D0L
  4D44D44DD4DD40LL
  LLL0000000000LLL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
        [HealthBar5, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
LL0DDD44444D4DD4
L043333333333333
LD33333333333333
4333333333333333
D333333333333333
D333333333333333
4333333333333333
L433333333333333
L0D3333333333333
LL04DD4DD44D44D4
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
        [HealthBar6, bitmap`
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LLL0000000000LLL
  LL0DDD44444D4DD4
  L040000000000000
  LD00000000000000
  4000000000000000
  D000000000000000
  D000000000000000
  4000000000000000
  L400000000000000
  L0D0000000000000
  LL04DD4DD44D44D4
  LLL0000000000LLL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL`],
        [boss1icon, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL0000000000LLL
LL000000000000LL
LL002300002300LL
LL002300002300LL
LL002300002300LL
LL000000000000LL
LL0L1L2L1L2L10LL
LL02L222L222L0LL
LL022L222L2220LL
LL02L1L2L1L2L0LL
LL000000000000LL
LLL0000000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
        [tile2, bitmap`
DCCCDDDCCDCDD3CC
DCDDCCCD3CDCCDCC
C3C..........CDC
CD............CD
CD............C3
C..............D
D..............C
................
................
................
................
................
................
................
................
................`],
        [tile2b, bitmap`
DCCCDDDCCDCDD3CC
DCDDCCCD3CDCCDCC
C3C..........CDC
CD............CD
CD............C3
C..............D
D..............C
................
................
................
................
................
................
................
................
................`],
        [spawner, bitmap`
0000000000000000
00.....2.2....00
0.00...2.2..00.0
0.00....2...00.0
0...0...2..0...0
0....002C00....0
022..002300....0
0..22C33322..220
022..22333C22..0
0....003200..220
0....00C200....0
0...0..2...0...0
0.00...2....00.0
0.00..2.2...00.0
00....2.2.....00
0000000000000000`],
        [menu1, bitmap`
  ................
  ...LLLLLLLLLL...
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  .LLLLLLLLLLLLLL.
  ...LLLLLLLLLL...
  ................`],
        [menuselect, bitmap`
..HHHHHHHHHHHH..
HHH..........HHH
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
H..............H
HHH..........HHH
..HHHHHHHHHHHH..`],
    )
}
let Solidplat = false
let Solidplat2 = false

function SolidUpdate() {
    if (!Solidplat && !Solidplat2) {
        setSolids([player, tile1])
    } else if (Solidplat && Solidplat2) {
        setSolids([player, tile1, tile2, tile2b])
    } else if (Solidplat && !Solidplat2) {
        setSolids([player, tile1, tile2])
    } else if (!Solidplat && Solidplat2) {
        setSolids([player, tile1, tile2b])
    }
}
let level = 0;
const levels = [
    map`
.....
.ttt.
.....`,
    map`
3333333333333333
3.............13
3..............3
3............333
3..............3
3777...........3
3333.......b...3
5..3........b..3
5..6.6.6.......3
3333333338833333`,
    map`
3333333333333333
3..............3
3.............13
3............333
3..............3
3777...........3
3333...........3
5..3...........3
5..9..9..77....3
3333333333333333`,
    map`
3333333333333333
5..............3
5..............3
3333333333333.q3
3............r.3
3.............r3
3.r3338333333833
3q.............3
3.q............3
3333383333833r.3
3.............q3
3............q.3
3.q3833333333333
3q..........1.v3
3333333338333333`,
    map`
333333
5....3
5....3
3....3
3q...3
3.q..3
3r...3
3.r..3
3q..13
333333`,
    map`
3333333333333333
3333333333333333
5.....3333333333
3333r.3333333333
3333.q3333333333
39..q.........13
3388333333333333`,
    map`
3333333333333333
5..............3
5..............3
3..q..q..r.....3
3..........q...3
3........q.....3
3......q.......3
3........r.....3
3..........r..13
3qqqqqqqqqqq3333
39.....9....3333
3333333333333333`,
    map`
3333333333333333
3b......b......3
3..............3
3..............3
3..............3
3.b............3
3..............3
5..............3
5.76.76.......13
3333333388333333`,
    map`
333333333333333333
3...............13
3................3
3qqqqqqqqqqqqqqqq3
3................3
3................3
3................3
3................3
3................3
3.9..9......9..9.3
33333333s333333333`,
    map`
3333333333333333333
3s.......9.......s3
3........r........3
3........v........3
3.................3
3.................3
3.................3
3.................3
3..r.rr.....rr.r..3
3..qqqqq.1.qqqqq..3
3333333333333333333`,
    map`
pnjjjjjjjjjjjjjl
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3.............13
3333333333333333`,
    map`
.`,
];

setBackground(background1);
setMap(levels[level])
setSolids([player, tile1])
let boss1interval = null
// gravity and ticks
function Gravity() {
  if (level != 0){
    getFirst(player).y += 1;
  }
}
// ticks
// function fullTick() {

// }
let isBossFight = false

function halfTick() {
  if (level != 0){
    if (BadStarInterval == 1) {
        badstarMap = bitmap`
................
................
...00......00...
..0LL00..00LL0..
..0LLLL00LLLL0..
...0LLLLLLLL0...
...0LLL33LLL0...
....0L3333L0....
....0L3333L0....
...0LLL33LLL0...
...0LLLLLLLL0...
..0LLLL00LLLL0..
..0LL00..00LL0..
...00......00...
................
................`
        updateSpriteMap()
        BadStarInterval -= 1
    } else if (BadStarInterval == 0) {
        badstarMap = bitmap`
................
................
.......00.......
......0LL0......
......0LL0......
.....0LLLL0.....
...00LL33LL00...
..0LLL3333LLL0..
..0LLL3333LLL0..
...00LL33LL00...
.....0LLLL0.....
......0LL0......
......0LL0......
.......00.......
................
................`
        updateSpriteMap()
        BadStarInterval += 1
    }

    if (tilesWith(boss1p1).length > 0 && !isBossFight) {
        isBossFight = true
        boss1interval = setInterval(Boss1, 2000)
    }

    let under = getTile(getFirst(player).x, getFirst(player).y + 1);
    if (under.filter((x) => x.type === tile1).length > 0) {
        jumps = 1
    } else if (under.filter((x) => x.type === tile2).length > 0) {
        jumps = 1
    } else if (under.filter((x) => x.type === tile2b).length > 0) {
        jumps = 1
    } else {
        jumps = 0
    }

    if (tilesWith(enemy3, tile1).length > 0) {
        for (a of getAll(enemy3)) {
            let blockCheck = getTile(a.x, a.y);
            if (blockCheck.filter((x) => x.type === tile1).length > 0) {
                clearTile(a.x, a.y);
                addSprite(a.x, a.y, tile1)
            }
        }
    }
    if (tilesWith(badstar, tile1).length > 0) {
        for (a of getAll(badstar)) {
            let blockCheck = getTile(a.x, a.y);
            if (blockCheck.filter((x) => x.type === tile1).length > 0) {
                clearTile(a.x, a.y);
                addSprite(a.x, a.y, tile1)
            }
        }
    }
    if (tilesWith(arrow, tile1).length > 0) {
        for (a of getAll(arrow)) {
            let blockCheck = getTile(a.x, a.y);
            if (blockCheck.filter((x) => x.type === tile1).length > 0) {
                clearTile(a.x, a.y);
                addSprite(a.x, a.y, tile1)
            }
        }
    }
    if (getAll(arrow).length == 0) {
        arrowF()
    }
    timePlayed += .5
  }
}
let a;
let BadStarInterval = 1

function smallTick() {
  if (level != 0){
    let platCheck = getTile(getFirst(player).x, getFirst(player).y + 1);
    if (platCheck.filter((x) => x.type === tile2).length > 0) {
        Solidplat = true;
        SolidUpdate()
    } else {
        Solidplat = false;
        SolidUpdate()
    }

    if(getAll(player).length < 1 && level == levels.length - 2) {addSprite(2,height()-2,player)}
    if (getAll(boss1p1).length < 1 && level == levels.length - 2) {addSprite(0,height()-2,Portal);addSprite(0,height()-3,Portal);clearInterval(boss1interval);}
  
    let platCheck2 = getTile(getFirst(player).x, getFirst(player).y + 1);
    if (platCheck2.filter((x) => x.type === tile2b).length > 0) {
        Solidplat2 = true;
        SolidUpdate()
    } else {
        Solidplat2 = false;
        SolidUpdate()
    }

    if (tilesWith(enemy1).length > 0) {
        for (a of getAll(enemy1)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(spike).length > 0) {
        for (a of getAll(spike)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(spike2).length > 0) {
        for (a of getAll(spike2)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(enemy2).length > 0) {
        for (a of getAll(enemy2)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(enemy3).length > 0) {
        for (a of getAll(enemy3)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(enemy4).length > 0) {
        for (a of getAll(enemy4)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(arrow).length > 0) {
        for (a of getAll(arrow)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(boss1p1).length > 0) {
        for (a of getAll(boss1p1)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(boss1p2).length > 0) {
        for (a of getAll(boss1p2)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(boss1p3).length > 0) {
        for (a of getAll(boss1p3)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(boss1p4).length > 0) {
        for (a of getAll(boss1p4)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
    if (tilesWith(badstar).length > 0) {
        for (a of getAll(badstar)) {
            if (a.x == getFirst(player).x && a.y == getFirst(player).y) {
                if (!hardmode){reloadLevel()}
                else if (hardmode){setMap(levels[1]);level=1}
                deaths += 1
            }
        }
    }
  }
}
let Boss1Hp = 1

function nextLevel() {
    level += 1;
    clearInterval(timer)
    clearText()
    if (level + 1 == levels.length) {
        clearInterval(gravityInterval)
        clearInterval(halfTickInterval)
        clearInterval(smallTickInterval)
        clearText()
        addText("The End", {
            x: 1,
            y: 0,
            color: color`7`
        })
        addText("Want Full Game?", {
            x: 1,
            y: 3,
            color: color`2`
        })
        addText("Link In Code", {
            x: 1,
            y: 4,
            color: color`7`
        })
        addText("Adapted To Sprig", {
            x: 1,
            y: 6,
            color: color`2`
        })
        addText("By Guy", {
            x: 1,
            y: 7,
            color: color`7`
        })
        if (timePlayed < 60) {
            addText("Time " + timePlayed.toString() + " Sec", {
                x: 1,
                y: 9,
                color: color`2`
            })
        }
        if (timePlayed >= 60) {
            addText("Time " + Math.round((timePlayed / 60).toString()) + ":" + (timePlayed % 60).toString() + " Min", {
                x: 1,
                y: 9,
                color: color`2`
            })
        }
        addText("Deaths " + deaths.toString(), {
            x: 1,
            y: 10,
            color: color`7`
        })
        setBackground(background2);
    }
    setMap(levels[level]);
    if (level == levels.length - 2) {
        clearInterval(bossdash)
        clearInterval(SpawnStar)
        Boss1Hp = 45
        addSprite(1, height() - 2, boss1p1)
        addSprite(1, height() - 3, boss1p2)
        addSprite(2, height() - 2, boss1p3)
        addSprite(2, height() - 3, boss1p4)
    }
    if (level == levels.length - 5) {
        Spawner(2000,3000,width()/2,height(),enemy3,99)
    }
    if (level == levels.length - 4) {
        clockDoor(15, 0, 2)
    }
    if (level == levels.length - 3) {
        Spawner(2000,3000,1,1,enemy3,99)
        Spawner(2000,3000,width()-1,1,enemy3,99)
        clockDoor(15, 0, height()-2)
    }
    if (level == levels.length-2) {
        setMap(levels[levels.length-1])
      clearInterval(gravityInterval)
        clearInterval(halfTickInterval)
        clearInterval(smallTickInterval)
        clearText()
        addText("The End", {
            x: 1,
            y: 0,
            color: color`7`
        })
        addText("Want Full Game?", {
            x: 1,
            y: 3,
            color: color`2`
        })
        addText("Link In Code", {
            x: 1,
            y: 4,
            color: color`7`
        })
        addText("Adapted To Sprig", {
            x: 1,
            y: 6,
            color: color`2`
        })
        addText("By Guy", {
            x: 1,
            y: 7,
            color: color`7`
        })
        if (timePlayed < 60) {
            addText("Time " + timePlayed.toString() + " Sec", {
                x: 1,
                y: 9,
                color: color`2`
            })
        }
        if (timePlayed >= 60) {
            addText("Time " + Math.round((timePlayed / 60).toString()) + ":" + (timePlayed % 60).toString() + " Min", {
                x: 1,
                y: 9,
                color: color`2`
            })
        }
        addText("Deaths " + deaths.toString(), {
            x: 1,
            y: 10,
            color: color`7`
        })
        setBackground(background2);
    }
}

function reloadLevel() {
    isBossFight = false
    setMap(levels[level]);
    if (level == levels.length - 2) {
        boss1interval = null
        Boss1Hp = 45
        addSprite(1, height() - 2, boss1p1)
        addSprite(1, height() - 3, boss1p2)
        addSprite(2, height() - 2, boss1p3)
        addSprite(2, height() - 3, boss1p4)
        boss1p1Map = bitmap`
.........0000000
.........0000000
.........000002L
.........0000022
.........000002L
.........00000L1
.........0000000
.........0000000
.........0000000
................
................
................
................
.......000......
.......000......
.......000......`;
        boss1p2Map = bitmap`
    ................
    ................
    ................
    ................
    .............22.
    ............2...
    ............LL22
    ...........LLLL.
    ............LL2.
    .........0000002
    .........0000000
    .........0000220
    .........0000230
    .........0000230
    .........0000220
    .........0000000`;
        boss1p3Map = bitmap`
    0000000000.LLLL.
    0000000000..LL2.
    1L2L1L2L1L..2..2
    L222L222L2...22.
    222L222L22......
    L2L1L2L1L2......
    0000000000......
    0000000000......
    0000000000......
    ................
    ................
    ................
    ................
    .........000....
    .........000....
    .........000....`;
        boss1p4Map = bitmap`
            ................
            .......22.......
            ......2..22.....
            ......LL2.......
            .....LLLL.2.....
            ......LL22......
            ................
            ................
            ................
            0000000000......
            0000000000......
            0000220000......
            0000230000......
            0000230000...22.
            0000220000..2...
            0000000000..LL22`;
        clearInterval(bossdash)
        clearInterval(SpawnStar)
        clearInterval(MoveStar)
        clearInterval(boss1interval)
        boss1interval = setInterval(Boss1, 2000)
    }
    if (level == levels.length - 4) {
        clockDoor(15, 0, 2)
    }
}
function fireArrow() {
    if (tilesWith(enemy2).length > 0) {
        for (a of getAll(enemy2)) {
            let selfX = a.x
            let selfY = a.y
            addSprite(selfX, selfY, arrow)
        }
    }
}
let timer

function clockDoor(time, x, y) {
    // let doorCounter = 0
    clearInterval(timer)
    timer = setInterval(function() {
        time -= 1
        clearText()
        addText(time + "", {
            x: x,
            y: y,
            color: color`3`
        })
        if (time == 0) {
            clearInterval(timer);
            clearText();
            clearTile(x, y);
            clearTile(x, y - 1);
            addSprite(x, y, Portal);
            addSprite(x, y - 1, Portal)
        }
    }, 1000)
}
function Spawner(delay, delayrate, x, y, sprite, repeat){
  for (let i = 0; i < repeat+1; i++) {
    setTimeout(function(){addSprite(x, y, sprite)}, delay + (delayrate*i))
  }
}
let playerX = 0
let playerY = 0
let ArrowInterval = null

function arrowMove(playerX, playerY) {
    if (tilesWith(arrow).length > 0) {
        for (a of getAll(arrow)) {
            let selfX = a.x
            let selfY = a.y
            if (selfX > playerX) {
                a.x -= 1
            } else if (selfX < playerX) {
                a.x += 1
            }

            if (selfY > playerY) {
                a.y -= 1
            } else if (selfY < playerY) {
                a.y += 1
            }

            if (selfX == playerX && selfY == playerY) {
                let arrowFix = getTile(selfX, selfY);
                clearTile(selfX, selfY)
                if (arrowFix.filter((x) => x.type === tile2).length > 0) {
                    // clearTile(a.x, a.y);
                    addSprite(selfX, selfY, tile2)
                }
                else if (arrowFix.filter((x) => x.type === tile2b).length > 0) {
                    // clearTile(a.x, a.y);
                    addSprite(selfX, selfY, tile2b)
                }
            }
        }
    }
}

function arrowF() {
    fireArrow()
    // get value
    playerX = getFirst(player).x
    playerY = getFirst(player).y
}

function enemy3Move() {
    if (tilesWith(enemy3).length > 0) {
        for (a of getAll(enemy3)) {
            let playerX = getFirst(player).x
            let playerY = getFirst(player).y
            let selfX = a.x
            let selfY = a.y
            if (selfX > playerX) {
                a.x -= 1
            } else if (selfX < playerX) {
                a.x += 1
            }

            if (selfY > playerY) {
                a.y -= 1
            } else if (selfY < playerY) {
                a.y += 1
            }
        }
    }
}
function enemy4Move() {
    if (tilesWith(enemy4).length > 0) {
        for (a of getAll(enemy4)) {
            let playerX = getFirst(player).x
            let playerY = getFirst(player).y
            let selfX = a.x
            let selfY = a.y
            if (selfX > playerX) {
                a.x -= 1
            } else if (selfX < playerX) {
                a.x += 1
            }

            if (selfY > playerY) {
                a.y -= 1
            } else if (selfY < playerY) {
                a.y += 1
            }
        }
    }
}
let bossdash = null
let SpawnStar = null
let MoveStar = null
let SPattack = 0
let Boss1attack = 0
let canAttack = true

function Boss1() {
    // random
    Boss1attack = Math.floor(Math.random() * 51);
    // 0 dash
    if (Boss1attack > 25 && canAttack) {
       // console.log("dash")
        canAttack = false
        if (getFirst(boss1p1).x == 1) {
            let plat1x = Math.floor(Math.random() * 3);
            let plat2x = Math.floor(Math.random() * 3);
            let savex = width() / 2 + plat1x
            let savex2 = width() / 2 + plat2x
            addSprite(savex, height() - 2, tile2)
            addSprite(savex2, height() - 3, tile2b)
            let playersave = false
            let playersave2 = false
            setTimeout(function() {
                bossdash = setInterval(function() {
                    getFirst(boss1p1).x += 1
                    getFirst(boss1p2).x += 1
                    getFirst(boss1p3).x += 1
                    getFirst(boss1p4).x += 1
                    if (getFirst(boss1p1).x >= width() - 3) {
                        clearInterval(bossdash)
                        canAttack = true
                        boss1p1Map = bitmap`
    .LLLL.0000000000
    .2LL..0000000000
    2..2..L1L2L1L2L1
    .22...2L222L222L
    ......22L222L222
    ......2L1L2L1L2L
    ......0000000000
    ......0000000000
    ......0000000000
    ................
    ................
    ................
    ................
    ....000.........
    ....000.........
    ....000.........`;
                        boss1p2Map = bitmap`
    ................
    .......22.......
    .....22..2......
    .......2LL......
    .....2.LLLL.....
    ......22LL......
    ................
    ................
    ................
    ......0000000000
    ......0000000000
    ......0000220000
    ......0000320000
    .22...0000320000
    ...2..0000220000
    22LL..0000000000`;
                        boss1p3Map = bitmap`
    0000000.........
    0000000.........
    L200000.........
    2200000.........
    L200000.........
    1L00000.........
    0000000.........
    0000000.........
    0000000.........
    ................
    ................
    ................
    ................
    ......000.......
    ......000.......
    ......000.......`;
                        boss1p4Map = bitmap`
    ................
    ................
    ................
    ................
    .22.............
    ...2............
    22LL............
    .LLLL...........
    .2LL............
    2000000.........
    0000000.........
    0220000.........
    0320000.........
    0320000.........
    0220000.........
    0000000.........`;
                        if (tilesWith(player, tile2).length != 0) {
                            playersave = true
                        }
                        if (tilesWith(player, tile2b).length != 0) {
                            playersave2 = true
                        }
                        clearTile(savex, height() - 2)
                        clearTile(savex2, height() - 3)
                        if (playersave) {
                            addSprite(savex, height() - 2, player)
                        }
                        if (playersave2) {
                            addSprite(savex2, height() - 3, player)
                        }
                    }
                }, 300)
            }, 400);
        } 
        if (getFirst(boss1p1).x == width() - 3) {
            let plat1x = Math.floor(Math.random() * 3);
            let plat2x = Math.floor(Math.random() * 3);
            let savex = width() / 2 + plat1x
            let savex2 = width() / 2 + plat2x
            addSprite(savex, height() - 2, tile2)
            addSprite(savex2, height() - 3, tile2b)
            let playersave = false
            let playersave2 = false
            setTimeout(function() {
                bossdash = setInterval(function() {
                    getFirst(boss1p1).x -= 1
                    getFirst(boss1p2).x -= 1
                    getFirst(boss1p3).x -= 1
                    getFirst(boss1p4).x -= 1
                    if (getFirst(boss1p1).x <= 1) {
                        canAttack = true
                        clearInterval(bossdash)
                        boss1p1Map = bitmap`
    .........0000000
    .........0000000
    .........000002L
    .........0000022
    .........000002L
    .........00000L1
    .........0000000
    .........0000000
    .........0000000
    ................
    ................
    ................
    ................
    .......000......
    .......000......
    .......000......`;
                        boss1p2Map = bitmap`
                ................
                ................
                ................
                ................
                .............22.
                ............2...
                ............LL22
                ...........LLLL.
                ............LL2.
                .........0000002
                .........0000000
                .........0000220
                .........0000230
                .........0000230
                .........0000220
                .........0000000`;
                        boss1p3Map = bitmap`
                0000000000.LLLL.
                0000000000..LL2.
                1L2L1L2L1L..2..2
                L222L222L2...22.
                222L222L22......
                L2L1L2L1L2......
                0000000000......
                0000000000......
                0000000000......
                ................
                ................
                ................
                ................
                .........000....
                .........000....
                .........000....`;
                        boss1p4Map = bitmap`
                ................
                .......22.......
                ......2..22.....
                ......LL2.......
                .....LLLL.2.....
                ......LL22......
                ................
                ................
                ................
                0000000000......
                0000000000......
                0000220000......
                0000230000......
                0000230000...22.
                0000220000..2...
                0000000000..LL22`;
                        if (tilesWith(player, tile2).length != 0) {
                            playersave = true
                        }
                        if (tilesWith(player, tile2b).length != 0) {
                            playersave2 = true
                        }
                        clearTile(savex, height() - 2)
                        clearTile(savex2, height() - 3)
                        if (playersave) {
                            addSprite(savex, height() - 2, player)
                        }
                        if (playersave2) {
                            addSprite(savex2, height() - 3, player)
                        }
                    }
                }, 300)
            }, 400)
        }
    }  
    // 1 stars
    if (Boss1attack < 25 && canAttack) {
        // console.log("stars")
        canAttack = false
        if (getFirst(boss1p1).x == 1) {
            let interval = 0
            let SpawnStar = setInterval(function() {
                let randint = Math.floor(Math.random() * 1)
                if (randint == 0 && interval < 3) {
                    addSprite(getFirst(boss1p3).x + 1, getFirst(boss1p3).y, badstar)
                } else if (randint == 1 && interval < 3) {
                    addSprite(getFirst(boss1p3).x + 1, getFirst(boss1p3).y - 1, badstar)
                }
                interval += 1
            }, 2000);
            let MoveStar = setInterval(function() {
                for (a of getAll(badstar)) {
                    a.x += 1
                }
            }, 500);
            let StopStar = setInterval(function() {
                if (getAll(badstar).length == 0) {
                    canAttack = true;
                    clearInterval(MoveStar)
                }
            }, 2250)
            if (interval >= 3) {
                clearInterval(ThrowStar)
            }
        } 
        else if (getFirst(boss1p1).x == width() - 3) {
            let interval = 0
            let SpawnStar = setInterval(function() {
                let randint = Math.floor(Math.random() * 2)
                if (randint == 0 && interval < 3) {
                    addSprite(getFirst(boss1p3).x - 1, getFirst(boss1p3).y, badstar)
                } else if (randint == 1 && interval < 3) {
                    addSprite(getFirst(boss1p3).x - 1, getFirst(boss1p3).y - 1, badstar)
                }
                interval += 1
            }, 2000);
            let MoveStar = setInterval(function() {
                for (a of getAll(badstar)) {
                    a.x -= 1
                }
            }, 500);
            let StopStar = setInterval(function() {
                if (getAll(badstar).length == 0) {
                    canAttack = true;
                    clearInterval(MoveStar)
                }
            }, 2250)
            if (interval >= 3) {
                clearInterval(ThrowStar)
            }
        }
    }
    else if (canAttack) {console.log("non???")}
}

function arrowIntervalMask() {
    arrowMove(playerX, playerY)
}
let gravityInterval = null
let halfTickInterval = null
let smallTickInterval = null
let arrowInterval = null
let enemy3Interval = null
let enemy4Interval = null
let attacktime1 = 250
let attacktime2 = 500
let attacktime3 = 1000
gravityInterval = setInterval(Gravity, 500)
halfTickInterval = setInterval(halfTick, 500)
smallTickInterval = setInterval(smallTick, 100)
arrowInterval = setInterval(arrowIntervalMask, attacktime1)
enemy3Interval = setInterval(enemy3Move, attacktime2)
enemy4Interval = setInterval(enemy4Move, attacktime3)

// menu
let pos = 0
addSprite(1,1,menuselect)
function pasteMenuText() {
  addText("Desine Mini", { 
    x: 5,
    y: 2,
    color: color`2`
  })
  addText("Play", { 
    x: 4,
    y: 7,
    color: color`4`
  })
  addText("Boss", { 
    x: 8,
    y: 7,
    color: color`3`
  })
  addText("Hard", { 
    x: 12,
    y: 7,
    color: color`9`
  })
  addText("wasd=move", { 
    x: 6,
    y: 3,
    color: color`H`
  })
  addText("j=attack/select", { 
    x: 3,
    y: 4,
    color: color`H`
  })
}
pasteMenuText()
let hardmode = false
// input
let facingLeft = true;
onInput("d", () => {
  if (level != 0){
    if (!facingLeft) {
        getFirst(player).x += 1;
    }
    facingLeft = false;
    playerBitMap = bitmap`
................
................
................
................
....00000000....
....00000000....
....00020020....
....00020020....
....00000000....
....00000000....
....00000000....
.00.0000000000..
.00.........00..
................
....00....00....
....00....00....`;
    attackBitMap = bitmap`
................
................
................
................
................
................
................
.............222
........22222222
2222222222222...
22222222........
................
................
................
................
................`;
  }
  else{
    if (pos==2){pos=0;getFirst(menuselect).x=1}
    else{pos+=1;getFirst(menuselect).x+=1}
  }
})
let jumps = 0;
onInput("w", () => {
  if (level != 0){
    if (jumps >= 1) {
        getFirst(player).y -= 1;
        jumps -= 1
    };
    clearInterval(gravityInterval)
    gravityInterval = setInterval(Gravity, 500)
  }
})
onInput("a", () => {
  if (level != 0){
    if (facingLeft) {
        getFirst(player).x -= 1;
    }
    facingLeft = true;
    playerBitMap = bitmap`
................
................
................
................
....00000000....
....00000000....
....02002000....
....02002000....
....00000000....
....00000000....
....00000000....
..0000000000.00.
..00.........00.
................
....00....00....
....00....00....`;
    attackBitMap = bitmap`
................
................
................
................
................
................
................
222.............
22222222........
...2222222222222
........22222222
................
................
................
................
................`;
  }
  else{
    if (pos==0){pos=2;getFirst(menuselect).x=3}
    else{pos-=1;getFirst(menuselect).x-=1}
  }
})

// attacks
function clearAttack() {
    try {
        getFirst(attack).remove()
    } catch (TypeError) {}
}
let interval1 = null;
let interval2 = null;
onInput("j", () => {
  if (level != 0){
      if (facingLeft) {
          addSprite(getFirst(player).x - 1, getFirst(player).y, attack)
          interval1 = setInterval(clearAttack, 200);
          let enemyLocation = getTile(getFirst(player).x - 1, getFirst(player).y);
          if (enemyLocation.filter((x) => x.type === enemy1).length > 0) {
              clearTile(getFirst(player).x - 1, getFirst(player).y)
          } else if (enemyLocation.filter((x) => x.type === enemy2).length > 0) {
              clearTile(getFirst(player).x - 1, getFirst(player).y)
          } else if (enemyLocation.filter((x) => x.type === enemy3).length > 0) {
              clearTile(getFirst(player).x - 1, getFirst(player).y)
          } else if (enemyLocation.filter((x) => x.type === arrow).length > 0) {
              // work
            let arrowFix = getTile(a.x, a.y);
            clearTile(getFirst(player).x - 1, getFirst(player).y)
            if (arrowFix.filter((x) => x.type === tile2).length > 0) {
                // clearTile(a.x, a.y);
                addSprite(a.x, a.y, tile2)
            }
            else if (arrowFix.filter((x) => x.type === tile2b).length > 0) {
                // clearTile(a.x, a.y);
                addSprite(a.x, a.y, tile2b)
            }
          } else if (enemyLocation.filter((x) => x.type === boss1p1).length > 0) {
              Boss1Hp -= 1
          } else if (enemyLocation.filter((x) => x.type === boss1p2).length > 0) {
              Boss1Hp -= 1
          } else if (enemyLocation.filter((x) => x.type === boss1p3).length > 0) {
              Boss1Hp -= 1
          } else if (enemyLocation.filter((x) => x.type === boss1p4).length > 0) {
              Boss1Hp -= 1
          }
      }
      if (!facingLeft) {
          addSprite(getFirst(player).x + 1, getFirst(player).y, attack)
          interval1 = setInterval(clearAttack, 200);
          let enemyLocation = getTile(getFirst(player).x + 1, getFirst(player).y);
          if (enemyLocation.filter((x) => x.type === enemy1).length > 0) {
              clearTile(getFirst(player).x + 1, getFirst(player).y)
          } else if (enemyLocation.filter((x) => x.type === enemy2).length > 0) {
              clearTile(getFirst(player).x + 1, getFirst(player).y)
          } else if (enemyLocation.filter((x) => x.type === enemy3).length > 0) {
              clearTile(getFirst(player).x + 1, getFirst(player).y)
            // work
          } else if (enemyLocation.filter((x) => x.type === arrow).length > 0) {
              let arrowFix = getTile(a.x, a.y);
              clearTile(getFirst(player).x + 1, getFirst(player).y)
              if (arrowFix.filter((x) => x.type === tile2).length > 0) {
                  // clearTile(a.x, a.y);
                  addSprite(a.x, a.y, tile2)
              }
              else if (arrowFix.filter((x) => x.type === tile2b).length > 0) {
                  // clearTile(a.x, a.y);
                  addSprite(a.x, a.y, tile2b)
              }
          } else if (enemyLocation.filter((x) => x.type === boss1p1).length > 0) {
              Boss1Hp -= 1
          } else if (enemyLocation.filter((x) => x.type === boss1p2).length > 0) {
              Boss1Hp -= 1
          } else if (enemyLocation.filter((x) => x.type === boss1p3).length > 0) {
              Boss1Hp -= 1
          } else if (enemyLocation.filter((x) => x.type === boss1p4).length > 0) {
              Boss1Hp -= 1
          }
      }
  }
  else{
    if (pos==0)
    {
      nextLevel()
    }
    else if (pos==1)
    {
      clearText()
      setMap(levels[levels.length-2])
      level = levels.length-2
      clearInterval(bossdash)
      clearInterval(SpawnStar)
      Boss1Hp = 45
      addSprite(1, height() - 2, boss1p1)
      addSprite(1, height() - 3, boss1p2)
      addSprite(2, height() - 2, boss1p3)
      addSprite(2, height() - 3, boss1p4)
    }
    else if (pos==2)
    {
      hardmode = true
      attacktime1 = 50
      attacktime2 = 100
      attacktime3 = 500
      nextLevel()
    }
  }
})
onInput("l", () => {
    nextLevel()
})
onInput("k", () => {
    SPattack = 0
    Boss1()
})
onInput("i", () => {
    SPattack = 1
    Boss1()
})
// afterinput
addText("Main game", {x: 6,y: 11,color: color`2`})
afterInput(() => {
    if (level == 0)
    {
      clearText()
      pasteMenuText()
      if (pos==0){addText("Main game", {x: 6,y: 11,color: color`2`})}
      else if (pos==1){addText("Beta Boss", {x: 6,y: 11,color: color`2`});addText("Warning: Buggy", {x: 3,y: 12,color: color`3`})}
      else if (pos==2){addText("fast attacks,", {x: 4,y: 11,color: color`2`});addText("death = restart", {x: 3,y: 12,color: color`2`})}
    }
    updateSpriteMap()
    if (tilesWith(Portal, player).length > 0) {
        nextLevel()
    }
    if (level == levels.length - 2) {
        if (Boss1Hp == 42) {
            clearTile(width() - 1, 0);
            addSprite(width() - 1, 0, HealthBar4)
        }
        if (Boss1Hp == 39) {
            clearTile(width() - 2, 0);
            addSprite(width() - 2, 0, HealthBar2)
        }
        if (Boss1Hp == 36) {
            clearTile(width() - 3, 0);
            addSprite(width() - 3, 0, HealthBar2)
        }
        if (Boss1Hp == 33) {
            clearTile(width() - 4, 0);
            addSprite(width() - 4, 0, HealthBar2)
        }
        if (Boss1Hp == 30) {
            clearTile(width() - 5, 0);
            addSprite(width() - 5, 0, HealthBar2)
        }
        if (Boss1Hp == 27) {
            clearTile(width() - 6, 0);
            addSprite(width() - 6, 0, HealthBar2)
        }
        if (Boss1Hp == 24) {
            clearTile(width() - 7, 0);
            addSprite(width() - 7, 0, HealthBar2)
        }
        if (Boss1Hp == 21) {
            clearTile(width() - 8, 0);
            addSprite(width() - 8, 0, HealthBar2)
        }
        if (Boss1Hp == 18) {
            clearTile(width() - 9, 0);
            addSprite(width() - 9, 0, HealthBar2)
        }
        if (Boss1Hp == 15) {
            clearTile(width() - 10, 0);
            addSprite(width() - 10, 0, HealthBar2)
        }
        if (Boss1Hp == 12) {
            clearTile(width() - 11, 0);
            addSprite(width() - 11, 0, HealthBar2)
        }
        if (Boss1Hp == 9) {
            clearTile(width() - 12, 0);
            addSprite(width() - 12, 0, HealthBar2)
        }
        if (Boss1Hp == 6) {
            clearTile(width() - 13, 0);
            addSprite(width() - 13, 0, HealthBar2)
        }
        if (Boss1Hp == 3) {
            clearTile(width() - 14, 0);
            addSprite(width() - 14, 0, HealthBar2)
        }
        if (Boss1Hp == 0) {
            clearTile(width() - 15, 0);
            addSprite(width() - 15, 0, HealthBar6)
        }
        // if (Boss1Hp==0){clearTile(width()-16,0);addSprite(width()-16,0,HealthBar6)}

        if (Boss1Hp == 0 && tilesWith(boss1p1).length > 0) {
            clearTile(getFirst(boss1p1).x, getFirst(boss1p1).y)
            clearTile(getFirst(boss1p2).x, getFirst(boss1p2).y)
            clearTile(getFirst(boss1p3).x, getFirst(boss1p3).y)
            clearTile(getFirst(boss1p4).x, getFirst(boss1p4).y)
            clearTile(0, height() - 2)
            clearTile(0, height() - 3)
            addSprite(0, height() - 2, Portal)
            addSprite(0, height() - 3, Portal)
        }
    }
})
