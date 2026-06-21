/*
@title: platformer
@description: This is a basic platformer game based on the original tutorial.
@author: piyush
@tags: [platformer]
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/
//created a tune

const myTune = tune`
645.1612903225806,
161.29032258064515: G5/161.29032258064515 + F5/161.29032258064515 + E5/161.29032258064515 + D5/161.29032258064515 + A5~161.29032258064515,
161.29032258064515: G5~161.29032258064515 + C5~161.29032258064515,
161.29032258064515: F5~161.29032258064515 + E5~161.29032258064515 + D5~161.29032258064515,
322.5806451612903,
161.29032258064515: E5~161.29032258064515,
161.29032258064515: C5^161.29032258064515,
161.29032258064515: C5-161.29032258064515,
161.29032258064515: C5-161.29032258064515,
161.29032258064515: D5-161.29032258064515 + E5-161.29032258064515,
161.29032258064515,
161.29032258064515: E5/161.29032258064515 + D5/161.29032258064515 + C5/161.29032258064515 + G5/161.29032258064515,
161.29032258064515: E5/161.29032258064515 + F5/161.29032258064515,
322.5806451612903,
161.29032258064515: F5^161.29032258064515 + E5^161.29032258064515 + D5^161.29032258064515 + B4-161.29032258064515 + A4-161.29032258064515,
161.29032258064515: A4-161.29032258064515 + G5~161.29032258064515,
161.29032258064515: E5~161.29032258064515,
161.29032258064515: C5~161.29032258064515,
161.29032258064515,
161.29032258064515: F5^161.29032258064515,
322.5806451612903,
161.29032258064515: G5^161.29032258064515 + F5^161.29032258064515 + E5^161.29032258064515,
161.29032258064515: E5^161.29032258064515,
161.29032258064515: C5^161.29032258064515,
322.5806451612903`;
const b = tune`
500: D5~500,
15500`;
const a = tune`
500: B4^500,
15500`;
const s= tune`
500: E4-500,
15500`;
const d = tune`
500: E4/500,
15500`;
// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
............7...
...........777..
..........7777..
.......0.7777...
.....00.0007....
....0.....00....
....0.0.0..0....
....0......0....
....0.3..3.0....
...C00.33.0.....
..C...00000.....
.C....0...0.....
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
   p...
   www.
   g...`,
   map`
   p....
   www.w
   wg..w`,
   map`
   p.wwg
   .www.
   .....`,
   map`
   p......
   wwwww..
   .......
   .wwwwww
   ......g`,
   map`
   g......
   wwwwww.
   .....w.
   .wwwww.
   p......`,
   map`
   g.......
   wwwwww..
   .....w..
   wwwwwww.
   ..pw....
   .wwwwww.
   ........`,
   map`
   ww.p......
   ww.wwwww..
   ...wwwww.w
   wwwwwwww..
   g.........
   .wwwwwww..
   ...w......`,
    map`
   wwp.......
   ww.wwwww..
   ...wwwww.w
   wwwwwwww.w
   ...gw....w
   .wwwwwww.w
   .........w`,
   
]

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [ box ],
  [box]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1;// positive y is downwards
  playTune(s);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(d);
});

onInput("w", () => {
    getFirst(player).y -= 1;
  playTune(b);
});

onInput("a",() => {
  getFirst(player).x -= 1;
  playTune(a);
});

afterInput(() => {
 if(tilesWith(goal,player).length > 0) {
  level++;
  const next =levels[level];

  if (next) setMap(next);
  else{
    addText(`you win!`, {y: 4,color: color`3` });
    playTune(myTune, 5);
   }
  }
});

