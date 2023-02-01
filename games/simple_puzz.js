/*
@title: simple_puzz
@author: Ram_Gaming

Instructions:

Cover the green with purple.

Use w, a, s, d to move around and j to restart the level.

*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
......L.........
....0LL.L.......
...00LLLL.......
...LLLLLL.......
...0L...L.......
...0.3.30.......
...0....0.......
.00000000000....
.00444047440....
.00444044440....
.00444000040....
.00000000000....
.00066066000....
...0660660......
...0660660......
...0000000......`],
  [ box, bitmap`
................
................
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
................
................
................`],
  [ goal, bitmap`
................
................
....4444444.....
...444444444....
..44444444444...
..44422222444...
..44422222444...
..44422222444...
..44422222444...
..44422222444...
..44444444444...
...444444444....
....4444444.....
................
................
................`],
  [ wall, bitmap`
CCC0CCCC0CCCC0CC
0000000000000000
C0CCCC0CCCC0CCCC
0000000000000000
CCC0CCCC0CCCC0CC
0000000000000000
C0CCCC0CCCC0CCCC
0000000000000000
CCC0CCCC0CCCC0CC
0000000000000000
C0CCCC0CCCC0CCCC
0000000000000000
CCC0CCCC0CCCC0CC
0000000000000000
C0CCCC0CCCC0CCCC
0000000000000000`]
);

let level = 0;
const levels = [
  map`
www..
..b..
pw.g.`,
  map`
w.gb..
..w...
w..pw.
.bw.w.
.....g`,
  map`
ww....
w...b.
ww..w.
w.p..g
w..b.b
w..ww.
w..gwg`,
  map`
..gg..
w.....
...www
.bp.b.
.b..b.
www...
..gg..`,
  map`
wwwwwwww
wwww..ww
wgpb..ww
www..gww
wgw...ww
w.w.b.gw
wbbgb..w
w......w
wwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

setSolids([ player, box, wall ]);

setPushables({
  [ player ]: [ box ]
});

afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

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
