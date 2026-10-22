/*
@title: Battery Blitz
@description: Maze runner with a twist
@author: cybdo
@tags: ["puzzle"]
@addedOn: 2025-08-17

INSTRUCTIONS:
use WASD to move.
Batteries grant energy, stars grant energy and points.
Hazards can be moved, however they require extra energy to do so
doors move to the next level, however they take energy to unlock, using K.
If you have soft-locked yourself, or you run out of energy, J will reload the level.
*/


const player = "p";
const battery = "b";
const wall = "w";
const gray = "g";
const door = "d";
const hazard = "h";
const star = "s";

setLegend(
    [player, bitmap`
................
................
.....5555555....
....555555555...
...55575557555..
...55575557555..
...55555555555..
...55555555555..
...57555555575..
...57755555775..
...55777777755..
....555555555...
.....5555555....
................
................
................`],
    [battery, bitmap`
................
.......1L.......
.....666666.....
.....666666.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
................
................`],
    [wall, bitmap`
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
    [gray, bitmap`
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
1111111111111111`],
    [hazard, bitmap`
................
................
................
...0000000000...
...0666666660...
...0666006660...
...0666006660...
...0666006660...
...0666006660...
...0666666660...
...0666006660...
...0666666660...
...0000000000...
................
................
................`],
    [star, bitmap`
................
................
.......66.......
......6666......
......6666......
...6666666666...
...6666666666...
....66666666....
.....666666.....
......6666......
.....666666.....
....66666666....
...6666..6666...
...666....666...
................
................`],
    [door, bitmap`
................
....00000000....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222100....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....00000000....
................
................`]
);

setBackground(gray);
setSolids([player, wall, door, hazard]);
setPushables({
    [player]: [hazard]
});

let energy = 0; // seconds
let score = 0;
let currentScore = 0;
let gameOver = false;
let gameWon = false;

let timer = 0;
let timerInterval = null;


/*****************************Make your own levels here:********************************/
const levels = [
    map`
wwwwwwwwww
wp..b....w
wwwwwwwwbw
w....s...w
wbwwwwwwww
w....b..dw
wwwwwwwwww`,
    map`
wwwwwwwwww
ww...b..sw
wb.wwwwbww
w.wbph...w
wh.wwwwwww
w..b...bdw
wwwwwwwwww`,
    map`
wwwwwwwwww
wd.b.....w
w......b.w
w..b.....w
wh.......w
wp....s..w
wwwwwwwwww`,
    map`
wwwwwwwwww
wb..b...dw
w.wwwwww.w
wp..b..hdw
w.wwwwww.w
wb..s...dw
wwwwwwwwww`,
    map`
wwwwwwwwww
wwwwww.www
wpwwww.b.w
w.....hwdw
wwwww..www
wwwwwwwwww
wwwwwwwwww`,
    map`
wwwwwwwwwwwwwwwwwwww
w...b...b...b...b..w
wsw.wwwwwwwwwwww.w.w
w.w.ws...b...b...wbw
w.wbw.wwwwww.wwwbw.w
wbw.w.w..b..hw...w.w
w.w.wbw.wwwwbw.wwwbw
w.w.w.w.wp.w.w.b.w.w
w.wbw.wbw.bw.www.w.w
wbw.w.w.ww...b.w.wbw
w.w.wbw..wwwww.wbw.w
w.w.w.ww.w...b.w.w.w
w.wbw..wbwwwwwww.wbw
wbw.wwbw...b..b..w.w
w..hb..wwwwwwwwwww.w
wwwwwwwwwwwwwwwwwwdw`,
    map`
wwwwwwwwwwwwwwwwwwww
db...b..b...b...b.ww
wwwwwwwwwwww.wwww.ww
w...b.w..bw.h.wsw.ww
wbwww.w.w.w.www.wbww
w.w.w.wbw.w.b.b.w.ww
w.w.w.w.wbwbwwwww.ww
w.wbwb..w...w.b..b.w
wbw.wwwwwwwww.wwww.w
w.w.wb..b..b...w.w.w
w.w.w.w.wwwwwwbw.wbw
w..bw.wbwwwb...wbw.w
w.w.wbw..b..wwww...w
www.w.wwwww..www.www
wp..b...b..b...b...w
wwwwwwwwwwwwwwwwwwww`,
    map`
wwwwwwwwwwwwwwwwwwww
wpwwwwwwwwwwwwwww..d
w.w...b...b...b.w.ww
w.ww.wwwwwwwwww.wbww
wbwsb...b...b.w.w.ww
w.wwwwwwwwwww.wbw.ww
w...b...b...w.w.w.ww
w.wwwwwwwwwbwbw.wbww
wbws..b..b..w.w.w.ww
w.wwwwwwwwwww.wbw.ww
w...b...b...b.w.w.ww
wbwwwwwwwwwwwww.wbww
w.ws..b...b...b.w.ww
w.ww.wwwwwwwwwwww.ww
wb..b...b...b...b.ww
wwwwwwwwwwwwwwwwwwww`
];
const levelEnergy = [
    5,
    3,
    4,
    4,
    13,
    5,
  5,
  5,

]
/****************************************************************************************/

let level = 0;

function resetGame() {
    level = 0;
    gameWon = false;
    gameOver = false;
    energy = 0;
    score = 0;
    currentScore = 0;
    winScreen = false;
    loadLevel(false);

}


function loadLevel(manual) {
    if (gameWon) {
        resetGame()
    }
    if (level < levels.length) {
        if (!manual) {
            score = currentScore + energy;
        }
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timer++;
        }, 1000);
        currentScore = score;
        energy = levelEnergy[level];
        setMap(levels[level]);
        gameOver = 0;
    } else {
        gameWon = true;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        setMap(map`
gggggg
gggggg
gggggg
gggggg`);
    }
}

loadLevel(false);

addText(`Energy: ${energy}`, {
    x: 0,
    y: 0,
    color: color`5`
});
addText(`Score : ${currentScore}`, {
    x: 0,
    y: 1,
    color: color`6`
});

// Input controls
onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));
onInput("j", () => loadLevel(true));
onInput("k", () => interact());

function interact() {
    let me = getFirst(player);
    let adjacent = [{
            x: me.x + 1,
            y: me.y
        },
        {
            x: me.x - 1,
            y: me.y
        },
        {
            x: me.x,
            y: me.y + 1
        },
        {
            x: me.x,
            y: me.y - 1
        }
    ];

    for (let spot of adjacent) {
        let tile = getTile(spot.x, spot.y);
        tile.forEach(obj => {
            if (obj.type === door && energy >= 5) {
                energy -= 5;
                clearTile(spot.x, spot.y);
                currentScore += 10;
                score = currentScore + score;
                level += 1;
                loadLevel(false);

            }
        });
    }


}

function move(dx, dy) {
    if (!gameOver && !gameWon) {
        let me = getFirst(player);
        const nx = me.x + dx;
        const ny = me.y + dy;
        const target = getTile(nx, ny);
        if (!target.some(s => [wall, door].includes(s.type))) {
            me.x = nx;
            me.y = ny;
            energy -= 1;
            // battery pickup
            getTile(nx, ny).forEach(s => {
                if (s.type === battery) {
                    energy += 5;
                    s.remove();
                }
                if (getTile(nx + dx, ny + dy) === hazard) {
                    energy -= 1;
                }
                if (s.type === star) {
                    energy += 5;
                    currentScore += 3
                    s.remove();
                }
            });
        }
    }
}

let winScreen = false;
// Run after each action
afterInput(() => {
    clearText();

    if (gameWon && !winScreen) {

        addText("You Win!", {
            x: 3,
            y: 5,
            color: color`5`
        });
        addText(`Score : ${score}`, {
            x: 3,
            y: 7,
            color: color`6`
        });
        addText(`Time: ${timer}`, {
            x: 3,
            y: 9,
            color: color`6`
        });
        addText("Make your own!", {
            x: 3,
            y: 11,
            color: color`6`
        });
        addText("J to reset", {
            x: 3,
            y: 13,
            color: color`6`
        });
        winScreen = true;
    } else if (energy <= 0) {
        clearText();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        setMap(map`
gggg
gggg
gggg`);
        addText("GAME OVER", {
            x: 3,
            y: 5,
            color: color`3`
        });
        addText(`Energy: ${energy}`, {
            x: 3,
            y: 7,
            color: color`5`
        });
        addText(`Score : ${score}`, {
            x: 3,
            y: 9,
            color: color`6`
        });
        addText("Press J to try again", {
            x: 0,
            y: 11,
            color: color`3`
        });
        gameOver = true;

    } else {
        addText(`Energy: ${energy}`, {
            x: 0,
            y: 0,
            color: color`5`
        });
        addText(`Score : ${currentScore}`, {
            x: 0,
            y: 1,
            color: color`6`
        });
    }
});
