
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p"
    const wall = "w"
    const goal = "g"

setLegend(
	 [ player, bitmap`
................
................
................
................
.....1.111......
...1115551......
...1.15551.115..
...111555111.5..
.....155511..5..
.....15551......
.....11111......
................
................
................
................
................`],
    [ wall, bitmap`
DDDD44DDD44DDDDD
DDDD444D444DDD44
4DDD444D444DDD4D
4DDD4DD4444DDD44
444DDDD44444DD44
444DDDDD444DDDDD
444DDDDDD44DDDDD
444DDDDDDDDDDDDD
4DDDD44DDDDDDDDD
DDDD4444DDDDD4DD
DDDDDDD4DDDD4444
DDDDDDD4DDDD44DD
DDDD44D4DDD44444
DDD444D4D4D44444
D44444D4D4D44444
DD444DD444DDD44D`],
    [ goal, bitmap`
................
................
................
................
................
......66666.....
.....669966.....
.....66666......
.......46.......
.......4........
....444444......
.....4444.......
......44........
......444.......
.......4........
................`]
);

setSolids([ player, wall ]); // sprites cannot go inside of these blocks

let level = 0
const levels = [
	map`
p.w.....
w.w.wwww
w.w.wg..
..w.www.
........
w.ww...w
w.wwww.w
....ww..
w......w
w.wwww.w`
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

afterInput(() => {

})
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
            addText("you win!", { y: 4, color: color`9` });
        }
    }
});