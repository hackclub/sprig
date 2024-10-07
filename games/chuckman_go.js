/*
@title: chuckman_go
@author: faisalsayed10
@tags: ['strategy']
@addedOn: 2022-11-17
*/

let gameover = false;

const player = "p";
const grass = "g";
const walkable = "w";
const pathlineV = "v";
const pathlineH = "h";
const enemyUp = "u";
const enemyDown = "d";
const enemyLeft = "l";
const enemyRight = "r";
const enemyLeftRight = "a";
const enemyUpDown = "b";
const finish = "f";

setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....006000.....
....06666600....
....06060660....
....06666660....
....06666660....
....0066660.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ enemyUp, bitmap`
................
.......0........
......000.......
.....0.0.0......
.......0........
.......0........
................
.....33333......
....3333333.....
...333232333....
...333333333....
...332333233....
...333222333....
....3333333.....
.....33333......
................`],
  [ enemyDown, bitmap`
................
......33333.....
.....3333333....
....333222333...
....332333233...
....333333333...
....333232333...
.....3333333....
......33333.....
................
........0.......
........0.......
......0.0.0.....
.......000......
........0.......
................`],
  [ enemyLeft, bitmap`
................
................
................
................
.........3333...
........333333..
...0...33332333.
..0....33233233.
.00000.33333233.
..0....33233233.
...0...33332333.
........333333..
.........3333...
................
................
................`],
  [ enemyRight, bitmap`
................
................
................
...3333.........
..333333........
.33323333...0...
.33233233....0..
.33233333.00000.
.33233233....0..
.33323333...0...
..333333........
...3333.........
................
................
................
................`],
  [ grass, bitmap`
4444444444444444
4DDD44D4444DD444
44444D4444444444
4444444444444444
4DDD4444D4444D44
4444444DD44444D4
4444444444D44444
4444DD4444D44444
4DD444444444DD44
444444D444444444
4444444444DD4444
44D4444444444444
4444444444444444
444DD44DDD44444D
4444444444444444
44DD444DD444D444`],
  [ walkable, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222000000022222
2222022022022222
2222022022022222
2222000200022222
2222022022022222
2222022022022222
2222000000022222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ pathlineV, bitmap`
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........
.......0........`],
  [ pathlineH, bitmap`
................
................
................
................
................
................
................
0000000000000000
................
................
................
................
................
................
................
................`],
  [ finish, bitmap`
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
6666666666666666`],
  [ enemyLeftRight, bitmap`
................
................
................
................
................
.....333333.....
....33322333....
..0.33233233.0..
.0..33322333..0.
0...32333323...0
.0..33222233..0.
..0.33333333.0..
.....333333.....
................
................
................`],
  [ enemyUpDown, bitmap`
.......0........
......0.0.......
.....0...0......
................
.....333333.....
....33322333....
....33233233....
....33322333....
....32333323....
....33222233....
....33333333....
.....333333.....
................
.....0...0......
......0.0.......
.......0........`],
);

const walk = tune`
500: b4^500,
15500`;
const die = tune`
150: a4/150 + g4/150,
150: g4/150 + f4/150,
150: f4/150 + e4/150,
150: d4/150 + e4/150,
150: d4/150 + c4/150,
150: c4/150,
3900`;
const kill = tune`
258.62068965517244: d5-258.62068965517244 + c5-258.62068965517244 + b4-258.62068965517244 + a4-258.62068965517244,
8017.241379310346`;

let level = 0;

const levels = [
  map`
phwhwhdgg
vgvgggvgg
whuhlgwhw
vgvgvgvgv
whuhlhugf
vgvgggvgg
whwhwhwgg`,
  map`
whwhwhwhwhwhw
vgvgvgvgvgvgv
phrhwhlhwhdhw
vgvgvgvgvgvgg
dgwhwhuhuhlgf
vgggggvgvgvgv
ugggggwhlhwhw
ggggggvgvgvgg
ggggggwhwhugg`,
  map`
phwhlhwhdhw
vgvgvgvgvgg
whwhuhuhagf
vgggvgvgvgv
wgggwhlhdgw
vgggvgvgvgv
whrhwhwhwhw
ggggvgggvgg
ggggwhwhugg`,
  map`
phrhwhwhdhw
vgvgvgvgvgv
whahuhahdhw
vgggvgvgvgv
wgggwhahdgw
vgggvgvgvgv
whrhwhwhwhw
ggggggggvgg
ggggggggwhf`,
  map`
whwhwhrhwgggdgg
vgggvgvgvgggvgg
pgggwhlhwhbhwhw
vgggvgvgvgggggv
whlhwhuhwgggggw
vgvgvgggggggggv
whuhwhwhlhwhwhw
vgggvgvgvgvgggv
whwhwhbhwguhwhd
vgggvgvgvgvgggv
uhwhwhwhwhuhrhw
vgvgvgggvgvgggv
whuhwgggwhahwhf`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, grass ]);

