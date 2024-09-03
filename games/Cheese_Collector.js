/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Cheese Collector
@author: Sonya
@tags: []
@addedOn: 2024-09-03
*/

const leftPlayer = "p";
const rightPlayer = "d"
const leftWhiteCat = "w";
const rightWhiteCat = "a";
const leftOrangeCat = "o";
const rightOrangeCat = "q";
const leftBlackCat = "u";
const rightBlackCat = "t"
const leftCalicoCat = "i";
const rightCalicoCat = "g";

const cheese = "c";
const safe = "s";
const key = "k";
const home = "h";

const redSafe = "r";
const blueSafe = "n";
const redKey = "l";
const blueKey = "y";

const milk = "m";
const emptyBowl = "e";
const fullBowl = "f";

const floor = "z";


setLegend(
  [leftPlayer, bitmap`
................
................
................
..LL....LL......
.L88LLLL88L.....
.L8L1111L8L.....
..L011101L......
..L181111L......
..L1111111L.....
...L111L11L.....
..L111L111L.....
..L1L1L1L1L.....
...L111L11L.....
...L111111L.....
...L111111L88...
...88LL88L..8888`],
  [rightPlayer, bitmap`
................
................
................
......LL....LL..
.....L88LLLL88L.
.....L8L1111L8L.
......L101110L..
......L111181L..
.....L1111111L..
.....L11L111L...
.....L111L111L..
.....L1L1L1L1L..
.....L11L111L...
.....L111111L...
...88L111111L...
8888..L88LL88...`],
  [leftWhiteCat, bitmap`
................
................
................
.00.....00......
.010...010......
.011000110......
02111112210..00.
01111111220..010
01711171220..010
02111112220.0110
.02222222000110.
..033633322110..
..02222222220...
..02222222220...
..01010001010...
...0.0...0.0....`],
  [rightWhiteCat, bitmap`
................
................
................
......00.....00.
......010...010.
......011000110.
.00..01221111120
010..02211111110
010..02217111710
0110.02221111120
.01100022222220.
..011223336330..
...02222222220..
...02222222220..
...01010001010..
....0.0...0.0...`],
  [leftOrangeCat, bitmap`
................
................
................
.00.....00......
.090...0C0......
.099000CC0......
09999999CC0..00.
09999999990..090
0C9099099C0..0C0
099099099C0.C990
.C99999990009C0.
..000000099990..
..09999999990...
..0999CCC9990...
..09090009090...
...0.0...0.0....`],
  [rightOrangeCat, bitmap`
................
................
................
......00.....00.
......0C0...090.
......0CC000990.
.00..0CC99999990
090..09999999990
0C0..0C9909909C0
099C.0C990990990
.0C90009999999C.
..099990000000..
...09999999990..
...0999CCC9990..
...09090009090..
....0.0...0.0...`],
  [leftBlackCat, bitmap`
................
................
................
.00.....00......
.0L0...0L0......
.0LL000LL0......
0LLLLLLLLL0..00.
0LLLLLLLLL0..0L0
0L6LLL6LLL0..0L0
0LLLLLLLLL0.0LL0
.0LLLLLLL000LL0.
..00000000LLL0..
..0LLLLLLLLL0...
..0LLLLLLLLL0...
..0L0L000L0L0...
...0.0...0.0....`],
  [rightBlackCat, bitmap`
................
................
................
......00.....00.
......0L0...0L0.
......0LL000LL0.
.00..0LLLLLLLLL0
0L0..0LLLLLLLLL0
0L0..0LLL6LLL6L0
0LL0.0LLLLLLLLL0
.0LL000LLLLLLL0.
..0LLL00000000..
...0LLLLLLLLL0..
...0LLLLLLLLL0..
...0L0L000L0L0..
....0.0...0.0...`],
  [leftCalicoCat, bitmap`
................
................
................
.00.....00......
.010...090......
.011000990......
01112299990..00.
01122229990..020
02722272220..090
02222222220.0290
.02222222000220.
..000000021110..
..02299922210...
..02222222220...
..02020002020...
...0.0...0.0....`],
  [rightCalicoCat, bitmap`
................
................
................
......00.....00.
......090...010.
......099000110.
.00..09999221110
020..09992222110
090..02227222720
0920.02222222220
.02200022222220.
..011120000000..
...01222999220..
...02222222220..
...02020002020..
....0.0...0.0...`],
  [cheese, bitmap`
................
..........CC....
........CC66C...
......CC6FF66C..
....CC666FF666C.
..CC6666666666CC
.C66F666CCCCCC6C
CCCCCCCC6666666C
C6666666666FF66C
.C666666666FF66C
..C66FF66666666C
.C666FF6666666C.
C6666666666CCC..
C6F66666CCC.....
.C666CCC........
..CCC...........`],
  [safe, bitmap`
..000000000000..
.01111111111110.
0LLLLLLLLLLLLL10
0LLL00000000LL10
0LL0LLLLLLLL0L10
0LL1LLLLLLLL0L10
0LL1LLLLL11L0L10
0LL0LLLL1L010L10
0LL0LLLL1L010L10
0LL1LLLLL11L0L10
0LL1LLLLLLLL0L10
0LL0LLLLLLLL0L10
0LLL00000000LL10
0LLLLLLLLLLLLL10
.0LLLLLLLLLLLL0.
..000000000000..`],
  [key, bitmap`
................
................
................
................
..FFF...........
.F666F..........
F6F.F6FFFFFFFFF.
F6...6666666666F
F6F.F6FFFFF66F6F
.F666F.....FF.F.
..FFF...........
................
................
................
................
................`],
  [home, bitmap`
................
................
................
.....000000.....
...00C1CC1C00...
...01C1CC1C10...
...01C1CC1C1C0..
..001C1CC1C1C0..
..0C1C1CC1C1C0..
..0C1C1CC166C0..
..0C1C1CC166C0..
..0C1C1CC1C1C0..
..0C1C1CC1C1C0..
..0C1C1CC1C1C0..
..0C1C1CC1C1C0..
...0000000000...`],
  [redSafe, bitmap`
..000000000000..
.03333333333330.
0333333333333330
0333000000003330
0330333333330330
0331333333330330
0331333331130330
033033331L010330
033033331L010330
0331333331130330
0331333333330330
0330333333330330
0333000000003330
0333333333333330
.03333333333330.
..000000000000..`],
  [blueSafe, bitmap`
..000000000000..
.07777777777770.
0777777777777770
0777000000007770
0770777777770770
0771777777770770
0771777771170770
077077771L010770
077077771L010770
0771777771170770
0771777777770770
0770777777770770
0777000000007770
0777777777777770
.07777777777770.
..000000000000..`],
  [redKey, bitmap`
................
................
................
................
..000...........
.03330..........
030.03000000000.
03...33333333330
030.030000033030
.03330.....00.0.
..000...........
................
................
................
................
................`],
  [blueKey, bitmap`
................
................
................
................
..000...........
.07770..........
070.07000000000.
07...77777777770
070.070000077070
.07770.....00.0.
..000...........
................
................
................
................
................`],
  [milk, bitmap`
................
.....000000.....
....05757570....
....05757570....
.....011110.....
....01111110....
....02222220....
...0222222220...
...0227222720...
...0227727720...
...0227272720...
...0227222720...
...0227222720...
...0222222220...
....02222220....
.....000000.....`],
  [emptyBowl, bitmap`
................
................
................
................
................
................
................
................
.....888888.....
...8811111188...
..811111111118..
..888111111888..
..888888888888..
.88888888888888.
.88888888888888.
8888888888888888`],
  [fullBowl, bitmap`
................
................
................
................
................
................
................
................
.....888888.....
...8822222288...
..822222222228..
..888222222888..
..888888888888..
.88888888888888.
.88888888888888.
8888888888888888`],
  [floor, bitmap`
CCCCCCCCCCCCCCCC
C999999CC999999C
CCCCCCCCCCCCCCCC
C9999C9999C9999C
CCCCCCCCCCCCCCCC
C999999CC999999C
CCCCCCCCCCCCCCCC
C9999C9999C9999C
CCCCCCCCCCCCCCCC
C999999CC999999C
CCCCCCCCCCCCCCCC
C9999C9999C9999C
CCCCCCCCCCCCCCCC
C999999CC999999C
CCCCCCCCCCCCCCCC
C9999C9999C9999C`],
);

