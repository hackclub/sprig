/*
@title: bobs_bad_apple
@author: L. Clark
@tags: ['puzzle']
@addedOn: 2023-03-01
*/

// Bob is trapped in a maze.
// Eat apples to get through the maze.
// w, a, s, d controls to move.
// There are pushable blocks.

const player = "p";
const wall = "w"
const background = "b"
const appl = "a"
const movypushy = "m"

setLegend(
  [ player, bitmap`
................
.....00000......
..00.0LL10.00...
..0L00F0F0010...
...0LLLLLL10....
....0666660.....
....0606060.....
...006CCC600....
..060C000C060...
..004DFDFD400...
...004FDF400....
....0000000.....
....0CFFFC0.....
....0F000F0.....
....060.060.....
....00...00.....`],
  [wall, bitmap`
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
FFFCFFFCFFFCFFFC
CCCCCCCCCCCCCCCC
CFFFCFFFCFFFCFFF
CFFFCFFFCFFFCFFF
CFFFCFFFCFFFCFFF
CCCCCCCCCCCCCCCC
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
FCFFFCFFFCFFFCFF
CCCCCCCCCCCCCCCC
FFCFFFCFFFCFFFCF
FFCFFFCFFFCFFFCF
FFCFFFCFFFCFFFCF
CCCCCCCCCCCCCCCC`],
  [background, bitmap`
FFLLLLLLLLLLLLFF
FLLLLLLLLLLLLLLF
LLFLLLLLLLLLLFLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLFLLLLLLLLLLFLL
FLLLLLLLLLLLLLLF
FFLLLLLLLLLLLLFF`],
  [appl, bitmap`
................
................
.......0.00.....
......0D00......
.......00.......
.......0........
.....00000......
....0333300.....
....0333330.....
....0333330.....
....0333330.....
.....00000......
................
................
................
................`],
  [movypushy, bitmap`
3333333333333333
33LLLLLLLLLLLL33
3L3LLLLLLLLLL3L3
3LL3LLLLLLLL3LL3
3LLL33333333LLL3
3LLL3LLLLLL3LLL3
3LLL3LLLLLL3LLL3
3LLL3LLLLLL3LLL3
3LLL3LLLLLL3LLL3
3LLL3LLLLLL3LLL3
3LLL3LLLLLL3LLL3
3LLL33333333LLL3
3LL3LLLLLLLL3LL3
3L3LLLLLLLLLL3L3
33LLLLLLLLLLLL33
3333333333333333`]
);

setSolids([player, wall, movypushy]);

