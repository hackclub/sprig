/*
@title: CUFO
@description: "Getting Started" is a tutorial game that guides players through basic game mechanics.
@author: Mark Chalamish
@tags: ['puzzle']
@addedOn: 2026-01-27
*/

// Create a tune:
const melody = tune`
500: B4^500,
500: C5^500,
500: D5^500 + E5^500,
14500`
const resettune = tune`
500: G4~500,
15500`
const win = tune`
200,
200: F4~200,
200: G4~200,
200: F4~200,
200: A4~200,
200,
200: D4~200,
200: F4~200,
200: G4~200,
200: F4~200,
200: A4^200,
200,
200: D4~200,
200: D4~200,
200: D4~200,
200: E4~200,
200,
200: A4~200,
200: G4~200,
200: F4~200,
200: G4~200,
200,
200: F4~200,
200: G4~200,
200: F4~200,
200: G4^200,
200: A4^200,
200,
200: A4-200,
200: A4-200,
200: A4-200,
200: A4-200`


// define the sprites in our game
const player = "p";
const player2 = "q";
const box = "b";
const gbox = "d";
const goal = "g";
const wall = "w";
const ggoal = "r";

// define reset conditions
let r1a = false; // reset-gamepad_1-input_a
let r1b = false;
let r2a = false;
let r2b = false;

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
................
................
.......66.......
......6060......
......66699.....
......6666......
.....666666.....
.....666666.....
.....666666.....
......6666......
......9..9......
.....99..99.....
................
................`],
  [player2, bitmap`
................
................
................
................
................
......LLLL......
.....LLLLLL.....
....LL4LL4LL....
..000000000000..
.00000000000000.
..600600006006..
................
................
................
................
................`],
  [box, bitmap`
................
................
...CCCCCCCCCC...
..CCC999999CCC..
..CCCC6666CCCC..
..C9CCC66CCC9C..
..C96CCCCCC69C..
..C966CCCC669C..
..C966CCCC669C..
..C96CCCCCC69C..
..C9CCC66CCC9C..
..CCCC6666CCCC..
..CCC999999CCC..
...CCCCCCCCCC...
................
................`],
  [gbox, bitmap`
................
................
...CCCCCCCCCC...
..CCC000000CCC..
..CCCCLLLLCCCC..
..C0CCC11CCC0C..
..C0LCCCCCCL0C..
..C0L1CCCC1L0C..
..C0L1CCCC1L0C..
..C0LCCCCCCL0C..
..C0CCC11CCC0C..
..CCCCLLLLCCCC..
..CCC000000CCC..
...CCCCCCCCCC...
................
................`],
  [ggoal, bitmap`
................
................
................
.....002200.....
....0L2222L0....
...0LLL22LLL0...
...02LL22LL20...
..022224422220..
..022224422220..
...02LL22LL20...
...0LLL22LLL0...
....0L2222L0....
.....002200.....
................
................
................`],
  [goal, bitmap`
................
................
................
.....992299.....
....96222269....
...9666226669...
...9266226629...
..922220022229..
..922220022229..
...9266226629...
...9666226669...
....96222269....
.....992299.....
................
................
................`],
  [wall, bitmap`
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
.q...
.b...
.p..g`,
  map`
.q...
.d...
.p..r`,
  map`
www.q.w
.gd....
www.bww
wwww.pw`,
  map`
pbb.g
qdd.r`,
  map`
wpww
wb..
qd..
.r..
.gww`,
  map`
w.gw
pdbw
qdbg
..ww`,
  map`
dp.dddddd
gb.d....d
..dd..d.d
.b.gb.d.d
d.ddddd.d
d.b......
d..ddddb.
g.b.....d
d.dddddgd`,
  map`
ddddddd
dbpppbd
dbppppd
dbbbpbd
dbpbpbd
ddddddd`,
  map`
wp.ww
w.bwg
.dd.q
w..bg
w....`,
  map`
ww.www
wggb.w
.ddd..
..pbq.
...w..`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, player2, gbox, box, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [player2]: [gbox],
  [gbox]: [gbox],
  [box]: [box]
});



// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
  clear();
});

onInput("a", () => {
  getFirst(player).x -= 1;
  r1a = true;
  if (r1b) { clear();
    reset() }
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  clear();
});

onInput("d", () => {
  getFirst(player).x += 1;
  r1b = true;
  if (r1a) { clear();
    reset() }
});

onInput("i", () => {
  getFirst(player2).y -= 1; // positive y is downwards
  clear();
});

onInput("j", () => {
  getFirst(player2).x -= 1;
  r2a = true;
  if (r2b) { clear();
    reset() }
});

onInput("k", () => {
  getFirst(player2).y += 1; // positive y is downwards
  clear();
});

onInput("l", () => {
  getFirst(player2).x += 1;
  r2b = true;
  if (r2a) { clear();
    reset() }
});

// input to reset level
function clear() {
  r2a = false;
  r2b = false;
  r1a = false;
  r1b = false;
}

function reset() {
  const currentLevel = levels[level]; // get the original map of the level

  playTune(resettune);

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
}



// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  const targetNumber2 = tilesWith(ggoal).length;
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;
  const numberCovered2 = tilesWith(ggoal, gbox).length;
  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber && numberCovered2 === targetNumber2) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      playTune(melody)
    } else {
      addText("you win!", { y: 4, color: color`3` });
      playTune(win)
    }
  }
});