setSolids([leftPlayer, rightPlayer, cheese]);

let level = 0;
const levels = [
  map`
.....
...c.
...w.
.....
hd...`,
  map`
.....h
......
.k....
......
....ws
d.....`,
  map`
tkq..e
.g....
...s..
...w..
......
d.h..m`,
  map`
lw.d..ty
........
........
........
...i....
.n.hh.r.`,
  map`
k...d...k
t.......w
....q....
...h.h...
....i..o.
.cg....s.
.........`
]

setMap(levels[level]);

setBackground(floor);

setPushables({
  [leftPlayer] : [cheese],
  [rightPlayer] : [cheese]
});

// player movement
var player = rightPlayer;

// move up
onInput("w", () => {
  getFirst(player).y -= 1;
});

// move down
onInput("s", () => {
  getFirst(player).y += 1;
});

// move left
onInput("a", () => {
  const x = getFirst(player).x;
  const y = getFirst(player).y;
  if (player == leftPlayer) {
    getFirst(player).x -= 1;
  } else if (x > 0 && getTile(x - 1, y).length == 0) {
    getFirst(player).remove();
    player = leftPlayer;
    addSprite(x - 1, y, player);
  } else {
    getFirst(player).remove();
    player = leftPlayer;
    addSprite(x, y, player);
  }
});

