/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Tetris
@author: BonzaiDev, Adrian T.
@tags: ["retro", "endless", "puzzle", "timed"]
@addedOn: 2024-07-23
*/

// Game settings
let currentGameState;
let currentLinesAmount = 0;
let currentScore = 0;
let blockDropSpeed = 1; // In seconds
const blockSpawnPosition = { x: 5, y: 1 };

const tetrisTheme = tune`
201.34228187919464: E5/201.34228187919464,
201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: D5/201.34228187919464,
201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464: A4/201.34228187919464,
201.34228187919464,
201.34228187919464: A4/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: E5/201.34228187919464,
201.34228187919464,
201.34228187919464: D5/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464,
201.34228187919464: B4/201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464: D5/201.34228187919464,
201.34228187919464,
201.34228187919464: E5/201.34228187919464,
201.34228187919464,
201.34228187919464: C5/201.34228187919464,
201.34228187919464,
201.34228187919464: A4/201.34228187919464,
201.34228187919464,
201.34228187919464: A4/201.34228187919464,
604.026845637584`;
const tetrisThemeBass = tune`
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: E4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: A4^201.34228187919464,
201.34228187919464: A5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: D5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: E5^201.34228187919464,
201.34228187919464: D4^201.34228187919464,
201.34228187919464: E5^201.34228187919464`;

const gameMap = map`
@@@@@@@@@@@@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@..........@
@@@@@@@@@@@@`;

const gameStates = {
  MENU: "Menu",
  PLAYING: "Playing",
  GAME_OVER: "GameOver",
};

const blockColours = {
  darkBlue: bitmap`
................
.25555555555557.
.55255555555557.
.52555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.55555555555557.
.77777777777775.
................`,
  blue: bitmap`
................
.25555555555555.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.52222222222227.
.77777777777775.
................`,
  cyan: bitmap`
................
.27777777777775.
.77277777777775.
.72777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.77777777777775.
.55555555555557.
................`,
};

// Classes \\
const tetrominoTypes = {
  straightTetromino: "straightTetromino",
  squareTetromino: "squareTetromino",
  tTetromino: "tTetromino",
  lTetromino: "lTetromino",
  lFlippedTetromino: "lFlippedTetromino",
  sTetromino: "sTetromino",
  sFlippedTetromino: "sFlippedTetromino",
};

let mappedSprites = [];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
class Tetromino {
  bitmapKey = "";
  bitmap = bitmap``;
  type;

  constructor() {
    // Adrian's custom code that def works
    // basically my idea was to start with the first letter of the alphabet and then go up from there
    // if the letter is already taken, then we go to the next letter and so on :D

    let index = 0;
    while (true) {
      this.bitmapKey = alphabet[index % alphabet.length];
      if (!mappedSprites.includes(this.bitmapKey)) {
        mappedSprites.push(this.bitmapKey);
        break;
      };
      index++;
    };

    const randomNumber = Math.floor(Math.random() * 7);
    switch (randomNumber) {
      case 0:
        this.type = tetrominoTypes.straightTetromino;
        this.bitmap = blockColours.blue;
        break;
      case 1:
        this.type = tetrominoTypes.squareTetromino;
        this.bitmap = blockColours.blue;
        break;
      case 2:
        this.type = tetrominoTypes.tTetromino;
        this.bitmap = blockColours.blue;
        break;
      case 3:
        this.type = tetrominoTypes.lTetromino;
        this.bitmap = blockColours.cyan;
        break;
      case 4:
        this.type = tetrominoTypes.sTetromino;
        this.bitmap = blockColours.darkBlue;
        break;
      case 5:
        this.type = tetrominoTypes.lFlippedTetromino;
        this.bitmap = blockColours.darkBlue;
        break;
      case 6:
        this.type = tetrominoTypes.sFlippedTetromino;
        this.bitmap = blockColours.cyan;
        break;
    };
  };
};

// Sprites
let newTetromino = new Tetromino();
const background = "/";
const border = "@";

// Functions
let moveBlockDownInterval;

function startGame() {
  currentGameState = gameStates.PLAYING;
  currentLinesAmount = 0;

  clearText();
  addText("LINES", { x: 1, y: 1, color: color`2` })
  addText("000", { x: 1, y: 2, color: color`L` })

  addText("SCORE", { x: 14, y: 1, color: color`2` })
  addText("000000", { x: 14, y: 2, color: color`L` })

  setBitmaps();
  setMap(gameMap);
  setBackground(background);
  playTune(tetrisTheme, Infinity);
  playTune(tetrisThemeBass, Infinity);

  spawnTetromino(newTetromino);

  clearInterval(moveBlockDownInterval);
  moveBlockDownInterval = setInterval(async () => {
    moveBlockDown();
  }, blockDropSpeed * 1000);
};

