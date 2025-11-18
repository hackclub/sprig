/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: CaseOh's Castle
@author: Kris
@description: None
@tags: []
@addedOn: 2024-00-00
*/

/*
    Oh no! Rizzler is trapped in CaseOh's castle and the costco guys need to save him!

    Controls: wasd for AJ, ijkl for big justice.

    Goal: The exits (arrows) have to each be occupied by a character before the costco guys can progress. Big Justice
    can push crates, and AJ can push double chunk chocolate chip cookies. The buttons must be held down with crates in order
    for them to progress. Big Justice drowns, and AJ can swim. Rescue Rizzler!
*/

const rizzlerTL = "5"
const rizzlerBL = "6"
const rizzlerTR = "7"
const rizzlerBR = "8"
const caseOhTL = "9"
const caseOhTR = "0"
const caseOhBL = "m"
const caseOhBR = "n"
const aj = "a"
const bigJustice = "b"
const wall = "w"
const grass = "g"
const tallGrass = "t"
const exit = "e"
const houseTL = "1"
const houseBL = "2"
const houseTR = "3"
const houseBR = "4"
const button = "o"
const water = "h"
const crate = "c"
const doublechunk = "d"
const stone = "s"

setLegend(
  [ rizzlerTL, bitmap`
1111661111111LLL
111166L111111LLL
1L66116611111111
1L6611661LLL1111
1LLL66111LLLCCCC
111166111LLLCCCC
1L1111L11111LLLL
11LL11111111LLLL
11LL11LLL111LLLL
111111LLL111LLLL
111111LLFFFFLLLL
LLL11L11FFFFLLLL
66L166L1FFFFFF00
661166LLFFFFFF00
1166L111FFFF0000
1166L111FFFF0000` ],
  [ rizzlerTR, bitmap`
11111L1111111LLL
111111L111111LLL
1LLL11LL11111111
1LLL111L1LLL1111
CCCC1L111L661166
CCCC1L111L661166
LLLL11L111116611
LLLL1111111166L1
LLLL11LLL1661166
LLLL11LLL1661166
LLLLFFFFL11LL111
LLLLFFFF11L11111
FFFFFFFF00111111
FFFFFFFF00LLL111
FFFFFFFF1100L111
FFFFFFFF11001111` ],
  [ rizzlerBL, bitmap`
6611661100000000
661166L100000000
1LLL11LLFFFFFFFF
1LLL111LFFFFFFFF
1LLL1L11FFFFFFFF
11111L11FFFFFFFF
1L1111L11FFFFFFF
11LL111111FFFFFF
11LL11LLL11100L1
111111LLL1110011
111111LLL11L0011
LLL11L1111L10011
LLL11LL111110011
111111LL11440011
11LLL11144444411
11LLL11144444411` ],
  [ rizzlerBR, bitmap`
FFFFFFFF11001LLL
FFFFFFFF11001LLL
FFFFFFFF00111111
FFFFFFFF00LL1111
FFFFFFFF1LLL1111
FFFFFFFF1LLL1111
FFFFFFF111661111
FFFFFF111166LLL1
110011LL661166L1
110011LL66116611
110011LLL166L111
LL001L1111661111
LL001LL111111111
110044LL11LLL111
1144444411LLL111
1144444411111111` ],
  [ caseOhTL, bitmap`
..........999999
..........977777
..........97LLLL
..........97LLLL
..........97L3LL
..........97LL3L
..........97LLLL
..........97LLLL
..........97LLL3
..9999999997LLLL
.9977777777777CC
9977777777777777
9777777777777777
9777777777777777
9777777777777777
9777777777777777`],
  [ caseOhTR, bitmap`
999999..........
777779..........
LLLL79..........
LLLL79..........
LL3L79..........
L3LL79..........
LLLL79..........
LLLL79..........
3LLL7999999999..
LLLL77777777799.
CC77777777777799
7777777777777779
7777777777777779
7777777777777779
7777777777777779
7777777777777779`],
  [ caseOhBL, bitmap`
9777777777777777
9777777777777777
9777777777777777
9777777777777777
9777L77777777777
97777L7777777777
97777L7777777777
977777L777777777
977777L777777777
9777777L77777777
97777777L7777777
9777777777777777
9977777777777777
.997777777777777
..99777777777777
...9999999999999`],
  [ caseOhBR, bitmap`
7777777777777779
7777777777777779
7777777777777779
7777777777777779
77777777777L7779
7777777777L77779
7777777777L77779
777777777L777779
777777777L777779
77777777L7777779
7777777L77777779
7777777777777779
7777777777777799
777777777777799.
77777777777799..
9999999999999...`],
  [ aj, bitmap`
................
................
................
................
......0000......
......0LL0......
.....00LL00.....
....00600600....
...0000660000...
...0010000100...
...0001001000...
...0000000000...
.....00..00.....
...CCCC..CCCC...
...CCCC..CCCC...
................`],
  [bigJustice, bitmap`
.......00.......
.......00000....
......LLLL......
....CCCLLCCC....
...CCCCCCCCCC...
...CCCCCCCCCC...
..CCCCCCCCCCCCC.
..0CCCC00CCCC00.
.000C0000CCCC00.
.0000000CCCCC00.
.000000CCCCCC00.
...777777777700.
....77777777.00.
.....7....7.....
.....7....7.....
....00....00....`],
  [wall, bitmap`
0000000000000000
0L00000000000L00
0L00L000000L00L0
0010L000L0000000
0000L000L1000100
000L0L000L0000L0
000L001000L00000
0L00L00L00010010
0L000L001000000L
00100L000L000000
000L10L0001L000L
0L0000010000L000
0L000000L0000L00
0L00000001000000
0010000000L000L0
000L000000010001`],
  [grass, bitmap`
................
....5......5....
................
......5.........
..D.......D.....
................
....5...D....5..
................
......D...5.....
..D.........D...
......D.........
.............5..
.....D....D.....
..5.....5.......
.............D..
................`],
  [tallGrass, bitmap`
DDDDDDDDDDDDDDDD
D7DDDDDDDDDDD7DD
D7DD7DDDDDD7DD7D
DD5D7DDD7DDDDDDD
DDDD7DDD75DDD5DD
DDD7D7DDD7DDDD7D
DDD7DD5DDD7DDDDD
D7DD7DD7DDD5DD5D
D7DDD7DD5DDDDDD7
DD5DD7DDD7DDDDDD
DDD75D7DDD57DDD7
D7DDDDD5DDDD7DDD
D7DDDDDD7DDDD7DD
D7DDDDDDD5DDDDDD
DD5DDDDDDD7DDD7D
DDD7DDDDDDD5DDD5`],
  [exit, bitmap`
................
................
.......11.......
......1111......
.....111111.....
....11111111....
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
.......11.......
................`],
  [houseTL, bitmap`
................
................
................
................
..00000000..0000
..00000000..0000
..00LL1100..00LL
..00LL1100..00LL
..00LL1100000011
..00LL1100000011
..00LLLL00LLLLLL
..00LLLL00LLLLLL
..0011LL003333LL
..0011LL003333LL
0000000000330000
0000000000330000`],
  [houseTR, bitmap`
................
................
................
................
0000..00000000..
0000..00000000..
1100..00LLLL00..
1100..00LLLL00..
LL000000LL1100..
LL000000LL1100..
LLLLLL0011LL00..
LLLLLL0011LL00..
LL333300LLLL00..
LL333300LLLL00..
0000330000000000
0000330000000000`],
  [houseBL, bitmap`
00LLLL00003300LL
00LLLL00003300LL
00LLLL00000000LL
00LLLL00000000LL
00LLLL00LLLLLLLL
00LLLL00LLLLLLLL
00LL1100LLLLLLLL
00LL1100LLLLLLLL
00LL1100LLLLLL00
00LL1100LLLLLL00
00111100LLLL0033
00111100LLLL0033
0011LL00LLLL0033
0011LL00LLLL0033
0000000000000000
0000000000000000`],
  [houseBR, bitmap`
LL00330000LLLL00
LL00330000LLLL00
LL00000000LLLL00
LL00000000LLLL00
LLLLLLLL00LL1100
LLLLLLLL00LL1100
LLLLLLLL00LL1100
LLLLLLLL00LL1100
0011LLLL0011LL00
0011LLLL0011LL00
330011LL00LLLL00
330011LL00LLLL00
3300LL1100LLLL00
3300LL1100LLLL00
0000000000000000
0000000000000000`],
  [crate, bitmap`
0000000000000000
00CC1CC00CCCCC00
0CC1CCC00CCCCCC0
0CLCC1C00CCCLCC0
0CCC1CC00CCLCCC0
0CCLCCC00CLCCLC0
0CCCCCC00CCCLCC0
0000000110000000
0000000110000000
0CCCCLC00CCCCCC0
0CCCLCC00CCCCCC0
0CCLCCC00CCC1CC0
0CCCCLC00CC1CCL0
0CCCLCC00CLCC1C0
00CCCCC00CCCCC00
0000000000000000`],
  [button, bitmap`
1111111111111111
1LL1111111111LL1
1LL1111111111LL1
1111100000011111
1111033333301111
1110333333330111
1110333333330111
1110333333330111
1110333333330111
1110333333330111
1110333333330111
1111033333301111
1111100000011111
1LL1111111111LL1
1LL1111111111LL1
1111111111111111`],
  [water, bitmap`
5555777777775555
5557722222277555
5577277777727755
5772772222772775
7727727777277277
7277277777727727
7272777777772727
7272777557772727
7272777557772727
7272777777772727
7277277777727727
7727727777277277
5772772222772775
5577277777727755
5557722222277555
5555777777775555`],
  [doublechunk, bitmap`
....LLLLLLLL....
...LL0CCCCCLL...
..LLCCCCC0CCLL..
.LLCCC0CCCCCCLL.
LLC0CCCCCC0CCCLL
LCCCCCCCCCCCCC0L
LCCCC0CCCCCCCCCL
LCCCCCCCCCCCCCCL
L0CCCCC0CCCCC0CL
LCCC0CCCCC0CCCCL
LCCCCCCCCCCCCCCL
LLCCCCCCCCCCCCLL
.LLCCCCC0CC0CLL.
..LL0CCCCCCCLL..
...LLCC0CCCLL...
....LLLLLLLL....`],
  [stone, bitmap`
11111L1111111LLL
111111L111111LLL
1LLL11LL11111111
1LLL111L1LLL1111
1LLL1L111LLL1111
11111L111LLL1111
1L1111L111111111
11LL11111111LLL1
11LL11LLL111LLL1
111111LLL1111111
111111LLL11LL111
LLL11L1111L11111
LLL11LL111111111
111111LL11LLL111
11LLL11111LLL111
11LLL11111111111`]
)


