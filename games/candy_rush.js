/*
@title: Candy Rush
@author: Tasbia Uddin
@tags: ['puzzle']
@addedOn: 2022-10-07
*/


const player = "p";
const candy = "b";
const mouth = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
..00........00..
.0000.0000.0000.
.00000022000000.
.000.022220.000.
.0...022220...0.
.....022220.....
......0000......
.....0HHHH0.....
....0.HHHH.0....
......HHHH......
.....HHHHHH.....
.....HHHHHH.....
......0..0......
......0..0......
.....HH..HH.....`],
  [ candy, bitmap`
................
......88888.....
.....0000008....
....088888008...
....800000808...
....808080808...
....808000808...
....808888808...
.....0000000....
......88888.....
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......`],
  [ mouth, bitmap`
................
................
................
................
................
...0000000000...
.00000000000000.
.00088888888000.
.00088888888000.
.00000000033000.
...0000003333...
.........3333...
.........3333...
..........33....
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
.g...
...b.
pb...
....g`,
  map`
g.b.w.
wwg...
p.w...
.w..b.
......`,
  map`
.....g
..w...
w.....
g..wb.
wwb...
p..w.w`,
  map`
...w...
.b.....
.w.pw.g
g.bw..w
....b.w
..gw.ww`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, candy, wall ]);

setPushables({
  [player]: [candy],
  /*no pushing candy with candy to make it harder*/
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
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
  const targetNumber = tilesWith(mouth).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(mouth, candy).length;

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
