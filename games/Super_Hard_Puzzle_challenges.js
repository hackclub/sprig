
/* 
@title: Super_Hard_Puzzle_challenges
@author: Ruihan Cao
@tags: ['puzzle']
@addedOn: 2023-04-23
*/

    /*
Super_Hard_Puzzle_challenges
By Ruihan Cao

Instructions:

Hit "run" to execute the code and
The objective to push the gold onto the box. (You can go on top of the box)
Press k for hint(would cost 10 gold, each level passed +100 gold).
Press j to reset the current level or exist hint. 
Press WASD for movements.
*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const bgColor = "c";
const levelPassed = tune`
125: C5^125,
125: E5^125,
125: C5^125,
125: F5^125,
125: C5^125,
125: G5^125,
3250`
const walk = tune`
60: C5~60,
1860`
var Gold = 0;
var hintmode = false;
var text = addText("Gold: ", { y: 14, x: 2, color: color`0` });
setLegend(
  [ player,  bitmap`
.....000000.....
...007777550....
...0755777750...
..075522777550..
..055220220250..
..002220220250..
...0092222290...
.....0779950....
....07550000....
...0505555000...
..022055550020..
..02F0CCFCC0F0..
...0005555000...
....05500550....
....0C0220C0....
...0FF0220CF0...`],
  [ box, bitmap`
................
................
................
................
..........99....
.......999669...
....9996666669..
.9996666666666C.
926666666666226C
9626666662226C6C
96626622269CCC6C
96662269CCCC966C
996669CCCC966CC.
.99669CC99CCC...
..99699CCC9.....
...99CC.........`],
  [ goal, bitmap`
................
.00000000000000.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCC11CCCCC0.
.00000011000000.
.0CCCCC11CCCCC0.
.0CCCCC11CCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.00000000000000.
................`],
  [ wall, bitmap`
1111L01111110LL1
11111L1111111011
1111111111111111
112111111L111111
22122L2220L20L12
1111101111110011
11111L1111111011
11111LL111111L11
LL0LL111LLL00LLL
110111111110L111
11L11111111L1111
11L11111111L1111
LLLLL000LLLLLLLL
10111L0L1111111L
111111L11111111L
111111L111111110`],
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
LLLLLLLLLLLLLLLL`]
  
);
const endgameMap =  map`
.......
.......
.......
.......
....b..
...bbb.
p.bbbbb`;
setBackground(bgColor)
const levels = [
    map`
wwwwww
g...bp
wwwwww`,
    map`
.w....
.w.b..
p...wg`,
    map`
wwwwww
w.gggw
w..b.w
w..bww
w..b.w
w..p.w
wwwwww`,
    map`
wwwwwww
wg....w
wbw.w.w
w.bp.gw
w.wbw.w
w.g...w
wwwwwww`,
    map`
wwwwww
www..w
www.pw
w..bgw
w..bgw
w..bgw
wwwwww`,
  map`
wwwwww
w....w
w....w
wwbbbw
wwgggw
ww..pw
wwwwww`,
  map`
wwwww
wgwww
wgb.w
wgb.w
wgb.w
wwb.w
wwp.w
wwwww`,
  map`
wwwwww
www..w
w..bgw
w..bgw
w..bgw
www.pw
wwwwww`,
  map`
wwwww
w.p.w
wbgbw
wgbgw
w...w
w...w
wwwww`,

];

const hints = [
    map`
wwwwww
gbp...
wwwwww`,
    map`
.w...p
.w...b
....wg`,
    map`
wwwwww
w.gggw
w.b..w
w..bww
w.bp.w
w....w
wwwwww`,
    map`
wwwwwww
wb....w
w.w.w.w
w..pbgw
w.wbw.w
w.g...w
wwwwwww`,
    map`
wwwwww
www..w
wwwb.w
w..pgw
w.b.gw
w..bgw
wwwwww`,
  map`
wwwwww
w....w
wpb.bw
wwb..w
wwgggw
ww...w
wwwwww`,
  map`
wwwww
wgwww
wbb.w
wgp.w
wb..w
wwb.w
ww..w
wwwww`,
  map`
wwwwww
www..w
w.bbgw
w...gw
wpb.gw
www..w
wwwwww`,
  map`
wwwww
w...w
wbg.w
wgpgw
w.bbw
w...w
wwwww`,

];

let level = 0;
clearText("");
addText("Gold:" + Gold, { 
  x: 10,
  y: 1,
  color: color`6`
})
const background = tune`
5549.132947976878`;


const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  ["p"]: ["b", "p"],
  
});

// player movement controls
onInput("s", () => {
  if (hintmode == false) {
    getFirst(player).y += 1;
  }
  if (hintmode == true) {
    addText("Press j to exist hin", { 
  x: 0,
  y: 7,
  color: color`9`
  })
  }
  playTune(walk);
});

onInput("w", () => {
  
   if (hintmode == false) {
    getFirst(player).y -= 1;
  }
  else {
    addText("Press j to exist hin", { 
  x: 0,
  y: 7,
  color: color`9`
})
  }
  playTune(walk);
});

onInput("a", () => {
  
  if (hintmode == false) {
    getFirst(player).x -= 1;
  }
  else {
    addText("Press j to exist hin", { 
  x: 0,
  y: 7,
  color: color`9`
})
  }
  playTune(walk);
});

onInput("d", () => {  
 if (hintmode == false) {
    getFirst(player).x += 1;
  }
  else {
    addText("Press j to exist hin", { 
  x: 0,
  y: 7,
  color: color`9`
})
  }
  playTune(walk);
});

onInput("k", () => {  
  hintmode = true;
  const currentHints = hints[level];
  setMap(currentHints);
  Gold -= 10;
  clearText("");
  addText("Gold:" + Gold, { 
  x: 10,
  y: 1,
  color: color`6`
})
});

// reset current level
onInput("j", () => {
  hintmode = false;
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    addText("Gold:" + Gold, { 
  x: 10,
  y: 1,
  color: color`6`
})
  }
});

afterInput(() => {
   // check if passed
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // go to the next level or player win the game
    level = level + 1;
    Gold += 100;
    clearText("");
    addText("Gold:" + Gold, { 
    x: 10,
    y: 1,
    color: color`6`});
    const currentLevel = levels[level];
    playTune(levelPassed);
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap(endgameMap)
      addText("Congrats you win!" + "\n\n    You earned:\n    " + Gold + " gold!", { x: 1, y: 4, color: color`6` });
    }
  }
});
