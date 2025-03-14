
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p"
    const wall = "w";
    const goal = "g";

setLegend(
	[ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
    [ wall, bitmap`
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
    [ goal, bitmap`
................
................
.....DDDDDD.....
...DDDDDDDDDD...
...DD444444DD...
..DD44444444DD..
..DD46666664DD..
..DD46999964DD..
..DD46933964DD..
..DD46666664DD..
..DD44444444DD..
...DD444444DD...
...DDDDDDDDDD...
.....DDDDDD.....
................
................`]
);

setSolids([ player, wall ]); // sprites cannot go inside of these blocks

let level = 0
const levels = [
	map`
pw.....w.
...w.www.
.w.w.....
.w.wwwww.
.w.....w.
.www.w.w.
..ww.w.w.
w.ww.w.w.
w.ww.w.wg`
]

setMap(levels[level])

setPushables({
	[ player ]: []
})

onInput("w", () => {
    getFirst(player).y -= 1; // negative y is upwards
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
    getFirst(player).x += 1;
});
onInput("j", () => {
    setMap(levels[level])
});
// these get run after every input
afterInput(() => {
    const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { y: 4, color: color`H` });
        }
    }
});
// these get run after every input
afterInput(() => {
    const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { y: 4, color: color`H` });
        }
    }
});
