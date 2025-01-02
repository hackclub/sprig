/*
@title: snek
@author: spacefall
@tags: []
@addedOn: 2025-01-02
*/

const left = "l";
const right = "r";
const up = "u";
const down = "d";
const tail = "t";

const apple = "a";
const melon = "m";
const cherry = "h";
const orange = "o";
const pear = "p";
const pretzel = "z";
const bread = "b";
const cocktail = "k";

const food = [
  apple,
  melon,
  cherry,
  orange,
  pear,
  pretzel,
  bread,
  cocktail,
];

let taillessTimeout = null;

const foodEffects = {
  [melon]: {
    action: () => {
      swapTail();
      return "Head => Tail";
    },
    skipUpdate: true,
  },
  [cherry]: {
    action: () => {
      if (randInt(2)) {
        msBetweenMoves *= 0.75;
        return "+25% speed";
      }
      msBetweenMoves *= 1.25;
      return "-25% speed";
    },
    skipUpdate: false,
  },
  [orange]: {
    action: () => {
      if (taillessTimeout) {
        clearTimeout(taillessTimeout);
      }
      for (const t of getAll(tail)) {
        t.remove();
      }
      taillessTimeout = setTimeout(() => {
        taillessTimeout = null;
      }, 5000);
      return "No tail, trapped";
    },
    skipUpdate: true,
  },
  [pretzel]: {
    action: () => {
      if (randInt(2) && tailLength >= 8) {
        tailLength -= 5;
        return "-4 length";
      }
      tailLength += 3;
      return "+4 length";
    },
    skipUpdate: false,
  },
  [pear]: {
    action: () => {
      const x = randInt(width() - 2) + 1;
      const y = randInt(height() - 2) + 1;
      getFirst(player).remove();
      for (const t of getAll(tail)) {
        t.remove();
      }
      const tileElems = getTile(x, y);
      if (tileElems.length > 0) {
        tileElems[0].remove();
        addSprite(x, y, player);
        spawnNewFruit();
      } else {
        addSprite(x, y, player);
      }
      return "Teleport";
    },
    skipUpdate: true,
  },
  [bread]: {
    action: () => {
      swappedControls = false;
      msBetweenMoves = defmsBetweenMoves;
      if (taillessTimeout) {
        clearTimeout(taillessTimeout);
      }
      taillessTimeout = null;
      return "Removed effects";
    },
    skipUpdate: false,
  },
  [cocktail]: {
    action: () => {
      swappedControls = !swappedControls;
      return "Inverted controls";
    },
    skipUpdate: false,
  },
};

const defmsBetweenMoves = 200;

const eatTune = tune`
70.58823529411765: G4-70.58823529411765,
70.58823529411765: G4/70.58823529411765 + A4-70.58823529411765,
70.58823529411765: A4/70.58823529411765 + B4-70.58823529411765,
70.58823529411765: B4/70.58823529411765 + C5-70.58823529411765,
70.58823529411765: C5/70.58823529411765,
1905.8823529411766`;

const turnTune = {
  [up]: tune`
92.3076923076923: C5^92.3076923076923,
92.3076923076923: F5^92.3076923076923,
2769.230769230769`,
  [down]: tune`
92.3076923076923: E5^92.3076923076923,
92.3076923076923: B4^92.3076923076923,
2769.230769230769`,
  [left]: tune`
64.51612903225806: C5^64.51612903225806,
64.51612903225806: A4~64.51612903225806,
64.51612903225806: B4~64.51612903225806,
1870.967741935484`,
  [right]: tune`
64.51612903225806: B4^64.51612903225806,
64.51612903225806: D5~64.51612903225806,
64.51612903225806: C5~64.51612903225806,
1870.967741935484`,
}

const gameoverTune = tune`
92.3076923076923: C5/92.3076923076923,
92.3076923076923: F4/92.3076923076923,
92.3076923076923: E4/92.3076923076923,
92.3076923076923: D4/92.3076923076923,
92.3076923076923: C4/92.3076923076923,
2492.3076923076924`;

