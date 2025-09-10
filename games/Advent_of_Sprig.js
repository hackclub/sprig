/*
@title: Advent of Sprig
@description: "Advent of Sprig" is a utility-themed game created by Leonard (Omay), where new games or levels are added each day. It features a menu from which players can select different game levels, involving puzzle-solving elements like pushing boxes and toggling on/off switches to reach goals. The game is designed to reveal new content over time, enhancing replayability and engagement.
@author: Leonard (Omay)
@tags: ['utility']
@addedOn: 2022-12-01
Every day, I will add a new game or level of a game.
*/

let scene = "menu";
let availDays = 6;

const d0l = "a";
const d1l = "b";
const d2l = "c";
const d0r = "k";
const d1r = "l";
const d2r = "m";
const d3r = "n";
const d4r = "o";
const d5r = "p";
const d6r = "q";
const d7r = "r";
const d8r = "s";
const d9r = "t";
const bg = "u";
const door = "v";
const sel = "w";
const player = "x";
const wall = "y";
const goal = "z";
const box = "0";
const bg2 = "1";
const on = "2";
const off = "3";

setLegend(
  [player, bitmap`
.........33.....
........33322...
.......333.22...
.......333......
......33333.....
.....3333333....
....222222222...
...0..0..0..0...
...0........0...
....0..00..0....
.....0....0.....
......0000......
......0..0......
......0..0......
......0..0......
.....00..00.....`],
  [wall, bitmap`
1111111111111111
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
CCCCCCC1CCCCCCC1
1111111111111111
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
CCC1CCCCCCC1CCCC
1111111111111111
1CCCCCCC1CCCCCCC
1CCCCCCC1CCCCCCC
1CCCCCCC1CCCCCCC
1111111111111111
CCCC1CCCCCCC1CCC
CCCC1CCCCCCC1CCC
CCCC1CCCCCCC1CCC`],
  [box, bitmap`
.....333.33.....
.....3..3.3.....
.....3.3..3.....
......3333......
.DDDDDD33DDDDDD.
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
3333333333333333
3333333333333333
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
DDDDDDD33DDDDDDD
.DDDDDD33DDDDDD.`],
  [goal, bitmap`
................
.......DD.......
......DDDD......
.......DD.......
......DDDD......
.....DDDDDD.....
......DDDD......
.....DDDDDD.....
....DDDDDDDD....
.....DDDDDD.....
....DDDDDDDD....
...DDDDDDDDDD...
.......CC.......
.......CC.......
.......CC.......
.......CC.......`],
  [on, bitmap`
4444444444444444
4444444444444444
4444444DD4444444
444444DDDD444444
44444DDDDDD44444
444444DDDD444444
44444DDDDDD44444
4444DDDDDDDD4444
44444DDDDDD44444
4444DDDDDDDD4444
444DDDDDDDDDD444
4444444DD4444444
4444444DD4444444
4444444DD4444444
4444444444444444
4444444444444444`],
  [off, bitmap`
3333333333333333
33333333CCCCC333
3333333CCCCCC333
3333333CCCCCC333
333333CCCCC3CC33
333333CCCC33CC33
33333CCCCC333333
33333CCCCCC33333
3333CCCCCCCC3333
3333CCCCCCCC3333
333CCCCCCCCCC333
333CCCCCCCCCC333
33CCCCCCCCCCCC33
33CCCCCCCCCCCC33
3333333333333333
3333333333333333`],
  [sel, bitmap`
2222222222222222
22............22
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
22............22
2222222222222222`],
  [d0l, bitmap`
................
................
..00000.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..0...0.........
..00000.........
................
................`],
  [d1l, bitmap`
................
................
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
....0...........
................
................`],
  [d2l, bitmap`
................
................
..00000.........
......0.........
......0.........
......0.........
......0.........
..00000.........
..00000.........
..0.............
..0.............
..0.............
..0.............
..00000.........
................
................`],
  [d0r, bitmap`
................
................
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
................
................`],
  [d1r, bitmap`
................
................
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
...........0....
................
................`],
  [d2r, bitmap`
................
................
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
.........00000..
.........0......
.........0......
.........0......
.........0......
.........00000..
................
................`],
  [d3r, bitmap`
................
................
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
................
................`],
  [d4r, bitmap`
................
................
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.............0..
................
................`],
  [d5r, bitmap`
................
................
.........00000..
.........0......
.........0......
.........0......
.........0......
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
................
................`],
  [d6r, bitmap`
................
................
.........00000..
.........0......
.........0......
.........0......
.........0......
.........00000..
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
................
................`],
  [d7r, bitmap`
................
................
.........00000..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
................
................`],
  [d8r, bitmap`
................
................
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
................
................`],
  [d9r, bitmap`
................
................
.........00000..
.........0...0..
.........0...0..
.........0...0..
.........0...0..
.........00000..
.........00000..
.............0..
.............0..
.............0..
.............0..
.........00000..
................
................`],
  [bg, bitmap`
44D4D4D44D4D4444
DD44D4D44D44DDDD
444D44D44D444444
44D44D44D4444444
DD44D44D44DDDDDD
444D44D44D444444
DDD44D44D4444DDD
4444D44D4444D444
4444D4D4444D4444
4444DD4444D44444
4444D4444D444444
DD44D444D444DDDD
44D4D44D444D4444
44D4D4D444D44444
44D4D4D44D4D4444
44D4D4D44D4D4444`],
  [bg2, bitmap`
7757757757757757
7757757757757757
7757757757757757
7577577577577577
7757757757757757
7757757757757757
7757757757757757
7757757757757757
7577577577577577
7757757757757757
7757757757757757
7757757757757757
7757757757757757
7577577577577577
7757757757757757
7757757757757757`]
);

