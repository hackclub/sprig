/*
@title: Vukky Adventures
@author: lxjv

Instructions
*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
...0000000000...
..077777777770..
..077222222770..
..072022220270..
..072022220270..
..077222222770..
.00777777777700.
0.077777777770.0
..077777777770..
..077777777770..
..077777777770..
..077777777770..
..077777777770..
..000000000000..
....0......0....`],
  [ box, bitmap`
................
.LLLLLLLLLLLLLL.
.LLL77LLLL77LLL.
.LL7777LL7777LL.
.L777777777777L.
.L722222222227L.
.L220222222022L.
.L220222222022L.
.L220222222022L.
.L722222222227L.
.L777777777777L.
.L777777777777L.
.LL7777LL7777LL.
.LLL77LLLL77LLL.
.LLLLLLLLLLLLLL.
................`],
  [ goal, bitmap`
................
.88888888888888.
.88585858585858.
.85858585858588.
.88585858585858.
.85858585858588.
.88585858585858.
.85858585858588.
.88585858585858.
.85858585858588.
.88585858585858.
.85858585858588.
.88585858585858.
.85858585858588.
.88888888888888.
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
p.bg`,
  map`
....p
.b.ww
....g
www..
g.b..`,
  map`
w..w
wpbw
gwb.
....
....`,
  map`
p...
...b
...b
.bbg`,
  map`
p.w.
.bwg
....
..bg`,
  map`
pwgwww
.....g
..bwww
w.bwww
w....w
wwww.w
wg.w.w
w.b..w
w...ww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box],
  [box]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("Woo!");
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
      addText("Woo! :D", { y: 5, color: color`5` });
    }
  }
});