// move right
onInput("d", () => {
  const x = getFirst(player).x;
  const y = getFirst(player).y;
  if (player == rightPlayer) {
    getFirst(player).x += 1;
  } else if (x < width() - 1 && getTile(x + 1, y).length == 0) {
    getFirst(player).remove();
    player = rightPlayer;
    addSprite(x + 1, y, player);
  } else {
    getFirst(player).remove();
    player = rightPlayer;
    addSprite(x, y, player);
  }
});

// when the player presses "l", it will unlock the safe or fill the milk, depending on the situation
onInput("l", () => {
  if (level == 1) {
    unlockSafe();
  } else if (level == 2) {
    unlockSafe();
    attractCat();
  } else if (level == 3) {
    unlockRedSafe();
    unlockBlueSafe();
  } else {
    unlockSafe();
  }
});

// restart
onInput("j", () => {
  restart();
});

// cat animation
// level 1
function catMovement1() {
  const cat = getFirst(leftWhiteCat);
  const horizontalInterval = setInterval(() => {
    if (cat.x > 0) {
      cat.x--;
      checkDeath();
    } else {
      cat.x = width() - 1;
      checkDeath();
    }
  }, 500);
}

// level 2
function catMovement2() {
  const cat = getFirst(leftWhiteCat);
  const verticalInterval = setInterval(() => {
    if (cat.y > 0) {
      cat.y--;
      checkDeath();
    } else {
      cat.y = height() - 1;
      checkDeath();
    }
  }, 350);
}

// level 3
function catMovement3() {
  const cat = getFirst(leftWhiteCat);

  let step = 0;

  const moveInterval = setInterval(() => {
    switch (step) {
      case 0:
        cat.x--;
        if (cat.x <= 2) {
          step = 1;
        }
        break; // loop
      case 1:
        cat.y--;
        if (cat.y <= 1) {
          step = 2;
        }
        break;
      case 2:
        cat.x++;
        if (cat.x >= 4) {
          step = 3;
        }
        break;
      case 3:
        cat.y++;
        if (cat.y >= 3) {
          step = 0;
        }
        break;
    }
    checkDeath(); // after every case
  }, 600);
}

// level 4
function whiteCatMovement4() {
  const cat = getFirst(leftWhiteCat);
  const verticalInterval = setInterval(() => {
    if (cat.y < height() - 2) {
      cat.y++;
      checkDeath();
    } else {
      cat.y = 0;
      checkDeath();
    }
  }, 400);
}

function blackCatMovement4() {
  const cat = getFirst(rightBlackCat);
  const verticalInterval = setInterval(() => {
    if (cat.y < height() - 2) {
      cat.y++;
      checkDeath();
    } else {
      cat.y = 0;
      checkDeath();
    }
  }, 400);
}

function calicoCatMovement4() {
  const cat = getFirst(leftCalicoCat);
  const horizontalInterval = setInterval(() => {
    if (cat.x > 0) {
      cat.x--;
      checkDeath();
    } else {
      cat.x = width() - 1;
      checkDeath();
    }
  }, 350);
}


// level 5
function blackCatMovement5() {
  const cat = getFirst(rightBlackCat);
  const horizontalInterval = setInterval(() => {
    if (cat.x < width() - 1) {
      cat.x++;
      checkDeath();
    } else {
      cat.x = 0;
      checkDeath();
    }
  }, 400);
}

