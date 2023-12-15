


const player = "p";
const ball = "b";
const goal = "g";
const wall = "w";
const bgColor = "c";
const winp ="q";
const win= tune`
125: C5/125,
125: E5/125 + F5/125,
125: C5/125 + D5/125,
125: F5/125 + D5/125 + E5/125,
125: C5/125 + D5/125 + E5/125,
125: G5/125 + F5/125 + A5/125,
3250`
const walk= tune`
500: C5^500 + D5~500 + B4~500 + A4^500,
15500`
var Goal = 0;
var hint = false;
var text = addText("Goal: ", { y: 14, x: 2, color: color`0` });
setLegend(
  [ player,  bitmap`
................
....9999999.....
...990999099....
...999999999....
...999333999....
...999999999....
..33333333333...
.3.333323333.3..
9..333323333..9.
...333323333....
...333333333....
....55...55.....
....55...55.....
....55...55.....
....33...33.....
................`],
  [ winp,  bitmap`
................
....9999999.....
...990999099....
...999999999....
9..999333999..9.
.3.999999999.3..
..33333333333...
...333323333....
...333323333....
...333323333....
...333333333....
....55...55.....
....55...55.....
....55...55.....
....33...33.....
................`],
  [ ball, bitmap`
................
................
................
................
.....000000.....
....02020200....
....00202020....
....02020200....
....00202020....
....02020200....
.....000000.....
................
................
................
................
................`],
  [ goal, bitmap`
................
.00000000000000.
.00222222222200.
.02022222222020.
.02202222220220.
.02220222202220.
.02222022022220.
.02222200222220.
.02222200222220.
.02222022022220.
.02220222202220.
.00002222220000.
................
................
................
................`],
  [ wall, bitmap`
2222222222222222
2222222222222222
2222222222222222
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD3DDDDDDDD3DDDD
D333DDDDDD333DDD
33333DDDD33333DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
2222222222222222
2222222222222222
2222222222222222`],
  /*[ bgColor, bitmap`
FLFFFFFFFFFFFLFF
LLLCCFFFCCLLCCCL
FFFFCCCLLFFCCFFL
FFFLFFFCFFFLFFFL
LFCFFLCCLLLFLLLF
LCCLLFFFFLLLCCCF
LFFFLFFFFLFFFLCC
LFFFCLLCCLFFFLFF
FLCCCLFFLLCCCFFF
FLFFFFFLLLLFFCLF
CCFFFFLFFFLFFFFL
FCCLLCLFFFCCFFLF
FLFFFCFLLLLCCLLF
LFFFFLFFFLFFFFFL
CFLLLCFFFLFFCFFF
CCFFFCCLLFLCCCLC`],*/
  [ bgColor, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
  
);
const endwin =  map`
.......
.......
.......
.......
...qcc.
..bbbc.
gbbbbbg`;
setBackground(bgColor)
const levels = [
    map`
wwwccww
wg..cbp
wwwccww`,
    map`
wwwwcc
cb.c..
pcwwwg`,
    map`
wwwwww
wwgggw
w..b.c
w..bcc
w..b.w
w..p.w
wwwwww`,
    map`
wwwwwww
wg....w
wbw.wbw
w.cpwgw
w.wbcww
w.gccww
wwwwwww`,
    map`
wwwwww
wgwwgw
wccbpw
w..ccw
wb.www
w.cbgw
wwwwww`,
  map`
gccwww
c.b..w
wc.w.g
wcbwcb
gccccc
cc.wpw
wcbccg`,
  map`
gccww
c.p.w
wbcbc
wcbcw
ww.cc
wgccw
wwccg`,
  map`
gwwww
c.p.w
cbgbw
ccbcw
wc..w
wwccg
wwwww`,

];

const hints = [
    map`
wwccww
gbp...
wwccww`,
    map`
wwwwcp
.c...b
ccwwwg`,
    map`
wwwwww
wwgggw
w.b..c
w..bbc
w.cp.w
w....w
wwwwww`,
    map`
wwwwwww
wg....w
wbw.wbw
w.pcwgw
w.wccww
w.gbcww
wwwwwww`,
    map`
wwwwww
wgwwgw
wbcpbw
w..ccw
w.cwww
w..bgw
wwwwww`,
  map`
gbcwww
c....w
wccwcg
wccw.b
gbcccc
cc.wpw
wcccbg`,
 map`
gbccww
ccc..w
w.cccc
w...cw
wwc.pc
wgb..w
wwccbg`,
  map`
gwwww
cb.pw
ccg.w
ccbcw
wcccw
wwcbg
wwwww`,

];

let level = 0;
clearText("");
addText("Goal:" + Goal, { 
  x: 10,
  y: 1,
  color: color`8`
})



const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, ball, wall ]);

setPushables({
  ["p"]: ["b", "p"],
  
});


onInput("s", () => {
  if (hint == false) {
    getFirst(player).y += 1;
  }
  if (hint == true) {
    addText("Press j to exist ", { 
  x: 0,
  y: 7,
  color: color`5`
  })
  }
  playTune(walk);
});

onInput("w", () => {
  
   if (hint == false) {
    getFirst(player).y -= 1;
  }
  else {
    addText("Press j to exist ", { 
  x: 0,
  y: 7,
  color: color`5`
})
  }
 playTune(walk);
});

onInput("a", () => {
  
  if (hint == false) {
    getFirst(player).x -= 1;
  }
  else {
    addText("Press j to exist ", { 
  x: 0,
  y: 7,
  color: color`5`
})
  }
 playTune(walk);
});

onInput("d", () => {  
 if (hint == false) {
    getFirst(player).x += 1;
  }
  else {
    addText("Press j to exist", { 
  x: 0,
  y: 7,
  color: color`5`
})
  }
 playTune(walk); 
});

onInput("k", () => {  
  hint = true;
  const currentHints = hints[level];
  setMap(currentHints);
  Goal -= 10;
  clearText("");
  addText("Goal :" + Goal, { 
  x: 10,
  y: 1,
  color: color`8`
})
});


onInput("j", () => {
  hint = false;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    addText("Goal:" + Goal, { 
  x: 10,
  y: 1,
  color: color`6`
})
  }
});

afterInput(() => {
  
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, ball).length;

  if (numberCovered === targetNumber) {
   
    level = level + 1;
    Goal += 100;
    clearText("");
    addText("Goal:" + Goal, { 
    x: 10,
    y: 1,
    color: color`6`});
    const currentLevel = levels[level];
     playTune(win);
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap(endwin)
      addText(" you win!" + "\n\n    You earned:\n    " + Goal + " goal !", { x: 1, y: 4, color: color`3` });
    }
  }
});
