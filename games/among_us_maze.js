/*
@title: among_us_maze
@author: Riya and Christy
@tags: []
@addedOn: 2022-08-16
*/

// This game can be played with mouse
// If you press "i", a virtual mouse that can be controlled with wasd will appear

//variables
var row = 25;
const virtualMouse = 'm';
const wall = 'w';
const amongus = 'a';
const start = 's';
const end = 'e';
const colors = [ color`L`, color`1`, color`3`, color`C`, color`7`, color`5`, color`6`, color`F`, color`4`, color`D`, color`8`, color`H`, color`9` ]
var win = false;
var pointsInt = 0;
var notCheating = false;
var text = addText("points: ", { y: 14, x: 2, color: color`0` });

// functions

function handleMovement(coords) {
  coords = getFirst(virtualMouse)
  var x = coords.x;
  var y = coords.y;
  const inTile = getTile(x, y);

  if (inTile.length > 1) {
    text = addText("points: ", { y: 14, x: 2, color: colors[Math.floor(Math.random() * colors.length)] });
    //text.style.color = [0,0,255];
    if (win) return
    pointsInt = pointsInt - 100;
    addText(pointsInt.toString(), { y: 14, x: 10, color: colors[Math.floor(Math.random() * colors.length)] });
  }

  if ((x === 10 && y === 11) || (x === 9 && y === 11) || (x === 11 && y === 11) || (x === 10 && y === 10) || (x === 9 && y === 10) || (x === 11 && y === 10)) {
    notCheating = true
  };

  if ((x === 1 && y === 20) || (x === 0 && y === 20) || (x === 1 && y === 21) || (x === 0 && y === 21)) {
    if (!notCheating) {
      addText("STOP CHEATING!", {x: 5, y: 0, color: color`3`});
      setTimeout(() => {
        clearText();
        text = addText("points: ", { y: 14, x: 2, color: colors[Math.floor(Math.random() * colors.length)] });
        addText(pointsInt.toString(), { y: 14, x: 10, color: colors[Math.floor(Math.random() * colors.length)] });
      }, 1500);
      
      pointsInt -= 1000;
      addText(pointsInt.toString(), { y: 14, x: 10, color: colors[Math.floor(Math.random() * colors.length)] });
    } else {
      win = true;
      addText("YOU WIN", {x: 10, y: 0, color: color`3`});
    }
  }
}

//setting/design of elements
setLegend(
  [virtualMouse, bitmap`
2222............
20002...........
200002..........
2000002.........
20000002........
200000002.......
2000000002......
20000000002.....
200000000002....
2000000000002...
2002220022222...
202..20002......
22....2002......
.......2002.....
.......2002.....
........22......`],
  [wall, bitmap`
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
  [amongus, bitmap`
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
  [start, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
0000040440004000
0440404040404404
0040400040044404
4040404040404404
0040404040404404
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [end, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L666L6LLL6L66LLL
L6LLL6LLL6L6L6LL
L6LLL66LL6L6LL6L
L6LLL666L6L6LL6L
L6LLL6L6L6L6LL6L
L666L6L6L6L6LL6L
L6LLL6L6L6L6LL6L
L6LLL6L666L6LL6L
L6LLL6LL66L6LL6L
L6LLL6LLL6L6L6LL
L666L6LLL6L66LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

//map design
const levels = [
  map`
ssw...w...w...w...w.w....
ss..w...w...w...w...w....
wwwwwwwwwwww.www.ww.w....
ww..................w....
w..w.wwaaaaawwwwwwww.w...
w.w.w.a.....a........w...
w.....a...wwww.ww.ww.w...
www..aa...w..w.www...w...
ww..a..a..wwww.w...www...
w......a....a...w.w..w...
wwwwa.......a..ww....w...
w....aa.....a..wwwww.w...
ww.w..a.aaa.a.wwww...w...
w..ww.a.a.a...w....www...
w.w...aaa.aaaw..www.ww...
w.w.www.....www.w.w..w...
w.w.w...w.w.w.......ww...
w.w.www.w.w.wwwwwww.ww...
w.w...w.w.w...w...w..w...
w.w.www.w.w.www.w.ww.w...
eew.....www.....w....w...
eewwwwwwwwwwwwwwwwwwww...
.........................
.........................
.........................`,
];

//setting it to level 0, which is our only level
let level = 0;

//displaying the map
setMap(levels[level]);


onInput("w", () => {


  getFirst(virtualMouse).y -= 1
  handleMovement()
})

onInput("a", () => {


  getFirst(virtualMouse).x -= 1
  handleMovement()
})

onInput("s", () => {


  getFirst(virtualMouse).y += 1
  handleMovement()
})

onInput("d", () => {


  getFirst(virtualMouse).x += 1
  handleMovement()
})

addSprite(2, 1, virtualMouse)