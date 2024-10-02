/*
@title: Cave-Quest
@author: OHIO-MAN
@tags: ['puzzle']
@addedOn: 2023-02-18
*/
/*
Explore caves, watch out for traps, solve puzzles.
Get some spelunky vibes with this game.
Press WASD to move.
Press I to restart the level.
If you run out of hearts, you'll be sent back to level 1.
If want to play it again, just restart the game.
*/

const background = "b";
const bar = "q";
const heart = "h";
const player = "p";
const wall = "w";
const push = "u";
const exit = "e";
const trap = "t";
const trap2 = "y";
const trap_square = "s";

let hp = 3;
let time = 0;
let win = false;

const melody = tune`
184.04907975460122: b4-184.04907975460122 + g4/184.04907975460122,
184.04907975460122: b4-184.04907975460122 + g4/184.04907975460122,
184.04907975460122: b4-184.04907975460122 + g4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122,
184.04907975460122: d5-184.04907975460122 + b4/184.04907975460122,
184.04907975460122: e5-184.04907975460122 + c5/184.04907975460122,
184.04907975460122: d5-184.04907975460122 + b4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122,
184.04907975460122: a4-184.04907975460122 + f4/184.04907975460122,
184.04907975460122: a4-184.04907975460122 + f4/184.04907975460122,
184.04907975460122: a4-184.04907975460122 + f4/184.04907975460122,
184.04907975460122: e4-184.04907975460122 + c4/184.04907975460122,
184.04907975460122: e4-184.04907975460122 + c4/184.04907975460122,
184.04907975460122: f4-184.04907975460122 + d4/184.04907975460122,
184.04907975460122: g4-184.04907975460122 + e4/184.04907975460122,
184.04907975460122: a4-184.04907975460122 + f4/184.04907975460122,
184.04907975460122: g4-184.04907975460122 + e4/184.04907975460122,
184.04907975460122: f4-184.04907975460122 + d4/184.04907975460122,
184.04907975460122: e4-184.04907975460122 + c4/184.04907975460122,
184.04907975460122: e4-184.04907975460122 + c4/184.04907975460122,
184.04907975460122: e4-184.04907975460122 + c4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122,
184.04907975460122: b4-184.04907975460122 + g4/184.04907975460122,
184.04907975460122: b4-184.04907975460122 + g4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122,
184.04907975460122: d5-184.04907975460122 + b4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122,
184.04907975460122: d5-184.04907975460122 + b4/184.04907975460122,
184.04907975460122: e5-184.04907975460122 + c5/184.04907975460122,
184.04907975460122: d5-184.04907975460122 + b4/184.04907975460122,
184.04907975460122: c5-184.04907975460122 + a4/184.04907975460122`
playTune(melody, Infinity)

