/*
@title: LabyrinthRedux
@author: DorukSarpAlwaysStrikesBack!
*/

const player = "p";
const labywall = "w";
const lab = "l";
const fend = "f";
const end = "e";
const melody = tune`
222.22222222222223: A5~222.22222222222223,
222.22222222222223: E5~222.22222222222223,
222.22222222222223: E4^222.22222222222223,
222.22222222222223: A5~222.22222222222223,
222.22222222222223: E5^222.22222222222223,
222.22222222222223: D4^222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: A4~222.22222222222223,
222.22222222222223,
222.22222222222223: C5~222.22222222222223 + F5~222.22222222222223,
222.22222222222223,
222.22222222222223: E5~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: A5^222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: F5~222.22222222222223,
222.22222222222223: G4^222.22222222222223,
222.22222222222223: A5^222.22222222222223,
222.22222222222223: F5~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: E5~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: G5^222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: A5~222.22222222222223 + D4^222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223: G5~222.22222222222223 + A4~222.22222222222223,
222.22222222222223: F5~222.22222222222223,
222.22222222222223: G5~222.22222222222223 + D5^222.22222222222223,
222.22222222222223: B4~222.22222222222223 + F4~222.22222222222223,
222.22222222222223: G5~222.22222222222223,
222.22222222222223: B4~222.22222222222223 + B5~222.22222222222223`
const playback = playTune(melody, Infinity)

addText("Labyrinth", { y: 6, color: color`4` });
addText("REDUX", { y: 9, color: color`3` });
addText("press J to start", { y: 12, color: color`2` });

setSolids([ player, labywall ])

setLegend(
  [ player, bitmap`
................
....33333333....
..333333333333..
..333333333333..
..333333333333..
.33320333302333.
.33301333310333.
.3330L3333L0333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
..333333333333..
...3333333333...
....33333333....`],
  [ labywall, bitmap`
00L00L00L00L00L0
LLLLLLLLLLLLLLLL
00L00L00L00L00L0
00L00L00L00L00L0
LLLLLLLLLLLLLLLL
00L00L00L00L00L0
00L00L00L00L00L0
LLLLLLLLLLLLLLLL
00L00L00L00L00L0
00L00L00L00L00L0
LLLLLLLLLLLLLLLL
00L00L00L00L00L0
00L00L00L00L00L0
LLLLLLLLLLLLLLLL
00L00L00L00L00L0
00L00L00L00L00L0`],
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
  [ fend, bitmap`
1111111111111111
1LLL666666LLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL666666LLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL6LLLLLLLLLL1
1LLL666666LLLLL1
1111111111111111`],
  [ lab, bitmap`
0000000000000000
0.........0....0
0.000000..0.00.0
0......0..0..0.0
000000L0..0..0.0
00...000..0..0.0
00........0..0.0
00........0..0.0
000000000.0000.0
0............0.0
0..........0.0.0
0.0000000000.0.0
0.0..........0.0
0.000000000000.0
0..............0
0000000000000000`],
);


let level = 0;
const levels = [
  map`
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww
wwwwwwwwwwww`,
    map`
wwwwwwwwwwwww
wpw.........w
w.w.wwww.ww.w
w.w..w.w.w..w
w.w..w.w.w..w
w.w..w.w.w..w
w.w..w.w.w..w
w.w.ew.w.w..w
w.wwww.www..w
w...........w
wwwwwwwwwwwww`,
   map`
wwwwwwwwwwwwww
wpw..........w
w.w.wwwwwwww.w
w.w..w.w.w.w.w
w.w..w.w.w.w.w
w.w..w.w.w.w.w
w.w.ew.w...w.w
w.wwww.www.w.w
w..........w.w
w............w
wwwwwwwwwwwwww`,
     map`
wwwwwww
wpw...w
w.wew.w
w.www.w
w.....w
wwwwwww`,
    map`
wwwwwwwwww
w........w
w.www..w.w
w.wpwwww.w
w.w.w.ew.w
w.w.w..w.w
w...w....w
wwwwwwwwww`,
    map`
wwwwwwwwwwwwww
w......p.....w
w.wwwwwwwwwwww
w.w..........w
w.w.w.wwwwwwww
w.w.w.w....wfw
w.w.w.w.ww.w.w
w.w.w.w.we.w.w
w.w.www.w..w.w
w.w...w.w..w.w
w.ww.ww.wwww.w
w............w
wwwwwwwwwwwwww`,
   map`
wwwwwwwwww
w..pw....w
w...w..w.w
w.wwww.w.w
w.we...w.w
w.w....w.w
w.w....w.w
w.wwwwww.w
w........w
wwwwwwwwww`,
     map`
wwwwwwwwwwww
w....wfw...w
w.ww.w.w.w.w
w.we.w.w.w.w
w.w..w.w.w.w
w.w..w.w.w.w
w.w..w.wpw.w
w.wwww.www.w
w..........w
w..........w
wwwwwwwwwwww`,
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

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  
})
