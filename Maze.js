/*
@title: Maze
@author: Akeell
*/

/*instructions
Get your character to the green teleporter to get to the next level. 
Controls: W = up
          S = down
          A = left
          d = right
          J = restart
*/



const player = "p";
const wall = "w"; 
const teleport = "t"; 

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
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
0000000000000000` ], 
  [teleport, bitmap`
................
................
................
..44444444444...
..4....D....4...
..4.77.D.33.4...
..4.77.D.33.4...
..4....D....4...
..4DDDDDDDDD4...
..4....D....4...
..4.66.D.99.4...
..4.66.D.99.4...
..4....D....4...
..44444444444...
................
................`], 
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
pw...
.w.w.
.w.w.
.w.w.
...wt`,
  map`
pw.w....w.
.w....w...
.w.www..w.
.w...w..w.
.w.w.ww.w.
.w......w.
...wwww.wt`,
  map`
pw.........
.w.wwwwwww.
.w.wwwww...
.w.....w..w
.wwwww.w.w.
.......w...
..wwwwwwww.
.wt........`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [],
});

//Start - Movement
onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});


onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});
//End - Movement 

//Teleport feature 
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(teleport).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(teleport, player).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: [255, 0, 0] });
    }
  }
});
//End - Teleport Feature 
