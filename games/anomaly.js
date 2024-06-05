/*
@title: Anomaly
@author: Liam
@tags: []
@img: ""
@addedOn: 2024-06-05
*/

const dirtgoal = "u"
const player = "p"
const demon = "d"
const demoncrawl = "f"
const demoncrawlB = "i"
const demoncrawlC = "r"
const walkway = "w"
const wgoal = "a"
const grass = "g"
const ventwall = "t"
const wgrass = "l"
const wood = "o"
const demontwo = "e"
const demonjump = "h"
const panel = "y"
const bgoal = "x"
const dirt = "k"
const sign = "v"
const blood = "q"
const footsteps = "n"
const footstepsb = "b"
const bodyB = "m"
const bodyC = "c"
const vent = "z"
const ventB = "j"
const screwdriver = "s"
const gravestone = "A"
const gravestoneb = "B"
const news = "C"
const wkey = "D"
const akey = "E"
const skey = "F"
const dkey = "G"
const walk = tune`
49.586776859504134: F4/49.586776859504134,
1537.190082644628`
const monster = tune`
47.61904761904762: C5-47.61904761904762 + B4~47.61904761904762,
47.61904761904762: C5-47.61904761904762 + B4~47.61904761904762,
47.61904761904762: C5-47.61904761904762 + B4~47.61904761904762,
47.61904761904762: C5-47.61904761904762 + B4~47.61904761904762,
47.61904761904762: C5-47.61904761904762 + B4~47.61904761904762,
47.61904761904762: C5-47.61904761904762 + B4~47.61904761904762,
47.61904761904762: B4-47.61904761904762 + A4~47.61904761904762,
47.61904761904762: A4-47.61904761904762 + G4-47.61904761904762 + F4-47.61904761904762 + E4~47.61904761904762,
47.61904761904762: E4-47.61904761904762 + C4-47.61904761904762 + D4~47.61904761904762,
47.61904761904762: C4-47.61904761904762 + D4~47.61904761904762,
1047.6190476190477`
const poop = tune`
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
608.1081081081081,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
608.1081081081081,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
608.1081081081081,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
608.1081081081081,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: C4~202.7027027027027 + F4^202.7027027027027,
202.7027027027027: D4~202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D4~202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D4~202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D4~202.7027027027027 + G4^202.7027027027027,
202.7027027027027`

const playback = playTune(poop, Infinity)


