/*
@title: SuperFighters
@author: retrooper
@tags: ['shooter', 'platformer', 'fighting', 'singleplayer']
@addedOn: 2024-08-15
*/

// Constants
const gameTitle = "Superfighters v1";
const gameTitleColor = { y: 1, color: `5` };
const startingLives = 5;
const movementDelay = 150;
const shootDelay = 1000;
const soundDelay = 100;
const jumpDuration = 280;

// Game data
let level = 0;
let jumping = false;
let changingLevels = false;
let lives = startingLives;
let gravityDown = true;
let hasMagnet = false;

// Internal variables
let lastParticleSound = Date.now();
let lastLeftMovement = Date.now();
let lastRightMovement = Date.now();
let lastShot = Date.now();

// Sprite data
const rightFacingPlayer = "p";
const leftFacingPlayer = "l";
const rightPunchingPlayer = "r";
const leftPunchingPlayer = "n";
const rightFacingMagnetPlayer = "H";
const leftFacingMagnetPlayer = "O";

const npcFacingRight = "P";
const npcFacingLeft = "L";
const npcEvilLeft = "k";
const npcEvilRight = "K";

const box = "b";
const bedrock = "B";
const ladder = "c";
const fireParticle = "f";
const bullet_left = "m";
const bullet_right = "M";
const heart = "h";
const sky = "s";
const magnet = "0";

let player = rightFacingPlayer;

let happySound = tune`
193.5483870967742: B5~193.5483870967742,
6000`;

let explosionSound = tune`
500: A5^500,
15500`;

let victoryMusic = tune`
333.3333333333333: G5~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: G5~333.3333333333333,
666.6666666666666,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
666.6666666666666,
333.3333333333333: G5~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: G5~333.3333333333333,
666.6666666666666,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
666.6666666666666,
333.3333333333333: G5~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: G5~333.3333333333333,
666.6666666666666,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
1333.3333333333333`;

let gameMusic = tune`
258.62068965517244: G4~258.62068965517244,
258.62068965517244: B4~258.62068965517244,
258.62068965517244: D5~258.62068965517244,
1293.1034482758623,
258.62068965517244: D5~258.62068965517244,
258.62068965517244: E5~258.62068965517244,
258.62068965517244: G5~258.62068965517244,
1293.1034482758623,
258.62068965517244: G4~258.62068965517244,
258.62068965517244: B4~258.62068965517244,
258.62068965517244: D5~258.62068965517244,
1293.1034482758623,
258.62068965517244: D5^258.62068965517244,
258.62068965517244: E5^258.62068965517244,
258.62068965517244: G5^258.62068965517244,
258.62068965517244: D5~258.62068965517244,
1034.4827586206898`;

const playback = playTune(gameMusic, Infinity);

