/*
@title: Time puzzle
@author: Akeell
@tags: ['puzzle','timed']
@addedOn: 2022-10-13
*/

/* intructions: 
Get the box to the green square on every level before the time ends
Complete all levels as fast as you can
Controls: W = up
          S = down
          A = left
          D = right
          J = restart level
*/ 


const player = "p";
const box = "b"; 
const square = "s";
const wall = "w";


setLegend(
  [ player, bitmap`
................
................
................
................
.....00000......
....0222220.....
....0202020.....
....0222220.....
....0222220.....
.....00000......
.......0........
.....00000......
.......0........
.......0........
......0.0.......
.....0...0......`],
  [box, bitmap`
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
LLLLLLLLLLLLLLLL`], 
  [square, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`], 
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
0000000000000000`], 
);

setSolids([box, player, wall]);

let level = 0;
const levels = [
  map`
p.b.s
..b.s
..b.s
..b.s
..b.s
..b.s`,
  map`
.p....
.b.b.s
......
..ss.b
......`,
  map`
..sps.
...s..
w.w..w
....b.
wb...w
...b..
......`, 
  map`
w.sssss.w
w...p...w
www...www
.........
..bbbbb..
.........
.........`, 
  map`
.........
.b..b..b.
....w....
...sss...
.bwspswb.
...sss...
....w....
.b..b..b.
.........`, 
  map`
s............
wwwwwwwwwww..
.............
.............
...wwwwwwwwww
.............
.............
wwwwwwwwwww..
.............
.............
..wwwwwwwwwww
.........b...
............p`, 
];

setMap(levels[level]);

setPushables({
  [ player ]: [box],
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

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
}
});


var tempototal = 100;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText(); 
    addText(""+tempototal, { y: 1 , color: color`3` });
      if(tempototal <= 0){ 
        clearInterval(tempodescendo);
        clearTile(getFirst(player).x,getFirst(player).y);
        //clearText() here before 
        addText("Try Again!", { y: 1 , color: color`3` });
    }
    },1000);

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(square).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(square, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      clearInterval(tempodescendo);
    }
   }
});
