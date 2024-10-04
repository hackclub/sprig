/*
@title: multiplayer_soccer
@author: shannon yeow
@tags: ['multiplayer']
@addedOn: 2022-08-12
*/

const player = "p";
const player1 = "1";
const box = "b";
const wall = "w";
const wallthrough = "2";
const goal = "g";

setLegend(
  [ player, bitmap`
................
....11111111....
...1111111111...
....88888888....
....88888888....
....80888808....
....88800888....
....88888888....
......8888......
...8333333338...
.....333333.....
.....333333.....
.....555555.....
.....555555.....
.....8....8.....
................`],
  [ player1, bitmap`
................
....LLLLLLLL....
...LLLLLLLLLL...
....44444444....
....44444444....
....40444404....
....44400444....
....44444444....
......4444......
...4777777774...
.....777777.....
.....777777.....
.....666666.....
.....666666.....
.....4....4.....
................`],
  [ box, bitmap`
................
................
................
................
................
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.....000000.....
................
................
................
................
................`],
  [ wall, bitmap`
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
0000000000000000`],
  [ wallthrough, bitmap`
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
0000000000000000`],
  [ goal, bitmap`
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333
3333333333333333`],
);

setSolids([player, player1, box, wall]);

let level = 0;
const levels = [
  map`
222wwww
21....g
2.....w
w..b..w
2.....2
2....p2
222w222`,
  map`
222wwgw222
2........2
2........2
w........w
w1...b...w
w...b...pw
w........w
2........2
2........2
222wgww222`,
  map`
222wwwww222
2....b....2
2.........2
w.........w
w.........w
g1.......pg
w.........w
w.........w
2.........2
2....b....2
222wwwww222`,
  map`
222wwwwwwwwgw
21..........g
2...........w
w...........w
w...........w
w....b.b....w
w...........w
w....b.b....w
w...........w
w...........w
w...........2
g..........p2
wgwwwwwwww222`,
  map`
222222222wwwwww
2...2...w...1.w
2.2.2.2.w.ww.pw
2.2.2.2.w..wwww
2.2.2.2.w.....2
2..g2.2.w.www.2
2.222.2.w.2...2
2.....2.w.2.2.2
2.22222.w.2.2.2
2.....2gw.2.2.2
2.222.222.2.2.2
2.....2...2.2.2
2.22222.2.2.2.2
2.......2.2b.b2
222222222222222`
  ];

const currentLevel = levels[level];
setMap(currentLevel);

setMap(levels[level]);

setPushables({
  [ player ]: [box, player1],
  [ player1 ]: [box, player],
  [ box ]: [wallthrough]
});

onInput("s", () => {
  const playerTile = getFirst(player);
  const x = playerTile.x;
  const y = playerTile.y;

  const oneBelow = getTile(x, y + 1)
  const twoBelow = getTile(x, y + 2)
  const oneBelowHasBall = oneBelow.some(sprite => sprite.type === box);
  const twoBelowHasWall = twoBelow.some(sprite => sprite.type === wallthrough);

  if (oneBelowHasBall && twoBelowHasWall) return;
  
  playerTile.y += 1;
});

onInput("d", () => {
  const playerTile1 = getFirst(player);
  const x = playerTile1.x;
  const y = playerTile1.y;

  const oneOver = getTile(x + 1, y)
  const twoOver = getTile(x + 2, y)
  const oneOverHasBall = oneOver.some(sprite => sprite.type === box);
  const twoOverHasWall = twoOver.some(sprite => sprite.type === wallthrough);

  if (oneOverHasBall && twoOverHasWall) return;
  playerTile1.x += 1;
});
onInput("w", () => {
  const playerTile2 = getFirst(player);
  const x = playerTile2.x;
  const y = playerTile2.y;

  const oneAbove = getTile(x, y - 1)
  const twoAbove = getTile(x, y - 2)
  const oneAboveHasBall = oneAbove.some(sprite => sprite.type === box);
  const twoAboveHasWall = twoAbove.some(sprite => sprite.type === wallthrough);

  if (oneAboveHasBall && twoAboveHasWall) return;
  playerTile2.y -= 1;
});

onInput("a", () => {
  const playerTile3 = getFirst(player);
  const x = playerTile3.x;
  const y = playerTile3.y;

  const oneLeft = getTile(x - 1, y)
  const twoLeft = getTile(x - 2, y)
  const oneLeftHasBall = oneLeft.some(sprite => sprite.type === box);
  const twoLeftHasWall = twoLeft.some(sprite => sprite.type === wallthrough);

  if (oneLeftHasBall && twoLeftHasWall) return;
  playerTile3.x -= 1;
});

onInput("k", () => {
  const playerTile4 = getFirst(player1);
  const x = playerTile4.x;
  const y = playerTile4.y;

  const oneBelow1 = getTile(x, y + 1)
  const twoBelow1 = getTile(x, y + 2)
  const oneBelowHasBall1 = oneBelow1.some(sprite => sprite.type === box);
  const twoBelowHasWall1 = twoBelow1.some(sprite => sprite.type === wallthrough);

  if (oneBelowHasBall1 && twoBelowHasWall1) return;
  playerTile4.y += 1;
});

onInput("l", () => {
  const playerTile5 = getFirst(player1);
  const x = playerTile5.x;
  const y = playerTile5.y;

  const oneOver1 = getTile(x + 1, y)
  const twoOver1 = getTile(x + 2, y)
  const oneOverHasBall1 = oneOver1.some(sprite => sprite.type === box);
  const twoOverHasWall1 = twoOver1.some(sprite => sprite.type === wallthrough);

  if (oneOverHasBall1 && twoOverHasWall1) return;
  playerTile5.x += 1;
});
onInput("i", () => {
  const playerTile6 = getFirst(player1);
  const x = playerTile6.x;
  const y = playerTile6.y;

  const oneAbove1 = getTile(x, y - 1)
  const twoAbove1 = getTile(x, y - 2)
  const oneAboveHasBall1 = oneAbove1.some(sprite => sprite.type === box);
  const twoAboveHasWall1 = twoAbove1.some(sprite => sprite.type === wallthrough);

  if (oneAboveHasBall1 && twoAboveHasWall1) return;
  playerTile6.y -= 1;
});

onInput("j", () => {
  const playerTile7 = getFirst(player1);
  const x = playerTile7.x;
  const y = playerTile7.y;

  const oneLeft1 = getTile(x - 1, y)
  const twoLeft1 = getTile(x - 2, y)
  const oneLeftHasBall1 = oneLeft1.some(sprite => sprite.type === box);
  const twoLeftHasWall1 = twoLeft1.some(sprite => sprite.type === wallthrough);

  if (oneLeftHasBall1 && twoLeftHasWall1) return;
  playerTile7.x -= 1;
});

//onInput("e", () => {
  //const currentLevel = levels[level];
  //if (currentLevel !== undefined) {
    //clearText("");
    //setMap(currentLevel);}});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
   level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4 });
    }
  }
});


