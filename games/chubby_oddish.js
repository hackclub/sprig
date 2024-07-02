const player = "p";
const goal = "g";
const wall = "w";
const startButton = "s";
const restartButton = "r";

setLegend(
  [ player, bitmap`
................
................
....22222222....
...2262226222...
..222222222222..
.22222222222222.
.22222022202222.
.22222222222222.
.22222222222222.
.22222222222222.
..222222222222..
...2222222222...
....22222222....
................
................
................`],
  [ goal, bitmap`
................
.....555555.....
...5555555555...
..555555555555..
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
..555555555555..
...5555555555...
.....555555.....
................
................`],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ startButton, bitmap`
................
...3333333333...
..333333333333..
.33333333333333.
.3333......3333.
.3333.3333.3333.
.3333.3333.3333.
.3333.3333.3333.
.3333.3333.3333.
.3333.3333.3333.
.3333.3333.3333.
.3333......3333.
.33333333333333.
..333333333333..
...3333333333...
................`],
  [ restartButton, bitmap`
................
...4444444444...
..444444444444..
.44444444444444.
.4444......4444.
.4444.4444.4444.
.4444.4444.4444.
.4444.4444.4444.
.4444.4444.4444.
.4444.4444.4444.
.4444.4444.4444.
.4444......4444.
.44444444444444.
..444444444444..
...4444444444...
................`]
);

let level = 0;
const levels = [
  map`
p..w
....
..w.
..wg`,
  map`
p.w.
w..g
...w
.w..`,
  map`
p.w.
w..w
..w.
wg..`,
  map`
p..w
w...
..ww
g.w.`,
  map`
p....
wwww.
..gw.
.www.
.....`,
  map`
p.w.w
.....
.www.
..w.g
.....`,
  map`
..ww..
.w..w.
wp...w
wwww.w
w....w
w...gw`,
  map`
wp...w
w....w
w.....
.wwww.
...w..
wwwwg.`,
  map`
pwwww.
.....w
wwww.w
w....w
wg...w
.wwww.`,
    map`
w.....
wwwww.
wp...w
w....w
w....w
w...gw`,
    map`
.w...w...........p
.wwww..wwwwwwwww..
......ww........w.
.wwww.w.wwwwww..w.
.w..w.ww...w.w..ww
.w..w.ww...w.w..w.
.w..w.w.ww.w.w..w.
.w..w.w..w......w.
.w..w.w..w.ww...w.
.w....w..w.w.w..w.
.w....w..w.w.w..w.
.w..w.w.w..w.w..w.
.w..w.ww..w..w..w.
.w..w....w...w.www
.w..w.wwwwwww.w...
.w..w........w..w.
.wwwwwwwwwwwww.w..
................wg`,

];
const startScreen = map`
.......................
.......................
...s...s..s...ss.ss....
...s...s.s.s.s...s.s...
...s.s.s.sss..s..s.s...
...ss.ss.s.s...s.s.s...
...s...s.s.s.ss..ss....
.......................
........sss.sss........
.........s..s.s........
.........s..sss........
.......................
...ss.sss..sss.s...sss.
..s....s..s..s.sss..s..
...s...s..ssss.s.s..s..
....s..s..s..s.s....s..
..ss...s..s..s.s....s..
.......................`;

const endScreen = map`
..............
..............
..............
.rrr.r..r.rr..
.r...rr.r.r.r.
.rrr.rrrr.r.r.
.r...r.rr.r.r.
.rrr.r..r.rr..
..............
..............
..............
..............`;

setMap(startScreen);

setSolids([player, wall]);

function startGame() {
  level = 0;
  setMap(levels[level]);
}

function restartGame() {
  setMap(startScreen);
}

onInput("w", () => {
  if (getFirst(player)) getFirst(player).y -= 1;
});

onInput("s", () => {
  if (getFirst(player)) getFirst(player).y += 1;
});

onInput("a", () => {
  if (getFirst(player)) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (getFirst(player)) getFirst(player).x += 1;
});

onInput("i", () => {
  const start = getFirst(startButton);
  if (start) startGame();
});

onInput("k", () => {
  const restart = getFirst(restartButton);
  if (restart) restartGame();
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      setMap(endScreen);
    }
  }
});


