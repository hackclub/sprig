/*
@title: killer_training
@author: jakjakob
@tags: ['puzzle','timed']
@addedOn: 2023-09-16

version:
1.1.0
*/
const ver = "1.1.0";
/*
last edited/updated (DD/MM/YYYY):
29.09.2023

changelog:
1.1.0
Practice mode (not time limit and no restart if enemy touched)
Complete menu redesign:
  - main menu has a button interface, with various options
  - main menu shows highscore
  - tutorial rewritten
  - pages are controlled by key input
  - shows version number

Highscore counter 
New finish screen with highscore, score and option to go to main menu
Go on menu instead button on restarts
Failing tutorial brings you back to main menu
2 slight level updates (mazes)

1.0.1
more time (6 min instead of 5 min)

1.0.0
game release
*/

const player = "p";
const wall = "w";
const enemy ="e";
const bullet ="b";
//b for box for main menu (mmain)
const bstraight ="s";
const bleft = "l";
const bright = "r";
const bcenter = "c";
//s for selection for main menu //random letters
const sstraight ="o";
const sleft = "j";
const sright = "k";
const scenterleft = "m";
const scenterright = "n";


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
  [bstraight, bitmap `
3333333333333333
................
................
................
................
................
................
................
................
................
................
................
................
3333333333333333
................
................`],
  [bleft, bitmap `
.333333333333333
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.3..............
.333333333333333
................
................`],
  [bright, bitmap `
333333333333333.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
..............3.
333333333333333.
................
................`],
  [bcenter, bitmap `
3333333..3333333
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
3333333..3333333
................
................`],
  [sstraight, bitmap `
5555555555555555
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
5555555555555555
................
................`],
  [sleft, bitmap `
.555555555555555
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.577777777777777
.555555555555555
................
................`],
  [sright, bitmap `
555555555555555.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
777777777777775.
555555555555555.
................
................`],
  [scenterleft, bitmap `
5555555..3333333
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
7777775..3......
5555555..3333333
................
................`],
  [scenterright, bitmap `
3333333..5555555
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
......3..5777777
3333333..5555555
................
................`],
)

setSolids([ player, wall, bullet ])

