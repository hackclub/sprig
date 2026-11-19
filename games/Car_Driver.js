/*
@title: Car Driver
@description: Steer your car through four lanes of traffic and dodge every car to reach the end of the road.
@author: Arjun Pai
@tags: ['driving', 'arcade']
@addedOn: 2026-11-19
*/

const player = "p";
const car = "c";
const grass = "g";
const road = "r";

setLegend(
  [ player, bitmap`
................
....00000000....
...0555555550...
...0555555550...
..000777777000..
..050777777050..
..000777777000..
...0555555550...
...0555555550...
...0555555550...
..000555555000..
..050555555050..
..000000000000..
...0555555550...
...0000000000...
................`],
  [ car, bitmap`
................
...0000000000...
...0333333330...
..000000000000..
..030333333030..
..000333333000..
...0333333330...
...0333333330...
...0333333330...
..000777777000..
..030777777030..
..000777777000..
...0333333330...
...0333333330...
....00000000....
................`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ road, bitmap`
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
2111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setBackground(road);

const startMap = map`
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg....ggg
ggg.p..ggg`;

setMap(startMap);

const traffic = [4, 0, 6, 0, 3, 5, 0, 4, 6, 0, 3, 0, 5, 4, 0, 6, 3, 0, 4, 5, 0, 3, 6, 0, 4, 0, 5, 3, 0, 6];

let step = 0;
let over = false;

function drive() {
  const cars = getAll(car);

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].y == 7) {
      cars[i].remove();
    } else {
      cars[i].y += 1;
    }
  }

  if (traffic[step] > 0) {
    addSprite(traffic[step], 0, car);
  }

  step = step + 1;
}

function checkGame() {
  clearText();
  addText("Dist", { x: 0, y: 0, color: color`2` });
  addText("" + step, { x: 0, y: 1, color: color`2` });

  if (tilesWith(player, car).length > 0) {
    over = true;
    addText("crashed!", { x: 6, y: 6, color: color`3` });
    addText("J: retry", { x: 6, y: 8, color: color`2` });
  } else if (step == 38) {
    over = true;
    addText("you win!", { x: 6, y: 6, color: color`3` });
  }
}

onInput("a", () => {
  if (over) return;
  if (getFirst(player).x > 3) {
    getFirst(player).x -= 1;
    checkGame();
  }
});

onInput("d", () => {
  if (over) return;
  if (getFirst(player).x < 6) {
    getFirst(player).x += 1;
    checkGame();
  }
});

onInput("j", () => {
  setMap(startMap);
  step = 0;
  over = false;
  checkGame();
});

setInterval(() => {
  if (!over) {
    drive();
    checkGame();
  }
}, 400);
