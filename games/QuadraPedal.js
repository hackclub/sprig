/*
@title: QuadraPedal
@author: Jamarkis
@tags: ['puzzle']
@addedOn: 2022-11-04

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.
Press i to stop music.
Press k to start the music if it is stopped.

Click the "open help" to discover your toolkit.

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!
*/


const player = "p";
const player2 = "q";
const player3 = "r";
const player4 = "s";

const box = "b";
const boxInvert = "c";
const goal = "g";
const goalInvert = "k";
const wall = "w";
const boxBreaker = "d";
const killPlayer = "i";

const walking1 = tune `
500: b4~500,
15500`;
const walking2 = tune `
500: a4~500,
15500`;
let stepNum = 0;

const backgroundMusic = tune `
250: g4-250 + g5^250 + e5^250 + c5^250,
250: a4-250,
250: g4-250 + c5^250 + e5^250 + g5^250,
250: e4-250,
250: g4-250 + c5^250 + e5^250 + g5^250,
250: a4-250,
250: g4-250 + c5^250 + e5^250 + g5^250,
250,
250: c5-250 + a5^250 + f5^250 + d5^250,
250,
250: c5-250 + d5^250 + a5^250 + f5^250,
250,
250: c5-250 + d5^250 + f5^250 + a5^250,
250: a4-250,
250: g4-250 + d5^250 + f5^250 + a5^250,
250: e4-250,
250: g4-250 + b5^250 + g5^250 + e5^250,
250,
250: b5^250 + g5^250 + e5^250 + e4-250,
250: c4-250,
250: e4-250 + b5^250 + g5^250 + e5^250,
250,
250: g4-250 + b5^250 + g5^250 + e5^250,
250,
250: e4-250 + a5^250 + f5^250 + d5^250,
250,
250: c4-250 + a5^250 + f5^250 + d5^250,
250,
250: c4-250 + a5^250 + f5^250 + d5^250,
250,
250: c4-250 + a5^250 + f5^250 + d5^250,
250`;

const winMusic = tune `
125: a4-125 + c5^125 + e5~125 + e4/125,
125,
125: a4-125 + c5^125 + e5~125 + e4/125,
125: a4-125 + c5^125 + e5~125 + e4/125,
125: a4-125 + c5^125 + e5~125 + e4/125,
125,
125: b4-125 + d5^125 + f5~125 + f4/125,
125,
125: a4-125 + c5^125 + e5~125 + e4/125,
125,
125: b4-125 + d5^125 + f5~125 + f4/125,
125,
125: c5-125 + e5^125 + g5~125 + g4/125,
2375`;



setLegend(
  [ player, bitmap`
................
................
................
.......3........
.....33.333.....
....3.....33....
....3.6.6..3....
....3......3....
....3......3....
....33....3.....
......33333.....
......3...3.....
....333...333...
................
................
................`],
  [ player2, bitmap`
................
................
................
.......6........
.....66.666.....
....6.....66....
....6.4.4..6....
....6......6....
....6......6....
....66....6.....
......66666.....
......6...6.....
....666...666...
................
................
................`],
  [ player3, bitmap`
................
................
................
.......4........
.....44.444.....
....4.....44....
....4.5.5..4....
....4......4....
....4......4....
....44....4.....
......44444.....
......4...4.....
....444...444...
................
................
................`],
  [ player4, bitmap`
................
................
................
.......5........
.....55.555.....
....5.....55....
....5.3.3..5....
....5......5....
....5......5....
....55....5.....
......55555.....
......5...5.....
....555...555...
................
................
................`],
  [ box, bitmap`
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
  [ boxInvert, bitmap`
................
................
................
...DDDDDDDDDDD..
...D....D....D..
...D....D....D..
...D....D....D..
...D....D....D..
...DDDDDDDDDDD..
...D....D....D..
...D....D....D..
...D....D....D..
...D....D....D..
...DDDDDDDDDDD..
................
................`],
  [ goal, bitmap`
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
  [ goalInvert, bitmap`
................
................
................
....333333......
...33....33.....
...3......3.....
...3.......3....
...3.......3....
...3.......3....
...33......3....
....3......3....
....33....33....
.....333333.....
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
0000000000000000`],
  [ boxBreaker, bitmap `
................
....99999999....
...9999999999...
..999999999999..
.9999......9999.
.999........999.
.999........999.
.999........999.
.999........999.
.999........999.
.999........999.
.9999......9999.
..999999999999..
...9999999999...
....99999999....
................`],
  [ killPlayer, bitmap `
................
....11111111....
...1111111111...
..111111111111..
.1111......1111.
.111........111.
.111........111.
.111........111.
.111........111.
.111........111.
.111........111.
.1111......1111.
..111111111111..
...1111111111...
....11111111....
................`]
);

let level = 0;
const levels = [
  map `
p.gwwwwwwwg.s
..wwwwwwwww..
.biiiiwddddb.
..ddddwiiii..
wwwwwwwwwwwww
..iiiiwdddd..
.bddddwiiiib.
..wwwwwwwww..
q.gwwwwwwwg.r`,
  map `
.p....w....s.
.c..b.w.b..c.
.g..k.d.k..g.
......w......
wdwwdwdwdwwdw
......w......
.g..k.d.k..g.
.c..b.w.b..c.
.q....w....r.`,
  map  `
p....w....s
.....w.....
...ckw..b..
.....w..g..
wwwwwwwwwww
.....wk..c.
....gw.....
..b..w.....
q....w....r`,
  map `
pwwwwiwwwwwwwwwwwi
....w.....w.......
.iw.w.iww.i.iwwwi.
.w..w...w...w.w...
.iwwwi..iiw.w.w.iw
..w..w....w...w.w.
i.w.wi.wi.iwwww...
....w...w...w.w.ww
.wwwi.i.iwwwi.w...
......w....w..w...
wwwwwwww.wwi.iwwib
q.r.sw.........w.g`,
  map `
piiiiiiiiiiiiiiiii
....i.....i.......
.ii.i.iii.i.iiiii.
.i..i...i...i.i...
.iiiii..iii.i.i.ii
..ig.i....i...i.i.
i.ibii.ii.iiiii.bd
....i...i.ckiki.ii
.iiii.i.iiiiici...
......i....i..i...
wwwwwiii.iii.iiiib
q.r.sw.........i.g`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, player2, player3, player4, box, boxInvert, wall ]);

