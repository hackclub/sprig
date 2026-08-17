/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dragon Quest
@description: Be a Hero! Slay the Dragon
@author: Maxwell Sorensen
@tags: ['adventure','puzzle']
@addedOn: 2025-00-00
*/

const dev = true;

const player = "p";
const rubble = "r";
const sword = "s";
const orc = "o";
const wall = "w";
const box = "b";
const objective = "q";
const ground = "g";
const bgm = tune`
300: D4-300 + D5/300,
300: D4-300 + A4/300,
300: D4-300 + D5/300,
300: E4-300 + A4/300,
300: D4-300 + D5/300,
300: D4-300 + A4/300,
300: D5/300 + D4-300,
300: A4/300 + E4-300,
300: C5/300 + D4-300,
300: G4/300 + D4-300,
300: C5/300 + D4-300,
300: G4/300 + E4-300,
300: C5/300 + F4-300,
300: G4/300 + E4-300,
300: C5/300 + D4-300,
300: G4/300 + C4-300,
300: D5/300 + D4-300,
300: A4/300 + D4-300,
300: D5/300 + D4-300,
300: A4/300 + E4-300,
300: D5/300 + D4-300,
300: A4/300 + D4-300,
300: D5/300 + D4-300,
300: A4/300 + E4-300,
300: C5/300 + D4-300,
300: G4/300 + D4-300,
300: C5/300 + D4-300,
300: G4/300 + E4-300,
300: C5/300 + F4-300,
300: G4/300 + E4-300,
300: C5/300 + D4-300,
300: G4/300 + C4-300`;
const win = tune`
120: B5/120 + C5^120,
120: G5/120 + G4^120,
120: E5/120 + E4^120,
120: G5/120 + G4^120,
120: E5/120 + E4^120,
120: C5/120 + C4^120,
120: E5/120 + E4^120,
120: C5/120 + G4^120,
120: G4/120 + E4^120,
120: C4-120,
2640`
const pickup = tune`
66.66666666666667,
66.66666666666667: B5~66.66666666666667,
66.66666666666667,
66.66666666666667: B4~66.66666666666667,
1866.6666666666667`;

