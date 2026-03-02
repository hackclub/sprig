/*
@title: Remove Boxes one by one
@description: guided by the tutorial. This version removes boxes one by one when they are pushed over a goal. 
@author: thomas.brodkorb@gmx.net
@tags: ['tutorial']
@addedOn: 2026-03-01

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const redwall = "r";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
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
0000000000000000`],
  [redwall,bitmap`
3333333333333333
33............33
3.3..........3.3
3..3........3..3
3...3......3...3
3....3....3....3
3.....3..3.....3
3......33......3
3......33......3
3.....3..3.....3
3....3....3....3
3...3......3...3
3..3........3..3
3.3..........3.3
33............33
3333333333333333`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
..r.
....`,
  map`
p...
g..b
...b
.bbg`,
  map`
p.w.
.bwg
....
..bg`
];

const removeMelody = tune`
112.78195488721805,
112.78195488721805: F5~112.78195488721805,
112.78195488721805: E5~112.78195488721805,
112.78195488721805: F5~112.78195488721805,
112.78195488721805: A5~112.78195488721805,
112.78195488721805: A5/112.78195488721805,
2932.3308270676694`;

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, redwall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]:[box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});
onInput("w", () => {
  getFirst(player).y += -1; // negative y is upwards
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
  clearText();
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  let aBoxesOnGoals = tilesWith(goal, box);
  const numberCovered = aBoxesOnGoals.length;
  if (numberCovered >= 1) {
    for (boxesOnGoals of aBoxesOnGoals) {
      for (sprite of boxesOnGoals) {
        if (sprite.type === "b") 
          sprite.remove();
          playTune(removeMelody);
      }
    }
    
  }

  // if no box is left the level is done
  // all boxes are removed and we can go to the next level
  
  if (tilesWith(box).length === 0) {
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
