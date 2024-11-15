/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Save the balloon
@author: hrit09
@tags: ['strategy', 'survival']
@addedOn: 2024-11-14
*/
const player = "p";
const obstacle = "o";
const background = "b";

setLegend(
  [player, bitmap`
.....333333.....
....33636363....
...3333333333...
..333336333333..
..363633363363..
..333336333333..
..336333333363..
...3333633633...
....33333333....
.....363333.....
........1.......
.......1........
......1.........
.......1........
........1.......
.......1........`],
  [obstacle, bitmap`
................
................
.....111111.....
....11111111....
...111LLLL111...
..111L1111L111..
..11L110011L11..
..11L10CC01L11..
..11L10CC01L11..
..11L110011L11..
..111L1111L111..
...111LLLL111...
....11111111....
.....111111.....
................
................`],
  [background, bitmap`
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
    ................`]
);

setMap(map`
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb
  bbbbbbbbbbbbbbbb`);

setSolids([player]);
addSprite(7, 14, player);

let gameRunning = true;
let score = 0;

function spawnObstacle() {
  const x = Math.floor(Math.random() * 16);
  addSprite(x, 0, obstacle);
}

function moveObstacles() {
  getAll(obstacle).forEach(o => {
    if (o.y === 15) {
      o.type = background; // Change to background to "remove" it visually
      score += 1;
    } else {
      o.y += 1;
    }
  });
}

onInput("a", () => {
  if (gameRunning) getFirst(player).x -= 1;
});
onInput("d", () => {
  if (gameRunning) getFirst(player).x += 1;
});

setInterval(() => {
  if (!gameRunning) return;
  
  spawnObstacle();
}, 500);

setInterval(() => {
  if (!gameRunning) return;

  moveObstacles();

  const playerPosition = getFirst(player);
  getAll(obstacle).forEach(o => {
    if (o.x === playerPosition.x && o.y === playerPosition.y) {
      gameRunning = false;
      addText(`Game Over!\nScore: ${score}`, { y: 6 });
    }
  });
}, 200);
