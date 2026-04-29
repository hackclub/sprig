/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: THE PUZZLE MASTER
@author: owlman20xx
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const pepsi = "x"
const thepit = "f"
const thebox = "b"
const floor = "n"
const button = "t"
const toggleWallOn = "o"
const toggleWallOff = "g"
const puzzlemaster = "m"
const pepsiwildcherry = "l"
const black = "r"

setLegend(
  [player, bitmap`
................
.77777777777777.
.72222222222227.
.72272222272227.
.72272222272227.
.72272222272227.
.72222222272227.
.72222222222227.
.72222222277277.
.77722277772777.
.72777772222227.
.72222222222227.
.72222222222227.
.72222222222227.
.77777777777777.
................`],
  [wall, bitmap`
FFFFFFFFFFFFFFFF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FCCCCCCCCCCCCCCF
FFFFFFFFFFFFFFFF`],
  [pepsi, bitmap`
...0000000000...
..055555555550..
..035555555550..
..033333333550..
..033333333550..
..033333333350..
..033333333350..
..033333333320..
..033333333320..
..023333333320..
..023333333320..
..022333333220..
..022333333220..
..022222222220..
..022222222220..
...0000000000...`],
  [thepit, bitmap`
.1..............
.11.............
..11..LLLLLLL.11
...11LLLLLLLL111
.....LLL0000LL..
....LLL000000LL.
....LLL000000LL.
....LLL000000LL.
....LLL000000LL.
....LLL000000LL.
....LLL000000LL.
....LLL000000LL.
..11.LL000000L..
.11..LLL0000L1..
.1....LLLLLLL.1.
..............11`],
  [thebox, bitmap`
................
.LLLLLLLLLLLLLL.
.L111111111111L.
.LLLL111111LLLL.
.L11LL1111LLLLL.
.L111LL11LL111L.
.L111111111111L.
.L11L111111L11L.
.L11L111111L11L.
.L11L111111L11L.
.L11111LLLL111L.
.L11LLLLLLLL11L.
.L11111LLLL111L.
.L111111111111L.
.LLLLLLLLLLLLLL.
................`],
  [floor, bitmap`
FFFFFFFFFFFFFFFF
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
FFFFFFFFFFFFFFFF`],
  [button, bitmap`
................
................
................
................
................
................
................
................
...3333333333...
...3333333333...
...3333333333...
...3333333333...
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [toggleWallOn, bitmap`
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
  [toggleWallOff, bitmap`
3333........3333
3..............3
3..............3
3..............3
................
................
................
................
................
................
................
................
3..............3
3..............3
3..............3
3333........3333`],
  [puzzlemaster, bitmap`
......HHHHH.....
......H606H...C.
.C....H000H...C.
.C....HHHHH...C.
CC...HHH0HHHH..C
C...HHHH0HHHHCC.
CCHHHHHH0HHHH...
.CHHHHHH0HHHHH..
..HHHHHH0HHHHH..
..HHHHHH00HHHHH.
..HHHHHH0HHHHHH.
..HHHHHH0HHHHHH.
..HHHHHH0HHHHHHH
..HHHHHH0HHHHHHH
....C......CC...
...CC......CCC..`],
  [pepsiwildcherry, bitmap`
...0000000000...
..055555555550..
..025555555550..
..022222222550..
..022224422550..
..022242222250..
..022233322250..
..022233322230..
..022233322230..
..032222222230..
..032222222230..
..033222222330..
..033222222330..
..033333333330..
..033333333330..
...0000000000...`],
  [black, bitmap`
0000000000000000
0000000000000000
0020000000000200
0000000000000000
0000000002000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000200000
0000000000000000
0000000000000020
0000000000000000
0000000000000000`],
)

setSolids([player, wall, thebox, toggleWallOn])



let level = 0
const levels = [
  map`
wwwwwwww
wx.....w
w......w
w......w
w.....pw
wwwwwwww`,
  map`
wwwwwwww
wxww...w
w....wpw
wwwwwwww`,
  map`
wwwwwwww
ww.x..ww
ww.ww.ww
wwfww.ww
wp.....w
wwwwwwww`,
  map`
wwwwwwww
wpb..fxw
wwwwwwww`,
  map`
wwwwwwww
w...p.xw
wwwwwwww`,
  map`
wwwwwwww
w....fxw
w...wwww
w......w
w....b.w
wp.....w
wwwwwwww`,
  map`
wwwwwwww
w...p.xw
w...wwww
w......w
w......w
w......w
wwwwwwww`,
  map`
wwwwwwww
w.....pw
w.b....w
w..wooow
w.wwo..w
wtwwo.xw
wwwwwwww`,
  map`
wwwwwwww
w......w
w......w
w..wgggw
wpwwg..w
w.wwg.xw
wwwwwwww`,
  map`
wwwwwwww
wp..ofxw
w....wow
w.b....w
w.....tw
wwwwwwww`,
  map`
wwwwwwww
w...gfxw
w....wgw
w......w
w....p.w
wwwwwwww`,
  map`
wwwwwwww
wx.....w
w......w
wwwwfwww
w......w
w....b.w
w......w
wwwfwwww
w......w
w.b....w
w.....pw
wwwwwwww`,
  map`
wwwwwwww
wx.....w
w......w
wwwwfwww
w......w
w....b.w
w......w
www.wwww
w..p...w
w......w
w......w
wwwwwwww`,
  map`
wwwwwwww
wx.....w
w......w
wwww.www
w...p..w
w......w
w......w
www.wwww
w......w
w......w
w......w
wwwwwwww`,
  map`
wwwwwwwwwwwwwwww
wp..w...w...w..w
w...f.b.w...f..w
w...w...w...w..w
w.b.w...f.b.w..w
w...w...w...w.xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w...w...w...w..w
w..p..b.w...f..w
w...w...w...w..w
w...w...f.b.w..w
w...w...w...w.xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w...w...w...w..w
w.......w...f..w
w...w...w...w..w
w...w..p..b.w..w
w...w...w...w.xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w...w...w...w..w
w.......w..p...w
w...w...w...w..w
w...w.......w..w
w...w...w...w.xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w....w...w..w
w.x..f.b.fb.w
w....w...w..w
wwwwwwwwwwwfw
wooooooooo..w
w........o..w
wp...b..to.bw
w........o..w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w....w...w..w
w.x..f.b.fb.w
w....w...w..w
wwwwwwwwwwwfw
wggggggggg..w
w........g..w
w......p.g.bw
w........g..w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w....w...w..w
w.x..f.b.fb.w
w....w...w..w
wwwwwwwwwww.w
wggggggggg.pw
w........g..w
w........g..w
w........g..w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w....w...w..w
w.x..f.b..p.w
w....w...w..w
wwwwwwwwwww.w
wggggggggg..w
w........g..w
w........g..w
w........g..w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwww
w....w...w..w
w.x...p.....w
w....w...w..w
wwwwwwwwwww.w
wggggggggg..w
w........g..w
w........g..w
w........g..w
wwwwwwwwwwwww`,
    map`
wwwwwwwwwwwwwwww
w..........w...w
w.ww.wwww..w.w.w
w.w..wwwwww..w.w
w.ww.wwwwwwwow.w
w..w.....w...w.w
ww.www.wwwx..w.w
w......wwwwwww.w
w.w.wwww.....w.w
w.w....w.w.www.w
w.wwww.w.w.....w
w....w.w.wbwwwww
w.ww.w.w.w.wwwww
wpw..w...wtwwwww
wwwwwwwwwwwwwwww`,
      map`
wwwwwwwwwwwwwwww
w..........w...w
w.ww.wwww..w.w.w
w.w..wwwwww..w.w
w.ww.wwwwwwwgw.w
w..w.....w...w.w
ww.www.wwwx..w.w
w......wwwwwww.w
w.w.wwww.....w.w
w.w....w.w.www.w
w.wwww.w.w.....w
w....w.w.w.wwwww
w.ww.w.w.wpwwwww
w.w..w...w.wwwww
wwwwwwwwwwwwwwww`,
  map`
rrrrrrrrr
rrrrrrrrr
rrrrrrrrr
rrrrrrrrr
rrrrmrrrr
rrrrrrrrr
rrrrlrrrr
rrrrrrrrr
rrrrrrrrr`,
]
const currentLevel = levels[level];
setMap(currentLevel)

if (currentLevel !== undefined) {
  setMap(currentLevel);
}
setPushables({
  [player]: [thebox, player]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("j", () => {
  const currentLevel = levels[level];
  setMap(currentLevel)
  //reset button
})
afterInput(() => {
  width();
  height();

  // interaction variables
  const numberCovered = tilesWith(pepsi, player).length;
  const indapit = tilesWith(thepit, player).length;
  const boxedup = tilesWith(thepit, thebox).length;
  const buttonbox = tilesWith(thebox, button).length;

  // Interactions
  if (buttonbox === 1) {
    //We're using the same trick we used for the pit
    level = level + 1;
    const currentLevel = levels[level];
    setMap(currentLevel)
  }

  if (numberCovered === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
    setMap(currentLevel)
    //change level

  }
  if (indapit === 1) {
    //reset level if you fall in the pit
    const currentLevel = levels[level];
    setMap(currentLevel)
  }
  // We set the map to a version without the pit. FIX LATER. Nevermind ill have to hack it
  if (boxedup === 1) {
    level = level + 1;

    const currentLevel = levels[level];
    setMap(currentLevel)
  }
  // This part makes the walls toggle when the button is pressed

  if (currentLevel === 11) {
    addText("I AM THE PUZZLE MASTER, AND YOU HAVE COMPLETED MY PUZZLE. TAKE THIS FREE PEPSI WILD CHERRY.", {
      x: 1,
      y: 1,
      color: color`3`
    })
  }
});