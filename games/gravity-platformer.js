/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

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

setSolids([platform]);

let currentPlayer;
let currentGoal;

let level = -1;

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
];

const resetGravity = () => gravity = 1;

const invertGravity = () => {
  gravity *= -1;
};

const toggleNextMap = () => {
  level++;
  
  if (level > levels.length - 1) return;

  setMap(levels[level]);

  currentPlayer = getFirst(player);
  currentPlayer.velocityY = 0;
  
  currentGoal = getFirst(goal);

  resetGravity();
};

toggleNextMap();

const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const onFloor = () => getTile(currentPlayer.x, currentPlayer.y + 1).some(tile => tile.type == platform);
const belowCeiling = () => getTile(currentPlayer.x, currentPlayer.y - 1).some(tile => tile.type == platform);

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

const update = () => {
  handleVerticalVelocity();
  handleGravity();
  handleGravityInverters();
  handleGoalChecking();
};

onInput("w", () => {
  if (gravity > 0 && !onFloor()) return;
  if (gravity < 0 && !belowCeiling()) return;
  currentPlayer.velocityY -= 5;
});

onInput("a", () => {
  currentPlayer.x -= 1;
});

onInput("d", () => {
  currentPlayer.x += 1;
});

// handle update

const handleUpdate = async () => {
  while (true) {
    update();
    await wait(updateDelay);
  };
};

handleUpdate();