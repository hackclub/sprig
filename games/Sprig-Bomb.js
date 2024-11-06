/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Bomb
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const bomb = "b";

setLegend(
  [ player, bitmap`
................
................
................
....H......H....
....H......H....
................
..H..........H..
..H..........H..
...HHHHHHHHHH...
................
................
................
................
................
................
................` ],
  [ bomb, bitmap`
................
................
................
...LLLLLLLLLL...
...L11111111L...
...L11111111L...
...L13111131L...
...L11111111L...
...L13111131L...
...L11333311L...
...L11111111L...
...L11111111L...
...LLLLLLLLLL...
................
................
................` ]
)

setSolids([ player, bomb ])

let level = 0
const levels = [
  map`
p.
..`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let playerX = 3;
let playerY = 3;
let bombX = 3;
let bombY = 6;
let score = 0;

const removeAllSprites = () => {
  getAll().forEach(sprite => {
    sprite.remove();
  });
};

const removeAllTexts = () => {
  getAll().forEach(sprite => {
    if (sprite.type === "text") sprite.remove();
  });
};

const end = (win) => {
  clearText();
  if (win) {
    addText(`You win!`, { x: 5, y: 7, color: color`3` });
  } else {
    addText(`Game Over!`, { x: 5, y: 7, color: color`3` });
  }
};

const redraw = () => {
  removeAllSprites();
  removeAllTexts();

  playerX = Math.max(0, Math.min(playerX, width() - 1));
  playerY = Math.max(0, Math.min(playerY, height() - 1));

  bombX = Math.max(0, Math.min(bombX, width() - 1));
  bombY = Math.max(0, Math.min(bombY, height() - 1));

  addSprite(playerX, playerY, player);
  addSprite(bombX, bombY, bomb);

  addText(`Score: ${score}`, { x: 1, y: 1, color: color`3` });
};

let lastInput = null;

const getLastInput = () => {
  return lastInput;
};

const setInput = (input) => {
  lastInput = input;
};

onInput("s", () => {
  setInput("s");
  playerY += 1;
  checkPos();
  redraw();
});

onInput("w", () => {
  setInput("w");
  playerY -= 1;
  checkPos();
  redraw();
});

onInput("a", () => {
  setInput("a");
  playerX -= 1;
  checkPos();
  redraw();
});

onInput("d", () => {
  setInput("d");
  playerX += 1;
  checkPos();
  redraw();
});

const MAX_ATTEMPTS = 100;

const checkPos = () => {
  if (playerX === bombX && playerY === bombY) {
    end(false);
    return;
  }

  let newPlayerX = playerX;
  let newPlayerY = playerY;

  switch (getLastInput()) {
    case "w": newPlayerY = Math.max(playerY - 1, 0); break;
    case "s": newPlayerY = Math.min(playerY + 1, height() - 1); break;
    case "a": newPlayerX = Math.max(playerX - 1, 0); break;
    case "d": newPlayerX = Math.min(playerX + 1, width() - 1); break;
  }

  playerX = newPlayerX;
  playerY = newPlayerY;

  let newBombX = bombX;
  let newBombY = bombY;

  let validPositionFound = false;
  let attempts = 0;

  while (!validPositionFound && attempts < MAX_ATTEMPTS) {
    const randomTile = Math.floor(Math.random() * 4);

    switch (randomTile) {
      case 0: newBombY = Math.min(bombY + 1, height() - 1); break;
      case 1: newBombY = Math.max(bombY - 1, 0); break;
      case 2: newBombX = Math.min(bombX + 1, width() - 1); break;
      case 3: newBombX = Math.max(bombX - 1, 0); break;
    }

    if (newBombX >= 0 && newBombX < width() && newBombY >= 0 && newBombY < height()) {
      bombX = newBombX;
      bombY = newBombY;
      validPositionFound = true;
    }

    attempts++;
  }

  if (playerX === bombX && playerY === bombY) {
    end(false);
  }

  score++;
};