let level = 0
const levels = [
  map `
....e
.....
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
wwwwwwwwwpwwwww
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
wwwwwwwwwwwwwew`,   //inspired by https://www.pinclipart.com/maxpin/ohRwhm/
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
wpwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwew`,   //inspired by https://www.brik.co/blogs/designs/maze-normal
  map `
..........................
.w..w..w.w...w...www.wwww.
.w.w...w.w...w...w...w..w.
eww....w.w...w...ww..www..
.w.w...w.w...w...w...wpw..
.w..w..w.www.www.www.w..w.
..........................`,   //this should always be the last level
]

//setMap(levels[level]) //commented out becasue now we have menu; left just in case

let fired = 0;
let wait = 0; //to avoid unwanted input, it gets on 1 when menu is called ((almost) instantly)
let timeleft = -42; //time to complete all levels. For error detecting/debugging it is set to -42 (timer not staretd, NOT intentional). Only place where it is set to -42. 
let highscore = undefined; 
let menuon = 0; //1 if menu present (for key inputs)
let practiceon = 0; //if 1 it ignores timer and highscore
let timeron = 0; //1 wehen started, to avoid unintentional/multiple executions
let daborton = 0; //for key input to go back to mmain at given point (restart, end of game, on controls tabi)
let drestartid = undefined; //for restart after dead
let drtimer = - 42; //timer for dead function, code same as timeleft
let timerengineid = undefined;
let endscreenid = undefined; //id to stop endscreen animation
let currscore = undefined; //current score of game
let endscreenidtwo = undefined;//stop endscreen animation second part

const drtdefault = 5; //time in seconds how long timer to restart after restart call (called after 5s, so value + 5 = effective time); this time defines also countdown and the time to get back to menu
const gameduration = 360; //time in seconds how long the max time is. Also impacts score system. 
const endscreentime = 2000; //time in ms how long it should switch between 2 screens at end

function mvarreset () { //resets all variables to default when menu called
  fired = 0;
  wait = 1;
  if (timeron){//avoid putting on -69 if not running. Stops it when called. 
    timeleft = -69
  }
  menuon = 1;
  practiceon = 0;
  level = 0;
  daborton = 0; 
}

//timer engine
function timerreset(){ //as a function, to easily change max. duration
  if (practiceon !== 1){//only if practice isn't used, should be useless
    timeleft = gameduration; 
    clearText();
  }
}

function timerstop(){
  clearInterval(timerengineid);
  timeleft = -42;
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

function timer(){   //starts timer clock with code -69 (not counting), if not started yet
  if (timeron !== 1 || practiceon !== 1){//check that both are 0; should be both useless
    timeron = 1;
    timerengineid = setInterval (timerengine, 1000);
    timeleft = -69;
  }
}

let menu = 0;
const menus = [
  map `
.....
.....
jomsr
lscsr`,//main menu, selected upper left
  map `
.....
.....
lscsr
jomsr`,//main menu, selected bottom left
  map `
.....
.....
lsnok
lscsr`,//main menu, selected upper right
  map `
.....
.....
lscsr
lsnok`,//main menu, selected bottom right
  map `
.....
.....
.....
.....`, //instructions (blank); 2 blank for input control
  map `
.....
.....
.....
.....`, //controls (blank)
]

function mmain (){
  clearText(); //clears remainig text from before
  stopdrestart(); //stops ev. runnning restart timer
  timerstop(); //stops timerengine; avoids multiple calls
  endstop();
  menu = 0;
  setMap (menus[menu]);
  mvarreset (); //resets all variables to menustatus
  addText("Welcome to", { y: 1, color: color`0` });
  addText("killer_training", { y: 2, color: color`0` });
  addText("Ver.: "+ver, { x: 1, y: 4, color: color`1` });
  if (highscore !== undefined){
    addText("Highscore: "+highscore, { x:1, y: 6, color: color`H` });
  }
  addText("Play", { x:3, y: 10, color: color`3` });
  addText("Practice", { x:1, y: 14, color: color`3` });
  addText("Tutorial", { x:11, y: 10, color: color`3` });
  addText("Controls", { x:11, y: 14, color: color`3` });
}

function mtutorial (){
  menu = 4;
  setMap (menus[menu]);
  clearText ();
  addText("Tutorial", { y: 1, color: color`5` });
  addText("Go to the enemy and", { x:1, y: 3, color: color`0` });
  addText("shoot him, 1 ammo", { x:1, y: 4, color: color`0` });
  addText("Gun range is 2", { x:1, y: 5, color: color`0` });
  addText("You loose 5s if you", { x:1, y: 6, color: color`0` });
  addText("get out off ammo", { x:1, y: 7, color: color`0` });
  addText("You restart if", { x:1, y: 8, color: color`0` });
  addText("you touch enemy", { x:1, y: 9, color: color`0` });
  addText("You have 6 min to", { x:1, y: 10, color: color`0` });
  addText("complete 31 levels", { x:1, y: 11, color: color`0` });
  addText("After demo-lvl the", { x:1, y: 12, color: color`0` });
  addText("time starts!", { x:1, y: 13, color: color`0` });
  addText("controls (j) (   <)", { x:1, y: 15, color: color`3` });
}

function mcontrols (){
  menu = 5;
  setMap (menus[menu]);
  clearText ();
  daborton = 1;
  addText("Controls", { y: 1, color: color`5` });
  addText("WASD (left d-pad)", { x:1, y: 3, color: color`0` });
  addText("to move", { x:1, y: 4, color: color`0` });
  addText("IJKL (right d-pad)", { x:1, y: 6, color: color`0` });
  addText("to shoot", { x:1, y: 7, color: color`0` });
  addText("MENU", { x:1, y: 9, color: color`1` });
  addText("WASD (left d-pad)", { x:1, y: 10, color: color`1` });
  addText("to navigate", { x:1, y: 11, color: color`1` });
  addText("J (<, right d-pad)", { x:1, y: 12, color: color`1` });
  addText("to select", { x:1, y: 13, color: color`1` });
  addText("menu (j) (   <)", { x:1, y: 15, color: color`3` });
}
  

function mmsconfirm (){
  if (menu === 0){
    timer ();
    wait = 0;
    level = 0;
    menuon = 0;
    clearText ();
    setMap (levels [level]);
  } else {
    if (menu === 1){
      practiceon = 1;
      wait = 0;
      level = 0;
      menuon = 0;
      clearText ();
      setMap (levels [level]);
    } else {
      if (menu === 2){
        mtutorial();
    } else {
        if (menu === 3 || menu === 4){
          mcontrols ();
        }
      }
    }
  }
}

function mmainselect (mmsinput){
  if (menu === 0){
    if (mmsinput === "s"){
      menu = 1;
      setMap (menus[menu]);
    }
    if (mmsinput === "d"){
    menu = 2;
      setMap (menus[menu]);
    }
  }
  if (menu === 1){
    if (mmsinput === "w"){
      menu = 0;      
      setMap (menus[menu]);
    }
    if (mmsinput === "d"){
    menu = 3;
      setMap (menus[menu]);
    }
  }
  if (menu === 2){
    if (mmsinput === "s"){
      menu = 3;
      setMap (menus[menu]);
    }
    if (mmsinput === "a"){
    menu = 0;
      setMap (menus[menu]);
    }
  }
  if (menu === 3){
    if (mmsinput === "w"){
      menu = 2;
      setMap (menus[menu]);
    }
    if (mmsinput === "a"){
    menu = 1;
      setMap (menus[menu]);
    }
  }
}

//controls
onInput ("w", () => {
  if (menuon){
    mmainselect ("w");
  } else {
    if (wait===0){
    getFirst(player).y -=1;
    }
  }
});

onInput("s", () => {
  if (menuon){
    mmainselect ("s");
  } else {
    if (wait===0){
    getFirst(player).y +=1;
    }
  }
});

onInput("a", () => {
  if (menuon){
    mmainselect ("a");
  } else {
    if (wait===0){
    getFirst(player).x -=1;
    }
  }
});

onInput("d", () => {
  if (menuon){
    mmainselect ("d");
  } else {
    if (wait===0){
    getFirst(player).x +=1;
    }
  }
});
//controls for bullet

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
  if (daborton){
    mmain ();    
  } else {
    if (menuon){
      mmsconfirm ();
    } else {
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
    }
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

//game 

mmain(); // starts menu at beginning of game

function drrestart (){ //ex dead; restarts from lvl 1
  stopdrestart();
  daborton = 0;
  if (practiceon){//restarts only if not in practice
    ammout();
  } else {
    clearText();
    wait=0;
    level=1; 
    timerreset();
    setMap(levels[1]);
  }
}

function stopdrestart (){
  clearInterval(drestartid);
  drtimer = -42;
  drestartid = undefined;
}

function drestart (){
  if (drtimer === -42){
    addText("BUG, drestart triggered wrongly", {y:13, color: color`3`});
  } else {
    drtimer -= 1;
    }
  addText(""+drtimer, {y:6, color: color`4`});
  if (drtimer <= 0 && drtimer >= -35){//the -35 is to avoid that -42 gets catch in case of bugs
    drrestart();
  }
}

function dead (){   //shuld have called it smt like restart from lvl 1 (with timer restart)
  drtimer = drtdefault + 1; //sets to default countdown for function drestart, +1 to count that it starts at 4
  drestartid = setInterval(drestart, 1000);
  daborton = 1;
  clearText();
  if (practiceon){
    addText("Restarting lvl in", {y:4, color: color`4`});
  } else {
    addText("Restarting game in", {y:4, color: color`4`});
  }
  //+line with countdown
  addText("abort and go to", {y:13, color: color`3`});
  addText("menu (j) (   <)", {y:14, color: color`3`});
}
  
function ammout (){ //and this should be called restart current level (timer unvaried)
  clearText();
  wait=0;
  setMap(levels[level]);
}

function endstwo(){
  clearText(); 
  addText("Score: " +currscore, { y: 2, color: color `2`});
  addText("training", { y: 11, color: color`9` });
  addText("Highscore: " +highscore, { y: 4, color: color `H`});
  addText("go to menu", {y:13, color: color`3`});
  addText("(j) (   <)", {y:14, color: color`3`});
}

function ends(){
  addText("Score: " +currscore, { y: 2, color: color `2`});
  addText("training", { y: 11, color: color`9` });
  addText("Highscore: " +highscore, { y: 14, color: color `H`});
}

function endscreen(){
  clearText();
  ends();
  if (practiceon){
    addText("you finished", { y: 3, color: color`4` });
    addText("practice mode!", { y: 4, color: color`4` });
  }else{
    addText("you won!", { y: 4, color: color`4` });
  }
  endscreenidtwo = setTimeout(endstwo, endscreentime);
}

function endstop(){
  if (endscreenid!== undefined){
    clearInterval(endscreenid);
    clearTimeout(endscreenidtwo);//stops second part of animation
  }
}

afterInput(() => {
  if (wait === 0){//this whole prevents multiple executions of afterInput; everytime something is executed obv. wait is set to 1 so, it should fix everything

    if (tilesWith(enemy, player).length){
      addText("trainig failed,", {y:4, color: color`4`});
      addText("never touch enemy!", {y:6, color: color`4`});
      wait = 1;
      if (level===0){
        addText ("tutorial aborted!", {y:8, color: color`3`}); 
        addText ("going to main menu", { y: 10, color: color `3`});
        setTimeout(mmain, 5000);
      } else {
          addText("restarting game", {y:10, color: color`4`});
          setTimeout(dead,5000);
      }
     }

    if (fired){

      if (tilesWith(enemy, bullet).length) {
    
        level = level + 1;
        const currentLevel = levels[level];

        if (level === 1 && practiceon !==1){
          timerreset();
        }

        if (currentLevel !== undefined) {
          setMap(currentLevel);
        } else {
          wait = 1;
          if (practiceon !== 1){
            if (highscore <= timeleft || highscore === undefined){//sets highscore
              highscore = timeleft;
            }
            currscore = timeleft;
            timeleft = -69; //stops timer
          }
          daborton=1;
          endscreenid = setInterval(endscreen, endscreentime*2); //toggle end screen switcher
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
  }
}); 