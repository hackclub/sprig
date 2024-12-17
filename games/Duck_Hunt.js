// SPDX-License-Identifier: BSD-3-Clause OR MIT
/*
@title: DCKHNT
@author: el
@tags: []
@addedOn: 2023-03-25
*/
/* DCKHNT*/

const player = "p";
const duck = "h";

setLegend(
  [ player, bitmap`
................
................
................
......0000......
......0000......
......0000......
......0000......
.......00.......
.......00.......
.....000000.....
.......00.......
.......00.......
.......00.......
......0..0......
.....0....0.....
................` ],
  [ duck, bitmap`
................
................
................
................
...DDDD.........
..6D0DD.........
.666DDD.........
.....DDDDDDDDDD.
.....DDDDDDDDDD.
.....DDDDDDDDDD.
.......9....9...
......99...99...
.......9....9...
................
................
................`]
);
const INITAL_TRIES = () => Math.floor(Math.random() * 8)+3;
let tries = INITAL_TRIES();
let cur_tries = tries;
let is_playing = false;
let has_won = false;
let level = 0;
let has_init = false;
let tunes = [];

let map_playing = map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`;
let map_won = map`.`;
let rand = () => Math.floor(Math.random() * 8);
let touching = () => !has_won && Math.sqrt(Math.pow(getAll(player)[0].x - getAll(duck)[0].x, 2) + Math.pow(getAll(player)[0].y-getAll(duck)[0].y, 2)) == 1;
let active = () => is_playing && !has_won;

let win_tune = tune`
109.48905109489051: c5/109.48905109489051 + g4-109.48905109489051,
109.48905109489051,
109.48905109489051: c5/109.48905109489051 + g4-109.48905109489051,
109.48905109489051: f5/109.48905109489051 + c5-109.48905109489051,
109.48905109489051: c5/109.48905109489051 + g4-109.48905109489051,
109.48905109489051: g5/109.48905109489051 + d5-109.48905109489051,
2846.7153284671535`;
let lose_tune = tune`
208.33333333333334: b5-208.33333333333334 + f5/208.33333333333334,
208.33333333333334: e5-208.33333333333334 + b4/208.33333333333334,
208.33333333333334: a4-208.33333333333334 + e4/208.33333333333334,
208.33333333333334: b4-208.33333333333334 + f4/208.33333333333334,
208.33333333333334,
208.33333333333334: c4-208.33333333333334 + d4/208.33333333333334 + e4~208.33333333333334 + f4^208.33333333333334,
5416.666666666667`;

let start = tune`
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111,
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111,
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111: c5-111.11111111111111 + g4-111.11111111111111 + f5-111.11111111111111,
111.11111111111111,
111.11111111111111: c5-111.11111111111111 + f5-111.11111111111111 + g4-111.11111111111111,
111.11111111111111: a4-111.11111111111111,
111.11111111111111: f4-111.11111111111111,
111.11111111111111: a4-111.11111111111111,
111.11111111111111: c5-111.11111111111111,
111.11111111111111: a4-111.11111111111111,
111.11111111111111: c5-111.11111111111111,
111.11111111111111: e5-111.11111111111111,
111.11111111111111: c5-111.11111111111111,
1444.4444444444446`  ;

function pt(t) {
  tunes.push(playTune(t));
}
function st() {
  for (tune of tunes)
    tune.end();
  tunes = [];
}
function win(movedir) {
  let dX = getAll(duck)[0].x;
  let dY = getAll(duck)[0].y;
  let pX = getAll(player)[0].x;
  let pY = getAll(player)[0].y;
  if (dY == pY) {
    let delta = dX - pX;
    if (delta == -1 && movedir == 2) return true;
    else if (delta == 1 && movedir == 0) return true;
    
  }
  if (dX == pX) {
    let delta = dY - pY;
    
    if (delta == -1 && movedir == 1) return true;
    else if (delta == 1 && movedir == 3) return true;
  }
  return false;
}

function won() {
  
  has_won = true;
  is_playing = false;
  
  for (let x = 0; x < 7; x += 1)
    for (let y = 0; y < 7; y += 1)
      clearTile(x, y);
  setMap(map_won);
  st();
  pt(win_tune);
  addText("You won!", {y: 0});
  addText("You used", {y: 1});
  addText((cur_tries-tries)+"", {y: 2, color: color`9`});
  addText("kJ", {y: 3});
  addText("to catch the", {y: 4});
  addText("DUCK!", {y: 5, color: color`4`});
  addText("Press I to reset", {y: 7});
}

function lose() {
  clearText();
  has_won = true; // Quirk
  is_playing = false;
  for (let x = 0; x < 7; x += 1)
    for (let y = 0; y < 7; y += 1)
      clearTile(x, y);
  setMap(map_won);
  st();
  pt(lose_tune);
  addText("You lose!", {y: 0});
  addText("You used up", {y: 1});
  addText("ALL", {y:2, color: color`3`});
  addText("your energy.", {y: 3});
  addText("WINNER:", {y: 5});
  addText("DUCK!", {y: 6, color: color`4`});
  addText("Press I to reset", {y: 8});
  
}

function move_duck() {
  
  if(!active() || touching()) return;
  let duckX = getAll(duck)[0].x;
  let duckY = getAll(duck)[0].y;
  let setX = (x) => getAll(duck)[0].x = x;
  
  let setY = (y) => getAll(duck)[0].y = y;
  let moved_x_up = duckX == 0;
  let moved_x_down = duckX == 7;

  if (moved_x_up)
    setX(1);
  if (moved_x_down)
    setX(6);

  let moved_y_up = duckY == 0;
  let moved_y_down = duckY == 7;

  if(moved_y_up)
    setY(1);
  if (moved_y_down)
    setY(6);
  let dir = Math.floor(Math.random() * 4); /* Represents an angle as 90*x (0 == 0, 1 == 90) */
  if (dir == 0 && !moved_x_down)
    setX(duckX+1);
  if (dir == 2 && !moved_x_up)
    setX(duckX-1);
  if (dir == 1 && !moved_y_up)
    setY(duckY-1);
  if (dir == 3 && !moved_y_down)
    setY(duckY+1);
}

function move_player(direction) {
  if (tries <= 0) {
    lose();
  }
  if (!active()) return;
  
  tries -= 1;

  if (direction == 0)
    getAll(player)[0].x += 1;
  else if (direction == 1)
    getAll(player)[0].y -= 1;
  else if (direction == 2)
    getAll(player)[0].x -= 1;
  else if (direction == 3)
    getAll(player)[0].y += 1;
  draw_text();

  if (touching() && win(direction)) {
    has_won = true;
    won();
  };
}

function draw_text() {
  clearText();
  addText("QUACK!", {color: color`4`});
  addText(tries + " kJ", {y: 14});
}
function activate() {
  is_playing = true;
  
  clearText();
  draw_text();
  setMap(map_playing);
  addSprite(rand(), rand(), player);
  addSprite(rand(), rand(), duck);
  setSolids([ player, duck ]);
  if (!has_init) {
    onInput("w", () => is_playing && move_player(1))
    onInput("a", () => is_playing && move_player(2))
    onInput("s", () => is_playing && move_player(3))
    onInput("d", () => is_playing && move_player(0))  
    
    onInput("i", () => !is_playing && init());
    
    afterInput(() => move_duck()  && tries <= 0 && lose());
    has_init = true;
  }
  pt(start);
  
}


function init() {
  st();
  is_playing = false;
  has_won = false;
  tries = INITAL_TRIES();
  cur_tries = tries;
  setMap(map_won);
  addText("Duck! Hunt", {y: 0});
  addText("Use W, A, S, D", {y: 6});
  addText("To catch the", {y: 7});
  addText("DUCK!", {y: 8, color: color`4`});
  afterInput(() =>  !is_playing && !has_won && activate());
  
}

init();
