/*
@title: Asteroid Field
@author: Kaitlyn
@tags: []
@addedOn: 2022-11-25
*/
  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
const ship = "s"
const asteroida = "a"
const asteroidb = "b"
const bg = "g"
const goal = "e"
const menuMusic = tune`
500: g5/500 + e5-500,
500: g5/500 + e5-500,
500: a5/500 + f5-500,
500: e5/500 + c4~500 + e4-500 + c5-500,
500: e5/500 + c4~500 + e4-500 + c5-500,
500: b4/500 + g4-500,
500: d5/500 + c4^500 + e4-500 + b4-500,
500: d5/500 + c4^500 + e4-500 + b4-500,
500: g5/500 + e5-500,
500: g5/500 + c4~500 + e4-500 + e5-500,
500: a5/500 + c4~500 + e4-500 + f5-500,
500: e5/500 + c5-500,
500: e5/500 + c4^500 + e4-500 + c5-500,
500: c4^500 + e4-500,
500: d5/500 + b4-500,
500: e5/500 + e4-500 + c4~500 + c5-500,
500: e5/500 + e4-500 + c4~500 + c5-500,
500: f5/500 + d5-500,
500: f5/500 + c4^500 + d5-500 + e4-500,
500: d5/500 + c4^500 + b4-500 + e4-500,
500: d5/500 + b4-500,
500: e4-500 + c4~500 + c5/500 + a4-500,
500: e4-500 + c4~500 + c5/500 + a4-500,
500: g5/500 + e5-500,
500: g5/500 + e4-500 + c4^500 + e5-500,
500: a5/500 + e4-500 + c4^500 + f5-500,
500: f5/500 + d5-500,
500: e5/500 + e4-500 + c4~500 + c5-500,
500: f5/500 + e4-500 + c4~500 + d5-500,
500: g5/500 + e5-500,
500: e4-500 + c4^500,
500: e4-500 + c4^500`
const gameMusic = tune`
750: e4~750,
750: f4~750,
750,
750: f5~750,
750,
750: c4~750,
750: g5^750,
750: c4~750,
750: d5~750,
750: c5~750,
750: a5^750,
750: g4~750,
750,
750: c5~750,
750,
750: f4~750,
750: b4~750,
750: f5^750,
750: d5~750,
750,
750: g5~750,
750,
750: f5~750,
750,
750: c5^750,
750: d5~750,
750: a4~750,
750,
750: e4~750,
750: a5^750,
750: f4~750,
750: d5~750`
const playback = playTune(menuMusic, Infinity);
const farMove = "d"
const levels = [
  map`
..........
..........
..........
..........
..........
e....s....
..........
..........`, // Menu
  map`
..a...b...
..........
..b.......
.a........
......b.a.
b.a.......
.b....ae..
a....sb..b`, // Level 1 
  map`
.e..a.a..a
..a.....ad
..a.b...aa
.......a..
.b.a....b.
a.ba......
.a..b....b
b.b..s....`, // Level 2
  map`
........be
b...baa...
.......b..
..a....a.b
.b...b..a.
.a.....b..
a..a.....a
.b...s..b.`, // Level 3
  map`
..........
..aa.b.b..
.....a..ae
b...b.b..b
.b....a.a.
.a....b...
b.b.....b.
b....s..ba`, // Level 4
  map`
.a..b....b
aeab......
..b...ba.a
b..b.ba...
.a...b..a.
b...b...ba
.a.ba..a..
b.a.bsb...`, // Level 5
  map`
a.....b.a.
.e........
.........a
..ab.a....
.a........
b...b....b
.a.....a..
a....s...a`, // Level 6
  map`
...b....a.
.sb...a...
.ab...a...
..b.....a.
....b.a...
..a.......
a....aa...
.bba....be`, // Level 7
  map`
....a...bb
.ab.b.....
a.....s.b.
eb..a.b.b.
.a........
...b....a.
.b.a...aa.
b..b..b..d`, // Level 8
  map`
a.eb.a....
........ab
a.a.......
..a...ab..
.....aea..
.ba..bb..a
....s.....
.a........`, // Level 9
]

