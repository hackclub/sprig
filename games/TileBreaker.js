/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tile Breaker
@author: CoderFleet
@tags: ['New', 'Classic Remake']
@addedOn: 2024-07-07
*/

const paddle = "p";
const ball = "b";
const brick = "x";

setLegend(
  [paddle, bitmap`
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
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ball, bitmap`
................
................
................
................
................
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
....33333333....`],
  [brick, bitmap`
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
1111111111111111`]
);

const level = map`
................
................
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxx
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
......p.......b.
`;

setMap(level);
setSolids([paddle, brick]);

let ballDirectionX = 1;
let ballDirectionY = -1;
let gameRunning = true;

setInterval(updateGame, 200);

const ballSpeed = 1;

onInput("a", () => {
  if (!gameRunning) return;
  const p = getFirst(paddle);
  if (p.x > 0) p.x -= 1;
});

onInput("d", () => {
  if (!gameRunning) return;
  const p = getFirst(paddle);
  if (p.x < width() - 1) p.x += 1;
});

function gameOver() {
  gameRunning = false;
  addText("Game Over", { x: 6, y: 8, color: color`3` });
}

function updateGame() {
  if (!gameRunning) return;

  const b = getFirst(ball);

  b.x += ballDirectionX * ballSpeed;
  b.y += ballDirectionY * ballSpeed;

  if (b.x <= 0 || b.x >= width() - 1) {
    ballDirectionX *= -1;
  }

  if (b.y <= 0) {
    ballDirectionY *= -1;
  }

  const paddleTile = getTile(b.x, b.y + 1).find(sprite => sprite.type === paddle);
  if (paddleTile) {
    ballDirectionY *= -1;
  }

  const brickTile = getTile(b.x, b.y).find(sprite => sprite.type === brick);
  if (brickTile) {
    brickTile.remove();
    ballDirectionY *= -1;
  }

  if (b.y >= height() - 1) {
    gameOver();
    b.remove();
  }
}