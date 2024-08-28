/*
@title: Brick Blaster
@author: MohammedMMc
@tags: ["brick", "blaster", "brick-blaster"]
@addedOn: 2024-08-28
*/

const playerLowTime = "l";
const player = "p";
const power = "m";
const ball = "b";
const brick = "k";
const bg = "g";

const tune_ball_smash = tune`
37.5: G4^37.5 + E4^37.5 + F4-37.5 + D4-37.5 + A4-37.5,
37.5: G4-37.5 + E4-37.5 + F4^37.5,
1125`;
const tune_brick_break = tune`
37.5: F4^37.5 + C4^37.5 + D4^37.5 + G4^37.5 + E4^37.5,
37.5: F4-37.5 + E4-37.5 + D4-37.5 + G4~37.5 + C4~37.5,
37.5: F4~37.5 + E4-37.5 + D4~37.5,
37.5: E4~37.5 + F4/37.5 + D4/37.5,
37.5: E4-37.5,
1012.5`;
const tune_won_game = tune`
172.41379310344828: A4^172.41379310344828 + G4^172.41379310344828 + F4^172.41379310344828 + E4^172.41379310344828 + D4/172.41379310344828,
172.41379310344828: E5-172.41379310344828 + F5~172.41379310344828 + G5-172.41379310344828,
172.41379310344828: F5-172.41379310344828 + D5-172.41379310344828 + E5~172.41379310344828,
172.41379310344828: G4-172.41379310344828 + A4-172.41379310344828 + F4^172.41379310344828 + E4^172.41379310344828 + A5/172.41379310344828,
172.41379310344828: E4^172.41379310344828 + D4^172.41379310344828 + F4-172.41379310344828 + G4-172.41379310344828 + G5/172.41379310344828,
172.41379310344828: B4/172.41379310344828 + A4/172.41379310344828 + C5-172.41379310344828,
172.41379310344828: G4/172.41379310344828 + C5-172.41379310344828 + B4-172.41379310344828,
172.41379310344828,
172.41379310344828: E4/172.41379310344828 + D4/172.41379310344828 + A4-172.41379310344828 + G4-172.41379310344828,
172.41379310344828,
172.41379310344828: C4/172.41379310344828 + E4-172.41379310344828 + D4-172.41379310344828 + G5/172.41379310344828,
172.41379310344828: D4-172.41379310344828 + E5^172.41379310344828,
172.41379310344828: C4-172.41379310344828 + D4^172.41379310344828 + A5/172.41379310344828 + G5-172.41379310344828,
3275.862068965517`;
const tune_won_level = tune`
168.53932584269663: D5-168.53932584269663 + C5-168.53932584269663 + A5-168.53932584269663 + G5~168.53932584269663 + A4~168.53932584269663,
168.53932584269663: G5-168.53932584269663 + F4-168.53932584269663 + E4-168.53932584269663 + F5~168.53932584269663 + D4~168.53932584269663,
168.53932584269663: E5-168.53932584269663 + D5~168.53932584269663 + C5~168.53932584269663 + G5/168.53932584269663,
168.53932584269663: D5-168.53932584269663 + C5-168.53932584269663 + A4~168.53932584269663 + E5/168.53932584269663 + B4^168.53932584269663,
168.53932584269663: G5-168.53932584269663 + F5~168.53932584269663 + G4-168.53932584269663,
168.53932584269663: E4-168.53932584269663 + D4~168.53932584269663 + D5/168.53932584269663 + A4/168.53932584269663,
168.53932584269663: C4-168.53932584269663 + F4/168.53932584269663,
168.53932584269663: C4-168.53932584269663 + D4/168.53932584269663,
168.53932584269663: C4/168.53932584269663 + D4^168.53932584269663,
3876.404494382022`;
const tune_lost_game = tune`
256.4102564102564: B4^256.4102564102564 + E4~256.4102564102564 + A4^256.4102564102564 + G5/256.4102564102564,
256.4102564102564: E4~256.4102564102564 + G4^256.4102564102564 + A4^256.4102564102564 + C5/256.4102564102564,
256.4102564102564: B4^256.4102564102564 + A4^256.4102564102564 + C4~256.4102564102564 + G5/256.4102564102564,
256.4102564102564: G4^256.4102564102564 + F4^256.4102564102564 + E4~256.4102564102564 + C5/256.4102564102564,
256.4102564102564,
256.4102564102564: E4^256.4102564102564 + D4~256.4102564102564 + G4/256.4102564102564,
256.4102564102564: E4^256.4102564102564 + D4~256.4102564102564 + F4/256.4102564102564,
6410.25641025641`;
const tune_power_up = tune`
90.6344410876133: D5/90.6344410876133 + E5/90.6344410876133 + F5/90.6344410876133 + G5/90.6344410876133 + C5-90.6344410876133,
90.6344410876133: F5/90.6344410876133 + G5/90.6344410876133 + E5-90.6344410876133,
90.6344410876133: G5/90.6344410876133 + A5/90.6344410876133 + F5-90.6344410876133,
90.6344410876133: A5/90.6344410876133 + G5-90.6344410876133,
2537.7643504531725`;


