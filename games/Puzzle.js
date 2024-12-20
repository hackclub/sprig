/*
@title: Puzzle
@author: Mattercon124
@tags: []
@addedOn: 2024-12-16
*/

const player = "p"
const wall = "w"
const goal = "g"
const box = "b"
const door = "d"
const block = "e"
setLegend(
  [ player, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ wall, bitmap`
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
  [ goal, bitmap`
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
  [ box, bitmap`
FFFFFFFFFFFFFFFF
FDDDDDDDDDDDDDDF
FDFFFFFFFFFFFFDF
FDFDDDDDDDDDDFDF
FDFDFFFFFFFFDFDF
FDFDFDDDDDDFDFDF
FDFDFDFFFFDFDFDF
FDFDFDFFFFDFDFDF
FDFDFDFFFFDFDFDF
FDFDFDFFFFDFDFDF
FDFDFDDDDDDFDFDF
FDFDFFFFFFFFDFDF
FDFDDDDDDDDDDFDF
FDFFFFFFFFFFFFDF
FDDDDDDDDDDDDDDF
FFFFFFFFFFFFFFFF`],
  [ door, bitmap`
FFFFFFFFFFFFFFFF
F33333333333333F
F3FFFFFFFFFFFF3F
F3F3333333333F3F
F3F3FFFFFFFF3F3F
F3F3F333333F3F3F
F3F3F3FFFF3F3F3F
F3F3F3FFFF3F3F3F
F3F3F3FFFF3F3F3F
F3F3F3FFFF3F3F3F
F3F3F333333F3F3F
F3F3FFFFFFFF3F3F
F3F3333333333F3F
F3FFFFFFFFFFFF3F
F33333333333333F
FFFFFFFFFFFFFFFF`],
  [ block, bitmap`
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
)

setSolids([player, wall, box, block])

let level = 0
const levels = [
  map`
...............
...............
...............
...............
...............
.........p.....
...............
...............
...............
...............
..............g
...............`,
  map `
wwwwwwwwwww.........
..............ww....
..wwww.........ww...
.ww..wwww.......w...
.w.......www....www.
.w.p.......w......w.
.wwwwwwww..wwwww..w.
.w......w......w..w.
.w...ww........w..ww
.w..wwwwwwwwwwwww..w
.w..w...........ww.w
.w...............w.w
.w...wwwwwwwww...wgw
..wwwww......ww..w.w
......wwww.......w..
................w...`,
  map`
.w........................wwww......
.w.wwwwwwwwwwwwwwwwwwwwww.w..w..www.
.w.wge..................w.w..w..w.w.
.w.wwwwwwwwwwwwwwwwwww..w.w..w..w.w.
.w...................w..w.w..w..w.w.
.w.wwwwwwwwwwwwwwwwwww..w.w..w..w.w.
.w.wd...................w.w..w..w.w.
.w.wwwwwwwwwwwwwwwwwww..w.w..w..w.w.
.w.........wwwwwwwwwww..w.w..w..w.w.
.wwwwwwwwww..........w..w.w..w..w.w.
.p...........wwwwwww.w..w.w..w..w.w.
wwwwwwwwwwwww......w.w..w.w..w..w.w.
...............www.w.w..w.w.bw..w.w.
...............w.w.w.w..w.w..w..w.w.
..wwwwwwwwww.www.w.w.w..w.w..w..w.w.
..w........w.w...w.w.w..w.w..w..w.w.
..wwww.....w.....w.w.w..w.w..w..w.w.
.....w...........w.w.w..w.w..w..w.w.
...www...wwww..w.w.w.w..w.w..w..w.w.
...w........wwww.w.w.w..w.w..w..w.w.
...w.............www.w..w.w..w..w.w.
....wwwwww..............w.w..w..w.w.
..wwwwwwww..............w.w.....w.w.
..w............wwwwwwwwww.w.....w.w.
..wwwwwwww......................w.w.
.........w...................w....w.
.........w........wwwwwwwwww.wwwwww.
.........w........w........www......
.........wwwwwwwwww.................`,
]

setMap(levels[level])

setPushables({
  [ player ]: [ box, player]
})

addText("Hello, and welcome", { 
  x: 1,
  y: 2,
  color: color`7`
})
addText("Use W,A,S,D to move", { 
  x: 1,
  y: 4,
  color: color`7`
})
addText("Go to the green dot", { 
  x: 1,
  y: 10,
  color: color`4`
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


afterInput(() => {
  if(tilesWith(player, goal).length)
    {
    level++;
    setMap(levels[level])
    clearText()
    }
   if(tilesWith(box, door).length)
    {
    clearTile(getFirst(block).x, getFirst(block).y)
    }
})
