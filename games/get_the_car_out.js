/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

// define the sprites in our game
const player = "p";
const box = "o";
const ball = "b"
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
....033333330...
....033333330...
.....3333333....
....033333330...
....033333330...
.....3366633....
.....3366633....
.....3366633....
.....3366633....
.....3366633....
.....3366633....
....033666330...
....033333330...
...33333333333..
...33333333333..
................`],
  [ box, bitmap`
................
................
.............33.
...00....00..33.
...33333333..33.
...333333333.33.
...366666663333.
...366666663333.
...366666663333.
...333333333.33.
...33333333..33.
...00....00..33.
.............33.
................
................
................`],
  [ ball, bitmap`
.00000000000000.
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
.00000000000000.`],
  [ goal, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwwwwwwwwwwww
wb.............w
w..p...p...p...w
wo.p.p.p.p.p.p.g
w....p...p...p.w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
wb................w
w.p..pp...p...p...w
w.p..pp..pp...p...w
wop.p.p.p.p.p.p.p.g
w...p..pp...pp..ppw
w...p..pp...p...p.w
w.................w
wwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
wb...................w
w....................w
w.p...p..............w
w.p...p.....p.p.p.pp.w
wop...p...pp..p.pp...g
w...p...p............w
w...p...p............w
w...p...p............w
w....................w
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwww
wb.......w
w..p.....w
wo.pp.pp.g
w...p.p..w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wb.......w
w.p.p.p..w
wopp.p...g
w........w
w.......pw
wwwwwwwwww`,
  map`
wwwwwwwwwww
wb........w
w.........w
w.pppp..ppw
wop.p.p.ppg
w.........w
w.........w
wwwwwwwwwww`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box,  wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [ box]: [ box],
    [box]: [ box ]
});

// inputs for  ball  movement control
onInput("k", () => {
  getFirst(ball).y += 1; // positive y is downwards
});

onInput("i", () => {
    getFirst(ball).y -= 1;
});

onInput("l", () => {
    getFirst(ball).x += 1;
});

onInput("j", () => {
    getFirst(ball).x -= 1;
});

// inputs for  player movement cont
        
    onInput("s", () => { 
      getAll(player).forEach((item, index) => {          
        if (getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
          item.y += 1; // positive y is downwards
          getFirst(ball).y += 1; // positive y is downwards
        }
      })
    });

    onInput("w", () => { 
         getAll(player).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.y -= 1; 
            getFirst(ball).y -= 1; 
          }
         })
    });
     
    onInput("d", () => {
        getAll(box).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.x += 1;
            getFirst(ball).x += 1;
          }
        })
    });

    onInput("a", () => {
        getAll(box).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.x -= 1; 
            getFirst(ball).x -= 1; 
          }
        })
    });
afterInput(()=>{
  console.log(tilesWith(goal, box).length)
  if (tilesWith(goal, box).length>0) {
    // increase the current level number
      level = level + 1;
    if (levels[level] !== undefined) {
        setMap(levels[level]);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }    
})

  // make sure the level exists before we load it

  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level


    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
