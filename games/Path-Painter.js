/*
@title: Path Painter
@description: To win in path painter, you need to get to the goal while painting ALL of the floor. You can't go back from where you painted, so be careful not to get onto a corner! :D
@author: AngelCMHxD
@tags: ["puzzle"]
@addedOn: 2026-08-26
*/

// define the sprites in our game
const player = "p";
const goal = "g";
const wall = "w";
const trail = "t";

let previous = [undefined, undefined];
let failed = false;

// assign bitmap art to each sprite
function updateSprites(sadPlayer = false) {
  if (sadPlayer) {
    playerSprite =
      bitmap`
      ................
      ...0000000000...
      ..0FFFFFFFFFF0..
      .0FFFFFFFFFFFF0.
      .0FFF0FFFF0FFF0.
      .0FFF0FFFF0FFF0.
      .0FFF0FFFF0FFF0.
      .0FFFFFFFFFFFF0.
      .0FFFFFFFFFFFF0.
      .0FFFFFFFFFFFF0.
      .0FFF000000FFF0.
      .0FF0FFFFFF0FF0.
      .0FFFFFFFFFFFF0.
      ..0FFFFFFFFFF0..
      ...0000000000...
      ................`
  } else {
    playerSprite =
      bitmap`
      ................
      ...0000000000...
      ..066666666660..
      .06666666666660.
      .06660666606660.
      .06660666606660.
      .06660666606660.
      .06666666666660.
      .06666666666660.
      .06666666666660.
      .06606666660660.
      .06660000006660.
      .06666666666660.
      ..066666666660..
      ...0000000000...
      ................`
  }
  
  setLegend(
    [ player, playerSprite],
    [ goal, bitmap`
  ................
  ................
  .......003......
  .......0033.....
  .......00333....
  .......003333...
  .......00333....
  .......0033.....
  .......003......
  .......00.......
  .......00.......
  .......00.......
  .....000000.....
  ....00000000....
  ...0000000000...
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
  7777777777777777`]
  );
}

updateSprites()

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwww
p..g
wwww`,
  map`
pw.g
.w..
....`,
  map`
p..
w..
w.g`,
  map`
...
.p.
g..`,
  map`
p.wg
..w.
.ww.
....`,
  map`
ww..www
p.....g
www..ww`,
  map`
........
........
.wwwwww.
.pw...w.
www...w.
g.......
........`,
  map`
....gw
.....w
..wwww
..wpww
..w...
..w...
......`,
  map`
pw..w..
.......
..wwww.
ww.....
g..ww..`,
  map`
pw....
......
..w...
wwww..
.....w
..wwww
..w..g
......`
];

// set the map displayed to the current level
const currentLevel = levels[level];
addText(`Level ${level+1}/${levels.length}`, { color: color`9` })
setMap(currentLevel);

setSolids([ player, wall, trail ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: []
});

function getPlayerCoords() {
  return [getFirst(player).x, getFirst(player).y]
}

function getGoalCoords() {
  return [getFirst(goal).x, getFirst(goal).y]
}

onInput("s", () => {
  if (failed) return;

  previous = getPlayerCoords();
  getFirst(player).y += 1; // positive y is downwards
});

onInput("w", () => {
  if (failed) return;

  previous = getPlayerCoords();
  getFirst(player).y -= 1;
});

onInput("a", () => {
  if (failed) return;

  previous = getPlayerCoords();
  getFirst(player).x -= 1;
});

onInput("d", () => {
  if (failed) return;

  previous = getPlayerCoords();
  getFirst(player).x += 1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  previous = [undefined, undefined]
  failed = false;
  updateSprites()

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText()
    addText(`Level ${level+1}/${levels.length}`, { color: color`9` })
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
    console.log(previous, getPlayerCoords())

  if (!previous.includes(undefined) && JSON.stringify(previous) !== JSON.stringify(getPlayerCoords())) {
    addSprite(...previous, trail)
  }
  
  const remaining = height() * width() - tilesWith(wall).length - tilesWith(trail).length - 1 !== 0;
  const onGoal = JSON.stringify(getPlayerCoords()) === JSON.stringify(getGoalCoords())

  if (remaining && onGoal) {
    addText("you didnt", { y: 4, color: color`3` });
    addText("paint all tiles :C", { y: 5, color: color`3` });
    addText("press j to restart", { y: 7, color: color`3` });

    failed = true;
    updateSprites(true);
    return;
  }

  if (!remaining && onGoal) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      clearText()
      addText(`Level ${level+1}/${levels.length}`, { color: color`9` })
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`4` });
    }

    return;
  }

  if (!remaining && !onGoal) {
    addText("dead end :C", { y: 4, color: color`3` });
    addText("press j to restart", { y: 6, color: color`3` });
    failed = true;
    updateSprites(true);
  }
});
