/*
@title: portal_3
@author: Daniel_Sarmast

In Puzzle Runner, you must navigate through the maze while 
pushing a box. If you get through all the levels, you win! 

Controls:
w - move up
a - move left
s - move down
d - move right
j -reset current level

*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";


setLegend(
  [ player, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHH0HHHHHH
HHHH000HHH0HHHHH
HHH0HHH0HH0HHHHH
HHH0HHH0HHH0HHHH
HHH0HHH0HHH0HHHH
HHHH000HHHH0HHHH
HHH0HHH0HHH0HHHH
HHH0HHH0HHH0HHHH
HHH0HHH0HH0HHHHH
HHHH000HHH0HHHHH
HHHHHHHHH0HHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [ box, bitmap`
0000000000000000
0099999999999900
0909999999999090
0990999999990990
0999099999909990
0999900000099990
0999900990099990
0999909009099990
0999909009099990
0999900990099990
0999900000099990
0999099999909990
0990999999990990
0909999999999090
0099999999999900
0000000000000000`],
  [ goal, bitmap`
0000000000000000
0000000000000000
0000000022222000
0002200020000200
0002200020000200
0000000020000200
0000000020000200
0000000020000200
0000000020000200
0000000020000200
0002200020000200
0002200022222000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ wall, bitmap`
111111L11L111111
1111LLLLLLLL1111
111LLL1881LLL111
11LLL118811LLL11
11LL11188111LL11
11LL18811881LL11
LLLL18888881LLLL
1188888888888811
LLLL18888881LLLL
11LL11888811LL11
11LLL118811LLL11
11LLLL1881LLLL11
111LLLLLLLLLL111
1111LLLLLLLL1111
111111L11L111111
111111L11L111111`]
);

let level = 0;
const levels = [
  map`
..www..wwww.w..w.w..wg
..w..w.w..w.w..w.w..w.
..w..w.w..w.w..w.w..w.
..www..wwww.w..w.wwww.
p.w..w.w.w..w..w.w..w.
..w..w.w.w..w..w.w..w.
.bwww..w..w.wwww.w..w.
......................
......................`,
  map`
.................
..w....wwww.w....
..w....w..w.w....
..w....w..w.w....
..w....p....w....
..w.b..w..w.w....
..w....w.gw.w....
..wwww.wwww.wwww.
.................
.................
.................`,
  map`
...................
.......p...........
.wwwwwww..wwwwwww..
.w........w........
.w........w........
.w........w........
.w..wwww..w..wwww..
.w..b..w..w....gw..
.w.....w..w.....w..
.wwwwwww..wwwwwww..
...................
...................`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box, player]
});


// START - PLAYER MOVEMENT CONTROLS
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`4` });
    }
  }
});