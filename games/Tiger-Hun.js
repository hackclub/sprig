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
const myTune = tune`...`;
const grass = "s";
const song = tune`
55.04587155963303: G4-55.04587155963303,
55.04587155963303: G4/55.04587155963303 + A4-55.04587155963303,
55.04587155963303: A4/55.04587155963303 + B4-55.04587155963303,
55.04587155963303: B4/55.04587155963303 + C5-55.04587155963303,
55.04587155963303: C5/55.04587155963303,
1486.2385321100917`;
const melody = tune`
54.4464609800363: G4-54.4464609800363,
54.4464609800363: G4/54.4464609800363 + A4-54.4464609800363,
54.4464609800363: A4/54.4464609800363 + B4-54.4464609800363 + G4^54.4464609800363,
54.4464609800363: B4/54.4464609800363 + C5-54.4464609800363 + A4^54.4464609800363,
54.4464609800363: C5/54.4464609800363 + B4^54.4464609800363,
54.4464609800363: E5^54.4464609800363,
54.4464609800363: E5^54.4464609800363 + F5^54.4464609800363,
54.4464609800363: F5^54.4464609800363,
1306.7150635208711`;
// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
..000000000000..
..09999CC99990..
..09099CC99090..
..09920CC02990..
..09900CC00990..
..0CC228822CC0..
..0CC222222CC0..
..022200002220..
..020000000020..
..02222CC22220..
..009999999900..
..000000000000..
................
................
................`],
  [ goal, bitmap`
................
................
................
.......F0.......
......F0FF......
.....CFF0FC.....
.....CC0FCC.....
....CCCC0CCC....
....CCC0CCCC....
....FCCC0CCF....
....FFC0FCFF....
....FFFF0FFF....
.....FF0FFF.....
......FF0F......
................
................`],
  [ wall, bitmap`
3333399999966666
3339333399996666
3339933333339666
6933333333333966
6633999999933966
3933966699999966
3333339996666666
3333663399666666
3996693339966666
3933333399666666
3939996666666666
3336666666666666
3396669999996666
3999993333399666
3333333333399666
3399933339996666`],
  [ box, bitmap`
0000000000000000
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0000000000000000
0000000000000000
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0000000000000000`],
   [ grass, bitmap`
4444444444444444
44DDDDD444DDDDD4
444DDDD4444DDDD4
4D44DDD44D44DDD4
4DD44DD44DD44DD4
4DDD44444DDD44D4
4DDDDD444DDDDD44
4444444444444444
4444444444444444
444DDDD444DDDDD4
4DD4DDD444DDDDD4
4DDD4DD44D44DDD4
4DDDD4D44DDD4DD4
4DDDD4444DDD44D4
4DDDDD444DDDDD44
4444444444444444`],
);
setBackground("s");
// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
p...
.b.g
....`,
  map`
.....
...bp
.ww..
.g...`,
  map`
wwwwww.
.....p.
g..b...
...w.ww
.wb.w..
..g..ww
.wwwwww`,
  map`
.w.....
...b..g
.p...w.
...w.ww
...ww..
..ww.ww
ww.wwww`,
  map`
.....w..
ww...ww.
.wwww.ww
...ww..w
...w.g..
.p.w....
.b.....w
......w.`,
  map`
..w...g
w......
.w.....
..w.bw.
......w
pw..w..
..w..w.`,
  map`
..w..w...
...w.wwgw
.ww...g.w
.ww.....w
w..w.....
.p.......
......bb.
.........
.www....w`,
   map`
p...
.b.g
....`,
  map`
g.....
..b...
..b..p
..b...
......
g....g`,
  map`
w......
w....p.
w...w..
w...w.w
w..b..w
w.w.w.w
wgw.w.w`,
  map`
....www
..bwwww
.p....g
..bwwww
......g
...wwww
....www`,
  map`
.wwwww..
..g.....
..ww....
....bgb.
........
.p.w..w.
www..www
.w..www.`,
  map`
..w...g
..g....
....b..
..w.b..
......w
p...www
...wwww`,
  map`
.........
....p....
.ww...ww.
.........
....b....
.w..g..w.
.ww...ww.
...www...
.........`,
];

//key and door

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);
setSolids([ player, box, wall]); // other sprites cannot go inside of these sprites
setPushables({
    [box]: [box],
  [player]: [box],
});
// allow certain sprites to push certain other sprites

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
    playTune(myTune);
});

onInput("w", () => {
  getFirst(player).y += -1; // positive y is downwards
    playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x += -1;
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
const score = 0;
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
    playTune(melody);
    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      playTune(song);
      addText("you win!", { y: 10, color: color`8` });
    }
  }
  const playerTile = getTile(getFirst(player).x, getFirst(player).y);

});


