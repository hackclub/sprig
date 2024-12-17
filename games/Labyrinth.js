/*
@title: Labyrinth
@author: DorukSarpAlwaysStrikesBack!
@tags: ['puzzle']
@addedOn: 2023-02-12
*/

const player = "p";
const labywall = "w";
const end = "e";
const melody = tune`
147.05882352941177: a5^147.05882352941177,
441.1764705882353,
147.05882352941177: f5^147.05882352941177,
147.05882352941177,
147.05882352941177: f5^147.05882352941177,
147.05882352941177,
147.05882352941177: g5^147.05882352941177,
147.05882352941177,
147.05882352941177: d5^147.05882352941177,
147.05882352941177,
147.05882352941177: f5^147.05882352941177,
294.11764705882354,
147.05882352941177: f5-147.05882352941177,
294.11764705882354,
147.05882352941177: a4-147.05882352941177,
147.05882352941177: d5-147.05882352941177,
147.05882352941177,
147.05882352941177: a4-147.05882352941177,
147.05882352941177: e5-147.05882352941177,
147.05882352941177,
147.05882352941177: g4-147.05882352941177 + g5-147.05882352941177,
147.05882352941177: e5-147.05882352941177,
147.05882352941177,
147.05882352941177: a5-147.05882352941177,
147.05882352941177: b4-147.05882352941177,
147.05882352941177,
147.05882352941177: f4-147.05882352941177 + e5-147.05882352941177,
147.05882352941177: g5-147.05882352941177`
const playback = playTune(melody, Infinity)

setSolids([ player, labywall ])

setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ labywall, bitmap`
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
  [ end, bitmap`
LLLLLLLLLLLLLLLL
L11166666661111L
L11161111111111L
L11161111111111L
L11161111111111L
L11161111111111L
L11161111111111L
L11166666661111L
L11161111111111L
L11161111111111L
L11161111111111L
L11161111111111L
L11161111111111L
L11161111111111L
L11166666661111L
LLLLLLLLLLLLLLLL`],
);


let level = 0;
const levels = [
  map`
wwwwwwwwwwpwwwwwwwww
w....w.............w
w..w.w.............w
w..wwwwww....wwwww.w
w...w.w......w.w.w.w
w...w.w......w.w.w.w
www.w.w..wwwww.w.w.w
w...w.w..w...w.w.w.w
w...w.w..w...w...w.w
w.....w..w....w.ww.w
w.w...w..w.........w
w.w...w..w....www..w
w.w..ww..w.ww.w.w..w
w.w..w...w..w.w.ww.w
w.wwww..ww..w.w....w
w.......w...w.w..w.w
w.......w..wwww..w.w
w.......w..w.....w.w
w.......w..w.....w.w
wwwwwwwwwwewwwwwwwww`,
   map`
wwwwwwwwwwwww
w...........w
w.w.wwwwww..w
w.w.w....w..w
w.www.ww.w..w
w...w..w.ww.w
w.w.w.ew....w
w.wwwwwww...w
w.w.....www.w
w.w.....wpw.w
w...wwwww.www
w...........w
wwwwwwwwwwwww`,
     map`
wwwwwwwwww
w........w
w.wwww..pw
w.w..wwwww
w.w......w
w.w..www.w
w.wwwwew.w
w.w....w.w
w......w.w
w.wwwwww.w
w.w......w
w........w
wwwwwwwwww`,
    map`
wwwwwwwwwww
w........pw
w....wwwwww
w.ww.w..w.w
w..w....w.w
w.ww..www.w
w..ww..we.w
w...w.www.w
w...w...w.w
w...wwwww.w
w.....w...w
w.........w
wwwwwwwwwww`,
    map`
wwwwwwwwwwww
www........w
w.wwww..p..w
w.w..wwwww.w
w.w........w
w.w.wwwwww.w
w.wwwwew.w.w
w.w....w.w.w
w...w..w.w.w
w.wwwwww.w.w
w.w......w.w
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
