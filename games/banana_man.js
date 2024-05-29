/*
@title: Banana Man
@tags: []
@img: ""
@addedOn: 2024-05-29
@author: Zomb1ePP
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

const myTune = tune`
606.060606060606,
303.030303030303: F4~303.030303030303 + E4/303.030303030303 + C4^303.030303030303 + D4^303.030303030303,
303.030303030303: G4~303.030303030303 + C4~303.030303030303 + E4/303.030303030303 + D4^303.030303030303 + F4-303.030303030303,
303.030303030303: F4~303.030303030303 + E4/303.030303030303 + D4^303.030303030303 + C4^303.030303030303,
3939.393939393939,
303.030303030303: D4^303.030303030303 + F4~303.030303030303 + E4/303.030303030303 + C4^303.030303030303,
303.030303030303: D4^303.030303030303 + C4~303.030303030303 + G4~303.030303030303 + F4-303.030303030303 + E4/303.030303030303,
303.030303030303: D4^303.030303030303 + C4^303.030303030303 + F4~303.030303030303 + E4/303.030303030303,
3333.333333333333`;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
...........CCC..
..........CCCCC.
..........CCCCC.
...........666..
..........66666.
.........676676.
........606666..
.......6600006..
......6666666...
.....6666666....
....66666666....
...66666666.....
...606660.......
....0...0.......
...00..00.......`],
  [ box, bitmap`
....CCCCCCCC....
...CCCCCCCCCC...
..CC333CCCCCCC..
..CCC3CCCCCCCC..
..CCC3CCCCCCCC..
..CCC3CCCCCCCC..
..CCCC3CC3CCCC..
..CCCC33C3CCCC..
..CCCC3C33CCCC..
..CCCC3CC3CCCC..
..CCCCCCCC333C..
..CCCCCCCCC3CC..
..CCCCCCCCC3CC..
..CCCCCCCCC3CC..
...CCCCCCCCCC...
....CCCCCCCC....`],
  [ goal, bitmap`
................
......CCCCC.....
.....CCCCCCC....
....CCCCCCCCC...
...CC6666666CC..
.66C666666666C66
.66C620666206C66
..6C600666006C6.
...C688666886C..
....C6666666C...
.....CC666CC....
.......CCC....6.
......CCCCC...C.
......CCCCC..CC.
.....CCCCCCCCC..
.....CC6C6CC....`],
  [ wall, bitmap`
0000000000000000
3333033330333303
3333033330333303
0000000000000000
3033330333303333
3033330333303333
0000000000000000
3333033330333303
3333033330333303
0000000000000000
3033330333303333
3033330333303333
0000000000000000
3333033330333303
3333033330333303
0000000000000000`]
  
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwww
wp...w
w.wwbw
w.ww.w
w.b.gw
wwwwww`,
  map`
wwwwwww
wpwwwww
w.w.gww
w.ww.ww
w...bww
www..ww
wwwwwww`,
  map`
wwwwwwww
wbbbbbbw
wwwwwwww
wp..gwww
w.b...ww
ww.ww.ww
ww....ww
wwwwwwww`,
  map`
wwwwwwwww
wbw....gw
wbw..wwww
wwww.wwww
wp....b.w
www.....w
wbbwwwwww
wbbbbbbbw
wwwwwwwww`,
  map`
wwwwwwwwww
www..wwwww
www......w
w........w
w....ww.ww
w.wwwww.ww
wgwbw.b.ww
wwwww...ww
wp....wwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wbbbbbwwpw
wwwwww.b.w
wwwww.b.ww
wwww.b.www
www.b.wwww
w..w.wwwww
w.b..wwwww
wg.wwwwwww
wwwbbbbbbw
wwwwwwwwww`,
  map`
wwwwwwwwwwww
wg.wwpwww.gw
w..ww.www..w
w.....www..w
w.wwwwwwww.w
w....bb....w
w....bb....w
w.wwwwwwww.w
w..wwwwww..w
w..wwwwww..w
wg.wwwwww.gw
wwwwwwwwwwww`,
  map`
wwwwwwwwwww
wwgwwgwwgww
wwbwwbwwbww
wwbwwbwwbww
wwbwwbwwbww
wp........w
wwbwwbwwbww
wwbwwbwwbww
wwbwwbwwbww
wwgwwgwwgww
wwwwwwwwwww`,
  
  
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);



setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});



// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
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
  for(let i = 0; i < 10; i++){
  playTune(myTune);
}


    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined){
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`7` });
    }
  }
});
