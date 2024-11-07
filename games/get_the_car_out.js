/*
@title: Get The Car Out
@author: miqdad1234
@tags: []
@addedOn: 2024-08-05
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

// define the sprites in our game
const player = "p";
const box = "o";
const ball = "b"
const goal = "g";
const wall = "w";
const vplayer = "n";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
..33333333333...
..33333333333...
...033333330....
...033666330....
....3366633.....
....3366633.....
....3366633.....
....3366633.....
....3366633.....
....3366633.....
...033333330....
...033333330....
....3333333.....
...033333330....
...033333330....`],
  [ box, bitmap`
................
................
.............66.
...00....00..66.
...66666666..66.
...666666666.66.
...679797976666.
...697979796666.
...679797976666.
...666666666.66.
...66666666..66.
...00....00..66.
.............66.
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
0000000000000000
2222222222222222
0000000000000000
0000000000200000
0000000000020000
0000000000002000
0000000000000200
2222222222222220
0000000000000200
0000000000002000
0000000000020000
0000000000200000
0000000000000000
2222222222222222
0000000000000000
0000000000000000`],
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
CCCCCCCCCCCCCCCC`],
  [ vplayer, bitmap`
................
................
.............33.
00.00......0033.
333333333333333.
333333333333333.
333336666666333.
333336666666333.
333336666666333.
333333333333333.
333333333333333.
00.00......0033.
.............33.
................
................
................`],
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwwww
wb.pnnnw
w..p..pw
wo.p.ppg
w..p..pw
w..n..nw
wwwwwwww`,
  map`
wwwwwwwww
wb.nnp..w
w..ppp..w
wo.ppp..g
w..ppnn.w
w..p....w
wwwwwwwww`,
  map`
wwwwwwwwww
wbpnnnnnpw
w.p.....pw
w.p..nn.pw
wop..p..pg
w.p..p..pw
w.nnnp..nw
w....n..pw
wwwwwwwwww`,
  map`
wwwwwwwww
wbnnnpnnw
w..n.pnpw
wo.p.pppg
w..p.pppw
w..nnnppw
w....nnnw
wwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wb.nnnpn.nn.n.w
w..p..p.p.p.p.w
wo.p..p.p.p.p.g
w..pnnnnp.p.p.w
w.nnn...pnnnp.w
wwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwww
wbnnnnnnnp.nnnw
wnnnnn.p.p..p.w
wo.p.p.p.p..p.g
w..p.p.p.p.nnnw
w..p.p.nnn....w
wnnpnnnp.p....w
wwwwwwwwwwwwwww`,
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box,  wall ,vplayer]); // other sprites cannot go inside of these sprites

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

var move = 14
        
    onInput("s", () => { 
      getAll(player).forEach((item, index) => {          
        if (getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
          item.y += 1; // positive y is downwards
          getFirst(ball).y += 1; // positive y is downwards
          move -=1
        }
      })
    });

    onInput("w", () => { 
         getAll(player).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.y -= 1; 
            getFirst(ball).y -= 1;
             move -=1
          }
         })
    });
     
    onInput("d", () => {
        getAll(box).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.x += 1;
            getFirst(ball).x += 1;
             move -=1
          }
        })
    });

    onInput("a", () => {
        getAll(box).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.x -= 1; 
            getFirst(ball).x -= 1; 
             move -=1
          }
        })
    });

 onInput("d", () => {
        getAll(vplayer).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.x += 1;
            getFirst(ball).x += 1;
             move -=1
          }
        })
    });

    onInput("a", () => {
        getAll(vplayer).forEach((item, index) => {          
          if ( getFirst(ball).x ===  item.x && getFirst(ball).y === item.y){
            item.x -= 1; 
            getFirst(ball).x -= 1;
            move -=1
          }
        })
    });

afterInput(()=>{
  clearText()
  if(move===0){
   addText("you lose!", { y: 4, color: color`0` }); 
    move=14
    setMap(levels[0])

  }
  addText("moves:" + move, { y: 1, color: color`2` }); 
  console.log(tilesWith(goal, box).length)
  if (tilesWith(goal, box).length>0) {
    // increase the current level number
      level = level + 1;
    if (levels[level] !== undefined){
        setMap(levels[level]);
        move=8* (level + 1)
        addText("moves:" + move, { y: 1, color: color`2` }); 
    }
    else {
      addText("you win!", { y: 4, color: color`6` });
    }
  }    
});


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
