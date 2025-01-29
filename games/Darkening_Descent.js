/*
@title: Darkening Descent
@author: noxi
@tags: ['role-playing','adventure']
@addedOn: 2024-07-07
*/

/* ABOUT:

Explore a randomly generated dungeon filled with enemies, secrets, and upgrades. Find a way to its rumored bottom at the core of Earth.

STAGES
I: Surface
II: Caverns
III: Hollows
*/



let testModeOn = true;

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 } // idk whuch to use is better
];


const player = "p"
const hurtplayer = "g" //game over
const mobboss = "b"
const mob = "m"
const wall = "w"
const wall2 = "v"
const wall3 = "x"
const door = "d"
const heart = "h"
const spawn = "r"
const rooftip = "a"
const grass = "f"
const housewall = "c"
const roofleft = "l"
const roofright = "z"
const roofoverhangleft = "j"
const roofoverhangright = "k"
const roofbody = "q"
const housewallleft = "e"
const housewallright = "i"
const housedoor = "n"
const spikes = "$"
const crate = "Z"
const ghost = "t"
const spider = "y"
const healingheart = "&"
const warningtile = "!"
const advancetile = "A"
const candle = "]"
const sword = "S"
const water = "B"
const fireball = "C"
const fireshooter = "D"
const commonchest = "E"
const mentor = "F"
const bridge = "G"
const mobspawner = "H"
const mobegg = "I"
const invincibility = "J"
const bossslash = "K"
const hiddenadvance = "N"
const pressureplate = "R"
const lockeddoor = "L"
const hppotion = "M"
const curse = "O"
const energydrink = "P"
const boostparticles = "Q"
const dummy = "T"
const black = "U"
const rarechest = "V"
const strengthparticles = "W"
const rocks = "X"
const lavafish = "Y"
const lavafishspawner = "%"
const brokenrocks = "@"
const bomb = "#"
const revlavafish = "^"
const bossfish = "*"
const lava = "("
const epicchest = ")"
const clock = "-"
const lifeelixir = "+"
const lightningscroll = "?"
const lightning = "~"
const hollowboss = "="
const amethyst = "<"
const skeleton = ">"
const bat = ","
const batspawner = "0"
const plasmasword = "1"
const finaldoor = "2"
const plasmaslash = "3"
const star = "4"
const purplelightning = "5"

const legendKeys = [
  hppotion,
  curse,
  energydrink,
  bomb,
  clock,
  lifeelixir,
  lightningscroll,
  plasmasword,
  heart,
  black,
  rooftip,
  roofleft,
  roofright,
  roofoverhangleft,
  roofoverhangright,
  bossslash,
  plasmaslash,
  sword,
  lightning,
  purplelightning,
  invincibility,
  strengthparticles,
  boostparticles,
  star,
  mobboss,
  hollowboss,
  lavafish,
  revlavafish,
  player,
  mentor,
  finaldoor,
  door,
  lockeddoor,
  mobegg,
  bat,
  ghost,
  dummy,
  candle,
  fireball,
  fireshooter,
  crate,
  wall,
  wall2,
  wall3,
  rocks,
  amethyst,
  lava,
  bossfish,
  mob,
  skeleton,
  spider,
  commonchest,
  rarechest,
  epicchest,
  hurtplayer,
  spawn,
  grass,
  housewall,
  housewallleft,
  housewallright,
  roofbody,
  housedoor,
  healingheart,
  spikes,
  water,
  warningtile,
  advancetile,
  mobspawner,
  lavafishspawner,
  batspawner,
  pressureplate,
  hiddenadvance,
  brokenrocks,

]


