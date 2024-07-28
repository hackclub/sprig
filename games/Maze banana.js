/*
@title: Maze Banana
@author: Rushi Chopra
@tags: [maze, bananas]
@addedOn: 2024-07-27
*/
const player = "p";
const wall = "w";
const exit = "e";
const danger = "d";

let score = 0;

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap`
3333333333333333
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3333333333333333
3111111111111113
3111111111111113
3111111111111113
3111111111111113
3331111111111333
3331111111111333
3331111111111333
3333333333333333` ],
  [ exit, bitmap`
................
................
................
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....L3LLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
................` ],
  [ danger, bitmap`
................
................
................
................
......33333.....
......3...3.....
......3...3.....
......3...3.....
......33333.....
......3.........
......3.........
......3.........
......3.........
......3.........
......3.........
................` ]
);

setSolids([wall]);

let level = 0;
const levels = [
  map`
p.w...
....w.
..w..e`,
  map`
p..w.
.www.
....e
w.w..
....w`,
  map`
p.www
w.w.w
.....
..w.e
..w.w`,
  map`
p.w....
.w.w.d.
.....w.
.wd.w.w
ww...w.
..w.w.e
d.....w`,
  map`
p..w..d
.www..e
.....d.
d.w.ww.
..w....
.....w.`,
  map`
p..w.e
w.w.w.
w..w..
.w.w.w
......
d.w.w.
.w.w.d`
];

const startGame = () => {
  score = 0;
  level = 0;
  setMap(levels[level]);
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
}

const endGame = () => {
  clearText();
  addText("YOU WIN!", { y: 4, color: color`4` });
  addText(`Final Score: ${score}`, { y: 6, color: color`4` });
  addText("Updates Coming Soon :)", { y: 8, color: color`4` });

  onInput("r", () => {
    startGame();
  });
};

const setupInputHandlers = () => {
  onInput("w", () => {
    getFirst(player).y -= 1;
  });

  onInput("a", () => {
    getFirst(player).x -= 1;
  });

  onInput("s", () => {
    getFirst(player).y += 1;
  });

  onInput("d", () => {
    getFirst(player).x += 1;
  });
};

setupInputHandlers();
startGame();

afterInput(() => {
  const playerPos = getFirst(player);
  const exitPos = getFirst(exit);
  const dangerTiles = tilesWith(danger);

  if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
    score += 100; // Increase score
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
      clearText();
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
    } else {
      endGame();
    }
  } else if (dangerTiles.some(tile => tile.x === playerPos.x && tile.y === playerPos.y)) {
    addText("You Died!", { y: 4, color: color`3` });
    setTimeout(() => {
      setMap(levels[level]);
      clearText();
      addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
    }, 1000);
  }
});

setInterval(() => {
  for (let dangerTile of tilesWith(danger)) {
    let direction = Math.floor(Math.random() * 4);
    let newX = dangerTile.x;
    let newY = dangerTile.y;

    if (direction === 0) newX -= 1;
    else if (direction === 1) newX += 1;
    else if (direction === 2) newY -= 1;
    else if (direction === 3) newY += 1;

    if (getTile(newX, newY).length === 0) {
      dangerTile.x = newX;
      dangerTile.y = newY;
    }
  }
}, 500);

afterInput(() => {
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 1, color: color`4` });
});