setPushables({
  [player]: [box, boxInvert, player],
  [player2]: [box, boxInvert, player2],
  [player3]: [box, boxInvert, player3],
  [player4]: [box, boxInvert, player4],
  [box]: [box, boxInvert, player, player2, player3, player4],
  [boxInvert]: [box, boxInvert, player, player2, player3, player4]
});

// START - PLAYER MOVEMENT CONTROLS

let playback = playTune(backgroundMusic, Infinity)

onInput("i", () => {
  if (playback) playback.end()
});

onInput("k", () => {
  if (playback) {
    playback.end()
    playback = playTune(backgroundMusic, Infinity)
  }
});

onInput("s", () => {
  getFirst(player).y += 1;
  getFirst(player2).y -= 1;
  getFirst(player3).y -= 1;
  getFirst(player4).y += 1;
  if (stepNum === 0) {
    playTune(walking1)
    stepNum += 1; 
  } else if (stepNum === 1) {
    playTune(walking2)
    stepNum -= 1; 
  }
});

onInput("d", () => {
  getFirst(player).x += 1;
  getFirst(player2).x += 1;
  getFirst(player3).x -= 1;
  getFirst(player4).x -= 1;
  if (stepNum === 0) {
    playTune(walking1)
    stepNum += 1; 
  } else if (stepNum === 1) {
    playTune(walking2)
    stepNum -= 1; 
  }
});

onInput("w", () => {
  getFirst(player).y -= 1;
  getFirst(player2).y += 1;
  getFirst(player3).y += 1;
  getFirst(player4).y -= 1
  if (stepNum === 0) {
    playTune(walking1)
    stepNum += 1; 
  } else if (stepNum === 1) {
    playTune(walking2)
    stepNum -= 1; 
  }
});

onInput("a", () => {
  getFirst(player).x -= 1;
  getFirst(player2).x -= 1;
  getFirst(player3).x += 1;
  getFirst(player4).x += 1;
  if (stepNum === 0) {
    playTune(walking1)
    stepNum += 1; 
  } else if (stepNum === 1) {
    playTune(walking2)
    stepNum -= 1; 
  }
});



// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
    const targetNumber = tilesWith(goal).length + tilesWith(goalInvert).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length + tilesWith(goalInvert, boxInvert).length;

  const breakCovered = tilesWith(boxBreaker, box).length + tilesWith(boxBreaker, boxInvert).length + tilesWith(killPlayer, player).length;

  if (breakCovered > 0) {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    }
  }
  
  if (numberCovered === targetNumber) {
    // increase the current level number
    level += 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      if (playback) playback.end()
      playTune(winMusic)
    }
  }
});