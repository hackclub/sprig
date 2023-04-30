/*
@title: Maise 
@author: UrMma
Instructions: Use WASD keys to navigate around mases to reach the PR pad.
*/

const player = "p";
const endpad = "e";
const wall = "a";

setLegend(
  [ player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0040404440040400
0004004040040400
0004004040040400
0004004440044400
0000000000000000
0000000000000000
0444040004004040
0404040040404440
0444040040400400
0400040444440400
0400040400040400
0000000000000000`],
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
0000000000000000`]
);

setSolids([player,wall]);

let level = 0;
const levels = [
  map`
a.....a..ap
a.aaa.a.aa.
a.a.a.a.a..
a.a.a.a...a
e...a...aaa`,
  map`
p.a......a...aa
.aa..aa.aa....a
..a..a.....aa..
a.aaaa..a..a...
a.......a..a...
aa...aaaaaaaa..
a.......a..a...
aaaa.......a..e`,
  map`
.aa.aaaa.a.aaaa.aa...ap
..a.a....a.a..a...aaaa.
a..aa.aa.a.a.aaaaa.....
a..a..aa...a......aa...
.....aaa.a.aa.a..aaa...
aa.aaaaaaa.aa....aaa...
.a.a....a........aaa...
........a.aaaaaaaaaaa..
aaaaaa..a.aaaaaaaaaa...
aa......a.aaaaaaaaaa...
a..aaaa.a...........a..
a..aaaa.aaaaa.a....a..a
aa.aa...a.....a..aaa.aa
aa..a.aaa.aaaa...a....a
aaa.a...a.....a..a.aaa.
a...aaa.aaaa..aaa..aaa.
e.a.a...a............aa`,
  map`
....aa.....aaa....a.a.aaaa.a.a.aaa..a.aaaap...
aa.....a..a.a....a.aaa.aaa..aaaaaaa.a.aaaaaaa.
a.a....a.aaaa.a...a....a...a....aa....aaaaaaa.
.aaaa..a....aa....a...a.a.a...aa....aa....aaa.
.........aa........aa.aa.aaaaaaaaaaa.a.aaaaa..
.....aaaa..a....aaa..a.aaaaaaa.a.aa..aa.aa....
.a..aaaa..aaaaa...aaaaaaaaaaaaa.a..aaa.a......
....a...aa.a.aa..aaaa...a.a..aaa..a...aaa.....
a..a........a.aa.a.aaa..aaaaaaaa.a.aa.aaa.a...
...a.a.a.a..aaa..a.aaaaaaaaa.aaa.....a......a.
..a...a....a..a.aa.aaaaa..aa...a.aa....aaa....
a.a.a.aaa..a.a.....a.aaaa..aaaa....a......a...
a.aaaaa...a...aa....a..aaa.aaaaa...aaaa....a..
a....aa...a..a.aaaa..aa.aaa.aaa.a.aa....a.....
a.....a.aaaaaaa.aaa.....a.....aaa..a.....aaa..
aa....a...aaa.a..aaaaaa...a.a....aa.a.....a...
aaa...a..aa.aaaaa.a..a.aaaa.a..a.aa..a..a.aaa.
a...aaaaa...aa..........a..a.....aaaa.aa..aaa.
a..a...aaa.....a.a.aa.a..a.a..aa..aa.........a
a.aaaa....aa..a..a.aaa...aa.aaa..aaa........a.
a.aaaaa.....aaa......a.a....a......aa.........
e..a..a........a.....aaa........a............a`
];

setMap(levels[level]);
let score = 0;
onInput("a", () => {
  getAll(player).forEach(s => s.x -= 1)
  tune`
500: C5/500 + B4/500,
15500`
});
onInput("d", () => {
  getAll(player).forEach(s => s.x += 1)
    tune`
500: C5/500 + B4/500,
15500`
});
onInput("w", () => {
  getAll(player).forEach(s => s.y -= 1)
    tune`
500: C5/500 + B4/500,
15500`
});
onInput("s", () => {
  getAll(player).forEach(s => s.y += 1)
    tune`
500: C5/500 + B4/500,
15500`
});
afterInput(() => {
  
const targetNum = tilesWith(endpad).length;
const numCov = tilesWith(endpad, player).length;
  if (numCov === targetNum) {
     level = level + 1;  
  if (level in levels) setMap(levels[level]);
  else {
      addText("you win!", { y: 4, color: color`0` });
    }
  }
});
function wlevel() {
  addText(`${level += 1}`, {
  y: 1,
  x: 9,
  color: color`4`
  });
}
