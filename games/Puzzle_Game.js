/*
@title: Puzzle_Game
@author: Amelia
@tags: ['puzzle','timed']
@addedOn: 2022-10-20
*/

const player = "p";
const box = "b";
const wall = "w";
const thing = "t";
const goal = "g";

setLegend(
  [ player, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66633366333666.
.66633366333666.
.66633366333666.
.66666666666666.
.66666666666666.
.66666666666666.
.66663333336666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................`],
  [ box, bitmap`
CCCCCCCCCCCCCCCC
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
CCCCCCCCCCCCCCCC
C.....C..C.....C
C.....C..C.....C
CCCCCCCCCCCCCCCC
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
C.....C..C.....C
CCCCCCCCCCCCCCCC`],
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
  [ thing, bitmap`
0..............0
.0............0.
..0..........0..
...0........0...
....0......0....
.....0....0.....
......0..0......
.......00.......
.......00.......
......0..0......
.....0....0.....
....0......0....
...0........0...
..0..........0..
.0............0.
0..............0`],
  [ goal, bitmap`
................
................
................
................
................
......444444....
......444444....
......444444....
......444444....
......4.........
......4.........
......4.........
......4.........
......4.........
................
................`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
p.g`,
  map`
wwww......wwwww
...w.ww.w.....w
.w.w.w..wwwww.w
.w.w.ww.....w.w
.w....w.www.w.w
.wwww.w.w.w.w.w
......w.w.w.w.g
.wwwwww.w.w.www
........w.w....
wwwwwwwww.wwww.
......w......w.
w.w.w.w.wwww.w.
w.w.....w.w....
w.wwww.ww.wwww.
w....w....w....
wwwwpw.ww.wwww.`,
  map`
p.w..g
.bw...
..w...
..w...
..w...
..t...`,
  map`
.wwwg.....w
.w.w......w
.w.w......w
.w.wwwwwtww
ww.........
...........
wwwww.www..
....w.w...w
..w.w.w.b.w
p.w...w...w
www.wwwwwww
w.....wwwww`,
  map`
.......................
.......................
..wwwwwwwwwwwwwwwwwwww.
..w.................ww.
..w.wwwwwwwwwwwwwww.ww.
..w.w.............w.wwt
..w.w.wwwwwwwwwww.w.wwg
..w.w.w.........w.w.wwt
..w.w.w.wwwwwww.w.w.ww.
..w.w.w.w.....w.w.w.ww.
..w.w.w.w.www.w.w.w.ww.
..w.w.w.w..pw.w.w.w.ww.
..w.w.w.wwwww.w.w.w.ww.
..w.w.w.......w.w.w....
..w.w.wwwwwwwww.w.wwwww
..w.w...........w.w...w
..w.wwwwwwwwwwwww...b.w
..w.............w.....w
..w.............w.wwwww
..wwwwwwwwwwwwww.twww..
....................w..
....................w..
..................www..`,
];

setSolids([ player, box, wall, thing ]);

setMap(levels[level]);

setPushables({
  [ player ]: [box], [ box ]: [thing], [thing]:[thing]
});


onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

//reset level
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

//from editor.sprig.hackclub.com/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/Flurffy.js
var tempototal = 100;
    var tempodescendo = setInterval(function(){
    tempototal--;
    clearText();
    addText(""+tempototal, { y: 1 , color: color`3` });
      if(tempototal <= 0){
        clearTile(getFirst(player).x,getFirst(player).y);
        clearInterval(tempodescendo);
        clearText()
    }
    },1000);
 
afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