setLegend(
  [background, bitmap`
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
  [bar, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [heart, bitmap`
LLLLLLLLLLLLLLLL
LLL33LLLLLL33LLL
LL3333LLLL3333LL
LL33333LL33333LL
LL333333333333LL
LLL3333333333LLL
LLLL33333333LLLL
LLLLL333333LLLLL
LLLLLL3333LLLLLL
LLLLLLL33LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [push, bitmap`
..LLLLLLLLLLLL..
.L111111111111L.
L11111111111111L
L11LLLLLLLLLL11L
L11L11111111L11L
L11L11111111L11L
L11L11111111L11L
L11L11111111L11L
L11L11111111L11L
L11L11111111L11L
L11L11111111L11L
L11L11111111L11L
L11LLLLLLLLLL11L
L11111111111111L
.L111111111111L.
..LLLLLLLLLLLL..`],
  [wall, bitmap`
CCCFFCCCCCCFCCCC
CCCFFCCCCCCFCCCC
CCCFFCCCCCCFCCCC
CCCFFFCCCCCFFCCC
CCFFFFFCCCCCFFFF
FFFFCCFCCCCCFFFF
CCFFCCFFCCFFFCCC
CCFFCCCFCCFCCCCC
CCFCCCCFCFFCCCCC
CCFCCCCFFFCCCCCC
CCFCCCCFCCCCCCCC
CCFCCCCFFCCCCCCC
CCFFCCCCFFCCCCCC
CCFFCCCCCFFCCCCC
CCCFFCCCCCFFCCCC
CCCFFCCCCCCFCCCC`],
  [player, bitmap`
.....FFFFFF.....
.....112211.....
...FFFFFFFFFF...
.....666666.....
.....606606.....
.....666666.....
.....660066.....
..FFFFF22FFFFF..
.FFFFFFC2FFFFFF.
.FF.FFF2CFFF.FF.
.66.FFF11FFF.66.
....FFCCCCFF....
.....CC..CC.....
.....CC..CC.....
.....LL..LL.....
....LLL..LLL....`],
  [exit, bitmap`
................
................
................
...LLLLLLLLLL...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...
...L55555555L...`],
  [trap, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L111111LLL11111L
L1111LLL1111111L
L1111L111111111L
L111111L1111111L
L111111L1111111L
L11111111111111L
LLLL11111111111L
LLLLL1111111111L
LLLLL1111111111L
LLLLL1111111111L
LLLL11111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [trap2, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111LLL111111L
L1111111LLL1111L
L111111111L1111L
L1111111L111111L
L1111111L111111L
L11111111111111L
L11111111111LLLL
L1111111111LLLLL
L1111111111LLLLL
L1111111111LLLLL
L11111111111LLLL
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [trap_square, bitmap`
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
0000000000000000`]
)

setSolids([player, wall, push, bar, heart, trap, trap2])

setPushables({
  [player]: [push]
})

let level = 0;
const levels = [
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wp..........ew
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww`, // Level 1
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wp...........w
wwwwwwwwwwww.w
we..ww.....w.w
www.w..www.w.w
ww..w.ww...w.w
ww.ww.w..www.w
ww..w.w.wwww.w
www...w......w
wwwwwwwwwwwwww`, // Level 2
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
ww...w...w...w
ww.w.w.w.w.w.w
ww.w.w.w.w.w.w
ww.w.w.w.w.w.w
ww.w.w.w.w.w.w
ww.w.w.w.w.w.w
ww.w.w.w.w.w.w
we.w...w...wpw
wwwwwwwwwwwwww`, // Level 3
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
ww..w..w..wwww
wp.uu..u..ue.w
www.ww.ww.wwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww
wwwwwwwwwwwwww`, // Level 4
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wwwww...wwwwww
wwwww.w.wwwwww
www.w.w.www.ww
wp.uu..uu..uew
w.w.www.w.w.ww
w...wwwww.w.ww
wwwwwwwww.w.ww
wwwwwwwww...ww
wwwwwwwwwwwwww`, // Level 5
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wp....ww....ww
www.wuwwu..uww
wew.u....u...w
w.www.wwwwww.w
w.wwwwww..ww.w
w.www.u....u.w
w.....u..wuw.w
wwwwww.www...w
wwwwwwwwwwwwww`, // Level 6
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wwww..pwwwwwww
wwww.w.wwwwwww
wwww..stwwwwww
wwwww.wwwwwwww
wwww...wwwwwww
wwww.wstwwwwww
wwww...wwwwwww
wwwwwwewwwwwww
wwwwwwwwwwwwww`, // Level 7
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wwwww.wwwwpwww
ww...u...w.stw
ww.ww.stew..ww
ww.....wwys.ww
wys.wwwwww..ww
wys.wwwwww.stw
wys.....ys.stw
wys..ys....stw
wwwwwwwwwwwwww`, // Level 8
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wpu..wwww....w
w..uu..ys.ww.w
w.u.uu....ww.w
wwwww.wwwwys.w
wys.stww.....w
wys.stww.wys.w
wwu.....u....w
wwe.stww.w.stw
wwwwwwwwwwwwww`, // Level 9
  map`
hqqqqqqqqqqqqq
wwwwwwwwwwwwww
wwp..stwwwwwww
ww.u.stw...www
ww.u.ww...u.ww
wwuu.w..ww.www
ww.uww.www.stw
www.ww.www.stw
www....www.stw
www.ww..u...ew
wwwwwwwwwwwwww`, // Level 10
  map`
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
qqqqqqqqqqqqqq
q.....p......q
q............q
qqqqqqqqqqqqqq` // YOU WIN
]
const currentlevel = levels[level];
setBackground(background);
setMap(currentlevel);
addText(`${hp}`, { x: 2, y: 0, color: color`2` });

onInput("w", () => {
  getFirst(player).y -= 1;
})
onInput("a", () => {
  getFirst(player).x -= 1;
})
onInput("s", () => {
  getFirst(player).y += 1;
})
onInput("d", () => {
  getFirst(player).x += 1;
})
onInput("i", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
    addText(`${hp}`, { x: 2, y: 0, color: color`2` });
  }
});

afterInput(() => {
  const OnExit = tilesWith(exit, player).length
  const OnTrap = tilesWith(trap_square, player).length
  
  if (OnExit !== 0) {
    level = level + 1;
    const currentlevel = levels[level];
    if (currentlevel !== undefined) {
      setMap(currentlevel);
    }
  }
  if (OnTrap !== 0) {
    hp = hp - 1;
    addText(`${hp}`, { x: 2, y: 0, color: color`2` });
    addText("             ", { x: 6, y: 0, color: color`L` });
    addText("Ouch !", { x: 6, y: 0, color: color`2` });
  }else{
    addText("             ", { x: 6, y: 0, color: color`L` });
  }
  if (hp <= 0){
    hp = 3;
    level = 0;
    const currentlevel = levels[level];
    clearText();
    setMap(currentlevel);
    addText(`${hp}`, { x: 2, y: 0, color: color`2` });
    addText("You died !", { x: 6, y: 0, color: color`2` });
    time = 0
  }
  if (level >= 10){
    win = true;
    addText("                ", { x: 0, y: 0, color: color`L` });
    addText("                ", { x: 0, y: 15, color: color`L` });
    addText("You won !", { x: 6, y: 2, color: color`2` });
    addText("Your final time", { x: 3, y: 4, color: color`2` });
    addText(`${Math.round(time * 10)/10}`, { x: 8, y: 6, color: color`2` });
  }
})
const timer = setInterval(() => {
    addText("             ", { x: 0, y: 15, color: color`L` });
  if (win === false){
    time +=0.1
    addText(Math.round(time * 10)/10 + "", {
      x: 0,
      y: 15,
      color: color`2`
    });
  }
  }, 100);
