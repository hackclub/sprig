/*
@title: max_move
@tags: ['beginner']
@addedOn: 2025-11-06
@author: nick extra levels by: sam, minghao

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

function wait(time) {
  let startTime_ = performance.now();
  while (performance.now() - startTime_ < time) {}
}

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// create sound
const melody = tune`
500: D5~500,
15500`

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
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
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
w...g
.....
.....
p..w.`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
....
..w.`,
  map`
pb..
...b
....
.bbg`,
  map`
...
.p.
...`,
  map`
ppw.
..wg
....
...g`,
  map`
pp.w.
...g.
.b.w.
..bg.`,
  map`
pp...
..wg.
.b.w.
..bg.`,
  map`
....p.
p...w.
w.bb..
..b...
g.gwb.
......`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

function onGoal(playerSprite) {
  let sprites = getTile(playerSprite.x, playerSprite.y);
  let result = false;
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].type === "g") {
      result = true;
      break;
    }
  }
  return result;
}


function getPlayerSprite() {
  let finalSprite;
  let found = false;
  getAll(player).forEach((playerSprite) => {
    if (found) return;
    let valid = true;
    getTile(playerSprite.x, playerSprite.y).forEach((sprite) => {
      if (sprite.type == goal) valid = false;
    });
    if (valid) {
      finalSprite = playerSprite;
    }
  });
  return finalSprite;
}

var isMoving = false;

// inputs for player movement control
onInput("w", () => {
  if (isMoving) return;
  else isMoving = true;
  let playerSprite = getPlayerSprite();
  let lastY = playerSprite.y + 1;
  function move() {
    if (!(lastY != playerSprite.y && playerSprite.y > 0 && !onGoal(playerSprite))) {
      isMoving = false;
      setTimeout(afterMove, 1);
      return;
    }
    lastY = playerSprite.y;
    playerSprite.y -= 1;
    playTune(melody);
    setTimeout(move, 20);
  }
  move();
});

onInput("s", () => {
  if (isMoving) return;
  else isMoving = true;
  let playerSprite = getPlayerSprite();
  let lastY = playerSprite.y - 1;
  function move() {
    if (!(lastY != playerSprite.y && playerSprite.y < height() - 1 && !onGoal(playerSprite))) {
      isMoving = false;
      setTimeout(afterMove, 1);
      return;
    }
    lastY = playerSprite.y;
    playerSprite.y += 1; // positive y is downwards
    playTune(melody);
    setTimeout(move, 20);
  }
  move();
});

onInput("a", () => {
  if (isMoving) return;
  else isMoving = true;
  let playerSprite = getPlayerSprite();
  let lastX = playerSprite.x + 1;
  function move() {
    if (!(lastX != playerSprite.x && playerSprite.x > 0 && !onGoal(playerSprite))) {
      isMoving = false;
      setTimeout(afterMove, 1);
      return;
    }
    lastX = playerSprite.x;
    playerSprite.x -= 1;
    playTune(melody);
    setTimeout(move, 20);
  }
  move();
});

onInput("d", () => {
  if (isMoving) return;
  else isMoving = true;
  let playerSprite = getPlayerSprite();
  let lastX = playerSprite.x - 1;
  function move() {
    if (!(lastX != playerSprite.x && playerSprite.x < width() - 1 && !onGoal(playerSprite))) {
      isMoving = false;
      setTimeout(afterMove, 1);
      return;
    }
    lastX = playerSprite.x;
    playerSprite.x += 1;
    playTune(melody);
    setTimeout(move, 20);
  }
  move();
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// this gets run after every move
function afterMove() {
  clearText();
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and players
  const numberCovered = tilesWith(goal, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
}

addText("WASD, j to restart", { y: 4, color: color`3` });