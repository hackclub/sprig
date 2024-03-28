
//legands
const player = "p";
const chest = "b";
const goal = "g";
const wall = "w";

//bitmaps
setLegend(
  [ player, bitmap`
................
................
................
....000000000...
....0.......0...
....0.7...7.0...
....0...3...0...
....000000000...
........0.......
........0.......
.......000......
......0.0.0.....
........0.......
........0.......
.......000......
......0...0.....`],
  [ chest, bitmap`
................
................
................
..CCCCC0CCCCC...
..CCCCC0CCCCC...
..CCCCC0CCCCC...
..CCCCC0CCCCC...
..00000000000...
..00000000000...
..00000000000...
..CCCCC0CCCCC...
..CCCCC0CCCCC...
..CCCCC0CCCCC...
..CCCCC0CCCCC...
................
................`],
  [ goal, bitmap`
................
................
................
................
...666..........
..6...6.........
..6...66666666..
..6...6....6.6..
...666..........
................
................
................
................
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
//song
const melody = tune`
187.5: E4-187.5 + D4/187.5 + G5^187.5 + F5/187.5,
187.5: D4-187.5 + G5~187.5 + F4-187.5 + B5~187.5 + E5/187.5,
187.5: D4-187.5 + G5~187.5 + G4-187.5 + D5/187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + A4-187.5 + C5/187.5 + B5~187.5,
187.5: E4-187.5 + D4/187.5 + G5^187.5 + B4-187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + C5-187.5 + B5~187.5 + A4-187.5,
187.5: D4-187.5 + G5~187.5 + D5-187.5 + F5^187.5 + G4-187.5,
187.5: D4-187.5 + G5~187.5 + E5-187.5 + B5~187.5 + F4-187.5,
187.5: E4-187.5 + G5^187.5 + E5-187.5 + D4/187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + E5-187.5 + B5~187.5 + F4-187.5,
187.5: D4-187.5 + G5~187.5 + D5-187.5 + G4-187.5 + F5^187.5,
187.5: D4-187.5 + G5~187.5 + C5-187.5 + B5~187.5 + A4-187.5,
187.5: E4-187.5 + D4/187.5 + G5^187.5 + B4-187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + A4-187.5 + B5~187.5 + C5/187.5,
187.5: D4/187.5 + G5/187.5 + G4-187.5 + D5/187.5,
187.5: D4-187.5 + G5~187.5 + F4-187.5 + B5~187.5 + E5/187.5,
187.5: E4-187.5 + D4/187.5 + G5^187.5 + F5/187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + F4-187.5 + B5~187.5 + E5/187.5,
187.5: G5/187.5 + G4-187.5 + D5/187.5 + D4/187.5,
187.5: D4-187.5 + G5~187.5 + A4-187.5 + B5~187.5 + C5/187.5,
187.5: E4-187.5 + D4/187.5 + G5^187.5 + B4-187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + C5-187.5 + B5~187.5 + A4-187.5,
187.5: D4-187.5 + G5~187.5 + D5-187.5 + F5^187.5 + G4-187.5,
187.5: D4-187.5 + G5~187.5 + E5-187.5 + B5~187.5 + F4-187.5,
187.5: E4-187.5 + D4/187.5 + G5^187.5 + E5-187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + E5-187.5 + B5~187.5 + F4-187.5,
187.5: D4-187.5 + G5~187.5 + D5-187.5 + F5^187.5 + G4-187.5,
187.5: D4-187.5 + G5~187.5 + C5-187.5 + B5~187.5 + A4-187.5,
187.5: E4-187.5 + D4/187.5 + G5^187.5 + B4-187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + A4-187.5 + B5~187.5 + C5/187.5,
187.5: D4-187.5 + G5~187.5 + G4-187.5 + D5/187.5 + A5~187.5,
187.5: D4-187.5 + G5~187.5 + F4-187.5 + E5/187.5 + B5~187.5`

// Play song:
playTune(melody)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
.pww
.b.g
..ww`,
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
p...
..b.
...b
w..g`,
  map`
...
.p.
...`,
  map`
p...w..............
......w..ww...g....
....w......w......w
...b..ww.........ww
........g.....b..w.
ww...w...www.......
.w.g..........ww.w.
......w...b......w.
.w..........w..w...
.....w.w.w.........
...b.......g.w..w.g
......b...ww....w..
.w.ww...........b..
.....w..w.g...w....
..w.....w...w...w..`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, chest, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [ chest, player ]

});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
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
  const numberCovered = tilesWith(goal, chest).length;

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
      addText("you win!", { y: 4, color: color`D` });
      playback.end()
    }
  }
});
