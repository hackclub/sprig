/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: car park escape
@author: miqdad1234
@tags: ['puzzle']
@addedOn: 2024-11-1
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
.....0003693....
.....0336933....
......36693.....
.....000333.....
....03303223....
....00033723....
....33333223....
....33363723....
....3323323.....
....322333......
....32233.......
....32233.......
....03233.......
....0036........
................`],
  [ box, bitmap`
................
................
................
................
.77..7777.......
.D77722227......
.4DD7252527.....
.7447777777777..
.07400776777776.
.07707077222227.
.00.07077722270.
.....0077777700.
................
................
................
................`],
  [ ball, bitmap`
0000000000000000
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
0000000000000000`],
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
DD44DD44DD44DD44
DD44DD44DD44DD44
44DD44DD44DD44DD
44DD44DD44DD44DD
DD44DD44DD44DD44
DD44DD44DD44DD44
44DD44DD44DD44DD
44DD44DD44DD44DD
DD44DD44DD44DD44
DD44DD44DD44DD44
44DD44DD44DD44DD
44DD44DD44DD44DD
DD44DD44DD44DD44
DD44DD44DD44DD44
44DD44DD44DD44DD
44DD44DD44DD44DD`],
  [ vplayer, bitmap`
................
................
................
.33..3333.......
.933322223......
.6993272723.....
.3663333333333..
.03600336333336.
.03303033222223.
.00.03033322230.
.....0033333300.
................
................
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

var move = 15
        
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
      addText("you win!", { y: 4, color: color`9` });
    }
