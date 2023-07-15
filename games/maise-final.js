/*
@title: Maise 
@author: UrMma
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
const objhit = tune``;
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
.aa.aaaa.a.aaaa.aa...ap
..a.a....a.a..a...aaaa.
a..aa.aa.aoa.aaaaa.....
ao.a..aa...ao.....aa...
.....aaa.a.aa.a..aaao..
aa.aaaaaaa.aa.o..aaa...
.a.a..o.a.......oaaao..
o.......a.aaaaaaaaaaa..
aaaaaa.oa.aaaaaaaaaa...
aa......a.aaaaaaaaaa...
a..aaaa.a...........a..
ao.aaaa.aaaaa.ao...a..a
aa.aa...a.....a..aaa.aa
aa..aoaaa.aaaa..oa....a
aaa.a...a.....a..a.aaa.
a...aaa.aaaa..aaa..aaa.
e.aoa...a...o........aa`,
  map`
....aa....oaaa....a.a.aaaa.a.a.aaa..a.aaaap...
aa.....a.oa.a....a.aaa.aaa..aaaaaaa.a.aaaaaaa.
a.ao...a.aaaa.ao..a..o.a...a....aa.o..aaaaaaa.
.aaaa..a....aa....a...a.a.a.o.aa....aa....aaa.
...o.....aa....o.o.aa.aa.aaaaaaaaaao.a.aaaaa..
o....aaaa..a....aaa..a.aaaaaaa.a.aa..aa.aa....
.a..aaaa..aaaaa...aaaaaaaaaaaaa.ao.aaa.a......
....a...aa.a.aa..aaaa...a.a..aaa..a...aaa..o.o
a..a..o.....a.aa.a.aaa..aaaaaaaa.a.aa.aaa.a...
o..a.a.a.a..aaa..a.aaaaaaaaa.aaa.....a......a.
..ao..a....a..a.aa.aaaaa..aao..a.aao...aaa....
a.a.a.aaa..a.a.....a.aaaa..aaaa....a......a...
a.aaaaa..oa...aao...a..aaa.aaaaao..aaaa..o.a..
a....aa...a..a.aaaa..aa.aaa.aaa.a.aao...a.....
a.o.o.a.aaaaaaa.aaao....a.....aaa..a.....aaa..
aa..o.a...aaa.a..aaaaaa...a.a....aa.ao....a...
aaa...a.oaa.aaaaa.a..a.aaaa.a..a.aa..a..a.aaa.
a...aaaaa...aa.....o....a..a.....aaaa.aa..aaa.
a.oa...aaa.....a.a.aa.a..a.a..aa..aa......o..a
a.aaaa....aao.a..a.aaa...aa.aaa..aaa..o.o...a.
a.aaaaa.....aaa......a.a....a......aa.........
e.oa..a........a.....aaa...o....a.....o..o...a`
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