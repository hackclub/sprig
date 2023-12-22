
/* 
@title: Mirror_Snake
@author: funnoodle11
@tags: ['strategy']
@img: ""
@addedOn: 2023-05-26
*/

    /*
WASD to move, the blue snake is you, the orange snake is mirrored
*/
const player1 = "p";
const wall = "w";
const background = "k";
const apple = "a";
const body1 = "b";
const eatsfx = tune`
44.776119402985074: D5-44.776119402985074 + C5-44.776119402985074 + E5-44.776119402985074,
44.776119402985074: C5-44.776119402985074 + D5-44.776119402985074 + E5-44.776119402985074,
1343.2835820895523`
const deathsfx = tune`
51.63511187607573: D4-51.63511187607573 + E4-51.63511187607573 + F4-51.63511187607573,
51.63511187607573: D4-51.63511187607573 + E4~51.63511187607573 + F4-51.63511187607573,
51.63511187607573: D4-51.63511187607573 + E4-51.63511187607573 + F4-51.63511187607573,
1497.4182444061962`
const bgsfx = tune`
176.47058823529412: E5/176.47058823529412 + C5-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: E5/176.47058823529412 + C5-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: E5/176.47058823529412 + C5-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: C5/176.47058823529412 + A4-176.47058823529412 + F4/176.47058823529412,
176.47058823529412: E5/176.47058823529412 + C5-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: G5/176.47058823529412 + E5-176.47058823529412 + C5/176.47058823529412,
176.47058823529412,
176.47058823529412: G4/176.47058823529412 + E4-176.47058823529412 + C4/176.47058823529412,
176.47058823529412,
176.47058823529412: C5/176.47058823529412 + E4/176.47058823529412 + A4-176.47058823529412 + C4-176.47058823529412 + F4/176.47058823529412,
176.47058823529412,
176.47058823529412: G4/176.47058823529412 + E4-176.47058823529412 + C4/176.47058823529412,
176.47058823529412: E4/176.47058823529412 + C4-176.47058823529412,
176.47058823529412,
176.47058823529412: A4/176.47058823529412 + F4-176.47058823529412 + D4/176.47058823529412,
176.47058823529412: B4/176.47058823529412 + G4-176.47058823529412 + E4/176.47058823529412,
176.47058823529412: A4/176.47058823529412 + F4-176.47058823529412 + D4/176.47058823529412,
176.47058823529412: G4/176.47058823529412 + E4-176.47058823529412 + C4/176.47058823529412,
176.47058823529412: E5/176.47058823529412 + C5-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: G5/176.47058823529412 + E5-176.47058823529412 + C5/176.47058823529412,
176.47058823529412: A5/176.47058823529412 + F5-176.47058823529412 + D5/176.47058823529412,
176.47058823529412,
176.47058823529412: F5/176.47058823529412 + D5-176.47058823529412 + B4/176.47058823529412,
176.47058823529412: G5/176.47058823529412 + E5-176.47058823529412 + C5/176.47058823529412,
176.47058823529412: E5/176.47058823529412 + C5-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: C5/176.47058823529412 + A4-176.47058823529412 + F4/176.47058823529412,
176.47058823529412: D5/176.47058823529412 + B4-176.47058823529412 + G4/176.47058823529412,
176.47058823529412: B4/176.47058823529412 + G4-176.47058823529412 + E4/176.47058823529412,
529.4117647058823,
176.47058823529412: E5/176.47058823529412 + G4/176.47058823529412`

const player2 = "q";
const body2 = "d";

