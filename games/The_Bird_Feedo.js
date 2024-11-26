/*
@title: The Bird Feedo
@author: Arpan Pandey
@tags: ['endless']
@addedOn: 2023-01-09
*/
const bird = "b";
const cookie = "c";

let gameRunning = true;
let myTime = 0;

setLegend(
    [bird, bitmap`
................
................
................
................
.......00000....
.....00022200...
.0..002220220...
..0022222222999.
.0.0222222229999
...02222222000..
...000000000....
.....0..0.......
....0..0........
................
................
................`],
    [cookie, bitmap`
................
................
................
....CCCC.CCC....
...CC3C..CCCC...
..CCCCCCCCCCCC..
..CCCCCCCCC3CC..
..CC3CCC3CCCCC..
..CCCCCCCCC3CC..
..CCCCCCCCCCCC..
..CCCC3CC3CCCC..
..CCCCCCCCCCCC..
...CC3CCCCCCC...
....CCCCCCCC....
................
................`]
);

setSolids([]);

let level = 0;
const levels = [
    map`
......
b.....
...c..
c....c
......`,
];

setMap(levels[level]);

setPushables({
    [bird]: [],
});

onInput("s", () => {
    if (gameRunning) {
        getFirst(bird).y += 1
    }
});

onInput("w", () => {
    if (gameRunning) {
        getFirst(bird).y -= 1
    }
});

onInput("a", () => {
    if (gameRunning) {
        getFirst(bird).x -= 1
    }
});

onInput("d", () => {
    if (gameRunning) {
        getFirst(bird).x += 1
    }
});

afterInput(() => {

});

function moveBird() {
    if (getFirst(bird).x != 5) {
        getFirst(bird).x += 1
    } else {
        getFirst(bird).remove()
        addSprite(0, 1, bird);
    }
}

function checkHit() {
    let cookies = getAll(cookie);
    let birdS = getFirst(bird);

    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].x == birdS.x && cookies[i].y == birdS.y) {
            return true;
        }
    }
    return false;
}

function randomcookieiser() {
    let birdS = getFirst(bird);
    let cookies = getAll(cookie);

    for (let i = 0; i < cookies.length; i++) {
        let x = Math.floor(Math.random() * 5);
        let y = Math.floor(Math.random() * 5);
        if (birdS.x != x && birdS.y != y) {
            cookies[i].x = x;
            cookies[i].y = y;
        }
    }
}

function showEnd() {
    getFirst(bird).remove();
    let cookies = getAll(cookie);
    for (let i = 0; i < cookies.length; i++) {
        cookies[i].remove();
    }
    addText("The Bird Feedo", {
        x: 3,
        y: 2,
        color: color`5`
    });
    addText(`Your time: ${myTime}s`, {
        x: 3,
        y: 5,
        color: color`7`
    });
    addText("Game Over!", {
        x: 3,
        y: 6,
        color: color`3`
    });

    addSprite(2, 3, bird);
    addSprite(3, 3, cookie);
}

var gameLoop = setInterval(() => {
    if (checkHit()) {
        clearInterval(gameLoop);
        gameRunning = false;
        showEnd();
    } else {
        myTime += 1;
        moveBird();
        randomcookieiser();
    }

}, 1000);
