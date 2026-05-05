/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: What the Seagull!?
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
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
................
....2222........
....2222........
....202222222...
..992222111222..
....22222211122.
....22222211112.
....22221122222.
.....222222222..
.......9229222..
.......9..9.....
......99.99.....
................
................`
    ],
    [
        box,
        bitmap`
................
................
................
................
................
................
................
..66666666666...
..66666666666...
..66666666666...
................
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
................
................
................
................
................
....CCCCCCCC....
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
....CCCCCCCC....
................
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
p.w.
.bwg
....
....`,
    map`
p.w.
.bwg
....
..bg`
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