let legend = new Map();
legendKeys.forEach((key) => {
  legend.set(key, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`)
})


legend.set(black, [black, bitmap`
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
0000000000000000`])
legend.set(rooftip, [rooftip, bitmap`
................
................
................
................
................
................
................
................
................
................
.......00.......
......0330......
....00333300....
...0333333330...
.00333333333300.
0333333333333330`])
legend.set(roofleft, [roofleft, bitmap`
...............0
.............003
...........00333
..........033333
........00333333
.......033333333
.....00333333333
...0033333333333
.003333333333333
0333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000`])
legend.set(roofright, [roofright, bitmap`
0...............
300.............
33300...........
333330..........
33333300........
333333330.......
33333333300.....
3333333333300...
333333333333300.
3333333333333330
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000`])
legend.set(roofoverhangleft, [roofoverhangleft, bitmap`
................
................
................
................
................
................
................
................
................
................
..............00
............0033
..........003333
.......000333333
......0333333333
.....00000000000`])
legend.set(roofoverhangright, [roofoverhangright, bitmap`
................
................
................
................
................
................
................
................
................
................
00..............
3300............
333300..........
333333000.......
3333333330......
00000000000.....`])
legend.set(heart, [heart, bitmap`
..000......000..
.03330....03330.
0333330..0333330
0333333003322330
0333333333332230
0333333333333230
0333333333333330
0333333333333330
.03333333333330.
.03333333333330.
..033333333330..
...0333333330...
....03333330....
.....033330.....
......0330......
.......00.......`])
legend.set(healingheart, [healingheart, bitmap`
..000......000..
.03330....03330.
0333330..0333330
0333333003322330
0333333333332230
0333333333333230
0333333443333330
0333333443333330
.03334444443330.
.03334444443330.
..033334433330..
...0333443330...
....03333330....
.....033330.....
......0330......
.......00.......`]) //heart pickup
legend.set(ghost, [ghost, bitmap`
................
......0000......
....00222200....
...0222222220...
..022332233220..
..022332233220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022002022020..
..020.0200200...
...0...0..0.....`])
legend.set(bossslash, [bossslash, bitmap`
..............00
....2....222000.
....2222220000..
...22.220000..22
..202.20000..22.
.2..002000..2.2.
.2..00000..2..2.
.2..0000..2..2..
.2.2000.022..2..
...0000000..2...
..000000...2....
.00000....22....
.00...0.......22
000...0....222..
00......222.....
0...............`])
legend.set(dummy, [dummy, bitmap`
................
................
......9999......
.....909999.....
....99009009....
....99999099....
.....999999.....
......9999......
.......33.......
.....93L139.....
....9931L399....
....99.33.99....
....99.99.99....
.......99.......
.....999999.....
.....99..99.....`])
legend.set(mob, [mob, bitmap`
................
................
................
................
.....DDDDD......
....DD0D0DD.....
....DDDDDDD.....
....6DDDDD......
......C9C...20..
.....CCCCC.20...
.....CCCCC20....
.....DCCC00.....
......CCC.0.....
......C.C.......
................
................`])
legend.set(mobegg, [mobegg, bitmap`
................
......0000......
....00DDDD00....
...0DDDDDDD40...
...0DDDDDDDD0...
...0DDD4DDDD0...
..0DDD44DDDDD0..
..0DDD44DDDDD0..
..0DDDDDDD4DD0..
..0DDDDDD44DD0..
..0DD4DDD4DDD0..
..0DD44DDDDDD0..
..0DDD4DDDDDD0..
...0DDDDDDDD0...
....0DDDDDD0....
.....000000.....`])
legend.set(spider, [spider, bitmap`
................
................
................
..0...0000...0..
.0.0000000000.0.
....00000000....
...0000000000...
..000000000000..
.0..00000000..0.
....00000000....
...0000000000...
..00.090090.00..
..0..000000..0..
.....0....0.....
....0......0....
................`])
legend.set(hurtplayer, [hurtplayer, bitmap`
................
................
................
................
......LLLL......
....LLL11LLL....
....L111111L....
....L111111L....
...L00110100L...
...L010101010...
...L00110100L...
...L01010101L...
...L11111111L...
..CCCCCCCCCCCC..
.....CC.CCC.....
................`]) //grave
legend.set(crate, [crate, bitmap`
0000000000000000
01CCCCCCCCCCCC10
0CCCCCCCCCCCCCC0
0CC111CCCCCCCCC0
0CCCCC1111CCCCC0
0CCCCCCCCC111CC0
0CC11CCCCCCCCCC0
0CCCC111CCCCCCC0
0CCCCCCC111CCCC0
0CCCCCCCCCC11CC0
0CC11CCCCCCCCCC0
0CCCC111CCCCCCC0
0CCCCCCC11CCCCC0
0CCCCCCCCC11CCC0
01CCCCCCCCCCCC10
0000000000000000`])
legend.set(candle, [candle, bitmap`
................
................
................
........6.......
.......66.......
.......66.......
......6926......
......6226......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
......0000......
.......CC.......
................
................`])
legend.set(wall, [wall, bitmap`
11LL1111LL1111LL
L1LL1LL1LL1LL1LL
L1LL1LL1LL1LL1LL
L1111LL1111LL111
11LL1111LL1111LL
L1LL1LL1LL1LL1LL
L1LL1LL1LL1LL1LL
L1111LL1111LL111
11LL1111LL1111LL
L1LL1LL1LL1LL1LL
L1LL1LL1LL1LL1LL
L1111LL1111LL111
11LL1111LL1111LL
L1LL1LL1LL1LL1LL
L1LL1LL1LL1LL1LL
L1111LL1111LL111`])
legend.set(wall2, [wall2, bitmap`
1111LL1111LL1111
1LL1LL1LL1LL1LL1
1LL1LL1LL1LL1LL1
1LL1111LL1111LL1
1111LL1111LL1111
1LL1LL1LL1LL1LL1
1LL1LL1LL1LL1LL1
1LL1111LL1111LL1
1111LL1111LL1111
1LL1LL1LL1LL1LL1
1LL1LL1LL1LL1LL1
1LL1111LL1111LL1
1111LL1111LL1111
1LL1LL1LL1LL1LL1
1LL1LL1LL1LL1LL1
1LL1111LL1111LL1`])
legend.set(wall3, [wall3, bitmap`
LL1111LL1111LL11
LL1LL1LL1LL1LL1L
LL1LL1LL1LL1LL1L
111LL1111LL1111L
LL1111LL1111LL11
LL1LL1LL1LL1LL1L
LL1LL1LL1LL1LL1L
111LL1111LL1111L
LL1111LL1111LL11
LL1LL1LL1LL1LL1L
LL1LL1LL1LL1LL1L
111LL1111LL1111L
LL1111LL1111LL11
LL1LL1LL1LL1LL1L
LL1LL1LL1LL1LL1L
111LL1111LL1111L`])
legend.set(door, [door, bitmap`
LL1111LCCL1111LL
LL1LL1CFFC1LL1LL
LL1LL11FF11LL1LL
111LL111111LL111
LL111100001111LL
LL1LL0CCCC0LL1LL
LL1L0CCCCCC0L1LL
1110CCCCCCCC0111
LL10CCCCCCCC01LL
LL0CCCCCCCCCC0LL
LL0CCCCC0000C0LL
110CCCCCCCC0C011
LL0CCCCCCCCCC0LL
LL0CCCCCCCCCC0LL
LL0CCCCCCCCCC0LL
110CCCCCCCCCC011`])
legend.set(lockeddoor, [lockeddoor, bitmap`
L01616LCCL61610L
0L6L616FF616L6L0
L61LL11FF11LL16L
166LL111111LL661
6L161100001161L6
L61L60CCCC06L16L
6L1L06CCCC60L1L6
1610CC6666CC0161
6L10CC6CC6CC01L6
6L6CC666666CC6L6
L60666666666606L
616CC6612660C616
LL0CC666666CC0LL
660CC666666CC066
L60C6CCCCCC6C06L
1166CCCCCCCC6611`])
legend.set(finaldoor, [finaldoor, bitmap`
0000000000000000
02LH00H00H0LHL20
0225LH0000HL5220
0LHLL001100L2HL0
0LL0001111000LL0
0L5H01111110H5L0
0000011111100000
0LH0111111110HL0
0L011111111110L0
0H011111111110H0
0L01111111111020
0LH1111111111HL0
02011111111110L0
0L01111111111000
0H011111111110H0
0000000000000000`])
legend.set(spawn, [spawn, bitmap`
7777777777777777
7771LL1111LL1777
7177LL1LL1LL7717
71177L1LL1L77117
7LL1171LL1711LL7
7LL1LL7777LL1LL7
7LL1L7CCCC7L1LL7
71117CCC7CC71117
7LL17CC7CCC71LL7
7LL17C7007C71LL7
7LL17CC770C71LL7
71177CC7CCC77117
7L771C7C7CC177L7
7771LLCCC7LL1777
77L1LL1771LL1L77
7777777777777777`])
legend.set(mobspawner, [mobspawner, bitmap`
DDDDDDDD4DDDDDDD
DDD1LL1411LL1DDD
D1DDL41L41LLDD1D
D11DDL4L41LDD44D
DLL11D4441D444LD
DLL1LLDDDDL41L44
DL44LDCCC4DL14LD
D144DC447CCD411D
DL44DCC7CC4D4LLD
DL44DC4007CD1LLD
DLL1DCC770CD1LLD
D11D4CC74CCDD11D
DLDD147C74C1DDLD
DDD14LCCC7441DDD
DDL44L1DD1L44LDD
DDDDDDDDDDDDDDDD`])
legend.set(lavafishspawner, [lavafishspawner, bitmap`
3333333383333333
3331LL1811LL1833
8133L81LC1LL3313
31133LCLC1L33993
3LL189CCC19999L3
3LL1LLCCCCL91L99
3LCCL9CCC9CL19L3
31CC88888CC39113
3LCC88888C9398L3
3LCC889008C31LL3
3LL1888880C31LL3
311388889CC33113
3L33898C89C133L3
33388L8C88991333
33L89L8338L99L33
3333333333333333`])
legend.set(grass, [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDFDDDDDDDDD
DDDDDFDDDDFDDDFD
DDDFDFDDDFDDFFDD
DDFDDDDDDFDDDDDD
DDFDDDFDFDDDDDDD
DFDDDFDDDDDDDDFD
DDDDDFDDDFDDDFDD
DDDDDFDDFDDDDFDD
DDDDDDDDFDDDFDDD
DDDDDDDDDDDDDDDD
DDDDFDDDDDDDDDDF
DDDFDDDDDDFDDDDF
DDDFDDDDDFDDDDFD
DDDDDDDDDDDDDDFD
DDDDDDDDDDDDDDFD`])
legend.set(housewall, [housewall, bitmap`
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
CCCCCCCCCCCCCCCC`])
legend.set(housewallleft, [housewallleft, bitmap`
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC`])
legend.set(housewallright, [housewallright, bitmap`
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0`])
legend.set(roofbody, [roofbody, bitmap`
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
0000000000000000`])
legend.set(housedoor, [housedoor, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC0000000000CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC09C0666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC
CCC0990666660CCC`])
legend.set(commonchest, [commonchest, bitmap`
....00000000....
...0CCCCCCCC0...
..0CCCCCCCCCC0..
.0CCCCCCCCCCCC0.
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCFFFFCCCCC0
0CCCCCFCCFCCCCC0
01111FFFFFF11110
0CCCCFFCCFFCCCC0
0CCCCFFFFFFCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
01CCCCCCCCCCCC10
0000000000000000`])
legend.set(rarechest, [rarechest, bitmap`
....00000000....
...0999999990...
..099999999990..
.09999999999990.
0669999999999660
0996669999666990
0999996666999990
0999996996999990
0LLLL666666LLLL0
0999966996699990
0999966666699990
0999699999969990
0966999999996690
0699999999999960
0L999999999999L0
0000000000000000`])
legend.set(epicchest, [epicchest, bitmap`
....00000000....
...05L5LL5L50...
..0LL5L55L5LL0..
.0LLLLLLLLLLLL0.
0HHLLLLLLLLLLHH0
0LLHHHLLLLHHHLL0
0LL7LLHHHHLLLLL0
0LLL7LHLLHLLLLL7
07771HHHHHH17770
0L7LLHH22HHLLL70
0L77LHHHHHHLLL70
07LLHLLLLLLHLLL7
7LHHLLLLLLLLHHL0
0HL5L55LL55L5LH0
055L5L7557L5L550
0000070007700000`])
legend.set(bridge, [bridge, bitmap`
CC999CC999CC99CC
C1999CC999CC991C
CC999CC999C999CC
CC999CC99CC99CCC
CC999CC99CC99CCC
CC999CC99CC99CCC
CC999CC99CC99CCC
CC999CC99C999CCC
C9999CC9CC999CCC
C9999C99CC999CCC
C9999C99CC999CCC
CC999C99CC999CCC
CC999C99CC999CCC
CC999C99CC999CCC
C1999C99CC999C1C
CC999C99C9999CCC`])
legend.set(water, [water, bitmap`
7777777777777777
7777777777777777
7777757755575777
7755577777757777
7577777777777777
7777777777777777
7777777777777777
7577777777757757
7755557777575577
7777777777777777
7777777777777777
7777777777777777
7777577757775777
7777755577757577
7777777777777777
7777777777777777`])
legend.set(lava, [lava, bitmap`
3333333333333333
3333L33333333333
3333393399939333
33999L3333393333
3933333333333333
3333333333333333
3333333333333333
39333333333L3393
339999333393L933
3333333333333333
3333333333333333
3333333333333333
333393L393339333
33333999333939L3
3L33333333333333
33333L3333333333`])
legend.set(fireshooter, [fireshooter, bitmap`
0000000000000000
01LL00000000LL10
01L0000000000L10
0100000000000010
0100000000000010
0100LLLLLLLL0010
010LLLLLLLLLL010
000LLLLLLLLLL000
00LLLL0000LLLL00
00LLL003300LLL00
00LL00333300LL00
000L00000000L000
010LLL0000LLL010
0100LLLLLLLL0010
0110000000000110
0000000000000000`])
legend.set(spikes, [spikes, bitmap`
................
..1..........1..
..1..........1..
.101........101.
.000........000.
.....1....1.....
.....1....1.....
....101..101....
....000..000....
................
..1..........1..
..1...1..1...1..
.101..1..1..101.
.000.101101.000.
.....000000.....
................`])
legend.set(mentor, [mentor, bitmap`
...........CC...
.........CCCCC..
.....CCCCFCCCC..
....CCCCCCLL....
.....0CCCCCCC...
.....0575CCCCC..
.....015110.....
.....001100.....
......0000......
......0000......
.....000011.....
.....001111.....
.....001111.....
.....011111.....
....11111111....
...11.1.1.111...`])
legend.set(warningtile, [warningtile, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333663333333
3333333663333333
3333333663333333
3333333663333333
3333333663333333
3333333663333333
3333333333333333
3333333333333333
3333333663333333
3333333663333333
3333333333333333
3333333333333333
3333333333333333`])
legend.set(advancetile, [advancetile, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0LLLLLLLLLL0L0
0L0L00000000L0L0
0L0L0LLLLLL0L0L0
0L0L0L033300L0L0
0L0L0L300030L0L0
0L0L0L000300L0L0
0L0L0L003000L0L0
0L0L0L000000L0L0
0L0L00003000L0L0
0L0LLLLLLLLLL0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`]) // use for an open world feel in lvls, advancing to a lvl that is not in rotation, but expands upon the prev then goes into rotation
legend.set(invincibility, [invincibility, bitmap`
..777777777777..
.7.2........2.7.
7.2.........22.7
72.............7
72.............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
.7............7.
..777777777777..`])
legend.set(hiddenadvance, [hiddenadvance, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
...00..00..00...
...00..00..00...
................`])
legend.set(pressureplate, [pressureplate, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LL9CCCCCCCC9LL1
1LLC9LLLLLL9CLL1
1LLCL9LLLL9LCLL1
1LLCLL9CC9LLCLL1
1LLCLLC99CLLCLL1
1LLCLLC99CLLCLL1
1LLCLL9CC9LLCLL1
1LLCL9LLLL9LCLL1
1LLC9LLLLLL9CLL1
1LL9CCCCCCCC9LL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1111111111111111`])
legend.set(boostparticles, [boostparticles, bitmap`
................
................
.............6..
..6...........6.
.6..............
..6..........6..
................
................
................
................
................
................
................
..6F...6F...6F..
...6F...6..F6...
....6......6....`])
legend.set(strengthparticles, [strengthparticles, bitmap`
...........3...3
3.............9.
.9..............
................
................
..............9.
...............3
.3..............
................
................
3...............
................
..............3.
...........3....
..3......393....
.3.3......9...3.`])
legend.set(hppotion, [hppotion, bitmap`
................
......0000......
....00099000....
...0111991110...
...0...11...0...
....000..000....
.....0....0.....
...0003333000...
..003333322300..
.00333333323300.
.03333334333330.
.03323344433330.
.00323334333300.
..032333333330..
..002233333300..
....00000000....`])
legend.set(curse, [curse, bitmap`
......1111......
....11....11....
..FFLL66666FF6..
..FLL006600FFF..
..FL00000000FF..
..FL000000000F..
..6F00000000FF..
..6FF000000FFF..
..6FF000000FFF..
..66LF0000LFFF..
..666LF00F6LFF..
..6666LLF666L6..
..633336333366..
..3FF636366363..
..3FF3363FFF36..
..FFFFFF333FF3..`])
legend.set(bomb, [bomb, bitmap`
....333.........
..9933CC........
..693.33C.......
....33.000......
.....1000000....
....112000000L..
...11200000000L.
...12000000000L.
...12000000000L.
...00000000000L.
...00000000000L.
...00000000000L.
....000000000L..
....L0000000L...
.....LLLLLLL....
................`])
legend.set(energydrink, [energydrink, bitmap`
................
......017.......
...0000000000...
..099222222990..
..099666666290..
..099666666290..
..099666662990..
..096666662990..
..096666629990..
..096666622990..
..099666666290..
..099996666290..
..099996662990..
..099996629990..
..099996299990..
...0000000000...`])
legend.set(clock, [clock, bitmap`
..8.......FFF...
.......FFFF.F...
.....FF......F..
.H...000000..F..
..H.00L1LL00F...
...00LL1L2L00..8
H..0LLL122LL0...
.H.0111221110.H.
...0LLL2LLLL0H..
H..0LLL12LLL0.H.
...00LL1L200....
.H.H0001000..H..
..H..00000.H....
..........H.....
8...........H...
..............8.`])
legend.set(rocks, [rocks, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLL11L
LL11LL110LL001LL
LL11LL1000LL00LL
L111000L01111LLL
LLL100LLL11LLLLL
LLL10LLLLLLLLLLL
LL01LLLLLLLL0LLL
LL0LL11100LL00LL
L01111L0001111LL
L0111LL1100LLLLL
LLLLLLLL1LLL1LLL
LLLLLLLLL111L1LL
LL11000000LLL0LL
LLL10LLLL000L00L
LLLLLLLLLLLLLLLL`])
legend.set(brokenrocks, [brokenrocks, bitmap`
................
..LL............
......1..L.LLL..
L.....1...L.0L..
................
................
.......L........
..0.....L.......
.............L..
................
.0..............
............1...
.............1..
..110.LLLL......
...1.....L...00.
................`])
legend.set(lavafish, [lavafish, bitmap`
.....000000.....
....08888880....
...0883883880...
..088838838880..
..083833338380..
..083883388380..
..033333333330..
..033993399330..
..033993399330..
..033333333330..
..0L00L00L00L0..
..0L0L.L..L0L0..
.0LL0L0LL.L0LL0.
.0L0.L0.L0L.0L0.
.0L0.L0.L0L00L0.
..0.....L0...0..`])
legend.set(revlavafish, [revlavafish, bitmap`
.....000000.....
....09999990....
...0990990990...
..0999L99L9990..
..098999999890..
..0L88899888L0..
..088888888880..
..088338833880..
..088838883880..
..088888888880..
..0100100100L0..
..0L010.10L0L0..
.0LL0L.1L.L0LL0.
.0L0.L0LL0L.0L0.
.010.10000L.0L0.
01.1..1.1..1..10`])
legend.set(lifeelixir, [lifeelixir, bitmap`
..........3..3..
......CC.3.33...
......CC........
.....0000.......
....008800......
....08H280......
....0H8H20......
....0H88H0......
....0H8HH0......
....0HHH80......
....08HH80......
....08H8H0......
....08HHH0......
....08HH80......
....088HH0......
....000000......`])
legend.set(lightningscroll, [lightningscroll, bitmap`
................
....CCCLLCLCLL..
...CCLLLL666LLC.
..CCLLCL666LCC..
..CLLCC666LLCC..
..CLLL666LLLC...
.CCL6666LLLLC...
.CCL6666LLLC....
.CCCL6666LLC....
.CCCLL66LLL.....
CCCCC666LCC.....
CCC6666CCC......
CCC66CCCCC......
CCCCCCCCC.......
................
................`])
legend.set(lightning, [lightning, bitmap`
...........0....
..........060...
.........0660...
.....1..06660...
......106661....
......06660.1...
....006660...1..
...066660.......
...0666600......
....0666660.....
.....066660.....
.1.0066660......
..1666660.......
..066600........
..0661..........
...60.1.........`])
legend.set(purplelightning, [purplelightning, bitmap`
...........0....
.....77...0H0...
.......777HH0...
.....5..0HH777..
......50HHH5..7.
..777.0HHH77777.
..7.00HHH0.775..
..77HHHH0.......
...0777H00......
..7.0HH77777....
..7..0HHHH0.....
.5700HHHH0......
..57HHHH0.......
..0H7H00........
..0H75..........
...H075.........`])
legend.set(star, [star, bitmap`
.......00.......
......0550......
......0550......
.....055550.....
0000055555500000
0555555775555550
.05555557755550.
..055555577550..
...0555555750...
...0555555550...
..055555555550..
..055555555550..
.05555500555550.
.055500..005550.
05500......00550
000..........000`])
legend.set(plasmaslash, [plasmaslash, bitmap`
...............4
..4...........44
..4HH......22H55
..25H.....22545.
..25H.....2H555.
..25H....2HH55..
..25.H..22H55...
..255H222H55....
..225H2HH555....
...225HH555.....
....25H55.......
....HH55........
...H5522H.......
..H55..225H4....
...5.....22224..
................`])
legend.set(amethyst, [amethyst, bitmap`
HHHHHHHHHHHHHHHH
H12H11HH2HH22HHH
H212HH111HH1L2HH
HHLHLL2HHHHHHH2H
HHHLHHHLHHHHHHHH
HHHHH11LLHHLLL1H
HHLLLLHH1HLL2L1H
HH11HH1HLLHHH1HH
HHH1HHHHHHHHL1HH
H2HHHHHHHHH1LHHH
HH2HHLLHHH11LHHH
HHHLLLL1HH1HLHLH
HH12HHHH1LHHHLHH
HHL12HHHLHHHHLHH
HLLHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`])
legend.set(skeleton, [skeleton, bitmap`
....00000000....
...0111111110...
...0110111010...
...0101101100...
...0111111110...
....01110010....
.....000000.....
....011111100...
...0LLLLLLLL0.L.
..001111111L00L.
.L0LLLLLLLL000L.
LL0L11111LL0FFFF
L.000000000..FF.
...00...00...FF.
....0...0.....F.
....0...0.....F.`])
legend.set(bat, [bat, bitmap`
................
...0........0...
..0000....0000..
..0LL000000LL0..
.00LLLLLLLLLL00.
.00LL77LL77L000.
0H00LLLLLLL0HH00
0HHH00LLLL0HHHH0
0HHHH00LL00HHHH0
0HHHHH0LL0HHHHH0
0HHHH00LL00HHHH0
0HH00.0LL0.00HH0
0HH0..0LL0..0HH0
0H0...0LL0...0H0
.0....0LL0....0.
.......00.......`])
legend.set(batspawner, [batspawner, bitmap`
HHHHHHH7HHHHHHHH
HH710011710L1HHH
H1000010L000HH07
H8802000L00HH00H
HL888H02020200LH
55L18LH2222720LH
HL51L02H0227020H
H115H20HHH2H002H
HL52H50HH2HH000H
HL002050H22HH22H
H000H022HH222HHH
H11HH005H2HHH0HH
HLHH1057CH7HHH7H
HHH15577CH0HHHHH
HHL55L7HHHL7HLHH
HHHHHHHHHHHHHHHH`])
legend.set(plasmasword, [plasmasword, bitmap`
...5555.....000.
.......555.0HH0.
.........55H9H0.
.........055H0..
........0H95H0..
.555...0H99H5...
..555.0H990055..
...5.0H99H0..5..
00..0HHH00...5..
01005HHH0.555...
0110H5H0........
01119H50........
.01110.55.......
.0011100.55.....
00000110...555..
00..0000........`])




const frames = {
  [player]: {
    "LEFT": [player, bitmap`
................
................
.....00.........
....0L00........
....L6000.......
....LL000.......
....LL000.......
.1...000C0......
..1..00CC00.....
..11.0CC000.....
...19CC00000....
....L9CCC0000...
.....000000000..
.....000000000..
.....00000000000
....CC00CC.0000.`],
    "RIGHT": [player, bitmap`
................
................
.........00.....
........00L0....
.......0006L....
.......000LL....
.......000LL....
......0C000...1.
.....00CC00..1..
.....000CC0.11..
....00000CC91...
...0000CCC9L....
..000000000.....
..000000000.....
00000000000.....
.0000.CC00CC....`],
    "UP": [player, bitmap`
................
................
......0000......
.....000000.....
.....000000.....
....00000000....
....00000000....
.....000000.....
.1...C00000.....
.11.00C00000....
..19000CC000....
...0000CC0000...
...000CCCC000...
..000000000000..
.0000000000000..
00000CC00CC000..`],
    "DOWN": [player, bitmap`
................
................
......0000......
.....00LL00.....
.....0LLLL0.....
....006LL600....
....00LLLL00....
.....0LLLL0....1
.....00000C...11
....0000CC00.11.
....000C000011..
...000C000099...
...00CCCCCCL0...
..000000000000..
..000000000000..
.0000CC00CC0000.`]
  },
  [sword]: {
    "RIGHT": [sword, bitmap`
..111...........
..1111..........
....1111........
......1112......
.......112......
........12......
........112.....
........112.....
........11......
........12......
........12......
.......12.......
.......12.......
......112.......
.....1222.......
....1212........`],
    "LEFT": [sword, bitmap`
........2121....
.......2221.....
.......211......
.......21.......
.......21.......
......21........
......21........
......11........
.....211........
.....211........
......21........
......211.......
......2111......
........1111....
..........1111..
...........111..`],
    "UP": [sword, bitmap`
................
................
................
................
................
................
......22........
...22211122.....
...111111112222.
..111......11122
..11.........121
.11...........12
111............1
11..............
11..............
................`],
    "DOWN": [sword, bitmap`
................
..............11
..............11
1............111
21...........11.
121.........11..
22111......111..
.222211111111...
.....22111222...
........22......
................
................
................
................
................
................`]
  },
  [mobboss]: {
    "NORM": [mobboss, bitmap`
......6.6.6.....
......66366.....
......DDDDD.....
.....D0DD0D.....
..00.DDDDDD.00..
..000.DD0D.000..
...066DDDDDD0...
...DD666DDDDD...
..DDDDD66DDDDD..
.DDDDDDD66DDDDD.
.DD.DDDDD66D.DD.
.DDD.CC66CC.DDD.
..DD.CCCCCC.DD..
......DDDD......
....DDD..DDD....
...DDDD..DDDD...`],
    "RAGE": [mobboss, bitmap`
......6.6.6.....
......66366.....
......DDDDD.....
.....D3DD3D.....
..00.3DDDD3.00..
..000.DD0D.000..
...066DDDD4D0...
.DDDD666444DDDD.
.DDDDDD44DDDDDDD
DDDDDD4466DDDDDD
DDD.DD4DD66D.DDD
DDDD.C466CC.DDDD
DDDD.4CCCCC.DDDD
.DDD.DDDDDD.DDD.
....DDDDDDDD....
...DDDD..DDDD...`],
  },
  [fireball]: {
    "L": [fireball, bitmap`
...........3..3.
....3....3.33.3.
....3.3.393.93.3
..3.3.3.3933993.
...393..3933993.
...393.39939993.
...393399939993.
..3993999939993.
..3999999966993.
..3999669666933.
..3996666666933.
..3996666666993.
..399666666693..
..333666336933..
....333333333...
................`],
    "R": [fireball, bitmap`
..3..3..........
..3.33.3....3...
.3.39.393.3.3...
..3993393.3.3.3.
..3993393..393..
..39993993.393..
..399939993393..
..3999399993993.
..3996699999993.
..3396669669993.
..3396666666993.
..3996666666993.
...396666666993.
...339633666333.
....333333333...
................`],
  },
  [bossfish]: {
    "NORM": [bossfish, bitmap`
LL.0000000000...
11003933339300..
100399933999300.
103993933939930.
103933399333930.
109933333333990.
103303333330330.
1030666336660311
L030666336660313
.033333033333311
.0333333333333L.
.LL3L33LL33LL3L.
.L3LL333LL33L3LL
LL3L3LL33L33LL0L
L0LL0L0L0LLL0L.L
.LL1LL1LL..L.LL.`],
    "RAGE": [bossfish, bitmap`
33.0000000000...
11003933339300..
100000933999300.
103990033939930.
103933009333930.
109933300333990.
L03309330033330.
1030666330000311
L030666330000319
L033393333333011
.0339330033333L.
.LL3L333333LL3L.
.L3LL333LL33L3LL
LL3L3LL33L33LL0L
30LL0L0L0LLL0L.3
.3L13L1L3..L.L3.`],
  },
  [hollowboss]: {
    "NORM": [hollowboss, bitmap`
.......000......
.....00HH00.....
....00HL1H00....
....0HLL11H00...
...00L7LL11H0...
...0LLLLLL100...
...00CCCCCC0....
....00CCC00.....
.....00000......
.....10L0011....
....1H0000011...
...1H00L00H01...
..1LH00000H011..
.1HH1000001H01L.
11H1HH000HH1H11L
1H1HH77777H1HH01`],
    "CHARGE": [hollowboss, bitmap`
5...5..000..5..5
.5....0HH00...5.
....00H11H00....
..550H1111H005..
.5500111L11H055.
.55011L1LL10055.
55500LL0LLL05555
555H00LLLL05555H
555H500CCCC55555
55555H0LCCCH5555
5555HH000C0HH555
555H500L0C50H555
.5HLH00000H0HH5.
.H55H00000H50HL.
..5H5500055H55..
5..55777775H5..5`],
    "RAGE": [hollowboss, bitmap`
...........0....
....01111100....
....1111111.....
....11L1L111..L.
L..11L7LL5L10LLL
LL.01LLLLL100LHL
LHL00CCCCCC0LHHL
LHHH00CCC00HHHHL
LH11H00000H11HHL
LLHHH10L001HHLL.
.LL000000001L...
...1H00L00LL1...
..1LH00000H011..
.1HH1000001H01L.
11H1HH000HH1H11L
1H1HH77777H1HH01`],
  }

}

legend.set(player, frames[player].DOWN)
legend.set(sword, frames[sword].DOWN)
legend.set(mobboss, frames[mobboss].NORM)
legend.set(fireball, frames[fireball].L)
legend.set(bossfish, frames[bossfish].NORM)
legend.set(hollowboss, frames[hollowboss].NORM)


setLegend(...legend.values())


const commonLootPool = [hppotion, energydrink, curse]
const rareLootPool = [bomb, clock, lightningscroll]
const epicLootPool = [lifeelixir] // i want plasma sword to only be boss

const breakablesArray = getAll(mobegg)

// function to set the player sprite based on the direction
function setPlayerSprite(direction) {
  legend.set(player, frames[player][direction]);
}


setSolids([dummy, amethyst, black, lockeddoor, rocks, wall, wall2, wall3, fireshooter, crate, housewall, housewallleft, housewallright, roofbody, player, mentor, mobegg])

const mentorDialogue = [
  "Move: w,a,s,d",
  "Sword: i,j,l",
  "Item: k",
  "Face enemies,",
  "collect items,",
  "grow stronger."
]

let activeEnemies = [] //  include their hp and type


let level = 1 // starting level (index 1 in this case)
const levels = [ // surface lvls
  // mentor (interior) lvl0
  map`
ccccccccc
ccccccccc
cccccciAe
cccccci.e
cccccciFe
cccccci.e
ccccccipe`,

  map`
fffffffvGv
fffffffv!v
ffaffffvGv
jlqzkffvdv
feciffffff
feniffffff
ffffffffff
ffpfffffff`, //start

  // enemy lvls
  map`
xwvdvxw
xw.mmxw
x.....w
x.m.m.w
xw...xw
xw...xw
xw.p.xw`, //goblin corridor 2
  map`
wNNNNxwvx
w......tx
w.$w..w.x
w.t...w.x
w..w..$.x
wGZw..w.x
wvxwvpwdx`, // first hidden advnace 3
  map`
wvdvxwvx
wt....mx
w.$.$$.x
w$..y..x
w...$$.x
w.$....x
w.$.$.$x
wvxwvpvx`,
  map`vxwvxwvxwvxwvxw
vfwdxfffffffffw
vfgfgfffffffffw
vfffffffffffffw
vfggfgggfgffffw
vfffffffffffffw
vfffgfgfffffffw
vfgfffffffffffw
vfffffffffffvfw
vffgfffgfgffvfw
vfffffffffffvfw
vxwvxwvxwvxwvpw`, //ghost graveyard 5
  map`
fBBBdvxw
BBBfffff
BBfffmff
vGGGffff
vGGGBBBB
vfffBBBB
RfZfffff
vxwvpfff`, // river bridge down with pressureplate 6
  map`
wvxwvdvxwv
vv....y.vv
w.y......v
w....y...v
wy.......v
w......y.v
wv.y....vv
wvxwvpvxwv`, // spiders lots
  map`
BBBB
wvxw
wAdw
wy.w
w..w
p..w`,
  map`
BxwvdvxwB
Bx..y..wB
BBt...tBB
BB..v..BB
BB.vEv.BB
BBt...tBB
BB.....BB
BB..p..BB`, // hp pot chamber 9 

  map`
vdvvwvx
BZ.m.Zx
BZ...Zx
BZ....x
H.....x
v....Zx
B....vx
B...Z.x
Bm..ZZx
xwvxwpx`, // 10  spawenr of mobs crates
  map`
vxwvxpvBBB
vxwBB.BBBB
vxBBB.BBBB
N..m...BBB
v....m.BBB
vxw....BB.
vxwvxwdxB.`, //pickup to edrink or continue  11
  map`
vxwvxpwvZ
vxw....mZ
vx...m..Z
vH......Z
vx...xwvZ
vxw.y..vZ
vxwvxwdvZ`, //  spawner of mobs smaller chamber 12
  map`
vxwdxwv
vT...Tv
v..m..v
vT...Tv
vxw.xwv
vm...mv
v.m.m.v
v.....v
v.....v
v..p..v`, // double static chamber with dummies 13 
  map`
xwvdvxw
x$...$w
x$.E.$w
x$.t.$w
x$...$w
xwvpvxw`, // hidden advance connector from 3 (14) 
  map `
wvxwvxwv
w$$$$y.v
dE$$$..p
w.y$$$.v
wvxwvxwv`, // hidden advance from 11 (15)
  map`
vdvxwvx
v$vxwRx
m....mx
..Z...x
......x
vpvxwvx`, //crate to get rid spikes, but u have goblins


  //bosses
  map`
xwvxwLxwvxw
x.........w
x....b....w
x.........w
x.........w
x.........w
x.........w
xwvxwpxwvxw`, // first boss; 17
  map`
xAwvxw
x..EFw
x....w
x....w
xTTT.w
xwvxpw`, //boss rush intermediary 18
]
const caverns = [
  map`
XAXxwvxw
v..&V..w
v......w
v......w
v......w
vvvxwvpw`, // transition level from surface 0
  map`
wdxDXXXX
w...$$XX
w$$.$$$X
w$$....x
w$$.$$$x
X$$....x
XX$.$.$x
XXXwvpvx`, // 1 fire shooter
  map`
wvdvxXXXXX
XX$...CCCX
.t..tCCC.X
.Z..CCC..X
XX.CCC.Z.R
XXCCC....X
XRCCXXXvpv`, // crate push to remove fire
  map`
vdXXXXXXX
v..X.Y.DX
vX......X
vXXXXXX.X
vX......X
X.......X
XXpXXXXXX`,
  map`
wvdDXXXXXX
fff..X&XXX
BfX.XXXXAX
Bff.XX.y.X
Bff..y...X
fXX......X
XXX.....gX
XXXXXXpXXX`, // 4 advance portal to secret? also bombs can blow up rocks to reveal heart
  map`
vxwvdXXXXX
VY.......%
v........X
CCCCCCC@CC
CC@@@@@@CC
CCZCCCCCCC
..........
XXXXXXpXXX`, //  advance portal from 5 (bl)
  map`
XxwvxwX
XxwpxwX
Xx...wX
Xx...wX
X.....X
X$....X
Xm$...X
N^....X`, // 6 hidden advance to second chamber 
  map`
XdX%XXXXXX
........EX
XXXX....XX
mvmwg.g..X
CvCw.....X
wvxw.....X
mvmwg....X
CvCw.....p`, // 7 hidden advance from  but also noramlly accsisble cuz goblin kill's sad and ghosts out of graves
  map`
vdXXX
X.YXX
X(.(X
X(.(X
X(.(X
X(.(X
X(.(X
X(.(X
X(.(X
XXpXX`, // 8 one thing lava walkway
  map`
Xd.XX((XXX
XXt((t(tCC
XXt((..(C.
XXt....(..
XX.(C..(..
XX.((.....
(X^...(..p`, //ghosts and lava
  map`
XpXDXXXX
..v.m..d
Z.v.m..X
..XXXXXX
R.(((((Y`, // crate with more goblin jail
  map`
vdvXXXX
v>...XX
vxw...X
V.X...$
v..y...
((.....
X((Xy..
X((X..p`, //skeleton
  map`
XXX%XXXX
XXX...XX
X@....@@
X.XXX@@.
X.X@@..@
X.X@.@..
N>X@..vp`, //12 this is lil skellies of 13 and spawner
  map`
Xvd.DXv
X.X...v
X.>..$v
X.X$..v
X.m..$v
X.X...v
X.....v
X.p.XEv`,
  map`
X....L...XXX
............
............
.....*......
............
............
............
............
XX...p.....X`, //fishboss 14 for now
]
const fishbosslvl = 14


const hollows = [
  map`
<A<<<XXX
<..&).@X
<@.....X
X@@....w
X@@....w
XXXXwvpw`, //transition lvl from caverns (stage 3, index 0)
  map`
<UDd%U<UU
U...XX..U
U<......<
<<.<.<<.U
U..<..<.U
<..<....<
<....<..U
vp<<<<U<U`,
  map`
XXvLX<<<
<XX.XX<<
<<.....<
<...,..<
<.....,<
<,.....<
<......<
<.....,<
<......<
<<.....<
<<....<<
<<<pv<<<`, // crate 2
  map`
XXvLX<<<
<XX.XX<<
<<.....<
<...,..<
<.....,<
<,.....<
<......<
<.....,<
<......<
<<.....<
<<....<<
<<<pv<<<`, // bat amethyst cave with clearing it
  map`
.....XX<<
..X..(X0<
B.X..((((
BGBB.((((
BGBB..(((
.GEB..(((
.GBBB..(X
dvBBB...p`, // 4
  map`
<<<<<vLvxwv
<<<.......v
<<........v
<.>...>...v
<.........v
<<].......v
<XX$@.....<
<<XXvxwvp<<`,
  map`
UX<N<(<((
<X...>..(
U<...X..(
c<.y...X(
<U.X.y..(
U<...X.y(
<c...p..X
UUcUUUUUU`, // 6 adv portal to 7
  map`
(<D0R<<<(
((((G(<<(
X.(XGX<<t
X..TGVXT.
X.@]Z@@].
(X$@@.@@.
(L@@.p.@$`, // 7 via 6
  map`
<U<U<U<v<U<
<<<<<<<v<<d
....<..m..^
........C..
.......<.,.
p..<Cy....<`,
  map`
X.&B<d<<<<<
H.Bfffff<<<
ffffff<.<<<
XXX<<<...0<
.X.......<<
........(X<
......((((%
p...X((((((`, // 9
  map`
UUUU2UUUU
UUU..FUUU
UU.....UU
UU..@..UU
UUU...UUU
UUUUpUUUU`, // 10 hollowsPreFightLvl
  map`
<<<<<vLv<<<<<
<<.........<<
<.....=.....<
<...........<
<...........<
<...........<
<...........<
<...........<
<<<<<<p<<<<<<`, //the final boss 11 
  map`
UUUUUUUU
UUUUUUUU
UUUUUUUU
UUUUUUUU
UUUUUUUU
UUUpUUUU`, // victory level

]
const hollowsPreFightLvl = 10

let traptriggered = false;
let crateonplate = false;

let randomPickBlacklist = [
  0, 1, 9, 14, 15, 17, 18
] // for surface

setMap(levels[level]); // only for init


function putGrassUnderRoofs() { // and under the player 
  let grassUnderRoof = getAll(rooftip);
  grassUnderRoof.forEach(rooftip => {
    addSprite(rooftip.x, rooftip.y, grass);
  })

  grassUnderRoof = getAll(roofleft)
  grassUnderRoof.forEach(roofleft => {
    addSprite(roofleft.x, roofleft.y, grass);
  })
  grassUnderRoof = getAll(roofright)
  grassUnderRoof.forEach(roofright => {
    addSprite(roofright.x, roofright.y, grass);
  })
  grassUnderRoof = getAll(roofoverhangleft)
  grassUnderRoof.forEach(roofoverhangleft => {
    addSprite(roofoverhangleft.x, roofoverhangleft.y, grass);
  })
  grassUnderRoof = getAll(roofoverhangright)
  grassUnderRoof.forEach(roofoverhangright => {
    addSprite(roofoverhangright.x, roofoverhangright.y, grass);
  })

  addSprite(2, 7, grass);



}
putGrassUnderRoofs() // and under the player (init)

function putGrassGraveyardLvl() {
  let tombstones = getAll(hurtplayer);
  tombstones.forEach(hurtplayer => {
    addSprite(hurtplayer.x, hurtplayer.y, grass);
  })


}

function levelSpecificStuff() {
  //decorative and functional
  if (level === 5 && stage === 1) {
    putGrassGraveyardLvl();
  }
  if (level === 6 && stage === 1) {
    let z = getFirst(mob)
    let c = getFirst(crate)
    addSprite(z.x, z.y, grass)
    addSprite(c.x, c.y, grass)
    for (let i = 1; i < 4; i++) {
      for (let j = 3; j < 5; j++) {
        addSprite(i, j, water)
      }
    }
  }
  if (level === 4 || level === 7) {
    if (stage === 1) {
      addSprite(width() - 1, 4, candle);
      addSprite(4, 0, candle);
      addSprite(0, 3, candle);
    }
  }
  if (level === 2 && stage === 1) {
    addSprite(width() - 2, 4, candle);
    addSprite(1, 4, candle);
  }
  if (level === 10 && stage === 1) {
    addSprite(width() - 1, 4, candle);
    addSprite(width() - 1, 6, candle);
  }
  if (level === 13 && stage === 1) {
    addSprite(2, 4, candle);
    addSprite(4, 4, candle);
  }
  if (level === 16 && stage === 1)
    addSprite(3, 1, candle);
  if (level === 0 && stage === 2) { //caverns lvl tho with the fireshooter
    addSprite(0, 1, candle);
    addSprite(7, 3, candle);
    addSprite(4, 5, candle);
  }
  if (level === 4 && stage === 2) {
    /* spawnLavaFishMob(3, 3, 5); 
    console.log("SPAWNED LVF") */
  }
  if (level === 5 && stage === 2) {
    addSprite(0, 0, candle)
  }
  if (level === 0 && stage === 3) {
    addSprite(2, 0, candle)
  }
  if (level === hollowsPreFightLvl && stage === 3) {
    addText("At last... \navenge me", {
      x: 2,
      y: 3,
      color: color`9`
    })
    let finalitem = plasmasword
    addSprite(getFirst(brokenrocks).x, getFirst(brokenrocks).y, finalitem)
    if (health < maxhealth)
      addSprite(getFirst(mentor).x, getFirst(mentor).y + 1, healingheart)

  }
  /*  if (level < 9) {
let decowall = getAll(wall2);
     for (let i = 0; i < 3; i++) {
    let rngpick = Math.floor(Math.random() * decowall.length)
    addSprite(decowall[rngpick].x,decowall[rngpick].y,candle);
    rngpick = Math.floor(Math.random() * decowall.length)
    } */ // rng picking thing for candles


}


//sfx and music
const hit = tune`
500: C4/500 + B4/500 + C5/500 + D5~500 + B5^500,
15500`
const hitEnemy = tune`
201.79372197309414,
67.26457399103138: C5~67.26457399103138,
67.26457399103138: C4/67.26457399103138 + G4/67.26457399103138 + B5/67.26457399103138,
1816.1434977578474`
const killEnemy = tune`
104.8951048951049,
104.8951048951049: C4/104.8951048951049,
104.8951048951049: C5~104.8951048951049 + B4^104.8951048951049 + C4/104.8951048951049 + G4/104.8951048951049 + B5/104.8951048951049,
104.8951048951049: F5/104.8951048951049,
104.8951048951049: E5^104.8951048951049,
2832.1678321678323`
const bossRage = tune`
326.0869565217391: D5^326.0869565217391 + G4^326.0869565217391 + C5-326.0869565217391 + B4-326.0869565217391 + A4-326.0869565217391,
326.0869565217391: A5-326.0869565217391 + G5-326.0869565217391 + F5-326.0869565217391 + E5^326.0869565217391 + B5^326.0869565217391,
326.0869565217391: A5-326.0869565217391 + G5-326.0869565217391 + F5-326.0869565217391 + B5^326.0869565217391 + E5^326.0869565217391,
326.0869565217391: E5-326.0869565217391 + D5-326.0869565217391 + C5-326.0869565217391 + F5^326.0869565217391 + B4^326.0869565217391,
9130.434782608696`
const killBoss = tune`
211.26760563380282: G4-211.26760563380282 + B4-211.26760563380282 + D5-211.26760563380282 + F5-211.26760563380282,
211.26760563380282: F5-211.26760563380282 + D5-211.26760563380282 + B4-211.26760563380282 + G4-211.26760563380282,
211.26760563380282: D5-211.26760563380282 + G4-211.26760563380282 + B4-211.26760563380282 + F5-211.26760563380282,
211.26760563380282: F5-211.26760563380282 + D5-211.26760563380282 + B4-211.26760563380282 + G4-211.26760563380282,
211.26760563380282: F5-211.26760563380282 + B4-211.26760563380282,
211.26760563380282: G5-211.26760563380282 + C5-211.26760563380282,
211.26760563380282,
211.26760563380282: G5/211.26760563380282 + C5/211.26760563380282 + E5/211.26760563380282 + G4/211.26760563380282 + C4/211.26760563380282,
5070.422535211268`
const enemySpawn = tune`
112.78195488721805: B4^112.78195488721805 + C4^112.78195488721805 + G4^112.78195488721805 + E5^112.78195488721805,
112.78195488721805: D4^112.78195488721805 + A4^112.78195488721805 + C5~112.78195488721805 + F5^112.78195488721805,
112.78195488721805: E4^112.78195488721805 + B4^112.78195488721805 + E5^112.78195488721805,
3270.6766917293235`
const cratebreak = tune`
124.48132780082987: F4-124.48132780082987 + G4-124.48132780082987 + D4-124.48132780082987 + E4-124.48132780082987 + A4-124.48132780082987,
124.48132780082987: G4-124.48132780082987 + D4-124.48132780082987 + C4-124.48132780082987,
124.48132780082987: G4~124.48132780082987,
3609.9585062240662`
const gameoversound = tune`
78.3289817232376: B5-78.3289817232376 + C4~78.3289817232376 + F4~78.3289817232376,
78.3289817232376: A5-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: G5-78.3289817232376 + C4~78.3289817232376 + F4~78.3289817232376,
78.3289817232376: F5-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: E5-78.3289817232376 + C4~78.3289817232376 + F4~78.3289817232376,
78.3289817232376: D5-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: C5-78.3289817232376 + C4~78.3289817232376 + F4~78.3289817232376,
78.3289817232376: B4-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: A4-78.3289817232376 + C4~78.3289817232376 + F4~78.3289817232376,
78.3289817232376: G4-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: F4-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: E4-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: D4-78.3289817232376 + C4~78.3289817232376,
78.3289817232376: C4-78.3289817232376 + B5~78.3289817232376 + B4~78.3289817232376,
1409.9216710182768`
const danger = tune`
161.29032258064515,
161.29032258064515: F5-161.29032258064515 + D5-161.29032258064515,
161.29032258064515: G5/161.29032258064515 + C5/161.29032258064515 + A5/161.29032258064515 + B5/161.29032258064515 + B4/161.29032258064515,
161.29032258064515: D5-161.29032258064515 + E5-161.29032258064515 + B4-161.29032258064515 + C5-161.29032258064515 + F5-161.29032258064515,
4516.129032258064`
const bombTick = tune`
340.90909090909093: D4~340.90909090909093 + C4~340.90909090909093,
340.90909090909093,
340.90909090909093: C4~340.90909090909093 + D4~340.90909090909093,
340.90909090909093,
340.90909090909093: D4~340.90909090909093 + C4~340.90909090909093,
340.90909090909093,
340.90909090909093: F4^340.90909090909093,
340.90909090909093: B4-340.90909090909093 + C5-340.90909090909093 + A4/340.90909090909093 + B5/340.90909090909093 + G4/340.90909090909093,
8181.818181818182`

const heal = tune`
223.88059701492537: E4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: A4~223.88059701492537 + E4^223.88059701492537 + C5^223.88059701492537 + E5^223.88059701492537 + C4^223.88059701492537,
223.88059701492537: C4~223.88059701492537 + E5^223.88059701492537 + A5^223.88059701492537 + C5/223.88059701492537 + G5/223.88059701492537,
6492.537313432836`
const boostStart = tune`
222.22222222222223: C4~222.22222222222223 + E4^222.22222222222223 + G4/222.22222222222223,
222.22222222222223: G4^222.22222222222223 + C5~222.22222222222223 + D5^222.22222222222223 + F5/222.22222222222223,
6666.666666666667`
const boostEnd = tune`
222.22222222222223: C5~222.22222222222223 + G4^222.22222222222223 + E5/222.22222222222223,
222.22222222222223: E4^222.22222222222223 + C4^222.22222222222223 + D4~222.22222222222223 + G4/222.22222222222223,
6666.666666666667`

const secret = tune`
250: C4~250,
250: E4^250,
250: G4-250,
250: C5/250,
7000`

const getItem = tune`
89.55223880597015,
89.55223880597015: A4~89.55223880597015 + B4^89.55223880597015,
89.55223880597015: C5^89.55223880597015 + E5^89.55223880597015,
89.55223880597015: A5-89.55223880597015,
2507.4626865671644`

const clockTick = tune`
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
500,
500: C4~500,
12500`
const lightningStrike = tune`
234.375: D4/234.375 + E5/234.375 + F5/234.375 + C5-234.375 + B5-234.375,
7265.625`
const starFall = tune`
149.2537313432836: B5-149.2537313432836 + B4-149.2537313432836,
149.2537313432836: E5-149.2537313432836 + E4-149.2537313432836,
149.2537313432836: C5-149.2537313432836 + C4-149.2537313432836,
149.2537313432836,
149.2537313432836: A5-149.2537313432836 + A4-149.2537313432836,
149.2537313432836: D5-149.2537313432836 + D4-149.2537313432836,
149.2537313432836: B4-149.2537313432836,
3731.34328358209`

const slash = tune`
94.33962264150944,
94.33962264150944: E5~94.33962264150944,
94.33962264150944: B5^94.33962264150944 + E5^94.33962264150944 + G5^94.33962264150944 + F5^94.33962264150944 + A5^94.33962264150944,
2735.8490566037735`
const plasmaOn = tune`
206.89655172413794: C4/206.89655172413794 + E4/206.89655172413794 + G4/206.89655172413794 + B4/206.89655172413794,
206.89655172413794: F5/206.89655172413794 + A5/206.89655172413794 + B4/206.89655172413794 + C5/206.89655172413794,
206.89655172413794: A5/206.89655172413794 + F5/206.89655172413794 + C5/206.89655172413794 + B4/206.89655172413794,
206.89655172413794: A5/206.89655172413794 + F5/206.89655172413794 + C5/206.89655172413794 + B4/206.89655172413794,
5793.103448275862`

const advancelvl = tune`
118.57707509881423: C4-118.57707509881423,
118.57707509881423: C4-118.57707509881423,
118.57707509881423: C4-118.57707509881423,
3438.735177865613`

const villagebgm = tune`
238.0952380952381: C4~238.0952380952381,
238.0952380952381: D4~238.0952380952381,
238.0952380952381: E4~238.0952380952381 + C5~238.0952380952381,
238.0952380952381,
238.0952380952381: C4~238.0952380952381,
238.0952380952381: D4~238.0952380952381,
238.0952380952381: E4~238.0952380952381 + D5~238.0952380952381,
238.0952380952381,
238.0952380952381: C5~238.0952380952381 + G4^238.0952380952381 + C4^238.0952380952381,
238.0952380952381: D5~238.0952380952381,
238.0952380952381,
238.0952380952381: G4~238.0952380952381,
238.0952380952381: C5~238.0952380952381 + F4^238.0952380952381,
238.0952380952381: E5~238.0952380952381,
238.0952380952381: G4^238.0952380952381,
238.0952380952381: G4~238.0952380952381,
238.0952380952381,
238.0952380952381: C4~238.0952380952381 + G4~238.0952380952381 + F4^238.0952380952381,
238.0952380952381,
238.0952380952381: A4~238.0952380952381 + C5~238.0952380952381,
238.0952380952381: B4~238.0952380952381,
238.0952380952381: C4^238.0952380952381 + D4~238.0952380952381 + F4~238.0952380952381 + A4~238.0952380952381,
238.0952380952381,
238.0952380952381: C4~238.0952380952381 + E4~238.0952380952381 + G4~238.0952380952381,
238.0952380952381,
238.0952380952381: F4^238.0952380952381,
238.0952380952381: C4~238.0952380952381 + G4~238.0952380952381,
238.0952380952381: F4^238.0952380952381,
238.0952380952381: C4~238.0952380952381 + G4^238.0952380952381,
238.0952380952381: G4~238.0952380952381 + B4^238.0952380952381,
238.0952380952381,
238.0952380952381: C5^238.0952380952381 + C4^238.0952380952381`
const cavernsbgm = tune`
260.8695652173913: C4^260.8695652173913 + E4^260.8695652173913 + G4^260.8695652173913 + D5~260.8695652173913,
260.8695652173913: C5/260.8695652173913,
260.8695652173913: B4~260.8695652173913 + D5/260.8695652173913,
260.8695652173913,
260.8695652173913: B4/260.8695652173913 + G4/260.8695652173913 + E4~260.8695652173913 + C4/260.8695652173913,
260.8695652173913: A4~260.8695652173913 + C5~260.8695652173913 + E4~260.8695652173913,
260.8695652173913: B4~260.8695652173913,
260.8695652173913: A4~260.8695652173913,
260.8695652173913: G4^260.8695652173913 + B4^260.8695652173913 + E4~260.8695652173913 + C5~260.8695652173913 + E5/260.8695652173913,
260.8695652173913: C5~260.8695652173913 + D5/260.8695652173913,
260.8695652173913: B4^260.8695652173913 + C5/260.8695652173913,
260.8695652173913: A4^260.8695652173913,
260.8695652173913: G4^260.8695652173913,
260.8695652173913: C5/260.8695652173913 + E5~260.8695652173913 + G5~260.8695652173913 + F4/260.8695652173913 + A4/260.8695652173913,
260.8695652173913,
260.8695652173913: C5~260.8695652173913 + A4~260.8695652173913 + E4~260.8695652173913,
260.8695652173913: C4~260.8695652173913 + E4~260.8695652173913 + G4~260.8695652173913 + C5^260.8695652173913 + D5/260.8695652173913,
260.8695652173913: B4~260.8695652173913 + E5/260.8695652173913,
260.8695652173913: C5~260.8695652173913 + G5/260.8695652173913,
260.8695652173913: C5~260.8695652173913 + F5/260.8695652173913,
260.8695652173913: C5~260.8695652173913 + E5/260.8695652173913,
260.8695652173913: C4~260.8695652173913 + G4~260.8695652173913 + C5^260.8695652173913 + F5/260.8695652173913,
260.8695652173913: C5^260.8695652173913 + E5/260.8695652173913,
260.8695652173913,
260.8695652173913: C5/260.8695652173913 + E5/260.8695652173913 + A4~260.8695652173913 + C4~260.8695652173913,
260.8695652173913: C5/260.8695652173913 + F5/260.8695652173913 + A4/260.8695652173913,
260.8695652173913: C5/260.8695652173913 + G5^260.8695652173913 + A4/260.8695652173913 + C4~260.8695652173913,
260.8695652173913: G4^260.8695652173913 + C5^260.8695652173913 + B4/260.8695652173913 + A5^260.8695652173913,
260.8695652173913: G5^260.8695652173913 + C4~260.8695652173913,
260.8695652173913: C5~260.8695652173913 + F4~260.8695652173913 + F5/260.8695652173913,
260.8695652173913: B4^260.8695652173913 + E4^260.8695652173913 + E5/260.8695652173913 + C4~260.8695652173913,
260.8695652173913: C4/260.8695652173913 + A4/260.8695652173913`
const hollowsbgm = tune`
500: G5/500 + B4~500 + G4^500,
500,
500: E4~500 + G4~500 + B4~500 + D5~500 + F5/500,
500,
500: A4~500 + C5/500 + E5/500,
500: E4~500 + D5^500,
500: E4^500 + C5^500,
500: E4^500 + B4^500,
500: F4^500 + C5^500 + D5^500,
500: G4^500 + C5^500,
500: F4^500,
500: E4^500 + A4~500 + C5~500 + E5~500,
500: G4~500 + B4~500 + D5/500,
1000,
500: C5/500,
500: C5^500 + C4^500 + F4^500,
500,
500: D4^500 + A4/500,
500: E4^500,
500: F4~500 + C5/500 + G4~500,
500,
500: C5~500 + D5/500 + G5~500,
500: F5/500,
500: E5/500 + E4~500 + B4~500,
500: C5~500,
500: C5~500 + D5/500,
500: C5~500 + B4/500,
500: C5/500,
500: A4/500,
500: B4/500,
500: C5/500 + C4~500 + E4~500 + G4/500`
const hardbgm = tune`
476.1904761904762: A5-476.1904761904762 + C5-476.1904761904762 + B4^476.1904761904762 + C4/476.1904761904762,
476.1904761904762: B5-476.1904761904762 + C5-476.1904761904762 + B4^476.1904761904762 + D4^476.1904761904762 + C4^476.1904761904762,
476.1904761904762: C5-476.1904761904762 + A5-476.1904761904762 + B4^476.1904761904762 + C4/476.1904761904762 + B5-476.1904761904762,
476.1904761904762: G5-476.1904761904762 + B4^476.1904761904762 + D4^476.1904761904762 + C4^476.1904761904762 + A5/476.1904761904762,
476.1904761904762: B4^476.1904761904762 + C4/476.1904761904762 + G5-476.1904761904762,
476.1904761904762: F5-476.1904761904762 + C5-476.1904761904762 + B4^476.1904761904762 + D4^476.1904761904762 + C4^476.1904761904762,
476.1904761904762: E5-476.1904761904762 + C5-476.1904761904762 + B4^476.1904761904762 + C4/476.1904761904762,
476.1904761904762: C4/476.1904761904762 + B4^476.1904761904762 + C5-476.1904761904762,
476.1904761904762: D4-476.1904761904762 + C4-476.1904761904762 + B4/476.1904761904762,
476.1904761904762: F5~476.1904761904762 + B5/476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4~476.1904761904762,
476.1904761904762: F5~476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4/476.1904761904762 + B5~476.1904761904762,
476.1904761904762: F5~476.1904761904762 + B5/476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4~476.1904761904762,
476.1904761904762: F5~476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4/476.1904761904762 + B5~476.1904761904762,
476.1904761904762: F5~476.1904761904762 + B5/476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4~476.1904761904762,
476.1904761904762: F5~476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4/476.1904761904762 + B5~476.1904761904762,
476.1904761904762: F5^476.1904761904762 + B5/476.1904761904762 + C4~476.1904761904762 + C5~476.1904761904762 + B4~476.1904761904762,
476.1904761904762: C4/476.1904761904762 + B4/476.1904761904762 + C5/476.1904761904762 + B5/476.1904761904762,
476.1904761904762: G5-476.1904761904762 + D4^476.1904761904762 + C4^476.1904761904762 + B4^476.1904761904762 + B5-476.1904761904762,
476.1904761904762: A5-476.1904761904762 + C4/476.1904761904762 + B4~476.1904761904762,
476.1904761904762: G5-476.1904761904762 + C4^476.1904761904762 + D4^476.1904761904762 + B4^476.1904761904762 + A5-476.1904761904762,
476.1904761904762: F5-476.1904761904762 + C4/476.1904761904762 + B4~476.1904761904762 + G5-476.1904761904762,
476.1904761904762: A5-476.1904761904762 + C4^476.1904761904762 + D4^476.1904761904762 + B4^476.1904761904762 + G5-476.1904761904762,
476.1904761904762: F5-476.1904761904762 + C4/476.1904761904762 + B4~476.1904761904762 + E5-476.1904761904762,
476.1904761904762: C4^476.1904761904762 + B4^476.1904761904762 + E5-476.1904761904762 + C5-476.1904761904762 + D5-476.1904761904762,
476.1904761904762: C4^476.1904761904762 + B5~476.1904761904762 + A4/476.1904761904762 + C5/476.1904761904762 + B4/476.1904761904762,
476.1904761904762: B4/476.1904761904762 + A4/476.1904761904762 + C4^476.1904761904762,
476.1904761904762: B4/476.1904761904762 + A4/476.1904761904762 + C4^476.1904761904762 + B5~476.1904761904762,
476.1904761904762: B4/476.1904761904762 + A4/476.1904761904762 + C4^476.1904761904762,
476.1904761904762: A4/476.1904761904762 + G4/476.1904761904762 + C4^476.1904761904762 + B5~476.1904761904762,
476.1904761904762: B4/476.1904761904762 + C5/476.1904761904762 + G4/476.1904761904762 + F4/476.1904761904762 + C4^476.1904761904762,
476.1904761904762: B4/476.1904761904762 + G4/476.1904761904762 + F4/476.1904761904762 + C4^476.1904761904762 + D5/476.1904761904762,
476.1904761904762: B4/476.1904761904762 + G4/476.1904761904762 + F4/476.1904761904762 + C4-476.1904761904762 + C5/476.1904761904762`

let bgm = playTune(villagebgm, Infinity);


function successivetracks() {
  if (level > 1) {
    bgm.end();
    bgm = playTune(surbgm1)
    setTimeout(() => {
      bgm.end();
      bgm = playTune(surbgm2)
    }, 16 * 1000) // 16 seconds; 32 sections per thing and each half is a beat
  }
}

var timestopped = false;
let currentbgm = 'villagebgm' // init
function playbgm() { // plays bgm appropriate to lvl

  if (level === 17 && stage === 1) {
    bgm.end();
    bgm = playTune(hardbgm, Infinity)
  }
  if (level === fishbosslvl && stage === 2) {
    bgm.end();
    bgm = playTune(hardbgm, Infinity)
  }
  if (timestopped) {
    bgm = playTune(currentbgm, Infinity)
    timestopped = false;
  }

}



// (if boss level, play hard bgm)

setPushables({
  [player]: [crate],
  [crate]: [mob],
  [invincibility]: [mob]
})


let gameOver = false;

let plr = getFirst(player);
let playerDir = "DOWN";
let score = 0; // tracking when to change difficulty (init 0)
let mapJustChanged = true;

// mob difficulties (changable through game perhaps)




let maxhealth = 3
var health = maxhealth;
let heartsArray = [];
let itemsArray = []

function createHeartsArray(health) {
  heartsArray = [];
  for (let i = 0; i < health; i++) {
    let heartSprite = addSprite(width() - i - 1, 0, heart);
    heartsArray.push(heart);
  }
}
// createHeartsArray(maxhealth) // should be max health at the start of game BUT dont need until going in

function updateHeartsArray(health) {
  heartsArray = [];
  let tempHeart = getAll(heart);
  tempHeart.forEach(heart => {
    heart.remove();
  })
  for (let i = 0; i < health; i++) {
    let heartSprite = addSprite(width() - i - 1, 0, heart)
  }
}

function handleHealthUI(health) {
  // heartsArray.splice(health, 1);
  let tempHeart = getAll(heart);
  tempHeart.forEach(heart => {
    heart.remove();
  });
  createHeartsArray(health);

}

function levelOneSetDeco() {
  putGrassUnderRoofs();
  addText("Start", {
    x: 3,
    y: 9,
    color: color`2`
  })
  addSprite(7, 3, candle)
  addSprite(9, 3, candle)
  addText("Boss\nRush", {
    x: 15,
    y: 4,
    color: color`6`
  })
}
levelOneSetDeco() // init, call whenever returning

let tutorialPlayed = false;
async function tutorialCutscene(tutorialPlayed) {
  function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  if (!tutorialPlayed) {
    for (let i = 0; i < mentorDialogue.length - 3; i++) {
      addText(mentorDialogue[i], { x: 1, y: 3 + i, color: color`0` })
      await wait(350)
    }
    addText(mentorDialogue[3], { x: 1, y: 8, color: color`0` })
    addText(mentorDialogue[4], { x: 1, y: 9, color: color`0` })
    addText(mentorDialogue[5], { x: 1, y: 10, color: color`0` })
    getFirst(mentor).y = getFirst(mentor).y + 2
    tutorialPlayed = true;
  }
}

let chosenLevels = [];
// random pick blacklist defined under map bitmaps
let levelspassed = 0

let mobs = [ // for skeleton tracking
  // { sprite: createSprite("mob", { x: 2, y: 3 }), hp: 100 },
  // { sprite: createSprite("mob", { x: 5, y: 8 }), hp: 150 }
];

function resetMap(n) {
  if (arguments.length === 0) { // completely random set
    if (stage === 1) {
      level = (Math.floor(Math.random() * levels.length)); // random level 

      if (chosenLevels.includes(level) || randomPickBlacklist.includes(level)) {
        console.log("recursive") // check if lvl has been chosen already
        resetMap() //recursively call until its a not picked/dungeon lvl
      }
    }
    if (stage === 2) {
      level = (Math.floor(Math.random() * caverns.length));
      if (chosenLevels.includes(level) || randomPickBlacklist.includes(level)) {
        console.log("recursive") // check if lvl has been chosen already
        resetMap() //recursively call until its a not picked/dungeon lvl
      }
    }
    if (stage === 3) {
      level = (Math.floor(Math.random() * hollows.length));
      if (chosenLevels.includes(level) || randomPickBlacklist.includes(level)) {
        console.log("recursive") // check if lvl has been chosen already
        resetMap() //recursively call until its a not picked/dungeon lvl
      }
    }
  } else if (arguments.length === 1) { // set for specific continuations (calling with n)
    level = n;
    if (stage === 1)
      setMap(levels[level])
    else if (stage === 2) {
      setMap(caverns[level])
    } else if (stage === 3) {
      setMap(hollows[level])
    }
  }
  console.log("Stats:")
  console.log("Stage: " + stage);
  console.log("Level: " + level);
  console.log("Score: " + score);
  console.log("RPB: " + randomPickBlacklist)
  console.log("chosenLevels: " + chosenLevels)
  console.log("Levels Passed: " + levelspassed)

  mapJustChanged = true;
  crateonplate = false;
  traptriggered = false;

  score++;
  if (!chosenLevels.includes(level) && arguments.length === 0 && !randomPickBlacklist.includes(level)) {
    levelspassed++;
  }

  chosenLevels.push(level)

  if (arguments.length === 0) {
    if (stage === 1 && levelspassed >= 8) {
      level = 17 // first boss triggered at 8
      setMap(levels[level])
    }
    if (stage === 2 && levelspassed >= 16) {
      level = fishbosslvl
      setMap(caverns[level])
    }
    if (stage === 3 && levelspassed >= 22) {
      level = hollowsPreFightLvl
      setMap(hollows[level])
    }

    if (stage === 1)
      setMap(levels[level]);
    if (stage === 2)
      setMap(caverns[level]);
    if (stage === 3)
      setMap(hollows[level]);

  }
  playbgm()

  createHeartsArray(health);
  plr = getFirst(player);


  playTune(advancelvl);

  if (level != 0)
    addSprite(plr.x, plr.y, spawn); //spawn pad under player

  clearText();
  levelSpecificStuff();

  if (itemsArray[0])
    addSprite(0, 0, itemsArray[0])

  activeEnemies = []

  resetSingleMobHP(); // reset skeletons, fish, etc
}

var tempXToPreventSpawnSafetyAbuse = 0;
var tempYToPreventSpawnSafetyAbuse = 0;

function preventSpawnAbuse() {
  tempXToPreventSpawnSafetyAbuse = plr.x
  tempYToPreventSpawnSafetyAbuse = plr.y
}

onInput("s", () => {
  if (!gameOver) {
    preventSpawnAbuse();
    playerDir = "DOWN";
    mapJustChanged = false;
    plr.y += 1; // Move the player down
    movementDown = true;
  }
});
onInput("w", () => {
  if (!gameOver) {
    preventSpawnAbuse();
    playerDir = "UP";
    mapJustChanged = false;

    plr.y -= 1; // Move the player up
    movementDown = true;
  }
});
onInput("a", () => {
  if (!gameOver) {
    preventSpawnAbuse();
    playerDir = "LEFT";
    mapJustChanged = false;

    plr.x -= 1; // Move the player left
    movementDown = true;
  }
});
onInput("d", () => {
  if (!gameOver) {
    preventSpawnAbuse();

    playerDir = "RIGHT";

    mapJustChanged = false;

    plr.x += 1; // Move the player right
    movementDown = true;
  }

});
let plasmaswordActive = false; // false init
let cooldown = false; // init
let cooldownTime = 400 // init; can get smaller
let interacting = false; // init
function basicAttack() {
  let yOffset = 0;
  let xOffset = 0

  if (!gameOver && !cooldown && !interacting) {
    if (playerDir === "RIGHT") {
      legend.set(sword, frames[sword].RIGHT)
      xOffset = 1;
      yOffset = 0;
    }
    if (playerDir === "LEFT") {
      legend.set(sword, frames[sword].LEFT)
      xOffset = -1;
      yOffset = 0;
    }
    if (playerDir === "UP") {
      legend.set(sword, frames[sword].UP)
      xOffset = 0;
      yOffset = -1;
    }
    if (playerDir === "DOWN") {
      legend.set(sword, frames[sword].DOWN)
      xOffset = 0;
      yOffset = 1;
    }
    playTune(slash);
    if (tileExists(plr.x + xOffset, plr.y + yOffset))
      addSprite(plr.x + xOffset, plr.y + yOffset, sword)
    if (plasmaswordActive) {
      let theSwordspritejustSpawned = getFirst(sword)
      if (playerDir === "UP" || playerDir === "DOWN") {
        if (theSwordspritejustSpawned && tileExists(theSwordspritejustSpawned.x - 1, theSwordspritejustSpawned.y))
          addSprite(theSwordspritejustSpawned.x - 1, theSwordspritejustSpawned.y, plasmaslash)
        if (theSwordspritejustSpawned && tileExists(theSwordspritejustSpawned.x + 1, theSwordspritejustSpawned.y))
          addSprite(theSwordspritejustSpawned.x + 1, theSwordspritejustSpawned.y, plasmaslash)
      }
      if (playerDir === "LEFT" || playerDir === "RIGHT") {
        if (theSwordspritejustSpawned && tileExists(theSwordspritejustSpawned.x, theSwordspritejustSpawned.y - 1))
          addSprite(theSwordspritejustSpawned.x, theSwordspritejustSpawned.y - 1, plasmaslash)
        if (theSwordspritejustSpawned && tileExists(theSwordspritejustSpawned.x, theSwordspritejustSpawned.y + 1))
          addSprite(theSwordspritejustSpawned.x, theSwordspritejustSpawned.y + 1, plasmaslash)
      }
      if (theSwordspritejustSpawned)
        addSprite(theSwordspritejustSpawned.x, theSwordspritejustSpawned.y, plasmaslash) // center




      let plsSlashes = getAll(plasmaslash)
      setTimeout(() => {
        plsSlashes.forEach(ps => { ps.remove() })
      }, 101)

    }

    //attack with hp? not working tho

    /* if (!cooldown) {
    // Check for collisions with enemies
    const collisionX = getFirst(sword).x 
    const collisionY = getFirst(sword).y
    const collisionSprites = getTile(collisionX, collisionY);
    collisionSprites.forEach(sprite => {
      if (enemyList.includes(sprite) && sprite.x === collisionX && sprite.y === collisionY) {
        handleSwordAttack(sprite);
      }
    }); */

    // Reset cooldown and remove sword
    cooldown = true;
    setTimeout(() => {
      if (getFirst(sword))
        getFirst(sword).remove();
      setTimeout(() => {
        cooldown = false;
      }, cooldownTime)
    }, 100);
  }
}

function tileExists(x, y) { // for sword addsprite
  return x >= 0 && x < width() && y >= 0 && y < height();
}

onInput("i", () => {
  // tryInteract();
  // let tempspawn = getFirst(spawn);
  movementDown = false;
  basicAttack()

});


// Function to handle sword attack on an enemy target deprecated tho
/* function handleSwordAttack(enemy) {
    console.log("found enemy at sword pos");
  // Apply damage to the enemy based on its type
  switch (enemy.type) {
    case mob:
      enemy.hp -= 1; // Decrease mob's HP by 1
      break;
    case ghost:
      enemy.hp -= 2; // Decrease ghost's HP by 2
      break;
    // Add cases for other enemy types as needed
  }

  // Check if enemy's HP reaches 0
  if (enemy.hp <= 0) {
    defeatEnemy(enemy); // Handle defeated enemy
  }
} */


onInput("j", () => { // RESET game if game over is on
  if (gameOver) {
    initGame();
  } else { // turn player 90 deg
    movementDown = false;
    let tempdir = playerDir
    if (tempdir === "UP") {
      playerDir = "LEFT"
      basicAttack();
    } else if (tempdir === "LEFT") {
      playerDir = "DOWN"
      basicAttack();
    } else if (tempdir === "RIGHT") {
      playerDir = "UP"
      basicAttack();
    }
    if (tempdir === "DOWN") {
      playerDir = "RIGHT"
      basicAttack();
    }
    plr.x = plr.x
    plr.y = plr.y
  }
});

onInput("l", () => {



  movementDown = false;
  let tempdir = playerDir
  if (tempdir === "UP") {
    playerDir = "RIGHT"
    basicAttack();

  } else if (tempdir === "LEFT") {
    playerDir = "UP"
    basicAttack();
  } else if (tempdir === "RIGHT") {
    playerDir = "DOWN"
    basicAttack();
  }
  if (tempdir === "DOWN") {
    playerDir = "LEFT"
    basicAttack();
  }
  plr.x = plr.x
  plr.y = plr.y
  movementDown = false;

  if (testModeOn) {
    stage = 3
    resetMap(10) //  debug debugging debug tags etc 
  }


})

onInput("k", () => {
  movementDown = false;
  console.log(itemsArray)

  useItem()


})

function useItem() {
  let mW = width()
  let mH = height()
  let itemTile = getTile(0, 0)
  let lgn = itemTile.length - 1
  let tmpblock = itemTile[1]
  let currentItem = itemsArray[0]
  let currentItemSprite = getFirst(currentItem)

  console.log(currentItemSprite);


  if (currentItem === hppotion)
    potionHeal();
  if (currentItem === energydrink)
    boostAttackSpeed(30000) //ms arg
  if (currentItem === curse) {

    if (health > 1) {
      playerCollided();
      setTimeout(() => { potionHeal(); }, 100)

    } else
      playTune(hit);

    swordDmg++
    strbuff = true;

  }
  if (currentItem === bomb) {
    let px = plr.x
    let py = plr.y
    let pbomb = addSprite(px, py, bomb)

    bombExplosion(px, py)
  }
  if (currentItem === clock) {
    bgm.end();

    clearInterval(bossFishInt)
    clearInterval(moveMobsInterval)
    clearInterval(spawnMobsInterval)
    clearInterval(moveGhostInterval)
    clearInterval(moveSpiderInterval)
    clearInterval(moveLavafishInterval)
    clearInterval(moveRavafishInterval)
    clearInterval(fsShootInterval)
    clearInterval(skeleint)
    clearInterval(batSpawnInterval)

    clearInterval(batMoveInt)
    setTimeout(() => {
      playTune(clockTick);
      setTimeout(() => {
        moveMobsInterval = setInterval(mobMoveAll, 750);
        spawnMobsInterval = setInterval(mobSpawn, 1500);
        batMoveInt = setInterval(batMoveAll, 480)

        batSpawnInterval = setInterval(batSpawn, 3000)
        moveGhostInterval = setInterval(ghostMoveAll, 1000);
        moveSpiderInterval = setInterval(spiderMoveAll, 480);
        moveLavafishInterval = setInterval(lavaFishMove, 900);
        moveRavafishInterval = setInterval(ravaFishMove, 900);
        fsShootInterval = setInterval(fireShoot, 500);
        //ghost fire interval
        bossFishInt = setInterval(fishBossAttack, 3000)
        skeleint = setInterval(skeleLoop, 670)
        console.log("intervals set again")
        timestopped = true
        playbgm()
      }, 3500)
    }, 1000)
  }
  if (currentItem === lifeelixir) {
    maxhealth++;
    potionHeal()

  }
  if (currentItem === lightningscroll) {

    playTune(lightningStrike)
    if (playerDir === "LEFT") {
      for (let i = 1; i < plr.x + 1; i++)
        addSprite(plr.x - i, plr.y, lightning)
    } else if (playerDir === "RIGHT") {
      for (let i = plr.x + 1; i < mW; i++)
        addSprite(i, plr.y, lightning)
    } else if (playerDir === "UP") {
      for (let i = plr.y - 1; i >= 0; i--)
        addSprite(plr.x, i, lightning)
    } else if (playerDir === "DOWN") {
      for (let i = plr.y + 1; i < mH; i++)
        addSprite(plr.x, i, lightning)
    }
    setTimeout(() => {
      let lbz = getAll(lightning)
      lbz.forEach(lb => { lb.remove() })
    }, 75)


  }
  if (currentItem === plasmasword) { // pickup not an itemn now
    plasmaswordActive = true;
    playTune(plasmaOn)
    swordDmg++;

  }


  itemsArray.pop()

  if (itemsArray.length === 0) { // remove items from screen
    console.log("item array empty")
    itemTile.forEach(sprite => {
      if (sprite.x === 0 && sprite.y === 0 && sprite.type === currentItemSprite.type) {
        sprite.remove();
      }
    })
  }

}

let movementDown = false; // init

function checkIfOnSpawnPos() {
  if (getFirst(player) && movementDown && getFirst(spawn) && getFirst(player).x === getFirst(spawn).x && getFirst(player).y === getFirst(spawn).y) {
    return false;
  } else {
    return true;
  }
}


let standardEnemyArbCD = false; // init, to prevent multi dmg from fast inputs

afterInput(() => {
  const doorSprite = getFirst(door);
  const houseDoor = getFirst(housedoor);
  const gobBossSprite = getFirst(mobboss);
  const bossFishSp = getFirst(bossfish);

  let healingHeart = getFirst(healingheart);

  const spawnSprite = getFirst(spawn)
  const comChst = getFirst(commonchest)
  const rrChst = getFirst(rarechest)
  let epChst = getFirst(epicchest)
  //const epic chest
  const hidnAdvcs = getAll(hiddenadvance)

  let crates = getAll(crate); // destroy on mob hit
  let waterSprites = getAll(water);
  let lavaSps = getAll(lava)
  let spikeSprites = getAll(spikes);
  let mobSprites = getAll(mob); // collision via player movement chec
  let ghostSprites = getAll(ghost);
  let spiderSprites = getAll(spider);
  let fireballSprites = getAll(fireball)
  let finBo = getFirst(hollowboss)
  let lightningBolts = getAll(lightning)
  let bats = getAll(bat)
  let attacki = getFirst(sword);

  let asp = getAll(strengthparticles)

  let lvf = getFirst(lavafish);
  let rlvf = getFirst(revlavafish);
  let mobEggs = getAll(mobegg);
  let dummies = getAll(dummy)
  let stars = getAll(star);
  let lvfSpawner = getFirst(lavafishspawner)

  if (checkIfOnSpawnPos() === false) {
    plr.x = tempXToPreventSpawnSafetyAbuse;
    plr.y = tempYToPreventSpawnSafetyAbuse;
  }

  checkCollisionforFireBalls()

  legend.set(player, frames[player][playerDir]);
  setLegend(...legend.values());

  if (level === 0 && stage === 1) {
    if (plr.x === 7 && plr.y === 5) {
      console.log("tutorial")
      tutorialPlayed = true;
      tutorialCutscene();

    }
    if (plr.x === getFirst(advancetile).x && plr.y === getFirst(advancetile).y) {
      clearText();
      resetMap();
      setTimeout(() => { clearText(); }, 50)
      setTimeout(() => { addText("I: Surface", { x: 4, y: 3, color: color`8` }) }, 100)

      setTimeout(() => { clearText() }, 2000)
    }
  } // tutorial and mentor
  if (doorSprite && stage === 1 && level != 1 && level != 18 && level != 17 && plr.x === doorSprite.x && plr.y === doorSprite.y)
    resetMap(); // Load the next level
  if (doorSprite && stage === 2 && level != 14 && plr.x === doorSprite.x && plr.y === doorSprite.y)
    resetMap()
  if (doorSprite && stage === 3 && level != 11 && plr.x === doorSprite.x && plr.y === doorSprite.y)
    resetMap()
  if (doorSprite && stage === 3 && level === 11 && plr.x === doorSprite.x && plr.y === doorSprite.y) {
    resetMap(12)
    gameOver = true;
    addText("You win! \nPeace is restored.", {
      x: 1,
      y: 1,
      color: color`6`
    })
    addText("Thanks for playing!\nMade by noxi\n", {
      x: 1,
      y: 4,
      color: color`7`
    })
    addText("Play again?: j", {
      x: 1,
      y: 7,
      color: color`H`
    })
  }
  if (stage === 1 && level === 1 && plr.x === doorSprite.x && plr.y === doorSprite.y) {
    bossRushEnabled = true;
    levelspassed = 99; // so u go thru everything immediatley to boss n prevent glitcheshopefully 
    stage = 1;
    level = 18;
    resetMap(18) // 18 is only for  boss rush
    setTimeout(() => { clearText(); }, 50)
    setTimeout(() => { addText("An expert, eh?", { x: 4, y: 5, color: color`4` }) }, 100)

    setTimeout(() => { clearText() }, 2000)

  }
  //boss rush levels
  if (stage === 1 && bossRushEnabled && level === 18) { //boss rush goblin
    console.log(getFirst(player))
  }

  if (getFirst(player) && getAll(housedoor).length > 0 && plr.x === houseDoor.x && plr.y === houseDoor.y) {
    level = 0;
    setMap(levels[0]);
    clearText()
    plr = getFirst(player);
  }


  if (getFirst(invincibility)) {
    if (invincible) {
      getFirst(invincibility).remove();
      addSprite(plr.x, plr.y, invincibility);
    } else {
      let invinciblestuff = getAll(invincibility)
      invinciblestuff.forEach(e => { e.remove(); })
    }
  }

  if (boostactive === true) { //speedboost logic
    if (getFirst(boostparticles) && getFirst(player))
      getFirst(boostparticles).remove();
    const bp = addSprite(plr.x, plr.y, boostparticles)
  } else {
    let boosts = getAll(boostparticles)
    boosts.forEach(b => { b.remove(); })
  }
  if (strbuff === true) {
    if (asp)
      asp.forEach(ptc => { ptc.remove() })
    addSprite(plr.x, plr.y, strengthparticles)
  } else if (asp)
    asp.forEach(ptc => { ptc.remove() })



  //heal 
  if (healingHeart) {
    if (plr && plr.x === healingHeart.x && plr.y === healingHeart.y)
      heartPickup();

  }
  plr = getFirst(player)

  lightningBolts.forEach(b => {
    if (plr.x === b.x && plr.y === b.y)
      stillDamage();
  })



  waterSprites.forEach(watersprite => {
    if (plr && plr.x === watersprite.x && plr.y === watersprite.y)
      playerCollided();
  })

  lavaSps.forEach(lv => {
    if (plr && plr.x === lv.x && plr.y === lv.y)
      playerCollided(2) // 2 dmg
    if (crates) {
      crates.forEach(c => {
        if (c.x === lv.x && c.y === lv.y) {
          c.remove();
          playTune(cratebreak)
        }
      })
    }


  })
  let skele = getAll(skeleton)
  if (skele) {
    skele.forEach(s => {
      if (plr.x === s.x && plr.y === s.y)
        playerCollided()
      if (lightningBolts) {
        lightningBolts.forEach(b => {
          if (s.x === b.x && s.y === b.y)
            skeletonHp -= 2;
        })
      }
      if (!standardEnemyArbCD && attacki && attacki.x === s.x && attacki.y === s.y) {
        skeletonHp -= swordDmg
        playTune(hitEnemy)

        standardEnemyArbCD = true;
        setTimeout(() => { standardEnemyArbCD = false }, 100)
        if (skeletonHp <= 0) {
          defeatEnemy(s)
          skeletonHp = 6
          if (getFirst(skeleton)) {
            playTune(heal)
            playTune(danger)
          }

        }
      }
    })
  }


  crates.forEach(crate => { //pressureplate n door stuff
    if (doorSprite && crate.x === doorSprite.x && crate.y === doorSprite.y) {
      crate.remove();
      playTune(cratebreak);
    }
    if (getFirst(pressureplate) && crate.x === getFirst(pressureplate).x && crate.y === getFirst(pressureplate).y) { // pressureplate Mechanics
      if (level === 6 && stage === 1 && crateonplate === false) {
        playTune(secret)
        for (let i = 1; i < 4; i++) {
          for (let j = 3; j < 5; j++) {
            let removing = getTile(i, j)
            removing[0].remove();
          }
        }
        crateonplate = true
      }
      if (level === 16 && stage === 1 && crateonplate === false) {
        playTune(secret)
        getFirst(spikes).remove();
        crateonplate = true;
      }
      if (level === 10 && stage === 2 && !crateonplate) {
        playTune(secret)
        crateonplate = true;
        let w2s = getAll(wall2)
        w2s.forEach(w2 => { w2.remove() })
      }
      if (level === 2 && stage === 3 && !crateonplate) {
        playTune(secret)
        crateonplate = true;
        clearTile(2, 2)
        clearTile(1, 3)
        clearTile(3, 1)
        clearTile(3, 2)
        clearTile(2, 3)
      }
      if (level === 7 && stage === 3 && !crateonplate) {
        playTune(secret)
        crateonplate = true;
        addSprite(getFirst(lockeddoor).x, getFirst(lockeddoor).y, door)
        getFirst(lockeddoor).remove();
      }
    }
  });

  if (level === 2 && stage === 2) {
    let cL = crates[0]
    let cR = crates[1]
    let pps = getAll(pressureplate)
    let pL = pps[1]
    let pR = pps[0]

    if (cR.x === pR.x && cR.y === pR.y) {
      fireballSprites.forEach(f => {
        f.remove();
      })
      if (!crateonplate) {
        playTune(secret)
        crateonplate = true;
      }
    }
    if (pL && cL.x === pL.x && cL.y === pL.y) {
      getFirst(spikes).remove();
      playTune(secret);
      pL.remove();
    }
  }
  let psmSword = getFirst(plasmasword)
  if (psmSword) {
    if (!plasmaswordActive && plr && plr.x === psmSword.x && plr.y === psmSword.y) {
      plasmaswordActive = true;
      psmSword.remove();
      swordDmg++;
      addText("Plasma Sword", {
        x: 2,
        y: 1,
        color: color`H`
      })
      setTimeout(() => { clearText() }, 1000)
    }
  }

  if (fireballSprites) {
    if (crates) {
      crates.forEach(crate => {
        fireballSprites.forEach(fb => {
          if (crate.x === fb.x && crate.y === fb.y) {
            crate.remove();
            playTune(cratebreak)
          }
        })
      })
    }
  }

  if (stars) {
    stars.forEach(s => {
      if (plr.x === s.x && plr.y === s.y)
        playerCollided();
    })
  }


  if (mobSprites) {
    //modify pushable sprites
    crates.forEach(crate => {
      mobSprites.forEach(mobSprite => {
        if (crate.x === mobSprite.x && crate.y === mobSprite.y) {
          crate.remove();
          playTune(cratebreak);
        }
      });
    });
  }

  crates.forEach(crate => {
    waterSprites.forEach(water => {
      if (crate.x === water.x && crate.y === water.y) {
        crate.remove();
        playTune(cratebreak);
      }
    });
  });

  spikeSprites.forEach(spike => {
    if (plr.x === spike.x && plr.y === spike.y && movementDown) {
      if (plr.x != tempXToPreventSpawnSafetyAbuse || plr.y != tempYToPreventSpawnSafetyAbuse) {
        stillDamage();
        movementDown = false;
      }
    }
  });

  if (dummies && attacki) {
    dummies.forEach(dm => {
      if (dm.x === attacki.x && dm.y === attacki.y)
        playTune(hitEnemy)
    })
  }

  if (lvf) {
    if (plr.x === lvf.x && plr.y === lvf.y)
      playerCollided()
    if (lightningBolts) {
      lightningBolts.forEach(b => {
        if (lvf.x === b.x && lvf.y === b.y)
          lavaFishHp -= 2;
      })
    }
    if (!standardEnemyArbCD && attacki && attacki.x === lvf.x && attacki.y === lvf.y) {
      lavaFishHp -= swordDmg
      playTune(hitEnemy)

      standardEnemyArbCD = true;
      setTimeout(() => { standardEnemyArbCD = false }, 100)
      if (lavaFishHp <= 0) {
        defeatEnemy(lvf)
        lavaFishHp = 4

      }
    }
  }

  if (rlvf) {
    if (plr.x === rlvf.x && plr.y === rlvf.y)
      playerCollided()
    if (lightningBolts) {
      lightningBolts.forEach(b => {
        if (rlvf.x === b.x && rlvf.y === b.y)
          ravaFishHp -= 2;
      })
    }
    if (!standardEnemyArbCD && attacki && attacki.x === rlvf.x && attacki.y === rlvf.y) {
      ravaFishHp -= swordDmg
      playTune(hitEnemy)

      console.log(ravaFishHp) //dbug

      standardEnemyArbCD = true;
      setTimeout(() => { standardEnemyArbCD = false }, 100)
      if (ravaFishHp <= 0) {
        defeatEnemy(rlvf)
        ravaFishHp = 4
      }
    }
  }
  if (lvfSpawner) {
    if (!getFirst(lavafish)) {
      lavaFishHp = 4
      addSprite(lvfSpawner.x, lvfSpawner.y, lavafish)
    }
  }

  if (gobBossSprite) { // dmg mob boss
    if (plr.x === gobBossSprite.x && plr.y === gobBossSprite.y)
      playerCollided()
    if (attacki && attacki.x === gobBossSprite.x && attacki.y === gobBossSprite.y && arbitrarySecondCd === false) {
      gobBossHp -= swordDmg;
      arbitrarySecondCd = true;
      setTimeout(() => { arbitrarySecondCd = false }, 100)
    }
    if (gobBossHp <= 0) {
      defeatBoss(gobBossSprite)
      let eggstoclear = getAll(mobegg)
      eggstoclear.forEach(e => { e.remove() })
    }
  }
  //dmg fish boss
  if (bossFishSp) {
    if (plr.x === bossFishSp.x && plr.y === bossFishSp.y)
      playerCollided()
    if (lightningBolts) {
      lightningBolts.forEach(b => {
        if (bossFishSp.x === b.x && bossFishSp.y === b.y)
          bossFishHp -= 2;
      })
    }
    if (attacki && attacki.x === bossFishSp.x && attacki.y === bossFishSp.y && arbitrarySecondCd === false) {
      bossFishHp -= swordDmg;
      arbitrarySecondCd = true;
      setTimeout(() => { arbitrarySecondCd = false }, 70)
    }
    if (bossFishHp <= 0) {
      fireballSprites.forEach(f => { f.remove() })
      defeatBoss(bossFishSp)
    }
  }
  // dmg final boss
  if (finBo) {
    let plasmaslashes = getAll(plasmaslash)
    if (plr && plr.x === finBo.x && plr.y === finBo.y) {
      playerCollided();
    }
    if (lightningBolts) {
      lightningBolts.forEach(b => {
        if (finBo.x === b.x && finBo.y === b.y)
          finalBossHp -= 2;
      })
    }

    if (attacki && attacki.x === finBo.x && attacki.y === finBo.y && arbitrarySecondCd === false) {
      finalBossHp -= swordDmg;
      arbitrarySecondCd = true;
      setTimeout(() => { arbitrarySecondCd = false }, 100)
    } else if (plasmaslashes && arbitrarySecondCd === false) {
      plasmaslashes.forEach(p => {
        if (p.x === finBo.x && p.y === finBo.y) {
          finalBossHp -= swordDmg
          arbitrarySecondCd = true;
          setTimeout(() => { arbitrarySecondCd = false }, 100)
        }
      })
    }
    if (finalBossHp <= 0) {
      let ppl = getAll(purplelightning)
      ppl.forEach(f => { f.remove() })
      defeatBoss(finBo)
    }
  }

  //lvl specific traps

  if (level === 5 && plr.x === width() - 2 && plr.y === 8 && !traptriggered && stage === 1) {
    let graves = getAll(hurtplayer)
    traptriggered = true;

    graves.forEach(grave => {
      playTune(danger);

      addSprite(grave.x, grave.y, ghost)
    })
  }
  if (level === 7 && stage === 2 && traptriggered === false && plr.x === 8) {
    let graves = getAll(hurtplayer)
    traptriggered = true;

    graves.forEach(grave => {
      playTune(danger);

      addSprite(grave.x, grave.y, ghost)
    })
  }
  if (level === 15 && stage === 1) {
    if (movementDown === true) {
      function randomSpikes() {
        let sps = getAll(spikes)
        if (sps.length >= 2)
          sps.forEach(sp => { sp.remove(); })
        let rndx = Math.floor(Math.random() * 5 + 1)
        let rndy = Math.floor(Math.random() * 2 + 1)

        if (comChst && rndx === comChst.x && rndy === comChst.y)
          randomSpikes()
        else if (rndx === plr.x && rndy === plr.y)
          randomSpikes()
        /*  if (spiderSprites) {
            spiderSprites.forEach(spdr => {
              if (spdr.x === rndx && spdr.y === rndy)
                randomSpikes()
            }) 
          } */
        else
          addSprite(rndx, rndy, spikes)
      }
      if (comChst) {
        randomSpikes()
        randomSpikes()
        playTune(danger);
      }
    }
  }
  if (level === 3 && stage === 3) {
    if (!getFirst(bat)) {
      addSprite(getFirst(lockeddoor).x, getFirst(lockeddoor).y, door)
      getFirst(lockeddoor).remove();
    }
  }
  if (level === 5 && stage === 3) {
    if (!getFirst(skeleton)) {
      addSprite(getFirst(lockeddoor).x, getFirst(lockeddoor).y, door)
      getFirst(lockeddoor).remove();
    }
  }
  if (level === 11 && stage === 3 && !traptriggered) {
    finalBossInt = setInterval(finalBossAttack, finalBossMsBetweenAttacks)
    bgm.end();
    bgm = playTune(hardbgm, Infinity)
    playTune(danger)
    traptriggered = true
  }
  if (level === 14 && stage === 2 && !traptriggered) {
    bossFishInt = setInterval(fishBossAttack, 3000)
    playTune(danger)
    traptriggered = true
    // bgm is already handled in the function for it
  }

  //doors for specific lvls levelspecific stuff
  const portal = getFirst(advancetile);
  const findoor = getFirst(finaldoor);
  plr = getFirst(player);
  if (findoor && plr.x === findoor.x && plr.y === findoor.y) {
    resetMap(11)
  }
  if (portal && plr.x === portal.x && plr.y === portal.y) {
    if (level === 8 && stage === 1) { // water realm 
      resetMap(9)
    }
    if (level === 18 && stage === 1) {
      resetMap(17)
    }
    if (level === 0 && stage === 2) {
      console.log("caverns transition")
      bgm.end();
      currentbgm = "cavernsbgm"
      bgm = playTune(cavernsbgm, Infinity)
      chosenLevels = [0]
      randomPickBlacklist = [0, 4, 7, 14] // blacklist for caverns

      resetMap()

      setTimeout(() => { clearText(); }, 50)
      setTimeout(() => { addText("II: Caverns", { x: 4, y: 3, color: color`C` }) }, 100)

      setTimeout(() => { clearText() }, 2000)
    } else if (level === 0 && stage === 2 && bossRushEnabled) {
      stage = 2;
      resetMap(14)
    }
    if (level === 4 && stage === 2)
      resetMap(5)

    if (level === 0 && stage === 3) {
      console.log("hollows transition")
      bgm.end();
      currentbgm = "hollowsbgm"
      bgm = playTune(hollowsbgm, Infinity)
      chosenLevels = [0]
      randomPickBlacklist = [0, 7, 10, 11] // blacklist for hollows
      resetMap()
      setTimeout(() => { clearText(); }, 50)
      setTimeout(() => { addText("III: Hollows", { x: 4, y: 3, color: color`7` }) }, 100)

      setTimeout(() => { clearText() }, 2000)
    }
  }


  // hidden advance tiles
  if (hidnAdvcs) {
    if (level === 3 && stage === 1) {
      hidnAdvcs.forEach(tl => {
        if (plr.x === tl.x && plr.y === tl.y) { // im maaking a function for touch detection next time omg
          playTune(secret)
          resetMap(14)

        }
      })
    }
    if (level === 11 && stage === 1) {
      let adv = getFirst(hiddenadvance)
      if (plrTouching(adv)) { // i implemented it at last ( code lore )
        resetMap(15)
      }
    }
    if (level === 6 && stage === 2) {
      let adv = getFirst(hiddenadvance)
      if (plrTouching(adv)) {
        resetMap(7)
      }
    }
    if (level === 12 && stage === 2) {
      let adv = getFirst(hiddenadvance)
      if (plrTouching(adv)) {
        resetMap(13)
      }
    }
    if (level === 6 && stage === 3) {
      let adv = getFirst(hiddenadvance)
      if (plrTouching(adv)) {
        resetMap(7)
      }
    }

  }
  //boss advancing
  if (level === 17 && stage === 1) { // mobboss
    if (doorSprite && plr.x === doorSprite.x && plr.y === doorSprite.y) {
      stage = 2;
      resetMap(0) // caverns
    }
  }
  if (level === fishbosslvl && stage === 2) { //fish boss
    console.log("fishbos")
    if (doorSprite) {
      console.log("thers a door (defeated)")
      if (plr.x === doorSprite.x && plr.y === doorSprite.y) {
        console.log("Reset to hollows pls work")
        stage = 3;
        resetMap(0) // hollows
      }
    }
  }


  //attack from mobs
  // mobs below here bc glitchy
  if (mobSprites) {
    mobSprites.forEach(mob => {
      if (plr && plr.x === mob.x && plr.y === mob.y) {
        playerCollided();
      }
      if (lightningBolts) {
        lightningBolts.forEach(b => {
          if (b.x === mob.x && b.y === mob.y)
            defeatEnemy(mob)
        })
      }
    })
    if (attacki) {
      mobSprites.forEach(mob => {
        if (attacki.x === mob.x && attacki.y === mob.y) {
          defeatEnemy(mob)
        }
      })
    }
  }

  if (ghostSprites) {
    ghostSprites.forEach(ghost => {
      if (plr && plr.x === ghost.x && plr.y === ghost.y) {
        playerCollided();
      }
      if (lightningBolts) {
        lightningBolts.forEach(b => {
          if (b.x === ghost.x && b.y === ghost.y)
            defeatEnemy(ghost)
        })
      }
    })
    if (attacki) {
      ghostSprites.forEach(ghost => {
        if (attacki.x === ghost.x && attacki.y === ghost.y) {
          defeatEnemy(ghost)
        }
      })
    }
  }

  if (spiderSprites) {
    spiderSprites.forEach(spider => {
      if (plr && plr.x === spider.x && plr.y === spider.y) {
        playerCollided();
      }
      if (lightningBolts) {
        lightningBolts.forEach(b => {
          if (b.x === spider.x && b.y === spider.y)
            defeatEnemy(spider)
        })
      }
    })
    if (attacki) {
      spiderSprites.forEach(spider => {
        if (attacki.x === spider.x && attacki.y === spider.y) {
          defeatEnemy(spider)
        }
      })
    }
  }
  if (bats) {
    bats.forEach(bat => {
      if (plr && plr.x === bat.x && plr.y === bat.y) {
        playerCollided();
      }
      if (lightningBolts) {
        lightningBolts.forEach(b => {
          if (b.x === bat.x && b.y === bat.y)
            defeatEnemy(bat)
        })
      }
    })
    if (attacki) {
      bats.forEach(bat => {
        if (attacki.x === bat.x && attacki.y === bat.y) {
          defeatEnemy(bat)
        }
      })
    }
  }

  if (mobEggs) {
    mobEggs.forEach(egg => {
      if (attacki && attacki.x === egg.x && attacki.y === egg.y) {
        defeatEnemy(egg)
        eggCount--
      }

    })
  }

  //GROUND ITEM PICKUPS
  const hpPotion = getAll(hppotion);
  const energyDrink = getAll(energydrink)
  const curses = getAll(curse)

  if (hpPotion) {
    hpPotion.forEach(pot => {
      if (plr && plr.x === pot.x && plr.y === pot.y) {
        addItem(hppotion, pot)
      }
    })
  }
  if (energyDrink) {
    energyDrink.forEach(dr => {
      if (plr && plr.x === dr.x && plr.y === dr.y) {
        addItem(energydrink, dr)
      }
    })
  }

  //RANDOM ITEMS FROM CHEST
  if (plr && comChst && plr.x === comChst.x && plr.y === comChst.y) {
    let rndId = Math.floor(Math.random() * commonLootPool.length)
    let fcall = addItem(commonLootPool[rndId]);
    if (fcall === true) {
      comChst.remove();
      playTune(getItem);
    }
  }
  if (plr && rrChst && plr.x === rrChst.x && plr.y === rrChst.y) {
    let rndId = Math.floor(Math.random() * rareLootPool.length)
    let fcall = addItem(rareLootPool[rndId]);
    if (fcall === true) {
      rrChst.remove();
      playTune(getItem);
    }
  }
  if (plr && epChst && plr.x === epChst.x && plr.y === epChst.y) {
    let rndId = Math.floor(Math.random() * epicLootPool.length)
    let fcall = addItem(epicLootPool[rndId]);
    if (fcall === true) {
      epChst.remove();
      playTune(getItem);
    }
  }

  // BOSS HP BARS

  if (gobBossSprite && gobBossHp > 0) {
    clearText();
    addText("HP: " + gobBossHp, {
      x: 2,
      y: 1,
      color: color`4`
    })
  }
  if (bossFishSp && bossFishHp > 0) {
    clearText();
    addText("HP: " + bossFishHp, {
      x: 2,
      y: 1,
      color: color`8`
    })
  }

  if (getFirst(hollowboss) && finalBossHp > 0) {
    clearText();
    addText("HP: " + finalBossHp, {
      x: 2,
      y: 1,
      color: color`2`
    })
  }


})






//fireball checking (and other projectiles)
function checkCollisionforFireBalls() {
  let fireballSprites = getAll(fireball)
  fireballSprites.forEach(fireball => {
    if (getFirst(player) && getFirst(player).x === fireball.x && getFirst(player).y === fireball.y) {
      playerCollided();
    }
  });
}





let mobCounter = 0;
let ghostCounter = 0;
let spiderCounter = 0;


var moveMobsInterval = setInterval(mobMoveAll, 750);
var spawnMobsInterval = setInterval(mobSpawn, 1500);
var moveGhostInterval = setInterval(ghostMoveAll, 1000);
var moveSpiderInterval = setInterval(spiderMoveAll, 480);
var moveLavafishInterval = setInterval(lavaFishMove, 900);
var moveRavafishInterval = setInterval(ravaFishMove, 900);
var fsShootInterval = setInterval(fireShoot, 500);

function mobMoveAll() {
  const options = ["up", "down", "left", "right"];

  // Get all mob sprites in the game
  let mobSprites = getAll(mob);

  // Iterate over each mob sprite
  mobSprites.forEach(mobSprite => {
    let randomIndex = Math.floor(Math.random() * options.length);
    let direction = options[randomIndex];

    // Save the current position of the mob sprite
    let newX = mobSprite.x;
    1
    let newY = mobSprite.y;

    // Calculate the next position based on the random direction
    function moveLogic() {
      if (direction === "up") {
        newY -= 1;
      } else if (direction === "down") {
        newY += 1;
      } else if (direction === "left") {
        newX -= 1;
      } else if (direction === "right") {
        newX += 1;
      }
    }
    moveLogic();
    // Check for wall collision and player exclusion
    const spritesAtNextPos = getTile(newX, newY);
    const isWallCollision = spritesAtNextPos.some(sprite => [lava, lavafish, revlavafish, rocks, dummy, lockeddoor, pressureplate, hppotion, mobboss, curse, mobegg, wall, wall2, wall3, water, fireshooter, spikes, crate, commonchest, fireshooter, heart, fireball, mob, spider, ghost, heart, spawn, door].includes(sprite.type));
    const isPlayerCollision = spritesAtNextPos.some(sprite => sprite.type === player);
    3

    // Move the mob sprite only if there is no wall collision and not colliding with the player
    if (!isWallCollision && !isPlayerCollision) {
      mobSprite.x = newX;
      mobSprite.y = newY;
    } else if (isWallCollision) {
      function wallCollisionStuff() {
        randomIndex = Math.floor(Math.random() * options.length);
        direction = options[randomIndex];
        moveLogic();
        if (!isWallCollision) {
          mobSprite.x = newX;
          mobSprite.y = newY;
        } else if (isWallCollision)
          wallCollisionStuff();
      }
    } else if (isPlayerCollision) {
      mobSprite.x = newX;
      mobSprite.y = newY;
      playerCollided()
    }
  });

}

var itemSprite; //init
function addItem(pickup, groundspritetoremove) {
  if (!itemsArray[0]) {
    playTune(getItem);
    itemsArray.push(pickup)
    itemSprite = addSprite(0, 0, itemsArray[0])
    if (arguments.length === 2)
      groundspritetoremove.remove();
    if (pickup === energydrink)
      addText("Attack Speed+", { x: 3, y: 1, color: color`6` })
    if (pickup === hppotion)
      addText("Health Potion", { x: 3, y: 1, color: color`8` })
    if (pickup === curse)
      addText("Power Talisman", { x: 2, y: 1, color: color`2` })
    if (pickup === bomb) {
      addText("Bomb", { x: 3, y: 1, color: color`4` })
      itemsArray.push(bomb) // 2 uses
    }
    if (pickup === clock)
      addText("Time Stop", { x: 2, y: 1, color: color`2` })
    if (pickup === lifeelixir)
      addText("Life Elixir", { x: 2, y: 1, color: color`3` })
    if (pickup === lightningscroll) {
      addText("Lightning", { x: 2, y: 1, color: color`6` })
      itemsArray.push(lightningscroll)
      itemsArray.push(lightningscroll) // 3 uses
    }
    if (pickup === plasmasword)
      addText("Plasma Blade", { x: 2, y: 1, color: color`8` })


    setTimeout(() => { clearText() }, 1000)

    return true;
  } else if (itemsArray[0]) {
    console.log('item capacity max') // prob keep 1 entire game so its easier
    addText("at item max", {
      x: 4,
      y: 4,
      color: color`3`
    })
    setTimeout(() => { clearText() }, 1000)

    return false;
  }

}

function mobSpawn() {
  let mobSpawner = getAll(mobspawner);
  mobSpawner.forEach(s => {
    const spritesAtNextPos = getTile(s.x + 1, s.y);
    const isWallCollision = spritesAtNextPos.some(sprite => [hppotion, curse, mob, spider, ghost, player, heart].includes(sprite.type));
    if (!isWallCollision) {
      addSprite(s.x, s.y, mob)
      playTune(enemySpawn);
    }
  })
}

function batSpawn() {
  let batSpawner = getFirst(batspawner)
  if (batSpawner) {
    addSprite(batSpawner.x, batSpawner.y, bat)
  }
}
batSpawnInterval = setInterval(batSpawn, 3000)

function ghostMoveAll() {
  const options = ["up", "down", "left", "right"];

  // Get all mob sprites in the game
  let ghostSprites = getAll(ghost);

  // Iterate over each mob sprite
  ghostSprites.forEach(ghostSprite => {
    let randomIndex = Math.floor(Math.random() * options.length);
    let direction = options[randomIndex];

    // Save the current position of the mob sprite
    let newX = ghostSprite.x;
    let newY = ghostSprite.y;

    let oldX = ghostSprite.x;
    let oldY = ghostSprite.y;


    // Calculate the next position based on the random direction
    function moveLogic() {
      if (direction === "up") {
        newY -= 1;
      } else if (direction === "down") {
        newY += 1;
      } else if (direction === "left") {
        newX -= 1;
      } else if (direction === "right") {
        newX += 1;
      }
    }
    moveLogic();

    // Check for wall collision and player exclusion
    const spritesAtNextPos = getTile(newX, newY);
    const isWallCollision = spritesAtNextPos.some(sprite => [hppotion, mob, spider, ghost, spikes, heart, spawn, door, commonchest].includes(sprite.type)); // GHOSTS r special (they can go thru walls)
    const isPlayerCollision = spritesAtNextPos.some(sprite => sprite.type === player);

    // Move the mob sprite only if there is no wall collision and not colliding with the player
    if (!isWallCollision && !isPlayerCollision) {
      ghostSprite.x = newX;
      ghostSprite.y = newY;
    } else if (isWallCollision) {
      function wallCollisionGhost() {
        randomIndex = Math.floor(Math.random() * options.length);
        direction = options[randomIndex];
        moveLogic();
        if (!isWallCollision) {
          ghostSprite.x = newX;
          ghostSprite.y = newY;
        } else if (isWallCollision)
          wallCollisionGhost();
      }
    } else if (isPlayerCollision) {
      ghostSprite.x = newX;
      ghostSprite.y = newY;
      playerCollided()
    }
  });

}

function spiderMoveAll() {
  let spiderSprites = getAll(spider);

  spiderSprites.forEach(spiderSprite => {
    if (!spiderSprite.moveRight) {
      spiderSprite.x--; // Move left
    } else {
      spiderSprite.x++; // Move right
    }

    const spritesAtNextPos = getTile(spiderSprite.x, spiderSprite.y);
    const isWallCollision = spritesAtNextPos.some(sprite => [rocks, lava, amethyst, wall, wall2, wall3, water, commonchest, crate, heart, fireball, mob, ghost, spikes].includes(sprite.type));
    const isPlayerCollision = spritesAtNextPos.some(sprite => sprite.type === player);

    if (isWallCollision) {
      spiderSprite.moveRight = !spiderSprite.moveRight; // Change direction if wall collision
      if (spiderSprite.moveRight) {
        spiderSprite.x++; // Move right after changing direction
      } else {
        spiderSprite.x--; // Move left after changing direction
      }
    } else if (isPlayerCollision) {
      playerCollided();
    }
  });
}

/* let fireswapside = false; // it looks dumber than i thought
function fireSwapSprite() {
  if (!fireswapside) {
    legend.set(fireball, frames[fireball].R)
     fireswapside = true;
   } else {
    legend.set(fireball, frames[fireball].L)
     fireswapside = false;
   }
}
setInterval(fireSwapSprite,100) */

function fireShoot() {
  let fireShooters = getAll(fireshooter);

  fireShooters.forEach(fiya => {
    addSprite(fiya.x, fiya.y, fireball);
    let fireproj = getFirst(fireball);
    const spritesAtNextPos = getTile(fireproj.x, fireproj.y + 1);
    const isWallCollision = spritesAtNextPos.some(sprite => [amethyst, rocks, wall, wall2, wall3, heart, spawn, door, commonchest, spider, mob, ghost, spikes].includes(sprite.type));
    const isPlayerCollision = spritesAtNextPos.some(sprite => sprite.type === player);
    const isCrateCollision = spritesAtNextPos.some(sprite => sprite.type === crate);

    if (!isWallCollision && !isPlayerCollision)
      fireproj.y++;

    if (isWallCollision)
      fireproj.remove()

    if (isPlayerCollision) {
      fireproj.y++;
      playerCollided()
      fireproj.remove()
    }
    if (isCrateCollision) {
      getFirst(crate).remove()
    }
  });
}


function resetSingleMobHP() {
  lavaFishHp = 4;
  ravaFishHp = 4;
  skeletonHp = 6;
}

let lavaFishHp = 4;
let ravaFishHp = 4;
let skeletonHp = 6;

function moveEnemiesTowardsPlayerPrioX(thingtomove, playerX, playerY) { // Prioritizing X
  const enemies = getAll(thingtomove);

  enemies.forEach(enemy => {
    const dx = playerX - enemy.x;
    const dy = playerY - enemy.y;

    const directionX = Math.sign(dx); // sign returns 1, 0, -1
    const directionY = Math.sign(dy);


    if (getTile(enemy.x + directionX, enemy.y + directionY).some(sprite => sprite.type === "r")) {
      return
    } else if (plr.x != getFirst(spawn).x || plr.y != getFirst(spawn).y) {
      if (enemy.x != plr.x) {
        enemy.x += directionX;
      } else {
        enemy.y += directionY;
      }
    }
    if (plr.x === enemy.x && plr.y === enemy.y) {
      playerCollided()
    }
  });
}

function moveEnemiesTowardsPlayerPrioY(thingtomove, playerX, playerY) { // Prioritizing Y
  const enemies = getAll(thingtomove);

  enemies.forEach(enemy => {
    const dx = playerX - enemy.x;
    const dy = playerY - enemy.y;

    const directionX = Math.sign(dx);
    const directionY = Math.sign(dy);


    if (getTile(enemy.x + directionX, enemy.y + directionY).some(sprite => sprite.type === "r")) {
      return
    } else if (plr.x != getFirst(spawn).x || plr.y != getFirst(spawn).y) {
      if (enemy.y != plr.y) {
        enemy.y += directionY;
      } else {
        enemy.x += directionX;
      }
    }
    if (plr.x === enemy.x && plr.y === enemy.y) {
      playerCollided()
    }
  });
}



function lavaFishMove() {
  let llfv = getFirst(lavafish)
  if (llfv) {
    if (getFirst(player))
      moveEnemiesTowardsPlayerPrioX(lavafish, plr.x, plr.y);
    let mobs = getAll(mob)
    mobs.forEach(m => {
      if (llfv.x === m.x && llfv.y === m.y)
        defeatEnemy(m)
    })



    if (stage === 2 && level === 14 && !spawnedfishdefeated) {
      addSprite(llfv.x, llfv.y, lava)
    }

  }
}

function ravaFishMove() {
  let rlfv = getFirst(revlavafish)
  if (rlfv) {
    if (getFirst(player))
      moveEnemiesTowardsPlayerPrioY(revlavafish, plr.x, plr.y)
    let mobs = getAll(mob)
    mobs.forEach(m => {
      if (getFirst(revlavafish).x === m.x && getFirst(revlavafish).y === m.y)
        defeatEnemy(m)
    })

    if (stage === 2 && level === 14 && !spawnedfishdefeated) {
      addSprite(getFirst(revlavafish).x, getFirst(revlavafish).y, lava)
    }
  }
}

// bats cannot go through other bats
function smartMoveThruWalls(enemy, plr) {
  if (getFirst(spawn) && enemy && (plr.x !== getFirst(spawn).x || plr.y !== getFirst(spawn).y)) {
    if (enemy) {
      const dx = plr.x - enemy.x;
      const dy = plr.y - enemy.y;

      let nextX = enemy.x;
      let nextY = enemy.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        nextX = enemy.x + Math.sign(dx);
        if (isBatObstacle(nextX, enemy.y)) {
          nextX = enemy.x; // Reset if the next step is an obstacle
        }
      } else {
        nextY = enemy.y + Math.sign(dy);
        if (isBatObstacle(enemy.x, nextY)) {
          nextY = enemy.y; // Reset if the next step is an obstacle
        }
      }

      // If horizontal move is blocked, try vertical and vice versa
      if (nextX === enemy.x && nextY === enemy.y) {
        if (Math.abs(dx) > Math.abs(dy)) {
          nextY = enemy.y + Math.sign(dy);
          if (isBatObstacle(enemy.x, nextY)) {
            nextY = enemy.y; // Reset if the next step is an obstacle
          }
        } else {
          nextX = enemy.x + Math.sign(dx);
          if (isBatObstacle(nextX, enemy.y)) {
            nextX = enemy.x; // Reset if the next step is an obstacle
          }
        }
      }



      if (nextX != getFirst(spawn).x || nextY != getFirst(spawn).y) {
        enemy.x = nextX;
        enemy.y = nextY;
      }


      if (enemy.x === plr.x && enemy.y === plr.y)
        playerCollided()
    }
  }
}

