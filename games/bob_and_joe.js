
/* 
@title: bob_and_joe
@author: aramshiva
@tags: ['puzzle']
@addedOn: 2023-12-08
*/

    /*
TITLE:
BOB AND JOE

AUTHOR:
ARAM

DESCRIPTION:
Your Bob. A nice fellow who HATES mazes. 
And Loves being with his friend Joe! Help Bob get to Joe to win the game!

CONTROLS
WASD - Movement
L - ???

*/
const player = "p"
const wall = "w"
const end = "s"
const invisible = "i"
const message = "m"

setLegend(
  [ player, bitmap`
................
................
................
....333333......
...33333333.....
..3332332333....
..3333333333....
..3333333333....
..3323333233....
..3322222233....
..3333333333....
...33333333.....
...33333333.....
...3......3.....
...33.....33....
................`],
  [ wall, bitmap`
C0CCCCC0CCCCCC0C
C0CCCCC0CCCCCC0C
0000000000000000
CC0CCCCCCCC0CCCC
CC0CCCCCCCC0CCCC
0000000000000000
CCCCCCC0CCCCCC0C
CCCCCCC0CCCCCC0C
0000000000000000
CCCC0CCCCCCC0CCC
CCCC0CCCCCCC0CCC
0000000000000000
CC0CCCC0CCCCCCCC
CC0CCCC0CCCCCCCC
0000000000000000
CCCC0CCCCCC0CCCC`],
  [ end, bitmap`
................
................
................
.....777777.....
....77777777....
...7777777777...
...777.77.777...
...7777777777...
...777.77.777...
...777....777...
...7777777777...
...7777777777...
....77777777....
....77777777....
....7......7....
...77.....77....`],
  [ invisible, bitmap`
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
................`],
  [ message, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  )

const levels = [
  map`
..............
..............
..............
..............
wwwwwwwwwwwwww
w............w
w............w
wp..........sw
w............w
w............w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wp....w.wwwwww
w.wwwww.w....w
w....w..w.w..w
www.ww.ww.w.ww
w....w....w..w
ww.www.ww.ww.w
w....w.ww....w
w.wwww.ww.wwww
w.......w...sw
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.................ws.....w..w..w.w
w.wwww..wwwwww.ww.w.ww.www.....www
w.w..ww..wwwww.ww.www....w.wwwww.w
w.....w..w........w...w........w.w
w.wwwwwwwwwwww.wwwwwwwwwww.www.w.w
www................w.......w...w.w
wpw.ww..w...w.w.wwwww.ww.www.wwwww
w.w....wwww...w....w...w.w.......w
w...wwww..www.w.ww.w.w.w.w.wwwww.w
www.w...w.w.w.w.......wwww.w..w..w
w.www.w...w...w..www..w....ww.w.ww
w...w..w.wwwwww.ww....w...ww..w..w
w.w....w.........w.w..www.w..ww..w
w.w.wwwww.ww.ww.w..w..w.w...www..w
w.w.w...w..w.ww.ww..www....wwww.ww
w.w.w.w.w..wwwwww.....wwww..www..w
w.w...w.w....ww.w.w.wwww..www.ww.w
wwwwwww.www..ww.w.........w.w....w
w.w.....w..w....w.w...w........www
w.w.www......ww.www.w.wwwwww.w...w
w.......w.ww....ww..w........w...w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwww
wpw.........w.ww.ww......w
w.www.w.www.w.....w..w.w.w
w.w...w.w...ww.ww....www.w
w...www.www.w...w.ww..w..w
wwwww.....w.w.w.wwwww...ww
w.....www.w...w.w.w.w.ww.w
w.ww..www.wwwww...w.w.ww.w
w.w..wwww.w.w.www.w...w..w
w.ww......w.w.....ww.ww..w
w....www..w....w..w..wi..w
w.ww.w.wwwwwwwww.wwwwww.ww
w.wwww.w..w......w...w...w
w.ww...ww.w..wwwww.w.www.w
w..w.w....w..w...www.w.w.w
w..w.w..w.ww...w.....w...w
w..www.ww.ww.wwww.ww.w.www
w......w..w..w.....w.w...w
wwwwww.wwwwwwwwwwwwwwwww.w
w......................w.w
w.wwwwwwwwwwwwwwwwwwww.w.w
w....w..................sw
wwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
wpw.........................w
w.w.wwwwwwwwwwwwwwwwwwwwwww.w
w.w.w.....................w.w
w.w.wwwwwwwwwwwwwwwwwwwww.w.w
w.w......w..............w.w.w
w.wwwwww.w.wwwwwwwwwwww.w.w.w
w......w.w.w............w.w.w
w.w.ww.w.w.w.wwwwwwwwwwww.w.w
w.w..w.w.w.w..............w.w
w.wwww.w.w.wwwwwwwwwwwwwwww.w
w.w......w..................w
w.wwwwwwwwwwwwwwwwwwwwwwwwwww
w.w.........................w
w.w...w.wwwwwwwwwwwwwww.ww..w
w...w.w.w.....w...w...w.w...w
w.w.w.wwwsw.w...w...w.w.www.w
w.www..ww.wwwwwwwwwww.w.w.w.w
w.w....ww.ww..........w.w...w
w.wwwwwww.wwwwwwwwwwwwwwwwwww
w.w....w....w......w........w
w.wwww.w..w...wwww.wwwwwwww.w
w.w....w.www.ww.w..w........w
w...ww.w.w....w.ww.w.wwwwwwww
w.w.ww...w.wwww.............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
ws.......w...w...w.......w..........w
w.ww.www.w.w.w.w.w.www..........w...w
w.ww.ww....w.w.w.w...w.wwwwwwwwwww..w
w.ww.wwwwwww.w.w.w.w...w.........w.ww
w.ww.w.......w.w.w.www.w.w.www.w.w.ww
w.w....wwwww...w.....w.www.w.w.www..w
w.w.wwww...wwwwwwwww.w.....w.w..ww..w
w.w.wwww.w.w......w..w...w...w......w
w...wwww.w...wwww.ww.wwwwwwwwwwwwwwww
w.w.w....wwwww..w.w.................w
w.w.............w.w.w.www...wwwwwww.w
w.wwwwwwwwwwwwwww.w.www.w.w.w.....w.w
w.................w...w.w.w.w.w.w.w.w
w.wwwwwwwwww.wwww.w.w.w.w.w.w.w.w.w.w
w.w..........w..w.w.w.w.www.www.www.w
w.w.wwwwwwwwww..w.w.w.w.............w
w.w.w.w.........w.www.wwwwwwwwwwwwwww
w.w...w...www.....ww................w
w.wwwww.w.w.w.www.www..wwwwww.....w.w
w..w....www.w.w...w.wwww....wwwwwww.w
w.wwwwwww...w.w.w...w...............w
w.............www.w......wwwwww..ww.w
w.wwwwwwwwwwwwwwwww.wwww.w.w..wwww..w
w.w...w...w...w...w.w..w.w..........w
w.w.w.w.w.w.w.w.w.w.ww.w.wwwwwwwwww.w
w...w...w...w...w.w..w...w..........w
ww.wwwwwwwwwwwwww.w.wwwwww.wwwww.wwww
ww.w...w...w......w......w.....w.w..w
ww.w.w.w.w.w.wwwwww.wwww.w.www.w...ww
ww.w.w.w.w.w......w.w....w.ww..w.w.ww
ww.w.w.w.w.wwwwww.w.w.wwww.www.w.w..w
ww...w...w........w.w.......w..wwwwpw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
mmmm
mmmm`,
  map`
pi........
.i..i..ii.
.i.i..i.i.
.ii..i..i.
....i...i.
iiiiiiiii.
s.........`,
]
addText("bob and joe", {y: 2, color: color`.`});
addText("WASD for controls.", {y: 4, color: color`.`});
setSolids([ player, wall, invisible ]);
let level = 0
const Level = levels[level];
setMap(Level);

onInput("d", () => {
  // Move the player one tile to the right
  getFirst(player).x += 1
})

onInput("a", () => {
  // Move the player one tile to the right
  getFirst(player).x -= 1
})

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {       
  getFirst(player).y += 1;
});

onInput("l", () => {
  if (Level == levels[7]) {
    clearText()
    setMap(levels[8]); 
  }
});

afterInput(() => {
  if (tilesWith(end, player).length === tilesWith(end).length) {
    level = level + 1;
    const Level = levels[level];
    if (Level == levels[1]) {
      clearText()
    }
    if (Level !== levels[6]) {
      setMap(Level);
    } else {
      setMap(Level);
      clearText()
      addText("do NOT press l.", { y: 1, color: color`2`});
      addText("congrats!", { y: 5, color: color`0` });
      addText("you win ", { y: 7, color: color`0` });
    }
  }
});
