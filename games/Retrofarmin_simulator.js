/*
@title: RetroFarmin_Simulator_v1
@author: Stavros Arg 
@tags: ['retro', 'simulation', 'role-playing', 'humor']
@addedOn: 2025-09-17
@description: You can now be a farmer! In this game you are collecting eggs and selling them to upgrade your farm!

Welcome to RetroFarmin Simulator!
working on it since summer of 2024 :)

!DISCLAIMER: I am sorry for the messy code, this is my first 
actual code-javascript game. I have mostly worked on scratch!

Instructions:
You are a farmer, somewhere in the world! The whole game is about
collecting eggs and selling them, to buy more chicken and upgrade
your farm!
There are 10 levels in the game, and one extra for game completion
This is a very basic game. 
Where do I sell and where do I buy ugrades?
The buyers can be found outside your property, follow the gate-doors
You can upgrade your farm through your laptop computer, it is located
inside your house(The normal door)

That's all, have fun :)

!The text breaks when you reach 100k coins!
though you can still play
*/

const playerf = "a"
const blue = "2"
const green = "3"
const red = "4"
let player = [playerf]
let pdirection = "b"
const wheat = "b"
const bg1 = "c"
const door1 = "d"
const door2 = "e"
const farm = "f"
const farmwc = "g"
const farmwcg = "@"
const farmtr = "h"
const wood1 = "i"
const wood2 = "j"
const fencedoor1 = "l"
const grass = "m"
const woodfloor = "n"
const woodbg = "o"
const fencedoor2 = "p"
const buyer1 = "q"
const npctr = "r"
const border = "s"
const road = "t"
const roadbor = "u"
const pc = "v"
const pctr = "w"
const fence1 = "k"
const fence2 = "x"
const fencecor1 = "y"
const fencecor2 = "z"
const fencecor3 = "1"
const fencecor4 = "!"


//music 
const percussion = tune`
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: C4~67.11409395973155 + B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B4^67.11409395973155 + B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155 + C4~67.11409395973155,
67.11409395973155: B5-67.11409395973155 + B4^67.11409395973155,
67.11409395973155: B5-67.11409395973155`
const musicbg = tune`
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + G4-206.89655172413794 + B5-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794 + C5-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794 + E5-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794 + A4-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794 + G5-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794,
206.89655172413794: C4-206.89655172413794 + B5-206.89655172413794 + E4-206.89655172413794,
206.89655172413794: D4-206.89655172413794,
206.89655172413794: G4-206.89655172413794,
206.89655172413794: E4-206.89655172413794`
const walk = tune`
16000`
const up = tune`
75: G4/75,
75: A4/75,
75: B4/75,
75: C5/75,
75: B5/75 + D5/75,
2025`
const layegg = tune`
37.5: G5^37.5,
37.5,
37.5: B5^37.5,
1087.5`
const money = tune`
61.224489795918366: E4^61.224489795918366,
61.224489795918366: F4^61.224489795918366,
61.224489795918366: G4^61.224489795918366,
61.224489795918366: F4^61.224489795918366,
61.224489795918366: E4^61.224489795918366,
1653.061224489796`
const no = tune`
194.80519480519482: G4-194.80519480519482,
194.80519480519482: C4-194.80519480519482,
5844.1558441558445`
const ah = tune`
500: F4~500,
500: G4~500,
500: A4~500,
500: B4~500,
500: C5~500,
500: D5~500,
500: E5~500,
500: F5~500,
500: G5~500,
500: A5~500,
500: B5~500,
10500`
const goteggs = tune`
88.49557522123894: G4^88.49557522123894 + E5^88.49557522123894,
88.49557522123894,
88.49557522123894: B4^88.49557522123894 + G5^88.49557522123894 + B5^88.49557522123894,
2566.3716814159293`
const finish = tune`
157.06806282722513: C4-157.06806282722513 + F4^157.06806282722513,
157.06806282722513,
157.06806282722513: C4-157.06806282722513 + G4^157.06806282722513,
157.06806282722513,
157.06806282722513: C4-157.06806282722513 + A4^157.06806282722513,
157.06806282722513,
157.06806282722513: C4-157.06806282722513 + B4^157.06806282722513,
157.06806282722513,
157.06806282722513: C4-157.06806282722513 + A4^157.06806282722513,
157.06806282722513,
157.06806282722513: C4-157.06806282722513 + C5^157.06806282722513,
157.06806282722513: E5^157.06806282722513,
3141.361256544503`



