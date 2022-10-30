/*
@title: Tron
@author: Robert Carmen
*/

const player = "1";
const player2 = "2";
const stream = "3";
const stream2 = "4"


setLegend(
  [ player, bitmap`
................
................
................
.....000000.....
....00000000....
...0002002000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
....00000000....
.....000000.....
................`],
  [ player2, bitmap`
................
................
....3333333.....
...333333333....
...330333033....
..33333333333...
..33333333333...
..33333333333...
..33333333333...
..33333333333...
..33333333333...
..33333333333...
...333333333....
...333333333....
....3333333.....
................`],
  [ stream, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ stream2, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
);

setSolids([]);

let level = 0;
const levels = [
  map`
2......1
........
........
........
........
........
........`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});



onInput("s", () => {
  addSprite(getFirst(player2).x, getFirst(player2).y, stream2)
  getFirst(player2).y += 1
});

onInput("w", () => {
  addSprite(getFirst(player2).x, getFirst(player2).y, stream2)
  getFirst(player2).y -= 1
});

onInput("a", () => {
  addSprite(getFirst(player2).x, getFirst(player2).y, stream2)
  getFirst(player2).x -= 1
});

onInput("d", () => {
  addSprite(getFirst(player2).x, getFirst(player2).y, stream2)
  getFirst(player2).x += 1
});

onInput("i", () => {
  addSprite(getFirst(player).x, getFirst(player).y, stream)
  getFirst(player).y -= 1
});

onInput("k", () => {
  addSprite(getFirst(player).x, getFirst(player).y, stream)
  getFirst(player).y += 1
});

onInput("j", () => {
  addSprite(getFirst(player).x, getFirst(player).y, stream)
  getFirst(player).x -= 1
});

onInput("l", () => {
  addSprite(getFirst(player).x, getFirst(player).y, stream)
  getFirst(player).x += 1
});

afterInput(() => {
  const impacts = tilesWith(stream, player).length;
  const impacts2 = tilesWith(stream2, player).length;
  const impacts3 = tilesWith(stream, player2).length;
  const impacts4 = tilesWith(stream2, player2).length;
  if (impacts > 0) {
    addText("P2 WINS!", { y: 4, color: color`3`});
    clearTile(getFirst(player).x, getFirst(player).y);
  }
  if (impacts2 > 0) {
    addText("P2 WINS!", { y: 4, color: color`3`});
    clearTile(getFirst(player).x, getFirst(player).y);
  }
  if (impacts3 > 0) {
    addText("P1 WINS!", { y: 4, color: color`5`});
    clearTile(getFirst(player2).x, getFirst(player2).y);
  }
  if (impacts4 > 0) {
    addText("P1 WINS!", { y: 4, color: color`5`});
    clearTile(getFirst(player2).x, getFirst(player2).y);
  }
});
