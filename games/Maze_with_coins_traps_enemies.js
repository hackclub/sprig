/*
@title: Maze with coins, traps, enemies
@author: 123xxgamer
@tags: ['puzzle']
@addedOn: 2024-07-26
*/

const player = "p";
const wall = "w";
const goal = "g";
const floor = "f";
const coin = "c";
const trap = "t";
const enemy = "e";

setLegend(
  [player, bitmap`
................
................
.....333333.....
....33333333....
....33333333....
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....33333333....
....33333333....
.....333333.....
................
................
................
................`],
  [wall, bitmap`
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................
................`],
  [goal, bitmap`
................
................
....99999999....
...9999999999...
...9999999999...
..999999999999..
..999999999999..
..999999999999..
..999999999999..
..999999999999..
...9999999999...
...9999999999...
....99999999....
................
................
................`],
  [floor, bitmap`
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
................
................`],
  [coin, bitmap`
................
................
.......00.......
......0660......
.....066660.....
....06666660....
....06666660....
....06666660....
....06666660....
.....066660.....
......0660......
.......00.......
................
................
................
................`],
  [trap, bitmap`
................
..5..........5..
..55...55...55..
...55.5555.55...
....55555555....
....55555555....
....55555555....
....55555555....
....55555555....
.....555555.....
.....555555.....
....55.55.55....
...55......55...
..55........55..
..5..........5..
................`],
  [enemy, bitmap`
.......88.......
.......88.......
.......88.......
......8888......
.....888888.....
....88888888....
....88888888....
....88888888....
....88888888....
.....888888.....
......8888......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......`]
);

const levels = [
  // Level 1 - Simple Path
  map`
wwwwwwwwwwwwwww
wf.ffffffffffgw
wfwfffffffffffw
wfw..fffffffffw
wfwf....ffffffw
wfwf....ffffffw
wfwf....ffffffw
wfwf.f..ffffffw
wfwf.fffffffffw
wfwfffffffffffw
wfwfffffffffffw
wfwfffffffffffw
wfwffccfffffffw
wffffffffffffff
wwwwwwwwwwwwwww`,
  // Level 2 - Simple Maze with obstacles
  map`
wwwwwwwwwwwwwww
wfffffffffffffw
wfftffffftff.fw
wffwffffffff.fw
wffwffffffffffw
wfftffffftfftfw
wffwffffffffffw
wfffffffffffffw
wfftffffftfftfw
wffwffffffffffw
wffwffffffffffw
wfftffffftfftfw
wffffffffffwffw
wffffffffffwffw
wwwwwwwwwwwwwww`,
  // Level 3 - Maze with more complexity
  map`
wwwwwwwwwwwwwww
wfffffffffffffw
wfwfffffffffffw
wfwfffffffwfffw
wfwfffffffffffw
wfwfffffffffffw
wfwfffffffffffw
wfffffwffwwwffw
wfwfffffffffffw
wfwfffffffffffw
wfwfffwf.ffffcw
wfwfffffffffffw
wfwfffffffffffw
wfwfffcfffffffw
wwwwwwwwwwwwwww`,
  // Level 4 - More complex maze
  map`
wwwwwwwwwwwwwww
wfffwfffwfffffw
wfwfwfwfwfffffw
wfwfwfwfwfffffw
wfwf.fwfffffffw
wcwfwfwfwfffffw
wcwfwfwfwfffffw
wcffffwfwwwfwfw
wfwffwffffffffw
wfwffwffwfffffw
wfwffwffwfffffw
wfwffwffwfffffw
wfwffwffwfff..w
wfwffwffwfff.fw
wwwwwwwwwwwwwww`,
  // Level 5 - Maze with traps and enemies
  map`
wwwwwwwwwwwwwww
wfffffffffffffw
wffffffffffwffw
wfftffffftfftfw
wffwffffffffffw
wcffwwwffffwffw
wcfwwwwwfffwffw
wffwfffwfwffffw
wffffffwfffwffw
wffwfffwffffffw
wffwfffff.ffffw
wfftffffftfftfw
wffffffffffwffw
wffff.fffffwffw
wwwwwwwwwwwwwww`,
  // Level 6 - Complex maze with paths
  map`
wwwwwwwwwwwwwww
wfffffffwfffffw
wfffffffwffwffw
wfffffffwffwffw
wfffffffw.fwffw
wfffwfffw.fwffw
wffwwffw..ffwfw
wffwfffww.ffwfw
wffwfffww.ffwfw
wfwffffwwfffwfw
wwwfffcww.fwffw
wwfffcfw.ffwffw
wfffff.wfffwffw
wffffffffffwffw
wwwwwwwwwwwwwww`,
  // Level 7 - More intricate maze
  map`
wwwwwwwwwwwwwww
wfffffffffffffw
wfffffffffwfwfw
wcfffwfffwffwfw
wcfffwwffwffwfw
w.ffffwfffffwfw
wcfffffwffffwfw
wffffffwffffwfw
wfffwfffwwffwfw
wwwwwwwwwwwfwfw
wfwf.ffffwwfwfw
wfww.fffffffwfw
wfffwfffffffwfw
wffffffwwfffwcw
wwwwwwwwwwwwwww`
];

