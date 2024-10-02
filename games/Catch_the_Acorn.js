/* 
@title: Catch_the_Acorn
@author: Anna
@tags: []
@addedOn: 2024-05-14
@img: ""
*/

const player = "p";
const acorn = "a";
const tree = "t";
const background = "b";
const roads = "d";
const badAcorn = "q";
const firstHolePortal = "f";
const secondHolePortal = "s";
const pushBox = "e";
const downArrow = "l";
const dirtyGrass = "g";


setBackground(background); //background grass

setLegend( //legends/sprites
  [player, bitmap`
................
................
................
........C....C..
.CC.....CCCCCC..
.CC.....CCCCCC..
.CCC...C0CCCC0C.
..CCC..8CCCCCC8.
...CCCCCCCCCC...
....CCCCCCCCC...
.....CCCCCCCC...
.....CCCCCCCC...
.....C...C..C...
................
................
................`],
  [acorn, bitmap`
..2.............
.662............
..6....C........
...C0C0C220C....
...C0C0C0C2C....
....CCCCCCC.....
....CCCCCCC.....
....CCCCCCC.....
....CCCCCCC.....
.....CCCCC...2..
......CCC...662.
.............6..
................
................
................
................`],
  [tree, bitmap`
................
....DDDDDD......
....DDDDDDDD....
...D44DD444D....
...D4DDD44DD....
...DDDD44DD.....
....DDDDDDD.....
......LLL.......
......CCC.DD....
......CCCCCDD...
......CCC.......
......CCC.......
......CCC.......
......CCC.......
......CCC.......
................`],
  [background, bitmap`
4444444444444444
4444444444444D44
44D4444444444444
4DD4444444DD4444
4D44444444D44444
4444444444444444
4444DD4444444D44
444D4444444D4444
44D4444444D44444
4444444444444444
4444444444444444
444444D4444444D4
444D444444444444
44D44444444DD444
44D4444444DD4444
4444444444444444`],
  [roads, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
666LL666LL666L66
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
666LL666LL666L66
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [badAcorn, bitmap`
................
................
.......F........
...F0F0F0F0F....
...F0F0F4F0F....
....FFFF49D.....
.....FFFF4D.....
.....F.FFFF.....
.......FFFF.....
......FFFF......
......FFF.......
................
................
................
................
................`],
  [firstHolePortal, bitmap`
................
................
................
................
................
................
.....CC.CCC.....
...CC00000C0C...
...C00000000C...
...C0000000CC...
...CCCCCC0CC....
......C.CCCC....
................
................
................
................`],
  [secondHolePortal, bitmap`
................
................
................
................
................
.....4.4..CC....
.....DCC4C0C....
...CC0000000C...
..4C00000000C...
..C00000000CC...
...C000CC4CC....
...CCCC.CDD.....
..........4.....
................
................
................`],
  [pushBox, bitmap`
................
................
................
......CCC.......
...CCCCCCCCCCC..
...C.CFCFC.C.C..
...CCCCC.CCCCC..
...CFCFC.CFCFC..
...CFCFC.CFCFC..
...C.C.CCCCC.C..
...C.C.CFCFC.C..
...C.C.CFCFC.C..
...CCCCCCCCCCC..
................
................
................`],
  [downArrow, bitmap`
................
................
................
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.....888888.....
......8888......
.......88.......
.......88.......
................
................`],
  [dirtyGrass, bitmap`
D44DDDD4DDDCD4D4
D444C4DC44444D4D
D4D44C444C444C4D
DDD4444C44DC444D
DDCC44444CDCC44D
D444C4444444CCD4
D444DD4444444DC4
DC4D444C444D444D
D4D4444444D444DD
DC44444444444C4D
D4C44CC4444C4CCD
D44444C44C44C4D4
444D44C444444444
4CDC444C444DD44D
D4D4444D44CD4C4D
DDDD44DD44CDDDDD`]

);

setSolids([player, tree, pushBox, roads, background, dirtyGrass]); //so you cant overlap sprites

setPushables({ //things the player can push
  [player]: [pushBox, player]
});

let level = 0
const levels = [ //levels/maps
  map`
ttattatta
.........
.........
.........
.........
.........
.........
attattatt`,
  map`
ttattatta
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
.......l.
.p.....a.
attattatt`,
  map`
p.t......
t.t..t...
t........
t..tt..te
.tt.tttt.
ta...t...
.t.q.....
ddddddddd`,
  map`
.........
.........
.........
.tttttttt
.t......t
tt.t.t.tt
.p.qqq.at
ddddddddd`,
  map`
ttpt.....q.
.t.t..t..ft
.t.ttett...
.t.tt..ttt.
.t.tt.t.t..
.t....tst..
.tttqtt.ttt
....t.q..a.`,
  map`
ttpt.....q.
.t.t..t..ft
.t.ttett...
.t.tt..ttt.
.t.tt.t.t..
.t....tst..
.tttqtt.ttt
....t.q..a.`,
  map`
tt.ttt.tt..
pt.t.t.tsta
..t...tq.t.
t...t.f..t.
ttttttt....
ddddddddddd
tt.........`,
  map`
ttt.....ttt
.ptt..tta..
t..t..t...t
.te.tt..ttt
....tt..e.t
f.tt..tt..s
..t....tttt`,
  map`
..dd..ddt.
.dp.dd.ad.
td..t...dt
td.e.q..d.
..d.e..d..
...d..d...
....dd.t..`,
  map`
pq...g....
.q.q.q.q..
.g.q.q.q.g
.q.q.q.q.g
.q.q.g.q..
.g.g.q.q..
...q...qa.`,
  map`
.t..t.....
.tastf....
.ttttttt.t
.tpttt.t.t
.t......et
.tttttt..t
.......ttt`,
  map`
p.qqqqq..
q.qqqqqqq
q.....q..
q..qq...e
.qq.qqqq.
qa...q...
.q.q.....
ddddddddd`,
  map`
tttttt.ta
p....t.t.
tttt.t.t.
.ttt.t.t.
...t.tt..
...t.....
.tttttttt
....tt...`,
  map`
dddddd..a
p....d.dd
dddd.d.dd
.ttd.d.d.
...d...d.
...d..d.t
.ttdddd..
....tt...`,
  map`
p...t...s
ddd.t.ddd
....t....
.dddtddd.
....t....
ddd.t.ddd
f...t...a
ddddddddd`,
  map`
........p
.tttttttt
.........
ttt.tttt.
...e..at.
..t.tttt.
.........
ttttttttt`,
  map`
p...tat..
ttq.t.tt.
ttt.t.qt.
ttt.t..t.
....t..t.
.tttt..t.
.e.....tt
.tttttttt`,
  map`
pt.....ts
..t...t..
t..t.t..t
t.etttet.
tq..t..t.
...ttt...
t..t.t..t
f.t...t.a`

]

setMap(levels[0]) //starting map

addText("It looks like", { x: 3, y: 2, color: color`3` });
addText("Mr. Squirrel is ", { x: 3, y: 3, color: color`3` });
addText("hungry and wants", { y: 4, color: color`3` });
addText("delicious acorns!", { y: 5, color: color`3` });
addText("Help him collect ", { y: 7, color: color`3` });
addText("all 15 acorns!", { y: 8, color: color`3` });
addText("by avoiding traps,", { y: 9, color: color`3` });
addText("pushing boxes, and", { y: 10, color: color`3` });
addText("going into holes!", { y: 11, color: color`3` });
addText("'k' to continue", { x: 2, y: 13, color: color`2` });


onInput("s", () => { //move down
  getFirst(player).y += 1
});

onInput("w", () => { //move up
  getFirst(player).y -= 1

});

onInput("d", () => { //move right
  getFirst(player).x += 1
});

onInput("a", () => { //move left
  getFirst(player).x -= 1
});

onInput("j", () => { //restart level
  setMap(levels[2]);
  clearText();
});

const instructionSfx = tune`
320.85561497326205,
160.42780748663102: G5-160.42780748663102,
160.42780748663102: G5-160.42780748663102 + F4/160.42780748663102,
160.42780748663102: A5^160.42780748663102,
160.42780748663102: G5-160.42780748663102,
160.42780748663102: A5^160.42780748663102 + F4/160.42780748663102,
160.42780748663102: G5-160.42780748663102,
160.42780748663102: F5-160.42780748663102 + F4/160.42780748663102,
160.42780748663102: E5-160.42780748663102 + E4~160.42780748663102,
160.42780748663102: D5-160.42780748663102 + E4~160.42780748663102,
160.42780748663102: D5-160.42780748663102 + F4/160.42780748663102,
160.42780748663102: G5-160.42780748663102,
160.42780748663102: A5^160.42780748663102 + F4/160.42780748663102,
160.42780748663102: G5-160.42780748663102,
160.42780748663102: A5^160.42780748663102,
160.42780748663102: G5-160.42780748663102 + G4^160.42780748663102,
160.42780748663102: F5-160.42780748663102,
160.42780748663102: E5-160.42780748663102 + E4~160.42780748663102,
160.42780748663102: D5-160.42780748663102 + E4~160.42780748663102,
160.42780748663102: D5-160.42780748663102,
160.42780748663102: C5-160.42780748663102,
160.42780748663102,
160.42780748663102: E5-160.42780748663102,
160.42780748663102: E5-160.42780748663102,
160.42780748663102: D5~160.42780748663102,
160.42780748663102: C5~160.42780748663102,
160.42780748663102: E4~160.42780748663102,
160.42780748663102: D5-160.42780748663102,
160.42780748663102: E5-160.42780748663102,
160.42780748663102: F5-160.42780748663102,
160.42780748663102`
  playTune(instructionSfx, Infinity);


onInput("k", () => { //next level instructions
  setMap(levels[1]);
  clearText();
  addText("use WASD to", { x: 5, y: 4, color: color`3` });
    addText("move Mr.Squirrel. ", { x: 2, y: 5, color: color`3` });
    addText("Touch the acorn", { y: 7, color: color`3` });
    addText("to go to", { y: 8, color: color`3` });
    addText("the next level!", { y: 9, color: color`3` });
});


afterInput(() => {
  const acornCov = tilesWith(player, acorn);

  if (acornCov.length >= 1) { //go to next level
    level = level + 1;
  const wonAcornSfx = tune`
77.12082262210797,
38.56041131105398: F5/38.56041131105398,
38.56041131105398: G5^38.56041131105398,
38.56041131105398: A5^38.56041131105398,
38.56041131105398: B5^38.56041131105398,
1002.5706940874036`
  playTune(wonAcornSfx);

    if (level < levels.length) { //next level
      setMap(levels[level]);
      clearText();
    } else { //win game
      addText("you win!", { y: 4, color: color`3` });
      addText("press 'j' to restart", { y: 8, color: color`3` });
    }
  }

  const touchTrap = tilesWith(player, badAcorn);

  if (touchTrap.length > 0) { //restart level if you touch bad acorns
    setMap(levels[level]);
    const badAcornSfx= tune`
77.12082262210797,
38.56041131105398: F5/38.56041131105398,
38.56041131105398: E5-38.56041131105398,
38.56041131105398: D5-38.56041131105398,
38.56041131105398: B4~38.56041131105398,
1002.5706940874036`
  playTune(badAcornSfx);
  }

  const fallInFirstHole = tilesWith(player, firstHolePortal);
  const fallInSecondHole = tilesWith(player, secondHolePortal);

  if (fallInFirstHole.length >= 1) { //portals
    const secondHole = getFirst(secondHolePortal);
    const fallSecondHole = getFirst(player);

    fallSecondHole.x = secondHole.x; //go to other portal
    fallSecondHole.y = secondHole.y;

  }
});