setLegend(
  [
    "v", //v for void, was origially black, now it's grass
    bitmap`
4444444444444444
4D4D444444444444
44D4444444444D44
4D4D44444444D444
4444444444444444
4444444444444444
4444444444444444
44D44444D4D44444
444D44444D444444
4444444444444444
4444444444444444
444D444444444444
44D4D4444444D444
44444444444D4D44
4444444444444444
4444444444444444`,
  ],
  [
    right,
    bitmap`
DDDDDDDDDDDD....
DDDDDDDDDDDDDD..
DDDDDDDDDDDDDDD.
DDDDDD2222DDDDDD
DDDDDD2222DDDDDD
DDDDDD2200DDDDDD
DDDDDD2200DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD2200DDDDDD
DDDDDD2200DDDDDD
DDDDDD2222DDDDDD
DDDDDD2222DDDDD.
DDDDDDDDDDDDDD..
DDDDDDDDDDDD....`,
  ],
  [
    left,
    bitmap`
....DDDDDDDDDDDD
..DDDDDDDDDDDDDD
.DDDDD2222DDDDDD
DDDDDD2222DDDDDD
DDDDDD0022DDDDDD
DDDDDD0022DDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD0022DDDDDD
DDDDDD0022DDDDDD
DDDDDD2222DDDDDD
DDDDDD2222DDDDDD
.DDDDDDDDDDDDDDD
..DDDDDDDDDDDDDD
....DDDDDDDDDDDD`,
  ],
  [
    down,
    bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD2222DDD2222DDD
DD2222DDD2222DDD
DD2200DDD0022DDD
DD2200DDD0022DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDD..
...DDDDDDDDDD...`,
  ],
  [
    up,
    bitmap`
...DDDDDDDDDD...
..DDDDDDDDDDDD..
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD2200DDD0022DD
DDD2200DDD0022DD
DDD2222DDD2222DD
DDD2222DDD2222DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`,
  ],
  [
    tail,
    bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`,
  ],
  [
    apple,
    bitmap`
................
.......000......
..00000090000...
.0033309033300..
.03333393333300.
.03333333333330.
.03333333333330.
.03333333333330.
.03333333332330.
.03333333332330.
.00333333323300.
..033333333330..
..003333333300..
...0033033300...
....00000000....
................`,
  ],
  [
    melon,
    bitmap`
...000..........
...0D000000.....
...00DDDDD0.....
....000D000.....
...000424000....
..00444D44400...
..04D2D444D40...
.0044D442D4400..
.042D444D4D440..
.04D442D442D40..
.042D444D44440..
.0044D2D2D4400..
..0444D444D40...
..004D444D400...
...00044D000....
.....00000......`,
  ],
  [
    cherry,
    bitmap`
................
...........0000.
.........000990.
.......00099990.
......009909000.
..00000900090...
.003339000900...
.033393309000...
.0333330393300..
.0323303393330..
.0332303333330..
.0033303233330..
..000003323330..
......00333300..
.......000000...
................`,
  ],
  [
    orange,
    bitmap`
................
........0000....
......00044000..
......0CDDD440..
...0000C044400..
..0099CCC99900..
.009999C9999900.
.09999999999990.
.09999999999990.
.09999999999990.
.09999999999990.
.00999999999900.
..099999999990..
..000999999000..
....00000000....
................`,
  ],
  [
    pear,
    bitmap`
.......0000.....
......00CC0.....
.....00C000.....
.....04C40......
....0044400.....
....0444440.....
....0444440.....
...004444400....
...044444440....
..00444444400...
..04424444440...
..04424444440...
..04442444440...
..00444444400...
...004444400....
....0000000.....`,
  ],
  [
    pretzel,
    bitmap`
..00000.000000..
.00299000209900.
.099999909999900
0099009009902990
0990000099000990
0990000990000990
0990000990000990
0992002909000990
0099009909909920
.009099000909900
..0009900099000.
..0099099909900.
.00990099909920.
.09920000000990.
.00000.....0000.
................`,
  ],
  [
    bread,
    bitmap`
.......000000...
.....000999900..
....00999999900.
.000022299999900
0099992222999990
0222299222299990
0222229922299990
0222222922299900
002222299299990.
.02222992299990.
.02222992299990.
.02222992299990.
.02222990299900.
.0022299000000..
..0022990.......
...000000.......`,
  ],
  [
    cocktail,
    bitmap`
................
...00000........
..0066600.......
..0666660..000..
..066626000020..
..066629999920..
..006629999920..
...00029992920..
.....029992920..
.....029929920..
.....022999220..
.....002222200..
......0002000...
......0002000...
......0222220...
......0000000...`,
  ],
);