let currentLevel = 0;
setMap(levels[currentLevel]);

setSolids([player, wall]);

let coinCount = 0;
const coinPositions = [
  { x: 2, y: 2 }, { x: 12, y: 2 }, { x: 2, y: 12 }, { x: 12, y: 12 },
  { x: 7, y: 7 }, { x: 6, y: 6 }, { x: 8, y: 8 }
];
const totalCoins = coinPositions.length;
const trapPositions = [
  { x: 4, y: 4 }, { x: 10, y: 4 }, { x: 4, y: 10 }, { x: 10, y: 10 }
];
const enemyPositions = [
  { x: 6, y: 3 }, { x: 8, y: 11 }
];
coinPositions.forEach(pos => addSprite(pos.x, pos.y, coin));
trapPositions.forEach(pos => addSprite(pos.x, pos.y, trap));
enemyPositions.forEach(pos => addSprite(pos.x, pos.y, enemy));

addSprite(1, 1, player);
addSprite(13, 1, goal);

addText(`Coins: ${coinCount}/${totalCoins}`, { x: 1, y: 1, color: color`3` });

onInput("w", () => {
  const playerSprite = getFirst(player);
  playerSprite.y -= 1;
  handlePlayerMovement(playerSprite);
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  playerSprite.x -= 1;
  handlePlayerMovement(playerSprite);
});

onInput("s", () => {
  const playerSprite = getFirst(player);
  playerSprite.y += 1;
  handlePlayerMovement(playerSprite);
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  playerSprite.x += 1;
  handlePlayerMovement(playerSprite);
});

function handlePlayerMovement(playerSprite) {
  collectCoins(playerSprite);
  checkCollisions(playerSprite);
  checkLevelCompletion(playerSprite);
}

function collectCoins(playerSprite) {
  const tileSprites = getTile(playerSprite.x, playerSprite.y);
  tileSprites.forEach(sprite => {
    if (sprite.type === coin) {
      sprite.remove();
      coinCount++;
      clearText();
      addText(`Coins: ${coinCount}/${totalCoins}`, { x: 1, y: 1, color: color`3` });
    }
  });
}

function checkCollisions(playerSprite) {
  const tileSprites = getTile(playerSprite.x, playerSprite.y);
  tileSprites.forEach(sprite => {
    if (sprite.type === trap || sprite.type === enemy) {
      triggerGameOver();
    }
  });
}

function checkLevelCompletion(playerSprite) {
  const goalTile = getFirst(goal);
  if (playerSprite.x === goalTile.x && playerSprite.y === goalTile.y && coinCount === totalCoins) {
    console.log("Level complete!");
    currentLevel++;
    if (currentLevel < levels.length) {
      setMap(levels[currentLevel]);
      addSprite(1, 1, player);
      addSprite(13, 1, goal);
      coinPositions.forEach(pos => addSprite(pos.x, pos.y, coin));
      trapPositions.forEach(pos => addSprite(pos.x, pos.y, trap));
      enemyPositions.forEach(pos => addSprite(pos.x, pos.y, enemy));
      coinCount = 0;
      clearText();
      addText(`Coins: ${coinCount}/${totalCoins}`, { x: 1, y: 1, color: color`3` });
    } else {
      console.log("You win the game!");
      addText("You win!", { x: 5, y: 7, color: color`3` });
    }
  }
}

function triggerGameOver() {
  console.log("Game over!");
  addText("Game Over", { x: 5, y: 7, color: color`3` });
  setTimeout(() => {
    resetGame();
  }, 2000);
}

function resetGame() {
  currentLevel = 0;
  coinCount = 0;
  clearText();
  addText(`Coins: ${coinCount}/${totalCoins}`, { x: 1, y: 1, color: color`3` });
  setMap(levels[currentLevel]);
  addSprite(1, 1, player);
  addSprite(13, 1, goal);
  coinPositions.forEach(pos => addSprite(pos.x, pos.y, coin));
  trapPositions.forEach(pos => addSprite(pos.x, pos.y, trap));
  enemyPositions.forEach(pos => addSprite(pos.x, pos.y, enemy));
}

