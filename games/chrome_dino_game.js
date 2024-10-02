/*
@title: Chrome Dinosaur Game
@author: @blazecoding.xyz
@tags: ['endless','retro']
@addedOn: 2024-07-27
*/

const d = "d";
const r = "r";
const c1 = "c";
const c2 = "e";
const g = "g";
const b = "b";
const p = "p";

const d1 = "h";
const r1 = "i";
const c11 = "j";
const c21 = "k";
const g1 = "l";
const b1 = "m";
const p1 = "n";

const bitmapsOriginal = [
  [d, bitmap`
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
  [r, bitmap`
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
  [c1, bitmap`
.......DD.......
......DDDD..D...
...D..DDDD.DDD..
..DDD.DDDD.DDD..
..DDD.DDDD.DDD..
..DDD.DDDD.DDD..
..DDD.DDDD.DDD..
..DDD.DDDDDDDD..
..DDD.DDDDDDDD..
..DDD.DDDDDDD...
..DDDDDDDD......
..DDDDDDDD......
...DDDDDDD......
......DDDD..000.
000000DDDD000.00
022.0.DDDD...0..`],
  [c2, bitmap`
.....D..........
....DDD.........
....DDD.D...D...
..D.DDD.D..DDD..
..D.DDD.D..DDD.D
..D.DDD.D..DDD.D
..D.DDD.D..DDD.D
..D.DDD.D..DDD.D
..D.DDDDD..DDD.D
..D.DDD....DDD.D
..D.DDD..D.DDDDD
..DDDDD..D.DDD..
....DDD..DDDDD..
000.DDD....DDD..
0.00DDD0.00DDD00
....DDD000.DDD..`],
  [g, bitmap`
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
................
0000000000000000
0...0....0...0..
...0..0.0..0..0.`],
  [b, bitmap`
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
  [p, bitmap`
................
......666.......
.....6...6......
....6.6.6.6.....
....6.....6.....
....6.....6.....
.....6...6......
......666.......
................
................
................
................
................
................
................
................`]
];

const bitmapsInverted = [
  [d1, bitmap`
................
................
................
..........22222.
.........22.2222
.........2222222
.2.......2222222
.22......22222..
.222....2222....
.2222..2222222..
..22222222222.2.
...222222222....
....2222222.....
.....22222......
.....2..2.......
.....22.22......`],
  [r1, bitmap`
......2.........
......22........
......222.......
......2222......
......22222.....
...2..222222....
..222.2222222222
.22222222222....
222222222222222.
......22222.....
................
................
................
................
................
................`],
  [c11, bitmap`
.......44.......
......4444..4...
...4..4444.444..
..444.4444.444..
..444.4444.444..
..444.4444.444..
..444.4444.444..
..444.44444444..
..444.44444444..
..444.4444444...
..44444444......
..44444444......
...4444444......
......4444..222.
2222224444222.22
222.2.4444...2..`],
  [c21, bitmap`
.....4..........
....444.........
....444.4...4...
..4.444.4..444..
..4.444.4..444.4
..4.444.4..444.4
..4.444.4..444.4
..4.444.4..444.4
..4.44444..444.4
..4.444....444.4
..4.444..4.44444
..44444..4.444..
....444..44444..
222.444....444..
2.22444.22244422
....444222.444..`],
  [g1, bitmap`
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
................
................
2222222222222222
2...2....2...2..
...2..2.2..2..2.`],
  [b1, bitmap`
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
  [p1, bitmap`
................
......666.......
.....6...6......
....6.6.6.6.....
....6.....6.....
....6.....6.....
.....6...6......
......666.......
................
................
................
................
................
................
................
................`]
  
];

setLegend(
  [d, bitmapsOriginal[0][1]],
  [r, bitmapsOriginal[1][1]],
  [c1, bitmapsOriginal[2][1]],
  [c2, bitmapsOriginal[3][1]],
  [g, bitmapsOriginal[4][1]],
  [b, bitmapsOriginal[5][1]],
  [p, bitmapsOriginal[6][1]]
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

const powerUpSound = tune`
300: c5^500, d5^500, e5^500, f5^500`;

let runmap = map`
........
........
dggggggg`;

setMap(runmap);

let const_time = 250;
let time = const_time;
let const_jump_time = 425;
let jump_time = 425;
let min_time = 200;
let jump = 0;
let top_map = "........";
let bot_map = "gggggggg";
let top_next = ".";
let next = ".";
let last = g;
let tick_timer;
let jump_timer;
let playing = 0;
let score = 0;
let num = 0;
let waiting = false;
let speed_increment = 2;
let obstacle_distance = 10;
let currentScheme = 0;
let invincible = false;
let invincible_timer;
let invincible_duration = 5000;

function switchColors() {
    console.log("Switching colors");
    if (currentScheme === 0) {
        setLegend(
            [d, bitmapsInverted[0][1]],
            [r, bitmapsInverted[1][1]],
            [c1, bitmapsInverted[2][1]],
            [c2, bitmapsInverted[3][1]],
            [g, bitmapsInverted[4][1]],
            [b, bitmapsInverted[5][1]],
            [p, bitmapsInverted[6][1]]
          
        );
        currentScheme = 1;
    } else {
        setLegend(
            [d, bitmapsOriginal[0][1]],
            [r, bitmapsOriginal[1][1]],
            [c1, bitmapsOriginal[2][1]],
            [c2, bitmapsOriginal[3][1]],
            [g, bitmapsOriginal[4][1]],
            [b, bitmapsOriginal[5][1]],
            [p, bitmapsOriginal[6][1]]

        );
        currentScheme = 0;
    }
}

function do_jump() {
    if (jump === 1) return;
    else {
        let dSprite = getFirst(d);
        if (dSprite === undefined) return;
        if (top_map[0] === r && !invincible) game_over();
        if (dSprite.y === 1) {
            dSprite.y -= 1;
            jump = 1;
            jump_timer = setTimeout(end_jump, jump_time);
            playTune(jumpSound);
        }
    }
}

function end_jump() {
    let dSprite = getFirst(d);
    if (dSprite === undefined) return;
    if (dSprite.y === 0) {
        dSprite.y += 1;
        jump = 0;
    }
}

function generateMapWithPowerUps() {
    let mapTop = top_map;
    let mapBottom = bot_map;
  
    for (let i = 0; i < mapBottom.length; i++) {
        if ((mapBottom[i] === c1 || mapBottom[i] === c2) && (i % 5 == 0)) mapTop = mapTop.slice(0, i) + p + mapTop.slice(i + 1);  
    }

    return {
        top: mapTop,
        bottom: mapBottom
    };
}

function tick() {
    top_next = ".";
    switch (last) {
        case g:
            let options = [g, g, g, g, g, g, g, c1, c2, r];
            next = options[Math.floor(Math.random() * options.length)];
            last = next;
            if (next === r) {
                top_next = r;
                next = g;
            }
            break;
        default:
            next = g;
            last = next;
            break;
    }
    top_map = top_map.slice(1) + top_next;
    bot_map = bot_map.slice(1) + next;
    
    let powerUpChance = Math.random();
    if (powerUpChance < 0.01) {
        let powerUpIndex = Math.floor(Math.random() * top_map.length);
        top_map = top_map.slice(0, powerUpIndex) + p + top_map.slice(powerUpIndex + 1);
    }

    runmap = `${top_map} \n ${bot_map}`;
    setMap(runmap);

    if (jump === 0) {
        if (top_map[0] === p) collectPowerUp();
        if (bot_map[0] !== g && bot_map[0] !== p && !invincible) return game_over();
        addSprite(0, 1, d); 
    } else {
        if (top_map[0] === r && !invincible) return game_over();
        if (top_map[0] === p) collectPowerUp();
        addSprite(0, 0, d); 
    }

    if (time > min_time) {
        speed_increment++;
        if (speed_increment > obstacle_distance) {
            time = time - 10;
            speed_increment = 0;
        }
    }
    score++;
    if (score % 150 === 0) playTune(scoreSound);
    if (score % 25 === 0) switchColors();
    
    let scoreColor = invincible ? color`6` : color`2`;
    addText("    Score: " + score.toString(), {
        x: 2,
        y: 4,
        color: scoreColor
    });
    tick_timer = setTimeout(tick, time);
}

function collectPowerUp() {
    playTune(powerUpSound);
    invincible = true;
    clearTimeout(invincible_timer);
    invincible_timer = setTimeout(endInvincibility, invincible_duration);
}

function endInvincibility() {
    invincible = false;
}

function game_over() {
    playing = 0;
    clearTimeout(tick_timer);
    clearTimeout(invincible_timer);
    addText("Press W to restart", {
        x: 1,
        y: 4,
        color: color`2`
    });
    addText("    Score: " + score.toString(), {
        x: 2,
        y: 2,
        color: color`2`
    });
    score = 0;
    playTune(gameOverSound);
}

onInput("w", () => {
    if (playing === 0 && !waiting) {
        playing = 1;
        top_map = "........";
        bot_map = "gggggggg";
        runmap = `${top_map} \n ${bot_map}`;
        setMap(runmap);
        addSprite(0, 1, d);
        jump = 0;
        invincible = false;
        clearTimeout(invincible_timer);
        tick();
        clearText();
    } else if (!waiting) do_jump();
});

addText("Press W to start", {
    x: 2,
    y: 2,
    color: color`2`
});

setBackground("b");
