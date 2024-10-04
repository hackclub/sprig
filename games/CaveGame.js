/*
@title: CaveGame
@author: AlexL
@tags: ['adventure']
@addedOn: 2024-01-22

CONTROLS
,____________________________________________________,
|                                                    |  
|        UP            SPRIG!          Attack/Mine   |
|                    ,________,                      |
|         W          |        |  Restart/   I        |
| LEFT   ASD   RIGHT |        | Main-Menu  JKL   Buy |
|                    |        |                      |
|       DOWN         |________|        Reset Level   |
|____________________________________________________|
*/

const dirVectors = {
"RIGHT": [1,0],
"LEFT": [-1,0],
"UP": [0,-1],
"DOWN": [0,1]
}

const player = "P"
const pickaxe = "l"
const fire = "*"
const letch_flame = "%"
const acid_snot = "B"
const sign = "?"
const bush = "b"
const rock = "o"
const hard_rock = "H"
const water = "w"
const rope_up = "^"
const rope_down = "v"
const chasm = "_"
const wall = "#"
const gold = "$"
const bg = "["
const bg2 = "g"
const black = ","
const buy_pickaxe = "y"
const buy_heart = "Y"
const indicatorOn = "="
const indicatorOff = "0"

const letch = "s"
const mole = "M"

