/*
@title: prison break
@author: emily liu
@tags: []
@addedOn: 2024-00-00
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

// objects
const player = "p"
const flag = "f"
const wall = "w"
const horwall = "h"
const button = "b"
const monster = "m"
const racemonster = "r"

setLegend(
  [ player, bitmap`
....0000000.....
....0202020.....
....0000000.....
....0666660.....
....0606060.....
....0666660.....
....0000000.....
.....02220......
...000000000....
.....02220......
.....00000......
.....02220......
.....00000......
......0.0.......
................
................` ],
  [ flag, bitmap`
................
................
................
....0...........
....03333.......
....03333333....
....03333333....
....03333333....
....0...3333....
....0...........
....0...........
....0...........
....0...........
................
................
................`],
  [ wall, bitmap`
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL
LLLL.........LLL
LLLLLLLLLLLLLLLL
LLLL.........LLL`],
  [ horwall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
..L..L..L..L..L.
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ button, bitmap`
................
................
................
................
................
................
................
.....333333.....
.....333333.....
.....333333.....
.....333333.....
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
................
................`],
  [ monster, bitmap`
.....555555.....
.....555555.....
.....555555.....
....00000000....
....06666660....
....06066060....
....06666660....
....00000000....
.....555555.....
...0055555500...
...0.555555.0...
...0055555500...
.....555555.....
.....555555.....
......0..0......
.....00..00.....`],
  [ racemonster, bitmap`
.....555555.....
.....555555.....
.....555555.....
....00000000....
....06666660....
....06066060....
....06666660....
....00000000....
.....555555.....
...0055555500...
...0.555555.0...
...0055555500...
.....555555.....
.....555555.....
......0..0......
.....00..00.....`],
);

setSolids([ player, wall, horwall, racemonster ]);

// maps
let level = 0
const levels = [
  map`
pw...wf
.w.w.w.
.w.w.w.
.w.w.w.
.w.w.w.
.w.w.w.
.w.w.w.
...w...`,
  map`
...fw.w
.hhhw.w
....w..
hhh...w
.pwhh.w
.hh....
....hh.
.hhh...`,
  map`
pw...
.wf..
.whh.
.w...
bwhhh`,
  map`
f........
hhhhhh.w.
hhhhhh.w.
w....w.hh
w.w.ww...
w.w.w.hh.
hhw.w..w.
bpw.hh.w.
hmw......`,
  map`
.hhhhhhhh
.w.w...pw
...hh.w.w
hh..wbw.w
.wh.whwmw
..w.w.hhh
w...w...f
hhh...hhh`,
  map`
m.hhhh.......
.h.....hhh.hh
p..whhhh.....
hh.w.....hhh.
...whhh.w.w..
.w..w.w.w.ww.
.w.hh.w....wh
.w....hhhh.w.
hw.whh.hhh.w.
...w.......w.
.hhf.hhhhh...`,
  map`
hhhhhhhhhhh
p...wbw...f
hhh.w.whhh.
....w.w....
.hhhw.whhh.
......w....
hhhhhhwhhh.`,
  map`
.....f.....
.whhhwhhhw.
.w...w...w.
...w.w.w...
hhhw.w.whhh
...w.w.w...
pw...w...wr`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: []
});

// actions
let isGameOver = false;
onInput("s", () => {
  if (!isGameOver) {
    getFirst(player).y += 1;
  }
});
onInput("w", () => {
  if (!isGameOver) {
    getFirst(player).y -= 1;
  }
});
onInput("d", () => {
  if (!isGameOver) {
    getFirst(player).x += 1;
  }
});
onInput("a", () => {
  if (!isGameOver) {
    getFirst(player).x -= 1;
  }
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    isGameOver = false;
    isMonsterMoving = true;
    moveCount = 0;
    isMonsterPresent = false;
  }
});

const moveSpriteImpl = (tLevel, sprite, newX, newY) => {
    if (level == tLevel) {
      sprite.x = newX;
      sprite.y = newY;
    }
};

// ending
const moveSpriteAfterDelay = (targetLevel, sprite, newX, newY, delay) => {
  setTimeout(moveSpriteImpl.bind(this, targetLevel, sprite, newX, newY), delay); // Specify the delay in milliseconds
};

let moveCount = 0;
let isMonsterMoving = true;
const moveMonster = () => {
  if(!isMonsterMoving) {
    return;
  }
  if(level == 3) {
    level3();
  } else if(level == 4) {
    level4();
  } else if(level == 5) {
    level5();
  } else if(level == 7) {
    level7();
  }
};

const monsterCatch = () => {
  if(getFirst(player).x == getFirst(monster).x && getFirst(player).y == getFirst(monster).y) {
    addText("you lost", { y: 4, color: color`3`});
    addText("reset to try again", { y: 6, color: color`3`});
    isMonsterMoving = false;
    isGameOver = true;
  }
  if(getFirst(monster).x == getFirst(flag).x && getFirst(monster).y == getFirst(flag).y) {
    addText("you lost", { y: 4, color: color`3`});
    addText("reset to try again", { y: 6, color: color`3`});
    isMonsterMoving = false;
    isGameOver = true;
  }
};

const monsterWin = () => {
  if(getFirst(racemonster).x == getFirst(flag).x && getFirst(racemonster).y == getFirst(flag).y) {
    addText("you lost", { y: 4, color: color`3`});
    addText("reset to try again", { y: 6, color: color`3`});
    isMonsterMoving = false;
    isGameOver = true;
  }
};

const level3 = () => {
  let mons = getFirst(monster);
  if (!isMonsterMoving) {
    return;
  }
  if (moveCount < 5) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 500);
  } else if (moveCount < 7) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 500);
  } else if (moveCount < 12) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 500);
  } else if (moveCount < 17) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 500);
  } else if (moveCount < 21) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 500);
  } else if (moveCount < 23) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 500);
  } else if (moveCount < 27) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 500);
  } else if (moveCount < 33) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 500);
  }
  moveCount += 1;
  setTimeout(monsterCatch, 505);
  if (moveCount < 33) {
    setTimeout(moveMonster, 505); // Recursive call to continue movement
  }
};

const level4 = () => {
  let mons = getFirst(monster);
  if (!isMonsterMoving) {
    return;
  }
  if (moveCount < 3) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 500);
  } else if(moveCount < 8) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 500);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 500);
  } else if(moveCount <11) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 500);
  } else if(moveCount < 15) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 500);
  } else if(moveCount < 17) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 500);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 500);
  } else if(moveCount < 22) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 500);
  }
  moveCount += 1;
  setTimeout(monsterCatch, 505);
  if (moveCount < 22) {
    setTimeout(moveMonster, 505); // Recursive call to continue movement
  }
};

const level5 = () => {
  let mons = getFirst(monster);
  if (!isMonsterMoving) {
    return;
  }
  if (moveCount < 2) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 4) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 5) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 300);
  } else if(moveCount <9) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 300);
  } else if(moveCount < 14) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 16) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 300);
  } else if(moveCount < 19) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 20) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 300);
  } else if(moveCount < 23) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 26) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 300);
  } else if(moveCount < 29) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 35) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 300);
  } else if(moveCount < 36) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 300);
  } else if(moveCount < 37) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 300);
  }
  moveCount += 1;
  setTimeout(monsterCatch, 305);
  if (moveCount < 37) {
    setTimeout(moveMonster, 305); // Recursive call to continue movement
  }
};

const level7 = () => {
  let mons = getFirst(racemonster);
  if (moveCount < 1) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 200);
  } else if(moveCount < 3) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 200);
  } else if(moveCount < 4) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 200);
  } else if(moveCount < 6) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 200);
  } else if(moveCount < 10) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 200);
  } else if(moveCount < 12) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 200);
  } else if(moveCount < 13) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y + 1, 200);
  } else if(moveCount < 15) {
    moveSpriteAfterDelay(level, mons, mons.x + 1, mons.y, 200);
  } else if(moveCount < 18) {
    moveSpriteAfterDelay(level, mons, mons.x, mons.y - 1, 200);
  } else if(moveCount < 23) {
    moveSpriteAfterDelay(level, mons, mons.x - 1, mons.y, 200);
  }
  moveCount += 1;
  setTimeout(monsterWin, 205);
  if (moveCount < 23) {
    setTimeout(moveMonster, 205); // Recursive call to continue movement
  }
};

let isMonsterPresent = false; 

afterInput(() => {
  const playerPosition = getFirst(player);
  const playerX = playerPosition.x;
  const playerY = playerPosition.y;
  
  if (tilesWith(flag, player).length == 1) {
    isMonsterMoving = false;
    isMonsterPresent = false;
    
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
    
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
      isGameOver = false;
      isMonsterMoving = false;
      moveCount = 0;
      isMonsterPresent = false;
    } else {
      addText("you win!", { y: 4, color: color`3` });
      isGameOver = true;
    }
    return;
  }

  if(level == 2) {
    if(tilesWith(button, player).length == 1) {
      clearTile(1,3);
    }
  }

  if(level == 3) {
    if(tilesWith(button, player).length == 1) {
      clearTile(1,6);
    }
    if(isMonsterPresent) {
      return;
    }
    // monster will chase after (1,3)
    if(playerX == 1 && playerY == 3) {
      // Start the movement of the monster
      isMonsterMoving = true;
      moveMonster();
      isMonsterPresent = true;
    }
  }

  if(level == 4) {
    if(tilesWith(button, player).length == 1) {
      clearTile(3,1);
    }
    if (isMonsterPresent) {
      return;
    }
    if(playerX == 6 && playerY == 1) {
      // Start the movement of the monster
      isMonsterMoving = true;
      moveMonster();
      isMonsterPresent = true;
    }
  }

  if(level == 5) {
    if (isMonsterPresent) {
      return;
    }
    if(playerX == 2 && playerY == 2) {
      // Start the movement of the monster
      isMonsterMoving = true;      
      moveMonster();
      isMonsterPresent = true;
    }
  }

  if(level == 6) {
    if(tilesWith(button, player).length == 1) {
      clearTile(6,5);
    }
  }

  if(level == 7) {
    if (isMonsterPresent) {
      return;
    }
    if(playerX == 0 && playerY == 5) {
      isMonsterMoving = true;
      moveMonster();
      isMonsterPresent = true;
    }
  }
});