/*
@title: MicroBot_Adventure
@author: Kartikey Singh Chauhan
@tags: ['puzzle']
@addedOn: 2024-01-24

In this game, you are a robot navigating through maze-like sprinkled with enemies. 
The primary objective is to outmaneuver enemies, strategically use boxes to block enemy attacks, and eliminate hostile turrets with a lasers 
and reach the portal (goal) which progresses to the next level and eventually win.

WASD keys handle movement. Laser firing is executed with 'K' (westward) and 'L' (eastward) keys, and J is used to reset to the game.
*/

const player = "p";
const box = "b";
const wall = "w";
const portal = "r";
const background = "g";
const enemyEast = "e";
const enemyWest = "i";
const enemySouth = "d";
const enemyNorth = "z";
const bulletLeft = "o";
const laserEast = "q";
const laserWest = "s";
const enemyExplosion = "l";
const playerExplosion = "k";

setLegend(
  [
    player,
    bitmap`
        ................
        ................
        ................
        ....0000000.....
        ...0L1111110....
        ...0L101101L0...
        ...0L111111L0...
        ...0L110011L0...
        ....01011010....
        .....01L110.....
        .....0111L0.....
        .....01L110.....
        .....011110.....
        .....000110.....
        .......010......
        ........0.......`,
  ],
  [
    box,
    bitmap`
        CCCCCCCCCCCCCCCC
        CFFFFFFFFFFFFFFC
        CFFCCCCCCCCCCFFC
        CFCFCCCCCCCCFCFC
        CFCCFCCCCCCFCCFC
        CFCCCFCCCCFCCCFC
        CFCCCCFCCFCCCCFC
        CFCCCCCFFCCCCCFC
        CFCCCCCFFCCCCCFC
        CFCCCCFCCFCCCCFC
        CFCCCFCCCCFCCCFC
        CFCCFCCCCCCFCCFC
        CFCFCCCCCCCCFCFC
        CFFCCCCCCCCCCFFC
        CFFFFFFFFFFFFFFC
        CCCCCCCCCCCCCCCC`,
  ],
  [
    wall,
    bitmap`
LL111LLLLLLLL1LL
1LLL11L33333L1LL
111L11L11111LLLL
L11LLLL11111LL1L
L11111LLLLLLL11L
1LLL111L11L3LL11
1LLLLLLL11133L11
LL31333L11113LL1
L311111LL11113L1
L111111LLLLLLLLL
L11111LL33L1133L
L111LLL111L111LL
LLLLL1L1LLL1111L
LL1331LL11LLLLLL
L1L111LL1LLL3L3L
LLLLLLL1LL1LLLLL`,
  ],
  [
    portal,
    bitmap`
................
....55555555....
...5533555555...
..553355333355..
.55335533353355.
.55355355555335.
.55335355335535.
.55335533553555.
.55535533553355.
.53553355353355.
.53355555355355.
.55335333553355.
..553333553355..
...5555553355...
....55555555....
................`,
  ],
  [
    background,
    bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`,
  ],
  [
    enemyEast,
    bitmap`
................
................
................
................
................
................
................
................
.....LLL1L3.....
.....LLL1L3.....
.......LL.......
.......LL.......
......LLLL......
.....LLLLLL.....
....LLLLLLLL....
...LLLLLLLLLL...`,
  ],
  [
    enemyWest,
    bitmap`
................
................
................
................
................
................
................
................
.....3L1LLL.....
.....3L1LLL.....
.......LL.......
.......LL.......
......LLLL......
.....LLLLLL.....
....LLLLLLLL....
...LLLLLLLLLL...`,
  ],
  [
    enemySouth,
    bitmap`
................
................
................
...............L
..............LL
........LL...LLL
........LL..LLLL
........LLLLLLLL
........11LLLLLL
........LL..LLLL
........33...LLL
..............LL
...............L
................
................
................`,
  ],
  [
    enemyNorth,
    bitmap`
................
................
................
...............L
..............LL
........33...LLL
........LL..LLLL
........11LLLLLL
........LLLLLLLL
........LL..LLLL
........LL...LLL
..............LL
...............L
................
................
................`,
  ],
  [
    laserEast,
    bitmap`
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        ..........333333
        ..........333333
        ................
        ................
        ................
        ................
        ................
        ................
        ................`,
  ],
  [
    laserWest,
    bitmap`
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        333333..........
        333333..........
        ................
        ................
        ................
        ................
        ................
        ................
        ................`,
  ],
  [
    enemyExplosion,
    bitmap`
        .........9......
        ..99.....9.....9
        .9999.999999999.
        ...9999999999...
        ..999999999699..
        ..999933393669..
        .9999333336669..
        .9993663333669..
        .99396333333399.
        .99936333333369.
        .99933333366396.
        ..9996333366696.
        ..9999933966699.
        .99999..999999..
        ...99..99....99.
        .99...99......9.`,
  ],
  [
    playerExplosion,
    bitmap`
        ..............99
        ..9....9........
        ................
        .......996699...
        ....9..9.99999..
        .9..9999993999..
        ..999993333.99..
        ..9.9963333369..
        ....99933333399.
        ..999.633333399.
        .....966666699..
        ...9..3999999...
        ................
        .9..............
        .......99....99.
        .9....99......9.`,
  ],
  [
    bulletLeft,
    bitmap`
        ................
        ................
        ................
        ................
        ................
        ................
        ................
        0F666...........
        0F666...........
        ................
        ................
        ................
        ................
        ................
        ................
        ................`,
  ],
);
const move = tune`
159.5744680851064: D4/159.5744680851064 + E4/159.5744680851064 + F4/159.5744680851064,
4946.808510638298`;
const gameOver = tune`
159.5744680851064: G4/159.5744680851064 + F4/159.5744680851064 + E4-159.5744680851064,
159.5744680851064: F4/159.5744680851064 + E4/159.5744680851064 + D4-159.5744680851064,
159.5744680851064: E4/159.5744680851064 + D4/159.5744680851064 + C4-159.5744680851064 + F4^159.5744680851064,
159.5744680851064: D4/159.5744680851064 + C4/159.5744680851064 + E4^159.5744680851064,
159.5744680851064: C4/159.5744680851064 + D4^159.5744680851064,
159.5744680851064: C4/159.5744680851064,
4148.936170212766`;
const explosion = tune`
103.44827586206897: E4/103.44827586206897 + F4/103.44827586206897,
103.44827586206897: F4/103.44827586206897,
103.44827586206897: F4/103.44827586206897,
103.44827586206897: F4/103.44827586206897,
103.44827586206897: F4/103.44827586206897,
103.44827586206897: F4/103.44827586206897,
2689.655172413793`;
var laserAllowed = false;
var shootingSpeed = 500;
var playerExploded = false; //to check if the player is alive

function reset() {
  setMap(levels[level]);
  laserAllowed = false;
  shootingSpeed = 200;
  playerExploded = false;
  clearText();
}

function checkObstacles(enemyObj, direction) {
  const range = 10;

  let isObstacle = false;

  const offsets = {
    e: { x: 1, y: 0 },
    i: { x: -1, y: 0 },
    z: { x: 0, y: -1 },
    d: { x: 0, y: 1 },
  };

  for (let i = 1; i <= range; i++) {
    const { x: offsetX, y: offsetY } = offsets[direction];
    const tilesAtOffset = getTile(
      enemyObj.x + i * offsetX,
      enemyObj.y + i * offsetY,
    );

    // const tilesAtOffset = getTile(enemyObj.x + i * offset, enemyObj.y);

    tilesAtOffset.forEach((sprite) => {
      if (sprite.type === box || sprite.type === wall) {
        isObstacle = true;
        return;
      }

      if (sprite.type === player && !isObstacle) {
        sprite.remove();
        addSprite(
          enemyObj.x + i * offsetX,
          enemyObj.y + i * offsetY,
          playerExplosion,
        );
        playerExploded = true;
        playTune(gameOver);
        addText("Game Over", {
          x: 5,
          y: 6,
          color: color`3`,
        });
        return;
      }
    });
  }
}

setBackground(background);
setSolids([player, box, enemyEast, enemySouth, enemyWest, enemyNorth, wall]);
onInput("w", () => {
  playTune(move);
  getFirst(player).y -= 1;
});
onInput("s", () => {
  playTune(move);
  getFirst(player).y += 1;
});
onInput("d", () => {
  playTune(move);
  getFirst(player).x += 1;
});
onInput("a", () => {
  playTune(move);
  getFirst(player).x -= 1;
});
onInput("j", () => {
  reset(level);
});
onInput("l", () => {
  if (laserAllowed) {
    laserAllowed = false;
    var laserTimer = setTimeout(function () {
      laserAllowed = true;
    }, shootingSpeed);
    addSprite(getFirst(player).x, getFirst(player).y, laserEast);
  }
});
onInput("k", () => {
  if (laserAllowed) {
    laserAllowed = false;
    var laserTimer = setTimeout(function () {
      laserAllowed = true;
    }, shootingSpeed);
    addSprite(getFirst(player).x, getFirst(player).y, laserWest);
  }
});
let level = 0;
const levels = [
  map`
wpwwwwwwwww
w......w..w
wb..wwww..w
e..w.....dw
w..w...w..w
w..w...w..w
w......w..w
w...www.b.w
w.........w
wwwwwwwwwrw`,
  map`
wpwwwwwwwww
w......w..w
w..b...w..w
w.b...i..dw
w...wwww..w
e...w..w..r
w...w..w..w
w...w...b.w
w.........w
wwzwwwwwwww`,
  map`
wwdwwwwwwwwpw
w....w......w
w....w......w
w....w.b....w
e...........w
w...wwwwwwwww
w..wwwwwwww.w
ww..........w
wwwww.b.....w
.d.wwwww....w
........z...w
wrwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwpw
w.............w
w.e......b.wwww
ww.ww...wwwwwww
ww......wwwwwww
w..www.zwwwwwww
w..i..wwwww...w
w...w.wr....i.w
w...w.wwww..www
w...w.www...www
w.e.........www
www...wwww..www
ww...zwwwwwwwww
wwwwwwwwwwwwwww`,
];

setMap(levels[level]);

setPushables({
  [player]: [box],
});

afterInput(() => {
  const numberCovered = tilesWith(portal, player).length;
  const targetNumber = tilesWith(portal).length;

  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentLevel = levels[level];

    if (level == 2) {
      laserAllowed = true;
      addText("You have", { x: 5, y: 5, color: color`8` });
      addText("unlocked laser", { x: 3, y: 6, color: color`8` });
      setTimeout(function () {
        clearText();
      }, 700);
    }
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You win!", { y: 5, color: color`6` });
    }
  }
});
setInterval(function () {
  for (var i = 0; i < getAll(laserWest).length; i++) {
    if (getAll(laserWest)[i].x < 1) {
      getAll(laserWest)[i].remove();
    } else {
      getAll(laserWest)[i].x -= 1;
    }
  }

  for (var i = 0; i < getAll(laserEast).length; i++) {
    if (getAll(laserEast)[i].x < 1) {
      getAll(laserEast)[i].remove();
    } else {
      getAll(laserEast)[i].x += 1;
    }
  }

  for (var i = 0; i < getAll(playerExplosion).length; i++) {
    getAll(playerExplosion)[i].remove();
  }

  for (var i = 0; i < getAll(enemyExplosion).length; i++) {
    getAll(enemyExplosion)[i].type = playerExplosion;
  }

  [enemyEast, enemyWest, enemyNorth, enemySouth].forEach((enemyType) => {
    getAll(enemyType).forEach((enemyObj) => {
      const direction = enemyObj.type;
      checkObstacles(enemyObj, direction);
    });
  });

  getAll(laserEast).forEach((laserEastObj) => {
    getTile(laserEastObj.x, laserEastObj.y).forEach((sprite) => {
      // console.log(sprite.type);
      if (
        sprite.type === enemyEast ||
        sprite.type === enemySouth ||
        sprite.type === enemyNorth ||
        sprite.type === enemyWest
      ) {
        sprite.remove();
        playTune(explosion);
        addSprite(laserEastObj.x, laserEastObj.y, enemyExplosion);
        laserEastObj.remove();
        return;
      } else if (sprite.type === wall || sprite.type == box) {
        laserEastObj.remove();
      }
    });
  });
  getAll(laserWest).forEach((laserWestObj) => {
    getTile(laserWestObj.x, laserWestObj.y).forEach((sprite) => {
      // console.log(sprite.type);
      if (
        sprite.type === enemyEast ||
        sprite.type === enemySouth ||
        sprite.type === enemyNorth ||
        sprite.type === enemyWest
      ) {
        sprite.remove();
        playTune(explosion);
        addSprite(laserWestObj.x, laserWestObj.y, enemyExplosion);
        laserWestObj.remove();
        return;
      } else if (sprite.type === wall || sprite.type == box) {
        laserWestObj.remove();
      }
    });
  });
}, 60);
