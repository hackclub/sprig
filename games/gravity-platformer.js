/*
@title: Sprig Platformer Game
@author: NotRewd
@tags: [platformer]
@addedOn: 2024-00-00
*/

const updateDelay = 50;

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

const whiteSquare = "f";
const graySquare = "g";

const jumpForce = 1;
let gravity = 1;

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
................`],
  [ whiteSquare, bitmap`
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
2222222222222222` ],
  [ graySquare, bitmap`
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
LLLLLLLLLLLLLLLL` ]
);

setSolids([player, invertedPlayer, platform, blueWall, redWall, yellowWall]);

const coins = [
  blueCoin,
  redCoin,
  yellowCoin
];

const coinWalls = [
  blueWall,
  redWall,
  yellowWall
];

let currentPlayer;
let currentGoal;

let level = 13;

let coinInstances = [];
let coinWallInstances = [];

const levels = [
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwffwwffwwwwffwwwwffwwffwwwwwwwwww
wwwwwwwwffwwffwwffwwffwwffwwffwwwwwwwwww
wwwwwwwwffwwffwwffwwffwwffwwffwwwwwwwwww
wwwwwwwwwwffwwwwffwwffwwffwwffwwwwwwwwww
wwwwwwwwwwffwwwwffwwffwwffwwffwwwwwwwwww
wwwwwwwwwwffwwwwffwwffwwffwwffwwwwwwwwww
wwwwwwwwwwffwwwwffwwffwwffwwffwwwwwwwwww
wwwwwwwwwwffwwwwwwffwwwwwwffwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwffwwwwwwffwwffffffwwfffwwffwwwww
wwwwwwwwffwwwwwwffwwwwffwwwwffffwffwwwww
wwwwwwwwffwwwwwwffwwwwffwwwwffwfwffwwwww
wwwwwwwwffwwwwwwffwwwwffwwwwffwwfffwwwww
wwwwwwwwffwwffwwffwwwwffwwwwffwwfffwwwww
wwwwwwwwffwwffwwffwwwwffwwwwffwwwffwwwww
wwwwwwwwffwwffwwffwwwwffwwwwffwwwffwwwww
wwwwwwwwwwffwwffwwwwffffffwwffwwwffwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
];

const resetGravity = () => gravity = 1;

const invertGravity = () => {
  gravity *= -1;

  const { x, y } = currentPlayer;
  const sprite = gravity > 0 ? player : invertedPlayer;
  
  currentPlayer.remove();
  
  addSprite(x, y, sprite);

  currentPlayer = getFirst(sprite);
  currentPlayer.velocityY = 0;
};

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

const changeMap = (index) => {
  if (index > levels.length - 1) return;

  setMap(levels[index]);

  currentPlayer = getFirst(player);

  if (currentPlayer === undefined) return;
  
  currentPlayer.velocityY = 0;

  loadCoinWalls();
  
  currentGoal = getFirst(goal);

  resetGravity();
};

const resetMap = () => changeMap(level);

const toggleNextMap = () => {
  level++;
  changeMap(level);
};

changeMap(level);

const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const onFloor = () => getTile(currentPlayer.x, currentPlayer.y + 1).some(tile => tile.type == platform || coinWalls.includes(tile.type));
const belowCeiling = () => getTile(currentPlayer.x, currentPlayer.y - 1).some(tile => tile.type == platform || coinWalls.includes(tile.type));

const handleGravity = () => {
  if (currentPlayer.velocityY < 0) return;
  currentPlayer.velocityY += 1;
};

const handleVerticalVelocity = () => {
  const velocity = currentPlayer.velocityY;

  if (velocity !== 0) currentPlayer.velocityY += velocity > 0 ? -1 : 1;
  
  if (velocity > 0) {
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

const handleGoalChecking = () => {
  if (currentPlayer.x !== currentGoal.x || currentPlayer.y !== currentGoal.y) return;
  toggleNextMap();
};

const handleGravityInverters = () => {
  const gravityInverters = getAll(gravityInverter);

  for (let i = 0; i < gravityInverters.length; i++) {
    const gravityInverter = gravityInverters[i];
    if (currentPlayer.x !== gravityInverter.x || currentPlayer.y !== gravityInverter.y) continue;
    gravityInverter.remove();
    invertGravity();
  }
};

const handleCoinWalls = () => {
  for (let i = 0; i < coinInstances.length; i++) {
    const coinInstance = coinInstances[i];
    const walls = coinWallInstances[i];

    if (coinInstance === undefined || walls === undefined) continue;
    if (currentPlayer.x !== coinInstance.x || currentPlayer.y !== coinInstance.y) continue;

    coinInstance.remove();

    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      wall.remove();
    }
  }
};

const update = () => {
  handleVerticalVelocity();
  handleGravity();
  handleGravityInverters();
  handleCoinWalls();
  handleGoalChecking();
};

onInput("w", () => {
  if (currentPlayer === undefined) return;
  if (gravity > 0 && !onFloor()) return;
  if (gravity < 0 && !belowCeiling()) return;
  
  currentPlayer.velocityY -= 5;
});

onInput("a", () => {
  if (currentPlayer === undefined) return;
  
  currentPlayer.x -= 1;
});

onInput("d", () => {
  if (currentPlayer === undefined) return;
  
  currentPlayer.x += 1;
});

onInput("j", () => {
  changeMap(level);
});

// handle update

const handleUpdate = async () => {
  while (true) {
    update();
    await wait(updateDelay);
  };
};

handleUpdate();