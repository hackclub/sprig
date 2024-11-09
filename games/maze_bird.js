/*
@title: maze bird
@author: rkohm
@tags: ['puzzle']
@addedOn: 2023-01-01
*/

const player = "p";
const wall = "w";
const finish = "f";

setLegend(
  [ player, bitmap`
................
................
................
........HHHHH...
.......HH888H...
.....HHH8808HH..
....HH8888888H..
....H8888888HH..
....HH888888H...
.....H88888HH...
.....HHHHHHH....
......H...H.....
................
................
................
................`],
  [ wall, bitmap`
00LL000000LL0000
00LL000000LL0000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
00LL000000LL0000
00LL000000LL0000
00LL000000LL0000
00LL000000LL0000
00LL000000LL0000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
00LL000000LL0000
00LL000000LL0000
00LL000000LL0000
00LL000000LL0000
00LL000000LL0000`],
  [ finish, bitmap`
................
.758HHHHHHHH857.
.5758HHHHHH8575.
.85222222222258.
.H822222222228H.
.HH2222222222HH.
.HH2222222222HH.
.HH2222222222HH.
.HH2222222222HH.
.HH2222222222HH.
.HH2222222222HH.
.H822222222228H.
.85222222222258.
.5758HHHHHH8575.
.758HHHHHHHH857.
................`],
);

setSolids([ player, wall]);

let level = 0;

const levels = [
  map`
pwwwww
.....w
.www.w
...w.f
wwwwww`,
  map`
pwwwwwwwfw
.....www.w
wwww.www.w
ww.....w.w
wwwwww.w.w
w...ww.w.w
w.w.ww.w.w
w.w....w.w
w.wwwwww.w
w........w
wwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
www..............wfw
ww...www.......w.w.w
ww.wwwwwwwwww.wwww.w
w..w...............w
w.wwww..wwwwwwwwwwww
w.w..w..w.....w...ww
w.w..wwww.wp..w.wwww
w.w.......wwwww.w.ww
w.ww..www...w...w.ww
w..www..www.wwwww.ww
w..w......w.......ww
w..w.ww.....wwwwwwww
w.ww.wwwww.ww......w
w....wwwww....wwwwww
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
www...wwwwww...w
w...w..w.w.w.w.w
w.wwww.fww.w.w.w
w....www.w.w...w
w.ww.w.www.w...w
w..w.w.........w
wwww..www.wwww.w
ww...wwwwww.ww.w
wwww.wp...w..w.w
w.ww.ww.w.ww.w.w
w.....w.w....w.w
w.wwwww.wwwwww.w
w.w..........w.w
w...wwww..ww...w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....w.ww........wwwfw
ww.w....w.wwwww..www.w
ww.w.wwwwwwww.w...w..w
w..w.w...w..w.wwwww.ww
w.ww.w.w.w........w.ww
w..w.w.w.w.ww.wwwww.ww
ww.w...w...wwwwww...ww
w..w.w.www.w..w...w..w
w.ww.w.www...wwww.wwww
w..w.w..w..w......ww.w
ww.www.wwwwwwwwwwww..w
w...w...w.ww........ww
www.ww.......w.wwww.ww
www..w.www..ww.w.....w
w.ww.wwwwwwwww.wwww..w
w.w.............w.ww.w
w.wwwwwwwwwwwwwww..w.w
w.ww..ww......ww...w.w
w.........ww......ww.w
w.wwwwwwwwwwwwwwwww..w
wp..................ww
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
w.......w........wwww
w.wwwww.w.w.wwwwwww.w
w.w...w...w.......w.w
w.w.w..wwww.w.www.w.w
w.w....ww...w.w.w.w.w
w.www...www.w.w.w.w.w
w.www.w...www.w.w.w.w
w...w.w.......w.w.w.w
www.w.w.wwwwwww.www.w
w...ww..wp..........w
w.wwwww.ww.wwwwwww.ww
w....ww.ww.w.....w.ww
w.ww.w...w.w.w.....ww
w...www.ww.w...w.wwww
w..ww....w.wwwww....w
ww...www...wwwwwwww.w
ww.w.wwwwwwww.....www
w.ww...ww.....w.w..ww
w....w....www...ww.fw
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
ww.wwwww.www.w.........w...ww..w..ww.ww.ww....wwww
w..ww.w....w.w.www.wwwwww......ww....w...w.ww..w.w
w.....www....w...w..w...ww..w...ww.w...w...www...w
ww.www.w..w..w.www.www.....www...w....wwwwww.w..ww
ww..w..ww.ww.w.w...w.w..w....ww..ww.w.www....w.www
ww..ww..w.w..w.www.w.ww.www...w...w.w.....wwww...w
w..ww..ww.ww.w.ww.........w.www.wwwwwwwww.w......w
ww.....w....ww.w..www..wwwwww......ww...w.w.w.w.ww
ww..wwww.ww..www.wwwwwww.......ww..w....w.wwwww.ww
ww.www...........w.wwwwwwww.wwwwwwww.ww.www...w..w
ww.w.wwwwwwwww.w.........ww....w.............ww.ww
w..w.w.......www.wwwwwwwfww.ww....wwwwwwww..ww..ww
ww.....w...www.wwww...wwwww..wwwwww.w....ww..w..ww
ww.w.w...w.w.....wwww.wwwwwww..w....w.ww.w...ww..w
ww.wwwwwww.www.w.w.....w..........w.w......w.w..ww
ww...w.www...w.w.www..ww..ww..w.w.w.www..w...ww.ww
w..w.....www...w.ww......wwww.www..w..w..w.w....ww
w.wwwwww.w.ww..w.w...w.w.ww.wwwwwww.....wwwww...ww
w.ww.w.w.w..ww.w.ww.wwwwww...w...ww.www.w.....wwww
w..w.....w...www.....ww.w..w...w....ww..wwwww.w..w
ww.wwww..w.wwwww.www.........wwwwww.w..ww...w....w
w..w..w.ww.ww....w.wwwww.wwwwwwwwww.wwwwww.ww.wwww
ww..p.www...wwwwww.w.....w.............ww..wwwww.w
w..ww.....w..........ww.ww..ww..wwwww............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("s", () => {
  getFirst(player).y += 1
  playTune(melody)
});

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(melody)
});

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(melody)
});

onInput("d", () => {
  getFirst(player).x += 1
  playTune(melody)
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
     }
});

const melody = tune`
132.7433628318584,
132.7433628318584: c5-132.7433628318584,
132.7433628318584: c5-132.7433628318584,
3849.5575221238937`

afterInput(() => {
  
const targetNumber = tilesWith(finish).length;
const numberCovered = tilesWith(finish, player).length;
  if (numberCovered === targetNumber) {
     level = level + 1;

    const currentLevel = levels[level];
  
  if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`5` });
    }
  }
});
