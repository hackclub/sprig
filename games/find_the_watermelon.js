/*
@title: Find the Watermelon
@author: Mohamad
@tags: []
@addedOn: 2023-10-05

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const bomb = "b";
const goal = "g";
const wall = "w";
const background ="k"

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......3........
.....33.333.....
....3.....33....
....3.3.3..3....
....3......3....
....3......3....
....33....3.....
......33333.....
......3...3.....
....333...333...
................
................
................`],
  [ bomb, bitmap`
................
................
...3....1...3...
....3..1...3....
.......1........
......0000......
.....000000.....
.....000000.....
.....000000.....
.....000000.....
......0000......
...3........3...
..3..........3..
................
................
................`],
  [ goal, bitmap`
........DD......
.......D........
.......D........
...DDDDDDDDDD...
...D33333333D...
...D33333333D...
...D30333303D...
...D33333333D...
...D33330333D...
...D33333333D...
...D33033333D...
...D33333033D...
...D33333333D...
...DDDDDDDDDD...
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
  [ background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],);

setBackground(background)

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
kkkkkkkkwkwgww
wkwwwwbwwkwkkk
wkkwwkkkwkwwwk
wwkwwkwkwkwkwk
wkkwwkwkwkwkkk
kkkkwkwkwkwwkw
pwwkwkwkkkkwkk
kwkkwkwwwwkwwk
kwkkkkkkkwkwkk
kwwwwwwwkwkwkw
kkkkkkkwkwkkkw`,
  map`
pwkkkwwwwwwwww
kkwkkwkkkbkkkw
kkkwkwkwwkwwww
kkkkwwkwkkkkww
kwwkkkkkkwkkkw
kwkkwwwwwwkwkk
kwkkkkkkkwkwkw
kwkwwwwwkwkwkw
kwkkkkkwkkbwkw
kwwwwwkwwwwwkw
kkkkkkkkkkkbkg`,
  map`
wwwwwwwwwwwwww
wbkkkwkkkbkkkw
wkkwkkkwwkwwww
pkwkwwkwkkkkkw
wkwkkkkkbwbkkw
kkwkwkwkwwkwkg
bkwbwkwkkwkkkw
wkkkwkwkwwkwkw
kwkkwkwkkkkwkw
kwkwwwwwkwwwkw
kkkkkkkkkkkbkk`,
  map`
pkkkkkkkkkkkkk
wwwwwwwwwkwwwk
kkkkkkbkwbwkkk
kwkwkkwkwkwkww
kwkwwbkkwwwkkw
kwkkwkwkkkkkkw
kwkkkkwkwwwwww
kwwwwkkkwkkkkg
kwwwwbwwwbwwwk
kbwkkkwkkkwbbk
kkkkwkkkbkkkkk`,
  map`
pkbkkkkbkbbbkk
bkbkkbkkkbgbkb
kkbbbbbkbbkbkk
bkkkkkkkbkkbbk
kbkkbbkbkbkkbb
bbkbkkbkkkkbbk
bbkkbkbbkbkbkk
kkkkkkkkkbkkbk
bkbbbbkbbbbkbk
bbkkkkkkkkbkbk
kkkkbbbbbkkkkk`,
  map`
kwkkwkkkkkkwkkkwkkkkkkb
kkkkbwkkkkwkkkkkkwwwwkk
kwkbkkwwkkkkb.kkkbkkkkk
kbkkkkwwkwkwkkkwkkkkwkw
kkkkwkwkkwkkbkb.kkwkkkk
pwwkkkkkkwkkkkkbbkkbkkw
kwwwkkkwwkwwkwwkkkkkkkk
kwkkkkbwkwkwwkkkkkwbkwk
kwkkkkkwkkkwwkkkkkkkkwk
kwkkbkkkkkwwwwwbwwwkkkk
kwkkwkwkkkkwwkkwwkwwwkk
wwwkwkkkkkwwwkkkkkkkbkk
kkkkkkwwkkkkkwwkkbwkkbk
wwwwwwkkkbkkwwkkkkwbkwk
kkkkwwkkkkkkwkwwkwkkbkk
kbkwkwkkkbkwkkkkkkkbkkk
kkwkwbkkwwwkwkkkkkbkkwk
kwkkkkkwkkkkkwkwkbkwwkk
wwkwkkkkkkkwkwkwkkkwgkk
kkwkkbkkkbkwkwkkwkwwkkk
kkwkkkwkkkkkkkkkwwwwkkb`,
  map`
kkkkkwwkkkkbkwkkkwwkkkk
kkwbkwkbkkkkwwkkwkkkkkw
kkwkkwkkkkkkkkwwkbkkwkk
kkwkkwkkkwkwbkkkkkwkkkw
kkbkkwkwwkkwkkbkwkkkkkw
pkkwkkbwkbwwkkkwwkwkkkw
kwwkkwkkkwwkkwwkkkkkkwk
kbkkkkwkkbkkkkkbkkkkkwk
kwkkkkkkwbkwkkkkwwwkkwk
kwwwwkwkkwkkwkkwkkkkwkk
kkwkwkwkkwwwkkkwbwwkwkk
wkkkwbkkkwkkkkkkkkkkkkk
kkkwkkwkkwkkkbkwkkwkwkk
wkwwkkbkwkwkkwkkkkwkkwk
kkbkkwkkkkkkkkwwkwkkwkk
kkkkkwkwkkwkwkkkkkwkwkk
kbkkkwkwkwwkkkkwkwkkkwk
wkkkkwkwkkwwkkkkkwkwkbk
kwkkkkwwkkbwkwkkwkwkkbb
kkkkkkkkbkkwkwkwwkkkkgb
kkwkkwwkkkkwkwkwwwwkbbb`,




  
  

];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
});

onInput("a", () => {
  getFirst(player).x -= 1; // positive y is downwards
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
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
  const boxedCovered = tilesWith(goal, player).length;
  const bombCovered = tilesWith(bomb, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (bombCovered === 1) {
    clearText("")
    addText("Game Over!",  { y: 4, color: color`3` })
    setMap(levels[0])
    setTimeout(function(){
      clearText("")
    }, 2000); 
  }
  
  if (boxedCovered === 1) {
    // increase the current level numberds
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
    }
  }
});
