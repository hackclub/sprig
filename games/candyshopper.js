/*
@title: candyshopper
@author: ayaangrover
@tags: ["puzzle"]
@addedOn: 2024-07-16
*/

const player = "p"
const juice = "j"
const chocolate = "c"
const candycane = "a"
const goal = "g";
const wall = "w";
const badjuice = "b";
const stepForwardTune = tune`
127.29844413012731,
42.432814710042436: C4^42.432814710042436,
1188.1188118811883`; 
const resetTune = tune`
161.29032258064515,
161.29032258064515: E5/161.29032258064515,
161.29032258064515: D5/161.29032258064515,
161.29032258064515: C5/161.29032258064515,
161.29032258064515: B4/161.29032258064515,
161.29032258064515: A4/161.29032258064515,
161.29032258064515: A4/161.29032258064515,
161.29032258064515: A4/161.29032258064515,
3870.967741935484`; 
const winTune = tune`
100.67114093959732: C4/100.67114093959732,
100.67114093959732: F4/100.67114093959732,
100.67114093959732: B4/100.67114093959732,
100.67114093959732: E5/100.67114093959732,
100.67114093959732: A5/100.67114093959732,
100.67114093959732: A5/100.67114093959732,
100.67114093959732: A5/100.67114093959732,
100.67114093959732: G5/100.67114093959732,
100.67114093959732: F5/100.67114093959732,
100.67114093959732: E5/100.67114093959732,
100.67114093959732: C4/100.67114093959732,
100.67114093959732: F4/100.67114093959732,
100.67114093959732: B4/100.67114093959732,
100.67114093959732: E5/100.67114093959732,
100.67114093959732: A5/100.67114093959732,
100.67114093959732: A5/100.67114093959732,
100.67114093959732: A5/100.67114093959732,
100.67114093959732: G5/100.67114093959732,
100.67114093959732: F5/100.67114093959732,
100.67114093959732: E5/100.67114093959732,
100.67114093959732: D5/100.67114093959732,
1107.3825503355706`; 
const levelTune = tune`
53.475935828877006: A4-53.475935828877006,
53.475935828877006: G4-53.475935828877006,
53.475935828877006: A4-53.475935828877006,
53.475935828877006: B4-53.475935828877006,
53.475935828877006: C5-53.475935828877006,
53.475935828877006: D5-53.475935828877006,
53.475935828877006: E5-53.475935828877006,
53.475935828877006: F5-53.475935828877006,
53.475935828877006: G5-53.475935828877006,
53.475935828877006: A5-53.475935828877006,
53.475935828877006: B5-53.475935828877006,
1122.9946524064171`; 


setLegend(
  /* [ player, bitmap`
................
.....77777......
....7777777.....
...777777777....
...7777777777...
...777777777777.
...6666666666...
...0000000000...
...6666660000...
...6666666666...
...66666666666..
...66666CCCCC...
...666666CC66...
...6666666CCC...
...66666666CC...
................` ], */
  [player, bitmap`
................
....00000000....
..000222222000..
.00222222222200.
.02202222220220.
.02222022022220.
.02222000022220.
.00222222222200.
..000222222000..
....00000000....
....0......0....
....0......0....
.0000......0000.
................
................
................`],
  [juice, bitmap`
................
....1111........
.......1........
.......1........
...99999999999..
...92222222229..
...92222242229..
...9222C422229..
...92299992229..
...92999999229..
...92999999229..
...92299992229..
...92222222229..
...92222222229..
...92222222229..
...99999999999..`],
  [chocolate, bitmap`
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....1110000.....
....3311111.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....`],
  [badjuice, bitmap`
................
....1111........
.......1........
.......1........
...33333333333..
...32222222223..
...32232223223..
...32223232223..
...32222322223..
...32332223323..
...32332223323..
...32222222223..
...32322222323..
...32333333323..
...32222222223..
...33333333333..`],
  [candycane, bitmap`
................
................
......343.......
.....4...4......
....3.....3.....
....4.....4.....
....3.....3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........2.....`],
  [goal, bitmap`
................
................
................
..LLLLLLLLLLL...
..L.........L...
..L.........L...
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
................`],
  [wall, bitmap`
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
0000000000000000`]
);


let level = 0
const levels = [
  map`
p...
...j
b..g`,
  map`
pb.jg
.....
j.c..
.a...
g.g.g`,
  map`
p..
ww.
...
.wb
...
bw.
...
.wb
...
bw.
gj.
wwb`,
  map`
bpb
...
acj
ggg`,
  map`
wp..bw
wj.aww
gj.cgw
wgwgww
wwwwww`,
  map`
...............gw
.a............bww
..a............gw
...a..........gww
....a.........pgw
.....a........gww
......ab.......gw
.......a......bww
...............gw`,
  map`
p..wwwwwwwwwwwwwwww
ww.wwww.w..ww...www
....w...w.www.w.www
.ww...w.w.www.w...w
.www.ww.wwwww.w.w.w
.w.w..w...w...w.w.w
...w.ww.w.w.w.w.w.w
.w.w.w..w...w.w.w.w
.w.w.w.wwwwww.w.w.w
wwww.w.w...ww.w.w.w
.....w...w.w..w.w.w
.wwwww.w.w.ww.w.www
.www.w.w.wwww.w...w
.....w.w...ww.www.w
wwwwww.www.w..w...w
w......w.w.wwww.www
wwwwww...w....w.jg.`
]

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, juice, chocolate, candycane, wall]);

setPushables({
  [player]: [juice, chocolate, candycane],
  [juice]: [juice],
  [chocolate]: [chocolate],
  [candycane]: [candycane]
})

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(stepForwardTune); 
});

onInput("s", () => {
  getFirst(player).y += 1;
  playTune(stepForwardTune); 
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(stepForwardTune); 
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(stepForwardTune); 
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    playTune(resetTune); 
  }
});

afterInput(() => {
  const playerSprite = getFirst(player);
  const badJuiceTiles = tilesWith(badjuice);

  // Check if player is touching badjuice
  const fails = tilesWith(player, badjuice).length + tilesWith(juice, badjuice).length + tilesWith(chocolate, badjuice).length + tilesWith(candycane, badjuice).length ;
  if (fails>=1) {
    playTune(resetTune);
    level = 0;
    setMap(levels[level]);
  }

  const baskets = tilesWith(goal).length;

  // Check if the player has completed the level
  const successes = tilesWith(goal, juice).length + tilesWith(goal, chocolate).length + tilesWith(goal, candycane).length;
  if (successes === baskets) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      playTune(levelTune);
    } else {
      addText("game over");
      playTune(winTune);
    }
  }
});
