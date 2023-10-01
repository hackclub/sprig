/*
@title: Maze Runner
@author: Mohamad

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const bomb = "b";
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
  [ bomb, bitmap`
................
................
...3....1...3...
....3..1...3....
.......1........
......0000......
.....000000.....
.....000000.....
.....000000.....
.....000000.....
......0000......
...3........3...
..3..........3..
................
................
................`],
  [ goal, bitmap`
........DD......
.......D........
.......D........
...DDDDDDDDDD...
...D33333333D...
...D33333333D...
...D30333303D...
...D33333333D...
...D33330333D...
...D33333333D...
...D33033333D...
...D33333033D...
...D33333333D...
...DDDDDDDDDD...
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

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
........w.wgww
w.wwwwbww.w...
w..ww...w.www.
ww.ww.w.w.w.w.
w..ww.w.w.w...
....w.w.w.ww.w
pww.w.w....w..
.w..w.wwww.ww.
.w.......w.w..
.wwwwwww.w.w.w
.......w.w...w`,
  map`
pw...wwwwwwwww
..w..w...b...w
...w.w.ww.wwww
....ww.w....ww
.ww......w...w
.w..wwwwww.w..
.w.......w.w.w
.w.wwwww.w.w.w
.w.....w..bw.w
.wwwww.wwwww.w
...........b.g`,
  map`
wwwwwwwwwwwwww
wb...w...b...w
w..w...ww.wwww
p.w.ww.w....ww
w.w.....bwb..w
..w.w.w.ww.w.g
b.wbw.w..w...w
w...w.w.ww.w.w
.w..w.w....w.w
.w.wwwww.www.w
...........b..`,
  map`
p.............
wwwwwwwww.www.
......b.wbw...
.w.w..w.w.w.ww
.w.wwb..www..w
.w..w.w......w
.w....w.wwwwww
.wwww...w....g
.wwwwbwwwbwww.
.bw...w...wbb.
....w...b.....`,
  map`
p.b....b.bbb..
b.b..b...bgb.b
..bbbbb.bb.b..
b.......b..bb.
.b..bb.b.b..bb
bb.b..b....bb.
bb..b.bb.b.b..
.........b..b.
b.bbbb.bbbb.b.
bb........b.b.
....bbbbb.....`,
  map`
.w..w......w...w......b
....bw....w......wwww..
.w.b..ww....b.ww.b.....
.b....ww.w.w...w....w.w
....w.w..w..b.b...w....
pww......w.....bb..b..w
.www...ww.ww.ww........
.w....bw.w.ww.....wb.w.
.w.....w...ww........w.
.w..b.....wwwwwbwww....
.w..w.w....ww...w.www..
www.w.....www.ww....b..
......ww.....ww..bw..b.
wwwwwww..b..ww....wb.w.
....ww......w.ww.w..b..
.b.w.w...b.w.......b...
..w.wb..www.w.....b..w.
.w.....w.....w.w.b.ww..
ww.w.......w.w.w...wg..
..w..b...b.w.w..w.ww...
..w...w.........wwww..b`,
  map`
.....ww....b.w.w.ww....
..wb.w.b....ww..w.....w
..w..w........ww.b..w..
..w..w...w.wb.....w...w
..b..w.ww..w..b.w.....w
p..w..bw.bww...ww.w...w
.ww..w...ww..ww......w.
.b....w..b.....b.....w.
.w......wb.w....www..w.
.wwww.w..w..w..w....w..
..w.w.w..www...wbww.w..
w...wb...w.............
...w..w..w...b.w..w.w..
w.ww..b.w.w..w....w..w.
..b..w........ww.w..w..
.....w.w..w.w.....w.w..
.b...w.w.ww....w.w...w.
w....w.w..ww.....w.w.b.
.w....ww..bw.w..w.w..bb
........b..w.w.ww....gb
..w..ww....w.w.wwww.bbb`,




  
  

];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
});

onInput("a", () => {
  getFirst(player).x -= 1; // positive y is downwards
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
  const boxedCovered = tilesWith(goal, player).length;
  const bombCovered = tilesWith(bomb, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (bombCovered === 1) {
    clearText("")
    addText("Game Over!",  { y: 4, color: color`3` })
    setMap(levels[0])
    setTimeout(function(){
      clearText("")
    }, 2000); 
  }
  
  if (boxedCovered === 1) {
    // increase the current level numberds
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Win!", { y: 4, color: color`3` });
    }
  }
});
