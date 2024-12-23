/*
@title: getting_started
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const myTune = tune`
500: E5^500 + B4^500 + B5-500 + F4/500 + A4~500,
15500`;

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
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
g.........wg.........
wwww.w.wwwwwwwwwwww.w
wwww.w.wwwww.wwwwww.w
w....wwwwwww.www.....
wwww......ww.www.wwww
wwwwwww.wwww........w
ww.wwww.w.www..wwwwww
ww........ww......www
wwwww.wwwwww.ww.wwwww
ww....ww.www.ww.wwwww
ww.ww....www.ww.wwwww
ww..ww.wwwww.ww.....w
www.ww.wwww.....www.w
....ww....wwww.wwww.w
wwwwww.w.wwwwwwwwww.w
wwwwww.w.wwww.......w
w......w.wwww.wwwww.w
wwwwwwww.wwww....ww.w
.........wwwwwww.ww.w
.wwwwwwwwwwwwwww....w
pwwwwwwwwwwwp....wwww`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

// inputs for player movement control
onInput("w", () => {
    getAll(player).forEach(player => {
        player.y -= 1;
    });
    playTune(myTune);
});

onInput("a", () => {
    getAll(player).forEach(player => {
        player.x -= 1;
    });
    playTune(myTune);
});

onInput("s", () => {
    getAll(player).forEach(player => {
        player.y += 1;
    });
    playTune(myTune);
});

onInput("d", () => {
    getAll(player).forEach(player => {
        player.x += 1;
    });
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
  
  // count the number of tiles with goals and players
  const numberCovered = tilesWith(goal, player).length;

  // if the number of goals is the same as the number of goals covered by players
  // all goals are covered by players and we display "you win" message
  if (numberCovered === targetNumber) {
    addText("you win!", { y: 4, color: color`3` });
  }
});