setSolids([ bigJustice, aj, wall, tallGrass, crate, houseTL, houseTR, houseBL, houseBR, doublechunk ])

let level = 0
const levels = [
  map`
tttettt
t.g...t
t...g.t
t.gba.t
tg....t
t..g.gt
ttttttt`,map`
tttttttttt
tt90....tt
t.mn.....t
t...13.g.t
tg..24...t
t.g.ee...t
t..g..gg.t
t........t
tt...g..tt
ttt.ba.ttt`,map`
wwewwwwew
wh....w.w
wc..cw..w
w.ccww..w
w..c.w.hw
w...wwhhw
w.wwwhhhw
w.....hhw
www.bawww`,map`
wwwewwwwweww
ww...wwwc..w
w....www...w
w..h..ww..c.
w.hhh.w.cc..
wchhhcc...w.
wchh..w...w.
w.w..w....w.
w.ww.w...w..
w.ww.ww..w.o
w....www.w.w
wwwwbwwwawww`,map`
wwwwwwewwwwwewww
wo.......w.....w
w...h....w.d.www
w..wwww.w......w
w.wdw.....d.w..w
wd...w.d..www..w
w....ww.d.w.c..w
w..d..w..ww.cccw
wdd..ww.d.w....w
w..dwww..ww...hw
w.d..dwwww...h.w
www.d..w.......w
wwd....w...hh..w
wd...d.w....hh.w
w......w.o.....w
wwwwawwwwwwbwwww`,map`
wwwwwwwwwwwwwwww
wwwcs57sc....www
ww.cs68sc.....ww
w..cssssch.....w
w..cccccc..h...w
w..h..h.h......w
w.........h....w
w...h........h.w
w.....h90......w
w...h.hmn..h...w
wh.............w
w..............w
w......h.......w
ww............ww
www..........www
wwwwwwa..bwwwwww`
]
const currentLevel = (levels[level])
setMap(currentLevel)

