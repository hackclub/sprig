const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [player, bitmap`
................
................
.....000000.....
....00000000....
....00.00.00....
....00000000....
....00000000....
.....000000.....
......0000......
.....000000.....
....00000000....
....0000.000....
.......00.......
......00.00.....
.....000.000....
................`],
  [box, bitmap`
................
.00000000000000.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.00000000000000.
................`],
  [goal, bitmap`
................
................
................
................
................
................
.....444444.....
.....444444.....
.....444444.....
.....444444.....
................
................
................
................
................
................`],
  [wall, bitmap`
0000000000000000
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000`]
);

setSolids([player, box, wall]);
setPushables({ [player]: [box] });

const levels = [
  map`
wwwwwww
w.....w
w.bg..w
w.p...w
wwwwwww`,
  map`
wwwwwwww
w......w
w.bg...w
w......w
w.bg...w
wp.....w
wwwwwwww`,
  map`
wwwwwwww
w.g.g..w
w......w
w.b.b..w
w......w
w..p...w
wwwwwwww`
];

let level = 0;
let won = false;
setMap(levels[level]);

onInput("w", () => {
  if (!won) getFirst(player).y -= 1;
});

onInput("s", () => {
  if (!won) getFirst(player).y += 1;
});

onInput("a", () => {
  if (!won) getFirst(player).x -= 1;
});

onInput("d", () => {
  if (!won) getFirst(player).x += 1;
});

onInput("j", () => {
  if (!won) setMap(levels[level]);
});

afterInput(() => {
  if (won) return;

  const targets = tilesWith(goal).length;
  const filled = tilesWith(goal, box).length;

  if (targets === filled) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      won = true;
      clearText();
      addText("you win!", { x: 6, y: 6 });
    }
  }
});