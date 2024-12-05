/*
@title: Mirror_Mirror
@author: Benjamin Grelk
@tags: ['puzzle']
@addedOn: 2022-12-19
*/

const player = "p";
const mirror = "m";
const wall = "w";
const exit = "e";
const bg = "b"

const walkEffect = tune`
65.78947368421052: b4~65.78947368421052,
2039.4736842105262`;
const failEffect = tune`
122.44897959183673: f5~122.44897959183673,
122.44897959183673: c5~122.44897959183673,
3673.469387755102`;
const passEffect = tune`
128.2051282051282: d5~128.2051282051282,
128.2051282051282: g5~128.2051282051282,
3846.153846153846`;

setLegend(
  [player, bitmap`
................
................
.....000000.....
....00990000....
....09999990....
....09099090....
....09099090....
....09999990....
.....099990.....
.....500005.....
....0.0770.0....
....0.0770.0....
......0000......
......0..0......
......3..3......
......0..0......`],
  [mirror, bitmap`
................
................
.....000000.....
....00440000....
....04444440....
....04044040....
....04044040....
....04444440....
.....044440.....
.....H0000H.....
....0.0550.0....
....0.0550.0....
......0000......
......0..0......
......D..D......
......0..0......`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [exit, bitmap`
LLLLLLLLLLLLLLLL
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
L44444444444444L
LLLLLLLLLLLLLLLL`],
  [bg, bitmap`
77777777L7777777
77777777L7777777
77777777L7777777
77777777L7777777
77777777L7777777
77777777L7777777
77777777L7777777
77777777LLLLLLLL
LLLLLLLL77777777
7777777L77777777
7777777L77777777
7777777L77777777
7777777L77777777
7777777L77777777
7777777L77777777
7777777L77777777`]
  );

setSolids([player, mirror, wall]);

let level = 0;
const levels = [
  map`
p......wm..w...
.......w...w...
.......w...w...
.......w...w...
.......w...w...
.......w...w...
wwww...w.......
.......w.......
......ew......e`,
  map`
p.w....wm......
..ww...w...ww..
w..wwwww.......
.....w.w...w...
.www...wwwww.ww
...wwwww...w...
ww.....w...w...
w..ww.www......
......eww.....e`,
  map`
pw.....wm.w....
...w...w..w....
ew.....w...wwww
.......w.......
.......w..wwwww
.......w....w..
.......wwww.w..
.......w....w..
.......w......e`,
  map`
pbbbbbbwmbbbbwb
bbbwbbbwbbbbwbb
bbwbbwwwbbbwwbb
bwbbbbbwbbwwbbb
wwbwwwwwbwwbbwb
bbbbbbbwbwbbwwb
wwbwwbbwbbbwbbb
bbbwbbbwbbwbbww
bbbwbbewbwwbbbe`,
  map`
pbbbwwbbbbbwwwm
wwwbwbbwbwbwwwb
bbwbwbwwbwbbwwb
bbwbwbwebwwbwwb
bbbbwbwebwwwwbb
bwbwwbwwwwwwbbw
bwwwbbbbbbbwbww
bbwwbwwbwwbbbww
wbbbbwwbwwbbwww`,
];

setMap(levels[level]);

setBackground(bg);

onInput("s", () => {
  getFirst(player).y += 1;
  getFirst(mirror).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
  getFirst(mirror).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
  getFirst(mirror).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
  getFirst(mirror).x += 1;
});

onInput("j", () => {
  playTune(failEffect);
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  let sum = tilesWith(exit, mirror).length + tilesWith(exit, player).length ;
  if (sum == 2) {
    // Both entities are on an exit pad

    playTune(passEffect);

    level = level + 1
    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  } else if (sum == 1) {
    // Only one entity is on an exit

    playTune(failEffect);
    
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    } 
  } else {
      playTune(walkEffect);
    }});
