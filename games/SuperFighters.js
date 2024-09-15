/*
@title: SuperFighters
@author: retrooper
@tags: ['shooter', 'platformer', 'fighting', 'singleplayer']
@addedOn: 2024-08-15
*/

// Constants
const gameTitle = "SuperFighters";
const gameTitleColor = { y: 1, color: color`3` };
const startingLives = 5;
const movementDelay = 150;
const shootDelay = 1000;
const soundDelay = 100;
const jumpDuration = 280;

// Game data
let level = 0;
let inMenu = true;
let jumping = false;
let changingLevels = false;
let lives = startingLives;
let gravityDown = true;
let hasMagnet = false;
let hasGun = false;

// Internal variables
let lastParticleSound = Date.now();
let lastLeftMovement = Date.now();
let lastRightMovement = Date.now();
let lastShot = Date.now();
let lastPlayerShot = Date.now();

// Sprite data
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
const magnet = "0";
const gun = "1";
const player_bullet_left = "2";
const player_bullet_right = "3";
const sky_light = "4";
const sky_dark = "5";
const sky_black = "6";
const leftFacingGunPlayer = "7";
const rightFacingGunPlayer = "8";
const rightFacingPlayer_A = "p";
const leftFacingPlayer_A = "l";
const rightFacingPlayer_B = "i";
const leftFacingPlayer_B = "y";

let RIGHT_FACING_PLACEHOLDER = rightFacingPlayer_A;
let LEFT_FACING_PLACEHOLDER = leftFacingPlayer_A;

let player = null;

let happySound = tune`3`;

let explosionSound = tune`
500: D5^500,
15500`;

let victoryMusic = tune`
140.8450704225352: D4~140.8450704225352 + D5/140.8450704225352 + A5/140.8450704225352 + F5/140.8450704225352,
140.8450704225352,
140.8450704225352: F4~140.8450704225352,
140.8450704225352,
140.8450704225352: A4~140.8450704225352,
140.8450704225352,
140.8450704225352: C5~140.8450704225352,
140.8450704225352,
140.8450704225352: E4~140.8450704225352 + E5/140.8450704225352 + G5/140.8450704225352 + B5/140.8450704225352,
140.8450704225352,
140.8450704225352: G4~140.8450704225352,
140.8450704225352,
140.8450704225352: B4~140.8450704225352,
140.8450704225352,
140.8450704225352: D5~140.8450704225352,
140.8450704225352,
140.8450704225352: F4~140.8450704225352 + F5/140.8450704225352 + A5/140.8450704225352 + C5/140.8450704225352,
140.8450704225352,
140.8450704225352: A4~140.8450704225352,
140.8450704225352,
140.8450704225352: C5~140.8450704225352,
140.8450704225352,
140.8450704225352: E5~140.8450704225352,
140.8450704225352,
140.8450704225352: G5~140.8450704225352 + G4/140.8450704225352 + E4/140.8450704225352 + C4/140.8450704225352,
140.8450704225352: E5~140.8450704225352,
140.8450704225352: C5~140.8450704225352,
140.8450704225352,
140.8450704225352: G4~140.8450704225352,
140.8450704225352,
140.8450704225352: C5~140.8450704225352 + C4/140.8450704225352 + G4/140.8450704225352 + E4/140.8450704225352 + E5/140.8450704225352,
140.8450704225352`;

let loadingMusic = victoryMusic;

