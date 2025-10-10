/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: football
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p";
const box = "b";
const goal = "g";

setLegend(
  [ player, bitmap`
................
..........CCC...
........CCCCC...
.......CCCCCC...
......CCCCCC....
......C222C.C...
....CCC323C.C...
....C.C222CCC...
....C.C555C.....
......C222C.....
.....CC222C.....
.....CC22C......
......CCC.......
......C.C.......
.....CC.CC......
................` ],
  [ box, bitmap`
................
................
......000.......
....0020200.....
...000200220....
..02020200200...
..02020220020...
.0200220222020..
.0202000202020..
..02202220020...
..02000000020...
...022202220....
....0022200.....
......000.......
................
................`],
  [ goal, bitmap`
.000000000000000
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0
.022222222222220
.0.2.2.2.2.2.2.0`]
);

let level = 0; 
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box ]); 

setPushables({
  [player]: [ box]
});

const myTune = tune`
500: B4~500,
15500`;

onInput("s", () => {
  getFirst(player).y += 1;
  playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(myTune);
});

onInput("w", () => {
  getFirst(player).y -= 1;
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

  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {

    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});