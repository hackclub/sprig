// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
...6666666666...
...6662222666...
...6662002666...
...6662222666...
...6666666666...
...6626666266...
...6662222666...
...6666666666...
..222220022222..
6622222002222266
6.2CCCCCCCCCC2.6
66.CCCCCCCCCC.66
66..CC....66..66
....66....66....
....66....66....
....66....66....`],
  [ box, bitmap`
7777477777447477
7774777473347477
7773343343333377
7773333333333377
777C1111C1111C77
777C1111C1111C77
777C1111C1111C77
777C1111C1111C77
777CCCCCCCCCCC77
777C1111C1111C77
777C1111C1111C77
777C1111C1111C77
777C1111C1111C77
777CCCCCCCCCCC77
4444444444444444
CCCCCCCCCCCCCCCC`],
  [ goal, bitmap`
2227777772227766
2222277722222766
7222774774227766
7777747447477766
7777777747777777
7777733333337777
7777333333333777
7777333333333777
7777333333333777
7777333333333777
7777333333333777
7777733333337777
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
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
p..w..gw
.b.w..ww
...ww.b.
ww.w....
w.....w.
..g..w..`,
  map`
www.www..w
..ww.w.bgw
.bp..w....
....bwwwb.
..........
www.wwww..
.gw..ww.b.
w....w.g..
w...wwwwww
wbwwwwwwww`,
  map`
wwwwwwww
w.pwwgwb
w..ww.w.
w.bww...
w.....ww
w.w...w.
wwwww.bw`,
  map`
.......w.w....
.wwwwwww.w.ww.
.www....wwwww.
.wpb....wgw.w.
.wwwww...w.ww.
.....w...w..w.
.wwwww..www.w.
....gw....wgw.
.....w....w.w.
.wwwww......w.
....g.w.....w.
.w.....w....w.`,
  map`
wwwwwwwww
wwwwwwwww
wwwwwwwww
wwwwwwwww
p..b..gww
wwwwwwwww
wwwwwwwww
wwwwwwwww
wwwwwwwww`,
  map`
ww.w...ww.
wp.ww..b..
w...w.....
...wg..ww.
.b..wwg...
...g......
...wwgww..
w.bww.....
ww.w...b..
ww..ww..ww
wwwwwww...`
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
      addText("you win!", { y: 4, color: color`6` });
    }
  }
});
// Create a tune:
const melody = tune`
16000`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()
