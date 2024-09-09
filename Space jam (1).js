/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Space jam
@author: 
@tags: []
@addedOn: 2024-00-00
*/
const rocket = "r";
const space = "s";
const meteor = "m";
let gameOver = false;

setLegend(
  [ rocket, bitmap`
................
.......0........
......010.......
.....01710......
....0177710.....
...017727710....
..01772227710...
...222222222....
...222222222....
...222202222....
...202020202....
...222020222....
...202002202....
...202020202....
...222022222....
...222222222....`] ,
  [ space, bitmap`
0000000000000000
0020000000000020
0000000000000000
0000002000020000
0000000000000000
0000000000000000
0002000000000200
0000000020000000
0200000000000000
0000000000000000
0000000000000000
0000000000000000
0020000002000200
0000000000000000
0000000000000000
0000000000000000`],
  [ meteor, bitmap`
................
......000000....
....001110110...
...01111111110..
...01101111110..
...01111011110..
..011011111110..
..011111111010..
.0111111011110..
.0111111111110..
..011101111110..
.011111111010...
..01101111110...
..0111111110....
...00111010.....
.....00000......`]
);

setSolids([]);

let score = 0;
let level = 0;

const levels = [
  map`
...........
...........
...........
...........
...........
...........
...........
...........
.....r.....`
];
setMap(levels[level]);

setSolids([meteor]);

let gameRunning = true;

function spawnMeteor() {
  let x = Math.floor(Math.random() * 10);
  let y = 0;
  addSprite(x, y, "m");
}

function moveMeteor() {
  let meteors = getAll("m");

  for (let i = 0; i < meteors.length; i++) {
    meteors[i].y += 1;
  }
}

function despawnMeteor() {
  let meteors = getAll("m");

  for (let i = 0; i < meteors.length; i++) {
    if (meteors[i].y == 8) {
      meteors[i].remove();
    }
  }
}

function checkHit() {
  let meteors = getAll("m");
  let r = getFirst("r");

  for (let i = 0; i < meteors.length; i++) {
    if (meteors[i].x == r.x && meteors[i].y == r.y) {
      return true;
    }
  }

  return false;
}

onInput("a", () => {
  getFirst("r").x -= 1;
});

onInput("d", () => {
  getFirst("r").x += 1;
});

setBackground(space);

var gameLoop = setInterval(() => {
  if (checkHit()) {
    gameOver = true;
    clearInterval(gameLoop);
    addText(`Game Over! Final Score: ${score}`, { x: 4, y: 4, color: color`3` });
    return;
  }

  score += 1;
  addText(`Score: ${score}`, { x: 8, y: 1, color: color`2` });

  despawnMeteor();
  moveMeteor();
  spawnMeteor();

}, 300);