/*
@title: snek
@author: userjhansen

get the fruit
*/

const head = { u: "u", d: "d", l: "l", r: "r", find: "s" };
const body = "b";
const fruit = "f";
const background = ".";

setLegend(
  [
    head["r"],
    bitmap`
................
................
................
.....0.......0..
.....0.......0..
.....0.......0..
.....0.......0..
................
................
................
................
................
................
................
................
................`,
  ],
  [
    head["l"],
    bitmap`
................
................
................
..0.......0.....
..0.......0.....
..0.......0.....
..0.......0.....
................
................
................
................
................
................
................
................
................`,
  ],
  [
    head["u"],
    bitmap`
................
................
...0000.........
................
................
................
................
................
................
................
................
...0000.........
................
................
................
................`,
  ],
  [
    head["d"],
    bitmap`
................
................
................
................
...0000.........
................
................
................
................
................
................
................
................
...0000.........
................
................`,
  ],
  [
    body,
    bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
  ],
  [
    fruit,
    bitmap`
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
4444444444444444`,
  ],
  [
    background,
    bitmap`
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
0000000000000000`,
  ],
  [
    head["find"],
    bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`,
  ]
);
setBackground(background);
const level = map`
........
........
........
........
..bb.f..
........
........
........`;
setMap(level);
var path = [35, 34];
var score = 0,
  dir = "r",
  currdir = "r";
var interval = 0;
var running = false;

const die = () => {
  addText("You lose!", { y: 4, color: [255, 255, 255] });
  stop();
};

const render = () => {
  // Remove all pre-existing sprites
  sprites = getAll();
  for (sprite of sprites) {
    if (sprite.type !== background && sprite.type !== fruit) {
      sprite.remove();
    }
  }

  for (num of path) {
    addSprite(num % 8, Math.floor(num / 8), body);
  }
  addSprite(path[0] % 8, Math.floor(path[0] / 8), dir);
  addSprite(path[0] % 8, Math.floor(path[0] / 8), head["find"]);

  if (!running) return;
  clearText();
  addText("Score: " + score, { y: 1, color: [255, 255, 255] });
};

const start = () => {
  running = true;
  render();
  interval = setInterval(() => {
    currdir = dir;
    render();

    var tile = tilesWith(fruit, head["find"]).length;
    if (tile) {
      while (tilesWith(fruit, body).length) {
        getFirst(fruit).x = Math.floor(Math.random() * 8);
        getFirst(fruit).y = Math.floor(Math.random() * 8);
      }
      score += 1;
    }

    switch (dir) {
      case "r":
        if ((path[0] + 1) % 8 == 0) return die();
        path.unshift(path[0] + 1);
        break;
      case "l":
        if ((path[0] - 1) % 8 == 7) return die();
        path.unshift(path[0] - 1);
        break;
      case "u":
        if (path[0] - 8 < 0) return die();
        path.unshift(path[0] - 8);
        break;
      case "d":
        if (path[0] + 8 > 63) return die();
        path.unshift(path[0] + 8);
        break;
    }

    if (path.length > score + 2) {
      pop = path.pop();
    }
    if (path.length !== [...new Set(path)].length) die(); // If there is a double up of body positions. aka you touched your body

    render();
  }, 250);
};
const stop = () => {
  running = false;
  clearInterval(interval);
};

onInput("s", () => {
  if (currdir !== "u") {
    dir = "d";
  }
});
onInput("w", () => {
  if (currdir !== "d") {
    dir = "u";
  }
});
onInput("a", () => {
  if (currdir !== "r") {
    dir = "l";
  }
});
onInput("d", () => {
  if (currdir !== "l") {
    dir = "r";
  }
});

onInput("j", () => {
  clearText();
  setMap(level);
  path = [35, 34];
  score = 0;
  dir = "r";
  currdir = "r";
  start();
});


start();
