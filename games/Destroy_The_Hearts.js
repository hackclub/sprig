
/* 
@title: Destroy_The_Hearts
@author: Deniz Melik Aktın
@tags: ['puzzle']
@addedOn: 2023-10-09
*/

    /*
@title Destroy the hearts!
@author zKxra

How to play:
WASD To move, J to restart level

typical sokoban game
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
....00000000....
....020LL020....
....0LLLLLL0....
....0L0LL0L0....
....0LL00LL0....
0000000000000000
0L011111111110L0
0L011111111110L0
0L011111111110L0
0L011111111110L0
0000000000000000
....0L0..0L0....
....0L0..0L0....
....0L0..0L0....
....000..000....`],
  [ box, bitmap`
................
................
........L.......
.......LL.......
.......L1.......
......LL1.......
......L11.......
......L11.......
......L11.......
......L11.......
......000.......
......0C0.......
......0C0.......
......0C0.......
......0C0.......
......000.......`],
  [ goal, bitmap`
................
................
................
................
......C..C......
.....CCCCCC.....
....CCCCCCCC....
....CCCCCCCC....
.....CCCCCC.....
......CCCC......
.......CC.......
................
................
................
................
................`],
  [ wall, bitmap`
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

let level = 0;
const levels = [
  map`
w....
.....
..ww.
wbww.
p.wwg`,
  map`
g....ww
w..b.ww
www.w..
ww..wb.
p.g....
.bwwwgw
..wwwww`,
  map`
......g
...wg..
.wwww..
....wg.
.bb....
.pb....
wwwww..`,
  map`
...wwgw
.b.ww.w
.pb...w
.w.w..w
...b..w
..gwg.w`,
  map`
ww..bg
...ww.
.wwww.
......
wwwww.
p.....`,
  map`
......
....w.
p.w.w.
.bwgw.
..www.
..bgw.`,
  map`
..........
...wb.ww..
..wwgww...
..wwww.www
..wg..gb..
..wbw.w...
....www...
...www....
.......p..`,
  map`
.........
..wgwww..
..w...ww.
.w..bb.w.
.w.bw..w.
.wp.w..w.
.ww.g..w.
..wwwwg..
.........`,
  map`
g......
.w..bb.
..wp...
..wgw..
...gww.
.bb.w.g
.....w.`,
  map`
p...
gw..
.w..
gwwb
b.w.
..w.
..w.
b..g
....`,
  map`
.gwwwwwwww
.b.g..wp.g
.bwwww....
....g..b.b
b.wwwwwb..
gwg...bg..`,
  map`
..w...
..w.b.
.gwg..
wb.bw.
w....w
wpg...`,
  map`
wwwwww.
www...w
gpb...w
wwwggww
wgw..b.
w..bb..
.....ww
www..ww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  ["p"]: ["b", "p"],
});


// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
