/*
@title: getting_started
@description: "Getting Started" is a tutorial game that guides players through basic game mechanics.
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/


// define the sprites in our game
const myTune = tune`
434.7826086956522,
434.7826086956522: D5^434.7826086956522 + C5^434.7826086956522,
13043.478260869566`;

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
.....4444.......
....444444D.....
....727544D.....
....775244D.....
....444444D.....
....444444D.....
....444444......
....444444......
....44..44......
....44..44......
................
................
................`],
[ box, bitmap`
................
................
................
...88888888888..
...8HHHH8HHHH8..
...8HHHH8HHHH8..
...8HHHH8HHHH8..
...8HHHH8HHHH8..
...88888888888..
...8HHHH8HHHH8..
...8HHHH8HHHH8..
...8HHHH8HHHH8..
...8HHHH8HHHH8..
...88888888888..
................
................`],
  
  
  [ goal, bitmap`
................
................
................
....444444......
...44DDDD44.....
...4DDDDDD4.....
...4DDDDDDD4....
...4DDDDDDD4....
...4DDDDDDD4....
...44DDDDDD4....
....4DDDDDD4....
....44DDDD44....
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
let level = 1; // this tracks the level we are on
const levels = [
  map
  
  `
pb....
......
.w.pb.
.w....
.w...g`,
  map`
.......
...p.b.
..w....
..w....
..w..g.`,
  map`
.......
.......
p.bw...
...w...
......g`,
  map`
.....
.p...
.w..b
..w..
...wg`,
  map`
p....
.w.b.
.w...
.w...
.w..g`,
  map`
.....
.p.w.
..bwg
.....
.....`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [ box ],
    [box]: [ box ]
});

// inputs for player movement control

onInput("w", () => {
    getFirst(player).y -= 1;
    playTune(myTune);
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(myTune);

});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune);

});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);

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
    }
  }
});