const legendKeys = [
  indicatorOn,
  indicatorOff,
  black,
  wall,
  hard_rock,
  pickaxe,
  rope_up,
  rock,
  fire,
  letch_flame,
  acid_snot,
  bush,
  player,
  sign,
  buy_pickaxe,
  buy_heart,
  letch,
  mole,
  water,
  rope_down,
  chasm,
  gold,
  bg,
  bg2
]
let legend = new Map()
legendKeys.forEach( (key) => {
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

legend.set(indicatorOn, [indicatorOn, bitmap`
................
................
................
................
................
....11111111....
...133333339L...
...133333399L...
...13333399CL...
...1333399CCL...
...133399CCCL...
...13399CCCCL...
...1399CCCCCL...
...199CCCCCCL...
....LLLLLLLL....
................`])
legend.set(indicatorOff, [indicatorOff, bitmap`
................
................
................
................
................
....11111111....
...1LLLLLLL2L...
...1LLLLLL22L...
...1LLLLL221L...
...1LLLL2211L...
...1LLL22111L...
...1LL221111L...
...1L2211111L...
...122111111L...
....LLLLLLLL....
................`])
legend.set(black, [ black, bitmap`
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
0000000000000000` ])
legend.set(rock, [ rock, bitmap`
................
................
................
................
....LLLLLLLL....
...LL1L1111LL...
...L1L116111LL..
..L111111L111LL.
.LL1L11L111111L.
.L1116L111L111L.
LL1L6LL11L6L11L.
L1161L111L6L1LL.
L1111L11L6L11L..
LLL11L11111LLL..
..LLL11111LL....
....LLLLLL......` ])
legend.set(hard_rock, [ hard_rock, bitmap`
0000000000000000
00111000111L1000
0LLLL0LLLLLL1100
0LLLLLLLLLLLLLL0
0111LLLLLLL11110
0LLL11LL1111LLL0
0LLL1L111LLLLLL0
01LLLLLLLLLL1100
0011LLLLLLL11L00
00L111111LLLLL00
0LLLLLLL111LLLL0
0111LLLLLL1LLL10
0LL111111LL111L0
00LLLL0L111LLLL0
0001100L00LLLL00
0000000000000000` ])
legend.set(rope_up, [ rope_up, bitmap`
........LF......
........LL......
........LF......
........LF......
........LL......
........LF......
.......LLF......
.......LFL......
.......LF.......
.......LF.......
.......LL.......
.......LFL......
...LLLLLLLL.....
..LFLLLFFFL.....
..LFFFFLFFFL....
...LLLLLLLL.....` ])
legend.set(rope_down, [ rope_down, bitmap`
................
................
................
................
....00000000....
...0000000000...
...0000000000...
...00000FFF00...
...0000FF0F00...
...0000F00FF0...
....000FF00F....
...........F....
......LLL.FF....
.....FFLFFF.....
......FFF.......
................` ])
legend.set(chasm, [ chasm, bitmap`
................
................
................
...........CCL..
....0000000F9FC.
...0000000C9FLC.
..00000000CF0CC.
..00000000CC00CC
..0000009CCC90CC
..00000009C900CC
..000000009000.C
..000000000000..
..000000000000..
...0000000000...
....00000000....
................` ])
legend.set(bg, [ bg, bitmap`
11111CF111111111
111F11CF111111FC
111C1111111111C1
1111111111111111
1111111111111111
1F1111111CC11111
FC11111111111111
F111111111111111
1111111C11111111
111111111111CF1F
11C1111111111CF1
11111111111111C1
1111111111111111
1111111111111111
1111111111111111
1111111CF1111111` ])
legend.set(bg2, [ bg2, bitmap`
66666CF666666666
666F66CF666666FC
666C6666666666C6
6666666666666666
6666666666666666
6F6666666CC66666
FC66666666666666
F666666666666666
6666666C66666666
666666666666CF6F
66C6666666666CF6
66666666666666C6
6666666666666666
6666666666666666
6666666666666666
6666666CF6666666` ])
legend.set(gold, [ gold, bitmap`
................
................
................
.....FFFF.......
....F6666F......
...F66FF66F.....
...F6666F66F....
...F66666666F...
...F6F6F66F6F...
...F66F66F66F...
...FF666666F....
....FFFFFFF.....
................
................
................
................`])
legend.set(bush, [ bush, bitmap`
................
................
................
................
................
.....444444.....
...444DDDD44....
..4DDDDDDDD44...
.4D44D3DD33D44..
.4D4DD44DD3DDD4.
.4DD33D4DDDD4D4.
.4DD3DDDDDDD4D4.
.4DDDDDD33DDDD4.
..4DDD4DDDDDDD4.
..4DDDDDDDDDD4..
...4DDDDDDD44...` ])
legend.set(wall, [ wall, bitmap`
................
................
................
................
LL.LLL.LLL.LLL.L
LLLLLLLLLLLLLLLL
11L111L111L111L1
11L111L111L111L1
LL1LLL1LLL1LLL11
1111L11111L11L11
11LLL111LL111LL1
LLL11LLLL111111L
1L111L111L111LL1
11LLL11111LLL111
1L111L111L111L11
1L1111LLL11111L1` ])
legend.set(water, [ water, bitmap`
7777777777777777
7777777777777777
7777777777777777
7775775777775777
7757557777557577
7777777777777777
7777777777777777
7777775777777777
7777557777777777
7777777777777777
7777777777557777
7777777775775577
7777777777777757
7755757777777777
7777577777777777
7777777777777777` ])
legend.set(fire, [ fire, bitmap`
................
....33..........
.....33.........
.....3333.......
.....33933......
.....339933.....
....3399993.....
...339969993....
..33399669933...
..33992629993...
..33996266993...
..33996226993...
..33996666993...
...3399669933...
....33966993....
....33999933....` ])
legend.set(sign, [ sign, bitmap`
................
................
................
................
..000000........
..0CCCCC000000..
..0C66CCCCCCC0..
..0CCC6C6666C0..
..0CCCCCCCCCC0..
..0C6C6CCCCCC0..
..0CCCC66C6CC0..
...00CCCCCCCC0..
.....00CC0000...
.......00.......
.......00.......
.......00.......` ])
legend.set(buy_pickaxe, [ buy_pickaxe, bitmap`
CCCCCCCCCCCCCCCC
C6666CCCCCC6666C
C66666666666666C
C66666666666666C
C6666LLLLL66666C
CC6666666LC666CC
CC6666666CLL66CC
CC666666C66L66CC
CC66666C666L66CC
CC6666C6666L66CC
CC666C66666L66CC
C666C6666666666C
C66C66666666666C
C66666666666666C
C6666CCCCCC6666C
CCCCCCCCCCCCCCCC` ])
legend.set(buy_heart, [ buy_heart, bitmap`
CCCCCCCCCCCCCCCC
C6666CCCCCC6666C
C66666666666666C
C66633666633666C
C66333366333366C
CC633333333336CC
CC633333333336CC
CC633333333336CC
CC663333333366CC
CC666333333666CC
CC666633336666CC
C66666633666666C
C66666666666666C
C66666666666666C
C6666CCCCCC6666C
CCCCCCCCCCCCCCCC` ])
const frames = {
  [player]: {
    "RIGHT": [ player, bitmap`
  ................
  ................
  ........CCCC....
  .......CCCCCC6..
  ......CCCCCCC2..
  ......CCCC999...
  ......CCC99093..
  .....FFCC3399...
  ....FFLFF999....
  ....FLFFF11CCC..
  ....FLFFFCC1CCCC
  ....FFLFCCCCCCCC
  .....FFCCCC1CC..
  ......FCC11CCC..
  .......57..75...
  .......57..75...` ],
    "LEFT": [ player, bitmap`
  ................
  ................
  ....CCCC........
  ..6CCCCCC.......
  ..2CCCCCCC......
  ...999CCCC......
  ..39099CCC......
  ...9933CCFF.....
  ....999FFLFF....
  ..CCC11FFFLF....
  CCCC1CCFFFLF....
  CCCCCCCCFLFF....
  ..CC1CCCCFF.....
  ..CCC11CCF......
  ...57..75.......
  ...57..75.......` ],
    "UP":[ player, bitmap`
  .......66.......
  ......CCCC......
  .....CCCCCC.....
  .....CCCCCC.....
  ....FFFFFFFF....
  ...FFFFFFFFFF...
  ..FFFLFFFFLFFF..
  ..FFLFFFFFFLFF..
  ..FFLFFFFFFLFF..
  ..FFFLFFFFLFFF..
  ...FLF1FF1FLF...
  ....FFFFFFFF....
  .....57..75.....
  .....5....5.....
  ................
  ................` ],
    "DOWN": [ player, bitmap`
................
................
......CCCC......
.....CC26CC.....
.....CC62CC.....
....CCCCCCCC....
....C909909C....
...FF993399FF...
..FFFL9999LFFF..
..FFCLCCCCLCFF..
..FFCC1CC1CCFF..
..FFCC1CC1CCFF..
...FCC1CC1CCF...
....CLCCCCLC....
.....57..75.....
.....57..75.....` ]
  },
  [pickaxe]: {
    "RIGHT": [ pickaxe, bitmap`
  ................
  ................
  ...LLLL.........
  .LLLLLLLLLL.....
  LLL.....LLL.....
  .......CCLL.....
  ......CCC.L.....
  .....CCC..LL....
  ....CCC...LL....
  ...CCC....LL....
  ..CCC.....LL....
  .CCC.....LL.....
  CCC......LL.....
  CC.......L......
  C...............
  ................` ],
    "LEFT": [ pickaxe, bitmap`
  ................
  ................
  .........LLLL...
  .....LLLLLLLLLL.
  .....LLL.....LLL
  .....LLCC.......
  .....L.CCC......
  ....LL..CCC.....
  ....LL...CCC....
  ....LL....CCC...
  ....LL.....CCC..
  .....LL.....CCC.
  .....LL......CCC
  ......L.......CC
  ...............C
  ................` ],
    "UP": [ pickaxe, bitmap`
  ................
  .....LLLLLL.....
  ...LLLLLLLLLL...
  ..LLL.LLLL.LLL..
  .LLL...LL...LLL.
  LLL....CC....LLL
  L......CC......L
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......` ],
    "DOWN": [ pickaxe, bitmap`
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  .......CC.......
  L......CC......L
  LLL....CC....LLL
  .LLL...LL...LLL.
  ..LLL.LLLL.LLL..
  ...LLLLLLLLLL...
  .....LLLLLL.....
  ................` ],
    "norm": [ pickaxe, bitmap`
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
  ................` ]
  },
  [letch]: {
    "RIGHT": [ letch, bitmap`
  ................
  ................
  .........000....
  ........000C00..
  .......000000000
  ......DL0000000C
  ....D0D0LL..0000
  ....22DD0L......
  ....DDDL00......
  ......D1LL......
  ......0011......
  .....L00........
  ......LL0.......
  .....FC0LF......
  .....CF00CC.....
  .....FCCCCF.....` ],
    "LEFT": [ letch, bitmap`
  ................
  ................
  ....000.........
  ..00C000........
  000000000.......
  C0000000LD......
  0000..LL0D0D....
  ......L0DD22....
  ......00LDDD....
  ......LL1D......
  ......1100......
  ........00L.....
  .......0LL......
  ......FL0CF.....
  .....CC00FC.....
  .....FCCCCF.....` ]
  },
  [letch_flame]: {
    "RIGHT": [ letch_flame, bitmap`
  ................
  ................
  .......333..3...
  ........333393..
  ........3933933.
  33333333999993..
  2226666933333...
  333333333...3...
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................` ],
    "LEFT": [ letch_flame, bitmap`
  ................
  ................
  ...3..333.......
  ..393333........
  .3393393........
  ..39999933333333
  ...3333396666222
  ...3...333333333
  ................
  ................
  ................
  ................
  ................
  ................
  ................
  ................` ]
  },
  [mole]: {
    "UP":[ mole, bitmap`
.......88.......
......FFFF......
C.C.CFFFFFFC.C.C
CCCC0FFFFFF0CCC.
.CCLLLLLLLLLLCC.
.CCLLLLLLLLLLCC.
.0LLLLLLLLLLLL0.
10LLLLLLLLLLLL01
11LLLLLLLLLLLL11
.0LLLLLLLLLLLL01
.0CLLLLLLLLLLC0.
.0CCCCLLLLCCCC0.
.100CCCCCCCC001.
11100001100001..
..1...1111..1...
.......111......` ],
    "DOWN": [ mole, bitmap`
................
................
................
....LLLLLLLL....
...LLLLLLLLLL...
...LLLLLLLLLL...
...L0FFFFFF0L...
..LLCFFFFFFCLL..
..LLLLFFFFLLLL..
.CCLLLL88LLLLCC.
CCLCLLLLL4LLCLCC
C1CLLCCCC4CLLC1C
10LLCCCCCCCCLLC1
10LLCCCCCCCCLL01
11L1CCCCCCCC1011
.11111111111111.` ],
    "norm": [ mole, bitmap`
................
................
.....1LLLLLL....
....LLL1LLLLL...
..1LLLLL1LLLLL..
..LLLLLLLLL11L..
.LLLLL1LLLL1LL..
1LL1LLLLLLLLLL1.
1LLLLLCCCCLLLL11
11LLLC0880C11LL1
LLL1LLLLLLLLLLL.
CLLLLLLLLL1LLL11
11LLLLLLLLLL1L..
..111L1LLL111C..
..1C11CCCCCC1...
.....C...1...C..` ]
  },
  [acid_snot]: {
    "DOWN": [ acid_snot, bitmap`
......D2DD......
......D2DD......
......D2DD......
......D7DD......
......D7DD......
......D7DD......
......D7DD......
..D..DDCDD.D..D.
.....D4D44DD..D.
.....DC444DD....
...DDD444DD.....
..D444C44C4.D...
..D4C44D444D....
...DDDDDDDD.....
...D...DDD....D.
.......D........` ],
    "UP": [ acid_snot, bitmap`
.......D........
...D...DDD....D.
...DDDDDDDD.....
..D4C44D444D....
..D444C44C4.D...
...DDD444DD.....
.....DC444DD....
.....D4D44DD..D.
..D..DDCDD.D..D.
......D7DD......
......D7DD......
......D7DD......
......D7DD......
......D2DD......
......D2DD......
......D2DD......` ]
  }
}
legend.set(player, frames[player].DOWN)
legend.set(pickaxe, frames[pickaxe].UP)
legend.set(letch, frames[letch].LEFT)
legend.set(letch_flame, frames[letch_flame].LEFT)
legend.set(mole, frames[mole].norm)
legend.set(acid_snot, frames[acid_snot].UP)
setLegend(...legend.values())

setSolids([ player, wall, letch, rock, hard_rock, black, mole ])
setPushables({
  [ player ]: [rock]
})


//Level stuff
let level = 1;
const levels = [
  map`
,,,,,,,,,,
,,,,,,,,,,
^H.??Ho?^0
PH.HoH?.H0
?H?HwH?Hy0
?H?H.HoHY0
?H.H?Ho.H0
.?oH?.s.H0`,
  map`
,,,,,,,,,,
,,,,,,,,,,
HHHHHHHHH0
H.^...v.H0
H.?...?.H0
H.......H0
H...P...H0
HHHHHHHHH0`,
  map`
,,,,,,,,,,
,,,,,,,,,,
HHHHHHHHHH
Hww.yY.wwH
Hww.??.wwH
Hwww..wwwH
Hv..P...^H
HHHHHHHHHH`,//shop
  map`
,,,,,,,,,,
,,,,,,,,,,
....s...^0
.HHHHHHHH0
..wo...wH0
HHM.HHMoH0
P...ow..H0
vHHHHHHHH=`,
  map`
,,,,,,,,,,
,,,,,,,,,,
ooo$$oo.^0
.Ho$HHHHo0
.HHH..HHo0
o.o....o.0
H.HHH.HHo=
vPHyoo...=`,
  map`
,,,,,,,,,,
,,,,,,,,,,
HHHHHHHHHH
Hww.yY.wwH
Hww.??.wwH
Hwww..wwwH
Hv..P...^H
HHHHHHHHHH`,//shop
  map`
,,,,,,,,,,
,,,,,,,,,,
$ooooooo$0
.s.s.s.s.0
M.M...M.M0
....P....=
wwwHvHwww=
wwo.^.oww=`,
  map`
,,,,,,,,,,
,,,,,,,,,,
bbbbbbbbb0
b.wwwww.b0
bwww..^wb=
bww*.wwbb=
bwbb..sbw=
bbbPvbbbw=`,
  map`
,,,,,,,,,,
,,,,,,,,,,
*bbb.so.o0
bb$b.soM.=
Pbbb.so.^=
vbbb.so.^=
bb$b.soM.=
*bbb.so.o=`,
  map`
,,,,,,,,,,
,,,,,,,,,,
$$.*b*bb^=
$$bbsbsb.=
b.b*b*...=
*.MbMbobM=
..b*b*.*b=
vPo......=`,//final
  map`
,,,,,,,,,,
,,,,,,,,,,
b..P..www$
b..?.owww$
_?.?..www$
_?.?.owww$
b.???.www$
b....owww$`//surface
]

const signs = {
  0: [
    "Push rocks to cross",
    "water",
    "Climb, dig, ESCAPE!",
    "pick at shops like >",
    "The cave collapsed",
    "the STORE and score",
    "Use gold to repair",
    "Use your trusty pick",
    "Collect gold for",
    "ESCAPE this cave!",
    "Use your pickaxe",
    "i - Mine",
    "to attack the letch"
     ],
  1: ["START", "TUTORIAL"],
  2: ["THREE GOLD", "FIVE GOLD"], //shop
  5: ["THREE GOLD", "FIVE GOLD"], //shop
  10: [
    "CONGRATS",
    "Back to bottom",
    "You escaped the mine",
    "Back to bottom",
    "Try again to try to",
    "get more gold,",
    "take less time,",
    "or take less damage."
    ] //surface
}

setBackground(bg)
setMap(levels[level])

const buySound = tune`
148.5148514851485: F4^148.5148514851485 + C4^148.5148514851485 + E4~148.5148514851485 + D4~148.5148514851485 + G4-148.5148514851485,
148.5148514851485: D5^148.5148514851485 + E5^148.5148514851485 + F5-148.5148514851485 + C5-148.5148514851485,
4455.445544554455`;
const swing = tune`
83.33333333333333: F4~83.33333333333333 + D4~83.33333333333333 + G4~83.33333333333333,
83.33333333333333,
83.33333333333333: E4~83.33333333333333 + C4~83.33333333333333,
2416.6666666666665`;
const gethit = tune`
167.5977653631285: B4/167.5977653631285 + A4-167.5977653631285 + C5^167.5977653631285,
167.5977653631285: F4/167.5977653631285 + E4-167.5977653631285 + G4^167.5977653631285,
5027.932960893855`;
const breakrock = tune`
95.84664536741214: E4~95.84664536741214 + F4^95.84664536741214 + G4~95.84664536741214 + D4~95.84664536741214 + C4/95.84664536741214,
2971.246006389776`;
const die = tune`
140.8450704225352: B4~140.8450704225352 + A4^140.8450704225352 + F4^140.8450704225352 + D4/140.8450704225352 + C5/140.8450704225352,
140.8450704225352: E4-140.8450704225352 + F4-140.8450704225352,
4225.352112676056`;
const collectGold = tune`
122.95081967213115: D5^122.95081967213115 + F5^122.95081967213115,
3811.4754098360654`;
const walk = tune`
43.47826086956522: E4^43.47826086956522 + F4~43.47826086956522,
1347.8260869565217`;
const winTune = tune`
225.5639097744361: A5^225.5639097744361 + E5~225.5639097744361,
225.5639097744361: A5^225.5639097744361 + E5~225.5639097744361,
225.5639097744361: A5^225.5639097744361 + E5~225.5639097744361,
225.5639097744361: A5^225.5639097744361 + E5~225.5639097744361,
225.5639097744361,
225.5639097744361: E5~225.5639097744361 + G5^225.5639097744361 + D5~225.5639097744361 + A5^225.5639097744361,
225.5639097744361: E5~225.5639097744361 + A5^225.5639097744361,
5639.097744360903`;

const fireproof = [ indicatorOn, fire, water, indicatorOn, black, hard_rock, rope_up, rope_down, mole, letch_flame, acid_snot, rock, gold ];
function fireProof(tile) {
  let fp = false;
  tile.forEach( (z) => {
    if (fireproof.includes(z.type))
    {fp = true;}
  })
  return fp;
}
const entities = [ letch, mole, fire ]
const entityStats = {
  [letch]: {
    hp: 2,
    direction: "RIGHT",
    update: (obj) => {
      getAll(letch).forEach( (q) => {
        q.direction = q.direction == "RIGHT" ? "LEFT": "RIGHT";
        legend.set(letch, frames[letch][q.direction]);
        doAttack(q, q.direction, letch_flame);
      })
    }
  },
  [fire]: {
    hp: 10,
    update: (obj) => {
      let fireeees = getAll(fire);
      fireeees.forEach( (q) => {
        getTile(q.x,q.y).forEach( (z) => {
            if (hurtable.includes(z.type)){
            hurt[z.type](z);
          }
        })
        let checktile = getTile(q.x-1, q.y);
        if (checktile.length > 0 && q.x>0) {
          if(!(fireProof(checktile))) {
            addSprite(q.x-1, q.y, fire);
          }
        }
        checktile = getTile(q.x+1, q.y);
        if (checktile.length > 0 && q.x<width()-2) {
          if(!(fireProof(checktile))) {
            addSprite(q.x+1, q.y, fire);
          }
        }
        checktile = getTile(q.x, q.y-1);
        if (checktile.length > 0 && q.y>2) {
          if(!(fireProof(checktile))) {
            addSprite(q.x, q.y-1, fire);
          }
        }
        checktile = getTile(q.x, q.y+1);
        if (checktile.length > 0 && q.y < height()-1) {
          if(!(fireProof(checktile))) {
            addSprite(q.x, q.y+1, fire);
          }
        }
      })
    }
  },
  [mole]: {
    hp: 3,
    state: "norm",
    hidden: true,
    ready: false,
    update: (obj) => {
      let moleos = getAll(mole);
      let pp = getFirst(player);
      for (let i=0;i<moleos.length;i++){
        if ((pp.x-moleos[i].x==0 && Math.abs(pp.y-moleos[i].y)==1) || moleos[i].ready)
        {
          let qq = setTimeout( () => {
          moleos.map( (q) => {
            q.state = pp.y>q.y ? "DOWN": "UP";
            legend.set(mole, frames[mole][moleos[i].state]);
            doAttack(moleos[i], q.state, acid_snot);
            q.hidden = false;
            clearTimeout(qq);
          })
          }, 500);
          break;
        }
        if (!moleos[i].ready) {
          moleos[i].state = "norm";
          moleos[i].hidden = true;
        }
        legend.set(mole, frames[mole][moleos[i].state]);
      }
    }
  }
}

function setLevel(l)
{
  if (l == levels.length-1) {
    playTune(winTune);
    setBackground(bg2);
  }
  setMap(levels[l]);
  for (let i=1;i<4;i++) {
    addSprite(i+1, 0, indicatorOff);
    addSprite(i+1, 0, indicatorOn);
  }
  playerUpdate();

  entities.forEach( (q) => {
    let temp = getAll(q);
    temp.map( (e) => {
      e.hp = entityStats[q].hp;
      e.update = entityStats[q].update;
    })
  })
  
  let tempSigns = getAll(sign);
  for (let i=0;i<tempSigns.length;i++)
  {
    tempSigns[i].content = signs[l][i];
  }
}


//game logic
let canMove = true;
let pDirection = "DOWN"
let onInteractable = false;
let playerHP = 3;
let pickDurability = 5;
let bank_account = 0;

function gameRestart() {
  canMove = true;
  pDirection = "DOWN"
  onInteractable = false;
  playerHP = 3;
  pickDurability = 5;
  bank_account = 0;
  level = 1;
  clearText();
  setBackground(bg);
  setLevel(level);
}

let hurtable = [...entities, rock, player]
const hurt = {};
hurt[player] = (t) =>
{
  playTune(gethit);
  playerHP--;
  if (bank_account > 0) bank_account--;
  playerUpdate();
};
hurt[rock] = (t) =>
{
  playTune(breakrock);
  addSprite(t.x, t.y, gold);
  t.remove();
};
hurt[fire] = (t) =>
{
  t.hp -= 1;
  if (t.hp <= 0)
  {
    t.remove();
  }
};
hurt[letch] = (t) =>
{
  t.hp -= 1;
  if (t.hp <= 0)
  {
    t.remove();
  }
}
hurt[mole] = (t) =>
{
  if (t.state == "norm") {
    t.ready = true;
    return;
  }
  t.hp -= 1;
  if (t.hp <= 0)
  {
    addSprite(t.x, t.y, gold);
    t.remove();
  }
}


function doAttack(entity, d, weapont) {
  const x = entity.x+dirVectors[d][0];
  const y = entity.y+dirVectors[d][1];
  let tile = getTile(x, y);
  if (tile.length != 0 && !(tile.some( (q) => hurtable.includes(q.type)))) return;
  try {
    addSprite(x,y, weapont);
  } catch (Error) {
    return;
  }
  canMove = entity.type == player ? false : canMove;
  let weapon = getTile(x,y)[0];
  weapon.x = x;
  weapon.y = y;
  legend.set(weapont, frames[weapont][d]);
  setLegend(...legend.values());

  var tim = setTimeout( () => {
    getAll(weapont).map((weap) => {weap.remove()})
    canMove = entity.type == player ? true : canMove;
    canMove = true;
    clearTimeout(tim);
  }, 250);
  tile.forEach( (t) => {
    if (hurtable.includes(t.type))
    {
      if (entity.type == player) pickDurability--;
      hurt[t.type](t);
    }
  })
}

//INIT
gameRestart()


//LOOP

//enemyLoop
setInterval( () => {
  entities.forEach( (q) => {
    entityStats[q].update();
  })
},
1000
)

setInterval( () => {
  setLegend(...legend.values());
},
Math.floor(1000/120)
)

//Player stats update
function playerUpdate()
{
  clearText();
  for (let i=0;i<3;i++) {
    let t = getTile(2+i, 0);
    if (t.length > 2 && playerHP-1-i < 0){
      t[0].remove();
    } else if (t.length < 3 && playerHP-1-i == 0) {
      addSprite(2+i, 0, indicatorOn);
    }
  }
  addText("HP: ", {x:1, y:1, color:color`3`})
  addText("Gold:"+bank_account.toString(), {x:1, y:2, color:color`6`})
  addText("Pickaxe:"+pickDurability.toString(), {x:10, y:2, color:color`9`})

  if (playerHP == 0)
  {
    playTune(die);
    gameRestart();
  }
}

//input

onInput("w", () => {
  if (!canMove) return;
  playTune(walk);
  getFirst(player).y -= 1;
  pDirection = "UP";
})
onInput("s", () => {
  if (!canMove) return;
  playTune(walk);
  getFirst(player).y += 1;
  pDirection = "DOWN";
})
onInput("a", () => {
  if (!canMove) return;
  playTune(walk);
  getFirst(player).x -= 1;
  pDirection = "LEFT";
})
onInput("d", () => {
  if (!canMove) return;
  playTune(walk);
  getFirst(player).x += 1
  pDirection = "RIGHT";
})
//attack
onInput("i", () => {
  if (!canMove || pickDurability <=0) return;
  playTune(swing);
  doAttack(getFirst(player), pDirection, pickaxe);
})
onInput("j", () => {
  gameRestart();
})
onInput("k", ()=> {
  setLevel(level);
})
onInput("l", ()=> {
  if (tilesWith(player, buy_pickaxe).length == 1)
  {
    if (bank_account < 3) return;
    playTune(buySound);
    bank_account -= 3;
    pickDurability += 5;
  }
  if (tilesWith(player, buy_heart).length == 1)
  {
    if (bank_account < 5 || playerHP == 3) return;
    playTune(buySound);
    bank_account -= 5;
    playerHP = 3;
    playerUpdate();
  }
})


afterInput(() => {
  playerUpdate();
  legend.set(player, frames[player][pDirection]);
  if (tilesWith(player, rope_up).length == 1){
    level += 1;
    setLevel(level);
  }
  else if (tilesWith(player, rope_down).length == 1){
    level -= 1;
    setLevel(level);
  }
  else if (tilesWith(player, chasm).length == 1){
    gameRestart();
  }

  if (tilesWith(rock, water).length == 1){
    let temp = tilesWith(rock, water);
    temp[0][0].remove();
    temp[0][1].remove();
  }
  if (tilesWith(player, water).length == 1){
    hurt[player](null);
    playerUpdate();
  }
    
  if (tilesWith(player, gold).length == 1){
    getTile(getFirst(player).x, getFirst(player).y).forEach( (t) => {
      if (t.type == gold) {
        playTune(collectGold);
        bank_account++;
        playerUpdate();
        t.remove();
      }
    })
  }
  if (onInteractable) {
    clearText()
    onInteractable = false;
    playerUpdate();
  }
  if (tilesWith(player, buy_pickaxe).length == 1 || tilesWith(player, buy_heart).length == 1)
  {
    addText("Press \'l\' to buy", {x:0,y:3, color:color`2`});
    onInteractable = true;
  }
  if (tilesWith(player, sign).length == 1)
  if (tilesWith(player, sign).length == 1)
  {
    let temp = getFirst(player);
    getTile(temp.x, temp.y).forEach( (q) => {
      if (q.type == sign)
      {
        temp = q;
      }
    })
    addText(temp.content, {x:0,y:3, color:color`2`});
    onInteractable = true;
  }
})
                                                                                    
