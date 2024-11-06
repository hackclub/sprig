/*
@title: Labyrinth3
@author: DorukSarpAlwaysStrikesBack!
@tags: ['puzzle']
@addedOn: 2023-03-01
*/

const player = "p";
const labywall = "w";
const end = "e";
const textt = "t";
const texth = "h";
const textx = "x";
const textheart = "v";
const melody = tune`
500: a5~500,
500: b4~500,
500: c5~500,
500: g5~500,
500: e5~500,
500,
500: d5~500,
500: e5~500,
500: f5~500,
500: d5~500,
500: a4~500,
500: f4~500,
500: f5~500,
500: a4~500,
500: e5~500,
500: a5~500,
500: b4~500,
500: e5~500,
500: c5~500,
500: g5~500,
500: e5~500,
500: a5~500,
500: e5~500,
500: c5~500,
500: g5~500,
500: e5~500,
500: d5~500,
500: g5~500,
500: f5~500,
500: a5~500,
500: f5~500,
500: a5~500`
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
3003333333333003
3333333333333333
3003333003333003
3003333003333003
3003333003333003
3000000000000003
3333333333333333
3333333333333333`],
  [ labywall, bitmap`
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000`],
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
wpwwwwwwwwww
w....w.....w
w.ww.w.www.w
w.w..w.wew.w
w.w..w.w.w.w
w.wwww...w.w
w..w.wwwww.w
w..w.w.w...w
w..........w
wwwwwwwwwwww`,
   map`
wwwwwwwww
w......pw
w.wwwwwww
w.w.....w
w.w.w.www
w.w.w.w.w
w.w.w.w.w
w.w.wew.w
w.w.www.w
w.w...w.w
w.ww.ww.w
w.......w
wwwwwwwww`,
     map`
wwwwwwwwwwwwwwwww
w.......w.......w
w...wwwww.wwwww.w
w.w.w.w.w..pw.w.w
w.w.w.w.wwwww.w.w
w.w.w.......w.w.w
w.w.ww.wwww.w.w.w
w.w.ew.w....w.w.w
w.w..w.wwwwww.w.w
w.wwww........w.w
w......wwwwwwww.w
w...............w
wwwwwwwwwwwwwwwww`,
    map`
wwwwwwwwwwwwwwwwww
w.......w........w
w..w.w....wwwwww.w
w..wwww.w.wp..w..w
w..w..w.w.www.w..w
w.ww..w.w.....w..w
w..w.ww.wwwwwww..w
w..w....w....wwwww
w.ww....w.ww.wew.w
w..wwwwww..w.w.w.w
w.....w....w.w.w.w
w.ww.....wwwww.w.w
w..wwwwwww.....w.w
w................w
wwwwwwwwwwwwwwwwww`,
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
          addText("The end!", { y: 3, color: color`D` });
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
