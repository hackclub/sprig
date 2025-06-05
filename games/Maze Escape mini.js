/*
@title: Maze Escape mini
@author: Ondřej Vacek
@tags: [adventure, puzzle]
@addedOn: 2025-05-19
*/

const player = "p"
const wall = "w"
const floor = "f"
const end = "e"
const lava = "l"
const box = "x"

setLegend(
  [ player, bitmap`
.....CCCCCC.....
....CCCCCCC.....
....C888888.....
....8828828.....
....8828828.....
....8888888.....
....8888888.....
.2222222222222..
.22222222222222.
.2222222222222..
.8822222222288..
.8822222222288..
...222222222....
....00...00.....
....00...00.....
....00...00.....` ],
  [ wall, bitmap`
CCCCC9CCCCC9CCCC
CCCCC9CCCCC9CCCC
CCCCC9CCCCC9CCCC
9999999999999999
CC9CCCCC9CCCCC9C
CC9CCCCC9CCCCC9C
CC9CCCCC9CCCCC9C
9999999999999999
CCCCC9CCCCC9CCCC
CCCCC9CCCCC9CCCC
CCCCC9CCCCC9CCCC
9999999999999999
CC9CCCCC9CCCCC9C
CC9CCCCC9CCCCC9C
CC9CCCCC9CCCCC9C
9999999999999999`],
  [floor, bitmap`
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLL1LLL1L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL
LLLLLL1LLLLLL1LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL1LLLLLLLLLLL
LLLLLLLLLLL1LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL1LLLLLLLL1LLL
LLLLLLLLLLLLLLLL`],
  [end, bitmap`
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................`],
  [lava, bitmap`
3333333333339333
3339333339933333
3933993333333393
3333333333333333
3339333933339333
3933333333333333
3333333339333333
3333933933339333
3333333333333393
3393333393333333
3933333333393333
3333333339333933
3339339339333333
3393333933393933
3333333393333333
3333933333333933`],
  [box, bitmap`
................
................
..999999999999..
..9CCCCCCCCCC9..
..9CCCCCCCCCC9..
..9C99999999C9..
..9CCCCCCCCCC9..
..9CCCCCCCCCC9..
..9C99999999C9..
..9CCCCCCCCCC9..
..9CCCCCCCCCC9..
..9C99999999C9..
..9CCCCCCCCCC9..
..999999999999..
................
................`]
)

setBackground(floor)

setSolids([player, wall, box])

let level = 0
const levels = [
  map`
wwwwwwwwwwwwwwwwwwww
wwwww.....w........w
w.....wwwwwwwww.wwww
wwwww.w.....w......w
w.....w.www...wwwwww
w.wwwww.wpw.w.w....w
w.w.....w.w.w...ww.w
w.w.wwwww.wwwwwww..w
w.w.............w.ww
w.wwwwwww.www.www..w
w.......w.wew.w.ww.w
w.wwwww.w.w.w.w....w
w.w.....w.w.w.w.wwww
w.w.www.w.w.www....w
w.w...w...w.....wwww
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
w.....w......l.....w
wwwww.w.w.wwwww.ww.w
wp........w.....w..w
www.wwwwwwwwwww.ww.w
w.w.w.w.......w.w..w
w.w.w.www.w.w.w.ww.w
w.w.w.....w.w......w
w.w.w.www.www.wwww.w
w...w.w.w.w...w....w
www.wlw.w.wwwww.wwww
w.w.w.w.w.w.....we.w
w.w.......w.wwwwww.w
w.wwwww.www.....ww.w
w.........w.w.w....w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
we.......w.........w
wwww.www.w.www.wwwww
w..w.w.w.w.w.w.w...w
w.wwlw.w.www.w.www.w
w.w....w.....w.....w
w.w.wwwwwwww.w.ww.ww
w.w.w...ww...w.w...w
w...w.w..wlw...l.www
www.wwww.w.wwwww.w.w
w.w......w.....w.w.w
w.w.ww.www.wwwww...w
w...w..w...w.....w.w
wwwww.ww.www.wwwwwww
w.w...w...w..w..p..w
w.w.www.www.wwlwww.w
w..................w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wp..w.we......ww.w.w
www.w.www.wlw..w...w
w...w...w.w.wwww.w.w
w.www.w.w.w......w.w
w.....w.l...ww.w.www
wwww.wwwwwwwww.w...w
w.w....x.w...w.www.w
w.w.www.ww.w.www...w
w.www.......x....w.w
w...wwwwww.w.www.w.w
w.w..l...w.w.w.w.www
wwwwww.www.w.w...w.w
w..ww...ww.w.www.w.w
ww....w....w...w...w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
w.....www..l.......w
w.www.....wwww.ww.ww
w.w.wwwww....x..w.ww
w.wlw.w.wwwwwww.w..w
w...w.w.......w.ww.w
www.w.w.wwwwwww.ww.w
w.w.w.w.w....w.ew..w
w.w.w.w.w.wwww.ww.ww
w.........x.w...w..w
w.www.w.www.w.wl.w.w
wlw.w.w...w.w.ww.w.w
w.w.w...www.w......w
w.w.www.w..x.ww.wwww
w.......wpwwww.....w
wwwwwwwwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: [ box ]
})

//inputs
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  if (tilesWith(player, end).length === 1) {
    level = level + 1

    const currentLevel = levels[level]
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` })
    }
  }

  if (tilesWith(player, lava).length === 1) {
    setMap(map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`)
    addText("You Died", { 
        x: 6,
        y: 7,
        color: color`3`
      })
  }
});