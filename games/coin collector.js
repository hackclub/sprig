const player = "p";
const coin = "c";
const wall = "w";

setLegend(
  [ player, bitmap`
................
....00....00....
....00....00....
................
.....000000.....
....0LLLLL0.....
....0L0L0L0.....
.....0LLL0......
....0000000.....
...00.....00....
...0.......0....
...0.00000.0....
...0.0...0.0....
...0.00000.0....
....0.....0.....
................` ],
  [ coin, bitmap`
................
................
................
.....33333......
....366663......
....363663......
....366663......
.....33333......
....33.33.......
...3.333.3......
...3.333.3......
....33.33.......
................
................
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L0LLLLLLLLLLL00L
L0L000000000L00L
L0L0LLLLLLL0L00L
L0L0L00000L0L00L
L0L0L0LLL0L0L00L
L0L0L0L0L0L0L00L
L0L0L0LLL0L0L00L
L0L0L00000L0L00L
L0L0LLLLLLL0L00L
L0L000000000L00L
L0LLLLLLLLLLL00L
L00000000000000L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ]
);

// Reusable maps
const levels = [
  map`
wwwwwwwwww
wp.....c.w
w..wwww..w
w..w..w..w
w..w..w..w
w..w..w..w
w..w..w..w
w..w..w..w
w......c.w
wwwwwwwwww`,

  map`
wwwwwwwwww
wp..w..c.w
w..w..w..w
w..w..w..w
w..wwww..w
w.......cw
w..wwww..w
w..w..w..w
w..w..w..w
wwwwwwwwww`,

  map`
wwwwwwwwww
wp...w...w
w.w.wcw.w.
w.w.w.w.w.
w.w.w.w.w.
w.w.wcw.w.
w.w.w.w.w.
w.w.w.w.w.
w...w...cw
wwwwwwwwww`
];

function startLevel() {
  clearText();
  let randomIndex = Math.floor(Math.random() * levels.length);
  setMap(levels[randomIndex]);
}

startLevel();

onInput("w", () => getFirst(player).y -= 1);
onInput("s", () => getFirst(player).y += 1);
onInput("a", () => getFirst(player).x -= 1);
onInput("d", () => getFirst(player).x += 1);

afterInput(() => {
  const p = getFirst(player);
  const coins = getAll(coin);

  for (let c of coins) {
    if (c.x === p.x && c.y === p.y) {
      clearTile(c.x, c.y);
      addSprite(c.x, c.y, player);
    }
  }

  if (getAll(coin).length === 0) {
    startLevel(); // Never ends
  }
});
