/*
@title: BrainTeaserMaze
@author: Arhan
@tags: ['puzzle']
@addedOn: 2022-12-19


  Controls:
    I : Up
    K : Down
    J : Left
    L : Right
    

*/
const wall = "w";
const player = "p";
const goal = "g";
const music = tune`
252.10084033613447: g4~252.10084033613447,
252.10084033613447: g4~252.10084033613447,
252.10084033613447: e4~252.10084033613447,
252.10084033613447: e4~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: g4~252.10084033613447,
252.10084033613447: g4~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: e5~252.10084033613447,
252.10084033613447: a5~252.10084033613447,
252.10084033613447: a5~252.10084033613447,
252.10084033613447: a5~252.10084033613447,
252.10084033613447: f5~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: c5~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: a4~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: d5~252.10084033613447,
252.10084033613447: b4~252.10084033613447,
252.10084033613447: b4~252.10084033613447`;
setLegend(
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
0000000000000000`],[player, bitmap`
................
................
................
................
.....000000.....
....00....00....
....0..0.0.0....
....00.....0....
.....0....0.....
.....000000.....
......0..00.....
.....00...0.....
.....0..........
................
................
................
 `],  [ goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
)
let level = 0;
const levels = [map`
wwwwwwwwwwwwwwwwwwwwwwwwwww
wp..w.....w.w..........w..w
www.wwwww.w.www.www...www.w
w.w...w.w.......w...w..w.ww
w.w.www.wwwwwww.w.w.ww.w..w
w.w.........w...w.w.w..w..w
w.wwwwwwwww.w.w.w.w.......w
w...........w.w...w.....www
wwwwwww.w.www.w.wwwww.w...w
w.w.w.w.w...w.w.w.w...w...w
w.w.w.w.www.www.w.w.wwww..w
w.w.......w.w.............w
w.wwwwwww.www.www.www.www.w
w.......w...w.w.w.w.w.w.w.w
w.wwwwwwwww.w.w.www.www.w.w
w.......................w.w
w.w.w.www.www.wwwww.wwwww.w
w.w.w.w.w...w.w...w.w..w..w
wwwww.w.wwwww.www.w....w..w
w.....w.........w...w..w..w
w.w...w.wwww.ww.....w.....w
w.wwwww.w..w.....w..ww....w
w.......w..www.www..ww.ww.w
w..w.................w.w..w
wwww..ww.w.wwwwwww..ww.wwww
w....www.w......w....w....w
wwwwwwww.wwwwwwwwwwwwwwwwgw`,map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.....w.........w.......w...w
w.www.w.wwwwwww.w.wwwww.w.w.w
w...w.w...w...w.w.w...w.w.w.w
wwwww.wwwww.w.w.w.www.w.www.w
p.....w...w.w.w.w.....w.w...w
wwwww.w.w.www.w.wwwwwww.w.w.w
w.....w.w.....w.w.........w.w
w.www.www.wwwww.w.www.wwwww.w
w.w.w.....w...w.w.w.w.w...w.w
w.w.wwwwwww.www.w.w.w.w.wwwww
w...w.....w.....w...w...w...w
w.w.w.w.www.wwwww.w.w.w.w.www
w.w.w.w...w.w.....w.w.w.....w
w.w.w.w.w.w.wwwwwwwww.wwwwwww
w.w.w.w.w.w.........w.....w.w
w.w.w.w.w...wwwwwww.wwwww.w.w
w.w.www.wwwww.....w.w...w...w
w.w.........w.www.w.www.www.w
w.www.w.w...w...w.w.......w.w
w.w...w.wwwwwwwww.w.wwwww.w.w
w.w.www.....w...w.w.w...w.w.w
w.w.w.wwwww.w.w.w...w.www.www
w...w.w...w.w.w.w.w.w.......w
wwwww.w.w.w.w.w.w.w.wwwwwwwww
w.......w.w.w.w...w.........w
w.wwwwwww.www.ww.wwww.wwww.ww
w.............w...w.....w...w
wwwwwwwgwwwwwwwwwwwwwwwwwwwww`,map`
wwwwwwwwwwwwwwwwwwwwwwww
w..w..w.w.w............w
w.www.....w.wwwwwwwwww.w
w.....www....w.w.......w
w.w.w..w..wwww...wwwww.w
w.w.wwwwwww..ww.ww..w..w
w.w.w..w..ww....w..www.w
w.w...www..w.ww.ww.....w
wwwww...ww....www..www.w
w...w.w..wwww.w...ww.w.w
w.www.ww.w....w.www....w
w.w...w..ww.www.w.ww.www
w.ww.www.w..w...w.w....w
w........w.ww.w.w...ww.w
wwwwwwww.w....w.wwwww..w
w......w.wwww.w.w..w..ww
ww.www...w....www.w....w
w....wwwww.wwww...wwwwww
w.ww.w.....w..w........w
w.w..ww.wwww.ww.w.ww.www
wwww.w...w......w.w....w
w....w.w.w.wwwwwwwww.www
w.ww.www.w....w........w
w.w....w.wwww.w.wwwwww.w
w.w.wwww......w......w.w
w.w....w.wwww.www.w.ww.w
wwwww.ww...w....w.w.w..w
w..w...w.w.w.wwww.w.wwww
w.www.ww.www...w..w....w
w.....w....www.w.wwwww.w
www.wwwwww.w...w.....w.w
w...w......w.wwwwwww.w.w
w.www.ww.www.........w.w
w.w...w....wwwwwwwwwwwww
w.w...w.ww.....w...w...w
w.w...w.w....w.www.w.w.w
w.www.w.w.wwww.....w.www
w...w...w......w.w.....w
wpwwwwwwwwwwwwwwwwwwwwgw`

];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, wall ]);

playTune(music, Infinity);

onInput("k", () => {
  getFirst(player).y += 1;
});

onInput("j", () => {
  getFirst(player).x -= 1;
});
onInput("i", () => {
  getFirst(player).y -= 1;
});

onInput("l", () => {
  getFirst(player).x += 1;
});
afterInput(() => {
  const numberCovered = tilesWith(goal, player).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
		setMap(map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`);
      addText("You won!", { y: 4,x:4 , color: color`2`});
      addText("Game Over", { y: 5,x:4, color: color`2`});
    }
  }
});

