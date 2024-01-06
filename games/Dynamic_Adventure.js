
/* 
@title: Dynamic_Adventure
@author: Alexis Martel
@tags: []
@img: ""
@addedOn: 2023-08-18
*/

    // A "hit-the-target" game for Sprig
// By Alexis Martel, 2023

let gameWon = false;

let cheat = false;

const player = "p";
const playerFrames = [
  bitmap`....HH.88.......
....HHH18.......
.....HHH18......
......HH18......
.....HHHHHHH....
....HHHHH22HH...
....HHHHH20HH0..
....HHHHHHHHH0..
.....HHHHHH0....
......HHHH......
......HHHH.H....
....88HHHHHH....
....8.HHHH......
......HHHH......
.....8HHHHH.....
....8888.HHH....`,
  bitmap`
................
....HH.88.......
....HHH18.......
.....HHH18......
......HH18......
.....HHHHHHH....
....HHHHH20HH...
....HHHHH22HH0..
....HHHHHHHHH0..
.....HHHHHH0....
......HHHH......
......HHHH.8....
....HHHHHH88....
....H.HHHH......
.....HHHHH8.....
....HHHH.888....`,
];
let moveIncrement = 1;

const flag = "f";
const flagFrames = [
  bitmap`................
................
................
..11333...3333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..11...333......
..11............
..11............
..11............
..11............`,
  bitmap`
................
................
.......333......
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..113333333333..
..11333...3333..
..11............
..11............
..11............
..11............
..11............`,
];
let flagMoveIncrement = 0;

const background = "b";

const grass = "g";
const grassFrames = [
  bitmap`
DDDDDDDDD4DDDDDD
DDDD4DDDDDDDDDDD
DD4DDDDDDDDDD4DD
DDDDDDD4D4DDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DDDDD4DDDDDD4DDD
DDDDDDDDD4DDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDD4DDDD4DDD4DDD
DDDDDDDDDDDDDD4D
DDDDDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`,
  bitmap`
DDDDDDDDDD4DDDDD
DDDDD4DDDDDDDDDD
DDD4DDDDDDDDDD4D
DDDDDDDD4D4DDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDD4DDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDD4DD
DDDDDDDDDD4DDDDD
DDDDDDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DDDD4DDDD4DDD4DD
DDDDDDDDDDDDDDD4
DDDDDDDDD4DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`,
];

const water = "w";
const waterFrames = [
  bitmap`
5577777555777775
5557775555577755
7755555777555557
7775557777755577
5577777555777775
5557775555577755
2255555222555552
7725552777255527
7772227777722277
5577777555777775
5557775555577755
7755555777555557
7775557777755577
2277777222777772
5527772555277725
5552225555522255`,
  bitmap`
7555777775557777
5555577755555777
5777555557775555
7777755577777555
7555777775557777
5555577755555777
5222555552225555
2777255527772555
7777722277777222
7555777775557777
5555577755555777
5777555557775555
7777755577777555
7222777772227777
2555277725552777
5555522255555222`,
];

const lava = "l";
const lavaFrames = [
  bitmap`
3399999333999993
3339993333399933
9933333999333339
9993339999933399
3399999333999993
3339993333399933
6633333666333336
9963336999633369
9996669999966699
3399999333999993
3339993333399933
9933333999333339
9993339999933399
6699999666999996
3369996333699963
3336663333366633`,
  bitmap`
9333999993339999
3333399933333999
3999333339993333
9999933399999333
9333999993339999
3333399933333999
3666333336663333
6999633369996333
9999966699999666
9333999993339999
3333399933333999
3999333339993333
9999933399999333
9666999996669999
6333699963336999
3333366633333666`,
];
let lavaPosition;

const poison = "o";
const poisonFrames = [
  bitmap`
HH88888HHH88888H
HHH888HHHHH888HH
88HHHHH888HHHHH8
888HHH88888HHH88
HH88888HHH88888H
HHH888HHHHH888HH
DDHHHHHDDDHHHHHD
88DHHHD888DHHHD8
888DDD88888DDD88
HH88888HHH88888H
HHH888HHHHH888HH
88HHHHH888HHHHH8
888HHH88888HHH88
DD88888DDD88888D
HHD888DHHHD888DH
HHHDDDHHHHHDDDHH`,
  bitmap`
8HHH88888HHH8888
HHHHH888HHHHH888
H888HHHHH888HHHH
88888HHH88888HHH
8HHH88888HHH8888
HHHHH888HHHHH888
HDDDHHHHHDDDHHHH
D888DHHHD888DHHH
88888DDD88888DDD
8HHH88888HHH8888
HHHHH888HHHHH888
H888HHHHH888HHHH
88888HHH88888HHH
8DDD88888DDD8888
DHHHD888DHHHD888
HHHHHDDDHHHHHDDD`,
];
let poisonPosition;
let poisonMoveTimeout;

