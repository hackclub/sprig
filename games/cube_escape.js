/*
@title: cube_escape
@author: marios_mitsios
@tags: ['puzzle']
@addedOn: 2023-01-07
*/

// !!! README !!!
//
// How to play.
// Press WASD to move.
// Press L to shoot a bullet to the right.
// Press J to shoot a bullet to the left.
// Shooting brown box and enemies, removes them.
// Navigate to the gray warp portal to change to the next level.
// Navigate to the red warp portal to change tp the previous level.
// Navigate to the green warp portal to restart the current level.
// If you touch the enemy ( green cube officer ) on any side you will lose 1 hp.
// If your hp reaches 0 you restart.
// You can touch the key item to unlock locked walls, after losing 1 hp you will lose the key.
//
// Changelog
// YYYY-MM-DD CHANGELOG TEMPLATE
// 2023-01-23 Added Slow Motion.
//
// Slow Motion Support
// Set this to true if you are planning to make the game run in "slow motion".
// Basically, it will loop *after* the player moves.
const slowMode = false;

// Text per Level
const textResources = [
  {
    "level": 5,
    "txt": "You escaped,\nor did you?",
    "options": {
      x: 2,
      y: 7,
      color: color`3`
    }
  },
  {
    "level": 7,
    "txt": "Take THIS\nIts Dangerous \nto go alone!",
    "options": {
      x: 3,
      y: 5,
      color: color`6`
    }
  },
  {
    "level": 8,
    "txt": "STAFF\nOFFICES",
    "options": {
      x: 10,
      y: 2,
      color: color`3`
    }
  },
  {
    "level": 8,
    "txt": "The officies\nwill surely\nhave a way\nto escape!",
    "options": {
      x: 7,
      y: 10,
      color: color`4`
    }
  },
  {
    "level": 9,
    "txt": "STOP RIGHT\nTHERE!\n\nFREEZE!",
    "options": {
      x: 5,
      y: 6,
      color: color`3`
    }
  },
  {
    "level": 10,
    "txt": "That was it?",
    "options": {
      x: 6,
      y: 7,
      color: color`4`
    }
  },
]

// Variables
const BULLET_SPEED = 1
const TICK = 75
let hasKey = false;

// Initialization
const player = "p";
const enemy = "e";
const bullet = "b";
const flipBullet = "f";
const wall = "w";
const key = "k";
const lockedWall = "j";
const unbreakableWall = "u";
const warpHole = "h";
const backHole = "o";
const restartHole = "r";
const txtLife = "t";
const txtLevel = "l";
const txtI = "1";
const txtII = "2";
const txtIII = "3";
const txtIV = "4";
const txtV = "5";
const txtErr = "g";
let lives = 3;