const maps = [
  map`
....................
.vvv.v..v.vvv.v.v.v.
.v...vv.v.v...v.v...
.vvv.v.vv.vv..vv..v.
...v.v..v.v...v.v.v.
.vvv.v..v.vvv.v.v.v.
....................
....................
....................
....................
....................
r...................
....................
....................
....................
....................`,
  map`
...............
...............
...............
...............
........a......
...............
r.......a......
...............
........a......
...............
...............
...............`,
];

let player = right;
let tailLength = 1;
let msBetweenMoves = defmsBetweenMoves;
let movementBlock = false;
let clearTextTimeout;
let swappedControls = false;
let gameover = false;
let score = 0;

// Title Screen, "snek" written with sprites
setMap(maps[0]);

addText("Press k to start", { y: 8, color: color`0` });

// Listens to "k" input
// It starts the game if on the title screen or restarts it if in the game
onInput("k", () => {
  setBackground("v");
  // Reset score
  tailLength = 1;
  score = 0;

  // Remove effects
  msBetweenMoves = defmsBetweenMoves;
  swappedControls = false;
  movementBlock = false;
  clearText();
  setMap(maps[1]);
  addText("Score: 0", { color: color`0` });
  player = right;
  if (taillessTimeout) {
    clearTimeout(taillessTimeout);
  }
  taillessTimeout = null;
  if (gameover) {
    checkGameover();
    gameover = false;
  }
});

checkGameover();

// Player input
onInput("s", () => changeDirection(down, up));
onInput("w", () => changeDirection(up, down));
onInput("d", () => changeDirection(right, left));
onInput("a", () => changeDirection(left, right));

function changeDirection(newDir, oppositeDir) {
  // Return if movement is blocked
  if (movementBlock) return;

  // Change direction based on effect
  const targetDir = swappedControls ? oppositeDir : newDir;
  const blockedDir = swappedControls ? newDir : oppositeDir;
  const moves = {
    [down]: { x: 0, y: 1 },
    [up]: { x: 0, y: -1 },
    [left]: { x: -1, y: 0 },
    [right]: { x: 1, y: 0 },
  };
  
  // Prevent moving in blocked direction
  if (player === blockedDir || player === targetDir) return;
  const snek = getFirst(player);
  const move = moves[targetDir];
  if (!isMovementValid(snek.x + move.x, snek.y + move.y)) return;

  // Update snake head direction
  snek.type = targetDir;
  player = targetDir;
  playTune(turnTune[targetDir]);
  //moved = true;
}

// Checks if the movement is valid: if snake is not touching the tail
function isMovementValid(x, y) {
  return !getTile(x, y).some((sprite) => sprite.type === tail);
}

// Spawns new fruit in a random position (and not occupied by other sprites)
// Will always spawn an apple if the score is less than 5
function spawnNewFruit() {
  let x;
  let y;

  do {
    x = randInt(width());
    y = randInt(height());
  } while (getTile(x, y).length > 0);

  const fruitType = score < 5 ? apple : food[randInt(food.length)];
  addSprite(x, y, fruitType);
}

// Process food item in tile specified, returns bool to permit/deny tail update
function processFood(x, y) {
  for (const sprite of getTile(x, y)) {
    if (!food.includes(sprite.type)) continue;

    // Handle fruit consumption
    sprite.remove();
    tailLength++;
    score += swappedControls ? 2 : 1;
    playTune(eatTune);

    // Apply fruit effect
    const effect = foodEffects[sprite.type];
    if (effect) {
      showText(effect.action());
      spawnNewFruit();
      return effect.skipUpdate;
    }

    // Default apple behavior
    clearText();
    addText(`Score: ${score}`, { color: color`0` });
    spawnNewFruit();
    return false;
  }
  return false;
}

