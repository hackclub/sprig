/*
@title: Eat the cake
@author: _klyap_
@tags: []
@addedOn: 2022-10-13
*/

const player = "p";
const cake = "c";
const bg = "b";
const broccoli = "r";

setLegend(
  [player, bitmap`
.......00.......
.......0........
.....888888.....
....88888888....
.L.8888888888.L.
.L.8808880888.L.
..L8888888888L..
...8888008888...
....88888888....
.....888888.....
......L..L......
......L..L......
.....LL..LL.....
................
................
................`],
  [cake, bitmap`
................
................
........4.......
.......3444.....
......3334......
......333.......
..22222222222...
..22222222222...
..22222222222...
..88888888888...
..22222222222...
..22222222222...
..22222222222...
................
................
................`],
  [broccoli, bitmap`
.......444......
......44444.....
...22244444422..
...24444442442..
..444424444444..
..444242444424..
..444444444444..
...4444444242...
.......444......
.......444......
......4444......
......444.......
......44........
................
................
................`],
[bg, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
)


setSolids([]);
setBackground(bg);

let level = 0;
const levels = [
  map`
.bbbb
.bpbb
.bbbb
cbbbr`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
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

const checkIfObjectWasTouched = () => {
  const { y: playerY, x: playerX } = getFirst(player);
 
  const playerTouchedCake = tilesWith(cake, player).length;
  const playerTouchedVeg = tilesWith(broccoli, player).length;

  if (playerTouchedCake) addText("You ate cake! :)", { y: 4, color: color`8` });
  if (playerTouchedVeg) addText("Nuuuu whhyy", { y: 4, color: color`8` });

};

afterInput(() => {
  checkIfObjectWasTouched();
});