function batMoveAll() {
  let batz = getAll(bat);
  if (batz) {
    batz.forEach(bt => {
      if (getFirst(player)) {
        smartMoveThruWalls(bt, plr);
      }
    });
  }
}
let batMoveInt = setInterval(batMoveAll, 480)

function spawnLavaFishMob(x, y, initialHealth) {
  addSprite(x, y, lavafish);

  spawnEnemy(lavafish, 3, 3, 5)

  console.log(activeEnemies)
}



function spawnEnemy(type, x, y, health) {
  const enemy = {
    type: type,
    x: x, // (starting pos)
    y: y, // (starting pos)
    health: health,
    // 
  };

  activeEnemies.push(enemy);
}

const obstacleTypes = [wall, wall2, rocks, wall3, amethyst, skeleton, lava, water, pressureplate, crate, mob, spider, fireball, spawn, lockeddoor, door, heart, commonchest, rarechest, epicchest]; // universal

const batObstacles = [fireball, bat, lavafish, revlavafish, door, lockeddoor, commonchest, rarechest, epicchest, spawn]

function isObstacle(x, y) { // reuse in a* 
  const sprites = getTile(x, y); // Get all sprites at the specified position
  return sprites.some(sprite => obstacleTypes.includes(sprite.type));
}

function isBatObstacle(x, y) {
  const sprites = getTile(x, y);
  return sprites.some(sprite => batObstacles.includes(sprite.type));
}