function getValidCoords(x, y) {
  if (x >= width()) {
    x = 0;
  } else if (x < 0) {
    x = width() - 1;
  }
  if (y >= height()) {
    y = 0;
  } else if (y < 0) {
    y = height() - 1;
  }
  return { x, y };
}

// Main function for movement, calculates the next position, checks if it is valid, processes food items, and updates the tail
// Retuns false is movement is invalid, aka game over
function move() {
  const snek = getFirst(player);
  const moves = {
    [down]: { x: 0, y: 1 },
    [up]: { x: 0, y: -1 },
    [left]: { x: -1, y: 0 },
    [right]: { x: 1, y: 0 },
  };
  const move = moves[player];

  // Fix position if at borders
  let coords = { x: snek.x + move.x, y: snek.y + move.y };
  if (taillessTimeout == null) {
    coords = getValidCoords(coords.x, coords.y);
    // Return false if movement is invalid (snake if eating itself) -> Game Over
    if (!isMovementValid(coords.x, coords.y)) return false;
  } else {
    if (coords.x < 0 || coords.x >= width() ||
      coords.y < 0 || coords.y >= height() ||
      !isMovementValid(coords.x, coords.y)) return false;
  }

  // Eat food item if present
  const skipTail = processFood(coords.x, coords.y);

  // Skip tail update if fruit effect is blocking it
  if (!skipTail && taillessTimeout == null) {
    // Update tail if movement is valid
    let currTailLength = 0;
    for (const thisTail of getAll(tail).reverse()) {
      if (currTailLength < tailLength) {
        currTailLength++;
        continue;
      }
      thisTail.remove();
    }

    addSprite(snek.x, snek.y, tail);
    // Update head position
  }

  snek.x = coords.x;
  snek.y = coords.y;

  // Unlock head movement
  movementBlock = false;
  return true;
}

// Swaps the head with the tail
function swapTail() {
  const tailSwapDef = [
    { dx: 1, dy: 0, dir: left },
    { dx: -1, dy: 0, dir: right },
    { dx: 0, dy: 1, dir: up },
    { dx: 0, dy: -1, dir: down },
  ];

  const lastTail = getFirst(tail);
  if (!lastTail) return;
  
  // Transform head into tail
  getFirst(player).type = tail;

  // Find direction of last tail piece
  player = tailSwapDef.find(({ dx, dy }) => {
    const pos = getValidCoords(lastTail.x + dx, lastTail.y + dy);
    const tile = getTile(pos.x, pos.y);
    return tile.length > 0 && tile[0].type === tail;
  })?.dir;

  // Change last tail piece into head with the direction found
  lastTail.type = player;

  // Recreate the tail pieces, so that the snake continues and doesn't look like it used a portal
  const tailList = getAll(tail).reverse();
  for (const tailSpr of tailList) {
    addSprite(tailSpr.x, tailSpr.y, tail);
    tailSpr.remove();
  }
}

// Clears the text, writes, and sets a timeout to restore the score text
function showText(text) {
  clearTimeout(clearTextTimeout);
  clearText();
  addText(text, { color: color`0` });
  clearTextTimeout = setTimeout(() => {
    clearText();
    addText(`Score: ${score}`, { color: color`0` });
  }, 2000);
}

// Gets a random intager up to max, nothing more
function randInt(max) {
  return ~~(Math.random() * ~~max);
}

// Moves the snake and checks for game over every msBetweenMoves
function checkGameover(atRisk = false) {
  if (!move()) {
    if (!atRisk) {
      movementBlock = false;
      setTimeout(checkGameover(true), msBetweenMoves / 4);
    } else {
      clearText();
      clearTimeout(clearTextTimeout);
      addText("Game Over", { color: color`0` });
      addText(`Score: ${score}`, { y: 1, color: color`0` });
      addText("Press k to retry", { y: 2, color: color`0` });
      playTune(gameoverTune);
      // Lock movement
      movementBlock = true;
      gameover = true;
    }
  } else {
    setTimeout(checkGameover, msBetweenMoves);
  }
}
