/*
@title: Sword and Monsters
@author: Jun Ming & Kah Jyun
*/

/*
CONTROLS:
  Game Nav:
    W - move up
    S - move down
    A - move left
    D - move right
    J - restart level
  Menu Nav:
    I - navegate menu up
    K - navegate menu down
    J - navegate menu left
    L - navegate menu right
    S - select option
*/

// Sprites
const player = "p";
const sword = "o";
const playersword = "i";
const monster = "m";
const monster1 = "n";
const monster2 = "b"
const solid = "s";

//var
var x; 
var y;



setLegend(
  [ player, bitmap`
................
......00000.....
.....0222220....
.....0202020....
.....0202020....
.....0222220....
......01210.....
....001111100...
....011111110...
...00111111100..
..0220111110220.
..0220111110220.
...00555555500..
.....0550550....
.....0550550....
......00.00.....`],
  [ sword,  bitmap`
................
................
.......H........
......H.H.......
......H.H.......
......H.H.......
......H.H.......
......H.H.......
......H.H.......
......H.H.......
....1111111.....
......H.H.......
......H.H.......
......HHH.......
................
................`],
  [ playersword, bitmap`
....C.......C...
.....C00000C....
.....0222220....
.....0202020.H..
.....0202020H2H.
.....0222220H2H.
......02220.H2H.
....00222220H2H.
....02226222H2H.
...002266622H2H.
..02202262211111
..02202222202H0.
...0055555550H..
....C0550550C...
....C0550550C...
....CC00C00CC...`],
  [ monster, bitmap`
.....33..33.....
......0..0......
......0..0......
.....333333.....
..0..333333..0..
...0..3333..0...
....0.3333.0....
.....033330.....
.0....0000....0.
.00..022220..00.
.000.022220.000.
.000.022220.000.
.00000022000000.
.0000.0000.0000.
.000........000.
................`],
  [ monster1, bitmap`
................
.........F......
.........F......
.....8...F8.....
....11811811....
....11488411....
....11111111....
....11888811....
....18111181....
....11111111....
.....33..33.....
.....33..33.....
.....33..33.....
...LLLLLLLLLL...
.LLLLLLLLLLLLLLL
.LLLLLLLLLLLLLL.`],
  /*[ monster2, bitmap`
.........6......
....0...06......
....0000066.....
.....000.666....
..0..000.666....
..00..0...666...
..000000000666..
..0000000000666.
.....000....666.
.....000.....66.
.....000.....66.
....00000.....6.
....00.00.....6.
....00.00.....6.
....00.00.......
....00.00.......`],*/
  [solid, bitmap`
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

setSolids([player, playersword, solid,]);

let level = 0;
const levels = [  
  map`
p.....osm.
ss.ss.s.s.
.s.ms.s...
.s.ss.sms.
.s....s.s.
sm.s....s.
.s.s....s.`,
  map`
......ism.
ss.ss.s.s.
.s.ms.s...
.s.ss.sms.
.s....s.s.
sm.s....s.
.s.s....s.`,
  map`
p......s...s
.......s...s
.sn...ss...s
.s....s..n.s
sssss.s.ss.s
...........s
ss....n...s.
.osn....sss.
..s.......ns
....s...ss..`,
  map`
.......s...s
.......s...s
.sn...ss...s
.s....s..n.s
sssss.s.ss.s
...........s
ss....n...s.
.isn....sss.
..s.......ns
....s...ss..`,
  map`
s.........s.sssss.sss....s
s.........s...s...sss....s
s.........s...s...s.s....s
s.........s...s...s.ss...s
ss...s...ss...s...s..s...s
.s...s...s....s...s..ss..s
.ss.sss.ss....s...s...s..s
..s.s.s.s.....s...s...ss.s
..sss.sss.....s...s....s.s
...s...s......s...s....sss
...s...s....sssss.s.....ss`,
  map`
s.....sssssss.ssssss.sssss
s.....s.....s.s......s....
s.....s.....s.s......s....
s.....s.....s.s......s....
s.....s.....s.s......s....
s.....s.....s.ssssss.sssss
s.....s.....s......s.s....
s.....s.....s......s.s....
s.....s.....s......s.s....
s.....s.....s......s.s....
sssss.sssssss.ssssss.sssss`
  
];

setMap(levels[level]);


onInput("w", () => {
  if (level % 2 == 0){
    getFirst(player).y -= 1;
  } else {
    getFirst(playersword).y -= 1;
  }
});
  
onInput("a", () => {
    if (level % 2 == 0){
    getFirst(player).x -= 1;
  } else {
    getFirst(playersword).x -= 1;
  }
});

onInput("s", () => {
    if (level % 2 == 0){
    getFirst(player).y += 1;
  } else {
    getFirst(playersword).y += 1;
  }
});

onInput("d", () => {
    if (level % 2 == 0){
    getFirst(player).x += 1;
  } else {
    getFirst(playersword).x += 1;
  }
});

onInput("j", () => {
    setMap(levels[level]);
});


afterInput(() => {
  if (level == 2 || level == 3) {
    var monsterarr = getAll(monster1);
    var wallarr = getAll(solid);
    var wallx = wallarr.map(x => x.x)
    var wally = wallarr.map (x => x.y)
    for (let i = 0 ; i<monsterarr.length; i++) {
      var move = Math.round(Math.random())
      if (move == 0) {
        move = -1;
      }
      for (let j = 0; j < wallx.length; j++) {
        if (monsterarr[i].x + move == wallx[j] && monsterarr[i].y == wally[j]) {
          move = -move;
        }
      }
      monsterarr[i].x += move;
    }
  }
  
  if (getFirst(player) && getFirst(sword) && getFirst(player).x == getFirst(sword).x){
    if (getFirst(player).y == getFirst(sword).y){
      level += 1;
      setMap(levels[level]);
    }
  }
  if (level % 2 == 1 && level < 4) {
     x = getFirst(playersword).x;
     y = getFirst(playersword).y;
    if (tilesWith(playersword, monster).length == 1 || tilesWith(playersword, monster1).length == 1 ){
      clearTile(x, y);
      addSprite(x, y, playersword);
    }
  }
  if (tilesWith(monster) == 0 && level == 1) {
    level += 1;
    setMap(levels[level]);
  }
  if (tilesWith(monster1) == 0 && level == 3) {
    level += 1;
    setMap(levels[level]);
  }
  
  if (tilesWith(player, monster).length == 1 || tilesWith(player, monster1).length == 1 ){
    setMap(levels[5]);
    }
  
});