function moveTowardsAvoidingObstacles(enemy, plr) {
  if (enemy) {
    const dx = plr.x - enemy.x;
    const dy = plr.y - enemy.y;

    let nextX = enemy.x;
    let nextY = enemy.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      nextX = enemy.x + Math.sign(dx);
      if (isObstacle(nextX, enemy.y)) {
        nextX = enemy.x; // Reset if the next step is an obstacle
      }
    } else {
      nextY = enemy.y + Math.sign(dy);
      if (isObstacle(enemy.x, nextY)) {
        nextY = enemy.y; // Reset if the next step is an obstacle
      }
    }

    // If horizontal move is blocked, try vertical and vice versa
    if (nextX === enemy.x && nextY === enemy.y) {
      if (Math.abs(dx) > Math.abs(dy)) {
        nextY = enemy.y + Math.sign(dy);
        if (isObstacle(enemy.x, nextY)) {
          nextY = enemy.y; // Reset if the next step is an obstacle
        }
      } else {
        nextX = enemy.x + Math.sign(dx);
        if (isObstacle(nextX, enemy.y)) {
          nextX = enemy.x; // Reset if the next step is an obstacle
        }
      }
    }

    enemy.x = nextX;
    enemy.y = nextY;


    if (enemy.x === plr.x && enemy.y === plr.y)
      playerCollided()
  }
}


