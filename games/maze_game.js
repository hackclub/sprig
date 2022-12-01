/*
@title: maze_game
@author: Darsh Anup
*/

const player = "p";
const block = "b";
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
................
.00000000000000.
.01111111111110.
.01111111111110.
.01551111115510.
.01551111115510.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01333333333310.
.01333333333310.
.01111111111110.
.00000000000000.
................`],
  [ block, bitmap`
................
.99999999999999.
.99999999999999.
.99....99....99.
.99....99....99.
.99....99....99.
.99....99....99.
.99999999999999.
.99999999999999.
.99....99....99.
.99....99....99.
.99....99....99.
.99....99....99.
.99999999999999.
.99999999999999.
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
0000000000000000`],
  [ goal, bitmap`
................
.44444444444444.
.4............4.
.4.4444444444.4.
.4.4........4.4.
.4.4.444444.4.4.
.4.4.4....4.4.4.
.4.4.4.44.4.4.4.
.4.4.4.44.4.4.4.
.4.4.4....4.4.4.
.4.4.444444.4.4.
.4.4........4.4.
.4.4444444444.4.
.4............4.
.44444444444444.
................`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwww
wgwwwwwwwwwww
w..wwwww...ww
w..ww...b..ww
w..ww...w..ww
w..ww.p.w..ww
w..ww...w..ww
w..wwwwww..ww
w..wwwwww..ww
w..........ww
w..........ww
wwwwwwwwwwwww
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.............................w
w.............................w
w.....wwwwwww..w..wwwwwwwwww..w
w.....w.....w..w..w...........w
w.....w.....w..w..w...........w
w..w..w..wwww..w..wwwwwwwwwwwww
w..w..w.....w..w..w...........w
w..w..w.....w..w..w...........w
w..w..wwww..w..w..w..wwwwwww..w
w..w........w..w..w..w.....w..w
w..w........w..w..w..w.....w..w
w.wwwwwwwwwww..w..w..w..w..w..w
w.ww...........w..w..w..w..w..w
w.ww...........w..w..w..wwww.ww
w.ww..wwwwwwwwww..w..w..wwww.ww
w.ww..w...........w..w..wwww.ww
w.ww..w...........w..w..wwww.ww
w.ww..wwwwwwwwwwwww..w..wwww.ww
w.ww....................wwwwbww
wgww....................wwwwpww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwgwwwwwwwwwwww
w....w........w
w....w........w
w....w..wwww..w
w....w.....w..w
w....w.....w..w
w....wwwwwww..w
w.............w
w.............w
wwwwwwwww..w..w
w..........w..w
w..........w..w
w..wwwwwwwww..w
w.......w.....w
w.......w.....w
wwwwww..w..wwww
w....w..w..w..w
w....w..w..w..w
w....wwww..w..w
w....w.....w..w
w....w.....w..w
w....w..wwww..w
w.............w
w.............w
w...wwwwwwwwwww
w.............w
w.............w
w....wwwwwww..w
w....w.....w..w
w....w.....w..w
w....wwww..w..w
w..........w..w
w..........w..w
w..wwwwwwwww..w
w.............w
w.b...........w
wwpwwwwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, block, wall])

setPushables({
  [player]: [block],
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

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
  const numberCovered = tilesWith(goal, block).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You win!", { y: 3, color: color`3` });
    }
  }
});