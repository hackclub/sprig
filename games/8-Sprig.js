/*
@title: 8-Sprig
@author: NoozAbooz
@tags: ['puzzle','endless']
@addedOn: 2024-07-04
8-Sprig is inspired by the popular 8-puzzle game, especially the version inside of https://conicgames.github.io/exponentialidle/. There are some
new changes and tweaks to accommodate for the Sprig platform. Music by FructosePear.

*/

const cursor = "p"
const background = "b"

const one = "o"
const two = "t"
const three = "T"
const four = "f"
const five = "F"
const six = "s"
const seven = "S"
const eight = "e"
const blocks = ["o", "t", "T", "f", "F", "s", "S", "e"];

let level = 0;
let gameStarted = false;
let speedrun = false;
let statsShowing = false;

let startTime;
let endTime;
let personalBest = 10000;

setLegend(
  [cursor, bitmap`
6666666666666666
66............66
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
66............66
6666666666666666`],
  [background, bitmap`
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

  [one, bitmap`
................
..222222222222..
.2............2.
.2......2.....2.
.2....222.....2.
.2......2.....2.
.2......2.....2.
.2......2.....2.
.2......2.....2.
.2......2.....2.
.2......2.....2.
.2......2.....2.
.2....22222...2.
.2............2.
..222222222222..
................`],
  [two, bitmap`
................
..222222222222..
.2............2.
.2...222222...2.
.2..22....22..2.
.2.........2..2.
.2.........2..2.
.2........22..2.
.2.......22...2.
.2.....222....2.
.2...222......2.
.2..22........2.
.2..222222222.2.
.2............2.
..222222222222..
................`],
  [three, bitmap`
................
..222222222222..
.2............2.
.2..222222....2.
.2.......222..2.
.2.........2..2.
.2.......222..2.
.2....2222....2.
.2..2222222...2.
.2........2...2.
.2........22..2.
.2.......22...2.
.2..222222....2.
.2............2.
..222222222222..
................`],
  [four, bitmap`
................
..222222222222..
.2............2.
.2..2....2....2.
.2..2....2....2.
.2..2....2....2.
.2..2....2....2.
.2..22222222..2.
.2.......2....2.
.2.......2....2.
.2.......2....2.
.2.......2....2.
.2.......2....2.
.2............2.
..222222222222..
................`],
  [five, bitmap`
................
..222222222222..
.2............2.
.2...2222222..2.
.2..22........2.
.2..2.........2.
.2..22222.....2.
.2......222...2.
.2........22..2.
.2.........2..2.
.2........22..2.
.2......222...2.
.2..22222.....2.
.2............2.
..222222222222..
................`],
  [six, bitmap`
................
..222222222222..
.2............2.
.2....222222..2.
.2...2........2.
.2..2.........2.
.2..2.........2.
.2.22222222...2.
.2..22....22..2.
.2..2......22.2.
.2..2.......2.2.
.2..222....22.2.
.2....222222..2.
.2............2.
..222222222222..
................`],
  [seven, bitmap`
................
..222222222222..
.2............2.
.2.2222222222.2.
.2..........2.2.
.2.........22.2.
.2........22..2.
.2........2...2.
.2.......22...2.
.2......22....2.
.2....222.....2.
.2...22.......2.
.2..22........2.
.2............2.
..222222222222..
................`],
  [eight, bitmap`
................
..222222222222..
.2............2.
.2....2222....2.
.2...22..22...2.
.2...2....2...2.
.2...2....2...2.
.2...222222...2.
.2....2222....2.
.2...2....2...2.
.2...2....2...2.
.2...22..22...2.
.2....2222....2.
.2............2.
..222222222222..
................`]
);

const levels = [
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
..............otT
..............fFs
..............Se.`,
  map`
otT
Fs.
fSe`,
  map`
Sot
f.e
TFs`,
  map`
FoS
f.T
est`
];

const endScreenLevel = [
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
..............otT
..............fFs
..............Se.`
];

setSolids(
  [one, two, three, four, five, six, seven, eight]
)
setBackground(background)

// game start, show text and instructions
setMap(levels[level])
addSprite(14, 10, cursor)

addText("Welcome to 8-Sprig!", {
  x: 0,
  y: 1,
  color: color`2`
})
addText("-Arrange the blocks", {
  x: 0,
  y: 3,
  color: color`2`
})
addText("in order (see below)", {
  x: 0,
  y: 4,
  color: color`2`
})
addText("-Right D-pad to move", {
  x: 0,
  y: 6,
  color: color`2`
})
addText("your", {
  x: 0,
  y: 7,
  color: color`2`
})
addText("cursor", {
  x: 5,
  y: 7,
  color: color`6`
})
addText(", left", {
  x: 11,
  y: 7,
  color: color`2`
})
addText("D-pad to move the", {
  x: 0,
  y: 8,
  color: color`2`
})
addText("block", {
  x: 0,
  y: 9,
  color: color`7`
})
addText("Press Left-Up for", {
  x: 0,
  y: 11,
  color: color`3`
})
addText("speedrun", {
  x: 0,
  y: 12,
  color: color`3`
})
addText("Press Right-Up", {
  x: 0,
  y: 14,
  color: color`8`
})
addText("for endless", {
  x: 0,
  y: 15,
  color: color`8`
})

// music, define sound effects
const melody = tune`
245.9016393442623: D5^245.9016393442623,
245.9016393442623: E4/245.9016393442623 + C5^245.9016393442623,
245.9016393442623: E4~245.9016393442623 + E5-245.9016393442623,
245.9016393442623: E4/245.9016393442623 + F5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: D5^245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + E5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4~245.9016393442623 + C5^245.9016393442623,
245.9016393442623: E4/245.9016393442623 + D5^245.9016393442623,
245.9016393442623: E5^245.9016393442623,
245.9016393442623: E4/245.9016393442623 + A4^245.9016393442623,
245.9016393442623: E4~245.9016393442623 + E5-245.9016393442623,
245.9016393442623: E4/245.9016393442623 + F5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: D5^245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + E5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4~245.9016393442623 + C5^245.9016393442623,
245.9016393442623: E4/245.9016393442623 + D5^245.9016393442623,
245.9016393442623: C5^245.9016393442623,
245.9016393442623: E4/245.9016393442623,
245.9016393442623: E4~245.9016393442623 + E5-245.9016393442623,
245.9016393442623: E4/245.9016393442623 + F5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: D5^245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + E5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: C5^245.9016393442623 + E4~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + A4^245.9016393442623,
245.9016393442623,
245.9016393442623: E4/245.9016393442623 + C5^245.9016393442623,
245.9016393442623: E5-245.9016393442623 + E4~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + F5-245.9016393442623 + B5~245.9016393442623,
245.9016393442623: D5^245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + E5-245.9016393442623 + A4^245.9016393442623 + B5~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: E4/245.9016393442623 + C5^245.9016393442623`
const click = tune`
96.7741935483871,
96.7741935483871: E4^96.7741935483871,
2903.225806451613`
const thock = tune`
312.5,
312.5: C4/312.5,
9375` 
const playback = playTune(melody, Infinity)

// handle cursor input movement
onInput("i", () => {
  playTune(click)
  if (statsShowing === false) {
    getFirst(cursor).y -= 1
  }

  if (gameStarted === false) {
    speedrun = false;
    startGame();
  } else if (statsShowing === true && speedrun === false) {
    nextLevel();
  }
})
onInput("k", () => {
  playTune(click)
  getFirst(cursor).y += 1
})
onInput("j", () => {
  playTune(click)
  getFirst(cursor).x -= 1
})
onInput("l", () => {
  playTune(click)
  getFirst(cursor).x += 1
})

// handle movements for moving the entire cursor and the block selected under it
onInput("w", () => {
  const cursorSprite = getFirst(cursor);
  const spritesOnCursor = getTile(cursorSprite.x, cursorSprite.y);
  const nextTileSprites = getTile(cursorSprite.x, cursorSprite.y - 1);

  let shouldMove = true;

  // Check if there is any entity in the path preventing the cursor from moving
  if (nextTileSprites.some(sprite => sprite !== cursorSprite && sprite.type !== background)) {
    shouldMove = false;
  }

  // Check if the cursor sprite is on top of another sprite
  spritesOnCursor.forEach(sprite => {
    if (sprite !== cursorSprite && sprite.type !== background) {
      // Move both the cursor sprite and the sprite it is on top of upwards
      sprite.y -= 1;
    }
  });

  // Move the cursor sprite if conditions allow
  if (shouldMove) {
    cursorSprite.y -= 1;
    playTune(thock)
  }

  if (gameStarted === false) {
    speedrun = true;
    startGame();
  }
})

onInput("s", () => {
  const cursorSprite = getFirst(cursor);
  const spritesOnCursor = getTile(cursorSprite.x, cursorSprite.y);
  const nextTileSprites = getTile(cursorSprite.x, cursorSprite.y + 1);

  let shouldMove = true;

  // Check if there is any entity in the path preventing the cursor from moving
  if (nextTileSprites.some(sprite => sprite !== cursorSprite && sprite.type !== background)) {
    shouldMove = false;
  }

  // Check if the cursor sprite is on top of another sprite
  spritesOnCursor.forEach(sprite => {
    if (sprite !== cursorSprite && sprite.type !== background) {
      // Move both the cursor sprite and the sprite it is on top of upwards
      sprite.y += 1;
    }
  });

  // Move the cursor sprite if conditions allow
  if (shouldMove) {
    cursorSprite.y += 1;
    playTune(thock)
  }
})

onInput("a", () => {
  const cursorSprite = getFirst(cursor);
  const spritesOnCursor = getTile(cursorSprite.x, cursorSprite.y);
  const nextTileSprites = getTile(cursorSprite.x - 1, cursorSprite.y);

  let shouldMove = true;

  // Check if there is any entity in the path preventing the cursor from moving
  if (nextTileSprites.some(sprite => sprite !== cursorSprite && sprite.type !== background)) {
    shouldMove = false;
  }

  // Check if the cursor sprite is on top of another sprite
  spritesOnCursor.forEach(sprite => {
    if (sprite !== cursorSprite && sprite.type !== background) {
      // Move both the cursor sprite and the sprite it is on top of upwards
      sprite.x -= 1;
    }
  });

  // Move the cursor sprite if conditions allow
  if (shouldMove) {
    cursorSprite.x -= 1;
    playTune(thock)
  }
})

onInput("d", () => {
  const cursorSprite = getFirst(cursor);
  const spritesOnCursor = getTile(cursorSprite.x, cursorSprite.y);
  const nextTileSprites = getTile(cursorSprite.x + 1, cursorSprite.y);

  let shouldMove = true;

  // Check if there is any entity in the path preventing the cursor from moving
  if (nextTileSprites.some(sprite => sprite !== cursorSprite && sprite.type !== background)) {
    shouldMove = false;
  }

  // Check if the cursor sprite is on top of another sprite
  spritesOnCursor.forEach(sprite => {
    if (sprite !== cursorSprite && sprite.type !== background) {
      // Move both the cursor sprite and the sprite it is on top of upwards
      sprite.x += 1;
    }
  });

  // Move the cursor sprite if conditions allow
  if (shouldMove) {
    cursorSprite.x += 1;
    playTune(thock)
  }
})

// called upon main menu input
function startGame() {
  gameStarted = true;
  clearText()
  nextLevel()
  startTime = performance.now()
}

// special level switcher logic
function next level() {
  setSolids([]) // allow block collisions temporarily to allow setting random puzzle config
  
  if (speedrun === true) { // actually switch levels since we are in speedrun mode
    if (levels.length - 1 == level) {
      gameOver();
    } else {
      //console.log("next level");
      level++;
      setMap(levels[level])
      addSprite(0, 0, cursor)
    }
  } else { // if in endless mode
    clearText()
    statsShowing = false;
    level = 1; // keep level the same for simplicity
    setMap(levels[level])
    addSprite(0, 0, cursor)
    startTime = performance.now()

    // generate new puzzle configuration
    let puzzle = generateRandomPuzzle();
    for (let i = 0; i < blocks.length; i++) { // loop for every tile and get its position from the configuration
      let tile = i + 1;
      let position = getTilePosition(puzzle, tile);

      let tileSprite = getFirst(blocks[i]);
      tileSprite.x = position.x
      tileSprite.y = position.y
      //console.log(`Tile ${blocks[i]} is at position: (${position.x}, ${position.y})`);
    }
    printPuzzle(puzzle);
  }
  setSolids( // bring collisions back now that we've set all positions
    [one, two, three, four, five, six, seven, eight]
  )
}

function endlessStats() { // stats screen after every solve in endless mode
  statsShowing = true;
  setMap(endScreenLevel[0])

  endTime = performance.now()
  var timeDiff = endTime - startTime; //in ms
  // strip the ms and convert to seconds
  timeDiff /= 1000;
  var seconds = +timeDiff.toFixed(2);

  if (seconds < personalBest) {
    personalBest = seconds;
    //console.log(personalBest)
  }

  addText(`Time: ${seconds} sec`, { x: 3, y: 2, color: color`3` })
  addText(`PB: ${personalBest} sec`, { x: 4, y: 4, color: color`3` })
  addText("Press Right-Up", {
    x: 3,
    y: 10,
    color: color`3`
  })
  addText("to continue", {
    x: 4,
    y: 11,
    color: color`3`
  })
}

function gameOver() { // only in speedrun mode
  setMap(endScreenLevel[0])

  endTime = performance.now()
  var timeDiff = endTime - startTime; //in ms
  // strip the ms and convert to seconds
  timeDiff /= 1000;
  var seconds = +timeDiff.toFixed(2);

  addText("Game Over!", {
    x: 5,
    y: 2,
    color: color`2`
  })
  addText(`Time: ${seconds} sec`, { x: 4, y: 4, color: color`4` })
  addText("Did you beat my PB?", {
    x: 1,
    y: 7,
    color: color`2`
  })
  addText("It was 135s", {
    x: 4,
    y: 8,
    color: color`2`
  })
  playback.end()
  
}

afterInput(() => {
  const firstRowAligned = getFirst(one).x < getFirst(two).x && getFirst(two).x < getFirst(three).x && [one, two, three].every(type => getFirst(type).y === 0);
  const secondRowAligned = getFirst(four).x < getFirst(five).x && getFirst(five).x < getFirst(six).x && [four, five, six].every(type => getFirst(type).y === 1);
  const thirdRowAligned = getFirst(seven).x === 0 && getFirst(eight).x === 1 && [seven, eight].every(type => getFirst(type).y === 2);

  if (firstRowAligned && secondRowAligned && thirdRowAligned) {
    if (speedrun === true) {
      nextLevel();
    } else {
      endlessStats();
    }
  } else if (statsShowing === true) {
    nextLevel();
  }
})

// all of this is dedicated to endless mode random setup generation, geeksforgeeks FTW
function generateRandomPuzzle() {
  const puzzle = [...Array(9).keys()];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function countInversions(array) {
    let inversions = 0;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] > array[j] && array[i] !== 0 && array[j] !== 0) {
          inversions++;
        }
      }
    }
    return inversions;
  }
  let isSolvable = false;
  while (!isSolvable) {
    shuffle(puzzle);
    const inversions = countInversions(puzzle);
    isSolvable = inversions % 2 === 0;
  }
  return puzzle;
}

function printPuzzle(puzzle) {
  for (let i = 0; i < 9; i += 3) {
    //console.log(puzzle.slice(i, i + 3).join(" "));
  }
}

function getTilePosition(puzzle, tile) {
  const index = puzzle.indexOf(tile);
  if (index === -1) {
    return null;
  }
  const x = index % 3;
  const y = Math.floor(index / 3);
  return { x, y };
}