setPushables({
});

const startingPoint = [{x:0, y:0}, {x:0, y:2}, {x:0, y:0}, {x:0, y:0}, {x:0, y:2}];

addSprite(startingPoint[level].x, startingPoint[level].y, walkable)

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  if (gameover) return;
  playTune(walk);
  const coords = { x: getFirst(player).x, y: getFirst(player).y }
  const nextTile = getTile(coords.x, coords.y - 1)[0]
  if (nextTile && (nextTile.type === "v" || nextTile.type === "h")) {
    getFirst(player).y -= 2;
  } else {
    getFirst(player).y -= 1;
  }
});
onInput("a", () => {
  if (gameover) return;
  playTune(walk);
  const coords = { x: getFirst(player).x, y: getFirst(player).y }
  const nextTile = getTile(coords.x - 1, coords.y)[0]
  if (nextTile && (nextTile.type === "v" || nextTile.type === "h")) {
    getFirst(player).x -= 2;
  } else {
    getFirst(player).x -= 1;
  }
});
onInput("s", () => {
  if (gameover) return;
  playTune(walk);
  const coords = { x: getFirst(player).x, y: getFirst(player).y }
  const nextTile = getTile(coords.x, coords.y + 1)[0]
  if (nextTile && (nextTile.type === "v" || nextTile.type === "h")) {
    getFirst(player).y += 2;
  } else {
    getFirst(player).y += 1;
  }
});

onInput("d", () => {
  if (gameover) return;
  playTune(walk);
  const coords = { x: getFirst(player).x, y: getFirst(player).y }
  const nextTile = getTile(coords.x + 1, coords.y)[0]
  if (nextTile && (nextTile.type === "v" || nextTile.type === "h")) {
    getFirst(player).x += 2;
  } else {
    getFirst(player).x += 1;
  }
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    addSprite(startingPoint[level].x, startingPoint[level].y, walkable)
    gameover = false;
  }
});

afterInput(() => {
  if (gameover) return;
  
  const playerCoords = { x: getFirst(player).x, y: getFirst(player).y }

  const topEnemy = getTile(playerCoords.x, playerCoords.y - 2)[0]
  const bottomEnemy = getTile(playerCoords.x, playerCoords.y + 2)[0]
  const leftEnemy = getTile(playerCoords.x - 2, playerCoords.y)[0]
  const rightEnemy = getTile(playerCoords.x + 2, playerCoords.y)[0]
  let enemyHits = 0;

  if (topEnemy && getTile(playerCoords.x, playerCoords.y - 1)[0].type !== grass && /b|d/.test(topEnemy.type)) {
    topEnemy.y += 2;
    enemyHits = tilesWith(player, enemyDown).length || tilesWith(player, enemyUpDown).length;
  } else if (bottomEnemy && getTile(playerCoords.x, playerCoords.y + 1)[0].type !== grass && /b|u/.test(bottomEnemy.type)) {
    bottomEnemy.y -= 2;
    enemyHits = tilesWith(player, enemyUp).length || tilesWith(player, enemyUpDown).length;
  } else if (leftEnemy && getTile(playerCoords.x - 1, playerCoords.y)[0].type !== grass && /a|r/.test(leftEnemy.type)) {
    leftEnemy.x += 2;
    enemyHits = tilesWith(player, enemyRight).length || tilesWith(player, enemyLeftRight).length;
  } else if (rightEnemy && getTile(playerCoords.x + 1, playerCoords.y)[0].type !== grass && /a|l/.test(rightEnemy.type)) {
    rightEnemy.x -= 2;
    enemyHits = tilesWith(player, enemyLeft).length || tilesWith(player, enemyLeftRight).length;
  }

  if (enemyHits >= 1) {
    playTune(die);
    addText("you lose!\nPress j", { x: 5, y: 7, color: color`3` });
    gameover = true;
    return;
  }

  const playerHits = getTile(playerCoords.x, playerCoords.y);

  if (playerHits.length > 1 && /u|d|l|r|a|b/.test(playerHits[1].type)) {
    playTune(kill);
    clearTile(playerCoords.x, playerCoords.y);
    addSprite(playerCoords.x, playerCoords.y, player);
    addSprite(playerCoords.x, playerCoords.y, walkable);
  }
  
  const numberCovered = tilesWith(player, finish).length;

  if (numberCovered === 1) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      addSprite(startingPoint[level].x, startingPoint[level].y, walkable)
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
