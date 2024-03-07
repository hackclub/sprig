/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"
const enemy = "e"
const key = "k"
const floor = "f"
const WalkNote = tune`
500: A4-500,
15500`
const GameMusic = tune`
300: B4^300,
300: C5^300,
300: F4~300,
300: D5^300,
300: E5^300,
300: F5~300,
300: E5^300,
300: B4~300 + D5^300,
300,
300: B4^300,
300: G4^300 + E5~300,
300: E4~300,
300: A4^300,
300: D5^300,
300: G5~300,
300: E5^300,
300: G5^300,
300: B4~300,
300: E5^300,
300: D5^300,
300: B4~300,
300: A4^300,
300: C5~300,
300,
300: A4^300,
300: B4^300,
300: C5^300,
300: E5~300,
300: A4^300,
300,
300: G4^300 + C5~300,
300: C5~300 + G4^300` 


setLegend(
  [ player, bitmap`
.....000000.....
.....011110.....
.....051150.....
.....011110.....
.....000000.....
0000000000000000
0110111111110110
0100111111110010
01001673H9410010
0100111111110010
0100111111110010
0000111111110000
...0000000000...
...0110..0110...
...0110..0110...
...0000..0000...`],
  [ wall,  bitmap`
LL1LLLLLLLLL1LLL
LL1LLLLLLLLL1LLL
1111111111111111
LLLLLL1LLLLLL1LL
LLLLLL1LLLLLL1LL
1111111111111111
LLL1LLLLLLL1LLLL
LLL1LLLLLLL1LLLL
1111111111111111
L1LLLLLL1LLLLLLL
L1LLLLLL1LLLLLLL
1111111111111111
LLLLL1LLLLLLLL1L
LLLLL1LLLLLLLL1L
1111111111111111
LL1LLLLLLLLL1LLL`],
  [ goal, bitmap`
................
................
................
.......11.......
.....LLLLLL.....
.....L1111L.....
.....L1111L.....
.....L4444L.....
.....L1111L.....
.....L4444L.....
.....L1111L.....
.....L4444L.....
.....L4444L.....
.....LLLLLL.....
................
................`],
  [ enemy, bitmap`
................
.......LL.......
......L22L......
......L22L......
......1LL1......
...1111776111...
...1.117711.1...
...1.117761.1...
...1.117711.1...
...1.117761.1...
...L.116611.L...
.....11CC11.....
.....11..11.....
......C..C......
......C..C......
......0..0......`],
  [ key, bitmap`
................
.LLLLLLLLLLLLLL.
.L311111111133L.
.L133111111331L.
.L113100013311L.
.L111300013111L.
.L111330333111L.
.L111133311111L.
.L110333300111L.
.L113310331111L.
.L113100033111L.
.L133101013311L.
.L131101011331L.
.L331111111133L.
.LLLLLLLLLLLLLL.
................`],
  [floor, bitmap`
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
111111177LLLLLLL
1111117777LLLLLL
LLLLLL7777111111
LLLLLLL771111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111`]

)

setBackground(floor)



