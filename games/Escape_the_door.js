/*
@title: Escape_the_door
@author: vasanth
*/
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
.......000......
......00300.....
......03330.....
......03330.....
......00300.....
.......030......
......00300.....
.....0033300....
.....0333330....
.....0333330....
.....0000000....
................
................
................`
    ],
    [
        box,
        bitmap`
................
................
................
....555555555...
....566444LL5...
....566444LL5...
....566444LL5...
....599CCCHH5...
....599CCCHH5...
....599CCCHH5...
....555555555...
................
................
................
................
................`
    ],
    [
        goal,
        bitmap`
................
................
.00000000000000.
.07333333333370.
.07777777777770.
.037........730.
.037........730.
.037........730.
.037........730.
.037........730.
.037........730.
.03777777777730.
.07733333333770.
.00000000000000.
................
................`
    ],
    [
        wall,
        bitmap`
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
0000000000000000`
    ]
);

let level = 0;
const levels = [
    map`
..ww.
p.w.g
.b...
.....`,
    map`
p.w.
.bwg
....
..bg`,
   map`
.b......g
.b...wwww
..gb.wg..
pww..w..g
bwg..w...
.wwwww.b.
..b....b.
g.b...g..`
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

onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});

setSolids([player, box, wall]);

setPushables({
    [player]: [box]
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
            addText("you win!", { y: 4, color: color`3` });
        }
    }
});