setLegend(
  [
    rightFacingPlayer,
    bitmap`
.....000000.....
....00CCCC00....
....00020020....
....0C00C00.....
..0000CCCC0000..
..000000000000..
..000022222000..
..000002002000..
..000CC0002CC0..
..000CC0000CC0..
...00000000000..
......00000.....
......000000....
.....000...00...
.....00....00...
.....000...000..`,
  ],
  [
    leftFacingPlayer,
    bitmap`
.....000000.....
.....0CCCC00....
.....2002000....
.....00C00C0....
..0000CCCC0000..
..000000000000..
..000222220000..
..000200200000..
..000200000000..
..000000000000..
..CCC000000CCC..
.....00000......
....000000......
...00...000.....
...00....00.....
..000...000.....`,
  ],
  [
    rightFacingMagnetPlayer,
    bitmap`
...000000.......
..00C0CC00......
..00020020....00
..0C00C00....030
0000CCCC000.0331
0000000000003331
0000222220003330
0000020020CC7330
000CC00020CC7730
000CC00000007771
.0000000000.0771
....00000....000
....000000......
...000...00.....
...00....00.....
...000...000....`,
  ],
  [
    leftFacingMagnetPlayer,
    bitmap`
.......000000...
......00CC0C00..
00....02002000..
030....00C00C0..
1330.000CCCC0000
1333000000000000
0333000222220000
0337CC0200200000
0377CC02000CC000
17770000000CC000
1770.0000000000.
000....00000....
......000000....
.....000..00....
.....00....00...
....000...000...`,
  ],
  [
    rightPunchingPlayer,
    bitmap`
.....000000.....
....00CCCC00....
....00030030....
....0C00C00.....
..000CCCCC00000.
..00000000000000
..00002222200CCC
..0000020000.CCC
..0CC0000000....
..0CC0000000....
..000000000.....
.....000000.....
.....0000000....
.....00...00....
.....00...00....
.....000..000...`,
  ],
  [
    leftPunchingPlayer,
    bitmap`
.....000000.....
.....0CCCC00....
.....3003000....
.....00C00C0....
CC0000CCCCC0....
CC000000000000..
CC0002222200000.
.....0002000000.
.....0000000CC0.
.....0000000CC0.
.....000000.00..
.....000000.....
.....000000.....
......00.000....
......00..000...
.....000...00...`,
  ],
  [
    npcFacingRight,
    bitmap`
....00000000....
....05555550....
....05555550....
....05225220....
000055555550....
055555555550....
055555555550000.
055000055555550.
055555055555550.
055555055555550.
000000055555550.
......055500000.
.....0555500....
.....0555550....
....05555550....
...0055555500...`,
  ],
  [
    npcFacingLeft,
    bitmap`
....00000000....
....05555550....
....05555550....
....022522500...
....055555550...
00000555555500..
055505555555500.
055555555005550.
005555555055550.
..0055555055500.
...00555505000..
....00555050....
....0055550.....
....0555550.....
....05555550....
...0055555500...`,
  ],
  [
    npcEvilLeft,
    bitmap`
....00000000....
....05555550....
....05555550....
....033533500...
....055555550...
97000555555500..
777505555555500.
075555555005550.
005555555055550.
..0055555055500.
...00555505000..
....00555050....
....0055550.....
....0555550.....
....05555550....
...0055555500...`,
  ],
  [
    npcEvilRight,
    bitmap`
....00000000....
....05555550....
....05555550....
...005335330....
...055555550..00
..00555555500000
.005555555505736
.055500555555573
.055550555555500
.0055505555500..
..00050555500...
....05055500....
.....0555500....
.....0555550....
....05555550....
...0055555500...`,
  ],
  [
    box,
    bitmap`
0000000000000000
0..............0
0.HHHHHHHHHHHH.0
0.H0000000000H.0
0.H0999999090H.0
0.H0999990900H.0
0.H0999909090H.0
0.H0999090990H.0
0.H0990909990H.0
0.H0909099990H.0
0.H0090999990H.0
0.H0909999990H.0
0.H0000000000H.0
0.HHHHHHHHHHHH.0
0..............0
0000000000000000`,
  ],
  [
    bedrock,
    bitmap`
0000LLLL00LLL000
000LL000LLLLL100
0LLLLLLLLLLLL110
LLLLLLLLLLLLLL0L
LL00LLLLL00LL0LL
L0LLLLLLLLL00LLL
LLLLLLLLLLL0LLLL
LLLLLLLLLL0LLLLL
LLLLL0LLL0LLL0LL
LLL00LLL0LLLL0LL
LL0LLLLLLLLL0LLL
00LLLLLLLLLLLLLL
0LLLLLLL000LLLLL
LLLLL000LLLLLLLL
00LLLLLLLLLLLLL0
000LLLLLLLLLL000`,
  ],
  [
    ladder,
    bitmap`
.LLLL......LLLL.
.LLLL222LLLLLLL.
.LLLLLLLLLLLL2L.
.L1LL......LL2L.
.L1LL......LL2L.
.L1LLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLL......LLLL.
.LLLL......L2LL.
.LLLLLLLLLLL2LL.
.LLLLLLLLLLL2LL.
.LLLL......L2LL.
.LLLL......LLLL.
.LL2LLLLLLLLLLL.
.LL2LLLLLLLLLLL.
.LL2L......LLLL.`,
  ],
  [
    fireParticle,
    bitmap`
..9....99....9..
....999999......
...99966699.....
..9966626699....
..9662266669....
..9996662669....
.996696662699...
.996269662669.99
..96622966699..9
..9666669969....
..99966666999...
...999966699....
.6..9999999.....
..6...9969......
...6....9.......
......6.........`,
  ],
  [
    bullet_left,
    bitmap`
................
................
................
................
................
................
................
......96F6......
......F666......
................
................
................
................
................
................
................`,
  ],
  [
    bullet_right,
    bitmap`
................
................
................
................
................
................
................
......6F69......
......666F......
................
................
................
................
................
................
................`,
  ],
  [
    heart,
    bitmap`
.0000000.0000003
0332283303322280
0388888333888830
0888888338888830
0888888888888830
0888288888888880
0888288888888880
0388828888888880
0388888888888830
0338888888888830
.033888888888330
..03888888883330
..0338888883300.
.H.0388888830H..
....03388830....
H....000000...H.`,
  ],
  [
    sky,
    bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`,
  ],
  [
    magnet,
    bitmap`
................
................
................
................
000000....00000.
0LLL00...0LLLL0.
0L0000...00000L0
003330...0777700
023320...0722270
022320...0727770
0232200.00772770
0233230.07777270
0333333077722270
0333333377777770
.03333337777770.
..000000000000..`,
  ]
);

setBackground(sky);

setSolids([
  rightFacingPlayer,
  leftFacingPlayer,
  leftPunchingPlayer,
  rightPunchingPlayer,
  rightFacingMagnetPlayer,
  leftFacingMagnetPlayer,
  npcEvilLeft,
  npcEvilRight,
  npcFacingLeft,
  npcFacingRight,
  box,
  bedrock,
]);

const levels = [
  map`
...............
p......LP......
..b..........cb
..b..........cb
..b..........cb`,
  map`
...............
...............
...............
...............
...............
...b.b.b.b.bBBB
.cB.........BBB
.cB.........BBB
pcBP....L...BBB`,
  map`
...............
...............
..............B
.........b...BB
.......b...bbBB
p.bbbbbbb...LBB`,
  map`
..............
..............
..............
.........b.b..
....Bb.b.....b
...cB........b
..BB........cB
.cBBBB.B.B.B.B
pB.....LL.c..B`,
  map`
BBBBBBBBBBBBB
.............
.......BBBBBB
.......BBBBBB
.......BBBBBB
.......BBBBBB
.......BBBBBB
p.0....BBBBBB
BBBBBBBBBBBBB`,
  map`
p..............
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb...
bbbbbbbbbbbbbbb
BBBBBBBBBBBBBBB`,
  map`
.........bbbbbb
...............
........bbbbbbb
...............
.......bbbbbbbb
...............
......bbbbbbbbb
...............
.....bbbbbbbbbb
...............
....bbbbbbbbbbb
...............
...bbbbbbbbbbbb
p..............
...............
BBBBBBBBBBBBBBB`,
  map`
bbbbbbbbbbbbbbb
bbbbbbbbbbbb.bb
p...BP.........
BBB.Bbbb..bb.bb
bbB.b....Bbb.bb
bbB...BBBBbbbbb
bbBBBBbbbbbbbbb
bbbbbbbbbbbbbbb
BBBBBBBBBBBBBBB`,
  map`
BBBBBBBBBBBBBBB
BBBBBBBBBBBBBBB
p..0.BB....BB..
BBBB.BB.BB.BB.B
BBBB.BB.BB.BB.B
BBBB.BB.BB.BB.B
BBBB....BB....B
BBBBBBBBBBBBBBB
BBBBBBBBBBBBBBB`,
  map`
...............
...............
...............
...............
...............
...............
...............
...............
p..............`,
];

setMap(levels[level]);

setPushables({
  [rightFacingPlayer]: [],
  [leftFacingPlayer]: [],
  [box]: [],
});

// Add game title text as the player loads into the game.
addText(gameTitle, gameTitleColor);

/**
 * Is the given type a living entity?
 * @param {*} type Entity type
 * @returns true or false
 */
function isEntity(type) {
  return isNPC(type) || isPlayer(type);
}

/**
 * Is the given type an NPC?
 * @param {*} type Entity type
 * @returns true or false
 */
function isNPC(type) {
  return (
    type == npcFacingLeft ||
    type == npcFacingRight ||
    type == npcEvilLeft ||
    type == npcEvilRight
  );
}

/**
 * Is the given type a player?
 * @param {*} type Entity type
 * @returns true or false
 */
function isPlayer(type) {
  return (
    type == leftFacingPlayer ||
    type == rightFacingPlayer ||
    type == leftPunchingPlayer ||
    type == rightPunchingPlayer ||
    type == rightFacingMagnetPlayer ||
    type == leftFacingMagnetPlayer
  );
}

/**
 * Calculate the distance to the ground
 * @param {*} player entity
 * @returns distance to the ground
 */
function distanceToGround(player) {
  let playerY = player.y;
  let playerX = player.x;

  // Check tiles below the player
  for (let i = playerY + 1; i < height(); i++) {
    const tiles = getTile(playerX, i);
    if (tiles.length != 0) {
      for (let tile in tiles) {
        if (tile.type != leftFacingPlayer && tile.type != rightFacingPlayer)
          return i - playerY - 1;
      }
    }
  }

  return height() - playerY - 1;
}

/**
 * Is the given entity on the ground?
 * In other words, is their distance to the ground equal to zero/
 * @param {*} player player
 * @returns is the player on the ground
 */
function isOnGround(player) {
  return distanceToGround(player) == 0;
}

/**
 * Initiate an attack at a position
 * @param {*} player player
 * @param {*} entityX target X
 * @param {*} entityY target Y
 */
function attackEntity(player, entityX, entityY) {
  // Check sprite next to the player
  getTile(entityX, entityY).forEach((tile) => {
    // Confirm they are not destroying themselves!
    if (isPlayer(tile.type)) return;
    //If it bedrock, we cannot break it (easily)
    if (tile.type == bedrock) {
      spawnParticle(entityX, entityY, 0);
      addSprite(entityX, entityY, bedrock);
    } else {
      // Destroy block next to them
      clearTile(entityX, entityY);
      spawnParticle(entityX, entityY, 0);
    }
    return;
  });
}

/**
 * Calculate the distance between two entities.
 * @param {*} player player
 * @param {*} entityX target entity X
 * @param {*} entityY target entity Y
 * @returns
 */
function distance(player, entityX, entityY) {
  //d = sqrt(x^2 + y^2)
  let playerX = player.x;
  let playerY = player.y;
  let xDelta = playerX - entityX;
  let yDelta = playerY - entityY;
  let distanceSq = xDelta * xDelta + yDelta * yDelta;
  return Math.sqrt(distanceSq);
}

/**
 * Is the entity type a kind of bullet.
 * @param {*} entity type
 * @returns
 */
function isBullet(type) {
  return type == bullet_right || type == bullet_left;
}

/**
 * Ellicit an attack from an NPC.
 * Shoot a bullet.
 * @param {*} shooter attacker
 * @param {*} originX origin x
 * @param {*} originY origin y
 */
function shootBullet(shooter, originX, originY) {
  let currentTime = Date.now();
  if (currentTime - lastShot > shootDelay) {
    lastShot = currentTime;
    //TODO Possibly add shooting functionality for players
    if (
      shooter.type == npcFacingLeft ||
      shooter.type == leftFacingPlayer ||
      shooter.type == npcEvilLeft
    ) {
      addSprite(originX, originY, bullet_left);
    } else if (
      shooter.type == npcFacingRight ||
      shooter.type == rightFacingPlayer ||
      shooter.type == npcEvilRight
    ) {
      addSprite(originX, originY, bullet_right);
    }
  }
}

/**
 *
 * @param {*} particleX X position of the spawned particle
 * @param {*} particleY Y position of the spawned particle
 * @param {*} type Sound type (e.g. explosion, happy)
 */
function spawnParticle(particleX, particleY, type) {
  // Calculate time elapsed since last sound effect
  let currentTime = Date.now();
  if (currentTime - lastParticleSound > soundDelay) {
    lastParticleSound = currentTime;

    if (particleX > width() - 1) {
      particleX = width() - 1;
    }
    if (particleX < 0) {
      particleX = 0;
    }
    if (particleY > height() - 1) {
      particleY = height() - 1;
    }
    if (particleY < 0) {
      particleY = 0;
    }
    // Spawn the corresponding particle
    if (type == 0) {
      playTune(explosionSound);
      addSprite(particleX, particleY, fireParticle);
      var tempInterval = setInterval(() => {
        // Destroy particle later
        getTile(particleX, particleY).forEach((sprite) => {
          if (sprite.type == fireParticle) {
            sprite.remove();
          }
        });
        clearInterval(tempInterval);
      }, 100);
    } else if (type == 1) {
      playTune(happySound);
      addSprite(particleX, particleY, heart);
      var tempInterval = setInterval(() => {
        // Destroy particle later
        getTile(particleX, particleY).forEach((sprite) => {
          if (sprite.type == heart) {
            sprite.remove();
          }
        });
        clearInterval(tempInterval);
      }, 100);
    }
  }
}

// Handle right punch
onInput("l", () => {
  if (!player || !getFirst(player)) return;
  let particleX = getFirst(player).x + 1;
  let particleY = getFirst(player).y;
  // Are they facing in the right direction (so they can attack in that direction)
  if (getFirst(player).type == rightFacingPlayer) {
    // Switch to the punching animation
    getFirst(player).type = rightPunchingPlayer;
    player = rightPunchingPlayer;
    attackEntity(player, particleX, particleY);
  }
  var intervalId = setInterval(() => {
    if (
      player &&
      getFirst(player) &&
      getFirst(player).type == rightPunchingPlayer
    ) {
      getFirst(player).type = rightFacingPlayer;
      if (hasMagnet) {
        player = rightFacingMagnetPlayer;
      } else {
        player = rightFacingPlayer;
      }
    }
    clearInterval(intervalId);
  }, 200);
});

// Handle left punch
onInput("j", () => {
  if (!player || !getFirst(player)) return;
  let particleX = getFirst(player).x - 1;
  let particleY = getFirst(player).y;
  // Are they facing in the left direction? (to be able to punch left)
  if (getFirst(player).type == leftFacingPlayer) {
    // Switch to the punching animation
    getFirst(player).type = leftPunchingPlayer;
    player = leftPunchingPlayer;
    attackEntity(player, particleX, particleY);
  }
  var intervalId = setInterval(() => {
    if (
      player &&
      getFirst(player) &&
      getFirst(player).type == leftPunchingPlayer
    ) {
      if (hasMagnet) {
        getFirst(player).type = leftFacingMagnetPlayer;
        player = leftFacingMagnetPlayer;
      } else {
        getFirst(player).type = leftFacingPlayer;
        player = leftFacingPlayer;
      }
    }
    clearInterval(intervalId);
  }, 200);
});

// Jump functionality
onInput("w", () => {
  if (!player || !getFirst(player)) return;

  // Is the player on ground (and not jumping)
  let onGround = isOnGround(getFirst(player));
  if (!jumping && onGround) {
    //Increase y
    getFirst(player).y -= 1;
    jumping = true;

    // Keep them in the air for some time.
    var intervalId = setInterval(() => {
      if (!getFirst(player)) return;
      let lastPlayerY = getFirst(player).y;
      let onGround = isOnGround(getFirst(player));
      if (!onGround) {
        // Push them up
        getFirst(player).y = lastPlayerY;
      }
      clearInterval(intervalId);
      jumping = false;
    }, jumpDuration);
  }
});

// Gravity switch functionality
onInput("i", () => {
  if (!player || !getFirst(player)) return;

  // Is the player on ground (and not jumping)
  let onGround = isOnGround(getFirst(player));
  if (!jumping && onGround && hasMagnet) {
    gravityDown = false;

    //jumping = true;
    getFirst(player).y -= 1;
  }
});

onInput("k", () => {
  if (!player || !getFirst(player)) return;

  // Is the player on ground (and not jumping)
  let onGround = isOnGround(getFirst(player));
  gravityDown = true;
  jumping = false;
});

// Handle left directional movement
onInput("a", () => {
  if (!player || !getFirst(player)) return;

  let currentTime = Date.now();
  if (currentTime - lastLeftMovement >= movementDelay) {
    lastLeftMovement = currentTime;

    if (player && getFirst(player).type != "l") {
      if (hasMagnet) {
        getFirst(player).type = leftFacingMagnetPlayer;
        player = leftFacingMagnetPlayer;
      } else {
        getFirst(player).type = leftFacingPlayer;
        player = leftFacingPlayer;
      }
    }
    // Move to the left direction
    getFirst(player).x -= 1;
  }
});

// Handle right directional movement
onInput("d", () => {
  if (!player || !getFirst(player)) return;
  let currentTime = Date.now();
  if (currentTime - lastRightMovement >= movementDelay) {
    lastRightMovement = currentTime;
    if (player && getFirst(player).type != rightFacingPlayer) {
      if (hasMagnet) {
        getFirst(player).type = rightFacingMagnetPlayer;
        player = rightFacingMagnetPlayer;
      } else {
        getFirst(player).type = rightFacingPlayer;
        player = rightFacingPlayer;
      }
    }
    // Move to the right direction
    getFirst(player).x += 1;
  }
});

// Gravity handler
setInterval(() => {
  // Gravity for all living entities!
  getAll().forEach((entity) => {
    if (
      isEntity(entity.type) ||
      //Gravity for blocks,
      //this exemption for level index 6
      level == 6
    ) {
      // Don't apply gravity to the player as they are jumping
      if (isPlayer(entity.type) && jumping) return;
      let onGround = isOnGround(entity);
      if (!onGround) {
        // Move downward (if gravityDown is true)
        let deltaY = gravityDown ? 1 : -1;
        if (entity.y + deltaY > height() - 1) {
          entity.y = height() - 1;
        } else {
          entity.y += deltaY;
        }
      }
    }
  });
}, 30);

function gameReset() {
  // Handle player death
  if (lives <= 0 && !changingLevels) {
    // Reset level
    level = 0;
    clearText();

    // Destroy all entities (except the player)
    getAll().forEach((entity) => {
      if (!isPlayer(entity.type)) {
        entity.remove();
      }
    });
    // Load the world
    setMap(levels[level]);

    //Reset lives & jumping state
    lives = startingLives;
    jumping = false;

    //Add game title text
    addText(gameTitle, gameTitleColor);
  }
}

// Moving entity handler
let i = 0;
setInterval(() => {
  if (!player || !getFirst(player)) return;
  // Process entity proximity detection (NPC player tracing logic)
  getAll().forEach((entity) => {
    // Calculate distance to the player
    let dist = distance(getFirst(player), entity.x, entity.y);
    //Magnet item pickup detection
    if (dist == 0.0 && entity.type == magnet) {
      playTune(happySound);
      clearText();
      hasMagnet = true;
      if (getFirst(player).type == rightFacingPlayer) {
        getFirst(player).type = rightFacingMagnetPlayer;
        player = rightFacingMagnetPlayer;
      } else if (entity.type == leftFacingPlayer) {
        getFirst(player).type = leftFacingMagnetPlayer;
        player = leftFacingMagnetPlayer;
      }
      entity.remove();

      return;
    }

    // Loop over all NPCs
    if (!isNPC(entity.type)) return;
    // Once the player comes in close proximity, make them look at the player
    if (dist < 10) {
      let xDiff = getFirst(player).x - entity.x;
      //Prevent npc from walking into the same space as player, making it not dangerous.
      if (i % 2 == 0 && Math.abs(xDiff) > 1) {
        let newPosX = entity.x + (xDiff > 0 ? 1 : -1);
        entity.x = newPosX;
      }
      // Evaluate direction of player using delta x (as it is a 2D game)
      let right = getFirst(player).x - entity.x > 0;
      if (right) {
        entity.type = npcEvilRight;
      } else {
        entity.type = npcEvilLeft;
      }

      if (dist < 7) {
        shootBullet(entity, entity.x, entity.y);
      }
    }
  });

  // Process moving bullets
  getAll().forEach((entity) => {
    if (!getFirst(player)) return;
    //Is the entity a bullet?
    if (isBullet(entity.type)) {
      // Calculate difference to player
      let xDiff = entity.type == bullet_right ? 1 : -1;
      let removedEntity = false;
      //Find all entities in game
      getTile(entity.x, entity.y).forEach((obstacle) => {
        // If the bullet did not hit an NPC (since they are the shooters)
        // Also check if the obstacle is not the same bullet.
        if (!isBullet(obstacle.type) && !isNPC(obstacle.type)) {
          entity.remove();
          removedEntity = true;
          // Spawn the heart particle if it was a player,
          // Spawn the explosion particle otherwise
          spawnParticle(entity.x, entity.y, isPlayer(obstacle.type) ? 1 : 0);
          if (isPlayer(obstacle.type)) {
            lives--;
            if (lives == 0) {
              gameReset();
            }
          }
          return;
        }
      });
      if (removedEntity) return;
      // Move the bullet toward the player
      entity.x += xDiff > 0 ? 1 : -1;

      // Destroy bullets meeting the edge
      if (entity.x == width() - 1 || entity.x == 0) {
        entity.remove();
        var interval = setInterval(() => {
          //Is within bounds?
          if (entity.x <= width() - 1 && entity.x >= 0) {
            spawnParticle(entity.x, entity.y, 0);
          }
          clearInterval(interval);
        }, 200);
      }
    }
  });
  i++;
}, 300);

// Level changing handler, Player death handler, Lives rendering handler
setInterval(() => {
  if (!player || !getFirst(player)) {
    player = rightFacingPlayer;
    return;
  }

  // Changing levels functionality (if they reach the edge)
  if (getFirst(player).x == width() - 1) {
    if (!levels[level + 1]) return;
    changingLevels = true;

    // Show new loading text...
    clearText();
    addText("Loading new level...", { y: 4, color: `4` });

    // Shift all entities to the left
    getAll().forEach((entity) => {
      if (
        !isBullet(entity.type) &&
        entity.type != fireParticle &&
        entity.type != heart &&
        !isPlayer(entity)
      ) {
        // If the entity has not reached the left side, keep pushing them
        if (entity.x != 0) {
          entity.x--;
          // Push the player to the right side (keep them on the right side)
          getFirst(player).x++;
        }
        // The moment an entity reaches the left side, we destroy it.
        if (entity.x == 0) {
          entity.remove();
        }
      }
    });
  }

  let moreLevelsExist = level < levels.length - 1;
  // Once we complete the level changing transition... (and the player is the only one alive)
  if (changingLevels && getAll().length == 1 && moreLevelsExist) {
    // Load the new level map
    level++;
    setMap(levels[level]);
    changingLevels = false;

    let isFinalLevel = level == levels.length - 1;

    // Clear text from previous level
    clearText();

    switch (level) {
      case 1:
        addText("Not bad...", { y: 3, color: `4` });
        addText("Can you beat this?", { y: 4, color: `3` });
        break;
      case 2:
        addText("It gets harder...", { y: 4, color: `3` });
        break;
      case 4:
        if (!hasMagnet) {
          addText("Pick up", { y: 10, color: `4` });
          addText("the magnet!", { y: 11, color: `4` });
        }
        break;
      case 5:
        hasMagnet = false;
        gravityDown = true;
        addText("Go down...", { y: 2, color: `3` });
        break;
      case 8:
        if (!hasMagnet) {
          addText("Collect", { x: 0, y: 6, color: `4` });
          addText("the", { x: 0, y: 7, color: `4` });
          addText("magnet", { x: 0, y: 8, color: `4` });
        }
        break;
    }

    if (level == levels.length - 1) {
      hasMagnet = false;
      gravityDown = true;
      addText("You win!", { y: 3, color: `4` });
    }

    if (isFinalLevel) {
      playback.end();
      playTune(victoryMusic, Infinity);
    }
  }
  if (changingLevels) return;

  // Render lives on the screen
  let text = "Lives: " + lives;
  if (level < levels.length - 1) {
    addText(text, { x: width() - 3, y: 5, color: `5` });
  }
}, 40);
