/*
@title: Ninja_boy
@author: P. Ganesh
*/

const player = "p";
const coin = "c";
const door = "d";
const wall = "w";

setLegend(
    [
        player,
        bitmap`
................
......0.........
......000.......
......00000.....
......16661.....
......60606.....
......66666.....
......66066.....
.......FFF......
......0C1C0.....
.....0011100....
.....00CCC00....
.....30CCC03....
.......111......
.......1.1......
......33.33.....`

    ],
    [
        coin,
        bitmap`
................
................
................
................
................
......666.......
.....66666......
....6663666.....
....6636366.....
....6663666.....
.....66666......
......666.......
................
................
................
................`
      
    ],
    [
        door,
        bitmap`
................
....333333333...
....333333333...
....333333333...
....333333333...
....333333333...
....366333333...
....333333333...
....333333333...
....333333333...
....333333333...
....333333333...
....333333333...
................
................
................`
    ],
    [
        wall,
        bitmap`
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6
6H6H6H6H6H6H6H6H
H6H6H6H6H6H6H6H6`
    ]);
let level = 0;
const levels = [
    map`
p.wd
.cw.
....
....`,
    map`
p.wdw
.w..d
.c.c.
.....`,
    map`
p.wd
.cw.
....
..cd`,
    map`
p.....d
.wwcw.d
.c.....
.....w.
.c...c.
dw...dw`,
    map`
.....dw.
.wwww...
dwp.w...
.w.cww..
....c...
........`,
    map`
.wd.........d.w
pw..w.....wc..w
.wwwwww..w....d
........w....cw
.c.w..w....w...
..w..w....w.w.w
.c..w......w..w
...............
d..w...w.......`

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

setSolids([player, coin, wall]);

setPushables({
    [player]: [coin]
});

afterInput(() => {
    const numberCovered = tilesWith(door, coin).length;
    const targetNumber = tilesWith(door).length;

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