let time_start_power = 0;
let time_start = performance.now();
let time_rest = 0;
let gameEnded = false;
let newLevel = false;
let score = 0;
let ball_velocity_x = Math.random() < 0.5 ? -1 : 1;
let ball_velocity_y = Math.random() < 0.5 ? -1 : 1;


setLegend(
    [player, bitmap`
4444444444444444
4444444444444444
4444444D44444D44
4DD444DD444DDD4D
DDDDDDDDDDDDDDDD
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
................` ],
    [playerLowTime, bitmap`
3333333333333333
3333333333333333
3333333C33333C33
3CC333CC333CCC3C
CCCCCCCCCCCCCCCC
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
................` ],
    [power, bitmap`
9............9..
.9..77777777...9
...7777777777.9.
..777777777777..
.74444444444447.
.74DD44DDD44D47.
.7DDDDDDDDDDDD7.
.7777778H777777.
.777788888H7777.
.7778H78H78H777.
.778H778H778H75.
.7777778H777755.
..777778H77755..
9..77778H7755...
..9.77777555...9
9............9..` ],
    [ball, bitmap`
................
................
................
.....111111.....
....12222221....
...1222222221...
...1222222221...
...122222222L...
...122222222L...
...122222222L...
...1222222220...
....12222220....
.....1LL000.....
................
................
................` ],
    [brick, bitmap`
................
................
................
................
3233323332333233
3233323332333233
2222222222222222
3332333233323332
3332333233323332
3332333233323332
2222222222222222
3233323332333233
................
................
................
................` ],
    [bg, bitmap`
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
0000000000000000` ],
);

setSolids([player, playerLowTime, ball]);
setBackground(bg);

let level = 0;
const levels = [
    map`
..............
.kk.kk.kk.kk..
..............
..kk.kk.kk.kk.
..............
.kk.kk.kk.kk..
..............
......b.......
..............
..............
..............
..............
......pp......`,
    map`
..............
.kkkkkkkkkkkk.
..kkkkkkkkkk..
...kkkkkkkk...
....kkkkkk....
.....kkkk.....
......kk......
......b.......
..............
..............
..............
..............
......pp......`,
    map`
......m.......
kkkkkk..kkkkkk
kkkkk..kkkkkkk
kkkkkk..kkkkkk
kkkkkkk..kkkkk
kkkkkkkk..kkkk
kkkkkkkkk..kkk
......b.......
..............
..............
..............
..............
......pp......`,
    map`
......m.......
..............
.k...k..kkkkk.
.k...k....k...
.k...k....k...
.k...k....k...
.kkkkk....k...
.k...kb...k...
.k...k....k...
.k...k....k...
.k...k..kkkkk.
..............
......pp......`,
];

setMap(levels[level]);

//setPushables({
//    [player]: []
//});

onInput("a", () => {
    if (!gameEnded) {
        getAll(player).forEach(p => p.x -= (time_start_power === 0 ? 2 : 4));
        getAll(playerLowTime).forEach(p => p.x -= (time_start_power === 0 ? 2 : 4));
    };
});
onInput("d", () => {
    if (!gameEnded) {
        getAll(player).forEach(p => p.x += (time_start_power === 0 ? 2 : 4));
        getAll(playerLowTime).forEach(p => p.x += (time_start_power === 0 ? 2 : 4));
    }
});
onInput("k", () => {
    if (newLevel && gameEnded) {
        time_start += (performance.now() - time_rest);
        setMap(levels[level]);
        newLevel = false;
        gameEnded = false;
    }
});


afterInput(() => {

});


// For the powers

function givePower() {
    time_start_power = performance.now();
    playTune(tune_power_up, 1);

    const all_players = getAll(player);
    const first_player = all_players[0];
    const last_player = all_players[all_players.length - 1];

    if (all_players.length <= 2) {
        addSprite(first_player.x - 1, first_player.y, player);
        addSprite(last_player.x + 1, first_player.y, player);
    }
}

