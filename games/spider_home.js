/*
@title: spider_home
@author: usermaatre setepenre
@tags: ['puzzle']
@addedOn: 2023-10-09
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const mine = "m";
const black = "z";
let minesCovered = 0;
const timeoutIds = [];

const tuneMove = tune `
500: F5~500,
15500`;

const tuneHit = tune`
72.11538461538461: D5-72.11538461538461,
72.11538461538461: G4-72.11538461538461,
72.11538461538461: E4-72.11538461538461,
72.11538461538461: C4-72.11538461538461,
2019.230769230769`;
const tuneNextLevel = tune`
60.120240480961925: C4-60.120240480961925,
60.120240480961925: E4-60.120240480961925,
60.120240480961925: G4-60.120240480961925,
60.120240480961925: B4-60.120240480961925,
60.120240480961925: D5-60.120240480961925,
60.120240480961925: F5-60.120240480961925,
60.120240480961925: A5-60.120240480961925,
60.120240480961925: B5-60.120240480961925,
60.120240480961925,
60.120240480961925: B5-60.120240480961925,
60.120240480961925,
60.120240480961925: B5-60.120240480961925,
1202.4048096192384`;
const tuneWin = tune`
122.44897959183673: E5-122.44897959183673 + C5~122.44897959183673,
122.44897959183673: F5-122.44897959183673 + D5~122.44897959183673,
122.44897959183673: G5-122.44897959183673 + E5~122.44897959183673,
122.44897959183673: A5-122.44897959183673 + F5~122.44897959183673,
122.44897959183673,
122.44897959183673: B5-122.44897959183673 + G5~122.44897959183673,
122.44897959183673: D5-122.44897959183673 + B4~122.44897959183673,
122.44897959183673,
122.44897959183673: C5/122.44897959183673 + A4/122.44897959183673 + F4/122.44897959183673,
122.44897959183673,
122.44897959183673: A5~122.44897959183673 + F5~122.44897959183673 + D5~122.44897959183673,
2571.4285714285716`;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
................
................
....00000000....
...0000000000...
0000..0000..0000
0.00.000000.00.0
..000000000000..
.00000000000000.
00.0000000000.00
..000000000000..
000..0....0..000
0....0....0....0
0..............0`],
  [ box, bitmap`
.DD...DD..4.D.4.
..D..DD.4.4D..4.
4..D.D..4.D4.4..
.4.DD...4D.444..
0DDDD000D00000D0
00D0DDD000D00D00
FCCFFFFCCFCCFCFF
FFCCFFFCFFCFFCFF
FFFFCCCCFFCFCCFC
FFFFFCCFFCCFCFFC
CCCCCCCFFCFCCFCF
FFFFFCCCCCCCCCCF
FFFFFCFFCCFCFCCC
CCFFFCFFCFCCCCFC
FCCFFCFCCCCFCCCF
FFFCCCFCCFFFCFCF`],
  [ goal, bitmap`
.11..000000..666
.00.00DDDD00.666
.0000DDDDDD00...
.000DDDDDDDD00..
.00DDDDDDDDDD00.
00DDDDDDDDDDDD00
000DDDDDDDDDD000
..0DDDDDDDDDD0..
..0DDDDDCCCCD0..
..0DDDDDC..CD0..
..0DDDDDC..CD0..
..0DDDDDC..CD0..
..0DDDDDC.CCD0..
..0DDDDDC..CD0..
..0DDDDDC..CD0..
000DDDDDC..CD000`],
  [ wall, bitmap`
LLL1LLLL1LLL1LLL
LLL1LLLL1LLL1LLL
LLL1LLLL1LLL1LLL
LLL1LLLL1LLL1LLL
..111111111111..
..LLL1LLLL1LLL..
..LLL1LLLL1LLL..
..LLL1LLLL1LLL..
..111111111111..
..LLLLLL1LLLLL..
..LLLLLL1LLLLL..
..LLLLLL1LLLLL..
..111111111111..
LL1LL1LLLL1L1LLL
LL1LL1LLLL1L1LLL
LL1LL1LLLL1L1LLL`],
  [ mine, bitmap`
........11111...
.......11.......
......CCCC......
......CCCC......
.....000000.....
...0033333300...
...0333333330...
..033933333300..
..039993333330..
..033933333330..
..033333333330..
..033333333330..
..033333333330..
...0333333330...
...0033333300...
.....000000.....`],
  [ black, bitmap`
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
....g...
.b....b.
........
....b.b.
.b......
..p..b..`,
  map`
.......g
...b...b
..b.....
........
....b...
p.m...b.`,
  map`
gw......
........
b..b.b..
........
.b..b...
.......p`,
  map`
..w....g
........
..w...b.
........
..w..b..
p.w.....`,
  map`
.gw.....
........
........
...b....
.b...w..
...mmw.p`,
  map`
.......g
....b...
..b.....
..m..b..
.ww.....
pwwm..mm`,
  map`
...m....
gw.m....
ww......
wwb.....
ww......
ww.b.b.p`,
  map`
........
........
....m.m.
.......m
..b..m.w
p...bw.g`,
  map`
gw......
........
........
....b...
.b......
mmmmmmmp`,
  map`
mmmmmmmm
mmmmmmmm
......mm
.mmmb..g
.mmmm.mm
pmmmmwmm`,
  map`
zzzzzzzz
zzzzzzzz
zzzzzzzz
zzzzzzzz
zzzzzzzz
zzzzzzzz`


];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
// setPushables({
//   [player]: [box],
//   [box] : [box]
// });



// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(tuneMove);
  
  for (let i = 0; i < 7; i++) {
    const timeoutId1 = setTimeout(() => {getFirst(player).y += 1; mines();}, 1000);
    timeoutIds.push(timeoutId1);
  }
  
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(tuneMove);
  
  for (let i = 0; i < 7; i++) {
    const timeoutId2 = setTimeout(() => {getFirst(player).y += 1; mines();}, 1000);
    timeoutIds.push(timeoutId2);
  }
  
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(tuneMove);
  
  for (let i = 0; i < 7; i++) {
    const timeoutId3 = setTimeout(() => {getFirst(player).y += 1; mines();}, 1000);
    timeoutIds.push(timeoutId3);
  }
  
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(tuneMove);
  
  for (let i = 0; i < 7; i++) {
    const timeoutId4 = setTimeout(() => {getFirst(player).y += 1; mines();}, 1000);
    timeoutIds.push(timeoutId4);
  }
  
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined && level !== levels.length - 1) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {  

  if (level !== levels.length - 1) {
    mines();
  }
  
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

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

      for (const timeoutId of timeoutIds) {
        clearTimeout(timeoutId);
      }
      
      setMap(currentLevel);
      if (level !== levels.length - 1) {
        playTune(tuneNextLevel);
      }
      
      if (level === levels.length - 1) {
        playTune(tuneWin);
        clearText("");
        addText("yey! you win!", { y: 5, color: color`3` });
        setTimeout(() => {level = 0; clearText(""); setMap(levels[level]);}, 2000);
      } else {
        for (let i = 0; i < 7; i++) {
          setTimeout(() => {getFirst(player).y += 1;}, 100);
        }
      }
    } 
  }
});

function mines() {
  for (let i = 0; i < levels[level].length; i++) {
  if (levels[level][i] === mine) {
    // Count the number of mines in the current level
    const targetNumberMine = 1;
    const numberCoveredMine = tilesWith(mine, player).length;

    if (numberCoveredMine === targetNumberMine) {
      // If all mines in the level are covered, reset the level
      for (const timeoutId of timeoutIds) {
        clearTimeout(timeoutId);
      }
      setMap(levels[level]);
      playTune(tuneHit);
    }
  }
}
}
