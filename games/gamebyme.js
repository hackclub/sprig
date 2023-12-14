/*
@title: getting_started
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/



// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.3.3..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
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
p..
.b.
..g`,
  map`
p.wg
.bw.
....
....`,
  map`
.w..w
.w..w
pwg..
.wwb.
.....
.b.ww
g...w`,
  map`
www....w
wp..b..w
wwww...w
.www...w
g......w`,
  map`
p.w.
.bw.
...g
..bg`,
  map`
pw.....
.w...w.
.www.w.
.wgb.w.
.wwwww.
.......`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [  box ],
  [box]: [ box ]
});




// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1;
  // positive y is downwards
});
onInput("w", () => {
  getFirst(player).y -= 1;
  // negative y is upwards
});

onInput("a", () => {
  getFirst(player).x -= 1;
  // negative x is left
});

onInput("d", () => {
  getFirst(player).x += 1;
  // positive x is right
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
      addText("you win!", { y: 4, color: color`3` });
      playback.end(melody)
      







// Create a tune:
const melody = tune`
217.3913043478261: G5^217.3913043478261 + A5-217.3913043478261,
217.3913043478261: E5^217.3913043478261 + D5^217.3913043478261,
217.3913043478261: F4~217.3913043478261,
217.3913043478261: E4~217.3913043478261 + B4/217.3913043478261 + G5/217.3913043478261,
217.3913043478261: E4~217.3913043478261 + C5/217.3913043478261 + G5/217.3913043478261,
217.3913043478261: D4~217.3913043478261,
217.3913043478261: E5^217.3913043478261 + A4/217.3913043478261,
217.3913043478261: B4~217.3913043478261 + F5^217.3913043478261,
217.3913043478261: A4~217.3913043478261,
217.3913043478261: A5-217.3913043478261,
217.3913043478261: A4~217.3913043478261 + F5~217.3913043478261,
217.3913043478261: F5~217.3913043478261,
217.3913043478261: E4-217.3913043478261 + B4-217.3913043478261,
217.3913043478261: D5~217.3913043478261 + E5~217.3913043478261,
217.3913043478261: A4~217.3913043478261,
217.3913043478261: E5/217.3913043478261,
217.3913043478261: A4/217.3913043478261,
217.3913043478261: F4/217.3913043478261 + E5-217.3913043478261,
217.3913043478261: C5/217.3913043478261 + B4/217.3913043478261,
217.3913043478261: F5^217.3913043478261,
217.3913043478261: C5-217.3913043478261,
217.3913043478261: F4~217.3913043478261 + G4~217.3913043478261 + G5~217.3913043478261 + E5~217.3913043478261,
217.3913043478261: D4~217.3913043478261,
217.3913043478261: B4^217.3913043478261,
217.3913043478261: E5~217.3913043478261 + G4^217.3913043478261,
217.3913043478261: B4~217.3913043478261,
217.3913043478261: B4~217.3913043478261 + F5^217.3913043478261,
217.3913043478261: F4-217.3913043478261 + E5~217.3913043478261,
217.3913043478261: G4/217.3913043478261,
217.3913043478261: C5/217.3913043478261 + D5/217.3913043478261 + F5~217.3913043478261,
217.3913043478261: G4/217.3913043478261 + E4~217.3913043478261,
217.3913043478261: F4~217.3913043478261 + C5~217.3913043478261`
const moving = tune`
500: G5/500 + E5~500 + F5^500 + A5-500,
15500`
const win = tune`
4172.185430463576,
198.67549668874173: A4~198.67549668874173 + B4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: A4~198.67549668874173 + B4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: A4~198.67549668874173 + B4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: E5~198.67549668874173 + F5^198.67549668874173,
198.67549668874173: E5~198.67549668874173 + F5^198.67549668874173,
198.67549668874173: E5~198.67549668874173 + F5^198.67549668874173,
198.67549668874173: F4^198.67549668874173 + E4^198.67549668874173 + D4~198.67549668874173,
198.67549668874173: F4^198.67549668874173 + E4^198.67549668874173 + D4~198.67549668874173,
198.67549668874173: F4^198.67549668874173 + E4^198.67549668874173 + D4~198.67549668874173,
198.67549668874173: B5^198.67549668874173 + A5/198.67549668874173 + G5/198.67549668874173,
198.67549668874173`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end(melody)