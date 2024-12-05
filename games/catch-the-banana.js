/*
@title: Catch The Banana
@author: Sayed Hashim
@tags: ["timed", "retro"]
@addedOn: 2024-11-29
*/

const player = "p";
const banana = "b";
const blueBanana = "t"
const lava = "l";
const backgroundTune = tune`
202.7027027027027: C4^202.7027027027027,
202.7027027027027: C4/202.7027027027027,
202.7027027027027,
202.7027027027027: E4/202.7027027027027,
202.7027027027027: E4-202.7027027027027,
202.7027027027027: E4-202.7027027027027,
202.7027027027027: F4/202.7027027027027,
202.7027027027027: G4/202.7027027027027,
202.7027027027027,
202.7027027027027: B4/202.7027027027027,
202.7027027027027: C5/202.7027027027027,
202.7027027027027,
202.7027027027027: A4/202.7027027027027,
202.7027027027027: G4/202.7027027027027,
202.7027027027027,
202.7027027027027: G4^202.7027027027027,
202.7027027027027: G4-202.7027027027027,
202.7027027027027: F4-202.7027027027027,
202.7027027027027,
202.7027027027027: B4^202.7027027027027,
202.7027027027027: A4-202.7027027027027,
202.7027027027027: G4-202.7027027027027,
405.4054054054054,
202.7027027027027: B4/202.7027027027027,
202.7027027027027: C5/202.7027027027027,
202.7027027027027,
202.7027027027027: B4/202.7027027027027,
202.7027027027027: A4/202.7027027027027,
202.7027027027027,
202.7027027027027: C4^202.7027027027027,
202.7027027027027: C4/202.7027027027027`
const catchSound = tune`
71.59904534606206: B5~71.59904534606206,
71.59904534606206: B5~71.59904534606206,
71.59904534606206: B5~71.59904534606206 + A5~71.59904534606206,
71.59904534606206: B5~71.59904534606206 + A5~71.59904534606206,
71.59904534606206: B5~71.59904534606206 + A5~71.59904534606206,
1933.1742243436754`
const burnSound = tune`
99.00990099009901: A5/99.00990099009901 + B5/99.00990099009901,
99.00990099009901: B5/99.00990099009901 + A5/99.00990099009901 + G5~99.00990099009901,
99.00990099009901: B5/99.00990099009901 + A5/99.00990099009901 + G5~99.00990099009901,
99.00990099009901: B5/99.00990099009901 + A5/99.00990099009901 + G5~99.00990099009901,
99.00990099009901: B5/99.00990099009901 + A5/99.00990099009901 + G5~99.00990099009901,
2673.267326732673`
playTune(backgroundTune, Infinity)



setLegend(
  [player, bitmap`
................
................
................
................
................
................
................
................
..000000000000..
.0LLLLLLLLLLLL0.
0LLLLLLLLLLLLLL0
00LLLLLLLLLLLL00
0100000000000010
0111111111111110
.01111111111110.
..000000000000..`],
  [banana, bitmap`
................
................
.......000......
.......060......
....0.0660......
....0.06660.0...
....0003630.0...
......0666000...
......05550.....
......05650.....
.....066660.....
.....06660......
......000.......
......0.0.......
......0.0.......
.....0...0......`],
  [blueBanana, bitmap`
................
................
.......000......
.......050......
....0.0550......
....0.05550.0...
....0003530.0...
......0555000...
......07770.....
......07570.....
.....055550.....
.....05550......
......000.......
......0.0.......
......0.0.......
.....0...0......`],
  [lava, bitmap`
................
.......699999...
....6999966696..
96..966996969669
6969966969999969
9999999999666699
6966966699999669
6999999999699999
6699669669999969
6996999999699999
9999666699999999
9966999699996966
9696999999666669
9999666666996996
9999999996699999
6669666999999666`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
....b....
.........
.........
.........
.........
....p....
lllllllll`
];

setMap(levels[level]);

setPushables({
  [player]: []
});

let gameOver = false;

const gameOverFunction = () => {
  gameOver = true;
  addText("Game Over\npress j to restart", { x: 1, y: 7, color: color`3` });
  addText("Score: " + score.toString(), { x: 1, y: 9, color: color`3` });
};

onInput("d", () => {
  if (!gameOver) {
    const playerSprite = getFirst(player);
    if (playerSprite.x < width() - 1) {
      playerSprite.x += 1;
    }
  }
});

onInput("a", () => {
  if (!gameOver) {
    const playerSprite = getFirst(player);
    if (playerSprite.x > 0) {
      playerSprite.x -= 1;
    }
  }
});

let score = 0;
let timer = 60;

onInput("j", () => {
  gameOver = false;
  score = 0;
  timer = 60;
  setMap(levels[level]);
  clearText();
});

function handleBananaCollision(bananaSprite, points, timeBonus = 0) {
  const playerSprite = getFirst(player);
  if (bananaSprite.y === playerSprite.y && bananaSprite.x === playerSprite.x) {
    playTune(catchSound);
    score += points;
    timer += timeBonus;
    bananaSprite.y = 0;
    bananaSprite.x = Math.floor(Math.random() * width());
    return true;
  }
  return false;
}

function handleLavaCollision(bananaSprite) {
  const lavaSprite = getFirst(lava);
  if (bananaSprite.y === lavaSprite.y) {
    playTune(burnSound);
    return true;
  }
  return false;
}

setInterval(() => {
  if (gameOver) return;

  if (timer > 0) {
    timer -= 1;
  } else {
    gameOverFunction();
  }
}, 1000);


setInterval(() => {
  if (gameOver) return;

  const bananaSprite = getFirst(banana);
  getFirst(banana).y += 1;

  addText("Score: " + score.toString().padStart(2, '0'), { x: 0, y: 0, color: color`6` });
  addText("Time: " + timer.toString().padStart(2, '0'), { x: 0, y: 1, color: color`6` });
  const playerSprite = getFirst(player);
  if (bananaSprite.y === playerSprite.y && bananaSprite.x === playerSprite.x) {
    playTune(catchSound);
    bananaSprite.y = 0;
    bananaSprite.x = Math.floor(Math.random() * width());
    score += 1;
  }

  const lavaSpirte = getFirst(lava);
  if (bananaSprite.y === lavaSpirte.y) {
    playTune(burnSound);
    if (score > 0) {
      bananaSprite.y = 0;
      bananaSprite.x = Math.floor(Math.random() * width());
      score -= 1;
    } else {
      gameOverFunction();
    }
  }

}, 250);

setInterval(() => {
  if (gameOver) return;

  if (!getFirst(blueBanana) && Math.random() < 0.05) {
    addSprite(Math.floor(Math.random() * width()), 0, blueBanana);
  }

  const blueBananaSprite = getFirst(blueBanana);
  if (blueBananaSprite) {
    blueBananaSprite.y += 1;

    const playerSprite = getFirst(player);
    if (blueBananaSprite.y === playerSprite.y && blueBananaSprite.x === playerSprite.x) {
      blueBananaSprite.remove();
      score += 3;
      timer += 5;
      playTune(catchSound);
    }

    const lavaSprite = getFirst(lava);
    if (blueBananaSprite.y === lavaSprite.y) {
      blueBananaSprite.remove();
      playTune(burnSound);
    }
  }
}, 250);
