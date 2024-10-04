/*
@title: Maze
@author: Akeell
@tags: ['puzzle']
@addedOn: 2022-10-06
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
const block = "b"

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
  [block, bitmap`
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
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

setSolids([player, wall, block]);

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
  map`
........w....
wwwwww..w.ww.
p.........w..
ww..w.w...w..
....wwwwwww..
.w...w....w..
.wwwwwt.w.w..
.w...wwww.w..
.w...w..w.w..
.w.w.w..w....
.w.w.w..wwww.
.......w.....`, 
  map`
.tw......w......
.ww.wwwwww.wwww.
.........w......
w....ww.....w..w
w.w.w..wwwwwww..
wwwwww.ww....w..
.......w...wpw.w
.ww.w..w.w.www.w
....ww..........
........w.w...ww
..w.w..w...w..w.
.w.w.ww.........
.......wwwwwwwww`,
  map`
....w..w...wt.....
.ww......w..wwwww.
.w...ww.wwww......
.www..ww..ww.ww.ww
.........w.w......
www....www..w..www
.pw.www.....w..w..
w.w..wwww.w.w..w..
..........w...ww..`,
  map`
p..w.w..
ww.w.b..
...w.b..
.www..w.
...b..w.
.w.w..wt`, 
  map`
p...b....w.................
.www.www..www..wwwww.wwww..
.w..ww..w.w..w...w...w....w
.w...w..w.w..w...w..ww....w
.www.www..w.w....w.w.w.www.
...w.w..w.ww.....ww..w...w.
...w.w..w.w.w.b..w...w..tw.
bwww.w.w..w..w.wwwww.wwwww.
......w.w..w.........w....w
.wwwwww...w..w..w...w.ww...
....w.wwww..w.....w.....w..
.......w..wwwwwww......w.w.
wwwww....w....w.wwww.w...w.
.w....w....w...........w...`,
  
];

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [block],
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
//End - Teleport Feature 



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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
//End - Teleport Feature 
