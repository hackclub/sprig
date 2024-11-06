/*
@title: Bomb
@author: Scaratek
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
    addText(`You win! Your score: ${score}`, { x: 5, y: 7, color: color`3` });
  } else {
    addText(`Game Over! Your score: ${score}`, { x: 5, y: 7, color: color`2` });
  }
};

const redraw = () => {
  removeAllSprites();
  removeAllTexts();

  addSprite(playerX, playerY, player);
  addSprite(bombX, bombY, bomb);

  addText(`Score: ${score}`, { x: 1, y: 1, color: color`1` });
};
onInput("s", () => {
  playerY += 1;
  movePlayerAndCheck();
  redraw();
});

onInput("w", () => {
  playerY -= 1;
  movePlayerAndCheck();
  redraw();
});

onInput("a", () => {
  playerX -= 1;
  movePlayerAndCheck();
  redraw();
});

onInput("d", () => {
  playerX += 1;
  movePlayerAndCheck();
  redraw();
});

const movePlayerAndCheck = () => {
  if (playerX === bombX && playerY === bombY) {
    end(false);
    return;
  }

  let newBombX = bombX;
  let newBombY = bombY;

  const randomTile = Math.floor(Math.random() * 4);
  
  switch (randomTile) {
    case 0: newBombY = Math.min(bombY + 1, height() - 1); break;
    case 1: newBombY = Math.max(bombY - 1, 0); break;
    case 2: newBombX = Math.min(bombX + 1, width() - 1); break;
    case 3: newBombX = Math.max(bombX - 1, 0); break;
  }

  console.log("New Bomb Position X, Y:", newBombX, newBombY);
  console.log("Grid Width, Height:", width(), height());

  if (newBombX >= 0 && newBombX < width() && newBombY >= 0 && newBombY < height()) {
    bombX = newBombX;
    bombY = newBombY;
  } else {
    console.log("Bomb moving out of bounds!");
  }

  score++;
};
