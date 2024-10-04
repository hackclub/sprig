/*
@title: candyshopper
@author: ayaangrover
@tags: ['puzzle']
@addedOn: 2024-07-19
*/

let lives = 3;

const player = "p"
const juice = "j"
const chocolate = "c"
const candycane = "a"
const money = "m"
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
4516.129032258064`;
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
149.2537313432836: D5-149.2537313432836,
149.2537313432836: E5-149.2537313432836,
149.2537313432836: F5-149.2537313432836,
4328.358208955224`;
const addLifeTune = tune`
157.06806282722513: C5-157.06806282722513 + G5/157.06806282722513,
157.06806282722513: A5/157.06806282722513 + D5-157.06806282722513,
157.06806282722513: B5/157.06806282722513 + E5-157.06806282722513,
4554.973821989529`;


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
  [money, bitmap`
.......4........
......4444......
.....4.4..4.....
....4..4...4....
....4..4........
....4..4........
.....4.4........
......4444......
.......4..4.....
.......4...4....
.......4...4....
....4..4...4....
.....4.4..4.....
......4444......
.......4........
.......4........`],
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
pjg`,
  map`
pbjg`,
  map`
pmbjg
.cgww`,
  map`
p...
.m.j
.b.g`,
  map`
pmbjg
ww...
..c..
ja...
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
wp.mbw
wj.aww
gj.cgw
wgwgww
wwwwww`,
  map`
...............gw
.a............bww
..a............gw
...a..........gww
....a..........gw
wwwwwa........gww
bb....a........gw
mww....a......bww
pww............gw`,
  map`
p..wwwwwwwwwwwwwwww
ww.wwww.wmww....www
....w...w.w...w.www
.ww...w.w...w.w.w.w
.www.ww.wwwww.w.w.w
.w.w..w...w...w...w
...w.ww.w.w.w.www.w
.w.w.w..w...w.w.w.w
.w.w.w.wwwwww.w.w.w
wwww.w.w...ww.w...w
.....w...w.w..w.w.w
.wwwww.w.wmww.w.www
.wwwmw.w.wwww.w...w
.....w.w...ww.www.w
wwwwww.www.w..w...w
w......w.w.wwww.www
wwwwww...w....w.jgw`,
  map`
bbbb...bbbb
bbbb.c...bb
mbbbbgbb..b
pbcgbbbgc.b
mbbbbgbb..b
bbbbbcb...b
bbbbb...bbb`,
  map`
gww..w......w
jw.cpw.wwwwaw
.w.w.w.w...ag
.b.w.w.w.b.ag
...w.w.w.bwag
...w.w.w.bwgw
...w...w.bwww
g........bwww
...w...wbbwww`,
  map`
wgwwwbpbwwwgw
bc...b.b...cb
b...........b
ww.wwwwwwwwww
...w...w...jg
.www.w.w.w.ww
.w...w.w.w.ww
...www...w.jg`,
  map`
.....
pj...
www..
g....`,
  map`
wwwwwwgbp...
w...........
w.j....ww...
w......www..
w......bgww.
w......jjgww
ww.wwwb..www`,
  map`
...........
pb.........
........wg.
.c......wwg
..........w
........w.w
........w.w
bbbbjbbbw.w
ww........w`,
  map`
bww..cg
bpm....
.j.w...
.b..g..`,
  map`
wwwww...ww
wwpc..w.jg
gwww....jg
jgwww...jg
.cgww...jg
..ag....jg
........jg
wwwwwww.jg`,
  map`
pmmm....................
bwwwwwwwwwwwwwwwwwwwwww.
........................
.wwwwwwwwwwwwwwwwwwwwwwb
........................
bwwwwwwwwwwwwwwwwwwwwww.
........................
.wwwwwwwwwwwwwwwwwwwwwwb
........................
bwwwwwwwwwwwwwwwwwwwwww.
........................
.wwwwwwwwwwwwwwwwwwwwwwb
......................jg
wwwwwwwwwwwwwwwwwwwwwwww`,
  map`
bbb..
bpj..
bbb..
g....`,
  map`
ggggwwwgggg
aaaawwwaaaa
....www....
....bmb....
wwwwwpwwwww`,
  map`
ggwwwgggggg
jjg.ccccccg
pjg......cg
jjg.ccccccg
ggwwwgggggg`,
  map`
gbp...b
jwwww.w
......w
wwwwwwb`,
  map`
gbp.www
jwb...w
...ww.w
ww....w`,
  map`
pw...w...w...
.w.w.w.w.w.w.
...w...w...w.
bwwwwwwwwwww.
...w...w...w.
jw.w.w.w.w.w.
gw...w...w...`,
  map`
..bbp
.wbbb
jwbbb
gwwww`,
  map`
w..w
pjjg
bwgw`,
  map`
w.b
pj.
b.g`,
  map`
g.......
gwwww...
..apw...
.awww.a.
.......g`,
  map`
ggw.agw
jjw.www
......w
wwbwccw
mp.wggw`
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
  const playerSprite = getFirst(player);
  if (playerSprite.y > 0) {
    playerSprite.y -= 1;
    playTune(stepForwardTune);
  }
});

onInput("s", () => {
  const playerSprite = getFirst(player);
  if (playerSprite.y < height() - 1) {
    playerSprite.y += 1;
    playTune(stepForwardTune);
  }
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  if (playerSprite.x > 0) {
    playerSprite.x -= 1;
    playTune(stepForwardTune);
  }
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  if (playerSprite.x < width() - 1) {
    playerSprite.x += 1;
    playTune(stepForwardTune);
  }
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    const currentLevel = levels[level];
    setMap(currentLevel);
    playTune(resetTune);
  }
});

afterInput(() => {
  const playerSprite = getFirst(player);
  const badJuiceTiles = tilesWith(badjuice);
  const currentLevel = levels[level];
  if (tilesWith(player, money).length > 0) {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      lives++; // Increase lives count
      playTune(addLifeTune);
      let xCoord = playerSprite.x;
      let yCoord = playerSprite.y;
      setMap(currentLevel);
      clearTile(xCoord, yCoord);
    }
  }

  const fails = tilesWith(player, badjuice).length;
  if (fails >= 1) {
    playTune(resetTune); // Play reset tune
    lives--;
  }

  if (lives <= 0) {
    level = 0; // Reset level
    setMap(levels[level]); // Load the initial map
    lives = 3;
  }

  const baskets = tilesWith(goal).length;

  const successes = tilesWith(goal, juice).length + tilesWith(goal, chocolate).length + tilesWith(goal, candycane).length;
  if (successes === baskets) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      playTune(levelTune);
    } else {
      addText("you win!");
      playTune(winTune);
    }
  }

  // Display Lives Counter
  addText(`Lives: ${lives}`, { x: 11, y: 1, color: color`1` }); // Display lives count on the screen
});