function skeleLoop() {
  let en = getAll(skeleton);
  if (en) {
    en.forEach(e => {
      moveTowardsAvoidingObstacles(e, plr);
    })
  }
}

let skeleint = setInterval(skeleLoop, 670)



function getNeighbors(x, y) {
  return directions.map(dir => ({ x: x + dir.x, y: y + dir.y }));
}




// kinda deprecated?
function handleMultipleHits(swordX, swordY, damage) {
  const en = activeEnemies.find(enemy => {
    return swordX === enemy.x && swordY === enemy.y && enemy.type === 'Y';
    // Adjust the condition based on your collision detection logic
  });

  if (en) {
    console.log("FOUND ENEMY");
    hitLavaFishMob(en.x, en.y, swordDmg); // Deal damage to the enemy

    if (en.health > 0) {
      console.log("HIT");
    } else {
      playTune(killEnemy);
    }
  }
}





var arbitrarySecondCd = false;
let eggCount = 0; // init
let eggOpenTime = 1000; // init
let gobBossHp = 25; // init
let gobChoice;
let pastGobChoice;
let gobBossEnraged = false; // init
async function goblinBossAttack() {
  let gobBoss = getFirst(mobboss);

  if (gobBossHp < 13) {
    if (gobBossEnraged === false) {
      playTune(bossRage, 1);
    }

    gobBossEnraged = true;
    legend.set(mobboss, frames[mobboss].RAGE)
  }
  if (gobBoss) {
    allowBossAttack = true;
    const options = ["surroundXaoe", "eggSummon", "sideaoe"];
    let randomIndex = Math.floor(Math.random() * options.length);

    gobChoice = options[randomIndex];


    if (pastGobChoice === gobChoice) {
      pastGobChoice = gobChoice;
      goblinBossAttack();
      return;

    }
    if (gobChoice === "surroundXaoe") {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 3; j++) {
          addSprite(gobBoss.x + i, gobBoss.y + j, warningtile);
          1
        }
      }
      addSprite(gobBoss.x - 2, gobBoss.y, warningtile);
      addSprite(gobBoss.x - 2, gobBoss.y + 1, warningtile);
      addSprite(gobBoss.x + 2, gobBoss.y, warningtile);
      addSprite(gobBoss.x + 2, gobBoss.y + 1, warningtile);
      if (gobBossEnraged) {
        addSprite(gobBoss.x - 2, gobBoss.y - 1, warningtile);
        addSprite(gobBoss.x + 2, gobBoss.y - 1, warningtile);
        addSprite(gobBoss.x, gobBoss.y + 3, warningtile);
      }
      setTimeout(() => {
        startslashing("down", 45);
      }, 1000);
    }
    if (gobChoice === "eggSummon") {
      let xchoices = [2, 3, 4, 6, 7, 8]
      let ychoices = [3, 4, 6]

      let randomx = Math.floor(Math.random() * xchoices.length)
      let randomy = Math.floor(Math.random() * ychoices.length)

      if (eggCount < 6) {
        addSprite(xchoices[randomx], ychoices[randomy], mobegg)
        eggCount++;
        randomx = Math.floor(Math.random() * xchoices.length)
        randomy = Math.floor(Math.random() * ychoices.length)
        addSprite(xchoices[randomx], ychoices[randomy], mobegg)
        eggCount++;

        if (gobBossEnraged === true) { // harder after 50% hp
          randomx = Math.floor(Math.random() * xchoices.length)
          randomy = Math.floor(Math.random() * ychoices.length)
          addSprite(xchoices[randomx], ychoices[randomy], mobegg)
          eggCount++;
          eggOpenTime = 700;
        }
      }
      if (eggCount > 0) {
        for (let i = 0; i <= eggCount; i++) {
          setTimeout(() => {
            let egg = getFirst(mobegg)
            addSprite(egg.x, egg.y, mob)
            egg.remove();
          }, eggOpenTime)
          eggCount--;
        }
      }
    }
    if (gobChoice === "sideaoe") {
      for (let i = 1; i < 3; i++) {
        for (let j = 1; j < 7; j++) {
          addSprite(i, j, warningtile);
        }
      }
      for (let i = 8; i < 10; i++) {
        for (let j = 1; j < 7; j++) {
          addSprite(i, j, warningtile);
        }
      }
      addSprite(3, height() - 2, warningtile)
      addSprite(7, height() - 2, warningtile)
      addSprite(3, height() - 3, warningtile)
      addSprite(7, height() - 3, warningtile)
      addSprite(4, height() - 2, warningtile)
      addSprite(6, height() - 2, warningtile)
      setTimeout(() => {
        startslashing("down", 25)
        if (gobBossEnraged) { sideslashsecondattack() }
      }, 900)
    }

    pastGobChoice = gobChoice;
  }
}

