/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: sprig game
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/
// 🔹 Sprites
const player = "p";
const wall = "w";
const coin = "c";
const railing = "r"; // ⚠️ barierki

setLegend(
  [player, bitmap`
................
................
................
................
...HH..HH.......
...HH..HH.......
.....00.........
.....00.........
.....HH.........
.....HH.........
...HHHHHH.......
...HHHHHH.......
.....HH.........
.....HH.........
...HH..HH.......
...HH..HH.......`],
  [wall, bitmap`
6666666666666666
6LLLLLLLLLLLLLL6
6L666666666666L6
6L6LLLLLLLLLL6L6
6L666666666666L6
6LLLLLLLLLLLLLL6
6666666666666666
6L6L6L6L6L6L6L66
66L6L6L6L6L6L6L6
6666666666666666
6LLLLLLLLLLLLLL6
6L666666666666L6
6L6LLLLLLLLLL6L6
6L666666666666L6
6LLLLLLLLLLLLLL6
6666666666666666`],
  [coin, bitmap`
................
................
................
................
.......66.......
......666F......
......666F......
.......FF.......
................
................
................
................
................
................
................
................`],
  [railing, bitmap`
................
................
................
................
................
................
................
.....9.....9....
....222222222...
....333333333...
....222222222...
....333333333...
.....1.....L....
.....L.....1....
.....1.....L....
....L.......1...`]
);

// 📏 Rozmiar
const WIDTH = 15;
const HEIGHT = 10;

// 🧱 MAPA
setMap(map`
wwwwwwwwwwwwwww
w.............w
w..w..w..w....w
w.............w
w....w....w...w
w.............w
w..w.....w....w
w.............w
w.....w.......w
wwwwwwwwwwwwwww
`);

// Gracz
addSprite(1, 1, player);

// 🔧 funkcja wolnego pola
function getEmptyTile() {
  let x, y, tile;
  do {
    x = Math.floor(Math.random() * (WIDTH-2)) + 1;
    y = Math.floor(Math.random() * (HEIGHT-2)) + 1;
    tile = getTile(x, y);
  } while (tile.some(s => s.type !== undefined));
  return {x, y};
}

// ⚠️ BARIERKI (7 sztuk)
for (let i = 0; i < 7; i++) {
  let pos = getEmptyTile();
  addSprite(pos.x, pos.y, railing);
}

// 🪙 MONETY
const MAX_COINS = 10;
const WIN_SCORE = 55;
let collected = 0;

function spawnCoin() {
  let pos = getEmptyTile();
  addSprite(pos.x, pos.y, coin);
}

// startowe monety
for (let i = 0; i < MAX_COINS; i++) {
  spawnCoin();
}

// ⏱ Timer
let timeLeft = 60;
let gameOver = false;

// 📊 HUD
function drawHUD() {
  clearText();

  const coinsText = `Coins:${collected}/${WIN_SCORE}`;
  const timeText = `Time:${timeLeft}`;

  const space = WIDTH - (coinsText.length + timeText.length);
  const spaces = space > 0 ? " ".repeat(space) : " ";

  addText(coinsText + spaces + timeText, {
    x: 0,
    y: 0,
    color: color`white`
  });
}
drawHUD();

// 🎮 RUCH
function movePlayer(dx, dy) {
  if (gameOver) return;

  const p = getFirst(player);
  if (!p) return;

  const newX = p.x + dx;
  const newY = p.y + dy;
  const tile = getTile(newX, newY);

  // 🚫 blokada: ściany + barierki
  if (!tile.some(s => s.type === wall || s.type === railing)) {
    p.x = newX;
    p.y = newY;
  }

  // 🪙 zbieranie monet
  tile.filter(s => s.type === coin).forEach(c => {
    c.remove();
    collected++;

    if (collected >= WIN_SCORE) {
      endGame(true);
      return;
    }

    spawnCoin();
    drawHUD();
  });
}

// Sterowanie
onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

// Timer
const gameTimer = setInterval(() => {
  if (gameOver) return;

  timeLeft--;
  drawHUD();

  if (timeLeft <= 0) {
    endGame(false);
  }
}, 1000);

// 🏁 Koniec
function endGame(win) {
  gameOver = true;
  clearInterval(gameTimer);
  clearText();

  if (win) {
    addText("YOU WIN", { x: 4, y: 4, color: color`yellow` });
  } else {
    addText("TIME UP", { x: 4, y: 4, color: color`yellow` });
  }

  addText(`SCORE ${collected}`, { x: 3, y: 6, color: color`white` });
}