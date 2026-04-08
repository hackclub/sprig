/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Cargo Boom
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p";
const box = "2";
const wall2 = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
......0000......
.....011110.....
....011LL110....
....001LL100....
....0L0000L0....
....0L3333L0....
....03999930....
....09000090....
....03990930....
....0L3333L0....
....0LLLLLL0....
.....0LLLL0.....
......0000......
................`],
  [ wall2, bitmap`
..00........00..
..11..1111..11..
11LL11F00F11LL11
LLLLL00FF00LLLLL
LLLL00000000LLLL
0F0F0F0F0F0F0F0F
0F0F0F0F0F0F0F0F
F0F0F0F0F0F0F0F0
F0F0F0F0F0F0F0F0
0F0F0F0F0F0F0F0F
0F0F0F0F0F0F0F0F
LLLL00000000LLLL
LLLLL00FF00LLLLL
11LL11F00F11LL11
..11..1111..11..
..00........00..`],
  [ box, bitmap`
................
................
................
................
................
................
................
.......00.......
....00000000....
....09333390....
....09003090....
....09330390....
....00000000....
................
................
................`], 
  [ goal, bitmap`
................
................
................
................
................
................
................
...LL9999LLLL...
...L333333LL77..
...L900309LLL77.
..CL333033LLLLLL
..CLL9999LLLLLLL
...L00LLLLL00LLL
....00.....00...
................
................`],
  [ wall, bitmap`
.1LLLFF00FFLLL1.
.1LLL00FF00LLL1.
001LLFF00FFLL100
001LL00FF00LL100
.1LLLFF00FFLLL1.
.1LLL00FF00LLL1.
..1LLFF00FFLL1..
..1LL00FF00LL1..
..1LLFF00FFLL1..
..1LL00FF00LL1..
.1LLLFF00FFLLL1.
.1LLL00FF00LLL1.
001LLFF00FFLL100
001LL00FF00LL100
.1LLLFF00FFLLL1.
.1LLL00FF00LLL1.`],
  
);

setSolids([])

let level = 0; // this tracks the level we are on
const levels = [
  map`
p.w..g..
..w.....
.bbbb.bb
....w...
bb..2...
....w...`,
  map`
p.....
bbb.bb
......
.bbbbb
......
bbb.bb
......
w.bbb.
w.wgw.
w.w.w.
..w.w.
.bb2bb
..w..w
.bbb.w
......`,
  map`
..2.gw.........
b.bbbbbbbbwwww.
..w.......w....
w.w.wb.bbbw.ww.
w.w.w.....w.w..
w.w.w.wbw.w.w..
w.w.w.w.w.w.w.w
..w.w.w.w.w.w.w
.ww.w.....w.w.w
.ww.wbbb.bw.w.w
.ww.w.......w..
.ww.wbbbbbbbb.b
.........wp....`,
  map`
bbbbbbbb.........bb....bb
.......b.bbbbbbb....bbbbg
.b.bbb.b...b...bbbb....b.
.b.b.b.bbb.b.bbb..bbbb.b2
pb...b...............b...`,
  map`
gw.w....
.w.w.pw.
.w.wbbw.
........
2.w..w..
.....w..
.w.wbbbb
.w.w....`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, wall2 ]); // other sprites can not go inside of these sprites

setPushables({
  [ player ]: [box]
})

onInput("s", () => {
    getFirst(player).y += 1; // positive y is downwards
});

onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
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
      addText("You delivered!", { y: 4, color: color`9` });
    }
  }
});
