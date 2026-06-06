/*
@title: Pong!!
@description: I made this game as an example for the Wellington College Hackclub and also so that I can get my hands on some hardware for examples for the Wellington College Hackclub.
@author: 
@tags: ['pong']
@addedOn: 2025-00-00
*/

/*
To whomever is reading this code. Im sorry.
No OOP for me today (as much as I miss it).
I'm like wayy to lazy.
*/

const player1 = "1";
const player2 = "2";
const ball = "3"
const background = "b";

const display_width = 80;
const display_height = 64;
const player_width = 6;
const player_height = 18;

const player_speed = 2;

const ball_width = 4;
const ball_height = 4;

const winning_score = 10;

let p1_x = 0;
let p1_y = display_height/2-player_height/2;
let p2_x = display_width-player_width;
let p2_y = display_height/2-player_height/2;

let p1_tiles = [];
let p2_tiles = [];
let ball_tiles = [];

const ball_start_x = display_width/2-ball_width;
const ball_start_y = display_height/2-ball_height;

let ball_x = ball_start_x;
let ball_y = ball_start_y;
let ball_vx = 2;
let ball_vy = 1;

let p1_score = 0;
let p2_score = 0;

let match_over = 0;

function insertSprite(x, y, sprite, width, height, tiles) {
  for (let i = 0; i < width; i++) {
    tiles[i] = [];

    for (let j = 0; j < height; j++) {
      addSprite(x + i, y + j, sprite);

      tiles[i][j] = getAll(sprite).at(-1);
    }
  }
}

let level = map``

for (let i = 0; i < display_height; i++) {
  for (let j = 0; j < display_width; j++)
    level += '.';

  level += '\n'
}

function setSpriteLocation(x, y, tiles) {
  for (let i = 0; i < tiles.length; i++)
    for (let j = 0; j < tiles[i].length; j++) {
      tiles[i][j].x = x + i;
      tiles[i][j].y = y + j;
    }
}

function moveP1(y) {
  p1_y += y;

  if (p1_y + player_height >= display_height)
    p1_y = display_height - player_height;

  if (p1_y <= 0)
    p1_y = 0;

  setSpriteLocation(p1_x, p1_y, p1_tiles);
}

function moveP2(y) {
  p2_y += y;

  if (p2_y + player_height >= display_height)
    p2_y = display_height - player_height;

  if (p2_y <= 0)
    p2_y = 0;

  setSpriteLocation(p2_x, p2_y, p2_tiles);
}

setLegend(
  [ player1, bitmap`
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
2222222222222222` ],
  [ player2, bitmap`
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
  [background, bitmap`
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
0000000000000000`],
  [ball, bitmap`
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
2222222222222222`]
);

setMap(level);
setBackground(background);

insertSprite(p1_x, p1_y, player1, player_width, player_height, p1_tiles);
insertSprite(p2_x, p2_y, player2, player_width, player_height, p2_tiles);
insertSprite(ball_x, ball_y, ball, ball_width, ball_height, ball_tiles);

/*setPushables({
  [ player1 ]: []
});*/

onInput("w", () => {
  moveP1(-player_speed);
});

onInput("s", () => {
  moveP1(player_speed);
});

onInput("i", () => {
  moveP2(-player_speed);
});

onInput("k", () => {
  moveP2(player_speed);
});

afterInput(() => {
  
});

addText(`P1: ${p1_score}  P2: ${p2_score}`, { x: 0, y: 0, color: color`2` });

setInterval(function (){
  // Move ball every 100ms, handle collisions and handle scoring;

  if (match_over)
    return;

  ball_x += ball_vx;
  ball_y += ball_vy;

  if (ball_x <= 0) {
    // We hit p1 goal.

    ball_x = ball_start_x;
    ball_y = ball_start_y;
    ball_vx = -ball_vx;

    p2_score++;
  }

  if (ball_x + ball_width >= display_width) {
    // We hit p2 goal.

    ball_x = ball_start_x;
    ball_y = ball_start_y;
    ball_vx = -ball_vx;

    p1_score++;
  }

  if (ball_y <= 0) {
    // top wall

    ball_y = 0;
    ball_vy = -ball_vy;

    p2_score++;
  }

  if (ball_y + ball_height >= display_height) {
    // bottom wall

    ball_y = display_height - ball_height;
    ball_vy = -ball_vy;
  }

  if (ball_x <= p1_x + player_width && ball_x + ball_width >= p1_x && ball_y + ball_height >= p1_y && ball_y <= p1_y + player_height)
    ball_vx = -ball_vx;

  if (ball_x + ball_width >= p2_x && ball_x <= p2_x + player_width && ball_y + ball_height >= p2_y && ball_y <= p2_y + player_height)
    ball_vx = -ball_vx;

  clearText();
  addText(`P1: ${p1_score}  P2: ${p2_score}`, { x: 0, y: 0, color: color`2` });

  if (p1_score >= winning_score || p2_score >= winning_score) {
    addText(`Match over.`, { x: 1, y: 1, color: color`2` });
    addText(`${p1_score > p2_score ? 'Player 1' : 'Player 2'} Wins`, { x: 1, y: 2, color: color`2` })

    match_over = 1;
  }

  setSpriteLocation(ball_x, ball_y, ball_tiles);
}, 100);