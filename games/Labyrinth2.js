/*
@title: Labyrinth2
@author: DorukSarpAlwaysStrikesBack!
@tags: ['puzzle']
@addedOn: 2023-02-14
*/

const player = "p";
const labywall = "w";
const end = "e";
const textt = "t";
const texth = "h";
const textx = "x";
const textheart = "v";
const melody = tune`
147.05882352941177: b5~147.05882352941177,
147.05882352941177: a5~147.05882352941177,
147.05882352941177: g5~147.05882352941177,
294.11764705882354,
147.05882352941177: g5~147.05882352941177,
147.05882352941177: a5~147.05882352941177 + b5~147.05882352941177,
147.05882352941177: d5~147.05882352941177,
147.05882352941177,
147.05882352941177: g5~147.05882352941177 + c5~147.05882352941177 + e4~147.05882352941177,
147.05882352941177: g5~147.05882352941177,
147.05882352941177: e5~147.05882352941177,
147.05882352941177,
147.05882352941177: a4~147.05882352941177 + f5~147.05882352941177,
147.05882352941177: e4~147.05882352941177,
147.05882352941177: f5~147.05882352941177,
147.05882352941177: a4~147.05882352941177,
147.05882352941177: c5~147.05882352941177,
147.05882352941177: d5~147.05882352941177,
147.05882352941177: f5~147.05882352941177,
147.05882352941177: b4~147.05882352941177,
147.05882352941177: d5~147.05882352941177,
147.05882352941177: b4~147.05882352941177,
147.05882352941177: d5~147.05882352941177 + g5~147.05882352941177,
147.05882352941177,
147.05882352941177: e5~147.05882352941177,
147.05882352941177,
147.05882352941177: d5~147.05882352941177,
294.11764705882354,
147.05882352941177: f5~147.05882352941177,
147.05882352941177`
const playback = playTune(melody, Infinity)

setSolids([ player, labywall ])

setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3023333333333203
3003333333333003
3003333333333003
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ labywall, bitmap`
LLLLLLLLLLLLLLLL
0000000LL0000000
0000000LL0000000
LLLLLLLLLLLLLLLL
0000000LL0000000
0000000LL0000000
LLLLLLLLLLLLLLLL
0000000LL0000000
0000000LL0000000
LLLLLLLLLLLLLLLL
0000000LL0000000
0000000LL0000000
LLLLLLLLLLLLLLLL
0000000LL0000000
0000000LL0000000
LLLLLLLLLLLLLLLL`],
  [ textt, bitmap`
................
.00000000000000.
.00000000000000.
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................
................`],
  [ texth, bitmap`
................
................
................
.00..........00.
.00..........00.
.00..........00.
.00..........00.
.00000000000000.
.00000000000000.
.00..........00.
.00..........00.
.00..........00.
.00..........00.
.00..........00.
................
................`],
  [ textx, bitmap`
................
.00..........00.
..00........00..
...00......00...
....00....00....
.....00..00.....
......0000......
.......00.......
......0000......
.....00..00.....
....00....00....
...00......00...
..00........00..
.00..........00.
.0............0.
................`],
  [ textheart, bitmap`
............33..
...........3333.
.3333.....33333.
.33333...333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...33333333333..
....333333333...
.....33333333...
......33333.....
.......333......
.......333......
................`],
  [ end, bitmap`
1111111111111111
1LLL6666666LLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6666666LLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6666666LLLL1
1111111111111111`],
);


let level = 0;
const levels = [
  map`
wpwwwwwww
w....we.w
w.ww.ww.w
w..w..w.w
w..wwww.w
w.......w
wwwwwwwww`,
   map`
wwwwwwwwwwwwwwwwwww
w........w........w
w.wwwwww.wwwwwwww.w
w...wp...w.....ew.w
w...www..w......w.w
w....w...w......w.w
w....w...w......w.w
w....w...w.wwwwww.w
w....w...w........w
w....wwwww........w
w........wwwwwwww.w
w.................w
wwwwwwwwwwwwwwwwwww`,
     map`
wwwwwwwwww
w.wwww...w
w.w..w..pw
w....www.w
w.w...ew.w
w.wwwwww.w
w.w......w
w.w...w..w
w.wwwww..w
w..w.w...w
w..w.w...w
w........w
wwwwwwwwww`,
    map`
wwwwwwwwwwwwwwwwww
w........p.w.....w
w....wwwwwwww.ww.w
w.ww.w..w...w..w.w
w..w....w.w.w..w.w
w.ww..www.w.w..w.w
w..ww..w..w.w.ew.w
w...w.www.wwwwww.w
w...w...w..w..w..w
w...wwwww..w..w..w
w.....w....w.ww..w
w................w
wwwwwwwwwwwwwwwwww`,
    map`
wwwwwwwwwwww
w..........w
w.wwwww....w
w.w...w....w
w.w...ww..ew
w.w....wwwww
w.w........w
w.wwwwww.w.w
w......w.w.w
w......w.w.w
w......w.w.w
w......w.w.w
w...wwww.w.w
w...w....w.w
w...w....w.w
w...w.wwww.w
w...w.w....w
w...w.wwwwww
w...w......w
w...w......w
w.........pw
wwwwwwwwwwww`,
      map`
wwwwwwwwwwwwwwwwwwwww
w....w....w.........w
w....w....w.........w
w....w....w.........w
w.ww.w....w.wwwwww..w
w.w..w.wwww.we...w..w
w.w..w....w.w....w..w
w.w..w....w.wwww.w..w
w.w..w....w......w..w
w.w..w....wwwwwwww..w
w.ww.wwww..w........w
w..w.w..w..w.wwwwww.w
w..w.w..w..w.w..w...w
w..w.w..w..w.ww.w...w
w..w.w..w.......w...w
w..w.w..wwwwwwwww...w
w..w.w..............w
w..w.w..............w
w..wpw..............w
w..www..............w
w...................w
wwwwwwwwwwwwwwwwwwwww`,
    map`
wwwwwwwwwwwwwwwwwwwwwww
wpwthxv..w.w.......w..w
w.w......w.w.w....ew..w
w.wwwwwwww.w.wwwwwww..w
w.....................w
wwwwwwwwwwwwwwwwwwwwwww`,
  ]
const currentLevel = levels[level];
setMap(currentLevel);

  const cl = levels[level];
setMap(cl);

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

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
     }
});
afterInput(() => {
  
const targetNumber = tilesWith(end).length;
const numberCovered = tilesWith(end, player).length;
  if (numberCovered === targetNumber) {
     level = level + 1;

    const currentLevel = levels[level];
  
  if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 10, color: color`4` });
    }
  }
});
