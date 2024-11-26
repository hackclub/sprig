/*
@title: Goblin_Gobbler
@author: Tyler P Evans
@tags: []
@addedOn: 2024-03-11
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
// instructions; wasd to move, player can push boxes and boxes can push goblins.
// your goal is to move the goblins into the holes.
// j to rest level, i to skip level, k to go back a level, l displays move counts per level
*/

var frogger = 0

    var playernum = 0


  var icedplayernum = 0

var movecount = 0

var movecountcount = 0

var movecountlvl = []

var movetext = ""

addText("Shove the goblin",{
  x: 2,
  y: 3,
  color: color`2`
})
addText("in the hole",{
  x: 5,
  y: 5,
  color: color`2`
})
const win = tune`
163.04347826086956: B4-163.04347826086956 + G4~163.04347826086956,
163.04347826086956: C4/163.04347826086956 + D4^163.04347826086956,
163.04347826086956: C5-163.04347826086956 + A4~163.04347826086956,
163.04347826086956: E5-163.04347826086956 + C5~163.04347826086956,
163.04347826086956: C4/163.04347826086956 + E4^163.04347826086956,
163.04347826086956: F5-163.04347826086956 + D5~163.04347826086956,
163.04347826086956: D5-163.04347826086956 + B4~163.04347826086956,
163.04347826086956: C4/163.04347826086956 + F4^163.04347826086956,
163.04347826086956: C5-163.04347826086956 + A4~163.04347826086956,
163.04347826086956: G4-163.04347826086956 + E4~163.04347826086956,
163.04347826086956: C4/163.04347826086956 + G4^163.04347826086956,
163.04347826086956: E5-163.04347826086956 + C5~163.04347826086956,
163.04347826086956: G5-163.04347826086956 + E5~163.04347826086956,
163.04347826086956: C4/163.04347826086956 + B4^163.04347826086956,
2934.782608695652`
const melody = tune`
322.5806451612903: B4^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + G4~322.5806451612903 + B4-322.5806451612903,
322.5806451612903: D5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + E4~322.5806451612903,
322.5806451612903: F5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + E4~322.5806451612903 + D5-322.5806451612903,
322.5806451612903: F5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + B4~322.5806451612903 + E5-322.5806451612903,
322.5806451612903: A5^322.5806451612903,
322.5806451612903: B5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + G4~322.5806451612903,
322.5806451612903: A5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + E4~322.5806451612903 + D5-322.5806451612903,
322.5806451612903: F5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + D4~322.5806451612903,
322.5806451612903: E5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + D4~322.5806451612903 + B4-322.5806451612903,
322.5806451612903: C5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + E4~322.5806451612903,
322.5806451612903: C5^322.5806451612903,
322.5806451612903: D5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + G4~322.5806451612903 + B4-322.5806451612903,
322.5806451612903: D5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + B4~322.5806451612903,
322.5806451612903: F5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + G4~322.5806451612903 + D5-322.5806451612903,
322.5806451612903: A5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + G4~322.5806451612903,
322.5806451612903: A5^322.5806451612903,
322.5806451612903: C4/322.5806451612903 + G4~322.5806451612903 + C5-322.5806451612903,
322.5806451612903: F5^322.5806451612903 + C4/322.5806451612903 + A4~322.5806451612903,
322.5806451612903: D5^322.5806451612903`
    const playback = playTune(melody, Infinity)

const player1 = "1"
const player2 = "2"
const player3 = "3"
const player4 = "4"
const floor = "f"
const cavefloor = "F"
const sandfloor = "s"
const firefloor = "S"
const snowfloor = "0"
const voidfloor = "#"
const labfloor = "$"
const seafloor = "-"
const forestfloor = "+"
const crate = "C"
const bluecrate = "B"
const redcrate = "R"
const greencrate = "G"
const yellowcrate = "L"
const upcrate = "5"
const downcrate = "7"
const rightcrate = "6"
const leftcrate = "8"
const catcrate = "O"
const snowcrate = "@"
const goblin = "c"
const bluegoblin = "b"
const redgoblin = "r"
const greengoblin = "g"
const yellowgoblin = "l"
const catgoblin = "o"
const snowgoblin = "!"
const mutantgoblinup = "%"
const mutantgoblinright = "^"
const mutantgoblindown = "&"
const mutantgoblinleft = "*"
const wallx = "x"
const wally = "y"
const wallxy = "w"
const pit = "p"
const fire1 = "i"
const fire2 = "I"
const cactus = "z"
const ice = "u"
const snowman = "U"
const leftsign = "v"
const rightsign = "V"
const upsign = "N"
const downsign = "n"
const whitehole = "h"
const blackhole = "H"
const voidcrate = "("
const voidgoblin = ")"
const testube = "q"
const testubeB = "Q"
const labdesk = "W"
const lilypad = "_"
const treetrunk = "e"
const treestump = "E"

