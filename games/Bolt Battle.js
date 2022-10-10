/*
@title: Bolt Battle
@author: Arnav Ambre

INSTRUCTIONS:
Use WASD to move the character to push the lighting bolts onto the batteries.
*/


const player = "p";
const bolt = "b";
const battery = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
......CCCC......
.....CCCCCCCC...
......0000......
.....002200.....
.....022220.....
.....022220.....
.....022220.....
......0000......
.....044440.....
....0.4444.0....
......4444......
.....444444.....
.....444444.....
......0..0......
......0..0......
.....55..55.....`],
  [ bolt, bitmap`
................
.....00000000...
.....06666660...
....06666660....
....0666660.....
...0666660......
...066660000....
..0666666660....
..000066660.....
.....06660......
....06660.......
....0660........
...0660.........
...060..........
..060...........
..00............`],
  [ battery, bitmap`
................
................
................
................
....00000000....
...0666666660...
...06633336600..
...06693336600..
...06699336600..
...06699936600..
...0666666660...
....00000000....
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
  map`
...w.bg
.b.....
.w.pw.g
g.bw..w
....b.w
..gw.ww`,
  map`
w.....w
wbw...g
....b.w
wg.....
wwww.ww
p....bg`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, bolt, wall ]);

setPushables({
  [player]: [bolt],
  /*no pushing bolt with bolt to make it harder*/
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
  const targetNumber = tilesWith(battery).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(battery, bolt).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Congrats, you win!", { y: 4, color: [255, 0, 0] });
    }
  }
});
