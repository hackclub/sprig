const player = "p";
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
................
................
................
.......0........
......000.......
.....00000......
....0000000.....
.....00000......
......000.......
.......0........
................
................
................
................
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ goal, bitmap`
................
................
................
.......333......
......33333.....
.....3333333....
....333333333...
.....3333333....
......33333.....
.......333......
................
................
................
................
................
................` ]
);

setSolids([ player, wall ]);

let level = 0;
const levels = [
  map`
p.w.
.w.w
...w
w..g`,
  map`
p.w.w
.w.w.
...w.
w.w.w
....g`,
  map`
p..w.
.w.w.
...w.
w.w.w
....g`
];

setMap(levels[level]);

setPushables({
  [ player ]: []
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const playerSprite = getFirst(player);
  const goalTile = tilesWith(goal).find(tile => tile[0].x === playerSprite.x && tile[0].y === playerSprite.y);

  if (goalTile) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 5, y: 6, color: color`3` });
    }
  }
});