/*
@title: killer_trainig
@author: jakjakob

version:
1.0.0 pre-release

last edited/updated:
16.09.2023

*/

/*
TO DO LIST
1.1.0:
highscore system
*/

const player = "p";
const wall = "w";
const enemy ="e";
const bullet ="b";
const txt ="t";



setLegend(
  [ player, bitmap`
................
................
.......00.......
......0..0......
......0..0......
.......00.......
................
.......00..0....
.....000000.....
....0..00.......
.......00.......
......0..0......
......0..0......
.....0....0.....
....0......0....
....0......0....` ],
  [ wall, bitmap `
0000000000000000
099C99C99C99C990
0CCCCCCCCCCCCCC0
09C99C99C99C99C0
0CCCCCCCCCCCCCC0
0C99C99C99C99C90
0CCCCCCCCCCCCCC0
099C99C99C99C990
0CCCCCCCCCCCCCC0
09C99C99C99C99C0
0CCCCCCCCCCCCCC0
0C99C99C99C99C90
0CCCCCCCCCCCCCC0
099C99C99C99C990
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [ enemy, bitmap `
................
................
.......33.......
......3443......
......3443......
.......33.......
................
.......33..3....
.....333333.....
....3..33.......
.......33.......
......3..3......
......3..3......
.....3....3.....
....3......3....
....3......3....` ],
  [ bullet, bitmap `
................
................
................
................
................
................
................
......0000......
......0000......
................
................
................
................
................
................
................`],
  [txt, bitmap `
3333333333333333
3000000000000003
3020000020000003
3020000020000003
3002020200000003
3000202000000003
3000000000000003
3000000000000003
3000000000000003
3000200000010003
3000000000000003
3010001001000103
3000000000000003
3000100000010003
3000000000000003
3333333333333333`],


)

setSolids([ player, wall, bullet ])

let level = 0
const levels = [
  map `
....e
..t..
.....
p....`,   //this always first level
  map `
...e.
..w..
.p...
.....`,
  map `
w..e.
..ww.
w.w..
p...w`,
  map `
..we.
..w..
.....
p....`,
  map `
ew...
.wpw.
.www.
.....`,
  map `
.....w....w....e
ww.w.w.ww.w.wwww
...w.w.wwww.....
wwww.w......wwww
..pw.wwwww.ww...
.www.......w..ww
.wwwwwww.www.ww.
................
www.wwwwwwwwwww.
www...........w.
www.wwww.wwww.w.`,
  map `
wew
...
.w.
...
w.w
...
.w.
...
w.w
...
.w.
...
w.w
...
.w.
...
w.w
...
.w.
...
wpw`,
  map `
.........
.wwwwwww.
.......w.
wwwwww.w.
.......w.
.wwwwwww.
.wwwww...
.wwwww.ww
.wwwww.ww
.wwwww.ww
...pwweww`,
  map `
p...............
....w....w....w.
................
....w....w....w.
....w....w....w.
....w....w....w.
.w..w.w..w.w..w.
..ww...ww...ww..
...............e`,
  map `
.....w......ww...w...w............
...w.ww............w..w.....ww..w.
.w..www..w.w..w.wwww.wwwww.w..w.w.
..w..w..w..w..w.w..w...w......w.w.
..w.....w..wwww.wwww...w..w..w..w.
w..w.w.w...w..w.w..w...w..w.w...w.
....w.w..w.w..w.w..w...w..w...www.
p.w......w......w..w......w.w.e...`,
  map `
...w.....
.w.w.w.ww
.w.w.w...
.w.w.www.
.w.w.w...
pw...weww`,
  map `
.w...w...w..ww....
pw.w.w.w..w...w.we
...w...w....w...w.`,
  map `
.......w............
.w.....w.wwwwwwwwww.
.w.....w...w...w....
..w...w....w.w.www..
..w.w......w.e.w...w
...wpw.....w.w.w..w.
.....w.....w.....w..`,
  map `
.......
.w.w.w.
.wpw.w.
.www.w.
.wew.w.
.w.w.w.
.......`,
  map `
e.....www..www.....
.www.......w.w....p
.w.w..www..www.www.
.www..w.w......w.w.
......www..www.www.
.www.......w.w.....`,
  map `
we.................pw`,
  map `
........w..w........wwww.....
..w...w.w..w..wwww..wwww.w...
..wweww.w..w..w..w..w..w.w..w
...www..w..w..w..w..w..w.wpw.
....w...w..w..w..w..w..w.ww..
....w...wwww..wwww..wwww.w.w.
....w.........wwww.......w..w`,
  map `
p...w......
www.w.w.w..
ew..w.w.ww.
.w....www..
.wwwwww.w.w
...........`,
  map `
...
.w.
.w.
.w.
.w.
.w.
pwe
.w.
.w.
.w.
.w.
.w.
...`,
  map `
.............
....w........
...www.......
..wwwww......
.www.www.....
.wwwwwww.....
.w.....w.....
.w.www.w..w..
.w.w.w.w..w..
ew.w.w.w..w.p`,
  map `
w.w...ww.
w.w.w.ww.
....w....
.ww.wwww.
pww.wwe..
www.ww.w.
.......w.`,
  map `
......
.w..w.
.wew..
.ww...
.wpw..
.w..w.
......`,
  map `
wwwwwwwwwww
wwwwwww..ww
www.ww.ww.w
ww.wwwwww.w
wpwwwwww.ww
w.wewww.www
w....w....w
www.wwwwwww
wwwwwwwwwww`,
  map `
...............w.ww.
.wwwwwwwwwwwww.w.ww.
.w...........w.w....
.w.wwwwwwwww.w.w.www
.w.w......ww.w.w.w..
.w.w.wwww.w..w.w.www
.w.w.wwpw.w.w.......
.w.w....w.w.w.wwwww.
.w.wwwwww.w.w.....w.
.w........w.w.wwwww.
.wwwwwwwwww.w.wwwww.
............w.....we`,
  map `
....w.....w....w...........
..w..w.w...w.w..w.wwwwwwww.
...w....w.....w...w........
ww.wwwwwwwwwwwwww.w.wwwwww.
...wp...w..w.w..w.w.w....w.
....w...wwww.wwww.w.w....w.
.....w..w....ww...w.w.ww.w.
......w.w....w.w..w.w.ew.w.
wwwww.w.w....w..w.w.wwww.w.
...........w.w....w......w.
..........w..w....w......w.
.........w...w....w........`,
  map `
wwwwwwwwwewwwww
w.w.w...w.....w
w.w.w.w.w.www.w
w.w...w...w...w
w.wwwwwwwww.www
w...w.....w.w.w
w.w.wwwww.w.w.w
w.w.......w...w
w.wwwww.wwwww.w
w.w...w.w.....w
w.w.w.www.wwwww
w.w.w.w...w...w
w.w.w.w.www.w.w
w...w.......w.w
wwwwwwwwwwwwwpw`,   // inspired by https://www.pinclipart.com/maxpin/ohRwhm/
  map `
pe`,
  map `
.......
.w...w.
..w.w..
..pwe..
..w.w..
.w...w.
.......`,
  map `
.....w.........wwww...........
.www.w...w...w.w..w.wwwwwwwww.
.w.w.w...ww.ww.w..w.w.....wp..
.www.w...w.w.w.w..w.www.......
.wew.w...w...w.w..w...w...w...
.w.w.www.w...w.wwww.www...w...
...w.....w..........w.....w...`,
  map `
p.........w..............w.
.wwwww.w..w.www.wwww.www.w.
...w...w..w.w...w..w.w...w.
...w...wwww.ww..wwww.ww..w.
...w...w..w.w...w.w..w...w.
...w...w..w.www.w..w.www...
....................w....we`,
  map `
wewwwwwwwwwwwwwwwwwwwwwwwwww
w................w...w.....w
w.wwwwww.www.www.w.w.w.www.w
w.w...w..w.....w.w.w.w...w.w
w...w.w.wwwwww.www.w.www.w.w
wwwww.w......w...w.w.....w.w
w.....wwwwww.www...wwwwwww.w
w.www.w....w...wwwww.w...w.w
w.w...w.ww.w.w.w.....w.w.w.w
w.w.www.wwww.w.wwwww.w.w.www
w.w.....w....w.w.....w.w...w
w.wwwwwwwwwwww.w.wwwww.w.w.w
w.......w......w.w.....w.w.w
wwwww.w.w.wwwwww.w...w.w.w.w
w.....w.w............w.w.w.w
w.wwwwwwwwwwwwww.wwwwwww.www
w.w........w.....w.......w.w
w.w.wwwwwwwwwwww.w.wwwwwww.w
w................w.........w
wwwwwwwwwwwwwwwwwwwwwwwwwwpw`,   //inspire by https://www.brik.co/blogs/designs/maze-normal
  map `
..........................
.w..w..w.w...w...www.wwww.
.w.w...w.w...w...w...w..w.
eww....w.w...w...ww..www..
.w.w...w.w...w...w...wpw..
.w..w..w.www.www.www.w..w.
..........................`,   //this should always be the last level
]

setMap(levels[level])

let fired = 0;
let wait = 1; //to avoid unwanted input, 1 to only w input happen on start
let frstart =1; //to start welcome sequence
let timeleft = -42; //time to complete all levels. It doesn't matter which vaslue it has. For error detecting/debugging it is set to -42

setPushables({
  [player]: []
});

function timerreset(){ //as a function, to easily change max. duration
  timeleft = 300; //this defines the max. game duration
  clearText();
}

function timerengine(){
  if (timeleft === -42){
    addText ("Code: -42; critical", { y: 1, color: color`4` });//hope this will never be used, timer didn't start
  }
  if (timeleft === -69){//-69 is just to be sure it not accidentaly gets used, -69 code means timer off NOT an error
    //addText ("Code: -69", { y: 1, color: color`4` });//for debug only
  }else{
    addText(" "+timeleft+" ", { y: 1, color: color`4` });// adding the two space fixes the problem where the 0s remain. (the " are needed in any way)
    timeleft -= 1;
    if (timeleft <= 0){
      timeleft =-69; //so it doesn't show negative numbers
      addText("Time over", { y: 4, color: color`4` });
      addText("restart in 5 sec", { y: 6, color: color`4` });
      setTimeout (dead, 5000);
    }
  }
}

function timer(){   //starts timer clock with code -69 (not counting)
  setInterval (timerengine, 1000);
  timeleft = -69;
}
  
function clrsecpage (){//it also starts the timer 
  clearText();
  wait=0; //to let play
  timer ();
}

function secondpage (){ //secondpage of instructions
  clearText();
  addText("You have 5 min", { y: 2, color: color`0` });
  addText("to complete all", { y: 3, color: color`0` });
  addText("31 levels. ", { y: 4, color: color`0` });
  addText("You loose 5s if", { y: 6, color: color`0` });
  addText("you get out off ammo", { y: 7, color: color`0` });
  addText("and you restart", { y: 8, color: color`0` });
  addText("if you touch enemy", { y: 9, color: color`0` });
  addText("After demo-lvl the", { y: 11, color: color`0` });
  addText("time starts!", { y: 12, color: color`0` });
  addText("Good luck!", { y: 14, color: color`3` });
  setTimeout (clrsecpage, 10000);

}

function start (){
  getFirst(txt).remove();
  frstart =0;
  addText("Welcome to", { y: 2, color: color`0` });
  addText("killer_training!", { y: 3, color: color`0` });
  addText("move with", { y: 5, color: color`0` });
  addText("wasd (left d-pad)", { y: 6, color: color`0` });
  addText("shoot with", { y: 7, color: color`0` });
  addText("ijkl (right d-pad)", { y: 8, color: color`0` });
  addText("firing range is 2", { y: 10, color: color`0` });
  addText("you have one bullet", { y: 11, color: color`0` });
  addText("(loading next page)", { y: 14, color: color`3` });
  setTimeout (secondpage, 10000);
}

onInput ("w", () => {
  if (frstart){//starts start sequence
    start ();
  } else {
    if (wait===0){
    getFirst(player).y -=1;
    }
  }
});

onInput("s", () => {
  if (wait===0){
  getFirst(player).y +=1;
  }
});

onInput("a", () => {
  if (wait===0){
  getFirst(player).x -=1;
  }
});

onInput("d", () => {
  if (wait===0){
  getFirst(player).x +=1;
  }
});
//now for the bullet

function spwanbullet(){   //spwans bullet on player
  addSprite(getFirst(player).x,getFirst(player).y,bullet);
}

function bullcheck(){
  if (tilesWith(enemy, bullet).length){
    return 1;
  }else{
    return 0;
  }
}


onInput ("i", () => {
  if (wait===0){
    spwanbullet();
    getFirst(bullet).y -=1;
    if (bullcheck()){
      //nothing
      } else {
        getFirst(bullet).y -=1;
      }
      fired = 1;//for check if fired or not
  }
  
});

onInput("k", () => {
  if (wait===0){
    spwanbullet();
    getFirst(bullet).y +=1;
    if (bullcheck()){
      //nothing
      } else {
        getFirst(bullet).y +=1;
      }
      fired = 1;//for check if fired or not
  }

});

onInput("j", () => {
  if (wait===0){
    spwanbullet();
    getFirst(bullet).x -=1;
    if (bullcheck()){
      //nothing
      } else {
        getFirst(bullet).x -=1;
      }
      fired = 1;//for check if fired or not
  }

});

onInput("l", () => {
  if (wait===0){
    spwanbullet();
    getFirst(bullet).x +=1;
    if (bullcheck()){
      //nothing
      } else {
        getFirst(bullet).x +=1;
      }
      fired = 1;//for check if fired or not
  }
});

function dead (){   //shuld have called it smt like restart from lvl 1 (with timer restart)
  clearText();
  wait=0;
  level=1; 
  timerreset();
  setMap(levels[1]);
}
  
function ammout (){ //and this should be called restart current level (timer unvaried)
  clearText();
  wait=0;
  setMap(levels[level]);
  if (level===0){
    getFirst(txt).remove();//removes starting tile with "w" instructions
  }
}

afterInput(() => {

  if (tilesWith(enemy, player).length){
    addText("trainig failed,", {y:4, color: color`4`});
    addText("never touch enemy!", {y:6, color: color`4`});
    addText("restarting game", {y:10, color: color`4`});
    if (level===0){
      addText ("tutorial aborted!", {y:8, color: color`3`});
    }
    wait=1;
    setTimeout(dead,5000);       
   }

  if (fired){
          
    if (tilesWith(enemy, bullet).length) {
    
      level = level + 1;
      const currentLevel = levels[level];

      if (level === 1){
        timerreset();
      }

      if (currentLevel !== undefined) {
        setMap(currentLevel);
      } else {
        addText("you won!", { y: 4, color: color`4` });
        addText("training", { y: 11, color: color`9` });
        timeleft = -69; //stops timer
      }
      fired=0;
    } else {
      addText("out of ammo,", {y:4, color: color`4`});
      addText("restarting lvl in 5s", {y:8, color: color`4`});
      fired=0;
      wait=1;
      setTimeout(ammout, 5000);
    }
  }
}); 