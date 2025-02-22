/*
@title: letsgosky
@author: serpente_creeper
@tags: []
@addedOn: 22/02/2025
*/


const player = "p";
const enemy = "e";
const bulletUp = "u";
const bulletLeft = "l";
const bulletRight = "r";
const bulletDown = "d";
const background = "b";


let lastbulletThrow = 0;

setLegend(
  [player, bitmap`
................
..0.........0...
...0.......0....
....0.....0.....
.....0...0......
......000.......
LLLL.07.70.LLLL.
333L.0.3.0.L333.
LLLL..000..LLLL.
..L0...0...0L...
...000000000....
.......0........
.......0........
......000.......
.....00.00......
.....0...0......`],
  [enemy, bitmap`
................
................
................
......3333......
.....333333.....
....33333333....
....33333333....
....39900993....
....39900993....
....33333333....
....38888883....
....33888833....
.....333333.....
.......33.......
................
................`],
  [bulletUp, bitmap`
................
................
................
.......F........
.....FFFFF......
.....00600......
....0066600.....
...006666600....
...066666660....
...066666660....
...066666660....
...066666660....
...000090000....
................
................
................`],
  [bulletLeft, bitmap`
................
................
................
................
.......000000...
......0066660...
....F00666660...
....F06666660...
...FF66666669...
....F06666660...
....F00666660...
......0066660...
.......000000...
................
................
................`],
  [bulletRight, bitmap`
................
................
................
...000000.......
...0666600......
...06666600F....
...06666660F....
...96666666FF...
...06666660F....
...06666600F....
...0666600......
...000000.......
................
................
................
................`],
  [bulletDown, bitmap`
................
................
................
....000090000...
....066666660...
....066666660...
....066666660...
....066666660...
....006666600...
.....0066600....
......00600.....
......FFFFF.....
........F.......
................
................
................`],
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
);

const song = tune`
500,
500: B4~500 + C5^500,
500: F4~500 + C5^500,
500: F4~500 + C5^500,
500: E5~500 + A4^500 + B4^500,
500: F4~500 + E5^500 + B4^500,
500: D5^500 + B4^500,
500: F5~500 + G4~500 + B4^500,
500: A4^500,
500: D5~500 + F5^500 + A4^500,
500: F5~500 + A4^500,
500: F4~500 + A4^500,
500: D5~500 + G4^500,
500: G5~500 + G4^500,
500: F4~500 + G4^500,
500: F4~500 + C5~500 + G4^500,
500: F4^500,
500: F5~500 + D5^500 + F4^500,
500: G4~500 + F4^500,
500: F4^500,
500: G4~500 + C5~500 + G5~500 + E4^500,
500: E5^500 + E4^500,
500: F5^500 + E4^500,
500: D5^500 + E4^500,
500: G5~500 + D4^500,
500: G4~500 + F5^500 + D4^500,
500: D4^500,
500: F5~500 + A4~500 + E4~500 + D4^500,
500: F5^500 + C4^500,
500: E5~500 + C5^500 + C4^500,
500: G5~500 + E4~500 + F5^500 + D5^500 + C4^500,
500: E5~500 + G4~500 + B4^500`;
const playback = playTune(song, Infinity);

const pewSound = tune`
394.7368421052632: C4~394.7368421052632 + D4^394.7368421052632 + E4~394.7368421052632,
12236.842105263158`;
const deathSound = tune`
500,
500: G5~500 + A5^500 + F5/500,
500: F5~500 + G5^500 + E5/500,
500: E5~500 + F5^500 + D5/500,
500: D5~500 + E5^500 + C5/500,
500: C5~500 + B4~500 + D5^500,
500: B4~500 + C5^500,
500: B4~500 + C5^500,
12000`;

setBackground(background);
setSolids([]);

let gameOver = false;
let playerHealth = 100;
let wave = 0;
const bulletLifetimes = new Map();

const levels = [
  map`
e.....eee.....e
...............
...............
...............
...............
...............
e.............e
e......p......e
e.............e
...............
...............
...............
...............
...............
e.....eee.....e`
];

setMap(levels[0]);

setPushables({
  [player]: []
});

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

onInput("i", () => throwbullet(0, -1));
onInput("j", () => throwbullet(-1, 0));
onInput("k", () => throwbullet(0, 1));
onInput("l", () => throwbullet(1, 0));

function throwbullet(x, y) {
  if (gameOver) return;
  

  const currentTime = Date.now();
  if (currentTime - lastbulletThrow < 250) {
    return; 
  }
  playTune(pewSound);
  
  const playerPos = getFirst(player);
  const bulletType = x === 0 && y === -1 ? bulletUp :
                    x === 0 && y === 1 ? bulletDown :
                    x === -1 && y === 0 ? bulletLeft :
                    x === 1 && y === 0 ? bulletRight : null;
  if (bulletType) {
    const bullet = addSprite(playerPos.x, playerPos.y, bulletType);
    bulletLifetimes.set(bullet, 5); 
    lastbulletThrow = currentTime; 
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

function checkbullet(bullet) {
  getAll(enemy).forEach(enemySprite => {
    if (bullet.x === enemySprite.x && bullet.y === enemySprite.y) {
      enemySprite.remove();
     bullet.remove();
      bulletLifetimes.delete(bullet);
    }
  });
}

function movebullet() {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 }
  ];

  [bulletUp, bulletDown, bulletLeft, bulletRight].forEach((bulletType, i) => {
    getAll(bulletType).forEach(bullet => {
      checkbullet(bullet);
     bullet.x += directions[i].dx;
     bullet.y += directions[i].dy;

      if (bullet.x <= 0 || bullet.x >= width() - 1 || bullet.y <= 0 || bullet.y >= height() - 1) {
       bullet.remove();
        bulletLifetimes.delete(bullet);
      }

      if (bulletLifetimes.has(bullet)) {
        bulletLifetimes.set(bullet, bulletLifetimes.get(bullet) - 1);
        if (bulletLifetimes.get(bullet) <= 0) {
          bullet.remove();
          bulletLifetimes.delete(bullet);
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
    addText("Game Over!", { x: 5, y: 6, color: color`3` });
    gameOver = true;
    playTune(deathSound);
  } else {
    clearText();
    addText(`Health: ${playerHealth}`, { x: 1, y: 0, color: color`4` });
  }
}

displayHealth();
setInterval(() => {
  if (gameOver) return;
  if (wave %1 === 0) spawnEnemies(); 
  moveEnemies();
  movebullet();
  checkHealth();
  displayHealth();
  wave++;
}, 1000);
