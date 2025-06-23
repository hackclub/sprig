// Coin Hunter - one at a time, 10 to win!
const player = "p";
const wall = "w";
const coin = "c";
const background = "b";

setLegend(
  [ player, bitmap`
....0000....
...077770...
..07777770..
..07700770..
..07777770..
...077770...
....0000....
....0..0....
....0..0....
....0..0....
....0000....
...00..00...
..00....00..
..0......0..
............
............`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L44444444444444L
L4LLLLLLLLLLLL4L
L4L4444444444L4L
L4L4LLLLLLLLL4L4
L4L4L444444L4L4L
L4L4L4LLLLL4L4L4
L4L4L4L44L4L4L4L
L4L4L4L44L4L4L4L
L4L4L4LLLLL4L4L4
L4L4L444444L4L4L
L4L4LLLLLLLL4L4L
L4L4444444444L4L
L4LLLLLLLLLLLL4L
L44444444444444L
LLLLLLLLLLLLLLLL`],
  [ coin, bitmap`
................
......0000......
.....022220.....
....02222220....
....02222220....
....02222220....
.....022220.....
......0000......
......0000......
.....022220.....
....02222220....
....02222220....
....02222220....
.....022220.....
......0000......
................`],
  [ background, bitmap`
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

setBackground(background);

let level = map`
wwwwwwwwww
w........w
w..wwww..w
w........w
w....p...w
wwwwwwwwww`;

setMap(level);

setSolids([player, wall]);

let score = 0;

// Movement
onInput("w", () => getFirst(player).y--);
onInput("s", () => getFirst(player).y++);
onInput("a", () => getFirst(player).x--);
onInput("d", () => getFirst(player).x++);

// Place first coin
function spawnCoin() {
  let emptySpaces = [];
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      let tile = getTile(x, y);
      if (!tile.some(s => s.type === wall || s.type === player || s.type === coin)) {
        emptySpaces.push([x, y]);
      }
    }
  }

  if (emptySpaces.length > 0) {
    let [x, y] = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    addSprite(x, y, coin);
  }
}

spawnCoin();

afterInput(() => {
  const p = getFirst(player);
  const tile = getTile(p.x, p.y);

  // Check for coin collection
  if (tile.some(s => s.type === coin)) {
    clearTile(p.x, p.y);
    addSprite(p.x, p.y, player); // re-add player
    score++;

    if (score >= 20) {
      addText("YOU WIN!", { y: 4, color: color`3` });
    } else {
      spawnCoin();
    }
  }
});