let gameMusic = tune`
140.8450704225352: D5~140.8450704225352 + D4/140.8450704225352 + F4/140.8450704225352 + A4^140.8450704225352,
140.8450704225352,
140.8450704225352: F5~140.8450704225352 + A4^140.8450704225352,
140.8450704225352: A5~140.8450704225352,
140.8450704225352,
140.8450704225352: A4^140.8450704225352,
140.8450704225352: F5~140.8450704225352,
140.8450704225352,
140.8450704225352: C5~140.8450704225352 + C4/140.8450704225352 + E4/140.8450704225352 + G4^140.8450704225352,
140.8450704225352,
140.8450704225352: E5~140.8450704225352 + G4^140.8450704225352,
140.8450704225352: G5~140.8450704225352,
140.8450704225352,
140.8450704225352: G4^140.8450704225352,
140.8450704225352: E5~140.8450704225352,
140.8450704225352,
140.8450704225352: A4~140.8450704225352 + C4/140.8450704225352 + E4/140.8450704225352 + G4^140.8450704225352,
140.8450704225352,
140.8450704225352: C5~140.8450704225352 + G4^140.8450704225352,
140.8450704225352: E5~140.8450704225352,
140.8450704225352,
140.8450704225352: G4^140.8450704225352,
140.8450704225352: C5~140.8450704225352,
140.8450704225352,
140.8450704225352: G4~140.8450704225352 + D4/140.8450704225352 + D5/140.8450704225352 + A4^140.8450704225352,
140.8450704225352: B4~140.8450704225352,
140.8450704225352: B4~140.8450704225352,
140.8450704225352: D5~140.8450704225352,
140.8450704225352: B4~140.8450704225352 + D4/140.8450704225352 + F5/140.8450704225352 + G4^140.8450704225352,
140.8450704225352: G4~140.8450704225352,
140.8450704225352: G5~140.8450704225352,
140.8450704225352: G4~140.8450704225352`;

let playback = playTune(loadingMusic, Infinity);

