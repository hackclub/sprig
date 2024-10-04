/*
@title: air_hockey
@author: @Soumay Manderna
@tags: ['retro']
@addedOn: 2023-04-01

Controls--

use WASD for the left side paddle
use IJKL for the right side paddle

Rules--

Prevent the ball from hitting the corners!

Thankful to all my slack friends for helping me in building this game
i can never make this happen without your help
 */
const player1 = "p"
const player2 = "q"
const puck = "k"
const wall = "w"

let player1Score = 0;
let player2Score = 0;

const intervalTime = 60;

const playerSpeed = 5;
let puckDx = 1;
let puckDy = 1;

setLegend(
  [ player1, bitmap`
................
000.............
030.............
030.............
030.............
030.............
030.............
030.............
030.............
030.............
030.............
030.............
030.............
030.............
000.............
................` ],
  [ player2, bitmap`
................
.............000
.............050
.............050
.............050
.............050
.............050
.............050
.............050
.............050
.............050
.............050
.............050
.............050
.............000
................` ],
  [ puck, bitmap`
................
................
................
.....33333......
....3333333.....
...333333333....
...333666333....
...333666333....
...333666333....
...333333333....
....3333333.....
.....33333......
................
................
.........2......
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

setSolids([player1, player2,wall]);

const level = map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
........................................
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
setMap(level)


addSprite(3, Math.round(height() / 2), player1);
addSprite(3, Math.round((height() / 2 )+1), player1);
addSprite(width() - 4, Math.round(height() / 2), player2);
addSprite(width() - 4, Math.round((height() / 2)+1), player2);
addSprite(Math.round(width() / 2), Math.round(height() / 2), puck);

// Inputs
onInput("w", () => {
    getAll(player1).forEach(p => {
      p.y -= playerSpeed;
    })
});

onInput("s", () => {
    getAll(player1).forEach(p => {
      p.y += playerSpeed;
    })
});

onInput("i", () => {
    getAll(player2).forEach(p => {
      p.y -= playerSpeed;
    })
});

onInput("k", () => {
    getAll(player2).reverse().forEach(p => {
      p.y += playerSpeed;
    })
});

function calculateDistance(x1, y1, x2, y2) {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function restartPuck() {
  const puckSprite = getFirst(puck);
  puckSprite.x = Math.round(width() / 2);
  puckSprite.y = Math.round(height() / 2);
}

function updatePuckPositionAndScore() {
  const puckSprite = getFirst(puck);
  puckSprite.x += puckDx;
  puckSprite.y += puckDy;

  if (puckSprite.y <= 2) {
    puckDy = Math.abs(puckDy);
  } else if (puckSprite.y >= height() - 2) {
    puckDy = -Math.abs(puckDy);
  }

  const isPuckPastPlayer1 = (playerSprite) => {
    const distance = calculateDistance(puckSprite.x, puckSprite.y, playerSprite.x, playerSprite.y);
    return distance >= 1 && distance <= 2;
  };

  const isPuckPastPlayer2 = (playerSprite) => {
    const distance = calculateDistance(puckSprite.x, puckSprite.y, playerSprite.x, playerSprite.y);
    return distance >= 1 && distance <= 3;
  };

  const player1Sprites = getAll(player1);
  const player2Sprites = getAll(player2);

  if (player1Sprites.some(isPuckPastPlayer1) && puckDx < 0) {
    puckDx = Math.abs(puckDx);
  } else if (player2Sprites.some(isPuckPastPlayer2) && puckDx > 0) {
    puckDx = -Math.abs(puckDx);
  }

  if (puckSprite.x < 1) {
    player2Score++;
    restartPuck();
  } else if (puckSprite.x > width() - 1) {
    player1Score++;
    restartPuck();
  }
}

const intervalId = setInterval(updatePuckPositionAndScore, intervalTime);
