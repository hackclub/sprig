/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: LittleSpringGame
@author: Jonas Heilig
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const box = "k"
const background = "b"
const hous = "h"
const wall = "w"
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
)

setSolids([player, wall, box])
setBackground(background)

let level = 0
let text_level = 1
let playable_levels = 10
const levels = [
  map`
p.w.......
..w.......
..wwwwwww.
.....k..ww
wwwwww...w
.ww..www.w
.w........
.wh.......`,
  map`
p.w.......
..ww......
..w.wwww..
..w..k..w.
..wkww.www
....ww...w
wwwwww..hw
.....wwwww`,
  map`
wwwwwwwww.
....k...w.
w.wwwww.w.
w.w.w.w.w.
w.w.w..k.w
w.w.wkwww.
whw.w....k
.w...wwwwp`,
  map`
..........
w.w.wwwww.
w.w.......
w.wkwwwwww
w.w.w.....
w.w.w.www.
w.w.w.w.w.
whw...w.wp`,
  map`
wwwwwwww.w
w...k....w
ww.wwwwwkw
.wkwp....w
.w.wwwwwww
.w...k....
.w.wwwww.w
.www...whw`,
  map`
wwwwwww.ww
wwhw......
w..kkwwkw.
wwww.w..wk
.w.ww..w..
.w..wk.w..
kwwww.ww..
pk.....w..`,
  map`
wwwww.w.w.
w.....w...
w...w.w.w.
ww.wwkw.wk
wwkww.w.w.
ww.ww.w.w.
wh.ww.w.w.
ww.ww...wp`,
  map`
wwwwwwwww
w..k..k.w
wkk.k..kw
w.k..pk.w
w..k...kw
w...kkk.w
wh....k.w
wwwwwwwww`,
  map`
....w.wwww
....w.k..w
wwwww.w.ww
p...wkw..w
www.w.ww.w
..w.k..w.w
..wwwwwwhw
.......www`,
  map`
wwwwwww.w.
w.k.....w.
ww.wwwwkw.
.wkwwww.ww
.w...w.kpw
.w.w.wwwww
..ww.....h
..wwwwwwww`,
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
  [player]: [box]
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
})

addText("Press J to rest", { x: 2, y: 7, color: color`9` })


afterInput(() => {
  clearText();
  if (tilesWith(player, hous).length >= 1) {
    addText("Level " + text_level + ", compleated", { x: 1, y: 7, color: color`9` })
    level = level + 1
    text_level = text_level + 1
    setMap(levels[level])
  }
  if (level >= playable_levels) {
    addText("You won!", { x: 7, y: 7, color: color`9` })
    addText("Game is Finish!", { x: 2, y: 9, color: color`9` })
  }
})
