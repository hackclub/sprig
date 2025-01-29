/*
@title: Anomaly
@author: Liam
@tags: []
@addedOn: 2024-05-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
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
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD44DDDDDDDD44DD
DDD4DDDDDDDD4DDD
DDD4DDDDDDDD4DDD
DDDD4DDDDDD4DDDD
DDDD4DD44DD4DDDD
DDDD4D4DD4D4DDDD
DDDD44DDDD44DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ akey, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDD44DDDDDDD
DDDDDD4DD4DDDDDD
DDDDD4DDDD4DDDDD
DDDDD4DDDD4DDDDD
DDDD4DDDDDD4DDDD
DDDD44444444DDDD
DDDD4DDDDDD4DDDD
DDDD4DDDDDD4DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ dkey, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD444DDDDDDD
DDDDDD4DD44DDDDD
DDDDDD4DDDD4DDDD
DDDDDD4DDDD4DDDD
DDDDDD4DDDD4DDDD
DDDDDD4DDDD4DDDD
DDDDDD4DDDD4DDDD
DDDDDD4DD44DDDDD
DDDDDD444DDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ skey, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD44444DDDDD
DDDDD4DDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDDD44444DDDDD
DDDDDDDDDD4DDDDD
DDDDDDDDDD4DDDDD
DDDDD44444DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ bodyC, bitmap`
................
................
................
..33...333...33.
..333..333..333.
...3...333...3..
...3..33333..3..
...3.3338333.3..
...3333333333...
...3..3383..3...
.......3338.....
......38333.....
.......333......
.......838......
.......88.......
........8.......` ],
  [ news, bitmap`
2222222222222222
22LLLLLLLLLLLL22
22L7777777777L22
22L777777777DL22
22L77F77777D5L22
22L77F7777755L22
22L111117777DL22
22L1111177777L22
22LLLLLLLLLLLL22
2222L222262L2222
1111111111111111
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ bodyB, bitmap`
1111111111111111
11L11L11L11L11L1
1L11L11311L11L11
1L11L11311L11L11
1L11L11311L11L11
1L11L13331L11L11
1L11L13331L11L11
1L11L33333L11L11
1L1133C333311L11
1L113CC33C311L11
1L113C33CC311L11
1L1133C3C3311L11
1L11330333311L11
1L113333C3311L11
11L11333331L11L1
1111111131111111` ],
  [ screwdriver, bitmap`
................
................
................
................
................
................
................
....2222........
...222222LLLL...
....2222........
................
................
................
................
................
................` ],
  [ player, bitmap`
................
.......000......
.......CCC......
.......0C0......
.......CCC......
......11111.....
......C111C.....
......C111CC92..
......C111.992..
.......LLL......
.......LLL......
.......LLL......
.......000......
................
................
................` ],
  [ demon, bitmap`
.......00.......
......0020......
.....022220.....
.....002200.....
.....002220.....
.....000020.....
......00020.....
......00020.....
.....0000200....
.....0002200....
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...
....000000000...` ],
  [ demoncrawl, bitmap`
.....000000.....
.....000000.....
.....000000.....
.000.000000.....
.0000000000.....
.00000000000....
.00.000220000...
.00.0022220000..
.00..002200000..
.000.002220.000.
0.0..000020..00.
0.0...0000...00.
0..0...00....00.
.0.........0000.
..........0..0.0
............0..0` ],
  [ demoncrawlC, bitmap`
.....000000.....
.....000000.....
.....000000.....
.....000000.000.
.....0000000000.
....00000000000.
...000022000.00.
..0000222200.00.
..000002200..00.
.000.022200.000.
.00..020000..0.0
.00...0000...0.0
.00....00...0..0
.0000.........0.
0.0..0..........
0..0............` ],
  [ demoncrawlB, bitmap`
................
...0000.........
...0000000......
...0000000000...
...0000000000...
....000000000...
....00000000....
....00000000....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....` ],
  [ walkway, bitmap`
................
................
................
................
................
................
................
1..111.111...111
L111L11111111111
1111111111111111
1111111111L1111L
1111111111111111
111111L111111111
11L111111111111L
1111111111111111
..11L11..11L.111` ],
  [ wgoal, bitmap`
................
................
................
................
................
................
................
1..111.111...111
L111L11111111111
1111111111111111
1111111111L1111L
1111111111111111
111111L111111111
11L111111111111L
1111111111111111
..11L11..11L.111` ],
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
2222222002222222
2222220020222222
2222202222022222
2222200220022222
2222200222022222
2222200002022222
2222220002022222
2222220002022222
2222200002002222
2222200022002222
2222000000000222
2222000000000222
2222000000000222
2222000000000222
2222000000000222
2222000000000222` ],
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
11L11L11L11L11L1
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
1L11L11L11L11L11
11L11L11L11L11L1
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
.C33CCCC3CCCCCC.
.C3C3C3C3CC3CCC.
.C33CC3C3C3C3CC.
.C3C3CC3CC3C3CC.
.CCCCCCCCCCC3CC.
.CCCCCCCCCCC3CC.
.......00...3...
.......CC.......
.....4.4C4..33..
......4.4.4.....
................` ],
  [ blood, bitmap`
................
................
................
................
................
....CCC.........
....CCC.........
...CCCC.........
..CCC...........
..CC............
..CC.......C....
..CCCCC33CC33...
..3C3333333333..
..33CC33333333..
......3CCC33333.
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
0000000000000000` ],
  [ ventwall, bitmap`
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLL1L
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
L1LLLLLLLLLLLL1L
LLLLLLLLLLLLLLLL` ],
 
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
addText("theres an anomaly",{
  x: 1,
  y: 11,
 color: color`2`
})
addText("that mimics people",{
  x: 1,
  y: 12,
 color: color`2`
})
addText("please stay indoors",{
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

addText("hello, and welcome ",{
  x: 1,
  y: 12,
 color: color`2`
})

addText("to mandela news ",{
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
            addText("to be continued", { y: 2, color: color`0` });
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
  



