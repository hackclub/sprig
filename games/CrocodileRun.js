/*
@title: CrocodileRun
@author: JungleHornet
@tags: ['singleplayer', 'endless']
@addedOn: 2025-02-11
*/

/*
Description:
    You are being chased through a building by angry crocodiles!
    Run through the doors to make it back home.

Controls:
    WASD: Movement
    J: Pause/unpause
    L: Restart/select game mode
    I: Return to menu

Changelog:
    - v1.0.0 (2/11/2025) :
      - Initial version

    - v1.1.0 (2/12/2025) :
      - Added alternate texture of house after winning
      - Updated logo with new house texture
      - Added increasing speed
      - Added animations for when the crocodiles eat the walls and the player

    - v1.2.0 (2/12/2025) :
      - Added main menu
      - Added endless mode
      - Added changelog

    - v1.2.1 (2/12/2025) :
      - Separated changelog from header

    - v1.2.2 (2/12/2025) :
      - Added description and instructions in js file
      - Bug fixes
      - First version in gallery

    - v1.2.3 (3/26/2025) :
      - Fixed dates in changelog
      - Fixed tons of errors that only occur when playing on sprig (not in editor)
*/

// define the sprites in our game
const player = "p";
const wall = "w";
const topWall = "0";
const bottomWall = "_";
const crocodile = ["c", "e", "b"];
const house = ["h", "o", "f"];
const smoke = "s"
const button = ["n", "m"];
const border = ["1", "2", "3", "4", "5", "6", "7", "8"];

var inMenu = true
var selected = 1;
var dead = false;
var paused = false;
var endless = false;
var runid = 0;
var menuTextId = 0;
var wallStep = 0;
let i = 0;
const winStep = 15;
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
  [topWall, bitmap`
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
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [bottomWall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
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
..........LL....`],
  [button[0], bitmap`
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
4444444444444444`],
  [button[1], bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [border[0], bitmap`
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
................
................
.............000
.............000
.............000`],
  [border[1], bitmap`
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
................
................
0000000000000000
0000000000000000
0000000000000000`],
  [border[2], bitmap`
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
................
................
000.............
000.............
000.............`],
  [border[3], bitmap`
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............
000.............`],
  [border[4], bitmap`
000.............
000.............
000.............
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
................
................`],
  [border[5], bitmap`
0000000000000000
0000000000000000
0000000000000000
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
................
................`],
  [border[6], bitmap`
.............000
.............000
.............000
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
................
................`],
  [border[7], bitmap`
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000
.............000`]
)

let level = 0; // this tracks the level we are on
const levels = [
  map`
c......w
c......w
c......w
c..p....
c......w
c......w`,
  map`
12223
8nnn4
76665
.mmm.
.....`,
  map`
.....
.nnn.
12223
8mmm4
76665`
];

function mup() {
  if (selected == 2) {
    setMap(levels[1]);
  }
  selected = 1
}

function mdown() {
  if (selected == 1) {
    setMap(levels[2]);
  }
  selected = 2
}

function select() {
  if (selected == 1) {
    endless = false;
  } else {
    endless = true;
  }
  inMenu = false;
  clearText()
  addText("Press I to", {y: 3})
  addText("return to menu", {y: 4})

  menuTextId = setTimeout(function () {
    clearText();
    addText(wallStep.toString(), { y: 2, color: color`0` });
  }, 2500)
  
  // set the map displayed to the current level
  const currentLevel = levels[level];
  setMap(currentLevel);
  dead = false
  paused = false
  run()
}

function menu() {
  clearTimeout(menuTextId);
  clearTimeout(runid);
  clearText()
  selected = 1;
  inMenu = true;
  dead = true;
  paused = true;
  wallStep = 0;
  setMap(levels[1]);
  addText("Use L to select", {y: 2, color: color`0`});
  addText("Normal", {y: 6, color: color`0`});
  addText("Endless", {y: 10, color: color`0`});
}

menu()

setSolids([player, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [wall]: [player]
});

// inputs for player movement control
onInput("w", () => {
  if (inMenu) {
    mup()
    return
  }
  if (!dead && !paused) { getFirst(player).y += -1; } // positive y is downwards
});

onInput("a", () => {
  if (!dead && !paused && !inMenu) { getFirst(player).x += -1; }
});

onInput("s", () => {
  if (inMenu) {
    mdown()
    return
  }
  if (!dead && !paused) { getFirst(player).y += 1; } // positive y is downwards
});

onInput("d", () => {
  if (!dead && !paused && !inMenu) { getFirst(player).x += 1; }
});

onInput("i", () => {
    menu()
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
  if (inMenu) {
    select()
    return
  }
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

function checkPlayer() {
  if (getFirst(player).x == 0) {
    dead = true
    addText("You Lose!", { y: 4, color: color`3` })
    var x = getFirst(player).x
    var y = getFirst(player).y
    getFirst(player).remove()
    getTile(x, y)[0].remove()
    addSprite(x, y, crocodile[2])
    return
  }

  if (wallStep >= winStep && getFirst(player).x == 7 && getFirst(player).y == 3 && !endless) {
      addText("You Win!", { y: 4, color: color`4` });
      dead = true;
      getFirst(player).remove()
      for (i = 0; i < crocodile.length; i++) {
      var crocs = getAll(crocodile[i])
      for (i = 0; i < crocs.length; i++) {
        crocs[i].remove()
      }
      }
      var walls = getAll(wall)
      for (i = 0; i < walls.length; i++) {
        walls[i].remove()
      }
      getFirst(house[0]).remove()
      addSprite(7, 3, house[1])
      addSprite(7, 2, smoke[0])
    }
}

// these get run after every input
afterInput(() => {
  if (!dead) { checkPlayer() }
});

function flipCroco(x, y) {
  var sprite = getTile(x, y)[0];

  if (sprite.type != crocodile[0] && sprite.type != crocodile[1]) {
    for (i = 1; i < getTile.length; i++) {
      sprite = getTile(x, y)[i]
      if (sprite.type == crocodile[0] || sprite.type == crocodile[1]) { break; }
    }
    return
  }

  if (sprite.type == crocodile[0]) {
    var type = 1;
  } else {
    var type = 0;
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

    addText(wallStep.toString(), { y: 2, color: color`0` });
    let walls = getAll(wall)
    for (i = 0; i < walls.length; i++) {
      walls[i].x += -1
      if (walls[i].x == 0) {
        var x = walls[i].x;
        var y = walls[i].y;
        walls[i].remove();
        flipCroco(x, y);
      }
    }
    if (wallStep == winStep && !endless) {
      addSprite(7, 3, house[0])
    }

    if (wallStep % wallDist == 0 && wallStep < winStep || endless && wallStep % wallDist == 0) {
      var door = Math.floor(Math.random() * 6);
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

    checkPlayer()
  }
  if (!dead && !paused) {
    let tick = tickSpeed - (3 * Math.floor(wallStep / 2));
    if (wallStep >= 200) {
      let tick = tickSpeed - (3 * Math.floor(200 / 2));
    }
    runid = setTimeout(run, tick);
  }
}