setLegend(
  [ treetrunk,  bitmap`
..FCCCCFCFCCCC..
..FCFCFFCFFCCF..
..CCFCFCFCFCFF..
..CFCFFFFCFCFC..
..CCCFCFFCCCCC..
..CCFCCFFCFFFC..
..CFCFCCFCCFFF..
..CCCCFCFCCFCF..
..CCFFCFFCCFFC..
..CFFCCCCCFCFC..
..FCFCCFCCCFCC..
..FCFCCFCCCFCC..
..CCCCFFCCFFCC..
..FCFCFFCFFCFC..
..CCFCCFCCFFFC..
..FCFCCCFFFCCC..` ],
  [ treestump,  bitmap`
..FCCCCFCFCCCC..
..FCFCFFCFFCCF..
..CCFCFCFCFCFF..
..CFCFFFFCFCFC..
..CCCFCFFCCCCC..
..CCFCCFFCFFFC..
..CFCFCCFCCFFF..
..CCCCFCFCCFCF..
..CCFFCFFCCFFC..
..CFFCCCCCFCFC..
..FCFCCFCCCFCC..
..FCFCCFCCCFCC..
..CCCCFFCCFFCC..
.CFCFCFFCFFCFCF.
CFCCFCCFCCFFFFCC
FCFCFCCCFFFCCCFF` ],
  [ player1, bitmap`
.......CCC......
.......9CC......
......9C9C......
....F9CC9CCF....
....FCC9CC9F....
...F.CC9CC9F....
...F..C9C9CF....
....F.CCC5.F....
....F.5CC5.F....
.....F11C1.F....
......1L11.F....
......1L.1L.....
......LL.LL.....
......C...C.....
.....CC...CC....
.....CC...CC....` ],
  [ player2,  bitmap`
......C9F.......
.....C9CF.......
.....CCC........
....C9C7........
...C9CFF........
...C9CF7........
...9C7F5F.......
..CC.7F5F.......
..9C.7F5.F......
..9C.5F1........
..C..111........
.....11L........
....1LLL........
...11LCC........
.CCCL.CC........
.CC...CCC.......` ],
  [ player3,  bitmap`
......99C.......
......9FC.......
......CFFC......
....FC7F7C9F....
....F9C77C9F....
....F9C775C.F...
....FC7775..F...
....F.7755.F....
....F.5555.F....
....F.1111F.....
....F.111L......
.....1L.1L......
.....LL.LL......
.....C...C......
....CC...CC.....
....CC...CC.....`],
  [ player4,  bitmap`
.......FCC......
.......FC9C.....
........C9CC....
........FC9C....
........FF9C....
........F7CC....
.......F57C9....
.......F57C9....
......F.557C....
........115C....
........111C....
........L11.....
........LLL1....
........CCL11...
........CC.LCCC.
.......CCC...CC.`],
  [ floor, bitmap`
4DDDDDDDDDDDDD4D
D4DD4DDD4DD4D4DD
DD4D4D44DD4DDDDD
D4DDDDDD4DDDDD4D
DDDDDDD4DDDD44DD
DD4DDDDDD4DDDDDD
D4DD4DDD4DD4DDD4
DDD4D4DDDD4DDD4D
D4DDD4DD4DDD4DDD
4DDDDDD4DDD4DDD4
DDDDD4DDDDDDDD4D
DD4D4DDDDD4DDDD4
DD4D4DD4D4DDDD4D
DD44DD4DDDDD4DDD
D4DDDDDD4DD4DDDD
DDDDDDD4DDDDDDDD` ],
  [ cavefloor, bitmap`
LLLL11LLLLLLLLLL
LLLLLL1LLLLLL1LL
LLL1LLLLLL11L1LL
L1L1LLLLL11LL1LL
11LLLLLLLLL1LLLL
1LLLL11LLLL1LL1L
1LLLL1LLLLL1LL11
LL1LLLL1LLLLLLLL
111LLLL1LLLLLLL1
1LLLLLLLLLLLLL11
LLLL1LLLL11LL11L
LLLLLLLLL1LLLLL1
LLLLLLLLLLLLLLL1
LL11LLLLLLLLLL11
LLL1L1LLL1LLLL1L
LLLLL111LLLLLLLL` ],
  [ sandfloor, bitmap`
FFFF66FFFFFFFFFF
FFFFFF6FFFFFF6FF
FFF6FFFFFF66F6FF
F6F6FFFFF66FF6FF
66FFFFFFFFF6FFFF
6FFFF66FFFF6FF6F
6FFFF6FFFFF6FF66
FF6FFFF6FFFFFFFF
666FFFF6FFFFFFF6
6FFFFFFFFFFFFF66
FFFF6FFFF66FF66F
FFFFFFFFF6FFFFF6
FFFFFFFFFFFFFFF6
FF66FFFFFFFFFF66
FFF6F6FFF6FFFF6F
FFFFF666FFFFFFFF` ],
  [ firefloor, bitmap`
CCCC33CCCCCCCCCC
CCCCCC3CCCCCC3CC
CCC3CCCCCC33C3CC
C3C3CCCCC33CC3CC
33CCCCCCCCC3CCCC
3CCCC33CCCC3CC3C
3CCCC3CCCCC3CC33
CC3CCCC3CCCCCCCC
333CCCC3CCCCCCC3
3CCCCCCCCCCCCC33
CCCC3CCCC33CC33C
CCCCCCCCC3CCCCC3
CCCCCCCCCCCCCCC3
CC33CCCCCCCCCC33
CCC3C3CCC3CCCC3C
CCCCC333CCCCCCCC` ],
  [ snowfloor, bitmap`
2222112222222222
2222221222222122
2221222222112122
2121222221122122
1122222222212222
1222211222212212
1222212222212211
2212222122222222
1112222122222221
1222222222222211
2222122221122112
2222222221222221
2222222222222221
2211222222222211
2221212221222212
2222211122222222` ],
  [ voidfloor, bitmap`
0000HH0000000000
000000H000000H00
000H000000HH0H00
0H0H00000HH00H00
HH000000000H0000
H0000HH0000H00H0
H0000H00000H00HH
00H0000H00000000
HHH0000H0000000H
H0000000000000HH
0000H0000HH00HH0
000000000H00000H
000000000000000H
00HH0000000000HH
000H0H000H0000H0
00000HHH00000000` ],
  [ labfloor, bitmap`
221L221L221L221L
211L211L211L211L
211L211L211L211L
211L211L211L211L
111L111L111L111L
111L111L111L111L
111L111L111L111L
111L111L111L111L
11LL11LL11LL11LL
11LL11LL11LL11LL
11LL11LL11LL11LL
1LLL1LLL1LLL1LLL
1LLL1LLL1LLL1LLL
1LLL1LLL1LLL1LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ seafloor,  bitmap`
5757555555555755
7575755577557555
7555555755755755
5777555555577555
7555755575555555
5555577755555757
5577555555557575
5755755755755555
5575577557575755
7755555555555557
5555755555755575
5757575557575775
7575575755557555
5557757555755557
5557575557755577
5575555555555755` ],
  [ forestfloor,  bitmap`
DDFDDDDDFDDDFDDD
DFDDDDDFDDDFDDDF
DDDFFDDDDFDDDDFD
DDFFDDDDFDDDDFDD
DFDDFDDFDDDDDDDD
DDDFDDDDDDDDDDFD
DDDDDDDDDDFDDFDD
DDFDDDFDDFDDDDDF
DFDDDFDDFDDDDDFD
DDDDFDDFDDDFDDDD
DFDDDDFDDDFDDDDF
FDFDDDDDDFDDFDFD
DFDDDDDFDDDFDDDF
DDDDFDFDDDFDDDFD
DFDFDDDDDFDDDFDD
FDFDDDDDFDDDDDDD` ],
  [ crate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCCFFCCFCC...
...FCFCCFCFCC...
...FCFCCFCFCC...
...FCCFFCCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................` ],
  [ bluecrate,bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCC55CCFCC...
...FC5CC5CFCC...
...FC5CC5CFCC...
...FCC55CCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................` ],
  [ redcrate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCC33CCFCC...
...FC3CC3CFCC...
...FC3CC3CFCC...
...FCC33CCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................` ],
  [ greencrate,bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCC44CCFCC...
...FC4CC4CFCC...
...FC4CC4CFCC...
...FCC44CCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................` ],
  [ yellowcrate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCC66CCFCC...
...FC6CC6CFCC...
...FC6CC6CFCC...
...FCC66CCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................`  ],
  [ downcrate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCCCCCCFCC...
...FCFCCFCFCC...
...FCFCCFCFCC...
...FCCFFCCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................`  ],
  [ upcrate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCCFFCCFCC...
...FCFCCFCFCC...
...FCFCCFCFCC...
...FCCCCCCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................` ],
  [ rightcrate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCCFFCCFCC...
...FCCCCFCFCC...
...FCCCCFCFCC...
...FCCFFCCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................`  ],
  [ leftcrate, bitmap`
................
................
................
................
....FCCCCFFFC...
...FFFCCCCFCC...
...FFFFFFFFCC...
...F1CCCC1FCC...
...FCCFFCCFCC...
...FCFCCCCFCC...
...FCFCCCCFCC...
...FCCFFCCFCC...
...F1CCCC1FCC...
...FFFFFFFFC....
................
................` ],
  [ catcrate, bitmap`
...........111..
.....L....LL.1..
....11....L.1...
..1111......11..
..1021.......11.
..1111........1.
...1111L11L1L1..
...1111L11L1L1..
...1111111L111..
....1111111111..
....11......11..
...1.1......1.1.
...1.1......1.1.
................
................
................` ],
  [ snowcrate, bitmap`
....11111111....
...1222222211...
..122222221111..
.12222222212111.
122222222222111L
12222222222211LL
12221122212111LL
1221122212111LLL
1211211121111LLL
122221221111LLLL
122222211111LLLL
12222111111LLLLL
.11111111LLLLLL.
..111111LLLLLL..
...LLLLLLLLLL...
....LLLLLLLL....` ],
  [ voidcrate, bitmap`
......262.......
......2662......
.....26962......
.....269662.....
....2639962.....
...226993662....
.2266999996622..
2663999799996622
6999997279399966
2669999799966322
.2263999966622..
...226999622....
....2669362.....
.....26962......
.....26962......
......262.......` ],
  [ goblin, bitmap`
................
................
................
......444.......
..444D34344DD...
....DD444DD.....
.......4........
.....4844D......
....4.88DD......
...4..48H.4.1...
...4..4HHFFF11..
..4FFFFFF...1...
FFF..44.4.......
....4....D......
....D....D......
...D......D.....` ],
  [ bluegoblin, bitmap`
................
................
................
......444.......
..444D34344DD...
....DD444DD.....
.......4......11
.....4744D...1L1
....4.77DD..1L1.
...4..475.4FL1..
...4..455.4FF...
..4...775.F.....
.....4554F......
....4....D......
....D....D......
...D......D.....`],
  [ redgoblin, bitmap`
................
................
................
......444.......
..444D34344DD...
....DD444DD.....
.......4........
.....4344D......
....4.33DD......
...4..43C.4..1..
...4..4CC..4F.1.
..4...33C..F..1.
.....4CC4....1LL
....4....D....L.
....D....D......
...D......D.....`],
  [ greengoblin,bitmap`
................
................
................
......444.......
..444D34344DD...
....DD444DD.....
.......4........
.....4444D......
....4444D.4.....
....4.44D4......
....4.1114......
....41FFF1......
.....1F1F1......
....41FFF1......
....D.111D......
...D......D.....`],
  [ yellowgoblin, bitmap`
................
.............8..
............88H.
......444...88H.
..444D3434488HHH
....DD444DD.HHH.
.......4....FHF.
.....4644D...F..
....4.66DD...F..
...4..46F.4.F...
...4..4FF..4F...
.....66FF...F...
.....4FF4...F...
....4....D.F....
....D....D.F....
...D......DF....` ],
  [ catgoblin, bitmap`
................
....11...11.....
....1811181.....
.....14441......
..444134314DD...
....DD444DD.....
.......4........
....44844D......
....4.88DD......
....1141114.....
...11111L111....
..1144L1L41111..
.1..41L1L41201..
.1..4....D111...
1...D....D18....
...D......D1....`],
  [ snowgoblin, bitmap`
..9..111111.....
..999102201.....
...199200111....
...129444011....
..444434344DD...
....DD444DD.....
...1111111111...
...12222222111..
...11111111111..
..122222222211..
.12222202222221.
.12222022222211.
F122222222221111
.12222201111111.
..12222111111...
...111111111....`],
  [ voidgoblin,  bitmap`
.6.....6........
....6.666.6..6..
.6.6...6........
......3HH.......
6.HHH03H3H3HH...
....00HHH00..6..
.H.....H......H.
..HH.3HH30..HH..
....H.HH3.HH....
..6...3H0.....6.
......H30....666
......00C.....6.
.....0C00.......
....C....0......
....0....0......
...0......0.....` ],
  [ mutantgoblinup,  bitmap`
................
......444D444...
.....44.DD3434DD
.....4444.4DDDD.
..444D3434DDD...
....DD444DD.....
.4.....4......D.
..44.D444D..4D..
...4D.444444....
..4..D44D.4.4...
.4..D.44D.D..D..
...D..DDDD.D....
.....4DDD.D.....
....4D..DDD.....
....D.D.DD.D....
...4..DD..D.D...` ],
  [ mutantgoblinright,  bitmap`
................
......444D444...
.....44.DD3434DD
.....4444.4DDDD.
..444D3434DDD...
....DD444DD.....
.4.....4......D.
..44.D444D..4D..
...4D.444444....
..4..D44D.4.4...
.4..D.44D.D..D..
...D..DDDD.D....
.....4DDD.D.....
....4D..DDD.....
....D.D.DD.D....
...4..DD..D.D...` ],
  [ mutantgoblindown,  bitmap`
................
......444D444...
.....44.DD3434DD
.....4444.4DDDD.
..444D3434DDD...
....DD444DD.....
.4.....4......D.
..44.D444D..4D..
...4D.444444....
..4..D44D.4.4...
.4..D.44D.D..D..
...D..DDDD.D....
.....4DDD.D.....
....4D..DDD.....
....D.D.DD.D....
...4..DD..D.D...` ],
  [ mutantgoblinleft,  bitmap`
................
......444D444...
.....44.DD3434DD
.....4444.4DDDD.
..444D3434DDD...
....DD444DD.....
.4.....4......D.
..44.D444D..4D..
...4D.444444....
..4..D44D.4.4...
.4..D.44D.D..D..
...D..DDDD.D....
.....4DDD.D.....
....4D..DDD.....
....D.D.DD.D....
...4..DD..D.D...` ],
  [ wallx, bitmap`
................
................
LL4DD44LLLLLLLLL
44DD4411LLLDDDLL
DDD411LL11144DLL
DD1111L411144DD1
4D4111LDDD411441
LLLLLLLLLL441111
L444DD4LLLLLL1LL
LDDDD41DLLL1111L
4444111DDD4L4111
41111111111LD111
DDD411111LLDD4L1
LLLLLLLLLLLLLLLL
................
................` ],
  [ wally, bitmap`
....L4LLL4DL....
....L4D4LDDL....
....L4D4L41L....
....L4D4L11L....
....L1DDL11L....
....L14DL11L....
....L114LLLL....
....LDDLLD4L....
....LDLLLD1L....
....LDLLLD1L....
....L4LL441L....
....LL1L414L....
....L41L114L....
....L11114DL....
....L11L14DL....
....L1LL111L....` ],
  [ wallxy, bitmap`
....L4LLL4DL....
....L4D4LDDL....
LLLLL4D4L41DD4LL
LLD414D4L114DDLL
L4D111DDL1114DDD
LDD1114DL1114DD4
DD111114LLLL1441
41111DDLLD4L1141
11111DLLLD11L111
111L1DLLLD11LL1L
L11L14LL4411L4D1
L11DLL1L4144D11L
LL1DD41L1144D1LL
LLL4144114DDDLLL
....L41L14DL....
....L1LL111L....` ],
  [ fire1, bitmap`
................
.........33.....
.33.......33....
..3333....333...
..33333...3933..
...3993..39933..
....3993339933..
....339999693...
.....39696693...
....3396666933..
....3399669933..
...339996699933.
..3339966669933.
..33996666669933
..39996666666993
.339966666666993`,],
  [ fire2, bitmap`
.....33.........
....333......33.
...333......333.
...333...33333..
..3393..339333..
..33933339933...
..3399333993....
..3369939633....
..3366666633....
..3396666333....
...339669333....
...339666933....
...339966933....
...3399669933...
..339966669333..
.33996666669333.`,],
  [ cactus, bitmap`
4FFF666F6F66666F
F4DFF6FFFFF66F66
FD44FFF4F4F6FFF6
FDDF4FD44FFFFDFF
44DDF4DDD44FDDFF
FDDDDDDD4DFFD44F
FF4DDDD4D44FDDFF
F4F4D44DDDFFD4FF
FF4F4DD4DDDDDD4F
6FFFFDDDDDDDDDFF
66FFF4DDD4DDFFF6
66FF4DD4DD4FFF66
F66FFDDD4DFF666F
66FF44DDD44FF66F
F66FFDDDDD4FF66F
F66FFDDDD4FF66FF`,],
  [ ice, bitmap`
1721277122172127
7272772271722721
2727277727777217
7772777277772771
1227772777727712
2717727772777727
7277277727772777
7777777277727721
2727777277277277
2177772772772712
1227727777772721
2777277772727777
7727277727777212
2272777277772721
1227272771772777
2212722172721271`,],
  [ snowman, bitmap`
........111.....
......111211....
....991222211...
....199022221...
...11299222211.F
..11222992022F.F
.F112200222221FF
FF.11122002221F.
.FF.1111111111F.
F.F11222222221F.
..F12222022222F.
.11222222222221.
.12222202222221.
.12222222222211.
..112222022211..
...1111111111...`,],
  [ leftsign, bitmap`
.......3........
......323.......
.....32223......
....3223223.....
...322322223....
..32233333323...
.3222232222223..
.3222223222223..
..33333333333...
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........
.......L........`,],
  [ rightsign, bitmap`
........3.......
.......323......
......32223.....
.....3223223....
....322223223...
...32333333223..
..3222222322223.
..3222223222223.
...33333333333..
........L.......
........L.......
........L.......
........L.......
........L.......
........L.......
........L.......`,],
  [ upsign, bitmap`
........3.......
.......323......
......32223.....
.....3223223....
....322333223...
...32232323223..
..3222223222223.
..3222222222223.
...33333333333..
........L.......
........L.......
........L.......
........L.......
........L.......
........L.......
........L.......`,],
  [ downsign, bitmap`
........3.......
.......323......
......32223.....
.....3223223....
....323232323...
...32223332223..
..3222223222223.
..3222222222223.
...33333333333..
........L.......
........L.......
........L.......
........L.......
........L.......
........L.......
........L.......`,],
  [ whitehole, bitmap`
..2..2..2.22....
..2222.22.2..2..
.2222288822.22..
.2.2288668822...
...2227776882.2.
222266777768222.
2.266876677682..
.22687622678822.
222687722678222.
..228672677822..
2.2288622266222.
2222288677622.2.
...2228888222...
...22222222.2...
...2.222.2......
................`,],
  [ blackhole, bitmap`
..0..0..0.00....
..0000.00.0..0..
.00000HHH00.00..
.0.00HHCCHH00...
...000DDDCHH0.0.
0000CCDDDDCH000.
0.0CCHDCCDDCH0..
.00CHDC00CDHH00.
000CHDD00CDH000.
..00HCD0CDDH00..
0.00HHC000CC000.
00000HHCDDC00.0.
...000HHHH000...
...00000000.0...
...0.000.0......
................`,],
  [ testube, bitmap`
................
................
...1111111LLL...
....11LLLLLL....
....24444442....
....244D4422....
....243432D2....
....24442DD2....
....24D44422....
....244442D2....
....24D42422....
....2444D2D2....
....24D42DD2....
....24DDDDD2....
...171314111L...
..1111111LLLLL..`,],
  [ testubeB, bitmap`
................
................
...1111111LLL...
....11LLLLLL....
....24.....2....
....2.222.22....
....2.2222.2....
....2.2422.2....
....222.2.22....
....222.22.2....
....242.2222....
....242222.2....
....22.224.2....
....24D4D442....
...14D444DDDL...
.4DDD4DDDDDDDDD.`,],
  [ labdesk, bitmap`
................
................
................
................
................
................
................
.........6777...
.FFF022FFDDDDFF.
.FF22022FL1L1FC.
.F20020FF1L1LCC.
.FF202FFFCCCCCC.
..F.C........FC.
..F.C........FC.
..C.C........CC.
..C.C........CC.`,],
  [ lilypad, bitmap`
................
................
....2.....D.....
...22D...D4D....
..224D...D44D...
..2244D.D444D...
..24444D4444D...
..D44444444DD...
..D44444444DD...
..D4444444DDD...
..D44444DDDDD...
...D44DDDDDD....
....DDDDDDD.....
................
................
................`,],
  [ pit, bitmap`
................
.....1.F........
...F.FFFF..F....
..FFFFFFFFFFF...
..1FFF1FFFF1F.F.
FFFFFFF1FFFFFFF.
F1FFFFFFFFF1FF1.
FFFFFFFCCFFFFFFF
1FF1FCCCCCCCFFFF
FFFCCCCCCCCCCCFF
.FCCCCCCCCCCCCF.
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
................
................` ],
)

setBackground(floor)

setSolids([treestump,mutantgoblinup,mutantgoblinright,mutantgoblindown,mutantgoblinleft,labdesk,testubeB,testube,voidcrate,voidgoblin,whitehole,snowcrate,snowgoblin,leftsign,rightsign,upsign,downsign,snowman,cactus,catcrate,fire1,fire2,catgoblin,player1,player2,player3,player4,crate,bluecrate,redcrate,greencrate,yellowcrate,upcrate,downcrate,rightcrate,leftcrate,goblin,bluegoblin,redgoblin,greengoblin,yellowgoblin,wallx,wally,wallxy])

//巨尻の男

let level = 0
const levels = [
  map`
p
.
c
.
C
.
1
h`,
  map`
p.p
...
cvc
...
C.C
...
.1.`,
  map`
...p
..n.
..x.
..c.
..C.
....
..1C
....`,
  map`
..n....
.p.....
..c....
...C...
....c..
.1...p.
....N..`,
  map`
wxxw
y.py
y.1y
y.cv
y.Cy
y..y
wxxw`,
  map`
...p
..c.
..C.
.1..`,
  map`
p..n...n..p
...........
...........
...c...C...
...........
.....1.....
...........
...C...c...
...........
p..N...N..p`,
  map`
..ypy..
.nycyv.
xxwCwxx
pcC1Ccp
xxwCwxx
.VycyN.
..ypy..`,
  map`
.........
.C....py.
xw.xxxxw.
Vy..c....
.y..C..wx
.y..1..y.
.y...C.y.
xw.....y.`,
  map`
pppp
pC1p
pcvp
pppp`,

  map`
.pc..
.....
..C..
.1...`,
  map`
.p.p.
.....
.b.c.
.....
.C.B.
.....
..1..`,
  map`
  .......
  .p...p.
  ..c.B..
  ...R...
  ..b.C..
  .p.1.p.
  .......`,
  map`
   .p.p.p.
   .......
   .r.b.c.
   .......
   .C.R.B.
   .......
   ...1...`,
  map`
   ...p..p..p
   .y..y..y..
   pwx.wx.wx.
   .y..y..y..
   .yRbyCryBc
   ..........
   ....1.....`,
  map`
  .p.p.p.p.
  .........
  .r.b.g.c.
  .........
  .C.G.R.B.
  .........
  ....1....`,
  map`
   ........
   .p....p.
   ..r..c..
   ...BG...
   ........
   ...CR...
   ..g..b..
   .p....p.
   ...1....`, 
  map`
   .p.p.p.p.p.
   ...........
   .r.g.b.c.l.
   ...........
   .L.B.C.G.R.
   ...........
   .....1.....`,
  map`
  ...1....
  ..B...R.
  .r...G..
  ...C...b
  .g.c.l..
  ....L...
  ........
  pppppppp`,
  map`
  xxxxxxw..p
  p.l.L.y...
  xxxxw.y...
  ....y.y..b
  ..R..B....
  pr........
  .......1..`,

  map`
  ....p
  ..r..
  .R...
  ....1`,
  map`
  7y..
  .y..
  cy.1
  .y..
  pz..`,
  map`
  .....c...p
  6...y.....
  ..........
  ..........
  ..........
  ...5...zzz
  .......z1.`, 
  map`
  ....c.p
  6...z..
  ......1`, 
  map`
  p.7.p
  .....
  6.c.8
  ..C..
  p.5.p
  ..1.z `,
  map`
  ......p
  .1Lr...
  .L.5.R.
  .......`,
  map`
  ..p.z
  ..c..
  ..L..
  ..5.1`,
  map`
  p.y..
  l.y1.
  L.yC.
  ..y..
  z...8
  wxx..
  .....`,
  map`
   zp.
   ...
   .b.
   .B.
   .5.
   xw.
   1y.
   `,
  map`
   .....p.....
   ...........
   .....c.....
   .....C...z.
   .....5.....
   p.cC816Cc.p
   .....7.....
   .....C.....
   .....c.z...
   ...........
   .z...p.....`,

  map`
  Ip..p.
  .bi.r.
  .R....
  1...B.
  ......`,
  map`
  ..p.i
  .....
  .Io..
  .....
  ..O..
  ...i.
  ..4..`,
  map`
  ..i...
  .p.b..
  I...B.
  1.....`,
  map`
  ..73
  ..O.
  .o..
  ip.I`,
  map`
I..p
....
..i.
..c.
..C.
....
..1C
....`,
  map`
  iIi.IiI
  6..Bc.p
  IiICIiI
  iIi..1.`,
  map`
  .p.p.p.p.p.p.
  .c.b.l.g.o.r.
  .............
  .O.R.C.B.G.L.
  ......1......`,
  map`
   p.o..
   i1.O.
   iI..I`,
  map`
   poO.Oop
   poO.Oop
   poO.Oop
   poO1Oop
   poO.Oop
   poO.Oop`,
  map`
   IiIIiII3IIIiIiIIIIi
   i..i....iiIiI.....i
   i.Ii.Ii.i.....IIi.i
   i....Ii.i.I.Iii...i
   iI..I.i...i...iiI.i
   I..I....IiIiI...i.I
   i..I..i..i..iIi...i
   iI.ii.IiiIi.....I.i
   iI....i...I.iii.i.i
   i..Ii.iii.i....i..i
   i.IiI..Ii.iIIi.iiIi
   i...iI.......I..Oop
   IiIIIIIiIIiIIiIIIiI`,

  map`
  .vvv....
  .uuu1Ccp`,
  map`
  .1..
  ..yu
  .nyu
  xxwu
  .uu.
  Cxvx
  c.U.
  p...`,
  map`
   ....n1.
   uuuuuuu
   uuuuuuu
   uuuuuuu
   ..U.xN.
   C.y....
   c.y....
   p.y....`,
  map`
   .1...
   VnVn.
   N....
   V.VnN
   ..NvV
   .Nvnv
   .Ccp.`,
  map`
   1.uuu.U
   ..VVV..
   ....yC.
   ....yc.
   ....yp.`,
  map`
   1.uuuu.
   VU...Uu
   .uuuu.u
   u.pcC.u
   .uuuuu.`,
  map`
   UUUUUUU3UUUUUUUUUUU
   U..U.uu.UUUUU.....U
   U.UU.UUuU.uuu.UUU.U
   U....UUuU.U.UUU...U
   UU..U.Uu..U.u.UUU.U
   Uu.U.u.uUUUUu.u.U.U
   Uu.U.uU..U..uUU...U
   UU.UUuUUUUU.uuu.U.U
   UU...uU...U.uUU.U.U
   U..UUuUUU.U.u..U..U
   UuUUU..UU.UUuU.UUUU
   U.u.UU.uuuuu.U..Oop
   UUUUUUUUUUUUUUUUUUU`,
  map`
   .p.
   ...
   .!.
   ...
   .@.
   ...
   .1.`,
  map`
   .p.
   ...
   .!.
   ...
   .U.
   ...
   .@.
   ...
   .1.`,
  map`
   .ppp.p.ppp.
   .cbr.g.lo!.
   ...........
   .@CL.R.OGB.
   .....1.....`,

  map`
  .1.
  .R.
  .r.
  .p.`,
  map`
  ..y..
  .Hyh.
  ..y.C
  1.y.c
  ..y.p`,
  map`
  1...H.
  xxxxxx
  pcCh..`,
  map`
  ............
  xxxxxx7x.xxx
  1.....@.BCcp
  xxwhwwCxBxxx
  ..wxwy..C...
  .....y.....H`,
  map`
  ...1.....
  .........
  ...H.....
  xxxxxxxxx
  6h.......
  xxxxxx.xx
  .........
  ....C....
  ....c....
  ....p....`,
  map`
  ...y1H...................
  ...wx....................
  ...h.H.6Cc..............p`,
  map`
   1..H.yh.
   .....y..
   ....pcC.`,
  map`
   ..2.Hy7
   xxxxxwh
   ...h.y.
   .....y.
   pcC..C.`,
  map`
   .......
   2.(.).p
   .......`,
  map`
   ...H.........
   2.(.).)))pppp
   .............`,

  map`
  .1.(.).p`,
  map`
  .W..q..
  2.C.c.p
  ....W..`,
  map`
  .W..Q..
  pcC.2..
  ....W..`,
  map`
  .....Q.C.cp
  ...........
  CW.W.W.W.WC
  cW.W.W.W.Wc
  pW.W.W1W.Wp`,
  map`
   .Q^....p
   WWWWWWWW
   .....2..`,
  map`
   WWWWpWWWW
   WWW...WWW
   WWW.%.WWW
   W...Q...W
   p.*Q.Q^.p
   W1..Q...W
   WWW.&.WWW
   WWW...WWW
   WWWWpWWWW`,
  map`   
  ...p......
  Q........p
  ^...q.....
  ..........
  ..........
  ..........
  WWW%WWWWWW
  ...Q...W1.`,
  map`
  2....H
  WWWWWW
  p.cC.h
  WWWWWW
  Q^...p`,
  map`
  .p.....
  1..c.pp
  ^.q....
  Q......
  .%Q....`,
  map`
  pH..2...*h
  WWWWWWWWWW`,

  map`
  ...p
  ..b.
  .B..
  2...`,
  map`
  ...p...
  ...p...
  ..b.b..
  ...B...
  ...1...`, 
  map`
  .p.
  .b.
  ...
  ._.
  .B.
  .1.
  `,
  map`
  p...y.4
  c.y.y..
  C.y_y..
  ..y....`,
  map`
   y..._._4
   y.xxxxxx
   .C.c..p.
   ........
   ........`,
  map`
   2_._.
   _._B_
   ._._.
   _._b_
   ._._.
   _._p_`,
  map`2_._.._..._Bbp`,
  map`
   2...H
   xxxxx
   ..h..
   ...B.
   .___.
   _._._
   _.b._
   ._._.
   _.p._
   _._._`,
  map`
   ._____
   ._.3._
   ._.B._
   ._b.._
   ._..p_
   ._____`,
  map`
   &
   3
   _
   _
   _
   _
   _
   _
   _
   _
   _
   p
   _`,

  map`
   ..e..
   ..e.p
   2.e.g
   ..e.G
   ..E..`,
  map`
   eeeeeep
   eeeeeeg
   EeeeeeG
   .EeeeE.
   2.eeE..
   ..Ee...`,
  map`
   EEEEEEE3EEEEEEEEEEE
   EeeEeeeeEEEEEeeeeeE
   EeEEeEEeEEEEEEEEEeE
   EeeeeEEeEeEeEEEeeeE
   EEeeEeEeeeEeeeEEEeE
   EeeEeeeeEEEEEeeeEeE
   EeeEeeEeeEeeEEEeeeE
   EEeEEeEEEEEeeeeeEeE
   EEeeeeEeeeEeEEEeEeE
   EeeEEeEEEeEeeeeEeeE
   EeEEEeeEEeEEEEeEEEE
   EeeeEEeeeeeeeEeeOop
   EEEEEEEEEEEEEEEEEEE`,
  map`
   .eeGgp
   .eeEE.
   .Ee..4`,
  map`
   .eee.cp
   2eeE...
   6eeE...
   .Ee....`,
  map`
   ..EEEEEEE...
   ..Eeeeeee...
   2GeeeEEeE...
   ..EeeeeeE.gp
   ..EEEEeeE...`,
  map`
   ..EEEEEEE..
   2_eeeeeeeC.
   ^.eeeeeeeCp
   ..EEEEEEE..`,
  map`
   3EEEEE..
   .uuCuucp
   .EEEEE..`,
  map`
   .EEEp
   2EEEg
   .EEEG
   .eee.`,
  map`
   2.ey..
   .yey..
   .yey..
   .yey..
   .yey..
   .yeGgp
   .yE...`,

  map`
   ....
   2.C.
   xxw.
   V.yc
   ..yp`,
  map`
   .pppp.p.
   .gbrl.c.
   ........
   .CLGR.B.
   .....2..
   ........`,
  map`
   p..lL.2
   p..c.C.
   p..c.@8
   .......`,
  map`
