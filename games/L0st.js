/*...
@title: L0st
@author: B00
@tags: ['puzzle']
@addedOn: 2022-11-07
@Instructi0ns: WASD to move, I to restart level, K to talk, Get to the green and black thing (that looks like a cabbage), Push orange and blue things.
*/ 

const player = "p" 
const wall = "w"
const goal = "g"
const pushable = "u"
const NPC = "n"
const NPC2 = "a"

setLegend(
  [ player, bitmap`
................
..999999000000..
.99999290020000.
.99992020202000.
.99992020202000.
.99992020202000.
.99992020202000.
.99992020202000.
.99999290020000.
.99999999000000.
.99999999000000.
.99999999000000.
.99999999000000.
.99999999000000.
..999999900000..
................`],
  [ wall, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333000000000
3333333000000000
3333333000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ goal, bitmap`
................
.....00000000...
....0444D444400.
...0DDD0D0004440
..0DDD0004400040
.0D0000D00040040
.0D0444DDDDL4000
.0D0444D4DDDLD00
.0004L4DDDDDD040
.0004L444D4DD040
044044L44D44D040
04440DLLLDDDD040
.0440D00L00D0440
..044D40004D440.
...00044444000..
......00044.....`],
  [ pushable, bitmap `
5559995555555555
5599999555555555
5599999999995555
5599999999999955
5599999999999955
5559999999999995
5559999999999995
5599999999999995
5999999999999995
5999999999999995
5999999999999995
9999999999999955
9999999999999955
9999999999999995
5999995559999995
5555555559999955`],
  [ NPC, bitmap`
................
................
................
....000CC000....
...0CCCCCCC90...
...0C922C2290...
...0C92292290...
...0C922C22C0...
...09922C22C0...
...09922C22C0...
...0CC9CCCCC0...
...0CC99CCCC0...
...00CCCCCCC0...
....00000000....
................
................`],
  [ NPC2, bitmap`
................
................
................
....00000009....
...0CCCCC9990...
...0C92292290...
...0C92292290...
...0C922922C0...
...09922C22C0...
...09922C22C0...
...099CCCCCC0...
...099CCC9C90...
...0999999CC0...
....00000000....
................
................`]);

setSolids([player, wall, pushable, NPC, NPC2]);

let level = 0;
const levels = [
  map`
pw...w...w...
.w.w.w.w.w.w.
...w...w...wg`,
  map`
.w....wwwwww
ww.ww.ww....
w...w.ww.www
w.w.w....w..
wgw.wwww.www
www..w.....p`,
  map`
.g.
ww.
...
.ww
...
ww.
...
.ww
...
ww.
...
.ww
...
ww.
...
.ww
...
ww.
...
.ww
...
.p.`,
  map`
wp.wgw
ww.w.w
ww.w.w
ww.u..`,
  map`
.pwg.
uww..
..wwu
..w..
..u..`,
  map`
wwww...
w..w...
w.wwwww
w..n...
w.wwww.
wp.w...
wwwwgw.`,
  map`
wwww...
w..w...
w.wwwww
w.p....
w.wwww.
w..w...
wwwwgw.`,
  map`
.www.
..g..
.www.
uwpwu
.....`,
  map`
.........................................
p.............wwwwwwwwwwwwwwwww.........g`,
  map`
p.w.w..
..w.w..
...g...
.w...w.
..www..`,
  map`
...wgwww
.w.w....
.w.wwww.
.w.w....
.w.w.www
pw...www`,
  map`
.....w...
.wwwuw.wu
.ww....w.
.....www.
...wg....
.wuwwwuw.
.w..p..ww
..wwuwwww
w.ww.wwww
..ww.....
..ww.www.
uwww...w.
.....w...`,
  map`
pu....
.u.ww.
.w.w.g
.wu...
.w.w.w
.w.ww.
.www..
......`,
  map`
pw........................
.w.............wwwwwwwwww.
.w.............w.u......w.
.wwwww.........w.wwww.www.
.....wwwwwww...w.w..w.w...
ww.........w...w.w..w.w...
.wwwwwwwww.w...w.w..w.w...
.........w.w...w.w..w.w...
.........w.w...w.w..w.w...
.........w.w...w.w..w.w...
.........w.wwwww.w..w.w...
.........w.......w..w.w...
.........wwwwwwwww..w.w...
....................w.w...
....................w.w...
....................w.w...
....................w.w...
..............wwww..w.w...
.......wwwwwwww..wwww.w...
.......w.......u......w...
.......w.wwwwww.wwwwwww...
.......w.w....w.w.........
.......w.w....w.w.........
.......w.w....w.w.........
.......w.w....www.........
.......w.w................
.......w.wwwwwwwwwwwwwwwww
.......w.................g`,
  map`
..............u...............w.................w
p.............w...............u.................g
..............w...............w.................w
..............u...............w.................w`,
  map `
..w...w...ww...g
p...w...w..n....`,
  map`
..w...w...ww...g
....w...w.pa....`,
  map`
..w...w...ww...g
....w...wp......`,
  map`
p..
...
...
...
.ww
...
...
...
...
...
...
...
...
ww.
...
...
...
...
.w.
.w.
.ww
...
...
.w.
.w.
ww.
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
...
g..`,
  map`
..w...w...w...w.w...w..w.w..........
p.w.w.w.w.w.w.w...w........wwwwwwwwg
....w...w...w...w...w..w.w..........`,
  map`
pg`,
];

  
let currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [ pushable ]
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("i", () => {
  setMap(currentLevel);
});