setInterval(() => {
  const enemies = getAll(enemy);
  enemies.forEach(e => {
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
      case 0:
        e.y -= 1;
        break;
      case 1:
        e.y += 1;
        break;
      case 2:
        e.x -= 1;
        break;
      case 3:
        e.x += 1;
        break;
    }
  });
}, 1000);

const melody = tune`
394.7368421052632: C4~394.7368421052632 + F5^394.7368421052632 + F4-394.7368421052632 + C5/394.7368421052632,
394.7368421052632: C4~394.7368421052632 + E5^394.7368421052632 + F4-394.7368421052632 + A5/394.7368421052632,
394.7368421052632: D4~394.7368421052632 + F5^394.7368421052632 + F4-394.7368421052632,
394.7368421052632: C4~394.7368421052632 + F4-394.7368421052632 + C5/394.7368421052632,
394.7368421052632: D4~394.7368421052632 + E5^394.7368421052632 + G4-394.7368421052632 + C5/394.7368421052632,
394.7368421052632: C4~394.7368421052632 + F5^394.7368421052632 + F4-394.7368421052632 + A5/394.7368421052632,
394.7368421052632: D4~394.7368421052632 + E5^394.7368421052632 + F4-394.7368421052632 + G5/394.7368421052632,
394.7368421052632: D4~394.7368421052632 + C5^394.7368421052632 + G4-394.7368421052632 + F5/394.7368421052632,
394.7368421052632: E4~394.7368421052632 + B4^394.7368421052632 + G4-394.7368421052632 + E5/394.7368421052632,
394.7368421052632: D4~394.7368421052632 + C5^394.7368421052632 + A5^394.7368421052632 + F4-394.7368421052632 + F5/394.7368421052632,
394.7368421052632: E4~394.7368421052632 + A5^394.7368421052632 + G4-394.7368421052632 + E5/394.7368421052632,
394.7368421052632: E4~394.7368421052632 + G5^394.7368421052632 + G4-394.7368421052632 + B4/394.7368421052632,
394.7368421052632: F4~394.7368421052632 + F5^394.7368421052632 + A4-394.7368421052632 + B4/394.7368421052632,
394.7368421052632: E4~394.7368421052632 + D5^394.7368421052632 + G4-394.7368421052632 + B4/394.7368421052632,
394.7368421052632: F4~394.7368421052632 + A5^394.7368421052632 + D4-394.7368421052632 + F5/394.7368421052632,
394.7368421052632: G4~394.7368421052632 + G5^394.7368421052632 + E4-394.7368421052632 + E5/394.7368421052632 + C5/394.7368421052632,
394.7368421052632: F4~394.7368421052632 + A5^394.7368421052632 + D4-394.7368421052632,
394.7368421052632: G4~394.7368421052632 + G5^394.7368421052632 + D4-394.7368421052632 + E5/394.7368421052632,
394.7368421052632: A4~394.7368421052632 + F5^394.7368421052632 + E4-394.7368421052632 + D5/394.7368421052632,
394.7368421052632: A4~394.7368421052632 + G5^394.7368421052632 + E4-394.7368421052632 + D5/394.7368421052632,
394.7368421052632: G4~394.7368421052632 + F5^394.7368421052632 + E4-394.7368421052632,
394.7368421052632: A4~394.7368421052632 + C5^394.7368421052632 + E4-394.7368421052632 + E5/394.7368421052632,
394.7368421052632: A4~394.7368421052632 + C5^394.7368421052632 + F4-394.7368421052632 + F5/394.7368421052632,
394.7368421052632: B4~394.7368421052632 + D5^394.7368421052632 + F4-394.7368421052632 + F5/394.7368421052632,
394.7368421052632: C5~394.7368421052632 + A4^394.7368421052632 + E4-394.7368421052632 + G5/394.7368421052632,
394.7368421052632: C5~394.7368421052632 + A4^394.7368421052632 + F4-394.7368421052632 + A5/394.7368421052632 + E5/394.7368421052632,
394.7368421052632: B4~394.7368421052632 + G4^394.7368421052632 + E4-394.7368421052632 + G5/394.7368421052632,
394.7368421052632: C5~394.7368421052632 + A4^394.7368421052632 + F4-394.7368421052632 + G5/394.7368421052632,
394.7368421052632: C5~394.7368421052632 + A4^394.7368421052632 + F4-394.7368421052632 + F5/394.7368421052632,
394.7368421052632: D5~394.7368421052632 + E5^394.7368421052632 + F4-394.7368421052632 + G5/394.7368421052632,
394.7368421052632: C5~394.7368421052632 + A4^394.7368421052632 + F4-394.7368421052632 + G5/394.7368421052632,
394.7368421052632: D5~394.7368421052632 + A4^394.7368421052632 + F4-394.7368421052632 + D4/394.7368421052632`;
playTune(melody, Infinity);
