/*
@title: PatternPusher
@author: Jakub 'billybu10' Budny
@description: A sokoban variant, where player gets shown pattern, which they must then replicate
@tags: ["puzzle", "logic"]
@addedOn: 2025-08-30

wasd for movement
j to reset level
k to go to previous screen

*/

const player = "p";
const box = "b";
const goal = "g";
const blob = "l";

setLegend(
  [ player, bitmap`
................
......0000......
....00666600....
...0666666660...
..066606606660..
..066006600660..
.06666666666660.
.06666600666660.
.06666606666660.
.06606666660660.
..066066660660..
..066600006660..
...0666666660...
....00666600....
......0000......
................`],
  [ box, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCC00CCCCCC0
0CCCCC0000CCCCC0
0CCCC000000CCCC0
0CCC0CC00CC0CCC0
0CC00CC00CC00CC0
0C000000000000C0
0C000000000000C0
0CC00CC00CC00CC0
0CCC0CC00CC0CCC0
0CCCC000000CCCC0
0CCCCC0000CCCCC0
0CCCCCC00CCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [ goal, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [ blob, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`]
);

// tunes for: previous level, next level and level reset

const downTune = tune`
200: B4~200,
200: G4~200,
200: E4~200,
5800`;

const upTune = tune`
200: E4~200,
200: G4~200,
200: B4~200,
5800`;

const resetTune = tune`
200: E4~200,
200: G4~200,
200: E4~200,
5800`;

const wonTune = tune`
200: B4~200,
200: G4~200,
200: D5~200,
200: B4~200,
200: G4~200,
200: B4~200,
200: D5~200,
200: G4~200,
200: B4~200,
200: E5~200,
200: E5~200,
4200`;


// create game levels
let level = 0; // this tracks the level we are on
let dontskip = false;//this let's us check if the level is loaded via input, so it isn't immediately skipped when it doesn't contain player sprite
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`,
    map`
.....
..l..
...l.
.lll.
.....`,
      map`
.....
.pb..
.bgb.
.bbg.
.ggg.
.....`,
  map`
........
..l..l..
.ll..ll.
........
........
.l....l.
..l..l..
...ll...`,
  map`
........
.bgb.gb.
.gp.bgg.
..b..b..
......b.
.gb..bg.
.bg.bg..
..bgg...`,
    map`
..........
..ll..ll..
.l..ll..l.
.l......l.
..l....l..
...l..l...
....ll....
..........`,
  map`
..........
.bggbbggb.
.gbbggbbg.
.g..p...g.
.bg....gb.
..bgbbgb..
...bggb...
..........`,
  map`
..........
.lll......
.l.l....l.
.lll..l.l.
......l.l.
.l.l....l.
.lll......
..........`,
  map`
..........
.gggbbb.b.
.gbgb...g.
.ggg.bgbg.
pbbb.bgbg.
.gbgb...g.
.gggbbb.b.
..........`,

];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

addText("Welcome to", { y: 1, color: color`9` });
addText("PatternPusher!", { y: 2, color: color`9` });

addText("Push boxes into", { y: 4, color: color`0` });
addText("pattern shown", { y: 5, color: color`0` });
addText("beforehand", { y: 6, color: color`0` });

addText("Press", { y: 8, color: color`0` });
addText("j to reset", { y: 9, color: color`0` });
addText("k to go to last", { y: 10, color: color`0` });
addText("scene", { y: 11, color: color`0` });

addText("Press any key", { y: 13, color: color`0` });
addText("to continue", { y: 14, color: color`0` });

setSolids([ player, box ]);

setPushables({
  [player]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player) && (getFirst(player).y += 1);
  
});

onInput("d", () => {
  getFirst(player) && (getFirst(player).x += 1);
});

onInput("w", () => {
  getFirst(player) && (getFirst(player).y -= 1);
});

onInput("a", () => {
  getFirst(player) && (getFirst(player).x -= 1);
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    playTune(resetTune);
    clearText("");
    setMap(currentLevel);
  }
});

onInput("k", () => {
  level -= 1;

  const currentLevel = levels[level]; // get the map of the previous level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    playTune(downTune);
    clearText("");
    setMap(currentLevel);
    dontskip = true;
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
  if (numberCovered === targetNumber && !dontskip) {
    // increase the current level number
    level = level + 1;
    console.log(level);

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      playTune(upTune);
      clearText("");
      setMap(currentLevel);
    } else {
      setMap(levels[0]);
      playTune(wonTune);
      addText("You won!", { y: 6, color: color`3` });
      addText("Thank you", { y: 8, color: color`3` });
      addText("for playing", { y: 9, color: color`3` });
      addText("my game!", { y: 10, color: color`3` });
    }
  }else if(dontskip){
    dontskip = false;// make sure user even sees the level
  }
});

