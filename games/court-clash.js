/* Stage 0: structural sanity check only. This draws an 10x8 court with one
   movable player placeholder and no tennis logic. dx/dy were NOT used as
   settable velocities anywhere in this file. */
const player = "p";
const court = "c";

setLegend(
  [player, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [court, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`]
);

setBackground(court);
const level = map`
cccccccccc
cccccccccc
cccccccccc
cccccccccc
cccccccccc
cccccccccc
ccccpccccc
cccccccccc`;
setMap(level);

function movePlayer(dx, dy) {
  const sprite = getFirst(player);
  if (!sprite) return;
  sprite.x = Math.max(0, Math.min(9, sprite.x + dx));
  sprite.y = Math.max(0, Math.min(7, sprite.y + dy));
}

onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("s", () => movePlayer(0, 1));
onInput("d", () => movePlayer(1, 0));

// Assumption to verify: sprite.x/y and map positions use tile-grid units.
