/*
@title: color_domination
@author: adrianoapj
@tags: ['multiplayer']
@addedOn: 2022-09-19
*/

/*
W, A, S, D - to move
J - to select

It's a multiplayer game, every player has a color, green starts playing
Once you dominate a space, it's the next player's turn
You can dominate spaces right next to your own
Your objective is to make it impossible to the other player to dominate a space
*/

const selection = "s";
const red = "r";
const green = "g";
const blank = "b";

let currentTurn = green;
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
  [ red, bitmap`
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
3333333333333333`],
  [ green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ blank, bitmap`
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
2222222222222222`],
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
  
  if (currentTurn === red) {
    const findRedFn = (sprite => sprite.type === red);
    const findGreenFn = (sprite => sprite.type === green);

    if (getTile(x, y).find(findRedFn) || getTile(x, y).find(findGreenFn)) return;

    const positions = [
      getTile(x, y - 1).find(findRedFn),
      getTile(x - 1, y).find(findRedFn),
      getTile(x + 1, y).find(findRedFn),
      getTile(x, y + 1).find(findRedFn),
    ];

    const findPosition = positions.find(position => position);

    if (!findPosition) return;
    
    clearTile(x, y);
    addSprite(x, y, currentTurn);
    
    currentTurn = green;

    if (tilesWith(blank).length == 0) {
      addText("It is a draw!");
      gameIsRunning = false;
      return;
    };

    const findBlankNearGreen = tilesWith(blank).find(target => {
      const { x: targetX, y: targetY } = target[0];

      const targetPositions = [
        getTile(targetX, targetY - 1).find(findGreenFn),
        getTile(targetX - 1, targetY).find(findGreenFn),
        getTile(targetX + 1, targetY).find(findGreenFn),
        getTile(targetX, targetY + 1).find(findGreenFn),
      ];

      const findTargetPosition = targetPositions.find(targetPosition => targetPosition);
      return Boolean(findTargetPosition);
    });

    if (!findBlankNearGreen) {
      addText("Red won!");
      gameIsRunning = false;
      return;
    }
    
    addSprite(0, 0, selection);
  } else {
    const findRedFn = (sprite => sprite.type === red);
    const findGreenFn = (sprite => sprite.type === green);

    if (getTile(x, y).find(findRedFn) || getTile(x, y).find(findGreenFn)) return;
  
    const positions = [
      getTile(x, y - 1).find(findGreenFn),
      getTile(x - 1, y).find(findGreenFn),
      getTile(x + 1, y).find(findGreenFn),
      getTile(x, y + 1).find(findGreenFn),
    ];
  
    const findPosition = positions.find(position => position);
  
    if (!findPosition) return;
    
    clearTile(x, y);
    addSprite(x, y, currentTurn);
    
    currentTurn = red;

    if (tilesWith(blank).length == 0) {
      addText("It is a draw!");
      gameIsRunning = false;
      return
    };

    const findBlankNearRed = tilesWith(blank).find(target => {
      const { x: targetX, y: targetY } = target[0];

      const targetPositions = [
        getTile(targetX, targetY - 1).find(findRedFn),
        getTile(targetX - 1, targetY).find(findRedFn),
        getTile(targetX + 1, targetY).find(findRedFn),
        getTile(targetX, targetY + 1).find(findRedFn),
      ];

      const findTargetPosition = targetPositions.find(targetPosition => targetPosition);
      return Boolean(findTargetPosition);
    });

    if (!findBlankNearRed) {
      addText("Green won!");
      gameIsRunning = false;
      return;
    }
    
    addSprite(5, 5, selection);
  };
});