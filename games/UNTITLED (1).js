const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
setLegend(
    [
        player,
        bitmap`
................
................
................
................
...0000000......
...0000000......
...0200200......
...00200000000..
...00000000000..
...02222000000..
...00000000000..
...00..00.0.00..
...00..00.0.00..
................
................
................`
    ],
    [
        box,
        bitmap`
................
................
.......66.......
......6666......
.....666666.....
....66666666....
...6666666666...
...6222662226...
...6222662226...
...6222662226...
...6666666666...
...6222662226...
...6222662226...
...6666666666...
................
................`
    ],
    [
        goal,
        bitmap`
................
................
................
.....55555......
....5..5..5.....
...5...5...5....
..5....5....5...
..5....5....5...
..55555555555...
..5....5....5...
...5...5...5....
....5..5..5.....
.....55555......
................
................
................`
    ],
    [
        wall,
        bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
    ]
);

let level = 0;

const levels = [
    map`
...g.
..w.w
..www
p.w..
..w..
..www
.....
.bw.w
....w`,
    map`
.....www
..w....w
w.www...
w.p...ww
w..bwg..
www.....
....bg..`,
   map`
...wwwwg.....g
...wp.w...w...
..g..bw.www...
..ww...b......
.ww.......b...
..............`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});

setSolids([player, box]);

setPushables({
    [player]: [box]
});




onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});
afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win Match!", { y: 4, color: color`4` });
        }
    }
});




