let talkStage = 1;
onInput("k", () => {
  if (nextTo(player, NPC) || nextTo(player, NPC2)) { 
      switch (talkStage) {
        case 1:
          addText ("Why are you here?", { y: 4, color: color`8`});
          break;
        case 2:
          clearText();
          addText ("If you stay\nhere too long...", { x: 4, y: 4, color: color`8`});
          break;
        case 3:
          clearText();
          addText ("It will \ncoruppt you.", {x: 4, y: 4, color: color`8`});
          break;
        case 4:
          clearText();
          addText ("But it's too \nlate to go back.", {x: 4, y: 4, color: color`8`});
          break;
        case 5:
          clearText();
          addText ("So, I hope you \nescape. \nBut I never will. ", {x: 3, y: 4, color: color`8`});
          break;
        case 6:
          clearText();
          addText ("Unless someone \nhelps me.", {x: 3, y: 4, color: color`8`});
          break;
        case 7:
          clearText();
          level += 1;
          currentLevel = levels[level];
          setMap(currentLevel);
          clearText();
          break;
        case 8:
          clearText();
          addText ("Hello again. \nThe exit's \njust over there!", {x: 3, y: 2, color: color`8`});
          break;
        case 9:
          clearText();
          addText ("I can't \nbelieve it!! \nI'm finally \ngetting out!!", {x: 3, y: 2, color: color `8`});
          break;
        case 10:
          clearText();
          addText ("I thought\n I \nwould never get \nout of \nthis place!!", {x: 3, y: 2, color: color `8`});
          break;
        case 11:
          clearText();
          addText ("But we need \nto hurry-", {x: 3, y: 2, color: color `8`});
          break;
        case 12:
          clearText();
          level += 1;
          currentLevel = levels[level];
          setMap(currentLevel);
          addText ("Before we're \nboth...corrupted.", {x: 3, y: 2, color: color `8`});
          break;
        case 13:
          clearText();
          addText ("GO!!", {x: 3, y: 2, color: color `8`});
          break;
        case 14:
          clearText();
          level += 1;
          currentLevel = levels[level];
          setMap(currentLevel);
          break;
      }
      talkStage += 1;
    }
});

afterInput(() => {
  const pl = getFirst(player);
  const gl = getFirst(goal);
  if (pl.x == gl.x && pl.y == gl.y) {
    level += 1;
    if (level > levels.length - 1) {
      addText("You win!! \n Wait for part 2!!", {x: 2, y: 3, color: color`7` });
      return;
    }
    currentLevel = levels[level];
    setMap(currentLevel);
  }

  if (level == 15 && talkStage < 8) {
    talkStage = 8;
  }

  if (!nextTo(player, NPC) && !nextTo(player, NPC2)) {
    clearText();
  };
});

function nextTo(sprite1, sprite2) {
  const s1 = getFirst(sprite1);
  const s2 = getFirst(sprite2);
  return (s1 && s2 && ((
      (s1.x == s2.x - 1 
       || s1.x == s2.x
       || s1.x == s2.x + 1) &&
      (s1.y == s2.y - 1
       || s1.y == s2.y
       || s1.y == s2.y + 1))));
}
