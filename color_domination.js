/*
@title: color_domination
@author: adrianoapj
*/

/*
W, A, S, D - to move
J - to select

It's a multiplayer game, every player has a color, orange starts playing
Once you dominate a space, it's the next player's turn
You can dominate spaces right next to your own
Your objective is to make it impossible to the other player to dominate a space
*/

const selection = "s";
const pink = "r";
const orange = "g";
const aarish = "b";

let currentTurn = orange;
let gameIsRunning = true;

setLegend(
  [ selection, bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666`],
  [ pink, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888822222228888
8888888888828888
8888888888828888
8888888888828888
8888822222228888
8888828888888888
8888828888888888
8888828888888888
8888828888828888
8888822222228888
8888888888888888
8888888888888888
8888888888888888`],
  [ orange, bitmap`
9999999999999999
9999999999999999
9999999229999999
9999992229999999
9999922929999999
9999929929999999
9999999929999999
9999999929999999
9999999929999999
9999999929999999
9999999929999999
9999222222229999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [ aarish, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200020022000
0002220222022000
0002020202020200
0000000000000000
0002220222020200
0000200200022200
0002220020020200
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
);

let level = 0;
const levels = [
  map`
gbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbr`,
];

setMap(levels[level]);
addSprite(0, 0, selection);

onInput("w", () => {
  if (!gameIsRunning) return;
  getFirst(selection).y -= 1;
});

onInput("s", () => {
  if (!gameIsRunning) return;
  getFirst(selection).y += 1;
});

onInput("a", () => {
  if (!gameIsRunning) return;
  getFirst(selection).x -= 1;
});

onInput("d", () => {
  if (!gameIsRunning) return;
  getFirst(selection).x += 1;
});

onInput("j", () => {
  if (!gameIsRunning) return;
  
  const { x, y } = getFirst(selection);
  
  if (currentTurn === pink) {
    const findpinkFn = (sprite => sprite.type === pink);
    const findorangeFn = (sprite => sprite.type === orange);

    if (getTile(x, y).find(findpinkFn) || getTile(x, y).find(findorangeFn)) return;

    const positions = [
      getTile(x, y - 1).find(findpinkFn),
      getTile(x - 1, y).find(findpinkFn),
      getTile(x + 1, y).find(findpinkFn),
      getTile(x, y + 1).find(findpinkFn),
    ];

    const findPosition = positions.find(position => position);

    if (!findPosition) return;
    
    clearTile(x, y);
    addSprite(x, y, currentTurn);
    
    currentTurn = orange;

    if (tilesWith(aarish).length == 0) {
      addText("It is a draw!");
      gameIsRunning = false;
      return;
    };

    const findaarishNearorange = tilesWith(aarish).find(target => {
      const { x: targetX, y: targetY } = target[0];

      const targetPositions = [
        getTile(targetX, targetY - 1).find(findorangeFn),
        getTile(targetX - 1, targetY).find(findorangeFn),
        getTile(targetX + 1, targetY).find(findorangeFn),
        getTile(targetX, targetY + 1).find(findorangeFn),
      ];

      const findTargetPosition = targetPositions.find(targetPosition => targetPosition);
      return Boolean(findTargetPosition);
    });

    if (!findaarishNearorange) {
      addText("pink won!");
      gameIsRunning = false;
      return;
    }
    
    addSprite(0, 0, selection);
  } else {
    const findpinkFn = (sprite => sprite.type === pink);
    const findorangeFn = (sprite => sprite.type === orange);

    if (getTile(x, y).find(findpinkFn) || getTile(x, y).find(findorangeFn)) return;
  
    const positions = [
      getTile(x, y - 1).find(findorangeFn),
      getTile(x - 1, y).find(findorangeFn),
      getTile(x + 1, y).find(findorangeFn),
      getTile(x, y + 1).find(findorangeFn),
    ];
  
    const findPosition = positions.find(position => position);
  
    if (!findPosition) return;
    
    clearTile(x, y);
    addSprite(x, y, currentTurn);
    
    currentTurn = pink;

    if (tilesWith(aarish).length == 0) {
      addText("It is a draw!");
      gameIsRunning = false;
      return
    };

    const findaarishNearpink = tilesWith(aarish).find(target => {
      const { x: targetX, y: targetY } = target[0];

      const targetPositions = [
        getTile(targetX, targetY - 1).find(findpinkFn),
        getTile(targetX - 1, targetY).find(findpinkFn),
        getTile(targetX + 1, targetY).find(findpinkFn),
        getTile(targetX, targetY + 1).find(findpinkFn),
      ];

      const findTargetPosition = targetPositions.find(targetPosition => targetPosition);
      return Boolean(findTargetPosition);
    });

    if (!findaarishNearpink) {
      addText("orange won!");
      gameIsRunning = false;
      return;
    }
    
    addSprite(5, 5, selection);
  };
});
