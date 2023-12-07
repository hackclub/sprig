/*
@title: Lava and Water  
@author: Akeell 
*/
  


const tester = "p";
const tester2 = "q"; 
const assddadfgdadg = "r"; 
const aweaeqreqretyuio = "b"; 
const wall = "w"; 
const redlocker = "l"; 
const bluelocker = "I"; 

setLegend(
  [ tester, bitmap`
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
  [ tester2, bitmap`
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
  [ assddadfgdadg, bitmap`
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
  [ aweaeqreqretyuio, bitmap`
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

setSolids([wall, redlocker, bluelocker, tester, tester2]);


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
  [ tester ]: [bluelocker],
  [ tester2 ]: [redlocker], 
});

//tester - movement 
onInput("w", () => {
  getFirst(tester).y += -1
});

onInput("s", () => {
  getFirst(tester).y += 1
});

onInput("a", () => {
  getFirst(tester).x += -1
});

onInput("d", () => {
  getFirst(tester).x += 1
});
// End - tester movement 


//tester2 movement 
onInput("i", () => {
  getFirst(tester2).y += -1
});

onInput("k", () => {
  getFirst(tester2).y += 1
});

onInput("j", () => {
  getFirst(tester2).x += -1
});

onInput("l", () => {
  getFirst(tester2).x += 1
});
//End - tester2 movement 


var tempos = 300;
    var times = setInterval(function(){
    tempos--;
    clearText(); 
    addText(""+tempos, { y: 1 , color: color`3` });
      if(tempos <= 0){ 
        clearInterval(times);
        clearTile(getFirst(tester).x,getFirst(tester).y);
        clearTile(getFirst(tester2).x,getFirst(tester2).y);
        //clearText() here before 
        addText("Try Again!", { y: 1 , color: color`3` });
    }
    },1000);

//teleport players 
afterInput(() => {
  const targetNumber = tilesWith(assddadfgdadg).length; 
  const targetNumber2 = tilesWith(aweaeqreqretyuio).length; 

  const targetNumberboth = targetNumber + targetNumber2; 
  
  const numberCovered = tilesWith(assddadfgdadg, tester).length;
  const numberCovered2 = tilesWith(aweaeqreqretyuio, tester2).length; 

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
      clearInterval(times);
    }
  }
});
//end teleport players