let level = 0
const levels = [
  map`
p............
wwww.wwwwww.w
gw...w......w
.w.www.w.ww.w
.w...w...w..w
.www.w.www.ww
.w.....www..k
.w.www...w.ww
.w.wwwww.w...
.e.......wwww`,
  map`
p.....................
wwwwwwwwwwwwwwwww.www.
.....ww......w......w.
.wew....wwwwww..www.w.
ww.w.wwww.......www...
...w..w.w.wwwww.www.w.
w.www.w.w.w.........w.
..w...w.w.www.w.wwwww.
.ww.w.w.w.ww..w.......
..w.w.w....w.w.wwwww.w
w.e.w.wwww.w.w.......w
..w.w...w..www.wwwwwwk
.ww.www.ww.....w......
.gw.www....www...wwwww`,
  map`
w..................p
w.wwwww.wwwww.wwwwww
w.w...w.w.w...w.wg..
w.w.w.w.w.w.w...www.
w.w.w...w.w.www.w...
www.ww.ww.w.w...w.ww
k.w.w.....wwww.ww...
w.www.ww.....w.w...w
..w....w.wwwww.w.w.w
.www.w.w.wwwww.w.www
.w.wwwww.wwwww.w.w.w
.w....w..wwwww.w...w
.w.ww......w...e..ww
.w.w..w.ww.w..ww....
.wwww.www..wwww..ww.
......ww..www.wwwww.
.ww.www..ww.w...w.w.
..wwwww..w....w.w.w.
.ww......w.ww.w.w.w.
..w.wwww.w..w.w.w.w.
w.w.w....ww.w.www.e.
..w.w.ww.w........w.
.wwwwww....wwwwww.w.
..e.....ww........w.`,
  map`
p............ww.w...w...ww..
wwwwwwwwww.w..w...w...w..w.w
www.....kw.wwwwwwwwwwwww.w..
ww....wwww....w........w.ww.
w..ww.ww.ww.w.ww.www.w.w..w.
w.www.ww.ww.w.wwww...w.ww.w.
w...w.ww.ww.w......www..e.w.
..w.w..w.ww.wwww.wwwwwwww.w.
.ww..w.w.ww...w.....ww......
.www.w...ww.wwwwwwwwww.wwww.
.w...www.ww...wwww...w.w..ww
.w.w..ww.wwww.ww....ww.ww...
.w.w.ww..w.......ww.....ww.w
.www.www...wwwwwwwww.ww.....
.......wwwwwwwwwwwww.w..wwww
w.www.ww.wwww....w.w.w.ww...
w.w.w.w.....w.w....w...w..ww
........ww.ww.w.w.ww.w.w.wwg
.w.w...www..e.w.w.w..w.w.ww.
.wwww..www..www...wwwwew.w..
wwwwww...w.wwww.www........w
.......w......w.....wwwwwwww`,
  map`
.......................w...w.w.........w
.wwwwwwwwwwwwwwwwwwwww.w.w.w.wwww.wwwwew
............w.w.....ww.w.w.w....w..wg..w
wwwww.wwwww.w.w.www.w..w.w.w.wewwwewwwww
pw.ww..w..w.......w.w.ww.w.w.w.w.....w.w
.w..ww.ww.wwwwwwwww.w..e.w.e.w...www...w
.ww.ww.w..........w.w.wwwwwwwwwwwwwwwwww
..w.ww.ww.w..wwwwww.w...ww...wwwwwwwwww.
w.w.w..wwwww.w....w.www......w.....ww...
w.w.w.wwww...ww.w.w.ww..wwww.w.www..w.ww
w.w.w.wwww.w.w..w...ww.www.w.w.w.ww.w...
w.....wwwwww.w.wwwwww..w.w.w.www.ww.www.
w.www......w.w.w...ww.ww.w.w............
...wwwwwww.w.....w.........w.wwwwww..ww.
.w.w....w..wwwwwwwwww.wwwwww..ww....www.
.www.wwww.www...ww.ww......ww.w..w.wwww.
.....w........w..w.w..www..w..w.wwwwwwww
.wwwww.ww.www.ww.w.w.wwwww.w.ww.........
.......w..w....w...w.wwwww.w....wwwwwwww
www.ww.w.wwwwwwwwwww..www..w..........ww
ww..w..w.www......ww.......wwwwwww.ww..w
...wwwww.ww..wwww..w.w.w...........www..
.www.www.w..wwwwwwww.....wwwwww.....www.
.www.ww..w.ww.wwwwww.www.wwwwwwwwwwwww..
.wkw.w..ww.......w....ww..wwwwwww.ww.w..
.w.w...www..www.wwwww..ww.wwwwwww.ww.ww.
.w.wwwwww..www......ww....w.w.....ww.ww.
.w.........www.ww.wwwww.w.w.wwwww.w.....
.w.wwwwwww.www.ww.wwwww.w.w.w.w.w...www.
.wwwwwwwww.www.ww.......w.....w...www...` 
  
]
const currentLevel = levels[level]
setMap(currentLevel)

setSolids([player, wall, enemy])

setPushables({
  [ player ]: []
})
const repeatSong = playTune(GameMusic, Infinity)
onInput("s", () => {
  getFirst(player).y += 1
  playTune(WalkNote)
})
onInput("w", () => {
  getFirst(player).y += -1
  playTune(WalkNote)
})
onInput("a", () => {
  getFirst(player).x += -1
  playTune(WalkNote)
})
onInput("d", () => {
  getFirst(player).x += 1
  playTune(WalkNote)
})
onInput("j", () => {
  setMap(currentLevel)
})

afterInput(() => {
  if(tilesWith(player,goal).length === 1){
    level = level + 1
    const currentLevel = levels[level]

    if(currentLevel !== undefined){
      setMap(currentLevel)
    } else {
      addText("The End", {  color : color`7`})
    }
  }
  if(tilesWith(player,key).length === 1){
      clearTile(getFirst(enemy).x, getFirst(enemy).y)
  }
 
  
})