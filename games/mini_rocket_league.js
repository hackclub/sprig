/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: mini rocket league
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const orangeWall = "f";
const blueWall = "g";
const ball = "h";
const orangeGoalTop = "j";
const orangeGoalBot = "k";
const blueGoalTop = "q";
const blueGoalBot = "w";
const grass = "r";
setLegend(

  [orangeWall, bitmap`
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL
..19LLLLLLLLLLLL`],
  [blueWall, bitmap`
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..
LLLLLLLLLLLL51..`],
  [player, bitmap`
................
................
................
55555L..........
.77735....555L..
.5553555..555L..
.511CCC55505556.
.5LL11L55005551.
.5LL11L55005551.
.511CCC55505556.
.5553555..555L..
.77735....555L..
55555L..........
................
................
................`],
  [ball, bitmap`
....LLLLLLLL....
...L111L1111L...
..L1111L1111LL..
.L1L11LLLL1L11L.
L111LLLLLLL1111L
L111LL1111LL111L
L11LL111111LL11L
L11LL115511LLLLL
L11LL115511LL11L
LLLLL111111LL11L
L111LL1111LL111L
L1111LLLLLL1L11L
.L11L1LLLL111LL.
..LL1111L1111L..
...L1111L111L...
....LLLLLLLL....`],
  [orangeGoalTop, bitmap`
..19LLLLLLLLLLLL
..19999999999LLL
............99LL
.............9LL
.............9LL
.............99L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L`],
  [orangeGoalBot, bitmap`
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
..............9L
.............99L
.............9LL
.............9LL
............99LL
..19999999999LLL
..19LLLLLLLLLLLL`],
  [blueGoalTop, bitmap`
LLLLLLLLLLLL51..
LLL55555555551..
LL55............
LL5.............
LL5.............
L55.............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............`],
  [blueGoalBot, bitmap`
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L5..............
L55.............
LL5.............
LL5.............
LL55............
LLL55555555551..
LLLLLLLLLLLL51..`],
  [grass, bitmap`
44444444444444DD
4444D24444444DD4
44444D44DD424444
4DD444D4D44DD444
44D444DDD444D444
4444444444444444
444444444444DDD4
444444444444D444
44244D4444444444
44D4DD4444DD4444
44D4D4442D4DD4D4
44DDD444D4444D44
DD44444DD444DD44
4DD4444D44444444
44D4444444444444
4444444444444444`],
)
setBackground(grass)
const goal = tune`
500,
500: A4^500 + B4^500 + C5^500 + D5^500 + E5^500,
500: A5~500 + G5~500 + F5~500 + E5~500 + D5~500,
500: F4-500 + E4-500,
14000`;
const drive = tune`
211.26760563380282,
211.26760563380282: F4^211.26760563380282,
211.26760563380282: F4-211.26760563380282,
6126.760563380281`;
setSolids([player, orangeWall, blueWall, ball])
let level = 0
const levels = [
  map`
g.......f
g.......f
qp..h...j
w.......k
g.......f
g.......f`
]

setMap(levels[level]);

setPushables({
  [player]: [ball]
});

onInput("s", () => {
  getFirst(player).y += 1
  playTune(drive, 1);
});
onInput("d", () => {
  getFirst(player).x += 1;
  playTune(drive, 1);
});
onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(drive, 1);
});
onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(drive, 1);
});

var blueScore = 0;
var orangeScore = 0;

afterInput(() => {
  if (tilesWith(ball, orangeGoalTop).length == 1 || tilesWith(ball, orangeGoalBot).length == 1) {
    blueScore = blueScore + 1;
    addText(blueScore.toString(), { x: 8, y: 2, color: color`5` });
    getFirst(ball).x = 5;
    getFirst(ball).x = 5;
    playTune(goal, 1);
  }
  if (tilesWith(ball, blueGoalTop).length == 1 || tilesWith(ball, blueGoalBot).length == 1) {
    orangeScore = orangeScore + 1;
    addText(orangeScore.toString(), { x: 11, y: 2, color: color`9` });
    getFirst(ball).x = 4;
    getFirst(ball).x = 4;
    playTune(goal, 1);
  }
});