setPushables({
  [ bigJustice ]: [aj,crate],
  [ aj ]: [doublechunk]
})

function moveCaseOh(){
  const caseOhPos = getFirst(caseOhBL)
  const ajPos = getFirst(aj)
  const distX = ajPos.x - caseOhPos.x
  const distY = ajPos.y - caseOhPos.y
  if(Math.abs(distX) > Math.abs(distY)){
    caseOhPos.x += Math.sign(distX)
    getFirst(caseOhBR).x += Math.sign(distX)
    getFirst(caseOhTL).x += Math.sign(distX)
    getFirst(caseOhTR).x += Math.sign(distX)
  }
  else{
    caseOhPos.y += Math.sign(distY)
    getFirst(caseOhBR).y += Math.sign(distY)
    getFirst(caseOhTL).y += Math.sign(distY)
    getFirst(caseOhTR).y += Math.sign(distY)
  }
}


onInput("w", () => {
  getFirst(aj).y -= 1
})

onInput("a", () => {
  getFirst(aj).x -= 1
})

onInput("s", () => {
  getFirst(aj).y += 1
})

onInput("d", () => {
  getFirst(aj).x += 1
})

onInput("i", () => {
  getFirst(bigJustice).y -= 1
})

onInput("j", () => {
  getFirst(bigJustice).x -= 1
})

onInput("k", () => {
  getFirst(bigJustice).y += 1
})

onInput("l", () => {
  getFirst(bigJustice).x += 1
})

setInterval(() => {
  if(tilesWith(caseOhBL).length > 0){
    moveCaseOh()
    if(tilesWith(caseOhBL, aj).length > 0){
      setMap(levels[level])
    }
    else if(tilesWith(caseOhBL, bigJustice).length > 0){
      setMap(levels[level])
    }
  }},300)

afterInput(() => {
  //Exit tiles
  const leaveReq = tilesWith(exit).length + tilesWith(button).length
  //Number of exits that have aj and bigJustice on them
  const towardsReq = tilesWith(exit, aj).length + tilesWith(exit, bigJustice).length + tilesWith(button,crate).length
  const won = tilesWith(stone, aj).length + tilesWith(stone, bigJustice).length
  const drown = tilesWith(water, bigJustice).length
  if(drown>0){
    setMap(levels[level])
  }

  if(leaveReq == towardsReq){
    if(leaveReq>0){
      level+=1
      setMap(levels[level])
    }
    if(won>0){
      addText("Rizzler Rescued!", { 
      x: 3,
      y: 5,
      color: color`3`
})
    }
  }
})