setLegend(
  [ship, bitmap`
................
................
................
.......LL.......
......L22L......
.....L2222L.....
.....L2222L.....
...LLL2222LLL...
.LL111LLLL111LL.
L11441111114411L
L11441144114411L
.LL1111441111LL.
...LLLLLLLLLL...
................
................
................`],
  [asteroida, bitmap`
................
.......111111...
.......11111111.
......111LLL111.
.....111LLLLLL1.
.....11LLLLLLL1.
....111LLLLLLL1.
..11111LLLLLL1..
..1LLL11LLLLL1..
.11LLL111LLL11..
.1111111111111..
..11L1111111....
...1L11LL11.....
...1111LL11.....
....111111......
................`],
  [asteroidb, bitmap`
................
................
......1111111...
....1111LL1111..
....111LLLLL11..
...1111LLLLL11..
..11111LLLLL11..
..111111LLL111..
..1LLL11111111..
..1LLL111111L1..
..1LLL11111LLL..
..11111111LLLLL.
...11111111LLL1.
...111111111L...
................
................`],
  [bg, bitmap`
0000020000000000
0200000000000000
0000000000200000
0000000000000000
0000000000000000
0000200000002000
0020000000000000
0000000000000000
0000002000000000
0000000000020000
0000000000000000
0000000000000000
0200020000000200
0000000000000000
0000000000000000
0020000020000002`],
  [goal, bitmap`
................
....44444444....
...44HHHHHH44...
..4HH......HH4..
.44H........H44.
.4H...4444...H4.
.4H..4HHHH4..H4.
.4H..4H..H4..H4.
.4H..4H..H4..H4.
.4H..4HHHH4..H4.
.4H...4444...H4.
.44H........H44.
..4HH......HH4..
...44HHHHHH44...
....44444444....
................`],
  [farMove, bitmap`
.......7.......7
......77......77
.....777.....777
....7777....7777
...77777...77777
..777777..777777
.7777777.7777777
7777777777777777
7777777777777777
.7777777.7777777
..777777..777777
...77777...77777
....7777....7777
.....777.....777
......77......77
.......7.......7`]
);

setSolids([ asteroida, asteroidb, ship ]);

let level = 0
if (level == 0) {
 addText("Asteroid Field",{
   x:3,
   y:4,
   color: color`9`
  })
}

setMap(levels[level]);
setBackground(bg);

onInput("w", () => {
  getFirst(ship).y -= 1;
});

onInput("a", () => {
  getFirst(ship).x -= 1;
});

onInput("s", () => {
  getFirst(ship).y += 1;
});

onInput("d", () => {
  getFirst(ship).x += 1;
});


let num = 0
afterInput(() => {
  const goall = tilesWith(goal).length
  const win = tilesWith(goal, ship).length
  const farMoved = tilesWith(farMove).length
  const hasFarMove = tilesWith(farMove, ship).length
  if (farMoved == hasFarMove && farMoved !== 0) {
    onInput("w", () => {
  getFirst(ship).y -= 1;
});

onInput("a", () => {
  getFirst(ship).x -= 1;
});

onInput("s", () => {
  getFirst(ship).y += 1;
});

onInput("d", () => {
  getFirst(ship).x += 1;
});
  }
  if (win == goall) {
    level = getRandomInt(1, 9);
    let activeLevel = levels[level];
    if (level >= 1) {
        clearText();
        if(playback) playback.end();
    if (activeLevel !== undefined) {
      setMap(activeLevel);
    }
    }
    if (level >= 1 && num == 0) {
       num = 1;
      const gameBGM = playTune(gameMusic, Infinity);
    }
  }
});
