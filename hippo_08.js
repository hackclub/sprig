/*
@title: getting_started
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const background = "x";
const floor = "f";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
..11......11....
..1L......L1....
....111111......
....1L11L1......
....111111......
...11111111.....
...1L1111L1.....
...11111111.....
...11111111.....
.....LLLL.......
....111111......
...11111111.....
..1111111111....
..1111111111....
....LL..LL......
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
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
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwwww
w......w
ww.www.w
ww.www.w
w.....p.
w.wwwbg.
w.......
w.......`,
  map`
ww..wwww
w.b....w
ww.ww.ww
.w.ww.ww
gw.ww.ww
....wp..
.w..w.b.
....ww.g
wwwwwwww`,
  map`
...wwwwww
.....b..w
...w....w
.....wwww
.p....g.w
..bw....w
...wg...w
.wwwwwwww`,
  map`
www...ww.wwwwww
www.b.........w
www......w..b.w
www...w.ww.w..w
w..wwww....w..w
...p.....www..w
...wwwwww....gw
..g...........w
wwwwwwwwwwwwwww`,
  map`
.wwwwwwww...www..w
.................w
.w..b.www.w.w....w
wwwww.w...w.wwwwgw
......wg....wwwwww
wwwww.wwwww.......
wwwww.......wwwwww
....w.......wwwwww
p.b.w.......wwwwww
....wwwwwww.wwwwww
w...........wwwwww
wwwwwwwwww..wwwwww`,
  map`
wwwwwwwwwwwwwwww...
www...wwwwwwwwww...
w.b....wwwwwwwwwg..
w.....wwwwwwwwwww..
ww.w...wwww.www...w
ww.w..............w
p..wwwwww......w..w
wwww.........wwwg.w
wwww..b....b.wwww.w
........ww...wwww.w
wwwwwwwwwwwwwwwwwgw`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("w", () => {
  getFirst(player).y += -1; // positive -y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`L` });
    }
  }
});