function setBitmaps() {
  setLegend(
    [background, bitmap`
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
  LLLLLLLLLLLLLLLL`],
    [border, bitmap`
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

    [newTetromino.bitmapKey, newTetromino.bitmap],
  );
};

function spawnTetromino(tetromino) {
  switch (tetromino.type) {
    case tetrominoTypes.straightTetromino:
      for (let ySpawn = 0; ySpawn < 4; ySpawn++)
        addSprite(blockSpawnPosition.x, blockSpawnPosition.y + ySpawn, tetromino.bitmapKey);
      break;

    case tetrominoTypes.squareTetromino:
      for (let xSpawn = 0; xSpawn < 2; xSpawn++) {
        for (let ySpawn = 0; ySpawn < 2; ySpawn++) {
          addSprite(blockSpawnPosition.x + xSpawn, blockSpawnPosition.y + ySpawn, tetromino.bitmapKey);
        };
      };
      break;

    case tetrominoTypes.tTetromino:
      addSprite(blockSpawnPosition.x + 1, blockSpawnPosition.y + 1, tetromino.bitmapKey);
      for (let xSpawn = 0; xSpawn < 3; xSpawn++)
        addSprite(blockSpawnPosition.x + xSpawn, blockSpawnPosition.y, tetromino.bitmapKey);
      break;

    case tetrominoTypes.lTetromino:
      for (let ySpawn = 0; ySpawn < 3; ySpawn++)
        addSprite(blockSpawnPosition.x, blockSpawnPosition.y + ySpawn, tetromino.bitmapKey);
      addSprite(blockSpawnPosition.x + 1, blockSpawnPosition.y + 2, tetromino.bitmapKey);
      break;

    case tetrominoTypes.sTetromino:
      for (let xSpawn = 0; xSpawn < 2; xSpawn++) {
        addSprite(blockSpawnPosition.x + xSpawn, blockSpawnPosition.y, tetromino.bitmapKey);
      };

      for (let xSpawn = 0; xSpawn < 2; xSpawn++) {
        addSprite(blockSpawnPosition.x + xSpawn - 1, blockSpawnPosition.y + 1, tetromino.bitmapKey);
      };
      break;
    case tetrominoTypes.lFlippedTetromino:
      for (let ySpawn = 0; ySpawn < 3; ySpawn++)
        addSprite(blockSpawnPosition.x, blockSpawnPosition.y + ySpawn, tetromino.bitmapKey);
      addSprite(blockSpawnPosition.x - 1, blockSpawnPosition.y + 2, tetromino.bitmapKey);
      break;
    case tetrominoTypes.sFlippedTetromino:
      for (let xSpawn = 0; xSpawn < 2; xSpawn++) {
        addSprite(blockSpawnPosition.x + xSpawn - 1, blockSpawnPosition.y, tetromino.bitmapKey);
      };

      for (let xSpawn = 0; xSpawn < 2; xSpawn++) {
        addSprite(blockSpawnPosition.x + xSpawn, blockSpawnPosition.y + 1, tetromino.bitmapKey);
      };
      break;
  };
}

function isTetrominoCollidingX(tetromino, direction) {
  for (const tetrominoBlock of getAll(tetromino.bitmapKey)) {
    const surroundingBlocks = getTile(tetrominoBlock.x + direction, tetrominoBlock.y);
    for (const block of surroundingBlocks) {
      if (block.type !== tetromino.bitmapKey)
        return true;
    };
  };
  return false;
};

function isTetrominoCollidingY(tetromino) { // Function to determine if theres blocks surrounding tetromino. Custom collisions
  for (const tetrominoBlock of getAll(tetromino.bitmapKey)) {
    const blocksUnderTetromino = getTile(tetrominoBlock.x, tetrominoBlock.y + 1);
    for (const block of blocksUnderTetromino) {
      if (blocksUnderTetromino.length > 0 && block.type != tetromino.bitmapKey)
        return true;
    };
  };
  return false;
};

function rotateTetromino(tetromino, originIndex, upperLeftBlockIndex) {
  let finalPosition;
  let canRotate = false;

  const destinations = [];
  const tetrominoBlocks = getAll(tetromino.bitmapKey);
  const origin = tetrominoBlocks[originIndex];

  tetrominoBlocks.splice(tetrominoBlocks.indexOf(origin), 1);
  for (block of tetrominoBlocks) {
    const relativeX = block.x - origin.x;
    const relativeY = block.y - origin.y;
    finalPosition = { x: origin.x - relativeY, y: origin.y + relativeX };

    const tile = getTile(finalPosition.x, finalPosition.y)
    destinations.push(finalPosition)
  };

  for (position of destinations) {
    const tile = getTile(position.x, position.y);
    if (tile.length > 0) {
      if (tile[0].type != tetromino.bitmapKey)
        destinations.splice(position, 1);
    };
  };

  if (destinations.length == 3) {
    tetrominoBlocks.forEach(function(block) {
      const relativeX = block.x - origin.x;
      const relativeY = block.y - origin.y;
      finalPosition = { x: origin.x - relativeY, y: origin.y + relativeX };

      block.x = finalPosition.x;
      block.y = finalPosition.y;
    });
  };
}

function moveBlock(direction) { // Direction is a int. -x for left and x for right
  if (getAll(newTetromino.bitmapKey).every(block => block.y !== height() - 1) && !isTetrominoCollidingX(newTetromino, direction) && currentGameState != gameStates.GAME_OVER) {
    if (direction == 1 && getAll(newTetromino.bitmapKey).every(block => block.x < width() - 1)) {
      getAll(newTetromino.bitmapKey).forEach(block => block.x++);
    } else if (direction == -1 && getAll(newTetromino.bitmapKey).every(block => block.x !== 0)) {
      getAll(newTetromino.bitmapKey).forEach(block => block.x--);
    };
  };
};

function moveBlockDown() {
  if (currentGameState != gameStates.PLAYING) {
    addText("GAME", { x: 8, y: 5, color: color`3` })
    addText("OVER", { x: 8, y: 7, color: color`3` })
    addText("RESTART", { x: 7, y: 9, color: color`4` })
    addText("(j)", { x: 9, y: 10, color: color`D` })
    return;
  };

  if (!isTetrominoCollidingY(newTetromino) && getAll(newTetromino.bitmapKey).every(block => block.y < height() - 2)) {
    getAll(newTetromino.bitmapKey).forEach(block => block.y++);
  } else {
    const nextTetromino = new Tetromino();
    newTetromino = nextTetromino;
    setBitmaps();

    spawnTetromino(newTetromino);

    for (let y = height() - 2; y >= 1; y--) {
      let isFirstRowFilled = false;
      const blocksToRemove = [];
      for (let x = 1; x < width() - 1; x++) {
        const tile = getTile(x, y);
        if (tile.length > 0) {
          blocksToRemove.push({ x, y });

          setTimeout(function() {
            if (tile.length > 0 && tile[0].y == 1) {
              currentGameState = gameStates.GAME_OVER;
            }
          }, 2000);
        };
      };

      if (blocksToRemove.length == width() - 2) {
        blocksToRemove.forEach(function(block) {
          clearTile(block.x, block.y);
        });

        for (let yToRemove = blocksToRemove[0].y - 1; yToRemove >= 1; yToRemove--) {
          for (let x = 1; x < width() - 1; x++) {
            getTile(x, yToRemove).forEach(function(block) {
              block.y++;
              if (y < 21)
                y++;
            });
          };
        };

        currentLinesAmount++;
        addText(currentLinesAmount.toString().padStart(3, "0"), { x: 1, y: 2, color: color`L` })

        currentScore += 40;
        addText(currentScore.toString().padStart(6, "0"), { x: 14, y: 2, color: color`L` })

        if (currentScore % 400 === 0) {
          blockDropSpeed -= 0.5;
          clearInterval(moveBlockDownInterval);
          moveBlockDownInterval = setInterval(async () => {
            moveBlockDown();
          }, blockDropSpeed * 1000);
          return;
        };
      };
    };

    for (let i = mappedSprites.length - 1; i >= 0; i--) {
      const bitmapKey = mappedSprites[i];
      let found = false;
      for (let y = height() - 2; y >= 1; y--) {
        for (let x = 1; x < width() - 1; x++) {
          const tile = getTile(x, y);
          if (tile.length > 0 && tile[0].type == bitmapKey) {
            found = true;
            break;
          };
        };
        if (found)
          break;
      };

      if (!found)
        mappedSprites.splice(i, 1);
    };
  };
};

// Game logic \\
startGame();

// Inputs
onInput("w", () => {
  switch (newTetromino.type) {
    case tetrominoTypes.straightTetromino:
      rotateTetromino(newTetromino, 1, 0);
      break;
    case tetrominoTypes.tTetromino:
      rotateTetromino(newTetromino, 2, 1);
      break;
    case tetrominoTypes.lTetromino:
      rotateTetromino(newTetromino, 1, 0);
      break;
    case tetrominoTypes.sTetromino:
      rotateTetromino(newTetromino, 3, 0);
      break;
    case tetrominoTypes.lFlippedTetromino:
      rotateTetromino(newTetromino, 1, 0);
      break;
    case tetrominoTypes.sFlippedTetromino:
      rotateTetromino(newTetromino, 2, 0);
      break;
  };
});

onInput("s", () => {
  moveBlockDown();
});

onInput("a", () => {
  moveBlock(-1);
});

onInput("d", () => {
  moveBlock(1);
});

onInput("j", () => {
  if (currentGameState == gameStates.GAME_OVER)
    startGame();
});