setLegend(
  [ player, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL112311112311LL
LL112311112311LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ enemy, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD444444444444DD
DD44C3C44C3C44DD
DD4433C4433C44DD
DD44C3344C3344DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DD444444444444DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ bullet, bitmap`
................
................
................
................
................
................
....LLLLLL......
....LLLLLL1.....
....LLLLL11.....
....LLL111......
................
................
................
................
................
................`],
  [ flipBullet, bitmap`
................
................
................
................
................
................
......LLLLLL....
.....LLLLLL1....
.....LLLLL11....
......LLL111....
................
................
................
................
................
................`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC99CC9999CC99CC
CC9CCC9999CCC9CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC99CC9999CC99CC
CC99CC9999CC99CC
CC99CC9999CC99CC
CC99CC9999CC99CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC9CCC9999CCC9CC
CC99CC9999CC99CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ lockedWall, bitmap`
LLLLLLLLLLLLLLLL
LLLCCCCCCCCCCLLL
LLLLCC9999CCLLLL
LCLLLC9999CLLLCL
LCCLLLCCCCLLLCCL
LCCCLLLLLLLLCCCL
LC99CLLL6LLC99CL
LC99CCL66LCC99CL
LC99CCL66LCC99CL
LC99CLL6LLLC99CL
LCCCLLLLLLLLCCCL
LCCLLLCCCCLLLCCL
LCLLLC9999CLLLCL
LLLLCC9999CCLLLL
LLLCCCCCCCCCCLLL
LLLLLLLLLLLLLLLL`],
  [ unbreakableWall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL11L111111L11LL
LL1LLL1111LLL1LL
LLLLLLLLLLLLLLLL
LL1LLLLLLLLLL1LL
LL11LLLLLLLL11LL
LL11LL1111LL11LL
LL11LL1111LL11LL
LL11LL1111LL11LL
LL1LLLLLLLLLL1LL
LLLLLLLLLLLLLLLL
LL1LLL1111LLL1LL
LL11L111111L11LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ warpHole, bitmap`
................
....00000000....
...0000000000...
..000LLLLLL000..
.000LLLLLLLL000.
.00LLL1111LLL00.
.00LL11LL11LL00.
.00LL1LLLL1LL00.
.00LL1LLLL1LL00.
.00LL11LL11LL00.
.00LLL1111LLL00.
.000LLLLLLLL000.
..000LLLLLL000..
...0000000000...
....00000000....
................` ],
  [ backHole, bitmap`
................
....CCCCCCCC....
...CCCCCCCCCC...
..CCC333333CCC..
.CCC33333333CCC.
.CC3339999333CC.
.CC3399339933CC.
.CC3393333933CC.
.CC3393333933CC.
.CC3399339933CC.
.CC3339999333CC.
.CCC33333333CCC.
..CCC333333CCC..
...CCCCCCCCCC...
....CCCCCCCC....
................` ],
  [ restartHole, bitmap`
................
....FFFFFFFF....
...FFFFFFFFFF...
..FFF444444FFF..
.FFF44444444FFF.
.FF444DDDD444FF.
.FF44DD44DD44FF.
.FF44D4444D44FF.
.FF44D4444D44FF.
.FF44DD44DD44FF.
.FF444DDDD444FF.
.FFF44444444FFF.
..FFF444444FFF..
...FFFFFFFFFF...
....FFFFFFFF....
................` ],
  [ txtLevel, bitmap`
................
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......00000000.
.......00000000.
.......00000000.
................` ],
  [ txtLife, bitmap`
................
................
................
.....3....3.....
....333..333....
...3333333333...
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................
................` ],
  [ txtI, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
.00000000000000.
.00000000000000.
.00000000000000.
................` ],
  [ txtII, bitmap`
................
.000000..000000.
.000000..000000.
.000000..000000.
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
.000000..000000.
.000000..000000.
.000000..000000.
................` ],
  [ txtIII, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
..00...00...00..
..00...00...00..
..00...00...00..
..00...00...00..
..00...00...00..
..00...00...00..
..00...00...00..
..00...00...00..
.00000000000000.
.00000000000000.
.00000000000000.
................` ],
  [ txtIV, bitmap`
................
.0000.0000.0000.
.0000.0000.0000.
.0000.0000.0000.
..00...00...00..
..00...00...00..
..00...00...00..
...00.00....00..
...00.00....00..
...00.00....00..
...00.00....00..
...00000....00..
....000....0000.
....000....0000.
....000....0000.
................` ],
  [ txtV, bitmap`
................
...0000..0000...
...0000..0000...
...0000..0000...
....00....00....
....00....00....
....00....00....
.....00..000....
.....00..00.....
.....00..00.....
.....00..00.....
.....000000.....
......0000......
......0000......
......0000......
................` ],
  [ txtErr, bitmap`
00000.0000.0000.
00000.0000.0000.
00....0..0.0..0.
00....0..0.0..0.
00....0000.0000.
00....0000.0000.
00....00...00...
00000.00...00...
00000.000..000..
00....000..000..
00....000..0.0..
00....0.0..0.0..
00....0.00.0.00.
00....0.00.0.00.
00000.0..0.0..0.
00000.0..0.0..0.`],
  [ key, bitmap`
................
................
................
................
................
.666666.........
.666666.........
.66..6666666666.
.66..6666666666.
.666666.....66..
.666666.........
................
................
................
................
................`]
);

// Random
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

// Collisions
setSolids([
  player, wall, unbreakableWall, enemy, lockedWall
]);
setPushables({
  [ player ]: [],
});

// Level Manager
const startingLevel = 0;
let level = startingLevel;
const levels = [
  map`
...wh
...uu
.....
.....
p..l1`,
  map`
rw.wh
uu.uu
..wwo
.uuuu
pu.l2`,
  map`
rw.u..h
uu.u...
ow.u.e.
uu.u...
...uuuw
p......
.....l3`,
  map`
hw..euo
uue..uw
uu.....
ru....e
.we....
pw...e.
.w...l4`,
  map`
rue...l5
wu......
pw......
wu...e..
ou......
uu......
uuu.e.uw
..uuuuuh`,
  map`
l51uuuu.wo
uuuuuuu.uu
p......w.e
.......w.e
uuu.wuu.uu
..hweeu.wr`,
  map`
he.w.e.l51
uuuue.e.e.
uuuuue.e.e
pwe.w.e.e.
uuu.uuuwuw
..uuuuuruo`,
  map`
lg......jo
........uu
........ue
p.....k.uh
uuu.....uw
..u......j`,
  map`
l5gu......
uuuu.....e
ow.u....eu
uu.u....uu
p..j...ejh
uu.u....uu
rw.u....eu
uuuu.....e
..uu......`,
  map`
...w...w..
oeuu...uer
uuuu...uuu
.u.....euu
pj....e.jh
.u.....euu
uuuuuuuuuu
uuuuuuuuuu
uuuuuuuuuu`,
  map`
lgu.......
uuu.......
..u.......
p.j......o
..u.......
uuu.......
..u.......`
];

const reloadMap = () => {
  clearText();
  setMap(levels[level]);
  addSprite(0, height() - 1, txtLife);
  textRenderer();
}

const nextMap = () => {
  level += 1;
  initialization();
}

