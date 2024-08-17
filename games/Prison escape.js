/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Prison escape
@author: Adrian T
@tags: [maze, multiplayer, prison, escape, levels, score]
@addedOn: 2024-08-15
*/

const mappedSprites = [];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
class MappedSprite {
  bitmapKey = "";
  bitmap = bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`;
  readableName = "";
  constructor(readableName) {
    this.readableName = readableName;
    if (mappedSprites.filter(sprite => sprite.readableName === this.readableName).length > 0) {
      throw new Error(`Sprite with readable name "${this.readableName}" already exists`);
    }

    this.bitmapKey = alphabet[mappedSprites.length] || alphabet[mappedSprites.length - alphabet.length];
    mappedSprites.push({
      readableName: this.readableName,
      bitmapKey: this.bitmapKey
    });
  }

  setBitmap(bitmap) {
    this.bitmap = bitmap;
    return this;
  }
}

const copSprite = new MappedSprite("cop").setBitmap(bitmap`
....LLLLL11L....
....1100001L....
...L1022220LL...
...100222200L...
...102022020L...
....02022020....
....02222220....
....02222220....
....02LLLL20....
....02L22L20....
.....022220.....
....05000050....
...0555555750...
..055555557550..
.05555555555550.
.00000000000000.`);
const playerSprite = new MappedSprite("player").setBitmap(bitmap`
................
......0000......
.....033220.....
....00222200....
....02022020....
....02022020....
....01222220....
....01222220....
....02222220....
....02000020....
.....022220.....
....00000000....
...0999999990...
..000000000000..
.09999999999990.
.00000000000000.`);
const UpWallSprite = new MappedSprite("wall").setBitmap(bitmap`
.....0LLL0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0LLL0......`);
const SideWallSprite = new MappedSprite("wall2").setBitmap(bitmap`
................
................
................
................
................
0000000000000000
L..............L
LLLLLLLLLLLLLLLL
L..............L
0000000000000000
................
................
................
................
................
................`);
const Angle45RightDown = new MappedSprite("wall3").setBitmap(bitmap`
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.000000.
.....0.L......L.
.....0.LLLLLLLL.
.....0........L.
.....0000000000.
................
................
................
................
................
................`);
const Angle45LeftDown = new MappedSprite("wall4").setBitmap(bitmap`
.....0LLL0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.00000.L.0......
.L.....L.0......
.LLLLLLL.0......
.L.......0......
.000000000......
................
................
................
................
................
................`);
const Angle45RightUp = new MappedSprite("wall5").setBitmap(bitmap`
................
................
................
................
................
.....0000000000.
.....0........L.
.....0.LLLLLLLL.
.....0.L......L.
.....0.L.000000.
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0LLL0......`);
const Angle45LeftUp = new MappedSprite("wall6").setBitmap(bitmap`
................
................
................
................
................
.000000000......
.L.......0......
.LLLLLLL.0......
.L.....L.0......
.00000.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0.L.0......
.....0LLL0......`);
const finishGoal = new MappedSprite("goal").setBitmap(bitmap`
00............00
000..........000
.000........000.
..000......000..
...000....000...
....000..000....
.....000000.....
......0660......
......0660......
.....000000.....
....000..000....
...000....000...
..000......000..
.000........000.
000..........000
00............00`);
const mainMenuBackground = new MappedSprite("mainmenuBackground").setBitmap(bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`);

const stepSound = tune`
51.63511187607573: C4~51.63511187607573,
51.63511187607573: C4~51.63511187607573,
51.63511187607573: C4~51.63511187607573,
1497.4182444061962`;
const escapeSound = tune`
176.47058823529412: F5/176.47058823529412 + E5-176.47058823529412,
176.47058823529412: E5-176.47058823529412 + D5-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: D5-176.47058823529412 + C5-176.47058823529412,
176.47058823529412: C5-176.47058823529412 + B4-176.47058823529412 + D4~176.47058823529412,
176.47058823529412: B4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: B4-176.47058823529412 + A4/176.47058823529412,
176.47058823529412: A4-176.47058823529412 + B4-176.47058823529412,
176.47058823529412: B4-176.47058823529412 + C5-176.47058823529412 + C4~176.47058823529412 + D4~176.47058823529412,
176.47058823529412: C5-176.47058823529412 + D5-176.47058823529412,
176.47058823529412: D5/176.47058823529412 + C5-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: C5-176.47058823529412 + B4-176.47058823529412,
176.47058823529412: B4-176.47058823529412 + A4-176.47058823529412 + D4~176.47058823529412,
176.47058823529412: A4-176.47058823529412,
176.47058823529412: A4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: A4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: A4/176.47058823529412 + B4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: B4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: B4-176.47058823529412 + A4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: A4-176.47058823529412 + C4~176.47058823529412,
176.47058823529412: A4/176.47058823529412 + C4~176.47058823529412,
176.47058823529412: C4~176.47058823529412,
1941.1764705882354`;