setLegend(
    [player1, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
    [body1, bitmap`
................
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
................`],
    [player2, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
    [body2, bitmap`
................
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
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
    [background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
    [apple, bitmap`
................
................
.....CC..D......
......CCD.......
.....333333.....
....33333333....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33333333....
.....333333.....
................
................`]
);

let direction = "r";
let newdirection = "r";
let fdirection = "l";
let fnewdirection = "l";
let score = 0;

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`);
setBackground(background);

setSolids([player1, wall, body1, player2, body2]);

let snake = [[1, 1]]
let fakesnake = [[8, 8]]

function newapple() {
    let position = [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1];
    addSprite(position[0], position[1], apple);
}

function displayscore() {
    clearText();
    addText(" " + score, {
        x: 2,
        y: 1
    });
}

function DIED() {
    playTune(deathsfx)
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
            addSprite(x, y, background);
        }
    }
    clearText();
    addText("You Died.", {
        x: 6,
        y: 4
    });
    addText("Final Score: " + score, {
        x: 3,
        y: 6
    });
    addText("L to try again", {
        x: 3,
        y: 13
    });
    clearInterval(interval);
}

displayscore();

onInput("w", () => {
    if (direction != "b") {
        newdirection = "f";
        fnewdirection = "b";
    }
});
onInput("s", () => {
    if (direction != "f") {
        newdirection = "b";
        fnewdirection = "f";
    }
});

onInput("d", () => {
    if (direction != "l") {
        newdirection = "r";
        fnewdirection = "l";
    }
});
onInput("a", () => {
    if (direction != "r") {
        newdirection = "l";
        fnewdirection = "r";
    }
});

onInput("j", () => {
    clearText();
    getAll().forEach(tile => {
        clearTile(tile.x, tile.y);
    });
    score = 0;
    direction = "r";
    newdirection = "r";
    fdirection = "l";
    fnewdirection = "l";
    snake = [[1, 1]];
    fakesnake = [[8, 8]];
    newapple();
    clearInterval(interval);
    interval = setInterval(move, 300);
    displayscore();
});

newapple();

function move() {

    direction = newdirection;
    fdirection = fnewdirection;
    if (tilesWith(apple) == 0) {
        newapple();
    }

    switch (direction) {
        case "f":
            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1])
            break;
        case "b":
            snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1])
            break;
        case "r":
            snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]])
            break;
        case "l":
            snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]])
            break;
    }

    switch (fdirection) {
        case "f":
            fakesnake.push([fakesnake[fakesnake.length - 1][0], fakesnake[fakesnake.length - 1][1] - 1])
            break;
        case "b":
            fakesnake.push([fakesnake[fakesnake.length - 1][0], fakesnake[fakesnake.length - 1][1] + 1])
            break;
        case "r":
            fakesnake.push([fakesnake[fakesnake.length - 1][0] + 1, fakesnake[fakesnake.length - 1][1]])
            break;
        case "l":
            fakesnake.push([fakesnake[fakesnake.length - 1][0] - 1, fakesnake[fakesnake.length - 1][1]])
            break;
    }

    if (tilesWith(player1, apple).length != 0 || tilesWith(body1, apple).length != 0 || tilesWith(player2, apple).length != 0 || tilesWith(body2, apple).length != 0) {
        newapple();
        playTune(eatsfx)
        score += 1;
        clearTile(getFirst(apple).x, getFirst(apple).y);
        displayscore();
        clearTile(snake[0][0], snake[0][1]);
        clearTile(fakesnake[0][0], fakesnake[0][1]);
        clearInterval(interval);
        interval = setInterval(move, 300 - (score * 10));
    } else if (snake.length > 1) {
        let removed = snake.shift();
        clearTile(removed[0], removed[1]);
        let fremoved = fakesnake.shift();
        clearTile(fremoved[0], fremoved[1]);
    }

    let i = 0;
    snake.forEach(element => {
        if (i + 1 < snake.length) {
            clearTile(element[0], element[1]);
            addSprite(element[0], element[1], body1);
        } else {
            if ((element[0] < 0 || element[0] > 9) || (element[1] < 0 || element[1] > 9)) {
                DIED();
            } else {
                addSprite(element[0], element[1], player1);
            }
        }
        if (tilesWith(player1, body1).length != 0 || tilesWith(player1, body2).length != 0 || tilesWith(body1, body2).length != 0) {
            DIED();
        }
        i++;
    })
    let j = 0
    fakesnake.forEach(element => {
        if (j + 1 < fakesnake.length) {
            clearTile(element[0], element[1]);
            addSprite(element[0], element[1], body2);
        } else {
            if ((element[0] < 0 || element[0] > 9) || (element[1] < 0 || element[1] > 9)) {
                DIED();
            } else {
                addSprite(element[0], element[1], player2);
            }
        }
        if (tilesWith(player2, body2).length != 0 || tilesWith(player2, body1).length != 0 || tilesWith(body1, body2).length != 0) {
            DIED();
        }
        j++;
    })
}
let interval = setInterval(move, 300);