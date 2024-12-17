/* 
@title: Grass Maze
@author: steponme449
@tags: []
@addedOn: 2024-12-16
*/
const player = "p";
const wall = "w";
const goal = "g";
setLegend(
  [player, bitmap`
................
................
................
.....00000......
....0222220.....
....0022200.....
....0022200.....
....0222220.....
.....00000......
.......0........
.......0........
.....00000......
.......0........
.......0........
......0.0.......
.....0...0......`],
  [wall, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0DDDDDDDD4D4DDD0
0DDDDD4DD4D4DDD0
0DDDD4D4DD44DDD0
0DD4D4D4D444D4D0
0D4D444D4D444DD0
0DD4444D4D444DD0
0DD4444444444DD0
0DDDDDDDDDDDDDD0
0DDDDDDDDDDDDDD0
0000000000000000`],
  [goal, bitmap`
................
................
................
................
................
................
................
................
................
................
................
.......7........
......767.......
.......7........
.......DD.......
.......D........`],
);
let level = 0;
const levels = [
  map`
...wg
.w.w.
.w.w.
.w.w.
pw...`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wpw..........................w
w.w........wwwwwwwwwwwwwwwww.w
w.w........................w.w
w.w.....wwwwww...ww...w..w.w.w
w.wwwww.w...w..w..w...w..w.w.w
w.w..w..w...w.ww..w...w..w.w.w
w.w..w..w.www..w..w...w..w.w.w
w....w.ww...ww.w..w...w..w.w.w
w...ww..www.w..w..w...w..w.w.w
w....ww.w...w.ww..w...w..w.w.w
w....w..w.www..w..w...w..w.w.w
w.ww.w.ww...ww.w..w...w..w.w.w
w.w..w..www.w..w..w...w..w.w.w
w.w..ww.w...w.ww..w...w..w.w.w
w.w.ww..w.www..w..w...w..w.w.w
w.w..w.ww...ww.w..w...w..w.w.w
w.w..w..www.w..wwwww..w..w.w.w
w.ww.ww.w...w.w.w..w..w..w.w.w
www..w..w.www...w..w..w....w.w
w....w.ww...www.w..w..w....w.w
w..w.w..www.w...w..wwwwwwwwwww
w.wwwww.w...w.www............w
w..w.w..w.www...w............w
w..w.w.ww...www.w..ww.wwwww..w
w....w..www.w......w..w......w
w.wwwww.w...wwwwwwww.ww......w
w.w...w.w.w.w...w.....w..wwwww
w...w...w.w...w...w.w.w.....gw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
w....p............pw
wwwwww..wwwwwwwwww.w
w.gw...............w
ww.www.wwwwwwwwwwwww
w..w....w..w..w..w.w
w.ww.w..w.....w..w.w
w..w.w..w..w..w..w.w
ww.w.w.....w.....w.w
w..w.wwwwwwwwwww...w
w.ww..w............w
w..w..wwww.wwwwwwwww
w..w..w.w..w..w..w.w
w.wwwww....w..ww.w.w
w.w.w.w.ww.......w.w
w.w.w....w...wwwww.w
w.w....w.w.w.......w
w.wwww.w.w.w.wwwwwww
w......w.w.w.......w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwww
w....w....w...w.w.....w.w
w..w...ww.......w.....w.w
ww.wwwwwwwwwwww.wwwww.w.w
w..w.w..........w.....w.w
w.ww.w.wwwwwwwwww..w..w.w
w..w.w.............w..w.w
ww.w.w.wwwwwwwwwwwwww.w.w
w..w.w................w.w
w.ww.wwwwwww....wwwww.w.w
w..w.w.....wwww.........w
ww.w.w.wwwwwggwwwwwwwww.w
w..w.......wgg..........w
w.wwwwwww..wwwwwwwwwwwwww
w....w.w.......w........w
w....w.wwwww...wwwww.ww.w
w..w.w.w..w..www......w.w
ww.w...........w.wwwwww.w
w..w.wwwwwwwwwww......w.w
w..w...w...w.w.wwww.www.w
w.ww.w...w...w.w......w.w
w..w.w.wwwwwww.ww.wwwww.w
w.ww.w.w...w...w......w.w
w..w.w...w...w.....w..wpw
wwwwwwwwwwwwwwwwwwwwwwwww`
];
setMap(levels[0])
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
getFirst(player).y -= 1;;
setSolids([player, wall]);;
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
      addText("you win!", { y: 4, color: color`0` });
    }
  }
});
