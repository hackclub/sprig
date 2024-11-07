/*
@title: Voltage_Quest
@author: Jase
@tags: ['puzzle']
@addedOn: 2024-03-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const battery = "b";
const goal = "g";
const wall = "w";
const exit = "x";
const door = "d";
const electricity = "e";
const floor = "f";
const completedCircuit = "c"

setLegend(
  [ player, bitmap`
.....3....3.....
.....0....0.....
....00000000....
....03633630....
....06266260....
....03633630....
....03333330....
....00000000....
.......00.......
.....003300.....
....0.0330.0....
...0..0000..0...
...0..0330..0...
..0.0.7007.0.0..
......0330......
......7007......` ],
  [ battery, bitmap`
................
................
................
.....00..00.....
....00600600....
....06666660....
....06666660....
....00000000....
....00000000....
....00660000....
....00066000....
....00006600....
....00000000....
....00000000....
................
................` ],
  [ goal, bitmap`
................
................
....000..000....
...00L0000L00...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LL00LLLL0...
...0LLL00LLL0...
...0LLLL00LL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0LLLLLLLL0...
...0000000000...
................` ],
  [ wall, bitmap`
0333303333033330
0333303333033330
6666666666666666
0333303333033330
0333303333033330
0333303333033330
0333303333033330
6666666666666666
6666666666666666
0333303333033330
0333303333033330
0333303333033330
0333303333033330
6666666666666666
0333303333033330
0333303333033330` ],
  [ exit, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3.3333...3333333
3.3...3.3.3..3.3
3.3...3.3.3..3.3
3.333..3..3..3.3
3.3....3..3..3.3
3.3...3.3.3..3.3
3.3...3.3.3..3.3
3.3333...333.3.3
3..............3
3..............3
3..............3
3333333333333333` ],
  [ door, bitmap`
6633333003333366
6633303003033366
6633303003033366
3663303003033663
3663303003033663
3663303003033663
3663303003033663
3366303003036633
3366303003036633
3663303003033663
3663303003033663
3663303003033663
3663303003033663
6633303003033366
6633303003033366
6633333003333366` ],
  [ electricity, bitmap`
1L070L1221L070L1
1L0770L11L0770L1
21L0770LL0770L12
221L070LL070L122
21L0770LL0770L12
1L0770L11L0770L1
1L070L1221L070L1
1L0770L11L0770L1
21L0770LL0770L12
221L070LL070L122
21L0770LL0770L12
1L0770L11L0770L1
1L070L1221L070L1
1L0770L11L0770L1
21L0770LL0770L12
221L070LL070L122` ],
  [ floor, bitmap`
0000........0000
0..............0
0..............0
0..............0
................
................
................
................
................
................
................
................
0..............0
0..............0
0..............0
0000........0000` ],
  [ completedCircuit, bitmap`
................
................
....555..555....
...5575555755...
...5767777675...
...5766666675...
...5766666675...
...5700000075...
...5707700075...
...5700770075...
...5700077075...
...5700000075...
...5700000075...
...5777777775...
...5555555555...
................` ]
);
setBackground(floor)

const melody = tune`
600: C4/600,
600: F5/600,
600: D4/600 + G4-600,
600: G4-600 + E4/600 + F5/600,
600: A4-600 + D4/600 + E5/600,
600: C4/600 + G4-600 + F5/600,
600: D4/600,
600: E4/600 + G4-600 + G5/600,
600: C4/600 + G4-600,
600: F5/600,
600: D4/600 + G4-600,
600: G4-600 + G5/600,
600: D4/600 + A4-600 + F5/600,
600: C4/600 + G5/600 + E5/600,
600: D4/600 + F4-600 + F5/600 + A5/600,
600: E4/600 + G4-600 + G5/600,
600: F4/600 + A4-600,
600: A5/600 + D5/600,
600: D4/600 + G5/600,
600: E4/600 + C5-600 + E5/600,
600: F4/600,
600: E4/600 + G5/600,
600: E4/600 + B4-600,
600,
600: D4/600 + A4-600 + E5/600,
600: B4-600 + F5/600,
600: E4/600,
600: D4/600 + G4-600 + G5/600,
600: C4/600 + F5/600,
600: D4/600 + F4-600 + G5/600,
600: C4/600 + F4-600 + F5/600,
600`
playTune(melody)
const playback = playTune(melody, Infinity)

let level = 0
const levels = [
  map`
wwdww
wwpww
d...d
wwbww
wwgww`,
  map`
wpwwwwwgw
w..wwww.w
w...www.w
w.w..ww.w
w.ww..w.w
w.www.wbw
w.......w
wwwwwwwww`,
  map`
wgwwwwwww
wbwww.bgw
w......ww
d......ww
w...w.www
w..ww.www
wwwwwpwww`,
  map`
wwwwwwwww
w.......w
w.......g
w...b...w
w.......w
w.......w
wpwwwwwww`,
  map`
wwwwdwwwww
w......gww
p.......ww
w..b.b..ww
w.......ww
w........w
wwwwww..g.`,
  map`
wwwgwgwgwg
wwwbwbwbwb
wwwbwbwbwb
wwwbwbwbwb
w.........
p.........
wwwwwwwwww`,
  map`
bwbwgwwgwgw
bwbw.w.b.b.
bwbw..w.w.w
.wpw...b...
...w..w.ww.
....w.w.w..
..........w
wwwwwwwwwww`,
  map`
wdw
wgw
wbw
w.w
w.w
w.w
w.w
wpw`,
  map`
wwwww
w..bg
w...w
w..bg
w...w
w..bg
w...w
w.pbg
wwdww`,
  map`
wwwwwwwwww.
b......www.
wwwwwwwwww.
bp......bg.
wwwwwwwwww.
b....wwwww.
wwwwwwwwww.`,
  map`
wwwwwwwww
wg.g...gw
w.bb..b.w
bp..bb..g
w..b....w
wg...g..w
wwwwwwwww`,
  map`
ww.......
w..wwwww.
p.ww...w.
w.ww.wbw.
w.ww.w.w.
w.ww.w.w.
w....w.w.
wwwwww.w.
g........
wdwwww.ww`,
  map`
wwwwwdwwwww
wwwwwpwwwww
wwww...wwww
e.......b.e
e..b.g....e
e.wwwwwww.e
e...gwg...e
e.bwwwww..e
e..wgwgw..e
e....w..b.e
e....b....e
e.........e`,
  map`
e.....w.....e
e...........e
e.....p.....e
wwwww...wwwww
...gw...wg...
..wwwb.bwww..
.............
.............`
]

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, battery, wall, door ]);

setPushables({
  [ player ]: [ battery ],
  [ battery ]: [ battery ],
})

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("k", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
onInput("l", () => {
  level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  });

const doorX = getFirst(door).x;
const doorY = getFirst(door).y;

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, battery).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})
