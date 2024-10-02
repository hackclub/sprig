/*
@title: MathRacer
@author: spageektti
@tags: []
@addedOn: 2024-00-00
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const road = "r"
const a = "a"
const b = "b"
let a_count = 0;
let b_count = 0;
let text = "";
let sum = 0;
let lvl = 0;
let time = 61;

setLegend(
  [player, bitmap`
................
.....446644.....
....44444444....
...LD4DDDD4DL...
...L44444444L...
...L41111114L...
...4111111114...
....44444444....
....14DDDD41....
....14444441....
....44DDDD44....
...L14444441L...
...L14DDDD41L...
...LD444444DL...
....D33DD33D....
................`],
  [road, bitmap`
2000000000000000
2000000000000000
2000000000000000
0000000000000000
0000000000000002
0000000000000002
0000000000000002
0000000000000000
2000000000000000
2000000000000000
2000000000000000
0000000000000000
0000000000000002
0000000000000002
0000000000000002
0000000000000000`],
  [a, bitmap`
................
................
................
................
................
.......77.......
......7557......
.....757757.....
....75755757....
....75755757....
.....757757.....
......7557......
.......77.......
................
................
................`],
  [b, bitmap`
................
................
................
................
................
.......44.......
......4DD4......
.....4D44D4.....
....4D4DD4D4....
....4D4DD4D4....
.....4D44D4.....
......4DD4......
.......44.......
................
................
................`],
)

setSolids([player, ])

let level = 0
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........
....p....
.........`
]

setMap(levels[level])
setBackground(road)

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function random_x() {
  return Math.floor(Math.random() * 9);
}

function random_y() {
  return Math.floor(Math.random() * 5);
}

function random() {
  return Math.floor(Math.random() * 16);
}

function generateGem(type) {
  let x, y;
  let positionValid = false;
  while (!positionValid) {
    x = random_x();
    y = random_y();
    positionValid = !getTile(x, y).length; // Ensure the tile is empty
  }
  addSprite(x, y, type);
}

function generateGems() {
  for (let i = 0; i < 5; i++) {
    generateGem(a);
  }
  for (let i = 0; i < 5; i++) {
    generateGem(b);
  }
}

sum = random();

function updateText() {
  clearText()
  if (lvl == 0) {
    addText((a_count - b_count === sum) ? `${a_count}B - ${b_count}G = ${sum}` : `${a_count}B - ${b_count}G != ${sum}`, {
      x: 4,
      y: 1,
      color: (a_count - b_count === sum) ? color`D` : color`3`
    });
  }
  if (lvl == 1) {
    addText((b_count - a_count === sum) ? `${b_count}G - ${a_count}B = ${sum}` : `${b_count}G - ${a_count}B != ${sum}`, {
      x: 4,
      y: 1,
      color: (b_count - a_count === sum) ? color`D` : color`3`
    });
  }
  addText(`${time}`, {
    x: 1,
    y: 1,
    color: (time > 10) ? color`D` : color`3`
  });

}

function hasWon() {
  if (lvl == 0) {
    return a_count - b_count === sum;
  }

  if (lvl == 1) {
    return b_count - a_count === sum;
  }
}



async function game() {
  while (time > 0 || ((lvl == 0 && a_count - b_count != sum) || (lvl == 1 && b_count - a_count != sum))) {
    generateGems();
    for (let j = 7; j >= 0; j--) {
      if (time <= 0 && hasWon()) {
        break;
      }
      if (time > 0) {
        time--;
      }
      updateText()
      await sleep(250);
      for (let k = 0; k < getAll(a).length; k++) {
        if (getAll(a)[k].y == getFirst(player).y && getAll(a)[k].x == getFirst(player).x) {
          getAll(a)[k].remove();
          a_count++;
          updateText()
          continue;
        }
        if (getAll(a)[k].y == 8) { // Remove gems off-screen
          getAll(a)[k].remove();
          continue;
        }
        getAll(a)[k].y += 1;
        if (getAll(a)[k].y == getFirst(player).y && getAll(a)[k].x == getFirst(player).x) {
          getAll(a)[k].remove();
          a_count++;
          updateText()
          continue;
        }
      }
      for (let k = 0; k < getAll(b).length; k++) {
        if (getAll(b)[k].y == getFirst(player).y && getAll(b)[k].x == getFirst(player).x) {
          getAll(b)[k].remove();
          b_count++;
          updateText()
          continue;
        }
        if (getAll(b)[k].y == 8) { // Remove gems off-screen
          getAll(b)[k].remove();
          continue;
        }
        getAll(b)[k].y += 1;
        if (getAll(b)[k].y == getFirst(player).y && getAll(b)[k].x == getFirst(player).x) {
          getAll(b)[k].remove();
          b_count++;
          updateText()
          continue;
        }
      }
      await sleep(250);
      if (time < 10 && time >= 0) {
        playTune(tune`
500,
500: C4~500,
15000`);
      }

    }
  }
  lvl++;
  lvl = lvl % 2;
  time = 61;
  a_count = 0;
  b_count = 0;
  game();
}

game();
