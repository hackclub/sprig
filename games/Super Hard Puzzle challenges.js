/*
@title: Super Hard Puzzle challenges
@author: Ruihan Cao

Instructions:

Hit "run" to execute the code and
start the game (you can also press shift+enter).

The objective is to push the brown boxes onto the green goals.
Press j to reset the current level.
Press WASD for movements.
You are a genius if you can pass all ten levels.

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3033303333333333
3303033333333333
3330330000303303
3330330330303303
3330330330303303
3330330000300003
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ box, bitmap`
2222222222222222
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2CCCCCCCCCCCCCC2
2222222222222222`],
  [ goal, bitmap`
2222222222222222
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2444444444444442
2222222222222222`],
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
0000000000000000`]
);

let level = 0;
const levels = [
    map`
g...bp`,
    map`
.w....
.w.b..
p...wg`,
    map`
wwwwww
w.gggw
w..b.w
w..bww
w..b.w
w..p.w
wwwwww`,
    map`
wwwwwww
wg....w
wbw.w.w
w.bp.gw
w.wbw.w
w.g...w
wwwwwww`,
    map`
wwwwww
www..w
www.pw
w..bgw
w..bgw
w..bgw
wwwwww`,
  map`
wwwwww
w....w
w....w
wwbbbw
wwgggw
ww..pw
wwwwww`,
  map`
wwwww
wgwww
wgb.w
wgb.w
wgb.w
wwb.w
wwp.w
wwwww`,
  map`
wwwwww
www..w
w..bgw
w..bgw
w..bgw
www.pw
wwwwww`,
  map`
wwwww
w.p.w
wbgbw
wgbgw
w...w
w...w
wwwww`,

];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  ["p"]: ["b", "p"],
});


// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
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
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

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