setLegend(
  [playerSprite.bitmapKey, playerSprite.bitmap],
  [copSprite.bitmapKey, copSprite.bitmap],
  [UpWallSprite.bitmapKey, UpWallSprite.bitmap],
  [SideWallSprite.bitmapKey, SideWallSprite.bitmap],
  [Angle45RightDown.bitmapKey, Angle45RightDown.bitmap],
  [Angle45LeftDown.bitmapKey, Angle45LeftDown.bitmap],
  [Angle45RightUp.bitmapKey, Angle45RightUp.bitmap],
  [Angle45LeftUp.bitmapKey, Angle45LeftUp.bitmap],
  [mainMenuBackground.bitmapKey, mainMenuBackground.bitmap],
  [finishGoal.bitmapKey, finishGoal.bitmap],
)


const solids = [
    UpWallSprite.bitmapKey,
    SideWallSprite.bitmapKey,
    Angle45RightDown.bitmapKey,
    Angle45LeftDown.bitmapKey,
    Angle45RightUp.bitmapKey,
    Angle45LeftUp.bitmapKey,
    playerSprite.bitmapKey,
    copSprite.bitmapKey,
  ]
setSolids(solids);

let level = 0;
const levelMap = {
  0: "medium security",
  1: "high security",
  2: "ultramax security",
}
let pathFindingMode = false; // AI will take over the world
let score = 0, topScore = score;
const GameState = {
  MAIN_MENU: "MainMenu",
  RUNNING: "Running",
  FINISHED: "Finished",
  SCREEN: "In a screen"
};
let gameState = GameState.MAIN_MENU;
const mainMenuMap = map`
JJJJJJJJJ
JJJJJJJJJ
JJJJJJJJJ
JJJBJAJJJ
JJJJJJJJJ
JJJAJBJJJ
JJJJJJJJJ
JJJJJJJJJ
JJJJJJJJJ`;
const endMap = map`
....
....
....
....`;
const levels = [
  map`
GDDDDDH
CA.B..C
C...C.C
C.GDF.C
CDF...C
C...C.C
EIDDDDF`,
  map`
GDDDDIH
CA..C.C
CDD.F.C
C.....C
C..C..C
C.BC..C
EDDDDDF`,
  map`
GDDDDDDDH
CB......C
CDD.GDDDC
C.......I
C.C...GDC
C.C...C.C
C.E..DD.C
C....A..C
EDDDDDDDF`,
]

openStartMenu();

let playerEntity, copEntity;

onInput("w", () => {
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  playerEntity = getFirst(playerSprite.bitmapKey);
  if (!playerEntity) return;
  // Check if the copSprite is in the new coordinates
  if (isAboutToCollide(playerEntity.x, playerEntity.y - 1, copSprite.bitmapKey)) loseCondition();
  playerEntity.y -= 1;
});
onInput("a", () => {
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  playerEntity = getFirst(playerSprite.bitmapKey);
  if (!playerEntity) return;
  if (isAboutToCollide(playerEntity.x - 1, playerEntity.y, copSprite.bitmapKey)) loseCondition();
  playerEntity.x -= 1;
});