I..iIi
.O2.pI
..o..i
iI...I
Ii....`,
  map`
   3y...y...
   .y.y.y.y.
   uuuuuuuuu
   uuuuuuuuu
   uuuuuuuuu
   uuuuuuuuu
   .y.y.y.y.
   ...y...y@
   xxxxxxxw!
   .......yU
   .......yp
   .......y.`,
  map`
   2..h
   xx..
   .H.H
   H..H
   H.H.
   HuHp
   .u.)
   .u..
   .u.(
   .H..`,
  map`
   QQQp
   &^.p
   p..*
   .2q.
   pQ.%`,
  map`
   ____3
   _____
   xxxxx
   _____
   __B__
   _b___
   p____`,
  map`
..EEeep.
.GeeeE..
.2eeeEg.
..eeee..
..EEEE..`, 
  map`
p
.
c
.
C
.
1`,

  map`
   .H.
   ...
   ...
   .1.`,
]

setMap(levels[level])

setPushables({
  [ player1 ]: [voidcrate,snowcrate,crate,bluecrate,redcrate,greencrate,yellowcrate,upcrate,rightcrate,downcrate,leftcrate,catcrate],
  [ player2 ]: [voidcrate,snowcrate,crate,bluecrate,redcrate,greencrate,yellowcrate,upcrate,rightcrate,downcrate,leftcrate,catcrate],
  [ player3 ]: [voidcrate,snowcrate,crate,bluecrate,redcrate,greencrate,yellowcrate,upcrate,rightcrate,downcrate,leftcrate,catcrate],
  [ player4 ]: [voidcrate,snowcrate,crate,bluecrate,redcrate,greencrate,yellowcrate,upcrate,rightcrate,downcrate,leftcrate,catcrate],
  [ crate ]: [mutantgoblinup,mutantgoblinright,mutantgoblinleft,mutantgoblindown,goblin,crate,bluecrate,redcrate,greencrate,yellowcrate,upcrate,rightcrate,downcrate,leftcrate,snowcrate],
  [ bluecrate ]: [bluegoblin,bluecrate],
  [ redcrate ]: [redgoblin,redcrate],
  [ greencrate ]: [greengoblin,greencrate],
  [ yellowcrate ]: [yellowgoblin,yellowcrate],
  [ catcrate ]: [catgoblin],
  [ upcrate ]: [goblin,crate,upcrate,rightcrate,downcrate,leftcrate,bluecrate,redcrate,greencrate,whitehole],
  [ rightcrate ]: [goblin,crate,upcrate,rightcrate,downcrate,leftcrate,bluecrate,redcrate,greencrate,yellowcrate,whitehole],
  [ downcrate ]: [goblin,crate,upcrate,rightcrate,downcrate,leftcrate,bluecrate,redcrate,greencrate,yellowcrate,whitehole],
  [ snowcrate ]: [snowgoblin,snowman,snowcrate,crate],
  [ snowman ]: [snowgoblin,snowman,snowcrate],
  [ snowgoblin ]: [snowman],
  [ leftcrate ]: [goblin,crate,upcrate,rightcrate,downcrate,leftcrate,bluecrate,redcrate,greencrate,yellowcrate,whitehole],
  [ voidcrate ]: [voidcrate,crate,voidgoblin],
  [ voidgoblin ]: [voidgoblin,goblin],
  [ mutantgoblinup ]: [mutantgoblinup,mutantgoblinright,mutantgoblindown,mutantgoblinleft,crate,goblin],
  [ mutantgoblinright ]: [mutantgoblinup,mutantgoblinright,mutantgoblindown,mutantgoblinleft,crate,goblin],
  [ mutantgoblindown ]: [mutantgoblinup,mutantgoblinright,mutantgoblindown,mutantgoblinleft,crate,goblin],
  [ mutantgoblinleft ]: [mutantgoblinup,mutantgoblinright,mutantgoblindown,mutantgoblinleft,crate,goblin],
})

onInput("w", () => {
movecount = movecount + 1
  if (getAll(player3).length>0) {
  getFirst(player3).type = player1
  }
    if (getAll(player2).length>0) {
  getFirst(player2).type = player1 
  }
      if (getAll(player4).length>0) {
  getFirst(player4).type = player1 
  }
getFirst(player1).y += -1

      if (getAll(upcrate).length>0) {
  getFirst(upcrate).y += -1
  }
    if (getAll(downcrate).length>0) {
  getFirst(downcrate).y += 1
  }
    if (getAll(rightcrate).length>0) {
  getFirst(rightcrate).x += 1
  }
    if (getAll(leftcrate).length>0) {
  getFirst(leftcrate).x += -1
  }

        if (getAll(mutantgoblinup).length>0) {
  getFirst(mutantgoblinup).y += -1
  }
    if (getAll(mutantgoblindown).length>0) {
  getFirst(mutantgoblindown).y += 1
  }
    if (getAll(mutantgoblinright).length>0) {
  getFirst(mutantgoblinright).x += 1
  }
    if (getAll(mutantgoblinleft).length>0) {
  getFirst(mutantgoblinleft).x += -1
  }


    playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;

  setInterval(() =>{
 if (icedplayernum === playernum) {  

   getFirst(player1).y += -1

       playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;


 }
  },500)
    const holedplayernum = tilesWith(blackhole, player1).length + tilesWith(blackhole, player2).length + tilesWith(blackhole, player3).length + tilesWith(blackhole, player4).length;

  if (holedplayernum === playernum) {
getFirst(player1).remove()
addSprite(getFirst(whitehole).x,getFirst(whitehole).y,player1)
}

var lilypadnum = tilesWith(lilypad).length;

var paddedplayernum = tilesWith(lilypad, player1).length + tilesWith(lilypad, player2).length + tilesWith(lilypad, player3).length + tilesWith(lilypad, player4).length;


if (paddedplayernum>0) {
 frogger += 1
}
if (frogger>0) {
getFirst(player1).y += -frogger
}
})

onInput("s", () => {
movecount = movecount + 1
  if (getAll(player1).length>0) {
  getFirst(player1).type = player3 
}
    if (getAll(player2).length>0) {
  getFirst(player2).type = player3 
  }
      if (getAll(player4).length>0) {
  getFirst(player4).type = player3 
  }
  getFirst(player3).y += 1

      if (getAll(upcrate).length>0) {
  getFirst(upcrate).y += -1
  }
    if (getAll(downcrate).length>0) {
  getFirst(downcrate).y += 1
  }
    if (getAll(rightcrate).length>0) {
  getFirst(rightcrate).x += 1
  }
    if (getAll(leftcrate).length>0) {
  getFirst(leftcrate).x += -1
  }

          if (getAll(mutantgoblinup).length>0) {
  getFirst(mutantgoblinup).y += -1
  }
    if (getAll(mutantgoblindown).length>0) {
  getFirst(mutantgoblindown).y += 1
  }
    if (getAll(mutantgoblinright).length>0) {
  getFirst(mutantgoblinright).x += 1
  }
    if (getAll(mutantgoblinleft).length>0) {
  getFirst(mutantgoblinleft).x += -1
  }

    playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;

  setInterval(() =>{

 if (icedplayernum === playernum) { 


   getFirst(player3).y += 1

       playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;

 }
  },500)
    const holedplayernum = tilesWith(blackhole, player1).length + tilesWith(blackhole, player2).length + tilesWith(blackhole, player3).length + tilesWith(blackhole, player4).length;

  if (holedplayernum === playernum) {
getFirst(player3).remove()
addSprite(getFirst(whitehole).x,getFirst(whitehole).y,player3)
}

  var lilypadnum = tilesWith(lilypad).length;

var paddedplayernum = tilesWith(lilypad, player1).length + tilesWith(lilypad, player2).length + tilesWith(lilypad, player3).length + tilesWith(lilypad, player4).length;

if (paddedplayernum>0) {
 frogger += 1
}
if (frogger>0) {
getFirst(player3).y += frogger
}
})

onInput("a", () => {
movecount = movecount + 1
    if (getAll(player1).length>0) {
  getFirst(player1).type = player4 
  }
    if (getAll(player2).length>0) {
  getFirst(player2).type = player4 
  }
      if (getAll(player3).length>0) {
  getFirst(player3).type = player4 
  }
  getFirst(player4).x += -1

      if (getAll(upcrate).length>0) {
  getFirst(upcrate).y += -1
  }
    if (getAll(downcrate).length>0) {
  getFirst(downcrate).y += 1
  }
    if (getAll(rightcrate).length>0) {
  getFirst(rightcrate).x += 1
  }
    if (getAll(leftcrate).length>0) {
  getFirst(leftcrate).x += -1
  }

          if (getAll(mutantgoblinup).length>0) {
  getFirst(mutantgoblinup).y += -1
  }
    if (getAll(mutantgoblindown).length>0) {
  getFirst(mutantgoblindown).y += 1
  }
    if (getAll(mutantgoblinright).length>0) {
  getFirst(mutantgoblinright).x += 1
  }
    if (getAll(mutantgoblinleft).length>0) {
  getFirst(mutantgoblinleft).x += -1
  }

    playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;
  setInterval(() =>{
 if (icedplayernum === playernum) { 
   getFirst(player4).x += -1
       playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;

 }
 },500)
    const holedplayernum = tilesWith(blackhole, player1).length + tilesWith(blackhole, player2).length + tilesWith(blackhole, player3).length + tilesWith(blackhole, player4).length;

  if (holedplayernum === playernum) {
getFirst(player4).remove()
addSprite(getFirst(whitehole).x,getFirst(whitehole).y,player4)
}

  var lilypadnum = tilesWith(lilypad).length;

var paddedplayernum = tilesWith(lilypad, player1).length + tilesWith(lilypad, player2).length + tilesWith(lilypad, player3).length + tilesWith(lilypad, player4).length;

if (paddedplayernum>0) {
 frogger += 1
}
if (frogger>0) {
getFirst(player4).x += -frogger
}
})

onInput("d", () => {
movecount = movecount + 1
    if (getAll(player1).length>0) {
  getFirst(player1).type = player2 
  }
    if (getAll(player3).length>0) {
  getFirst(player3).type = player2
  }
      if (getAll(player4).length>0) {
  getFirst(player4).type = player2 
  }
  getFirst(player2).x += 1

      if (getAll(upcrate).length>0) {
  getFirst(upcrate).y += -1
  }
    if (getAll(downcrate).length>0) {
  getFirst(downcrate).y += 1
  }
    if (getAll(rightcrate).length>0) {
  getFirst(rightcrate).x += 1
  }
    if (getAll(leftcrate).length>0) {
  getFirst(leftcrate).x += -1
  }

          if (getAll(mutantgoblinup).length>0) {
  getFirst(mutantgoblinup).y += -1
  }
    if (getAll(mutantgoblindown).length>0) {
  getFirst(mutantgoblindown).y += 1
  }
    if (getAll(mutantgoblinright).length>0) {
  getFirst(mutantgoblinright).x += 1
  }
    if (getAll(mutantgoblinleft).length>0) {
  getFirst(mutantgoblinleft).x += -1
  }

    playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;
  setInterval(() =>{
 if (icedplayernum === playernum) { 

   getFirst(player2).x += 1
       playernum = tilesWith(player1).length + tilesWith(player2).length + tilesWith(player3).length + tilesWith(player4).length;


  icedplayernum = tilesWith(ice, player1).length + tilesWith(ice, player2).length + tilesWith(ice, player3).length + tilesWith(ice, player4).length;

 }
 },500)
    const holedplayernum = tilesWith(blackhole, player1).length + tilesWith(blackhole, player2).length + tilesWith(blackhole, player3).length + tilesWith(blackhole, player4).length;

  if (holedplayernum === playernum) {
getFirst(player2).remove()
addSprite(getFirst(whitehole).x,getFirst(whitehole).y,player2)
}

var lilypadnum = tilesWith(lilypad).length;

var paddedplayernum = tilesWith(lilypad, player1).length + tilesWith(lilypad, player2).length + tilesWith(lilypad, player3).length + tilesWith(lilypad, player4).length;

if (paddedplayernum>0) {
 frogger += 1
}
if (frogger>0) {
getFirst(player2).x += frogger
}
})

afterInput(() => {

  if (getAll(fire1).length>0) {
  getFirst(fire1).type = fire2 
  }
  if (getAll(fire2).length>0) {
  getFirst(fire2).type = fire1 
  }

    const targetNumber = tilesWith(goblin).length + tilesWith(bluegoblin).length + tilesWith(redgoblin).length + tilesWith(greengoblin).length + tilesWith(yellowgoblin).length + tilesWith(catgoblin).length + tilesWith(snowgoblin).length + tilesWith(voidgoblin).length + tilesWith(mutantgoblinup).length + tilesWith(mutantgoblinright).length + tilesWith(mutantgoblindown).length + tilesWith(mutantgoblinleft).length;


  const numberCovered = tilesWith(pit, goblin).length + tilesWith(pit, bluegoblin).length + tilesWith(pit, redgoblin).length + tilesWith(pit, greengoblin).length + tilesWith(pit, yellowgoblin).length + tilesWith(pit, catgoblin).length + tilesWith(pit, snowgoblin).length + tilesWith(pit, voidgoblin).length + tilesWith(pit, mutantgoblinup).length + tilesWith(pit, mutantgoblinright).length + tilesWith(pit, mutantgoblindown).length + tilesWith(pit, mutantgoblinleft).length;


  if (numberCovered === targetNumber) { 

    movecountlvl.push(movecount)

    movecount = 0

    playTune(win)

    level = level + 1;

    clearText()

    const currentLevel = levels[level];
if (level>98) {
setBackground(floor)
} else{
if (level>97) {
setBackground(forestfloor)
} else{
if (level>96) {
setBackground(seafloor)
} else{
if (level>95) {
setBackground(labfloor)
} else{
if (level>94) {
setBackground(voidfloor)
} else{
if (level>93) {
setBackground(snowfloor)
} else{
if (level>92) {
setBackground(firefloor)
} else{
if (level>91) {
setBackground(sandfloor)
} else{
if (level>90) {
setBackground(cavefloor)
} else{
if (level>89) {
setBackground(floor)
}else{
if (level>79) {
setBackground(forestfloor)
} else{
if (level>69) {
setBackground(seafloor)
} else{
if (level>59) {
setBackground(labfloor)
} else{
if (level>49) {
setBackground(voidfloor)
} else{
if (level>39) {
setBackground(snowfloor)
} else{  
if (level>29) {
setBackground(firefloor)
} else{
if (level>19) {
setBackground(sandfloor)
} else { 
if (level>9) {
setBackground(cavefloor)
} else {
setBackground(floor)
}
}
}
}
}
} 
}
}
}
}
}
}
}
}
}
}
}
}
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      frogger = 0
    } else {
      addText("Goblins Gone!", { y: 4, color: color`2` });
    }
  }

})

onInput("j", () => {
const currentLevel = levels[level];
  setMap(currentLevel);
  frogger = 0

    movecount = 0
})

onInput("i", () => {

      movecountlvl.push(movecount)

    movecount = 0
  
  frogger = 0
  level = level + 1;
  const currentLevel = levels[level];
    setMap(currentLevel);
  clearText()
if (level>98) {
setBackground(floor)
} else{
if (level>97) {
setBackground(forestfloor)
} else{
if (level>96) {
setBackground(seafloor)
} else{
if (level>95) {
setBackground(labfloor)
} else{
if (level>94) {
setBackground(voidfloor)
} else{
if (level>93) {
setBackground(snowfloor)
} else{
if (level>92) {
setBackground(firefloor)
} else{
if (level>91) {
setBackground(sandfloor)
} else{
if (level>90) {
setBackground(cavefloor)
} else{
if (level>89) {
setBackground(floor)
}else{
if (level>79) {
setBackground(forestfloor)
} else{
if (level>69) {
setBackground(seafloor)
} else{
if (level>59) {
setBackground(labfloor)
} else{
if (level>49) {
setBackground(voidfloor)
} else{
if (level>39) {
setBackground(snowfloor)
} else{  
if (level>29) {
setBackground(firefloor)
} else{
if (level>19) {
setBackground(sandfloor)
} else { 
if (level>9) {
setBackground(cavefloor)
} else {
setBackground(floor)
}
}
}
}
}
} 
}
}
}
}
}
}
}
}
}
}
}
}

})

onInput("k", () => {

    movecount = 0
  
  frogger = 0
  level = level - 1;
const currentLevel = levels[level];  
    setMap(currentLevel);
    clearText()
if (level>98) {
setBackground(floor)
} else{
if (level>97) {
setBackground(forestfloor)
} else{
if (level>96) {
setBackground(seafloor)
} else{
if (level>95) {
setBackground(labfloor)
} else{
if (level>94) {
setBackground(voidfloor)
} else{
if (level>93) {
setBackground(snowfloor)
} else{
if (level>92) {
setBackground(firefloor)
} else{
if (level>91) {
setBackground(sandfloor)
} else{
if (level>90) {
setBackground(cavefloor)
} else{
if (level>89) {
setBackground(floor)
}else{
if (level>79) {
setBackground(forestfloor)
} else{
if (level>69) {
setBackground(seafloor)
} else{
if (level>59) {
setBackground(labfloor)
} else{
if (level>49) {
setBackground(voidfloor)
} else{
if (level>39) {
setBackground(snowfloor)
} else{  
if (level>29) {
setBackground(firefloor)
} else{
if (level>19) {
setBackground(sandfloor)
} else { 
if (level>9) {
setBackground(cavefloor)
} else {
setBackground(floor)
}
}
}
}
}
} 
}
}
}
}
}
}
}
}
}
}
}
}
})

onInput("l", () => {
  
movetext = toString(moveCount)
  
addText(" done in: " + movecountlvl[movecountcount] + " moves", {
x:1,
y:3,
color: color`2`
})
  
movecountcount = movecountcount + 1   

addText(" level: " + movecountcount, {
x:1,
y:2,
color: color`2`
})
 
  })

function moveCount() {

return movecountlvl[movecountcount]
  
}
  
