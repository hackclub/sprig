/*
@title: Filler
@author: Jet W

Instructions:

Fill the whole screen with yellow and reach the goal.

Use w, a, s, d to move and j to restart the current level.

*/

/*
CONTROLS:
W - move up
S - move down
A - move left
D - move right
J - restart level
*/

const player = "p";
const goal = "g";
const wall = "w";
const trail = "t";

setLegend(
  [ player, bitmap`
................
.......00.......
......0.0.......
.....3..0.......
.......000......
......06600.....
.....0666660....
.....0606060....
.....0666660....
.....0606660....
.....0660060....
......066660....
.......0660.....
.......000......
.......0.0......
......00.00.....`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
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
  [ trail, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
);

let level = 0;
const levels = [
  map`
pwg
.w.
.w.
.w.
...`,
  map`
p.gww
...ww
.....
.....
.....`,
  map`
pww..w
..wg..
..w...
.....w
...w.w
ww...w`,
  map`
p..w...
...w...
.wg.w..
.w..w..
.w..w..
.ww....
.......`,
  map`
p..w...w..
ww.....w..
......w...
..........
..........
....ww..wg`
];

const currentLevel = levels[level];
setMap(currentLevel);
  const p = getFirst(player)
  addSprite(p.x, p.y, trail)

setSolids( [ player, wall, trail ] );

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
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    const p = getFirst(player)
    addSprite(p.x, p.y, trail);
  }
});

afterInput(() => {

  const p = getFirst(player)
  if (p.dy !== 0 || p.dx !==0)
  addSprite(p.x, p.y, trail)

  
  if (getFirst(player) && getFirst(goal) && getFirst(player).x == getFirst(goal).x) {
    if (getFirst(player).y == getFirst(goal).y) {
      if (getAll(trail).length == width() * height() - getAll(wall).length) {
        level += 1;
        
        const currentLevel = levels[level];

        if (currentLevel !== undefined) {
        setMap(levels[level]);
        const p = getFirst(player)
        addSprite(p.x, p.y, trail);         
      } else {
        addText("You Win!", { y: 4, color: color`7` });
        } 
      }
    }
  }
});
