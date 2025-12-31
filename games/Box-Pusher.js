/*
@title: getting_started
@description: "Getting Started" is a tutorial game that guides players through basic game mechanics.
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
const hole = "h";
const pgoal = "q";
const superwall = "s";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
...000....000...
.....00..00.....
......0..0......
0.....0..0.....0
0....000000....0
00..00222200..00
.00002222220000.
....02022020....
....02022020....
.00002222220000.
00..00222200..00
0....000000....0
0.....0..0.....0
......0..0......
.....00..00.....
...000....000...`],
  [ box, bitmap`
1111111111111111
1LCCCCCCCCCCCCC1
1L111LCCCCC111L1
1L111LCCCCC111L1
1L111LCCCCC111L1
1LCCCCCCCCCCCCC1
1LCCCCCCCCCCCCC1
1LCCCCCCCCCCCCC1
1LCCCCCCCCCCCCC1
1LCCCCCCCCCCCCC1
1LCCCCCCCCCCCCC1
1L111LCCCCC111L1
1L111LCCCCC111L1
1L111LCCCCC111L1
1LCCCCCCCCCCCCC1
1111111111111111`],
  [ goal, bitmap`
4444444444444444
4D.............4
4D...444444D...4
4D...444444D...4
4D...444444D...4
4D...444444D...4
4D...444444D...4
4D...444444D...4
4D...444444D...4
4D.4444444444D.4
4D.4444444444D.4
4D..44444444D..4
4D...444444D...4
4D....4444D....4
4D.............4
4444444444444444`],
  [ wall, bitmap`
0000000000000000
01L2222222222210
0L1L2222222221L0
0L21L22222221L20
0L221L222221L220
0L2221L2221L2220
0L22221L21L22220
0L2222211L222220
0L2222211L222220
0L22221L21L22220
0L2221L2221L2220
0L221L222221L220
0L21L22222221L20
0L1L2222222221L0
01L2222222222210
0000000000000000`],
  [ hole, bitmap`
2222111111112222
2211111111111122
2111111111111112
2111111111111112
1111111111111111
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L0L0L0L0L0L0L0L0
2L0L0L0L0L0L0L02
2000000000000002
2200000000000022
2222000000002222`],
  [ pgoal, bitmap`
4444444444444444
4D22222222222224
4D222244D44D2224
4D222224D4D22224
4D222244444D2224
4D24D4422244D4D4
4D244422222444D4
4D22242424242224
4D244422222444D4
4D24D4422244D4D4
4D222244444D2224
4D222224D4D22224
4D222244D44D2224
4D22222222222224
4D22222222222224
4444444444444444`],
  [ superwall, bitmap`
0000000000000000
03C2222222222230
0L3C2222222223C0
0L23C22222223C20
0L223C222223C220
0L2223C2223C2220
0L22223C23C22220
0L2222233C222220
0L2222233C222220
0L22223C23C22220
0L2223C2223C2220
0L223C222223C220
0L23C22222223C20
0L3C2222222223C0
03C2222222222230
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
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
....
....`,
  map`
p...
....
...b
..bg`,
  map`
pg.
b..
..g
.bb
...
g..`,
  map`
p.wg
.bw.
....
..bg`,
  map`
pww..
.....
.wbw.
.w.w.
...wg`,
  map`
.p.w..g
.b.w...
...w...
gb.w...
...w...
.b.w...
...w..g`,
  map`
..w...w...w..g
.bw...w...w...
..w...w...w...
p.w...w...w...`,
  map`
.w...wg
.w.w.wb
...w...
wwwwwww
b......
.......
.......
wwwwwww
......b
p......`,
  map`
.....
...b.
p.h..
.....
g....`,
  map`
...h...h...h
bh.h.h.h.h.h
gh...h...h..
hhhhhhhhhhh.
............
.hhhhhhhhhhh
..hh...h...h
h..h.h.h.h.h
hh...h...h..
phhhhhhhhhh.
............`,
  map`
wwhhhhhhh
wwh....gh
wwh..hhhh
wwww.hhhh
....phhhh
.www.hhhh
.www.hhhh
.b...hhhh
www..hhhh`,
  map`
..w..h..h....
..w..h..w....
.bw..h..h....
..w..h..h....
..w..h..h....
..w..w..h....
p.w..h..h...g`,
  map`
..b.g
..h..
p.hhh
..h..
....q`,
  map`
g...q
.g...
...g.
bbbbb
.....
.....
.....
..g..
.....
.....
.....
.....
.....
p...g`,
  map`
.wgw..w.w.ww.ww.wwg...
gb..w.w.w.w..w..w.whb.
w.....w.w.w.hw.hwgwh..
.wbg..wgw.wg.wg.ww.hh.
....w.wbw.wb.w..wb....
w...whw.w.w..w..w...h.
gwww..w.whww.ww.w..hh.
b..b..........b...hhh.
p................hhhhq`,
  map`
.........
.........
p.b.w.p.q
.........
.........`,
  map`
p........
.........
....b..q.
.........
.....w...
.........
q.p......
.........
.......g.`,
  map`
.............h
...s...s.....h
......s.s.....
....s...s....g
..ss..b.s.s...
..s..sps....sh
..s...s....s.h
.........s...h
.............h`,
  map`
...www....www...
.b..hww..wwh..b.
......w..wg.....
w..h..w..w..h..w
w.....wwww....hw
ww.........w..ww
.wwww......ww.wg
....w.w..w.w...b
....w.wb.w.w....
.wwww......ww.w.
wwg.w....gww..ww
wh....wwwww...hw
w..h..w..w..h..w
......w..w...p..
..b.hww..wwh....
q..www....www..g`,
  map`
wwwwwwwwwwwwwwww
wg............gw
w....sgssgs....w
w....s.ss.s....w
w....s.ss.s....w
w..p.s.ss.s....w
w....sb..bs....w
w....s....s....w
w....s....s....w
w..sssb..bsss..w
w.........sss..w
w...ssssssss...w
w....ssssss....w
w.....ssss.....w
w.............qw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ww............ww
w.w..........w.w
w..w........w..w
w...w......w...w
w....w.bb.w....w
w.....wp.w.....w
w......ww......w
w......ww......w
w.....w.qw.....w
w....w.gg.w....w
w...w......w...w
w..w........w..w
w.w..........w.w
ww............ww
wwwwwwwwwwwwwwww`,
  map`
....hhhhhhhh..pq
..hhhhhhhhhhh...
.hhhhhhhh.....h.
.hhhhhhhhbhhh.h.
h........w....hh
h.hhhhhhhhhhhhhh
h.h.........hhhh
h...hbhhhhhbhhhh
hhh..w..w..w..hh
hhh.hhhhbhhhh.hh
hhh......hhsh.hh
hhhhhhhhhhhhh.hh
.hh.b.h.b.h...h.
.h.bhbhbhbhbhhh.
...hh.b.h.b.hh..
gb..hhhhhhhh....`,
  map`
wwwwwwwwwwwwwwww
w.............pw
w.hhhwwhhwwhhh.w
w.h...w..w...h.w
wqh..wwwwww..h.w
whw.wwg...ww.w.w
w.www......www.w
w.hhw.b..b.....w
w.....b..b.whh.w
w.www......www.w
w.whww...gwwhwhw
w.hhhwwwwwwhhhhw
w....hw..wg.b..w
whhh.wwhhwwhhh.w
whhh...........w
wwwwwwwwwwwwwwww`,
  map`
pbgw
hqs.`
];

// set the map displayed to the current level
let currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, superwall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [ box ], [box]: [ box ], [box]: [ wall ], [wall]: [ player ]
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
  let currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
onInput("i", () => {
  // increase the current level number
    level = level + 1;
    let currentLevel = levels[level]; // get the original map of the level

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
  const playerTarget = tilesWith(pgoal).length;

  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;
  const deathTime = tilesWith(player, hole).length;
  const playerNumber = tilesWith(pgoal, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber && playerNumber === playerTarget) {
    // increase the current level number
    level = level + 1;
    let currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
  if (deathTime == "1") {
    let currentLevel = levels[level]; // get the original map of the level

    // make sure the level exists before we load it
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    }
  }
});