/*
@title: Skibidi Slicers
@author: 22yeets22
@tags: []
@addedOn: 2025-01-17
*/
const player = "p";
const enemy = "e";
const swordUp = "u";
const swordLeft = "l";
const swordRight = "r";
const swordDown = "d";
const background = "b";

// Add cooldown configuration
let lastSwordThrow = 0;

setLegend(
  [player, bitmap`
........000.....
.7.....00..0....
.77....0...00...
..7....0....0...
..755...00000...
..500...0.......
.5.C.000........
....C..0000.....
......0...0.....
......0.........
....000.........
...00..0........
..00...0........
.00.....0.......
........0.......
........0.......`],
  [enemy, bitmap`
.....2CCC.2.....
.....CCCCC2.....
....2C0C0C2.....
....2CCCC02.....
....2.C00C2.....
....22CCC22.....
..2277CC7722....
..2277CC7772....
..2227CC7722....
..2222222222....
..2222222222....
..2222222222....
..222222222.....
...2222222......
...222222.......
....22222.......`],
  [swordUp, bitmap`
................
.......7........
.......7........
.......7........
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
......5757......
.....555555.....
.......CC.......
.......CC.......
.......CC.......
.......C........`],
  [swordLeft, bitmap`
................
................
................
................
................
...........5....
..........75....
....77777755CCC.
.77777777775CCCC
..........55....
...........5....
................
................
................
................
................`],
  [swordRight, bitmap`
................
................
................
................
................
....5...........
....55..........
CCCC57777777777.
.CCC55777777....
....57..........
....5...........
................
................
................
................
................`],
  [swordDown, bitmap`
........C.......
.......CC.......
.......CC.......
.......CC.......
.....555555.....
......7575......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
........7.......
........7.......
........7.......
................`],
  [background, bitmap`
4444444444444444
444444444444L444
44444444D4411444
444444444441L144
4444444444444444
4444444444444444
44444444444D4444
444D444444D44444
44444444444D4444
4444444444444444
4444444444444444
4414444444444444
4144D4444D444444
444D444444444444
4444444444444444
4444444444444444`],
);

const song = tune`
500,
500: C5~500 + E5^500 + G4/500,
500: A4~500,
500: B4^500,
500: C5~500 + E5^500 + G4/500,
500,
500: D5~500 + F5^500 + A4/500,
500: G4~500,
500: F4^500,
500: E5~500 + G5^500 + C5/500,
500,
500: C5~500 + E5^500,
500: D5/500,
500: E5~500 + G5^500,
500: F5~500,
500: G5^500,
500: A5~500 + E5/500,
500,
500: G5-500 + B5-500,
500,
500: E5~500 + G5^500,
1000,
500: C5~500 + E5^500 + G4/500,
500: B4~500,
500: A4^500,
500: G4/500,
500: C5~500,
2000`;
const playback = playTune(song, Infinity);

const pewSound = tune`
254.23728813559322: B5^254.23728813559322,
7881.35593220339`;
const deathSound = tune`
500,
500: C5~500 + G4/500,
500: A4~500 + F4/500,
500: F4~500 + E4/500,
500: E4~500 + D4/500,
500: E4~500 + C4/500,
500: C4~500,
500: C4~500,
12000`;

setBackground(background);
setSolids([]);

let gameOver = false;
let playerHealth = 100;
let wave = 0;
const swordLifetimes = new Map();

const levels = [
  map`
e..............
...............
...............
...............
...............
...............
...............
.......p.......
...............
...............
...............
...............
...............
...............
..............e`
];

setMap(levels[0]);

setPushables({
  [player]: []
});

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("i", () => throwSword(0, -1));
onInput("j", () => throwSword(-1, 0));
onInput("k", () => throwSword(0, 1));
onInput("l", () => throwSword(1, 0));

function throwSword(x, y) {
  if (gameOver) return;
  
  // Check cooldown
  const currentTime = Date.now();
  if (currentTime - lastSwordThrow < 250) {
    return; // Sword is still on cooldown
  }
  playTune(pewSound);
  
  const playerPos = getFirst(player);
  const swordType = x === 0 && y === -1 ? swordUp :
                    x === 0 && y === 1 ? swordDown :
                    x === -1 && y === 0 ? swordLeft :
                    x === 1 && y === 0 ? swordRight : null;
  if (swordType) {
    const sword = addSprite(playerPos.x, playerPos.y, swordType);
    swordLifetimes.set(sword, 5); // Swords last for 5 moves
    lastSwordThrow = currentTime; // Update last throw time
  }
}

function movePlayer(x, y) {
  if (gameOver) return;
  const playerPos = getFirst(player);
  playerPos.x += x;
  playerPos.y += y;
}

function spawnEnemies() {
  for (let i = 0; i < Math.ceil(wave / 3 + Math.random() * 4); i++) { // Increase enemies as waves progress
    const x = Math.floor(Math.random() * width());
    const y = Math.floor(Math.random() * height());
    if (x != getFirst(player).x && y != getFirst(player).y) {
      addSprite(x, y, enemy);
    }
  }
}

function checkSword(sword) {
  getAll(enemy).forEach(enemySprite => {
    if (sword.x === enemySprite.x && sword.y === enemySprite.y) {
      enemySprite.remove();
      sword.remove();
      swordLifetimes.delete(sword);
    }
  });
}

function moveSwords() {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 }
  ];

  [swordUp, swordDown, swordLeft, swordRight].forEach((swordType, i) => {
    getAll(swordType).forEach(sword => {
      checkSword(sword);
      sword.x += directions[i].dx;
      sword.y += directions[i].dy;

      if (sword.x <= 0 || sword.x >= width() - 1 || sword.y <= 0 || sword.y >= height() - 1) {
        sword.remove();
        swordLifetimes.delete(sword);
      }

      if (swordLifetimes.has(sword)) {
        swordLifetimes.set(sword, swordLifetimes.get(sword) - 1);
        if (swordLifetimes.get(sword) <= 0) {
          sword.remove();
          swordLifetimes.delete(sword);
        }
      }
    });
  });
}

function moveEnemies() {
  const playerPos = getFirst(player);
  getAll(enemy).forEach(enemySprite => {
    const dx = playerPos.x - enemySprite.x;
    const dy = playerPos.y - enemySprite.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      enemySprite.x += Math.sign(dx);
    } else {
      enemySprite.y += Math.sign(dy);
    }
  });
}

function checkHealth() {
  const playerPos = getFirst(player);
  getAll(enemy).forEach(enemySprite => {
    if (enemySprite.x === playerPos.x && enemySprite.y === playerPos.y) {
      playerHealth -= 5;
      playerHealth = Math.max(playerHealth, 0);
    }
  });
}

function displayHealth() {
  if (playerHealth == 0) {
    clearText();
    addText("Game Over!", { x: 5, y: 6, color: color`9` });
    addText(`You lasted ${Math.floor(wave / 5)} waves`, { x: 1, y: 9, color: color`7` });
    gameOver = true;
    playTune(deathSound);
  } else {
    clearText();
    addText(`Health: ${playerHealth}`, { x: 1, y: 0, color: color`3` });
  }
}

displayHealth();
setInterval(() => {
  if (gameOver) return;
  if (wave % 5 === 0) spawnEnemies(); // Spawn enemies every 5 waves
  moveEnemies();
  moveSwords();
  checkHealth();
  displayHealth();
  wave++;
}, 1000);
