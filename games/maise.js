/*
@title: Maise
@author: UrMma
@tags: []
@addedOn: 2023-07-24

Instructions:
1. Use WASD keys to navigate around mases to reach the PR pad.
2. Stay away from fires otherwise you shall get burnt and the level will restart
3. Press i to reset
*/
const player = "p";
const endpad = "e";
const wall = "a";
const obs = "o";
const bgmusic = tune`
114.50381679389314: E4^114.50381679389314 + B4^114.50381679389314,
114.50381679389314: G4^114.50381679389314,
114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314: D5^114.50381679389314,
114.50381679389314,
114.50381679389314: D5^114.50381679389314,
114.50381679389314: C5^114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314: A4^114.50381679389314,
114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314,
114.50381679389314: D5^114.50381679389314,
114.50381679389314: C5^114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314: A4^114.50381679389314,
114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314,
114.50381679389314: D5^114.50381679389314,
114.50381679389314: C5^114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314: A4^114.50381679389314,
114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314: D5^114.50381679389314,
114.50381679389314: C5^114.50381679389314,
114.50381679389314: B4^114.50381679389314,
114.50381679389314: A4^114.50381679389314,
114.50381679389314: G4^114.50381679389314,
114.50381679389314`;
const objhit = tune`
16000`;
setLegend(
  [ player, bitmap`
......333.......
......333.......
......333.......
.......3........
....3333333.....
...3..333..3....
..3...333...3...
.3....333....3..
.3....333....3..
.....33333......
.....3...3......
.....3...3......
.....3...3......
.....3...3......
.....3...3......
.....3...3......`],
[endpad, bitmap`
4444444444444444
4444444444444444
4444433333334444
4444366666663444
4443363333363344
4433363333363334
4433363333363334
4433366666663334
4433363333333334
4433363666663334
4433363633363334
4433363633663334
4443333666633344
4444333663333444
4444433636334444
4444444644644444`],
[wall, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000`],
  [obs, bitmap`
......6..6......
.....6.66..6....
.....6666.6.....
...6666666.6....
....6666666.....
...669999666....
...669999666....
...66999996.....
....6999996.....
....6633366.....
.....CCCCC......
....C.C.C.C.....
...C.C.C.C.C....
..C.C.C.C.C.C...
................
................`]
);
const playback = playTune(bgmusic, Infinity);
setSolids([player,wall]);
let level = 0;
const levels = [
  map`
a.....a..ap
a.aaa.aoaa.
a.a.a.a.a..
a.a.a.a...a
e.o.a...aaa`,
  map`
p.a......a.o.aa
.aa.oaa.aa....a
..a..a.....aa..
a.aaaa..a..a...
a.......a..a.o.
aa.o.aaaaaaaa..
a.o.....ao.a...
aaaa.......a.oe`,
  map`
aa.aaa....o....ap.
..o....a....oa.ao.
o...aaaaaaaaaa.aa.
aa.oa.aaaa.o...a..
o...a.aaaa...aaa..
aaa.a...........a.
aaa.aaaaa.ao...a..
a...a.....a..aaa.a
a.aaa.aaaa..oa...o
a...a.....a..a.aaa
aaa.aaaa..aaa..aaa
ae..a...o......o.a`,
  map`
....oa.a.aa..aaaa....p
.oo......ooa.aaaaao.oa
.aaaao.aa.aaaoaaa.a.aa
..oaao....a.....aa....
o..oaaaaa...a.a.o.....
aa..a..a.aaaa.a..a.oo.
.o...o....a..a.o...aaa
.a.a.aa.a..a.a..aa.oaa
ao.a.aaao..aa.aaa..aaa
ooao.o.a.a....a.....oa
e....aoaaao..o...oa...`,
  map`
e.aaaaaaaaaaaaop
a..aa...aooaaao.
ao.a....aoooaa..
aa...aa.....ao.o
aa.oa.a.aaa.aa..
aaooo.....o..aa.
aooooo.a...a....
oooooooaaaaaaaaa`,
  map`
aao...o...o...o...
aao.o.o.o.o.o.o.o.
aao.o.o.o.o.o.o.o.
aao.o.o.o.o.o.o.o.
aao.o.o.o.o.o.o.o.
aao.o.o.o.o.o.o.o.
....o.o.o.o.o.o.o.
.oo.o.o.o.o.o.o.o.
eoooo...o...o...op`,
  map`
eooooooooooooooo
..oooooooooo....
o..oooooooo..oo.
oo..oo...oo.ooo.
ooo....o....ooo.
ooooooooooooooo.
ooooooooooooooop
oooooooooooooooo`,
  map`
e.oooooooooooooooooo
o.oooooooooooooo....
o..oooooooooooo..oo.
oo..oooooooooo..ooo.
ooo..oooooooo..oooo.
oooo..oooooo..ooooo.
ooooo..oooo..oooooo.
oooooo..oo..ooooooo.
ooooooo....oooooooo.
ooooooooooooooooooop`
];

setMap(levels[level]);
let score = 0;
onInput("a", () => {
  getAll(player).forEach(s => s.x -= 1)
});
onInput("d", () => {
  getAll(player).forEach(s => s.x += 1)
});
onInput("w", () => {
  getAll(player).forEach(s => s.y -= 1)
});
onInput("s", () => {
  getAll(player).forEach(s => s.y += 1)
});
onInput("i", () => {
  level = 0;
  setMap(levels[level]);
});
afterInput(() => {
  clearText();
const targetNum = tilesWith(endpad).length;
const numCov = tilesWith(endpad, player).length;
  if (numCov === targetNum) {
     level = level + 1;  
  if (level in levels) setMap(levels[level]);
  else {
      addText("YOU WIN!", { y: 6, color: color`0` });
      addText("Press i to restart",{y: 8, color:`0` });
    }
  }
  if(tilesWith(player, obs).length > 0){
    playTune(objhit);
    addText("Try Again!",{y: 4, color: `0`});
    setMap(levels[level]);
  }
});
function wlevel() {
  addText(`${level += 1}`, {
  y: 1,
  x: 9,
  color: color`4`
  });
}
