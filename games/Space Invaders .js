/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Space Invaders
@author: Gavindu Achintha
@tags: []
@addedOn: 2024-08-10
*/


const player = "p";
const ship = "s";
const fire = "f";
const enemy = "e";
const blast = "b";
const numofEnemies = 10;
gridWidth = 20;
gridHeight = 8;
const deadLineX = 10;
const deadLineY = 20;
let score = 0;

const shootSound = tune`
37.5: E5-37.5,
37.5: E5-37.5,
37.5: E5-37.5,
37.5: E5-37.5,
1050`;
const blastSound = tune`
37.5: E5/37.5,
37.5: E5/37.5,
37.5: E5/37.5,
1087.5`;

setLegend(
  [blast, bitmap`
................
................
.....333333.....
...3333333333...
...3366666633...
..336699996633..
..336933339633..
..336933339633..
..336933339633..
..336933339633..
..336699996633..
...3366666633...
...3333333333...
.....333333.....
................
................`],
  [enemy, bitmap`
..00......00....
.0..0.00.0..0...
0....0DD0....0..
....03DD30......
....0DDDD0......
....0DDDD0......
00..0DDDD0..00..
0.0006DD6000.0..
....0D66D0......
...000DD0.0.....
..0...00...0....
..0........0....
..0........0....
..0........0....
.0..........0...
................`],
  [fire, bitmap`
................
................
................
................
................
................
.......66.......
......6336......
.....639936.....
.....639936.....
.....639936.....
.....633336.....
......6666......
................
................
................`],
  [ship, bitmap`
................
................
................
.......00.......
......0220......
.....011110.....
.0...011110...0.
.0..00111100..0.
.0.0001111000.0.
.002L011110L200.
.00L20111102L00.
0000000000000000
333...0000...333
.6....3333....6.
.......66.......
................`],
  
);

setMap(map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`);

setSolids([]);

let level = 0;
const levels = [
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`
];

setMap(levels[level]);

setPushables({
  [ship]: []
});

addSprite(10, 20, ship);

let currentEnemyCount = 0;
let maxEnemies = numofEnemies;

function spawnEnemy() {
  if (currentEnemyCount < maxEnemies) {
    let randomX = Math.floor(Math.random() * gridWidth);
    let randomY = Math.floor(Math.random() * (gridHeight - 2)); // Avoid bottom rows
    addSprite(randomX, randomY, enemy);
    currentEnemyCount++;
  }
}

for (let i = 0; i < numofEnemies; i++) {
  spawnEnemy();
}



onInput("a", () => {
  const playerSprite = getFirst(ship);
  if (playerSprite) {
    playerSprite.x -= 1; 
  }
});

onInput("d", () => {
  const playerSprite = getFirst(ship);
  if (playerSprite) {
    playerSprite.x += 1; 
  }
});

onInput("w", () => {
  const playerSprite = getFirst(ship);
  if (playerSprite) {
    addSprite(playerSprite.x, playerSprite.y - 1, fire); 
    playTune(shootSound);
  }
});

function moveBullet() {
  getAll(fire).forEach(f => {
    f.y -= 1; 

    if (f.y < 1) { 
      clearTile(f.x, f.y);
    }

    getAll(enemy).forEach(e => {
      if (f.x === e.x && f.y === e.y) {
        clearTile(f.x, f.y); 
        addSprite(e.x, e.y, blast); 

        setTimeout(() => {
          clearTile(e.x, e.y); 
          spawnEnemy(); 
        }, 150); 
        currentEnemyCount--; 
        score +=10;
        updateScore();
      }
    });
  });
}
updateScore();

function gameOver() {
  addText("Game Over!", { y: 4, color: color`3` });
  clearInterval(enemyMoveInterval); // Stop enemy movement
  clearInterval(bulletMoveInterval); // Stop bullet movement
  clearInterval(enemiesInterval); // Stop increasing enemies
}

function updateScore() {
  clearText();
  
  addText(`Score: ${score}`, { x: 1, y: 15, color: color`3`, size: 1 }); // Adjust size as needed
}

function checkEnemyShipCollision() {
  const s = getFirst(ship); 
  if (s) {
    getAll(enemy).forEach(e => {
      if (e.x === s.x && e.y === s.y) {
        clearTile(e.x, e.y); 
        clearTile(s.x, s.y); 
        playTune(blastSound);
        gameOver();
        return;
      }
    });
  }
}

const bulletMoveInterval = setInterval(moveBullet, 100); 
const collisionCheckInterval = setInterval(checkEnemyShipCollision, 100); 

const enemyMoveInterval = setInterval(() => {
  const s = getFirst(ship);
  if (s) {
    getAll(enemy).forEach(e => {
      e.y += 1;

      
      if (e.y >= s.y) {
        gameOver(); 
        clearTile(e.x, e.y); 
      }
    });
  }
}, 1000); 

const enemiesInterval = setInterval(() => {
  maxEnemies += 2; 
  for (let i = 0; i < 2; i++) {
    spawnEnemy(); 
  }
}, 6000); 
