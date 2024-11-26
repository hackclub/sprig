/*
@title: dot10
@author: ashfelloff
@tags: []
@addedOn: 2024-11-26
*/

const player = "p";
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
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
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`]
);

const levels = [
  `
wwwwwwwwww
p....w...w
w.ww.w.w.w
w....w.w.w
w.ww.w.w.w
w....w.w.w
w.ww.w.w.w
w....w.w.w
w.ww.w.w.w
w.......gw`,

  `
wwwwwwwwww
p..w.....w
w.wwwwww.w
w....w...w
www.www.ww
w...w...ww
w.w.w.w..w
w.w...ww.w
w.wwww...w
w.......gw`,

  `
wwwwwwwwww
p...w....w
www.w.ww.w
w...w.w..w
w.www.ww.w
w.w...w..w
w.w.www.ww
w...w....w
www.w.ww.w
w.......gw`,

  `
wwwwwwwwww
p.w......w
w.w.wwww.w
w.w.w....w
w.w.w.ww.w
w...w..w.w
www.ww.w.w
w.......ww
w.wwwww..w
w.......gw`,

  `
wwwwwwwwww
p........w
wwwwwwww.w
w........w
w.wwwwww.w
w.w....w.w
w.w.ww.w.w
w...ww...w
wwwwwwww.w
w.......gw`,

  `
wwwwwwwwww
p.......ww
w.w.ww..ww
w.w..w...w
w.ww.w.w.w
w....w.w.w
w.wwww.w.w
w.w....w.w
w.w.wwww.w
w.......gw`,

  `
wwwwwwwwww
p..www...w
w.....ww.w
www.w....w
w...wwww.w
w.w......w
w.wwwwww.w
w.......ww
w.wwwww..w
w.......gw`,

  `
wwwwwwwwww
p........w
wwwwwwww.w
w........w
w.wwwwwwww
w........w
wwwwwwww.w
w........w
w.wwwwwwww
w.......gw`,

  `
wwwwwwwwww
p.......ww
w.wwwww..w
w.....ww.w
www.w....w
w...wwww.w
w.w......w
w.wwwwww.w
w........w
www....wgw`,

  `
wwwwwwwwww
p........w
w.wwwwww.w
w.w....w.w
w.w.ww.w.w
w.w.ww.w.w
w.w....w.w
w.wwww.w.w
w......w.w
wwwwww.wgw`
];

let currentLevel = 0;
let timeLeft = 30;
let gameOver = false;

setMap(levels[0]);
setSolids([wall]);

function canMove(x, y) {
  return !getTile(x, y).some(t => t.type === wall);
}

function startLevel(levelNum) {
  setMap(levels[levelNum]);
  timeLeft = 30;
  gameOver = false;
  clearText();
  addText(`Level ${levelNum + 1}`, { y: 1 });
  addText(`Time: ${timeLeft}`, { y: 2 });
}

onInput("d", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.x < 9 && canMove(p.x + 1, p.y)) {
      p.x += 1;
    }
  }
});

onInput("a", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.x > 0 && canMove(p.x - 1, p.y)) {
      p.x -= 1;
    }
  }
});

onInput("w", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.y > 0 && canMove(p.x, p.y - 1)) {
      p.y -= 1;
    }
  }
});

onInput("s", () => {
  if (!gameOver) {
    const p = getFirst(player);
    if (p && p.y < 9 && canMove(p.x, p.y + 1)) {
      p.y += 1;
    }
  }
});

afterInput(() => {
  const p = getFirst(player);
  if (!p) return;
  
  if (getTile(p.x, p.y).some(t => t.type === goal)) {
    if (currentLevel < 9) {
      currentLevel++;
      startLevel(currentLevel);
    } else {
      gameOver = true;
      clearText();
      addText("You Beat All Levels!", { y: 5 });
    }
  }
});

setInterval(() => {
  if (!gameOver) {
    timeLeft -= 1;
    clearText();
    addText(`Level ${currentLevel + 1}`, { y: 1 });
    addText(`Time: ${timeLeft}`, { y: 2 });
    
    if (timeLeft <= 0) {
      gameOver = true;
      clearText();
      addText("Time's Up!", { y: 5 });
    }
  }
}, 1000);