function startslashing(dir, delayBetweenSlashMs) {
  let slashanimInterval = setInterval(slashWarningTiles, delayBetweenSlashMs)
  let runcount = 0
  slashWarningTiles()

  function slashWarningTiles() {
    let mapheight = height()
    let warningtiles = getAll(warningtile)
    if (dir === "down") {
      warningtiles.forEach(tile => {

        if (tile.y === runcount) {
          addSprite(tile.x, tile.y, bossslash)
          playTune(slash)
          tile.remove();
          let slashes = getAll(bossslash)
          slashes.forEach(s => {
            if (plr && plr.x === s.x && plr.y === s.y) {
              clearAllSlashes();
              playerCollided();
              if (playerCollided && getFirst(hollowboss)) {
                finalBossHp += 3;
                playTune(heal)
                clearText();
                addText("HP: " + finalBossHp, {
                  x: 2,
                  y: 1,
                  color: color`2`
                })
              }
            }

            if (s.y + 1 === runcount)
              s.remove();
          })
        }
      })
      runcount++;

      if (runcount >= mapheight) {
        runcount = 0;
        clearInterval(slashanimInterval)
        clearAllSlashes();
      }
    }
    if (dir === "up") {
      let cc = (mapheight - runcount);
      warningtiles.forEach(tile => {

        if (tile.y === cc) {
          addSprite(tile.x, tile.y, bossslash)
          playTune(slash)
          tile.remove();
          let slashes = getAll(bossslash)
          slashes.forEach(s => {
            if (plr.x === s.x && plr.y === s.y) {
              clearAllSlashes();
              playerCollided();
              if (playerCollided && getFirst(hollowboss)) {
                finalBossHp += 3;
                playTune(heal)
                clearText();
                addText("HP: " + finalBossHp, {
                  x: 2,
                  y: 1,
                  color: color`2`
                })
              }
            }

            if (s.y - 1 === runcount)
              s.remove();
          })
        }
      })
      runcount++;
      if (cc <= 0) {
        runcount = 0;
        clearInterval(slashanimInterval)
        clearAllSlashes();
      }
    }

  }
}