setInterval(function () {
    if (gameEnded) return;
    // Move the power down
    getAll(power).map(m => {
        const last_power_y_axis = m.y;
        m.y++;
        if (m.y === last_power_y_axis) m.remove();
    });
}, 280);

setInterval(function () {
    if (gameEnded) return;
    const time_power_have = time_start_power !== 0 ? ((performance.now() - time_start_power) / 1000) % 60 : null;

    if (time_power_have && time_power_have >= 10) {
        // Remove the power
        const all_players_low_time = getAll(playerLowTime);
        if (all_players_low_time) {
            all_players_low_time.forEach(p => p.remove());
        }
        time_start_power = 0;
    } else if (time_power_have && time_power_have >= 7) {
        // Change Player Style
        const all_players = getAll(player);
        if (all_players.length > 2) {
            const first_player = all_players[all_players.map(p => p.x).indexOf(Math.min(...all_players.map(p => p.x)))];
            const last_player = all_players[all_players.map(p => p.x).indexOf(Math.max(...all_players.map(p => p.x)))];

            first_player.remove();
            last_player.remove();
            addSprite(first_player.x, first_player.y, playerLowTime);
            addSprite(last_player.x, first_player.y, playerLowTime);
        }
    } else if (time_power_have) {
        // normal style
        const all_players_low_time = getAll(playerLowTime);
        if (all_players_low_time.length > 0) {
            all_players_low_time.forEach(p => {
                p.remove();
                addSprite(p.x, p.y, player);
            });
        }
    }

    // Check for claiming the power
    tilesWith(player).forEach(tile => {
        const powerSprite = tile.find(sprite => sprite.type === power);
        if (powerSprite) {
            powerSprite.remove();
            givePower();
        }
    });
}, 10);


// Game Loop
const gameLoop = setInterval(function () {
    if (gameEnded) return;
    let gameball = getFirst(ball);

    // Store the pall position
    let last_x_axis = gameball.x;
    let last_y_axis = gameball.y;

    // Move the ball
    gameball.x += ball_velocity_x;
    gameball.y += ball_velocity_y;

    const isLost = gameball.y >= height() - 1;
    if (isLost) {
        clearInterval(gameLoop);
        gameEnded = true;

        addText("YOU LOST!", { x: 6, y: 11, color: color`3` });
        playTune(tune_lost_game, 1);
        return;
    }

    // Check the new position and change directions
    if (last_x_axis === gameball.x) ball_velocity_x *= -1;
    if (last_y_axis === gameball.y) ball_velocity_y *= -1;

    const touchedBrick = tilesWith(ball)[0] ? tilesWith(ball)[0].find(sprite => sprite.type === brick) : null;
    if (touchedBrick) {
        if (level === 0) ['+1', '-1'].forEach(offset => {
            let block = getTile(touchedBrick.x + parseInt(offset), touchedBrick.y);
            if (block.length > 0 && block[0].type === brick) block[0].remove();
        });

        touchedBrick.remove();
        if (Math.floor(Math.random() * 10) + 1 === 5) {
            // OMG ur lucky you got number 5 its a 10% chance ! :D
            addSprite(touchedBrick.x, touchedBrick.y, power);
        }

        score++;

        ball_velocity_x *= 1;
        ball_velocity_y *= -1;
        playTune(tune_brick_break, 1);
    }

    if (last_x_axis === gameball.x || last_y_axis === gameball.y) {
        playTune(tune_ball_smash, 1);
    }

    clearText();
    addText(String(score), { x: 0, y: 0, color: color`7` });

    let time_diff = (performance.now() - time_start) / 1000;
    let time_minutes = Math.floor(time_diff / 60);
    let time_seconds = Math.floor(time_diff % 60);
    let time_string = time_minutes > 0 ? `${time_minutes}m ${time_seconds}s` : `${time_seconds}s`;
    addText(time_string, { x: 10 - Math.floor(time_string.length / 2), y: 0, color: color`9` });

    addText(String(level + 1), { x: 19, y: 0, color: color`5` });

    if (getAll(brick).length === 0) {
        level++;
        gameEnded = true;
        if (levels[level]) {
            playTune(tune_won_level, 1);
            addText(`lvl.${level} completed!`, { x: 2, y: 10, color: color`4` });
            addText("Next level click K", { x: 1, y: 11, color: color`8` });
            newLevel = true;
            time_rest = performance.now();
        } else {
            addText(`YOU WON!`, { x: 6, y: 10, color: color`4` });
            playTune(tune_won_game, 1);
            clearInterval(gameLoop);
        }
    }

}, 200);


