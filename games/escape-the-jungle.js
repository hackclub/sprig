/*
@title: escape the jungle
@author: frigglefraggled
@tags: []
@addedOn: 2024-12-13
*/

const player = "p"
const enemy = "e"
const box = "b"
const wall = "w"
const goal = "g"
const background = "d"
const gigantopithecus = "o"
const castlefloor = "m"

setLegend(
  [ player, bitmap`
................
................
................
........1.......
........55.1....
........151..1..
........55771...
...7777.1507C...
7777777.7577C...
..7777777.......
..77777.........
...7..7.........
..L7L.7.........
...L..L.........
................
................` ],
  [ enemy, bitmap`
.....LLLLL......
...CLCCCCCLC....
..C3LC9C9CL3C...
..C3LCCCCCL3C...
...CLC000CLC....
.....LLLLL......
.......L........
....11LLL11.....
....1..L..1.....
...CCC.L.CCC....
.......L........
..LLLLLL........
.LL...LLL.......
LL...1...1......
L....1...1......
....CCC.CCC.....`],
  [ box, bitmap `
................
................
................
................
................
................
................
................
................
......LLLLL.....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
.....LLLLLLL....
......LLLLL.....`],
  [ wall, bitmap`
...444444444....
..44444444444...
..44444444444...
...444444444.444
.....CCCCCC..4C4
.44..CCCCCC...C.
.4CCCCCCCCCCCCC.
.44..CCCCCC.....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
...CCCCCCCCCC...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.`],
  [ goal, bitmap `
................
................
................
................
..LLLLLL........
.LLLLLLLLL......
LLLLLLLLLLL.....
LLLLLLLLLLLLL...
LLLLLLLLLLLLLL..
LL0000LLLLLLLLL.
L000000LLLLLLLL.
L000000LLLLLLLL.
L000000LLLLLLLL.
L000000LLLLLLLL.
L000000LLLLLLLL.
L000000LLLLLLLL.
L000000LLLLLLLL.`],
  [ gigantopithecus, bitmap`
.....999999.....
...1911111191...
...1910110191...
...1911111191...
....91000019....
....99111199....
.....999999.....
....99999999....
1999999999999991
1999999999999991
....99999999....
.99999999999999.
.99999999999999.
.99..999999..99.
.99..........99.
1111........1111`],
  [background, bitmap`
DDDDDDDDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD4DDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDD4DDDDDD
DD4DDDDDDDDDD4DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [castlefloor, bitmap`
1111L11111111111
LLLLLLLLLLLLLLLL
11111111111L1111
11111111111L1111
11111111111L1111
LLLLLLLLLLLLLLLL
11L1111111111111
11L1111111111111
11L1111111111111
LLLLLLLLLLLLLLLL
11111111111L1111
11111111111L1111
11111111111L1111
LLLLLLLLLLLLLLLL
1111L11111111111
1111L11111111111`]
)


setSolids([box, wall, player])

let level = 0
const levels = [
  map`
pwwwwwwwww
...w.wwwww
w..www...g
ww.......w
w.ww.....w
w.....w..w
w....w...w
w.wwwwwwww
w.......ew
wwwwwwwwww`,
  map`
wwww......
p..ww..www
ww..wwww.g
..w...ww.w
...w..ww.w
www......w
we..w..www
wwww.w..ww
......w.ew
.......www`,
  map`
wwwwwwwwww
p...wwww.g
ww....ww.w
.ww.w.ww.w
..w.w.ww.w
.ww.w.ww.w
we..w.ww.w
weww..ww.w
wew..www.w
www......w
wwwwwwwwww`,
  map`
mmmmmmmmmmm
mmmmmmmmmmm
.mmmmmmmmmm
.mmmmmmmmmm
.mmmmmmmoow
pmmmmmmmobg
.mmmmmmmoow
.mmmmmmmmmm
.mmmmmmmmmm
mmmmmmmmmmm
mmmmmmmmmmm`,
  map`
.m...m.....
..m.m......
p..m.mmmw.w
...m.m.mw.w
...m.mmmwww
w.w.w......
w.w.w.m....
w.w.w..g..g
.w.w..mgg.g
......mg.gg
......mg..g`
  
]
const currentLevel = levels[level];
setMap(levels[level])

setBackground(background)

setMap(levels[level]);


setPushables({[player]: [box], 
  [box]: [box]
})
setInterval
onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
})

afterInput(() => {
  if (tilesWith(player, goal).length === 1) {
      level = level + 1 
      setMap(levels[level]);
  }
  if (tilesWith(player, enemy).length === 1) {
      level = level - 1 
      setMap(levels[level]);
  }
  if (tilesWith(player, gigantopithecus).length == 1) { 
    level = 0;
    setMap(levels[level]);
   }
})
setMap(levels[level])
let speed = 250 // The function will run every 500 milliseconds

function game() {
  const gameLoop = setInterval(() => { // Any code within these brackets will run constantly
    // Iterate through a list of all the enemies
    for (let i = 0; i < getAll(gigantopithecus).length; i++) {
      // Make the currently iterated enemy move in a random direction
      getAll(gigantopithecus)[i].x += Math.floor(Math.random() * 3) - 1
      getAll(gigantopithecus)[i].y += Math.floor(Math.random() * 3) - 1
    }

  }, speed)
}

game()