const levels = [
  map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwp..qwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwsp.oqwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwwwwwwww
ww..wwwwww
wsbp.oqwww
ww..wwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
ww.wwwwwww
ww..wwwwww
wwb.wwwwww
wsbp.oqwww
wwb.wwwwww
ww..wwwwww
ww.wwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
.sbpboq.ww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwswwwwww
www.wwwwww
ww.b...www
ww.pb..oqw
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwww.wwww
wwwwwb..wq
.....b....
owwwwwwwww
..wwwwwwww
..w.wwwwww
.pwb..ww.s
...b.....w`,
  map`
wwwwwwwwww
w...o...pw
w.www...bw
w.w.wwwb.w
w..b.ww.sw
w..bwwwwww
w.b.....qw
www.wwwwww`,
  map`
wwwwww.www
w.www.bbq.
wb..w..www
.b....wwww
owwwww..ww
.......b.w
...p...bsw
wwwwwww.ww`,
  map`
...wwww..q
..b...w.ww
...w.bo.ww
p..ww.wwsw
..wwwww..w
.ww.www.b.
..wb..wb.w
...b.....w`,
  map`
wwwwwwwwww
wwwwwwwwww
wwwp...oqw
www..b.www
wswbwbwwww
...b..wwww
www.w.wwww
wwwwwwwwww`,
  map`
wwww.wwwww
ww..b..www
ww..b...sw
w..wwwww.w
w.wwwwwwww
.b....wwww
.pb..oq.ww
wwwwwwwwww`,
  map`
wwwwwwp...
wwwwwwbw..
wwww.wsw..
w.qob.b...
wwww.wbw..
wwww......
wwwwwwwwww
..........`,
];

setLegend(
    [ box, bitmap`
................
......000000....
...000LLL2LL00..
.00L11L2LL2L220.
.0L1L22L2L2L1LL0
0LL2L2LL1LLLL1L0
011LLL22L2LLL1L0
0L22L2LLL2L2L220
011LLLL22L2LLLL0
01LL1L2L22L2LLL0
0111LLLLLLL22LL0
01LL22L2L22LLLL0
01121LLLLLLL1L0.
.022LLLL1LL1LL0.
..00L11L11LLL0..
....000000000...`],
  [ ground, bitmap`
DD444DD4D44DDDDD
D444D114DD44D44D
4D4D14D4DD444DDD
D441DDDDD4DDD141
D4DD4DDD4D11DD1D
DDD4D4DDD1D111D4
DD4DDD41DDDDDDD4
DDDD41D11D4DDD4D
44DDD4DDDDDDDDDD
DD4DDDDDD41D4DDD
D4DD11DDDD4D444D
D1DDDD44DDDD44DD
DDDDD14D4DDDDDDD
1DDDDD44DDDDDDDD
11DDD441141D4DDD
DDDDDDDD4DDD44D4`],
  [ player, bitmap`
......0000......
.....066660.....
....0C6666C0....
....02C66C20....
....02766720....
....066CC660....
....06C66C60....
.....066660.....
......0000......
....00CCCC00....
...06CCCCCC60...
..060C0000C060..
..00.055550.00..
.....050050.....
....060..060....
....000..000....`],
  [ sword, bitmap`
71L.............
571L............
L571L...........
.L571L..........
..L571L.........
...L571L........
....L571L...11..
.....L571L.175..
......L571175...
.......L57175...
........1175....
.......17759C...
......1755.C9C..
......55....C955
.............575
.............555`],
  [ orc, bitmap`
....000000000...
...0FCFFFFFCF0..
...023CFFFC320..
...0FFF000FFF0..
...0FF0FFF0FF0..
....0FFFFFFF0...
.....0000000....
....0CCCCCCC0...
...0F0CCCCC0F0..
..0F00CCCCC00F0.
..00.0000000.00.
.....050.050....
.....050.050....
.....000.000....
....0CC0.0CC0...
....0000.0000...`],
  [ wall, bitmap`
9LLLLCC9L99L999L
L9LCCLLLLL9LL9LL
LCCLLLL99L9LCCCC
CL99LLLCCCCLCL99
9LLLLCCLCL9LLLL9
L9CLCCLLCCLL9LLL
CCCLLCLL9LLL9LCC
L9LLCCLLCCCLCC9L
L9LL99LLL999LCLL
9CCL9LLLL9CCLLCC
CLLLLLLLCLLCCLLL
9LLLLLCCLCLLL9LL
9LC99LCCCCLCLCCL
L9CCCLLL9LLLCLLL
L9LCLL99LLLL9LL9
LL9LC99LLCCCCL99`],
  [ objective, bitmap`
................
...00......00...
..0C0......0C0..
..00..0000..00..
..0C00FFFF00C0..
...0C0FFFF0C0...
....020FF020....
....02300320....
....0FFFFFF0....
....0F0FF0F0....
.....0FFFF0.....
.....00FF00.....
.....0F00F0.....
......0FF0......
.......00.......
................`]
);

const bgmplay = playTune(bgm, Infinity);

setBackground("g");

setSolids([ player, box, wall ]);

var has_sword = 0;
let level = 0;

setMap(levels[level]);

has_sword = 0;

setPushables({
  [ player ]: [box],
  [box]: [box],
});

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

onInput("j", () => {
  setMap(levels[level]);
});

onInput("i", () => {
  level += 1;
  if(levels[level] && dev){
    setMap(levels[level]);
    has_sword = 0;
  } else {
    level -= 1;
  };
});

onInput("k", () => {
  level -= 1;
  if(levels[level] && dev){
    setMap(levels[level]);
    has_sword = 0;
  } else {
    level += 1;
  };
});

afterInput(() => {
  
  if (getFirst(sword) && getFirst(player).y == getFirst(sword).y && getFirst(player).x == getFirst(sword).x) {
    let x = getFirst(player).x;
    let y = getFirst(player).y
    clearTile(x, y);
    clearTile(x, y);
    addSprite(x, y, player);
    has_sword = 1;
    playTune(pickup, 1);
  };
  if (getFirst(orc) && getFirst(player).y == getFirst(orc).y && getFirst(player).x == getFirst(orc).x) {
    if (has_sword == 1) {
      let x = getFirst(player).x;
      let y = getFirst(player).y
      clearTile(x, y);
      clearTile(x, y);
      addSprite(x, y, player);
      playTune(pickup, 1);
    } else {
      setMap(levels[level]);
      has_sword = 0;
      playTune(pickup, 1);
    };
  };
  if (getFirst(objective) && getFirst(player).y == getFirst(objective).y && getFirst(player).x == getFirst(objective).x) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
      playTune(pickup, 1);
    } else {
      console.log("You Win")
      addText("You Win!", {
      x: 6,
      y: 7,
      color: "3"
      });
      setMap(map`.....`);
      bgmplay.end();
      playTune(win)
    };
    has_sword = 0;
  };
});