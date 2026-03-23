/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Ice and Fire Man
@author: 
@tags: []
@addedOn: 2025-00-00
*/




const playerRed = "p";
const playerBlue = "q"; 
const redteleport = "r"; 
const blueteleport = "b"; 
const wall = "w"; 
const redlocker = "l"; 
const bluelocker = "I"; 

setLegend(
  [ playerRed, bitmap`
................
......333333....
.....33....3....
....33..0..33...
....33333333....
....33.....3....
....3.......3...
....3.......3...
...33.......3...
...3........33..
..33.........3..
..3..........3..
..3..........3..
.33..........3..
..3333333333333.
................`],
  [ playerBlue, bitmap`
................
......777777....
.....77....7....
....77..0..77...
....77777777....
....77.....7....
....7.......7...
....7.......7...
...77.......7...
...7........77..
..77.........7..
..7..........7..
..7..........7..
..7..........7..
..7777777777777.
................`], 
  [ redteleport, bitmap`
3333333333333333
3............3..
3..333..333..3..
3.3..3..3..3.3..
3.3..3..3..3.3..
3..333..333..3..
3............3..
3.33333333333.3.
3.3.........3.3.
3.3..33333..3.3.
3.3..3...3..3.3.
3.3..3...3..3.3.
3..333...333..3.
3............3..
3333333333333333
3333333333333333`], 
  [ blueteleport, bitmap`
7777777777777777
7............7..
7..777..777..7..
7.7..7..7..7.7..
7.7..7..7..7.7..
7..777..777..7..
7............7..
7.77777777777.7.
7.7.........7.7.
7.7..77777..7.7.
7.7..7...7..7.7.
7.7..7...7..7.7.
7..777...777..7.
7............7..
7777777777777777
7777777777777777`], 
  [ wall, bitmap`
0000000000000000
0000000000000000
000L0000000L0000
00L0L00000L0L000
0000000000000000
000000L000L00000
000L0000000L0000
0000000000000000
0000000000000000
00L000000000L000
000L000000L00000
0000000000000000
000000L000L00000
000L0000000L0000
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

setSolids([wall, redlocker, bluelocker, playerRed, playerBlue]);


let level = 0;
const levels = [
  map`
p.w..r
..www.
......
..www.
b.w..q`,
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
  map`
..................
.w.....w..p..w....
.w.....w..b..w....
.w..w..L..w..w....
.w.....w.....w....
.w..w..w..w..w....
.w.....w.....w....
..................
....r.............
....q.............`,
  
];

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ playerRed ]: [bluelocker],
  [ playerBlue ]: [redlocker], 
});
// add background music
const backgroundMusic = tune`
500: C5~500 + E5~500 + G5~500,
500,
500: D5~500 + F5~500 + A5~500,
500,
500: E5~500 + G5~500 + B5~500,
500,
500: F5~500 + A5~500 + undefined~500,
12500`;

let musicPlayback = playTune(backgroundMusic, Infinity);
//playerRed - movement 
onInput("w", () => {
  getFirst(playerRed).y += -1
});

onInput("s", () => {
  getFirst(playerRed).y += 1
});

onInput("a", () => {
  getFirst(playerRed).x += -1
});

onInput("d", () => {
  getFirst(playerRed).x += 1
});
// End - playerRed movement 


//playerBlue movement 
onInput("i", () => {
  getFirst(playerBlue).y += -1
});

onInput("k", () => {
  getFirst(playerBlue).y += 1
});

onInput("j", () => {
  getFirst(playerBlue).x += -1
});

onInput("l", () => {
  getFirst(playerBlue).x += 1
});
//End - playerBlue movement 

outInput("r",()=>{
  setMap(levels[level]);
  
})
var tempototal = 100;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText(); 
    addText(""+tempototal, { y: 1 , color: color`3` });
      if(tempototal <= 0){ 
        clearInterval(tempodescendo);
        clearTile(getFirst(playerRed).x,getFirst(playerRed).y);
        clearTile(getFirst(playerBlue).x,getFirst(playerBlue).y);
        //clearText() here before 
        addText("Try Again!", { y: 1 , color: color`3` });
    }
    },1000);

//teleport players 
afterInput(() => {
  const targetNumber = tilesWith(redteleport).length; 
  const targetNumber2 = tilesWith(blueteleport).length; 

  const targetNumberboth = targetNumber + targetNumber2; 
  
  const numberCovered = tilesWith(redteleport, playerRed).length;
  const numberCovered2 = tilesWith(blueteleport, playerBlue).length; 

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

  


