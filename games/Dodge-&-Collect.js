/*
@title: Coin Hunter Maze
@author: [Lovro Kastelic]
@tags: ['maze', 'collecting']
*/

// 1. Grafika
const playerSprite = bitmap`
................
....00000000....
....05555550....
....05055050....
....05555550....
....05000050....
....05555550....
....00000000....
................`;

const wallSprite = bitmap`
0000000000000000
0555555555555550
0500000000000050
0505555555555050
0505000000005050
0505055555505050
0505050000505050
0505050550505050
0505050000505050
0505055555505050
0505000000005050
0505555555555050
0500000000000050
0555555555555550
0000000000000000`;

const coinSprite = bitmap`
................
......4444......
....44888844....
...4888888884...
..488884488884..
..488884488884..
..488884488884..
...4888888884...
....44888844....
......4444......
................`;

const enemySprite = bitmap`
................
.....222222.....
....22222222....
...2202222022...
...2222222222...
...2220000222...
....22222222....
.....222222.....
................`;

setLegend(
  [ "p", playerSprite ],
  [ "w", wallSprite ],
  [ "c", coinSprite ],
  [ "e", enemySprite ]
);

const gameMap = map`
wwwwwwwwwwwwww
w.p........c.w
w..ww.ww.ww..w
w..w...w..w..w
w.c..e...e..cw
w..ww.ww.ww..w
w.c........c.w
wwwwwwwwwwwwww`;

let score = 0;
let highScore = 0;
let isGameOver = false;

setMap(gameMap);

// 2. Kontrole
onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

onInput("k", () => {
  if (isGameOver) {
    isGameOver = false;
    score = 0;
    const p = getFirst("p");
    if (p) { p.x = 1; p.y = 1; }
    
    // Ročno resetiranje sovražnikov
    getAll("e").forEach((e, i) => {
      if (i === 0) { e.x = 5; e.y = 4; }
      else { e.x = 9; e.y = 4; }
    });
    
    updateStats();
  }
});

function move(dx, dy) {
  if (isGameOver) return;
  const p = getFirst("p");
  if (!p) return;

  const nx = p.x + dx;
  const ny = p.y + dy;

  if (getTile(nx, ny).every(t => t.type !== "w")) {
    p.x = nx;
    p.y = ny;
    checkCollisions();
  }
}

function checkCollisions() {
  const p = getFirst("p");
  if (!p) return;

  getAll("c").forEach(c => {
    if (p.x === c.x && p.y === c.y) {
      c.remove();
      score++;
      if (score > highScore) highScore = score;
      updateStats();
      spawnCoin();
    }
  });

  getAll("e").forEach(e => {
    if (p.x === e.x && p.y === e.y) endGame();
  });
}

function spawnCoin() {
  let rx = Math.floor(Math.random() * 12) + 1;
  let ry = Math.floor(Math.random() * 6) + 1;
  if (getTile(rx, ry).length === 0) {
    addSprite(rx, ry, "c");
  } else {
    spawnCoin();
  }
}

// POPRAVLJENO: Točke in rekord v enem izpisu, da bosta oba vidna
function updateStats() {
  if (isGameOver) return;
  clearText();
  // Vse v enem stringu, da se ne prekriva napačno
  addText(`T: ${score}  R: ${highScore}`, { y: 2, color: color`4` });
}

function endGame() {
  if (isGameOver) return;
  isGameOver = true;
  
  clearText();
  addText("UMRL SI!", { y: 45, color: color`2` });
  addText(`REKORD: ${highScore}`, { y: 60, color: color`5` });
  addText("PRITISNI K", { y: 80, color: color`2` });
}

// 4. Premikanje sovražnikov
setInterval(() => {
  if (isGameOver) return;
  const p = getFirst("p");
  if (!p) return;

  getAll("e").forEach(e => {
    let nx = e.x;
    let ny = e.y;
    
    if (e.x < p.x) nx++; else if (e.x > p.x) nx--;
    if (e.y < p.y) ny++; else if (e.y > p.y) ny--;

    if (getTile(nx, ny).every(t => t.type !== "w")) {
      e.x = nx;
      e.y = ny;
    }
    
    if (e.x === p.x && e.y === p.y) endGame();
  });
}, 450);

updateStats();