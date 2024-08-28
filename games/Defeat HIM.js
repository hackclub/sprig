/*

@title: Defeat HIM
@author: Ethan R 
@addedOn: 2024-08-28
@tags: []

*/

// define the sprites 
const player = "p";
const box = "b";
const button = "u";
const wall = "w";


// assign bitmap art to each sprite
setLegend(
[ player, bitmap `
................
................
................
................
.......1........
.....11L11......
....11LLL11.....
.....12L21......
......L1L.......
......L1L.......
......000.......
......0.0.......
......0.0.......
................
................
................` ],
[ box, bitmap `
................
................
................
................
................
................
......4444......
.....444444...F.
....44444444.FFF
....44444444FF.F
....DDDDDDDDF..F
....DDDDDDDDF.FF
....44444444FFF.
....44444444F...
....DDDDDDDD....
....DDDDDDDD....` ],
[ button, bitmap `
................
................
................
................
......000.......
....0000000.....
...033333330....
...033333330....
..00300003300...
..03000000030...
..03330033330...
..03330033330...
..03330033330...
..00000000000...
................
................` ],
  
  
[wall, bitmap `
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCLCCCCCCLCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCLCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
);


// create the game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwww
w....uw
w.....w
w.pb..w
w.....w
wwwwwww`,
  map`
wwwwwww
wu....w
w.....w
w..b..w
w....pw
wwwwwww`,
  map`
wwwwwww
wwwu..w
wpww..w
w..b..w
w.....w
wwwwwww`,
  map`
wwwwwww
w....pw
w.wwwww
w..b.uw
w..w.ww
wwwwwww`,
  map`
wwwwwww
w....pw
ww....w
wwwb.uw
www...w
wwwwwww`,
  map`
wwwwwww
wwwwwww
w.w.w.w
wpb..uw
w.b..uw
wwwwwww`
];


// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
    [player]: [ box ],
    [box]: [ box ]
});


// inputs for the player movement 

onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
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






// input to reset the level
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
  const targetNumber = tilesWith(button).length;

  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(button, box).length;


  
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
      addText("You Win!", { x:3, y: 2, color: color`0` });
    }
  }
});
