/*
@title: getting_started
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const countdown = null;
const sf = "p";
const arrow = "b";
const bluecircle = "g";
const wall = "w";
const sad = "s"
const combined = "c"; // new combined sprite

// assign bitmap art to each sprite
setLegend(
  [ sf, bitmap`
................
................
................
................
................
.....6666.......
....666666......
...66666666.....
..6660660666....
..6666666666....
..6666666666....
..6606666066....
...66000066.....
....666666......
.....6666.......
................`],
  [ arrow, bitmap`
................
................
................
................
..........3.....
...........3....
............3...
33333333333333..
333333333333333.
33333333333333..
............3...
...........3....
..........3.....
................
................
................`],
  [ bluecircle, bitmap`
................
................
................
................
......5555......
.....555555.....
....55555555....
...5550550555...
...5555555555...
...5550000555...
...5505555055...
....55555555....
.....555555.....
......5555......
................
................`],
  [ wall, bitmap`
0000000000000000
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0H8H8H8H8H8H8H80
08H8H8H8H8H8H8H0
0000000000000000`],
  [ sad, bitmap`
................
................
................
......7777......
.....777777.....
....77777777....
...7770770777...
...7777777777...
...7770000777...
...7707777077...
....77777777....
.....777777.....
......7777......
................
................
................`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
...p
.b..
g...`,
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
....
pw.b
ww..
...g`,
  map`
ssss
ssss
ssss
ssss`,
  map`
p..g
b.w.
....
w..w`,
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ sf, arrow, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [sf]: [arrow]
});

setPushables({
    [sf]: [ arrow ],
    [arrow]: [ arrow ]
});
// inputs for sf movement control
onInput("s", () => {
  getFirst(sf).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(sf).x += 1; // positive x is right
});

onInput("w", () => {
  getFirst(sf).y -= 1; // negative y is upwards
});

onInput("a", () => {
  getFirst(sf).x -= 1; // negative x is left
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // Count the number of bluecircle sprites
  const targetNumber = tilesWith(bluecircle).length;

  // Count the number of bluecircle sprites covered by arrows
  const numberCovered = tilesWith(bluecircle, arrow).length;
  checkLoco();
  // If all bluecircle tiles are covered, transition to the next level
  if (numberCovered === targetNumber) {
    setTimeout(() => {
      level++;
      const currentLevel = levels[level];

      if (currentLevel !== undefined) {
        setMap(currentLevel);
      }
      if (currentLevel === levels[4]){
        addText("Happy to sad", { y: 8, color: color`3` });
      }
    }, 1000); // Wait 1 second before transitioning
  }
});

function checkLoco() {
  const arrowSprite = getFirst(arrow); // Get all arrow sprites
  const bcSprite = getFirst(bluecircle); // Get all bluecircle sprites

  if (bcSprite.x === arrowSprite.x && bcSprite.y === arrowSprite.y) {
    // Change the bluecircle to sad sprite
    addSprite(bcSprite.x, bcSprite.y, sad);
    bcSprite.remove(); 
  }
}

const myTune = tune`
230.76923076923077: A4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: F5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: G5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: A5~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: B5~230.76923076923077,
230.76923076923077: A4~230.76923076923077`;
playTune(myTune);