function sideslashsecondattack() {
  if (gobBossHp > 0) {
    setTimeout(() => {
      for (let i = 2; i < 7; i++) {
        addSprite(4, i, warningtile);
      }
      for (let i = 2; i < 7; i++) {
        addSprite(6, i, warningtile);
      }
      addSprite(5, 3, warningtile);
      setTimeout(() => { startslashing("up", 50); }, 500)

    }, 150);
  }
}

function clearAllSlashes() {
  let slashes = getAll(bossslash)
  slashes.forEach(s => {
    s.remove();
  })
}

setInterval(goblinBossAttack, 2000)


let bossFishHp = 30; // put all these in init once done
let bossFishEnraged = false; // init false
let pastFishChoice;
let fishChoice;
let spawnedfishdefeated = false;
let okToChooseFishOption = true;
var allowBossAttack = false; // init
async function fishBossAttack() {
  let fsBo = getFirst(bossfish)
  if (bossFishHp < 16) {
    if (!bossFishEnraged) {
      bossFishEnraged = true;
      addSprite(0, 1, revlavafish)
      addSprite(width() - 1, 1, lavafish)
      okToChooseFishOption = false;
      playTune(bossRage)
      legend.set(bossfish, frames[bossfish].RAGE)
      fsBo.remove();
    }



    if (!spawnedfishdefeated && !getFirst(lavafish) && !getFirst(revlavafish)) { // set spawned fish to defeated tho
      addSprite(5, 4, bossfish);
      let lvsps = getAll(lava)
      lvsps.forEach(l => { l.remove() })
      spawnedfishdefeated = true;
      okToChooseFishOption = true;
      fishBossAttack()
    }

  }
  if (fsBo && okToChooseFishOption && stage === 2) {
    allowBossAttack = true;
    const options = ["bombs", "erupt", "encirclingfire", "linesslash"] // [fireslash]  & summon both fish and invul ONE TIME once raged

    let randomIndex = Math.floor(Math.random() * options.length);
    fishChoice = options[randomIndex];

    if (pastFishChoice === fishChoice) {
      pastFishChoice = fishChoice;
      fishBossAttack();
      return;
    }

    if (fishChoice === 'bombs') {
      let xopt = [fsBo.x - 1, fsBo.x + 1]
      let yopt = [2, 3, 4, 5]
      let bombN = 2
      if (bossFishEnraged) {
        bombN = 4;
      }

      setTimeout(() => {
        selRandomBombs()
        fishExpBombs()

      }, 1500)


      function selRandomBombs() {
        for (let i = 0; i < bombN; i++) {
          let rx = Math.floor(Math.random() * xopt.length);
          let ry = Math.floor(Math.random() * yopt.length);
          let cx = xopt[rx]
          let cy = yopt[ry]
          addSprite(cx, cy, bomb)
        }
      }
      selRandomBombs()

      fishExpBombs()

    }
    if (fishChoice === 'erupt') { // add a cooldown so bomb isnt twice in a row
      lavaEruption(200);


    }
    if (fishChoice === 'linesslash') {
      startLines(500)

    }
    if (fishChoice === 'encirclingfire') {
      startEncircle(500);

    }


    pastFishChoice = fishChoice;
  }
}

function fishExpBombs() {
  let aBmbs = getAll(bomb)
  playTune(bombTick);

  aBmbs.forEach(b => {
    for (let i = (b.x - 1); i < (b.x + 2); i++) {
      for (let j = (b.y - 1); j < (b.y + 2); j++) {
        addSprite(i, j, warningtile)
      }
    }
  })
  setTimeout(() => {
    aBmbs.forEach(b => {
      for (let i = (b.x - 1); i < (b.x + 2); i++) {
        for (let j = (b.y - 1); j < (b.y + 2); j++) {
          let expldTile = getTile(i, j);

          if (expldTile && allowBossAttack) {
            for (let k = 0; k < expldTile.length; k++) {
              if (expldTile[k].type != lockeddoor &&
                expldTile[k].type != pressureplate &&
                expldTile[k].type != housedoor &&
                expldTile[k].type != hppotion &&
                expldTile[k].type != lava &&
                expldTile[k].type != mobboss &&
                expldTile[k].type != bossfish &&
                expldTile[k].type != curse &&
                expldTile[k].type != water &&
                expldTile[k].type != crate &&
                expldTile[k].type != commonchest &&
                expldTile[k].type != rarechest &&
                // expldTile[k].type != epicchest &&
                expldTile[k].type != heart &&
                expldTile[k].type != spawn &&
                expldTile[k].type != door &&
                expldTile[k].type != brokenrocks &&
                expldTile[k].type != door &&
                expldTile[k].type != healingheart &&
                expldTile[k].type != advancetile &&
                expldTile[k].type != hiddenadvance &&
                expldTile[k].type != black &&
                stage === 2 &&
                expldTile[k].type != player) {
                expldTile[k].remove()
                // addSprite(i, j, brokenrocks); // add back if not  conflicts with eruption
              } else if (stage === 2 && expldTile[k].type === player) {
                playerCollided()
              }
            }
          }
          let wts = getAll(warningtile)
          wts.forEach(wt => { wt.remove() })
        }
      }
    })


  }, 1400);

}

function lavaEruption(ms) {
  let tming = ms; // ms between
  let fsBo = getFirst(bossfish)

  if (bossFishEnraged) {
    let fishposrandomOpts = [
      [2, 5],
      [5, 4],
      [8, 5],
      [2, 2],
      [5, 1],
      [8, 2]
    ] // reappear and disappear
    let rndind2 = Math.floor(Math.random() * fishposrandomOpts.length)
    let movementTil = fishposrandomOpts[rndind2]
    console.log(movementTil)
    fsBo.remove();
    setTimeout(() => { addSprite(movementTil[0], movementTil[1], bossfish) }, tming * 14)
  }



  prepareEruption(2, 5) // 0 timeout
  setTimeout(() => {
    prepareEruption(5, 4)
  }, tming * 3)
  setTimeout(() => {
    prepareEruption(8, 5)
  }, tming * 5)
  setTimeout(() => {
    prepareEruption(2, 2)
  }, tming * 7)
  setTimeout(() => {
    prepareEruption(5, 1)
  }, tming * 9)
  setTimeout(() => {
    prepareEruption(8, 2)
  }, tming * 11)
  setTimeout(() => {
    let ltz = getAll(lava)
    ltz.forEach(ll => { ll.remove() })
  }, tming * 15)
  setTimeout(() => {
    for (let i = 2; i <= 16; i += 2) {
      setTimeout(() => {
        let wts = getAll(brokenrocks)
        wts.forEach(t => {
          addSprite(t.x, t.y, lava)
          if (plr && plr.x === t.x && plr.y === t.y)
            playerCollided();
          t.remove()
        })
      }, tming * i)
    }
  }, 150)
}

function prepareEruption(startx, starty) { // 2x2 grid 
  for (let i = startx; i < startx + 2; i++) {
    for (let j = starty; j < starty + 2; j++) {
      let xrokTil = getTile(i, j)

      for (let k = 0; k < xrokTil.length; k++) {
        if (xrokTil[k].type != 'p' && xrokTil[k].type != bossfish && xrokTil[k].type != sword && xrokTil[k].type != black && xrokTil[k].type != lava && allowBossAttack)
          xrokTil[k].remove()
      }
      addSprite(i, j, brokenrocks)
    }
  }
  playTune(danger);
}

function startEncircle(intervalMs) {
  let encircleInterval = setInterval(fireEncircle, intervalMs)
  let fireEncircleRuncount = 0;

  function fireEncircle() {

    let w = width()
    let h = (height() - 1)
    w -= fireEncircleRuncount
    h -= fireEncircleRuncount


    for (let i = fireEncircleRuncount + 1; i < w; i++) {
      if (allowBossAttack) {
        addSprite(i, fireEncircleRuncount, fireball)
      }
      if (plr.x === i && plr.y === fireEncircleRuncount)
        playerCollided()
    }
    for (let i = fireEncircleRuncount; i < w; i++) {
      if (allowBossAttack) {
        addSprite(i, h, fireball)
      }
      if (plr.x === i && plr.y === h)
        playerCollided()
    }


    fireEncircleRuncount++

    if (fireEncircleRuncount >= 5) {
      clearInterval(encircleInterval)
      fireEncircleRuncount = 0;
      let fz = getAll(fireball)
      setTimeout(() => {
        fz.forEach(f => {
          f.remove()
        })

        if (bossFishEnraged) {
          // idk this boss is already hard so keeping for now
        }

      }, 350)

    }



  }
}

