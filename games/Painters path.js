
/* 
@title: TempGameName
@description: A simple template to help you get started with making a maze game.
@author: Kayden Davis
@tags: []
@addedOn: 2023-08-08
*/

const player = "p"
const wall1 = "w"
const wall2 = "x"
const goal = "g"
const floor1 = "f"
const mimo = "z"
const trap = "t"
const bportal = "b"
const prportal = "r"
const stpieces = "q"

setLegend(
 [player, bitmap`
......4.4.......
.......4........
.....55555......
....5667775.....
...566777775....
...567777775....
...570777075....
...537777735....
...577777775....
...5777777H5....
...5777777H5....
..57777777HH5...
.5777577H5HH5...
.57755775.5H5...
..55.5775.5HH5..
......555..555..` ],
 [wall1, bitmap`
11110000L88L0000
77710000LLLL0000
117100HHLLL50050
0000LL6L1111HL5L
0000LLL41116LLLL
000HHLL41841LLLL
LLLL161879901611
LLLL14875700111H
L6LL11953700111H
0380000779LL11H1
08000009LL841111
00000080L3L61181
L8LLL64LLLLLHLLL
8811H000L33L0000
11110000LL3L0080
11110000LLLL0000`],
 [wall2,bitmap`
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
0000000000000000
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
0000000000000000
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
0000000000000000
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL
LL0LLLL0LLLL0LLL`],
 [goal, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111113331111
11111111FF331111
11111111FFF31111
1111111C6FF11111
111111CCC1111111
11111CCC11111111
1111CCC111111111
1111CC1111111111
1111111111111111
1111111111111111
1111111111111111`],
  [trap, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111119991111
11111111FF991111
11111111FFF91111
1111111C6FF11111
111111CCC1111111
11111CCC11111111
1111CCC111111111
1111CC1111111111
1111111111111111
1111111111111111
1111111111111111`],
 [floor1, bitmap`
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
 [mimo, bitmap`
1111111LL1111111
111441LLLL144111
111114LLLL411111
1111114444111111
1111144444411111
1111102440211111
1111102440211111
1111114444111111
1111111DDD111111
111111DDDDD11111
11111D1DDD1D1111
1111D11DDD11D111
1100011DDD111111
1101011DDD111111
1133311D1D111111
1133311D1D111111`],
 [bportal, bitmap`
1111111111111111
1111111711111111
1111111171111111
1111711171117111
1111111711171111
1711171177711111
1177117771171111
1111717771117111
1111177777111111
1111771777711111
1111711711171111
1117111111171111
1111111711111111
1171111117111711
1111111111111171
1111111111111111`],
 [prportal, bitmap`
1111111111111111
11H1111111H1H111
111111H1111H1111
11HH11H1111H1111
1111H1H111H11111
1111H11HHH111111
1111HH1HHH111111
111H1HHHHH11H111
1111HHHHHHHH1111
11111HHHHHH11111
11HHHHHHHH111111
11HH11H1HHH11111
111H11H111H11111
11H1111H111HH111
11HH11H111111H11
1111111111111111`],
  [stpieces,bitmap`
.......9........
......969.......
......9899......
.....96869......
.....96669......
...9996669999...
.99666666666699.
9688866766888869
.99666666666699.
...9996669999...
.....96669......
.....96869......
.....96869......
......969.......
......969.......
.......9........`]
)
setBackground(floor1)
setSolids([wall1,wall2,player,mimo,stpieces])
setPushables({
  [player]:[stpieces]
})

addText("You were a once", { y: 1, color: color`2` });
addText("famous artist ", { y: 2, color: color`2` });
addText("who was turned into", { y: 3, x:1, color: color`2` });
addText("a SLIME?!",{y:4, color: color`7`})

addText("W: up", { y: 5, x:7, color: color`7` });
addText("A: left", { y: 6, color: color`7` });
addText("S: down", { y: 7, color: color`7` });
addText("D: right", { y: 8,x:7, color: color`7` });

addText("Clear the mazes ", { y: 10, color: color`H` });
addText("to collect", { y: 11, color: color`H` });
addText("your supplies", { y: 12, color: color`H` });

addText("Click J to ", { y: 13, color: color`7` });
addText("continue", { y: 14, color: color`7` });


const bgm =tune`
200: C4^200,
200: D5^200 + A4^200,
200: C5^200,
200: D5^200,
200: E5^200,
200: B4^200,
200: G4^200,
200: C5^200,
200: F5^200,
200: A5^200,
200: F4^200,
200: C5^200,
200: D5^200,
200: A4^200,
200: E4^200,
200: G5^200,
200: A5^200,
200: G5^200,
200: E5^200,
200: A4^200,
200: B4^200,
200: A5^200,
200: G4^200,
200: F4^200,
200: C5^200,
200: G4^200,
200: D5^200,
200: D5^200,
200: B4^200,
200: C5^200 + A4^200,
200: F4^200 + F5^200,
200: G5^200 + E4^200`

const pbgm = tune`
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: A4~184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: D5^184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: F5^184.04907975460122,
184.04907975460122: A5^184.04907975460122,
184.04907975460122: D5~184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: D5^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: G4^184.04907975460122,
184.04907975460122: F5^184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: D5^184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: F5^184.04907975460122,
184.04907975460122: E5~184.04907975460122,
184.04907975460122: G5^184.04907975460122,
184.04907975460122: F5^184.04907975460122,
184.04907975460122: G5^184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: A4^184.04907975460122,
184.04907975460122: A4^184.04907975460122` //second option

const goalNoise = tune`
70.75471698113208: B4-70.75471698113208,
70.75471698113208: B4-70.75471698113208,
70.75471698113208: A4-70.75471698113208,
70.75471698113208: A4-70.75471698113208,
70.75471698113208: G5-70.75471698113208,
70.75471698113208: B4-70.75471698113208,
70.75471698113208,
70.75471698113208: B4-70.75471698113208,
70.75471698113208: C5-70.75471698113208,
1627.3584905660377`

const win = tune`
173.41040462427745: F5/173.41040462427745,
173.41040462427745: B5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: C5~173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: A5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: D5~173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: B5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: C5~173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: A5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: D5~173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: B5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: C5~173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: A5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: B5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: C5~173.41040462427745,
173.41040462427745: F5/173.41040462427745,
173.41040462427745: A5~173.41040462427745,
173.41040462427745: F5^173.41040462427745,
173.41040462427745: D5~173.41040462427745`

const playBack = playTune(bgm, Infinity)
let level = 0
const levels = [
  map`
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx
xxxxxxxxxxxxxx`,
  map`
xxxxxxxxxxxx
xwwwwwwwwwwx
xwgfffffffwx
xwffffffffwx
xwffffwwwwwx
xwwffwxxxxxx
xxwffwxxxxxx
xxwffwxxxxxx
xxwffwxxxxxx
wwwffwxxxxxx
fffffwxxxxxx
pffffwxxxxxx`,
  map`
xwwwwwwwwwwwx
xwfffffffffwx
xwfwwwwwwwfwx
xwfwwwwwxwfwx
xwfffffwxwfwx
xwwwwwfwxwfwx
xxxxxwfwxwfwx
xxwwwwfwxwfwx
xxwffffwxwfwx
xxwfwwwwfffff
wwwfwffffffff
pfffwfgfffffz`,
  map`
wpffffffffffffffffw
wffffwwwffffffffffw
wffffwfwfwwwwffwwww
wwwwwwfwfwffwffwfff
fffffffwfwffwffwfff
ffwwwwwwfwffwffwfff
fftffffffwffwffwfff
fwwwwwwwwwfffffwfff
fwfffffffffffffwwww
fwfffffffffffffffff
fwfffwwwwwwwwwwwwww
fwffffffffffffffftw
fwfffffffffffffffgw
fwwwwwwwwwwwwwwwwww
fffffffffffffffffff`,
  map`
p.....wxxxxxwwwwwwwwwwwwww
......wxxxxxwr.wg........w
......wxxxxxw..w.........w
......wxxxxxw..w.........w
......wxxxxxw..w.......w.w
.....bwxxxxxw..w......ww.w
wwwwwwwxxxxxw..w......w..w
xxxxxxxxxxxxw..w......w..w
xxxxxxxxxxxxw..w......w..w
xxxxxxxxxxxxw..www....w..w
wwwwwwwwwwwww....w....w..w
w................w....ww.w
w.tww............w.....w.w
w.wtwwwwwwwwwwwwww.w...w.w
w.w................w...w.w
w.w...............tw...wtw
w.wwwwwwwwwwwwwwwwww...w.w
w......................w.w
wwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
p.wxw..................
.bwxw..wwwwwwwwww......
wwwxw..w........w......
..wwwr.w........wwwwww.
..w...ww...............
.ww..w....wwwww.wwww...
.w..w..wwww...w.wxxw.w.
.w.w...w....g.w.wxxw.w.
.w.t...t......w.wxxw.w.
.w.w..........w.wxxw.w.
.w.wwwwwwwwwwww.wwww.w.
.w...................w.
.wwwwwwwwwwwwwwwwwwwww.
.......................`,
  map`
p.q..wwt........q...w......
.q...ww.r.......q...w......
q.b.qww..t......q...w......
q...qww.........q...w......
qqqqqwwwwwwwwwwww...w......
wwwwwwxxxxxxxxxxwb..w......
xxxxxxxxxxxxxxxxw.t.w......
xxxxxxxxxxxxxxxxw...w......
wwwwwwwwwwwwwwwwwqqqwqqqqqq
w.rt...w........w...w......
w.t....w.tb.....w...w......
w......w.tt.....w...w......
w......w........w...w......
w......w........w...w......
w......w........w...w......
w......w............w......
w......q............w......
w......q.wwwwwwwwwwwwwwwwww
wwwwwqqq...................
.g........................r`,
  map`
pwxxxxxxxxxwwwwwwwwwwww
.wxxwwwwwww.........tgw
.www........wwwwww.wwrw
.....wwwwwwwxxxxxw.wwww
wwwwwxxxxxxxxxxxxw.wxxx
xxxxxxxwwwwwwwwww..wxxx
wwwwwww...........wwxxx
w.......wwwwwwwwwwxxxxx
w.wwwwwwxxxxxxxxxxxxwww
w.wxxxxxxxxxxxxxxxwww..
w.wwwwwwwwwwwwwwwww....
w...................ww.
wwwwwwwwwwwwwwwwwwwwww.
xxxxxxxxxxxxxxxxxxxxxw.
wwwwwwwwwwwwwwwwwwwwww.
..q....................
..q....................
.bq....................
..q....................`,
  map`
............................q..
..wwwwwwwwwwwwwwwwwwwwwwwwwww..
..wxxxxxxxxxxxxxxxxxxxxxxxxxw..
..wxxxwwwwwwwwwwwwwwwwwwwwxxw..
..wwww.........bw........wwxw..
.......wwwwwwwww..........wxw..
wwwwwwwxxxxxxxxww.........wxw..
xxxxxxxxxxxxxxxxwwww......wxw..
xxxxwwwwwwwwxxxxxxxww...r.wxw..
xxwww......wwwxxxxxxw..rgrwxw..
xww....www...wwwwwwxw...r.wxw..
ww..www...w.......wxw..wwwxww..
w...w...w..w......wxwwwwxwww...
w...w.wwxw.w.......wxxxxww.....
w..w..wxxw.wwwwwww..wwwww......
w..w.wwxww.w.....ww............
w..w.wxxw..w.www.wxw...........
ww.w.wxxw..w.wxw.wxxwwwwwwww...
xw.w.wxxw..w.wxw.wxw.......www.
xw...wxxw..w.wxw.www.wwww.....w
xw..wwxxww...wxw.....wxxwwwww..
xwwwwxxxxwwwwwxwwwwwwwxxxxxxwwp`,
  map`
wpwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.zw..............................w
w.ww.wwwwwwwwwwwwwwwwwwwwwwwwwwww.w
w.ww.w..........................w.w
w.ww.w.wwwwwwwwwwwwwwwwwwwwwwww.w.w
w.ww.w.w......................w.w.w
w.ww.w.w.wwwwwwwwwwwwwwwwwwww.w.w.w
w.ww.w.w.w..................w.w.w.w
w.ww.w.w.w.wwwwwwwwwwwwwwww.w.w.w.w
w.ww.w.w.w.w..............w.w.w.w.w
w.ww.w.w.w.w.wwwwwwwwwwww.w.w.w.w.w
w.ww.w.w.w.w.wg.........w.w.w.w.w.w
w.ww.w.w.w.w.wwwwwwwwww.w.w.w.w.w.w
w.ww.w.w.w.w............w.w.w.w.w.w
w.ww.w.w.w.wwwwwwwwwwwwww.w.w.w.w.w
w.ww.w.w.w................w.w.w.w.w
w.ww.w.w.wwwwwwwwwwwwwwwwww.w.w.w.w
w.ww.w.w....................w.w.w.w
w.ww.w.wwwwwwwwwwwwwwwwwwwwww.w.w.w
w.ww.w........................w.w.w
w.ww.wwwwwwwwwwwwwwwwwwwwwwwwww.w.w
w.ww............................w.w
w.wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.w
w.wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.w
w.................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww..wp
................................w..w.
.wwwwwwwwwwwwwwwwwwwwwwwwwwwwww.w..w.
.wt...........................w.w..w.
.wwwwwwwwwwwwwwwwwwwwwwwwww.....w..w.
.ww.......................w..ww.wwww.
qww.wwwwwwwwwwwwwwwwwwwww.w..w.......
.ww.....................w.w..w.wwwwww
.wwwwwwwwwwwwwwwwwwwww..w.w..w.wxxxxx
.wxxxxxrxxxxxxxxxxxxxw..w.w..w.wxxxxx
.wxxxxxxxxxxxxxxxxxxxw..w.w..w.wxxxxx
.wwwwwwwwwwwwwwwwwwwww..w.w..w.wxxxxx
........................w.w..w.wwwwww
.wwwwwwwwwwwwwwwwwwwwww.w.w..w.......
bwxxxxxxxxxxxxxxxxxxxxw.w.w..wwwwwww.
.wxwwwwwwwxxxrxxxxxxxxw.w.wwwxxxxxxw.
.wxw.....wxxxxxxxxxxxxw.w...wxxxxxxw.
.wxw.www.wxxwwwwwwwwwww.www.wxxxxxxw.
.wxw.wxw.wxxw.............w.wxxxxxxw.
.wxw.wxw.wwww.wwwwwwwwwww.w.wxxxxxxw.
.wxw.wxw......wxxxxxxxxxw.w.wxxxxxxw.
.wxw.wxwwwwwwwwxxxxxxxxxw.w.wxxxxxxw.
.wxw.wxxxxxxxxxxxxxxxxxxw.w.wxxxxxxw.
.www.wxxxxxxxxxxxxxxxxxxw.w.wwwwwwww.
g....wxxxxxxxxxxxxxxxxxxw.w..........`
]

const winLvlMap = [
  map`
............
............
............
............
............
............
............
............
............
............`]

function winlvl (){
 
}

setMap(levels[level])

setPushables({
	[ player ]: [stpieces]
})

onInput("w", () => {
  clearText()
	getFirst(player).y -= 1
})

onInput("a", () => {
  clearText()
	getFirst(player).x -= 1
})

onInput("d", () => {
  clearText()
	getFirst(player).x += 1
})
onInput("s", () => {
  clearText()
	getFirst(player).y += 1
})

onInput("j", () => {
  clearText()
})



afterInput(() => {

    const trapsCovered = tilesWith(player, trap);
    
    if (trapsCovered.length > 0) {
        setMap(levels[level])
    }
  
})

afterInput(() => {
  const purplePortalsCovered = tilesWith(player, prportal);
  const bluePortalsCovered = tilesWith(player, bportal);
  
  if (purplePortalsCovered.length >= 1) {
    const bp = getFirst(bportal);
    const pl = getFirst(player);

    pl.x = bp.x;
    pl.y = bp.y;
  }

  if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(prportal);
    const pl = getFirst(player);

    pl.x = rp.x;
    pl.y = rp.y;
  }
 const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal,player).length;

  if (numberCovered === targetNumber) {
    level = level + 1;
    playTune(goalNoise)


    //traps
    
    const trapsCovered = tilesWith(player, trap);
    
    if (trapsCovered.length > 0) {
        setMap(levels[level])
    }

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`5` });
    }
  }


})