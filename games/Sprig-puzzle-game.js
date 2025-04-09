/*
@title: getting_started
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/
const theme = tune`
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: F5~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: D4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: E4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: E5~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537,
223.88059701492537: C4~223.88059701492537,
223.88059701492537: D4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + A4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: F5~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: F4~223.88059701492537,
223.88059701492537: D4~223.88059701492537,
223.88059701492537: E4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + A4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: E5~223.88059701492537 + A4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: F4~223.88059701492537,
223.88059701492537: C4~223.88059701492537,
223.88059701492537: D4~223.88059701492537`
// define the sprites in our game
const player = "p";
const box = "b";
const box2 = "c";
const goal = "g";
const wall = "w";

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
CCCCCCCCCCCCCCCC
CCCFFFFFFFFFFCCC
CCCCFFFFFFFFCCCC
CFCCCFFFFFFCCCFC
CFFCCCFFFFCCCFFC
CFFFCCCFFCCCFFFC
CFFFFCCCCCCFFFFC
CFFFFFCCCCFFFFFC
CFFFFFCCCCFFFFFC
CFFFFCCCCCCFFFFC
CFFFCCCFFCCCFFFC
CFFCCCFFFFCCCFFC
CFCCCFFFFFFCCCFC
CCCCFFFFFFFFCCCC
CCCFFFFFFFFFFCCC
CCCCCCCCCCCCCCCC`],
  [ box2, bitmap`
CCCCCCCCCCCCCCCC
CFFFFFCCCCFFFFFC
CFFFFCFCCFCFFFFC
CFFFCFFCCFFCFFFC
CFFCFFFCCFFFCFFC
CFCFFFFCCFFFFCFC
CCFFFFFCCFFFFFCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCFFFFFCCFFFFFCC
CFCFFFFCCFFFFCFC
CFFCFFFCCFFFCFFC
CFFFCFFCCFFCFFFC
CFFFFCFCCFCFFFFC
CFFFFFCCCCFFFFFC
CCCCCCCCCCCCCCCC`],
  [ goal, bitmap`
.....777777.....
....75555557....
...755HHHH557...
..755H5555H557..
.755H55HH55H557.
.75H55H55H55H57.
.75H5H5555H5H57.
.75H5H55H5H5H57.
.75H5H55H5H5H57.
.75H5H5H55H5H57.
.75H55H55H55H57.
.755H555H55H557.
..755HHH55H557..
...755555H557...
....755HH557....
.....777777.....`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL
1111L1111L1111L1
1111L1111L1111L1
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL
1111L1111L1111L1
1111L1111L1111L1
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL`] 
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
pw...
.w.w.
...wg`,
  map`
pw.w.w....
.w.b...ww.
.w.w.w.w..
b..w.w.w.w
.www.w.w..
.www...wwg`,
  map`
.gwwwwb
.w...b.
.w.ww.w
.w.pw.w
..www.w
w.....w
bwwww.b`,
  map`
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp`,
  map`
p.......
wwwwwww.
...w....
.w.w.www
.w...w..
..www...
w.....w.
.wwwww..
.....w.w
.www.w..
...w..w.
ww.gw...`,
  map`
pw....w.......
.w..www.wwwww.
.wbw....w.....
.w.b..ww..wwww
.w.ww...ww....
...w.......ww.
ww.w..wwwww...
...w......w.ww
.www......w...
....w.....www.
www.w.........
....w.....wwww`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box]
});
const playback = playTune(theme, Infinity)
// inputs for player movement control
onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
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
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`D` });
    }
  }
});