let lineRunning = false;
let middleWarning = false;

function startLines(intervalMs) {
  let lineInterval = setInterval(lineFire, intervalMs)
  let lineFireRuncount = 0;


  function lineFire() {
    let w = width() - 1
    let h = height() - 1

    if (!lineRunning) {
      for (let cc = 0; cc < h; cc++) {
        if (allowBossAttack) {
          addSprite(lineFireRuncount, cc, fireball)
          addSprite(w - lineFireRuncount, cc, fireball)
        }
        if (plr.x === lineFireRuncount && plr.y === cc)
          playerCollided()
        if (plr.x === (w - lineFireRuncount) && plr.y === cc)
          playerCollided()
      }
    } else
      return

    setTimeout(() => {
      let fz = getAll(fireball)
      fz.forEach(f => {
        f.remove()
      })
    }, (intervalMs / 3))

    if (bossFishEnraged) {
      if (lineFireRuncount >= 5) { // one extra
        lineFireRuncount = 0;
        let checkundef = clearInterval(lineInterval);
        if (checkundef === undefined)
          console.log('supposedly worked Enraged')
        lineRunning = false;
        middleWarning = false;

      } else if (lineFireRuncount < 5) {

        if (!middleWarning) {
          for (let q = 0; q < h; q++) {
            addSprite(5, q, warningtile)
            addSprite(6, q, warningtile)
          }
          setTimeout(() => {
            let wts = getAll(warningtile)
            wts.forEach(w => { w.remove() })
          }, 500)
          middleWarning = true;
        }

        lineFireRuncount++;
      }
    } else {
      if (lineFireRuncount >= 4) {
        lineFireRuncount = 0;
        let checkundef = clearInterval(lineInterval);
        if (checkundef === undefined)
          console.log('supposedly worked')
        lineRunning = false;
      } else if (lineFireRuncount < 4) {
        lineFireRuncount++;
      }
    }

  }
}

let bossFishInt;


let finalBossInt; // init when u walk out of spawn
let finalBossHp = 75; // init 75 is good i think
let finalBossEnraged = false;
let finalCharging = false;
let finalBossMsBetweenAttacks = 3500
let finalBossChoice;
let finalBossPrevChoice;
let finalBossRestChoiceCount = 1 // atevery 10 or so do a rest and charge attack
let chosenStars = [];
let starCounter = 0;
async function finalBossAttack() {
  let hob = getFirst(hollowboss);
  let choice;
  let hgt = (height() - 1)
  let wdt = (width() - 1)
  if (finalBossHp < 37) {
    if (finalBossEnraged === false) {
      playTune(bossRage, 1);
      finalBossMsBetweenAttacks = 3150;
      clearInterval(finalBossInt)
      finalBossInt = setInterval(finalBossAttack, finalBossMsBetweenAttacks)
    }

    finalBossEnraged = true;
    legend.set(hollowboss, frames[hollowboss].RAGE)
  }
  if (hob) {
    allowBossAttack = true;
    const options = ["slashes", "stars", "home", "beam"];
    let randomIndex = Math.floor(Math.random() * options.length);

    finalBossChoice = options[randomIndex];

    if (finalBossChoice === finalBossPrevChoice) {
      finalBossAttack()
      return;
    }
    if (finalCharging) {
      finalBossRestChoiceCount++;
      hob.x = 6;
      hob.y = 1;


      setTimeout(() => { beam(1, 1000) }, 10)

      setTimeout(() => {

        beam(1, 800)
      }, 1150)
      setTimeout(() => {

        beam(1, 800)
      }, 2150)
      finalCharging = false;
      return;
    }

    if (finalBossRestChoiceCount % 13 === 0) { // every 13th attack
      finalBossRestChoiceCount++;
      setTimeout(() => {
        for (let i = 2; i < 11; i++) {
          addSprite(i, 1, warningtile)
        }
        addSprite(1, 2, warningtile)
        addSprite(11, 2, warningtile)
        starCounter = 0
        chosenStars = []
        setTimeout(() => {
          for (let i = 2; i < 11; i++) {
            addSprite(i, 1, star)
            console.log("charge stars")
          }
          addSprite(1, 2, star)
          addSprite(11, 2, star)
          let wts = getAll(warningtile)
          wts.forEach(w => { w.remove() })
          setTimeout(() => {shootStars() }, 100)
        }, 1000)
      }, 1500)

      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          finalBossHp++;
          playTune(heal)
          clearText();
          addText("HP: " + finalBossHp, {
            x: 2,
            y: 1,
            color: color`2`
          })
        }, i * 100)
      }

      hob.x = 6;
      hob.y = 1;

      finalCharging = true;
      legend.set(hollowboss, frames[hollowboss].CHARGE)
      setLegend(...legend.values())
              setTimeout(() => {
            legend.set(hollowboss, frames[hollowboss].NORM) // noraml
          }, 2999)
      return;
    }

    //attacks

    if (finalBossChoice === 'slashes') {

      finBossSlashes()

    }
    if (finalBossChoice === 'stars') {
      console.log(chosenStars)
      playTune(starFall)
      starCounter = 0

      for (let i = 2; i < 11; i++) {
        addSprite(i, 1, warningtile)
      }
      addSprite(1, 2, warningtile)
      addSprite(11, 2, warningtile)
      setTimeout(() => {
        for (let i = 2; i < 11; i++) {
          addSprite(i, 1, star)

        }
        addSprite(1, 2, star)
        addSprite(11, 2, star)
        let wts = getAll(warningtile)
        wts.forEach(w => { w.remove() })
        shootStars()
      }, 400)
    }
    if (finalBossChoice === 'home') {
      homing()
      setTimeout(() => { homing() }, 1100)
      setTimeout(() => { homing() }, 2000)
    }
    if (finalBossChoice === 'beam') {
      hob.y = 2
      hob.x = 1;

      beam(1, 800)
      setTimeout(() => {
        hob.x = 11;
        hob.y = 2;
        beam(1, 800)
      }, 950)
      setTimeout(() => {
        hob.y = 1;
        hob.x = 6;
        if (finalBossEnraged) {
          beam(2, 790) // makes y+1l
        }
      }, 1900)
    }

    finalBossPrevChoice = finalBossChoice
    finalBossRestChoiceCount++;
  }
}


function beam(instance, timeUntilExplode) {
  let start = { x: plr.x, y: plr.y + Math.floor(instance / 2) }
  let end = { x: getFirst(hollowboss).x, y: getFirst(hollowboss).y }

  let dx = end.x - start.x
  let dy = end.y - start.y

  let bms = getAll(purplelightning)
  if (bms) {
    bms.forEach(b => { b.remove() })
  }

  for (let i = 0; i <= Math.max(Math.abs(dx), Math.abs(dy)); i++) {
    let x = start.x + Math.round((i / Math.max(Math.abs(dx), Math.abs(dy))) * dx)
    let y = start.y + Math.round((i / Math.max(Math.abs(dx), Math.abs(dy))) * dy)

    addSprite(x, y, warningtile)
    addSprite(x - 1, y, warningtile)
    addSprite(x + 1, y, warningtile)
  }

  setTimeout(() => {
    let wts = getAll(warningtile)
    wts.forEach(w => {
      playTune(lightningStrike)
      addSprite(w.x, w.y, purplelightning)
      if (plr && plr.x === w.x && plr.y === w.y)
        playerCollided(2)
      w.remove();
    })
    setTimeout(() => {
      let bms = getAll(purplelightning)
      if (bms) {
        bms.forEach(b => { b.remove() })
      }
    }, 100)
  }, timeUntilExplode)


}

function homing() {
  let plrx = plr.x
  let plry = plr.y

  function isTileEmpty(x, y) {

    const tileSprites = getTile(x, y)
    const hasCollide = tileSprites.some(sprite => [wall2, amethyst, spawn, lockeddoor].includes(sprite.type))
    const mapWidth = width()
    const mapHeight = height()
    const isWithinBounds = x >= 0 && x < mapWidth && y >= 0 && y < mapHeight


    return (isWithinBounds && !hasCollide)
  }

  for (let m = plrx - 1; m <= plrx + 1; m++) {
    for (let n = plry - 1; n <= plry + 1; n++) {
      if (isTileEmpty(m, n)) {
        addSprite(m, n, warningtile)
      }
    }
  }

  if (finalBossEnraged) {
    for (let k = -2; k < 3; k += 4) {
      if (isTileEmpty(plrx - k, plry) === true) {
        addSprite(plrx - k, plry, warningtile)
      }
      if (isTileEmpty(plrx, plry - k) === true) {
        addSprite(plrx, plry - k, warningtile)
      }
    }
  }

  let tileChoices = getAll(warningtile)
  let randIndexForThisTile = Math.floor(Math.random() * tileChoices.length)
  let randTile = tileChoices[randIndexForThisTile]


  setTimeout(() => {
    console.log(tileChoices)
    getFirst(hollowboss).x = randTile.x
    getFirst(hollowboss).y = randTile.y

    startslashing('down', 25)
  }, 600)

}

function finBossSlashes() {

  addSprite(6, 2, warningtile)
  for (let i = 1; i < height(); i++) {
    addSprite(i, i, warningtile);
    addSprite(i + 1, i, warningtile);
    addSprite(i + 2, i, warningtile);

    if (finalBossEnraged) {
      addSprite(i + 3, i, warningtile)
    }
  }


  setTimeout(() => {
    getFirst(hollowboss).x = 6;
    getFirst(hollowboss).y = 2;
    startslashing('down', 25);
    setTimeout(() => {

      for (let i = 2; i < height(); i++) {
        addSprite(i, height() - i, warningtile);
        addSprite(i + 1, height() - i, warningtile);
        addSprite(i + 2, height() - i, warningtile);

      }

      setTimeout(() => { // slash      

        startslashing('up', 25)
        setTimeout(() => {

          for (let i = 1; i < width() - 1; i++) {
            addSprite(i, 5, warningtile)
            addSprite(i, 4, warningtile)
            addSprite(i, 3, warningtile)
            if (finalBossEnraged) {
              addSprite(i, 6, warningtile)
            }
          }

          setTimeout(() => { startslashing('down', 40) }, 500)
        }, 400)

      }, 500)


    }, 200) // transition

  }, 700)
}
let shootStarsTimer = setTimeout(shootStars, 250);

function shootStars() { // this naming is confusing oops
  let stars = getAll(star)

  if (stars.length === 0) {
    console.log("No stars available: check spawning?!");
    return;
  }

  if (starCounter > 14) { // exit
    console.log("Exiting stars")
    starCounter = 0
    stars.forEach(s => {
      s.remove()
    })
    stars = []
    chosenStars = []
    clearTimeout(shootStarsTimer);
    return;

  }

  let randomStarId = Math.floor(Math.random() * stars.length)
  let randomStar = stars[randomStarId];

  if (chosenStars.includes(randomStar) && starCounter < 11) {
    shootStars()
  } else {
    chosenStars.push(randomStar);
    starMove();
    clearTimeout(shootStarsTimer);
    shootStarsTimer = setTimeout(shootStars, 250);
  }

}

function starMove() {
  starCounter++;
  console.log(getAll(star))
  chosenStars.forEach(str => {
    if (str != undefined) {
      if (str && str.y < 7) {
        str.y++;
        if (getFirst(player) && str.y === getFirst(player).y && str.x === getFirst(player).x) {
          playerCollided();
        }
        return true;
      } else
        str.remove();
      return false;
    }
  })
  console.log(chosenStars)
}





function defeatEnemy(enemy) {
  enemy.remove();
  playTune(killEnemy);
  score++;
  if (enemy.type === lavafish || enemy.type === revlavafish)
    score += 4;
}

function defeatBoss(boss) {
  boss.remove()
  score += 100;

  let exit = getFirst(lockeddoor)
  addSprite(exit.x, exit.y, door) // heal player after defeated boss
  exit.remove();

  let attackwarners = getAll(warningtile)
  let slashes = getAll(bossslash)
  let fiyaz = getAll(fireball)
  let lavas = getAll(lava)
  let stars = getAll(star)
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      attackwarners.forEach(tile => { tile.remove() })
      slashes.forEach(s => { s.remove(); })
      fiyaz.forEach(f => { f.remove() })
      lavas.forEach(l => { l.remove() })
      stars.forEach(z => { z.remove() })
    }, i * 10)
  }
  playTune(killEnemy);
  bgm.end();
  clearText();
  playTune(killBoss);
  //getFirst(door.. ) replace with thing)
}


function heartPickup() {
  if (health < maxhealth) {
    health++;
    playTune(heal)
    handleHealthUI(health);
    createHeartsArray(health);
    getFirst(healingheart).remove();
  } else {
    addText("max health: " + maxhealth, {
      x: (width() / 2),
      y: 3,
      color: color`3`
    })
    setTimeout(() => {
      clearText();
    }, 1500);

  }


}

function potionHeal() {
  playTune(heal)
  if (health < maxhealth) {
    health++;
    handleHealthUI(health);
    createHeartsArray(health);
  } else if (health === maxhealth) {
    addText("max health: " + maxhealth, {
      x: (width() / 2),
      y: 3,
      color: color`3`
    })
    setTimeout(() => {
      clearText();
    }, 1500);
  }

}
let boostactive = false;

function boostAttackSpeed(timeActive) {
  let tempCdTime = cooldownTime
  cooldownTime = (tempCdTime - 200)
  boostactive = true;
  addSprite(plr.x, plr.y, boostparticles)
  playTune(boostStart);
  setTimeout(() => {
    cooldownTime = tempCdTime;
    playTune(boostEnd);
    boostactive = false;
    let pxp = getAll(boostparticles)
    pxp.forEach(p => { p.remove(); })
  }, timeActive)
}

function bombExplosion(startx, starty) {

  playTune(bombTick);
  setTimeout(() => {
    getFirst(bomb).remove();
    for (let i = (startx - 1); i < (startx + 2); i++) {
      for (let j = (starty - 1); j < (starty + 2); j++) {
        let expldTile = getTile(i, j);
        console.log(`Exploding tiles at (${i}, ${j}):`, expldTile);
        if (expldTile) {
          for (let k = 0; k < expldTile.length; k++) {
            if (expldTile[k].type != lockeddoor &&
              expldTile[k].type != pressureplate &&
              expldTile[k].type != housedoor &&
              expldTile[k].type != lava &&
              expldTile[k].type != hppotion &&
              expldTile[k].type != mobboss &&
              expldTile[k].type != hollowboss &&
              expldTile[k].type != bossfish &&
              expldTile[k].type != curse &&
              expldTile[k].type != water &&
              expldTile[k].type != crate &&
              expldTile[k].type != commonchest &&
              expldTile[k].type != rarechest &&
              expldTile[k].type != epicchest &&
              expldTile[k].type != heart &&
              expldTile[k].type != spawn &&
              expldTile[k].type != door &&
              expldTile[k].type != door &&
              expldTile[k].type != healingheart &&
              expldTile[k].type != advancetile &&
              expldTile[k].type != hiddenadvance &&
              expldTile[k].type != black &&
              expldTile[k].type != player) {
              expldTile[k].remove()
              addSprite(i, j, brokenrocks);
            }
          }
        }
      }
    }
  }, 2790);
}

let invincible = false;

function playerCollided(dmg) { //collide with normal mob
  if (!invincible) {
    if (arguments.length === 0)
      health--;
    if (arguments.length >= 1) {
      health -= dmg;
      setTimeout(() => { playTune(hit); }, 100)
    }

    if (strbuff === true) {
      strbuff = false
      let asp = getAll(strengthparticles)
      if (asp) {
        asp.forEach(ptc => {
          ptc.remove()
          swordDmg--;
        })
      }
    }

    invincible = true;
    handleHealthUI(health);
    createHeartsArray(health);
    checkGameOver() // to get best grave placement
    playTune(hit);


    if (!gameOver) {
      setTimeout(() => {
        if (playerDir === "RIGHT") {
          plr.x--;
          addSprite(plr.x, plr.y, invincibility);
        }
        if (playerDir === "LEFT") {
          plr.x++;
          addSprite(plr.x, plr.y, invincibility);
        }
        if (playerDir === "UP") {
          plr.y++;
          addSprite(plr.x, plr.y, invincibility);
        }
        if (playerDir === "DOWN") {
          plr.y--;
          addSprite(plr.x, plr.y, invincibility);
        }
      }, 25);
    }


    // getFirst(player).x = spawnSprite.x;
    // getFirst(player).y = spawnSprite.y;



    setTimeout(() => {
      invincible = false;
      if (getFirst(invincibility))
        getFirst(invincibility).remove();
    }, 1000);
    return true;
  } else {
    return false;
  }
}





function stillDamage() { // same but without resetting to spawn
  health--;
  handleHealthUI(health);
  createHeartsArray(health)
  playTune(hit);
  checkGameOver()
}

function checkGameOver() {
  if (health <= 0) { // if game over (maybe add invincibility item)
    const plrgrave = addSprite(plr.x, plr.y, hurtplayer);

    clearText();
    plr.remove();
    if (getFirst(invincibility))
      getFirst(invincibility).remove();

    gameOver = true;

    bgm.end()
    playTune(gameoversound);
    for (let i = 0; i < width() / 2 + Math.floor(width() / 3); i++) {
      for (let j = 0; j < height() / 3; j++) {
        addSprite(i, j, black)
      }
    }
    setTimeout(() => {
      addText("Game Over", {
        x: 1,
        y: 2,
        color: color`3`
      })
      addText("Score: " + score, {
        x: 1,
        y: 3,
        color: color`7`
      })
      addText("Play again: j", {
        x: 1,
        y: 4,
        color: color`4`
      })
    }, 200)
  }
}

let stage = 1;
let strbuff = false;
let bossRushEnabled = false;
let swordDmg = 1 // init plr dmg per sword attack ; can grow
function initGame() { //  used for restart after death
  level = 1
  levelspassed = 0
  stage = 1
  bossRushEnabled = false;
  score = 0;

  allowBossAttack = false;
  clearInterval(finalBossInt)
  bossRushEnabled = false;
  chosenLevels = []
  resetMap(1)

  timestopped = false;
  currentbgm = "villagebgm" //init


  getAll(fireball).forEach(f => { f.remove() })

  clearText();
  levelOneSetDeco();

  health = maxhealth;
  heartsArray = [];


  plr.x = 2;
  plr.y = 7;
  playerDir = "DOWN";

  gameOver = false;

  //reset buffs
  swordDmg = 1
  cooldown = false; // init
  cooldownTime = 400 // init; (can get smaller)
  interacting = false; // init

  //reset item
  itemsArray = [];
  clearTile(0, 0)
  addSprite(0, 0, grass)

  // reset bosses stats
  eggCount = 0;
  eggOpenTime = 1000;
  gobBossHp = 25;
  gobBossEnraged = false;

  bossFishHp = 30;
  bossFishEnraged = false;
  pastFishChoice;
  fishChoice;
  spawnedfishdefeated = false;
  okToChooseFishOption = true;

  finalBossHp = 75;
  finalBossEnraged = false;
  finalCharging = false;
  finalBossMsBetweenAttacks = 3500
  finalBossChoice = undefined;
  finalBossPrevChoice;
  finalBossRestChoiceCount = 1
  chosenStars = [];
  starCounter = 0;
    legend.set(hollowboss, frames[hollowboss].NORM)
      legend.set(mobboss, frames[mobboss].NORM)
        legend.set(bossfish, frames[bossfish].NORM)
  strbuff = false;
  plasmaswordActive = false;

  plr = getFirst(player)

  putGrassUnderRoofs()

}

function plrTouching(obj) {
  if (plr.x === obj.x && plr.y === obj.y)
    return true;
  else
    return false
}
