/*
@title: Push Box Challenge
@tags: ['tutorial']
@addedOn: 2022-07-26

This is a simple tutorial game where you move a box to its goal.
The goal is to push the box to the correct location.
*/

// Define the sprites used in the game
const playerSprite = "p";
const boxSprite = "b";
const goalSprite = "g";
const wallSprite = "w";

// Assign bitmap art to each sprite
setLegend(
  [ playerSprite, bitmap`
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
  [ boxSprite, bitmap`
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
  [ goalSprite, bitmap`
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
  [ wallSprite, bitmap`
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

// Define the levels for the game
let currentLevelIndex = 0;
const gameLevels = [
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
.bw.
..w.
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];

// Set the initial map to the first level
setMap(gameLevels[currentLevelIndex]);

// Define solid objects
setSolids([playerSprite, boxSprite, wallSprite]);

// Configure the player to not push other objects
setPushables({
  [playerSprite]: []
});

// Player movement controls
onInput("w", () => {
  getFirst(playerSprite).y -= 1;
});

onInput("a", () => {
  getFirst(playerSprite).x -= 1;
});

onInput("d", () => {
  getFirst(playerSprite).x += 1;
});

onInput("s", () => {
  getFirst(playerSprite).y += 1;
});

// Reset level on "j" input
onInput("j", () => {
  const levelMap = gameLevels[currentLevelIndex];
  if (levelMap !== undefined) {
    clearText("");
    setMap(levelMap);
  }
});

// After each input, check the game's progress
afterInput(() => {
  const totalGoals = tilesWith(goalSprite).length;
  const goalsCovered = tilesWith(goalSprite, boxSprite).length;

  // If all goals are covered, move to the next level
  if (goalsCovered === totalGoals) {
    currentLevelIndex++;

    const nextLevelMap = gameLevels[currentLevelIndex];
    if (nextLevelMap !== undefined) {
      setMap(nextLevelMap);
    } else {
      addText("You win!", { y: 4, color: color`3` });
    }
  }
});
