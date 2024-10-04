/*
@title: Little Spring Game
@author: Jonas Heilig
@tags: []
@addedOn: 2024-07-08
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const box = "k"
const catbox = "t"
const background = "b"
const hous = "h"
const cat = "c"
const cathous = "z"
const wall = "w"
const destroyablething = "d"
const transparent = "u"
const backgroundTune = tune`
172.41379310344828: D4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: D4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: E4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: F4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: G4~172.41379310344828,
172.41379310344828: G4~172.41379310344828`

playTune(backgroundTune, Infinity)

setLegend(
  [player, bitmap`
................
................
................
................
................
................
......44444.....
......45454.....
......44444.....
......45554.....
......44444.....
................
................
................
................
................`],
  [box, bitmap`
................
................
..CCCCCCCCCCCC..
..CCCFCCCCFCCC..
..CCCFCCCCFCCC..
..CFFFFFFFFFFC..
..CCCFCCCCFCCC..
..CCCFCCCCFCCC..
..CCCFCCCCFCCC..
..CCCFCCCCFCCC..
..CFFFFFFFFFFC..
..CCCFCCCCFCCC..
..CCCFCCCCFCCC..
..CCCCCCCCCCCC..
................
................`],
  [catbox, bitmap`
................
................
..333333333333..
..333733337333..
..333733337333..
..377777777773..
..333733337333..
..333733337333..
..333733337333..
..333733337333..
..377777777773..
..333733337333..
..333733337333..
..333333333333..
................
................`],
  [background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [hous, bitmap`
7777777777777777
7777CCCCCCCC7777
777CCCCCCCCCC777
77CCCCCCCCCCCC77
7CCCCC2222CCCCC7
CCCCCCCCCCCCCCCC
C77CC66CC66CC77C
777CC66CC66CC777
777CCCCCCCCCC777
777CCC6666CCC777
777CCC6666CCC777
777CCCCCCCCCC777
777CCCCCCCCCC777
777C6C99C666C777
777CCC99C666C777
444CCC99CCCCC444`],
  [cat, bitmap`
................
................
................
................
................
................
..........00000.
.........0002200
........00000200
.....0000000000.
...00000000000..
...0000000000...
..00000000000...
..000000000000..
..0000....0000..
..000.....000...`],
  [cathous, bitmap`
1111111111111111
1111CCCCCCCC1111
111CCCCCCCCCC111
11CCCCCCCCCCCC11
1CCCCC2222CCCCC1
CCCCCCCCCCCCCCCC
C11CC66CC66CC11C
111CC66CC66CC111
111CCCCCCCCCC111
111CCC6666CCC111
111CCC6666CCC111
111CCCCCCCCCC111
111CCCCCCCCCC111
111C6C99C666C111
111CCC99C666C111
000CCC99CCCCC000`],
  [wall, bitmap`
1111111111111111
1111111111111111
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
1111111111111111
1111111111111111`],
  [transparent, bitmap`
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
1...............`],
  [destroyablething, bitmap`
L1LL1111111L1LL1
L1111LL1LLLL11L1
LLL1L11LL11LLLLL
1LLLLLL1LL1LLL1L
1L11LLLLL1LLLL11
1LLLL1LLL1L1LL11
LLLLLLLL11L1LL11
L1L11111LLLLL11L
L1LL11LLLLL11L1L
L1L11L1L1LL11L11
L1L1LL1LLLL1LL1L
L11LL1LLLLL1LL11
L11LL11L1LL11LLL
L1LL1L1LL1LLLLLL
1LL11LL111L1L1LL
11LLL1LLLLLL11L1`],
)

setSolids([player, wall, box, catbox, cat, transparent])
setBackground(background)

let level = 0
let text_level = 1
let playable_levels = 14
let destroyabelthinksperlevel = 5
let thinksdestoy = 0
const levels = [
  map`
p.w.......
..w.......
d.wwwwwww.
.d.d.k..ww
wwwwww..dw
.ww..www.w
.w........
.wh....d..`,
  map`
p.w.......
..ww......
d.w.wwww..
..w..k..w.
..wkww.www
..d.wwd.dw
wwwwww.dhw
.....wwwww`,
  map`
wwwwwwwww.
....kd..w.
w.wwwwwdw.
w.w.w.w.w.
wdw.w.dk.w
w.w.wkwww.
whw.w..d.k
.w...wwwwp`,
  map`
...d......
w.w.wwwww.
w.w.......
w.wkwwwwww
wdw.w...d.
w.wdw.www.
w.w.w.w.w.
whw..dw.wp`,
  map`
wwwwwwww.w
w.d.k.d..w
ww.wwwwwkw
.wkwpd...w
.w.wwwwwww
.wd..k..d.
.w.wwwww.w
.www...whw`,
  map`
wwwwwww.ww
wwhw.d....
w..kkwwkw.
wwww.w..wk
.w.ww..wd.
dw..wk.w..
kwwww.ww..
pk...d.w.d`,
  map`
wwwww.wdw.
w..d..w...
wd..w.w.w.
ww.wwkw.wk
wwkww.wdw.
ww.ww.w.w.
wh.ww.w.w.
ww.wwd..wp`,
  map`
wwwwwwwww
wd.....dw
w....k..w
w..dkpk.w
w....k..w
w.......w
wh.d..d.w
wwwwwwwww`,
  map`
....w.wwww
....wdkd.w
wwwww.w.ww
p.d.wkw..w
www.w.wwdw
..w.kd.w.w
..wwwwwwhw
.......www`,
  map`
wwwwwww.w.
w.k.d...w.
ww.wwwwkw.
.wkwwwwdww
.w.d.w.kpw
.w.w.wwwww
..ww.d.d.h
..wwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
w......c.w
ww.......w
.wtwww...w
.w..hw..pw
.w.wwwwwww`,
  map`
p.k.....w.
wwwwww.ww.
.....w.ww.
.....wc.w.
.wwwww..w.
.w.t....w.
.ww.wwwww.
.ww..hw...`,
  map`
wwwwwwwwww
w........w
w.wwwwww.w
w.wh...w.w
w.wwww.w.w
w.wwww.w.w
w......wpw
wwwwwwwwww`,
  map`
wwwwwwwwww
w.......w.
w..www.ww.
w.w..tc...
w..www.ww.
w.....u.w.
wwwwwww.wk
........wp`,
  map`
..........
...wwwww..
...w...w..
...w.p.w..
...w...w..
...wwwww..
..........
..........`,

]

setMap(levels[level])

setPushables({
  [player]: [box, cat],
  [cat]: [catbox]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  setMap(levels[level])
  thinksdestoy = 0
})


onInput("k", () => {
  const playerPosition = getFirst(player);
  const playerX = playerPosition.x;
  const playerY = playerPosition.y;
  
  const destroyableThingsAtPlayerPosition = getTile(playerX, playerY).filter(tile => tile.type === destroyablething);
  
  if (destroyableThingsAtPlayerPosition.length > 0) {
    console.log("Destroyable object found and will be removed.");
    
    const destroyableObject = destroyableThingsAtPlayerPosition[0];
    destroyableObject.remove();
    console.log("Destroyable object was successfully removed.");
    
    thinksdestoy += 1;
  } else {
    console.log("No destroyable object found.");
  }
});




addText("Press J to rest", { x: 2, y: 7, color: color`9` })
addText("if you are stuck", { x: 2, y: 9, color: color`9` })
  

afterInput(() => {
  clearText();
  if (thinksdestoy == destroyabelthinksperlevel){
    if (tilesWith(player, hous).length >= 1) {
      addText("Level " + text_level + ", compleated", { x: 1, y: 7, color: color`9` })
      level = level + 1
      text_level = text_level + 1
      thinksdestoy = 0
      setMap(levels[level])
    }
  }
  if (level >= playable_levels) {
    addText("You won!", { x: 7, y: 7, color: color`9` })
    addText("Game is Finish!", { x: 2, y: 9, color: color`9` })
  }
})
