/*
@title: CrocodileRun
@author: JungleHornet
@tags:
@addedOn: 2025-02-11

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const wall = "w";
const crocodile = "c";
const house = "h";

var dead = false;
var paused = false;
var runid = 0;
var wallStep = 0;
const winstep = 150;
const tickspeed = 500;
const walldist = 3;

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
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
  [wall, bitmap`
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............
CCCC............`],
  [crocodile, bitmap`
................
................
.DD....DD.......
D2DD.DD23D......
D20DD2323D......
DDD232333.......
DDD23333........
DDD3333.........
DD33333.........
DD333333........
DDD323333.......
.DD323233.......
...DD3232D......
.....DD32D......
.......DD.......
................`],
  [house, bitmap`
................
................
......0000......
.....000000.....
....00333300....
...0033333300...
..003333333300..
....33333333....
....33333333....
....3CC33223....
....3CC33223....
....3C033333....
....3CC33333....
................
................
................`]
)

let level = 0; // this tracks the level we are on
const levels = [
  map`c......w
c......w
c......w
c..p....
c......w
c......w`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [wall]: [player]
});

// inputs for player movement control
onInput("w", () => {
  if (!dead && !paused) { getFirst(player).y += -1; } // positive y is downwards
});

onInput("a", () => {
  if (!dead && !paused) { getFirst(player).x += -1; }
});

onInput("s", () => {
  if (!dead && !paused) { getFirst(player).y += 1; } // positive y is downwards
});

onInput("d", () => {
  if (!dead && !paused) { getFirst(player).x += 1; }
});

function togglePaused() {
  paused = !paused;
  if (paused) {
    clearTimeout(runid);
  } else {
    run();
  }
}

// input to reset level
onInput("l", () => {
  if (dead) {
    clearTimeout(runid);
  }
  if (paused) {
    togglePaused();
  }
  dead = false;
  wallStep = 0;
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

onInput("j", () => {
  togglePaused()
})

function checkDead() {
  if (getFirst(player).x == 0) {
    dead = true
    addText("You Lose!", { y: 4, color: color`3` })
    getFirst(player).remove()
  }
}

// these get run after every input
afterInput(() => {

  if (!dead) { checkDead() }
  // count the number of tiles with goals
  // const targetNumber = tilesWith(goal).length;

  // count the number of tiles with goals and boxes
  // const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  // if (numberCovered === targetNumber) {
  // increase the current level number
  // level = level + 1;

  // const currentLevel = levels[level];

  // make sure the level exists and if so set the map
  // otherwise, we have finished the last level, there is no level
  // after the last level
  // if (currentLevel !== undefined) {
  // setMap(currentLevel);
  // } else {
  // addText("you win!", { y: 4, color: color`3` });
  // }
  // }
});

function run() {

  if (!dead) {
    wallStep++;
    addText(wallStep.toString(), { y: 1, color: color`0` });
    walls = getAll(wall)
    for (i = 0; i < walls.length; i++) {
      walls[i].x += -1
      if (walls[i].x == 0) {
        walls[i].remove()
      }
    }
    if (wallStep == winstep) {
      addSprite(7, 3, house)
    }

    if (wallStep % walldist == 0 && wallStep < winstep) {
      door = Math.floor(Math.random() * 6);
      if (getFirst(player).x == 7 && getFirst(player).y != door) {
        getFirst(player).x += -1;
      }
      for (i = 0; i < door; i++) {
        addSprite(7, i, wall)
      }
      for (i = door + 1; i < 6; i++) {
        addSprite(7, i, wall)
      }
    }

    checkDead()
  }
  if (!dead) {

    if (wallStep >= winstep && getFirst(player).x == 7 && getFirst(player).y == 3) {
      addText("You Win!", { y: 4, color: color`4` });
      dead = true;
      getFirst(player).remove()
      crocs = getAll(crocodile)
      for (i = 0; i < crocs.length; i++) {
        crocs[i].remove()
      }
      walls = getAll(wall)
      for (i = 0; i < walls.length; i++) {
        walls[i].remove()
      }
    }
    runid = setTimeout(run, tickspeed);
  }
}

runid = setTimeout(run, tickspeed)