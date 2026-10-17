// @title: Vasko JS Game
// @author: vask3
// @description: A puzzle game where you push blocks onto target tiles.
// @tags: ['puzzle', 'maze']
// @addedOn: 2026-10-17

// Block Pusher (Sokoban)
const player = "p";
const block = "b";
const goal = "g";
const wall = "w";

setLegend(
  [player, bitmap`
    . . 3 3 . .
    . 3 3 3 3 .
    . . 3 3 . .
    . 3 3 3 3 .
    . 3 . . 3 .
  `],
  [block, bitmap`
    2 2 2 2 2 2
    2 8 8 8 8 2
    2 8 2 2 8 2
    2 8 8 8 8 2
    2 2 2 2 2 2
  `],
  [goal, bitmap`
    . . . . . .
    . 5 5 5 5 .
    . 5 . . 5 .
    . 5 5 5 5 .
    . . . . . .
  `],
  [wall, bitmap`
    1 1 1 1 1 1
    1 1 1 1 1 1
    1 1 1 1 1 1
    1 1 1 1 1 1
  `]
);

const level = map`
  wwwwwwwww
  w.......w
  w..p.b..w
  w.....g.w
  w.......w
  wwwwwwwww
`;

setMap(level);

// Set collision and pushing rules
setSolids([player, block, wall]);
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

onInput("w", () => {
  const p = getFirst(player);
  if (canMove(p, 0, -1)) p.y -= 1;
});

onInput("s", () => {
  const p = getFirst(player);
  if (canMove(p, 0, 1)) p.y += 1;
});

onInput("a", () => {
  const p = getFirst(player);
  if (canMove(p, -1, 0)) p.x -= 1;
});

onInput("d", () => {
  const p = getFirst(player);
  if (canMove(p, 1, 0)) p.x += 1;
});

afterInput(() => {
  const b = getFirst(block);
  const g = getFirst(goal);

  // Check if the block is on the goal target
  if (b.x === g.x && b.y === g.y) {
    clearText();
    addText("YOU WIN!", { x: 2, y: 0, color: color`5` });
  }
});