const previousMap = () => {
  level -= 1;
  initialization();
}

const removeLife = () => {
  lives -= 1;
  initialization();
}

const addLife = () => {
  lives += 1;
  initialization();
}

// Text Renderer
const textRenderer = () => {
  textResources.forEach(text => {
    if (level == text.level) {
      addText(text.txt, text.options)
    }
  })
}

// UI
const displayUI = () => {
  getTile(1, height() - 1).forEach(tile => {
    if (tile.type == txtI || tile.type == txtII || tile.type == txtIII) {
      tile.remove()
    }
  })
  if (lives == 3) {
    addSprite(1, height() - 1, txtIII)
  } else if (lives == 2) {
    addSprite(1, height() - 1, txtII)
  } else if (lives == 1) {
    addSprite(1, height() - 1, txtI)
  } else {
    level = startingLevel;
    lives = 3;
    initialization();
  }
}

// Bullet Manager
const fireBullet = () => {
  let playerEntity = getFirst(player);
  if (playerEntity.x != width() - 1) {
    addSprite(playerEntity.x, playerEntity.y, bullet);
  }
}

const fireFlipBullet = () => {
  let playerEntity = getFirst(player);
  if (playerEntity.x != -1) {
    addSprite(playerEntity.x, playerEntity.y, flipBullet);
  }
}

const moveBullets = () => {
  getAll(bullet).forEach(bulletToMove => {
    bulletToMove.x += BULLET_SPEED;
  })
  getAll(flipBullet).forEach(bulletToMove => {
    bulletToMove.x -= BULLET_SPEED;
  })
}

const checkBulletCollisions = () => {
  getAll(bullet).forEach(bulletToCheck => {
    try {
        if (bulletToCheck.x == width() - 1) {
        bulletToCheck.remove();
      }
      getTile(bulletToCheck.x, bulletToCheck.y).forEach(tile => {
        if (tile.type == wall || tile.type == enemy) {
          tile.remove();
          bulletToCheck.remove();
        }
      })
    } catch (error) {}
  })
  getAll(flipBullet).forEach(bulletToCheck => {
    if (bulletToCheck.x == 0) {
      bulletToCheck.remove();
    }
    getTile(bulletToCheck.x, bulletToCheck.y).forEach(tile => {
      if (tile.type == wall || tile.type == enemy) {
        tile.remove();
        bulletToCheck.remove();
      }
    })
  })
}

// Enemy Manager
const enemyAI = () => {
  if (getRndInteger(0, 7) == 0)
  {
    getAll(enemy).forEach(enemyInstance => {
      switch (getRndInteger(0, 3)) {
        case 0:
          enemyInstance.x += 1
          break;
        case 1:
          enemyInstance.x -= 1
          break;
        case 2:
          enemyInstance.y += 1
          break;
        case 3:
          enemyInstance.y -= 1
          break
        default:
          break;
      }
    })
  }
}

const enemyPlayerCollisions = () => {
  getAll(enemy).forEach(enemyInstance => {
    let playerInstance = getFirst(player)
    if (getTile(enemyInstance.x + 1, enemyInstance.y).includes(playerInstance) ||
        getTile(enemyInstance.x - 1, enemyInstance.y).includes(playerInstance) ||
        getTile(enemyInstance.x, enemyInstance.y + 1).includes(playerInstance) ||
        getTile(enemyInstance.x, enemyInstance.y - 1).includes(playerInstance)
       )
    {
      hasKey = false;
      removeLife();
    }
  })
}

// KeyManager
const keyManager = () => {
  // tilesWith(lockedWall).forEach(walls => {
  //   console.log(walls[0].x)
  // })
  if (hasKey) {
    tilesWith(lockedWall).forEach(walls => {
      addSprite(walls[0].x, walls[0].y, wall)
      walls[0].remove()
    })
  }
}

const mainLoop = () => {
  moveBullets();
  checkBulletCollisions();
  enemyAI();
  displayUI();
  keyManager();
}

// Main Loop
if (!slowMode)
{
  setInterval(() => {
    mainLoop();
  }, TICK);
}

const initialization = () => {
  reloadMap();
}

// Input Manager
onInput("a", () => {
  getFirst(player).x -= 1;
})

onInput("d", () => {
  getFirst(player).x += 1;
})

onInput("w", () => {
  getFirst(player).y -= 1;
})

onInput("s", () => {
  getFirst(player).y += 1;
})

onInput("l", () => {
  fireBullet();
})

onInput("j", () => {
  fireFlipBullet();
})

afterInput(() => {
  let playerInstance = getFirst(player);
  getTile(playerInstance.x, playerInstance.y).forEach(tile => {
    if (tile.type == warpHole) {
      nextMap();
    } else if (tile.type == backHole) {
      previousMap();
    } else if (tile.type == restartHole) {
      reloadMap();
    }

    if (tile.type == key) {
      hasKey = true;
      tile.remove();
    }
  })
  enemyPlayerCollisions();

  if (slowMode) {
    mainLoop();
  }
});
initialization()
