/*
@title:Lunk 
@author:PotatoHacker 
@tags: []
@addedOn: 2025-02-11
*/

//sprites
const player = "p";
const wall = "X";
const block0 = "0";
const block0target = ")";
const lock = "L";
const goal = "G";
const background = "+"
const button = "S"
const arrowup = "u"
const fakewall = "f"
//sounds
const complete = tune`
61.60164271047228: C4/61.60164271047228,
61.60164271047228: E4/61.60164271047228,
61.60164271047228: G4/61.60164271047228,
61.60164271047228: C5/61.60164271047228,
1724.8459958932237`
const backmusic = tune`
535.7142857142857: D4-535.7142857142857,
1607.1428571428569,
535.7142857142857: A4-535.7142857142857,
1607.1428571428569,
535.7142857142857: D4-535.7142857142857,
1607.1428571428569,
535.7142857142857: A4-535.7142857142857,
535.7142857142857,
535.7142857142857: A4-535.7142857142857,
535.7142857142857,
535.7142857142857: D4-535.7142857142857,
1607.1428571428569,
535.7142857142857: A4-535.7142857142857,
1607.1428571428569,
535.7142857142857: D4-535.7142857142857,
1607.1428571428569,
535.7142857142857: A4-535.7142857142857,
535.7142857142857,
535.7142857142857: A4-535.7142857142857,
535.7142857142857`
setLegend(
  [ player, bitmap`
................
................
................
.....000000.....
....0LLLLLL0....
...0LLLLLLLL0...
..00L2LLLL2L00..
..00L2LLLL2L00..
..0.0LLLLLL0.0..
..0..000000..0..
..0..0....0..0..
..0..0....0..0..
.....0....0.....
.....0....0.....
.....0....0.....
..0000....0000..`],
  [ wall, bitmap`LLLLLLLLLLLLLLLL
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
  [ block0, bitmap`
................
.00000000000000.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
.00000000000000.
................`],
  [block0target, bitmap`................
  ................
  .33333333333333.
  .30000000000003.
  .30333333333303.
  .30300000000303.
  .30300000000303.
  .30300000000303.
  .30300000000303.
  .30300000000303.
  .30300000000303.
  .30300000000303.
  .30333333333303.
  .30000000000003.
  .33333333333333.
  ................`],
  [lock, bitmap`
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
  [goal, bitmap`
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
  [background, bitmap`
0111111111111111
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
  [button, bitmap`
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
  [arrowup, bitmap`LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL22LLLLLLL
LLLLLL2222LLLLLL
LLLLL222222LLLLL
LLLL22222222LLLL
LLL2222222222LLL
LLLLLL2222LLLLLL
LLLLLL2222LLLLLL
LLLLLL2222LLLLLL
LLLLLL2222LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [fakewall, bitmap`LLLLLLLLLLLLLLLL
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
  
  `],
)

setSolids([player, wall, block0, lock])
setBackground(background)
let level = 0
const levels = [ 
  map`
XXXXXXXXXXXXXXXX
Xp......X......X
X.......X).....X
XXXXXX..X......X
X...GX..X......X
XLXXXX..X......X
X............0.X 
X..............X
XXXXXXXXXXXXXXXX`,
map`
XXXXXXXXXXXXXXXX
X......X...X..SX
X.X.X.XX.X.XX.XX
X.X.X..X.X....XX
X.X.XXXX.X.XXXXX
X.X.X.X..X.X..GX
X.X.X.X..X.X.X.X
XpX......X.L...X
XXXXXXXXXXXXXXXX`, 
map`
XXXXXXX)XXXXXXXX
X)......0....XpX
XXXX0XX.XX.X.X.X
X..........X...X
X.XXXXXXXXXXXXXX
X..............X
XLXXXXXXXXXXXX.X
XLXS...........X
XGXuXXXXXXXXXXXX`,
map`XXXXXXXXXXXXXXXX
XpX............X
X.XXXfXXXXXXXX.X
X.f...XXXXXX.f.X
XXX...X......X.X
X.....X.fXXXXX.X
X.XXXXXfXXXX.f.X
X.....XGX....X.X
XXXXXXXXXXXXXXXX`,
map`
XXXXXXffXXXXXXXX
X.0.......SX.fSX
X..........X.XXX
X.....p........X
XLX............X
XLX...........)X
XLXXX.X.XXXXXXuX
XGf......0....)X
XXXXXXXXXXXXXXuX
`]

setMap(levels[level])

setPushables({
  [ player ]: [ block0 ]
})
playTune(backmusic, Infinity)
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("j", () => {
  setMap(levels[level])
  clearText()
})
afterInput(() => {
  if (level === 0) {
  const target = tilesWith(block0target).length
  const num = tilesWith(block0, block0target).length
  const check = tilesWith(lock).length
  if (target === num && level === 0) {
    if (check === 1) {clearTile(1,5)}  }
  } else if (level === 1)
  {  const buttoncheck = tilesWith(button, player).length
  if (buttoncheck > 0 && level === 1) {
    clearTile(11,7)
  }
  } else if (level === 2) {
    const buttoncheck = tilesWith(button, player).length
    if (buttoncheck > 0) {
      clearTile(1,7)
    } 
    const target = tilesWith(block0target).length
    const num = tilesWith(block0, block0target).length
    const check = tilesWith(lock).length
    if (target === num && check === 1) {
      clearTile(1,6)
    }
  } else if (level === 3) {
    //Blank intentionally
  } else if (level === 4) {
    const buttoncheck = tilesWith(button, player).length
    const target = tilesWith(block0target).length
    const num = tilesWith(block0, block0target).length
    let check1 = 0
    if (target === num && check1 === 0) {
      clearTile(1,5)
      check1 = check1 + 1
    }
    let check2 = 0
    if (getTile(10,1) == "[object Object],[object Object]" && check2 === 0) {
      clearTile(1,6)
      check2 = check2 + 1
      addText("<= fake tile",{x:4,y:12,color:color`4`})
    }
    let check3 = 0
    if (getTile(14,1) == "[object Object],[object Object]" && check3 === 0) {
      
    }
  }
  })
afterInput(() => {
  const goalcheck = tilesWith(goal, player).length
  if (goalcheck > 0 ) {
    level = level + 1
    addText("N", {x: 8, color:color`4`})
    addText("i", {x: 9, color:color`3`})
    addText("c", {x:10, color:color`5`})
    addText("e", {x:11, color:color`6`})
    if (level !== 5) {
    setMap(levels[level])} else {
      clearText()
      addText("Congratulations!", {color:color`4`})
    }
    setTimeout(() => {
      clearText()
    }, 1000)
  }
})
