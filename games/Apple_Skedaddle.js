/*
@title: Apple Skedaddle
@author: DieselFalcon
@tags: ['puzzle']
@addedOn: 2022-11-06

Rules:
You are an apple who wants to be reunited with his Watermelon friend.
However, there are dangerous bombs stopping you from reaching him!
Outwit the bombs by working through the maze to reach your friend.

Controls:
W-up
A-left
S-down
D-right
j-Reset level
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
.........CC.....
........CC......
.......CC.......
......3333......
.....333333.....
....33033033....
....33333333....
....33033033....
.....330033.....
......3333......
......0..0......
......0..0......
.....00..00.....
................
................`],
  [ goal, bitmap`
................
.........4D.....
........334D....
.......33344D...
.......33034D...
......333334D...
.....3303334D...
....33333344....
...33033334D....
...33333334D....
...4433334D.....
...DD4444D......
.....DDDD.......
................
................
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
  [ box, bitmap`
................
................
.........69.....
........66......
.......00.......
.......0........
.....00000......
....0000000.....
...003003000....
...003003000....
...003003000....
...000000000....
...000000000....
....0000000.....
.....00000......
................`]
);

let level = 0;
const levels = [
  map`
wpwwwwwwww
w........w
w.wwwww.ww
w...w....w
w.wwwwww.w
w.w...gw.w
w.w..w.w.w
w.ww.www.w
wb.......w
wwwwwwwwww`,
  map`
wwwwwwwwwwwwww
p.w...w......w
w.w.w.w.w.ww.w
w.w.w.w.w.ww.w
w.w.w.w.w.ww.w
w.w.w.w.w.ww.w
w.w.w...w..www
w.w.wwwwww...w
w.w....wgwww.w
w.www.ww..b..w
w...w....www.w
w.w.wwwwwww..w
w.w.........ww
wwwwwwwwwwwwww`,
  map`
wpwwwwwwwwwwwwwwwwww
w.w...........b....w
w.wbwww.w.w.w.w..w.w
w.w.w.w.w.w.w.w..w.w
w.w.w.w.w.w.w....w.w
w.w.w.w.w.w.wwwwww.w
w...w.w.w.w.....bw.w
w.w.w.w.w.w.www..w.w
w.w.w.w.w.w.w.ww.w.w
w.www.w.w.w.w..w.w.w
w.....w.w.wwww.w.w.w
w.wwwww.w.w..w.w.w.w
w.w.....w.w..w.w.w.w
w.wwwwwww.w......w.w
w.wg.....bw..www.w.w
w.w.wwwwwww..w.w.w.w
w.w..........w.w.w.w
w.wwwwwwbwwwww.www.w
w..................w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
p.....w.......b....w
w.wbw.www.wbw.w..w.w
w.w.w.w.w.w.w.w..w.w
wbw.w.w.wbw.w....w.w
w.w.w.w.w.w.wwwwww.w
w.....w.w.w.....bw.w
w.w.w.w.wgw.www..w.w
w.w.w.w.w.w.w.ww.w.w
w.wwwbw...w.w..w.w.w
w.....w.w.wwww.w.w.w
w.wwwww.w....w.w.w.w
w.....b.w.w..w.w.w.w
www.wwwww.w......w.w
w.w......bw..www.w.w
w.w.wwwwwww..w.w.w.w
w.w..........w.w.w.w
w.wwwwwwbwwwww.www.w
w..................w
wwwwwwwwwwwwwwwwwwww`,
  map`
wpwwwwwwwwwwwwwwwwww
w................b.w
w.wwwwwwwwwwwwwwww.w
w..................w
w.wwwwwwwwwwwwwwww.w
wbw.b..............w
w.wwww.wwwwwwwwwwwbw
w................w.w
w.wwwwwwwwwwwww.ww.w
w.w..b.............w
w.wwwww.wwwwwwwwww.w
wb......b..........w
w.wwwwwwwwwwww.wwwbw
w.w.b..............w
w.wwwwwwwwwwwwwwww.w
w............b...w.w
w.wwwwwwwwwgwwww.w.w
w.w...b...www..w.w.w
w...b...b..........w
wwwwwwwwwwwwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

setSolids([ player, wall ]);

afterInput(() => {
  //lose game
  const lost1 = tilesWith(player, box).length;
  if (lost1 > 0){
    addText("You Lose!", { y: 4, color: color`3` });
  }
});

afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
// Tune
const melody = tune`
245.9016393442623,
245.9016393442623: b4/245.9016393442623,
245.9016393442623: b4~245.9016393442623,
245.9016393442623: c5~245.9016393442623 + d5~245.9016393442623 + b4/245.9016393442623,
245.9016393442623: d5-245.9016393442623,
245.9016393442623: b4/245.9016393442623 + e5^245.9016393442623,
245.9016393442623: e5~245.9016393442623 + d5~245.9016393442623,
245.9016393442623: b4/245.9016393442623,
245.9016393442623: d5-245.9016393442623,
245.9016393442623: d5~245.9016393442623 + b4/245.9016393442623 + f5^245.9016393442623,
245.9016393442623: c5~245.9016393442623,
245.9016393442623: b4/245.9016393442623,
245.9016393442623: c5-245.9016393442623 + g5^245.9016393442623,
245.9016393442623: d5~245.9016393442623 + e5~245.9016393442623 + b4/245.9016393442623,
245.9016393442623: f5-245.9016393442623 + g5^245.9016393442623,
245.9016393442623: f5~245.9016393442623 + b4/245.9016393442623 + a5^245.9016393442623,
245.9016393442623: c5-245.9016393442623,
245.9016393442623: c5-245.9016393442623 + b4/245.9016393442623 + f5^245.9016393442623,
245.9016393442623: e5^245.9016393442623,
245.9016393442623: b4/245.9016393442623 + d5~245.9016393442623 + c5^245.9016393442623,
245.9016393442623: c5~245.9016393442623,
245.9016393442623: b4/245.9016393442623,
245.9016393442623: b4-245.9016393442623,
245.9016393442623: b4/245.9016393442623,
245.9016393442623: b4~245.9016393442623,
245.9016393442623: b4/245.9016393442623 + c5~245.9016393442623 + d5~245.9016393442623,
245.9016393442623: d5-245.9016393442623,
245.9016393442623: b4/245.9016393442623 + e5^245.9016393442623,
245.9016393442623: e5~245.9016393442623 + d5~245.9016393442623,
245.9016393442623: b4/245.9016393442623,
245.9016393442623: d5-245.9016393442623,
245.9016393442623: b4/245.9016393442623 + d5~245.9016393442623 + f5^245.9016393442623`
const playback = playTune(melody, Infinity)

