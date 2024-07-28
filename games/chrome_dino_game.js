/*
@title: Chrome Dinosaur Game
@author: @blazecoding.xyz
@tags: ['classic']
@addedOn: 2024-07-27
*/

const dino = "d";
const ptero = "r";
const cactus1 = "0";
const cactus2 = "2";
const ground = "g";

setLegend(
  [dino, bitmap`
................
................
................
..........00000.
.........00.0000
.........0000000
.0.......0000000
.00......00000..
.000....0000....
.0000..0000000..
..00000000000.0.
...000000000....
....0000000.....
.....00000......
.....0..0.......
.....00.00......`],
  [ptero, bitmap`
......0.........
......00........
......000.......
......0000......
......00000.....
...0..000000....
..000.0000000000
.00000000000....
000000000000000.
......00000.....
................
................
................
................
................
................`],
  [cactus1, bitmap`
.......00.......
......0000..0...
...0..0000.000..
..000.0000.000..
..000.0000.000..
..000.0000.000..
..000.0000.000..
..000.00000000..
..000.00000000..
..000.0000000...
..00000000......
..00000000......
...0000000......
......0000..000.
0000000000000.00
022.0.0000...0..`],
  [cactus2, bitmap`
.....0..........
....000.........
....000.0...0...
..0.000.0..000..
..0.000.0..000.0
..0.000.0..000.0
..0.000.0..000.0
..0.000.0..000.0
..0.00000..000.0
..0.000....000.0
..0.000..0.00000
..00000..0.000..
....000..00000..
000.000....000..
0.000000.0000000
....000000.000..`],
  [ground, bitmap`
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
................
................
0000000000000000
0...0....0...0..
...0..0.0..0..0.`]
);

const jumpSound = tune`
200: e4^500, e4^500, e4^500, e4^500, e4^500, e4^500, e4^500, e4^500, 
200: e4^500, e4^500, e4^500, e4^500, e4^500, e4^500, e4^500, e4^500`;

const gameOverSound = tune`
500: f4^500, a4^500, c5^500, f5^500`;

const scoreSound = tune`
100: g4^500, g4^500, g4^500, g4^500, 
100: a4^500, a4^500, a4^500, a4^500, 
100: b4^500, b4^500, b4^500, b4^500`;

var runmap = map`
........
dggggggg`;

setMap(runmap);

var const_time = 500;
var time = const_time;
var const_jump_time = 800;
var jump_time = 800;
var min_time = 200;
var jump = 0;
var top_map = "........";
var bot_map = "ggCggggg";
var top_next = ".";
var next = ".";
var top_first = ".";
var bot_first = ".";
var last = ground;
var tick_timer;
var jump_timer;
var playing = 0;
var score = 0;
var waiting = false;
var speed_increment = 0;
var obstacle_distance = 5;

function do_jump() {
    if (jump === 1) {
        return;
    } else {
        if (top_map[0] === ptero) {
            game_over();
        }
        if (getFirst(dino).y === 1) {
            getFirst(dino).y -= 1;
            jump = 1;
            jump_timer = setTimeout(end_jump, jump_time);
            playTune(jumpSound);
        }
    }
}

function end_jump() {
    if (getFirst(dino).y === 0) {
        getFirst(dino).y += 1;
        jump = 0;
    }
}

onInput("w", () => {
    if (playing === 0 && !waiting) {
        playing = 1;
        addText("                   ", {
            x: 0,
            y: 2,
            color: color`0`
        });
        top_map = "........";
        bot_map = "gggggggg";
        runmap = top_map + "\n" + bot_map;
        setMap(runmap);
        addSprite(0, 1, dino);
        jump = 0;
        tick();
    } else if (!waiting) {
        do_jump();
    }
});

function tick() {
    top_next = ".";
    switch (last) {
        case ground:
            var options = [ground, ground, ground, ground, ground, ground, cactus1, cactus2, ptero];
            next = options[Math.floor(Math.random() * options.length)];
            last = next;
            if (next === ptero) {
                top_next = ptero;
                next = ground;
            }
            break;
        default:
            next = ground;
            last = next;
            break;
    }
    top_map = top_map.slice(1) + top_next;
    bot_map = bot_map.slice(1) + next;
    runmap = top_map + "\n" + bot_map;
    setMap(runmap);
    if (jump === 0) {
        if (bot_map[0] !== ground) {
            game_over();
            return;
        }
        addSprite(0, 1, dino);
    } else {
        if (top_map[0] === ptero) {
            game_over();
            return;
        }
        addSprite(0, 0, dino);
    }
    if (time > min_time) {
        time -= 10;
        jump_time -= 10;
        speed_increment += 1;
        if (score % 1000 === 0) {
            obstacle_distance = Math.max(3, obstacle_distance - 1);
        }
    }
    score += const_time - time;
    addText(String(1000000 + score).slice(1), {
        x: 7,
        y: 12,
        color: color`2`
    });
    playTune(scoreSound);
    tick_timer = setTimeout(tick, time - speed_increment);
}

function game_over() {
    clearTimeout(tick_timer);
    clearTimeout(jump_timer);
    playing = 0;
    score = 0;
    time = const_time;
    jump_time = const_jump_time;
    speed_increment = 0;
    obstacle_distance = 5;
    addText("    Game Over\nPress W to restart", {
        x: 1,
        y: 2,
        color: color`2`
    });
    playTune(gameOverSound);
    waiting = true;
    setTimeout(() => { waiting = false; }, 2000);
}

addText("Press W to start", {
    x: 2,
    y: 2,
    color: color`2`
});
