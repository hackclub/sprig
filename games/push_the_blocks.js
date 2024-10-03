/*
@title: Push the Blocks
@author: aidan
@tags: ['puzzle']
@addedOn: 2022-11-10

Instructions:

Push the green boxes onto the green shapes, and the red boxes onto the red shapes.

Use w, a, s, d to move around and j to restart the level.
*/


const player = "p";
const wall = "w";
const box_green = "b";
const goal_green = "g";
const box_red = "r";
const goal_red = "x";
const background = "z";



setLegend(
  [ player, bitmap`
................
.......333......
......33333.....
.....3333333....
...33333333333..
....000000000...
....002000200...
....002000200...
....000000000...
....000020000...
....000000000...
......0...0.....
....000...000...
................
................
................`],
  [ wall, bitmap`
CCCCC6CCCCC6CCCC
CCCCC6CCCCC6CCCC
CCCCC6CCCCC6CCCC
6666666666666666
CC6CCCCC6CCCCC6C
CC6CCCCC6CCCCC6C
CC6CCCCC6CCCCC6C
6666666666666666
CCCCC6CCCCC6CCCC
CCCCC6CCCCC6CCCC
CCCCC6CCCCC6CCCC
6666666666666666
CC6CCCCC6CCCCC6C
CC6CCCCC6CCCCC6C
CC6CCCCC6CCCCC6C
6666666666666666`],
  [ box_green, bitmap`
................
..DDDDDDDDDDDDD.
.D0000000000000D
.D0DDDDDDDDDDD4D
.D0DDDDDDDDDDD4D
.D0DDD22D22DDD4D
.D0DD2222222DD4D
.D0DD2222222DD4D
.D0DDD22222DDD4D
.D0DDDD222DDDD4D
.D0DDDDD2DDDDD4D
.D0DDDDDDDDDDD4D
.D0DDDDDDDDDDD4D
.D4444444444444D
..DDDDDDDDDDDDD.
................`],
  [ box_red, bitmap`
................
..3333333333333.
.300000000000003
.303333333333383
.303333333333383
.303332232233383
.303322222223383
.303322222223383
.303332222233383
.303333222333383
.303333323333383
.303333333333383
.303333333333383
.388888888888883
..3333333333333.
................`],
  [ goal_green, bitmap`
................
................
................
................
................
................
.....DD.DD......
....DDDDDDD.....
....DDDDDDD.....
.....DDDDD......
......DDD.......
.......D........
................
................
................
................`],
  [ goal_red, bitmap`
................
................
................
................
................
................
.....33.33......
....3333333.....
....3333333.....
.....33333......
......333.......
.......3........
................
................
................
................`],
  [ background,  bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
);

let level = 0;
const levels = [
  map`
wwwwwwww
wwwgwwww
www.wwww
wwwb.bgw
wg.bpwww
wwwwbwww
wwwwgwww
wwwwwwww`,
  map`
wwwwwwww
wwwgwwww
ww.bwwww
ww...bpw
wg.bbgww
wwww.www
wwwwgwww
wwwwwwww`,
  map`
wwwwwww
wgwwwww
wgg...w
w.bbbpw
w....ww
wwwwwww`,
  map`
wwwwww
www..w
w.rg.w
w.bx.w
wp..ww
wwwwww`,
  map`
wwwwwww
www...w
wgr.bxw
w.....w
wwww.pw
wwwwwww`,
  map`
wwwwwwww
ww.x..ww
w.rwb..w
w..g...w
wwwww.pw
wwwwwwww`,
  map`
wwwwwwww
www.pwww
wwwbb..w
www.bg.w
wggg.www
wwwb.www
www..www
wwwwwwww`,
  map`
wwwwww
ww..ww
wp.rww
w.xg.w
w.b..w
ww..ww
wwwwww`,
];

const blankScreen = map`.`;
setBackground(background);

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box_green, box_red, wall ]);

setPushables({
  [player]: [box_green, box_red],
});

// START - PLAYER MOVEMENT CONTROLS

//move down
onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

//move right
onInput("d", () => {
  getFirst(player).x += 1;
});

//move left
onInput("a", () => {
  getFirst(player).x -= 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  
  // count the number of green tiles with goals
  const targetNumber_green = tilesWith(goal_green).length;
  
  // count the number of green tiles with goals and boxes
  const numberCovered_green = tilesWith(goal_green, box_green).length;

  // count the number of red tiles with goals
  const targetNumber_red = tilesWith(goal_red).length;
  
  // count the number of red tiles with goals and boxes
  const numberCovered_red = tilesWith(goal_red, box_red).length;
  
  const numberCovered = numberCovered_green + numberCovered_red;
  const targetNumber = targetNumber_green + targetNumber_red;
  
  
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setMap(blankScreen);
      addText("You win!", { y: 4, color: color`3` });
    }
  }
});