let level = 0;
const levels = [
  map`
pwa
.w.
...`,
  map`
wwwwwaw
wpbw..w
wwbw..w
wbbw.ww
wbww..w
wbab.ww
wwwwwww`,
  map`
wwwwwwwwwwww
wabbbwbwbwbw
wwwbwwbbbbbw
wbbbbbbwbwww
wbwbwpbbbbbw
wwwbwwbwbbaw
wbbbbbbwbwbw
wbwwwbwwbbbw
wwwbbbbwbbww
wawbbwbwwbbw
wbbbbwawbbbw
wwwwwwwwwwww`,
  map`
wwwwwwwww
w...w...w
w.a.....w
w...w.a.w
wwwww...w
w...ww.ww
w.a.....w
w...w...w
w...w...w
ww.www.ww
w...w...w
w.p.w.a.w
w...w...w
wwwwwwwww`,
  map`
w.www
w...w
wmw.w
w.w.w
wpwaw
wwwww`,
  map`
wwwwwww
.wwwwww
m.m...w
.www.ww
pwww.aw
wwwwwww`,
  map`
pwwww..a..
mw..w.www.
.m..m..w..
.ww.wwwwmw
wwwwwwww.w
w..m.w.w..
ww.w...w..
a..wwwmww.
wwwww...m.`,
  map`
www.www
w.....w
a.wmw.a
www.www
w.....w
...a...
mww.wwm
.awpwa.
.wwwww.`,
  map`
wwwwwwwwwwwwwwwww
w...............w
w..w.w..w..w.w..w
w...w..w.w.w.w..w
w...w...w...ww..w
w...............w
w.......w.....w.w
w.w.w.w...ww..w.w
w.w.w.w.w.w.w...w
w..w.w..w.w.w.w.w
w...............w
wwwwwwwwwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);
setMap(levels[level]);

setPushables({
  [ player ]: [movypushy],
});

setBackground(background);
let applcount = 0;
redoapplcount();

// There are 2 tunes involved.
const melody = tune`
322.5806451612903: c4-322.5806451612903,
322.5806451612903: c4-322.5806451612903,
322.5806451612903: d4-322.5806451612903 + f4^322.5806451612903,
322.5806451612903: d4-322.5806451612903 + g4^322.5806451612903,
322.5806451612903: e4/322.5806451612903,
322.5806451612903: e4/322.5806451612903,
322.5806451612903: c4-322.5806451612903,
322.5806451612903: c4-322.5806451612903,
322.5806451612903: g4/322.5806451612903,
322.5806451612903: g4/322.5806451612903,
322.5806451612903: e4-322.5806451612903,
322.5806451612903: e4/322.5806451612903 + g4~322.5806451612903,
322.5806451612903: e4-322.5806451612903 + a4~322.5806451612903 + g4~322.5806451612903,
322.5806451612903: d4/322.5806451612903 + a4~322.5806451612903 + b4~322.5806451612903,
322.5806451612903: d4/322.5806451612903 + b4~322.5806451612903,
322.5806451612903: c4-322.5806451612903 + g4^322.5806451612903,
322.5806451612903: c4-322.5806451612903 + c5~322.5806451612903 + f4^322.5806451612903,
322.5806451612903: d4-322.5806451612903 + c5~322.5806451612903 + d5~322.5806451612903,
322.5806451612903: d4-322.5806451612903,
322.5806451612903: e4/322.5806451612903,
322.5806451612903: e4/322.5806451612903,
322.5806451612903: g4/322.5806451612903,
322.5806451612903: a4/322.5806451612903,
322.5806451612903: b4/322.5806451612903 + d5~322.5806451612903,
322.5806451612903: b4/322.5806451612903 + e5~322.5806451612903,
322.5806451612903: a4-322.5806451612903 + f5~322.5806451612903,
322.5806451612903: g4-322.5806451612903 + f5~322.5806451612903,
322.5806451612903: f4-322.5806451612903 + e5~322.5806451612903,
322.5806451612903: d4-322.5806451612903,
322.5806451612903: d4-322.5806451612903,
322.5806451612903: c4/322.5806451612903,
322.5806451612903: c4/322.5806451612903`
const melodywin = tune`
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: d4/283.0188679245283,
283.0188679245283: d4/283.0188679245283,
283.0188679245283: d4/283.0188679245283,
283.0188679245283: e4-283.0188679245283,
283.0188679245283: e4-283.0188679245283,
283.0188679245283: e4-283.0188679245283,
283.0188679245283: c5/283.0188679245283,
283.0188679245283: c5/283.0188679245283,
283.0188679245283: c5/283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: d4/283.0188679245283,
283.0188679245283: d4/283.0188679245283,
283.0188679245283: d4/283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: f4/283.0188679245283,
283.0188679245283: f4/283.0188679245283,
283.0188679245283: f4/283.0188679245283,
283.0188679245283: b5/283.0188679245283,
283.0188679245283: b5/283.0188679245283,
283.0188679245283: b5/283.0188679245283,
283.0188679245283: c4-283.0188679245283,
283.0188679245283: d4-283.0188679245283,
283.0188679245283: c4-283.0188679245283`
const playback = playTune(melody, Infinity) 

// Applcount resets the number of apples
// when bob is in the next level.
function redoapplcount() { 
  applcount = getAll(appl).length;
  addText(applcount.toString(), {
    x: 0, y: 0, color: color`F` 
  });
}

afterInput(() => {
  let bob = getFirst(player);
  let appls = getAll(appl);
  for (let i = 0; i < appls.length; i++) {
      
    if (bob.x === appls[i].x && bob.y === appls[i].y) {
      appls[i].remove();
      applcount--;
      addText(applcount.toString(), { 
        x: 0, y: 0, color: color`F` 
      });
      nextLevel();
    }
  }
});

// This makes bob go to the next level
// when he eats all the apples in each level.
function nextLevel() {
  if(applcount < 1) {
    level++;
    setMap(levels[level]);
    redoapplcount();
  }
  if(level===8) {
    playback.end();
    playTune(melodywin, 1);
  }
}

// Moves bob around.
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("d", () => {
  getFirst(player).x += 1
});
