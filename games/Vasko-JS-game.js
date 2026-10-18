/*
@title: Vasko JS Game
@author: vask3
@description: Hello, that is my first JS game.
@tags: ['puzzle']
@addedOn: 2026-10-18
*/

const player = "p";
const block = "b";
const goal = "g";
const wall = "w";
const key = "k";
const door = "d";

let levelIndex = 0;
let moves = 0;
let hasKey = false;

setLegend(
  [player, bitmap`
...33...
..3333..
...33...
..3333..
...3.3..
`],
  [block, bitmap`
22222222
28888882
28222282
28888882
22222222
`],
  [goal, bitmap`
........
..5555..
..5..5..
..5555..
........
`],
  [wall, bitmap`
11111111
11111111
11111111
11111111
`],
  [key, bitmap`
........
..00....
..00000.
....0.0.
........
`],
  [door, bitmap`
77777777
7......7
7..77..7
77777777
`]
);

const levels = [
  map`
wwwwwwwww
w.......w
w..p.b..w
w.....g.w
w.......w
wwwwwwwww`,

  map`
wwwwwwwww
w.p...k.w
w.wwwdwww
w...b...w
w.....g.w
wwwwwwwww`,

  map`
wwwwwwwwwww
w.p...w...w
w.bbb.w.k.w
w.....d...w
w.www.w.g.w
w.........w
wwwwwwwwwww`
];

function loadLevel(idx) {
  hasKey = false;
  moves = 0;
  clearText();
  
  if (idx < levels.length) {
    setLevel(levels[idx]);
    addText(`Level: ${idx + 1}`, { x: 1, y: 0, color: color`3` });
    addText(`Moves: ${moves}`, { x: 7, y: 0, color: color`3` });
  } else {
    addText("YOU WIN!", { x: 2, y: 2, color: color`5` });
  }
}

loadLevel(levelIndex);

setSolids([player, block, wall, door]);
setPushables({
  [player]: [block]
});

function canMove(sprite, dx, dy) {
  const targetX = sprite.x + dx;
  const targetY = sprite.y + dy;

  if (targetX < 0 || targetX >= width() || targetY < 0 || targetY >= height()) {
    return false;
  }

  return true;
}

function movePlayer(dx, dy) {
  const p = getFirst(player);
  if (!p) return;

  if (canMove(p, dx, dy)) {
    p.x += dx;
    p.y += dy;
    moves++;

    const k = getFirst(key);
    if (k && p.x === k.x && p.y === k.y) {
      k.remove();
      hasKey = true;
      const d = getFirst(door);
      if (d) d.remove();
    }
  }
}

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("r", () => {
  loadLevel(levelIndex);
});

afterInput(() => {
  addText(`Moves: ${moves}`, { x: 7, y: 0, color: color`3` });

  const b = getFirst(block);
  const g = getFirst(goal);

  if (b && g && b.x === g.x && b.y === g.y) {
    levelIndex++;
    if (levelIndex < levels.length) {
      loadLevel(levelIndex);
    } else {
      clearText();
      addText("YOU WIN!", { x: 2, y: 2, color: color`5` });
    }
  }
});
