/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Untitled Sokoban Game
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/
// what they represent on a level bitmap
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

//sprites
setLegend(
    [
        player,
        bitmap`
................
......000.......
......000.......
.....00000......
...LLLLLLLLL....
...L1111111L....
...L1011101L....
...L1111111L....
...L1000001L....
...L1111111L....
...L1111111L....
...LLLLLLLLL....
....0.....0.....
...00.....00....
................
................`
    ],
    [
        box,
        bitmap`
................
................
................
...000000000....
...0LLL1LLL0....
...0LLL1LLL0....
...0LLL1LLL0....
...011111110....
...0LLL1LLL0....
...0LLL1LLL0....
...0LLL1LLL0....
...000000000....
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
....DDDDDDD.....
...DD44444DD....
...D4444444D....
...D4444444D....
...D4444444D....
...D4444444D....
...D4444444D....
...D4444444D....
...DD44444DD....
....DDDDDDD.....
................
................
................`
    ],
    [
        wall,
        bitmap`
0000000000000000
0LLLLLLLLLL11110
0LLLLLLLLLLLL110
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLL10
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
01LLLLLLLLLLLLL0
011LLLLLLLLLLLL0
0111LLLLLLLLLLL0
0000000000000000`
    ]
);

//levels
let level = 0

const levels = [map`
wp.www
w.bwgw
w....w
w....w
wwwwww`,
        map`
wwwwww
wp...w
w.b..w
..ww..
...g..
..ww..`,
        map`
wwwwww
w.p..w
w.bb.w
w....w
w....w
wg..gw
wwwwww`,
         map`
wwwwwww
w...gww
w.bb.ww
wgbp..w
w..gw.w
ww..www
wwwwwww`,
        map`
wwwwwww
wg...ww
wwbp.ww
wg.b.gw
ww.b.ww
ww...ww
wwwwwww`
      ];

const currentLevel = levels[level];
setMap(currentLevel);

//movement
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

//physics
setSolids([player, box, wall]);

setPushables({
  [player]: [box]
});

//Win Condition
afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) setMap(currentLevel);
    }
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