setLegend(
  [ wkey, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5577555555557755
5557555555557555
5557555555557555
5555755555575555
5555755775575555
5555757557575555
5555775555775555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ akey, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888HH8888888
888888H33H888888
88888H3333H88888
88888H3333H88888
8888H333333H8888
8888HHHHHHHH8888
8888H888888H8888
8888H888888H8888
8888888888888888
8888888888888888
8888888888888888` ],
  [ dkey, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFF666FFFFFFF
FFFFFF6CC66FFFFF
FFFFFF6CCCC6FFFF
FFFFFF6CCCC6FFFF
FFFFFF6CCCC6FFFF
FFFFFF6CCCC6FFFF
FFFFFF6CCCC6FFFF
FFFFFF6CC66FFFFF
FFFFFF666FFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ skey, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL99999LLLLL
LLLLL9LLLLLLLLLL
LLLLL9LLLLLLLLLL
LLLLLL99999LLLLL
LLLLLLLLLL9LLLLL
LLLLLLLLLL9LLLLL
LLLLL99999LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ bodyC, bitmap`
................
................
................
..CC3..CCC..3CC.
..CCC..CCC..CCC.
...C...CCC...C..
...C..CCCCC..C..
...C.CCCHCCC.C..
...CCCCCCCCCC...
...C..CCHC..C...
.......CCCH.....
......CHCCC.....
.......CCC......
.......HCH......
.......HH.......
........H.......` ],
  [ news, bitmap`
2222222222222222
22LLLLLLLLLLLL22
22L1111111111L22
22L111111111DL22
22L11211111D5L22
22L1121111155L22
22L000001111DL22
22L0000011111L22
22LLLLLLLLLLL322
2222L222222L2222
0000000000000000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ bodyB, bitmap`
1111111111111111
1101101101101101
1011011C11011011
1011011C11011011
1011011C11011011
101101CCC1011011
101101CCC1011011
10110CCCCC011011
10110C3CCCC11011
1011C33CC3C11011
1011C3CC33C11011
1011CC3C3CC11011
1011CC2CCCC11011
1011CCCC3CC11011
11011CCCCC101101
11111111C1111111` ],
  [ screwdriver, bitmap`
................
................
................
................
................
................
................
....1111........
...1111116666...
....1111........
................
................
................
................
................
................` ],
  [ player, bitmap`
................
.......666......
.......FFF......
.......7F7......
.......FFF......
......55555.....
......F555F.....
......F555FFC2..
......F555.CC2..
.......333......
.......333......
.......333......
.......000......
................
................
................` ],
  [ demon, bitmap`
.......33.......
......3303......
.....300003.....
.....3C00C3.....
.....330003.....
.....333303.....
......33303.....
......33303.....
.....3333033....
.....3330033....
....333333333...
....333333333...
....333333333...
....333333333...
....333333333...
....333333333...` ],
  [ demoncrawl, bitmap`
.....333333.....
.....333333.....
.....333333.....
.333.333333.....
.3333333333.....
.33333333333....
.33.333003333...
.33.3300003333..
.33..3C00C3333..
.333.330003.333.
3.3..333303..33.
3.3...3333...33.
3..3...33....33.
.3.........3333.
..........3..3.3
............3..3` ],
  [ demoncrawlC, bitmap`
.....333333.....
.....333333.....
.....333333.....
.....333333.333.
.....3333333333.
....33333333333.
...333300333.33.
..3333000033.33.
..3333C00C3..33.
.333.300033.333.
.33..303333..3.3
.33...3333...3.3
.33....33...3..3
.3333.........3.
3.3..3..........
3..3............` ],
  [ demoncrawlB, bitmap`
................
...33333........
...3333333......
...3333333333...
...3333333333...
....333333333...
....33333333....
....33333333....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....` ],
  [ walkway, bitmap`
................
................
................
................
................
................
................
3..333.333...333
C333C33333333333
3333333333333333
3333333333C3333C
3333333333333333
333333C333333333
33C333333333333C
3333333333333333
..33C33..33C.333` ],
  [ wgoal, bitmap`
................
................
................
................
................
................
................
3..333.333...333
C333C33333333333
3333333333333333
3333333333C3333C
3333333333333333
333333C333333333
33C333333333333C
3333333333333333
..33C33..33C.333` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDD4DDDDDD
DD4D4DDD4D4DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DDDDDD4DDDDD4D4D
DDDDD4D4DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDDD4DDDDD
D4D4DDDDD4D4DDDD
DDDDDDDDDDDDDDDD
DDDDD4DDDDDDDD4D
DDDD4D4DDDDDD4D4
DDDDDDDDDDDDDDDD` ],
  [ wood, bitmap`
000CCCCCCCCFC000
000CCCCCCCCFC000
000CCFCCCCCCC000
000CCFCCCCCCC000
000CCFCCCFCCC000
000CCFFCCFCCC000
000CCCFCCFCCC000
000CCCCCCFCCC000
000CCCCCCFCCC000
000CCCCCFCCCC000
000CCCCFCCCCC000
000CCCCFCCCFC000
000CFCCCCCCFC000
000CFFCCCCCCC000
044C44C44C44C440
4DD4DD4DD4DD4DDD` ],
  [ demontwo, bitmap`
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
.....0000000....` ],
  [ wgrass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDD4DDDDDD
DD4D4DDD4D4DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DDDDDD4DDDDD4D4D
DDDDD4D4DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDDD4DDDDD
D4D4DDDDD4D4DDDD
DDDDDDDDDDDDDDDD
DDDDD4DDDDDDDD4D
DDDD4D4DDDDDD4D4
DDDDDDDDDDDDDDDD` ],
  [ demonjump, bitmap`
2222222332222222
2222223303222222
2222230000322222
222223C00C322222
2222233000322222
2222233330322222
2222223330322222
2222223330322222
2222233330332222
2222233300332222
2222333333333222
2222333333333222
2222333333333222
2222333333333222
2222333333333222
2222333333333222` ],
  [ dirtgoal, bitmap`
.CFCCCCCCCCCCFC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCFCCCCCCCC
CCCCCCCCCCCCCCCC
CFCCCCCCCCCCFCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCFCCCCCCC2
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCFCCC
CCFCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCFCCCCCCC
CCCCCCCCCCCCCCCC
.CCFCCCCCCCCCC..` ],
  [ dirt, bitmap`
.CFCCCCCCCCCCFC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCFCCCCCCCC
CCCCCCCCCCCCCCCC
CFCCCCCCCCCCFCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCFCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCFCCC
CCFCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCFCCCCCCC
CCCCCCCCCCCCCCCC
.CCFCCCCCCCCCC..` ],
  [ gravestoneb, bitmap`
.CFCCCCCCCCCCFC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC111111111CCCC
CC11111111111CCC
C1111111111111CC
C1111111111111CC
C1111111111111CC
CC11111111111CCC
CC11111111111CCC
CC11111111111CCC
CC11111111111CCC
C1111111111111CC
C1111111111111CC
C1111111111111CC
.1111111111111..` ],
  [ gravestone, bitmap`
.CFCCCC11CCCCFC.
CCCCCC1111CCCCCC
CCCCCCC11CCCCCCC
CCC1111111111CCC
CC111111111111CC
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
C11111111111111C
.11111111111111.` ],
  [ panel, bitmap`
1111111111111111
1101101101101101
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1011011011011011
1101101101101101
1111111111111111` ],
  [ vent, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ ventB, bitmap`
1111111111111111
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000200200000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ sign, bitmap`
................
................
................
.CCCCCCCCCCCCCC.
.CCCCCCCCCCCCCC.
.C00CCCC0CCCCCC.
.C0C0C0C0CC0CCC.
.C00CC0C0C0C0CC.
.C0C0CC0CC0C0CC.
.CCCCCCCCCCC0CC.
.CCCCCCCCCCC0CC.
.......33...0...
.......CC.......
.....4.4C4..00..
......4.4.4.....
................` ],
  [ blood, bitmap`
................
................
................
................
................
....333.........
....333.........
...3333.........
..333...........
..33............
..33.......3....
..33333CC33CC...
..C3CCCCCCCCCC..
..CC33CCCCCCCC..
......C333CCCCC.
................` ],
  [ footsteps, bitmap`
................
................
................
...........3....
..........333...
..........333...
..........333...
...........3....
.....3..........
....333.........
....333.........
....333.........
.....3..........
................
................
................` ],
  [ footstepsb, bitmap`
................
................
................
................
....333.........
...33333........
....333.........
................
................
................
.........333....
........33333...
.........333....
................
................
................` ],
  [ bgoal, bitmap`
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
5555555555555555` ],
  [ ventwall, bitmap`
0000000000000000
0L000000000000L0
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
0L000000000000L0
0000000000000000` ],
 
)

setBackground( grass);

setSolids([player, sign, panel, wood, blood, screwdriver,ventwall, gravestone, gravestoneb, ])

let level = 0
const levels = [

  map`
C`,//0
  map`
C`,//1
  map`
ooooooooooo
.D........l
EFGwwpww..l
..........l`,//2
  map`
ooooooooooo
....n.....l
p.....b.b.l
..........l`,//3
  map`
oooooooyyyxxyyy
.........kkkk..
..........kk...
p......kbkkn...
...b...........
...............
...............`,//4
  map`
yyyxxyyy
y.v....y
y..n...y
y..n...y
y.n....y
yq.n...y
yyyp.yyy`,//5
  map`
yymyyyyyyy
y........y
y........y
.l.....d.x
plb..b.e.x
y........y
y........y
yyyyyymyyy`,//6
  map`
yymyyyyyyy
y........y
y........y
.........x
.pb..b...x
y........y
y........y
yyyyyymyyy`,//7
  map`
yymmymyzymyyy
y..vq.....v.y
.p.s...n....x
...b..b.....x
y.q...v.q...y
yymyymmyymyyy`,//8
  map`
xyxyx
xynyx
xy.yx
xynyx
xy.yy
xyb.p
xy.yy
xy.yx
xy.yx
xy.yx
xy.yx`,//9
  map`
xxxxxxxxxxxx
xxxxxxxxxxxx
xxyyyxxyyyxx
yyy.yyyy.yyy
p..........x
yy...yy...yy
xyyyyyyyyyyx
xxxxxxxxxxxx
xxxxxxxxxxxx`,//10
  map`
xyfyx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xy.yx
xy.yx
xy.yx
xy.yx
xy.yx
xy.yx
xyxyx`,//11
  map`
xyiyx
xyryx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xy.yx
xy.yx
xy.yx
xy.yx
xy.yx
xyxyx`,//12
  map`
xynyx
xyiyx
xyfyx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xy.yx
xy.yx
xy.yx
xy.yx
xyxyx`,//13
  map`
xynyx
xynyx
xyiyx
xyryx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xy.yx
xy.yx
xy.yx
xyxyx`,//14
  map`
xynyx
xynyx
xynyx
xyiyx
xyfyx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xy.yx
xy.yx
xyxyx`,//15
  map`
xynyx
xynyx
xynyx
xynyx
xyiyx
xyryx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xy.yx
xyxyx`,//16
  map`
xynyx
xynyx
xynyx
xynyx
xynyx
xyiyx
xyfyx
xy.yx
xylyx
xypyx
xylyx
xy.yx
xyxyx`,//18
  map`
xynyx
xynyx
xynyx
xynyx
xynyx
xynyx
xyiyx
xyryx
xy.yx
xylyx
xypyx
xylyx
xyxyx`,//19
  map`
y..........
y..........
x....k.kkku
xp...kkkkkl
y..........
y..........
y..........`,//20
  map`
.....pk.....
.k.k.kk.k.k.
.B.A.kk.A.A.
......k.....
.k.k.kk.k.k.
.A.A.kk.B.A.
.....kk.....
.k.k.kk.k.k.
lAlBlullAlAl`,//21
 
]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [screwdriver]
})

onInput("s", () => {
  getFirst(player).y += 1
  playTune(walk);
})

onInput("w", () => {
  getFirst(player).y -= 1
    playTune(walk);
})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(walk);
})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(walk);
})

onInput("j",()=> {
 level = level - 1
setMap(levels[level]);
  clearText();
})

onInput("k",()=> {
 level = level = 2
setMap(levels[level]);
  clearText();
})

onInput("i",()=> {
 level = level = 1
setMap(levels[level]);
  clearText();
addText("Theres an anomaly...",{
  x: 1,
  y: 11,
 color: color`2`
})
addText("It mimics Grisha...",{
  x: 1,
  y: 12,
 color: color`2`
})
addText("Please stay indoors",{
  x: 1,
  y: 13,
 color: color`2`
})
  addText("press k",{
  x: 6,
  y: 15,
 color: color`2`
})
  
})

addText("Hello, welcome ",{
  x: 1,
  y: 12,
 color: color`2`
})

addText("to Ravka news ",{
  x: 2,
  y: 13,
 color: color`2`
})

addText("press i ",{
  x: 6,
  y: 15,
 color: color`2`
})




afterInput(() => {

  //
  const wgrassCovered = tilesWith(player, wgrass); 
    if (wgrassCovered.length >= 1) {
        level = level + 1;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
              addText("To Be Continued...", { y: 2, color: color`0` });
            playTune(monster)
           }
    }

  //
  const wgoalCovered = tilesWith(player, wgoal); 
    if (wgoalCovered.length >= 1) {
        level = level + 1;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued...", { y: 2, color: color`0` });
            playTune(monster)
          }
    }
//
  const bgoalCovered = tilesWith(player, bgoal); 
    if (bgoalCovered.length >= 1) {
        level = level + 1;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }
  
  //
  const demonCovered = tilesWith(player, demon); 
    if (demonCovered.length >= 1) {
        level = level = 10;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }
//
 const demonbodyCovered = tilesWith(player, demontwo); 
    if (demonbodyCovered.length >= 1) {
        level = level = 10;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }

//
 const dirtgoalCovered = tilesWith(player, dirtgoal); 
    if (dirtgoalCovered.length >= 1) {
        level = level + 1;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }


  
  //
   const ventcovered = tilesWith(screwdriver, vent); 
    if (ventcovered.length >= 1) {
        level = level + 1;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }

  //
  function monstermovement(x,y) { 
  let result = false
  getTile(x,y).map((tile) => {
    if (tile.type == player)
      result = true
  })
  return result 
}

  //
const bodyCovered = tilesWith(player, bodyC); 
    if (bodyCovered.length >= 1) {
        level = level = 10;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }

  //
const endCovered = tilesWith(player, dirtgoal); 
    if (endCovered.length >= 1) {
        level = level = 21;
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("To Be Continued", { y: 2, color: color`0` });
            playTune(monster)
          }
    }
  
//
 let up = false

setInterval(() => {
    if (level == 10) {
        if (up) { 
            if (!(monstermovement(2,3) || monstermovement(3,3))) { 
                clearTile(3,3)
                clearTile(3,3)
                addSprite(3,4,bodyC)
                addSprite(3,4,bodyC)
                up = false 
            }
        } else {
            if (!(monstermovement(2,0) || monstermovement(3,2))) {
                clearTile(3,4)
                clearTile(3,4)
                addSprite(3,3,bodyC)
                addSprite(3,3,bodyC)
                up = true
    
            }
        }
    } else if (level == 21) {
       //smthn
    }
}, 1000)

  //
  function monstermovement(x,y) { 
  let result = false
  getTile(x,y).map((tile) => {
    if (tile.type == player)
      result = true
  })
  return result 
}

let yo = false

setInterval(() => {
    if (level == 10) {
        if (yo) { 
            if (!(monstermovement(2,3) || monstermovement(3,3))) { 
                clearTile(8,3)
                clearTile(8,3)
                addSprite(8,4,bodyC)
                addSprite(8,4,bodyC)
                yo = false 
            }
        } else {
            if (!(monstermovement(2,0) || monstermovement(3,2))) {
                clearTile(8,4)
                clearTile(8,4)
                addSprite(8,3,bodyC)
                addSprite(8,3,bodyC)
                yo = true
            }
        }
    } else if (level == 21) {
       //smthn
    }
}, 1000)

 
  
});
  



