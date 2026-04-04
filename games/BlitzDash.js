/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: BlitzDash
@author: Ethan Spearing
@tags: []
@addedOn: 2025-00-00
*/
const player = "p";
const wall = "w";
const floor = "f";
const goal = "g";
const charge = "c";
const poster = "o";
setLegend(
  [ player, bitmap`
................
..LL..6.........
...LL..66.......
....LLLLL66.....
.....L1772L.....
..LL.L1177L.....
...LLL1111L.....
....L1111L......
....L1LL1L......
....L111LL......
....LLLL1L......
....L1111L......
....L1LL1L......
....L1LL1L......
....L11L11L.....
.....LL.LL......`],
  [ wall, bitmap `
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
 [floor, bitmap `
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
  [goal, bitmap`
................
................
................
................
................
................
............3333
............3333
............3333
............00..
............00..
............00..
............00..
............00..
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [charge, bitmap`
................
.......3333.....
......33363.9...
.....3333333.9..
.....LLLLLL99...
.....L1992L.....
.....L1199L.....
....LL1111L.....
....L1111L......
....L1LL1L......
....L111LL......
....LLLL1L......
....L1111L......
....L1LL1L......
....L11L11L.....
.....LL.LL......`],
  [poster, bitmap`
CCCCCCCCCCCCCCCC
C22233336329222C
C22333333332922C
C22LLLLLLL99222C
C22L11992L22222C
C22L11199L22222C
C22L11111L22222C
C2LL1111L222222C
CCCCCCCCCCCCCCCC
C0C0C00C0CC00CCC
C0C0C0CC0CC0C0CC
C000C00C0CC00CCC
C0C0C0CC0CC0CCCC
C0C0C00C00C0CCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
);
let level = 0;
let levels = [
  map`
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
.........ww
..........w
....o......
...........
..p.......g
fffffffffff`,
  map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwfffffffw
wff.....fw
wf...ff..w
wf.f.fff.w
p..f.fg..w
fffffffffw`,
 map`
wfffffffff
f........f
f.ffffff.f
f......f.g
f..fff.fff
f..f...fff
wfff.fffff
w......fff
wpffffffff`,
  map `
wwwww.....
wwwww.fff.
wwwww.fg..
wwww..ffff
www..ffwww
ww..fffwww
w..ffffwww
..fffffwww
pffffffwww`,
map `
g.....ffff
fffff.....
wwwwffff.f
wwww......
ffff.fffff
.....fwwww
pfffffwwww`,
map`
.....fwwww
..ff.fg...
f.ff.fff..
f.ff.ffff.
f.ff..fff.
f.fff.f...
f...f.f.f.
p...f.f.f.
fffff...f.`,
map`
wpfwffffff
w.fwf....f
w.fff.ff.f
w.....f..f
wfffff...f
wffff..fff
w.....ffgf
w.ffffff.f
f........f`,
  map`
fff...f...
....f...fg
.fffffffff
.........f
ffffffff.f
.p.....f.f
fff.ffff.f
fff......f
ffffffffff`,
  map`
wwwwwwwwww
.p.......w
wfffffff.w
wwwwwwwf.w
ffffffff.w
f........w
f.ffffffff
f.ffffffff
cgwwwwwwww`];
const currentlevel = levels[level];
 setMap(currentlevel);

setSolids([player, wall, floor, charge])
setPushables({
  [ player ]: []
})


onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -=1
})
onInput("d", () => {
  getFirst(player).x +=1
})
onInput("a", () => {
  getFirst(player).x -=1
})

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, player).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentlevel = levels[level];
  if  (currentlevel !== undefined) {
    setMap (currentlevel);
  }
    else {
    addText("Thanks for playing", { y: 5, X: 7, color: color `5`});
  }
  }  
});
