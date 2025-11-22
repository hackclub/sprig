const player = "p";
const wall = "w";
const coin = "c";
const exit = "e";
const enemy = "x";
const key = "k";

setLegend(
  [player, bitmap`
................
................
......0000......
.....000000.....
.....022220.....
.....022220.....
.....000000.....
......0000......
.....00HH00.....
....00HHHH00....
....0HH00HH0....
.....HH..HH.....
.....HH..HH.....
.....HH..HH.....
....HHH..HHH....
................`],

  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L1CCCCCCCCCC1L0
0L1C33333333C1L0
0L1C33333333C1L0
0L1C33333333C1L0
0L1C33333333C1L0
0L1C33333333C1L0
0L1C33333333C1L0
0L1CCCCCCCCCC1L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000
................
................`],

  [coin, bitmap`
................
................
......6666......
.....666666.....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
....66666666....
.....666666.....
......6666......
................
................
................
................`],

  [exit, bitmap`
................
4444444444444444
4777777777777774
4744444444444474
4744777777774474
4744700000074474
4744700000074474
4744700000074474
4744700000074474
4744777777774474
4744444444444474
4777777777777774
4444444444444444
................
................
................`],

  [enemy, bitmap`
................
.....333333.....
....33333333....
....33333333....
....33033033....
....33333333....
....33300333....
....33333333....
.....333333.....
....33333333....
...3333333333...
...3333333333...
....33....33....
....33....33....
................
................`],

  [key, bitmap`
................
................
.....666666.....
....66666666....
....66....66....
....66666666....
.....666666.....
......66........
......66........
......6666......
......6666......
......66........
................
................
................
................`]
);

const levels = [
  map`
wwwwwwwwwwwwwwww
wp.............w
w.wwwwwwwwww.c.w
w.w..........www
w.w.wwwwwwww...w
w.w.wc.........w
w.w.w.wwwwwwww.w
w.w.w.wc.......w
w.w.w.w.wwwwww.w
w...w.k......c.e
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp..w.....c....w
www.w.wwwwwwww.w
w...w.w......w.w
w.www.w.wwww.w.w
w.....w.wc.w.w.w
wwwww.w.ww.w.w.w
w...w.w..k.w.w.w
w.w.w.wwwwww.w.w
w.w.x........w.e
wwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwww
wp.w.....x.....w
w..w.wwwwwwwww.w
w.ww.w.c.....w.w
w....w.wwwww.w.w
wwww.w.k...w.w.w
wc...w.www.w.w.w
w.wwww...w...w.w
w.w....w.wwwww.w
w.x.ww.w.c.....e
wwwwwwwwwwwwwwww`
];

let currentLevel = 0;
let score = 0;
let hasKey = false;
let enemyDirection = {};

setMap(levels[currentLevel]);
setSolids([player, wall]);

function moveEnemies() {
  const p = getFirst(player);
  if (!p) return;
  
  getAll(enemy).forEach((e, index) => {
    if (!enemyDirection[index]) {
      enemyDirection[index] = Math.random() > 0.5 ? 1 : -1;
    }
    
    const newX = e.x + enemyDirection[index];
    const tile = getTile(newX, e.y);
    
    if (tile.some(s => s.type === wall) || newX < 0 || newX >= width()) {
      enemyDirection[index] *= -1;
    } else {
      e.x += enemyDirection[index];
    }
  });
  
  getAll(enemy).forEach(e => {
    if (p.x === e.x && p.y === e.y) {
      setMap(levels[currentLevel]);
      hasKey = false;
      score = Math.max(0, score - 5);
      enemyDirection = {};
      addText("Hit! -5 points", { y: 5, color: color`3` });
      setTimeout(() => clearText(), 800);
    }
  });
}

onInput("w", () => {
  const p = getFirst(player);
  if (p) p.y -= 1;
});

onInput("s", () => {
  const p = getFirst(player);
  if (p) p.y += 1;
});

onInput("a", () => {
  const p = getFirst(player);
  if (p) p.x -= 1;
});

onInput("d", () => {
  const p = getFirst(player);
  if (p) p.x += 1;
});

afterInput(() => {
  const p = getFirst(player);
  if (!p) return;
  
  const tile = getTile(p.x, p.y);
  
  const coins = tile.filter(s => s.type === coin);
  if (coins.length > 0) {
    coins.forEach(c => c.remove());
    score += 10;
    playTune(coinSound);
  }
  
  const keys = tile.filter(s => s.type === key);
  if (keys.length > 0) {
    keys.forEach(k => k.remove());
    hasKey = true;
    playTune(keySound);
    addText("Got the key!", { y: 5, color: color`6` });
    setTimeout(() => clearText(), 800);
  }
  
  if (tile.some(s => s.type === exit)) {
    if (hasKey) {
      currentLevel++;
      hasKey = false;
      if (currentLevel < levels.length) {
        setMap(levels[currentLevel]);
        enemyDirection = {};
        addText(`Level ${currentLevel + 1}`, { y: 5, color: color`4` });
        setTimeout(() => clearText(), 1000);
      } else {
        clearText();
        addText("You Win!", { y: 5, color: color`4` });
        addText(`Score: ${score}`, { y: 7, color: color`6` });
      }
    } else {
      addText("Need key!", { y: 5, color: color`3` });
      setTimeout(() => clearText(), 800);
    }
  }
});

setInterval(() => {
  moveEnemies();
}, 500);

const coinSound = tune`
100: C5^100,
100: E5^100`;

const keySound = tune`
150: G4^150,
150: C5^150,
150: E5^150`;

const bgMusic = tune`
400: C4~400,
400: E4~400,
400: G4~400,
400: C5~400`;

playTune(bgMusic, Infinity);

addText("MAZE ESCAPE", { y: 2, color: color`7` });
addText("W A S D = Move", { y: 5, color: color`7` });
addText("Get key & coins", { y: 7, color: color`7` });
addText("Avoid red enemies", { y: 9, color: color`7` });
addText("Reach green exit", { y: 11, color: color`7` });

setTimeout(() => clearText(), 4000);