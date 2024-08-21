/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Game1
@author: 
@tags: []
@addedOn: 2024-00-00
*/
setSolids([])
const player = "p"
const box = "b";
const goal = "g";
const wall = "w";

setSolids([player, box, wall]);


setLegend( [ player, bitmap`
................
................
......333.......
.....3300.......
.....3333.......
.....3333.......
......333.......
......3.3.......
................
................
................
................
................
................
................
................` ],
    
    [
        box,
        bitmap`
................
................
................
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
................
................
................
................`
    ],
    [
        goal,
        bitmap`
...6666666666...
..666666666666..
.66699999999666.
6669666666669666
6696666666666966
6966666999666696
6966699669996666
6966696666669666
6966696996666966
6966696669666966
6696699996666966
6669666666669966
6669666666699666
.66696669996666.
..666999966666..
...6666666666...`
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


let level = 0
const levels = [
  map`
..............
..............
.w.w..ww..w...
...p..ww..w...
.....ww...w...
.....wwwwwww..
.......ww....w
.w..w..w..b..w
..g..w.w..ww.w
....ww....w..w
.wwwwwwwwwww.w
.............w`, 
  map`
.............
.w.....ww....
..w...w...w..
......w...w.w
...w..w.....w
.w..w..wwww.w
....www..ww.w
...ww.ww.....
..ww....ww...
.ww.....w....
p....w....ww.
.b......w..w.
..g....ww....`,
  map`
............
............
..wwwwwwww..
..w......w..
..w......w..
..w..ww..w..
..w..wg..w..
..w..w...w..
p.w..w...w..
.bw..wwwww..
..w.........
www.........`,
  map`
p...
....
....
.b.g`,
  map`
..............
..............
..w......w....
..w..wwwwgww..
..w.www....w..
..w.w.........
..w.w.......w.
..w...........
..w.........w.
.bw..w......w.
..w...w....ww.
..w.....w.w...
.pw...........
..w...........`,
];

const currentLevel = levels[level];
setMap(currentLevel);



onInput("w", () => {
  getFirst(player).y += -1
})


onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});
setPushables({
  [ player ]: []
})
onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});
afterInput(() => {
  
})
setSolids([ player, box, wall ]);

setPushables({
    [player]: [ box ]
});
afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        level = level + 1;
        const currentLevel = levels[level];
        if (currentLevel !== undefined) setMap(currentLevel);
    }
});
afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        level = level + 1;

        const currentLevel = levels[level];

        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`3` });
        }
    }
});