function whiteCatMovement5() {
  const cat = getFirst(leftWhiteCat);
  const horizontalInterval = setInterval(() => {
    if (cat.x > 0) {
      cat.x--;
      checkDeath();
    } else {
      cat.x = width() - 1;
      checkDeath();
    }
  }, 400);
}

function doorOrangeCatMovement5() {
  const cat = getFirst(rightOrangeCat);
  let step = 0;

  const movementInterval = setInterval(() => {
    switch (step) {
      case 0:
        cat.x++;
        if (cat.x >= 6) {
          step = 1;
        }
        break;
      case 1:
        cat.y++;
        if (cat.y >= 4) {
          step = 2;
        }
        break;
      case 2:
        cat.x--;
        if (cat.x <= 2) {
          step = 3;
        }
        break;
      case 3:
        cat.y--;
        if (cat.y <= 2) {
          step = 0;
        }
        break;
    }
    checkDeath();
  }, 350);

}

function safeOrangeCatMovement5() {
  const cat = getFirst(leftOrangeCat);
  const verticalInterval = setInterval(() => {
    if (cat.y > 0) {
      cat.y--;
      checkDeath();
    } else {
      cat.y = height() - 1;
      checkDeath();
    }
  }, 400);
}

function doorCalicoCatMovement5() {
  const cat = getFirst(leftCalicoCat);
  const horizontalInterval = setInterval(() => {
    if (cat.x > 0) {
      cat.x--;
      checkDeath();
    } else {
      cat.x = width() - 1;
      checkDeath();
    }
  }, 450);

}

function cheeseCalicoCatMovement5() {
  const cat = getFirst(rightCalicoCat);
  const verticalInterval = setInterval(() => {
    if (cat.y > 0) {
      cat.y--;
      checkDeath();
    } else {
      cat.y = height() - 1;
      checkDeath();
    }
  }, 300);
}

// start with level 1
if (level == 0) {
  catMovement1();
}


// restart the level
function restart() {
  player = rightPlayer;
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
  catLevelMovement();
}

// if the player collides with the cat, the level restarts
function checkDeath() {
  // white cat
  if (getFirst(leftWhiteCat)) {
    const whiteCats = getAll(leftWhiteCat);
    whiteCats.forEach(function (whiteCat) {
      if (getFirst(player) && getFirst(player).x == whiteCat.x && getFirst(player).y == whiteCat.y) {
        restart();
      }
    });
  }

  if (getFirst(rightWhiteCat)) {
    const whiteCats = getAll(rightWhiteCat);
    whiteCats.forEach(function (whiteCat) {
      if (getFirst(player) && getFirst(player).x == whiteCat.x && getFirst(player).y == whiteCat.y) {
        restart();
      }
    });
  }

  // orange cat
  if (getFirst(leftOrangeCat)) {
    const orangeCats = getAll(leftOrangeCat);
    orangeCats.forEach(function (orangeCat) {
      if (getFirst(player) && getFirst(player).x == orangeCat.x && getFirst(player).y == orangeCat.y) {
        restart();
      }
    });
  }
  
  if (getFirst(rightOrangeCat)) {
    const orangeCats = getAll(rightOrangeCat);
    orangeCats.forEach(function (orangeCat) {
      if (getFirst(player) && getFirst(player).x == orangeCat.x && getFirst(player).y == orangeCat.y) {
        restart();
      }
    });
  }

  // black cat
  if (getFirst(leftBlackCat)) {
    const blackCats = getAll(leftBlackCat);
    blackCats.forEach(function (blackCat) {
      if (getFirst(player) && getFirst(player).x == blackCat.x && getFirst(player).y == blackCat.y) {
        restart();
      }
    });
  }

  if (getFirst(rightBlackCat)) {
    const blackCats = getAll(rightBlackCat);
    blackCats.forEach(function (blackCat) {
      if (getFirst(player) && getFirst(player).x == blackCat.x && getFirst(player).y == blackCat.y) {
        restart();
      }
    });
  }


  // calico cat
  if (getFirst(leftCalicoCat)) {
    const calicoCats = getAll(leftCalicoCat);
    calicoCats.forEach(function (calicoCat) {
      if (getFirst(player) && getFirst(player).x == calicoCat.x && getFirst(player).y == calicoCat.y) {
        restart();
      }
    });
  }

  if (getFirst(rightCalicoCat)) {
    const calicoCats = getAll(rightCalicoCat);
    calicoCats.forEach(function (calicoCat) {
      if (getFirst(player) && getFirst(player).x == calicoCat.x && getFirst(player).y == calicoCat.y) {
        restart();
      }
    });
  }
}

