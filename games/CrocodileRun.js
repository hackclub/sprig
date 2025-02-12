/*
@title: CrocodileRun
@author: JungleHornet
@tags:
@addedOn: 2025-02-11
*/

// define the sprites in our game
const player = "p";
const wall = "w";
const crocodile = ["c", "e", "b"];
const house = ["h", "o", "f"];
const smoke = ["s", "2"]

var dead = false;
var paused = false;
var runid = 0;
var wallStep = 0;
const winStep = 175;
const tickSpeed = 500;
const wallDist = 3;

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
  [crocodile[0], bitmap`
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
  [crocodile[1], bitmap`
.......C........
...........C..C.
........C.......
DDD.....C..C....
D4DD........C...
DD4D..........C.
DDDDDDDDDD......
DD32323232D.....
DD32323232C.CC..
DD23232323D.....
DD23232323D.....
.DDDDDDDDD.C....
............C..C
.........C......
.........CC.....
.......C....C..C`],
  [crocodile[2], bitmap`
.......3........
...........3..3.
........3.......
DDD.....3..3....
D4DD........3...
DD4D..........3.
DDDDDDDDDD......
DD32323232D.....
DD32323232C.33..
DD23232323D.....
DD23232323D.....
.DDDDDDDDD.3....
............3..3
.........3......
.........33.....
.......3....3..3`],
  [house[0], bitmap`
..........00....
..........00....
......000000....
.....0000000....
....00333300....
...0033333300...
..003333333300..
....33333333....
....33333333....
....3CC33FF3....
....3CC33FF3....
....3C033333....
....3CC33333....
................
................
................`],
  [house[1], bitmap`
..........00....
..........00....
......000000....
.....0000000....
....00333300....
...0033333300...
..003333333300..
....33333333....
....33333333....
....3CC33663....
....3CC33663....
....3C033333....
....3CC33333....
................
................
................`],
  [smoke[0], bitmap`
................
................
..............11
.............111
............1111
...........11111
..........111111
.........1111111
.........1111111
.........1111111
..........111111
...........1LL11
...........LLL1.
...........LL...
..........LLL...
..........LL....`]
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
  clearTimeout(runid);
  dead = false;
  wallStep = 0;
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
  if (paused) {
    togglePaused();
  } else {
    run();
  }
});

onInput("j", () => {
  togglePaused()
})

function checkDead() {
  if (getFirst(player).x == 0) {
    dead = true
    addText("You Lose!", { y: 4, color: color`3` })
    x = getFirst(player).x
    y = getFirst(player).y
    getFirst(player).remove()
    getTile(x, y)[0].remove()
    addSprite(x, y, crocodile[2])
  }
}

// these get run after every input
afterInput(() => {
  if (!dead) { checkDead() }
});

function flipCroco(x, y) {
  sprite = getTile(x, y)[0];

  if (sprite.type != crocodile[0] && sprite.type != crocodile[1]) {
    for (i = 1; i < getTile.length; i++) {
      sprite = getTile(x, y)[i]
      if (sprite.type == crocodile[0] || sprite.type == crocodile[1]) { break; }
    }
    return
  }

  if (sprite.type == crocodile[0]) {
    type = 1;
  } else {
    type = 0;
  }

  sprite.remove();
  addSprite(x, y, crocodile[type]);
}

function run() {

  if (!dead && !paused) {
    wallStep++;
    for (i = 0; i < 6; i++) {
      flipCroco(0, i);
      if (getTile(0, i)[0].type == crocodile[1]) {
        flipCroco(0, i);
      }
    }

    addText(wallStep.toString(), { y: 1, color: color`0` });
    walls = getAll(wall)
    for (i = 0; i < walls.length; i++) {
      walls[i].x += -1
      if (walls[i].x == 0) {
        x = walls[i].x;
        y = walls[i].y;
        walls[i].remove();
        flipCroco(x, y);
      }
    }
    if (wallStep == winStep) {
      addSprite(7, 3, house[0])
    }

    if (wallStep % wallDist == 0 && wallStep < winStep) {
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
  if (!dead && !paused) {

    if (wallStep >= winStep && getFirst(player).x == 7 && getFirst(player).y == 3) {
      addText("You Win!", { y: 4, color: color`4` });
      dead = true;
      getFirst(player).remove()
      for (i = 0; i < crocodile.length; i++) {
      crocs = getAll(crocodile[i])
      for (i = 0; i < crocs.length; i++) {
        crocs[i].remove()
      }
      }
      walls = getAll(wall)
      for (i = 0; i < walls.length; i++) {
        walls[i].remove()
      }
      getFirst(house[0]).remove()
      addSprite(7, 3, house[1])
      addSprite(7, 2, smoke[0])
    }
    runid = setTimeout(run, tickSpeed - (3 * Math.floor(wallStep / 2)));
  }
}

/*
function timer() {
  seconds += 1;
  addText(seconds.toString(), {y: 2});
}

var seconds = 0;
setInterval(timer, 1000);
*/

run();