setSolids([player, wall, box]);
setPushables({[player]: [box]});

let level = 0;
const levels = [
  map`
.............
.b.a.b.b.c.a.
.............
.b.b.a.a.b.c.
.............
.a.b.a.c.a.b.
.............
.a.b.a.b.c.c.
.............`,
];
const levels2 = [
  map`
.............
.k.o.s.n.l.n.
.............
.o.l.m.p.m.n.
.............
.l.t.q.m.s.p.
.............
.r.r.t.q.k.o.
.............`,
];
const games = [
  map`
yyyyyyyyyy
yx.y..y..y
y..y..y..y
y........y
y.0......y
y..y..y..y
y..y..y.zy
yyyyyyyyyy`,
  map`
yyyyyyyyyy
yx.....0zy
y.yyyyyy.y
y....0zy.y
y....0zy.y
y.yyyyyy.y
y......0zy
yyyyyyyyyy`,
  map`
yyyyyyyyyy
yz.....0.y
yyyyyy0y.y
yz...0.y.y
yyyy0y.y.y
yz.0.y.y.y
yyyyzyzyxy
yyyyyyyyyy`,
  map`
yyyyyyyyyy
y333333y3y
y3yyyy3y3y
y3y3xy3y3y
y3y3333y3y
y3yyyyyy3y
y33333333y
yyyyyyyyyy`,
  map`
yyyyyyyyyy
yx333333yy
y3y3y3y3yy
y3333333yy
y3y3y3y3yy
y3333333yy
yyyyyyyyyy
yyyyyyyyyy`,
  map`
yyyyyyyyyy
yx.....33y
y.yyyyy33y
y.yzzz033y
y.y00z033y
y33333333y
y33333333y
yyyyyyyyyy`
];
var m = Math.Infinity;
const days = [[m,m,m,m,m,m,m,m,m,m,m,m,m],[m,10,m,4,m,18,m,13,m,21,m,3,m],[m,m,m,m,m,m,m,m,m,m,m,m,m],[m,14,m,11,m,2,m,5,m,12,m,23,m],[m,m,m,m,m,m,m,m,m,m,m,m,m],[m,1,m,19,m,6,m,22,m,8,m,15,m],[m,m,m,m,m,m,m,m,m,m,m,m,m],[m,7,m,17,m,9,m,16,m,20,m,24,m],[m,m,m,m,m,m,m,m,m,m,m,m,m]];
function addMap(mapa){
  mapa = mapa.split("\n");
  for(var i = 0; i < mapa.length; i++){
    for(var j = 0; j < mapa[i].length; j++){
      if(mapa[i].charAt(j) !== "."){
        addSprite(j, i-1, mapa[i].charAt(j));
      }
    }
  }
}
setMap(levels[level]);
addMap(levels2[level]);
addSprite(0, 0, sel);
setBackground(bg);

onInput("w", () => {
  if(scene === "menu"){
    getFirst(sel).y -= 1;
  }else{
    getFirst(player).y -= 1;
  }
});
onInput("a", () => {
  if(scene === "menu"){
    getFirst(sel).x -= 1;
  }else{
    getFirst(player).x -= 1;
  }
});
onInput("s", () => {
  if(scene === "menu"){
    getFirst(sel).y += 1;
  }else{
    getFirst(player).y += 1;
  }
});
onInput("d", () => {
  if(scene === "menu"){
    getFirst(sel).x += 1;
  }else{
    getFirst(player).x += 1;
  }
});
onInput("i", () => {
  if(scene === "menu"){
    if(days[getFirst(sel).y][getFirst(sel).x] <= availDays){
      scene = "game"+days[getFirst(sel).y][getFirst(sel).x];
      setMap(games[days[getFirst(sel).y][getFirst(sel).x]-1]);
      setBackground(bg2);
      checkOnOff();
    }
  }
});
onInput("j", () => {
  if(scene !== "menu"){
    setMap(games[parseInt(scene.substr(4))-1]);
    setBackground(bg2);
    checkOnOff();
  }
});
function checkOnOff(){
  var a = tilesWith(player);
  for(var i = 0; i < a.length; i++){
    for(var j = 0; j < a[i].length; j++){
      if(a[i][j].type === on){
        a[i][j].type = off;
      }else if(a[i][j].type === off){
        a[i][j].type = on;
      }
    }
  }
}
afterInput(() => {
  checkOnOff();
  if(scene !== "menu"){
    if(tilesWith(goal, box).length === tilesWith(goal).length && getAll(off).length === 0){
      scene = "menu";
      setMap(levels[level]);
      addMap(levels2[level]);
      addSprite(0, 0, sel);
      setBackground(bg);
    }
  }
});