// key
var hasKey = false;
var numOfKey = 0;
// get the key
function getKey() {
  if (tilesWith(key, player).length > 0 && level != 4) {
    getFirst(key).remove();
    hasKey = true;

    // there are 2 keys in level 5. use clearTile() functon to remove the key sprite
  } else if (level == 4) {
    const playerX = getFirst(player).x;
    const playerY = getFirst(player).y;
    const previousPlayer = player;
    if (playerX == width() - 1 && playerY == 0 || playerX == 0 && playerY == 0) {
      numOfKey++;
      clearTile(playerX, playerY);
      addSprite(playerX, playerY, previousPlayer);

      // if player gets 2 keys, then they can unlock the safe
      if (numOfKey == 2) {
        hasKey = true;
      }
    }
  }
}

// replace the safe with cheese
function unlockSafe() {
  const x = getFirst(safe).x;
  const y = getFirst(safe).y;
  
  if (hasKey && tilesWith(player, safe).length > 0) {
    getFirst(safe).remove();
    addSprite(x, y, cheese);
  }
}


// get the red key
var hasRedKey = false;
function getRedKey() {
  if (tilesWith(redKey, player).length > 0) {
    getFirst(redKey).remove();
    hasRedKey = true;
  }
}

// replace the red safe with cheese
function unlockRedSafe() {
  const redSafeSprite = getFirst(redSafe);

  if (redSafeSprite) {
    const x = redSafeSprite.x;
    const y = redSafeSprite.y;
    
    if (hasRedKey && tilesWith(player, redSafe).length > 0) {
      redSafeSprite.remove();
      addSprite(x, y, cheese);
    }
  }
}


// get the blue key
var hasBlueKey = false;
function getBlueKey() {
  if (tilesWith(blueKey, player).length > 0) {
    getFirst(blueKey).remove();
    hasBlueKey = true;
  }
}

// replace the blue safe with cheese
function unlockBlueSafe() {
  const blueSafeSprite = getFirst(blueSafe);

  if (blueSafeSprite) {
    const x = blueSafeSprite.x;
    const y = blueSafeSprite.y;
    
    if (hasBlueKey && tilesWith(player, blueSafe).length > 0) {
      blueSafeSprite.remove();
      addSprite(x, y, cheese);
    }
  }

}



// check if player has milk
var hasMilk = false;
function getMilk() {
  if (tilesWith(milk, player).length > 0) {
    getFirst(milk).remove();
    hasMilk = true;
  }
}

// when the player fills the bowl, orange cat will get distracted and walk toward to the bowl
var milkInBowl = false;
function attractCat() {
  const emptyBowlSprite = getFirst(emptyBowl);
  if (emptyBowlSprite) {
    const x = emptyBowlSprite.x;
    const y = emptyBowlSprite.y;
    if (hasMilk && tilesWith(player, emptyBowl).length > 0) {
     emptyBowlSprite.remove();
      addSprite(x, y, fullBowl);
  
      let cat = getFirst(rightOrangeCat);
      const horizontalInterval = setInterval(() => {
        if (cat.x < width() - 2) {
          cat.x++;
          checkDeath();
        }
      }, 500);
    }

  }
}

// the cat's movement based on level
function catLevelMovement() {
  if (level == 0) {
    catMovement1();
  } else if (level == 1) {
    catMovement2();
  } else if (level == 2) {
    catMovement3();
  } else if (level == 3) {
    whiteCatMovement4();
    blackCatMovement4();
    calicoCatMovement4();
  } else if (level == 4) {
    blackCatMovement5();
    whiteCatMovement5();
    doorOrangeCatMovement5();
    safeOrangeCatMovement5();
    doorCalicoCatMovement5();
    cheeseCalicoCatMovement5();
  }

}

// after input
afterInput(() => {
  checkDeath();
  getKey();
  getMilk();
  getRedKey();
  getBlueKey();
  // count the number of tiles with home
  const numberOfCheese = tilesWith(home).length;
  
  
  // count the number of tiles with cheese and home
  const cheeseAtHome = tilesWith(cheese, home).length;
  
  if (numberOfCheese == cheeseAtHome) {
    level++;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      player = rightPlayer;
      hasKey = false;
      hasMilk = false;

      catLevelMovement();
      
    } else {
      addText("You win!", { y: 6, color: color`D` });
    }
    
  }  
});
