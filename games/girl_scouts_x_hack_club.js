/*
@title: girl scouts x hack club
@author: keira
@tags: ['utility']
@addedOn: 2023-03-13
--horizon sprig workshop led by aileen & keira!--

- hey scout! deliver the girl scout cookies to orpheus! :D

use 'WASD' to play!
press 'l' to restart a level

thanks for playing <3
*/

const player = "p";
const choco = "c";
const samoa = "m";
const thin = "t";
const orpheus = "o";
const end = "k";
const wall = "w";
const design = "d";
const bg = "b";
const gs = "g";
const hc = "h";

setLegend(
  [ player, bitmap`
................
.....000000.....
....0CCCCCC0....
...0CCCCCCCC0...
...0CCCCCCCC0...
...0C000000C0...
...0066666600...
...0060660600...
...0066666600...
...0C000000C0...
...0CC04D0CC0...
...0004D3D000...
....04D9D440....
....0D8D4440....
.....000000.....
......0..0......`],
  [ choco, bitmap`
................
................
.....000000.....
....0D0CCC00....
...0D660CCCC0...
..0C066D0CCCC0..
..0CC0DDD0C0C0..
..0CCC0990CCC0..
..00CC0DDD0CC0..
..0CCCC0D770C0..
..0CCC0C077D00..
...0CCCCC00D0...
....0CCCC0C0....
.....000000.....
................
................`],
  [ samoa, bitmap`
................
................
.....000000.....
....099CC000....
...09CC000090...
..09000C009CC0..
..009990099000..
..099000.00000..
..090C0..00090..
..009CC00C90C0..
..0CCC00C90C90..
...090CC00C90...
....000C0990....
.....000000.....
................
................`],
  [ thin, bitmap`
................
................
.....0000000....
....000000000...
...000L000L000..
...00000000000..
...00000000000..
...00L00L00L00..
...00000000000..
...00000000000..
...000L000L000..
....000000000...
.....0000000....
................
................
................`],
  [ orpheus, bitmap`
................
.......000000...
......02222220..
.....022222220..
....02222222220.
....00022000220.
....02222222220.
....02222222220.
....02222202220.
....02222202220.
.....0000022220.
.000...02222220.
02220..02222220.
022200.02222220.
0222220222222220
.002222222222220`], 
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
  [ bg, bitmap`
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
DDDDDDDDDDDDDDDD`],
  [ design, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000333000333000
0003323303333300
0003233333333300
0003233333333300
0003333333333300
0000333333333000
0000033333330000
0000003333300000
0000000333000000
0000000030000000
0000000000000000
0000000000000000`],
  [ gs, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000222200222000
0000200000200000
0000200000200000
0000200000200000
0000202200222000
0000200200002000
0000200200002000
0000222200222000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ hc, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002002002222000
0002002002002000
0002002002000000
0002222002000000
0002002002000000
0002002002002000
0002002002222000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ end, bitmap`
................
.......000000...
......02222220..
.....022222220..
....02222222220.
....00022000220.
....02222222220.
....02222222220.
..0000222202220.
.0DCCC022202220.
.06D0CC00022220.
.00D9C009C02000.
00CCDDC0C0C0L0L0
00CCC7D090900000
02000002C9C00L00
.00222220002000.`],
);

setSolids([player, choco, wall, samoa, thin]);

let level = 0;
addText("GS x HACK CLUB", {x: 3, y: 4, color: color`0`})
addText("use 'WASD' to move", {x: 1, y: 6, color: color`3`})
const levels = [
  map`
........
........
........
........
.pc...o.`,
  map`
........
.......p
.mwwwwww
..wgdhdw
..wwwwww
.......o`,
  map`
w.......
w.....tp
w.wwwwww
.....w..
.....w.o
ww......
ww...w..`,
  map`
wwww..wo
......w.
...w..w.
wc.w....
wpw.....`,
  map`
p..wwww.
.mwo....
...w....
......ww
ww....ww`,
  map`
wwwwwwww
wwwww..w
w.t....w
wpwwwwow
wwwwwwww`,
  map`
........
........
....k...
........
........`,
];

setMap(levels[level]);
setBackground(bg);

setPushables({
  [ player ]: [choco, samoa, thin]
});

//controls
onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

onInput("l", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
//end of controls

//start of code for collision between cookie and orpheus
afterInput(() => {
  const goal = tilesWith(orpheus).length;
  const chocoCover = tilesWith(orpheus, choco).length;
  const samoaCover = tilesWith(orpheus, samoa).length;
  const thinCover = tilesWith(orpheus, thin).length;

  //when cookie covers/collides w/ orpheus -> move to next level
  if (chocoCover === goal) {
    level += 1;
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("", { y: 4, color: color`3` });
    }
  }

  //code for the samoa cookie (same as the original choco collision code above)
  if (samoaCover === goal) {
    level += 1;
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("", { y: 4, color: color`3` });
    }
  }

  //code for the thin cookie (same as the original choco collision code above)
  if (thinCover === goal) {
    level += 1;
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("", { y: 4, color: color`3` });
    }
  }

  //"if on level __, have this text displayed"
  if(level == 0){
    clearText();
    addText("welcome girl scout!", {x: 1, y: 2, color: color`4`})
    addText("deliver cookies", {x: 1, y: 4, color: color`4`})
    addText("to orpheus!", {x: 1, y: 5, color: color`4`})
  }

  if(level == 1){
    clearText();
    addText("to restart a lvl", {x: 0, y: 2, color: color`L`})
    addText("press 'l',", {x: 0, y: 3, color: color`L`})
  }

  if(level == 2){
    clearText();
  }

  if(level == 6){
    addText("NOM NOM", {x: 2, y: 6, color: color`0`})
  }
});

//music 
const melody = tune`
168.53932584269663: F4-168.53932584269663,
168.53932584269663: C4-168.53932584269663,
168.53932584269663: C4-168.53932584269663,
168.53932584269663: C4-168.53932584269663,
168.53932584269663: C5-168.53932584269663,
168.53932584269663: F4-168.53932584269663,
168.53932584269663: F4-168.53932584269663,
168.53932584269663: A4-168.53932584269663,
168.53932584269663: F4-168.53932584269663,
168.53932584269663: E4-168.53932584269663,
168.53932584269663: F5-168.53932584269663,
168.53932584269663: F4-168.53932584269663,
168.53932584269663: B4-168.53932584269663,
168.53932584269663: E5-168.53932584269663,
168.53932584269663: D5-168.53932584269663,
168.53932584269663: C5-168.53932584269663,
168.53932584269663: C5-168.53932584269663,
168.53932584269663: B4-168.53932584269663,
168.53932584269663: F5-168.53932584269663,
168.53932584269663: B4-168.53932584269663,
168.53932584269663: E5-168.53932584269663,
168.53932584269663: D5-168.53932584269663,
168.53932584269663: C5-168.53932584269663,
168.53932584269663: G4-168.53932584269663,
168.53932584269663: B4-168.53932584269663,
168.53932584269663: B4-168.53932584269663,
168.53932584269663: E5-168.53932584269663,
168.53932584269663: A4-168.53932584269663,
168.53932584269663: G4-168.53932584269663,
168.53932584269663: B4-168.53932584269663,
168.53932584269663: C5-168.53932584269663,
168.53932584269663: E5-168.53932584269663`
playTune(melody, 2)

