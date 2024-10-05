/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: A Monster Maze
@author: Alicia
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const monster = "m";
const goal = "g";
const wall = "w";
const fake_wall = "f";
const fake_goal = "i";

setLegend(
  [ player, bitmap`
.....0..........
....0D0.........
....0DD00000....
...00004444000..
..0DD0444444000.
...004444400440.
...004444800440.
..0DD0444884400.
..0D0044444400..
...0.00440000...
....000000440...
..00044444440...
..04044444440...
..04044004400...
..0000000000....
................`], 
  [ monster, bitmap`
................
................
................
....00000000....
...0000000000...
.0.00.0000.00.0.
.0.0000000000.0.
.0.0...0.0..0.0.
.0.0........0.0.
..00.0....0.00..
...0000000000...
....00000000....
.....0....0.....
....0......0....
................
................`],
  [ goal, bitmap`
................
................
.....666666.....
....6......6....
...6........6...
..6...6666...6..
..6..6....6..6..
..6..6.......6..
..6..6.......6..
..6..6....6..6..
..6...6666...6..
...6........6...
....6......6....
.....666666.....
................
................`],
  [ fake_wall, bitmap`
2000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000020000000
0000000000000020
0000020000000000
0000000000002000
0000000000000000
0000000000000000
2000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000`],
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
  [ fake_goal, bitmap`
................
................
.....999999.....
....9......9....
...9........9...
..9...9999...9..
..9..9....9..9..
..9..9.......9..
..9..9.......9..
..9..9....9..9..
..9...9999...9..
...9........9...
....9......9....
.....999999.....
................
................`],
);


let level = 0; // this tracks the level we are on
const levels = [
  map`
p.f.ww.
..w..f.
wwww.ww
.wgwf..
.w.fw..
.fwf...
w...fww`,
  map`
p........
w.wwww.w.
w.wm.w.w.
wwww...ww
..fwww...
.wf..www.
.www..gw.
...wwwwwf
ww.......`,
  map`
w...w.ww..
g.w.w..ww.
www.ww..w.
.f..mww.w.
.wwwww..ff
.f.....ww.
.wwwwwwww.
.w.....pw.
.wfwwwwww.
.w........`,
  map`
......f.....
wwwww.ffwwwf
.ff.wwfww.w.
g.f.......w.
wwwww.....w.
ww..wwwwwfwf
.ww..wf....f
..ww..ffww.w
wffww..fwf.w
.w..wwww.ff.
.f.......mww
pfwwwwwwwww.`,
  map`
ww........w.w.ww
...www..w.w.w...
.www.wwww.w.ww..
.w......m.......
.w.wwwwww.ww....
.w.w....w..w.ww.
.w.w.ww.ww.w..w.
mw.w.wp..w.wwww.
.w.w.wm..w.w....
.w.w.wwwwwww.w..
.w.w.........wm.
.w.wwwwwwwwwwww.
.w.......w......
.ww..wm..w.wwwww
.f..wwwwwf....mm
gww......fwwwwmm`,
  map`
.....w.ww...........
.wwwww.ww.wwwwwwwww.
.w.....wm......mwp..
.w.wwwwwwwwwww.wwwww
.w...........w.w...w
.wwwwww.wwww.w.w.w.w
...........w.w.w.w.w
..wwww.www.w.w...w.w
.ww.mw..ww.w.w.w.w.m
.w...w..wm.w.w.w.w.w
mw.www..ww.w.w.w.w.m
ww...w.w.w...w.w.w.w
..w....fgwww.w...w..
..wwwwwwwwwm.w.wwww.
w..........w........
ww.wwwwwww.wwwwwww.w
iw....w....w.......w
.ww.w...fwwww.fwwwww
..f.w.wwf..wwwfffiww
wwf.w....wmwm......w`,
  map`
.wi.....w.w.iw.....wiw
.w..mwffw.w..w...w.w..
.wwwww..w.f.wwwwww.wm.
........w.wmw......ww.
.www.wwww.ww....w..w..
.wmw....w.w...wwww.w..
fw.wwwwww.f.w..mw..w.w
.w.....mw.w.w..ww.wwff
.w.wwwwww.w.ww........
.f.....pw.w.....www...
.wwwwwwww.w.wwww..w.w.
ffw.....f.w.w..w..w.w.
w.w.w...f.w.f..w..w.w.
w.wfww..fww.fw.w..w.w.
w.w..ww.....iw.w..w.w.
m.....wwwwwwwww.....ww
wwwww...........w.....
...mw...www.w.www.fffw
.wwmf.w.....w.fgw.w...
..www.wwwww.w.wmw.w...
..........w.w.www.www.
.wwwwwww....ww...wwm..`
];

setSolids([ player, wall ]);

const currentLevel = levels[level];
setMap(currentLevel);

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("w", () => {
  getFirst(player).y -= 1; 
});

onInput("a", () => {
  getFirst(player).x -= 1; 
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, player).length;

  const monsterNumber = 1;

  const monsterCovered = tilesWith(monster, player).length;
  
    console.log("targetNumber is " + targetNumber)
    console.log("NumberCovered is " + numberCovered)
    console.log("monsterNumber is " + monsterNumber)
    console.log("level is " + level)
    console.log("current level is " + currentLevel)
 // const monstersCovered = tilesWith(monster, player).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];
    console.log("level is " + level)
    console.log("currentLevel is " + currentLevel)
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`H` });
    }
  }
   else if ( monsterNumber === monsterCovered) {
     level = level - 1;
     const currentLevel = levels[level];
     setMap(currentLevel);
  }
});