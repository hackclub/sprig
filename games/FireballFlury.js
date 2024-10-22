/*
@title: Fireball Flury
@author: Mpro256
@tags: ['survival', 'endless']
@addedOn: 2024-10-22
*/

const player = "p";
const fireball = "f";
const background = "b";

setLegend(
  [player, bitmap`
................
................
................
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
....11111111....
................
................
................`],
  [fireball, bitmap`
.....666666.....
....66666666....
...6666666666...
..666666666666..
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
................`],
  [background, bitmap`
................
................
................
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
................
................
................`]
);

setBackground(background);

setMap(map`
................
................
................
................
.......p........
................
................
................
................`);

let score = 0;
let scoreInterval;

function spawnFireball() {
  const fireballX = Math.floor(Math.random() * width());
  addSprite(fireballX, 0, fireball);
}

function moveFireballs() {
  const fireballs = getAll(fireball);

  for (const f of fireballs) {
    f.y += 1;

    if (f.y >= height()) {
      f.remove();
    }

    const playerPos = getFirst(player);
    if (f.x === playerPos.x && f.y === playerPos.y) {
      gameOver();
    }
  }
}

function gameOver() {
  addText("Game Over!", { y: 4, color: color`3` });
  clearInterval(fireballInterval);
  clearInterval(moveInterval);
  clearInterval(scoreInterval);
}

onInput("a", () => {
  const p = getFirst(player);
  if (p.x > 0) {
    p.x -= 1;
  }
});
onInput("d", () => {
  const p = getFirst(player);
  if (p.x < width() - 1) {
    p.x += 1;
  }
});
onInput("w", () => {
  const p = getFirst(player);
  if (p.y > 0) {
    p.y -= 1;
  }
});
onInput("s", () => {
  const p = getFirst(player);
  if (p.y < height() - 1) {
    p.y += 1;
  }
});

const fireballInterval = setInterval(spawnFireball, 1000);
const moveInterval = setInterval(moveFireballs, 200);

scoreInterval = setInterval(() => {
  score++;
  clearText();
  addText(`Score: ${score}`, { y: 1, color: color`3` });
}, 1000);
