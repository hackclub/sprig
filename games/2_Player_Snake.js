/*
@title: 2 Player Snake
@author: Mohamed Shahul Hameed Niyaz
@tags: ['multiplayer', 'classic', 'snake']
@addedOn: 2024-08-11

Press any key to start playing.
Use WASD to control Red.
Use IJKL to control Blue.

Get as many fruit of your color as you can in a minute.
Hitting a fruit that's not your color will minus points.
The one with more fruits after 60s wins. 

When a collision happens before 60s, whoever was responsible
for the collision (i.e. had the last input) will lose.
*/

// Define the 2 player snakes
const player1 = "a";
const player2 = "b";
const player1Bod = "c";
const player2Bod = "d";
const player1Apple = "e";
const player2Apple = "f";
const background = "g";
// Decor
const bush = "h";
const flowers = "i";
const grass = "j";

setLegend(
  [
    player1,
    bitmap`
3333333333333333
3333333333333333
3330000333000033
3330200333020033
3330000333000033
3330000333000033
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
  ],
  [
    player2,
    bitmap`
7777777777777777
7777777777777777
7770077777000777
7770000770000777
7770020770200777
7770000770000777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`,
  ],
  [
    player1Bod,
    bitmap`
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
3333333333333333`,
  ],
  [
    player2Bod,
    bitmap`
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
7777777777777777`,
  ],
  [
    player1Apple,
    bitmap`
........DD......
...CCCDDDCCCC...
..C333DDD3333C..
.C3333DD333333C.
C33333DD3333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
.C333333333333C.
..C3333333333C..
...CCCCCCCCCC...`,
  ],
  [
    player2Apple,
    bitmap`
........DD......
...555DDD5555...
..5555DDD55555..
.55555DD5555555.
555555DD55555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
.55555555555555.
..555555555555..
...5555555555...`,
  ],
  [
    background,
    bitmap`
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
4444444444444444`,
  ],
  [
    bush,
    bitmap`
................
..DD....DDDDD...
.DDDDD.DDDDDDDD.
.DDDDDDDD444DDD.
.DD444DD444DDDD.
.DD444DD444DDDD.
..DD44D44DDDD...
...DD444DD4DDD..
...DDDD4D44DDDD.
..DDD4DDD4DDDDDD
.DDDD4DD44DDDDDD
.DDDD44D4DDDDD..
..DDDD4D4DDDDD..
..DDDD4DDDDDD...
.....DDDDDD.....
................`,
  ],
  [
    flowers,
    bitmap`
.....D..........
...DDDDD........
....DDD.....33..
.....D.....3FF3.
...........3FF3.
...66.......33..
..6CC6......D...
..6CC6......D...
...66.......D...
...D........D...
...D.........D..
...D............
...D...DDDD.....
..D.....DD......
........DD......
................`,
  ],
  [
    grass,
    bitmap`
................
.............D..
............D...
.....DD.....D...
......D.........
......D.........
......D.........
................
..............DD
..............D.
..............D.
................
................
...DD...........
....D...........
....D...........`,
  ]
);

const level = map`
...........h......
...jjj......j.....
.a.jij..h.jjjj.h..
...jjj.....ijj....
....j..j...j......
......jjjj....h...
..h...jjij........
......ijjj.jj...jj
.......jj..jij..ij
j..h........jjjjj.
jj......h...jjjj..
jj...jj......i...h
ij...jij..........
jjj...j.....jj..b.
j.......h..jjjj.h.
...........jijj...`;
setMap(level);
setBackground(background);

// Some short tunes
const appleTune = tune`
500: B4/500 + D4-500,
15500`
const endTune = tune`
500: B4/500,
500: G5/500,
500: B4/500,
500: G5/500 + F5/500,
14000`

// Track directions (NSEW as 0123) for both snakes
let aDir = "S";
let bDir = "N";
let snakeA = [];
let snakeB = [];
let addSnake1 = false;
let addSnake2 = false;
let delSnake1 = false;
let delSnake2 = false;
let player1Lost = false;
let player2Lost = false;
// Prevent multiple inputs before a screen update
let newADir = aDir;
let newBDir = bDir;
// Track timing
const timePerGame = 60;
const tickTime = 0.1;
let gameTime = timePerGame;

// Player 1
onInput("w", () => {
  if (!(aDir == "S") || snakeA.length == 0) newADir = "N";
});

onInput("a", () => {
  if (!(aDir == "E") || snakeA.length == 0) newADir = "W";
});

onInput("s", () => {
  if (!(aDir == "N") || snakeA.length == 0) newADir = "S";
});

onInput("d", () => {
  if (!(aDir == "W") || snakeA.length == 0) newADir = "E";
});

// Player 2
onInput("i", () => {
  if (!(bDir == "S") || snakeB.length == 0) newBDir = "N";
});

onInput("j", () => {
  if (!(bDir == "E") || snakeB.length == 0) newBDir = "W";
});

onInput("k", () => {
  if (!(bDir == "N") || snakeB.length == 0) newBDir = "S";
});

onInput("l", () => {
  if (!(bDir == "W") || snakeB.length == 0) newBDir = "E";
});

// Get next position of both snakes
function getNextPos() {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  let newPos = [
    [0, 0],
    [0, 0],
  ];

  // Account for direction change
  aDir = newADir;
  bDir = newBDir;

  // Update positions
  switch (aDir) {
    case "N":
      newPos[0] = [p1.x, (p1.y - 1 + height()) % height()];
      break;
    case "S":
      newPos[0] = [p1.x, (p1.y + 1) % height()];
      break;
    case "E":
      newPos[0] = [(p1.x + 1) % width(), p1.y];
      break;
    case "W":
      newPos[0] = [(p1.x - 1 + width()) % width(), p1.y];
      break;
  }
  switch (bDir) {
    case "N":
      newPos[1] = [p2.x, (p2.y - 1 + height()) % height()];
      break;
    case "S":
      newPos[1] = [p2.x, (p2.y + 1) % height()];
      break;
    case "E":
      newPos[1] = [(p2.x + 1) % width(), p2.y];
      break;
    case "W":
      newPos[1] = [(p2.x - 1 + width()) % width(), p2.y];
      break;
  }

  return [
    { x: newPos[0][0], y: newPos[0][1] },
    { x: newPos[1][0], y: newPos[1][1] },
  ];
}

// Update the snakes (main game loop)
function updateSnake(nextPos) {
  // Check if there's a collision with the apples
  const appleA = getFirst(player1Apple);
  const appleB = getFirst(player2Apple);

  // Decide whether to add a new snake body
  if (appleA.x === nextPos[0].x && appleA.y === nextPos[0].y) {
    addSnake1 = true;
    playTune(appleTune)
    appleA.remove();
  }
  if (appleB.x === nextPos[1].x && appleB.y === nextPos[1].y) {
    addSnake2 = true;
    playTune(appleTune)
    appleB.remove();
  }

  // Decide whether to delete a snake body
  if (appleA.x === nextPos[1].x && appleA.y === nextPos[1].y) {
    delSnake2 = true;
    playTune(appleTune)
    appleA.remove();
  }
  if (appleB.x === nextPos[0].x && appleB.y === nextPos[0].y) {
    delSnake1 = true;
    playTune(appleTune)
    appleB.remove();
  }

  // Update apples and snake body/head
  updateBodyPositions(nextPos);
  updateHeadPositions(nextPos);
  summonApples();
  displayScore();
  checkLoss();
  updateTime();
}

// Update body positions
function updateBodyPositions() {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);

  // Functions to add a new snake body at current head position
  function addSnake1AtCurrentPos() {
    addSprite(p1.x, p1.y, player1Bod);
    // Find the snake body and add it to the snake list
    const newSnake = getTile(p1.x, p1.y).find((sprite) => sprite.type === "c");
    snakeA.unshift(newSnake);
  }

  function addSnake2AtCurrentPos() {
    addSprite(p2.x, p2.y, player2Bod);
    // Find the snake body and add it to the snake list
    const newSnake = getTile(p2.x, p2.y).find((sprite) => sprite.type === "d");
    snakeB.unshift(newSnake);
  }

  // Update snake body (Pop off the last body if needed)
  if (addSnake1) {
    addSnake1AtCurrentPos();
  } else if (snakeA.length > 0) {
    addSnake1AtCurrentPos();
    snakeA.pop().remove();
    if (delSnake1) snakeA.pop().remove();
  }
  if (addSnake2) {
    addSnake2AtCurrentPos();
  } else if (snakeB.length > 0) {
    addSnake2AtCurrentPos();
    snakeB.pop().remove();
  }

  addSnake1 = false;
  addSnake2 = false;
  delSnake1 = false;
  delSnake2 = false;
}

// Update the position of each head (based on movement direction)
function updateHeadPositions(nextPos) {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  p1.x = nextPos[0].x;
  p1.y = nextPos[0].y;
  p2.x = nextPos[1].x;
  p2.y = nextPos[1].y;
}

// Summon apples
function summonApples() {
  // Decide on free spaces for apples
  const spaces = getUnoccupiedSpaces();
  const p1Space = spaces[Math.floor(Math.random() * spaces.length)];
  let p2Space = { ...p1Space };
  while (p2Space.x === p1Space.x && p2Space.y === p2Space.y) {
    p2Space = spaces[Math.floor(Math.random() * spaces.length)];
  }

  // Add the apples if they don't exist
  if (tilesWith(player1Apple).length === 0)
    addSprite(p1Space.x, p1Space.y, player1Apple);
  if (tilesWith(player2Apple).length === 0)
    addSprite(p2Space.x, p2Space.y, player2Apple);
}

// Get all unoccupied spaces except background
function getUnoccupiedSpaces() {
  const allSprites = getAll();
  let unoccupiedSpaces = [];
  // Iterate and select tiles with no sprite
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (!allSprites.some((sprite) => sprite.x == x && sprite.y == y)) {
        unoccupiedSpaces.push({ x: x, y: y });
      }
    }
  }
  return unoccupiedSpaces;
}

// Display game score
function displayScore() {
  const p1Score = snakeA.length;
  const p2Score = snakeB.length;

  // Display the scores
  clearText();
  addText(String(p1Score), { x: 2, y: 1, color: color`3` });
  addText(String(p2Score), { x: width() - 1, y: 1, color: color`5` });
  // Display the time
  addText(Math.round(gameTime).toString(), {
    x: Math.floor(width() / 2),
    y: 1,
    color: color`0`,
  });
}

// Check game loss
function checkLoss() {
  const bodies = getAll(player1Bod).concat(getAll(player2Bod));

  // Check for player 1's loss
  const p1 = getFirst(player1);
  const p1LossSprites = bodies.concat(getAll(player2));
  for (sprite of p1LossSprites) {
    if (sprite.x === p1.x && sprite.y === p1.y) player1Lost = true;
  }

  // Check for player 2's loss
  const p2 = getFirst(player2);
  const p2LossSprites = bodies.concat(getAll(player1));
  for (sprite of p2LossSprites) {
    if (sprite.x === p2.x && sprite.y === p2.y) player2Lost = true;
  }

  // Handle loss
  if (player1Lost || player2Lost) handleLoss(false);
}

// Manages winner display on loss
function handleLoss(timeLoss = true) {
  gameLost = true;
  const p1Score = snakeA.length;
  const p2Score = snakeB.length;

  // Determine the winner message
  let message = "Tie!";
  if (timeLoss) {
    if (p1Score !== p2Score) {
      message = p1Score > p2Score ? "Red wins!" : "Blue wins!";
    }
  } else {
    if (!(player1Lost && player2Lost)) {
      message = player1Lost ? "Blue wins!" : "Red wins!";
    }
  }

  // Display the message
  addText(message, {
    x: Math.floor(width() / 2) - (message === "Tie!" ? 1 : 4), // Account for different text widths
    y: Math.floor(height() / 2),
    color: color`0`,
  });
  playTune(endTune)
}

// Update game time
function updateTime() {
  gameTime -= tickTime;
  if (gameTime <= 0) {
    gameLost = true;
    handleLoss(true);
  }
}

function beginGame() {
  let interval = setInterval(() => {
    const nextPos = getNextPos();
    if (!gameLost) {
      updateSnake(nextPos);
    } else {
      clearInterval(interval);
    }
  }, tickTime * 1000);
}

// Setup game loop
addText("Press any button\nto start", {
  x: Math.floor(width() / 2) - 7,
  y: Math.floor(height() / 2) - 1,
  color: color`0`,
});
let gameLost = true;
const allKeys = ["w", "a", "s", "d", "i", "j", "k", "l"];
allKeys.forEach((key) => {
  onInput(key, () => {
    if (gameLost) {
      clearText();
      // Reset game here
      aDir = "S";
      bDir = "N";
      newADir = aDir;
      newBDir = bDir;
      snakeA = [];
      snakeB = [];
      addSnake1 = false;
      addSnake2 = false;
      delSnake1 = false;
      delSnake2 = false;
      gameTime = timePerGame;
      setMap(level);
      summonApples();
      gameLost = false;
      player1Lost = false;
      player2Lost = false;
      // Restart the game
      beginGame();
    }
  });
});
beginGame();