let frameIndex = 0;

function animateTiles() {
  if (frameIndex === 0) {
    frameIndex = 1;
  } else {
    frameIndex = 0;
  }
  setLegend(
    [lava, lavaFrames[frameIndex]],
    [poison, poisonFrames[frameIndex]],
    [player, playerFrames[frameIndex]],
    [flag, flagFrames[frameIndex]],
    [grass, grassFrames[frameIndex]],
    [water, waterFrames[frameIndex]],
    [
      background,
      bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`,
    ],
  );
  setBackground(background);
}

function logic() {
  clearText();
  if (level === 0) {
    // Prepare for first level
    setSolids([player, water]);
    let moveIncrement = 1;
    let flagMoveIncrement = 0;
    if (checkFlag()) {
      addText("Nicely done!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      moveIncrement = 2;
    } else {
      addText("Get to the flag!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
    }
  } else if (level === 1) {
    if (checkFlag()) {
      addText("Smart!\n(Leg healed!)", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      moveIncrement = 0;
      flagMoveIncrement = 1;
      setSolids([flag, water]);
    } else {
      addText("Challenge!\n(Suddenly limping!)", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      if (moveIncrement === 2) {
        moveIncrement = 1;
      } else {
        moveIncrement = 2;
      }
    }
  } else if (level === 2) {
    if (checkFlag()) {
      addText("Some maze, huh?", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      flagMoveIncrement = 0;
      moveIncrement = 1;
      setSolids([player, water]);
    } else {
      addText("Get to you!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
    }
  } else if (level === 3) {
    if (checkFlag()) {
      addText("Lucky you!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      flagMoveIncrement = 1;
    } else {
      addText("Luck, not skill.", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      getFirst(flag).x = Math.floor(Math.random() * 9) + 1;
      getFirst(flag).y = Math.floor(Math.random() * 9) + 1;
    }
  } else if (level === 4) {
    if (checkFlag()) {
      addText("Cornered!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      flagMoveIncrement = 0;
      lavaPosition = 0;
    } else {
      addText("Moving target!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
    }
  } else if (level === 5) {
    if (checkFlag()) {
      addText("Phew!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      lavaPosition = 0;
    } else {
      addText("Lava!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      lavaPosition += 1;
      for (const tile of getAll()) {
        if (tile.y === lavaPosition) {
          tile.type = lava;
        }
      }
    }
  } else if (level === 6) {
    if (checkFlag()) {
      addText("Close call!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      lavaPosition = 0;
    } else {
      addText("Magma!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      lavaPosition += 1;
      for (const tile of getAll()) {
        if (tile.x === lavaPosition) {
          tile.type = lava;
        }
      }
    }
  } else if (level === 7) {
    if (checkFlag()) {
      addText("Last minute!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      lavaPosition = 0;
    } else {
      addText("Molten rock!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      lavaPosition += 1;
      for (const tile of getAll()) {
        if (tile.x === lavaPosition) {
          tile.type = lava;
        }
      }
    }
  } else if (level === 8) {
    if (checkFlag()) {
      addText("Hot mess!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      poisonPosition = 0;
      poisonMoveTimeout = setInterval(() => {
        poisonPosition += 1;
        for (const tile of getAll()) {
          if (tile.x === poisonPosition) {
            tile.type = poison;
          }
          if (checkDeath()) {
            showDeathScreen();
          }
        }
      }, 750);
    } else {
      addText("Volcano stuff!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      lavaPosition += 1;
      for (const tile of getAll()) {
        if (tile.x === lavaPosition || tile.y === lavaPosition) {
          tile.type = lava;
        }
      }
    }
  } else if (level === 9) {
    if (checkFlag()) {
      addText("Uninfected!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      clearInterval(poisonMoveTimeout);
      poisonPosition = 0;
      poisonMoveTimeout = setInterval(() => {
        poisonPosition += 1;
        for (const tile of getAll()) {
          if (tile.y === poisonPosition) {
            tile.type = poison;
          }
          if (checkDeath()) {
            showDeathScreen();
          }
        }
      }, 450);
    } else {
      addText("Poison!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      // Level-specific code
    }
  } else if (level === 10) {
    if (checkFlag()) {
      addText("Clean!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      clearInterval(poisonMoveTimeout);
      poisonPosition = 0;
      poisonMoveTimeout = setInterval(() => {
        poisonPosition += 1;
        for (const tile of getAll()) {
          if (tile.x === poisonPosition || tile.y === poisonPosition) {
            tile.type = poison;
          }
          if (checkDeath()) {
            showDeathScreen();
          }
        }
      }, 700);
    } else {
      addText("Arsenic!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      // Level-specific code
    }
  } else if (level === 11) {
    if (checkFlag()) {
      addText("Prognosis\nNegative!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      clearInterval(poisonMoveTimeout);
      poisonPosition = 0;
      poisonMoveTimeout = setInterval(() => {
        poisonPosition += 1;
        for (const tile of getAll()) {
          if (tile.y === poisonPosition) {
            tile.type = poison;
          }
          if (checkDeath()) {
            showDeathScreen();
          }
        }
      }, 700);
      lavaPosition = 0;
    } else {
      addText("Toxins!", {
        color: color`6`,
        x: 0,
        y: 0,
      });
      // Level-specific code
    }
  } else if (level === 12) {
    if (checkFlag()) {
      addText("Almost there!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      level += 1;
      setMap(levels[level]);
      // Prepare for next level
      clearInterval(poisonMoveTimeout);
      poisonPosition = 0;
      poisonMoveTimeout = setInterval(() => {
        poisonPosition += 1;
        for (const tile of getAll()) {
          if (tile.x === poisonPosition) {
            tile.type = poison;
          }
          if (checkDeath()) {
            showDeathScreen();
          }
        }
      }, 600);
      lavaPosition = 0;
    } else {
      addText("Double Trouble!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      lavaPosition += 1;
      for (const tile of getAll()) {
        if (tile.x === lavaPosition) {
          tile.type = lava;
        }
      }
    }
  } else if (level === 13) {
    if (checkFlag()) {
      gameWon = true;
      showWinScreen();
    } else {
      addText("Double Trouble!", {
        color: color`5`,
        x: 0,
        y: 0,
      });
      // Level-specific code
      lavaPosition += 1;
      for (const tile of getAll()) {
        if (tile.y === lavaPosition) {
          tile.type = lava;
        }
      }
    }
  }

  if (checkDeath()) {
    showDeathScreen();
  }
}

animateTiles();

function checkFlag() {
  try {
    if (
      getFirst(player).x === getFirst(flag).x &&
      getFirst(player).y === getFirst(flag).y
    ) {
      return true;
    }
  } catch (e) {
    return false;
  }
  // Remove before sharing
  // if (cheat) {
  //   return true;
  // }
}

function checkDeath() {
  if (gameWon) {
    return false;
  }
  if (getFirst(player) === undefined) {
    return true;
  } else {
    for (const lavaTile of getAll(lava).concat(getAll(poison))) {
      if (
        lavaTile.x === getFirst(player).x &&
        lavaTile.y === getFirst(player).y
      ) {
        return true;
      }
    }
  }
}

function showDeathScreen() {
  clearText();
  const gameOverScreen = map`
llllllll
llllllll
llllllll
llllllll
llllllll
llllllll
llllllll`;
  setMap(gameOverScreen);
  addText("Game Over!", {
    color: color`0`,
    x: 4,
    y: 4,
  });
}

function showWinScreen() {
  clearText();
  const gameWinScreen = map`
oooooooo
oooooooo
oooooooo
oooooooo
oooooooo
oooooooo
oooooooo`;
  setMap(gameWinScreen);
  addText("You win!\n\nThanks for\nplaying!\n\nAlexis Martel,\nAugust 2023", {
    color: color`6`,
    x: 4,
    y: 4,
  });
}

let level = 0;
const levels = [
  map`
wwwwwwwwwww
wwwwwwwgggw
wwwwwwwgfgw
wwwwwwwgggw
wgggggwgggw
wggpggggggw
wggggggggww
wgggggwwwww
wwwgggwwwww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwww
wwgggggggggggwwwww
wwgggggggggggwwggw
wwgggggggggggggggw
wwgggggggggggggggw
wgggggggggfggggggw
wggggggggggggggggw
wgpgggggggggggggww
wgggggggggggggggww
wwwwggggggwwwwwwww
wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
wpggwwgggggggggggggggw
wwwggwgwwwwwwwwwwwwwww
wwwwgwgwggggggggggggww
wwwwgwgwwwwwwwwwwwwgww
wwwwgwgwwwwwwwwwwwwgww
wwwwgwgggggggggggwwgww
wwggggwwwwwwwwwwgwwgww
wwwwgwwwwwgggggwgwwgww
wwwwgwwwwwgwwwwwgwwgww
wwgwgwggggggggwwgwwgww
wwgwgwwgwgwwwgwwgwwgww
wwgggwwgwgwwwgwwggggww
wwgwwgwgwgwwwgwwgwwwww
wwgwwgwgwgwggggggwgwww
wwgwwgwgwgwgwgwwgwwwww
wwggggwwwgwgwgwwgggggw
wwwwwgggggwwwwwwwwwgfw
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wggggggggggw
wggggggggggw
wggggggggggw
wggggggggggw
wggggggggggw
wggggfgggggw
wggggggggggw
wggggggggggw
wggggggggggw
wpgggggggggw
wwwwwwwwwwww`,
  map`
wggggggggggggggggg
wggggggggggggggggw
wggggggggggggggggw
wggggggggggggggggw
wggggggggggggggggg
wggggggggggggggggw
wggggggggggggggggw
wggggggggggggggggw
wggggggggggggggggg
wggggggggggggggggw
wggggggggggggggggw
wggggggggggggggggw
wgpgfggggggggggggw
wggggggggggggggggw
wggggggggggggggggg
wwwwwwwwwwwwwwwwww`,
  map`
llllllllll
wggggggggw
wgwwwwwwww
wpgggggggw
wgwwwwwwww
wggggggggw
wgwwwwwwww
wggggggggw
wgwwwwwwww
wgggfggggw
wwwwwwwwww`,
  map`
lwwwwwwwwwww
lwwgwwwwwggg
lwggggggggfg
lwwgwwwwwggg
lwwgwwwwwwgw
lwwpgggggggw
lwwgwwwwwwgw
lwgggggggggw
lwwgwwwwwwgw
lwwwwwwwwwgw
lwwwwwwwwwww`,
  map`
lwwwwwwwwwwwwwwww
lwwwwwwwwgggggggw
lwwwwwwwwgwwwwggw
lwwwwwwggfwwwwpgw
lwwwwwwgwwggggggw
lwwwwwwggggwwwwww
lwwwwwwwwwwwwwwww`,
  map`
llllllllll
lwwwwwwwww
lwgggggggw
lwgggggggw
lwggpggggw
lwgggggggw
lwgggggggw
lwggggggfw
lwwwwwwwww`,
  map`
owwwwwwwwwwwwww
ogggggwwggggggw
oggpggwwggggggw
ogggggwwgwwgfgw
ogggggwwgwwgggw
ogggwgwwgwwgggw
oggggggggwwgggw
oggggggggwwgggw
owwwwwwwwwwwwww`,
  map`
oooooooooo
wggggggggw
wggggggggw
wgggpggggw
wwwwwwgggw
wggggggggw
wggggggggw
wggggggggw
wggggggggw
wggwwwwwww
wggggggggw
wggggggggw
wwwwwwgggw
wggggggggw
wggggggggw
wggwwwwwww
wgggggggfw
wwwwwwwwww`,
  map`
oooooooooooooooo
oggggggggggggggw
oggggggggggggggw
oggpgggggggggggw
oggggwgggggggggw
owwwwwgggggwgggw
oggggggggggwggfw
oggggggggggwgggw
oggggggggggwgggw
owwwwwwwwwwwwwww`,
  map`
ooooooooo
lgggggggw
lgggggggw
lpggggggw
lgggggfgw
lgggggggw
lwwwwwwww`,
  map`
olllllllllll
owwwwwwwwwww
owwwwwwwwwww
oggggggggggw
oggggggggggw
oggggggggggw
oggggggggggw
ogggwwwggggw
ogggwwwggggw
ogpgwwwfgggw
ogggwwwggggw
oggggggggggw
oggggggggggw
owwwwwwwwwww`,
];

setMap(levels[level]);
setPushables({
  [player]: [],
});

// Player movement
onInput("w", () => {
  getFirst(player).y -= moveIncrement;
});
onInput("a", () => {
  getFirst(player).x -= moveIncrement;
});
onInput("s", () => {
  getFirst(player).y += moveIncrement;
});
onInput("d", () => {
  getFirst(player).x += moveIncrement;
});

// Flag movement
onInput("w", () => {
  getFirst(flag).y -= flagMoveIncrement;
});
onInput("a", () => {
  getFirst(flag).x -= flagMoveIncrement;
});
onInput("s", () => {
  getFirst(flag).y += flagMoveIncrement;
});
onInput("d", () => {
  getFirst(flag).x += flagMoveIncrement;
});

onInput("l", () => {
  cheat = true;
});

// Fire game logic on user input
afterInput(() => {
  if (!gameWon) {
    logic();
  }
  cheat = false;
});

// Fire animation on interval
let animationInterval = setInterval(animateTiles, 500);
w