setLegend(
  [
    rightFacingPlayer_A,
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
    leftFacingPlayer_A,
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
    rightFacingPlayer_B,
    bitmap`
.....33888H.....
....99CCCCHH....
....9002002H....
....9C00C00.....
..0000CCCC0000..
..000000000000..
..000022222000..
..000002002000..
..000CC0002CC0..
..000CC0000CC0..
...00005555000..
.7....55555.....
606...005500....
606..000...00...
.....00....00...
.....000...000..`,
  ],
  [
    leftFacingPlayer_B,
    bitmap`
.....H88833.....
....HHCCCC99....
....H2002009....
.....00C00C9....
..0000CCCC0000..
..000000000000..
..000222220000..
..000200200000..
..0CC2000CC000..
..0CC0000CC000..
..00055550000...
.....55555....7.
....005500...606
...000..000..606
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
    rightFacingGunPlayer,
    bitmap`
...000000.......
..00C0CC00......
..00020020......
..0C00C00.......
0000CCCC0..0000.
000000000..0LLL0
000022222000LLL0
0000020020CCL00.
000CC00020CC0...
000CC0000000....
.0000000000.....
....00000.......
....000000......
...000...00.....
...00....00.....
...000...000....`,
  ],
  [
    leftFacingGunPlayer,
    bitmap`
.......000000...
......00CC0C00..
......02002000..
.......00C00C0..
.0000..0CCCC0000
0LLL0..000000000
0LLL000222220000
.00LCC0200200000
...0CC02000CC000
....0000000CC000
.....0000000000.
.......00000....
......000000....
.....00...000...
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
..9666666969....
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
    sky_light,
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
    sky_dark,
    bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`,
  ],
  [
    sky_black,
    bitmap`
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
0000000000000000`,
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
  ],
  [
    gun,
    bitmap`
..6.......6.....
..6.......6.....
................
............0...
...00000000000..
..0LLLLLLLLLL0..
.00LLLLLLLLLL0..
..00LL00000000..
66.0LL0.0.......
...0LL00.....66.
..0LLL0.........
..00000..6......
..........6.....
.6..............
6...............
................`,
  ],
  [
    player_bullet_left,
    bitmap`
................
................
................
................
................
...77777...77...
..7.............
..7.96F6.666....
..7.F666...666..
..7.............
...77777...7....
................
................
................
................
................`,
  ],
  [
    player_bullet_right,
    bitmap`
................
................
................
................
................
.77...77777.....
...........7....
..666.6F69.7....
666...666F.7....
...........7....
..7...77777.....
................
................
................
................
................`,
  ]
);

setBackground(sky_dark);

setSolids([
  rightFacingPlayer_A,
  leftFacingPlayer_A,
  rightFacingPlayer_B,
  leftFacingPlayer_B,
  leftPunchingPlayer,
  rightPunchingPlayer,
  rightFacingMagnetPlayer,
  leftFacingMagnetPlayer,
  leftFacingGunPlayer,
  rightFacingGunPlayer,
  npcEvilLeft,
  npcEvilRight,
  npcFacingLeft,
  npcFacingRight,
  box,
  bedrock,
]);

const levels = [
  map`
...........
...........
...i.p.h...
...........
...........`,
  map`
................
p......LP.......
..b..........cb.
..b..........cb.
..b..........cb.`,
  map`
.............
.............
.............
.cB..........
pcB........P.`,
  map`
...............
...............
..............B
.........b...BB
.......b...bbBB
p.bbbbbbb...LBB`,
  map`
..............
..1...........
..............
..............
..............
p...........L.`,
  map`
BBBBBBBBB
.........
......BBB
......B..
......B..
......B..
......B..
p.0...B..
BBBBBBB..`,
  map`
p..............
bbbbbbbbbbbbbbb
...............
...............
...............`,
  map`
......
......
......
......
......
.....b
......
....b.
......
...b..
p....B
....BB
BBBBBB`,
  map`
....B......
p...BP.....
BBB.Bbb....
..B.1......
..B........
..BBBBBBBBB`,
  map`
bbbbbbbbbb
.....bb...
p.0..bb...
bbbb....bb
...b....bb
...b....bb
...bbbbbbb`,
  map`
BBBBBBBBBBBBBB
BBBBBBBBBBBBBB
..............
..............
..............
..............
1.............
b.p.......K.P.
BBBBBBBBBBBBBB`,
  map`
...............
...............
...............
...............
...............
...............
...............
p..............
bbbbbbbbbbbbbbb`,
];

setMap(levels[level]);

setPushables({
  [rightFacingPlayer_A]: [],
  [leftFacingPlayer_A]: [],
  [rightFacingPlayer_B]: [],
  [leftFacingPlayer_B]: [],
});

// Add game title text as the player loads into the game.
addText(gameTitle, gameTitleColor);

addText("Select a character", { y: 4, color: color`2` });

//Add menu icons
addText("<__>", { y: 9, color: color`3` });

//Add menu text
addText("Press", { x: 2, y: 11, color: color`0` });
addText(" S ", { x: 7, y: 11, color: color`3` });
addText("to start!", { x: 10, y: 11, color: color`0` });

function copy(source, deep) {
  var o, prop, type;

  if (typeof source != "object" || source === null) {
    // What do to with functions, throw an error?
    o = source;
    return o;
  }

  o = new source.constructor();

  for (prop in source) {
    if (source.hasOwnProperty(prop)) {
      type = typeof source[prop];

      if (deep && type == "object" && source[prop] !== null) {
        o[prop] = copy(source[prop]);
      } else {
        o[prop] = source[prop];
      }
    }
  }
  return o;
}

/**
 * Is the given type a pickable item?
 */
function isItem(type) {
  return type == gun || type == magnet;
}

/**
 * Is the given type a living entity? (meaning gravity applies to it)
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
    type == leftFacingPlayer_A ||
    type == rightFacingPlayer_A ||
    type == rightFacingPlayer_B ||
    type == leftFacingPlayer_B ||
    type == leftPunchingPlayer ||
    type == rightPunchingPlayer ||
    type == rightFacingMagnetPlayer ||
    type == leftFacingMagnetPlayer ||
    type == leftFacingGunPlayer ||
    type == rightFacingGunPlayer
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
        if (!isPlayer(tile.type) && !isItem(tile.type)) {
          return i - playerY - 1;
        }
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
    //Confirm they are not destroying an item!
    if (isItem(tile.type)) return;
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
  return (
    type == bullet_right ||
    type == bullet_left ||
    type == player_bullet_right ||
    type == player_bullet_left
  );
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
      shooter.type === LEFT_FACING_PLACEHOLDER ||
      shooter.type == npcEvilLeft
    ) {
      addSprite(originX, originY, bullet_left);
    } else if (
      shooter.type == npcFacingRight ||
      shooter.type === RIGHT_FACING_PLACEHOLDER ||
      shooter.type == npcEvilRight
    ) {
      addSprite(originX, originY, bullet_right);
    }
  }
}

/**
 * Ellicit a bullet attack from a player.
 * Shoot a bullet.
 * @param {*} shooter attacker
 * @param {*} originX origin x
 * @param {*} originY origin y
 */
function playerShootBullet(shooter, originX, originY) {
  let currentTime = Date.now();
  if (currentTime - lastPlayerShot > shootDelay) {
    lastPlayerShot = currentTime;
    if (shooter.type == leftFacingGunPlayer) {
      addSprite(originX, originY, player_bullet_left);
    } else if (shooter.type == rightFacingGunPlayer) {
      addSprite(originX, originY, player_bullet_right);
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
  if (getFirst(player).type === RIGHT_FACING_PLACEHOLDER) {
    // Switch to the punching animation
    getFirst(player).type = rightPunchingPlayer;
    player = rightPunchingPlayer;
    attackEntity(player, particleX, particleY);
  } else if (getFirst(player).type == rightFacingGunPlayer && hasGun) {
    playerShootBullet(getFirst(player), particleX, particleY);
  }
  var intervalId = setInterval(() => {
    if (
      player &&
      getFirst(player) &&
      getFirst(player).type == rightPunchingPlayer
    ) {
      getFirst(player).type = copy(RIGHT_FACING_PLACEHOLDER);
      if (hasMagnet) {
        player = rightFacingMagnetPlayer;
      } else {
        player = copy(RIGHT_FACING_PLACEHOLDER);
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
  if (getFirst(player).type === LEFT_FACING_PLACEHOLDER) {
    // Switch to the punching animation
    getFirst(player).type = leftPunchingPlayer;
    player = leftPunchingPlayer;
    attackEntity(player, particleX, particleY);
  } else if (getFirst(player).type == leftFacingGunPlayer && hasGun) {
    playerShootBullet(getFirst(player), particleX, particleY);
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
        getFirst(player).type = copy(LEFT_FACING_PLACEHOLDER);
        player = copy(LEFT_FACING_PLACEHOLDER);
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

  if (inMenu) {
    let menuEntities = new Array();
    let pushEntities = true;
    getAll().forEach((entity) => {
      menuEntities.push(entity);
      //The greater EQUALS check is important here
      //depends on whether or not the
      //size of the menu is even or odd
      if (entity.x + 2 >= width()) {
        pushEntities = false;
        return;
      }
    });
    menuEntities.sort((a, b) => b.x - a.x);

    if (pushEntities) {
      menuEntities.forEach((e) => {
        e.x += 2;
      });
    }
    return;
  }

  let currentTime = Date.now();
  if (currentTime - lastLeftMovement >= movementDelay) {
    lastLeftMovement = currentTime;

    if (player && getFirst(player).type != LEFT_FACING_PLACEHOLDER) {
      if (hasMagnet) {
        getFirst(player).type = leftFacingMagnetPlayer;
        player = leftFacingMagnetPlayer;
      } else if (hasGun) {
        getFirst(player).type = leftFacingGunPlayer;
        player = leftFacingGunPlayer;
      } else {
        getFirst(player).type = copy(LEFT_FACING_PLACEHOLDER);
        player = copy(LEFT_FACING_PLACEHOLDER);
      }
    }
    // Move to the left direction
    getFirst(player).x -= 1;
  }
});

// Handle right directional movement
onInput("d", () => {
  if (!player || !getFirst(player)) return;

  if (inMenu) {
    let menuEntities = new Array();
    let pushEntities = true;
    getAll().forEach((entity) => {
      menuEntities.push(entity);
      if (entity.x - 2 < 0) {
        pushEntities = false;
        return;
      }
    });

    menuEntities.sort((a, b) => a.x - b.x);

    if (pushEntities) {
      menuEntities.forEach((e) => {
        e.x -= 2;
      });
    }
    return;
  }

  let currentTime = Date.now();
  if (currentTime - lastRightMovement >= movementDelay) {
    lastRightMovement = currentTime;
    if (
      player &&
      (getFirst(player).type != RIGHT_FACING_PLACEHOLDER ||
        getFirst(player).type != rightFacingPlayer_B)
    ) {
      if (hasMagnet) {
        getFirst(player).type = rightFacingMagnetPlayer;
        player = rightFacingMagnetPlayer;
      } else if (hasGun) {
        getFirst(player).type = rightFacingGunPlayer;
        player = rightFacingGunPlayer;
      } else {
        getFirst(player).type = copy(RIGHT_FACING_PLACEHOLDER);
        player = copy(RIGHT_FACING_PLACEHOLDER);
      }
    }
    // Move to the right direction
    getFirst(player).x += 1;
  }
});

//Select character in menu
onInput("s", () => {
  if (!inMenu) return;
  let centerX = Math.floor(width() / 2);
  getAll().forEach((entity) => {
    if (entity.x == centerX) {
      //Found the player we want to play with

      //Start game
      inMenu = false;
      clearText();
      level++;
      setMap(levels[level]);
      setBackground(sky_light);
      playback.end();
      playback = playTune(gameMusic, Infinity);

      //Add game title to first level
      addText(gameTitle, gameTitleColor);

      //Set player to selected player
      player = entity.type;
      getFirst(rightFacingPlayer_A).type = player;
      //Set placeholders
      RIGHT_FACING_PLACEHOLDER = player;
      if (player == rightFacingPlayer_B) {
        LEFT_FACING_PLACEHOLDER = leftFacingPlayer_B;
      }
      return;
    }
  });
});

// Gravity handler
setInterval(() => {
  if (level == 0) return;
  // Gravity for all living entities!
  getAll().forEach((entity) => {
    if (
      isEntity(entity.type) ||
      isItem(entity.type) ||
      //Gravity for blocks,
      //this exemption for level index 6
      level == 7
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
}, 60);

function gameReset() {
  // Handle player death
  if (lives <= 0 && !changingLevels) {
    // Reset level
    level = 1;
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
    hasGun = false;
    hasMagnet = false;

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
    if (dist == 0.0 && isItem(entity.type)) {
      playTune(happySound);
      clearText();
      if (entity.type == magnet) {
        hasMagnet = true;
        if (getFirst(player).type === RIGHT_FACING_PLACEHOLDER) {
          getFirst(player).type = rightFacingMagnetPlayer;
          player = rightFacingMagnetPlayer;
        } else if (entity.type === LEFT_FACING_PLACEHOLDER) {
          getFirst(player).type = leftFacingMagnetPlayer;
          player = leftFacingMagnetPlayer;
        }
      } else if (entity.type == gun) {
        hasGun = true;
        if (getFirst(player).type === RIGHT_FACING_PLACEHOLDER) {
          getFirst(player).type = rightFacingGunPlayer;
          player = rightFacingGunPlayer;
        } else if (entity.type === LEFT_FACING_PLACEHOLDER) {
          getFirst(player).type = leftFacingGunPlayer;
          player = leftFacingGunPlayer;
        }
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
      // Based on the bullet sprite type, check if it's a right-sided bullet or left.
      let xDiff =
        entity.type == bullet_right || entity.type == player_bullet_right
          ? 1
          : -1;
      let removedEntity = false;
      //Find all entities in game
      getTile(entity.x, entity.y).forEach((obstacle) => {
        // Check if the obstacle is not the same bullet.
        if (!isBullet(obstacle.type)) {
          //Check if the bullet originates from a player.
          //If so, then we expect it to hit an NPC.
          //If not, then we expect it to hit a non-NPC. (including players)
          if (
            ((entity.type == player_bullet_right ||
              entity.type == player_bullet_left) &&
              isNPC(obstacle.type)) ||
            ((entity.type == bullet_right || entity.type == bullet_left) &&
              !isNPC(obstacle.type))
          ) {
            entity.remove();
            removedEntity = true;
            // Spawn the heart particle if it was a player,
            // Spawn the explosion particle otherwise
            spawnParticle(entity.x, entity.y, isPlayer(obstacle.type) ? 1 : 0);
            //If the bullet hit a player (meaning it originates from an NPC), subtract lives
            if (isPlayer(obstacle.type)) {
              lives--;
              if (lives == 0) {
                gameReset();
              }
            }
            //If the bullet hit an NPC, it originates from a player.
            else if (isNPC(obstacle.type)) {
              obstacle.remove();
            }
            return;
          }
        }
      });
      if (removedEntity) return;
      // Move the bullet in the direction contingent on the sprite (acts as metadata)
      entity.x += xDiff;
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
    player = rightFacingPlayer_A;
    return;
  }

  // Changing levels functionality (if they reach the edge)
  if (getFirst(player).x == width() - 1 && !inMenu) {
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

    //Set player to selected player
    player = copy(RIGHT_FACING_PLACEHOLDER);
    getFirst(rightFacingPlayer_A).type = player;

    let isFinalLevel = level == levels.length - 1;

    // Clear text from previous level
    clearText();

    switch (level) {
      case 2:
        setBackground(sky_light);
        addText("Not bad...", { y: 3, color: `4` });
        addText("Can you beat this?", { y: 4, color: `3` });
        break;
      case 3:
        setBackground(sky_light);
        addText("It gets harder...", { y: 4, color: `3` });
        break;
      case 4:
        break;
      case 5:
        hasGun = false;
        setBackground(sky_dark);
        if (!hasMagnet) {
          addText("Pick up", { y: 10, color: `4` });
          addText("the magnet!", { y: 11, color: `4` });
        }
        break;
      case 6:
        setBackground(sky_black);
        hasMagnet = false;
        gravityDown = true;
        addText("Go right...", { y: 2, color: `3` });
        break;
      case 7:
        setBackground(sky_light);
        break;
      case 8:
        setBackground(sky_dark);
        break;
      case 9:
        hasGun = false;
        setBackground(sky_black);
        if (!hasMagnet) {
          addText("Collect", { x: 1, y: 6, color: `4` });
          addText("the", { x: 1, y: 7, color: `4` });
          addText("magnet", { x: 1, y: 8, color: `4` });
        }
        break;
      case 10:
        setBackground(sky_light);
        hasMagnet = false;
        gravityDown = true;
        if (!hasGun) {
          addText("Collect", { x: 0, y: 6, color: `4` });
          addText("the", { x: 0, y: 7, color: `4` });
          addText("gun", { x: 0, y: 8, color: `4` });
        }
        break;
    }

    if (level == levels.length - 1) {
      hasGun = false;
      setBackground(sky_black);
      addText("You win!", { y: 3, color: `4` });
    }

    if (isFinalLevel) {
      playback.end();
      playTune(victoryMusic, 3);
    }
  }
  if (changingLevels) return;

  // Render lives on the screen
  let text = "Lives: " + lives;
  if (level < levels.length - 1 && level > 0) {
    addText(text, { x: width() - 4, y: 5, color: `5` });
  }
}, 40);
