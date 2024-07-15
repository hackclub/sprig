/*
@title: Gravity Platformer
@author: NotRewd
@tags: [platformer]
@addedOn: 2024-00-00
*/

// How frequently should the update function be called?
const updateDelay = 50;

// Initializing sprites
const player = "p";
const invertedPlayer = "d";
const platform = "w";
const gravityInverter = "i";
const goal = "g";

const blueCoin = "b";
const redCoin = "r";
const yellowCoin = "y";

const blueWall = "a";
const redWall = "c";
const yellowWall = "e";

// How high should the player jump?
const jumpForce = 5;

// How strong should be the gravity? Best when left to one or negative one
let gravity = 1;

let maxJumps = 2;
let currentJumps = 0;

// Assigning bitmaps to sprites
setLegend(
  [ player, bitmap`
5555555555555555
5555555555555555
5555555555555555
5500005555000055
5500005555000055
5500005555000055
5500005555000055
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555000000005555
5555000000005555
5555555555555555
5555555555555555
5555555555555555` ],
  [ invertedPlayer, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555000000005555
5555000000005555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5500005555000055
5500005555000055
5500005555000055
5500005555000055
5555555555555555
5555555555555555
5555555555555555` ],
  [ platform, bitmap`
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
0000000000000000` ],
  [ blueCoin, bitmap`
................
................
................
......5555......
.....555555.....
....55777755....
...5577555555...
...5575555555...
...5575555555...
...5575555555...
....55555555....
.....555555.....
......5555......
................
................
................` ],
  [ redCoin, bitmap`
................
................
................
......3333......
.....333333.....
....33CCCC33....
...33CC333333...
...33C3333333...
...33C3333333...
...33C3333333...
....33333333....
.....333333.....
......3333......
................
................
................` ],
  [ yellowCoin, bitmap`
................
................
................
......6666......
.....666666.....
....66FFFF66....
...66FF666666...
...66F6666666...
...66F6666666...
...66F6666666...
....66666666....
.....666666.....
......6666......
................
................
................` ],
  [ blueWall, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ redWall, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [ yellowWall, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ],
  [ gravityInverter, bitmap`
................
................
.....HHHHHH.....
...HH888888HH...
...H88666688H...
..H8866666688H..
..H8666666668H..
..H8666666668H..
..H8666666668H..
..H8666666668H..
..H8866666688H..
...H88666688H...
...HH888888HH...
.....HHHHHH.....
................
................`],
  [ goal, bitmap`
................
................
.....444444.....
...4444444444...
...4444444444...
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
...4444444444...
...4444444444...
.....444444.....
................
................`]
);

// Setting the solids
setSolids([player, invertedPlayer, platform, blueWall, redWall, yellowWall]);

// Defining which sprites are coins
const coins = [
  blueCoin,
  redCoin,
  yellowCoin
];

// Defining which sprites are coin walls, their indexes need to correspond with the indexes of coins
const coinWalls = [
  blueWall,
  redWall,
  yellowWall
];

// What is our current player and goal in this level?
let currentPlayer;
let currentGoal;

// The current level that we are on
let level = 0;

// Current coin and coin wall instances found in the level
let coinInstances = [];
let coinWallInstances = [];

// List of all levels
const levels = [
  map`
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
p..................g
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
...................g
..........wwwwwwwwww
....................
....................
......wwww..........
p...................
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
....................
....................
....................
...................g
................wwww
....................
............www.....
....................
........www.........
....................
....www.............
p...................
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
......wwwwwwwwwww...
............w.......
............w.......
............w....www
g...........w.......
wwwwww......w.......
............wwwww...
............w.......
............w.......
............w....www
....................
p...................
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
....................
....................
....................
....................
...................g
.............wwwwwww
.............w......
.............w......
.............w......
.............w......
.............w......
p............w......
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
....................
....................
....................
....................
................r...
.............wwwwwww
.............w......
.............w......
.............w......
.............c......
.............c......
p............c.....g
wwwwwwwwwwwwwwwwwwww`,
  map`
....................
....................
....................
..wwww..wwwwwwwww...
.....w....w.....a...
.....w....w.....a...
.....w....w.....a...
ww...w....w.....wwww
.....w....w.........
.....w....w.........
.....w....w........r
..wwww....wwwwwwwwww
.....a....c.........
.....a....c.........
p....a..b.c........g
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
g...................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
p..................i
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
g...w...............
....w...............
....w.......www.....
....w...............
....w...............
....w....www........
....w...............
....w...............
....wwwww...........
....................
....................
....................
....................
p..................i
wwwwwwwwwwwwwwwwwwww`,
  map`
.wwwwwwwwwwwwwwwwwww
.wi................w
.w.wwwwwwwwwwwwwww.w
.w.wi............w.w
.w.w.wwwwwwwwwww.w.w
.w.w.wi........w.w.w
.w.w.w.wwwwwww.w.w.w
.w.w.w.w.....w.w.w.w
.w.w.w......gw.w.w.w
.w.w.wwwwwwwww.w.w.w
.w.w..........iw.w.w
.w.wwwwwwwwwwwww.w.w
.w..............iw.w
.wwwwwwwwwwwwwwwww.w
p.................iw
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
g.w.w.w.w.w.w.w.w...
..w.w.w.w.w.w.w.....
..w.w.w.w.w.w.......
..w.w.w.w.w.........
..w.w.w.w...........
..w.w.w.............
..w.w...........w...
..w...........w.w...
............w.w.w...
..........w.w.w.w...
........w.w.w.w.w...
......w.w.w.w.w.w...
....w.w.w.w.w.w.w...
p.w.w.w.w.w.w.w.w..i
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
g.....w.......w.....
......wr......w.....
......wwww....www...
......w.......w.....
......w.......w.....
......w.......w..ww.
......w....wwww.....
......w.......w.....
......w.......www...
......w.......w.....
......wwwwww..w.....
....................
..................cc
p.................ci
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
i..w...w.........c..
.w.w.w.w.w.......c..
.w.w.w.w.w.......w..
.w.w.w.w.w.......w.w
.w.w.w.w.w.......w..
bw...w...w.......ww.
wwwwwweeewwww....w..
r.a..w...w.......w.w
w.a..w.g.w.......w..
..a..wwwww.......ww.
.ww..............w..
..w..............w.w
w.w..............e..
i.wp............ie.y
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`,
];

// A shorthand for resetting the gravity
const resetGravity = () => gravity = 1;

const invertGravity = () => {
  gravity *= -1;

  // Get our current position and determine which sprite should be used
  const { x, y } = currentPlayer;
  const sprite = gravity > 0 ? player : invertedPlayer;

  // Remove the current player sprite
  currentPlayer.remove();

  // Add a new sprite on our saved location
  addSprite(x, y, sprite);

  // Assign the newly created player sprite
  currentPlayer = getFirst(sprite);
  currentPlayer.velocityY = 0;
};

// When loading a new level, the level needs to locate and load the player along with other features
const loadPlayer = () => {
  currentPlayer = getFirst(player);

  if (currentPlayer === undefined) return;
  
  currentPlayer.velocityY = 0;
  loadCoinWalls();
  currentGoal = getFirst(goal);
  
  resetGravity();
};

// Loading all coin walls that can be found in the current level
const loadCoinWalls = () => {
  coinInstances = [];
  coinWallInstances = [];
  
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    const coinWall = coinWalls[i];

    if (coin === undefined || coinWall === undefined) continue;

    const coinInstance = getFirst(coin);
    const walls = getAll(coinWall);

    if (coinInstance === undefined || walls === undefined) continue;

    coinInstances.push(coinInstance);
    coinWallInstances.push(walls);
  }
};

// Texts that are displayed in the game
const loadStartScreenText = () => {
  addText("Gravity Platformer", {
    x: 1,
    y: 3,
    color: color`2`
  });
  
  addText("Press any valid", {
    x: 2,
    y: 10,
    color: color`2`
  });
  
  addText("key to play!", {
    x: 4,
    y: 11,
    color: color`2`
  });
}

const loadEndScreenText = () => {
    addText("You Win!", {
      x: 7,
      y: 3,
      color: color`2`
    });

    addText("Press J to play", {
      x: 3,
      y: 10,
      color: color`2`
    });

    addText("again!", {
      x: 8,
      y: 11,
      color: color`2`
    });
};

const loadTutorialText1 = () => {
  addText("Reach the green\ngoal to continue\n\nMove using A\nand D keys", {
    x: 2,
    y: 2,
    color: color`1`
  });
};

const loadTutorialText2 = () => {
  addText("Press W to jump", {
    x: 2,
    y: 2,
    color: color`1`
  });
};

const loadTutorialText3 = () => {
  addText("Long press W to\njump higher", {
    x: 2,
    y: 2,
    color: color`1`
  });
};

const loadTutorialText4 = () => {
  addText("A key will\nunlock a door\nwith the\nappropriate color", {
    x: 2,
    y: 2,
    color: color`1`
  });
};

const loadTutorialText5 = () => {
  addText("A gravity inverter\nwill invert the\ngravity", {
    x: 1,
    y: 6,
    color: color`1`
  });
};

// Determine which text should be displayed where
const loadLevelText = () => {
  if (level === 1) loadTutorialText1();
  else if (level === 2) loadTutorialText2();
  else if (level === 5) loadTutorialText3();
  else if (level === 6) loadTutorialText4();
  else if (level === 8) loadTutorialText5();
};

const changeMap = (index) => {
  if (index > levels.length - 1) return;

  setMap(levels[index]);

  // Clear all the texts if there are any
  clearText();

  // If we are in the first level, it is probably the start screen, so display the start screen text
  if (index === 0) loadStartScreenText();

  // Same idea with the end level
  else if (index === levels.length - 1) loadEndScreenText();

  // Otherwise we just want to load the player and potentially any text that belongs to a level
  else {
    loadLevelText();
    loadPlayer();
  }
};

// A shorthand for loading the next map
const toggleNextMap = () => {
  level++;
  changeMap(level);
};

// When the game first begins, we need to set the map for the first time
changeMap(level);

// A function that is used in the update method to wait so that the computer can process the call
const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

// Are we on the floor? 
const onFloor = () => getTile(currentPlayer.x, currentPlayer.y + 1).some(tile => tile.type == platform || coinWalls.includes(tile.type));

// Are we on the ceiling?
const belowCeiling = () => getTile(currentPlayer.x, currentPlayer.y - 1).some(tile => tile.type == platform || coinWalls.includes(tile.type));

// Handle our gravity
const handleGravity = () => {
  if (currentPlayer.velocityY < 0) return;
  currentPlayer.velocityY += 1;
};

const handleVerticalVelocity = () => {
  // Get the current velocity
  const velocity = currentPlayer.velocityY;

  // Add or subtract from the velocity until the velocity is back at zero
  if (velocity !== 0) currentPlayer.velocityY += velocity > 0 ? -1 : 1;
  
  if (velocity > 0) {
    // Depends on whether the gravity is inverted or not
    if (gravity > 0 && onFloor()) return;
    if (gravity < 0 && belowCeiling()) return;
    currentPlayer.y += gravity;
  }
  else if (velocity < 0) {
    if (gravity > 0 && belowCeiling()) return;
    if (gravity < 0 && onFloor()) return;
    currentPlayer.y -= gravity;
  }
};

// Check for goal collision
const handleGoalChecking = () => {
  if (currentPlayer.x !== currentGoal.x || currentPlayer.y !== currentGoal.y) return;
  toggleNextMap();
};

// Check for gravity inverter collision
const handleGravityInverters = () => {
  const gravityInverters = getAll(gravityInverter);

  // Check for each one gravity inverter that there currently is in the level
  for (let i = 0; i < gravityInverters.length; i++) {
    const gravityInverter = gravityInverters[i];
    if (currentPlayer.x !== gravityInverter.x || currentPlayer.y !== gravityInverter.y) continue;
    gravityInverter.remove();
    invertGravity();
  }
};

// Check for coin collision
const handleCoinWalls = () => {
  for (let i = 0; i < coinInstances.length; i++) {
    const coinInstance = coinInstances[i];
    const walls = coinWallInstances[i];

    if (coinInstance === undefined || walls === undefined) continue;
    if (currentPlayer.x !== coinInstance.x || currentPlayer.y !== coinInstance.y) continue;

    coinInstance.remove();

    // Remove all the walls associated with the coin
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      wall.remove();
    }
  }
};

const handleJumpsReset = () => {
  if (gravity > 0 && !onFloor()) return;
  if (gravity < 0 && !belowCeiling()) return;
  if (currentPlayer.velocityY < 0) return;
  
  currentJumps = 0;
};

// An update function that runs continuously
const update = () => {
  if (currentPlayer === undefined) return;

  console.log(currentJumps);
  handleJumpsReset();
  handleVerticalVelocity();
  handleGravity();
  handleGravityInverters();
  handleCoinWalls();
  handleGoalChecking();
};

// For player jumping
const playerJump = () => {
  if (currentPlayer === undefined) return;
  if (currentJumps >= maxJumps) return;
  
  currentPlayer.velocityY -= jumpForce;
  currentJumps++;
};

// For moving left
const moveLeft = () => {
  if (currentPlayer === undefined) return;
  currentPlayer.x -= 1;
};

// For moving right
const moveRight = () => {
  if (currentPlayer === undefined) return;
  currentPlayer.x += 1;
};

const resetLevel = () => {
  // If we are on the end screen, we want to reset the level to 0, otherwise just reset the current level
  level = level === levels.length - 1 ? 0 : level;
  
  changeMap(level);
};

// Assign functions to inputs
onInput("w", () => playerJump());
onInput("a", () => moveLeft());
onInput("d", () => moveRight());
onInput("j", () => resetLevel());

// If we are on the start screen, then pressing any input will result in toggling the next map hence, starting the game
afterInput(() => {
  if (level === 0) toggleNextMap();
});

// Handle the update and its delay, needs to be an asynchronous function
const handleUpdate = async () => {
  while (true) {
    update();
    await wait(updateDelay);
  };
};

handleUpdate();