onInput("s", () => {
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  playerEntity = getFirst(playerSprite.bitmapKey);
  if (!playerEntity) return;
  if (isAboutToCollide(playerEntity.x, playerEntity.y + 1, copSprite.bitmapKey)) loseCondition();
  getFirst(playerSprite.bitmapKey).y += 1;
});
onInput("d", () => {
  console.log(gameState);
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  playerEntity = getFirst(playerSprite.bitmapKey);
  if (!playerEntity) return;
  if (isAboutToCollide(playerEntity.x + 1, playerEntity.y, copSprite.bitmapKey)) loseCondition();
  getFirst(playerSprite.bitmapKey).x += 1;
});
onInput("i", () => {
  if (gameState == GameState.MAIN_MENU) {
    gameState = GameState.RUNNING;
    setBackground(null);
    level = 0;
    setMap(levels[level]);
    clearText();
  } else {
    if (pathFindingMode) return;
    if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
    copEntity = getFirst(copSprite.bitmapKey);
    if (!copEntity) return;
    if (isAboutToCollide(copEntity.x, copEntity.y - 1, playerSprite.bitmapKey)) loseCondition();
    copEntity.y -= 1;
  }
});
onInput("j", () => {
  if (pathFindingMode) return;
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  copEntity = getFirst(copSprite.bitmapKey);
  if (!copEntity) return;
  if (isAboutToCollide(copEntity.x - 1, copEntity.y, playerSprite.bitmapKey)) loseCondition();
  copEntity.x -= 1;
});
onInput("k", () => {
  if (pathFindingMode) return;
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  copEntity = getFirst(copSprite.bitmapKey);
  if (!copEntity) return;
  if (isAboutToCollide(copEntity.x, copEntity.y + 1, playerSprite.bitmapKey)) loseCondition();
  copEntity.y += 1;
});
onInput("l", () => {
  if (pathFindingMode) return;
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  copEntity = getFirst(copSprite.bitmapKey);
  if (!copEntity) return;
  if (isAboutToCollide(copEntity.x + 1, copEntity.y, playerSprite.bitmapKey)) loseCondition();
  copEntity.x += 1;
});

afterInput(() => {
  if ([GameState.MAIN_MENU, GameState.FINISHED, GameState.SCREEN].includes(gameState)) return;
  playerEntity = getFirst(playerSprite.bitmapKey);
  copEntity = getFirst(copSprite.bitmapKey);
  if (!copEntity || !playerEntity) return;

  // Pathfinding for each cop
  // Disabled for now

  playTune(stepSound);

  // Lose condition
  if (isAboutToCollide(playerEntity.x, playerEntity.y, copSprite.bitmapKey)) {
    loseCondition();
  }

  // Win condition
  if (isAboutToCollide(playerEntity.x, playerEntity.y, finishGoal.bitmapKey)) {
    if (levels.length-1 > level) {
      openWinMenu(true);
    } else {
      gameState = GameState.FINISHED;
      openWinMenu(false);
    }
  }
});

function loseCondition() {
  console.log("Collision detected! Game over.");
  clearText();
  setBackground(mainMenuBackground.bitmapKey);
  setMap(endMap);
  addText("You got\ncaught :(", {
    x: 5,
    y: 1,
    color: color`0`,
  });
  score = 0;

  setTimeout(reset, 2500);
}

function reset() {
  gameState = GameState.MAIN_MENU;
  openStartMenu();
}

function openStartMenu() {
  clearText();
  setBackground(mainMenuBackground.bitmapKey);
  setMap(mainMenuMap);
  addText(" Escape from\n   prison", {
    x: 4,
    y: 1,
    color: color`0`,
  });

  addText(" Press start", {
    x: 4,
    y: 13,
    color: color`0`,
  });
  addText(`Top: ${topScore} ${topScore == 1 ? "pt" : "pts"}`, {
    x: 5,
    y: 14,
    color: color`0`,
  });
}
function openWinMenu(hasNextLevel) {
  gameState = GameState.SCREEN;
  clearText();
  setBackground(mainMenuBackground.bitmapKey);
  setMap(endMap);

  score++;
  playTune(escapeSound);
  if (score > topScore) topScore = score;
  addText(`${score} ${score == 1 ? "pt" : "pts"}`, {
    x: 7,
    y: 14,
    color: color`0`,
  });
  if (hasNextLevel) {
    addText("You escaped!", {
      x: 4,
      y: 1,
      color: color`0`,
    });
    setTimeout(clearText, 1000);
    setTimeout(() => addText("uh oh...", {
      x: 8,
      y: 1,
      color: color`0`,
    }), 1500);
    setTimeout(clearText, 3000);
    setTimeout(() => addText(`You've been sent\nto a\n${levelMap[level]}\nprison..`, {
      x: 2,
      y: 1,
      color: color`0`,
    }), 4000);
    setTimeout(() => {
      clearText();
      setBackground(null);
      level++;
      setMap(levels[level]);
      gameState = GameState.RUNNING;
    }, 6500);
  } else {
      addText("You won!", {
        x: 5,
        y: 1,
        color: color`0`,
      });
    setTimeout(reset, 3500);
  }
}

function isAboutToCollide(x, y, sprite2) {
  const entity2 = getFirst(sprite2);
  return x == entity2.x && y == entity2.y;
}