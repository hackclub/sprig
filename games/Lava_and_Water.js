/*
@title: Lava and Water
@author: Akeell
@tags: ['puzzle','multiplayer','retro']
@addedOn: 2022-10-15
*/

/* 
Instructions: 
This game is a two player game but if you want, you can play it yourself. 
Get both player to the teleporters and finish all the levels 
before the time ends. 

Be careful  and don't move the blocks into the teleporters otherwise
they cannot be used again and you would have to restart the entire game. 

Controls: 

Red player (player 1):
W = up
S = down 
A = left
D = right

Blue player (player 2) 
I = up 
K = down
J = left
L = right

*/
  


const player1 = "p";
const player2 = "q"; 
const redteleport = "r"; 
const blueteleport = "b"; 
const wall = "w"; 
const redlocker = "l"; 
const bluelocker = "I"; 

setLegend(
  [ player1, bitmap`
................
................
................
....3333333.....
...3.......3....
...3.0..0..3....
...3.......3....
...3.......3....
...333333333....
.......3........
.......3..3.....
....3333333.....
....3..3........
.......3........
......3.3.......
.....3...3......`],
  [ player2, bitmap`
................
................
................
....5555555.....
...5.......5....
...5.0..0..5....
...5.......5....
...5.......5....
...555555555....
.......5........
.......5..5.....
....5555555.....
....5..5........
.......5........
......5.5.......
.....5...5......`], 
  [ redteleport, bitmap`
3333333333333333
3933333333333933
3333339333333333
3393333333933333
3333333393333333
3333393333393339
3333333333333333
3933339333333333
3333933333333933
3333333339333333
3333333333339333
3393333333333333
3333333933333333
3933333333333339
3333393333393333
3333333933333333`], 
  [ blueteleport, bitmap`
5555555555755555
5575557555555555
5555555555555555
7555555555555555
5555575555555755
5555555557555555
5575555555555555
5555555555555555
5555555755557575
7555755555555555
5555555555555555
5555555555755555
5555555555555557
5555755575555755
5755555555555555
5555555555555555`], 
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
0000000000000000`], 
  [ redlocker, bitmap`
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
  [ bluelocker, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`], 
  
);

setSolids([wall, redlocker, bluelocker, player1, player2]);


let level = 0;
const levels = [
  map`
p....r
wwwww.
......
wwwww.
b....q`,
  map`
p.....q
www.www
..w.w..
..w.w..
..w.w..
b.....r`, 
  map`
p.....r
...I...
..wqw..
ww.w.w.
.......
...b...`, 
  map`
....pq.....
wIwwwwwwwlw
...........
...........
wlwwwwwwwIw
...........
....rb.....`, 
  map`
p.l..I......
..l..I.....w
..l..I....lr
..l.qI.....w
..l..I......
..l..I.....w
..l..I....Ib
..l..I.....w
..l..I......`,
  map`
...w...........w...
.w.w.w.wwwww.w.w.w.
.w.w.w.wr.bw.w.w.w.
.w.w.w.w.w.w.w.w.w.
.w.w.wI.l.I.lw.w.w.
.w.w.w.......w.w.w.
qw...w.......w...wp`, 
];

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player1 ]: [bluelocker],
  [ player2 ]: [redlocker], 
});

//player1 - movement 
onInput("w", () => {
  getFirst(player1).y += -1
});

onInput("s", () => {
  getFirst(player1).y += 1
});

onInput("a", () => {
  getFirst(player1).x += -1
});

onInput("d", () => {
  getFirst(player1).x += 1
});
// End - player1 movement 


//player2 movement 
onInput("i", () => {
  getFirst(player2).y += -1
});

onInput("k", () => {
  getFirst(player2).y += 1
});

onInput("j", () => {
  getFirst(player2).x += -1
});

onInput("l", () => {
  getFirst(player2).x += 1
});
//End - player2 movement 


var tempototal = 100;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText(); 
    addText(""+tempototal, { y: 1 , color: color`3` });
      if(tempototal <= 0){ 
        clearInterval(tempodescendo);
        clearTile(getFirst(player1).x,getFirst(player1).y);
        clearTile(getFirst(player2).x,getFirst(player2).y);
        //clearText() here before 
        addText("Try Again!", { y: 1 , color: color`3` });
    }
    },1000);

//teleport players 
afterInput(() => {
  const targetNumber = tilesWith(redteleport).length; 
  const targetNumber2 = tilesWith(blueteleport).length; 

  const targetNumberboth = targetNumber + targetNumber2; 
  
  const numberCovered = tilesWith(redteleport, player1).length;
  const numberCovered2 = tilesWith(blueteleport, player2).length; 

  const bothCovered = numberCovered + numberCovered2; 

  if (bothCovered === targetNumberboth) {
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
//end teleport players 

  