setLegend(
  [playerf, bitmap`
...000000000....
..09999999990...
..0990000000....
..090FFFFFF0....
...00FCFFCF0....
....0FFFFFF0....
....0FFCCFF0....
....00000000....
......0440......
...0000440000...
...0F444444F0...
...0000440000...
......0440......
.....004400.....
....04444440....
....04000040....`],
  [blue, bitmap`
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
  [green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [red, bitmap`
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
  [door1, bitmap`
0C000000000000C0
0C0CCCCCCCCCC0C0
0C2CCCCCCCCCC0C0
0C2CCC0000CCC0C0
0C0CCC0660CCC0C0
0C0CCC0000CCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCC66C0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C2CCCCCCCCCC0C0
0C2CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0`],
  [door2, bitmap`
0C000000000000C0
0C0CCCCCCCCCC0C0
0C2CCCCCCCCCC0C0
0C2CCC0000CCC0C0
0C0CCC0770CCC0C0
0C0CCC0000CCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCC66C0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C2CCCCCCCCCC0C0
0C2CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0
0C0CCCCCCCCCC0C0`],
  [wheat, bitmap`
................
.6666C6666C6666.
.FFFFCFFFFCFFFF.
.6666C6666C6666.
.FFFFCFFFFCFFFF.
.6666C6666C6666.
.FFFFCFFFFCFFFF.
.6666C6666C6666.
.FFFFCFFFFCFFFF.
.6666C6666C6666.
.FFFFCFFFFCFFFF.
.6666C6666C6666.
.FFFFCFFFFCFFFF.
.6666C6666C6666.
.FFFFCFFFFCFFFF.
................`],
  [bg1, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [farmwc, bitmap`
................
.99999999999999.
.9CCCCCCCC000C9.
.9CC00CC0033309.
.9C000002222309.
.9C022222202209.
.9C0200022FF209.
.9022220023FF09.
.90122200113309.
.901100011000C9.
.9C0111110CCCC9.
.9C009090CCCCC9.
.9CC09090CCCCC9.
.9CC00000CCCCC9.
.99999999999999.
................`],
  [farmwcg, bitmap`
................
.99999999999999.
.9CCCCCCCC000C9.
.9CC00CC0033309.
.9C000006666309.
.9C066666606609.
.9C0600066FF609.
.9066660063FF09.
.90666600993309.
.909900099000C9.
.9C0999990CCCC9.
.9C009090CCCCC9.
.9CC09090CCCCC9.
.9CC00000CCCCC9.
.99999999999999.
................`],
  [farm, bitmap`
................
.55555555555555.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.5CCCCCCCCCCCC5.
.55555555555555.
................`],
  [farmtr, bitmap`
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
................`],
  [wood1, bitmap`
0000000000000000
0CCLCCCCCCCCCLC0
0LCCCCLCCLCCCLC0
0000000000000000
0LCLCCCCCCCCCCC0
0CCCCCLCCLCCCLC0
0000000000000000
0LCLCCCCCLCLCCC0
0CCCCCLCCCCCCLC0
0000000000000000
0LCCCCLCCCCCCLC0
0CCLCCCCCLCCCCC0
0000000000000000
0LCCCCLCCLCCCLC0
0CCLCCCCCCCCCCC0
0000000000000000`],
  [wood2, bitmap`
0000000000000000
0CL0CL0CL0CL0LC0
0CC0CC0CC0CC0CC0
0LC0LC0CL0CL0CL0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CL0CL0LC0LC0LC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CL0LC0CL0LC0LC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CC0CC0CC0CC0CC0
0CL0CL0LC0LC0LC0
0CC0CC0CC0CC0CC0
0000000000000000`],
  [fencedoor1, bitmap`
................
................
..CCCCCCCCCCCC..
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
..CCCCCCCCCCCC..`],
  [fencedoor2, bitmap`
................
................
..CCCCCCCCCCCC..
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
CCCC.C.C.C.C.CCC
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
..CC.C.C.C.C.C..
..CCCCCCCCCCCC..`],
  [grass, bitmap`
D1DDDDDDDDDDDDDD
DDDD4DD4DDD4D44D
DD4DDDDDD1DDDDDD
DDD4DDDDDDDD4DDD
4DDDD4DDD4DDDD4D
DDDDDDDDDDDD4DDD
DDD4DDDD4DDDDDDD
DD4DDD4DDD4D4DDD
DD4D4DDDDDDD4D4D
DD4DDD4DD4DDDDDD
DDDDDDDDDDDDDD4D
4DDD4DDD41D4DDDD
DDDDDD4DDDDDD4DD
DD4DDDDDD4DDDDDD
DDD4DDD4D4D1D4DD
DDDDDDDDDDDDDDDD`],
  [woodfloor, bitmap`
1111111111111111
11CCCCCCCCCCCC11
1C1CCCCCCCCCC1C1
1CC1CCCCCCCC1CC1
1CCC1CCCCCC1CCC1
1CCCC1CCCC1CCCC1
1CCCCC1CC1CCCCC1
1CCCCCC11CCCCCC1
1CCCCCC11CCCCCC1
1CCCCC1CC1CCCCC1
1CCCC1CCCC1CCCC1
1CCC1CCCCCC1CCC1
1CC1CCCCCCCC1CC1
1C1CCCCCCCCCC1C1
11CCCCCCCCCCCC11
1111111111111111`],
  [woodbg, bitmap`
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
  [buyer1, bitmap`
..000000000000..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCFFFFFFCC0..
..0CCFCFFCFCC0..
..000FFFFFF000..
....0FFCCFF0....
....00000000....
......0990......
...0000990000...
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000`],
  [npctr, bitmap`
LLLLLLLLLLLLLLLL
L1L111L1L11111LL
L12L1L11111L1L1L
L111L1L11011111L
L2112L1LL111212L
L111111L111LL11L
LL111L111L11121L
L11LL2011L1L1L1L
L11111L1111LL11L
L101L111L111L11L
L111L1111101L11L
LL1101L11LL1111L
L1111LL1111L1L1L
L1L11121L111111L
L1111L111111111L
LLLLLLLLLLLLLLLL`],
  [border, bitmap`
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
................`],
  [road, bitmap`
LLLLLLLLLLLLLLLL
LL1LLLLL1LLLLLLL
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLLLL
LLLLLLLL1LLLLLLL
LLLLLLLLLLL1LLLL
LL1L1LLLLLLLLLLL
LLLLLLLLLLLLLLLL
1LLLLLLLL1L1LLLL
LLLLLLLLLLLLL1LL
LLLLLLLLLLLLLLLL
LL1LL1LLLLLLLLLL
LLLLLLLLLLL1LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLL1LLLLLL
LLLLLLLLLLLLLLLL`],
  [roadbor, bitmap`
LLLLLLLLLLLLLLLL
LL1LLLLL1LLLLLLL
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLLLL
0LLLLLLL1LLLLLL0
LLLLLLLLLLL1LLLL
LL1L1LLLLLLLLL0L
LLLLLLLLLLLLLLLL
10LLLLLLL1L1LLLL
LLLLLLLLLLLLL1LL
LLLLLLLLLLLLLLLL
LL1LL1LLLLLLLLLL
0LLLLLLLLLL1LL0L
LLLLLLLLLLLLLLLL
LLLLLLLLL1LLLLLL
LLLLLLLLLLLLLLLL`],
  [pc, bitmap`
111111LLLLLLLLLL
11CCCCLLLLLLLLLL
1C1CCCLLL1111110
1CC1CCLL11111110
1CCC1CLL11100010
1CCCC1LL11100010
1CCCCCLL1LL00010
1CCCCCLL1LL00010
1CCCCCLL1LL00010
1CCCCCLL11100010
1CCCC1LL11100010
1CCC1CLL11100010
1CC1CCLL11111110
1C1CCCLLL1111110
11CCCCLLLLLL0LLL
111111LLLLLLLLLL`],
  [pctr, bitmap`
CCCCCCCCCCCCCCCC
CLLLLLLLLLLLLLLC
CLCCCCCCCCCCCCLC
CLC1111111111CLC
CLC1CCCCCCCC1CLC
CLC1C111111C1CLC
CLC1C1CCCC1C1CLC
CLC1C1C99C1C1CLC
CLC1C1C99C1C1CLC
CLC1C1CCCC1C1CLC
CLC1C111111C1CLC
CLC1CCCCCCCC1CLC
CLC1111111111CLC
CLCCCCCCCCCCCCLC
CLLLLLLLLLLLLLLC
CCCCCCCCCCCCCCCC`],
  [fence1, bitmap`
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....`],
  [fence2, bitmap`
................
................
................
................
0000000000000000
LLLLLLLLLLLLLLLL
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
LLLLLLLLLLLLLLLL
0000000000000000
................
................
................
................`],
  [fencecor1, bitmap`
................
................
................
................
....000000000000
....0LLLLLLLLLLL
....0LCCCCCCCCCC
....0LCCCCCCCCCC
....0LCCCCCCCCCC
....0LCCCCCCCCCC
....0LCCCCLLLLLL
....0LCCCCL00000
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....`],
  [fencecor2, bitmap`
................
................
................
................
000000000000....
LLLLLLLLLLL0....
CCCCCCCCCCL0....
CCCCCCCCCCL0....
CCCCCCCCCCL0....
CCCCCCCCCCL0....
LLLLLLCCCCL0....
00000LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....`],
  [fencecor3, bitmap`
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
00000LCCCCL0....
LLLLLLCCCCL0....
CCCCCCCCCCL0....
CCCCCCCCCCL0....
CCCCCCCCCCL0....
CCCCCCCCCCL0....
LLLLLLLLLLL0....
000000000000....
................
................
................
................`],
  [fencecor4, bitmap`
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL0....
....0LCCCCL00000
....0LCCCCLLLLLL
....0LCCCCCCCCCC
....0LCCCCCCCCCC
....0LCCCCCCCCCC
....0LCCCCCCCCCC
....0LLLLLLLLLLL
....000000000000
................
................
................
................`],

)




setSolids([playerf, wheat, farmwc, farm, wood1, fence1, fence2, fencecor1, fencecor2, fencecor3, fencecor4, wood2, buyer1, border, roadbor, pc]);


setPushables({
  [playerf]: [wheat]
})


let loop = 1;
let level = 0;
const menu = [
  map`
fffffffffffffffffffffff
ftttttttttttttttttttttf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ftttttttttttttttttttttf
fffffffffffffffffffffff`,
  map`
24242424242424242424242
42424242424242424242424
24333333333333333333342
42333333333333333333324
24333333333333333333342
42333333333333333333324
24333333333333333333342
42333333333333333333324
24333333333333333333342
42333333333333333333324
24333333333333333333342
42333333333333333333324
24333333333333333333342
42424242424242424242424
24242424242424242424242`,

]
const levels = [
  map`
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccc.................ccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc
ccccccccccccccccccccccc`,
  map`
yxllxxxxxxxxxxxxz
k...............k
k...hhhhhhhhh...k
k...hfffffffh...k
k...hfffgfffh...k
k...hfffffffh...k
k...hhhhhhhhh...k
k..............bk
k.............bbk
k............bbbk
!xxxxiiidiiixxxx1`,
  map`
iiiiieiiiii
jnnnnnnnnnj
jn.......nj
jn......wvj
jn.......nj
jn.......nj
jnnnnnnnnnj
iiiiiiiiiii`,
  map`
.iiii.......iiiik
.iooi.......iooik
xijjixxxxxxxiqqi1
..nn.........rr.s
................s
utttttttttttttttu
utttttttttttttttu
................s
s.........iii...s
s...............s
yxppxxxxxxxxxxxxz`,
  map`
fffffffffffffffffffffff
ftttttttttttttttttttttf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ft...................tf
ftttttttttttttttttttttf
fffffffffffffffffffffff`,

]


let mscene = 1
let manual = 0
let gameStart = 0
startm();


function startm() {

  setBackground(woodfloor);
  setMap(menu[1])
  addText("RetroFarmin", { x: 2, y: 4, color: color`6` });

  addText("Press L to start", { x: 2, y: 7, color: color`2` });
//  addText("manual", { x: 2, y: 8, color: color`F` });
//  addText("bit.ly/retrqf", { x: 2, y: 9, color: color`F` });
}


function intro() {

  addText("RetroFarmin", { x: 5, y: 7, color: color`4` });
  setMap(menu[1])
  setTimeout(() => {
    clearText();
    gameStart = 1
    level = level + 1
    setMap(levels[1])
    addSprite(8, 9, playerf)
    wheatplace();
    laidegg();

  }, 3000);
}

onInput("l", () => {
  intro();
})

//here, game starts and sets some more variables.

const upgrades = new Object();
upgrades.lv1 = 30;
upgrades.lv2 = 50;
upgrades.lv3 = 95;
upgrades.lv4 = 150;
upgrades.lv5 = 240;
upgrades.lv6 = 450;
upgrades.lv7 = 600;
upgrades.lv8 = 1000;
upgrades.lv9 = 3500;
upgrades.lv10 = 8000;
upgrades.lv11 = 1000000;
let upgradeable = false


//defaults
let xlevel = 0
let maxEggTime = 16000
let maxEggGen = 10
let minEggGen = 1
let eggGenTime = 3000
let addeggs = 0
let chickens = 1
let multipl = 2000 //this is a multilier so egg generation time never gets to 0
let coins = 0
let cantCollect = 0
let cooldown = 1
let eggs =10;
let eggnotification = null;
let collectegg = null;
let laideggs = 0
//laidegg();

function wheatplace() {
  const WheatY = Math.floor(Math.random() * 7) + 2;
  const WheatX = Math.floor(Math.random() * 2) + 13;
  addSprite(WheatX, WheatY, wheat)
}




// And this is where the magic begins
function collectedEggs() {

  cantCollect = 1
  randcool = Math.random() * (maxEggTime) + multipl;
  cooldown = Math.round(randcool);
  console.log("new cldn", cooldown, "max", maxEggTime);
  setTimeout(() => {
    cantCollect = 0
    playTune(layegg)
    laidegg();


  }, cooldown);

}


const isNearFarm = tilesWith(playerf, farmtr).length > 0;
const isNearNPC = tilesWith(playerf, npctr).length > 0;

function laidegg() {
  addeggs = Math.floor(Math.random() * (maxEggGen - minEggGen + 1)) + minEggGen;
  console.log("adegs", addeggs, "Max", maxEggGen);
  c = laideggs + addeggs
//  playTune(ah)
}





onInput("k", () => {
  const isNearPC = tilesWith(playerf, pctr).length > 0

  if (isNearPC) {
    if (xlevel == 0) {
      if (upgradeable) {
        xlevel = 1
        chickens = 3
        upgradeable = false
        maxEggTime = 15000
        maxEggGen = 20
        minEggGen = 4
        coins = coins - upgrades.lv1
        playTune(up)
      }
    }
    if (xlevel == 1) {
      if (upgradeable) {
        xlevel = 2
        chickens = 5
        upgradeable = false
        maxEggTime = 11000
        maxEggGen = 25
        minEggGen = 5
        coins = coins - upgrades.lv2
        playTune(up)
      }
    }

    if (xlevel == 2) {
      if (upgradeable) {
        xlevel = 3
        chickens = 7
        upgradeable = false
        maxEggTime = 11000
        maxEggGen = 40
        minEggGen = 5
        coins = coins - upgrades.lv3
        playTune(up)
      }
    }
    if (xlevel == 3) {
      if (upgradeable) {
        xlevel = 4
        chickens = 9
        upgradeable = false
        maxEggTime = 10000
        maxEggGen = 60
        minEggGen = 20
        coins = coins - upgrades.lv4
        playTune(up)
      }
    }

    if (xlevel == 4) {
      if (upgradeable) {
        xlevel = 5
        chickens = 10
        upgradeable = false
        maxEggTime = 10000
        maxEggGen = 80
        minEggGen = 20
        coins = coins - upgrades.lv5
        playTune(up)
      }
    }

    if (xlevel == 5) {
      if (upgradeable) {
        xlevel = 6
        chickens = 13
        upgradeable = false
        maxEggTime = 10000
        maxEggGen = 100
        minEggGen = 40
        coins = coins - upgrades.lv6
        playTune(up)
      }
    }

    if (xlevel == 6) {
      if (upgradeable) {
        xlevel = 7
        chickens = 15
        upgradeable = false
        maxEggTime = 10000
        maxEggGen = 200
        minEggGen = 95
        coins = coins - upgrades.lv7
        playTune(up)
      }
    }

    if (xlevel == 7) {
      if (upgradeable) {
        xlevel = 8
        chickens = 17
        upgradeable = false
        maxEggTime = 8000
        maxEggGen = 400
        minEggGen = 150
        coins = coins - upgrades.lv8
        playTune(up)
      }
    }

    if (xlevel == 8) {
      if (upgradeable) {
        xlevel = 9
        chickens = 19
        upgradeable = false
        maxEggTime = 8000
        maxEggGen = 2000
        minEggGen = 300
        coins = coins - upgrades.lv9
        playTune(up)
      }
    }

    if (xlevel == 9) {
      if (upgradeable) {
        xlevel = 10
        chickens = 21
        upgradeable = false
        maxEggTime = 11000
        maxEggGen = 500000
        minEggGen = 80000
        coins = coins - upgrades.lv10
        playTune(up)
      }
    }

    if (xlevel == 10) {
      if (upgradeable) {
        xlevel = 11
        chickens = 24
        upgradeable = false
        maxEggTime = 1000
        maxEggGen = 10
        minEggGen = 10
        coins = coins - upgrades.lv11
        playTune(finish)
      }
    }
  }
})


onInput("k", () => {
  const isNearNPC = tilesWith(playerf, npctr).length > 0
  if (isNearNPC) {
    if (eggs !== 0) {
      coins = (coins + 1 * eggs)
      eggs = 0
      playTune(money)





    }
  }
})



// input to collect eggss
onInput("k", () => {
 // if (laideggs !== 0) {
    const isNearFarm = tilesWith(playerf, farmtr).length > 0
    if (isNearFarm) {
      if (cantCollect == 0) {
        collectedEggs();
        eggs = eggs + addeggs
        playTune(goteggs)
        addText("collected " + addeggs + " eggs", { color: color`3`, y: 1 });
        addText("total: " + eggs + " eggs", { color: color`6`, y: 2 });

        addText(coins + " coins in total", { color: color`6`, y: 15 })
      }
  //  }
  }
})



function nearfarm() {
  addText(coins + " coins in total", { color: color`6`, y: 15 })
  if (cantCollect === 0) {
    addText("K to collect eggs", { color: color`6` })
  }
}




function nearNPC() {
  addText(coins + " coins in total", { color: color`6`, y: 15 })
  if (eggs !== 0) {

    addText("K to sell " + eggs + " eggs", { color: color`6` })
  }
}


function nearPC() {
  addText(coins + " coins in total", { color: color`6`, y: 15 })


  addText("k to upgrade farm", { color: color`6`, y: 0 })
  if (xlevel == 0) {
    if (coins >= upgrades.lv1) {
      addText("cost: " + upgrades.lv1, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv1, { color: color`3`, y: 1 })
  }
  if (xlevel == 1) {

    if (coins >= upgrades.lv2) {
      addText("cost: " + upgrades.lv2, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv2, { color: color`3`, y: 1 })
  }
  if (xlevel == 2) {
    if (coins >= upgrades.lv3) {
      addText("cost: " + upgrades.lv3, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv3, { color: color`3`, y: 1 })
  }
  if (xlevel == 3) {
    if (coins >= upgrades.lv4) {
      addText("cost: " + upgrades.lv4, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv4, { color: color`3`, y: 1 })
  }
  if (xlevel == 4) {
    if (coins >= upgrades.lv5) {
      addText("cost: " + upgrades.lv5, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv5, { color: color`3`, y: 1 })
  }
  if (xlevel == 5) {

    if (coins >= upgrades.lv6) {
      addText("cost: " + upgrades.lv6, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv6, { color: color`3`, y: 1 })
  }
  if (xlevel == 6) {

    if (coins >= upgrades.lv7) {
      addText("cost: " + upgrades.lv7, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv7, { color: color`3`, y: 1 })
  }
  if (xlevel == 7) {

    if (coins >= upgrades.lv8) {
      addText("cost: " + upgrades.lv8, { color: color`4`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv8, { color: color`3`, y: 1 })
  }
  if (xlevel == 8) {

    if (coins >= upgrades.lv9) {
      addText("cost: " + upgrades.lv9, { color: color`8`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv9, { color: color`3`, y: 1 })
  }
  if (xlevel == 9) {

    if (coins >= upgrades.lv10) {
      addText("cost: " + upgrades.lv10, { color: color`2`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv10, { color: color`3`, y: 1 })
  }
  if (xlevel == 10) {

    if (coins >= upgrades.lv11) {
      addText("cost: " + upgrades.lv11, { color: color`7`, y: 1 })
      upgradeable = true;
    } else
      addText("cost: " + upgrades.lv11, { color: color`3`, y: 1 })
  }
  if (xlevel == 11) {
    if (coins >= upgrades.lv11) {
      addText("CONGRATS", { color: color`9`, y: 1 })
      upgradeable = true;
    }
  }
}


function checkChick() {
  if (xlevel == 1) {
    console.log("one")
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
  }
  if (xlevel == 2) {
    console.log("two")
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
  }
  if (xlevel == 3) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
  }
  if (xlevel == 4) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
  }
  if (xlevel == 5) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
    addSprite(9, 3, farmwc)
  }
  if (xlevel == 6) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
    addSprite(9, 3, farmwc)
    addSprite(9, 5, farmwc)
    addSprite(10, 5, farmwc)
    addSprite(6, 5, farmwc)
  }
  if (xlevel == 7) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
    addSprite(9, 3, farmwc)
    addSprite(9, 5, farmwc)
    addSprite(10, 5, farmwc)
    addSprite(6, 5, farmwc)
    addSprite(10, 3, farmwc)
    addSprite(6, 3, farmwc)
  }
  if (xlevel == 8) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
    addSprite(9, 3, farmwc)
    addSprite(9, 5, farmwc)
    addSprite(10, 5, farmwc)
    addSprite(6, 5, farmwc)
    addSprite(10, 3, farmwc)
    addSprite(6, 3, farmwc)
    addSprite(5, 3, farmwc)
    addSprite(11, 3, farmwc)
  }
  if (xlevel == 9) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
    addSprite(9, 3, farmwc)
    addSprite(9, 5, farmwc)
    addSprite(10, 5, farmwc)
    addSprite(6, 5, farmwc)
    addSprite(10, 3, farmwc)
    addSprite(6, 3, farmwc)
    addSprite(5, 3, farmwc)
    addSprite(11, 3, farmwc)
    addSprite(5, 4, farmwc)
    addSprite(11, 4, farmwc)
  }
  if (xlevel == 10) {
    addSprite(7, 4, farmwc)
    addSprite(9, 4, farmwc)
    addSprite(6, 4, farmwc)
    addSprite(10, 4, farmwc)
    addSprite(7, 3, farmwc)
    addSprite(8, 3, farmwc)
    addSprite(7, 5, farmwc)
    addSprite(8, 5, farmwc)
    addSprite(9, 3, farmwc)
    addSprite(9, 5, farmwc)
    addSprite(10, 5, farmwc)
    addSprite(6, 5, farmwc)
    addSprite(10, 3, farmwc)
    addSprite(6, 3, farmwc)
    addSprite(5, 3, farmwc)
    addSprite(11, 3, farmwc)
    addSprite(5, 4, farmwc)
    addSprite(11, 4, farmwc)
    addSprite(5, 5, farmwc)
    addSprite(11, 5, farmwc)
  }
  if (xlevel == 11) {
    addSprite(7, 4, farmwcg)
    addSprite(9, 4, farmwcg)
    addSprite(6, 4, farmwcg)
    addSprite(10, 4, farmwcg)
    addSprite(7, 3, farmwcg)
    addSprite(8, 3, farmwcg)
    addSprite(7, 5, farmwcg)
    addSprite(8, 5, farmwcg)
    addSprite(9, 3, farmwcg)
    addSprite(9, 5, farmwcg)
    addSprite(10, 5, farmwcg)
    addSprite(6, 5, farmwcg)
    addSprite(10, 3, farmwcg)
    addSprite(6, 3, farmwcg)
    addSprite(5, 3, farmwcg)
    addSprite(11, 3, farmwcg)
    addSprite(5, 4, farmwcg)
    addSprite(11, 4, farmwcg)
    addSprite(5, 5, farmwcg)
    addSprite(11, 5, farmwcg)
    addSprite(8, 4, farmwcg)
  }
}




//walking
//this is not the best script for walking, but for this game, I think it will do
//maybe some day I will find out how to get directions to work lol

onInput("s", () => {
  getFirst(playerf).y += 1
  pdirection = "b"
  playTune(walk)
})
onInput("w", () => {

  getFirst(playerf).y += -1
  pdirection = "f"
  playTune(walk)
})
onInput("a", () => {
  getFirst(playerf).x += -1
  pdirection = "r"
  playTune(walk)
})
onInput("d", () => {
  getFirst(playerf).x += 1
  pdirection = "l"
  playTune(walk)
})

setBackground(grass)

afterInput(() => {
  const touchesDoor1 = tilesWith(playerf, door1);
  if (touchesDoor1.length > 0) {
    setMap(levels[2]);
    addSprite(5, 1, playerf)
    setBackground(woodbg);
  }

  const touchesDoor2 = tilesWith(playerf, door2);
  if (touchesDoor2.length > 0) {
    setMap(levels[1]);
    addSprite(8, 9, playerf)
    setBackground(grass);
    wheatplace();
    checkChick();
  }


  const touchesFence1 = tilesWith(playerf, fencedoor1);
  if (touchesFence1.length > 0) {
    setMap(levels[3]);
    addSprite(2, 9, playerf)
    setBackground(grass);
  }


  const touchesFence2 = tilesWith(playerf, fencedoor2);
  if (touchesFence2.length > 0) {
    setMap(levels[1]);
    addSprite(2, 1, playerf)
    setBackground(grass);
    wheatplace();
    checkChick();
  }

  let nearf = "0"
  const isNearFarm = tilesWith(playerf, farmtr);
  if (isNearFarm.length > 0) {
    nearfarm();
    nearf = "1";
  }
  const TouchesFarm = !(tilesWith(playerf, farmtr || npctr || pctr).length > 0)
  if (TouchesFarm) {
    clearText();
  }


  const isNearNPC = tilesWith(playerf, npctr).length > 0;
  if (isNearNPC) {

    nearNPC();
  }

  const isNearPC = tilesWith(playerf, pctr).length > 0;
  if (isNearPC) {
    nearPC();
  }


})
